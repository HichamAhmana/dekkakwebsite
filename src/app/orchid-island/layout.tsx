import type { Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Orchid Island — Mohamed Dekkak's Landmark Vision",
  description:
    "Orchid Island is Mohamed Dekkak's landmark real estate and lifestyle project — a vision of architectural excellence, natural beauty, and world-class living that reflects his commitment to building legacy infrastructure across the region.",
  keywords: [
    "Orchid Island",
    "Orchid Island Mohamed Dekkak",
    "Mohamed Dekkak real estate",
    "luxury real estate UAE",
    "landmark development",
    "Dekkak property investment",
    "architectural excellence",
  ],
  alternates: {
    canonical: `${BASE_URL}/orchid-island`,
  },
};

export default function OrchidIslandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
