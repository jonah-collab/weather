import { NextRequest, NextResponse } from "next/server";
import { fetchCityWeather, fetchAllWeather, fetchCityImageByName } from "@/lib/weather";
import { calculateMiseryScore, categorize } from "@/lib/scoring";
import type { MiseryCategory, WeatherData } from "@/types/weather";

interface GeocodingResult {
  results?: {
    name: string;
    country: string;
    country_code: string;
    admin1?: string;
    latitude: number;
    longitude: number;
  }[];
}

function getCommentary(
  score: number,
  category: MiseryCategory,
  weather: WeatherData,
  column: "worst" | "best" | "neither",
): string {
  const feelsF = weather.apparentTemperature * 9 / 5 + 32;

  if (column === "worst") {
    if (category === "blizzard") {
      return `It's giving snow apocalypse — ${weather.snowfall.toFixed(1)} cm of snow and ${feelsF.toFixed(0)}°F. You'd be right at home in our Worst Weather column.`;
    }
    if (category === "extreme-heat") {
      return `It feels like ${feelsF.toFixed(0)}°F outside — that's not weather, that's an oven with a sky. You'd be right at home in our Worst Weather column.`;
    }
    if (category === "extreme-cold") {
      return `${feelsF.toFixed(0)}°F. The kind of cold that makes you question every life choice. You'd be right at home in our Worst Weather column.`;
    }
    if (category === "storm") {
      return `Wind at ${weather.windSpeed.toFixed(0)} km/h and ${weather.precipitation.toFixed(1)} mm of precip — Mother Nature chose violence. You'd be right at home in our Worst Weather column.`;
    }
    if (category === "humid") {
      return `${weather.humidity}% humidity at ${feelsF.toFixed(0)}°F — the air is basically soup. You'd be right at home in our Worst Weather column.`;
    }
    return `A misery score of ${score}? Yikes. You'd be right at home in our Worst Weather column.`;
  }

  if (column === "best") {
    if (category === "mild" && feelsF >= 65 && feelsF <= 80) {
      return `${feelsF.toFixed(0)}°F and pleasant? That's literally what people pay resort prices for. You'd slide right into our Best Weather column.`;
    }
    return `A score of just ${score} — the weather gods are smiling on you today. You'd slide right into our Best Weather column.`;
  }

  // Neither column
  if (score > 20 && score < 30) {
    return "Weather limbo — not bad enough for Worst, not nice enough for Best. The participation trophy of skies.";
  }
  return "Weather limbo — not bad enough for Worst, not nice enough for Best. You could go outside. You could also not.";
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json(
      { error: "Query must be at least 2 characters." },
      { status: 400 }
    );
  }

  // Geocode the city (US only)
  let geoData: GeocodingResult;
  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=5&language=en&format=json`,
      { cache: "no-store" }
    );
    if (!geoRes.ok) {
      return NextResponse.json(
        { error: "Geocoding service unavailable." },
        { status: 502 }
      );
    }
    geoData = await geoRes.json();
  } catch {
    return NextResponse.json(
      { error: "Geocoding service unavailable." },
      { status: 502 }
    );
  }

  if (!geoData.results || geoData.results.length === 0) {
    return NextResponse.json(
      { error: `No city found matching "${q}".` },
      { status: 404 }
    );
  }

  // Filter to US results only
  const usResults = geoData.results.filter((r) => r.country_code === "US");
  if (usResults.length === 0) {
    return NextResponse.json(
      { error: `No U.S. city found matching "${q}".` },
      { status: 404 }
    );
  }

  const geo = usResults[0];

  // Fetch weather for the searched city
  const weather = await fetchCityWeather(geo.latitude, geo.longitude);
  if (!weather) {
    return NextResponse.json(
      { error: "Could not fetch weather data." },
      { status: 502 }
    );
  }

  const score = calculateMiseryScore(weather);
  const category = categorize(weather, score);

  const scoredCity = {
    city: {
      name: geo.name,
      country: geo.admin1 || "United States",
      lat: geo.latitude,
      lng: geo.longitude,
    },
    weather,
    score,
    category,
  };

  // Fetch Wikipedia image and tracked cities in parallel
  const [imageUrl, { scoredCities }] = await Promise.all([
    fetchCityImageByName(geo.name),
    fetchAllWeather(),
  ]);
  const totalCities = scoredCities.length + 1; // include the searched city

  // Rank: count how many cities have a strictly higher score (more miserable)
  const citiesMoreMiserable = scoredCities.filter((c) => c.score > score).length;
  const rank = citiesMoreMiserable + 1; // 1 = worst weather

  // Determine which column this city belongs to
  const column: "worst" | "best" | "neither" =
    score >= 30 ? "worst" : score <= 20 ? "best" : "neither";

  const commentary = getCommentary(score, category, weather, column);

  return NextResponse.json({
    scoredCity,
    rank,
    totalCities,
    percentile: Math.round(((rank - 1) / (totalCities - 1)) * 100),
    commentary,
    column,
    imageUrl,
  });
}
