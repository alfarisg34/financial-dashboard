-- Migration: Add User Roles, Expiration/Grace Period, and Admin Management
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Ensure public.profiles table exists with required fields
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE,
    display_name TEXT,
    role TEXT DEFAULT 'user', -- 'admin' or 'user'
    expires_at TIMESTAMPTZ,    -- Expiration timestamp (e.g. 2026-09-14 23:59:59)
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Add columns if profiles already exists without them
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='role') THEN
        ALTER TABLE public.profiles ADD COLUMN role TEXT DEFAULT 'user';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='expires_at') THEN
        ALTER TABLE public.profiles ADD COLUMN expires_at TIMESTAMPTZ;
    END IF;
END $$;

-- 2. Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow select for all authenticated users and anon verification" ON public.profiles;
CREATE POLICY "Allow select for all authenticated users and anon verification"
ON public.profiles FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Allow users to update own profile or admins to update all" ON public.profiles;
CREATE POLICY "Allow users to update own profile or admins to update all"
ON public.profiles FOR ALL
USING (
    auth.uid() = id 
    OR EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- 3. Populate existing users into profiles if not already there
INSERT INTO public.profiles (id, email, display_name, role, expires_at)
SELECT 
    id, 
    email,
    split_part(email, '@', 1) AS display_name,
    CASE 
        WHEN email = 'admin@fintrack.com' THEN 'admin'
        ELSE 'user'
    END AS role,
    -- Default 1 year expiration for existing accounts
    now() + INTERVAL '1 year' AS expires_at
FROM auth.users
ON CONFLICT (id) DO UPDATE 
SET role = CASE 
    WHEN EXCLUDED.email = 'admin@fintrack.com' THEN 'admin' 
    ELSE profiles.role 
END;

-- 4. Automatically insert profile on new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, role, expires_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', CASE WHEN NEW.email = 'admin@fintrack.com' THEN 'admin' ELSE 'user' END),
    CASE 
        WHEN NEW.raw_user_meta_data->>'expires_at' IS NOT NULL 
        THEN (NEW.raw_user_meta_data->>'expires_at')::timestamptz
        ELSE now() + INTERVAL '1 month'
    END
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    role = COALESCE(EXCLUDED.role, profiles.role),
    expires_at = COALESCE(EXCLUDED.expires_at, profiles.expires_at);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
