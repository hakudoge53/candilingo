
-- Add avatar_url to profiles table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'profiles'
        AND column_name = 'avatar_url'
    ) THEN
        ALTER TABLE public.profiles
        ADD COLUMN avatar_url TEXT;
    END IF;
END $$;

-- Create storage bucket for avatars if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM storage.buckets
        WHERE id = 'avatars'
    ) THEN
        INSERT INTO storage.buckets (id, name, public, file_size_limit)
        VALUES ('avatars', 'avatars', true, 5242880); -- 5MB limit
    END IF;
END $$;

-- Create storage policy to allow authenticated users to upload their own avatars
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM storage.policies
        WHERE name = 'Avatar upload policy'
    ) THEN
        CREATE POLICY "Avatar upload policy"
        ON storage.objects
        FOR INSERT
        TO authenticated
        WITH CHECK (
            bucket_id = 'avatars' AND
            (storage.foldername(name))[1] = auth.uid()::text
        );
    END IF;
END $$;

-- Create storage policy to allow users to update their own avatars
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM storage.policies
        WHERE name = 'Avatar update policy'
    ) THEN
        CREATE POLICY "Avatar update policy"
        ON storage.objects
        FOR UPDATE
        TO authenticated
        USING (
            bucket_id = 'avatars' AND
            (storage.foldername(name))[1] = auth.uid()::text
        );
    END IF;
END $$;

-- Create storage policy to allow users to read all avatars (since they're public)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM storage.policies
        WHERE name = 'Avatar read policy'
    ) THEN
        CREATE POLICY "Avatar read policy"
        ON storage.objects
        FOR SELECT
        TO authenticated
        USING (bucket_id = 'avatars');
    END IF;
END $$;
