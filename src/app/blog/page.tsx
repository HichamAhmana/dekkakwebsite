import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogGridClient, { BlogPost } from "../components/BlogGridClient";
import postsData from "../data/posts.json";

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

function normalizeImagePath(src: string): string | null {
  const image = src.trim();

  if (!image) return null;

  if (
    image.startsWith("/") ||
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  return `/${image.replace(/^\.?\//, "")}`;
}

function formatPost(raw: RawPost): BlogPost {
  const d = new Date(raw.date);
  const mon = MONTH_NAMES[d.getMonth()];
  const day = d.getDate().toString().padStart(2, "0");
  const year = d.getFullYear();

  return {
    id: raw.slug,
    title: raw.title,
    description: raw.excerpt || raw.metaDescription || "",
    image: normalizeImagePath(raw.coverImage),
    shortDate: day,
    monthYear: `${mon} ${year}`,
    formattedDate: `${mon} ${day}, ${year}`,
    location: "Abu Dhabi",
    href: `/blog/${raw.slug}`,
  };
}

// ─── SEO: generateMetadata ────────────────────────────────────────────────────

export const metadata = {
  title: "Events & Journal | Mohamed Dekkak",
  description: "A chronicle of global initiatives, summits, and community programs led and attended by Mohamed Dekkak.",
  alternates: {
    canonical: "https://dekkak.com/blog",
  },
};

// ─── Page (Server Component) ──────────────────────────────────────────────────

export default function BlogPage() {
  const rawPosts = postsData as RawPost[];
  const sorted = [...rawPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const seen = new Set<string>();
  const deduped = sorted.filter((p) => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });

  const formattedPosts = deduped.map(formatPost);

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-color)", overflowX: "hidden" }}>
      <Navbar />
      <BlogGridClient initialPosts={formattedPosts} />
      <Footer />
    </main>
  );
}
