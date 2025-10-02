import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const VALID_TOKEN = 'READY2025';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check token
    const url = new URL(req.url);
    const token = url.searchParams.get('token');
    
    if (token !== VALID_TOKEN) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Invalid or missing token' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    // Build test payload
    const testPayload = {
      customerName: 'John Doe (TEST)',
      customerPhone: '+44 7956 643662',
      customerEmail: 'gemma.test+qa@example.com',
      pickup: 'Yasmine Hammamet',
      dropoff: 'Enfidha (NBE)',
      pickupDate: '2025-10-16',
      pickupTime: '10:00',
      flightNumber: 'TU123',
      passengers: 3,
      luggage: 3,
      children: false,
      childSeats: '',
      tripType: 'one-way',
      notes: 'Child seat please (TEST)',
      estimatedPrice: null
    };

    const result: any = {
      ok: true,
      payloadEcho: testPayload,
      whatsapp: { attempted: false },
      email: { attempted: false }
    };

    // Test WhatsApp delivery using production flow
    const META_WA_PHONE_ID = Deno.env.get('META_WA_PHONE_ID');
    const META_WA_TOKEN = Deno.env.get('META_WA_TOKEN');
    const WHATSAPP_TO = '447956643662';

    if (META_WA_PHONE_ID && META_WA_TOKEN) {
      result.whatsapp.attempted = true;
      
      // Build message with [TEST] prefix
      const message = `[TEST] 🚗 NEW BOOKING REQUEST

👤 Customer: ${testPayload.customerName}
📱 Phone: ${testPayload.customerPhone}
📧 Email: ${testPayload.customerEmail}

📍 Pickup: ${testPayload.pickup}
📍 Drop-off: ${testPayload.dropoff}
📅 Date: ${testPayload.pickupDate}
⏰ Time: ${testPayload.pickupTime}
✈️ Flight: ${testPayload.flightNumber}

👥 Passengers: ${testPayload.passengers}
🧳 Luggage: ${testPayload.luggage}

🔄 Trip Type: ${testPayload.tripType}

📝 Notes: ${testPayload.notes}

---
Get Tunisia Transfer - TEST MESSAGE`;

      try {
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

        const waStatus = whatsappResponse.status;
        const waBody = await whatsappResponse.text();
        
        result.whatsapp.http = waStatus;
        result.whatsapp.ok = whatsappResponse.ok;
        
        if (whatsappResponse.ok) {
          const waData = JSON.parse(waBody);
          result.whatsapp.messageId = waData.messages?.[0]?.id || null;
          result.whatsapp.status = 'sent';
        } else {
          result.whatsapp.status = 'failed';
          result.whatsapp.bodyExcerpt = waBody.substring(0, 200);
        }
      } catch (error: any) {
        result.whatsapp.ok = false;
        result.whatsapp.error = error.message;
      }
    } else {
      result.whatsapp.status = 'credentials_missing';
    }

    // Test email delivery (optional)
    const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY');
    const EMAIL_API_KEY = Deno.env.get('EMAIL_API_KEY');
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    
    if (SENDGRID_API_KEY || EMAIL_API_KEY || RESEND_API_KEY) {
      result.email.attempted = true;
      
      // Use Resend if available
      if (RESEND_API_KEY) {
        try {
          const { Resend } = await import('npm:resend@2.0.0');
          const resend = new Resend(RESEND_API_KEY);
          
          // Admin email
          const adminEmail = await resend.emails.send({
            from: 'no-reply@get-tunisia-transfer.com',
            to: 'khilas592@gmail.com',
            subject: '[TEST] New Booking Request - Test',
            html: `<h2>[TEST] New Booking Request</h2>
              <p><strong>Customer:</strong> ${testPayload.customerName}</p>
              <p><strong>Route:</strong> ${testPayload.pickup} → ${testPayload.dropoff}</p>
              <p><strong>Date/Time:</strong> ${testPayload.pickupDate} at ${testPayload.pickupTime}</p>
              <p><strong>Contact:</strong> ${testPayload.customerPhone} / ${testPayload.customerEmail}</p>
              <p><strong>Details:</strong> ${testPayload.passengers} passengers, ${testPayload.luggage} luggage</p>
              <p><strong>Notes:</strong> ${testPayload.notes}</p>
              <p><em>This is a test message.</em></p>`,
          });
          
          result.email.admin = { ok: true, id: adminEmail.id };
          
          // Customer email
          const customerEmail = await resend.emails.send({
            from: 'no-reply@get-tunisia-transfer.com',
            to: testPayload.customerEmail,
            subject: '[TEST] Booking Request Confirmation',
            html: `<h2>[TEST] Thank you for your booking request</h2>
              <p>Dear ${testPayload.customerName},</p>
              <p>We received your transfer request and will contact you shortly.</p>
              <p><strong>Your Details:</strong></p>
              <p>Route: ${testPayload.pickup} → ${testPayload.dropoff}</p>
              <p>Date: ${testPayload.pickupDate} at ${testPayload.pickupTime}</p>
              <p><em>This is a test message.</em></p>`,
          });
          
          result.email.customer = { ok: true, id: customerEmail.id };
          result.email.ok = true;
        } catch (error: any) {
          result.email.ok = false;
          result.email.error = error.message;
        }
      } else {
        result.email.status = 'no_resend_key';
      }
    } else {
      result.email.status = 'credentials_missing';
    }

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error: any) {
    console.error('Error in booking-selftest:', error);
    return new Response(
      JSON.stringify({ ok: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
