-- Fix critical security issues in bookings table

-- 1. Add missing RLS policies for bookings table
CREATE POLICY "Customers can update limited booking fields" 
ON public.bookings 
FOR UPDATE 
USING (customer_id = auth.uid())
WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Admins can update all booking data" 
ON public.bookings 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "No deletion of bookings allowed" 
ON public.bookings 
FOR DELETE 
USING (false);

-- 2. Create function to validate booking updates (prevents financial field changes)
CREATE OR REPLACE FUNCTION public.validate_booking_update()
RETURNS TRIGGER AS $$
BEGIN
  -- If not admin, prevent changes to financial fields
  IF NOT has_role(auth.uid(), 'admin'::app_role) THEN
    -- Prevent changes to financial fields
    IF (OLD.total_amount IS DISTINCT FROM NEW.total_amount) OR
       (OLD.platform_fee IS DISTINCT FROM NEW.platform_fee) OR 
       (OLD.driver_earnings IS DISTINCT FROM NEW.driver_earnings) OR
       (OLD.commission_rate IS DISTINCT FROM NEW.commission_rate) OR
       (OLD.payment_status IS DISTINCT FROM NEW.payment_status) THEN
      RAISE EXCEPTION 'Customers cannot modify financial data';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to validate booking updates
CREATE TRIGGER validate_booking_update_trigger
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.validate_booking_update();

-- 3. Add audit logging for bookings
CREATE OR REPLACE FUNCTION public.audit_booking_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    INSERT INTO public.security_audit_log (
      action,
      table_name,
      record_id,
      user_id,
      details
    ) VALUES (
      'UPDATE',
      'bookings',
      NEW.id,
      auth.uid(),
      jsonb_build_object(
        'old_payment_status', OLD.payment_status,
        'new_payment_status', NEW.payment_status,
        'old_total_amount', OLD.total_amount,
        'new_total_amount', NEW.total_amount
      )
    );
    RETURN NEW;
  ELSIF TG_OP = 'INSERT' THEN
    INSERT INTO public.security_audit_log (
      action,
      table_name,
      record_id,
      user_id,
      details
    ) VALUES (
      'INSERT',
      'bookings',
      NEW.id,
      auth.uid(),
      jsonb_build_object(
        'total_amount', NEW.total_amount,
        'payment_status', NEW.payment_status
      )
    );
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create audit trigger for bookings
CREATE TRIGGER audit_bookings_trigger
  AFTER INSERT OR UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.audit_booking_changes();