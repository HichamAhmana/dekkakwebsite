"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GOLD = "#C9A84C";
const CREAM = "var(--text-color)";

import { getFlickrPhotos } from "../actions/flickr";
import { useMobile } from "../hooks/useMobile";

type FlickrItem = {
  title: string;
  media?: { m?: string };
  link?: string;
};

type GalleryItem = {
  id: string;
  category: string;
  aspect: string;
  caption: string;
  event: string;
  src: string;
  link: string;
};

const CATEGORIES = ["All", "Photos"];

export default function GalleryPage() {
  const [loaded, setLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const isMobile = useMobile();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    async function loadGallery() {
      const items = await getFlickrPhotos();
      if (!items) return;
      
      const formatted = items.map((item: FlickrItem, i: number) => {
        // Randomize aspect ratio slightly for masonry feel
        const aspects = ["aspect-[4/5]", "aspect-[16/9]", "aspect-[4/3]"];
        const aspect = aspects[i % aspects.length];
        
        return {
          id: `gallery-${i}`,
          category: "Photos",
          aspect: aspect,
          caption: item.title,
          event: "Flickr Upload",
          src: item.media?.m?.replace("_m.jpg", "_b.jpg") || "",
          link: item.link
        };
      });
      setGalleryItems(formatted);
      setTimeout(() => setLoaded(true), 120);
    }
    loadGallery();
  }, []);

  const filteredItems = activeCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-color)", overflowX: "hidden" }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        padding: isMobile ? "130px 20px 48px" : "200px 40px 80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}>
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s ease 0.2s"
        }}>
          <h1 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(48px, 8vw, 110px)",
            fontWeight: 300, color: CREAM,
            margin: "0 0 24px", lineHeight: 1
          }}>
            A Life in <i style={{ color: GOLD }}>Pictures.</i>
          </h1>
          <p style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "16px", fontWeight: 300, lineHeight: 1.8,
            color: CREAM, opacity: 0.7, maxWidth: "600px", margin: "0 auto"
          }}>
            Documenting three decades of cross-continental enterprise, diplomacy, and humanitarian commitment.
          </p>
        </div>
      </section>

      {/* Gallery Filter */}
      <section style={{ padding: "0 40px 60px" }}>
        <div style={{
          display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "32px",
          opacity: loaded ? 1 : 0, transition: "opacity 1s ease 0.4s"
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "var(--font-dm-sans)", fontSize: "11px", fontWeight: 600,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: activeCategory === cat ? GOLD : CREAM,
                opacity: activeCategory === cat ? 1 : 0.5,
                borderBottom: activeCategory === cat ? `1px solid ${GOLD}` : "1px solid transparent",
                paddingBottom: "8px", transition: "all 0.3s ease"
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Grid (Approximated with CSS Grid) */}
      <section style={{ padding: isMobile ? "0 16px 80px" : "0 40px 120px" }}>
        <div style={{
          maxWidth: "1400px", margin: "0 auto",
        }} className="masonry-grid">
          {filteredItems.map((item, i) => {
            // Determine aspect ratio inline styles for placeholder
            let pb = "100%"; // square
            if (item.aspect === "aspect-[16/9]") pb = "56.25%";
            if (item.aspect === "aspect-[4/3]") pb = "75%";
            if (item.aspect === "aspect-[4/5]") pb = "125%";
            if (item.aspect === "aspect-[3/2]") pb = "66.66%";

            return (
              <div key={item.id} style={{
                width: "100%", position: "relative",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.8s ease ${0.4 + (i % 4) * 0.1}s`,
                cursor: "pointer",
                breakInside: "avoid",
                pageBreakInside: "avoid",
                marginBottom: "24px",
              }}
              onClick={() => window.open(item.link, "_blank")}
              onMouseEnter={(e) => {
                const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement;
                if (overlay) overlay.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement;
                if (overlay) overlay.style.opacity = "0";
              }}
              >
                <div style={{
                  width: "100%", paddingBottom: pb, background: "#111",
                  border: "1px solid rgba(255,255,255,0.05)", position: "relative", overflow: "hidden"
                }}>
                  {item.src ? (
                    <Image
                      src={item.src}
                      alt={item.caption}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover", filter: "brightness(0.85)" }}
                    />
                  ) : (
                    <>
                      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(45deg, transparent, rgba(201,168,76,0.05))` }} />
                      <div style={{
                        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--font-dm-sans)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, opacity: 0.3
                      }}>
                        [Photo Placeholder]
                      </div>
                    </>
                  )}

                  {/* Hover Overlay */}
                  <div className="overlay" style={{
                    position: "absolute", inset: 0, background: "rgba(10,10,10,0.85)",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    opacity: 0, transition: "opacity 0.4s ease", padding: "32px", textAlign: "center"
                  }}>
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "8px" }}>
                      {item.category}
                    </span>
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: CREAM, opacity: 0.6, marginBottom: "16px" }}>
                      Event: {item.event}
                    </span>
                    <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "28px", fontWeight: 300, color: CREAM, margin: 0 }}>
                      {item.caption}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
