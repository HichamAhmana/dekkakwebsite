import type { Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "About Mohamed Dekkak",
  description:
    "The biography of Mohamed Dekkak — born in Marrakech, built in Abu Dhabi, recognized worldwide. Founder of Adgeco Group, philanthropist, and global statesman with three decades of cross-continental impact across energy, real estate, and humanitarian work.",
  keywords: [
    "Mohamed Dekkak biography",
    "Mohamed Dekkak Marrakech",
    "Mohamed Dekkak Abu Dhabi",
    "Adgeco Group founder",
    "Moroccan businessman UAE",
    "global statesman",
    "philanthropist investor",
  ],
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
