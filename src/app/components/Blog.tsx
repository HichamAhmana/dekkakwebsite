"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useMobile } from "../hooks/useMobile";

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

type BlogPost = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  shortDate: string;
  monthYear: string;
  formattedDate: string;
  location: string;
  href: string;
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

function normalizeImagePath(path: string | null | undefined) {
  if (!path) return null;

  const cleaned = path.trim();

  // already valid
  if (
    cleaned.startsWith("/") ||
    cleaned.startsWith("http://") ||
    cleaned.startsWith("https://")
  ) {
    return cleaned;
  }

  // ./BlogImages/test.png -> /BlogImages/test.png
  if (cleaned.startsWith("./")) {
    return cleaned.replace("./", "/");
  }

  // BlogImages/test.png -> /BlogImages/test.png
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
    location: "Abu Dhabi",
    href: `/blog/${raw.slug}`,
  };
}

// ─── Constants ────────────────────────────────────────────────────────────────

const GOLD = "#C9A84C";
const CREAM = "var(--text-color)";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [loaded, setLoaded] = useState(false);
  const [events, setEvents] = useState<BlogPost[]>([]);
  const isMobile = useMobile();

  useEffect(() => {
    import("../data/posts.json")
      .then((mod) => {
        const raw: RawPost[] = mod.default ?? mod;

        const sorted = [...raw].sort(
          (a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setEvents(sorted.map(formatPost));

        setTimeout(() => setLoaded(true), 80);
      })
      .catch((err) => {
        console.error("Failed to load posts.json:", err);
        setLoaded(true);
      });
  }, []);

  const featured = events.find((e) => e.image);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg-color)",
        overflowX: "hidden",
      }}
    >
      <Navbar />

      {/* ── Page Hero ── */}
      <header
        style={{
          padding: isMobile ? "120px 20px 48px" : "180px 60px 80px",
          maxWidth: "1200px",
          margin: "0 auto",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s ease 0.2s",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "1px",
            background: GOLD,
            marginBottom: "24px",
          }}
        />

        <h1
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(48px, 7vw, 96px)",
            fontWeight: 300,
            color: CREAM,
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
            color: CREAM,
            opacity: 0.6,
            maxWidth: "560px",
          }}
        >
          A chronicle of global initiatives, summits, and community programs led
          and attended by Mohamed Dekkak.
        </p>
      </header>

      {/* ── Featured Post ── */}
      {featured && (
        <section
          style={{
            padding: isMobile ? "0 16px 40px" : "0 60px 80px",
            maxWidth: "1200px",
            margin: "0 auto",
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
            <Image
              src={featured.image!}
              alt={featured.title}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 1140px"
              style={{
                objectFit: "cover",
                filter: "brightness(0.6) saturate(0.8)",
                transition: "transform 1.4s ease",
              }}
              onMouseEnter={(e) => {
                (
                  e.currentTarget as HTMLImageElement
                ).style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                (
                  e.currentTarget as HTMLImageElement
                ).style.transform = "scale(1)";
              }}
            />

            <style>{`
              .blog-featured-overlay {
                background:
                  linear-gradient(
                    to top,
                    rgba(10,10,10,0.92) 0%,
                    rgba(10,10,10,0.3) 50%,
                    transparent 100%
                  ),
                  radial-gradient(
                    ellipse at 30% 100%,
                    ${GOLD}11,
                    transparent 60%
                  );
              }

              [data-theme="light"] .blog-featured-overlay {
                background:
                  linear-gradient(
                    to top,
                    rgba(10,10,10,0.4) 0%,
                    rgba(10,10,10,0.1) 50%,
                    transparent 100%
                  ),
                  radial-gradient(
                    ellipse at 30% 100%,
                    ${GOLD}11,
                    transparent 60%
                  );
              }
            `}</style>

            <div
              className="blog-featured-overlay"
              style={{ position: "absolute", inset: 0 }}
            />

            {!isMobile && (
              <>
                <div
                  style={{
                    position: "absolute",
                    top: "24px",
                    left: "24px",
                    width: "48px",
                    height: "1px",
                    background: GOLD,
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: "24px",
                    left: "24px",
                    width: "1px",
                    height: "48px",
                    background: GOLD,
                  }}
                />
              </>
            )}

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
                Featured · {featured.location} ·{" "}
                {featured.formattedDate}
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(32px, 5vw, 60px)",
                  fontWeight: 300,
                  color: CREAM,
                  margin: "0 0 20px",
                  lineHeight: 1.05,
                  maxWidth: "700px",
                }}
              >
                {featured.title}
              </h2>
            </div>
          </Link>
        </section>
      )}

      {/* ── All Posts Grid ── */}
      <section
        style={{
          padding: isMobile ? "0 16px 60px" : "0 60px 120px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "40px",
          }}
        >
          {events.map((event, idx) => (
            <PostCard
              key={event.id}
              event={event}
              idx={idx}
              loaded={loaded}
            />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

// ─── PostCard ─────────────────────────────────────────────────────────────────

function PostCard({
  event,
  idx,
  loaded,
}: {
  event: BlogPost;
  idx: number;
  loaded: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={event.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${
          hovered
            ? GOLD + "44"
            : "color-mix(in srgb, var(--text-color) 6%, transparent)"
        }`,
        overflow: "hidden",
        background: hovered
          ? "rgba(201,168,76,0.03)"
          : "color-mix(in srgb, var(--text-color) 1%, transparent)",
        transform: loaded
          ? hovered
            ? "translateY(-6px)"
            : "translateY(0)"
          : "translateY(30px)",
        opacity: loaded ? 1 : 0,
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${
          idx * 0.07
        }s`,
        boxShadow: hovered
          ? "0 20px 60px rgba(0,0,0,0.35)"
          : "none",
      }}
    >
      <div
        style={{
          height: "220px",
          position: "relative",
          overflow: "hidden",
          background: "var(--bg-secondary)",
        }}
      >
        {event.image ? (
          <>
            <Image
              src={event.image}
              alt={event.title}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: "cover",
                filter: hovered
                  ? "brightness(0.75) saturate(0.9)"
                  : "brightness(0.5) grayscale(25%)",
                transform: hovered
                  ? "scale(1.06)"
                  : "scale(1.0)",
                transition:
                  "filter 0.8s ease, transform 1.2s ease",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, var(--bg-color) 0%, transparent 60%)",
              }}
            />
          </>
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at 30% 50%, ${GOLD}18, transparent 70%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "32px",
                opacity: 0.15,
              }}
            >
              ✦
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}