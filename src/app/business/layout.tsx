import type { Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Business & Enterprise — Adgeco Group, AmCham & More",
  description:
    "Explore the cross-continental business empire of Mohamed Dekkak — Chairman & Founder of Adgeco Group (Abu Dhabi, est. 1992), active AmCham member, President of Gate One Properties, and Founding Partner of landmark infrastructure projects in education and healthcare across the UAE and Morocco.",
  keywords: [
    "Adgeco Group",
    "Adgeco Group Abu Dhabi",
    "Mohamed Dekkak business",
    "AmCham Abu Dhabi",
    "Gate One Properties UAE",
    "American University Marrakech",
    "Mohamed Dekkak chairman",
    "oil gas EPC construction UAE",
    "cross-continental enterprise",
    "UAE holding company",
  ],
  alternates: {
    canonical: `${BASE_URL}/business`,
  },
};

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
