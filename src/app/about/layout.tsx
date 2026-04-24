import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Mohamed Dekkak",
  description:
    "The biography of Mohamed Dekkak — from Marrakech to Abu Dhabi and the world. Founder of Adgeco Group, philanthropist, and global statesman with decades of cross-continental impact.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
