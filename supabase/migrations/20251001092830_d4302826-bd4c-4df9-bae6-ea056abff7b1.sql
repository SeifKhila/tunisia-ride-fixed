-- Pricing settings table for admin control
CREATE TABLE IF NOT EXISTS public.pricing_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  flat_eur_uplift numeric NOT NULL DEFAULT 5.00,
  eur_rounding_decimals integer NOT NULL DEFAULT 2,
  gbp_rounding_decimals integer NOT NULL DEFAULT 2,
  usd_rounding_decimals integer NOT NULL DEFAULT 2,
  tnd_rounding_to_nearest integer NOT NULL DEFAULT 1,
  enable_live_fx boolean NOT NULL DEFAULT true,
  fx_cache_hours integer NOT NULL DEFAULT 6,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pricing_settings ENABLE ROW LEVEL SECURITY;

-- Only admins can modify pricing settings
CREATE POLICY "Admins can manage pricing settings"
  ON public.pricing_settings
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Everyone can view pricing settings (needed for frontend)
CREATE POLICY "Anyone can view pricing settings"
  ON public.pricing_settings
  FOR SELECT
  USING (true);

-- Insert default settings
INSERT INTO public.pricing_settings (
  flat_eur_uplift,
  eur_rounding_decimals,
  gbp_rounding_decimals,
  usd_rounding_decimals,
  tnd_rounding_to_nearest,
  enable_live_fx,
  fx_cache_hours
) VALUES (5.00, 2, 2, 2, 1, true, 6)
ON CONFLICT DO NOTHING;

-- Update bookings table for 25% deposit tracking
ALTER TABLE public.bookings 
  ADD COLUMN IF NOT EXISTS deposit_amount numeric,
  ADD COLUMN IF NOT EXISTS deposit_paid boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS balance_due numeric,
  ADD COLUMN IF NOT EXISTS payment_method text CHECK (payment_method IN ('paypal', 'revolut')),
  ADD COLUMN IF NOT EXISTS paypal_order_id text,
  ADD COLUMN IF NOT EXISTS revolut_order_id text,
  ADD COLUMN IF NOT EXISTS confirmation_email_sent boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS confirmation_whatsapp_sent boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS booking_reference text UNIQUE,
  ADD COLUMN IF NOT EXISTS customer_name text,
  ADD COLUMN IF NOT EXISTS customer_phone text,
  ADD COLUMN IF NOT EXISTS pickup_datetime timestamp with time zone,
  ADD COLUMN IF NOT EXISTS pickup_location text,
  ADD COLUMN IF NOT EXISTS dropoff_location text,
  ADD COLUMN IF NOT EXISTS flight_number text,
  ADD COLUMN IF NOT EXISTS passengers integer,
  ADD COLUMN IF NOT EXISTS luggage integer;

-- Generate booking reference automatically
CREATE OR REPLACE FUNCTION public.generate_booking_reference()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  ref text;
  exists boolean;
BEGIN
  LOOP
    -- Generate format: GTT-YYYYMMDD-XXXX (e.g., GTT-20251001-A3F9)
    ref := 'GTT-' || 
           to_char(now(), 'YYYYMMDD') || '-' || 
           upper(substring(md5(random()::text) from 1 for 4));
    
    -- Check if reference already exists
    SELECT EXISTS(SELECT 1 FROM bookings WHERE booking_reference = ref) INTO exists;
    
    EXIT WHEN NOT exists;
  END LOOP;
  
  RETURN ref;
END;
$$;

-- Trigger to auto-generate booking reference
CREATE OR REPLACE FUNCTION public.set_booking_reference()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.booking_reference IS NULL THEN
    NEW.booking_reference := generate_booking_reference();
  END IF;
  RETURN NEW;
END;
$$;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS set_booking_reference_trigger ON public.bookings;

-- Create trigger
CREATE TRIGGER set_booking_reference_trigger
  BEFORE INSERT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.set_booking_reference();