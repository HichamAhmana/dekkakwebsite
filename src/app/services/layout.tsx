import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Services | Mohamed Dekkak",
  description: "Comprehensive services by Mohamed Dekkak and Adgeco Group, including real estate consulting, M&A, investment structuring, capital raising, and hospitality advisory.",
  keywords: [
    "Mohamed Dekkak",
    "Adgeco Group",
    "real estate",
    "consulting",
    "M&A",
    "investment structuring",
    "capital raising",
    "hospitality advisory"
  ],
  alternates: {
    canonical: `${BASE_URL}/services`,
  },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "provider": {
    "@type": "Person",
    "name": "Mohamed Dekkak"
  },
  "areaServed": ["United Arab Emirates", "Morocco", "Spain", "Global"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Professional Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Real Estate Services" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Consulting" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mergers & Acquisitions (M&A)" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Investment Structuring" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Capital Raising" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hospitality Advisory" } }
    ]
  }
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      {children}
    </>
  );
}
