-- CURATE MVP Schema
-- Informed by 2 real campaign case studies:
--   1. Moon or Bust Archive (102-episode podcast, multi-guest, retrospective mining)
--   2. Birbathon 24hr Stream (single event, live energy, time-based navigation)
--
-- Key design decisions from backtesting:
--   - campaigns sit ABOVE sources as the organizing unit (not in original spec)
--   - campaign strategy is structured JSONB (guests, pillars, moments) — doubles as AI prompt context
--   - source_type is enumerated to handle YouTube playlists, single videos, and file uploads
--   - clips belong to both a source AND a campaign for flexible querying
--   - score_threshold is per-campaign (archive campaigns need higher bar than event campaigns)
--   - sessions and decisions are campaign-scoped

-- ══════════════════════════════════════════════
-- USERS
-- ══════════════════════════════════════════════

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  monthly_budget_usd NUMERIC(10,2) DEFAULT 50.00,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ══════════════════════════════════════════════
-- CAMPAIGNS — the top-level organizing unit
-- ══════════════════════════════════════════════
-- A campaign is a content strategy around a body of source material.
-- MOB = 102 YouTube episodes under one strategy.
-- Birbathon = 1 livestream VOD under a different strategy.

CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed', 'archived')),

  -- Strategy document — structured JSONB sent as context to Gemini Analyze Agent
  -- Schema: { guests: GuestProfile[], pillars: ContentPillar[], moments: HistoricalMoment[],
  --           yieldEstimate: { totalRaw, totalPublishable, bangers, runway },
  --           formats: { name, description }[] }
  strategy JSONB,

  -- Platform targeting at campaign level (clips inherit as default)
  platforms TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',

  -- Scoring config — archive campaigns need higher thresholds than event campaigns
  score_threshold NUMERIC(3,1) DEFAULT 6.0,

  -- Aggregate counts (denormalized for dashboard performance)
  clip_count INTEGER DEFAULT 0,
  reviewed_count INTEGER DEFAULT 0,
  shipped_count INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_campaigns_user ON campaigns(user_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);

-- ══════════════════════════════════════════════
-- SOURCES — individual pieces of source material within a campaign
-- ══════════════════════════════════════════════
-- MOB: 102 rows (one per YouTube video)
-- Birbathon: 1-2 rows (Twitch VOD, X Broadcast segments, or uploaded files)

CREATE TABLE sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,

  -- Source identification
  source_type TEXT NOT NULL CHECK (source_type IN (
    'youtube_video', 'youtube_playlist', 'twitch_vod', 'x_broadcast', 'upload'
  )),
  source_url TEXT,                     -- NULL for uploads
  title TEXT,
  episode_number INTEGER,              -- For ordered series (MOB ep 18, 19, etc.)
  duration_seconds INTEGER,

  -- Storage
  file_key TEXT,                       -- Cloud storage key for raw video

  -- Pipeline state
  pipeline_status TEXT DEFAULT 'pending' CHECK (pipeline_status IN (
    'pending', 'downloading', 'analyzing', 'extracting', 'scoring', 'ready', 'failed'
  )),
  pipeline_error TEXT,

  -- Metadata from platform API (thumbnails, channel info, publish date, etc.)
  metadata JSONB,
  cost_usd NUMERIC(10,4) DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_sources_campaign ON sources(campaign_id);
CREATE INDEX idx_sources_user ON sources(user_id);
CREATE INDEX idx_sources_pipeline ON sources(pipeline_status);

-- ══════════════════════════════════════════════
-- CLIPS — extracted moments from source material
-- ══════════════════════════════════════════════

CREATE TABLE clips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID REFERENCES sources(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,

  -- Content
  title TEXT NOT NULL,
  hook TEXT,                           -- The viral angle / first line
  ai_reasoning TEXT,                   -- Why Gemini flagged this segment

  -- Timestamps in source video
  start_seconds NUMERIC(10,2) NOT NULL,
  end_seconds NUMERIC(10,2) NOT NULL,
  duration_seconds NUMERIC(10,2) GENERATED ALWAYS AS (end_seconds - start_seconds) STORED,

  -- Extracted clip storage
  file_key TEXT,                       -- Cloud storage key for cut clip
  thumbnail_key TEXT,

  -- Classification (from Gemini + strategy context)
  energy TEXT CHECK (energy IN ('high', 'medium', 'low')),
  type TEXT CHECK (type IN ('hot_take', 'insight', 'funny', 'breaking_news', 'guest_highlight', 'education')),
  sentiment TEXT CHECK (sentiment IN ('bullish', 'bearish', 'neutral', 'mixed')),
  tags TEXT[] DEFAULT '{}',
  platforms TEXT[] DEFAULT '{}',       -- Recommended platforms for this clip

  -- Scoring (composite from multiple signals)
  virality_score NUMERIC(3,1),         -- Final composite score shown to curator
  ai_virality_estimate NUMERIC(3,1),   -- Raw score from Gemini
  taste_score NUMERIC(3,1),            -- Alignment with active taste profile

  -- Episode / guest metadata
  guest_name TEXT,
  guest_title TEXT,
  episode_title TEXT,
  episode_number INTEGER,
  episode_date DATE,                   -- When the source was originally recorded/aired

  -- Retrospective context (key learning from MOB campaign)
  -- e.g. "Bitcoin was $65K when recorded. It crashed to $16K within 8 months."
  context_overlay TEXT,

  cost_usd NUMERIC(10,4) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_clips_campaign ON clips(campaign_id);
CREATE INDEX idx_clips_source ON clips(source_id);
CREATE INDEX idx_clips_user ON clips(user_id);
CREATE INDEX idx_clips_score ON clips(virality_score DESC);

-- ══════════════════════════════════════════════
-- TASTE PROFILES — the curator's editorial brain as weights
-- ══════════════════════════════════════════════

CREATE TABLE taste_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  weights JSONB NOT NULL,              -- { energy: {high: 1.2, ...}, type: {hot_take: 1.3, ...}, ... }
  score_threshold NUMERIC(3,1) DEFAULT 6.0,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_taste_profiles_user ON taste_profiles(user_id);

-- ══════════════════════════════════════════════
-- SESSIONS — a curation session within a campaign
-- ══════════════════════════════════════════════

CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  taste_profile_id UUID REFERENCES taste_profiles(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'abandoned')),
  total_clips INTEGER DEFAULT 0,
  shipped INTEGER DEFAULT 0,
  skipped INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_sessions_campaign ON sessions(campaign_id);
CREATE INDEX idx_sessions_user ON sessions(user_id);

-- ══════════════════════════════════════════════
-- DECISIONS — ship or skip per clip per session
-- ══════════════════════════════════════════════

CREATE TABLE decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  clip_id UUID REFERENCES clips(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  decision TEXT NOT NULL CHECK (decision IN ('ship', 'skip')),
  time_spent_ms INTEGER,               -- How long the curator looked before deciding
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(session_id, clip_id)
);

CREATE INDEX idx_decisions_session ON decisions(session_id);
CREATE INDEX idx_decisions_clip ON decisions(clip_id);
CREATE INDEX idx_decisions_campaign ON decisions(campaign_id);

-- ══════════════════════════════════════════════
-- PUBLISH QUEUE — shipped clips awaiting platform publishing
-- ══════════════════════════════════════════════

CREATE TABLE publish_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clip_id UUID REFERENCES clips(id) ON DELETE CASCADE,
  decision_id UUID REFERENCES decisions(id),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  status TEXT DEFAULT 'queued' CHECK (status IN ('queued', 'processing', 'published', 'failed', 'cancelled')),
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  platform_post_id TEXT,
  platform_post_url TEXT,
  caption TEXT,
  hashtags TEXT[] DEFAULT '{}',
  error TEXT,
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_publish_status ON publish_queue(status);
CREATE INDEX idx_publish_campaign ON publish_queue(campaign_id);

-- ══════════════════════════════════════════════
-- COST RECORDS — track spend per stage per source/clip
-- ══════════════════════════════════════════════

CREATE TABLE cost_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id),
  source_id UUID REFERENCES sources(id),
  clip_id UUID REFERENCES clips(id),
  stage TEXT NOT NULL CHECK (stage IN ('ingest', 'analyze', 'extract', 'edit', 'score', 'publish')),
  provider TEXT,                       -- 'gemini', 'r2', 'ffmpeg', 'whisper'
  amount_usd NUMERIC(10,6) NOT NULL,
  metadata JSONB,                      -- Tokens used, compute time, etc.
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_costs_user_month ON cost_records(user_id, created_at);
CREATE INDEX idx_costs_campaign ON cost_records(campaign_id);

-- ══════════════════════════════════════════════
-- FUNCTIONS — auto-update timestamps
-- ══════════════════════════════════════════════

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_campaigns_updated BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_sources_updated BEFORE UPDATE ON sources FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_clips_updated BEFORE UPDATE ON clips FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_taste_profiles_updated BEFORE UPDATE ON taste_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_sessions_updated BEFORE UPDATE ON sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_publish_queue_updated BEFORE UPDATE ON publish_queue FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ══════════════════════════════════════════════
-- FUNCTION — update campaign aggregate counts
-- ══════════════════════════════════════════════

CREATE OR REPLACE FUNCTION update_campaign_counts()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE campaigns SET
    clip_count = (SELECT COUNT(*) FROM clips WHERE campaign_id = COALESCE(NEW.campaign_id, OLD.campaign_id)),
    reviewed_count = (SELECT COUNT(*) FROM decisions WHERE campaign_id = COALESCE(NEW.campaign_id, OLD.campaign_id)),
    shipped_count = (SELECT COUNT(*) FROM decisions WHERE campaign_id = COALESCE(NEW.campaign_id, OLD.campaign_id) AND decision = 'ship')
  WHERE id = COALESCE(NEW.campaign_id, OLD.campaign_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_clips_count AFTER INSERT OR DELETE ON clips FOR EACH ROW EXECUTE FUNCTION update_campaign_counts();
CREATE TRIGGER trg_decisions_count AFTER INSERT OR DELETE ON decisions FOR EACH ROW EXECUTE FUNCTION update_campaign_counts();
