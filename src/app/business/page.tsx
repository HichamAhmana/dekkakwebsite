"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useMobile } from "../hooks/useMobile";

const GOLD = "#C9A84C";
const CREAM = "#F5F0E8";

const COMPANIES = [
  {
    name: "Adgeco Group",
    role: "Chairman & Founder",
    sector: "Holding Company — Oil & Gas, EPC, Construction, Marine, Desalination",
    description: "Founded in 1992 in Abu Dhabi, Adgeco Group has successfully grown many startup foreign businesses and ventures into full-fledged companies across Arab Countries, Europe, Africa, and North America. Key projects include Abu Dhabi International Airport runway, Civil Works for Oil Terminal 2 at Port Fujairah, and System Floats Concrete at Khalifa Port.",
    link: "adgeco.com"
  },
   {
    name: "Orchid Island Real Estates Agency",
    role: "Founder & Chairman",
    sector: "Real Estate — UAE",
    description: "A premier real estate agency managing luxury and commercial property portfolios, providing high-end brokerage and property management services.",
    link:"orchidisland.immo"
  },
  {
    name: "Gate One Properties",
    role: "President",
    sector: "Real Estate — UAE",
    description: "One of the leading real estate firms in the UAE, offering property services to investors and companies across a diverse portfolio.",
    link: "gateone.ae"
  },
  {
    name: "Horizonte Invertido",
    role: "Founding Partner",
    sector: "Consulting • Real Estate • Hospitality • Investment — Spain",
    description: "A strategic Spanish holding and consultancy firm focused on bridging high-value real estate, premium hospitality, and structured investment opportunities between European and MENA markets.",
    link:"horizonteinvertido.com"  
  },
  {
    name: "The American University – Marrakech",
    role: "Founding Partner",
    sector: "Education",
    description: "A city-scale educational infrastructure project aimed at bringing world-class American higher education to the heart of Morocco.",
  },
  {
    name: "The American Medical City – Marrakech",
    role: "Founding Partner",
    sector: "Healthcare",
    description: "A massive healthcare infrastructure initiative bringing advanced medical facilities and research to the Marrakech region.",
  },
  {
    name: "US Data Center",
    role: "Founding Partner",
    sector: "Technology Infrastructure",
    description: "Strategic investment in advanced data infrastructure, supporting the digital transformation of the region.",
  },
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

export default function BusinessPage() {
  const [loaded, setLoaded] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#0A0A0A", overflowX: "hidden" }}>
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
            Cross-Continental <br/><i style={{ color: GOLD }}>Enterprise.</i>
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

      {/* Owned Companies Section */}
      <section style={{ padding: isMobile ? "60px 20px" : "80px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gap: isMobile ? "24px" : "40px" }}>
          {COMPANIES.map((company, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              padding: isMobile ? "28px 20px" : "60px",
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
              gap: isMobile ? "20px" : "40px",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.8s ease ${0.4 + i * 0.1}s`
            }}>
              <div>
                <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: isMobile ? "26px" : "36px", fontWeight: 400, color: CREAM, margin: "0 0 12px", lineHeight: 1.2 }}>{company.name}</h3>
                <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginBottom: "6px" }}>{company.role}</div>
                <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: CREAM, opacity: 0.5, lineHeight: 1.5 }}>{company.sector}</div>
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: isMobile ? "13px" : "15px", fontWeight: 300, lineHeight: 1.8, color: CREAM, opacity: 0.8, margin: "0 0 20px" }}>
                  {company.description}
                </p>
                {company.link && (
                  <a href={`http://${company.link}`} target="_blank" rel="noreferrer" style={{
                    fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, borderBottom: `1px solid ${GOLD}44`, paddingBottom: "4px", wordBreak: "break-all"
                  }}>
                    Visit {company.link}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Alliances */}
      <section style={{ padding: isMobile ? "60px 20px" : "120px 40px", background: "#0D0C0A", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
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

      {/* Council Memberships Logo Wall (Text based for now) */}
      <section style={{ padding: isMobile ? "50px 20px" : "80px 40px", overflow: "hidden" }}>
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
