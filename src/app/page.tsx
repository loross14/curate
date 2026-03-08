"use client";

import { DEMO_CAMPAIGNS } from "@/lib/campaigns";
import { CampaignDashboard } from "@/components/CampaignDashboard";
import { useLayout } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { CampaignWithClips } from "@/lib/campaigns";

export default function Home() {
  const layout = useLayout();
  const router = useRouter();

  const handleSelectCampaign = (campaign: CampaignWithClips) => {
    router.push(`/campaigns/${campaign.slug}`);
  };

  return (
    <CampaignDashboard
      campaigns={DEMO_CAMPAIGNS}
      onSelectCampaign={handleSelectCampaign}
      layout={layout}
    />
  );
}
