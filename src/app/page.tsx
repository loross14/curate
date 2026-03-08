"use client";

import { useEffect, useState } from "react";
import { CampaignWithClips } from "@/lib/campaigns";
import { CampaignDashboard } from "@/components/CampaignDashboard";
import { useLayout } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { fetchCampaigns } from "@/lib/data";

export default function Home() {
  const layout = useLayout();
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<CampaignWithClips[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaigns().then((data) => {
      setCampaigns(data);
      setLoading(false);
    });
  }, []);

  const handleSelectCampaign = (campaign: CampaignWithClips) => {
    router.push(`/campaigns/${campaign.slug}`);
  };

  if (loading) {
    return (
      <div className="h-dvh flex items-center justify-center">
        <p className="text-zinc-500 font-mono text-sm animate-pulse">loading campaigns…</p>
      </div>
    );
  }

  return (
    <CampaignDashboard
      campaigns={campaigns}
      onSelectCampaign={handleSelectCampaign}
      layout={layout}
    />
  );
}
