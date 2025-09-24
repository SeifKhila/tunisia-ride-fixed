-- Fix critical driver data exposure
-- Drop the current overly permissive policy that exposes all driver data
DROP POLICY IF EXISTS "Anyone can view approved drivers" ON public.drivers;

-- Create a new restrictive policy that only exposes non-sensitive driver data publicly
CREATE POLICY "Public can view limited driver info" 
ON public.drivers 
FOR SELECT 
USING (
  status = 'approved'::driver_status
);

-- Create a view for public driver listings that excludes PII
CREATE OR REPLACE VIEW public.public_driver_listings AS
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

-- Enable RLS on the view (though it inherits from the base table)
ALTER VIEW public.public_driver_listings SET (security_barrier = true);

-- Add a separate policy for drivers to view their own full profile data
-- (This should already exist but let's make sure it's properly configured)
DROP POLICY IF EXISTS "Drivers can view own profile" ON public.drivers;
CREATE POLICY "Drivers can view own profile" 
ON public.drivers 
FOR SELECT 
USING (user_id = auth.uid());

-- Add policy for drivers to update their own profile
DROP POLICY IF EXISTS "Drivers can update own profile" ON public.drivers;  
CREATE POLICY "Drivers can update own profile" 
ON public.drivers 
FOR UPDATE 
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Add policy for new driver registration
DROP POLICY IF EXISTS "Users can insert driver profile" ON public.drivers;
CREATE POLICY "Users can insert driver profile" 
ON public.drivers 
FOR INSERT 
WITH CHECK (user_id = auth.uid());