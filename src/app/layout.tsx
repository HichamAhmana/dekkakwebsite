import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import "./globals.css";

import CookieBanner from "./components/CookieBanner";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dekkakwebsite.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Mohamed Dekkak | Chairman, Investor, Philanthropist",
    template: "%s | Mohamed Dekkak",
  },
  description:
    "Official website of Mohamed Dekkak — Chairman & Founder of Adgeco Group, global investor, and philanthropist bridging the Middle East, Africa, and beyond.",
  keywords: [
    "Mohamed Dekkak",
    "Adgeco Group",
    "Abu Dhabi",
    "Marrakech",
    "philanthropist",
    "investor",
    "Anouar Association",
    "AmCham",
    "real estate UAE",
    "business UAE",
    "business Morocco",
    "business Spain",
    "business Africa",
    "business Middle East",
    "Arab Peace Corps Foundation",
    "CARLAC",
    "New Arab Foundation",
    "Ibn Battuta Association",
    "Sahara Spirit Foundation",
    "Union Road Association",
    
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Mohamed Dekkak",
    title: "Mohamed Dekkak | Chairman, Investor, Philanthropist",
    description:
      "Official website of Mohamed Dekkak — Chairman & Founder of Adgeco Group, global investor, and philanthropist.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Dekkak | Chairman, Investor, Philanthropist",
    description:
      "Mohamed Dekkak has spent three decades building a cross-continental business empire across the Middle East, Africa, and beyond.",
    images: ["/og-image.jpg"],
    creator: "@MohamedDekkak1",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Mohamed Dekkak",
  "url": BASE_URL,
  "jobTitle": [
    "Founding Partner of US Data Center",
    "Founding Partner of The American University - Marrakesh",
    "Founding Partner of The American Medical City - Marrakesh",
    "Chairman and Founder of Orchid Island Real Estate Agency",
    "Chairman and Founder of Adgeco Group",
    "President of Gate One Properties",
    "Chairman of Arab Peace Corps Foundation",
    "Chief Financial Officer and Founding Member of CARLAC",
    "President/Executive Director of the New Arab Foundation",
    "Honorary President of Ibn Battuta Association",
    "Chairman of Anouar Association",
    "Honorary President of Union Road Association",
    "Executive President of Sahara Spirit Foundation",
     "serial entrepreneur Mohamed Dekkak"
  ],
  "hasOccupation": [
    { "@type": "Occupation", "name": "Founding Partner", "mainEntityOfPage": { "@type": "Organization", "name": "US Data Center" } },
    { "@type": "Occupation", "name": "Founding Partner", "mainEntityOfPage": { "@type": "Organization", "name": "The American University - Marrakesh" } },
    { "@type": "Occupation", "name": "Founding Partner", "mainEntityOfPage": { "@type": "Organization", "name": "The American Medical City - Marrakesh" } },
    { "@type": "Occupation", "name": "Chairman and Founder", "mainEntityOfPage": { "@type": "Organization", "name": "Orchid Island Real Estate Agency" } },
    { "@type": "Occupation", "name": "Chairman and Founder", "mainEntityOfPage": { "@type": "Organization", "name": "Adgeco Group" } },
    { "@type": "Occupation", "name": "President", "mainEntityOfPage": { "@type": "Organization", "name": "Gate One Properties" } },
    { "@type": "Occupation", "name": "Chairman", "mainEntityOfPage": { "@type": "Organization", "name": "Arab Peace Corps Foundation" } },
    { "@type": "Occupation", "name": "Chief Financial Officer and Founding Member", "mainEntityOfPage": { "@type": "Organization", "name": "CARLAC" } },
    { "@type": "Occupation", "name": "President/Executive Director", "mainEntityOfPage": { "@type": "Organization", "name": "New Arab Foundation" } },
    { "@type": "Occupation", "name": "Honorary President", "mainEntityOfPage": { "@type": "Organization", "name": "Ibn Battuta Association" } },
    { "@type": "Occupation", "name": "Chairman", "mainEntityOfPage": { "@type": "Organization", "name": "Anouar Association" } },
    { "@type": "Occupation", "name": "Honorary President", "mainEntityOfPage": { "@type": "Organization", "name": "Union Road Association" } },
    { "@type": "Occupation", "name": "Executive President", "mainEntityOfPage": { "@type": "Organization", "name": "Sahara Spirit Foundation" } }
  ],
  "award": [
    "Medal from King Abdullah University of Science and Technology (January 2009)",
    "CHONMA-CHONG Gold Crown — Korean Ministry of Foreign Affairs (2006)",
    "BRIGADE DE REPRESSION DU BANDITISME — French Police (2005)",
    "Gold Star Award — Institute for Professional Excellence, Spain (October 2015)",
    "Recognition/Certificate of Gratitude — Intellectual Property Arab IP Forum 2008, Abu Dhabi UAE"
  ],
  "memberOf": [
    { "@type": "Organization", "name": "Adgeco Group", "url": "http://adgeco.com" },
    { "@type": "Organization", "name": "Gate One Properties", "url": "http://gateone.ae" },
    { "@type": "Organization", "name": "Arab Peace Corps Foundation" },
    { "@type": "Organization", "name": "CARLAC" },
    { "@type": "Organization", "name": "New Arab Foundation" },
    { "@type": "Organization", "name": "Ibn Battuta Association" },
    { "@type": "Organization", "name": "Anouar Association" },
    { "@type": "Organization", "name": "Sahara Spirit Foundation" },
    { "@type": "Organization", "name": "Union Road Association" },
    { "@type": "Organization", "name": "AmCham Abu Dhabi", "url": "https://amchamabudhabi.org" },
    { "@type": "Organization", "name": "Australian Business Council Dubai", "url": "https://www.abcduae.com" },
    { "@type": "Organization", "name": "Singapore Business Council" },
    { "@type": "Organization", "name": "Danish Business Council Dubai", "url": "https://danishbusinesscouncil.com" },
    { "@type": "Organization", "name": "Netherlands Business Council", "url": "https://www.nlbcuae.com" },
    { "@type": "Organization", "name": "Canadian Business Council", "url": "https://www.cbc-dubai.com" },
    { "@type": "Organization", "name": "German Emirati Joint Council for Industry & Commerce", "url": "https://vae.ahk.de/en" },
    { "@type": "Organization", "name": "British Business Group Abu Dhabi" },
    { "@type": "Organization", "name": "Benelux Business Council" },
    { "@type": "Organization", "name": "Arab Business Club", "url": "https://arabbusinessclub.org" },
    { "@type": "Organization", "name": "Chambre Française de Commerce et d'Industrie du Maroc", "url": "https://www.cfcim.org" },
    { "@type": "Organization", "name": "French Chamber of Commerce Abu Dhabi" },
    { "@type": "Organization", "name": "Spanish Business Council", "url": "http://spanishbusinesscouncil.ae/en" },
    { "@type": "Organization", "name": "Swiss Business Council", "url": "https://www.swissbcuae.com" }
  ]
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Mohamed Dekkak",
  "email": "info@dekkak.com",
  "address": [
    {
      "@type": "PostalAddress",
      "addressLocality": "Marrakech",
      "addressCountry": "Morocco"
    },
    {
      "@type": "PostalAddress",
      "addressLocality": "Abu Dhabi",
      "addressCountry": "UAE"
    },
    {
      "@type": "PostalAddress",
      "addressLocality": "Madrid",
      "addressCountry": "Spain"
    }
  ],
  "sameAs": [
    "https://www.linkedin.com/in/mohameddekkak/",
    "https://www.instagram.com/mohameddekkak/",
    "https://x.com/MohamedDekkak1",
    "https://web.facebook.com/MohamedDekkakOfficial/?_rdc=1&_rdr#",
    "https://www.pinterest.com/dekkak/",
    "https://www.youtube.com/user/AdgecoGroup"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            if (localStorage.getItem('theme') === 'light') {
              document.body.classList.add('light-theme');
            }
          } catch(e) {}
        `}} />
        <link rel="preconnect" href="https://live.staticflickr.com" />
        <link rel="preconnect" href="https://api.flickr.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${cormorant.variable} ${dmSans.variable}`}>
        {children}
        <Analytics />
        <SpeedInsights />
        <CookieBanner />
        <Script
          id="chatbase-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="f1gn0pAoTs_SS_O9euCWl";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();`,
          }}
        />
      </body>
    </html>
  );
}
