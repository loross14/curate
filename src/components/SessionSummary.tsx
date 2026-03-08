"use client";

import { Clip } from "@/lib/clips";
import { calculateAverageScore, countPlatforms } from "@/lib/utils";

interface SessionSummaryProps {
  shipped: Clip[];
  skipped: Clip[];
  campaignName?: string;
  onNewSession?: () => void;
  onBackToCampaign?: () => void;
  onBackToDashboard?: () => void;
}

export function SessionSummary({ shipped, skipped, campaignName, onNewSession, onBackToCampaign, onBackToDashboard }: SessionSummaryProps) {
  const avgScore = calculateAverageScore(shipped);
  const total = shipped.length + skipped.length;
  const shipRate = total > 0 ? Math.round((shipped.length / total) * 100) : 0;
  const platformCounts = countPlatforms(shipped);

  return (
    <div className="h-dvh flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold tracking-tight mb-1">session complete</h1>
        {campaignName && (
          <p className="text-xs text-zinc-500 font-mono mb-1">{campaignName}</p>
        )}
        <p className="text-sm text-zinc-500 mb-8">
          the 3% is done. the other 97% ships itself.
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-green-400">{shipped.length}</p>
            <p className="text-xs text-zinc-500 mt-1">shipped</p>
          </div>
          <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-red-400">{skipped.length}</p>
            <p className="text-xs text-zinc-500 mt-1">skipped</p>
          </div>
          <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-indigo-400">{avgScore.toFixed(1)}</p>
            <p className="text-xs text-zinc-500 mt-1">avg score</p>
          </div>
          <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-amber-400">{shipRate}%</p>
            <p className="text-xs text-zinc-500 mt-1">ship rate</p>
          </div>
        </div>

        {/* Shipped clips */}
        {shipped.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-medium text-zinc-400 mb-3">shipping queue</h2>
            <div className="space-y-2">
              {shipped.map((clip) => (
                <div
                  key={clip.id}
                  className="flex items-center gap-3 bg-[#141414] border border-[#2a2a2a] rounded-lg px-4 py-3"
                >
                  <span className="text-green-400 text-lg">→</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{clip.title}</p>
                    <p className="text-[11px] text-zinc-500">
                      {clip.platforms.join(" · ")}
                    </p>
                  </div>
                  <span className="text-sm font-mono text-zinc-400">
                    {clip.viralityScore.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Platform distribution */}
        {Object.keys(platformCounts).length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-medium text-zinc-400 mb-3">platform distribution</h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(platformCounts)
                .sort(([, a], [, b]) => b - a)
                .map(([platform, count]) => (
                  <span
                    key={platform}
                    className="text-xs bg-indigo-500/15 text-indigo-400 px-3 py-1.5 rounded-full font-medium"
                  >
                    {platform} ({count})
                  </span>
                ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-6">
          {onNewSession && (
            <button
              onClick={onNewSession}
              className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors"
            >
              run again
            </button>
          )}
          {onBackToCampaign && (
            <button
              onClick={onBackToCampaign}
              className="flex-1 py-3 border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-medium rounded-xl transition-colors"
            >
              campaign
            </button>
          )}
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="py-3 px-4 border border-zinc-800 hover:border-zinc-600 text-zinc-500 rounded-xl transition-colors text-sm"
            >
              all campaigns
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
