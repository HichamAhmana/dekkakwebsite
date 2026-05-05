import type { Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Events & Journal — Global Engagements",
  description:
    "A chronicle of global initiatives, diplomatic summits, and community programs led by Mohamed Dekkak — from the SBCC Summit in Marrakech and the Ibn Battuta Festival in Tangier to AmCham Abu Dhabi and Adgeco Group milestones.",
  keywords: [
    "Mohamed Dekkak events",
    "Mohamed Dekkak journal",
    "SBCC Summit Marrakech",
    "Ibn Battuta Festival Tangier",
    "Adgeco Group news",
    "AmCham Abu Dhabi events",
    "Anouar Association programs",
    "humanitarian initiatives Morocco",
  ],
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Mohamed Dekkak — Insights & Perspectives",
  "description": "Dispatches from the intersection of diplomacy, enterprise, and humanitarian action across three continents.",
  "url": "https://dekkakwebsite.vercel.app/blog",
  "author": {
    "@type": "Person",
    "name": "Mohamed Dekkak"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Dekkak",
    "url": "https://dekkakwebsite.vercel.app"
  }
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      {children}
    </>
  );
}
