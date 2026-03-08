"use client";

import { CampaignWithClips, CampaignStrategy, GuestProfile } from "@/lib/campaigns";
import { CurateLogo } from "./CurateLogo";
import { ScoreRing } from "./ClipCard";

interface CampaignHeroProps {
  campaign: CampaignWithClips;
  onStartSession: () => void;
  onBack: () => void;
  layout: "mobile" | "desktop";
}

const TIER_COLORS: Record<string, string> = {
  S: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  A: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  B: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
  C: "bg-zinc-800 text-zinc-500 border-zinc-700",
};

const TYPE_LABELS: Record<string, string> = {
  hot_take: "Hot Takes", insight: "Insights", funny: "Comedy",
  breaking_news: "Breaking News", guest_highlight: "Guest Moments", education: "Education",
};

const TYPE_COLORS: Record<string, string> = {
  hot_take: "bg-red-500/15 text-red-400 border-red-500/20",
  insight: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  funny: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  breaking_news: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  guest_highlight: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  education: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
};

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-green-500/15 text-green-400",
    draft: "bg-zinc-500/15 text-zinc-400",
    completed: "bg-blue-500/15 text-blue-400",
  };
  return (
    <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full ${styles[status] || styles.draft}`}>
      {status.toUpperCase()}
    </span>
  );
}

function StartOrPending({ clips, onStartSession }: { clips: unknown[]; onStartSession: () => void }) {
  if (clips.length > 0) {
    return (
      <button onClick={onStartSession} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors text-sm glow-pulse">
        Review Clips
      </button>
    );
  }
  return (
    <button disabled className="w-full py-4 bg-zinc-800 text-zinc-500 font-medium rounded-xl text-sm cursor-not-allowed">
      <span className="inline-block animate-pulse">Processing clips…</span>
    </button>
  );
}

// ═══ STRATEGY SECTIONS (shared between desktop/mobile) ═══

function GuestTierList({ guests }: { guests: GuestProfile[] }) {
  const tiers = ["S", "A", "B", "C"] as const;
  return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-5">
      <h3 className="text-xs font-mono text-zinc-500 mb-4 tracking-wider">GUEST TIER LIST</h3>
      <div className="space-y-3">
        {tiers.map((tier) => {
          const tierGuests = guests.filter((g) => g.tier === tier);
          if (tierGuests.length === 0) return null;
          return (
            <div key={tier}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded border ${TIER_COLORS[tier]}`}>
                  {tier}-TIER
                </span>
              </div>
              <div className="space-y-2 ml-1">
                {tierGuests.map((g) => (
                  <div key={g.name} className="border-l-2 border-zinc-800 pl-3">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-medium">{g.name}</p>
                      <span className="text-[9px] text-zinc-600 font-mono">{g.episode}</span>
                      <span className="text-[9px] text-indigo-400 font-mono ml-auto">{g.score}</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-relaxed mb-1.5">{g.why}</p>
                    <div className="flex flex-wrap gap-1">
                      {g.topHooks.slice(0, 2).map((h, i) => (
                        <span key={i} className="text-[10px] bg-zinc-800/80 text-zinc-400 px-2 py-0.5 rounded italic">
                          &ldquo;{h}&rdquo;
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ContentPillars({ pillars }: { pillars: CampaignStrategy["pillars"] }) {
  return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-5">
      <h3 className="text-xs font-mono text-zinc-500 mb-4 tracking-wider">CONTENT PILLARS</h3>
      <div className="grid grid-cols-2 gap-3">
        {pillars.map((p) => (
          <div key={p.slug} className="border border-zinc-800 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold text-zinc-200">{p.name}</p>
              <span className="text-[9px] text-indigo-400 font-mono">{p.estimatedClips} clips</span>
            </div>
            <p className="text-[10px] text-zinc-500 leading-relaxed mb-2">{p.description}</p>
            <div className="flex flex-wrap gap-1">
              {p.bestPlatforms.map((pl) => (
                <span key={pl} className="text-[9px] bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded">{pl}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HistoricalMoments({ moments }: { moments: CampaignStrategy["moments"] }) {
  return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-5">
      <h3 className="text-xs font-mono text-zinc-500 mb-4 tracking-wider">KEY MOMENTS TO MINE</h3>
      <div className="space-y-2">
        {moments.map((m, i) => (
          <div key={i} className="flex items-start gap-3 py-2 border-b border-zinc-800/50 last:border-0">
            <div className="text-right min-w-[70px]">
              <p className="text-[10px] text-zinc-500 font-mono">{m.date}</p>
              <p className="text-[9px] text-zinc-700">{m.episodeWindow}</p>
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-zinc-300">{m.event}</p>
              <p className="text-[10px] text-zinc-500">{m.angle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function YieldEstimate({ yield: y }: { yield: CampaignStrategy["yieldEstimate"] }) {
  return (
    <div className="bg-[#141414] border border-indigo-500/20 rounded-xl p-5">
      <h3 className="text-xs font-mono text-indigo-400 mb-4 tracking-wider">YIELD ESTIMATE</h3>
      <div className="grid grid-cols-4 gap-3 text-center">
        <div>
          <p className="text-xl font-bold text-white">{y.totalRaw}</p>
          <p className="text-[9px] text-zinc-600">raw clips</p>
        </div>
        <div>
          <p className="text-xl font-bold text-green-400">{y.totalPublishable}</p>
          <p className="text-[9px] text-zinc-600">publishable</p>
        </div>
        <div>
          <p className="text-xl font-bold text-amber-400">{y.bangers}</p>
          <p className="text-[9px] text-zinc-600">bangers</p>
        </div>
        <div>
          <p className="text-sm font-bold text-indigo-400">{y.runway}</p>
          <p className="text-[9px] text-zinc-600">runway</p>
        </div>
      </div>
    </div>
  );
}

function Formats({ formats }: { formats: CampaignStrategy["formats"] }) {
  return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-5">
      <h3 className="text-xs font-mono text-zinc-500 mb-3 tracking-wider">CLIP FORMATS</h3>
      <div className="space-y-2">
        {formats.map((f, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-[10px] text-indigo-400 font-mono mt-0.5">{String.fromCharCode(65 + i)}</span>
            <div>
              <p className="text-xs font-medium text-zinc-300">{f.name}</p>
              <p className="text-[10px] text-zinc-500">{f.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══ MAIN COMPONENT ═══

export function CampaignHero({ campaign, onStartSession, onBack, layout }: CampaignHeroProps) {
  const clips = campaign.clips;
  const strategy = campaign.strategy;
  const avgScore = clips.length > 0
    ? clips.reduce((s, c) => s + c.viralityScore, 0) / clips.length : 0;

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
  const topClips = [...clips].sort((a, b) => b.viralityScore - a.viralityScore).slice(0, 3);

  // ═══ DESKTOP ═══
  if (layout === "desktop") {
    return (
      <div className="h-dvh flex flex-col">
        <header className="flex items-center justify-between px-8 pt-6 pb-4 border-b border-[#1a1a1a]">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-zinc-500 hover:text-zinc-300 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div>
              <CurateLogo variant="mark" size="md" />
              <p className="text-xs text-zinc-500">campaign briefing</p>
            </div>
          </div>
          {clips.length > 0 ? (
            <button onClick={onStartSession} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-colors glow-pulse">
              Review Clips →
            </button>
          ) : (
            <button disabled className="px-6 py-2.5 bg-zinc-800 text-zinc-500 text-sm font-medium rounded-xl cursor-not-allowed">
              <span className="animate-pulse">Processing…</span>
            </button>
          )}
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-8 py-8">
            {/* Hero */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <StatusBadge status={campaign.status} />
                <span className="text-[10px] text-zinc-600 font-mono">{campaign.source}</span>
                <span className="text-[10px] text-zinc-700">·</span>
                <span className="text-[10px] text-zinc-600 font-mono">{campaign.creator}</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-3">{campaign.name}</h2>
              <p className="text-base text-zinc-400 leading-relaxed max-w-3xl">{campaign.description}</p>
            </div>

            {/* Stats row (clips data) */}
            {clips.length > 0 && (
              <div className="grid grid-cols-5 gap-3 mb-8">
                <StatCard label="clips" value={clips.length.toString()} />
                <StatCard label="episodes" value={uniqueEpisodes.length.toString()} />
                <StatCard label="guests" value={uniqueGuests.length.toString()} />
                <StatCard label="avg score" value={avgScore.toFixed(1)} color="text-indigo-400" />
                <StatCard label="high energy" value={(energyBreakdown.high || 0).toString()} color="text-green-400" />
              </div>
            )}

            {/* Yield estimate (from strategy) */}
            {strategy && <div className="mb-8"><YieldEstimate yield={strategy.yieldEstimate} /></div>}

            <div className="grid grid-cols-3 gap-6">
              {/* Left 2/3: Strategy content */}
              <div className="col-span-2 space-y-6">
                {/* Guest tier list */}
                {strategy && strategy.guests.length > 0 && (
                  <GuestTierList guests={strategy.guests} />
                )}

                {/* Content pillars */}
                {strategy && strategy.pillars.length > 0 && (
                  <ContentPillars pillars={strategy.pillars} />
                )}

                {/* Content mix from actual clips */}
                {Object.keys(typeBreakdown).length > 0 && (
                  <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-5">
                    <h3 className="text-xs font-mono text-zinc-500 mb-4 tracking-wider">EXTRACTED CLIP MIX</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(typeBreakdown).sort(([, a], [, b]) => b - a).map(([type, count]) => (
                        <div key={type} className={`rounded-lg border px-3 py-2.5 ${TYPE_COLORS[type] || "bg-zinc-800 text-zinc-400 border-zinc-700"}`}>
                          <p className="text-lg font-bold">{count}</p>
                          <p className="text-[10px] opacity-80">{TYPE_LABELS[type] || type}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Top clips */}
                {topClips.length > 0 && (
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
                )}

                {/* Historical moments */}
                {strategy && strategy.moments.length > 0 && (
                  <HistoricalMoments moments={strategy.moments} />
                )}
              </div>

              {/* Right 1/3: Sidebar */}
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

                {/* Formats */}
                {strategy && strategy.formats.length > 0 && (
                  <Formats formats={strategy.formats} />
                )}

                {/* Guest roster from clips (if different from strategy) */}
                {uniqueGuests.length > 0 && (
                  <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-5">
                    <h3 className="text-xs font-mono text-zinc-500 mb-3 tracking-wider">IN EXTRACTED CLIPS</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {uniqueGuests.map((g) => (
                        <span key={g} className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded-full">{g}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-5">
                  <h3 className="text-xs font-mono text-zinc-500 mb-3 tracking-wider">TAGS</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {campaign.tags.map((t) => (
                      <span key={t} className="text-[10px] bg-zinc-800 text-zinc-500 px-2 py-1 rounded">#{t}</span>
                    ))}
                  </div>
                </div>

                {/* Start / Pending */}
                <StartOrPending clips={clips} onStartSession={onStartSession} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═══ MOBILE ═══
  return (
    <div className="h-dvh flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-5 pb-3">
        <button onClick={onBack} className="text-zinc-500 hover:text-zinc-300 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div>
          <CurateLogo variant="mark" size="sm" />
          <p className="text-xs text-zinc-500">campaign briefing</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {/* Hero */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <StatusBadge status={campaign.status} />
            <span className="text-[10px] text-zinc-600 font-mono">{campaign.source}</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">{campaign.name}</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">{campaign.description}</p>
          <p className="text-[11px] text-zinc-600 font-mono mt-2">{campaign.creator}</p>
        </div>

        {/* Yield estimate */}
        {strategy && (
          <div className="mb-4"><YieldEstimate yield={strategy.yieldEstimate} /></div>
        )}

        {/* Quick stats from clips */}
        {clips.length > 0 && (
          <div className="grid grid-cols-4 gap-2 mb-4">
            <StatCard label="clips" value={clips.length.toString()} />
            <StatCard label="episodes" value={uniqueEpisodes.length.toString()} />
            <StatCard label="guests" value={uniqueGuests.length.toString()} />
            <StatCard label="avg" value={avgScore.toFixed(1)} color="text-indigo-400" />
          </div>
        )}

        {/* Guest tier list */}
        {strategy && strategy.guests.length > 0 && (
          <div className="mb-4"><GuestTierList guests={strategy.guests} /></div>
        )}

        {/* Content pillars */}
        {strategy && strategy.pillars.length > 0 && (
          <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-4 mb-4">
            <h3 className="text-[10px] font-mono text-zinc-500 mb-3 tracking-wider">CONTENT PILLARS</h3>
            <div className="space-y-2.5">
              {strategy.pillars.map((p) => (
                <div key={p.slug} className="border-l-2 border-zinc-800 pl-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-zinc-300">{p.name}</p>
                    <span className="text-[9px] text-indigo-400 font-mono">{p.estimatedClips}</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-relaxed mt-0.5">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clip mix */}
        {Object.keys(typeBreakdown).length > 0 && (
          <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-4 mb-4">
            <h3 className="text-[10px] font-mono text-zinc-500 mb-3 tracking-wider">EXTRACTED CLIP MIX</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(typeBreakdown).sort(([, a], [, b]) => b - a).map(([type, count]) => (
                <span key={type} className={`text-[11px] px-2.5 py-1 rounded-lg border ${TYPE_COLORS[type] || "bg-zinc-800 text-zinc-400 border-zinc-700"}`}>
                  {count} {TYPE_LABELS[type] || type}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Top clips */}
        {topClips.length > 0 && (
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
        )}

        {/* Historical moments */}
        {strategy && strategy.moments.length > 0 && (
          <div className="mb-4"><HistoricalMoments moments={strategy.moments} /></div>
        )}

        {/* Formats */}
        {strategy && strategy.formats.length > 0 && (
          <div className="mb-4"><Formats formats={strategy.formats} /></div>
        )}

        {/* Start / Pending */}
        <StartOrPending clips={clips} onStartSession={onStartSession} />
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
