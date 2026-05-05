"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

const GOLD = "#C9A84C";
const CREAM = "var(--text-color)";

export default function HealthcarePage() {
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
        padding: "200px 40px 120px",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        position: "relative"
      }}>
        {/* Abstract medical cross background element */}
        <div style={{
          position: "absolute", top: "20%", right: "10%", opacity: 0.03, pointerEvents: "none"
        }}>
          <div style={{ width: "300px", height: "100px", background: GOLD, position: "absolute", top: "100px", left: 0 }} />
          <div style={{ width: "100px", height: "300px", background: GOLD, position: "absolute", top: 0, left: "100px" }} />
        </div>

        <div style={{
          maxWidth: "1200px", margin: "0 auto", width: "100%",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center"
        }}>
          <div style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 1s ease 0.2s"
          }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
              <div style={{ width: "40px", height: "1px", background: GOLD }} />
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD }}>
                Healthcare Innovation
              </span>
            </div>
            <h1 style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(48px, 6vw, 80px)",
              fontWeight: 300, color: CREAM,
              margin: "0 0 32px", lineHeight: 1.1
            }}>
              Elevating Human Life Through <i style={{ color: GOLD }}>Infrastructure.</i>
            </h1>
            <p style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "16px", fontWeight: 300, lineHeight: 1.8,
              color: CREAM, opacity: 0.7
            }}>
              Through large-scale investments like the American Medical City in Marrakech and grassroots health initiatives across the Sahara and rural Morocco, the commitment to healthcare bridges cutting-edge infrastructure with community care.
            </p>
          </div>

          {/* Hero Image  */}
                <div style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    position: "relative",
                    overflow: "hidden",
                    opacity: loaded ? 1 : 0,
                    transform: loaded ? "translateX(0)" : "translateX(20px)",
                        transition: "all 1s ease 0.4s",
                            }}>
                <Image
                    src="/Mohamed-dekkak-healthcare.png"
                    alt="Mohamed Dekkak healthcare"
                      fill
                    style={{ 
                    objectFit: "cover",
                    border: `1px solid rgba(201,168,76,0.2)`,
                    borderRadius: "4px", // optional
                            }}
                      onLoad={() => setLoaded(true)}
                      priority
                     />
        </div>
        </div>
      </section>

      {/* Flagship Project */}
      <section style={{ padding: "120px 40px", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "48px", fontWeight: 300, color: CREAM, margin: "0 0 24px" }}>The American Medical City – Marrakech</h2>
          <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "16px", fontWeight: 300, lineHeight: 1.8, color: CREAM, opacity: 0.7, marginBottom: "60px" }}>
            As a Founding Partner, Mohamed Dekkak is instrumental in this city-scale infrastructure project aimed at bringing advanced medical facilities, research, and world-class care to the heart of Morocco.
          </p>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {["Advanced Research", "World-Class Facilities", "Regional Impact"].map((item, i) => (
              <div key={i} style={{
                padding: "40px 24px", background: "var(--bg-color)", border: "1px solid rgba(255,255,255,0.05)"
              }}>
                <div style={{ width: "32px", height: "1px", background: GOLD, margin: "0 auto 24px" }} />
                <h4 style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: CREAM }}>{item}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philanthropic Healthcare */}
      <section style={{ padding: "120px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "40px", fontWeight: 300, color: CREAM, margin: "0" }}>Community Health Initiatives</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
            <div style={{ padding: "48px", background: "rgba(201,168,76,0.03)", border: "1px solid rgba(201,168,76,0.1)" }}>
              <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", fontWeight: 400, color: CREAM, margin: "0 0 16px" }}>Sahara Spirit Foundation</h3>
              <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "15px", fontWeight: 300, lineHeight: 1.8, color: CREAM, opacity: 0.8, margin: 0 }}>
                Developing the Sahara region of Morocco with a dedicated focus on healthcare access, ensuring remote communities receive the medical attention and resources necessary for sustainable growth.
              </p>
            </div>
            <div style={{ padding: "48px", background: "rgba(201,168,76,0.03)", border: "1px solid rgba(201,168,76,0.1)" }}>
              <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", fontWeight: 400, color: CREAM, margin: "0 0 16px" }}>Anouar Association</h3>
              <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "15px", fontWeight: 300, lineHeight: 1.8, color: CREAM, opacity: 0.8, margin: 0 }}>
                Serving underprivileged children and uncared-for elders in Ait Faska, focusing heavily on health and sustenance. The association is committed to the physical well-being of the most vulnerable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
