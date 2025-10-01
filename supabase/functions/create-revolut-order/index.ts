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
    const { depositAmount, currency, bookingData } = await req.json();
    
    console.log('Creating Revolut order:', { depositAmount, currency, bookingData });

    const revolutMode = Deno.env.get('REVOLUT_MODE') || 'sandbox';
    const apiKey = Deno.env.get('REVOLUT_API_KEY');
    
    const revolutBaseUrl = revolutMode === 'live'
      ? 'https://merchant.revolut.com/api/1.0'
      : 'https://sandbox-merchant.revolut.com/api/1.0';

    // Convert amount to minor units (cents for EUR/GBP/USD, millimes for TND)
    const minorUnitMultiplier = currency === 'TND' ? 1000 : 100;
    const amountInMinorUnits = Math.round(depositAmount * minorUnitMultiplier);

    // Create Revolut order
    const orderResponse = await fetch(`${revolutBaseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amountInMinorUnits,
        currency: currency,
        description: `Get Tunisia Transfer - 25% Deposit for ${bookingData.route}`,
        merchant_order_ext_ref: bookingData.reference || '',
        customer_email: bookingData.email,
        success_redirect_url: `${req.headers.get('origin')}/booking-success`,
        failure_redirect_url: `${req.headers.get('origin')}/booking-cancelled`,
      }),
    });

    if (!orderResponse.ok) {
      const errorData = await orderResponse.json();
      console.error('Revolut order creation failed:', errorData);
      throw new Error('Failed to create Revolut order');
    }

    const order = await orderResponse.json();
    console.log('Revolut order created:', order.id);

    return new Response(JSON.stringify({ 
      orderId: order.id,
      checkoutUrl: order.checkout_url 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in create-revolut-order:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});