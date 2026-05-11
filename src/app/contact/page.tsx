"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useMobile } from "../hooks/useMobile";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";

const GOLD = "#C9A84C";
const CREAM = "var(--text-color)";

const SOCIALS = [
   {
    name: "WhatsApp",
    label: "WhatsApp",
    color: "#25D366",
    href: "https://wa.me/212618688888",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    label: "LinkedIn",
    color: "#0A66C2",
    href: "https://www.linkedin.com/in/mohamed-dekkak/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    label: "Instagram",
    color: "#E1306C",
    href: "https://www.instagram.com/mohameddekkak/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    name: "X",
    label: "X (Twitter)",
    color: "#000000",
    href: "https://x.com/MohamedDekkak1",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    label: "Facebook",
    color: "#1877F2",
    href: "https://web.facebook.com/MohamedDekkakOfficial",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    label: "YouTube",
    color: "#FF0000",
    href: "https://www.youtube.com/@MohamedDekkak1",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: "Flickr",
    label: "Flickr",
    color: "#FF0084",
    href: "https://www.flickr.com/photos/adgeco/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 12c0 3.074 2.494 5.568 5.568 5.568 3.075 0 5.569-2.494 5.569-5.568 0-3.075-2.494-5.568-5.569-5.568C2.494 6.432 0 8.925 0 12zm12.863 0c0 3.074 2.494 5.568 5.568 5.568C21.505 17.568 24 15.074 24 12c0-3.075-2.495-5.568-5.569-5.568-3.074 0-5.568 2.493-5.568 5.568z"/>
      </svg>
    ),
  },
 {
    name: "Pinterest",
    label: "Pinterest",
    color: "#E60023",
    href: "https://www.pinterest.com/mohameddekkak1/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
      </svg>
    ),
  },
];

export default function ContactPage() {
  const [loaded, setLoaded] = useState(false);
  const [formState, setFormState] = useState("idle");
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const captchaToken = useRef<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const isMobile = useMobile();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    const form = e.target as HTMLFormElement;

    if (!captchaToken.current) {
      alert("Please complete the CAPTCHA verification.");
      setFormState("idle");
      return;
    }

    const data = {
      name: (form.elements.namedItem("contact-name") as HTMLInputElement).value,
      email: (form.elements.namedItem("contact-email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("contact-subject") as HTMLSelectElement).value,
      message: (form.elements.namedItem("contact-message") as HTMLTextAreaElement).value,
      captchaToken: captchaToken.current,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setFormState("success");
      } else {
        setFormState("idle");
        alert("Failed to send message");
        // Reset captcha for next attempt
        captchaToken.current = null;
        turnstileRef.current?.reset();
      }
    } catch (err) {
      console.error(err);
      setFormState("idle");
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-color)", overflowX: "hidden" }}>
      <style>{`
        [data-theme="light"] nav { background: var(--bg-color) !important; }
        .contact-input::placeholder { color: color-mix(in srgb, var(--text-color) 40%, transparent) !important; }
      `}</style>
      <Navbar />

      <section style={{
        padding: isMobile ? "130px 20px 60px" : "240px 40px 140px",
        display: "flex",
        justifyContent: "center",
      }}>
        <div style={{
          maxWidth: "1200px", width: "100%",
          display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "40px" : "100px",
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
              color: CREAM, opacity: 0.7, margin: "0 0 40px"
            }}>
              Reach out regarding business alliances, philanthropic initiatives, or press inquiries.
            </p>

            {/* Submit Opportunity CTA */}
            <div style={{ marginBottom: "48px" }}>
              <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>Submit an Opportunity</div>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: CREAM, opacity: 0.7, lineHeight: 1.6, marginBottom: "16px" }}>
                Present your investment opportunity or partnership proposal directly to our office.
              </p>
              <a href="/submit-opportunity" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "transparent", border: `1px solid ${GOLD}`, padding: "12px 24px", color: GOLD, textDecoration: "none", fontFamily: "var(--font-dm-sans)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", transition: "all 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = "#000"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = GOLD; }}>
                Submit Opportunity
              </a>
            </div>

            {/* WhatsApp */}
            <div style={{ marginBottom: "48px" }}>
              <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>WhatsApp</div>
              <a href="/api/whatsapp" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "transparent", border: `1px solid ${GOLD}`, padding: "8px 16px", borderRadius: "2px", color: GOLD, textDecoration: "none", fontFamily: "var(--font-dm-sans)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.3s" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Connect on WhatsApp
              </a>
            </div>

            {/* Socials */}
            <div style={{ marginBottom: "48px" }}>
              <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "20px" }}>Follow</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {SOCIALS.map((social) => {
                  const isHovered = hoveredSocial === social.name;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setHoveredSocial(social.name)}
                      onMouseLeave={() => setHoveredSocial(null)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "10px 16px",
                        textDecoration: "none",
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: isHovered ? social.color : "color-mix(in srgb, var(--text-color) 60%, transparent)",
                        background: isHovered ? `${social.color}10` : "transparent",
                        border: `1px solid ${isHovered ? social.color : "transparent"}`,
                        borderRadius: "2px",
                        transition: "all 0.3s ease",
                        transform: isHovered ? "translateX(8px)" : "translateX(0)",
                        width: "fit-content",
                      }}
                    >
                      <span style={{
                        color: isHovered ? social.color : "color-mix(in srgb, var(--text-color) 40%, transparent)",
                        transition: "color 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                      }}>
                        {social.icon}
                      </span>
                      {social.label}
                      <span style={{
                        marginLeft: "auto",
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? "translateX(0)" : "translateX(-8px)",
                        transition: "all 0.3s ease",
                        fontSize: "14px",
                        color: social.color,
                      }}>→</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Locations */}
            <div style={{ display: "flex", gap: isMobile ? "32px" : "80px", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>Abu Dhabi</div>
                <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: CREAM, opacity: 0.7, lineHeight: 1.6 }}>United Arab Emirates</div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>Marrakech</div>
                <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: CREAM, opacity: 0.7, lineHeight: 1.6 }}>Kingdom of Morocco</div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>Madrid</div>
                <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: CREAM, opacity: 0.7, lineHeight: 1.6 }}>Kingdom of Spain</div>
              </div>
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
              <div style={{ textAlign: "center", padding: "60px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <style>{`
                  @keyframes letterDrop {
                    0%   { opacity: 0; transform: translateY(-32px); filter: blur(4px); }
                    60%  { opacity: 1; filter: blur(0); }
                    80%  { transform: translateY(4px); }
                    100% { opacity: 1; transform: translateY(0); filter: blur(0); }
                  }
                  @keyframes lineExpand {
                    from { transform: scaleX(0); opacity: 0; }
                    to   { transform: scaleX(1); opacity: 1; }
                  }
                  @keyframes successFadeUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                  }
                  @keyframes goldShimmer {
                    0%   { background-position: -300% center; }
                    100% { background-position: 300% center; }
                  }
                  @keyframes glowPulse {
                    0%, 100% { text-shadow: 0 0 20px rgba(201,168,76,0.2); }
                    50%       { text-shadow: 0 0 40px rgba(201,168,76,0.5), 0 0 80px rgba(201,168,76,0.1); }
                  }
                `}</style>

                {/* DEKKAK letter-by-letter */}
                <div style={{ display: "flex", gap: isMobile ? "6px" : "10px", marginBottom: "20px" }}>
                  {["D","E","K","K","A","K"].map((letter, i) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: isMobile ? "clamp(40px, 12vw, 64px)" : "clamp(52px, 6vw, 80px)",
                        fontWeight: 300,
                        letterSpacing: "0.05em",
                        background: `linear-gradient(90deg, #a07830, ${GOLD}, #f5e090, ${GOLD}, #a07830)`,
                        backgroundSize: "300% auto",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        opacity: 0,
                        display: "inline-block",
                        animation: `letterDrop 0.7s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.09}s forwards, goldShimmer 4s linear ${0.9 + i * 0.09}s infinite`,
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>

                {/* Gold hairline */}
                <div style={{
                  width: "100%",
                  height: "1px",
                  background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                  marginBottom: "32px",
                  transformOrigin: "center",
                  animation: "lineExpand 0.8s cubic-bezier(0.22,1,0.36,1) 0.7s both",
                }} />

                {/* Message Received */}
                <p style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: GOLD,
                  margin: "0 0 16px",
                  opacity: 0,
                  animation: "successFadeUp 0.6s ease-out 1s forwards",
                }}>
                  Message Received
                </p>

                {/* Body */}
                <p style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "14px",
                  lineHeight: 1.9,
                  color: CREAM,
                  opacity: 0,
                  maxWidth: "280px",
                  animation: "successFadeUp 0.6s ease-out 1.15s forwards",
                }}>
                  Thank you for reaching out.<br />A representative will be in contact shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                <div>
                  <label htmlFor="contact-name" style={{ display: "block", fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>Name</label>
                  <input id="contact-name" className="contact-input" type="text" required title="Your name" placeholder="Your full name" style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid color-mix(in srgb, var(--text-color) 20%, transparent)", padding: "12px 0", color: CREAM, fontFamily: "var(--font-dm-sans)", fontSize: "14px", outline: "none", transition: "border-color 0.3s" }} onFocus={(e) => e.target.style.borderColor = GOLD} onBlur={(e) => e.target.style.borderColor = "color-mix(in srgb, var(--text-color) 20%, transparent)"} />
                </div>
                <div>
                  <label htmlFor="contact-email" style={{ display: "block", fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>Email</label>
                  <input id="contact-email" className="contact-input" type="email" required title="Your email address" placeholder="your@email.com" style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid color-mix(in srgb, var(--text-color) 20%, transparent)", padding: "12px 0", color: CREAM, fontFamily: "var(--font-dm-sans)", fontSize: "14px", outline: "none", transition: "border-color 0.3s" }} onFocus={(e) => e.target.style.borderColor = GOLD} onBlur={(e) => e.target.style.borderColor = "color-mix(in srgb, var(--text-color) 20%, transparent)"} />
                </div>
                <div>
                  <label htmlFor="contact-subject" style={{ display: "block", fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>Subject</label>
                  <select id="contact-subject" className="contact-input" title="Select inquiry type" style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid color-mix(in srgb, var(--text-color) 20%, transparent)", padding: "12px 0", color: CREAM, fontFamily: "var(--font-dm-sans)", fontSize: "14px", outline: "none" }}>
                    <option style={{ background: "var(--bg-secondary)" }}>Business Alliance</option>
                    <option style={{ background: "var(--bg-secondary)" }}>Client</option>
                    <option style={{ background: "var(--bg-secondary)" }}>Philanthropic Inquiry</option>
                    <option style={{ background: "var(--bg-secondary)" }}>Press / Media</option>
                    <option style={{ background: "var(--bg-secondary)" }}>General Information</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-message" style={{ display: "block", fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "12px" }}>Message</label>
                  <textarea id="contact-message" className="contact-input" required rows={4} title="Your message" placeholder="Write your message here..." style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid color-mix(in srgb, var(--text-color) 20%, transparent)", padding: "12px 0", color: CREAM, fontFamily: "var(--font-dm-sans)", fontSize: "14px", outline: "none", resize: "none", transition: "border-color 0.3s" }} onFocus={(e) => e.target.style.borderColor = GOLD} onBlur={(e) => e.target.style.borderColor = "color-mix(in srgb, var(--text-color) 20%, transparent)"} />
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