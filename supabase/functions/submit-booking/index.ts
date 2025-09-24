import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  fromAirport: string;
  destination: string;
  customDestination?: string;
  pickupDate: string;
  pickupTime: string;
  flightNumber?: string;
  tripType: string;
  returnDate?: string;
  passengers: string;
  bags: string;
  childSeats: string;
  vehicleType: string;
  notes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    const bookingData: BookingRequest = await req.json();
    console.log("Received booking request:", bookingData);

    // Generate booking ID
    const bookingId = 'GT-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Store in transfer_requests table
    const { data: request, error: dbError } = await supabase
      .from('transfer_requests')
      .insert({
        customer_email: bookingData.email,
        customer_phone: bookingData.phone,
        pickup_address: `${bookingData.fromAirport} Airport`,
        dropoff_address: bookingData.destination === 'Other' ? bookingData.customDestination : bookingData.destination,
        pickup_date: bookingData.pickupDate,
        pickup_time: bookingData.pickupTime,
        flight_number: bookingData.flightNumber,
        passengers: parseInt(bookingData.passengers),
        luggage: bookingData.bags === 'Small' ? 1 : bookingData.bags === 'Medium' ? 2 : 3,
        special_requirements: `Name: ${bookingData.name}\nTrip Type: ${bookingData.tripType}\nReturn Date: ${bookingData.returnDate || 'N/A'}\nVehicle Type: ${bookingData.vehicleType}\nChild Seats: ${bookingData.childSeats}\nNotes: ${bookingData.notes || 'None'}`,
        pickup_lat: 0, // Will be updated with actual coordinates later
        pickup_lng: 0,
        dropoff_lat: 0,
        dropoff_lng: 0
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to store booking request");
    }

    // Send notification emails to administrators
    const adminEmails = ["info@get-tunisia-transfer.com", "khilas592@gmail.com"];
    
    for (const adminEmail of adminEmails) {
      await resend.emails.send({
        from: "Tunisia Transfer <onboarding@resend.dev>",
        to: [adminEmail],
        subject: `New Booking Request - ${bookingId}`,
        html: `
          <h2>New Booking Request Received</h2>
          <p><strong>Booking ID:</strong> ${bookingId}</p>
          <p><strong>Customer:</strong> ${bookingData.name}</p>
          <p><strong>Email:</strong> ${bookingData.email}</p>
          <p><strong>Phone:</strong> ${bookingData.phone}</p>
          
          <h3>Trip Details</h3>
          <p><strong>From:</strong> ${bookingData.fromAirport} Airport</p>
          <p><strong>To:</strong> ${bookingData.destination === 'Other' ? bookingData.customDestination : bookingData.destination}</p>
          <p><strong>Date:</strong> ${bookingData.pickupDate}</p>
          <p><strong>Time:</strong> ${bookingData.pickupTime}</p>
          <p><strong>Flight:</strong> ${bookingData.flightNumber || 'Not provided'}</p>
          <p><strong>Trip Type:</strong> ${bookingData.tripType}</p>
          ${bookingData.returnDate ? `<p><strong>Return Date:</strong> ${bookingData.returnDate}</p>` : ''}
          
          <h3>Additional Info</h3>
          <p><strong>Passengers:</strong> ${bookingData.passengers}</p>
          <p><strong>Luggage:</strong> ${bookingData.bags}</p>
          <p><strong>Child Seats:</strong> ${bookingData.childSeats}</p>
          <p><strong>Vehicle Type:</strong> ${bookingData.vehicleType}</p>
          ${bookingData.notes ? `<p><strong>Notes:</strong> ${bookingData.notes}</p>` : ''}
          
          <p><em>Please respond to the customer as soon as possible.</em></p>
        `,
      });
    }

    // Send autoresponder to customer
    await resend.emails.send({
      from: "Tunisia Transfer <onboarding@resend.dev>",
      to: [bookingData.email],
      subject: "Booking Request Received - Tunisia Transfer",
      html: `
        <h2>Thank you for your booking request!</h2>
        <p>Dear ${bookingData.name},</p>
        
        <p>We have successfully received your transfer booking request with ID: <strong>${bookingId}</strong></p>
        
        <p>Our team will review your request and get back to you shortly with a quote and confirmation details.</p>
        
        <h3>Your Booking Details</h3>
        <p><strong>From:</strong> ${bookingData.fromAirport} Airport</p>
        <p><strong>To:</strong> ${bookingData.destination === 'Other' ? bookingData.customDestination : bookingData.destination}</p>
        <p><strong>Date:</strong> ${bookingData.pickupDate}</p>
        <p><strong>Time:</strong> ${bookingData.pickupTime}</p>
        <p><strong>Passengers:</strong> ${bookingData.passengers}</p>
        
        <p>If you have any urgent questions, please contact us at info@get-tunisia-transfer.com or call us.</p>
        
        <p>Best regards,<br>
        Tunisia Transfer Team</p>
      `,
    });

    console.log("Booking processed successfully");

    return new Response(JSON.stringify({ 
      success: true, 
      bookingId: bookingId,
      message: "Booking request submitted successfully" 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error processing booking:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "An error occurred processing your booking" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);