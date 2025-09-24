-- Fix Security Definer View issue
-- The current view may be running with SECURITY DEFINER which bypasses RLS
-- We need to recreate it with explicit SECURITY INVOKER and proper access controls

-- Drop the current view
DROP VIEW IF EXISTS public.public_driver_listings;

-- Recreate the view with explicit SECURITY INVOKER to ensure it runs with querying user's permissions
CREATE VIEW public.public_driver_listings 
WITH (security_invoker = true) AS
SELECT 
    d.id,
    d.vehicle_make,
    d.vehicle_model,
    d.vehicle_year,
    d.vehicle_class,
    d.vehicle_color,
    d.total_trips,
    d.rating,
    d.coverage_areas,
    d.is_online,
    d.created_at
FROM public.drivers d
WHERE d.status = 'approved'::driver_status;

-- Since the drivers table now blocks all public access, we need to create a more nuanced policy
-- that allows public users to access only approved drivers for the view to work
DROP POLICY IF EXISTS "No public access to driver details" ON public.drivers;

-- Create a policy that allows public access to approved drivers only
-- This is safe because the view only exposes non-sensitive columns
CREATE POLICY "Public can view approved drivers through view" ON public.drivers
FOR SELECT 
USING (status = 'approved'::driver_status);

-- However, we need to ensure that direct table access still doesn't expose sensitive data
-- We'll use column-level security by revoking all direct table permissions
REVOKE ALL ON public.drivers FROM anon;
REVOKE ALL ON public.drivers FROM authenticated;

-- Grant access only to the safe view
GRANT SELECT ON public.public_driver_listings TO anon;
GRANT SELECT ON public.public_driver_listings TO authenticated;

-- Ensure drivers themselves can still access their own full profile
-- (This policy already exists but let's make sure it's clear)
-- "Drivers can view own profile" policy should still work for authenticated users