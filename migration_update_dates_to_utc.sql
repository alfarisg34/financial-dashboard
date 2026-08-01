-- Migration script to update existing transactions & transfers date to created_at (UTC+0)
-- Execute this query in your Supabase SQL Editor to standardize old records to UTC+0

UPDATE transactions
SET date = created_at
WHERE created_at IS NOT NULL;

UPDATE transfers
SET date = created_at
WHERE created_at IS NOT NULL;
