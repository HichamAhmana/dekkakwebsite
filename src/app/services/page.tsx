"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GOLD = "#C9A84C";
const CREAM = "var(--text-color)";

const SERVICES = [
  {
    title: "Real Estate Services",
    description: "Comprehensive advisory and management for high-value property portfolios, from landmark developments to ultra-luxury residential assets across the UAE, Morocco, and Europe."
  },
  {
    title: "Consulting",
    description: "Strategic insights and cross-continental business intelligence to help enterprises scale, optimize operations, and penetrate emerging markets in the Middle East and Africa."
  },
  {
    title: "Mergers & Acquisitions (M&A)",
    description: "Expert facilitation of complex corporate transactions, leveraging a deep global network to structure profitable acquisitions, mergers, and strategic joint ventures."
  },
  {
    title: "Investment Structuring",
    description: "Designing bespoke, tax-efficient, and risk-adjusted investment vehicles tailored for institutional capital, sovereign wealth, and high-net-worth family offices."
  },
  {
    title: "Capital Raising",
    description: "Securing funding for multi-million dollar infrastructure, real estate, and tech projects through an exclusive syndicate of international banking and private equity partners."
  },
  {
    title: "Standard, LBO & Innovative Financing",
    description: "Providing robust financing architectures including leveraged buyouts (LBOs), mezzanine finance, and innovative credit solutions for expansive growth objectives."
  },
  {
    title: "Hospitality Advisory",
    description: "End-to-end consulting for luxury hotel and resort developments, from conceptualization and brand positioning to operational excellence and asset management."
  },
  {
    title: "Value & Risk",
    description: "Sophisticated risk mitigation and value-creation strategies to protect capital and ensure sustainable, long-term returns in volatile global markets."
  },
  {
    title: "Capital Flows",
    description: "Navigating cross-border capital mobility, foreign direct investment (FDI) frameworks, and regulatory compliance between the West and the Arab world."
  },
  {
    title: "Industries We Serve",
    description: "A diverse portfolio spanning Oil & Gas, Engineering & Construction, Real Estate, Healthcare, Education, Hospitality, and Next-Generation Technologies."
  },
  {
    title: "Investment Approach",
    description: "A patient, value-driven philosophy that prioritizes legacy-building infrastructure, rigorous due diligence, and absolute alignment of interest with our partners."
  },
  {
    title: "Global Presence",
    description: "Operating with deep local expertise and a global mindset from key strategic hubs in Marrakech, Abu Dhabi, and Madrid to serve an international clientele."
  }
];

export default function ServicesPage() {
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
        minHeight: "50vh",
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
              Expertise
            </span>
            <div style={{ width: "40px", height: "1px", background: GOLD }} />
          </div>
          <h1 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(48px, 8vw, 110px)",
            fontWeight: 300, color: CREAM,
            margin: "0 0 24px", lineHeight: 1
          }}>
            Global <i style={{ color: GOLD }}>Services.</i>
          </h1>
          <p style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "16px", fontWeight: 300, lineHeight: 1.8,
            color: CREAM, opacity: 0.7, maxWidth: "600px", margin: "0 auto"
          }}>
            Comprehensive advisory, strategic consulting, and capital solutions driving cross-continental enterprise growth.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: "80px 40px 120px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          
          {SERVICES.map((service, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              padding: "48px 40px",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.8s ease ${0.3 + (i % 3) * 0.1}s`,
            }}>
              <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "28px", fontWeight: 400, color: CREAM, margin: "0 0 16px" }}>
                {service.title}
              </h3>
              <div style={{ width: "30px", height: "1px", background: GOLD, marginBottom: "24px", opacity: 0.5 }} />
              <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "14px", fontWeight: 300, lineHeight: 1.8, color: CREAM, opacity: 0.7, margin: 0 }}>
                {service.description}
              </p>
            </div>
          ))}

          {/* Healthcare specific link card */}
          <div style={{
            background: "rgba(201,168,76,0.05)",
            border: `1px solid ${GOLD}44`,
            padding: "48px 40px",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: `all 0.8s ease 0.6s`,
            display: "flex", flexDirection: "column", justifyContent: "space-between"
          }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "28px", fontWeight: 400, color: GOLD, margin: "0 0 16px" }}>
                Healthcare
              </h3>
              <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "14px", fontWeight: 300, lineHeight: 1.8, color: CREAM, opacity: 0.7, margin: "0 0 24px" }}>
                Pioneering state-of-the-art medical infrastructure and transformative healthcare delivery systems across emerging markets, anchored by The American Medical City - Marrakesh.
              </p>
            </div>
            <Link href="/healthcare" style={{
              fontFamily: "var(--font-dm-sans)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, borderBottom: `1px solid ${GOLD}44`, paddingBottom: "4px", alignSelf: "flex-start", transition: "opacity 0.3s ease"
            }}>
              Explore Healthcare →
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
