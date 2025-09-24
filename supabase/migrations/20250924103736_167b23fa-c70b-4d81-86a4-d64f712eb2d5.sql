-- Fix the security definer view issue
-- Drop the problematic view and recreate without security definer
DROP VIEW IF EXISTS public.public_driver_listings;

-- Create a simple view without security definer that relies on RLS
CREATE VIEW public.public_driver_listings AS
SELECT 
  id,
  rating,
  total_trips,
  vehicle_class,
  vehicle_make,
  vehicle_model,
  vehicle_color,
  vehicle_year,
  is_online,
  coverage_areas,
  created_at
FROM public.drivers
WHERE status = 'approved'::driver_status;

-- Grant select access to the public view
GRANT SELECT ON public.public_driver_listings TO anon, authenticated;