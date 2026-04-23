"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const GOLD = "#C9A84C";
const CREAM = "#F5F0E8";

const BLOG_POSTS = [
  {
    id: "biography",
    day: "05",
    monthYear: "SEP, 2024",
    title: "Biography",
    excerpt: "Mohamed Dekkak is a Moroccan businessman, investor, and philanthropist. A Moroccan expat, he has spent decades building bridges across continents...",
    href: "/blog/biography",
  },
  {
    id: "amcham",
    day: "05",
    monthYear: "SEP, 2024",
    title: "AmCham",
    excerpt: "American Business Group (AmCham) Abu Dhabi boosts United Arab Emirate's connectivity and business opportunities bridging east and west...",
    href: "/blog/amcham",
  },
  {
    id: "anouar",
    day: "04",
    monthYear: "SEP, 2024",
    title: "Anouar Association",
    excerpt: "The Anouar Association is a nonprofit organization that has been working for the poor and downtrodden for a long time. It focuses on delivering education and care...",
    href: "/blog/anouar-association",
  },
];

function useIntersectionObserver(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function BlogCard({
  post,
  index,
  visible,
}: {
  post: (typeof BLOG_POSTS)[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)",
        border: `1px solid ${hovered ? GOLD + "44" : "rgba(255,255,255,0.05)"}`,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transform: visible
          ? hovered
            ? "translateY(-8px)"
            : "translateY(0)"
          : `translateY(40px)`,
        opacity: visible ? 1 : 0,
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: visible && !hovered ? `${index * 0.1}s` : "0s",
      }}
    >
      {/* Image Placeholder */}
      <div
        style={{
          width: "100%",
          height: "240px",
          background: "#111",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(45deg, ${GOLD}22, transparent)`,
            opacity: hovered ? 1 : 0.5,
            transition: "opacity 0.5s ease",
          }}
        />
        {/* Date Badge */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            background: hovered ? GOLD : "#1A1A1A",
            border: `1px solid ${GOLD}44`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "60px",
            height: "68px",
            transition: "all 0.3s ease",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "24px",
              fontWeight: 600,
              lineHeight: 1,
              color: hovered ? "#000" : CREAM,
              transition: "color 0.3s ease",
            }}
          >
            {post.day}
          </span>
          <div style={{ height: "1px", width: "30px", background: hovered ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)", margin: "4px 0" }} />
          <span
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "8px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: hovered ? "#000" : GOLD,
              transition: "color 0.3s ease",
            }}
          >
            {post.monthYear.split(',')[0]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "40px 32px 32px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <h3
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "28px",
            fontWeight: 400,
            color: CREAM,
            margin: "0 0 16px",
            lineHeight: 1.2,
          }}
        >
          {post.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "14px",
            fontWeight: 300,
            lineHeight: 1.8,
            color: CREAM,
            opacity: 0.6,
            margin: "0 0 32px",
            flexGrow: 1,
          }}
        >
          {post.excerpt}
        </p>
        
        <Link
          href={post.href}
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: hovered ? CREAM : GOLD,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "20px",
            borderTop: `1px solid rgba(255,255,255,0.05)`,
            transition: "color 0.3s ease",
          }}
        >
          View Post
          <span
            style={{
              transform: hovered ? "translateX(4px)" : "translateX(0)",
              transition: "transform 0.3s ease",
            }}
          >
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

export default function Blog() {
  const { ref, visible } = useIntersectionObserver(0.1);
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      style={{
        padding: "140px 40px",
        width: "100%",
        background: "#0A0A0A",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div
          ref={titleRef}
          style={{
            textAlign: "center",
            marginBottom: "80px",
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <div style={{ width: "24px", height: "1px", background: GOLD }} />
            <span
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: GOLD,
              }}
            >
              From the Blog
            </span>
            <div style={{ width: "24px", height: "1px", background: GOLD }} />
          </div>

          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(40px, 6vw, 64px)",
              fontWeight: 300,
              color: CREAM,
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Latest news & articles
            <br />
            <span style={{ fontStyle: "italic", color: GOLD }}>from the blog</span>
          </h2>
        </div>

        {/* Grid */}
        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
          }}
        >
          {BLOG_POSTS.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
