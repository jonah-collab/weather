import { City, WeatherData, ScoredCity } from "@/types/weather";
import { cities } from "./cities";
import { calculateMiseryScore, categorize } from "./scoring";

interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    wind_gusts_10m: number;
    precipitation: number;
    rain: number;
    snowfall: number;
    visibility: number;
    weather_code: number;
  };
}

function parseWeather(current: OpenMeteoResponse["current"]): WeatherData {
  return {
    temperature: current.temperature_2m,
    apparentTemperature: current.apparent_temperature,
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
    windGusts: current.wind_gusts_10m ?? 0,
    precipitation: current.precipitation,
    rain: current.rain,
    snowfall: current.snowfall,
    visibility: current.visibility ?? 10000,
    weatherCode: current.weather_code,
  };
}

export async function fetchCityWeather(lat: number, lng: number): Promise<WeatherData | null> {
  try {
    const params = new URLSearchParams({
      latitude: lat.toString(),
      longitude: lng.toString(),
      current: [
        "temperature_2m",
        "apparent_temperature",
        "relative_humidity_2m",
        "wind_speed_10m",
        "wind_gusts_10m",
        "precipitation",
        "rain",
        "snowfall",
        "visibility",
        "weather_code",
      ].join(","),
      timezone: "auto",
    });

    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?${params}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    const data: OpenMeteoResponse = await res.json();
    return parseWeather(data.current);
  } catch {
    return null;
  }
}

// Open-Meteo doesn't support true multi-location in one call,
// so we batch into concurrent requests (10 at a time to be polite).
async function fetchBatch(batch: City[]): Promise<(WeatherData | null)[]> {
  const results = await Promise.all(
    batch.map(async (city) => {
      try {
        const params = new URLSearchParams({
          latitude: city.lat.toString(),
          longitude: city.lng.toString(),
          current: [
            "temperature_2m",
            "apparent_temperature",
            "relative_humidity_2m",
            "wind_speed_10m",
            "wind_gusts_10m",
            "precipitation",
            "rain",
            "snowfall",
            "visibility",
            "weather_code",
          ].join(","),
          timezone: "auto",
        });

        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?${params}`,
          { next: { revalidate: 3600 } }
        );

        if (!res.ok) return null;

        const data: OpenMeteoResponse = await res.json();
        return parseWeather(data.current);
      } catch {
        return null;
      }
    })
  );
  return results;
}

interface WikiQueryResponse {
  query?: {
    pages?: Record<string, {
      title: string;
      thumbnail?: { source: string };
    }>;
    normalized?: { from: string; to: string }[];
    redirects?: { from: string; to: string }[];
  };
}

async function fetchCityImages(citiesToFetch: City[]): Promise<Map<string, string>> {
  const imageMap = new Map<string, string>();
  const batchSize = 50;

  for (let i = 0; i < citiesToFetch.length; i += batchSize) {
    const batch = citiesToFetch.slice(i, i + batchSize);

    const wikiTitleToCity = new Map<string, string>();
    for (const city of batch) {
      wikiTitleToCity.set(city.wiki || city.name, city.name);
    }

    try {
      const params = new URLSearchParams({
        action: "query",
        titles: [...wikiTitleToCity.keys()].join("|"),
        prop: "pageimages",
        pithumbsize: "256",
        format: "json",
        redirects: "1",
      });

      const res = await fetch(
        `https://en.wikipedia.org/w/api.php?${params}`,
        { next: { revalidate: 86400 } }
      );
      if (!res.ok) continue;

      const data: WikiQueryResponse = await res.json();
      if (!data.query?.pages) continue;

      // Build reverse map: final title → original wiki title
      const finalToOriginal = new Map<string, string>();
      for (const wikiTitle of wikiTitleToCity.keys()) {
        finalToOriginal.set(wikiTitle, wikiTitle);
      }
      if (data.query.normalized) {
        for (const { from, to } of data.query.normalized) {
          const original = finalToOriginal.get(from);
          if (original) {
            finalToOriginal.delete(from);
            finalToOriginal.set(to, original);
          }
        }
      }
      if (data.query.redirects) {
        for (const { from, to } of data.query.redirects) {
          const original = finalToOriginal.get(from);
          if (original) {
            finalToOriginal.delete(from);
            finalToOriginal.set(to, original);
          }
        }
      }

      for (const page of Object.values(data.query.pages)) {
        if (page.thumbnail?.source) {
          const originalWikiTitle = finalToOriginal.get(page.title);
          if (originalWikiTitle) {
            const cityName = wikiTitleToCity.get(originalWikiTitle);
            if (cityName) imageMap.set(cityName, page.thumbnail.source);
          }
        }
      }
    } catch {
      // Skip batch on error
    }
  }

  return imageMap;
}

export async function fetchCityImageByName(name: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.thumbnail?.source || null;
  } catch {
    return null;
  }
}

export async function fetchAllWeather(): Promise<{
  scoredCities: ScoredCity[];
  worstCities: ScoredCity[];
  bestCities: ScoredCity[];
  fetchedAt: string;
}> {
  const batchSize = 15;
  const allWeather: (WeatherData | null)[] = [];

  for (let i = 0; i < cities.length; i += batchSize) {
    const batch = cities.slice(i, i + batchSize);
    const results = await fetchBatch(batch);
    allWeather.push(...results);
  }

  // Fetch Wikipedia thumbnails in parallel with weather processing
  const imageMap = await fetchCityImages(cities);

  const scoredCities: ScoredCity[] = [];

  for (let i = 0; i < cities.length; i++) {
    const weather = allWeather[i];
    if (!weather) continue;

    const score = calculateMiseryScore(weather);
    const category = categorize(weather, score);

    scoredCities.push({
      city: cities[i],
      weather,
      score,
      category,
      imageUrl: imageMap.get(cities[i].name),
    });
  }

  // Sort by misery score descending — worst weather first
  scoredCities.sort((a, b) => b.score - a.score);

  // Worst 20: high-scoring cities (score >= 30), already sorted worst-first
  const worstCities = scoredCities.filter((c) => c.score >= 30).slice(0, 20);

  // Best 20: low-scoring cities (score <= 20), reversed so best-first
  const bestCities = scoredCities
    .filter((c) => c.score <= 20)
    .slice(-20)
    .reverse();

  return {
    scoredCities,
    worstCities,
    bestCities,
    fetchedAt: new Date().toISOString(),
  };
}
