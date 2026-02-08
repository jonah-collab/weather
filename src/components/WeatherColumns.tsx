import { ScoredCity } from "@/types/weather";
import { WeatherCard } from "./WeatherCard";

export function WeatherColumns({
  worstCities,
  bestCities,
}: {
  worstCities: ScoredCity[];
  bestCities: ScoredCity[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {/* Worst Weather Column */}
      <section>
        <h2 className="flex items-center gap-2 mb-4 text-xl font-bold text-bf-red font-display">
          <span className="inline-block h-3 w-3 rounded-full bg-bf-red" />
          Worst Weather
        </h2>
        {worstCities.length > 0 ? (
          <div className="space-y-4">
            {worstCities.map((entry, i) => (
              <WeatherCard
                key={entry.city.name}
                entry={entry}
                rank={i + 1}
                variant="worst"
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-bf-gray-medium py-8 text-center">
            No cities currently scoring high enough for the Worst Weather column.
          </p>
        )}
      </section>

      {/* Best Weather Column */}
      <section>
        <h2 className="flex items-center gap-2 mb-4 text-xl font-bold text-bf-green font-display">
          <span className="inline-block h-3 w-3 rounded-full bg-bf-green" />
          Best Weather
        </h2>
        {bestCities.length > 0 ? (
          <div className="space-y-4">
            {bestCities.map((entry, i) => (
              <WeatherCard
                key={entry.city.name}
                entry={entry}
                rank={i + 1}
                variant="best"
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-bf-gray-medium py-8 text-center">
            No cities currently scoring low enough for the Best Weather column.
          </p>
        )}
      </section>
    </div>
  );
}
