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
    const healthStatus = {
      ok: true,
      timestamp: new Date().toISOString(),
      env: {
        META_WA_PHONE_ID: !!Deno.env.get('META_WA_PHONE_ID'),
        META_WA_TOKEN: !!Deno.env.get('META_WA_TOKEN'),
        WHATSAPP_TO: '21628602147',
        SENDGRID_API_KEY: !!Deno.env.get('SENDGRID_API_KEY'),
        EMAIL_API_KEY: !!Deno.env.get('EMAIL_API_KEY'),
        RESEND_API_KEY: !!Deno.env.get('RESEND_API_KEY'),
        NOTIFY_TO: 'khilas592@gmail.com',
        NOTIFY_FROM: 'no-reply@get-tunisia-transfer.com',
        WHATSAPP_PROVIDER: Deno.env.get('WHATSAPP_PROVIDER') || 'not_set',
        EMAIL_PROVIDER: Deno.env.get('EMAIL_PROVIDER') || 'not_set',
      }
    };

    return new Response(
      JSON.stringify(healthStatus),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error: any) {
    console.error('Error in healthz:', error);
    return new Response(
      JSON.stringify({ ok: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
