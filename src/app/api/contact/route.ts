import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Debug: Log whether API key exists
console.log('[DEBUG] RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  // Check if Resend is configured
  if (!resend) {
    console.error('RESEND_API_KEY is not set in environment variables');
    return NextResponse.json(
      { error: 'Email service not configured yet' },
      { status: 503 }
    );
  }

  try {
    const data = await request.json();
    const { name, email, subject, message } = data;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Debug: Log what data is being sent to Resend
    console.log('[DEBUG] Sending to Resend:', {
      from: 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL || 'hichamahmana@gmail.com',
      subject: `New Inquiry via Dekkak.com: ${subject || 'General Information'}`,
    });

    // Send the email using Resend
    console.log('Attempting to send email with:', {
      hasApiKey: !!process.env.RESEND_API_KEY,
      from: 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL || 'hichamahmana@gmail.com',
    });

    const { data: emailData, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Use Resend's test domain (no domain verification needed)
      to: process.env.CONTACT_EMAIL || 'hichamahmana@gmail.com',
      subject: `New Inquiry via Dekkak.com: ${subject || 'General Information'}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    });

    console.log('Resend response:', JSON.stringify(emailData));
    console.log('Resend error:', JSON.stringify(error));

    if (error) {
      // Debug: Log full error response from Resend
      console.error('[DEBUG] Resend full error response:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: error.message || 'Failed to send email', details: error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data: emailData });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
