-- De-duplicate repair_quotes by business key and enforce uniqueness for safe upsert.

WITH ranked AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      PARTITION BY brand, model, repair_item, quality
      ORDER BY updated_at DESC NULLS LAST, created_at DESC NULLS LAST, id DESC
    ) AS rn
  FROM repair_quotes
)
DELETE FROM repair_quotes rq
USING ranked r
WHERE rq.id = r.id
  AND r.rn > 1;

CREATE UNIQUE INDEX IF NOT EXISTS uq_repair_quotes_business_key
ON repair_quotes (brand, model, repair_item, quality);

