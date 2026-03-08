"use client";

import { Clip } from "@/lib/clips";
import { ScoreRing } from "./ClipCard";

interface QueueSidebarProps {
  clips: Clip[];
  currentIndex: number;
  shipped: Clip[];
  skipped: Clip[];
}

const TYPE_DOT: Record<string, string> = {
  hot_take: "bg-red-400",
  insight: "bg-blue-400",
  funny: "bg-amber-400",
  breaking_news: "bg-purple-400",
  guest_highlight: "bg-emerald-400",
  education: "bg-cyan-400",
};

export function QueueSidebar({ clips, currentIndex, shipped, skipped }: QueueSidebarProps) {
  const upcoming = clips.slice(currentIndex + 1);
  const avgShipped = shipped.length > 0
    ? (shipped.reduce((s, c) => s + c.viralityScore, 0) / shipped.length).toFixed(1)
    : "—";

  return (
    <div className="w-64 border-r border-[#1a1a1a] flex flex-col h-full">
      {/* Session stats */}
      <div className="p-4 border-b border-[#1a1a1a]">
        <p className="text-xs text-zinc-500 mb-3 font-mono">SESSION</p>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-lg font-bold text-green-400">{shipped.length}</p>
            <p className="text-[9px] text-zinc-600">shipped</p>
          </div>
          <div>
            <p className="text-lg font-bold text-red-400">{skipped.length}</p>
            <p className="text-[9px] text-zinc-600">skipped</p>
          </div>
          <div>
            <p className="text-lg font-bold text-indigo-400">{avgShipped}</p>
            <p className="text-[9px] text-zinc-600">avg score</p>
          </div>
        </div>
      </div>

      {/* Shipped queue */}
      {shipped.length > 0 && (
        <div className="p-4 border-b border-[#1a1a1a]">
          <p className="text-xs text-zinc-500 mb-2 font-mono">SHIPPING</p>
          <div className="space-y-1.5 max-h-32 overflow-y-auto no-scrollbar">
            {shipped.map((c) => (
              <div key={c.id} className="flex items-center gap-2 text-[11px]">
                <span className="text-green-500">→</span>
                <span className="text-zinc-300 truncate flex-1">{c.title}</span>
                <span className="text-zinc-600 font-mono">{c.viralityScore.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming queue */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4">
        <p className="text-xs text-zinc-500 mb-2 font-mono">QUEUE ({upcoming.length})</p>
        <div className="space-y-2">
          {upcoming.map((c, i) => (
            <div
              key={c.id}
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                i === 0 ? "bg-zinc-800/50 border border-zinc-700/50" : "hover:bg-zinc-900"
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${TYPE_DOT[c.type]}`} />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-zinc-300 truncate">{c.title}</p>
                <p className="text-[9px] text-zinc-600">
                  EP {c.episodeNumber}{c.guest ? ` · ${c.guest}` : ""}
                </p>
              </div>
              <ScoreRing score={c.viralityScore} size={28} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
