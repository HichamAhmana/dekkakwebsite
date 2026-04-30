import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const limit = 3;

  let record = rateLimitMap.get(ip);
  if (!record) {
    record = { count: 0, resetTime: now + windowMs };
    rateLimitMap.set(ip, record);
  }

  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + windowMs;
  }

  record.count++;
  return record.count <= limit;
}

// Debug: Log whether API key exists
console.log('[DEBUG] RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  // Rate limiting check
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

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
    const { name, email, subject, message, website } = data;

    // Honeypot check
    if (website) {
      return NextResponse.json({ success: true });
    }

    // Input validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    if (name.length > 100 || message.length > 5000) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const allowedSubjects = [
      "Business Alliance",
      "Client",
      "Philanthropic Inquiry",
      "Press / Media",
      "General Information"
    ];
    if (subject && !allowedSubjects.includes(subject)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
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
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: emailData });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
