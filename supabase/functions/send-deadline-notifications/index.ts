
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get all active email subscriptions
    const { data: subscriptions, error } = await supabaseClient
      .from('email_subscriptions')
      .select('email')
      .eq('is_active', true)

    if (error) {
      throw error
    }

    // Calculate days until deadline
    const targetDate = new Date('2025-10-14T00:00:00').getTime();
    const now = new Date().getTime();
    const daysLeft = Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24));

    let emailCount = 0;
    
    // Send emails to all subscribers
    for (const subscription of subscriptions || []) {
      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Windows 10 Countdown <notifications@yourdomain.com>',
            to: [subscription.email],
            subject: `⏰ Windows 10 Support Ends in ${daysLeft} Days!`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2563eb;">Windows 10 Support Deadline Reminder</h2>
                <p>Hello!</p>
                <p>This is a friendly reminder that Windows 10 support will end in <strong>${daysLeft} days</strong> on <strong>October 14, 2025</strong>.</p>
                <p>After this date, Microsoft will no longer provide:</p>
                <ul>
                  <li>Security updates</li>
                  <li>Technical support</li>
                  <li>Software updates</li>
                </ul>
                <p>Consider upgrading to Windows 11 or exploring alternative operating systems before the deadline.</p>
                <p style="margin-top: 30px;">
                  <a href="https://yoursite.com" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                    View Countdown
                  </a>
                </p>
                <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
                  You're receiving this because you subscribed to Windows 10 deadline notifications.
                </p>
              </div>
            `
          }),
        });

        if (emailResponse.ok) {
          emailCount++;
        }
      } catch (emailError) {
        console.error(`Failed to send email to ${subscription.email}:`, emailError);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Sent ${emailCount} notifications`,
        daysLeft 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
