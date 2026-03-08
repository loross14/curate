import { Clip } from "./clips";

export interface GuestProfile {
  name: string;
  tier: "S" | "A" | "B" | "C";
  episode: string;
  score: string;
  why: string;
  topHooks: string[];
  platformScores?: Record<string, number>;
}

export interface ContentPillar {
  name: string;
  slug: string;
  description: string;
  estimatedClips: string;
  bestPlatforms: string[];
}

export interface HistoricalMoment {
  event: string;
  date: string;
  episodeWindow: string;
  angle: string;
}

export interface CampaignStrategy {
  guests: GuestProfile[];
  pillars: ContentPillar[];
  moments: HistoricalMoment[];
  yieldEstimate: {
    totalRaw: number;
    totalPublishable: number;
    bangers: number;
    runway: string;
  };
  formats: { name: string; description: string }[];
}

export interface Campaign {
  id: string;
  slug: string;
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
  strategy?: CampaignStrategy;
}

export interface CampaignWithClips extends Campaign {
  clips: Clip[];
}

