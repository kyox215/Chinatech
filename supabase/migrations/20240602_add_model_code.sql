
-- Add model_code column to repair_quotes table
ALTER TABLE repair_quotes 
ADD COLUMN IF NOT EXISTS model_code TEXT;

-- Optional: Create an index for searching model codes
CREATE INDEX IF NOT EXISTS idx_repair_quotes_model_code ON repair_quotes(model_code);
