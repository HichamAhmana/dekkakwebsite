"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GOLD = "#C9A84C";
const CREAM = "#F5F0E8";

const TIMELINE = [
  { year: "1987–1991", text: "Studies at European University (MBA in International Business & Marketing)" },
  { year: "1992", text: "Founds Adgeco Group in Abu Dhabi, UAE" },
  { year: "2007", text: "Founds Anouar Association (January 5) in Morocco" },
  { year: "2010", text: "Adgeco launches major strategic alliance with Valoriza/Sacyr (Spain)" },
  { year: "2012", text: "Adgeco completes Civil Works for Oil Terminal 2, Port Fujairah & Khalifa Port project" },
  { year: "2021", text: "Anouar Association runs art workshops for children with disabilities in Ait Faska" },
  { year: "2022", text: "Participates in SBCC Summit, Marrakech (partnered with UNICEF, USAID, Save the Children)" },
  { year: "Present", text: "Active across UAE, Morocco, Europe, Latin America, Africa, Vietnam, Korea" },
];

export default function AboutPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#0A0A0A", overflowX: "hidden" }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        position: "relative",
        padding: "180px 40px 100px",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at 70% 30%, rgba(201,168,76,0.05) 0%, transparent 60%)",
          pointerEvents: "none"
        }} />

        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center"
        }}>
          {/* Left: Text */}
          <div style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 1s ease 0.2s"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
              <div style={{ width: "40px", height: "1px", background: GOLD }} />
              <span style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "10px", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD
              }}>Biography</span>
            </div>
            
            <h1 style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(48px, 6vw, 96px)",
              fontWeight: 300, color: CREAM,
              margin: "0 0 40px", lineHeight: 1.05,
              letterSpacing: "-0.01em"
            }}>
              From Marrakech to Abu Dhabi to <i style={{ color: GOLD }}>the World.</i>
            </h1>

            <p style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "16px", fontWeight: 300, lineHeight: 1.8,
              color: CREAM, opacity: 0.7, margin: "0 0 24px"
            }}>
              Mohamed Dekkak was born and raised in a modest family in Marrakech, Morocco. This origin is not just a detail—it is the beginning of a genuine arc: a man who started with nothing in one of Morocco's oldest cities and built a cross-continental business and humanitarian empire.
            </p>
            <p style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "16px", fontWeight: 300, lineHeight: 1.8,
              color: CREAM, opacity: 0.7, margin: "0"
            }}>
              Although born Moroccan, he expatriated and emerged through the Arab world as Chairman and Founder of Adgeco Group. Being multilingual—fluent in Arabic, French, and English—attributed enormously to how this transpired, allowing him to build deals in the Gulf, negotiate in Europe, and organize initiatives in Latin America.
            </p>
          </div>

          {/* Right: Portrait Placeholder */}
          <div style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateX(0)" : "translateX(20px)",
            transition: "all 1s ease 0.4s",
            position: "relative"
          }}>
            <div style={{
              width: "100%", aspectRatio: "3/4",
              background: "#111",
              border: `1px solid rgba(201,168,76,0.2)`,
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(45deg, transparent, rgba(201,168,76,0.1), transparent)`,
              }} />
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "11px", letterSpacing: "0.2em", color: GOLD, opacity: 0.5,
                textTransform: "uppercase"
              }}>
                [Portrait Placeholder]
              </div>
            </div>
            {/* Accent lines */}
            <div style={{ position: "absolute", bottom: "-20px", left: "-20px", width: "100px", height: "1px", background: GOLD }} />
            <div style={{ position: "absolute", bottom: "-20px", left: "-20px", width: "1px", height: "100px", background: GOLD }} />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section style={{ padding: "120px 40px", background: "#0D0C0A", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "48px", fontWeight: 300, color: CREAM,
            margin: "0 0 80px", textAlign: "center"
          }}>The Journey</h2>

          <div style={{ position: "relative" }}>
            {/* Vertical Line */}
            <div style={{
              position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px",
              background: `linear-gradient(to bottom, transparent, ${GOLD}44, transparent)`,
              transform: "translateX(-50%)"
            }} />

            {TIMELINE.map((item, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: i % 2 === 0 ? "flex-start" : "flex-end",
                marginBottom: "60px",
                position: "relative",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.8s ease ${0.6 + i * 0.1}s`
              }}>
                {/* Dot */}
                <div style={{
                  position: "absolute", left: "50%", top: "50%",
                  width: "12px", height: "12px", borderRadius: "50%",
                  background: GOLD, transform: "translate(-50%, -50%)",
                  boxShadow: `0 0 0 4px #0D0C0A, 0 0 0 5px ${GOLD}66`
                }} />

                <div style={{
                  width: "calc(50% - 60px)",
                  textAlign: i % 2 === 0 ? "right" : "left",
                  padding: "24px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  position: "relative"
                }}>
                  <div style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em",
                    color: GOLD, marginBottom: "12px"
                  }}>{item.year}</div>
                  <p style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "14px", fontWeight: 300, lineHeight: 1.6,
                    color: CREAM, margin: 0, opacity: 0.8
                  }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
