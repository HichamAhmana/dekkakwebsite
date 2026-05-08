"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useMobile } from "../hooks/useMobile";


const GOLD = "#C9A84C";
const CREAM = "var(--text-color)";

const FOUNDATIONS = [
  {
    name: "Anouar Association",
    role: "Chairman & Founder",
    focus: "Flagship Charity — Education, Water, Health, Sustainable Development",
    description: "Founded in January 2007, serving underprivileged children and uncared-for elders in Ait Faska, Al Haouz Province, Marrakech. Key programs include the Coding Coach Program, Art Workshops for Children with Disabilities (aligned with UN strategies), and ongoing community beautification projects.",
    image: "/mohamed-dekkak-anouar-association.png",
    imagePosition: "center top",
  },
  {
    name: "Sahara Spirit Foundation",
    role: "Executive President",
    focus: "Regional Development — Healthcare, Education, Economy",
    description: "Dedicated to the development of the Moroccan Sahara region. The foundation views the Sahara not just as geography, but as a deep cultural identity requiring sustainable economic and social advancement.",
    image: "/impact/Mohamed-dekkak-sahara-foundation.png",
  },
  {
    name: "CARLAC",
    role: "CFO & Founding Member",
    focus: "Cultural & Business Cooperation — Arab World & Latin America",
    description: "Bridging the Arab world and Latin America & the Caribbean. With around 550 million Latin American people having Arab roots, CARLAC activates that shared heritage into real economic and cultural cooperation.",
  },
  {
    name: "Arab Peace Corps Foundation",
    role: "Chairman",
    focus: "Peace & Diplomacy across the Arab World",
    description: "A serious diplomatic vehicle operating at the intersection of international business networks and a core belief in Arab world development.",
  },
  {
    name: "Ibn Battuta Association",
    role: "Honorary President",
    focus: "Peace Through Travel",
    description: "Spreading peace and tolerance through travel, rooted in the legacy of the great Moroccan explorer Ibn Battuta. Organizer of the International Ibn Battuta Festival in Tangier.",
    image: "/impact/Mohamed-dekkak-Ibn-Battuta-Association.png",
  },
{
  name: "Union Road Association",
  role: "Honorary President",
  focus: "Disability Advocacy & Research",
  description: "A not-for-profit organization that creates awareness about the problems of physically disabled people, providing research and resources for alleviating their condition.",
  image: "/impact/Mohamed-dekkak-Ibn-Battuta-Association.png",
  accent: "#9D8A78"
},
  {
    name: "New Arab Foundation",
    role: "President / Executive Director",
    focus: "Regional Reform & Advancement",
    description: "Focusing on Arab world development, reform, and community advancement across the region.",
    image: "/impact/Mohamed-dekkak-New-arab-foundation.png",
  },
  {
    name: "Al Moravide Foundation",
    role: "Board Member",
    focus: "Moroccan Citizen Advocacy",
    description: "A non-profit organization whose objective is to position the Moroccan citizen at the center of interest and help advance their lives through creative social ideas.",
  }
];

export default function ImpactPage() {
  const [loaded, setLoaded] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-color)", overflowX: "hidden" }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        padding: isMobile ? "140px 20px 80px" : "200px 40px 120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}>
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s ease 0.2s",
          maxWidth: "800px"
        }}>
          <h1 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(48px, 8vw, 110px)",
            fontWeight: 300, color: CREAM,
            margin: "0 0 32px", lineHeight: 1
          }}>
            Human <i style={{ color: GOLD }}>Impact.</i>
          </h1>
          <h2 style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: isMobile ? "15px" : "20px", fontWeight: 300, lineHeight: 1.6,
            color: CREAM, margin: "0 0 32px", fontStyle: "italic"
          }}>
            &ldquo;A boy from Marrakech built a global business empire — and never forgot where he came from.&rdquo;
          </h2>
          <div style={{ width: "60px", height: "1px", background: GOLD, margin: "0 auto 32px" }} />
          <p style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "15px", fontWeight: 300, lineHeight: 1.8,
            color: CREAM, opacity: 0.6
          }}>
            The business and the charity are not separate worlds. The same man who signs international infrastructure contracts in Abu Dhabi goes back to Ait Faska, a rural village in Marrakech, to teach children how to code. That contrast is not a contradiction — it is the whole point.
          </p>
        </div>
      </section>

      {/* Foundations Grid */}
      <section style={{ padding: isMobile ? "40px 16px 80px" : "80px 40px 140px", background: "linear-gradient(180deg, var(--bg-color) 0%, #0D0C0A 100%)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(400px, 1fr))", gap: "2px", background: "rgba(201,168,76,0.15)" }}>
          {FOUNDATIONS.map((f, i) => (
            <div key={i} style={{
              background: "var(--bg-color)",
              padding: isMobile ? "32px 20px" : "60px 48px",
              display: "flex",
              flexDirection: "column"
            }}>
              <div style={{ width: "40px", height: "2px", background: GOLD, marginBottom: "24px" }} />
              <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: isMobile ? "26px" : "32px", fontWeight: 400, color: CREAM, margin: "0 0 12px", lineHeight: 1.2 }}>{f.name}</h3>
              <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginBottom: "6px" }}>{f.role}</div>
              <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: CREAM, opacity: 0.5, marginBottom: "20px", lineHeight: 1.5 }}>{f.focus}</div>

              {/* Photo — real image or styled placeholder */}
              <div style={{
                width: "100%", height: isMobile ? "180px" : "220px",
                background: "var(--bg-secondary)", border: `1px solid rgba(255,255,255,0.05)`,
                marginBottom: "32px", position: "relative", overflow: "hidden",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                {(f as typeof FOUNDATIONS[0] & { image?: string }).image ? (
                  <>
                    <Image
                      src={(f as typeof FOUNDATIONS[0] & { image?: string }).image!}
                      alt={f.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      style={{
                        objectFit: "cover",
                        objectPosition: (f as typeof FOUNDATIONS[0] & { imagePosition?: string }).imagePosition ?? "center center",
                        filter: "brightness(0.7) saturate(0.85)",
                      }}
                    />
                    <div style={{
                      position: "absolute", inset: 0,
                      background: `linear-gradient(to top, rgba(10,10,10,0.75) 0%, transparent 55%), linear-gradient(135deg, ${GOLD}11, transparent)`,
                    }} />
                    <div style={{
                      position: "absolute", bottom: "14px", left: "16px",
                      fontFamily: "var(--font-dm-sans)", fontSize: "8px", fontWeight: 700,
                      letterSpacing: "0.35em", textTransform: "uppercase", color: GOLD,
                    }}>
                      {f.name}
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${GOLD}18, transparent 70%)` }} />
                    <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(45deg, transparent, transparent 24px, ${GOLD}08 24px, ${GOLD}08 25px)` }} />
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD, opacity: 0.5, position: "relative", zIndex: 1 }}>Photo Coming Soon</span>
                  </>
                )}
              </div>

              <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "14px", fontWeight: 300, lineHeight: 1.8, color: CREAM, opacity: 0.8, margin: 0, flexGrow: 1 }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
