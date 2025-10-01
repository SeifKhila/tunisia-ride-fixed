import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      paymentMethod,
      orderId,
      bookingData,
      depositInfo,
    } = await req.json();

    console.log('Completing booking with payment:', { paymentMethod, orderId });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Create booking record
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        customer_id: bookingData.customer_id || null,
        customer_name: bookingData.name,
        customer_email: bookingData.email,
        customer_phone: bookingData.phone,
        pickup_location: bookingData.pickup,
        dropoff_location: bookingData.dropoff,
        pickup_datetime: bookingData.pickupDatetime,
        flight_number: bookingData.flightNumber,
        passengers: bookingData.passengers,
        luggage: bookingData.luggage,
        total_amount: depositInfo.total,
        deposit_amount: depositInfo.deposit,
        balance_due: depositInfo.balance,
        currency: depositInfo.currency,
        payment_method: paymentMethod,
        payment_status: 'deposit_paid',
        deposit_paid: true,
        [paymentMethod === 'paypal' ? 'paypal_order_id' : 'revolut_order_id']: orderId,
      })
      .select()
      .single();

    if (bookingError) {
      console.error('Error creating booking:', bookingError);
      throw new Error('Failed to create booking record');
    }

    console.log('Booking created:', booking.id, booking.booking_reference);

    // Send email confirmation
    try {
      const emailResponse = await fetch(`${supabaseUrl}/functions/v1/send-booking-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      });

      if (emailResponse.ok) {
        await supabase
          .from('bookings')
          .update({ confirmation_email_sent: true })
          .eq('id', booking.id);
        console.log('Email confirmation sent');
      }
    } catch (emailError) {
      console.error('Email sending failed (non-critical):', emailError);
    }

    // Send WhatsApp notification (optional)
    try {
      const whatsappResponse = await fetch(`${supabaseUrl}/functions/v1/send-whatsapp-notification`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      });

      if (whatsappResponse.ok) {
        const result = await whatsappResponse.json();
        if (result.success && !result.skipped) {
          await supabase
            .from('bookings')
            .update({ confirmation_whatsapp_sent: true })
            .eq('id', booking.id);
          console.log('WhatsApp notification sent');
        }
      }
    } catch (whatsappError) {
      console.error('WhatsApp sending failed (non-critical):', whatsappError);
    }

    return new Response(JSON.stringify({
      success: true,
      booking: {
        id: booking.id,
        reference: booking.booking_reference,
        total: booking.total_amount,
        deposit: booking.deposit_amount,
        balance: booking.balance_due,
        currency: booking.currency,
      },
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in complete-booking:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});