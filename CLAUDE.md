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
- Google Cloud project: `curate-app-prod` (created, billing linked to 016F76-9CBD58-ECCA76)
- gcloud CLI authed as `logancross@live.com` (binary at `/usr/local/share/google-cloud-sdk/bin/gcloud`)
- Supabase Google provider toggle: ENABLED (but no client ID/secret yet)

### Status: FULLY CONFIGURED AND LIVE
- Google Cloud project: `curate-app-prod`
- OAuth client: `1008150246933-9ssurs1lirvrsbpsci3lj1htc9besi9r.apps.googleusercontent.com`
- Supabase Google provider: configured with client ID + secret
- Redirect URLs: `https://curate-xi.vercel.app`, `http://localhost:3000`
- `AUTH_ENABLED = true` in AuthGuard.tsx
- Creds stored in `.env.local` (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)

### Agent workflow for console UI steps
- Copy values to clipboard with `pbcopy`, open windows with `open`
- Tell Logan to paste + click. Never tell him to "go find" something.
- **Arc browser issue**: `open` command opens in UMich profile by default. Copy URL to clipboard instead and tell Logan to paste in personal profile.

## MVP Scope
**CURATE IS NOT A CLIPPING PLATFORM.** It's a full-stack marketing campaign tool with content deliverables. Clips are the first deliverable type, but the architecture must support other formats long-term. The content strategy step (Gemini analyzing source material → generating a campaign strategy with pillars, moments, guests) is the key differentiator — not the clip extraction itself.

### Pipeline vision (high-level, needs scoping + diagramming next session)
1. **Source intake**: paste URL (YouTube, Twitch, X, upload)
2. **Content strategy**: Gemini analyzes source → generates strategy (pillars, moments, guests, yield estimates, formats) — this is already modeled in the `strategy` JSONB column
3. **Extraction**: Gemini extracts content deliverables guided by the strategy
4. **Curation**: swipe review (ship/skip) — BUILT
5. **Publishing**: tracking + export — TODO

Build order: ~~auth~~ → ~~decisions~~ → campaign creation pipeline → publish queue → taste profiles

- **Auth**: LIVE (Google OAuth via Supabase)
- **Decisions**: LIVE (ship/skip saved to Supabase)
- **Campaign creation**: NEXT — needs high-level scoping + pipeline diagramming before any code. Start with alignment on mechanisms, not implementation.
- **Publish queue**: tracking + export (CSV/JSON), no API integrations
- **Taste profiles**: per existing schema

## Design Principles
- Campaign cards are minimal: name, description, "view campaign" CTA. No clip-specific stats on the home page.
- All campaigns show on dashboard regardless of clip count — Birbathon (0 clips) is valid, it just needs clips generated.
- Home page is a campaign launcher, not a command center. Detail lives on the hero page.
