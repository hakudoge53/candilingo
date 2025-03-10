
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@12.0.0';

const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
const stripe = new Stripe(stripeSecretKey);
const baseUrl = Deno.env.get('BASE_URL') || 'http://localhost:5173';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { priceId, productName, customPrice } = await req.json();
    console.log(`Creating checkout session for product: ${productName}, priceId: ${priceId}`);
    
    // Configure line items based on the request
    let lineItems;
    
    if (priceId) {
      // Use Stripe product/price if provided
      lineItems = [{ price: priceId, quantity: 1 }];
    } else if (customPrice) {
      // Create a custom price on-the-fly for Enterprise plan
      lineItems = [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: productName || 'Enterprise Plan',
          },
          unit_amount: Math.round(customPrice * 100), // Convert to cents
        },
        quantity: 1,
      }];
    } else {
      throw new Error('Either priceId or customPrice must be provided');
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'subscription',
      success_url: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/#pricing`,
    });

    return new Response(
      JSON.stringify({ 
        sessionId: session.id,
        url: session.url 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
