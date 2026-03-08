import { Clip, DEMO_CLIPS } from "./clips";

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

const MOB_STRATEGY: CampaignStrategy = {
  guests: [
    {
      name: "Brett Johnson",
      tier: "S",
      episode: "Ep 92",
      score: "10/10",
      why: "FBI Most Wanted → security consultant. True crime + crypto + redemption = content trinity. Largest audience expansion potential.",
      topHooks: [
        "The Original Internet Godfather",
        "I built the dark web before Silk Road",
        "How I cashed out crypto as a fugitive",
        "The LinkedIn message to the FBI agent who caught me",
      ],
    },
    {
      name: "Billy Markus",
      tier: "S",
      episode: "Ep 20",
      score: "9/10",
      why: "Created an $80B cryptocurrency in 2 hours. Sold his stake for a Honda Civic. The anti-crypto-bro.",
      topHooks: [
        "I sold Dogecoin for a Honda Civic",
        "I built it in two hours — most of that was adding Comic Sans",
        "Crypto is a rigged casino (from the Doge creator)",
        "Elon offered me a government job",
      ],
    },
    {
      name: "Tim Draper",
      tier: "S",
      episode: "Ep 18, 30",
      score: "8/10",
      why: "Third-generation VC. Bought 29,657 BTC from the Silk Road FBI auction for $19M. Still predicting $250K.",
      topHooks: [
        "I bought 30,000 Bitcoin from the FBI",
        "$250K Bitcoin (with outcome overlay)",
        "When I would sell Bitcoin: never",
      ],
    },
    {
      name: "Austin Virts",
      tier: "A",
      episode: "Ep 80",
      score: "7.5/10",
      why: "TikTok's first crypto music partner. A clip about TikTok integration posted ON TikTok = meta-hook.",
      topHooks: [
        "We got TikTok to partner with a crypto company",
        "TikTok's first music partner wasn't Spotify — it was a crypto startup",
      ],
    },
    {
      name: "Brantly.eth",
      tier: "A",
      episode: "Ep 69",
      score: "6.5/10",
      why: "ENS director championing decentralized identity — days before being fired by the DAO he helped build. Historical primary source.",
      topHooks: [
        "This interview was recorded right before he got fired by a DAO",
        "Can a DAO fire you for your beliefs?",
        "He built the identity layer for Ethereum — then lost his own identity in it",
      ],
    },
    {
      name: "Mike Demarais",
      tier: "A",
      episode: "Ep 56",
      score: "7/10",
      why: "Rainbow Wallet co-founder. The $12 Unisocks → $90K story. Builder-narrator archetype.",
      topHooks: [
        "The $12 socks that became worth $90,000",
        "Why every crypto wallet is designed wrong",
        "Alexis Ohanian funded a wallet because of this design philosophy",
      ],
    },
    {
      name: "Arthur Brock",
      tier: "A",
      episode: "Ep 70",
      score: "7/10",
      why: "Holochain co-founder. AI + Comparative Religion background. Deepest contrarian thesis on the show.",
      topHooks: [
        "Blockchain is fundamentally flawed. Here's what should replace it",
        "Your body doesn't use a blockchain. Neither should the internet",
      ],
    },
  ],
  pillars: [
    {
      name: "Aged Like Milk",
      slug: "aged-milk",
      description: "Failed predictions & peak euphoria. The #1 pillar. Crypto 2021-22 is the richest vein in media history for bad takes.",
      estimatedClips: "30-50",
      bestPlatforms: ["TikTok", "IG Reels", "YT Shorts"],
    },
    {
      name: "Aged Like Wine",
      slug: "aged-wine",
      description: "Calls that were right. Crash warnings that materialized. Stablecoin risk discussions pre-Terra. The credibility builder.",
      estimatedClips: "15-25",
      bestPlatforms: ["LinkedIn", "X", "YT Shorts"],
    },
    {
      name: "Crypto History Class",
      slug: "history",
      description: "DeFi mechanics, NFT culture, DAO governance explained at the moment they mattered. Primary source framing.",
      estimatedClips: "20-30",
      bestPlatforms: ["YT Shorts", "LinkedIn", "X"],
    },
    {
      name: "Builder Stories",
      slug: "builders",
      description: "Founder interviews that hold up. Origin stories from survivors become 'I was there' content.",
      estimatedClips: "20-30",
      bestPlatforms: ["LinkedIn", "YT Shorts", "X"],
    },
    {
      name: "Breaking News Time Capsules",
      slug: "time-capsules",
      description: "Live reactions to El Salvador, China bans, Terra collapse, Celsius freeze. Raw, timestamped, unfiltered.",
      estimatedClips: "15-20",
      bestPlatforms: ["X", "TikTok", "YT Shorts"],
    },
    {
      name: "The Vibe",
      slug: "vibe",
      description: "Meme coins, NFT drops, wagmi/ngmi culture. The language and energy of peak crypto. Pure nostalgia.",
      estimatedClips: "15-20",
      bestPlatforms: ["TikTok", "IG Reels", "X"],
    },
  ],
  moments: [
    { event: "Bitcoin ATH $69K", date: "Nov 10, 2021", episodeWindow: "Eps 46-50", angle: "What was the mood at the literal top?" },
    { event: "El Salvador BTC adoption", date: "Sep 7, 2021", episodeWindow: "Eps 31-34", angle: "Nation-state adoption euphoria" },
    { event: "Terra Luna collapse", date: "May 9-12, 2022", episodeWindow: "Eps 90-91", angle: "Pre-collapse optimism OR real-time reaction" },
    { event: "Celsius freeze", date: "Jun 12, 2022", episodeWindow: "Ep ~96", angle: "Any prior Celsius discussion = retrospective gold" },
    { event: "China crypto ban (Nth time)", date: "Sep 2021", episodeWindow: "Eps 34-37", angle: "Evergreen meme material" },
    { event: "BitBoy at peak influence", date: "Sep 2021", episodeWindow: "Ep 38", angle: "2 years before arrest, at maximum influence" },
    { event: "Brantly.eth fired by DAO", date: "Feb 2022", episodeWindow: "Ep 69", angle: "Interview during the exact controversy window" },
    { event: "Bitcoin Futures ETF approved", date: "Oct 2021", episodeWindow: "Ep 47", angle: "First-ever BTC ETF — the moment that changed everything" },
  ],
  yieldEstimate: {
    totalRaw: 490,
    totalPublishable: 160,
    bangers: 16,
    runway: "3-6+ months daily posting",
  },
  formats: [
    { name: "Split Screen — Then vs Now", description: "Show the clip, overlay what happened. 'Bitcoin was $65K when this was recorded. It dropped to $16K within 8 months.'" },
    { name: "They Tried to Tell Us", description: "Clips where someone warned about exactly what happened. Less viral, more shareable by crypto-educated audiences." },
    { name: "Time Capsule", description: "No commentary. Just the raw clip with a date stamp. Let the audience provide context." },
  ],
};

export const DEMO_CAMPAIGNS: CampaignWithClips[] = [
  {
    id: "campaign-mob-archive",
    slug: "mob-archive",
    name: "Moon or Bust Archive",
    description: "102 episodes of Benzinga's flagship crypto show, May 2021 – July 2022. The full arc of the bull run and into the crash. Co-hosted by Logan Ross, Ryan McNamara, and Brian Moir.",
    source: "Moon or Bust (Benzinga)",
    creator: "Logan Ross",
    status: "active",
    createdAt: "2026-03-08",
    clipCount: DEMO_CLIPS.length,
    reviewedCount: 0,
    shippedCount: 0,
    platforms: ["TikTok", "IG Reels", "YT Shorts", "X", "LinkedIn", "FB Reels"],
    tags: ["crypto", "podcast", "archive", "web3"],
    clips: DEMO_CLIPS,
    strategy: MOB_STRATEGY,
  },
  {
    id: "campaign-birbathon",
    slug: "birbathon",
    name: "Birbathon 24hr Stream",
    description: "Pax and Spencer went 24 hours straight for the $BIRB token launch on Solana. Featured live on Solana's homepage. LucaNetz (Pudgy Penguins) pulled up. The stream ended with Pax declaring 'sleepathon is over.'",
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
    strategy: {
      guests: [
        {
          name: "LucaNetz",
          tier: "S",
          episode: "Guest appearance",
          score: "9/10",
          why: "Pudgy Penguins founder. Built a top-5 NFT project into a mainstream IP with Walmart toys. His pull-up on stream = instant credibility + audience crossover.",
          topHooks: [
            "The Pudgy Penguins founder crashed a 24-hour livestream",
            "From NFT project to Walmart shelves — LucaNetz explains",
          ],
        },
        {
          name: "Spencer Gordon-Sand",
          tier: "A",
          episode: "Co-host (full 24hr)",
          score: "8/10",
          why: "Acquired and revived Moonbirds. The guy who bought a dead blue-chip NFT project and bet his career on resurrecting it. 24 hours of raw strategy and sleep deprivation.",
          topHooks: [
            "He bought a dead NFT project and turned it into a Solana token",
            "Hour 20 of 24: Spencer's still talking tokenomics",
          ],
        },
        {
          name: "Paxton Ross",
          tier: "S",
          episode: "Host (full 24hr)",
          score: "9/10",
          why: "Chief Intern Officer at Moonbirds. Went from TheRossFilms childhood YouTube to hosting a 24-hour stream featured on Solana's homepage. The main character.",
          topHooks: [
            "From childhood YouTube star to 24-hour crypto marathon host",
            "'Sleepathon is over. The birbing continues.'",
            "Hour 24: still going, still shipping",
          ],
        },
      ],
      pillars: [
        {
          name: "The Marathon",
          slug: "marathon",
          description: "Raw endurance content. Sleep deprivation hits, second winds, the 3 AM energy shift. The human drama of going 24 hours straight.",
          estimatedClips: "8-12",
          bestPlatforms: ["TikTok", "IG Reels", "YT Shorts"],
        },
        {
          name: "Token Launch Intel",
          slug: "launch",
          description: "$BIRB tokenomics, Solana strategy, migration from Ethereum, community governance. The business behind the stream.",
          estimatedClips: "6-10",
          bestPlatforms: ["X", "LinkedIn", "YT Shorts"],
        },
        {
          name: "Guest Moments",
          slug: "guests",
          description: "LucaNetz pull-up, community call-ins, surprise appearances. The moments that broke the internet in real-time.",
          estimatedClips: "5-8",
          bestPlatforms: ["TikTok", "X", "YT Shorts"],
        },
        {
          name: "Community & Culture",
          slug: "community",
          description: "Moonbirds community energy, birb box openings, merch reveals, governance discussions. The tribe showing up.",
          estimatedClips: "5-8",
          bestPlatforms: ["X", "TikTok", "IG Reels"],
        },
      ],
      moments: [
        { event: "Stream goes live on Solana homepage", date: "Jan 22, 2026", episodeWindow: "Hour 0", angle: "Featured on Solana's actual homepage — institutional validation of a community stream" },
        { event: "LucaNetz joins the stream", date: "Jan 23, 2026", episodeWindow: "Mid-stream", angle: "Pudgy Penguins founder pulls up — crossover moment" },
        { event: "3 AM energy shift", date: "Jan 23, 2026", episodeWindow: "Hour 8-10", angle: "Sleep deprivation content — raw, unfiltered, human" },
        { event: "$BIRB token launch", date: "Jan 28, 2026", episodeWindow: "Post-stream", angle: "Everything the stream was building toward" },
        { event: "'Sleepathon is over'", date: "Jan 24, 2026", episodeWindow: "Hour 24+", angle: "The iconic sign-off. Pax declares victory." },
      ],
      yieldEstimate: {
        totalRaw: 60,
        totalPublishable: 25,
        bangers: 5,
        runway: "2-3 weeks daily posting",
      },
      formats: [
        { name: "Marathon Highlights", description: "Best moments condensed into 30-60 second clips. The TikTok format — energy peaks, funny moments, guest reactions." },
        { name: "Behind the Launch", description: "Strategy and tokenomics discussions clipped for crypto-native X/LinkedIn audiences. The business case for $BIRB." },
        { name: "Raw Hours", description: "Uncut 2-3 minute segments from key moments. No editing. The documentary approach." },
      ],
    },
  },
];

export function getCampaignBySlug(slug: string): CampaignWithClips | undefined {
  return DEMO_CAMPAIGNS.find((c) => c.slug === slug);
}
