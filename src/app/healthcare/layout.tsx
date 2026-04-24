import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Initiatives | Mohamed Dekkak",
  description:
    "Mohamed Dekkak's healthcare vision — from the American Medical City in Marrakech to state-of-the-art medical partnerships bringing world-class care to underserved communities across the region.",
};

export default function HealthcareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
