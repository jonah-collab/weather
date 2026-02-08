import { MiseryCategory } from "@/types/weather";

const categoryStyles: Record<MiseryCategory, { bg: string; text: string; label: string }> = {
  "extreme-heat": { bg: "bg-red-100", text: "text-red-700", label: "Extreme Heat" },
  "extreme-cold": { bg: "bg-blue-100", text: "text-blue-700", label: "Extreme Cold" },
  storm: { bg: "bg-purple-100", text: "text-purple-700", label: "Storm" },
  humid: { bg: "bg-teal-100", text: "text-teal-700", label: "Humid" },
  blizzard: { bg: "bg-slate-100", text: "text-slate-700", label: "Blizzard" },
  mild: { bg: "bg-green-100", text: "text-green-700", label: "Mild" },
};

function scoreColor(score: number, variant: "worst" | "best"): string {
  if (variant === "best") return "text-bf-green bg-green-50";
  if (score >= 70) return "text-bf-red bg-red-50";
  if (score >= 50) return "text-bf-orange bg-orange-50";
  if (score >= 30) return "text-amber-500 bg-amber-50";
  return "text-bf-green bg-green-50";
}

export function MiseryBadge({
  score,
  category,
  variant = "worst",
}: {
  score: number;
  category: MiseryCategory;
  variant?: "worst" | "best";
}) {
  const style = categoryStyles[category];
  const label = variant === "best" && category === "mild" ? "Pleasant" : style.label;

  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold tabular-nums ${scoreColor(score, variant)}`}
      >
        {score}
      </span>
      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${style.bg} ${style.text}`}>
        {label}
      </span>
    </div>
  );
}
