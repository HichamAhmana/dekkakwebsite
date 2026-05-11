"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { useMobile } from "../hooks/useMobile";
import Footer from '../components/Footer';


const MARRAKECH_TERRACOTTA = "#B86A51"; // Adding a subtle warm tone for Orchid Island
const CREAM = "var(--text-color)";

export default function OrchidIslandPage() {
  const [loaded, setLoaded] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-color)", overflowX: "hidden" }}>
      <Navbar />

      {/* Immersive Hero Section */}
      <section style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "0 20px" : "0 40px",
      }}>
        {/* Cinematic Background Placeholder */}
        <div style={{
          position: "absolute", inset: 0,
          background: "var(--bg-secondary)", // Would be a stunning Marrakech estate photo
          zIndex: 0
        }}>
          {/* Gradients to blend image into the dark theme */}
          <style>{`
            .orchid-hero-overlay-1 {
              background: linear-gradient(to bottom, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.4) 50%, var(--bg-color) 100%);
            }
            .orchid-hero-overlay-2 {
              background: radial-gradient(circle at center, transparent 0%, rgba(10,10,10,0.8) 100%);
            }
            [data-theme="light"] .orchid-hero-overlay-1 {
              background: linear-gradient(to bottom, #f5f5f5, #ffffff);
            }
            [data-theme="light"] .orchid-hero-overlay-2 {
              background: none;
            }
          `}</style>
          <div className="orchid-hero-overlay-1" style={{ position: "absolute", inset: 0 }} />
          <div className="orchid-hero-overlay-2" style={{ position: "absolute", inset: 0 }} />
        </div>

        <div style={{
          position: "relative", zIndex: 1,
          textAlign: "center",
          maxWidth: "800px",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1.2s ease 0.2s"
        }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
            <div style={{ width: "40px", height: "1px", background: MARRAKECH_TERRACOTTA }} />
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: MARRAKECH_TERRACOTTA }}>
              Luxury Real Estate
            </span>
            <div style={{ width: "40px", height: "1px", background: MARRAKECH_TERRACOTTA }} />
          </div>
          
          <h1 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(64px, 10vw, 140px)",
            fontWeight: 300, color: CREAM,
            margin: "0 0 24px", lineHeight: 0.9,
            letterSpacing: "-0.02em"
          }}>
            Orchid Island
          </h1>
          
          <p style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "14px", fontWeight: 400, letterSpacing: "0.4em", textTransform: "uppercase",
            color: CREAM, opacity: 0.6, margin: "0 0 48px"
          }}>
            Marrakech, Morocco
          </p>

          <p style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 300, fontStyle: "italic", lineHeight: 1.4,
            color: CREAM, opacity: 0.9, maxWidth: "600px", margin: "0 auto"
          }}>
            &quot;Rooted in the city of his birth, a vision of excellence, hospitality, and the belief that beauty itself is a form of leadership.&quot;
          </p>
        </div>
      </section>

{/* Minimal Footer for this standalone experience */}
      <footer style={{ padding: isMobile ? "48px 20px" : "10px 10px", borderTop: `1px solid rgba(184,106,81,0.1)`, textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", fontWeight: 300, letterSpacing: "0.2em", textTransform: "uppercase", color: CREAM, margin: "0 0 24px" }}>Orchid Island</h2>
        <a href="https://www.orchidisland.immo/" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: MARRAKECH_TERRACOTTA, borderBottom: `1px solid ${MARRAKECH_TERRACOTTA}44`, paddingBottom: "4px" }}>
         - Visit Official Site -
        </a>
      </footer>
      {/* Vision & Philosophy */}
<section style={{ padding: isMobile ? "10px 20px" : "60px 20px" }}>
  <div style={{
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
    gap: isMobile ? "32px" : "80px",
    alignItems: "center"
  }}>
    
    {/* LEFT TEXT */}
    <div>
      <h2 style={{
        fontFamily: "var(--font-cormorant), serif",
        fontSize: "48px",
        fontWeight: 300,
        color: CREAM,
        margin: "0 0 32px"
      }}>
        The Philosophy
      </h2>

      <p style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "16px",
        fontWeight: 300,
        lineHeight: 1.8,
        color: CREAM,
        opacity: 0.7,
        margin: "0 0 24px"
      }}>
        Orchid Island Real Estate Marrakech is Mohamed Dekkak&apos;s luxury real estate brand rooted in his home city...
      </p>

      <p style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "16px",
        fontWeight: 300,
        lineHeight: 1.8,
        color: CREAM,
        opacity: 0.7,
        margin: 0
      }}>
        These curated ventures embody an unparalleled standard of living...
      </p>
    </div>

    {/* RIGHT IMAGE (UPDATED) */}
    <div style={{
      width: "100%",
      aspectRatio: "4/5",
      border: `1px solid rgba(184,106,81,0.2)`,
      position: "relative",
      overflow: "hidden"
    }}>
      
      {/* TODO: Replace this image URL whenever you want */}
      <Image
        src="/dekkak-cinema-marrakech-festival.png"
        alt="Luxury Marrakech Real Estate"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{
          objectFit: "cover"
        }}
      />

      <div style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(45deg, transparent, rgba(184,106,81,0.1))`
      }} />
    </div>

  </div>
</section>
          
      <Footer />
    </main>
  );
}
