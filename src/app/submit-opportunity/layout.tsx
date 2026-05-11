import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit Opportunity | Mohamed Dekkak",
  description:
    "Submit your investment opportunity, real estate asset, or strategic partnership proposal to Mohamed Dekkak's office.",
};

export default function SubmitOpportunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
