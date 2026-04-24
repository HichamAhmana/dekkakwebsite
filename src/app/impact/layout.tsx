import type { Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Human Impact — Philanthropy & Foundations",
  description:
    "The philanthropic legacy of Mohamed Dekkak — Chairman of the Anouar Association (Marrakech, est. 2007), Executive President of the Sahara Spirit Foundation, and driving force behind humanitarian work spanning education, water access, cultural diplomacy, and disability inclusion.",
  keywords: [
    "Mohamed Dekkak philanthropy",
    "Anouar Association",
    "Anouar Association Marrakech",
    "Sahara Spirit Foundation",
    "CARLAC Arab Latin America",
    "Arab Peace Corps Foundation",
    "Ibn Battuta Association",
    "Mohamed Dekkak charity",
    "humanitarian Morocco UAE",
  ],
  alternates: {
    canonical: `${BASE_URL}/impact`,
  },
};

export default function ImpactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
