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
    
    console.log('Sending booking confirmation email to:', booking.customer_email);

    const apiKey = Deno.env.get('EMAIL_API_KEY');
    const emailFrom = Deno.env.get('EMAIL_FROM') || 'bookings@get-tunisia-transfer.com';
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .booking-ref { font-size: 24px; font-weight: bold; color: #2563eb; margin: 20px 0; }
            .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .label { font-weight: bold; color: #666; }
            .value { color: #333; }
            .price-breakdown { background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .total { font-size: 20px; font-weight: bold; color: #2563eb; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Booking Confirmed!</h1>
              <p>Thank you for choosing Get Tunisia Transfer</p>
            </div>
            <div class="content">
              <div class="booking-ref">Booking Reference: ${booking.booking_reference}</div>
              
              <div class="details">
                <h2>Trip Details</h2>
                <div class="detail-row">
                  <span class="label">From:</span>
                  <span class="value">${booking.pickup_location}</span>
                </div>
                <div class="detail-row">
                  <span class="label">To:</span>
                  <span class="value">${booking.dropoff_location}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Date & Time:</span>
                  <span class="value">${new Date(booking.pickup_datetime).toLocaleString()}</span>
                </div>
                ${booking.flight_number ? `
                <div class="detail-row">
                  <span class="label">Flight Number:</span>
                  <span class="value">${booking.flight_number}</span>
                </div>
                ` : ''}
                <div class="detail-row">
                  <span class="label">Passengers:</span>
                  <span class="value">${booking.passengers}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Luggage:</span>
                  <span class="value">${booking.luggage} pieces</span>
                </div>
              </div>

              <div class="price-breakdown">
                <h3>Payment Summary</h3>
                <div class="detail-row">
                  <span class="label">Total Fare:</span>
                  <span class="value">${booking.currency}${booking.total_amount.toFixed(2)}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Deposit Paid (25%):</span>
                  <span class="value">${booking.currency}${booking.deposit_amount.toFixed(2)}</span>
                </div>
                <div class="detail-row">
                  <span class="label total">Balance Due on Pickup:</span>
                  <span class="value total">${booking.currency}${booking.balance_due.toFixed(2)}</span>
                </div>
              </div>

              <div class="details">
                <h3>What's Next?</h3>
                <p>✅ Your deposit has been received</p>
                <p>🚗 Your driver will meet you with a name board</p>
                <p>💰 Pay the remaining balance (${booking.currency}${booking.balance_due.toFixed(2)}) directly to your driver</p>
                <p>📱 We'll send you driver details 24 hours before pickup</p>
              </div>

              <div class="footer">
                <p>Need help? Contact us:</p>
                <p>📧 info@get-tunisia-transfer.com</p>
                <p>📱 WhatsApp: +44 7956 643662</p>
                <p><small>Get Tunisia Transfer - Your trusted transfer partner in Tunisia</small></p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send via SendGrid
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: booking.customer_email, name: booking.customer_name }],
          subject: `Booking Confirmed - ${booking.booking_reference}`,
        }],
        from: { 
          email: emailFrom.match(/<(.+)>/)?.[1] || emailFrom,
          name: 'Get Tunisia Transfer'
        },
        content: [{
          type: 'text/html',
          value: emailHtml,
        }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('SendGrid error:', errorData);
      throw new Error('Failed to send email');
    }

    console.log('Email sent successfully to:', booking.customer_email);

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