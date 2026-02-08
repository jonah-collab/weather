import { City } from "@/types/weather";

export const cities: City[] = [
  // ── Extreme heat ──────────────────────────────────────────────
  { name: "Phoenix", country: "Arizona", lat: 33.45, lng: -112.07, wiki: "Phoenix, Arizona" },
  { name: "Death Valley", country: "California", lat: 36.46, lng: -116.87 },
  { name: "Las Vegas", country: "Nevada", lat: 36.17, lng: -115.14 },
  { name: "Tucson", country: "Arizona", lat: 32.22, lng: -110.97, wiki: "Tucson, Arizona" },
  { name: "El Paso", country: "Texas", lat: 31.76, lng: -106.49, wiki: "El Paso, Texas" },
  { name: "Palm Springs", country: "California", lat: 33.83, lng: -116.55, wiki: "Palm Springs, California" },
  { name: "Yuma", country: "Arizona", lat: 32.69, lng: -114.63, wiki: "Yuma, Arizona" },
  { name: "San Antonio", country: "Texas", lat: 29.42, lng: -98.49 },
  { name: "Bakersfield", country: "California", lat: 35.37, lng: -119.02, wiki: "Bakersfield, California" },

  // ── Extreme cold ──────────────────────────────────────────────
  { name: "Fairbanks", country: "Alaska", lat: 64.84, lng: -147.72, wiki: "Fairbanks, Alaska" },
  { name: "Barrow (Utqiagvik)", country: "Alaska", lat: 71.29, lng: -156.79, wiki: "Utqiagvik, Alaska" },
  { name: "Anchorage", country: "Alaska", lat: 61.22, lng: -149.90, wiki: "Anchorage, Alaska" },
  { name: "Juneau", country: "Alaska", lat: 58.30, lng: -134.42, wiki: "Juneau, Alaska" },
  { name: "International Falls", country: "Minnesota", lat: 48.60, lng: -93.41, wiki: "International Falls, Minnesota" },
  { name: "Fargo", country: "North Dakota", lat: 46.88, lng: -96.79, wiki: "Fargo, North Dakota" },
  { name: "Bismarck", country: "North Dakota", lat: 46.81, lng: -100.78, wiki: "Bismarck, North Dakota" },
  { name: "Duluth", country: "Minnesota", lat: 46.79, lng: -92.10, wiki: "Duluth, Minnesota" },
  { name: "Burlington", country: "Vermont", lat: 44.48, lng: -73.21, wiki: "Burlington, Vermont" },

  // ── Windy ─────────────────────────────────────────────────────
  { name: "Mount Washington", country: "New Hampshire", lat: 44.27, lng: -71.30, wiki: "Mount Washington (New Hampshire)" },
  { name: "Chicago", country: "Illinois", lat: 41.88, lng: -87.63 },
  { name: "Amarillo", country: "Texas", lat: 35.22, lng: -101.83, wiki: "Amarillo, Texas" },
  { name: "Dodge City", country: "Kansas", lat: 37.75, lng: -100.02, wiki: "Dodge City, Kansas" },
  { name: "Cheyenne", country: "Wyoming", lat: 41.14, lng: -104.82, wiki: "Cheyenne, Wyoming" },

  // ── Snowy ─────────────────────────────────────────────────────
  { name: "Buffalo", country: "New York", lat: 42.89, lng: -78.88, wiki: "Buffalo, New York" },
  { name: "Syracuse", country: "New York", lat: 43.05, lng: -76.15, wiki: "Syracuse, New York" },
  { name: "Rochester", country: "New York", lat: 43.16, lng: -77.61, wiki: "Rochester, New York" },
  { name: "Erie", country: "Pennsylvania", lat: 42.13, lng: -80.08, wiki: "Erie, Pennsylvania" },
  { name: "Marquette", country: "Michigan", lat: 46.55, lng: -87.40, wiki: "Marquette, Michigan" },
  { name: "Sault Ste. Marie", country: "Michigan", lat: 46.50, lng: -84.35, wiki: "Sault Ste. Marie, Michigan" },

  // ── Humid / subtropical ───────────────────────────────────────
  { name: "Houston", country: "Texas", lat: 29.76, lng: -95.37 },
  { name: "New Orleans", country: "Louisiana", lat: 29.95, lng: -90.07 },
  { name: "Miami", country: "Florida", lat: 25.76, lng: -80.19 },
  { name: "Tampa", country: "Florida", lat: 27.95, lng: -82.46 },
  { name: "Orlando", country: "Florida", lat: 28.54, lng: -81.38 },
  { name: "Jacksonville", country: "Florida", lat: 30.33, lng: -81.66, wiki: "Jacksonville, Florida" },
  { name: "Savannah", country: "Georgia", lat: 32.08, lng: -81.09, wiki: "Savannah, Georgia" },
  { name: "Charleston", country: "South Carolina", lat: 32.78, lng: -79.93, wiki: "Charleston, South Carolina" },
  { name: "Mobile", country: "Alabama", lat: 30.69, lng: -88.04, wiki: "Mobile, Alabama" },
  { name: "Biloxi", country: "Mississippi", lat: 30.40, lng: -88.89, wiki: "Biloxi, Mississippi" },
  { name: "Key West", country: "Florida", lat: 24.56, lng: -81.78, wiki: "Key West, Florida" },

  // ── Rainy / wet ───────────────────────────────────────────────
  { name: "Seattle", country: "Washington", lat: 47.61, lng: -122.33 },
  { name: "Portland", country: "Oregon", lat: 45.51, lng: -122.68, wiki: "Portland, Oregon" },
  { name: "Hilo", country: "Hawaii", lat: 19.72, lng: -155.08, wiki: "Hilo, Hawaii" },
  { name: "Ketchikan", country: "Alaska", lat: 55.34, lng: -131.64, wiki: "Ketchikan, Alaska" },
  { name: "Astoria", country: "Oregon", lat: 46.19, lng: -123.83, wiki: "Astoria, Oregon" },

  // ── Storm-prone ───────────────────────────────────────────────
  { name: "Oklahoma City", country: "Oklahoma", lat: 35.47, lng: -97.52 },
  { name: "Tornado Alley — Joplin", country: "Missouri", lat: 37.08, lng: -94.51, wiki: "Joplin, Missouri" },
  { name: "Galveston", country: "Texas", lat: 29.30, lng: -94.80, wiki: "Galveston, Texas" },
  { name: "Pensacola", country: "Florida", lat: 30.44, lng: -87.22, wiki: "Pensacola, Florida" },
  { name: "Corpus Christi", country: "Texas", lat: 27.80, lng: -97.40, wiki: "Corpus Christi, Texas" },

  // ── Mild / pleasant ───────────────────────────────────────────
  { name: "San Diego", country: "California", lat: 32.72, lng: -117.16 },
  { name: "Honolulu", country: "Hawaii", lat: 21.31, lng: -157.86 },
  { name: "Los Angeles", country: "California", lat: 34.05, lng: -118.24 },
  { name: "San Francisco", country: "California", lat: 37.77, lng: -122.42 },
  { name: "Santa Barbara", country: "California", lat: 34.42, lng: -119.70, wiki: "Santa Barbara, California" },
  { name: "San Jose", country: "California", lat: 37.34, lng: -121.89, wiki: "San Jose, California" },
  { name: "Asheville", country: "North Carolina", lat: 35.60, lng: -82.55, wiki: "Asheville, North Carolina" },
  { name: "Sarasota", country: "Florida", lat: 27.34, lng: -82.53, wiki: "Sarasota, Florida" },

  // ── Major metro areas ─────────────────────────────────────────
  { name: "New York City", country: "New York", lat: 40.71, lng: -74.01, wiki: "New York City" },
  { name: "Boston", country: "Massachusetts", lat: 42.36, lng: -71.06 },
  { name: "Philadelphia", country: "Pennsylvania", lat: 39.95, lng: -75.17 },
  { name: "Washington, D.C.", country: "District of Columbia", lat: 38.91, lng: -77.04, wiki: "Washington, D.C." },
  { name: "Atlanta", country: "Georgia", lat: 33.75, lng: -84.39 },
  { name: "Dallas", country: "Texas", lat: 32.78, lng: -96.80 },
  { name: "Denver", country: "Colorado", lat: 39.74, lng: -104.99 },
  { name: "Salt Lake City", country: "Utah", lat: 40.76, lng: -111.89 },
  { name: "Minneapolis", country: "Minnesota", lat: 44.98, lng: -93.27 },
  { name: "Detroit", country: "Michigan", lat: 42.33, lng: -83.05 },
  { name: "St. Louis", country: "Missouri", lat: 38.63, lng: -90.20, wiki: "St. Louis" },
  { name: "Nashville", country: "Tennessee", lat: 36.16, lng: -86.78 },
  { name: "Charlotte", country: "North Carolina", lat: 35.23, lng: -80.84, wiki: "Charlotte, North Carolina" },
  { name: "Indianapolis", country: "Indiana", lat: 39.77, lng: -86.16 },
  { name: "Columbus", country: "Ohio", lat: 39.96, lng: -82.99, wiki: "Columbus, Ohio" },
  { name: "Pittsburgh", country: "Pennsylvania", lat: 40.44, lng: -79.99 },
  { name: "Cincinnati", country: "Ohio", lat: 39.10, lng: -84.51 },
  { name: "Kansas City", country: "Missouri", lat: 39.10, lng: -94.58, wiki: "Kansas City, Missouri" },
  { name: "Milwaukee", country: "Wisconsin", lat: 43.04, lng: -87.91 },
  { name: "Raleigh", country: "North Carolina", lat: 35.78, lng: -78.64, wiki: "Raleigh, North Carolina" },
  { name: "Memphis", country: "Tennessee", lat: 35.15, lng: -90.05 },
  { name: "Louisville", country: "Kentucky", lat: 38.25, lng: -85.76, wiki: "Louisville, Kentucky" },
  { name: "Baltimore", country: "Maryland", lat: 39.29, lng: -76.61 },
  { name: "Richmond", country: "Virginia", lat: 37.54, lng: -77.44, wiki: "Richmond, Virginia" },

  // ── Mountain / high altitude ──────────────────────────────────
  { name: "Flagstaff", country: "Arizona", lat: 35.20, lng: -111.65, wiki: "Flagstaff, Arizona" },
  { name: "Bozeman", country: "Montana", lat: 45.68, lng: -111.04, wiki: "Bozeman, Montana" },
  { name: "Jackson", country: "Wyoming", lat: 43.48, lng: -110.76, wiki: "Jackson, Wyoming" },
  { name: "Aspen", country: "Colorado", lat: 39.19, lng: -106.82, wiki: "Aspen, Colorado" },
  { name: "Park City", country: "Utah", lat: 40.65, lng: -111.50, wiki: "Park City, Utah" },
  { name: "Boise", country: "Idaho", lat: 43.62, lng: -116.21 },
  { name: "Missoula", country: "Montana", lat: 46.87, lng: -114.00, wiki: "Missoula, Montana" },

  // ── Desert / arid ─────────────────────────────────────────────
  { name: "Albuquerque", country: "New Mexico", lat: 35.08, lng: -106.65 },
  { name: "Reno", country: "Nevada", lat: 39.53, lng: -119.81 },
  { name: "Santa Fe", country: "New Mexico", lat: 35.69, lng: -105.94 },

  // ── More coverage for remaining states ────────────────────────
  { name: "Portland", country: "Maine", lat: 43.66, lng: -70.25, wiki: "Portland, Maine" },
  { name: "Providence", country: "Rhode Island", lat: 41.82, lng: -71.41 },
  { name: "Hartford", country: "Connecticut", lat: 41.76, lng: -72.68 },
  { name: "Wilmington", country: "Delaware", lat: 39.74, lng: -75.55, wiki: "Wilmington, Delaware" },
  { name: "Charleston", country: "West Virginia", lat: 38.35, lng: -81.63, wiki: "Charleston, West Virginia" },
  { name: "Little Rock", country: "Arkansas", lat: 34.75, lng: -92.29, wiki: "Little Rock, Arkansas" },
  { name: "Des Moines", country: "Iowa", lat: 41.59, lng: -93.62 },
  { name: "Omaha", country: "Nebraska", lat: 41.26, lng: -95.94 },
  { name: "Sioux Falls", country: "South Dakota", lat: 43.55, lng: -96.73, wiki: "Sioux Falls, South Dakota" },
  { name: "Rapid City", country: "South Dakota", lat: 44.08, lng: -103.23, wiki: "Rapid City, South Dakota" },
  { name: "Billings", country: "Montana", lat: 45.78, lng: -108.50, wiki: "Billings, Montana" },
];
