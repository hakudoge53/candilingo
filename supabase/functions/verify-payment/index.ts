
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.10.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');
  
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !STRIPE_SECRET_KEY) {
    return new Response(
      JSON.stringify({ error: 'Missing environment variables' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
  
  try {
    const supabase = createClient(
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY
    );
    
    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
    
    const body = await req.json();
    const { sessionId } = body;
    
    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: 'Missing session ID' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer', 'subscription']
    });
    
    if (!session) {
      return new Response(
        JSON.stringify({ error: 'Session not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Check if payment was successful
    if (session.payment_status !== 'paid') {
      return new Response(
        JSON.stringify({ error: 'Payment not completed', session }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const customerEmail = session.customer_details?.email;
    const customerId = session.customer;
    
    // Get user by email
    let userId = null;
    if (customerEmail) {
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', customerEmail)
        .single();
        
      if (userError) {
        console.error('Error finding user:', userError);
      } else if (userData) {
        userId = userData.id;
      }
    }
    
    // Handle different product types
    if (session.line_items?.data) {
      let productName = '';
      let addedLicenses = 0;
      
      // Check line items for product details
      for (const item of session.line_items.data) {
        if (item.description?.includes('License') || productName.includes('License')) {
          // This is a license purchase
          productName = item.description || 'Licenses';
          addedLicenses += item.quantity || 1;
        }
      }
      
      // Handle license purchase
      if (addedLicenses > 0 && userId) {
        // Get user's organization
        const { data: orgMemberData, error: orgMemberError } = await supabase
          .from('organization_members')
          .select('organization_id')
          .eq('user_id', userId)
          .eq('status', 'active')
          .in('role', ['admin', 'manager'])
          .single();
          
        if (orgMemberError) {
          console.error('Error finding organization:', orgMemberError);
        } else if (orgMemberData) {
          const organizationId = orgMemberData.organization_id;
          
          // Check if license record exists
          const { data: existingLicense, error: licenseError } = await supabase
            .from('organization_licenses')
            .select('*')
            .eq('organization_id', organizationId)
            .eq('license_type', 'standard')
            .single();
            
          if (licenseError && !licenseError.message.includes('No rows found')) {
            console.error('Error checking licenses:', licenseError);
          }
          
          if (existingLicense) {
            // Update existing license record
            const { error: updateError } = await supabase
              .from('organization_licenses')
              .update({ 
                total_licenses: existingLicense.total_licenses + addedLicenses,
                updated_at: new Date().toISOString() 
              })
              .eq('id', existingLicense.id);
              
            if (updateError) {
              console.error('Error updating licenses:', updateError);
            }
          } else {
            // Create new license record
            const { error: insertError } = await supabase
              .from('organization_licenses')
              .insert([
                { 
                  organization_id: organizationId,
                  total_licenses: addedLicenses,
                  used_licenses: 0,
                  license_type: 'standard',
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                }
              ]);
              
            if (insertError) {
              console.error('Error creating licenses:', insertError);
            }
          }
        }
      }
      
      // Handle Premium subscription
      if (session.subscription && userId) {
        // Update user membership tier
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ 
            membership_tier: 'Premium',
            stripe_customer_id: customerId,
            updated_at: new Date().toISOString() 
          })
          .eq('id', userId);
          
        if (updateError) {
          console.error('Error updating membership tier:', updateError);
        }
      }
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        status: 'verified',
        paymentId: sessionId
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error verifying payment:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
