-- Add version_name column to cvs table for version management
ALTER TABLE public.cvs ADD COLUMN IF NOT EXISTS version_name TEXT DEFAULT 'Version principale';

-- Add is_public column for public sharing
ALTER TABLE public.cvs ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false;

-- Add share_token for unique public links
ALTER TABLE public.cvs ADD COLUMN IF NOT EXISTS share_token TEXT UNIQUE;

-- Create index for faster public CV lookups
CREATE INDEX IF NOT EXISTS idx_cvs_share_token ON public.cvs(share_token) WHERE share_token IS NOT NULL;

-- Create function to generate share token
CREATE OR REPLACE FUNCTION generate_share_token()
RETURNS TEXT AS $$
DECLARE
  token TEXT;
  token_exists BOOLEAN;
BEGIN
  LOOP
    token := encode(gen_random_bytes(12), 'base64');
    token := replace(replace(replace(token, '/', '-'), '+', '_'), '=', '');
    
    SELECT EXISTS(SELECT 1 FROM public.cvs WHERE share_token = token) INTO token_exists;
    EXIT WHEN NOT token_exists;
  END LOOP;
  
  RETURN token;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate share_token when is_public is set to true
CREATE OR REPLACE FUNCTION auto_generate_share_token()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_public = true AND NEW.share_token IS NULL THEN
    NEW.share_token := generate_share_token();
  END IF;
  
  IF NEW.is_public = false THEN
    NEW.share_token := NULL;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_auto_generate_share_token ON public.cvs;
CREATE TRIGGER trigger_auto_generate_share_token
  BEFORE INSERT OR UPDATE ON public.cvs
  FOR EACH ROW
  EXECUTE FUNCTION auto_generate_share_token();

-- RLS policy for public CV access
CREATE POLICY "Public CVs are viewable by anyone" 
ON public.cvs 
FOR SELECT 
USING (is_public = true);