# Mohamed Dekkak — Official Website

> The official personal website of **Mohamed Dekkak** — Moroccan businessman, investor, diplomat, and philanthropist. Built with a dark luxury aesthetic reflecting three decades of cross-continental enterprise across the Middle East, Africa, and Europe.

🌐 **Live:** [dekkakwebsite.vercel.app](https://dekkakwebsite.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Inline styles + CSS Variables |
| Animations | Framer Motion |
| Fonts | Cormorant Garamond + DM Sans (next/font) |
| Email | Resend |
| Chatbot | Chatbase |
| Analytics | Vercel Analytics |
| CAPTCHA | Cloudflare Turnstile |
| Media | Flickr API |
| Deployment | Vercel |

---

## Features

- 🌑 **Dark luxury design** — editorial aesthetic with gold `#C9A84C` accents
- ☀️ **Light/Dark theme toggle** — seamless switch preserving brand colors
- 📱 **Fully responsive** — optimized for all screen sizes
- 🤖 **AI Chatbot** — Chatbase powered, trained on Mohamed Dekkak's content
- 📧 **Contact form** — Resend integration with rate limiting and Turnstile CAPTCHA
- 💬 **WhatsApp integration** — secure server-side redirect (number never exposed)
- 🖼️ **Flickr gallery & blog** — pulls real photos from official Flickr account
- 🔍 **Full SEO** — metadata, sitemap, robots, Schema.org JSON-LD, OpenGraph, Twitter Cards
- 🌍 **GEO optimization** — llms.txt and llms-full.txt for AI search engines
- ⚡ **Performance score 98** — lazy loading, optimized images, code splitting
- 🔒 **Security hardened** — headers, input validation, honeypot, rate limiting

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, stats, three dimensions, engagement |
| `/about` | Biography, timeline, awards, global memberships |
| `/business` | Ventures, companies, global network map |
| `/services` | Real estate, M&A, consulting, capital raising |
| `/impact` | Philanthropy, foundations, humanitarian work |
| `/gallery` | Photo gallery with category filters (Flickr) |
| `/blog` | Articles and dispatches (Flickr powered) |
| `/orchid-island` | Orchid Island Real Estate Agency |
| `/healthcare` | Healthcare ventures and initiatives |
| `/contact` | Contact form, WhatsApp, social links |

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── contact/        # Email API (Resend)
│   │   └── whatsapp/       # Secure WhatsApp redirect
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Blog.tsx
│   │   ├── Engagement.tsx
│   │   ├── Stats.tsx
│   │   └── ThreePaths.tsx
│   ├── about/
│   ├── blog/
│   ├── business/
│   ├── contact/
│   ├── gallery/
│   ├── healthcare/
│   ├── impact/
│   ├── orchid-island/
│   ├── services/
│   ├── layout.tsx          # Root layout with metadata + schema
│   ├── page.tsx            # Homepage
│   ├── sitemap.ts          # Auto-generated sitemap
│   ├── robots.ts           # Robots.txt
│   └── globals.css         # CSS variables + theme
public/
├── llms.txt                # GEO optimization for AI crawlers
└── llms-full.txt           # Full biography for AI engines
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/HichamAhmana/dekkakwebsite.git
cd dekkakwebsite
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
# Site
NEXT_PUBLIC_SITE_URL=https://dekkakwebsite.vercel.app

# Resend (email)
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=your@email.com

# WhatsApp (never expose publicly)
WHATSAPP_NUMBER=212XXXXXXXXX

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key
TURNSTILE_SECRET_KEY=your_secret_key

# Flickr API
FLICKR_API_KEY=your_flickr_api_key
FLICKR_USER_ID=your_flickr_user_id
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
npm start
```

---

## Deployment

The site is deployed on **Vercel** with automatic deployments on every push to `main`.

### Environment Variables on Vercel
Add all variables from `.env.local` in:
`Vercel Dashboard → Settings → Environment Variables`

### Domain
Currently live at `dekkakwebsite.vercel.app`.
Final domain: `dekkak.com` (pending DNS configuration).

---

## SEO & Performance

| Metric | Score |
|---|---|
| Performance | 98 |
| First Contentful Paint | ~1.7s |
| Largest Contentful Paint | ~1.95s |
| Cumulative Layout Shift | 0 |
| Time to First Byte | 0.37s |

**SEO features:**
- Per-page metadata with `title.template`
- Schema.org JSON-LD — Person, LocalBusiness, Blog
- Auto-generated `/sitemap.xml`
- Configured `/robots.txt`
- OpenGraph + Twitter Cards
- Canonical URLs
- hreflang tags
- GEO: `llms.txt` + `llms-full.txt`

---

## Security

- ✅ Security headers — X-Frame-Options, CSP, HSTS, Permissions-Policy
- ✅ Rate limiting on contact form (3 requests/hour/IP)
- ✅ Honeypot field on contact form
- ✅ Input validation and sanitization
- ✅ Cloudflare Turnstile CAPTCHA
- ✅ WhatsApp number hidden server-side
- ✅ No hardcoded secrets
- ✅ Safe error messages (no internal details exposed)

---

## Credits

**Design & Development:** [Hicham Ahmana](https://github.com/HichamAhmana)
**Client:** Mohamed Dekkak

---

## License

All rights reserved © 2026 Mohamed Dekkak — [Dekkak.com](https://dekkak.com)