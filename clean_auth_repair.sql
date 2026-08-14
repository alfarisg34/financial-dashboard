-- ============================================================================
-- SQL SCRIPT: CLEAN REPAIR AUTH TRIGGERS & ORPHANED RECORDS
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- ============================================================================

-- 1. Matikan semua trigger kustom di auth.users yang berpotensi menyebabkan error
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- 2. Hapus akun admin yang corrupt / setengah jadi di auth.users & auth.identities
DELETE FROM auth.identities WHERE identity_data->>'email' = 'admin@fintrack.com' OR email = 'admin@fintrack.com';
DELETE FROM auth.users WHERE email = 'admin@fintrack.com';
DELETE FROM public.profiles WHERE email = 'admin@fintrack.com';

-- 3. Pastikan tabel public.profiles dan permissions-nya bersih
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY,
    email TEXT UNIQUE,
    display_name TEXT,
    role TEXT DEFAULT 'user',
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Pastikan RLS profiles tidak memblokir schema
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
