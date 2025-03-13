
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

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
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );
    
    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get the user from the auth header
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized', details: userError?.message }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const { code } = await req.json();
    
    if (!code) {
      return new Response(
        JSON.stringify({ error: 'Missing referral code' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Check if the code exists and is active
    const { data: referralCode, error: referralError } = await supabase
      .from('referral_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single();
    
    if (referralError || !referralCode) {
      return new Response(
        JSON.stringify({ error: 'Invalid referral code', details: referralError?.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Check if the user has already used this code
    const { data: existingUsage, error: usageError } = await supabase
      .from('referral_usage')
      .select('*')
      .eq('user_id', user.id)
      .eq('referral_code_id', referralCode.id)
      .single();
    
    if (existingUsage) {
      return new Response(
        JSON.stringify({ error: "You've already used this referral code" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Check if the usage limit has been reached
    if (referralCode.usage_limit && referralCode.usage_count >= referralCode.usage_limit) {
      return new Response(
        JSON.stringify({ error: "This referral code has reached its usage limit" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Calculate expiry date
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + referralCode.duration_months);
    
    // Apply the referral code
    const { error: insertError } = await supabase
      .from('referral_usage')
      .insert({
        referral_code_id: referralCode.id,
        user_id: user.id,
        expires_at: expiresAt.toISOString()
      });
    
    if (insertError) {
      return new Response(
        JSON.stringify({ error: 'Error applying referral code', details: insertError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Increment usage count
    await supabase
      .from('referral_codes')
      .update({ usage_count: referralCode.usage_count + 1 })
      .eq('id', referralCode.id);
    
    // Update user's membership tier
    await supabase
      .from('profiles')
      .update({ membership_tier: 'Premium' })
      .eq('id', user.id);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Referral code applied! You'll get ${referralCode.duration_months} months of Premium access.`,
        expiresAt: expiresAt.toISOString(),
        durationMonths: referralCode.duration_months
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in validate-referral function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
