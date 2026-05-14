"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

import CTABanner from "../components/CTABanner";
const GOLD = "#C9A84C";
const CREAM = "var(--text-color)";

const SERVICES = [
  {
    title: "Real Estate Services",
    description: "We source and deliver premium real estate investment opportunities, specializing in upscale and luxury assets across both residential and commercial sectors. Our capabilities span office developments, retail destinations, healthcare properties, industrial assets, hospitality projects, and data centers allowing us to build well-balanced and resilient portfolios. From initial acquisition through to strategic repositioning, we uncover potential, enhance asset performance, and generate value aligned with institutional standards."
  },
  {
    title: "Consulting",
    description: "Our advisory services guide clients through market entry, growth initiatives, and strategic transformation. We provide expertise in cross-border structuring, regulatory alignment, operational efficiency, and overall business strategy helping organizations expand effectively within complex and evolving markets. By blending deep local insight with a global outlook, we deliver actionable, performance-focused solutions that drive growth while minimizing execution risk."
  },
  {
    title: "Mergers & Acquisitions (M&A)",
    description: "We deliver comprehensive advisory services for both buy-side and sell-side M&A transactions, covering everything from opportunity sourcing and valuation to negotiation and closing. Our methodology combines financial, operational, and strategic due diligence to provide clear insights and informed decision-making throughout the process. We design transaction structures that capture synergies, maximize asset value, and strengthen long-term strategic positioning."
  },
  {
    title: "Investment Structuring",
    description: "We develop customized investment frameworks, including joint ventures, private equity platforms, and institutional-grade vehicles. Each solution is structured to enhance capital efficiency, strengthen governance, and balance risk allocation while ensuring alignment among all stakeholders. Our approach prioritizes flexibility, scalability, and full compliance with international standards."
  },
  {
    title: "Capital Raising",
    description: "We link projects with a broad range of global capital providers, including institutional investors, sovereign wealth funds, family offices, and private equity groups. By crafting strong investment narratives, positioning opportunities effectively, and engaging the right investors, we facilitate funding that aligns closely with each project's objectives. Our extensive network provides access to both conventional and alternative sources of capital."
  },
  {
    title: "Standard, LBO & Innovative Financing",
    description: "We structure both conventional leveraged buyouts (LBOs) and bespoke financing solutions designed for complex transactions. By integrating structured debt, mezzanine capital, and hybrid instruments, we build efficient capital stacks that maximize returns while preserving financial flexibility. Our approach enables clients to access opportunities that demand creative and sophisticated financial structuring."
  },
  {
    title: "Hospitality Advisory",
    description: "We operate at the crossroads of hospitality investment and destination creation, developing hotels, restaurants, beach clubs, and nightlife venues. Our approach goes beyond real estate, blending brand strategy, concept development, operations, and guest experience. We create lifestyle destinations where luxury stays, premium dining, and vibrant entertainment come together building strong identities and diversified revenue streams."
  },
  {
    title: "Value & Risk",
    description: "We provide advanced valuation and risk analysis, combining financial modeling with market intelligence to assess opportunities with precision. Our methodology identifies key value drivers, stress-tests assumptions, and anticipates potential risks. This ensures informed decision-making, capital protection, and optimized performance across all investment stages."
  },
  {
    title: "Capital Flows",
    description: "We track and harness global capital flows to position assets and opportunities with precision. By analyzing liquidity trends, investor demand, and macroeconomic shifts, we connect projects to the most relevant funding sources. This strategy improves capital alignment, accelerates timing, and strengthens overall investment appeal."
  },
  {
    title: "Industries We Serve",
    description: "We operate across high-growth, resilient sectors including Hospitality (hotels, restaurants, lifestyle destinations), Healthcare (hospitals, clinics, integrated medical platforms), Data Centers (AI-driven, energy-linked infrastructure), Retail (commercial centers, mixed-use projects), Industrial & Offices (institutional-grade assets), Logistics (strategic hubs and supply chain infrastructure), and Private Clients (wealth structuring and bespoke real estate). Our cross-sector perspective allows us to capture synergies between real estate, technology, and capital markets."
  },
  {
    title: "Investment Approach",
    description: "Our investment philosophy is built on discipline, innovation, and long-term value creation. We identify high-potential opportunities, structure them with optimized capital strategies, and execute with institutional rigor. By combining market intelligence, financial structuring, and operational expertise, we deliver investments that generate strong returns, resilient cash flows, and sustainable growth."
  },
  {
    title: "Global Presence",
    description: "Our activities extend across Europe, the Middle East, and Africa, connecting global capital with high-potential regional opportunities. Operating in both mature and emerging markets, we provide strategic access, local expertise, and seamless cross-border execution."
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

          

        </div>
      </section>
      <CTABanner />
      <Footer />
    </main>
  );
}
