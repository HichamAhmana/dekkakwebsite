import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Journal | Mohamed Dekkak",
  description:
    "A chronicle of global initiatives, summits, diplomatic engagements, and community programs led and attended by Mohamed Dekkak — from Abu Dhabi to Marrakech and beyond.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
