import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Human Impact | Mohamed Dekkak",
  description:
    "The philanthropic legacy of Mohamed Dekkak — Chairman of the Anouar Association, Executive President of the Sahara Spirit Foundation, and driving force behind humanitarian initiatives spanning education, health, and cultural diplomacy.",
};

export default function ImpactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
