-- Migration: Add initial_balance to fund_sources table
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard)

ALTER TABLE public.fund_sources 
ADD COLUMN IF NOT EXISTS initial_balance NUMERIC DEFAULT 0;
