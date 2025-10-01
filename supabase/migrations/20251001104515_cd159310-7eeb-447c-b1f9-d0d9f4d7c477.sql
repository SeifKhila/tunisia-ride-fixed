-- Phase 1: Critical Business Data Protection

-- 1. Restrict Pricing Settings Access
-- Drop the public read policy that exposes business intelligence
DROP POLICY IF EXISTS "Anyone can view pricing settings" ON public.pricing_settings;

-- Create a new policy requiring admin role for reading pricing settings
CREATE POLICY "Only admins can view pricing settings"
ON public.pricing_settings
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 2. Remove Unused Public Driver Listings View
-- This view has no RLS policies and exposes driver data
-- Dropping it as it appears unused in the codebase
DROP VIEW IF EXISTS public.public_driver_listings;