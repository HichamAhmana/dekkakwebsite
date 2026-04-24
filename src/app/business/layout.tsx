import type { Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Business & Enterprise — Adgeco Group, AmCham & More",
  description:
    "Explore the cross-continental business empire of Mohamed Dekkak — Chairman & Founder of Adgeco Group (Abu Dhabi, est. 1992), active AmCham member, President of Gate One Properties, and Founding Partner of landmark infrastructure projects in education and healthcare across the UAE and Morocco.",
  keywords: [
    "Adgeco Group",
    "Adgeco Group Abu Dhabi",
    "Mohamed Dekkak business",
    "AmCham Abu Dhabi",
    "Gate One Properties",
    "Gate One Properties UAE",
    "US Data Center",
    "American University Marrakech",
    "The American University - Marrakesh",
    "American Medical City Marrakesh",
    "The American Medical City - Marrakesh",
    "CARLAC",
    "Orchid Island Real Estate Agency",
    "Mohamed Dekkak chairman",
    "oil gas EPC construction UAE",
    "cross-continental enterprise",
    "UAE holding company",
  ],
  alternates: {
    canonical: `${BASE_URL}/business`,
  },
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "name": "Mohamed Dekkak",
    "worksFor": [
      { "@type": "Organization", "name": "Adgeco Group" },
      { "@type": "Organization", "name": "Gate One Properties" },
      { "@type": "Organization", "name": "US Data Center" },
      { "@type": "Organization", "name": "The American University - Marrakesh" },
      { "@type": "Organization", "name": "The American Medical City - Marrakesh" },
      { "@type": "Organization", "name": "CARLAC" },
      { "@type": "Organization", "name": "Orchid Island Real Estate Agency" }
    ]
  }
};

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      {children}
    </>
  );
}
