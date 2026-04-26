import type { Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Gallery — Mohamed Dekkak",
  description:
    "A visual archive of Mohamed Dekkak's global engagements — diplomatic events, Adgeco Group milestones, AmCham gatherings, philanthropic missions with the Anouar Association, and cultural appearances across four continents.",
  keywords: [
    "Mohamed Dekkak gallery",
    "Mohamed Dekkak photos",
    "Adgeco Group events",
    "AmCham Abu Dhabi photos",
    "Anouar Association gallery",
    "Mohamed Dekkak Marrakech",
    "Mohamed Dekkak Abu Dhabi",
    "serial entrepreneur Mohamed Dekkak",
  ],
  alternates: {
    canonical: `${BASE_URL}/gallery`,
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
