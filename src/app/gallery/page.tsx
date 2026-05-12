"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import galleryData from "../data/gallery.json";

import { useMobile } from "../hooks/useMobile";

const GOLD = "#C9A84C";
const CREAM = "var(--text-color)";

type GalleryJsonItem = {
  src: string;
  caption?: string;
  category?: string;
  event?: string;
};

type PostItem = {
  title?: string;
  coverImage?: string;
  showInGallery?: boolean;
};

type GalleryItem = {
  id: string;
  category: string;
  aspect: string;
  caption: string;
  event: string;
  src: string;
};

const CATEGORIES = ["All", "Photos", "Impact"];

/* =========================
   FIX IMAGE PATHS
========================= */
const normalizeImageSrc = (src?: string) => {
  if (!src || src.trim() === "") {
    return "/placeholder.jpg";
  }

  if (src.startsWith("http")) {
    return src;
  }

  const cleaned = src.replace(/^(\.\/|\/)+/, "");

  return `/${cleaned}`;
};

export default function GalleryPage() {
  const [loaded, setLoaded] = useState(false);
  const [activeCategory, setActiveCategory] =
    useState("All");

  const isMobile = useMobile();

  const [galleryItems, setGalleryItems] = useState<
    GalleryItem[]
  >([]);

  useEffect(() => {
    const aspects = [
      "aspect-[4/5]",
      "aspect-[16/9]",
      "aspect-[4/3]",
      "aspect-[3/2]",
    ];

    // MANUAL GALLERY ITEMS
    const manualGallery = (
      galleryData as GalleryJsonItem[]
    ).map((item, i: number) => ({
      id: `manual-${i}`,
      category: item.category || "Photos",
      aspect: aspects[i % aspects.length],
      caption: item.caption || "",
      event: item.event || "",
      src: normalizeImageSrc(item.src),
    }));

    // FETCH POSTS
    fetch("/api/posts")
      .then((res) => res.json())
      .then((postsData: PostItem[]) => {

        // ONLY POSTS WITH showInGallery !== false
        const filteredPosts = postsData.filter(
          (post) =>
            post.coverImage &&
            post.showInGallery !== false
        );

        const postImages = filteredPosts.map(
          (post, i: number) => ({
            id: `post-${i}`,
            category: "Photos",
            aspect:
              aspects[(i + 2) % aspects.length],
            caption: post.title || "",
            event: "Article",
            src: normalizeImageSrc(
              post.coverImage
            ),
          })
        );

        setGalleryItems([
          ...manualGallery,
          ...postImages,
        ]);

        setTimeout(() => setLoaded(true), 120);
      })
      .catch((error) => {
        console.error(
          "Failed to fetch posts:",
          error
        );

        // FALLBACK TO MANUAL GALLERY ONLY
        setGalleryItems(manualGallery);

        setTimeout(() => setLoaded(true), 120);
      });
  }, []);

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter(
          (item) =>
            item.category === activeCategory
        );

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg-color)",
        overflowX: "hidden",
      }}
    >
      <Navbar />

      {/* HERO */}
      <section
        style={{
          padding: isMobile
            ? "130px 20px 48px"
            : "200px 40px 80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded
              ? "translateY(0)"
              : "translateY(20px)",
            transition: "all 1s ease 0.2s",
          }}
        >
          <h1
            style={{
              fontFamily:
                "var(--font-cormorant), serif",
              fontSize:
                "clamp(48px, 8vw, 110px)",
              fontWeight: 300,
              color: CREAM,
              margin: "0 0 24px",
              lineHeight: 1,
            }}
          >
            A Life in{" "}
            <i style={{ color: GOLD }}>
              Pictures.
            </i>
          </h1>

          <p
            style={{
              fontFamily:
                "var(--font-dm-sans), sans-serif",
              fontSize: "16px",
              fontWeight: 300,
              lineHeight: 1.8,
              color: CREAM,
              opacity: 0.7,
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Documenting enterprise,
            diplomacy, culture, and
            humanitarian commitment.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section
        style={{
          padding: isMobile
            ? "0 20px 40px"
            : "0 40px 60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "32px",
            opacity: loaded ? 1 : 0,
            transition: "opacity 1s ease 0.4s",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setActiveCategory(cat)
              }
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily:
                  "var(--font-dm-sans)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color:
                  activeCategory === cat
                    ? GOLD
                    : CREAM,
                opacity:
                  activeCategory === cat
                    ? 1
                    : 0.5,
                borderBottom:
                  activeCategory === cat
                    ? `1px solid ${GOLD}`
                    : "1px solid transparent",
                paddingBottom: "8px",
                transition: "all 0.3s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section
        style={{
          padding: isMobile
            ? "0 16px 80px"
            : "0 40px 120px",
        }}
      >
        <div
          className="masonry-grid"
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {filteredItems.map((item, i) => {
            return (
              <div
                key={item.id}
                style={{
                  width: "100%",
                  position: "relative",
                  opacity: loaded ? 1 : 0,
                  transform: loaded
                    ? "translateY(0)"
                    : "translateY(30px)",
                  transition: `all 0.8s ease ${
                    0.4 +
                    (i % 4) * 0.1
                  }s`,
                  breakInside: "avoid",
                  pageBreakInside:
                    "avoid",
                  marginBottom: "24px",
                  cursor: "pointer",
                }}
              >
                <div
  className="gallery-card group"
                  style={{
                    width: "100%",
                    background:
                      "var(--bg-secondary)",
                    border:
                      "1px solid rgba(255,255,255,0.05)",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "8px",
                    display: "flex",
                  }}
                >
                  {/* IMAGE */}
                  <Image
                    className="gallery-image"
                    src={item.src}
                    alt={`${item.caption} - ${item.event}`}
                    width={800}
                    height={800}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw,
                           (max-width: 1200px) 50vw,
                           33vw"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      filter:
                        "brightness(0.92)",
                      transition:
                        "transform 0.8s cubic-bezier(0.22,1,0.36,1)",
                    }}
                    onError={(e) => {
                      const target =
                        e.target as HTMLImageElement;

                      target.style.display =
                        "none";

                      const placeholder =
                        target.parentElement?.querySelector(
                          ".fallback-placeholder"
                        ) as HTMLElement;

                      if (placeholder) {
                        placeholder.style.display =
                          "flex";
                      }
                    }}
                  />

                  {/* FALLBACK */}
                  <div
                    className="fallback-placeholder"
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "none",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "24px",
                      textAlign: "center",
                      background:
                        "linear-gradient(135deg, #111, #1a1a1a)",
                    }}
                  >
                    <span
                      style={{
                        color: GOLD,
                        fontSize: "11px",
                        letterSpacing:
                          "0.2em",
                        textTransform:
                          "uppercase",
                        marginBottom:
                          "12px",
                        fontFamily:
                          "var(--font-dm-sans)",
                      }}
                    >
                      Image Unavailable
                    </span>

                    <h3
                      style={{
                        color: CREAM,
                        fontFamily:
                          "var(--font-cormorant), serif",
                        fontSize: "28px",
                        fontWeight: 300,
                        margin:
                          "0 0 10px",
                      }}
                    >
                      {item.caption}
                    </h3>

                    <p
                      style={{
                        color:
                          "rgba(255,255,255,0.65)",
                        fontSize: "14px",
                        lineHeight: 1.6,
                        maxWidth: "260px",
                      }}
                    >
                      {item.event}
                    </p>
                  </div>

                  {/* OVERLAY */}
                  <div
                    className="gallery-overlay"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.96), rgba(0,0,0,0.15))",
                      display: "flex",
                      flexDirection:
                        "column",
                      justifyContent:
                        "flex-end",
                      padding: "32px",
                      opacity: 0,
                      pointerEvents: "auto",
                      transition:
                        "opacity 0.45s ease",
                    }}
                  >
                    <span
                      className="gallery-category"
                      style={{
                        fontFamily:
                          "var(--font-dm-sans)",
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing:
                          "0.25em",
                        textTransform:
                          "uppercase",
                        color: GOLD,
                        marginBottom:
                          "14px",
                        transform:
                          "translateY(18px)",
                        opacity: 0,
                        transition:
                          "all 0.5s cubic-bezier(0.22,1,0.36,1)",
                      }}
                    >
                      {item.category}
                    </span>

                    <h3
                      className="gallery-title"
                      style={{
                        fontFamily:
                          "var(--font-cormorant), serif",
                        fontSize:
                          "clamp(30px, 3vw, 42px)",
                        fontWeight: 300,
                        color: CREAM,
                        margin:
                          "0 0 12px",
                        lineHeight: 1,
                        transform:
                          "translateY(40px)",
                        opacity: 0,
                        transition:
                          "all 0.7s cubic-bezier(0.22,1,0.36,1)",
                      }}
                    >
                      {item.caption}
                    </h3>

                    <p
                      className="gallery-event"
                      style={{
                        color:
                          "rgba(255,255,255,0.72)",
                        fontSize: "14px",
                        lineHeight: 1.7,
                        margin: 0,
                        fontFamily:
                          "var(--font-dm-sans)",
                        transform:
                          "translateY(20px)",
                        opacity: 0,
                        transition:
                          "all 0.8s cubic-bezier(0.22,1,0.36,1)",
                      }}
                    >
                      {item.event}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* HOVER EFFECTS */}
       <style jsx>{`
  .gallery-card {
    overflow: hidden;
  }

  .gallery-image {
    transition:
      transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
      filter 0.8s ease;
  }

  .gallery-overlay {
    opacity: 0;
    transition: opacity 0.45s ease;
  }

  .gallery-title,
  .gallery-event,
  .gallery-category {
    opacity: 0;
  }

  .gallery-title {
    transform: translateY(40px);
    transition:
      all 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .gallery-event {
    transform: translateY(20px);
    transition:
      all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .gallery-category {
    transform: translateY(18px);
    transition:
      all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .gallery-card:hover .gallery-image {
    transform: scale(1.08);
    filter: brightness(0.75);
  }

  .gallery-card:hover .gallery-overlay {
    opacity: 1;
  }

  .gallery-card:hover .gallery-title,
  .gallery-card:hover .gallery-event,
  .gallery-card:hover .gallery-category {
    opacity: 1;
    transform: translateY(0);
  }

  .gallery-event {
    transition-delay: 0.08s;
  }

  .gallery-category {
    transition-delay: 0.04s;
  }

  .masonry-grid {
    column-count: 3;
    column-gap: 24px;
  }

  @media (max-width: 1100px) {
    .masonry-grid {
      column-count: 2;
    }
  }

  @media (max-width: 768px) {
    .masonry-grid {
      column-count: 1;
    }
  }
`}</style>
      </section>

      <Footer />
    </main>
  );
}