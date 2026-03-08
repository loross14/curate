import { supabase } from "./supabase";
import { Campaign, CampaignWithClips, CampaignStrategy } from "./campaigns";
import { Clip } from "./clips";
import { DEMO_CAMPAIGNS } from "./campaigns";

// ── Row → App type mappers ──

function mapCampaignRow(row: Record<string, unknown>): Campaign {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    description: (row.description as string) || "",
    source: (row.source_label as string) || "",
    creator: (row.creator as string) || "",
    status: row.status as Campaign["status"],
    createdAt: (row.created_at as string) || "",
    clipCount: (row.clip_count as number) || 0,
    reviewedCount: (row.reviewed_count as number) || 0,
    shippedCount: (row.shipped_count as number) || 0,
    platforms: (row.platforms as string[]) || [],
    tags: (row.tags as string[]) || [],
    strategy: row.strategy as CampaignStrategy | undefined,
  };
}

function mapClipRow(row: Record<string, unknown>, source?: Record<string, unknown>): Clip {
  const youtubeId = source
    ? ((source.metadata as Record<string, unknown>)?.youtube_id as string) || ""
    : "";
  return {
    id: row.id as string,
    title: row.title as string,
    hook: (row.hook as string) || "",
    episode: (row.episode_title as string) || "",
    episodeNumber: (row.episode_number as number) || 0,
    guest: (row.guest_name as string) || undefined,
    guestTitle: (row.guest_title as string) || undefined,
    date: (row.episode_date as string) || "",
    youtubeId,
    startSeconds: Number(row.start_seconds) || 0,
    endSeconds: Number(row.end_seconds) || 0,
    viralityScore: Number(row.virality_score) || 0,
    energy: (row.energy as Clip["energy"]) || "medium",
    type: (row.type as Clip["type"]) || "insight",
    platforms: (row.platforms as string[]) || [],
    tags: (row.tags as string[]) || [],
    sentiment: (row.sentiment as Clip["sentiment"]) || "neutral",
  };
}

// ── Queries ──

export async function fetchCampaigns(): Promise<CampaignWithClips[]> {
  const { data: campaigns, error } = await supabase
    .from("campaigns")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !campaigns) {
    console.error("Failed to fetch campaigns, using demo data:", error);
    return DEMO_CAMPAIGNS;
  }

  // For each campaign, fetch its clips
  const results: CampaignWithClips[] = [];
  for (const row of campaigns) {
    const mapped = mapCampaignRow(row);
    const clips = await fetchClipsForCampaign(row.id);
    results.push({ ...mapped, clips });
  }

  return results.length > 0 ? results : DEMO_CAMPAIGNS;
}

export async function fetchCampaignBySlug(slug: string): Promise<CampaignWithClips | undefined> {
  const { data: row, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !row) {
    console.error("Failed to fetch campaign by slug, using demo:", error);
    return DEMO_CAMPAIGNS.find((c) => c.slug === slug);
  }

  const campaign = mapCampaignRow(row);
  const clips = await fetchClipsForCampaign(row.id);
  return { ...campaign, clips };
}

// Lightweight fetch for metadata (no clips needed)
export async function fetchCampaignMetaBySlug(slug: string): Promise<Campaign | undefined> {
  const { data: row, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !row) {
    const demo = DEMO_CAMPAIGNS.find((c) => c.slug === slug);
    return demo ? { ...demo } : undefined;
  }

  return mapCampaignRow(row);
}

async function fetchClipsForCampaign(campaignId: string): Promise<Clip[]> {
  const { data: clipRows, error } = await supabase
    .from("clips")
    .select("*, sources(metadata)")
    .eq("campaign_id", campaignId)
    .order("virality_score", { ascending: false });

  if (error || !clipRows) {
    return [];
  }

  return clipRows.map((row: Record<string, unknown>) =>
    mapClipRow(row, row.sources as Record<string, unknown> | undefined)
  );
}
