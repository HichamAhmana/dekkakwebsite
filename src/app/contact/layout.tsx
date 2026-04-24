import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Mohamed Dekkak",
  description:
    "Get in touch with Mohamed Dekkak for business inquiries, partnership opportunities, or media requests.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
