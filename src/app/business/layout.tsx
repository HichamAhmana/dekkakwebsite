import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business & Enterprise | Mohamed Dekkak",
  description:
    "Explore the cross-continental business ecosystem of Mohamed Dekkak — Chairman of Adgeco Group, President of Gate One Properties, and Founding Partner of landmark infrastructure projects in education and healthcare.",
};

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
