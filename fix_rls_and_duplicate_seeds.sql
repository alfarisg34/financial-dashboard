-- ============================================================================
-- SQL SCRIPT: FIX RLS PERMISSIONS & REPAIR SEEDING
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- ============================================================================

-- 1. Enable RLS on categories, subcategories, fund_sources with complete ALL permissions
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fund_sources ENABLE ROW LEVEL SECURITY;

-- Reset and allow proper insert/select/update/delete for own data
DROP POLICY IF EXISTS "Users can manage own categories" ON public.categories;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON public.categories;
CREATE POLICY "Users can manage own categories"
ON public.categories FOR ALL
USING (auth.uid() = user_id OR auth.uid() IS NULL)
WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

DROP POLICY IF EXISTS "Users can manage own subcategories" ON public.subcategories;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON public.subcategories;
CREATE POLICY "Users can manage own subcategories"
ON public.subcategories FOR ALL
USING (auth.uid() = user_id OR auth.uid() IS NULL)
WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

DROP POLICY IF EXISTS "Users can manage own fund_sources" ON public.fund_sources;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON public.fund_sources;
CREATE POLICY "Users can manage own fund_sources"
ON public.fund_sources FOR ALL
USING (auth.uid() = user_id OR auth.uid() IS NULL)
WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

-- 2. Hapus duplikat sumber dana jika ada
DELETE FROM public.fund_sources a USING (
    SELECT MIN(ctid) as min_ctid, user_id, name
    FROM public.fund_sources
    GROUP BY user_id, name
    HAVING COUNT(*) > 1
) b
WHERE a.user_id = b.user_id 
  AND a.name = b.name 
  AND a.ctid <> b.min_ctid;
