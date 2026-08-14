-- Migration: Add Soft Delete Support to profiles table
-- Run this in Supabase SQL Editor

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

-- Policy to allow admins to manage all profiles (including deleted ones)
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
