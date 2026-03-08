# CURATE — Project Instructions

## What this is
Tinder-style clip curation app. Swipe right to ship, left to skip. Campaign-scoped review sessions over clips extracted from YouTube via Gemini.

## Stack
- Next.js 16 (App Router, Turbopack)
- React 19, Tailwind CSS
- Supabase (Postgres) — project ref: `ovqndmutzpoqysozcwph`
- Vercel prod: https://curate-xi.vercel.app

## Deploy
```bash
vercel --prod
```
This gives Logan a desktop notification. Don't rely on git-triggered deploys alone.

## Supabase DB Changes
There is no direct psql connection or service role key configured. For any DDL (ALTER TABLE, constraints, migrations):

1. Copy the SQL to clipboard with `pbcopy`
2. Open the SQL editor: `open "https://supabase.com/dashboard/project/ovqndmutzpoqysozcwph/sql/new"`
3. Tell Logan to Cmd+V and hit Run
4. Save the migration file to `supabase/migrations/` for version control

## Pillar System (Clip Taxonomy)
Clips are categorized by campaign-defined pillars, NOT generic types. The DB `clips.type` column uses pillar slugs:

**MOB campaign:** `aged-milk`, `aged-wine`, `history`, `builders`, `time-capsules`, `vibe`
**Birbathon campaign:** `marathon`, `launch`, `guests`, `community`

Colors defined in `src/lib/clips.ts` → `PILLAR_COLORS` with `badge`, `card`, `dot` variants.
Helpers: `getPillarBadge()`, `getPillarCard()`, `getPillarDot()`

## Key Architecture
- `src/lib/data.ts` — all Supabase queries (no demo data fallbacks)
- `src/lib/clips.ts` — Clip type, pillar colors, energy dots, status styles
- `src/lib/utils.ts` — shared utilities (avgScore, groupBy, countPlatforms, getInitials)
- `src/lib/useReviewSession.ts` — all review state + keyboard controls
- `src/lib/campaigns.ts` — Campaign types
- `scripts/seed.ts` — seed script for Supabase (38 MOB clips, 2 campaigns)

## Voice
All UI text is lowercase. No title case, no sentence case. Examples: "session complete", "shipping queue", "run again".

## Seed Data
38 clips from 20 Moon or Bust episodes. Birbathon campaign exists as draft with strategy but no clips yet.
Re-seed: `npx tsx scripts/seed.ts`

## Auth (Google OAuth)
- Code is built: `src/lib/auth.ts`, `src/lib/AuthContext.tsx`, `src/components/AuthGuard.tsx`, `src/app/login/page.tsx`
- **Currently disabled**: `AUTH_ENABLED = false` in AuthGuard.tsx
- Google Cloud project created: `curate-app-prod` (project ID)
- **BLOCKER**: OAuth consent screen must be configured via Google Cloud Console UI (no API for personal accounts)
- URL: `https://console.cloud.google.com/apis/credentials/consent?project=curate-app-prod`
- After consent screen: create OAuth client, add redirect URI `https://ovqndmutzpoqysozcwph.supabase.co/auth/v1/callback`
- Then paste client ID + secret into Supabase Google provider settings
- Then add `https://curate-xi.vercel.app` and `http://localhost:3000` as redirect URLs in Supabase URL Configuration
- Flip `AUTH_ENABLED = true` and redeploy

## MVP Scope
Product is a content strategy + campaign management tool, not just a clipping tool. Campaigns contain content deliverables (clips, but extensible to other formats).

Build order: auth → persistent decisions → campaign creation → publish queue → taste profiles

- **Auth**: Google OAuth (code done, config pending)
- **Decisions**: ship/skip saved to Supabase `decisions` table per session
- **Campaign creation**: paste URL → Gemini extracts → review/edit before adding
- **Publish queue**: tracking + export (CSV/JSON), no API integrations
- **Taste profiles**: per existing schema

## Design Principles
- Campaign cards are minimal: name, description, "view campaign" CTA. No clip-specific stats on the home page.
- All campaigns show on dashboard regardless of clip count — Birbathon (0 clips) is valid, it just needs clips generated.
- Home page is a campaign launcher, not a command center. Detail lives on the hero page.
