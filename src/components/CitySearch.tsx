"use client";

import { useState, FormEvent } from "react";
import type { MiseryCategory, WeatherData, ScoredCity } from "@/types/weather";

interface SearchResult {
  scoredCity: ScoredCity;
  rank: number;
  totalCities: number;
  percentile: number;
  commentary: string;
  column: "worst" | "best" | "neither";
  imageUrl: string | null;
}

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: SearchResult };

// Inline MiseryBadge logic (can't import server-only styled component for API response data)
const categoryStyles: Record<MiseryCategory, { bg: string; text: string; label: string }> = {
  "extreme-heat": { bg: "bg-red-100", text: "text-red-700", label: "Extreme Heat" },
  "extreme-cold": { bg: "bg-blue-100", text: "text-blue-700", label: "Extreme Cold" },
  storm: { bg: "bg-purple-100", text: "text-purple-700", label: "Storm" },
  humid: { bg: "bg-teal-100", text: "text-teal-700", label: "Humid" },
  blizzard: { bg: "bg-slate-100", text: "text-slate-700", label: "Blizzard" },
  mild: { bg: "bg-green-100", text: "text-green-700", label: "Mild" },
};

function scoreColor(score: number): string {
  if (score >= 70) return "text-bf-red bg-red-50";
  if (score >= 50) return "text-bf-orange bg-orange-50";
  if (score >= 30) return "text-amber-500 bg-amber-50";
  return "text-bf-green bg-green-50";
}

function InlineStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-wide font-medium text-bf-gray-medium">
        {label}
      </span>
      <span className="text-sm font-semibold text-bf-gray-dark">{value}</span>
    </div>
  );
}

function InlineWeatherStats({ weather }: { weather: WeatherData }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
      <InlineStat
        label="Feels like"
        value={`${(weather.apparentTemperature * 9 / 5 + 32).toFixed(1)}°F`}
      />
      <InlineStat label="Humidity" value={`${weather.humidity}%`} />
      <InlineStat label="Wind" value={`${weather.windSpeed.toFixed(0)} km/h`} />
      <InlineStat
        label="Precip"
        value={
          weather.snowfall > 0
            ? `${weather.snowfall.toFixed(1)} cm snow`
            : `${weather.rain.toFixed(1)} mm`
        }
      />
    </div>
  );
}

function columnBorderColor(column: "worst" | "best" | "neither"): string {
  if (column === "best") return "border-green-500";
  if (column === "worst") return "border-red-500";
  return "border-gray-300";
}

function ColumnBadge({ column }: { column: "worst" | "best" | "neither" }) {
  if (column === "worst") {
    return (
      <span className="rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-bf-red">
        Worst Weather
      </span>
    );
  }
  if (column === "best") {
    return (
      <span className="rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-bf-green">
        Best Weather
      </span>
    );
  }
  return null;
}

export function CitySearch() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<State>({ status: "idle" });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setState({ status: "loading" });

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
      const data = await res.json();

      if (!res.ok) {
        setState({ status: "error", message: data.error || "Something went wrong." });
        return;
      }

      setState({ status: "success", data });
    } catch {
      setState({ status: "error", message: "Network error. Please try again." });
    }
  }

  const borderColor = state.status === "success"
    ? columnBorderColor(state.data.column)
    : "border-gray-200";

  return (
    <section className="mb-8">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a U.S. city..."
          className="flex-1 rounded-[3px] border border-gray-300 px-3 py-2 text-sm text-bf-gray-dark placeholder:text-bf-gray-medium focus:outline-none focus:ring-2 focus:ring-bf-blue focus:border-transparent"
        />
        <button
          type="submit"
          disabled={state.status === "loading"}
          className="rounded-[3px] bg-bf-red px-4 py-2 text-sm font-bold text-white hover:bg-red-600 transition-colors disabled:opacity-50"
        >
          {state.status === "loading" ? "Searching..." : "Search"}
        </button>
      </form>

      {state.status === "error" && (
        <p className="mt-3 text-sm text-bf-red font-medium">{state.message}</p>
      )}

      {state.status === "success" && (
        <article className={`mt-4 rounded-[3px] bg-white px-5 py-4 border-2 ${borderColor} shadow-sm`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              {state.data.imageUrl && (
                <img
                  src={state.data.imageUrl}
                  alt={state.data.scoredCity.city.name}
                  width={80}
                  height={64}
                  loading="lazy"
                  className="w-20 h-16 rounded-sm object-cover shrink-0"
                />
              )}
              <div>
                <h3 className="text-lg font-bold text-bf-gray-dark leading-tight">
                  {state.data.scoredCity.city.name}
                </h3>
                <p className="text-sm text-bf-gray-medium">
                  {state.data.scoredCity.city.country}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold tabular-nums ${scoreColor(state.data.scoredCity.score)}`}
              >
                {state.data.scoredCity.score}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryStyles[state.data.scoredCity.category].bg} ${categoryStyles[state.data.scoredCity.category].text}`}
              >
                {categoryStyles[state.data.scoredCity.category].label}
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <span className="text-4xl sm:text-5xl font-display text-bf-blue font-bold tabular-nums">
              #{state.data.rank}
            </span>
            <span className="text-sm text-bf-gray-medium">
              out of {state.data.totalCities} cities
            </span>
            <ColumnBadge column={state.data.column} />
          </div>

          <p className="mt-3 text-sm text-bf-gray-dark leading-relaxed">
            {state.data.commentary}
          </p>

          <hr className="my-3 border-gray-200" />

          <InlineWeatherStats weather={state.data.scoredCity.weather} />
        </article>
      )}
    </section>
  );
}
