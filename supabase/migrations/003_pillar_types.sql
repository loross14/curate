-- Replace generic clip types with campaign pillar slugs
-- Old: hot_take, insight, funny, breaking_news, guest_highlight, education
-- New: aged-milk, aged-wine, history, builders, time-capsules, vibe, marathon, launch, guests, community

ALTER TABLE clips DROP CONSTRAINT clips_type_check;
ALTER TABLE clips ADD CONSTRAINT clips_type_check CHECK (type IN (
  'aged-milk', 'aged-wine', 'history', 'builders', 'time-capsules',
  'vibe', 'marathon', 'launch', 'guests', 'community'
));

-- Update existing clip data from old types to pillar slugs
UPDATE clips SET type = 'builders' WHERE type = 'guest_highlight';
UPDATE clips SET type = 'aged-milk' WHERE type = 'hot_take';
UPDATE clips SET type = 'aged-wine' WHERE type = 'insight';
UPDATE clips SET type = 'vibe' WHERE type = 'funny';
UPDATE clips SET type = 'time-capsules' WHERE type = 'breaking_news';
UPDATE clips SET type = 'history' WHERE type = 'education';
