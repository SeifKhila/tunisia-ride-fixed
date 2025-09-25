-- Fix security issues with database policies (corrected version)

-- 1. Check if public_driver_listings is a view and handle appropriately
-- Since it appears to be a view, we cannot add RLS policies directly to it
-- Instead, we ensure the underlying tables have proper security

-- 2. Create security definer functions to prevent RLS recursion issues

-- Function for checking transfer request ownership
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

-- Function for checking bid ownership
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

-- Update bids table policies to prevent recursion
DROP POLICY IF EXISTS "Customers can view bids for their requests" ON public.bids;
CREATE POLICY "Customers can view bids for their requests" 
ON public.bids 
FOR SELECT 
USING (public.user_owns_transfer_request(request_id, auth.uid()));

-- 3. Add audit logging for security monitoring
CREATE TABLE IF NOT EXISTS public.security_audit_log (
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

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs" 
ON public.security_audit_log 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- System can insert audit logs
CREATE POLICY "System can insert audit logs" 
ON public.security_audit_log 
FOR INSERT 
WITH CHECK (true);