"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { GOLD, CREAM } from "../constants";

import { getFlickrPhotos } from "../actions/flickr";

type FlickrItem = {
  title: string;
  link: string;
  date_taken: string;
  published: string;
  media?: { m?: string };
};

type BlogPost = {
  id: string;
  title: string;
  description: string;
  image: string;
  shortDate: string;
  monthYear: string;
  href: string;
};
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
  post: BlogPost;
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
        background: hovered ? "rgba(201,168,76,0.03)" : "color-mix(in srgb, var(--text-color) 1%, transparent)",
        border: `1px solid ${hovered ? GOLD + "44" : "color-mix(in srgb, var(--text-color) 5%, transparent)"}`,
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
      {/* Image area */}
      <div
        style={{
          width: "100%",
          height: "240px",
          background: "var(--bg-secondary)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {post.image ? (
          <>
            <Image
              src={post.image}
              alt={post.title}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: "cover",
                objectPosition: post.id === "adgeco-group" ? "center 20%" : "center center",
                filter: hovered ? "brightness(0.8) saturate(0.95)" : "brightness(0.55) saturate(0.7)",
                transform: hovered ? "scale(1.06)" : "scale(1.0)",
                transition: "filter 0.8s ease, transform 1.2s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
            {/* Gold gradient overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(to top, var(--bg-color) 0%, transparent 60%), linear-gradient(45deg, ${GOLD}1A, transparent)`,
            }} />
          </>
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(45deg, ${GOLD}22, transparent)`,
              opacity: hovered ? 1 : 0.5,
              transition: "opacity 0.5s ease",
            }}
          />
        )}

        {/* Date Badge */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            background: hovered ? GOLD : "var(--bg-secondary)",
            border: `1px solid ${GOLD}44`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "60px",
            height: "68px",
            transition: "all 0.3s ease",
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: 1,
              color: "color-mix(in srgb, var(--text-color) 50%, transparent)",
              transition: "color 0.3s ease",
            }}
          >
            {post.shortDate}
          </span>
          <div style={{ height: "1px", width: "30px", background: hovered ? "rgba(0,0,0,0.2)" : "color-mix(in srgb, var(--text-color) 20%, transparent)", margin: "4px 0" }} />
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
            {post.monthYear}
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
          {post.description.substring(0, 150)}...
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
            borderTop: `1px solid color-mix(in srgb, var(--text-color) 5%, transparent)`,
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
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function loadFlickr() {
      const items = await getFlickrPhotos();
      if (!items) return;
      
      const formatted = items.map((item: FlickrItem, index: number) => {
        const date = new Date(item.date_taken || item.published);
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        
        // Use title as description, but provide a fallback if it's too short
        const description = item.title.length > 10 ? item.title : "Mohammed Dekkak Flickr Gallery Update.";
        
        return {
          id: `flickr-${index}`,
          title: item.title || "Photo Update",
          description: description,
          // Get higher quality image by changing _m.jpg to _b.jpg
          image: item.media?.m?.replace("_m.jpg", "_b.jpg") || "",
          shortDate: date.getDate().toString().padStart(2, "0"),
          monthYear: `${monthNames[date.getMonth()]} ${date.getFullYear()}`,
          href: item.link || "https://www.flickr.com/photos/adgeco/"
        };
      });
      setPosts(formatted);
    }
    loadFlickr();
  }, []);

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
        background: "var(--bg-color)",
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
          {posts.slice(0, 3).map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
