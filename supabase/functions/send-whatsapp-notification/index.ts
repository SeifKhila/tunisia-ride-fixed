import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const booking = await req.json();
    
    // Skip if no phone number provided
    if (!booking.customer_phone) {
      console.log('No phone number provided, skipping WhatsApp notification');
      return new Response(JSON.stringify({ success: true, skipped: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Sending WhatsApp notification to:', booking.customer_phone);

    const phoneId = Deno.env.get('META_WA_PHONE_ID');
    const token = Deno.env.get('META_WA_TOKEN');
    const template = Deno.env.get('META_WA_TEMPLATE') || 'booking_confirmation';

    // Clean phone number (remove spaces, dashes, etc.)
    const cleanPhone = booking.customer_phone.replace(/[^0-9+]/g, '');

    // Send via Meta WhatsApp Business API
    const response = await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: cleanPhone,
        type: 'template',
        template: {
          name: template,
          language: { code: 'en' },
          components: [
            {
              type: 'body',
              parameters: [
                { type: 'text', text: booking.customer_name },
                { type: 'text', text: booking.booking_reference },
                { type: 'text', text: booking.pickup_location },
                { type: 'text', text: booking.dropoff_location },
                { type: 'text', text: new Date(booking.pickup_datetime).toLocaleString() },
                { type: 'text', text: `${booking.currency}${booking.deposit_amount.toFixed(2)}` },
                { type: 'text', text: `${booking.currency}${booking.balance_due.toFixed(2)}` },
              ],
            },
          ],
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('WhatsApp API error:', errorData);
      // Don't throw - WhatsApp is optional, log and continue
      return new Response(JSON.stringify({ success: false, error: errorData }), {
        status: 200, // Return 200 so booking still succeeds
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const result = await response.json();
    console.log('WhatsApp sent successfully:', result);

    return new Response(JSON.stringify({ success: true, messageId: result.messages?.[0]?.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in send-whatsapp-notification:', error);
    // Don't fail the booking if WhatsApp fails
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});