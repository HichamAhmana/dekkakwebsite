"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CTABanner from "../components/CTABanner";
import { useMobile } from "../hooks/useMobile";

const GOLD = "#C9A84C";
const CREAM = "var(--text-color)";

const COMPANIES = [
  {
    name: "Adgeco Group",
    role: "Chairman & Founder",
    sector:
      "Holding Company — Oil & Gas, EPC, Construction, Marine, Desalination",
    description:
      "Founded in 1992 in Abu Dhabi, Adgeco Group has expanded across the Middle East, Europe, Africa, and North America through large-scale infrastructure, energy, and construction projects.",
    link: "http://adgeco.com",
  },

  {
    name: "US Data Center",
    role: "Founding Partner",
    sector: "Technology Infrastructure",
    description:
      "Strategic investment in advanced data infrastructure supporting AI, cloud computing, digital transformation, and scalable technology ecosystems.",
    link: "https://usdatacenter.com",
  },

  {
    name: "Orchid Island Real Estates Agency",
    role: "Founder & Chairman",
    sector: "Real Estate — UAE",
    description:
      "A premier real estate agency managing luxury and commercial property portfolios with high-end brokerage and property management services.",
    link: "https://orchidisland.immo",
  },

  {
    name: "Gate One Properties",
    role: "President",
    sector: "Real Estate — UAE",
    description:
      "One of the leading real estate firms in the UAE, serving investors and corporations across diversified property portfolios.",
    link: "http://gateonewhgvwcujbw.ae",
  },

  {
    name: "Horizonte Invertido",
    role: "Founding Partner",
    sector:
      "Consulting • Real Estate • Hospitality • Investment — Spain",
    description:
      "A strategic Spanish consultancy and investment platform connecting European and MENA opportunities in hospitality and real estate.",
    link: "https://horizonteinvertido.com",
  },

  {
    name: "Atlas GRB",
    role: "Founder Partner",
    sector:
      "Real Estate Development • Architecture • Construction — Morocco & USA",
    description:
      "A transatlantic development platform integrating architecture, engineering, construction, and design across residential, hospitality, mixed-use, and heritage projects.",
  },

  {
    name: "M30 Projects",
    role: "Founder Partner",
    sector:
      "Development • Infrastructure • Healthcare • Hospitality — Morocco",
    description:
      "A development company delivering large-scale projects across healthcare, hospitality, education, infrastructure, data centers, and mixed-use real estate.",
  },

  {
    name: "The American University – Marrakech",
    role: "Founding Partner",
    sector: "Education",
    description:
      "A city-scale educational initiative bringing world-class American higher education to the heart of Morocco.",
  },

  {
    name: "The American Medical City – Marrakech",
    role: "Founding Partner",
    sector: "Healthcare",
    description:
      "A major healthcare infrastructure initiative focused on advanced medical facilities and research in Marrakech.",
  },
];

const ALLIANCES = [
  {
    name: "Valoriza / Sacyr Group",
    country: "Spain",
    sector: "Desalination, Energy",
  },
  {
    name: "KRC (Kyeryong)",
    country: "South Korea",
    sector: "Engineering & Construction",
  },
  {
    name: "Sigma International",
    country: "USA",
    sector: "Construction",
  },
  {
    name: "Full Power",
    country: "Vietnam",
    sector: "Energy",
  },
  {
    name: "Madema Group",
    country: "UAE",
    sector: "Events & Production",
  },
  {
    name: "Albanna Engineering",
    country: "UAE",
    sector: "Civil Engineering",
  },
];

const COUNCILS = [
  { name: "AmCham Abu Dhabi", url: "https://amchamabudhabi.org" },
  { name: "Canadian Business Council", url: "https://www.cbc-dubai.com" },
  { name: "Benelux Business Council" },
  { name: "British Business Group" },
  { name: "German Emirati Joint Council", url: "https://vae.ahk.de/en" },
  { name: "French Business Group" },
  {
    name: "Spanish Business Council",
    url: "http://spanishbusinesscouncil.ae/en",
  },
  { name: "Belgian Business Council" },
  { name: "Swiss Business Council", url: "https://www.swissbcuae.com" },
  { name: "Netherlands Business Council", url: "https://www.nlbcuae.com" },
  {
    name: "Danish Business Council",
    url: "https://danishbusinesscouncil.com",
  },
  { name: "Singapore Business Council" },
  { name: "Australian Business Council", url: "https://www.abcduae.com" },
  { name: "Malaysian Business Council" },
  { name: "Arab Business Club", url: "https://arabbusinessclub.org" },
];

export default function BusinessPageClient() {
  const [loaded, setLoaded] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg-color)",
        overflowX: "hidden",
      }}
    >
      <style>{`
        [data-theme="light"] nav {
          background: var(--bg-color) !important;
        }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          padding: isMobile ? "160px 20px 80px" : "180px 40px 120px",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background:
            "radial-gradient(circle at top, rgba(201,168,76,0.12) 0%, transparent 55%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.05,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div
          style={{
            maxWidth: "1400px",
            width: "100%",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
            gap: isMobile ? "60px" : "80px",
            alignItems: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* LEFT */}
          <div
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded
                ? "translateY(0)"
                : "translateY(20px)",
              transition: "all 1s ease",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "30px",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "1px",
                  background: GOLD,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "10px",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: GOLD,
                  fontWeight: 600,
                }}
              >
                Global Business Ecosystem
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(60px, 10vw, 140px)",
                lineHeight: 0.95,
                fontWeight: 300,
                margin: "0 0 30px",
                color: CREAM,
              }}
            >
              Building <br />
              <i style={{ color: GOLD }}>Infrastructure</i>
              <br />
              Across Continents.
            </h1>

            <p
              style={{
                maxWidth: "680px",
                fontFamily: "var(--font-dm-sans)",
                fontSize: isMobile ? "15px" : "17px",
                lineHeight: 1.9,
                color: CREAM,
                opacity: 0.72,
                marginBottom: "40px",
              }}
            >
              From energy and EPC through Adgeco Group to advanced digital
              infrastructure with US Data Center, the ecosystem spans real
              estate, healthcare, hospitality, education, and next-generation
              technology projects across the Middle East, Europe, Africa, and
              North America.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
              }}
            >
              {[
                "Energy",
                "Data Infrastructure",
                "Real Estate",
                "Healthcare",
                "Hospitality",
                "Education",
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px 18px",
                    border: "1px solid rgba(201,168,76,0.18)",
                    background: "rgba(201,168,76,0.04)",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "11px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: GOLD,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div
            style={{
              display: "grid",
              gap: "24px",
              opacity: loaded ? 1 : 0,
              transform: loaded
                ? "translateY(0)"
                : "translateY(30px)",
              transition: "all 1s ease 0.3s",
            }}
          >
            {/* ADGECO */}
            <div
              style={{
                padding: isMobile ? "30px" : "50px",
                border: "1px solid rgba(201,168,76,0.16)",
                background:
                  "linear-gradient(180deg, rgba(201,168,76,0.08), rgba(255,255,255,0.02))",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: GOLD,
                  marginBottom: "16px",
                }}
              >
                Flagship Enterprise
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: isMobile ? "40px" : "56px",
                  fontWeight: 300,
                  color: CREAM,
                  margin: "0 0 16px",
                  lineHeight: 1,
                }}
              >
                Adgeco Group
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "14px",
                  lineHeight: 1.8,
                  color: CREAM,
                  opacity: 0.72,
                  margin: 0,
                }}
              >
                Leading regional expansion across EPC, marine, oil & gas,
                construction, infrastructure, and industrial development since
                1992.
              </p>
            </div>

            {/* USDC */}
            <div
              style={{
                padding: isMobile ? "30px" : "50px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: GOLD,
                  marginBottom: "16px",
                }}
              >
                Digital Infrastructure
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: isMobile ? "40px" : "56px",
                  fontWeight: 300,
                  color: CREAM,
                  margin: "0 0 16px",
                  lineHeight: 1,
                }}
              >
                US Data Center
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "14px",
                  lineHeight: 1.8,
                  color: CREAM,
                  opacity: 0.72,
                  margin: 0,
                }}
              >
                Advancing AI-ready infrastructure, cloud ecosystems, and
                next-generation data solutions supporting global digital
                transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANIES */}
      <section style={{ padding: isMobile ? "60px 20px" : "100px 40px" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            marginBottom: "70px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "54px",
              fontWeight: 300,
              color: CREAM,
              margin: "0 0 16px",
            }}
          >
            Companies & Projects
          </h2>

          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "14px",
              color: CREAM,
              opacity: 0.55,
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: 1.8,
            }}
          >
            A diversified portfolio spanning infrastructure, technology,
            education, healthcare, hospitality, and cross-border real estate
            development.
          </p>
        </div>

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gap: isMobile ? "24px" : "40px",
          }}
        >
          {COMPANIES.map((company, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                padding: isMobile ? "28px 20px" : "60px",
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
                gap: isMobile ? "20px" : "40px",
                opacity: loaded ? 1 : 0,
                transform: loaded
                  ? "translateY(0)"
                  : "translateY(20px)",
                transition: `all 0.8s ease ${0.4 + i * 0.08}s`,
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: isMobile ? "28px" : "38px",
                    fontWeight: 400,
                    color: CREAM,
                    margin: "0 0 12px",
                    lineHeight: 1.15,
                  }}
                >
                  {company.name}
                </h3>

                <div
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: GOLD,
                    marginBottom: "8px",
                  }}
                >
                  {company.role}
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "11px",
                    color: CREAM,
                    opacity: 0.5,
                    lineHeight: 1.6,
                  }}
                >
                  {company.sector}
                </div>
              </div>

              <div>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: isMobile ? "13px" : "15px",
                    fontWeight: 300,
                    lineHeight: 1.9,
                    color: CREAM,
                    opacity: 0.8,
                    margin: "0 0 20px",
                  }}
                >
                  {company.description}
                </p>

                {company.link && (
                  <a
                    href={company.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: GOLD,
                      borderBottom: `1px solid ${GOLD}44`,
                      paddingBottom: "4px",
                      textDecoration: "none",
                      wordBreak: "break-all",
                    }}
                  >
                    Visit {company.link.replace(/^https?:\/\//, "")}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ALLIANCES */}
      <section
        style={{
          padding: isMobile ? "60px 20px" : "120px 40px",
          background: "var(--bg-secondary)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "48px",
                fontWeight: 300,
                color: CREAM,
                margin: "0 0 16px",
              }}
            >
              Strategic Alliances
            </h2>

            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "14px",
                color: CREAM,
                opacity: 0.5,
              }}
            >
              Joint ventures and global partnerships bridging markets.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {ALLIANCES.map((partner, i) => (
              <div
                key={i}
                style={{
                  padding: "40px",
                  border: "1px solid rgba(201,168,76,0.1)",
                  textAlign: "center",
                  background: "rgba(201,168,76,0.02)",
                }}
              >
                <h4
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "18px",
                    fontWeight: 400,
                    color: CREAM,
                    margin: "0 0 12px",
                  }}
                >
                  {partner.name}
                </h4>

                <div
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: GOLD,
                    marginBottom: "8px",
                  }}
                >
                  {partner.country}
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "12px",
                    color: CREAM,
                    opacity: 0.4,
                  }}
                >
                  {partner.sector}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NETWORK */}
      <section
        style={{
          padding: isMobile ? "50px 20px" : "80px 40px",
          overflow: "hidden",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "36px",
              fontWeight: 300,
              color: CREAM,
              margin: 0,
            }}
          >
            Global Network
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "16px",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {COUNCILS.map((council, i) =>
            council.url ? (
              <a
                key={i}
                href={council.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "12px 24px",
                  border: "1px solid rgba(201,168,76,0.25)",
                  color: GOLD,
                  opacity: 0.8,
                  textDecoration: "none",
                }}
              >
                {council.name}
              </a>
            ) : (
              <span
                key={i}
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "12px 24px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: CREAM,
                  opacity: 0.6,
                }}
              >
                {council.name}
              </span>
            )
          )}
        </div>
      </section>

      <CTABanner
        heading="Interested in a Partnership?"
        subheading="Explore joint ventures, investment opportunities, or strategic alliances across Adgeco Group and the wider portfolio."
      />
      <Footer />
    </main>
  );
}
