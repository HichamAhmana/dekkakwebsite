"use client";
import { useState } from "react";
import Link from "next/link";
import { useMobile } from "../hooks/useMobile";

import { GOLD, CREAM } from "../constants";

const NAVIGATE = [
  { label: "Business",      href: "/business" },
  { label: "Impact",        href: "/impact" },
  { label: "Services",      href: "/services" },
  { label: "Gallery",       href: "/gallery" },
  { label: "Blog",          href: "/blog" },
  { label: "About",         href: "/about" },
  { label: "Orchid Island", href: "/orchid-island" },
  { label: "Submit Opportunity", href: "/submit-opportunity" },
  { label: "Contact",       href: "/contact" },
];

const VENTURES = [
  { label: "Adgeco Group",  href: "/business" },
  { label: "Foundations",   href: "/impact" },
  { label: "Orchid Island", href: "/orchid-island" },
  { label: "Advisory Work", href: "/about" },
];

const SOCIALS = [
  { label: "WhatsApp",  href: "/api/whatsapp", color: "#25D366" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/mohameddekkak/",                              color: "#0A66C2" },
  { label: "Instagram", href: "https://www.instagram.com/mohameddekkak/",                                color: "#E1306C" },
  { label: "X",         href: "https://x.com/MohamedDekkak1",                                           color: "var(--text-color)" },
  { label: "Facebook",  href: "https://web.facebook.com/MohamedDekkakOfficial",            color: "#1877F2" },
  { label: "Pinterest", href: "https://www.pinterest.com/dekkak/",                                       color: "#E60023" },
  { label: "YouTube",   href: "https://www.youtube.com/@MohamedDekkak1",                                color: "#FF0000" },
  { label: "Flickr",    href: "https://www.flickr.com/photos/adgeco/",                                   color: "#FF0084" },
                                                            
];

function FooterLink({ label, href, hoverColor }: { label: string; href: string; hoverColor?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      target={href.startsWith("http") || href === "#" ? "_blank" : undefined}
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        minHeight: "44px",
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "12px",
        fontWeight: 400,
        letterSpacing: "0.1em",
        color: hovered ? (hoverColor || GOLD) : CREAM,
        opacity: hovered ? 1 : 0.65,
        marginBottom: "2px",
        transition: "color 0.3s ease, opacity 0.3s ease",
      }}
    >
      {label}
    </Link>
  );
}

export default function Footer() {
  const isMobile = useMobile();
  return (
    <footer style={{
      width: "100%",
      background: "var(--bg-color)",
      borderTop: "1px solid rgba(201,168,76,0.12)",
      padding: isMobile ? "48px 20px 32px" : "64px 40px 40px",
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

        {/* Top row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.5fr 2fr",
          gap: isMobile ? "40px" : "80px",
          marginBottom: "48px",
        }}>
          {/* Left */}
          <div>
            <div style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "32px",
              fontWeight: 300,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              color: CREAM,
              marginBottom: "28px",
            }}>
              DEKKAK
            </div>
            <address style={{
              fontStyle: "normal",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "13px",
              fontWeight: 300,
              lineHeight: 2,
              color: CREAM,
              opacity: 0.6,
            }}>
              Marrakech, Kingdom of Morocco<br />
              Abu Dhabi, United Arab Emirates<br />
              Madrid, Spain<br />
              The World
            </address>
          </div>

          {/* Right — three link columns */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr", gap: isMobile ? "32px" : "40px" }}>
            <div>
              <div style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.3em",
                textTransform: "uppercase" as const,
                color: GOLD,
                marginBottom: "24px",
              }}>
                Navigate
              </div>
              {NAVIGATE.map((l) => <FooterLink key={l.href + l.label} label={l.label} href={l.href} />)}
            </div>
            <div>
              <div style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.3em",
                textTransform: "uppercase" as const,
                color: GOLD,
                marginBottom: "24px",
              }}>
                Ventures
              </div>
              {VENTURES.map((l) => <FooterLink key={l.href + l.label} label={l.label} href={l.href} />)}
            </div>
            <div>
              <div style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.3em",
                textTransform: "uppercase" as const,
                color: GOLD,
                marginBottom: "24px",
              }}>
                Connect
              </div>
              {SOCIALS.map((l) => (
                <FooterLink key={l.href + l.label} label={l.label} href={l.href} hoverColor={l.color} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          borderTop: "1px solid rgba(201,168,76,0.1)",
          paddingTop: "28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}>
          <span style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "11px",
            color: CREAM,
            opacity: 0.6,
            letterSpacing: "0.05em",
          }}>
            © {new Date().getFullYear()} Mohamed Dekkak. All rights reserved by Dekkak.com.
          </span>
          <span style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.3em",
            textTransform: "uppercase" as const,
            color: GOLD,
            opacity: 0.65,
          }}>
            MARRAKECH · ABU DHABI · MADRID · THE WORLD
          </span>
        </div>
      </div>
    </footer>
  );
}