"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GOLD = "#C9A84C";
const CREAM = "#F5F0E8";

export default function ContactPage() {
  const [loaded, setLoaded] = useState(false);
  const [formState, setFormState] = useState("idle");

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => setFormState("success"), 1500);
  };

  return (
    <main style={{ minHeight: "100vh", background: "#0A0A0A", overflowX: "hidden" }}>
      <Navbar />

      <section style={{
        padding: "240px 40px 140px",
        display: "flex",
        justifyContent: "center",
      }}>
        <div style={{
          maxWidth: "1200px", width: "100%",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "100px",
        }}>
          
          {/* Left: Info */}
          <div style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 1s ease 0.2s"
          }}>
            <h1 style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(48px, 6vw, 80px)",
              fontWeight: 300, color: CREAM,
              margin: "0 0 24px", lineHeight: 1
            }}>
              For Partnerships & <i style={{ color: GOLD }}>Enquiries.</i>
            </h1>
            <p style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "16px", fontWeight: 300, lineHeight: 1.8,
              color: CREAM, opacity: 0.7, margin: "0 0 60px"
            }}>
              Reach out regarding business alliances, philanthropic initiatives, or press inquiries.
            </p>

            <div style={{ marginBottom: "40px" }}>
              <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>General Email</div>
              <a href="mailto:contact@dekkak.com" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "18px", color: CREAM, textDecoration: "none" }}>contact@dekkak.com</a>
            </div>

            <div style={{ display: "flex", gap: "80px" }}>
              <div>
                <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>Abu Dhabi</div>
                <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: CREAM, opacity: 0.7, lineHeight: 1.6 }}>United Arab Emirates</div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>Marrakech</div>
                <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: CREAM, opacity: 0.7, lineHeight: 1.6 }}>Kingdom of Morocco</div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateX(0)" : "translateX(20px)",
            transition: "all 1s ease 0.4s",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            padding: "60px"
          }}>
            {formState === "success" ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "32px", color: GOLD, margin: "0 0 16px" }}>Message Received</h3>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: CREAM, opacity: 0.7 }}>Thank you for reaching out. A representative will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>Name</label>
                  <input type="text" required style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: "12px 0", color: CREAM, fontFamily: "var(--font-dm-sans)", fontSize: "14px", outline: "none", transition: "border-color 0.3s" }} onFocus={(e) => e.target.style.borderColor = GOLD} onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.2)"} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>Email</label>
                  <input type="email" required style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: "12px 0", color: CREAM, fontFamily: "var(--font-dm-sans)", fontSize: "14px", outline: "none", transition: "border-color 0.3s" }} onFocus={(e) => e.target.style.borderColor = GOLD} onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.2)"} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>Subject</label>
                  <select style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: "12px 0", color: CREAM, fontFamily: "var(--font-dm-sans)", fontSize: "14px", outline: "none" }}>
                    <option style={{ background: "#111" }}>Business Alliance</option>
                    <option style={{ background: "#111" }}>Philanthropic Inquiry</option>
                    <option style={{ background: "#111" }}>Press / Media</option>
                    <option style={{ background: "#111" }}>General Information</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>Message</label>
                  <textarea required rows={4} style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: "12px 0", color: CREAM, fontFamily: "var(--font-dm-sans)", fontSize: "14px", outline: "none", resize: "none", transition: "border-color 0.3s" }} onFocus={(e) => e.target.style.borderColor = GOLD} onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.2)"} />
                </div>
                
                <button type="submit" disabled={formState === "submitting"} style={{
                  background: formState === "submitting" ? "transparent" : GOLD,
                  color: formState === "submitting" ? GOLD : "#000",
                  border: `1px solid ${GOLD}`,
                  padding: "16px",
                  fontFamily: "var(--font-dm-sans)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase",
                  cursor: formState === "submitting" ? "default" : "pointer",
                  transition: "all 0.3s ease",
                  marginTop: "16px"
                }}>
                  {formState === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
