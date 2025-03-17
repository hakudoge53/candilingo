
-- Create a function to check if a column exists in a table
CREATE OR REPLACE FUNCTION public.check_column_exists(
  table_name text,
  column_name text
) RETURNS boolean 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  column_exists boolean;
BEGIN
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = $1
      AND column_name = $2
  ) INTO column_exists;
  
  RETURN column_exists;
END;
$$;

-- Create a function to add a column to a table if it doesn't exist
CREATE OR REPLACE FUNCTION public.add_column_to_table(
  table_name text,
  column_name text,
  column_type text,
  column_default text
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT public.check_column_exists(table_name, column_name) THEN
    EXECUTE format('ALTER TABLE public.%I ADD COLUMN %I %s DEFAULT %s', 
                 table_name, column_name, column_type, column_default);
  END IF;
END;
$$;

-- Add active_organization_id to user_settings if it doesn't exist
DO $$
BEGIN
  IF NOT public.check_column_exists('user_settings', 'active_organization_id') THEN
    PERFORM public.add_column_to_table('user_settings', 'active_organization_id', 'uuid', 'null');
  END IF;
END
$$;
