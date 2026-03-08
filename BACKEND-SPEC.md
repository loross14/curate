# CURATE Backend Specification

> Post-AI content engine. AI produces clips, humans curate them by swiping. Ship or skip.

**Status:** Stub — frontend prototype complete, backend unbuilt.
**Stack:** Next.js 16 (App Router) on Vercel, Tailwind 4, TypeScript 5.
**Current state:** All data is hardcoded in `src/lib/clips.ts`. No API routes, no database, no auth.

---

## Architecture (Stub)

CURATE runs a 7-agent pipeline that turns long-form video into platform-ready short clips. The human sits at stage 6 — the curation layer — and makes the final ship/skip call.

### Pipeline

```
Source Video
    |
    v
[1. INGEST AGENT]
    Accepts a YouTube URL (or uploaded file).
    Downloads video + metadata via yt-dlp.
    Stores raw asset in cloud storage (R2 or S3).
    Emits: raw_video record with source_url, duration, file_key.

    |
    v
[2. ANALYZE AGENT]
    Sends video (or chunked frames + transcript) to Gemini 2.5 Pro.
    Prompt: "Identify all segments that could stand alone as short-form clips.
             For each, return: start_time, end_time, topic, energy_level,
             clip_type, suggested_hook, virality_estimate, reasoning."
    Emits: array of candidate_clip records with timestamps + AI metadata.
    Cost: ~$0.05-0.15 per hour of video (Gemini multimodal pricing).

    |
    v
[3. EXTRACT AGENT]
    For each candidate_clip, runs ffmpeg to cut the segment from raw video.
    Applies: re-encode to vertical (9:16) or keep horizontal based on platform targets.
    Stores extracted clip in cloud storage.
    Emits: clip record with file_key, duration, resolution, codec.

    |
    v
[4. EDIT AGENT]  (v2 — not in prototype)
    Auto-applies: subtitles (Whisper), title card, branding overlay.
    Platform-specific aspect ratio variants (9:16, 1:1, 16:9).
    Emits: edited_clip variants per platform.

    |
    v
[5. SCORE AGENT]
    Combines Gemini analysis with taste profile weights.
    Computes composite virality_score (0-10) using:
      - AI virality estimate (40%)
      - Taste profile alignment (30%)
      - Historical engagement data from similar clips (20%)
      - Recency/trend bonus (10%)
    Sorts clips by score descending.
    Emits: scored clips ready for curation session.

    |
    v
[6. CURATE (Human)]  <-- This is the frontend. Already built.
    User swipes through scored clips: ship or skip.
    Ships go to publish queue.
    Skips feed back into the Learn agent.

    |
    v
[7. PUBLISH AGENT]
    Takes shipped clips and pushes to target platforms.
    Platform adapters: TikTok, Instagram Reels, YouTube Shorts, LinkedIn, X, Facebook.
    Handles: upload, caption, hashtags, scheduling.
    Emits: publish_record with platform_id, post_url, status.

    |
    v
[LEARN AGENT]  (background, continuous)
    Ingests: ship/skip decisions, engagement metrics from published clips.
    Updates: taste profile weights, score model calibration.
    Feedback loop: better scores over time = fewer skips = faster sessions.
```

### Taste Profiles

A taste profile is a JSON config that tells the Score Agent what this user/brand considers "good content." Stored in the database, editable via UI.

```json
{
  "id": "tp_001",
  "name": "Moon or Bust — Viral Focus",
  "owner_id": "user_abc",
  "weights": {
    "energy": { "high": 1.5, "medium": 1.0, "low": 0.3 },
    "type": {
      "hot_take": 1.4,
      "funny": 1.3,
      "insight": 1.0,
      "guest_highlight": 1.1,
      "education": 0.8,
      "breaking_news": 1.2
    },
    "sentiment": {
      "bullish": 1.1,
      "bearish": 0.9,
      "mixed": 1.0,
      "neutral": 0.7
    },
    "min_duration_seconds": 15,
    "max_duration_seconds": 90,
    "preferred_platforms": ["TikTok", "IG Reels", "YT Shorts"],
    "tag_boosts": { "crypto": 1.2, "DeFi": 1.1 },
    "tag_penalties": { "sponsored": 0.5 }
  },
  "score_threshold": 6.0,
  "created_at": "2026-03-08T00:00:00Z",
  "updated_at": "2026-03-08T00:00:00Z"
}
```

### Cost Tracking

Every pipeline run tracks costs per clip:

| Stage | Cost Driver | Estimate |
|-------|-------------|----------|
| Ingest | Storage write | ~$0.001/clip |
| Analyze | Gemini API (multimodal) | ~$0.02-0.05/clip |
| Extract | ffmpeg compute (serverless or local) | ~$0.005/clip |
| Edit | Whisper + ffmpeg | ~$0.01/clip (v2) |
| Score | Compute only | ~$0.001/clip |
| Publish | Platform API calls | free (API) |
| **Total** | | **~$0.04-0.07/clip** |

Cost records stored per clip. Aggregated per session, per user, per month. Hard ceiling enforcement at the session level — if a pipeline run would exceed the user's monthly budget, it halts before Analyze and notifies.

### Engagement Feedback Loop

```
Published clip on TikTok
    |
    v
Webhook / polling cron (every 6h)
    Fetches: views, likes, shares, comments, watch_time, completion_rate
    |
    v
engagement_metrics table
    |
    v
Learn Agent reads metrics + original ship/skip decisions
    Correlates: "clips with energy=high AND type=hot_take get 3x engagement"
    Updates: taste_profile weights, score model coefficients
    |
    v
Next session's Score Agent uses updated model
```

---

## API Routes (Stub)

All routes under `/api/`. Next.js App Router route handlers. JSON request/response.

### `GET /api/clips`

Fetch clips for a curation session.

```typescript
// Query params
interface GetClipsParams {
  session_id?: string;       // Resume existing session
  taste_profile_id?: string; // Which taste profile to score against
  source_id?: string;        // Filter by source video
  limit?: number;            // Default 20
  min_score?: number;        // Floor filter, default from taste profile
}

// Response
interface GetClipsResponse {
  clips: Clip[];             // Sorted by score descending
  session_id: string;        // Created if not provided
  total: number;
  remaining: number;
}
```

### `POST /api/clips`

Record a ship/skip decision.

```typescript
// Request body
interface ClipDecisionRequest {
  session_id: string;
  clip_id: string;
  decision: "ship" | "skip";
  time_spent_ms: number;     // How long user looked at clip before deciding
  notes?: string;            // Optional human note ("trim first 3 seconds")
}

// Response
interface ClipDecisionResponse {
  decision_id: string;
  remaining: number;
  session_complete: boolean;
}
```

### `GET /api/taste-profile`

List taste profiles for authenticated user.

```typescript
interface TasteProfileListResponse {
  profiles: TasteProfile[];
  active_id: string;         // Currently active profile
}
```

### `POST /api/taste-profile`

Create a new taste profile.

```typescript
// Request body: TasteProfile (without id, created_at, updated_at)
// Response: full TasteProfile with generated id
```

### `PUT /api/taste-profile/:id`

Update an existing taste profile.

### `DELETE /api/taste-profile/:id`

Delete a taste profile. Cannot delete the last/active one.

### `GET /api/sessions`

Session history and analytics.

```typescript
interface SessionsResponse {
  sessions: {
    id: string;
    started_at: string;
    completed_at: string | null;
    total_clips: number;
    shipped: number;
    skipped: number;
    avg_decision_time_ms: number;
    taste_profile_id: string;
    source_ids: string[];
  }[];
  analytics: {
    total_sessions: number;
    total_shipped: number;
    total_skipped: number;
    ship_rate: number;        // shipped / total
    avg_session_duration_ms: number;
  };
}
```

### `GET /api/sessions/:id`

Single session detail with all decisions.

### `POST /api/publish`

Trigger publish for shipped clips.

```typescript
interface PublishRequest {
  clip_ids: string[];
  platforms: string[];        // ["tiktok", "ig_reels", "yt_shorts"]
  schedule_at?: string;       // ISO 8601, null = immediate
  caption_template?: string;  // "{{hook}} | {{episode}}"
  hashtags?: string[];
}

interface PublishResponse {
  jobs: {
    clip_id: string;
    platform: string;
    status: "queued" | "processing" | "published" | "failed";
    job_id: string;
  }[];
}
```

### `POST /api/ingest`

Submit a source video for pipeline processing.

```typescript
interface IngestRequest {
  source_url: string;         // YouTube URL
  taste_profile_id: string;
  auto_session?: boolean;     // Create curation session when pipeline completes
  notify?: boolean;           // Send notification when ready
}

interface IngestResponse {
  source_id: string;
  status: "accepted";
  estimated_clips: number;    // Rough estimate based on video duration
  estimated_cost: number;     // In USD
  estimated_ready_at: string; // ISO 8601
}
```

### `GET /api/ingest/:id`

Poll pipeline status.

```typescript
interface IngestStatusResponse {
  source_id: string;
  status: "downloading" | "analyzing" | "extracting" | "scoring" | "ready" | "failed";
  progress: number;           // 0-100
  clips_found: number;
  error?: string;
}
```

### `GET /api/costs`

Cost dashboard for the authenticated user.

```typescript
interface CostsResponse {
  current_month: {
    total_usd: number;
    by_stage: Record<string, number>;
    by_source: { source_id: string; cost: number }[];
    clips_processed: number;
  };
  budget: {
    monthly_limit_usd: number;
    remaining_usd: number;
    projected_month_end_usd: number;
  };
}
```

---

## Database Schema (Stub)

Postgres (Supabase or Neon). All tables have `id` (UUID), `created_at`, `updated_at`.

### `users`

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  monthly_budget_usd NUMERIC(10,2) DEFAULT 50.00,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### `taste_profiles`

```sql
CREATE TABLE taste_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  weights JSONB NOT NULL,          -- The full weights object from taste profile spec
  score_threshold NUMERIC(3,1) DEFAULT 6.0,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### `sources`

```sql
CREATE TABLE sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  source_url TEXT NOT NULL,
  platform TEXT NOT NULL,           -- 'youtube', 'upload', etc.
  title TEXT,
  duration_seconds INTEGER,
  file_key TEXT,                    -- Cloud storage key for raw video
  metadata JSONB,                   -- YouTube API metadata, channel info, etc.
  pipeline_status TEXT DEFAULT 'pending',  -- pending, downloading, analyzing, extracting, scoring, ready, failed
  pipeline_error TEXT,
  cost_usd NUMERIC(10,4) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### `clips`

```sql
CREATE TABLE clips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID REFERENCES sources(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  hook TEXT,
  start_seconds NUMERIC(10,2) NOT NULL,
  end_seconds NUMERIC(10,2) NOT NULL,
  duration_seconds NUMERIC(10,2) GENERATED ALWAYS AS (end_seconds - start_seconds) STORED,
  file_key TEXT,                    -- Cloud storage key for extracted clip
  thumbnail_key TEXT,
  energy TEXT CHECK (energy IN ('high', 'medium', 'low')),
  type TEXT CHECK (type IN ('hot_take', 'insight', 'funny', 'breaking_news', 'guest_highlight', 'education')),
  sentiment TEXT CHECK (sentiment IN ('bullish', 'bearish', 'neutral', 'mixed')),
  tags TEXT[] DEFAULT '{}',
  platforms TEXT[] DEFAULT '{}',    -- Recommended platforms
  ai_reasoning TEXT,                -- Why the AI flagged this segment
  virality_score NUMERIC(3,1),     -- Composite score from Score Agent
  ai_virality_estimate NUMERIC(3,1), -- Raw score from Gemini
  taste_score NUMERIC(3,1),        -- Score component from taste profile alignment
  cost_usd NUMERIC(10,4) DEFAULT 0,
  guest_name TEXT,
  guest_title TEXT,
  episode_title TEXT,
  episode_number INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_clips_source ON clips(source_id);
CREATE INDEX idx_clips_user ON clips(user_id);
CREATE INDEX idx_clips_score ON clips(virality_score DESC);
```

### `sessions`

```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  taste_profile_id UUID REFERENCES taste_profiles(id),
  source_ids UUID[] DEFAULT '{}',
  status TEXT DEFAULT 'active',     -- active, completed, abandoned
  total_clips INTEGER DEFAULT 0,
  shipped INTEGER DEFAULT 0,
  skipped INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### `decisions`

```sql
CREATE TABLE decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  clip_id UUID REFERENCES clips(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  decision TEXT NOT NULL CHECK (decision IN ('ship', 'skip')),
  time_spent_ms INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(session_id, clip_id)
);

CREATE INDEX idx_decisions_session ON decisions(session_id);
CREATE INDEX idx_decisions_clip ON decisions(clip_id);
```

### `publish_queue`

```sql
CREATE TABLE publish_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clip_id UUID REFERENCES clips(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  decision_id UUID REFERENCES decisions(id),
  platform TEXT NOT NULL,
  status TEXT DEFAULT 'queued',     -- queued, processing, published, failed, cancelled
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  platform_post_id TEXT,            -- ID returned by platform after publish
  platform_post_url TEXT,
  caption TEXT,
  hashtags TEXT[] DEFAULT '{}',
  error TEXT,
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_publish_queue_status ON publish_queue(status);
```

### `engagement_metrics`

```sql
CREATE TABLE engagement_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  publish_id UUID REFERENCES publish_queue(id) ON DELETE CASCADE,
  clip_id UUID REFERENCES clips(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  watch_time_seconds NUMERIC(10,2) DEFAULT 0,
  avg_completion_rate NUMERIC(5,4) DEFAULT 0, -- 0.0000 to 1.0000
  fetched_at TIMESTAMPTZ DEFAULT now(),
  raw_data JSONB,                   -- Full platform API response
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_engagement_publish ON engagement_metrics(publish_id);
CREATE INDEX idx_engagement_clip ON engagement_metrics(clip_id);
```

### `cost_records`

```sql
CREATE TABLE cost_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  source_id UUID REFERENCES sources(id),
  clip_id UUID REFERENCES clips(id),
  stage TEXT NOT NULL,              -- 'ingest', 'analyze', 'extract', 'edit', 'score', 'publish'
  provider TEXT,                    -- 'gemini', 'r2', 'ffmpeg', 'whisper'
  amount_usd NUMERIC(10,6) NOT NULL,
  metadata JSONB,                   -- Tokens used, compute time, etc.
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_costs_user_month ON cost_records(user_id, created_at);
```

---

## External Services

### Gemini API (Video Analysis)

- **Model:** Gemini 2.5 Pro (multimodal — accepts video natively)
- **Usage:** Analyze Agent sends full video or chunked segments. Prompt requests structured JSON output with clip candidates.
- **Auth:** API key stored in environment variable `GEMINI_API_KEY`
- **Pricing:** ~$1.25/hr video input at current rates. A 1-hour podcast yields ~15-25 candidate clips.
- **Fallback:** If Gemini is down or rate-limited, queue for retry. No alternative model for v1 — video-native multimodal is the key differentiator.

### YouTube Data API v3

- **Usage:** Fetch video metadata (title, description, duration, channel info, thumbnails) during Ingest.
- **Auth:** API key for public data, OAuth2 for channel management / upload.
- **Quota:** 10,000 units/day free tier. `videos.list` = 1 unit. Sufficient for prototype.
- **Alternative:** yt-dlp for metadata extraction without API quota consumption.

### Platform APIs (Publish Agent)

| Platform | API | Upload Support | Scheduling | Notes |
|----------|-----|---------------|------------|-------|
| TikTok | Content Posting API | Yes (direct upload) | Yes | Requires app review. 500 posts/day limit. |
| Instagram Reels | Instagram Graph API | Yes (via container) | Yes | Business/Creator accounts only. 25 posts/24h. |
| YouTube Shorts | YouTube Data API v3 | Yes (resumable upload) | Yes | OAuth2 required. 100 uploads/day. |
| LinkedIn | LinkedIn Marketing API | Yes (video upload) | No native scheduling | Requires Marketing Developer Platform access. |
| X (Twitter) | X API v2 | Yes (media upload) | No native scheduling | Free tier: 1500 tweets/month. Basic: $100/mo. |
| Facebook | Facebook Graph API | Yes (via Pages) | Yes | Page access token required. |

### ffmpeg (Clip Extraction)

- **Usage:** Extract Agent cuts clips from raw video. Re-encodes for platform specs.
- **Deployment options:**
  - Local binary (prototype) — runs on dev machine or Vercel serverless (10s timeout problem)
  - Cloud function (production) — AWS Lambda with ffmpeg layer, or Cloudflare Workers with ffmpeg-wasm
  - Managed service — Mux, Cloudflare Stream, or AWS MediaConvert
- **Codec targets:** H.264, AAC, MP4 container. Platform-specific bitrate/resolution presets.

### Cloud Storage (Clip Assets)

- **Primary candidate:** Cloudflare R2 (S3-compatible, no egress fees)
- **Alternative:** AWS S3, Vercel Blob
- **Structure:** `/{user_id}/sources/{source_id}/raw.mp4`, `/{user_id}/clips/{clip_id}/clip.mp4`
- **CDN:** R2 has built-in CDN via custom domains. Or Cloudflare Stream for adaptive bitrate.

### Whisper (Transcription — v2)

- **Usage:** Edit Agent generates accurate subtitles for clips.
- **Options:** OpenAI Whisper API ($0.006/min), or self-hosted whisper.cpp for cost control.

---

## Open Questions

### 1. ffmpeg: local vs. cloud?

The prototype can shell out to ffmpeg locally. But Vercel serverless functions have a 10-second execution limit (50s on Pro). A 90-second clip extraction with re-encoding will exceed that. Options:
- Vercel Pro with 300s function timeout ($$)
- Offload to a dedicated worker (Fly.io, Railway, AWS Lambda with 15-minute timeout)
- Use a managed transcoding service (Mux, AWS MediaConvert) and eat the per-minute cost
- Run ffmpeg-wasm in a Cloudflare Worker (untested at this scale)

**Decision needed:** What's the ceiling on clip processing time, and does the prototype need real extraction or can it use YouTube embeds with timestamp params (current approach)?

### 2. Auth strategy?

Current frontend has no auth. Options:
- **Clerk** — fastest to integrate, good Next.js support, $25/mo after 10k MAU
- **NextAuth.js (Auth.js v5)** — free, self-hosted, more setup, full control
- **Supabase Auth** — free if already using Supabase for DB, magic link + OAuth
- **No auth for prototype** — single-user mode, add auth later

For a prototype with one user (you), Supabase Auth is appealing if the DB is already there. Clerk is the fastest path if you want to demo multi-user later.

### 3. Real-time scoring model calibration

The Score Agent combines AI output with taste profile weights. But:
- How often should the Learn Agent update weights? After every session? Daily?
- Should weight updates be automatic or require human approval?
- What's the minimum number of decisions before the model has enough signal? (Probably 50-100 ship/skip decisions.)
- Cold start problem: new taste profiles have no history. Use global defaults? Copy from a template?

### 4. Multi-tenant taste profile isolation

If CURATE becomes multi-user:
- Are taste profiles strictly per-user, or can they be shared/forked?
- Could a team share a taste profile (e.g., a podcast's social team)?
- Row-level security in Postgres (Supabase RLS) handles isolation, but shared profiles need a different model — maybe `taste_profiles` gets an `org_id` column.

### 5. Cost ceiling enforcement

The `monthly_budget_usd` field on `users` sets a ceiling. But:
- At what point in the pipeline do you check? Before Ingest (estimate) or before Analyze (most expensive step)?
- What happens when a user hits 90% of budget? Warning? Hard stop?
- Should cost ceilings be per-source or per-month aggregate?
- Gemini pricing can change. How to handle mid-month price increases?

### 6. Clip quality thresholds

Not all AI-identified segments are worth extracting. But:
- What's the minimum `ai_virality_estimate` to even bother extracting? (Below 4.0 is probably noise.)
- Should the threshold be global or per-taste-profile?
- Should low-scoring clips be discarded, or kept in a "maybe" tier for future review?
- How to handle clips that are too short (<10s) or too long (>120s)?

### 7. Platform API rate limits and TOS

Each platform has different rules:
- TikTok requires app review and prohibits "fully automated posting" — does CURATE qualify since a human approves each clip?
- Instagram's 25 reels/24h limit means batch publishing needs throttling.
- X's free API tier is essentially unusable for publishing. Basic ($100/mo) or Pro ($5000/mo)?
- LinkedIn's video API is in beta with limited access.
- Do we need a queue with backoff, or is a simple cron sufficient for prototype volume?

### 8. Video hosting strategy

Current prototype embeds YouTube via iframe with `?start=` and `?end=` params. For production:
- **YouTube embeds** — free, no storage cost, but no control over playback UX, and `?end=` is unreliable.
- **Self-hosted on R2/S3** — full control, costs scale with views, need a video player (Video.js, Mux Player).
- **Cloudflare Stream** — $1/1000 min stored, $0.01/1000 min delivered. Adaptive bitrate. Good DX.
- **Mux** — $0.007/min stored + $0.006/min streamed. Best developer experience. Expensive at scale.

**For prototype:** Keep YouTube embeds. For production: Cloudflare Stream is the sweet spot.

### 9. Webhook architecture for engagement tracking

Engagement data needs to flow back to CURATE for the Learn Agent:
- TikTok has webhooks for content insights (beta).
- Instagram/Facebook have webhooks via App subscriptions.
- YouTube has no push-based analytics — must poll via YouTube Analytics API (quota-limited).
- X has no engagement webhooks at all — polling only.

Likely architecture: a cron job (Vercel Cron or external) that polls all platforms every 6 hours for published clips less than 30 days old. Store snapshots in `engagement_metrics`. Webhook support where available to supplement polling.

### 10. How does the "morning batch" cron work?

The ideal UX: you wake up, open CURATE, and 15-20 pre-scored clips are waiting. That means:
- A nightly cron (2 AM?) triggers Ingest for any queued source URLs.
- Pipeline runs through Analyze, Extract, Score overnight.
- By 7 AM, clips are ready in a session.
- But: who queues the source URLs? Manual? RSS feed of new episodes? YouTube channel subscription monitor?
- Vercel Cron is limited to 1 cron job on Hobby, 40 on Pro, with 10s/300s function duration limits.
- Probably need an external scheduler (Inngest, Trigger.dev, or a simple Railway worker) for long-running pipeline jobs.

### 11. Mobile app vs. PWA vs. responsive web?

The swiping UX screams mobile-first. Options:
- **Responsive web (current)** — works now, Tailwind handles it, but touch gestures need work.
- **PWA** — add a manifest + service worker, installable on home screen, push notifications. Low effort, high impact.
- **React Native / Expo** — native feel, but doubles the codebase and maintenance surface.
- **Capacitor** — wrap the Next.js app in a native shell. Might be the sweet spot for v2.

**Recommendation:** PWA for prototype. The swipe-to-curate flow works great as a "check it while you drink coffee" mobile experience. Add `next-pwa` and a service worker.

### 12. Transcript-first vs. video-first analysis?

Gemini can analyze video natively (frames + audio). But:
- Transcription-first (Whisper) + text analysis is cheaper and faster.
- Video-first catches visual moments (reactions, on-screen graphics) that transcript misses.
- Hybrid: transcribe first for rough segmentation, then send candidate segments to Gemini for visual analysis.
- Cost difference: ~$0.006/min (Whisper) vs. ~$0.02/min (Gemini video input).

### 13. Undo support in curation?

The current frontend has no undo. If you accidentally skip a banger:
- Store decisions as events, allow "undo last" within a session.
- Or: allow re-review of skipped clips at end of session (the SessionSummary already shows skipped clips).
- Database-level: decisions are append-only with a `superseded_by` column for undos.

### 14. Batch size and session pacing

The demo has 12 hardcoded clips. In production:
- What's the ideal session size? 10? 20? 50?
- Should it adapt based on user behavior? (If ship rate drops below 10%, suggest ending the session.)
- Should clips be pre-fetched and cached, or loaded one at a time?
- "Endless scroll" mode vs. fixed-batch mode with summary screen.

### 15. Source diversity and freshness

If a user subscribes to multiple podcast feeds:
- Should sessions mix clips from different sources, or group by source?
- How to handle a backlog of 10 unprocessed episodes? Process newest first? Oldest first?
- Freshness decay: a clip from yesterday's episode should score higher than one from last month, all else equal. How steep is the decay curve?
