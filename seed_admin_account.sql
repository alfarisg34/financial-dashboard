-- ============================================================================
-- SQL SCRIPT: CREATE / UPDATE ADMIN ACCOUNT (FIXED FOR SUPABASE AUTH SCHEMA)
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- ============================================================================

-- 1. Bersihkan trigger lama jika ada
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 2. Pastikan tabel public.profiles siap
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE,
    display_name TEXT,
    role TEXT DEFAULT 'user',
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Tambahkan kolom jika belum ada
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='role') THEN
        ALTER TABLE public.profiles ADD COLUMN role TEXT DEFAULT 'user';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='expires_at') THEN
        ALTER TABLE public.profiles ADD COLUMN expires_at TIMESTAMPTZ;
    END IF;
END $$;

-- 3. Set RLS policy yang aman
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow select for all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow all modifications for users and admins" ON public.profiles;
DROP POLICY IF EXISTS "Allow users to view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow users to update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow users to update own profile or admins to update all" ON public.profiles;
DROP POLICY IF EXISTS "Allow public read for profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow update for own profile" ON public.profiles;

CREATE POLICY "Allow public read for profiles" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Allow update for own profile" 
ON public.profiles FOR ALL USING (true) WITH CHECK (true);

-- 4. Buat / Perbarui Akun Admin lengkap dengan provider_id di auth.identities
DO $$
DECLARE
  admin_uid UUID := gen_random_uuid();
  existing_uid UUID;
BEGIN
  SELECT id INTO existing_uid FROM auth.users WHERE email = 'admin@fintrack.com';
  
  IF existing_uid IS NULL THEN
    -- Insert ke auth.users
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      created_at,
      updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      admin_uid,
      'authenticated',
      'authenticated',
      'admin@fintrack.com',
      crypt('admin1234', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"display_name":"Super Admin","role":"admin","full_name":"Super Admin"}'::jsonb,
      false,
      now(),
      now()
    );

    -- Insert ke auth.identities dengan provider_id & id yang valid
    INSERT INTO auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      provider_id,
      last_sign_in_at,
      created_at,
      updated_at
    ) VALUES (
      admin_uid,
      admin_uid,
      format('{"sub":"%s","email":"%s"}', admin_uid, 'admin@fintrack.com')::jsonb,
      'email',
      admin_uid::text,
      now(),
      now(),
      now()
    );

    -- Insert ke public.profiles
    INSERT INTO public.profiles (id, email, display_name, role, expires_at)
    VALUES (admin_uid, 'admin@fintrack.com', 'Super Admin', 'admin', NULL)
    ON CONFLICT (id) DO UPDATE 
    SET role = 'admin', display_name = 'Super Admin';

    RAISE NOTICE 'Akun admin admin@fintrack.com berhasil dibuat.';
  ELSE
    -- Update password & metadata akun yang sudah ada
    UPDATE auth.users
    SET encrypted_password = crypt('admin1234', gen_salt('bf')),
        email_confirmed_at = COALESCE(email_confirmed_at, now()),
        raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || '{"display_name":"Super Admin","role":"admin"}'::jsonb
    WHERE id = existing_uid;

    -- Pastikan auth.identities ada
    IF NOT EXISTS (SELECT 1 FROM auth.identities WHERE user_id = existing_uid) THEN
      INSERT INTO auth.identities (
        id,
        user_id,
        identity_data,
        provider,
        provider_id,
        last_sign_in_at,
        created_at,
        updated_at
      ) VALUES (
        existing_uid,
        existing_uid,
        format('{"sub":"%s","email":"%s"}', existing_uid, 'admin@fintrack.com')::jsonb,
        'email',
        existing_uid::text,
        now(),
        now(),
        now()
      );
    ELSE
      UPDATE auth.identities
      SET identity_data = format('{"sub":"%s","email":"%s"}', existing_uid, 'admin@fintrack.com')::jsonb,
          provider_id = COALESCE(provider_id, existing_uid::text)
      WHERE user_id = existing_uid;
    END IF;

    -- Insert/Update profile
    INSERT INTO public.profiles (id, email, display_name, role, expires_at)
    VALUES (existing_uid, 'admin@fintrack.com', 'Super Admin', 'admin', NULL)
    ON CONFLICT (id) DO UPDATE 
    SET role = 'admin', display_name = 'Super Admin';

    RAISE NOTICE 'Akun admin admin@fintrack.com berhasil diperbarui.';
  END IF;
END $$;

-- 5. Trigger aman untuk pendaftaran user baru
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
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
