import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// TODO: Replace with Upstash Redis or similar Edge-compatible KV store for production rate-limiting.
// WARNING: In-memory rate limiting is ineffective in serverless environments as state resets frequently.
const fallbackRateLimitMap = new Map<string, { count: number; resetTime: number }>();

async function checkRateLimit(ip: string): Promise<boolean> {
  const limit = 3;
  const windowMs = 60 * 60 * 1000; // 1 hour

  const now = Date.now();
  let record = fallbackRateLimitMap.get(ip);
  if (!record) {
    record = { count: 0, resetTime: now + windowMs };
    fallbackRateLimitMap.set(ip, record);
  }

  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + windowMs;
  }

  record.count++;
  return record.count <= limit;
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error('TURNSTILE_SECRET_KEY is not set');
    return false;
  }

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, response: token, remoteip: ip }),
  });

  const result = await res.json();
  return result.success === true;
}

export async function POST(request: Request) {
  // Rate limiting check
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
  const isRateLimited = !(await checkRateLimit(ip));

  if (isRateLimited) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
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
    const { name, email, subject, message, website, captchaToken } = data;

    // Honeypot check
    if (website) {
      return NextResponse.json({ success: true });
    }

    // Turnstile CAPTCHA verification
    if (!captchaToken) {
      return NextResponse.json({ error: 'CAPTCHA validation required' }, { status: 400 });
    }

    const captchaValid = await verifyTurnstile(captchaToken, ip);
    if (!captchaValid) {
      return NextResponse.json({ error: 'CAPTCHA validation failed' }, { status: 400 });
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
      'Business Alliance',
      'Client',
      'Philanthropic Inquiry',
      'Press / Media',
      'General Information',
    ];
    if (subject && !allowedSubjects.includes(subject)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const contactEmail = process.env.CONTACT_EMAIL || 'hichamahmana@gmail.com';

    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: contactEmail,
      subject: `New Inquiry via Dekkak.com: ${subject || 'General Information'}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error('Resend error:', error.name);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}
