import { Clip, DEMO_CLIPS } from "./clips";

export interface Campaign {
  id: string;
  name: string;
  description: string;
  source: string;
  creator: string;
  status: "active" | "completed" | "draft";
  createdAt: string;
  clipCount: number;
  reviewedCount: number;
  shippedCount: number;
  platforms: string[];
  tags: string[];
  // STUB: taste profile, agent config, schedule
}

export interface CampaignWithClips extends Campaign {
  clips: Clip[];
}

export const DEMO_CAMPAIGNS: CampaignWithClips[] = [
  {
    id: "campaign-mob-archive",
    name: "Moon or Bust Archive",
    description: "Full clip extraction from the Moon or Bust podcast archive. 102 episodes, 20 extracted so far. The original Benzinga crypto show — raw, unfiltered, peak 2021-2022 energy.",
    source: "Moon or Bust (Benzinga)",
    creator: "Logan Ross",
    status: "active",
    createdAt: "2026-03-08",
    clipCount: DEMO_CLIPS.length,
    reviewedCount: 0,
    shippedCount: 0,
    platforms: ["TikTok", "IG Reels", "YT Shorts", "X", "LinkedIn"],
    tags: ["crypto", "podcast", "archive", "web3"],
    clips: DEMO_CLIPS,
  },
  {
    id: "campaign-birbathon",
    name: "Birbathon 24hr Stream",
    description: "Pax and Spencer went 24 hours straight for the $BIRB token launch on Solana. Featured live on Solana's homepage. LucaNetz (Pudgy Penguins) pulled up. The stream ended with Pax declaring 'sleepathon is over.' Clip extraction pending — source VODs on X Broadcasts and Twitch.",
    source: "Birbathon (X Broadcasts + Twitch)",
    creator: "Paxton Ross (@birbpax)",
    status: "draft",
    createdAt: "2026-01-24",
    clipCount: 0,
    reviewedCount: 0,
    shippedCount: 0,
    platforms: ["TikTok", "IG Reels", "YT Shorts", "X"],
    tags: ["Moonbirds", "$BIRB", "Solana", "livestream", "24hr"],
    clips: [],
  },
  {
    id: "campaign-w3a",
    name: "Web3 Anarchy Highlights",
    description: "Best moments from Benzinga's Web3 Anarchy show. Logan co-hosted 6+ episodes with guests including Jordan Belfort, illmind, and Erika Alexander.",
    source: "Web3 Anarchy (Benzinga)",
    creator: "Logan Ross",
    status: "draft",
    createdAt: "2026-03-08",
    clipCount: 0,
    reviewedCount: 0,
    shippedCount: 0,
    platforms: ["TikTok", "IG Reels", "YT Shorts", "X"],
    tags: ["web3", "podcast", "interviews"],
    clips: [],
  },
  {
    id: "campaign-best-of",
    name: "Best of Logan — Greatest Hits",
    description: "The highest-scoring clips across all campaigns. Auto-populated from shipped clips with virality score 8.5+. The cream rises.",
    source: "All Sources",
    creator: "Logan Ross",
    status: "draft",
    createdAt: "2026-03-08",
    clipCount: 0,
    reviewedCount: 0,
    shippedCount: 0,
    platforms: ["TikTok", "IG Reels", "YT Shorts", "X", "LinkedIn"],
    tags: ["highlights", "best-of", "cross-campaign"],
    clips: [],
  },
];
