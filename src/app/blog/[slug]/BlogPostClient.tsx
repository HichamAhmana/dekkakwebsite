"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { useMobile } from "../../hooks/useMobile";
import SocialShare from "../../components/SocialShare";
import CTABanner from "../../components/CTABanner";

const GOLD = "#C9A84C";
const CREAM = "var(--text-color)";
const HERO_TEXT = "#F6F1E7";

type Post = {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string | null;
  formattedDate: string;
  monthYear: string;
  href: string;
};

type NavPost = { title: string; href: string };

function normalizeImagePath(src: string | null): string | null {
  if (!src) return null;

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

export default function BlogPostClient({
  post,
  prev,
  next,
}: {
  post: Post;
  prev: NavPost | null;
  next: NavPost | null;
}) {
  const [loaded, setLoaded] = useState(false);
  const isMobile = useMobile();
  const postImage = normalizeImagePath(post.image);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-color)", overflowX: "hidden" }}>
      <Navbar />

      <section
        style={{
          position: "relative",
          minHeight: postImage
            ? "100vh"
            : isMobile
              ? "50vh"
              : "60vh",
          paddingTop: isMobile ? "70px" : "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        {postImage ? (
          <Image
            src={postImage}
            alt={post.title}
            fill
            sizes="100vw"
            priority
            style={{
              objectFit: "cover",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "scale(1.03)" : "scale(1.08)",
              transition: "opacity 2s ease, transform 20s cubic-bezier(0.1,0.5,0.8,1)",
              filter: "brightness(0.5) saturate(0.85)",
              zIndex: 0,
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              background: `radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.1) 0%, transparent 70%), var(--bg-color)`,
            }}
          />
        )}

        {loaded && postImage && (
          <style>{`
            @keyframes scanline {
              from { top: 0; opacity: 1; }
              to { top: 100%; opacity: 0; }
            }
            .hero-scanline {
              position: absolute;
              left: 0;
              right: 0;
              height: 2px;
              background: linear-gradient(90deg, transparent, ${GOLD}, transparent);
              animation: scanline 2.5s ease-out 0.5s forwards;
              z-index: 4;
              pointer-events: none;
            }
          `}</style>
        )}

        {loaded && postImage && <div className="hero-scanline" />}

        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: postImage
              ? "linear-gradient(to bottom, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.3) 40%, rgba(10,10,10,0.94) 100%)"
              : "linear-gradient(to bottom, transparent 0%, var(--bg-color) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: isMobile ? "40px 20px 40px" : "60px 60px 72px",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease 0.5s, transform 1s ease 0.5s",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
            <Link
              href="/blog"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: GOLD,
                opacity: 0.85,
                textDecoration: "none",
              }}
            >
              ← Journal
            </Link>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
            <span
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: GOLD,
              }}
            >
              {post.monthYear}
            </span>

            <div style={{ width: "1px", height: "14px", background: `${GOLD}44` }} />

            <span
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "9px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: postImage ? HERO_TEXT : CREAM,
                opacity: postImage ? 0.72 : 0.45,
              }}
            >
              {post.formattedDate}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: isMobile ? "clamp(28px, 8vw, 48px)" : "clamp(36px, 6vw, 80px)",
              fontWeight: 300,
              color: postImage ? HERO_TEXT : CREAM,
              margin: 0,
              lineHeight: 1.05,
              maxWidth: "820px",
            }}
          >
            {post.title}
          </h1>
        </div>
      </section>

      <article
        style={{
          padding: isMobile ? "60px 20px 60px" : "100px 60px 80px",
          maxWidth: "860px",
          margin: "0 auto",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease 0.7s",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginBottom: "56px",
          }}
        >
          <div style={{ width: "60px", height: "1px", background: GOLD }} />
          <span
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "9px",
              fontWeight: 600,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: GOLD,
            }}
          >
            Mohamed Dekkak · {post.formattedDate}
          </span>
        </div>

        <style>{`
          .post-content h2 {
            font-family: var(--font-cormorant), serif;
            font-size: clamp(24px, 3.5vw, 38px);
            font-weight: 300;
            color: ${CREAM};
            margin: 64px 0 24px;
            line-height: 1.15;
            letter-spacing: 0.02em;
          }
          .post-content h2::before {
            content: '';
            display: block;
            width: 32px;
            height: 1px;
            background: ${GOLD};
            margin-bottom: 20px;
            opacity: 0.7;
          }
          .post-content p {
            font-family: var(--font-dm-sans), sans-serif;
            font-size: ${isMobile ? "15px" : "17px"};
            font-weight: 300;
            line-height: 1.95;
            color: ${CREAM};
            opacity: 0.82;
            margin: 0 0 28px;
          }
          .post-content a {
            color: ${GOLD};
            text-decoration: underline;
            text-underline-offset: 3px;
          }
          .post-content strong { font-weight: 500; opacity: 1; }
          .post-content em { font-style: italic; }
          .post-content ul, .post-content ol {
            font-family: var(--font-dm-sans), sans-serif;
            font-size: ${isMobile ? "15px" : "17px"};
            font-weight: 300;
            line-height: 1.9;
            color: ${CREAM};
            opacity: 0.8;
            padding-left: 24px;
            margin-bottom: 28px;
          }
          .post-content li { margin-bottom: 8px; }
          .post-content blockquote {
            border-left: 2px solid ${GOLD};
            padding: 4px 0 4px 28px;
            margin: 48px 0;
          }
          .post-content blockquote p {
            font-family: var(--font-cormorant), serif;
            font-size: clamp(20px, 2.5vw, 28px);
            font-style: italic;
            opacity: 0.9;
          }
          .post-content img {
            width: 100%;
            height: auto;
            margin: 40px 0;
            filter: brightness(0.9) saturate(0.85);
          }
        `}</style>

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* ── Social Sharing ── */}
        <SocialShare
          url={post.href}
          title={post.title}
          description={post.excerpt}
        />
      </article>

      <section
        style={{
          borderTop: "1px solid color-mix(in srgb, var(--text-color) 6%, transparent)",
          padding: isMobile ? "40px 20px" : "60px 60px",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        {prev ? (
          <Link
            href={prev.href}
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: GOLD,
              display: "flex",
              alignItems: "center",
              gap: "16px",
              textDecoration: "none",
              maxWidth: "45%",
            }}
          >
            <span style={{ flexShrink: 0 }}>←</span>
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "18px",
                fontWeight: 300,
                color: CREAM,
                fontStyle: "italic",
                letterSpacing: "0",
                textTransform: "none",
              }}
            >
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={next.href}
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: GOLD,
              display: "flex",
              alignItems: "center",
              gap: "16px",
              textDecoration: "none",
              textAlign: "right",
              maxWidth: "45%",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "18px",
                fontWeight: 300,
                color: CREAM,
                fontStyle: "italic",
                letterSpacing: "0",
                textTransform: "none",
              }}
            >
              {next.title}
            </span>
            <span style={{ flexShrink: 0 }}>→</span>
          </Link>
        ) : (
          <div />
        )}
      </section>

      <CTABanner
        heading="Enjoyed This Article?"
        subheading="Explore Mohamed Dekkak's wider work, or reach out to discuss a project, partnership, or opportunity."
      />

      <div style={{ padding: "0 40px" }}>
        
      </div>
    </main>
  );
}
