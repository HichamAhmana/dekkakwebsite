"use client";
import { useState } from "react";
import Link from "next/link";
import { useMobile } from "../hooks/useMobile";

const GOLD = "#C9A84C";
const CREAM = "var(--text-color)";

const NAVIGATE = [
  { label: "Business",      href: "/business" },
  { label: "Impact",        href: "/impact" },
  { label: "Services",      href: "/services" },
  { label: "Gallery",       href: "/gallery" },
  { label: "Blog",      href: "/blog" },
  { label: "About",         href: "/about" },
  { label: "Orchid Island", href: "/orchid-island" },
  { label: "Contact",       href: "/contact" },
];

const VENTURES = [
  { label: "Adgeco Group",  href: "/business" },
  { label: "Foundations",   href: "/impact" },
  { label: "Orchid Island", href: "/orchid-island" }, 
  { label: "Advisory Work", href: "/about" },
];

const SOCIALS = [
  { label: "LinkedIn",      href: "https://www.linkedin.com/in/mohameddekkak/" },
  { label: "Instagram",     href: "https://www.instagram.com/mohameddekkak/" },
  { label: "X",             href: "https://x.com/MohamedDekkak1" },
  { label: "Facebook",      href: "https://web.facebook.com/MohamedDekkakOfficial/?_rdc=1&_rdr#" },
  { label: "Pinterest",     href: "https://www.pinterest.com/dekkak/" },
  { label: "YouTube",       href: "https://www.youtube.com/user/AdgecoGroup" },
  { label: "Flickr",       href: "https://www.flickr.com/photos/adgeco/" },
];

function FooterLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      target={href.startsWith("http") || href === "#" ? "_blank" : undefined}
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "12px",
        fontWeight: 400,
        letterSpacing: "0.1em",
        color: hovered ? GOLD : CREAM,
        opacity: hovered ? 1 : 0.5,
        marginBottom: "14px",
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
              opacity: 0.45,
            }}>
              Marrakech, Kingdom of Morocco<br />
              Abu Dhabi, United Arab Emirates<br />
              Madrid, Spain<br />
              The World
              <br /> <br />
              <a
                href={`mailto:${String.fromCharCode(99, 111, 110, 116, 97, 99, 116, 64, 100, 101, 107, 107, 97, 107, 46, 99, 111, 109)}`}
                style={{ color: "inherit", opacity: 1, transition: "color 0.3s" }}
                dangerouslySetInnerHTML={{ __html: "&#99;&#111;&#110;&#116;&#97;&#99;&#116;&#64;&#100;&#101;&#107;&#107;&#97;&#107;&#46;&#99;&#111;&#109;" }}
              />
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
              {SOCIALS.map((l) => <FooterLink key={l.href + l.label} label={l.label} href={l.href} />)}
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
            opacity: 0.35,
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
            opacity: 0.5,
          }}>
            MARRAKECH · ABU DHABI · MADRID · THE WORLD
          </span>
        </div>
      </div>
    </footer>
  );
}
