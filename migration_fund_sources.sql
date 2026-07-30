-- Migration: Add Fund Sources and Transfers support
-- Run this in Supabase SQL Editor

-- 1. Create fund_sources table
CREATE TABLE IF NOT EXISTS public.fund_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    icon TEXT DEFAULT '💰',
    type TEXT DEFAULT 'cash', -- 'cash', 'bank', 'e-wallet', 'other'
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create transfers table
CREATE TABLE IF NOT EXISTS public.transfers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    from_fund_source_id UUID NOT NULL REFERENCES public.fund_sources(id) ON DELETE CASCADE,
    to_fund_source_id UUID NOT NULL REFERENCES public.fund_sources(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL,
    description TEXT,
    date TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Add fund_source_id column to transactions table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name='transactions' AND column_name='fund_source_id'
    ) THEN
        ALTER TABLE public.transactions 
        ADD COLUMN fund_source_id UUID REFERENCES public.fund_sources(id) ON DELETE SET NULL;
    END IF;
END $$;

-- 4. Enable RLS for fund_sources and transfers
ALTER TABLE public.fund_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transfers ENABLE ROW LEVEL SECURITY;

-- 5. RLS policies for fund_sources
DROP POLICY IF EXISTS "Users can manage their own fund sources" ON public.fund_sources;
CREATE POLICY "Users can manage their own fund sources"
ON public.fund_sources FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 6. RLS policies for transfers
DROP POLICY IF EXISTS "Users can manage their own transfers" ON public.transfers;
CREATE POLICY "Users can manage their own transfers"
ON public.transfers FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
