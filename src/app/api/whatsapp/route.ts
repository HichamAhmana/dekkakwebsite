import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const number = process.env.WHATSAPP_NUMBER;
  
  if (!number) {
    // Fallback to homepage or contact page if number is not configured
    return NextResponse.redirect(new URL('/contact', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));
  }

  // Construct the WhatsApp URL, stripping out any non-numeric characters just in case
  const whatsappUrl = `https://wa.me/${number.replace(/[^0-9]/g, '')}`;
  
  // Redirect to WhatsApp
  return NextResponse.redirect(whatsappUrl);
}
