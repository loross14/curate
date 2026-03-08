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
