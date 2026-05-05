import type { Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

import { events } from "../../data/events";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // In Next.js 15, `params` is a Promise in Server Components. We must `await` it.
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  const post = events.find((e) => e.id === slug);
  
  if (!post) {
    return {
      title: "Post Not Found — Mohamed Dekkak",
      description: "This journal post could not be found.",
      alternates: {
        canonical: `${BASE_URL}/blog`,
      },
    };
  }

  return {
    title: `${post.title} — Mohamed Dekkak`,
    description: post.description,
    alternates: {
      canonical: `${BASE_URL}/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} — Mohamed Dekkak`,
      description: post.description,
      url: `${BASE_URL}/blog/${slug}`,
      images: post.image ? [{ url: post.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — Mohamed Dekkak`,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    }
  };
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = events.find((e) => e.id === slug);

  const articleSchema = post
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "image": post.image ?? undefined,
        "datePublished": post.date ?? undefined,
        "author": {
          "@type": "Person",
          "name": "Mohamed Dekkak"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Dekkak",
          "url": "https://dekkakwebsite.vercel.app"
        }
      }
    : null;

  return (
    <>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      {children}
    </>
  );
}
