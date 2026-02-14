-- Create repair_quotes table
CREATE TABLE IF NOT EXISTS repair_quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  repair_item TEXT NOT NULL, -- Display name (e.g. "屏幕 (组装)")
  repair_type TEXT NOT NULL DEFAULT 'other', -- screen, battery, other
  quality TEXT NOT NULL DEFAULT 'standard', -- orig, comp, altcap, standard
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  warranty TEXT DEFAULT '',
  priority INTEGER DEFAULT 0, -- For sorting
  is_unstable BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indices
CREATE INDEX IF NOT EXISTS idx_repair_quotes_brand ON repair_quotes(brand);
CREATE INDEX IF NOT EXISTS idx_repair_quotes_model ON repair_quotes(model);

-- Enable Row Level Security
ALTER TABLE repair_quotes ENABLE ROW LEVEL SECURITY;

-- Create policies (Development mode: public access)
-- In production, write/update/delete should be restricted to authenticated users
CREATE POLICY "Allow public read access" ON repair_quotes FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON repair_quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON repair_quotes FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access" ON repair_quotes FOR DELETE USING (true);
