export interface City {
  name: string;
  country: string;
  lat: number;
  lng: number;
  wiki?: string;
}

export type MiseryCategory =
  | "extreme-heat"
  | "extreme-cold"
  | "storm"
  | "humid"
  | "blizzard"
  | "mild";

export interface WeatherData {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  windGusts: number;
  precipitation: number;
  rain: number;
  snowfall: number;
  visibility: number;
  weatherCode: number;
}

export interface ScoredCity {
  city: City;
  weather: WeatherData;
  score: number;
  category: MiseryCategory;
  imageUrl?: string;
}
