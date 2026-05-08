import { notFound } from "next/navigation";
import type { Metadata } from "next";
import postsData from "../../data/posts.json";
import BlogPostClient from "./BlogPostClient";

// ─── Types ───────────────────────────────────────────────────────────────────

type RawPost = {
  title: string;
  slug: string;
  url: string;
  content: string;
  date: string;
  excerpt: string;
  metaDescription: string;
  coverImage: string;
};

const posts = postsData as RawPost[];

type PageProps = {
  params: Promise<{ slug: string }>;
};

// ─── SEO: generateStaticParams ────────────────────────────────────────────────

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

// ─── SEO: generateMetadata ────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = posts.find((p) => p.slug === slug);

  if (!post) return { title: "Post Not Found" };

  const description = post.metaDescription || post.excerpt;
  const url = `https://dekkak.com/blog/${post.slug}`;

  return {
    title: `${post.title} | Mohamed Dekkak`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description,
      url,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: ["Mohamed Dekkak"],
      ...(post.coverImage
        ? { images: [{ url: post.coverImage }] }
        : {}),
    },
    twitter: {
      card: post.coverImage ? "summary_large_image" : "summary",
      title: post.title,
      description,
      ...(post.coverImage
        ? { images: [post.coverImage] }
        : {}),
    },
  };
}

// ─── Page (Server Component) ──────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const idx = posts.findIndex((p) => p.slug === slug);

  if (idx === -1) notFound();

  const post = posts[idx];
  const prev = idx > 0 ? posts[idx - 1] : null;
  const next = idx < posts.length - 1 ? posts[idx + 1] : null;

  // Format date server-side
  const MONTH_NAMES = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const d = new Date(post.date);
  const mon = MONTH_NAMES[d.getMonth()];
  const day = d.getDate().toString().padStart(2, "0");
  const year = d.getFullYear();

  const formatted = {
    ...post,
    image: post.coverImage || null,
    formattedDate: `${mon} ${day}, ${year}`,
    monthYear: `${mon} ${year}`,
    href: `/blog/${post.slug}`,
  };

  const formattedPrev = prev
    ? { title: prev.title, href: `/blog/${prev.slug}` }
    : null;

  const formattedNext = next
    ? { title: next.title, href: `/blog/${next.slug}` }
    : null;

  // JSON-LD structured data for Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    datePublished: new Date(post.date).toISOString(),
    author: { "@type": "Person", name: "Mohamed Dekkak" },
    publisher: {
      "@type": "Organization",
      name: "Dekkak",
      url: "https://dekkak.com",
    },
    ...(post.coverImage ? { image: post.coverImage } : {}),
    url: `https://dekkak.com/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <BlogPostClient
        post={formatted}
        prev={formattedPrev}
        next={formattedNext}
      />
    </>
  );
}