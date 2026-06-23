import { ServeHandler } from "https://deno.land/std@0.131.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const RESEND_FROM_EMAIL = Deno.env.get('RESEND_FROM_EMAIL') || 'onboarding@resend.dev'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface WebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE'
  table: string
  record: {
    id: number
    name: string
    email: string
    phone: string
    message: string
  }
  schema: string
}

interface ManualSendPayload {
  mode: 'manual'
  to_email: string
  to_name: string
  subject: string
  html_body: string
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const payload = await req.json()

    if (payload.mode === 'manual') {
      const { to_email, to_name, subject, html_body } = payload as ManualSendPayload

      if (!to_email || !subject || !html_body) {
        return new Response(JSON.stringify({ error: 'Missing required fields: to_email, subject, html_body' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        })
      }

      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: `Don Picaso Franchise <${RESEND_FROM_EMAIL}>`,
          to: [to_email],
          subject: subject,
          html: html_body,
        }),
      })

      const resendData = await emailResponse.json()

      return new Response(JSON.stringify({ success: emailResponse.ok, data: resendData }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: emailResponse.ok ? 200 : 400,
      })
    }

    // Webhook mode — auto-notify admin when new lead is inserted
    const { name, email, phone, message } = (payload as WebhookPayload).record

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `Don Picaso Leads <${RESEND_FROM_EMAIL}>`,
        to: ['delacruzjoven937@gmail.com'],
        subject: `NEW FRANCHISE LEAD: ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #7A0000; border-radius: 8px;">
            <h2 style="color: #7A0000;">Don Picaso's House of Franchise</h2>
            <p>May bagong aplikante o inquiry na pumasok sa inyong website:</p>
            <hr />
            <p><strong>Pangalan:</strong> ${name}</p>
            <p><strong>Email Address:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phone}</p>
            <p><strong>Mensahe/Detalye:</strong></p>
            <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #FFD700;">
              ${message}
            </blockquote>
            <hr />
            <p style="font-size: 12px; color: #666;">Mula ito sa inyong Automated Website System.</p>
          </div>
        `,
      }),
    })

    const resendData = await emailResponse.json()

    return new Response(JSON.stringify({ success: true, data: resendData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
