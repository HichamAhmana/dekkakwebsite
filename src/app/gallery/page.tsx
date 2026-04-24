"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GOLD = "#C9A84C";
const CREAM = "var(--text-color)";

const GALLERY_ITEMS = [
  { id: 1, category: "Diplomacy", aspect: "aspect-[4/5]", caption: "SBCC Summit 2022, Marrakech" },
  { id: 2, category: "Philanthropy", aspect: "aspect-square", caption: "Ait Faska Coding Program" },
  { id: 3, category: "Business", aspect: "aspect-[16/9]", caption: "Adgeco Strategic Alliance Signing" },
  { id: 4, category: "Philanthropy", aspect: "aspect-[4/5]", caption: "Children's Art Workshop" },
  { id: 5, category: "Diplomacy", aspect: "aspect-[3/2]", caption: "Ibn Battuta Festival, Tangier" },
  { id: 6, category: "Business", aspect: "aspect-[4/3]", caption: "Khalifa Port Infrastructure" },
  { id: 7, category: "Diplomacy", aspect: "aspect-[16/9]", caption: "CARLAC Latin America Delegation" },
  { id: 8, category: "Philanthropy", aspect: "aspect-square", caption: "Sahara Spirit Foundation Launch" },
];

const CATEGORIES = ["All", "Business", "Philanthropy", "Diplomacy"];

export default function GalleryPage() {
  const [loaded, setLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  const filteredItems = activeCategory === "All" 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-color)", overflowX: "hidden" }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        padding: "200px 40px 80px",
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
      <section style={{ padding: "0 40px 120px" }}>
        <div style={{
          maxWidth: "1400px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "24px", alignItems: "start"
        }}>
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
              }}
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
                  {/* Base Placeholder styling */}
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(45deg, transparent, rgba(201,168,76,0.05))` }} />
                  
                  <div style={{
                    position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-dm-sans)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, opacity: 0.3
                  }}>
                    [Photo Placeholder]
                  </div>

                  {/* Hover Overlay */}
                  <div className="overlay" style={{
                    position: "absolute", inset: 0, background: "rgba(10,10,10,0.85)",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    opacity: 0, transition: "opacity 0.4s ease", padding: "32px", textAlign: "center"
                  }}>
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "16px" }}>
                      {item.category}
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
