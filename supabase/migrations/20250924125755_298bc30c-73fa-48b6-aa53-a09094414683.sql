-- Fix critical security vulnerability: Completely block public access to drivers table
-- The previous policy still allows public access to all driver columns including sensitive PII

-- Drop the policy that still allows public table access
DROP POLICY IF EXISTS "Public can view approved drivers through view" ON public.drivers;

-- Create a policy that completely blocks anonymous/public access to the drivers table
-- This ensures no sensitive PII can be accessed directly from the table
CREATE POLICY "No public table access to drivers" ON public.drivers
FOR SELECT 
USING (
  -- Allow access only to:
  -- 1. The driver themselves (when authenticated)
  auth.uid() = user_id 
  -- 2. No anonymous/public access at all
  -- The view will handle public access to non-sensitive data only
);

-- Ensure the view works by granting specific permissions to the postgres role
-- This allows the view to function while blocking direct table access
GRANT SELECT (id, vehicle_make, vehicle_model, vehicle_year, vehicle_class, vehicle_color, total_trips, rating, coverage_areas, is_online, created_at, status) ON public.drivers TO postgres;

-- Double-check that anon users have no direct table access
REVOKE ALL ON public.drivers FROM anon;

-- Make sure the view still works for public access (only non-sensitive data)
GRANT SELECT ON public.public_driver_listings TO anon;
GRANT SELECT ON public.public_driver_listings TO authenticated;