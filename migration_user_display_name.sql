-- Migration: Add user display names
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- ============================================================================
-- OPTION 1: Update Built-in Supabase Auth User Metadata (Easiest & Built-in)
-- ============================================================================
-- This updates the user metadata stored directly inside auth.users so you can
-- access it in Frontend via `supabase.auth.getUser() -> user.user_metadata.display_name`

UPDATE auth.users
SET raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || jsonb_build_object('display_name', 'alfanenis0610', 'full_name', 'alfanenis0610')
WHERE email = 'alfanenis0610@gmail.com';

UPDATE auth.users
SET raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || jsonb_build_object('display_name', 'alfarisg34', 'full_name', 'alfarisg34')
WHERE email = 'alfarisg34@gmail.com';

UPDATE auth.users
SET raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || jsonb_build_object('display_name', 'nenis.rahma.wulan', 'full_name', 'nenis.rahma.wulan')
WHERE email = 'nenis.rahma.wulan@gmail.com';


-- ============================================================================
-- OPTION 2: Create a Custom `public.profiles` Table in Supabase
-- ============================================================================
-- Use this option if you want to query user display names via `supabase.from('profiles')`

-- 1. Create table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE,
    display_name TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow users to view all profiles" ON public.profiles;
CREATE POLICY "Allow users to view all profiles" 
ON public.profiles FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Allow users to update own profile" ON public.profiles;
CREATE POLICY "Allow users to update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- 3. Populate existing accounts into public.profiles
INSERT INTO public.profiles (id, email, display_name)
SELECT 
    id, 
    email,
    CASE 
        WHEN email = 'alfanenis0610@gmail.com' THEN 'alfanenis0610'
        WHEN email = 'alfarisg34@gmail.com' THEN 'alfarisg34'
        WHEN email = 'nenis.rahma.wulan@gmail.com' THEN 'nenis.rahma.wulan'
        ELSE split_part(email, '@', 1)
    END AS display_name
FROM auth.users
WHERE email IN (
    'alfanenis0610@gmail.com',
    'alfarisg34@gmail.com',
    'nenis.rahma.wulan@gmail.com'
)
ON CONFLICT (id) DO UPDATE 
SET display_name = EXCLUDED.display_name,
    email = EXCLUDED.email;

-- 4. Trigger to automatically create a profile row whenever a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
