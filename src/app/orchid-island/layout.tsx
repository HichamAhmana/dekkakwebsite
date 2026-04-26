import type { Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Orchid Island — Mohamed Dekkak's Landmark Vision",
  description:
    "Orchid Island is Mohamed Dekkak's landmark real estate and lifestyle project — a vision of architectural excellence, natural beauty, and world-class living that reflects his commitment to building legacy infrastructure across the region.",
  keywords: [
    "Orchid Island",
    "Orchid Island Real Estate Agency",
    "Chairman and Founder Mohamed Dekkak",
    "Orchid Island Mohamed Dekkak",
    "Mohamed Dekkak real estate",
    "luxury real estate UAE",
    "landmark development",
    "Dekkak property investment",
    "architectural excellence",
    "serial entrepreneur Mohamed Dekkak",
  ],
  alternates: {
    canonical: `${BASE_URL}/orchid-island`,
  },
};

const orchidIslandSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Orchid Island Real Estate Agency",
  "founder": {
    "@type": "Person",
    "name": "Mohamed Dekkak",
    "jobTitle": "Chairman and Founder"
  }
};

export default function OrchidIslandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orchidIslandSchema) }}
      />
      {children}
    </>
  );
}
