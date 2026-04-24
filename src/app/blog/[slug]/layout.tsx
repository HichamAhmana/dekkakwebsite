import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal Post | Mohamed Dekkak",
  description:
    "Read about Mohamed Dekkak's global engagements, humanitarian initiatives, and business milestones across the Middle East, Africa, and beyond.",
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
