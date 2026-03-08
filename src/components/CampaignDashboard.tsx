"use client";

import { CampaignWithClips } from "@/lib/campaigns";
import { useAuth } from "@/lib/AuthContext";
import { CurateLogo } from "./CurateLogo";

interface CampaignDashboardProps {
  campaigns: CampaignWithClips[];
  onSelectCampaign: (campaign: CampaignWithClips) => void;
  layout: "mobile" | "desktop";
}

export function CampaignDashboard({ campaigns, onSelectCampaign, layout }: CampaignDashboardProps) {
  const { user, signOut } = useAuth();

  if (layout === "desktop") {
    return (
      <div className="h-dvh flex flex-col">
        <header className="flex items-center justify-between px-8 pt-6 pb-4 border-b border-[#1a1a1a]">
          <CurateLogo variant="full" size="md" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
              <span>{campaigns.length} campaigns</span>
              <span className="text-zinc-700">·</span>
              <span>{campaigns.reduce((s, c) => s + c.clipCount, 0)} total clips</span>
            </div>
            {user && (
              <div className="flex items-center gap-3 pl-4 border-l border-[#1a1a1a]">
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt=""
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-[10px] font-mono text-zinc-300">
                    {(user.user_metadata?.name || user.email || "?")[0].toLowerCase()}
                  </div>
                )}
                <button
                  onClick={signOut}
                  className="text-[11px] font-mono text-zinc-600 hover:text-zinc-400 transition-colors"
                >
                  sign out
                </button>
              </div>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <h2 className="text-xs font-mono text-zinc-500 mb-4 tracking-wider">CAMPAIGNS CURATED</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {campaigns.map((c) => (
                  <CampaignCard key={c.id} campaign={c} onSelect={onSelectCampaign} />
                ))}
              </div>
            </div>

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
      <header className="flex items-center justify-between px-5 pt-6 pb-4">
        <CurateLogo variant="full" size="sm" />
        {user && (
          <div className="flex items-center gap-2">
            {user.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt=""
                className="w-6 h-6 rounded-full"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-[10px] font-mono text-zinc-300">
                {(user.user_metadata?.name || user.email || "?")[0].toLowerCase()}
              </div>
            )}
            <button
              onClick={signOut}
              className="text-[11px] font-mono text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              sign out
            </button>
          </div>
        )}
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <h2 className="text-xs font-mono text-zinc-500 mb-3 tracking-wider">CAMPAIGNS CURATED</h2>
        <div className="space-y-3">
          {campaigns.map((c) => (
            <CampaignCard key={c.id} campaign={c} onSelect={onSelectCampaign} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CampaignCard({
  campaign,
  onSelect,
}: {
  campaign: CampaignWithClips;
  onSelect: (c: CampaignWithClips) => void;
}) {
  return (
    <button
      onClick={() => onSelect(campaign)}
      className="w-full text-left rounded-xl bg-[#141414] border border-[#2a2a2a] hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 transition-all p-5 cursor-pointer"
    >
      <h3 className="font-semibold tracking-tight text-base mb-1">
        {campaign.name}
      </h3>
      <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mb-4">{campaign.description}</p>
      <span className="text-xs font-mono text-indigo-400">view campaign →</span>
    </button>
  );
}
