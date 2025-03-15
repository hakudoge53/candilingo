
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.10.0?target=deno";

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
    const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');
    if (!STRIPE_SECRET_KEY) {
      throw new Error('Missing STRIPE_SECRET_KEY');
    }
    
    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
    
    const body = await req.json();
    const {
      priceId, 
      productId, 
      productName,
      customPrice,
      couponId,
      trialPeriod,
      cancelUrl = 'https://candilingo.com/customer-portal'
    } = body;
    
    // Validate that at least one price identifier is provided
    if (!priceId && !productId && !customPrice) {
      return new Response(
        JSON.stringify({ error: 'Missing price information' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Get the origin for success redirect
    const origin = req.headers.get('origin') || 'https://candilingo.com';
    
    // Set up the checkout session parameters
    const sessionParams = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
    };
    
    // If productId or customPrice is provided instead of priceId
    if (!priceId && (productId || customPrice)) {
      // We need to create a product and price
      const lineItem = {
        quantity: 1,
      };
      
      if (customPrice) {
        // For a custom price, we need to use price_data
        // Update the enterprise price to reflect 50% off
        const enterprisePrice = productName === "Enterprise Plan" ? 99.50 : customPrice;
        
        Object.assign(lineItem, {
          price_data: {
            currency: 'eur',
            product_data: {
              name: productName || 'Candilingo Subscription',
            },
            unit_amount: enterprisePrice * 100, // Convert to cents
            recurring: {
              interval: 'month',
            },
          },
        });
      } else if (productId) {
        // For productId, look up the price
        const prices = await stripe.prices.list({
          product: productId,
          active: true,
          limit: 1,
        });
        
        if (prices.data.length === 0) {
          return new Response(
            JSON.stringify({ error: 'No active prices found for the provided product' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        
        Object.assign(lineItem, {
          price: prices.data[0].id,
        });
      }
      
      // Update line_items with our custom line item
      sessionParams.line_items = [lineItem];
    }
    
    // Add trial period if requested
    if (trialPeriod) {
      Object.assign(sessionParams, {
        subscription_data: {
          trial_period_days: 30,
        },
      });
    }
    
    // Add coupon if provided
    if (couponId) {
      // Check if the coupon exists
      try {
        await stripe.coupons.retrieve(couponId);
        Object.assign(sessionParams, {
          discounts: [
            {
              coupon: couponId,
            },
          ],
        });
      } catch (error) {
        console.error('Error retrieving coupon:', error);
        // Continue without applying the coupon
      }
    }
    
    // Create the checkout session
    const session = await stripe.checkout.sessions.create(sessionParams);
    
    return new Response(
      JSON.stringify({ url: session.url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
