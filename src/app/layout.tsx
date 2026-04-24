import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
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
      </head>
      <body className={`${cormorant.variable} ${dmSans.variable}`}>
        <ThemeProvider>
          {/* <Cursor /> */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
