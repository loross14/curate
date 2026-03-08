"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CampaignWithClips } from "@/lib/campaigns";
import { CampaignHero } from "@/components/CampaignHero";
import { AuthGuard } from "@/components/AuthGuard";
import { useLayout } from "@/lib/hooks";
import { fetchCampaignBySlug } from "@/lib/data";

export default function CampaignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const layout = useLayout();
  const [campaign, setCampaign] = useState<CampaignWithClips | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaignBySlug(slug).then((data) => {
      setCampaign(data || null);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [slug]);

  if (loading || layout === null) {
    return (
      <div className="h-dvh flex items-center justify-center">
        <p className="text-zinc-500 font-mono text-sm animate-pulse">loading campaign…</p>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="h-dvh flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-500 font-mono text-sm">campaign not found</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 text-xs text-indigo-400 hover:text-indigo-300"
          >
            ← back to dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <CampaignHero
        campaign={campaign}
        onStartSession={() => router.push(`/campaigns/${slug}/review`)}
        onBack={() => router.push("/")}
        layout={layout}
      />
    </AuthGuard>
  );
}
