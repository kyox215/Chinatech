-- Add category column to repair_quotes table
ALTER TABLE repair_quotes ADD COLUMN IF NOT EXISTS category TEXT;

-- Create an index on category for faster filtering
CREATE INDEX IF NOT EXISTS idx_repair_quotes_category ON repair_quotes(category);
