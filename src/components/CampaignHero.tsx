"use client";

import { CampaignWithClips } from "@/lib/campaigns";
import { ScoreRing } from "./ClipCard";

interface CampaignHeroProps {
  campaign: CampaignWithClips;
  onStartSession: () => void;
  onBack: () => void;
  layout: "mobile" | "desktop";
}

const TYPE_LABELS: Record<string, string> = {
  hot_take: "Hot Takes",
  insight: "Insights",
  funny: "Comedy",
  breaking_news: "Breaking News",
  guest_highlight: "Guest Moments",
  education: "Education",
};

const TYPE_COLORS: Record<string, string> = {
  hot_take: "bg-red-500/15 text-red-400 border-red-500/20",
  insight: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  funny: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  breaking_news: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  guest_highlight: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  education: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
};

export function CampaignHero({ campaign, onStartSession, onBack, layout }: CampaignHeroProps) {
  const clips = campaign.clips;
  const avgScore = clips.length > 0
    ? clips.reduce((s, c) => s + c.viralityScore, 0) / clips.length
    : 0;

  // Compute breakdowns
  const typeBreakdown = clips.reduce((acc, c) => {
    acc[c.type] = (acc[c.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const energyBreakdown = clips.reduce((acc, c) => {
    acc[c.energy] = (acc[c.energy] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const uniqueGuests = [...new Set(clips.filter((c) => c.guest).map((c) => c.guest!))];
  const uniqueEpisodes = [...new Set(clips.map((c) => c.episodeNumber))];
  const dateRange = clips.length > 0
    ? `${clips.reduce((min, c) => c.date < min ? c.date : min, clips[0].date)} — ${clips.reduce((max, c) => c.date > max ? c.date : max, clips[0].date)}`
    : "";

  const topClips = [...clips].sort((a, b) => b.viralityScore - a.viralityScore).slice(0, 3);

  // Open questions for the curator
  const openQuestions = [
    "Which clips aged well vs. aged like milk? Mark them differently.",
    "Should 2021 bull market clips be framed as nostalgia or education?",
    "Guest clips vs. solo Logan — which convert better per platform?",
    "Do hot takes or insights drive more engagement on short-form?",
    "What's the ideal clip length per platform? (TikTok vs. YT Shorts vs. Reels)",
    "Should bearish/warning clips be published in a bull market?",
  ];

  if (layout === "desktop") {
    return (
      <div className="h-dvh flex flex-col">
        <header className="flex items-center justify-between px-8 pt-6 pb-4 border-b border-[#1a1a1a]">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">CURATE</h1>
              <p className="text-xs text-zinc-500">campaign briefing</p>
            </div>
          </div>
          <button
            onClick={onStartSession}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-colors glow-pulse"
          >
            Start Curation →
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-8 py-8">
            {/* Hero section */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-green-500/15 text-green-400">
                  ACTIVE
                </span>
                <span className="text-[10px] text-zinc-600 font-mono">{campaign.source}</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-3">{campaign.name}</h2>
              <p className="text-base text-zinc-400 leading-relaxed max-w-2xl">{campaign.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Left column: Stats + Intel */}
              <div className="col-span-2 space-y-6">
                {/* Quick stats */}
                <div className="grid grid-cols-5 gap-3">
                  <StatCard label="clips" value={clips.length.toString()} />
                  <StatCard label="episodes" value={uniqueEpisodes.length.toString()} />
                  <StatCard label="guests" value={uniqueGuests.length.toString()} />
                  <StatCard label="avg score" value={avgScore.toFixed(1)} color="text-indigo-400" />
                  <StatCard label="date range" value={dateRange.split(" — ")[0]?.slice(0, 7) || "—"} small />
                </div>

                {/* Content mix */}
                <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-5">
                  <h3 className="text-xs font-mono text-zinc-500 mb-4 tracking-wider">CONTENT MIX</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(typeBreakdown)
                      .sort(([, a], [, b]) => b - a)
                      .map(([type, count]) => (
                        <div
                          key={type}
                          className={`rounded-lg border px-3 py-2.5 ${TYPE_COLORS[type] || "bg-zinc-800 text-zinc-400 border-zinc-700"}`}
                        >
                          <p className="text-lg font-bold">{count}</p>
                          <p className="text-[10px] opacity-80">{TYPE_LABELS[type] || type}</p>
                        </div>
                      ))}
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-xs font-mono text-zinc-500">
                    <span>Energy: {energyBreakdown.high || 0} high · {energyBreakdown.medium || 0} med · {energyBreakdown.low || 0} low</span>
                  </div>
                </div>

                {/* Top clips preview */}
                <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-5">
                  <h3 className="text-xs font-mono text-zinc-500 mb-4 tracking-wider">TOP CLIPS BY SCORE</h3>
                  <div className="space-y-3">
                    {topClips.map((clip, i) => (
                      <div key={clip.id} className="flex items-center gap-3">
                        <span className="text-xs text-zinc-600 font-mono w-4">{i + 1}</span>
                        <ScoreRing score={clip.viralityScore} size={32} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{clip.title}</p>
                          <p className="text-[11px] text-zinc-500 truncate">{clip.hook}</p>
                        </div>
                        <span className="text-[10px] text-zinc-600 font-mono">EP {clip.episodeNumber}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guest roster */}
                {uniqueGuests.length > 0 && (
                  <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-5">
                    <h3 className="text-xs font-mono text-zinc-500 mb-4 tracking-wider">GUEST ROSTER</h3>
                    <div className="flex flex-wrap gap-2">
                      {uniqueGuests.map((guest) => (
                        <span
                          key={guest}
                          className="text-xs bg-indigo-500/10 text-indigo-400 px-3 py-1.5 rounded-full"
                        >
                          {guest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right column: Open questions + context */}
              <div className="space-y-6">
                {/* Platforms */}
                <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-5">
                  <h3 className="text-xs font-mono text-zinc-500 mb-3 tracking-wider">TARGET PLATFORMS</h3>
                  <div className="space-y-2">
                    {campaign.platforms.map((p) => (
                      <div key={p} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        <span className="text-zinc-300">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Open questions */}
                <div className="bg-[#141414] border border-amber-500/20 rounded-xl p-5">
                  <h3 className="text-xs font-mono text-amber-400 mb-3 tracking-wider">OPEN QUESTIONS</h3>
                  <div className="space-y-3">
                    {openQuestions.map((q, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-[10px] text-amber-500/50 font-mono mt-0.5">{i + 1}</span>
                        <p className="text-xs text-zinc-400 leading-relaxed">{q}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Context note */}
                <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-5">
                  <h3 className="text-xs font-mono text-zinc-500 mb-3 tracking-wider">CONTEXT</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Moon or Bust ran from May 2021 to July 2022 — the full arc of the bull run and into the crash.
                    You lived this. These clips are time capsules of your raw reactions, guest interviews, and market calls.
                    Some aged like wine, some like milk. Your job: find the ones that still hit.
                  </p>
                  <p className="text-xs text-zinc-500 leading-relaxed mt-3">
                    Every clip has been scored by AI. But AI doesn't know what ships — you do.
                    The score is a starting point. Your taste is the filter.
                  </p>
                </div>

                {/* Start button (bottom of sidebar) */}
                {clips.length > 0 ? (
                  <button
                    onClick={onStartSession}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors text-sm glow-pulse"
                  >
                    Begin Curation Session
                  </button>
                ) : (
                  <div className="border border-dashed border-zinc-700 rounded-xl p-4 text-center">
                    <p className="text-xs text-zinc-500 font-mono">clips pending extraction</p>
                    <p className="text-[10px] text-zinc-600 mt-1">source material identified — awaiting processing</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mobile hero
  return (
    <div className="h-dvh flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-5 pb-3">
        <button onClick={onBack} className="text-zinc-500 hover:text-zinc-300 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-semibold tracking-tight">CURATE</h1>
          <p className="text-xs text-zinc-500">campaign briefing</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {/* Hero */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-400">
              ACTIVE
            </span>
            <span className="text-[10px] text-zinc-600 font-mono">{campaign.source}</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">{campaign.name}</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">{campaign.description}</p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <StatCard label="clips" value={clips.length.toString()} />
          <StatCard label="episodes" value={uniqueEpisodes.length.toString()} />
          <StatCard label="guests" value={uniqueGuests.length.toString()} />
          <StatCard label="avg" value={avgScore.toFixed(1)} color="text-indigo-400" />
        </div>

        {/* Content mix (compact) */}
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-4 mb-4">
          <h3 className="text-[10px] font-mono text-zinc-500 mb-3 tracking-wider">CONTENT MIX</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(typeBreakdown)
              .sort(([, a], [, b]) => b - a)
              .map(([type, count]) => (
                <span
                  key={type}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border ${TYPE_COLORS[type] || "bg-zinc-800 text-zinc-400 border-zinc-700"}`}
                >
                  {count} {TYPE_LABELS[type] || type}
                </span>
              ))}
          </div>
        </div>

        {/* Top clips */}
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-4 mb-4">
          <h3 className="text-[10px] font-mono text-zinc-500 mb-3 tracking-wider">TOP 3 BY SCORE</h3>
          <div className="space-y-2.5">
            {topClips.map((clip) => (
              <div key={clip.id} className="flex items-center gap-2.5">
                <ScoreRing score={clip.viralityScore} size={28} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{clip.title}</p>
                  <p className="text-[10px] text-zinc-500 truncate">{clip.hook}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Context */}
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-4 mb-4">
          <h3 className="text-[10px] font-mono text-zinc-500 mb-2 tracking-wider">CONTEXT</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Moon or Bust ran May 2021 – July 2022. The full bull run arc. These are time capsules — raw reactions, guest interviews, market calls. Some aged like wine, some like milk. Find the ones that still hit.
          </p>
          <p className="text-[11px] text-zinc-500 leading-relaxed mt-2">
            AI scored everything. But AI doesn't know what ships — you do.
          </p>
        </div>

        {/* Open questions */}
        <div className="bg-[#141414] border border-amber-500/20 rounded-xl p-4 mb-6">
          <h3 className="text-[10px] font-mono text-amber-400 mb-3 tracking-wider">OPEN QUESTIONS</h3>
          <div className="space-y-2">
            {openQuestions.slice(0, 4).map((q, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-[9px] text-amber-500/40 font-mono mt-0.5">{i + 1}</span>
                <p className="text-[11px] text-zinc-400 leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guests */}
        {uniqueGuests.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[10px] font-mono text-zinc-500 mb-2 tracking-wider">GUESTS</h3>
            <div className="flex flex-wrap gap-1.5">
              {uniqueGuests.map((g) => (
                <span key={g} className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded-full">
                  {g}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Start */}
        {clips.length > 0 ? (
          <button
            onClick={onStartSession}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors glow-pulse"
          >
            Start Curation →
          </button>
        ) : (
          <div className="border border-dashed border-zinc-700 rounded-xl p-4 text-center">
            <p className="text-sm text-zinc-500 font-mono">clips pending extraction</p>
            <p className="text-[10px] text-zinc-600 mt-1">source material identified — awaiting processing</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color, small }: { label: string; value: string; color?: string; small?: boolean }) {
  return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-3 text-center">
      <p className={`font-bold ${color || "text-white"} ${small ? "text-sm" : "text-xl"}`}>{value}</p>
      <p className="text-[9px] text-zinc-600 mt-0.5">{label}</p>
    </div>
  );
}
