"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMobile } from "../hooks/useMobile";

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

type BlogPost = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  shortDate: string;
  monthYear: string;
  formattedDate: string;
  href: string;
};

const MONTH_NAMES = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
const GOLD = "#C9A84C";

function normalizeImagePath(path: string | null | undefined) {
  if (!path) return null;
  const cleaned = path.trim();
  if (cleaned.startsWith("/") || cleaned.startsWith("http://") || cleaned.startsWith("https://")) return cleaned;
  if (cleaned.startsWith("./")) return cleaned.replace("./", "/");
  return `/${cleaned}`;
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
    href: `/blog/${raw.slug}`,
  };
}

export default function BlogSection() {
  const [loaded, setLoaded] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const isMobile = useMobile();

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((raw: RawPost[]) => {
        const sorted = [...raw]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 3); // only the 3 most recent
        setPosts(sorted.map(formatPost));
        setTimeout(() => setLoaded(true), 80);
      })
      .catch(() => setLoaded(true));
  }, []);

  const featured = posts[0];
  const secondary = posts.slice(1);

  return (
    <section style={{ background: "var(--bg-color)", overflowX: "hidden" }}>

      <header
        style={{
          padding: isMobile ? "60px 20px 48px" : "80px 60px 80px",
          maxWidth: "1200px",
          margin: "0 auto",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s ease 0.2s",
        }}
      >
        <div style={{ width: "40px", height: "1px", background: GOLD, marginBottom: "24px" }} />
        <h1
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(48px, 7vw, 96px)",
            fontWeight: 300,
            color: "var(--text-color)",
            margin: "0 0 24px",
            lineHeight: 1,
          }}
        >
          Events &amp; <i style={{ color: GOLD }}>Journal</i>
        </h1>
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "15px",
            fontWeight: 300,
            lineHeight: 1.8,
            color: "var(--text-color)",
            opacity: 0.6,
            maxWidth: "560px",
          }}
        >
          A chronicle of global initiatives, summits, and community programs led and attended by Mohamed Dekkak.
        </p>
      </header>

      {/* ── Featured Post ── */}
      {featured && (
        <section
          style={{
            padding: isMobile ? "0 16px 40px" : "0 60px 60px",
            maxWidth: "1200px",
            margin: "0 auto",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 1s ease 0.35s",
          }}
        >
          <Link
            href={featured.href}
            style={{
              display: "block",
              position: "relative",
              overflow: "hidden",
              height: isMobile ? "260px" : "520px",
            }}
          >
            {featured.image && (
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                quality={60}
                sizes="(max-width: 768px) 100vw, 1140px"
                style={{
                  objectFit: "cover",
                  filter: "brightness(0.6) saturate(0.8)",
                  transition: "transform 1.4s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
              />
            )}

            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.3) 50%, transparent 100%)`,
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: isMobile ? "24px" : "56px",
                left: isMobile ? "20px" : "56px",
                right: isMobile ? "20px" : "56px",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: GOLD,
                  marginBottom: "16px",
                }}
              >
                Latest · {featured.formattedDate}
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(32px, 5vw, 60px)",
                  fontWeight: 300,
                  color: "#fff",
                  margin: "0 0 20px",
                  lineHeight: 1.05,
                  maxWidth: "700px",
                }}
              >
                {featured.title}
              </h2>
              {featured.description && (
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.65)",
                    margin: 0,
                    maxWidth: "520px",
                    lineHeight: 1.7,
                  }}
                >
                  {featured.description}
                </p>
              )}
            </div>
          </Link>
        </section>
      )}

      {/* ── 2 Secondary Posts ── */}
      {secondary.length > 0 && (
        <section
          style={{
            padding: isMobile ? "0 16px 60px" : "0 60px 80px",
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "1px",
            background: `${GOLD}22`,
            opacity: loaded ? 1 : 0,
            transition: "all 1s ease 0.5s",
          }}
        >
          {secondary.map((post) => (
            <SecondaryCard key={post.id} post={post} />
          ))}
        </section>
      )}

      {/* ── View All CTA ── */}
      <div
        style={{
          padding: isMobile ? "0 20px 80px" : "0 60px 120px",
          maxWidth: "1200px",
          margin: "0 auto",
          opacity: loaded ? 1 : 0,
          transition: "all 1s ease 0.6s",
        }}
      >
        <Link
          href="/blog"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: GOLD,
            border: `0.5px solid ${GOLD}55`,
            padding: "14px 28px",
            textDecoration: "none",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = `${GOLD}11`; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
        >
          View all posts →
        </Link>
      </div>

    </section>
  );
}

function SecondaryCard({ post }: { post: BlogPost }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={post.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--bg-color)",
        padding: "36px",
        gap: "16px",
        textDecoration: "none",
        transition: "background 0.3s",
        ...(hovered ? { background: `${GOLD}07` } : {}),
      }}
    >
      {post.image && (
        <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            loading="lazy"
            quality={60}
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{
              objectFit: "cover",
              filter: hovered ? "brightness(0.75)" : "brightness(0.55) grayscale(20%)",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "filter 0.6s ease, transform 1s ease",
            }}
          />
        </div>
      )}

      <div
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "9px",
          fontWeight: 600,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: GOLD,
        }}
      >
        {post.monthYear}
      </div>

      <h3
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(20px, 3vw, 28px)",
          fontWeight: 300,
          color: "var(--text-color)",
          margin: 0,
          lineHeight: 1.2,
          transition: "color 0.2s",
          ...(hovered ? { color: GOLD } : {}),
        }}
      >
        {post.title}
      </h3>

      {post.description && (
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "13px",
            lineHeight: 1.7,
            color: "var(--text-color)",
            opacity: 0.55,
            margin: 0,
          }}
        >
          {post.description}
        </p>
      )}
    </Link>
  );
}