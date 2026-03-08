"use client";

import { Clip } from "@/lib/clips";

interface ClipCardProps {
  clip: Clip;
  swipeDirection: "left" | "right" | null;
  layout?: "mobile" | "desktop";
}

const TYPE_LABELS: Record<string, string> = {
  hot_take: "HOT TAKE",
  insight: "INSIGHT",
  funny: "FUNNY",
  breaking_news: "BREAKING",
  guest_highlight: "GUEST",
  education: "EDUCATION",
};

const TYPE_COLORS: Record<string, string> = {
  hot_take: "bg-red-500/20 text-red-400",
  insight: "bg-blue-500/20 text-blue-400",
  funny: "bg-amber-500/20 text-amber-400",
  breaking_news: "bg-purple-500/20 text-purple-400",
  guest_highlight: "bg-emerald-500/20 text-emerald-400",
  education: "bg-cyan-500/20 text-cyan-400",
};

const ENERGY_DOTS: Record<string, string> = {
  high: "bg-green-400",
  medium: "bg-amber-400",
  low: "bg-zinc-500",
};

export function ScoreRing({ score, size = 56 }: { score: number; size?: number }) {
  const pct = (score / 10) * 100;
  const color =
    score >= 8 ? "#22c55e" : score >= 6 ? "#f59e0b" : "#ef4444";
  const r = (size / 2) - 4;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="absolute inset-0" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#2a2a2a" strokeWidth="3" />
        <circle
          cx={size/2} cy={size/2} r={r}
          fill="none" stroke={color} strokeWidth="3"
          strokeDasharray={`${(pct / 100) * circumference} ${circumference}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
          className="transition-all duration-500"
        />
      </svg>
      <span className="text-sm font-bold" style={{ color }}>{score.toFixed(1)}</span>
    </div>
  );
}

function ClipMeta({ clip }: { clip: Clip }) {
  return (
    <>
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full ${TYPE_COLORS[clip.type]}`}>
          {TYPE_LABELS[clip.type]}
        </span>
        <div className="flex items-center gap-1">
          <div className={`w-1.5 h-1.5 rounded-full ${ENERGY_DOTS[clip.energy]}`} />
          <span className="text-[10px] text-zinc-500 uppercase">{clip.energy}</span>
        </div>
        <span className="text-[10px] text-zinc-600 ml-auto font-mono">EP {clip.episodeNumber}</span>
      </div>

      <h2 className="text-lg font-semibold tracking-tight leading-snug mb-1">{clip.title}</h2>
      <p className="text-sm text-zinc-400 leading-relaxed mb-4">{clip.hook}</p>

      {clip.guest && (
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#2a2a2a]">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-bold">
            {clip.guest.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <p className="text-sm font-medium">{clip.guest}</p>
            <p className="text-[11px] text-zinc-500">{clip.guestTitle}</p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <ScoreRing score={clip.viralityScore} />
        <div className="flex-1">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {clip.platforms.map((p) => (
              <span key={p} className="text-[10px] font-medium bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">{p}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {clip.tags.slice(0, 4).map((t) => (
              <span key={t} className="text-[10px] text-zinc-600">#{t}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function VideoEmbed({ clip }: { clip: Clip }) {
  const embedUrl = `https://www.youtube.com/embed/${clip.youtubeId}?start=${clip.startSeconds}&autoplay=0&modestbranding=1&rel=0&controls=1`;

  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
      <iframe
        key={clip.id}
        src={embedUrl}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

// Mobile: stacked card layout
export function ClipCard({ clip, swipeDirection, layout = "mobile" }: ClipCardProps) {
  const animClass = swipeDirection === "right"
    ? "swipe-right"
    : swipeDirection === "left"
      ? "swipe-left"
      : "card-enter";

  if (layout === "desktop") return null; // Desktop uses DesktopClipView

  return (
    <div className={`w-full max-w-md ${animClass}`}>
      <div className="rounded-2xl overflow-hidden bg-[#141414] border border-[#2a2a2a] shadow-2xl">
        <div className="relative">
          <VideoEmbed clip={clip} />
          {swipeDirection === "right" && (
            <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center z-10 rounded-lg">
              <span className="text-green-400 text-4xl font-bold tracking-widest rotate-[-12deg] border-4 border-green-400 px-6 py-2 rounded-lg">SHIP</span>
            </div>
          )}
          {swipeDirection === "left" && (
            <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center z-10 rounded-lg">
              <span className="text-red-400 text-4xl font-bold tracking-widest rotate-[12deg] border-4 border-red-400 px-6 py-2 rounded-lg">SKIP</span>
            </div>
          )}
        </div>
        <div className="p-5">
          <ClipMeta clip={clip} />
        </div>
      </div>
    </div>
  );
}

// Desktop: split-pane Jarvis layout
export function DesktopClipView({ clip, swipeDirection }: { clip: Clip; swipeDirection: "left" | "right" | null }) {
  return (
    <div className={`flex-1 flex gap-6 ${swipeDirection ? (swipeDirection === "right" ? "swipe-right" : "swipe-left") : "card-enter"}`}>
      {/* Left: Video preview (how the viewer will see it) */}
      <div className="flex-1 flex flex-col">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs text-zinc-500 font-mono">PREVIEW</span>
          <span className="text-[10px] text-zinc-600 font-mono">
            {Math.floor(clip.startSeconds / 60)}:{(clip.startSeconds % 60).toString().padStart(2, "0")} →{" "}
            {Math.floor(clip.endSeconds / 60)}:{(clip.endSeconds % 60).toString().padStart(2, "0")}
          </span>
        </div>
        <VideoEmbed clip={clip} />

        {/* Platform preview tabs */}
        <div className="mt-4 flex gap-2">
          {clip.platforms.map((p) => (
            <button key={p} className="text-[11px] font-medium bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 px-3 py-1.5 rounded-lg transition-colors">
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Right: Intel panel */}
      <div className="w-80 flex flex-col gap-4">
        {/* Score + type */}
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <ScoreRing score={clip.viralityScore} size={64} />
            <div>
              <p className="text-xs text-zinc-500 mb-1">virality score</p>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full ${TYPE_COLORS[clip.type]}`}>
                  {TYPE_LABELS[clip.type]}
                </span>
                <div className="flex items-center gap-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${ENERGY_DOTS[clip.energy]}`} />
                  <span className="text-[10px] text-zinc-500 uppercase">{clip.energy}</span>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-base font-semibold tracking-tight leading-snug mb-1">{clip.title}</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">{clip.hook}</p>
        </div>

        {/* Guest info */}
        {clip.guest && (
          <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-4">
            <p className="text-xs text-zinc-500 mb-2">guest</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm font-bold">
                {clip.guest.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-medium">{clip.guest}</p>
                <p className="text-[11px] text-zinc-500">{clip.guestTitle}</p>
              </div>
            </div>
          </div>
        )}

        {/* Episode context */}
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-4">
          <p className="text-xs text-zinc-500 mb-2">source</p>
          <p className="text-sm font-medium mb-1">EP {clip.episodeNumber}</p>
          <p className="text-[11px] text-zinc-500 leading-relaxed">{clip.episode}</p>
          <p className="text-[10px] text-zinc-600 mt-2 font-mono">{clip.date}</p>
        </div>

        {/* Tags */}
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-4">
          <p className="text-xs text-zinc-500 mb-2">tags</p>
          <div className="flex flex-wrap gap-1.5">
            {clip.tags.map((t) => (
              <span key={t} className="text-[11px] bg-zinc-800 text-zinc-400 px-2 py-1 rounded">#{t}</span>
            ))}
          </div>
        </div>

        {/* STUB: Publishing controls */}
        <div className="border border-dashed border-zinc-700 rounded-xl p-4">
          <p className="text-xs text-zinc-600 font-mono text-center">
            [ publish controls · schedule · caption edit · A/B test ]
          </p>
        </div>
      </div>
    </div>
  );
}
