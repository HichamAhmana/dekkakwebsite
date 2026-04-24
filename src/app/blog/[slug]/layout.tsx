import type { Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Journal Post — Mohamed Dekkak",
  description:
    "Read about Mohamed Dekkak's global engagements, humanitarian initiatives, Adgeco Group milestones, and diplomatic appearances across the Middle East, Africa, and beyond.",
  keywords: [
    "Mohamed Dekkak article",
    "Adgeco Group update",
    "AmCham Abu Dhabi",
    "Anouar Association",
    "Mohamed Dekkak philanthropy",
    "UAE Morocco business",
  ],
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
