import type { Metadata } from "next";
import { fetchCampaignMetaBySlug } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const campaign = await fetchCampaignMetaBySlug(slug);

  if (!campaign) {
    return { title: "not found" };
  }

  const clipLabel = campaign.clipCount > 0 ? `${campaign.clipCount} clips` : "clips pending";
  const platformLabel = campaign.platforms.slice(0, 3).join(", ");

  return {
    title: campaign.name.toLowerCase(),
    description: campaign.description,
    openGraph: {
      type: "website",
      title: `${campaign.name.toLowerCase()} — curate`,
      description: campaign.description,
      siteName: "curate",
    },
    twitter: {
      card: "summary_large_image",
      title: `${campaign.name.toLowerCase()} — curate`,
      description: `${campaign.description} | ${clipLabel} → ${platformLabel}`,
    },
  };
}

export default function CampaignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
