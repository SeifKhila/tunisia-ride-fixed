-- Create a security definer function that returns transfer requests without sensitive data
CREATE OR REPLACE FUNCTION public.get_driver_visible_requests()
RETURNS TABLE (
  id uuid,
  pickup_address text,
  pickup_lat numeric,
  pickup_lng numeric,
  dropoff_address text,
  dropoff_lat numeric,
  dropoff_lng numeric,
  pickup_date date,
  pickup_time time,
  passengers integer,
  luggage integer,
  distance_km numeric,
  estimated_duration integer,
  flight_number text,
  special_requirements text,
  status request_status,
  created_at timestamptz,
  updated_at timestamptz,
  selected_bid_id uuid
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    tr.id,
    tr.pickup_address,
    tr.pickup_lat,
    tr.pickup_lng,
    tr.dropoff_address,
    tr.dropoff_lat,
    tr.dropoff_lng,
    tr.pickup_date,
    tr.pickup_time,
    tr.passengers,
    tr.luggage,
    tr.distance_km,
    tr.estimated_duration,
    tr.flight_number,
    tr.special_requirements,
    tr.status,
    tr.created_at,
    tr.updated_at,
    tr.selected_bid_id
  FROM public.transfer_requests tr
  WHERE tr.status IN ('active'::request_status, 'pending'::request_status);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_driver_visible_requests() TO authenticated;

-- Update the existing policy to be more restrictive
-- Drop the current policy that exposes customer data
DROP POLICY IF EXISTS "Drivers can view active requests" ON public.transfer_requests;

-- Create new restrictive policy - drivers can only see requests they have bids on
CREATE POLICY "Drivers can view requests they bid on" 
ON public.transfer_requests 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.bids 
    WHERE bids.request_id = transfer_requests.id 
    AND bids.driver_user_id = auth.uid()
  )
);