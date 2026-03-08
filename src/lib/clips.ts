// ── Shared display utilities ──

export const formatPillar = (slug: string) => slug.replace(/[-_]/g, " ");

export const PILLAR_COLORS: Record<string, { badge: string; card: string; dot: string }> = {
  "aged-milk": { badge: "bg-red-500/20 text-red-400", card: "bg-red-500/15 text-red-400 border-red-500/20", dot: "bg-red-400" },
  "aged-wine": { badge: "bg-emerald-500/20 text-emerald-400", card: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20", dot: "bg-emerald-400" },
  "history": { badge: "bg-blue-500/20 text-blue-400", card: "bg-blue-500/15 text-blue-400 border-blue-500/20", dot: "bg-blue-400" },
  "builders": { badge: "bg-indigo-500/20 text-indigo-400", card: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20", dot: "bg-indigo-400" },
  "time-capsules": { badge: "bg-purple-500/20 text-purple-400", card: "bg-purple-500/15 text-purple-400 border-purple-500/20", dot: "bg-purple-400" },
  "vibe": { badge: "bg-amber-500/20 text-amber-400", card: "bg-amber-500/15 text-amber-400 border-amber-500/20", dot: "bg-amber-400" },
  "marathon": { badge: "bg-orange-500/20 text-orange-400", card: "bg-orange-500/15 text-orange-400 border-orange-500/20", dot: "bg-orange-400" },
  "launch": { badge: "bg-cyan-500/20 text-cyan-400", card: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20", dot: "bg-cyan-400" },
  "guests": { badge: "bg-emerald-500/20 text-emerald-400", card: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20", dot: "bg-emerald-400" },
  "community": { badge: "bg-pink-500/20 text-pink-400", card: "bg-pink-500/15 text-pink-400 border-pink-500/20", dot: "bg-pink-400" },
};

export const getPillarBadge = (type: string) => PILLAR_COLORS[type]?.badge || "bg-zinc-500/20 text-zinc-400";
export const getPillarCard = (type: string) => PILLAR_COLORS[type]?.card || "bg-zinc-800 text-zinc-400 border-zinc-700";
export const getPillarDot = (type: string) => PILLAR_COLORS[type]?.dot || "bg-zinc-500";

export const ENERGY_DOTS: Record<string, string> = {
  high: "bg-green-400",
  medium: "bg-amber-400",
  low: "bg-zinc-500",
};

export const STATUS_STYLES: Record<string, string> = {
  active: "bg-green-500/15 text-green-400",
  completed: "bg-blue-500/15 text-blue-400",
  draft: "bg-zinc-500/15 text-zinc-400",
};

export interface Clip {
  id: string;
  title: string;
  hook: string;
  episode: string;
  episodeNumber: number;
  guest?: string;
  guestTitle?: string;
  date: string;
  youtubeId: string;
  startSeconds: number;
  endSeconds: number;
  viralityScore: number;
  energy: "high" | "medium" | "low";
  type: string; // campaign pillar slug (e.g. "aged-milk", "builders", "marathon")
  platforms: string[];
  tags: string[];
  sentiment: "bullish" | "bearish" | "neutral" | "mixed";
}
