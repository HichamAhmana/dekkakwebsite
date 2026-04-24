import type { Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Healthcare Initiatives — Mohamed Dekkak",
  description:
    "Mohamed Dekkak's healthcare vision — from the American Medical City in Marrakech to state-of-the-art medical partnerships and international health collaborations bringing world-class care to communities across the UAE and Morocco.",
  keywords: [
    "Mohamed Dekkak healthcare",
    "American Medical City Marrakech",
    "healthcare UAE Morocco",
    "Mohamed Dekkak medical",
    "Marrakech medical city",
    "international health partnership",
  ],
  alternates: {
    canonical: `${BASE_URL}/healthcare`,
  },
};

export default function HealthcareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
