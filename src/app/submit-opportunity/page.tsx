"use client";
import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useMobile } from "../hooks/useMobile";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";

const GOLD = "#C9A84C";
const CREAM = "var(--text-color)";

export default function SubmitOpportunityPage() {
  const [loaded, setLoaded] = useState(false);
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const captchaToken = useRef<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const isMobile = useMobile();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit.");
        e.target.value = "";
        setFileName(null);
      } else {
        setFileName(file.name);
      }
    } else {
      setFileName(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    const form = e.target as HTMLFormElement;

    if (!captchaToken.current) {
      alert("Please complete the CAPTCHA verification.");
      setFormState("idle");
      return;
    }

    const formData = new FormData(form);
    
    // We are converting to JSON to send to API. For file upload, ideally we'd send multipart/form-data.
    // However, Resend needs the file as base64 or URL. For now, since the user asked to send via Resend,
    // we'll extract text fields and read the file as base64.
    const data: Record<string, unknown> = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      opportunityType: formData.get("opportunityType"),
      location: formData.get("location"),
      dealSize: formData.get("dealSize"),
      description: formData.get("description"),
      confidentiality: formData.get("confidentiality") === "on",
      captchaToken: captchaToken.current,
      website: formData.get("website"), // honeypot
    };

    const file = formData.get("pitchDeck") as File | null;
    if (file && file.size > 0) {
      const buffer = await file.arrayBuffer();
      // Use Buffer to create base64 string
      const base64File = Buffer.from(buffer).toString('base64');
      data.attachment = {
        filename: file.name,
        type: file.type,
        content: base64File
      };
    }

    try {
      const res = await fetch("/api/submit-opportunity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setFormState("success");
      } else {
        setFormState("idle");
        const errorData = await res.json().catch(() => ({ error: "Failed to submit opportunity" }));
        alert(errorData.error || "Failed to submit opportunity");
        // Reset captcha for next attempt
        captchaToken.current = null;
        turnstileRef.current?.reset();
      }
    } catch (err) {
      console.error(err);
      setFormState("idle");
      alert("An error occurred while submitting.");
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-color)", overflowX: "hidden" }}>
      <style>{`
        [data-theme="light"] nav { background: var(--bg-color) !important; }
        .opp-input::placeholder { color: color-mix(in srgb, var(--text-color) 40%, transparent) !important; }
        
        .file-upload-wrapper {
          position: relative;
          overflow: hidden;
          display: inline-block;
          cursor: pointer;
        }
        
        .file-upload-wrapper input[type=file] {
          font-size: 100px;
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
          cursor: pointer;
        }
      `}</style>
      <Navbar />

      <section style={{
        padding: isMobile ? "130px 20px 60px" : "240px 40px 140px",
        display: "flex",
        justifyContent: "center",
      }}>
        <div style={{
          maxWidth: "1200px", width: "100%",
          display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr", gap: isMobile ? "40px" : "100px",
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
              margin: "0 0 24px", lineHeight: 1.1
            }}>
              Submit an <br /><i style={{ color: GOLD }}>Opportunity.</i>
            </h1>
            <p style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "16px", fontWeight: 300, lineHeight: 1.8,
              color: CREAM, opacity: 0.7, margin: "0 0 60px",
              maxWidth: "480px"
            }}>
              Present your investment opportunity, partnership proposal, or off-market asset directly to Mohamed Dekkak&apos;s office. All submissions are reviewed confidentially.
            </p>
            
            <div style={{ display: "flex", alignItems: "center", gap: "16px", opacity: 0.5 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: CREAM }}>
                Secure & Confidential
              </span>
            </div>
          </div>

          {/* Right: Form */}
          <div style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateX(0)" : "translateX(20px)",
            transition: "all 1s ease 0.4s",
            background: "color-mix(in srgb, var(--text-color) 2%, transparent)",
            border: "1px solid color-mix(in srgb, var(--text-color) 5%, transparent)",
            padding: isMobile ? "28px 20px" : "60px"
          }}>
            {formState === "success" ? (
              <div style={{ textAlign: "center", padding: "60px 20px", display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "center" }}>
                <style>{`
                  @keyframes successFadeUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                  }
                `}</style>

                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "24px", opacity: 0, animation: "successFadeUp 0.6s ease-out forwards" }}>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>

                <p style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: GOLD,
                  margin: "0 0 16px",
                  opacity: 0,
                  animation: "successFadeUp 0.6s ease-out 0.2s forwards",
                }}>
                  Submission Received
                </p>

                <p style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "15px",
                  lineHeight: 1.9,
                  color: CREAM,
                  opacity: 0,
                  maxWidth: "320px",
                  animation: "successFadeUp 0.6s ease-out 0.4s forwards",
                }}>
                  Your opportunity has been received. Our office will review your submission and respond within 5 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                {/* Honeypot field - hidden */}
                <input type="text" name="website" title="Website URL" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "32px" }}>
                  <div>
                    <label htmlFor="name" style={{ display: "block", fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>Full Name *</label>
                    <input id="name" name="name" className="opp-input" type="text" required placeholder="Your full name" style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid color-mix(in srgb, var(--text-color) 20%, transparent)", padding: "12px 0", color: CREAM, fontFamily: "var(--font-dm-sans)", fontSize: "14px", outline: "none", transition: "border-color 0.3s" }} onFocus={(e) => e.target.style.borderColor = GOLD} onBlur={(e) => e.target.style.borderColor = "color-mix(in srgb, var(--text-color) 20%, transparent)"} />
                  </div>
                  <div>
                    <label htmlFor="email" style={{ display: "block", fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>Email *</label>
                    <input id="email" name="email" className="opp-input" type="email" required placeholder="your@email.com" style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid color-mix(in srgb, var(--text-color) 20%, transparent)", padding: "12px 0", color: CREAM, fontFamily: "var(--font-dm-sans)", fontSize: "14px", outline: "none", transition: "border-color 0.3s" }} onFocus={(e) => e.target.style.borderColor = GOLD} onBlur={(e) => e.target.style.borderColor = "color-mix(in srgb, var(--text-color) 20%, transparent)"} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "32px" }}>
                  <div>
                    <label htmlFor="company" style={{ display: "block", fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>Company / Organization</label>
                    <input id="company" name="company" className="opp-input" type="text" placeholder="Optional" style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid color-mix(in srgb, var(--text-color) 20%, transparent)", padding: "12px 0", color: CREAM, fontFamily: "var(--font-dm-sans)", fontSize: "14px", outline: "none", transition: "border-color 0.3s" }} onFocus={(e) => e.target.style.borderColor = GOLD} onBlur={(e) => e.target.style.borderColor = "color-mix(in srgb, var(--text-color) 20%, transparent)"} />
                  </div>
                  <div>
                    <label htmlFor="location" style={{ display: "block", fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>Location / Market</label>
                    <input id="location" name="location" className="opp-input" type="text" placeholder="e.g. Dubai, London, Global" style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid color-mix(in srgb, var(--text-color) 20%, transparent)", padding: "12px 0", color: CREAM, fontFamily: "var(--font-dm-sans)", fontSize: "14px", outline: "none", transition: "border-color 0.3s" }} onFocus={(e) => e.target.style.borderColor = GOLD} onBlur={(e) => e.target.style.borderColor = "color-mix(in srgb, var(--text-color) 20%, transparent)"} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "32px" }}>
                  <div>
                    <label htmlFor="opportunityType" style={{ display: "block", fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>Opportunity Type *</label>
                    <select id="opportunityType" name="opportunityType" required defaultValue="" className="opp-input" style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid color-mix(in srgb, var(--text-color) 20%, transparent)", padding: "12px 0", color: CREAM, fontFamily: "var(--font-dm-sans)", fontSize: "14px", outline: "none" }}>
                      <option value="" disabled style={{ background: "var(--bg-color)" }}>Select Type</option>
                      <option value="Real Estate Asset" style={{ background: "var(--bg-color)" }}>Real Estate Asset</option>
                      <option value="Hotel / Hospitality Project" style={{ background: "var(--bg-color)" }}>Hotel / Hospitality Project</option>
                      <option value="Investment Partnership" style={{ background: "var(--bg-color)" }}>Investment Partnership</option>
                      <option value="M&A Transaction" style={{ background: "var(--bg-color)" }}>M&A Transaction</option>
                      <option value="Strategic Alliance" style={{ background: "var(--bg-color)" }}>Strategic Alliance</option>
                      <option value="Sovereign AI / Data Infrastructure" style={{ background: "var(--bg-color)" }}>Sovereign AI / Data Infrastructure</option>
                      <option value="Family Office Opportunity" style={{ background: "var(--bg-color)" }}>Family Office Opportunity</option>
                      <option value="Other" style={{ background: "var(--bg-color)" }}>Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="dealSize" style={{ display: "block", fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>Deal Size *</label>
                    <select id="dealSize" name="dealSize" required defaultValue="" className="opp-input" style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid color-mix(in srgb, var(--text-color) 20%, transparent)", padding: "12px 0", color: CREAM, fontFamily: "var(--font-dm-sans)", fontSize: "14px", outline: "none" }}>
                      <option value="" disabled style={{ background: "var(--bg-color)" }}>Select Size</option>
                      <option value="Under $1M" style={{ background: "var(--bg-color)" }}>Under $1M</option>
                      <option value="$1M - $10M" style={{ background: "var(--bg-color)" }}>$1M - $10M</option>
                      <option value="$10M - $50M" style={{ background: "var(--bg-color)" }}>$10M - $50M</option>
                      <option value="$50M - $100M" style={{ background: "var(--bg-color)" }}>$50M - $100M</option>
                      <option value="$100M+" style={{ background: "var(--bg-color)" }}>$100M+</option>
                      <option value="Undisclosed" style={{ background: "var(--bg-color)" }}>Undisclosed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" style={{ display: "block", fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>Brief Description *</label>
                  <textarea id="description" name="description" className="opp-input" required rows={4} placeholder="Provide a high-level overview of the opportunity..." style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid color-mix(in srgb, var(--text-color) 20%, transparent)", padding: "12px 0", color: CREAM, fontFamily: "var(--font-dm-sans)", fontSize: "14px", outline: "none", resize: "none", transition: "border-color 0.3s" }} onFocus={(e) => e.target.style.borderColor = GOLD} onBlur={(e) => e.target.style.borderColor = "color-mix(in srgb, var(--text-color) 20%, transparent)"} />
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>Upload Pitch Deck (Optional)</label>
                  <div className="file-upload-wrapper" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{
                      padding: "10px 20px",
                      border: `1px dashed color-mix(in srgb, var(--text-color) 30%, transparent)`,
                      color: "color-mix(in srgb, var(--text-color) 70%, transparent)",
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      cursor: "pointer",
                      transition: "border-color 0.3s",
                    }} onMouseEnter={(e) => e.currentTarget.style.borderColor = GOLD} onMouseLeave={(e) => e.currentTarget.style.borderColor = "color-mix(in srgb, var(--text-color) 30%, transparent)"}>
                      Select File
                    </div>
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: CREAM, opacity: 0.6 }}>
                      {fileName || "PDF, DOCX, PPTX (Max 10MB)"}
                    </span>
                    <input type="file" name="pitchDeck" title="Upload Pitch Deck" accept=".pdf,.doc,.docx,.ppt,.pptx" onChange={handleFileChange} />
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginTop: "10px" }}>
                  <input type="checkbox" id="confidentiality" name="confidentiality" required style={{ marginTop: "4px", accentColor: GOLD }} />
                  <label htmlFor="confidentiality" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: CREAM, opacity: 0.8, lineHeight: 1.5, cursor: "pointer" }}>
                    I confirm this submission is confidential and agree to the terms of engagement.
                  </label>
                </div>

                <div>
                  {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                      options={{ theme: "dark", size: "flexible" }}
                      onSuccess={(token) => { captchaToken.current = token; }}
                      onExpire={() => { captchaToken.current = null; }}
                      onError={() => { captchaToken.current = null; }}
                    />
                  ) : (
                    <div style={{ color: "red", padding: "10px", border: "1px solid red" }}>
                      Turnstile site key not configured
                    </div>
                  )}
                </div>

                <button type="submit" disabled={formState === "submitting"} style={{
                  background: formState === "submitting" ? "transparent" : GOLD,
                  color: formState === "submitting" ? GOLD : "#000",
                  border: `1px solid ${GOLD}`,
                  padding: "16px",
                  fontFamily: "var(--font-dm-sans)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase",
                  cursor: formState === "submitting" ? "default" : "pointer",
                  transition: "all 0.3s ease",
                  marginTop: "8px"
                }}>
                  {formState === "submitting" ? "Submitting..." : "Submit Opportunity"}
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
