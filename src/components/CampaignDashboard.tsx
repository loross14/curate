"use client";

import { CampaignWithClips } from "@/lib/campaigns";

interface CampaignDashboardProps {
  campaigns: CampaignWithClips[];
  onSelectCampaign: (campaign: CampaignWithClips) => void;
  layout: "mobile" | "desktop";
}

const STATUS_STYLES: Record<string, string> = {
  active: "bg-green-500/15 text-green-400",
  completed: "bg-blue-500/15 text-blue-400",
  draft: "bg-zinc-500/15 text-zinc-400",
};

export function CampaignDashboard({ campaigns, onSelectCampaign, layout }: CampaignDashboardProps) {
  const activeCampaigns = campaigns.filter((c) => c.status === "active");
  const draftCampaigns = campaigns.filter((c) => c.status === "draft");

  if (layout === "desktop") {
    return (
      <div className="h-dvh flex flex-col">
        <header className="flex items-center justify-between px-8 pt-6 pb-4 border-b border-[#1a1a1a]">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">CURATE</h1>
            <p className="text-xs text-zinc-500">Campaign Creator</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
            <span>{campaigns.length} campaigns</span>
            <span className="text-zinc-700">·</span>
            <span>{campaigns.reduce((s, c) => s + c.clipCount, 0)} total clips</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto">
            {activeCampaigns.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xs font-mono text-zinc-500 mb-4 tracking-wider">ACTIVE CAMPAIGNS</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {activeCampaigns.map((c) => (
                    <CampaignCard key={c.id} campaign={c} onSelect={onSelectCampaign} size="large" />
                  ))}
                </div>
              </div>
            )}

            {draftCampaigns.length > 0 && (
              <div>
                <h2 className="text-xs font-mono text-zinc-500 mb-4 tracking-wider">DRAFTS</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {draftCampaigns.map((c) => (
                    <CampaignCard key={c.id} campaign={c} onSelect={onSelectCampaign} size="small" />
                  ))}
                </div>
              </div>
            )}

            {/* New campaign stub */}
            <button className="mt-6 w-full border border-dashed border-zinc-700 rounded-xl p-6 text-center hover:border-zinc-500 transition-colors group">
              <p className="text-sm text-zinc-600 group-hover:text-zinc-400 font-mono transition-colors">
                + new campaign
              </p>
              <p className="text-[10px] text-zinc-700 group-hover:text-zinc-500 mt-1 transition-colors">
                drop a YouTube playlist, channel, or upload clips
              </p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Mobile
  return (
    <div className="h-dvh flex flex-col">
      <header className="px-5 pt-6 pb-4">
        <h1 className="text-xl font-semibold tracking-tight">CURATE</h1>
        <p className="text-xs text-zinc-500">Campaign Creator</p>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {activeCampaigns.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-mono text-zinc-500 mb-3 tracking-wider">ACTIVE</h2>
            <div className="space-y-3">
              {activeCampaigns.map((c) => (
                <CampaignCard key={c.id} campaign={c} onSelect={onSelectCampaign} size="large" />
              ))}
            </div>
          </div>
        )}

        {draftCampaigns.length > 0 && (
          <div>
            <h2 className="text-xs font-mono text-zinc-500 mb-3 tracking-wider">DRAFTS</h2>
            <div className="space-y-3">
              {draftCampaigns.map((c) => (
                <CampaignCard key={c.id} campaign={c} onSelect={onSelectCampaign} size="small" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CampaignCard({
  campaign,
  onSelect,
  size,
}: {
  campaign: CampaignWithClips;
  onSelect: (c: CampaignWithClips) => void;
  size: "large" | "small";
}) {
  const isActive = campaign.status !== "completed" || campaign.clips.length > 0;
  const typeBreakdown = campaign.clips.reduce((acc, c) => {
    acc[c.type] = (acc[c.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <button
      onClick={() => onSelect(campaign)}
      disabled={!isActive}
      className={`w-full text-left rounded-xl border transition-all ${
        isActive
          ? "bg-[#141414] border-[#2a2a2a] hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 cursor-pointer"
          : "bg-[#0e0e0e] border-[#1a1a1a] opacity-60 cursor-not-allowed"
      } ${size === "large" ? "p-5" : "p-4"}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-semibold tracking-tight truncate ${size === "large" ? "text-base" : "text-sm"}`}>
              {campaign.name}
            </h3>
            <span className={`text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded-full ${STATUS_STYLES[campaign.status]}`}>
              {campaign.status.toUpperCase()}
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 font-mono">{campaign.source}</p>
        </div>
      </div>

      {size === "large" && (
        <>
          <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-2">{campaign.description}</p>

          <div className="flex items-center gap-4 mb-3 text-xs font-mono">
            <span className="text-zinc-400">{campaign.clipCount} clips</span>
            {campaign.reviewedCount > 0 && (
              <>
                <span className="text-zinc-700">·</span>
                <span className="text-green-400">{campaign.shippedCount} shipped</span>
              </>
            )}
          </div>

          {Object.keys(typeBreakdown).length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {Object.entries(typeBreakdown)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([type, count]) => (
                  <span key={type} className="text-[10px] bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded">
                    {type.replace("_", " ")} ({count})
                  </span>
                ))}
            </div>
          )}

          <div className="flex flex-wrap gap-1">
            {campaign.platforms.slice(0, 4).map((p) => (
              <span key={p} className="text-[10px] text-zinc-600">
                {p}
              </span>
            ))}
          </div>
        </>
      )}

      {size === "small" && (
        <p className="text-[11px] text-zinc-500 mt-1 line-clamp-2">{campaign.description}</p>
      )}
    </button>
  );
}
