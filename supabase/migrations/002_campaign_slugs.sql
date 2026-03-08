-- Add slug and display fields to campaigns
ALTER TABLE campaigns ADD COLUMN slug TEXT UNIQUE;
ALTER TABLE campaigns ADD COLUMN source_label TEXT;  -- e.g. "Moon or Bust (Benzinga)"
ALTER TABLE campaigns ADD COLUMN creator TEXT;        -- e.g. "Logan Ross"

-- Set slugs for existing campaigns
UPDATE campaigns SET slug = 'mob-archive', source_label = 'Moon or Bust (Benzinga)', creator = 'Logan Ross'
  WHERE name = 'Moon or Bust Archive';
UPDATE campaigns SET slug = 'birbathon', source_label = 'Birbathon (X Broadcasts + Twitch)', creator = 'Paxton Ross (@birbpax)'
  WHERE name = 'Birbathon 24hr Stream';

-- Make slug required going forward
ALTER TABLE campaigns ALTER COLUMN slug SET NOT NULL;

CREATE INDEX idx_campaigns_slug ON campaigns(slug);
