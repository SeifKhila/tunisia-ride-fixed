import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    
    console.log('Processing booking request for WhatsApp notification');

    const META_WA_PHONE_ID = Deno.env.get('META_WA_PHONE_ID');
    const META_WA_TOKEN = Deno.env.get('META_WA_TOKEN');
    const WHATSAPP_TO = '21628602147';

    if (!META_WA_PHONE_ID || !META_WA_TOKEN) {
      console.log('WhatsApp credentials not configured');
      return new Response(
        JSON.stringify({ ok: false, reason: 'whatsapp_not_configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    // Format the message
    const message = `🚗 NEW BOOKING REQUEST

👤 Customer: ${payload.customerName}
📱 Phone: ${payload.customerPhone}
📧 Email: ${payload.customerEmail}

📍 Pickup: ${payload.pickup}
📍 Drop-off: ${payload.dropoff}
📅 Date: ${payload.pickupDate}
⏰ Time: ${payload.pickupTime}
${payload.flightNumber ? `✈️ Flight: ${payload.flightNumber}` : ''}

👥 Passengers: ${payload.passengers}
🧳 Luggage: ${payload.luggage}
${payload.children ? `👶 Child Seats: ${payload.childSeats || 'Yes'}` : ''}

🔄 Trip Type: ${payload.tripType === 'return' ? 'Return Trip (10% OFF!)' : 'One-way'}
${payload.tripType === 'return' ? `📅 Return: ${payload.returnDate} at ${payload.returnTime}` : ''}
${payload.estimatedPrice ? `💰 Estimated Price: ${payload.estimatedPrice}` : '💰 Price: Custom quote needed'}

${payload.notes ? `📝 Notes: ${payload.notes}` : ''}

---
Get Tunisia Transfer`;

    // Send WhatsApp message via Meta Cloud API
    const whatsappResponse = await fetch(
      `https://graph.facebook.com/v20.0/${META_WA_PHONE_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${META_WA_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: WHATSAPP_TO,
          type: 'text',
          text: {
            preview_url: false,
            body: message,
          },
        }),
      }
    );

    if (!whatsappResponse.ok) {
      const errorData = await whatsappResponse.text();
      console.error('WhatsApp API error:', errorData);
      return new Response(
        JSON.stringify({ ok: false, reason: 'whatsapp_failed' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    console.log('WhatsApp message sent successfully');

    return new Response(
      JSON.stringify({ ok: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error: any) {
    console.error('Error in booking-to-whatsapp:', error);
    return new Response(
      JSON.stringify({ ok: false, reason: 'server_error', error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
