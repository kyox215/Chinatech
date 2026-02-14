
-- Create repair_prices table
CREATE TABLE IF NOT EXISTS repair_prices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  repair_item TEXT NOT NULL,
  quality TEXT DEFAULT 'standard',
  price NUMERIC NOT NULL,
  warranty TEXT,
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE repair_prices ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON repair_prices FOR SELECT USING (true);

-- Allow service role full access (implicit, but good for clarity if needed)
-- Note: Service role always bypasses RLS.
