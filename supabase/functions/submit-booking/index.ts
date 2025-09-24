import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const bookingSchema = {
  name: { required: true, maxLength: 100 },
  email: { required: true, maxLength: 255, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  phone: { required: true, maxLength: 20 },
  fromAirport: { required: true, maxLength: 100 },
  destination: { required: true, maxLength: 200 },
  customDestination: { maxLength: 200 },
  pickupDate: { required: true },
  pickupTime: { required: true },
  flightNumber: { maxLength: 20 },
  tripType: { required: true, maxLength: 50 },
  returnDate: { maxLength: 20 },
  passengers: { required: true, pattern: /^[1-8]$/ },
  bags: { required: true, maxLength: 50 },
  childSeats: { required: true, maxLength: 50 },
  vehicleType: { required: true, maxLength: 50 },
  notes: { maxLength: 1000 }
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

// Input validation function
function validateBookingRequest(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  for (const [field, rules] of Object.entries(bookingSchema)) {
    const value = data[field];
    
    if (rules.required && (value === undefined || value === null || value === '')) {
      errors.push(`${field} is required`);
      continue;
    }
    
    if (value !== undefined && value !== null && value !== '') {
      if (rules.maxLength && String(value).length > rules.maxLength) {
        errors.push(`${field} must be less than ${rules.maxLength} characters`);
      }
      
      if (rules.pattern && !rules.pattern.test(String(value))) {
        errors.push(`${field} format is invalid`);
      }
    }
  }
  
  return { isValid: errors.length === 0, errors };
}

// Sanitize input to prevent injection
function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, '').trim();
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check request size limit (1MB)
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 1024 * 1024) {
      console.log('Request too large');
      return new Response(
        JSON.stringify({ error: 'Request too large' }), 
        { status: 413, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    const bookingData: BookingRequest = await req.json();
    
    // Validate input
    const validation = validateBookingRequest(bookingData);
    if (!validation.isValid) {
      console.log('Validation failed:', validation.errors);
      return new Response(
        JSON.stringify({ error: 'Invalid input', details: validation.errors }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log("Received booking request:", { ...bookingData, phone: '[REDACTED]' });

    // Generate booking ID
    const bookingId = 'GT-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Sanitize inputs
    const sanitizedData = {
      ...bookingData,
      name: sanitizeInput(bookingData.name),
      email: sanitizeInput(bookingData.email),
      phone: sanitizeInput(bookingData.phone),
      fromAirport: sanitizeInput(bookingData.fromAirport),
      destination: sanitizeInput(bookingData.destination),
      customDestination: bookingData.customDestination ? sanitizeInput(bookingData.customDestination) : undefined,
      flightNumber: bookingData.flightNumber ? sanitizeInput(bookingData.flightNumber) : undefined,
      notes: bookingData.notes ? sanitizeInput(bookingData.notes) : undefined
    };

    // Store in transfer_requests table
    const { data: request, error: dbError } = await supabase
      .from('transfer_requests')
      .insert({
        customer_email: sanitizedData.email,
        customer_phone: sanitizedData.phone,
        pickup_address: `${sanitizedData.fromAirport} Airport`,
        dropoff_address: sanitizedData.destination === 'Other' ? sanitizedData.customDestination : sanitizedData.destination,
        pickup_date: sanitizedData.pickupDate,
        pickup_time: sanitizedData.pickupTime,
        flight_number: sanitizedData.flightNumber,
        passengers: parseInt(sanitizedData.passengers),
        luggage: sanitizedData.bags === 'Small' ? 1 : sanitizedData.bags === 'Medium' ? 2 : 3,
        special_requirements: `Name: ${sanitizedData.name}\nTrip Type: ${sanitizedData.tripType}\nReturn Date: ${sanitizedData.returnDate || 'N/A'}\nVehicle Type: ${sanitizedData.vehicleType}\nChild Seats: ${sanitizedData.childSeats}\nNotes: ${sanitizedData.notes || 'None'}`,
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
    
    console.log(`Attempting to send admin notifications to: ${adminEmails.join(', ')}`);
    
    for (const adminEmail of adminEmails) {
      try {
        const adminResult = await resend.emails.send({
          from: "Tunisia Transfer <onboarding@resend.dev>",
          to: [adminEmail],
          subject: `New Booking Request - ${bookingId}`,
          html: `
            <h2>New Booking Request Received</h2>
            <p><strong>Booking ID:</strong> ${bookingId}</p>
            <p><strong>Customer:</strong> ${sanitizedData.name}</p>
            <p><strong>Email:</strong> ${sanitizedData.email}</p>
            <p><strong>Phone:</strong> ${sanitizedData.phone}</p>
            
            <h3>Trip Details</h3>
            <p><strong>From:</strong> ${sanitizedData.fromAirport} Airport</p>
            <p><strong>To:</strong> ${sanitizedData.destination === 'Other' ? sanitizedData.customDestination : sanitizedData.destination}</p>
            <p><strong>Date:</strong> ${sanitizedData.pickupDate}</p>
            <p><strong>Time:</strong> ${sanitizedData.pickupTime}</p>
            <p><strong>Flight:</strong> ${sanitizedData.flightNumber || 'Not provided'}</p>
            <p><strong>Trip Type:</strong> ${sanitizedData.tripType}</p>
            ${sanitizedData.returnDate ? `<p><strong>Return Date:</strong> ${sanitizedData.returnDate}</p>` : ''}
            
            <h3>Additional Info</h3>
            <p><strong>Passengers:</strong> ${sanitizedData.passengers}</p>
            <p><strong>Luggage:</strong> ${sanitizedData.bags}</p>
            <p><strong>Child Seats:</strong> ${sanitizedData.childSeats}</p>
            <p><strong>Vehicle Type:</strong> ${sanitizedData.vehicleType}</p>
            ${sanitizedData.notes ? `<p><strong>Notes:</strong> ${sanitizedData.notes}</p>` : ''}
            
            <p><em>Please respond to the customer as soon as possible.</em></p>
          `,
        });
        console.log(`Admin email sent successfully to ${adminEmail}:`, adminResult);
      } catch (emailError) {
        console.error(`Failed to send admin email to ${adminEmail}:`, emailError);
        throw emailError;
      }
    }

    // Send autoresponder to customer
    console.log(`Sending autoresponder to customer: ${sanitizedData.email}`);
    try {
      const customerResult = await resend.emails.send({
        from: "Tunisia Transfer <onboarding@resend.dev>",
        to: [sanitizedData.email],
        subject: "Booking Request Received - Tunisia Transfer",
        html: `
          <h2>Thank you for your booking request!</h2>
          <p>Dear ${sanitizedData.name},</p>
          
          <p>We have successfully received your transfer booking request with ID: <strong>${bookingId}</strong></p>
          
          <p>Our team will review your request and get back to you shortly with a quote and confirmation details.</p>
          
          <h3>Your Booking Details</h3>
          <p><strong>From:</strong> ${sanitizedData.fromAirport} Airport</p>
          <p><strong>To:</strong> ${sanitizedData.destination === 'Other' ? sanitizedData.customDestination : sanitizedData.destination}</p>
          <p><strong>Date:</strong> ${sanitizedData.pickupDate}</p>
          <p><strong>Time:</strong> ${sanitizedData.pickupTime}</p>
          <p><strong>Passengers:</strong> ${sanitizedData.passengers}</p>
          
          <p>If you have any urgent questions, please contact us at info@get-tunisia-transfer.com or call us.</p>
          
          <p>Best regards,<br>
          Tunisia Transfer Team</p>
        `,
      });
      console.log(`Customer autoresponder sent successfully:`, customerResult);
    } catch (emailError) {
      console.error(`Failed to send customer autoresponder:`, emailError);
      // Don't throw here as admin notifications are more critical
    }

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
        error: "An error occurred processing your booking" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);