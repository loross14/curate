import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ovqndmutzpoqysozcwph.supabase.co",
  "sb_publishable_qEG4yBV9jgibfpw80j1VAw_3dYINQT7"
);

// ── User ──
const USER = {
  id: "00000000-0000-0000-0000-000000000001",
  email: "logan@curate.app",
  full_name: "Logan Ross",
};

// ── Campaign IDs ──
const MOB_ID = "mob-archive";
const BIRBATHON_ID = "birbathon";

// ── Strategy JSONB ──

const MOB_STRATEGY = {
  guests: [
    {
      name: "Brett Johnson",
      tier: "S",
      episode: "Ep 92",
      score: "10/10",
      why: "FBI Most Wanted -> security consultant. True crime + crypto + redemption = content trinity. Largest audience expansion potential.",
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
        "I built it in two hours -- most of that was adding Comic Sans",
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
        "TikTok's first music partner wasn't Spotify -- it was a crypto startup",
      ],
    },
    {
      name: "Brantly.eth",
      tier: "A",
      episode: "Ep 69",
      score: "6.5/10",
      why: "ENS director championing decentralized identity -- days before being fired by the DAO he helped build. Historical primary source.",
      topHooks: [
        "This interview was recorded right before he got fired by a DAO",
        "Can a DAO fire you for your beliefs?",
        "He built the identity layer for Ethereum -- then lost his own identity in it",
      ],
    },
    {
      name: "Mike Demarais",
      tier: "A",
      episode: "Ep 56",
      score: "7/10",
      why: "Rainbow Wallet co-founder. The $12 Unisocks -> $90K story. Builder-narrator archetype.",
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
      description:
        "Failed predictions & peak euphoria. The #1 pillar. Crypto 2021-22 is the richest vein in media history for bad takes.",
      estimatedClips: "30-50",
      bestPlatforms: ["TikTok", "IG Reels", "YT Shorts"],
    },
    {
      name: "Aged Like Wine",
      slug: "aged-wine",
      description:
        "Calls that were right. Crash warnings that materialized. Stablecoin risk discussions pre-Terra. The credibility builder.",
      estimatedClips: "15-25",
      bestPlatforms: ["LinkedIn", "X", "YT Shorts"],
    },
    {
      name: "Crypto History Class",
      slug: "history",
      description:
        "DeFi mechanics, NFT culture, DAO governance explained at the moment they mattered. Primary source framing.",
      estimatedClips: "20-30",
      bestPlatforms: ["YT Shorts", "LinkedIn", "X"],
    },
    {
      name: "Builder Stories",
      slug: "builders",
      description:
        "Founder interviews that hold up. Origin stories from survivors become 'I was there' content.",
      estimatedClips: "20-30",
      bestPlatforms: ["LinkedIn", "YT Shorts", "X"],
    },
    {
      name: "Breaking News Time Capsules",
      slug: "time-capsules",
      description:
        "Live reactions to El Salvador, China bans, Terra collapse, Celsius freeze. Raw, timestamped, unfiltered.",
      estimatedClips: "15-20",
      bestPlatforms: ["X", "TikTok", "YT Shorts"],
    },
    {
      name: "The Vibe",
      slug: "vibe",
      description:
        "Meme coins, NFT drops, wagmi/ngmi culture. The language and energy of peak crypto. Pure nostalgia.",
      estimatedClips: "15-20",
      bestPlatforms: ["TikTok", "IG Reels", "X"],
    },
  ],
  moments: [
    {
      event: "Bitcoin ATH $69K",
      date: "Nov 10, 2021",
      episodeWindow: "Eps 46-50",
      angle: "What was the mood at the literal top?",
    },
    {
      event: "El Salvador BTC adoption",
      date: "Sep 7, 2021",
      episodeWindow: "Eps 31-34",
      angle: "Nation-state adoption euphoria",
    },
    {
      event: "Terra Luna collapse",
      date: "May 9-12, 2022",
      episodeWindow: "Eps 90-91",
      angle: "Pre-collapse optimism OR real-time reaction",
    },
    {
      event: "Celsius freeze",
      date: "Jun 12, 2022",
      episodeWindow: "Ep ~96",
      angle: "Any prior Celsius discussion = retrospective gold",
    },
    {
      event: "China crypto ban (Nth time)",
      date: "Sep 2021",
      episodeWindow: "Eps 34-37",
      angle: "Evergreen meme material",
    },
    {
      event: "BitBoy at peak influence",
      date: "Sep 2021",
      episodeWindow: "Ep 38",
      angle: "2 years before arrest, at maximum influence",
    },
    {
      event: "Brantly.eth fired by DAO",
      date: "Feb 2022",
      episodeWindow: "Ep 69",
      angle: "Interview during the exact controversy window",
    },
    {
      event: "Bitcoin Futures ETF approved",
      date: "Oct 2021",
      episodeWindow: "Ep 47",
      angle: "First-ever BTC ETF -- the moment that changed everything",
    },
  ],
  yieldEstimate: {
    totalRaw: 490,
    totalPublishable: 160,
    bangers: 16,
    runway: "3-6+ months daily posting",
  },
  formats: [
    {
      name: "Split Screen -- Then vs Now",
      description:
        "Show the clip, overlay what happened. 'Bitcoin was $65K when this was recorded. It dropped to $16K within 8 months.'",
    },
    {
      name: "They Tried to Tell Us",
      description:
        "Clips where someone warned about exactly what happened. Less viral, more shareable by crypto-educated audiences.",
    },
    {
      name: "Time Capsule",
      description:
        "No commentary. Just the raw clip with a date stamp. Let the audience provide context.",
    },
  ],
};

const BIRBATHON_STRATEGY = {
  guests: [
    {
      name: "LucaNetz",
      tier: "S",
      episode: "Guest appearance",
      score: "9/10",
      why: "Pudgy Penguins founder. Built a top-5 NFT project into a mainstream IP with Walmart toys. His pull-up on stream = instant credibility + audience crossover.",
      topHooks: [
        "The Pudgy Penguins founder crashed a 24-hour livestream",
        "From NFT project to Walmart shelves -- LucaNetz explains",
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
      description:
        "Raw endurance content. Sleep deprivation hits, second winds, the 3 AM energy shift. The human drama of going 24 hours straight.",
      estimatedClips: "8-12",
      bestPlatforms: ["TikTok", "IG Reels", "YT Shorts"],
    },
    {
      name: "Token Launch Intel",
      slug: "launch",
      description:
        "$BIRB tokenomics, Solana strategy, migration from Ethereum, community governance. The business behind the stream.",
      estimatedClips: "6-10",
      bestPlatforms: ["X", "LinkedIn", "YT Shorts"],
    },
    {
      name: "Guest Moments",
      slug: "guests",
      description:
        "LucaNetz pull-up, community call-ins, surprise appearances. The moments that broke the internet in real-time.",
      estimatedClips: "5-8",
      bestPlatforms: ["TikTok", "X", "YT Shorts"],
    },
    {
      name: "Community & Culture",
      slug: "community",
      description:
        "Moonbirds community energy, birb box openings, merch reveals, governance discussions. The tribe showing up.",
      estimatedClips: "5-8",
      bestPlatforms: ["X", "TikTok", "IG Reels"],
    },
  ],
  moments: [
    {
      event: "Stream goes live on Solana homepage",
      date: "Jan 22, 2026",
      episodeWindow: "Hour 0",
      angle:
        "Featured on Solana's actual homepage -- institutional validation of a community stream",
    },
    {
      event: "LucaNetz joins the stream",
      date: "Jan 23, 2026",
      episodeWindow: "Mid-stream",
      angle: "Pudgy Penguins founder pulls up -- crossover moment",
    },
    {
      event: "3 AM energy shift",
      date: "Jan 23, 2026",
      episodeWindow: "Hour 8-10",
      angle: "Sleep deprivation content -- raw, unfiltered, human",
    },
    {
      event: "$BIRB token launch",
      date: "Jan 28, 2026",
      episodeWindow: "Post-stream",
      angle: "Everything the stream was building toward",
    },
    {
      event: "'Sleepathon is over'",
      date: "Jan 24, 2026",
      episodeWindow: "Hour 24+",
      angle: "The iconic sign-off. Pax declares victory.",
    },
  ],
  yieldEstimate: {
    totalRaw: 60,
    totalPublishable: 25,
    bangers: 5,
    runway: "2-3 weeks daily posting",
  },
  formats: [
    {
      name: "Marathon Highlights",
      description:
        "Best moments condensed into 30-60 second clips. The TikTok format -- energy peaks, funny moments, guest reactions.",
    },
    {
      name: "Behind the Launch",
      description:
        "Strategy and tokenomics discussions clipped for crypto-native X/LinkedIn audiences. The business case for $BIRB.",
    },
    {
      name: "Raw Hours",
      description:
        "Uncut 2-3 minute segments from key moments. No editing. The documentary approach.",
    },
  ],
};

// ── Clips data (all 38) ──

interface ClipData {
  id: string;
  title: string;
  hook: string;
  episode: string;
  episodeNumber: number;
  guest?: string;
  guestTitle?: string;
  date: string;
  youtubeId: string;
  startSeconds: number;
  endSeconds: number;
  viralityScore: number;
  energy: string;
  type: string;
  platforms: string[];
  tags: string[];
  sentiment: string;
}

const CLIPS: ClipData[] = [
  // Brett Johnson - Ep 92
  { id: "clip-001", title: "FBI's Most Wanted Turned Informant", hook: "He built the first organized cybercrime ring on the internet — then the FBI flipped him", episode: "How Former FBI's Most Wanted Hacker Cashed Out In Crypto", episodeNumber: 92, guest: "Brett Johnson", guestTitle: "Former FBI Most Wanted, Cybersecurity Consultant", date: "2022-05-20", youtubeId: "A2iZWeH_ojo", startSeconds: 239, endSeconds: 300, viralityScore: 9.5, energy: "high", type: "builders", platforms: ["TikTok", "IG Reels", "YT Shorts", "X", "LinkedIn"], tags: ["cybercrime", "FBI", "security", "crypto"], sentiment: "neutral" },
  { id: "clip-002", title: "The Crypto Cashout Playbook", hook: "Step-by-step: how criminals actually turn stolen crypto into clean cash", episode: "How Former FBI's Most Wanted Hacker Cashed Out In Crypto", episodeNumber: 92, guest: "Brett Johnson", guestTitle: "Former FBI Most Wanted, Cybersecurity Consultant", date: "2022-05-20", youtubeId: "A2iZWeH_ojo", startSeconds: 525, endSeconds: 585, viralityScore: 9.2, energy: "high", type: "history", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["hacking", "cashout", "money laundering", "crypto"], sentiment: "neutral" },
  // Billy Markus - Ep 20
  { id: "clip-003", title: "DOGE Was Built in Hours", hook: "The creator of Dogecoin made it in a few hours — most of that time was adding Comic Sans", episode: "Dogecoin Co-Creator Billy Markus Interview", episodeNumber: 20, guest: "Billy Markus", guestTitle: "Co-creator, Dogecoin", date: "2021-07-25", youtubeId: "ehNgfJziVcg", startSeconds: 109, endSeconds: 155, viralityScore: 9.4, energy: "high", type: "builders", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["Dogecoin", "DOGE", "meme coins", "origin story"], sentiment: "neutral" },
  { id: "clip-004", title: "Why the DOGE Creator Sold Everything", hook: "Billy Markus sold all his Dogecoin in 2015 to pay rent — then watched it moon without him", episode: "Dogecoin Co-Creator Billy Markus Interview", episodeNumber: 20, guest: "Billy Markus", guestTitle: "Co-creator, Dogecoin", date: "2021-07-25", youtubeId: "ehNgfJziVcg", startSeconds: 140, endSeconds: 195, viralityScore: 9.1, energy: "medium", type: "aged-milk", platforms: ["TikTok", "IG Reels", "YT Shorts", "X", "LinkedIn"], tags: ["Dogecoin", "regret", "origin story", "creator"], sentiment: "mixed" },
  // Tim Draper - Ep 18
  { id: "clip-005", title: "Tim Draper's Billion-Dollar Bitcoin Bet", hook: "He bought 30,000 Bitcoin from the Silk Road auction — that bet is now worth over a billion dollars", episode: "Tim Draper Talks DeFi", episodeNumber: 18, guest: "Tim Draper", guestTitle: "Venture Capitalist, Draper Associates", date: "2021-07-20", youtubeId: "2G_MBcDqLZ0", startSeconds: 310, endSeconds: 370, viralityScore: 9.0, energy: "high", type: "builders", platforms: ["TikTok", "IG Reels", "YT Shorts", "X", "LinkedIn"], tags: ["Bitcoin", "venture capital", "Tim Draper", "Silk Road"], sentiment: "bullish" },
  { id: "clip-006", title: "Why Would Anyone Hold Fiat?", hook: "Tim Draper asks the question every Bitcoiner is thinking: why hold a currency tied to politicians?", episode: "Tim Draper Talks DeFi", episodeNumber: 18, guest: "Tim Draper", guestTitle: "Venture Capitalist, Draper Associates", date: "2021-07-20", youtubeId: "2G_MBcDqLZ0", startSeconds: 80, endSeconds: 130, viralityScore: 8.5, energy: "high", type: "aged-milk", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["Bitcoin", "fiat", "macro", "sound money"], sentiment: "bullish" },
  // Mike Demarais - Ep 56
  { id: "clip-007", title: "The $90,000 Pair of Socks", hook: "UniSocks turned a $12 pair of socks into $90K through bonding curves — the Yeezys of blockchain", episode: "Breaking Into Crypto Feat. Mike Demarais", episodeNumber: 56, guest: "Mike Demarais", guestTitle: "Co-founder, Rainbow Wallet", date: "2021-12-02", youtubeId: "VD5RDcFM7xM", startSeconds: 1910, endSeconds: 2010, viralityScore: 9.1, energy: "high", type: "vibe", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["UniSocks", "DeFi", "NFT", "bonding curve"], sentiment: "bullish" },
  { id: "clip-008", title: "VCs Are Ruining Crypto", hook: "Rainbow Wallet's co-founder calls out 'super evil slimy greedy venture capitalists' hijacking decentralization", episode: "Breaking Into Crypto Feat. Mike Demarais", episodeNumber: 56, guest: "Mike Demarais", guestTitle: "Co-founder, Rainbow Wallet", date: "2021-12-02", youtubeId: "VD5RDcFM7xM", startSeconds: 1620, endSeconds: 1770, viralityScore: 8.7, energy: "high", type: "aged-milk", platforms: ["TikTok", "IG Reels", "YT Shorts", "X", "LinkedIn"], tags: ["VCs", "decentralization", "governance", "DeFi"], sentiment: "bearish" },
  { id: "clip-009", title: "Your ETH Wallet Is Your New Login", hook: "Forget Facebook and Google login — your Ethereum wallet will be your universal Web3 identity", episode: "Breaking Into Crypto Feat. Mike Demarais", episodeNumber: 56, guest: "Mike Demarais", guestTitle: "Co-founder, Rainbow Wallet", date: "2021-12-02", youtubeId: "VD5RDcFM7xM", startSeconds: 3480, endSeconds: 3600, viralityScore: 8.3, energy: "high", type: "aged-wine", platforms: ["LinkedIn", "YT Shorts", "X", "TikTok"], tags: ["identity", "Web3", "wallet", "Rainbow"], sentiment: "bullish" },
  // Brantly.eth - Ep 69
  { id: "clip-010", title: "Bitcoin $100K Is Coming", hook: "Logan breaks down the historical chart pattern that makes $100K Bitcoin inevitable — sooner than you think", episode: "Brantly.eth On Digital Identity", episodeNumber: 69, date: "2022-02-04", youtubeId: "gUhKgGUvyJE", startSeconds: 200, endSeconds: 235, viralityScore: 8.8, energy: "high", type: "aged-milk", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["Bitcoin", "price prediction", "chart analysis"], sentiment: "bullish" },
  { id: "clip-011", title: "BTC Over $40K — Canceling My McDonald's App", hook: "Bitcoin crossed $40,000 so Logan can officially take back his McDonald's application", episode: "Brantly.eth On Digital Identity", episodeNumber: 69, date: "2022-02-04", youtubeId: "gUhKgGUvyJE", startSeconds: 81, endSeconds: 100, viralityScore: 8.5, energy: "high", type: "vibe", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["Bitcoin", "comedy", "price action"], sentiment: "bullish" },
  { id: "clip-012", title: "Free elonmusk.eth — One Condition", hook: "Brantly.eth offers the elonmusk.eth domain to Elon Musk for free, but there's one condition", episode: "Brantly.eth On Digital Identity", episodeNumber: 69, guest: "Brantly.eth", guestTitle: "Director, Ethereum Name Service", date: "2022-02-04", youtubeId: "gUhKgGUvyJE", startSeconds: 7905, endSeconds: 7980, viralityScore: 8.2, energy: "medium", type: "builders", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["ENS", "Elon Musk", "domains", "Web3"], sentiment: "bullish" },
  // Audius - Ep 80
  { id: "clip-013", title: "Why Audius Chose Solana Over Ethereum", hook: "Audius needed sub-second finality for music streaming — Ethereum L2s couldn't deliver", episode: "This Music Cryptocurrency is Integrated With TikTok", episodeNumber: 80, guest: "Austin Virts", guestTitle: "Head of Marketing, Audius (former Solana)", date: "2022-03-25", youtubeId: "l9JxDu72ZSo", startSeconds: 1209, endSeconds: 1343, viralityScore: 7.9, energy: "medium", type: "builders", platforms: ["LinkedIn", "YT Shorts", "X"], tags: ["Audius", "Solana", "Ethereum", "L2", "music"], sentiment: "bullish" },
  { id: "clip-014", title: "Audius x TikTok Changes Everything", hook: "Artists can now use their own music directly on TikTok through Audius — a viral loop for creators", episode: "This Music Cryptocurrency is Integrated With TikTok", episodeNumber: 80, guest: "Austin Virts", guestTitle: "Head of Marketing, Audius (former Solana)", date: "2022-03-25", youtubeId: "l9JxDu72ZSo", startSeconds: 1470, endSeconds: 1530, viralityScore: 8.4, energy: "high", type: "time-capsules", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["Audius", "TikTok", "music", "creator economy"], sentiment: "bullish" },
  { id: "clip-015", title: "Never Research After You Invest", hook: "Never do your research AFTER the investment — because at that point, your research doesn't matter", episode: "This Music Cryptocurrency is Integrated With TikTok", episodeNumber: 80, date: "2022-03-25", youtubeId: "l9JxDu72ZSo", startSeconds: 600, endSeconds: 640, viralityScore: 8.6, energy: "high", type: "vibe", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["investing", "DYOR", "comedy", "advice"], sentiment: "neutral" },
  // Floki TA / BTC ETF - Ep 47
  { id: "clip-016", title: "SEC Approves First Bitcoin ETF", hook: "The SEC just approved the first Bitcoin Futures ETF — what this means for the entire crypto market", episode: "Bitcoin ETF Approved! | Floki Inu Technical Analysis", episodeNumber: 47, date: "2021-10-28", youtubeId: "2b1G8GJgZlU", startSeconds: 412, endSeconds: 492, viralityScore: 8.9, energy: "high", type: "time-capsules", platforms: ["TikTok", "IG Reels", "YT Shorts", "X", "LinkedIn"], tags: ["Bitcoin", "ETF", "SEC", "regulation"], sentiment: "bullish" },
  { id: "clip-017", title: "Safemoon Is a Slow Rug Pull", hook: "Safemoon is a slow rug — a pyramid scheme with multiple ways for developers to drain your funds", episode: "Bitcoin ETF Approved! | Floki Inu Technical Analysis", episodeNumber: 47, date: "2021-10-28", youtubeId: "2b1G8GJgZlU", startSeconds: 1655, endSeconds: 1730, viralityScore: 9.0, energy: "high", type: "aged-milk", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["Safemoon", "scam", "rug pull", "warning"], sentiment: "bearish" },
  // ETHDenver - Ep 72
  { id: "clip-018", title: "Ryan's $45K ETHDenver Expense Report", hook: "Ryan expensed $45,000 at ETHDenver claiming it was for a 'seed phrase' and 'traveling expenses'", episode: "ETHDenver Recap: Vitalik Buterin, Andrew Yang, and Kimbal Musk", episodeNumber: 72, date: "2022-02-25", youtubeId: "0i3727vSVJw", startSeconds: 695, endSeconds: 815, viralityScore: 8.7, energy: "high", type: "vibe", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["ETHDenver", "comedy", "expenses", "conference"], sentiment: "neutral" },
  { id: "clip-019", title: "Logan Meets Benny Blanco at an NFT Party", hook: "Logan recounts meeting Benny Blanco and Malia Obama at The Heart Project NFT party in LA", episode: "ETHDenver Recap: Vitalik Buterin, Andrew Yang, and Kimbal Musk", episodeNumber: 72, date: "2022-02-25", youtubeId: "0i3727vSVJw", startSeconds: 1448, endSeconds: 1510, viralityScore: 8.3, energy: "high", type: "builders", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["NFT", "celebrities", "events", "Heart Project"], sentiment: "bullish" },
  // B Word Conference - Ep 19
  { id: "clip-020", title: "Elon Reveals His Crypto Portfolio", hook: "Elon Musk publicly reveals he owns Bitcoin, Ethereum, and Dogecoin — plus Tesla and SpaceX hold BTC", episode: "The B Word LIVE REACTION", episodeNumber: 19, date: "2021-07-21", youtubeId: "0OIJiVYJOgk", startSeconds: 528, endSeconds: 580, viralityScore: 9.0, energy: "high", type: "time-capsules", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["Elon Musk", "Bitcoin", "portfolio", "Tesla"], sentiment: "bullish" },
  { id: "clip-021", title: "Elon's Dogecoin Prophecy", hook: "Elon Musk: 'The cryptocurrency that was started as a joke ends up being the leading cryptocurrency'", episode: "The B Word LIVE REACTION", episodeNumber: 19, date: "2021-07-21", youtubeId: "0OIJiVYJOgk", startSeconds: 1662, endSeconds: 1720, viralityScore: 8.8, energy: "high", type: "vibe", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["Elon Musk", "Dogecoin", "prediction", "meme coins"], sentiment: "bullish" },
  // Solana Shutdown - Ep 32
  { id: "clip-022", title: "Solana's Network Just Crashed", hook: "Solana's entire network crashed from bot transactions — consensus failure took it all down", episode: "Solana Shutdown! | Phantom Wallet Interview", episodeNumber: 32, date: "2021-09-15", youtubeId: "4opQRV-tsiQ", startSeconds: 132, endSeconds: 264, viralityScore: 8.5, energy: "high", type: "time-capsules", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["Solana", "outage", "downtime", "network"], sentiment: "bearish" },
  { id: "clip-023", title: "$50 Billion in Bitcoin — One Block", hook: "A single entity just moved $50 BILLION in Bitcoin within one block", episode: "Solana Shutdown! | Phantom Wallet Interview", episodeNumber: 32, date: "2021-09-15", youtubeId: "4opQRV-tsiQ", startSeconds: 755, endSeconds: 828, viralityScore: 8.9, energy: "high", type: "time-capsules", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["Bitcoin", "whale", "on-chain", "transfer"], sentiment: "neutral" },
  // Amazon BTC / Tier List - Ep 21
  { id: "clip-024", title: "The Amazon Bitcoin Prank", hook: "A Crypto Twitter troll fooled the Wall Street Journal into reporting Amazon was accepting Bitcoin", episode: "Amazon Accepting BTC?? | Cryptocurrency Tier List", episodeNumber: 21, date: "2021-07-27", youtubeId: "KacMysEmomU", startSeconds: 389, endSeconds: 480, viralityScore: 8.7, energy: "high", type: "vibe", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["Amazon", "Bitcoin", "fake news", "CT"], sentiment: "neutral" },
  { id: "clip-025", title: "Bitcoin Breaks $40K — Live Reaction", hook: "Bitcoin surges past $40,000 and Logan loses it on camera", episode: "Amazon Accepting BTC?? | Cryptocurrency Tier List", episodeNumber: 21, date: "2021-07-27", youtubeId: "KacMysEmomU", startSeconds: 1900, endSeconds: 1960, viralityScore: 8.6, energy: "high", type: "time-capsules", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["Bitcoin", "price action", "live reaction", "$40K"], sentiment: "bullish" },
  // Wu-Tang NFT - Ep 45
  { id: "clip-026", title: "Wu-Tang Album: From Shkreli to NFT", hook: "The Wu-Tang Clan album went from Martin Shkreli to government seizure to a $4M NFT — the wildest journey in music history", episode: "EXCLUSIVE: Here's The Broker of $4 Million PleasrDAO Wu-Tang NFT Purchase", episodeNumber: 45, date: "2021-10-22", youtubeId: "zGYP5GSbAX8", startSeconds: 350, endSeconds: 420, viralityScore: 9.0, energy: "high", type: "time-capsules", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["Wu-Tang", "NFT", "PleasrDAO", "music"], sentiment: "bullish" },
  { id: "clip-027", title: "WorldCoin Wants Your Eyeball", hook: "WorldCoin is scanning your iris for free crypto — are you the product?", episode: "EXCLUSIVE: Here's The Broker of $4 Million PleasrDAO Wu-Tang NFT Purchase", episodeNumber: 45, date: "2021-10-22", youtubeId: "zGYP5GSbAX8", startSeconds: 167, endSeconds: 220, viralityScore: 8.4, energy: "high", type: "aged-milk", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["WorldCoin", "privacy", "biometrics", "identity"], sentiment: "bearish" },
  // Ava Labs - Ep 53
  { id: "clip-028", title: "ConstitutionDAO Raised $47M in a Week", hook: "ConstitutionDAO raised $47 million in under a week to buy the actual US Constitution", episode: "We Tried Buying The Constitution… | Ava Labs President Interview", episodeNumber: 53, date: "2021-11-19", youtubeId: "UEjs16sHQqc", startSeconds: 131, endSeconds: 200, viralityScore: 8.8, energy: "high", type: "time-capsules", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["ConstitutionDAO", "governance", "crowdfunding", "history"], sentiment: "bullish" },
  // GaryVee / Andrew Yang - Ep 74
  { id: "clip-029", title: "95% of NFTs Will Go to Zero", hook: "Gary Vee's prediction: 95% of NFTs will go to zero — and Pixelmon just proved him right", episode: "These Guys Interviewed Who?! | GaryVee, Andrew Yang", episodeNumber: 74, date: "2022-03-04", youtubeId: "yMafDq3cGt0", startSeconds: 272, endSeconds: 340, viralityScore: 8.8, energy: "high", type: "aged-milk", platforms: ["TikTok", "IG Reels", "YT Shorts", "X", "LinkedIn"], tags: ["GaryVee", "NFT", "prediction", "Pixelmon"], sentiment: "bearish" },
  // PolyNetwork / Axie - Ep 25
  { id: "clip-030", title: "Axie Infinity Changed the Philippines", hook: "Play-to-earn scholarships on Axie Infinity are replacing minimum wage jobs in the Philippines", episode: "PolyNetwork Hack | Axie Infinity Co-Founder Interview", episodeNumber: 25, date: "2021-08-12", youtubeId: "q25eGWLXE4E", startSeconds: 1440, endSeconds: 1520, viralityScore: 8.5, energy: "high", type: "builders", platforms: ["TikTok", "IG Reels", "YT Shorts", "X", "LinkedIn"], tags: ["Axie Infinity", "play-to-earn", "Philippines", "gaming"], sentiment: "bullish" },
  // Holochain - Ep 70
  { id: "clip-031", title: "Sequoia Drops $450M on Polygon", hook: "Sequoia Capital just led a $450 million round into Polygon this morning", episode: "Co-Founder of Holochain Arthur Brock", episodeNumber: 70, date: "2022-02-07", youtubeId: "CBDsguc5k0c", startSeconds: 725, endSeconds: 780, viralityScore: 8.3, energy: "high", type: "time-capsules", platforms: ["TikTok", "IG Reels", "YT Shorts", "X", "LinkedIn"], tags: ["Polygon", "MATIC", "Sequoia", "funding"], sentiment: "bullish" },
  { id: "clip-032", title: "ETH Might Flip Bitcoin in 2022", hook: "Bold prediction: Ethereum could actually surpass Bitcoin's market cap in 2022", episode: "Co-Founder of Holochain Arthur Brock", episodeNumber: 70, date: "2022-02-07", youtubeId: "CBDsguc5k0c", startSeconds: 260, endSeconds: 310, viralityScore: 8.1, energy: "medium", type: "aged-milk", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["Ethereum", "Bitcoin", "flippening", "prediction"], sentiment: "bullish" },
  // 2022 Strategies - Ep 62
  { id: "clip-033", title: "MATIC to $10 — You Heard It Here First", hook: "Ryan's bold 2022 call: Polygon hits $10 — three months before the crash", episode: "2022 Crypto Strategies Special: Moonshots, DeFi, NFTs and Airdrops", episodeNumber: 62, date: "2022-01-03", youtubeId: "46ySPg7qjDE", startSeconds: 542, endSeconds: 600, viralityScore: 8.9, energy: "high", type: "aged-milk", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["Polygon", "MATIC", "prediction", "aged like milk"], sentiment: "bullish" },
  { id: "clip-034", title: "DeFi Is NOT Dead", hook: "TVL in Ethereum DeFi is approaching $300 billion — DeFi isn't dead, it's just getting started", episode: "2022 Crypto Strategies Special: Moonshots, DeFi, NFTs and Airdrops", episodeNumber: 62, date: "2022-01-03", youtubeId: "46ySPg7qjDE", startSeconds: 2060, endSeconds: 2145, viralityScore: 8.0, energy: "high", type: "aged-wine", platforms: ["LinkedIn", "YT Shorts", "X", "TikTok"], tags: ["DeFi", "TVL", "Ethereum", "analysis"], sentiment: "bullish" },
  // Unstoppable Domains - Ep 63
  { id: "clip-035", title: ".com With Superpowers", hook: "Unstoppable Domains CEO explains why blockchain domains are '.com with superpowers'", episode: "How to Profit While ETH Crashes | Unstoppable Domains CEO Interview", episodeNumber: 63, guest: "Matthew Gould", guestTitle: "CEO, Unstoppable Domains", date: "2022-01-10", youtubeId: "OG78Bg1EQEM", startSeconds: 2049, endSeconds: 2130, viralityScore: 7.8, energy: "high", type: "builders", platforms: ["LinkedIn", "YT Shorts", "X"], tags: ["domains", "Web3", "identity", "Unstoppable"], sentiment: "bullish" },
  // Top 100 Cryptos - Ep 81
  { id: "clip-036", title: "Tether Could Collapse Crypto", hook: "Tether's reserves might include Evergrande debt — if true, it could trigger a full crypto collapse", episode: "Top 100 Cryptocurrencies In 60 Minutes Challenge!", episodeNumber: 81, date: "2022-03-28", youtubeId: "Pl_ysv0EjJI", startSeconds: 192, endSeconds: 250, viralityScore: 8.5, energy: "medium", type: "aged-milk", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["Tether", "USDT", "Evergrande", "stablecoin"], sentiment: "bearish" },
  // Crypto Regulation - Ep 23
  { id: "clip-037", title: "Good Luck Tracking My MetaMask", hook: "How is the government going to track my MetaMask to tax my DeFi transactions?", episode: "Crypto Regulation Incoming", episodeNumber: 23, date: "2021-08-06", youtubeId: "OMsNb-O2dmk", startSeconds: 400, endSeconds: 450, viralityScore: 8.2, energy: "high", type: "aged-milk", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["regulation", "DeFi", "taxes", "MetaMask"], sentiment: "mixed" },
  { id: "clip-038", title: "ETH Breaks Free From Bitcoin", hook: "Ethereum surges past $2,900 independently of Bitcoin — the long-awaited altcoin season begins", episode: "Crypto Regulation Incoming", episodeNumber: 23, date: "2021-08-06", youtubeId: "OMsNb-O2dmk", startSeconds: 110, endSeconds: 160, viralityScore: 8.0, energy: "high", type: "time-capsules", platforms: ["TikTok", "IG Reels", "YT Shorts", "X"], tags: ["Ethereum", "altcoin season", "price action", "decoupling"], sentiment: "bullish" },
];

// ── Helper: deterministic UUID from a string ──
function makeUUID(ns: string, key: string): string {
  // Simple deterministic UUID v5-like: hash namespace+key into a UUID format
  // We'll use a simple approach: pad/hash to create reproducible UUIDs
  const str = `${ns}:${key}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, "0");
  // Build a valid UUID v4-shaped string
  const p1 = hex.slice(0, 8);
  const p2 = hex.slice(0, 4);
  const p3 = "4" + hex.slice(1, 4);
  const p4 = "8" + hex.slice(0, 3);
  const p5 = hex.padEnd(12, "0").slice(0, 12);
  return `${p1}-${p2}-${p3}-${p4}-${p5}`;
}

async function seed() {
  console.log("Seeding CURATE database...\n");

  // 1. Insert user
  const userId = USER.id;
  const { error: userError } = await supabase
    .from("users")
    .upsert({ id: userId, email: USER.email, name: "Logan Ross" }, { onConflict: "id" });
  if (userError) {
    console.log("User insert error:", userError);
    return;
  }
  console.log("User inserted.");

  // 2. Insert campaigns
  const campaigns = [
    {
      id: makeUUID("campaign", MOB_ID),
      slug: "mob-archive",
      user_id: userId,
      name: "Moon or Bust Archive",
      description:
        "102 episodes of Benzinga's flagship crypto show, May 2021 – July 2022. The full arc of the bull run and into the crash. Co-hosted by Logan Ross, Ryan McNamara, and Brian Moir.",
      status: "active",
      strategy: MOB_STRATEGY,
      platforms: [
        "TikTok",
        "IG Reels",
        "YT Shorts",
        "X",
        "LinkedIn",
        "FB Reels",
      ],
      tags: ["crypto", "podcast", "archive", "web3"],
      score_threshold: 7.0,
      clip_count: 38,
      reviewed_count: 0,
      shipped_count: 0,
    },
    {
      id: makeUUID("campaign", BIRBATHON_ID),
      slug: "birbathon",
      user_id: userId,
      name: "Birbathon 24hr Stream",
      description:
        "Pax and Spencer went 24 hours straight for the $BIRB token launch on Solana. Featured live on Solana's homepage. LucaNetz (Pudgy Penguins) pulled up. The stream ended with Pax declaring 'sleepathon is over.'",
      status: "draft",
      strategy: BIRBATHON_STRATEGY,
      platforms: ["TikTok", "IG Reels", "YT Shorts", "X"],
      tags: ["Moonbirds", "$BIRB", "Solana", "livestream", "24hr"],
      score_threshold: 7.0,
      clip_count: 0,
      reviewed_count: 0,
      shipped_count: 0,
    },
  ];

  console.log("Inserting campaigns...");
  const { error: campErr } = await supabase
    .from("campaigns")
    .upsert(campaigns, { onConflict: "id" });
  if (campErr) {
    console.error("Campaign insert error:", campErr);
    process.exit(1);
  }
  console.log(`  ✓ ${campaigns.length} campaigns inserted`);

  const mobCampaignId = campaigns[0].id;

  // 3. Create sources for each unique YouTube video
  const uniqueVideos = new Map<
    string,
    { episode: string; episodeNumber: number; date: string }
  >();
  for (const clip of CLIPS) {
    if (!uniqueVideos.has(clip.youtubeId)) {
      uniqueVideos.set(clip.youtubeId, {
        episode: clip.episode,
        episodeNumber: clip.episodeNumber,
        date: clip.date,
      });
    }
  }

  const sources = Array.from(uniqueVideos.entries()).map(
    ([ytId, { episode, episodeNumber, date }]) => ({
      id: makeUUID("source", ytId),
      campaign_id: mobCampaignId,
      user_id: userId,
      source_type: "youtube_video",
      source_url: `https://www.youtube.com/watch?v=${ytId}`,
      title: episode,
      episode_number: episodeNumber,
      pipeline_status: "ready",
      metadata: {
        youtube_id: ytId,
        episode_date: date,
      },
    })
  );

  console.log("Inserting sources...");
  const { error: srcErr } = await supabase
    .from("sources")
    .upsert(sources, { onConflict: "id" });
  if (srcErr) {
    console.error("Source insert error:", srcErr);
    process.exit(1);
  }
  console.log(`  ✓ ${sources.length} sources inserted`);

  // 4. Insert clips
  const clipRows = CLIPS.map((c) => ({
    id: makeUUID("clip", c.id),
    source_id: makeUUID("source", c.youtubeId),
    campaign_id: mobCampaignId,
    user_id: userId,
    title: c.title,
    hook: c.hook,
    start_seconds: c.startSeconds,
    end_seconds: c.endSeconds,
    energy: c.energy,
    type: c.type,
    sentiment: c.sentiment,
    tags: c.tags,
    platforms: c.platforms,
    virality_score: c.viralityScore,
    guest_name: c.guest || null,
    guest_title: c.guestTitle || null,
    episode_title: c.episode,
    episode_number: c.episodeNumber,
    episode_date: c.date,
  }));

  console.log("Inserting clips...");
  const { error: clipErr } = await supabase
    .from("clips")
    .upsert(clipRows, { onConflict: "id" });
  if (clipErr) {
    console.error("Clip insert error:", clipErr);
    process.exit(1);
  }
  console.log(`  ✓ ${clipRows.length} clips inserted`);

  console.log("\nSeed complete!");
  console.log(`  MOB campaign ID:       ${mobCampaignId}`);
  console.log(`  Birbathon campaign ID: ${campaigns[1].id}`);
  console.log(`  User ID:               ${userId}`);
  console.log(`  Sources:               ${sources.length}`);
  console.log(`  Clips:                 ${clipRows.length}`);
}

seed().catch((err) => {
  console.error("Fatal seed error:", err);
  process.exit(1);
});
