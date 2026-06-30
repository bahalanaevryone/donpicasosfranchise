const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY')
const BREVO_FROM_EMAIL = Deno.env.get('BREVO_FROM_EMAIL') || ''
const BREVO_FROM_NAME = Deno.env.get('BREVO_FROM_NAME') || 'Don Picaso Franchise'

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

function sendBrevoEmail(to: { email: string; name: string }, subject: string, htmlContent: string, fromName?: string) {
  return fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: fromName || BREVO_FROM_NAME, email: BREVO_FROM_EMAIL },
      to: [to],
      subject,
      htmlContent,
    }),
  })
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

      const emailResponse = await sendBrevoEmail(
        { email: to_email, name: to_name || '' },
        subject,
        html_body,
        'Don Picaso Franchise',
      )

      const data = await emailResponse.json()

      return new Response(JSON.stringify({ success: emailResponse.ok, data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: emailResponse.ok ? 200 : 400,
      })
    }

    // Webhook mode — auto-notify admin when new lead is inserted
    const { name, email, phone, message } = (payload as WebhookPayload).record

    const adminHtmlContent = `
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
    `

    await sendBrevoEmail(
      { email: 'delacruzjoven937@gmail.com', name: 'Admin' },
      `NEW FRANCHISE LEAD: ${name}`,
      adminHtmlContent,
      'Don Picaso Leads',
    )

    // Send confirmation email to the applicant
    const applicantHtmlContent = `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #7A0000; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <img src="https://ziujwnzhtxxnyzsohbjq.supabase.co/storage/v1/object/public/branding/don-picaso-logo.png" alt="Don Picaso's House of Franchise" style="max-width: 180px;" />
        </div>
        <h2 style="color: #7A0000; text-align: center;">Thank You, ${name}!</h2>
        <p style="font-size: 16px; line-height: 1.6; color: #333;">
          We have received your inquiry and would like to thank you for your interest in
          <strong>Don Picaso's House of Franchise</strong>.
        </p>
        <div style="background: #fef9e7; border-left: 4px solid #FFD700; padding: 16px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0; color: #333; font-size: 14px; line-height: 1.5;">
            A member of our team will review your message and get back to you within
            <strong>24 to 48 hours</strong> via email or phone.
          </p>
        </div>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="font-size: 14px; color: #666; line-height: 1.6;">
          In the meantime, feel free to explore our website to learn more about our franchise
          opportunities and food products. If you have urgent concerns, you may reach us at
          <strong>0956-293-1985</strong> or reply directly to this email.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="font-size: 12px; color: #999; text-align: center;">
          Mamburao, Occidental Mindoro, Philippines<br />
          Don Picaso's House of Franchise &copy; ${new Date().getFullYear()}
        </p>
      </div>
    `

    try {
      await sendBrevoEmail(
        { email, name },
        'Thank You for Reaching Out — Don Picaso\'s House of Franchise',
        applicantHtmlContent,
        'Don Picaso Franchise',
      )
    } catch (confirmError) {
      console.error('Failed to send confirmation email to applicant:', confirmError.message)
    }

    return new Response(JSON.stringify({ success: true }), {
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
