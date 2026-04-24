import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orchid Island | Mohamed Dekkak",
  description:
    "Discover Orchid Island — Mohamed Dekkak's landmark real estate and lifestyle vision, blending architectural excellence with natural beauty.",
};

export default function OrchidIslandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
