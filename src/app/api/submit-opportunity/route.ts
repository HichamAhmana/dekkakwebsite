import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// In-memory rate limiting (fallback)
// Note: In-memory rate limiting resets on cold boots.
// Consider Upstash Redis for production-grade limiting.
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

function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[<>:"\/\\|?*]+/g, '')
    .replace(/\s+/g, '-');
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
  const isRateLimited = !(await checkRateLimit(ip));

  if (isRateLimited) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  if (!resend) {
    console.error('RESEND_API_KEY is not set');
    return NextResponse.json(
      { error: 'Email service not configured yet' },
      { status: 503 }
    );
  }

  try {
    const data = await request.json();
    const { name, email, company, opportunityType, location, dealSize, description, confidentiality, captchaToken, website, attachment } = data;

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
    if (!name || !email || !description || !opportunityType || !dealSize || !confidentiality) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    if (name.length > 100 || description.length > 5000) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    if (company && company.length > 200) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    if (location && location.length > 200) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const allowedTypes = [
      'Real Estate Asset', 'Hotel / Hospitality Project',
      'Investment Partnership', 'M&A Transaction',
      'Strategic Alliance', 'Sovereign AI / Data Infrastructure',
      'Family Office Opportunity', 'Other'
    ];
    if (!allowedTypes.includes(opportunityType)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const allowedSizes = [
      'Under $1M', '$1M - $10M', '$10M - $50M',
      '$50M - $100M', '$100M+', 'Undisclosed'
    ];
    if (!allowedSizes.includes(dealSize)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // File handling
    let fileInfo = "No file attached.";
    if (attachment && attachment.content && attachment.filename) {
      try {
        const fileBuffer = Buffer.from(attachment.content, 'base64');
        const originalFilename = attachment.filename;
        const mimeType = attachment.type;
        const extension = originalFilename.split('.').pop()?.toLowerCase();
        
        // Step 1: Check extension
        const allowedExtensions = ['pdf', 'docx', 'pptx'];
        if (!extension || !allowedExtensions.includes(extension)) {
          throw new Error("Invalid extension");
        }
        
        // Step 2: Check MIME type matches extension
        const mimeMap: Record<string, string> = {
          'pdf': 'application/pdf',
          'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        };
        if (mimeMap[extension] !== mimeType) {
          throw new Error("MIME type mismatch");
        }

        // Step 3: Check file size (10MB)
        if (fileBuffer.length > 10 * 1024 * 1024) {
          throw new Error("File too large");
        }

        // Step 4: Sanitize filename
        const sanitizedFilename = sanitizeFilename(originalFilename);

        // Step 5: Check magic bytes
        if (fileBuffer.length < 8) {
          throw new Error("File too small");
        }
        
        const hex = fileBuffer.toString('hex', 0, 4).toUpperCase();
        if (extension === 'pdf') {
          if (hex !== '25504446') { // %PDF
            throw new Error("Magic bytes mismatch");
          }
        } else if (extension === 'docx' || extension === 'pptx') {
          const zipHex = fileBuffer.toString('hex', 0, 2).toUpperCase();
          if (zipHex !== '504B') { // PK
            throw new Error("Magic bytes mismatch");
          }
        }

        // Step 6: Do NOT attach file to email
        const sizeMB = (fileBuffer.length / (1024 * 1024)).toFixed(2);
        fileInfo = `Attached File Details:\n Filename: ${sanitizedFilename}\n Size: ${sizeMB} MB\n Type: ${mimeType}\n Note: File not stored for security. Available upon request from submitter.`;
      } catch {
        // Generic error for any file failure
        return NextResponse.json({ error: 'Invalid file. Please upload a valid PDF, DOCX or PPTX file under 10MB.' }, { status: 400 });
      }
    }

    const contactEmail = 'hichamahmana@gmail.com';

    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: contactEmail,
      subject: `New Opportunity Submission: ${opportunityType}`,
      text: `
New Opportunity Submission via Dekkak.com:

Name: ${name}
Email: ${email}
Company / Organization: ${company || 'N/A'}
Location / Market: ${location || 'N/A'}

Opportunity Type: ${opportunityType}
Deal Size: ${dealSize}

Description:
${description}

Confidentiality Agreement: ${confidentiality ? 'Confirmed' : 'Not Confirmed'}

${fileInfo}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Submit Opportunity API Error:', error);
    return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 });
  }
}
