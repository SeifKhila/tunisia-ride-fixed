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
    const formData = await req.json();
    
    console.log('Sending booking request emails');

    const apiKey = Deno.env.get('EMAIL_API_KEY');
    const emailFrom = Deno.env.get('EMAIL_FROM') || 'bookings@get-tunisia-transfer.com';
    const adminEmail = 'khilas592@gmail.com';
    
    // Customer confirmation email
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
            .label { font-weight: bold; color: #666; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Booking Request Received!</h1>
              <p>Thank you for choosing Get Tunisia Transfer</p>
            </div>
            <div class="content">
              <p>Hi ${formData.customerName},</p>
              <p>We've received your booking request and will confirm within 30 minutes.</p>
              
              <div class="details">
                <h3>Your Request Details:</h3>
                <div class="detail-row">
                  <span class="label">📍 Pickup:</span> ${formData.pickup}
                </div>
                <div class="detail-row">
                  <span class="label">📍 Drop-off:</span> ${formData.dropoff}
                </div>
                <div class="detail-row">
                  <span class="label">📅 Date:</span> ${formData.pickupDate}
                </div>
                <div class="detail-row">
                  <span class="label">⏰ Time:</span> ${formData.pickupTime}
                </div>
                ${formData.flightNumber ? `<div class="detail-row"><span class="label">✈️ Flight:</span> ${formData.flightNumber}</div>` : ''}
                <div class="detail-row">
                  <span class="label">👥 Passengers:</span> ${formData.passengers}
                </div>
                <div class="detail-row">
                  <span class="label">🧳 Luggage:</span> ${formData.luggage}
                </div>
                ${formData.children ? `<div class="detail-row"><span class="label">👶 Child Seats:</span> ${formData.childSeats || 'Yes'}</div>` : ''}
                <div class="detail-row">
                  <span class="label">🔄 Trip Type:</span> ${formData.tripType === 'return' ? 'Return Trip (10% OFF!)' : 'One-way'}
                </div>
                ${formData.tripType === 'return' ? `<div class="detail-row"><span class="label">📅 Return:</span> ${formData.returnDate} at ${formData.returnTime}</div>` : ''}
                ${formData.estimatedPrice ? `<div class="detail-row"><span class="label">💰 Estimated Price:</span> ${formData.estimatedPrice}</div>` : '<div class="detail-row"><span class="label">💰 Price:</span> Custom quote needed</div>'}
              </div>

              <div class="footer">
                <p>Need immediate assistance? Contact us:</p>
                <p>📱 WhatsApp: +44 7956 643 662</p>
                <p>📧 info@get-tunisia-transfer.com</p>
                <p><small>Get Tunisia Transfer - Your trusted transfer partner in Tunisia</small></p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Admin notification email
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
            .details { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .detail-row { padding: 8px 0; border-bottom: 1px solid #eee; }
            .urgent { background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚨 NEW BOOKING REQUEST</h1>
            </div>
            <div class="content">
              <div class="urgent">
                <strong>⏰ Action Required:</strong> Respond within 30 minutes
              </div>
              
              <div class="details">
                <h3>Trip Details:</h3>
                <div class="detail-row">📍 Pickup: ${formData.pickup}</div>
                <div class="detail-row">📍 Drop-off: ${formData.dropoff}</div>
                <div class="detail-row">📅 Date: ${formData.pickupDate}</div>
                <div class="detail-row">⏰ Time: ${formData.pickupTime}</div>
                ${formData.flightNumber ? `<div class="detail-row">✈️ Flight: ${formData.flightNumber}</div>` : ''}
                <div class="detail-row">👥 Passengers: ${formData.passengers}</div>
                <div class="detail-row">🧳 Luggage: ${formData.luggage}</div>
                ${formData.children ? `<div class="detail-row">👶 Child Seats: ${formData.childSeats || 'Yes'}</div>` : ''}
                <div class="detail-row">🔄 Trip: ${formData.tripType === 'return' ? 'Return (10% OFF)' : 'One-way'}</div>
                ${formData.tripType === 'return' ? `<div class="detail-row">📅 Return: ${formData.returnDate} at ${formData.returnTime}</div>` : ''}
                ${formData.estimatedPrice ? `<div class="detail-row">💰 Est. Price: ${formData.estimatedPrice}</div>` : '<div class="detail-row">💰 Price: Custom quote</div>'}
              </div>

              <div class="details">
                <h3>Customer Details:</h3>
                <div class="detail-row">👤 Name: ${formData.customerName}</div>
                <div class="detail-row">📱 Phone: ${formData.customerPhone}</div>
                <div class="detail-row">📧 Email: ${formData.customerEmail}</div>
                ${formData.notes ? `<div class="detail-row">📝 Notes: ${formData.notes}</div>` : ''}
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send customer confirmation email
    const customerResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: formData.customerEmail, name: formData.customerName }],
          subject: 'Booking Request Received - Get Tunisia Transfer',
        }],
        from: { 
          email: emailFrom.match(/<(.+)>/)?.[1] || emailFrom,
          name: 'Get Tunisia Transfer'
        },
        content: [{
          type: 'text/html',
          value: customerEmailHtml,
        }],
      }),
    });

    if (!customerResponse.ok) {
      const errorData = await customerResponse.text();
      console.error('SendGrid error (customer):', errorData);
      throw new Error('Failed to send customer email');
    }

    // Send admin notification email
    const adminResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: adminEmail }],
          subject: '🚨 NEW BOOKING REQUEST - Get Tunisia Transfer',
        }],
        from: { 
          email: emailFrom.match(/<(.+)>/)?.[1] || emailFrom,
          name: 'Get Tunisia Transfer Bookings'
        },
        content: [{
          type: 'text/html',
          value: adminEmailHtml,
        }],
      }),
    });

    if (!adminResponse.ok) {
      const errorData = await adminResponse.text();
      console.error('SendGrid error (admin):', errorData);
      // Don't throw here - customer email was sent
    }

    console.log('Emails sent successfully to customer and admin');

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in send-booking-email:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});