import { WeatherData, MiseryCategory } from "@/types/weather";

const COMFORT_TEMP = 22;

function temperatureScore(temp: number): number {
  const deviation = Math.abs(temp - COMFORT_TEMP);
  // Exponential penalty: gentle near comfort, harsh at extremes
  // 50°C → ~100, -40°C → ~100, 30°C → ~15, 0°C → ~40
  if (deviation <= 3) return 0;
  return Math.min(100, Math.pow((deviation - 3) / 4, 1.8));
}

function humidityScore(humidity: number, temp: number): number {
  if (humidity <= 60) return 0;
  const base = ((humidity - 60) / 40) * 20;
  // Amplify when hot — high humidity + heat is extra miserable
  const heatMultiplier = temp > 30 ? 1 + (temp - 30) / 20 : 1;
  return Math.min(40, base * heatMultiplier);
}

function windScore(speed: number, gusts: number): number {
  if (speed <= 20) return 0;
  const base = ((speed - 20) / 30) * 20;
  const gustBonus = gusts > 50 ? ((gusts - 50) / 50) * 15 : 0;
  return Math.min(50, base + gustBonus);
}

function precipitationScore(rain: number, snow: number): number {
  const rainPenalty = Math.min(25, rain * 5);
  const snowPenalty = Math.min(25, snow * 8);
  return Math.min(40, rainPenalty + snowPenalty);
}

function visibilityScore(visibility: number): number {
  // visibility in meters from API
  const km = visibility / 1000;
  if (km >= 10) return 0;
  if (km >= 1) return ((10 - km) / 9) * 10;
  // Below 1km — steep penalty
  return 10 + ((1 - km) / 1) * 15;
}

export function calculateMiseryScore(weather: WeatherData): number {
  const temp = temperatureScore(weather.apparentTemperature);
  const humid = humidityScore(weather.humidity, weather.temperature);
  const wind = windScore(weather.windSpeed, weather.windGusts);
  const precip = precipitationScore(weather.rain, weather.snowfall);
  const vis = visibilityScore(weather.visibility);

  return Math.min(100, Math.round(temp + humid + wind + precip + vis));
}

export function categorize(weather: WeatherData, score: number): MiseryCategory {
  if (score < 15) return "mild";

  const isHot = weather.apparentTemperature > 38;
  const isCold = weather.apparentTemperature < -10;
  const isSnowy = weather.snowfall > 0.5;
  const isStormy = weather.windSpeed > 40 || weather.precipitation > 5;
  const isHumid = weather.humidity > 80 && weather.temperature > 28;

  if (isCold && isSnowy) return "blizzard";
  if (isStormy) return "storm";
  if (isHot) return "extreme-heat";
  if (isCold) return "extreme-cold";
  if (isHumid) return "humid";
  if (isSnowy) return "blizzard";

  // Fallback based on temperature
  if (weather.apparentTemperature > 30) return "extreme-heat";
  if (weather.apparentTemperature < 5) return "extreme-cold";
  return "mild";
}
