import type { Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Contact Mohamed Dekkak",
  description:
    "Get in touch with Mohamed Dekkak for business inquiries, partnership opportunities, media requests, or to learn more about Adgeco Group and his philanthropic foundations.",
  keywords: [
    "contact Mohamed Dekkak",
    "Mohamed Dekkak inquiry",
    "Adgeco Group contact",
    "business partnership UAE",
    "media request Mohamed Dekkak",
    "serial entrepreneur Mohamed Dekkak",
  ],
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
