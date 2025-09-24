-- Fix critical security vulnerability: Remove public access to sensitive driver data
-- The current policy "Public can view limited driver info" exposes ALL driver columns
-- which includes sensitive PII like emails, phone numbers, license numbers, etc.

-- First, drop the overly permissive public policy
DROP POLICY IF EXISTS "Public can view limited driver info" ON public.drivers;

-- Create a more secure policy that completely restricts public access to the drivers table
-- Public users should use the public_driver_listings view instead which only contains non-sensitive fields
CREATE POLICY "No public access to driver details" ON public.drivers
FOR SELECT 
USING (false);

-- Ensure the public_driver_listings view exists and is properly accessible
-- This view should only contain non-sensitive driver information for public consumption
DROP VIEW IF EXISTS public.public_driver_listings;

CREATE VIEW public.public_driver_listings AS
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

-- Grant public access to the view (this is safe as it only contains non-sensitive data)
GRANT SELECT ON public.public_driver_listings TO anon;
GRANT SELECT ON public.public_driver_listings TO authenticated;