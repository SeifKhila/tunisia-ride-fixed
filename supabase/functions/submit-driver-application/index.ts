import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const driverApplicationSchema = {
  name: { required: true, maxLength: 100 },
  email: { required: true, maxLength: 255, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  phone: { required: true, maxLength: 20 },
  serviceZones: { required: true, maxLength: 500 },
  vehicleDetails: { required: true, maxLength: 500 },
  availability: { required: true, maxLength: 500 }
};

interface DriverApplication {
  name: string;
  email: string;
  phone: string;
  serviceZones: string;
  vehicleDetails: string;
  availability: string;
}

// Input validation function
function validateDriverApplication(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  for (const [field, rules] of Object.entries(driverApplicationSchema)) {
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

    const driverData: DriverApplication = await req.json();
    
    // Validate input
    const validation = validateDriverApplication(driverData);
    if (!validation.isValid) {
      console.log('Validation failed:', validation.errors);
      return new Response(
        JSON.stringify({ error: 'Invalid input', details: validation.errors }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log("Received driver application:", { ...driverData, phone: '[REDACTED]', email: '[REDACTED]' });

    // Generate application ID
    const applicationId = 'DR-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(driverData.name),
      email: sanitizeInput(driverData.email),
      phone: sanitizeInput(driverData.phone),
      serviceZones: sanitizeInput(driverData.serviceZones),
      vehicleDetails: sanitizeInput(driverData.vehicleDetails),
      availability: sanitizeInput(driverData.availability)
    };

    // Parse vehicle details to extract required fields
    const vehicleInfo = sanitizedData.vehicleDetails.split(',');
    const make = vehicleInfo[0]?.trim() || 'Not specified';
    const model = vehicleInfo[1]?.trim() || 'Not specified';
    const year = parseInt(vehicleInfo[2]?.trim()) || 2020;

    // Parse coverage areas
    const coverageAreas = sanitizedData.serviceZones.split(',').map(area => area.trim());

    // Store in drivers table
    const { data: driver, error: dbError } = await supabase
      .from('drivers')
      .insert({
        full_name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        license_number: 'PENDING', // Will be updated when documents are processed
        vehicle_make: make,
        vehicle_model: model,
        vehicle_year: year,
        vehicle_plate: 'PENDING',
        vehicle_color: 'PENDING',
        vehicle_class: 'economy',
        insurance_number: 'PENDING',
        coverage_areas: coverageAreas,
        status: 'pending'
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to store driver application");
    }

    // Send notification emails to administrators
    const adminEmails = ["info@get-tunisia-transfer.com", "khilas592@gmail.com"];
    
    for (const adminEmail of adminEmails) {
      try {
        await resend.emails.send({
          from: "Tunisia Transfer <onboarding@resend.dev>",
          to: [adminEmail],
          subject: `New Driver Application - ${applicationId}`,
          html: `
            <h2>New Driver Application Received</h2>
            <p><strong>Application ID:</strong> ${applicationId}</p>
            <p><strong>Driver Name:</strong> ${sanitizedData.name}</p>
            <p><strong>Email:</strong> ${sanitizedData.email}</p>
            <p><strong>Phone:</strong> ${sanitizedData.phone}</p>
            
            <h3>Service Information</h3>
            <p><strong>Coverage Areas:</strong> ${sanitizedData.serviceZones}</p>
            <p><strong>Vehicle Details:</strong> ${sanitizedData.vehicleDetails}</p>
            <p><strong>Availability:</strong> ${sanitizedData.availability}</p>
            
            <p><em>Please review the application and contact the driver for document verification.</em></p>
          `,
        });
      } catch (emailError) {
        console.error(`Failed to send admin email to ${adminEmail}:`, emailError);
      }
    }

    // Send autoresponder to driver
    try {
      await resend.emails.send({
        from: "Tunisia Transfer <onboarding@resend.dev>",
        to: [sanitizedData.email],
        subject: "Driver Application Received - Tunisia Transfer",
        html: `
          <h2>Thank you for your driver application!</h2>
          <p>Dear ${sanitizedData.name},</p>
          
          <p>We have successfully received your driver application with ID: <strong>${applicationId}</strong></p>
          
          <p>Our team will review your application and get back to you shortly regarding the next steps in our onboarding process.</p>
          
          <h3>What's Next?</h3>
          <ul>
            <li>Application review (1-2 business days)</li>
            <li>Document verification</li>
            <li>Background check</li>
            <li>Vehicle inspection</li>
            <li>Training session</li>
          </ul>
          
          <p>If you have any questions during this process, please contact us at info@get-tunisia-transfer.com</p>
          
          <p>We look forward to welcoming you to our driver network!</p>
          
          <p>Best regards,<br>
          Tunisia Transfer Team</p>
        `,
      });
    } catch (emailError) {
      console.error(`Failed to send driver autoresponder:`, emailError);
    }

    console.log("Driver application processed successfully");

    return new Response(JSON.stringify({ 
      success: true, 
      applicationId: applicationId,
      message: "Driver application submitted successfully" 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error processing driver application:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "An error occurred processing your application" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);