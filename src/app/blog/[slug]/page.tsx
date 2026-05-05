"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { events } from "../../data/events";

const GOLD = "#C9A84C";
const CREAM = "var(--text-color)";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [loaded, setLoaded] = useState(false);

  const post = events.find((e) => e.id === slug);
  const currentIdx = events.findIndex((e) => e.id === slug);
  const prev = currentIdx > 0 ? events[currentIdx - 1] : null;
  const next = currentIdx < events.length - 1 ? events[currentIdx + 1] : null;

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  if (!post) {
    return (
      <main style={{ minHeight: "100vh", background: "var(--bg-color)" }}>
        <Navbar />
        <div style={{ paddingTop: "200px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "48px", fontWeight: 300, color: GOLD }}>
            Post not found
          </h1>
          <Link href="/blog" style={{ color: GOLD, fontFamily: "var(--font-dm-sans)", fontSize: "12px", letterSpacing: "0.2em" }}>
            ← Back to Journal
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-color)", overflowX: "hidden" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ position: "relative", height: post.image ? "85vh" : "55vh", overflow: "hidden" }}>

        {/* Background image or gradient */}
        {post.image ? (
          <>
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
                objectPosition: post.id === "adgeco-group" ? "center 20%" : "center center",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "scale(1.03)" : "scale(1.08)",
                transition: "opacity 2s ease, transform 20s cubic-bezier(0.1,0.5,0.8,1)",
                filter: "brightness(0.55) saturate(0.85)",
              }}
              priority
            />
            {/* Cinematic scan line on entry */}
            {loaded && (
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                animation: "imageScanline 2.5s ease-out 0.5s forwards",
                zIndex: 4, pointerEvents: "none",
              }} />
            )}
          </>
        ) : (
          <div style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 70%), var(--bg-color)`,
          }} />
        )}

        {/* Overlays */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.95) 100%)",
          zIndex: 1,
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 30% 100%, ${GOLD}08, transparent 60%)`,
          zIndex: 1,
        }} />

        {/* Hero content */}
        <div style={{
          position: "absolute", bottom: "72px", left: 0, right: 0,
          padding: "0 60px", maxWidth: "1200px", margin: "0 auto",
          zIndex: 2,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s ease 0.5s",
        }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
            <Link href="/blog" style={{
              fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600,
              letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD, opacity: 0.8,
            }}>
              ← Journal
            </Link>
            <div style={{ width: "20px", height: "1px", background: `${GOLD}44` }} />
            <span style={{
              fontFamily: "var(--font-dm-sans)", fontSize: "10px", letterSpacing: "0.2em",
              textTransform: "uppercase", color: CREAM, opacity: 0.4,
            }}>
              {post.location}
            </span>
          </div>

          {/* Meta */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: GOLD }}>
              {post.monthYear}
            </span>
            <div style={{ width: "1px", height: "16px", background: `${GOLD}44` }} />
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: CREAM, opacity: 0.4 }}>
              {post.date}
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(36px, 6vw, 80px)",
            fontWeight: 300,
            color: CREAM,
            margin: 0,
            lineHeight: 1.0,
            maxWidth: "800px",
          }}>
            {post.title}
          </h1>
        </div>
      </section>

      {/* ── ARTICLE BODY ── */}
      <section style={{ padding: "100px 60px 80px", maxWidth: "900px", margin: "0 auto" }}>

        {/* Gold rule */}
        <div style={{
          display: "flex", alignItems: "center", gap: "24px", marginBottom: "60px",
          opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 0.8s",
        }}>
          <div style={{ width: "60px", height: "1px", background: GOLD }} />
          <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: GOLD }}>
            {post.location} · {post.date}
          </span>
        </div>

        {/* Body text */}
        <p style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "18px", fontWeight: 300, lineHeight: 2,
          color: CREAM,
          marginBottom: "48px",
          opacity: loaded ? 0.82 : 0,
          transform: loaded ? "translateY(0)" : "translateY(16px)",
          transition: "all 1s ease 0.9s",
        }}>
          {post.description}
        </p>

        {/* Pullquote / decorative block */}
        <blockquote style={{
          borderLeft: `2px solid ${GOLD}`,
          paddingLeft: "32px",
          margin: "60px 0",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 1.1s",
        }}>
          <p style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(22px, 3vw, 32px)",
            fontWeight: 300,
            fontStyle: "italic",
            color: CREAM,
            lineHeight: 1.5,
            margin: 0,
          }}>
            &ldquo;Mohamed Dekkak has spent three decades forging connections between cultures, capitals, and communities — and never forgot where he came from.&rdquo;
          </p>
        </blockquote>

        {/* Location card */}
        <div style={{
          border: `1px solid rgba(201,168,76,0.15)`,
          padding: "40px 48px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "24px",
          marginTop: "60px",
          background: "rgba(201,168,76,0.02)",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 1.2s",
        }}>
          <div>
            <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: GOLD, marginBottom: "8px" }}>
              Location
            </div>
            <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "28px", fontWeight: 300, color: CREAM }}>
              {post.location}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: GOLD, marginBottom: "8px" }}>
              Date
            </div>
            <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "28px", fontWeight: 300, color: CREAM }}>
              {post.date}
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT / PREV NAVIGATION ── */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "0" }}>
        <div style={{ display: "grid", gridTemplateColumns: prev ? "1fr" : "1fr", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "60px 60px" }}>
            {prev ? (
              <Link href={prev.href} style={{
                fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600,
                letterSpacing: "0.25em", textTransform: "uppercase", color: GOLD,
                display: "flex", alignItems: "center", gap: "12px",
              }}>
                ← Previous
                <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "18px", fontWeight: 300, color: CREAM, fontStyle: "italic" }}>
                  {prev.title}
                </span>
              </Link>
            ) : <div />}

            {next ? (
              <Link href={next.href} style={{
                fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600,
                letterSpacing: "0.25em", textTransform: "uppercase", color: GOLD,
                display: "flex", alignItems: "center", gap: "12px", textAlign: "right",
              }}>
                <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "18px", fontWeight: 300, color: CREAM, fontStyle: "italic" }}>
                  {next.title}
                </span>
                Next →
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      <div style={{ padding: "0 40px" }}>
        <Footer />
      </div>
    </main>
  );
}
