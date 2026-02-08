import { WeatherData } from "@/types/weather";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-wide font-medium text-bf-gray-medium">
        {label}
      </span>
      <span className="text-sm font-semibold text-bf-gray-dark">{value}</span>
    </div>
  );
}

export function WeatherStats({ weather }: { weather: WeatherData }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
      <Stat label="Feels like" value={`${(weather.apparentTemperature * 9 / 5 + 32).toFixed(1)}°F`} />
      <Stat label="Humidity" value={`${weather.humidity}%`} />
      <Stat label="Wind" value={`${weather.windSpeed.toFixed(0)} km/h`} />
      <Stat
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
