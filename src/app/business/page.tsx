"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GOLD = "#C9A84C";
const CREAM = "var(--text-color)";

const COMPANIES = [
  {
    name: "Adgeco Group",
    role: "Chairman & Founder",
    sector: "Holding Company — Oil & Gas, EPC, Construction, Marine, Desalination",
    description: "Founded in 1992 in Abu Dhabi, Adgeco Group has successfully grown many startup foreign businesses and ventures into full-fledged companies across Arab Countries, Europe, Africa, and North America. Key projects include Abu Dhabi International Airport runway, Civil Works for Oil Terminal 2 at Port Fujairah, and System Floats Concrete at Khalifa Port.",
    link: "adgeco.com",
    image: "/mohamed-dekkak-adgeco-group.png",
  },
  {
    name: "Gate One Properties",
    role: "President",
    sector: "Real Estate — UAE",
    description: "One of the leading real estate firms in the UAE, offering property services to investors and companies across a diverse portfolio.",
    link: "gateone.ae",
    image: null,
  },
  {
    name: "The American University – Marrakech",
    role: "Founding Partner",
    sector: "Education",
    description: "A city-scale educational infrastructure project aimed at bringing world-class American higher education to the heart of Morocco.",
    image: null,
  },
  {
    name: "The American Medical City – Marrakech",
    role: "Founding Partner",
    sector: "Healthcare",
    description: "A massive healthcare infrastructure initiative bringing advanced medical facilities and research to the Marrakech region.",
    image: null,
  },
  {
    name: "US Data Center",
    role: "Founding Partner",
    sector: "Technology Infrastructure",
    description: "Strategic investment in advanced data infrastructure, supporting the digital transformation of the region.",
    image: null,
  }
];

const ALLIANCES = [
  { name: "Valoriza / Sacyr Group", country: "Spain", sector: "Desalination, Energy" },
  { name: "KRC (Kyeryong)", country: "South Korea", sector: "Engineering & Construction" },
  { name: "Sigma International", country: "USA", sector: "Construction" },
  { name: "Full Power", country: "Vietnam", sector: "Energy" },
  { name: "Madema Group", country: "UAE", sector: "Events & Production" },
  { name: "Albanna Engineering", country: "UAE", sector: "Civil Engineering" },
];

const COUNCILS = [
  "AmCham Abu Dhabi", "Canadian Business Council", "Benelux Business Council",
  "British Business Group", "German Emirati Joint Council", "French Business Group",
  "Spanish Business Council", "Belgian Business Council", "Swiss Business Council",
  "Netherlands Business Council", "Danish Business Council", "Singapore Business Council",
  "Australian Business Council", "Malaysian Business Council", "Arab Business Club"
];

/* ── Special Adgeco Hero Card ── */
function AdgecoCard({ company, loaded }: { company: typeof COMPANIES[0]; loaded: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered ? "rgba(201,168,76,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? GOLD + "44" : "rgba(201,168,76,0.15)"}`,
        overflow: "hidden",
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.9s ease 0.3s",
        boxShadow: hovered ? `0 32px 80px rgba(0,0,0,0.5), 0 0 60px rgba(201,168,76,0.06)` : "0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      {/* ── Two-column layout ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "480px" }}>

        {/* LEFT: Text content */}
        <div style={{ padding: "64px 56px", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 2 }}>
          {/* Gold rule */}
          <div style={{ width: hovered ? "80px" : "40px", height: "1px", background: GOLD, marginBottom: "32px", transition: "width 0.5s ease" }} />

          <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", color: GOLD, marginBottom: "12px", opacity: 0.85 }}>
            {company.role}
          </div>

          <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 300, color: CREAM, margin: "0 0 8px", lineHeight: 1 }}>
            {company.name}
          </h3>

          <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: CREAM, opacity: 0.4, marginBottom: "32px", letterSpacing: "0.05em" }}>
            {company.sector}
          </div>

          <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "15px", fontWeight: 300, lineHeight: 1.85, color: CREAM, opacity: 0.75, margin: "0 0 36px" }}>
            {company.description}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
            {company.link && (
              <a href={`http://${company.link}`} target="_blank" rel="noreferrer" style={{
                fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em",
                textTransform: "uppercase", color: GOLD, borderBottom: `1px solid ${GOLD}55`, paddingBottom: "4px",
                transition: "opacity 0.3s ease", opacity: hovered ? 1 : 0.7,
              }}>
                Visit {company.link} →
              </a>
            )}
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: CREAM, opacity: 0.3 }}>
              Abu Dhabi · Est. 1992
            </span>
          </div>
        </div>

        {/* RIGHT: Cinematic portrait */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          {/* Gold border left edge */}
          <div style={{ position: "absolute", left: 0, top: "10%", bottom: "10%", width: "1px", background: `linear-gradient(to bottom, transparent, ${GOLD}66, transparent)`, zIndex: 3 }} />

          <Image
            src="/mohamed-dekkak-adgeco-group.png"
            alt="Mohamed Dekkak — Adgeco Group"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            style={{
              objectFit: "cover",
              objectPosition: "center 20%",
              filter: hovered ? "brightness(0.85) saturate(0.95)" : "brightness(0.65) grayscale(30%) saturate(0.8)",
              transform: hovered ? "scale(1.05)" : "scale(1.0)",
              transition: "filter 1s ease, transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />

          {/* Gold gradient overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(to right, rgba(10,10,10,0.85) 0%, transparent 35%), linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 40%), linear-gradient(135deg, ${GOLD}11 0%, transparent 60%)`,
            zIndex: 1,
          }} />

          {/* Animated corner frame lines */}
          <div style={{ position: "absolute", top: "20px", right: "20px", width: hovered ? "60px" : "30px", height: "1px", background: GOLD, transition: "width 0.6s ease", zIndex: 2 }} />
          <div style={{ position: "absolute", top: "20px", right: "20px", width: "1px", height: hovered ? "60px" : "30px", background: GOLD, transition: "height 0.6s ease", zIndex: 2 }} />
          <div style={{ position: "absolute", bottom: "20px", right: "20px", width: hovered ? "60px" : "30px", height: "1px", background: GOLD, transition: "width 0.6s ease", zIndex: 2 }} />
          <div style={{ position: "absolute", bottom: "20px", right: "20px", width: "1px", height: hovered ? "60px" : "30px", background: GOLD, transition: "height 0.6s ease", zIndex: 2 }} />

          {/* Floating tag */}
          <div style={{
            position: "absolute", bottom: "28px", left: "28px", zIndex: 3,
            opacity: hovered ? 1 : 0.4,
            transition: "opacity 0.4s ease, transform 0.4s ease",
            transform: hovered ? "translateY(0)" : "translateY(6px)",
          }}>
            <div style={{
              fontFamily: "var(--font-dm-sans)", fontSize: "8px", fontWeight: 700,
              letterSpacing: "0.35em", textTransform: "uppercase", color: GOLD,
              background: "rgba(10,10,10,0.7)", padding: "8px 16px",
              border: `1px solid ${GOLD}33`, backdropFilter: "blur(8px)",
            }}>
              Chairman · Adgeco Group
            </div>
          </div>
        </div>
      </div>

      {/* Subtle scanline on hover */}
      {hovered && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: `linear-gradient(90deg, transparent, ${GOLD}88, transparent)`,
          animation: "imageScanline 2s ease-out forwards",
          zIndex: 5, pointerEvents: "none",
        }} />
      )}
    </div>
  );
}

export default function BusinessPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-color)", overflowX: "hidden" }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        padding: "200px 40px 100px",
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)"
      }}>
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s ease 0.2s"
        }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <div style={{ width: "40px", height: "1px", background: GOLD }} />
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD }}>
              The Ecosystem
            </span>
            <div style={{ width: "40px", height: "1px", background: GOLD }} />
          </div>
          <h1 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(48px, 8vw, 110px)",
            fontWeight: 300, color: CREAM,
            margin: "0 0 24px", lineHeight: 1
          }}>
            Cross-Continental <br /><i style={{ color: GOLD }}>Enterprise.</i>
          </h1>
          <p style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "16px", fontWeight: 300, lineHeight: 1.8,
            color: CREAM, opacity: 0.7, maxWidth: "600px", margin: "0 auto"
          }}>
            From the founding of Adgeco Group in 1992 to strategic investments spanning energy, real estate, education, and healthcare infrastructure.
          </p>
        </div>
      </section>

      {/* Companies Section */}
      <section style={{ padding: "80px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gap: "40px" }}>
          {COMPANIES.map((company, i) =>
            company.image ? (
              <AdgecoCard key={i} company={company} loaded={loaded} />
            ) : (
              <div key={i} style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                padding: "60px",
                display: "grid",
                gridTemplateColumns: "1fr 2fr",
                gap: "40px",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.8s ease ${0.4 + i * 0.1}s`
              }}>
                <div>
                  <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "36px", fontWeight: 400, color: CREAM, margin: "0 0 16px" }}>{company.name}</h3>
                  <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "8px" }}>{company.role}</div>
                  <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: CREAM, opacity: 0.5 }}>{company.sector}</div>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "15px", fontWeight: 300, lineHeight: 1.8, color: CREAM, opacity: 0.8, margin: "0 0 24px" }}>
                    {company.description}
                  </p>
                  {company.link && (
                    <a href={`http://${company.link}`} target="_blank" rel="noreferrer" style={{
                      fontFamily: "var(--font-dm-sans)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, borderBottom: `1px solid ${GOLD}44`, paddingBottom: "4px"
                    }}>
                      Visit {company.link}
                    </a>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* Strategic Alliances */}
      <section style={{ padding: "120px 40px", background: "#0D0C0A", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "48px", fontWeight: 300, color: CREAM, margin: "0 0 16px" }}>Strategic Alliances</h2>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: CREAM, opacity: 0.5 }}>Joint ventures and global partnerships bridging markets.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {ALLIANCES.map((partner, i) => (
              <div key={i} style={{ padding: "40px", border: "1px solid rgba(201,168,76,0.1)", textAlign: "center", background: "rgba(201,168,76,0.02)" }}>
                <h4 style={{ fontFamily: "var(--font-dm-sans)", fontSize: "18px", fontWeight: 400, color: CREAM, margin: "0 0 12px" }}>{partner.name}</h4>
                <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: GOLD, marginBottom: "8px" }}>{partner.country}</div>
                <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: CREAM, opacity: 0.4 }}>{partner.sector}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Council Memberships */}
      <section style={{ padding: "80px 40px", overflow: "hidden" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "36px", fontWeight: 300, color: CREAM, margin: "0" }}>Global Network</h2>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", maxWidth: "1000px", margin: "0 auto" }}>
          {COUNCILS.map((council, i) => (
            <span key={i} style={{
              fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "12px 24px", border: "1px solid rgba(255,255,255,0.1)", color: CREAM, opacity: 0.6
            }}>
              {council}
            </span>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
