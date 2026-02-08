import { ScoredCity } from "@/types/weather";
import { MiseryBadge } from "./MiseryBadge";
import { WeatherStats } from "./WeatherStats";

export function WeatherCard({
  entry,
  rank,
  variant = "worst",
}: {
  entry: ScoredCity;
  rank: number;
  variant?: "worst" | "best";
}) {
  const rankColor = variant === "best" ? "text-bf-green" : "text-bf-blue";

  return (
    <article className="flex items-start gap-4 rounded-[3px] bg-white px-5 py-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative shrink-0 w-28 h-20 rounded overflow-hidden">
        {entry.imageUrl ? (
          <>
            <img
              src={entry.imageUrl}
              alt={entry.city.name}
              width={112}
              height={80}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/20" />
          </>
        ) : (
          <div className="w-full h-full bg-gray-100" />
        )}
        <span className={`absolute inset-0 flex items-center justify-center text-4xl sm:text-5xl font-display font-bold tabular-nums text-white drop-shadow-lg`}>
          {rank}
        </span>
      </div>
      <div className="flex-1 min-w-0 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-bf-gray-dark leading-tight">
              {entry.city.name}
            </h2>
            <p className="text-sm text-bf-gray-medium">{entry.city.country}</p>
          </div>
          <MiseryBadge score={entry.score} category={entry.category} variant={variant} />
        </div>
        <hr className="border-gray-200" />
        <WeatherStats weather={entry.weather} />
      </div>
    </article>
  );
}
