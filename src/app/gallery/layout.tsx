import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Mohamed Dekkak",
  description:
    "A visual archive of Mohamed Dekkak's global engagements, diplomatic events, philanthropic missions, and business milestones across four continents.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
