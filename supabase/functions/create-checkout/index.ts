
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
    const { priceId, productId, productName, customPrice, couponId, trialPeriod = true } = await req.json();
    
    let lineItems;
    
    if (priceId) {
      // Use Stripe price if provided
      console.log(`Creating checkout session with price ID: ${priceId}`);
      lineItems = [{ price: priceId, quantity: 1 }];
    } else if (productId) {
      // Find the first active price for this product
      console.log(`Finding prices for product ID: ${productId}`);
      const prices = await stripe.prices.list({
        product: productId,
        active: true,
        limit: 1,
      });
      
      if (prices.data.length === 0) {
        throw new Error(`No active prices found for product: ${productId}`);
      }
      
      const firstPrice = prices.data[0];
      console.log(`Using price ID: ${firstPrice.id} for product: ${productId}`);
      lineItems = [{ price: firstPrice.id, quantity: 1 }];
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
      throw new Error('Either priceId, productId or customPrice must be provided');
    }

    // Create checkout session parameters
    const sessionParams = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'subscription',
      success_url: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/payment-cancelled?session_id={CHECKOUT_SESSION_ID}`,
    };
    
    // Add trial period only if explicitly requested (not for Enterprise plan)
    if (trialPeriod) {
      sessionParams.subscription_data = {
        trial_period_days: 30, // Add a 30-day trial period
      };
    }
    
    // Add coupon to session if provided and exists in Stripe
    if (couponId) {
      try {
        // First check if the coupon exists
        console.log(`Checking if coupon: ${couponId} exists`);
        await stripe.coupons.retrieve(couponId);
        
        // If we get here, the coupon exists, so add it to the session
        console.log(`Adding coupon: ${couponId} to checkout session`);
        sessionParams.discounts = [{ coupon: couponId }];
      } catch (error) {
        // If coupon doesn't exist, log the error but continue without applying discount
        console.error(`Coupon error: ${error.message}`);
        console.log(`Continuing checkout without coupon: ${couponId}`);
        // We don't rethrow here to allow checkout to continue without the coupon
      }
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create(sessionParams);

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
