import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import Cursor from "./components/Cursor";

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
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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
      "Official website of Mohamed Dekkak — Chairman & Founder of Adgeco Group, global investor, and philanthropist.",
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
    "Executive President of Sahara Spirit Foundation"
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
    { "@type": "Organization", "name": "Arab Peace Corp Foundation", "url": "http://arabpeacecorps.org" },
    { "@type": "Organization", "name": "CARLAC", "url": "http://carlac.net" },
    { "@type": "Organization", "name": "New Arab Foundation", "url": "http://newarabfoundation.org" },
    { "@type": "Organization", "name": "Ibn Battuta Association", "url": "http://ibnbattuta.ma" },
    { "@type": "Organization", "name": "Anouar Association", "url": "http://anouar.org.ma" },
    { "@type": "Organization", "name": "Sahara Spirit Foundation", "url": "http://saharaspirit.org" },
    { "@type": "Organization", "name": "Union Road Association", "url": "http://unionroad.org" },
    { "@type": "Organization", "name": "AmCham Abu Dhabi", "url": "http://amchamabudhabi.org" },
    { "@type": "Organization", "name": "Australian Business Council Dubai", "url": "http://abcduae.com" },
    { "@type": "Organization", "name": "Singapore Business Council", "url": "http://sbcuae.org" },
    { "@type": "Organization", "name": "Danish Business Council Dubai" },
    { "@type": "Organization", "name": "Netherlands Business Council" },
    { "@type": "Organization", "name": "Canadian Business Council", "url": "http://cbc-dubai.com" },
    { "@type": "Organization", "name": "German Emirati Joint Council for Industry & Commerce" },
    { "@type": "Organization", "name": "British Business Group Abu Dhabi", "url": "http://britishbusiness.org" },
    { "@type": "Organization", "name": "Benelux Business Council" },
    { "@type": "Organization", "name": "Arab Business Club", "url": "http://arabbusinessclub.org" },
    { "@type": "Organization", "name": "Chambre Française de Commerce et d'Industrie du Maroc", "url": "http://cfcim.org" },
    { "@type": "Organization", "name": "French Chamber of Commerce Abu Dhabi", "url": "http://fbgabudhabi.com" },
    { "@type": "Organization", "name": "Spanish Business Council", "url": "http://spanishbusinesscouncil.ae" },
    { "@type": "Organization", "name": "Swiss Business Council", "url": "http://swissbcuae.com" }
  ]
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Mohamed Dekkak",
  "email": "contact@dekkak.com",
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
        <ThemeProvider>
          {/* <Cursor /> */}
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
