"use client";

import { useState, useEffect, useCallback } from "react";
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
  description?: string;
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
  title: string;
  description: string;
  src: string;
};

const CATEGORIES = ["All", "Photos", "Impact"];

const normalizeImageSrc = (src?: string) => {
  if (!src || src.trim() === "") return "/placeholder.jpg";
  if (src.startsWith("http")) return src;
  return `/${src.replace(/^(\.\/|\/)+/, "")}`;
};

/* ─── Card ─────────────────────────────────────────────── */
function GalleryCard({
  item,
  onClick,
  loaded,
  delay,
}: {
  item: GalleryItem;
  onClick: () => void;
  loaded: boolean;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        cursor: "pointer",
        borderRadius: "8px",
        overflow: "hidden",
        background: "#080808",
        border: `1px solid ${hovered ? "rgba(201,168,76,0.45)" : "rgba(201,168,76,0.12)"}`,
        marginBottom: "24px",
        breakInside: "avoid",
        pageBreakInside: "avoid",
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s, border-color 0.3s ease`,
      }}
    >
      {/* Image — always fully visible */}
      <Image
        src={item.src}
        alt={item.title}
        width={800}
        height={600}
        loading="lazy"
        quality={60}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          filter: hovered ? "brightness(0.55)" : "brightness(0.92)",
          transition: "filter 0.45s ease, transform 0.45s ease",
          transform: hovered ? "scale(1.04)" : "scale(1)",
        }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />

      {/* Bottom overlay — always visible */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "28px 24px 22px",
          background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 60%, transparent 100%)",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            color: GOLD,
            fontSize: "9px",
            fontFamily: "var(--font-dm-sans)",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "8px",
          }}
        >
          {item.category}
        </span>

        <h3
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(18px, 2.2vw, 28px)",
            fontWeight: 300,
            color: "#F5F0E8",
            margin: "0 0 6px",
            lineHeight: 1.1,
          }}
        >
          {item.title}
        </h3>

        {item.description && (
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "12px",
              lineHeight: 1.6,
              fontFamily: "var(--font-dm-sans)",
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {item.description}
          </p>
        )}
      </div>

      {/* Top-right expand icon */}
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.55)",
          border: `1px solid ${GOLD}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scale(1)" : "scale(0.6)",
          transition: "opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s",
          pointerEvents: "none",
          backdropFilter: "blur(4px)",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </div>
    </div>
  );
}

/* ─── Lightbox ──────────────────────────────────────────── */
function Lightbox({
  items,
  index,
  onClose,
  onNav,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  const item = items[index];
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    },
    [onClose, onNav]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    if (distance > 50) onNav(1);
    if (distance < -50) onNav(-1);
  };

  return (
    <div
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.96)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        animation: "lbFadeIn 0.2s ease",
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 20,
          right: 24,
          background: "rgba(0,0,0,0.6)",
          border: `1px solid rgba(201,168,76,0.5)`,
          color: GOLD,
          width: 40,
          height: 40,
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        ✕
      </button>

      {/* Prev */}
      {index > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNav(-1); }}
          style={{ ...navBtnStyle, left: 16 }}
        >
          ‹
        </button>
      )}

      {/* Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          maxWidth: "100vw",
          maxHeight: "100vh",
          padding: "20px 0",
        }}
      >
        {/* Plain <img> for reliable cross-origin + local image display */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={item.src}
          src={item.src}
          alt={item.title}
          style={{
            maxWidth: "96vw",
            maxHeight: "75vh",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            borderRadius: 6,
            boxShadow: "0 0 100px rgba(0,0,0,0.9), 0 0 30px rgba(201,168,76,0.08)",
            display: "block",
            pointerEvents: "none",
          }}
        />

        {/* Caption */}
        <div style={{ textAlign: "center", padding: "0 16px" }}>
          <span
            style={{
              color: GOLD,
              fontSize: 9,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              fontFamily: "var(--font-dm-sans)",
              display: "block",
              marginBottom: 6,
            }}
          >
            {item.category}
          </span>
          <h3
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(18px, 2vw, 26px)",
              fontWeight: 300,
              color: "#F5F0E8",
              margin: "0 0 6px",
            }}
          >
            {item.title}
          </h3>
          {item.description && (
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 13,
                fontFamily: "var(--font-dm-sans)",
                margin: "0 0 8px",
                maxWidth: 500,
              }}
            >
              {item.description}
            </p>
          )}
          <span
            style={{
              color: "rgba(255,255,255,0.25)",
              fontSize: 11,
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            {index + 1} / {items.length}
          </span>
        </div>
      </div>

      {/* Next */}
      {index < items.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNav(1); }}
          style={{ ...navBtnStyle, right: 16, left: "auto" }}
        >
          ›
        </button>
      )}
    </div>
  );
}

const navBtnStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  background: "rgba(0,0,0,0.55)",
  border: `1px solid rgba(201,168,76,0.35)`,
  color: GOLD,
  width: 52,
  height: 52,
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: 30,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
  lineHeight: 1,
};

/* ─── Page ──────────────────────────────────────────────── */
export default function GalleryPage() {
  const [loaded, setLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const isMobile = useMobile();

  useEffect(() => {
    const manualGallery = (galleryData as GalleryJsonItem[]).map((item, i) => ({
      id: `manual-${i}`,
      category: item.category || "Photos",
      title: item.event || "Event",
      description: item.description || item.caption || "",
      src: normalizeImageSrc(item.src),
    }));

    fetch("/api/posts")
      .then((r) => r.json())
      .then((postsData: PostItem[]) => {
        const postImages = postsData
          .filter((p) => p.coverImage && p.showInGallery !== false)
          .map((p, i) => ({
            id: `post-${i}`,
            category: "Photos",
            title: p.title || "Article",
            description: "",
            src: normalizeImageSrc(p.coverImage),
          }));
        setGalleryItems([...manualGallery, ...postImages]);
        setTimeout(() => setLoaded(true), 120);
      })
      .catch(() => {
        setGalleryItems(manualGallery);
        setTimeout(() => setLoaded(true), 120);
      });
  }, []);

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const navLightbox = useCallback(
    (dir: 1 | -1) => {
      if (lightboxIndex === null) return;
      const next = lightboxIndex + dir;
      if (next >= 0 && next < filteredItems.length) setLightboxIndex(next);
    },
    [lightboxIndex, filteredItems.length]
  );

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-color)", overflowX: "hidden" }}>
      <Navbar />

      {/* HERO */}
      <section
        style={{
          padding: isMobile ? "130px 20px 48px" : "200px 40px 80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 1s ease 0.2s",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(48px, 8vw, 110px)",
              fontWeight: 300,
              color: CREAM,
              margin: "0 0 24px",
              lineHeight: 1,
            }}
          >
            A Life in <i style={{ color: GOLD }}>Pictures.</i>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 16,
              fontWeight: 300,
              lineHeight: 1.8,
              color: CREAM,
              opacity: 0.7,
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            Documenting enterprise, diplomacy, culture, and humanitarian commitment.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section style={{ padding: isMobile ? "0 20px 40px" : "0 40px 60px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 32,
            opacity: loaded ? 1 : 0,
            transition: "opacity 1s ease 0.4s",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-dm-sans)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: activeCategory === cat ? GOLD : CREAM,
                opacity: activeCategory === cat ? 1 : 0.5,
                borderBottom: activeCategory === cat ? `1px solid ${GOLD}` : "1px solid transparent",
                paddingBottom: 8,
                transition: "all 0.3s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section style={{ padding: isMobile ? "0 16px 80px" : "0 40px 120px" }}>
        <div className="masonry-grid" style={{ maxWidth: 1400, margin: "0 auto" }}>
          {filteredItems.slice(0, visibleCount).map((item, i) => (
            <GalleryCard
              key={item.id}
              item={item}
              onClick={() => openLightbox(i)}
              loaded={loaded}
              delay={0.1 + (i % 4) * 0.1}
            />
          ))}
        </div>
        
        {visibleCount < filteredItems.length && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
            <button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              style={{
                background: "transparent",
                border: `1px solid ${GOLD}`,
                color: GOLD,
                padding: "14px 40px",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "12px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer",
                borderRadius: "4px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(201,168,76,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              Load More
            </button>
          </div>
        )}
      </section>

      <Footer />

      {lightboxIndex !== null && (
        <Lightbox
          items={filteredItems}
          index={lightboxIndex}
          onClose={closeLightbox}
          onNav={navLightbox}
        />
      )}

      <style>{`
        @keyframes lbFadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </main>
  );
}