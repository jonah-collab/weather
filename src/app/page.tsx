import { fetchAllWeather } from "@/lib/weather";
import { WeatherColumns } from "@/components/WeatherColumns";
import { CitySearch } from "@/components/CitySearch";

export const revalidate = 3600;

export default async function Home() {
  const { scoredCities, worstCities, bestCities, fetchedAt } =
    await fetchAllWeather();

  const updatedAt = new Date(fetchedAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  });

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-1.5">
          <span className="text-xl font-bold text-bf-red">BuzzFeed</span>
          <span className="text-xl font-bold text-bf-gray-dark">Weather</span>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8 text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-bf-gray-dark sm:text-4xl md:text-5xl">
            Worst &amp; Best Weather in the U.S. Right Now
          </h1>
          <p className="mt-3 text-base text-bf-gray-medium">
            We ranked {scoredCities.length} cities by weather conditions &middot;
            Updated {updatedAt} UTC
          </p>
        </header>

        <CitySearch />

        <WeatherColumns worstCities={worstCities} bestCities={bestCities} />
      </main>

      <footer className="mt-10 bg-bf-gray-light border-t border-gray-200 py-6 text-center text-xs text-bf-gray-medium">
        <p>Weather data from Open-Meteo &middot; Refreshes every hour</p>
        <p className="mt-1">A BuzzFeed Weather production</p>
      </footer>
    </>
  );
}
