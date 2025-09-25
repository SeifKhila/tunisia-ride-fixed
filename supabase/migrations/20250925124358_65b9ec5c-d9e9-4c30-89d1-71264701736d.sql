-- Fix security issues with database policies (final version)

-- 1. Create security definer functions to prevent RLS recursion issues
CREATE OR REPLACE FUNCTION public.user_owns_transfer_request(_request_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.transfer_requests 
    WHERE id = _request_id AND customer_id = _user_id
  );
$$;

CREATE OR REPLACE FUNCTION public.user_owns_bid(_bid_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER  
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.bids 
    WHERE id = _bid_id AND driver_user_id = _user_id
  );
$$;

-- 2. Update bids table policies to prevent recursion
DROP POLICY IF EXISTS "Customers can view bids for their requests" ON public.bids;
CREATE POLICY "Customers can view bids for their requests" 
ON public.bids 
FOR SELECT 
USING (public.user_owns_transfer_request(request_id, auth.uid()));

-- 3. Add audit logging table only if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'security_audit_log') THEN
    CREATE TABLE public.security_audit_log (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id uuid,
      action text NOT NULL,
      table_name text,
      record_id uuid,
      details jsonb,
      ip_address inet,
      user_agent text,
      created_at timestamp with time zone DEFAULT now()
    );
    
    -- Enable RLS on audit log
    ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;
    
    -- Create policies only if table was just created
    CREATE POLICY "Admins can view audit logs" 
    ON public.security_audit_log 
    FOR SELECT 
    USING (public.has_role(auth.uid(), 'admin'::app_role));
    
    CREATE POLICY "System can insert audit logs" 
    ON public.security_audit_log 
    FOR INSERT 
    WITH CHECK (true);
  END IF;
END $$;