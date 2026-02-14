-- Create quotes table for storing phone repair quotes
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  repair_id TEXT NOT NULL,
  repair_label TEXT NOT NULL,
  repair_type TEXT NOT NULL CHECK (repair_type IN ('screen', 'battery', 'other')),
  quality TEXT NOT NULL CHECK (quality IN ('orig', 'comp', 'altcap', 'standard')),
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  warranty TEXT DEFAULT '',
  count INTEGER DEFAULT 1,
  is_unstable BOOLEAN DEFAULT FALSE,
  price_spread TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_quotes_brand ON quotes(brand);
CREATE INDEX IF NOT EXISTS idx_quotes_model ON quotes(model);
CREATE INDEX IF NOT EXISTS idx_quotes_brand_model ON quotes(brand, model);

-- Enable Row Level Security
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for now (public access)
-- In production, you may want to add user-based RLS
CREATE POLICY "Allow public read access" ON quotes FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON quotes FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access" ON quotes FOR DELETE USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_quotes_updated_at ON quotes;
CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON quotes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
