"use client";

import { useState } from "react";
import Link from "next/link";

const GOLD = "#C9A84C";
const CREAM = "var(--text-color)";

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohameddekkak/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/MohamedDekkak1",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.262 5.638L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://web.facebook.com/MohamedDekkakOfficial",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

function CTAButton({ href, label, primary }: { href: string; label: string; primary?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
        padding: "16px 40px",
        background: primary
          ? hovered ? "#E8C97A" : GOLD
          : "transparent",
        border: primary
          ? "none"
          : `1px solid ${hovered ? GOLD : "rgba(201,168,76,0.35)"}`,
        color: primary
          ? "#0A0A0A"
          : hovered ? GOLD : CREAM,
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.22em",
        textTransform: "uppercase" as const,
        textDecoration: "none",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered && primary
          ? "0 12px 40px rgba(201,168,76,0.3)"
          : hovered
            ? "0 8px 24px rgba(0,0,0,0.2)"
            : "none",
        whiteSpace: "nowrap" as const,
      }}
    >
      {label}
      <span style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "22px",
        height: "22px",
        borderRadius: "50%",
        border: primary ? "1px solid rgba(10,10,10,0.25)" : `1px solid ${hovered ? GOLD : "rgba(201,168,76,0.3)"}`,
        transition: "transform 0.3s ease",
        transform: hovered ? "translateX(4px)" : "translateX(0)",
      }}>→</span>
    </Link>
  );
}

function SocialIcon({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        border: `1px solid ${hovered ? GOLD : "rgba(201,168,76,0.25)"}`,
        borderRadius: "50%",
        color: hovered ? GOLD : CREAM,
        opacity: hovered ? 1 : 0.55,
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {icon}
    </a>
  );
}

interface CTABannerProps {
  heading?: string;
  subheading?: string;
}

export default function CTABanner({
  heading = "Ready to Collaborate?",
  subheading = "Explore partnership opportunities or reach out directly to discuss your vision.",
}: CTABannerProps) {
  return (
    <section
      style={{
        position: "relative",
        background: "var(--bg-color)",
        overflow: "hidden",
        padding: "100px 40px",
        textAlign: "center",
      }}
    >
      {/* Ambient gold glow */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "700px",
        height: "300px",
        background: `radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Top gold rule */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        marginBottom: "48px",
      }}>
        <div style={{ flex: 1, maxWidth: "120px", height: "1px", background: `linear-gradient(90deg, transparent, ${GOLD}66)` }} />
        <span style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          color: GOLD,
          opacity: 0.7,
        }}>
          Let&apos;s Work Together
        </span>
        <div style={{ flex: 1, maxWidth: "120px", height: "1px", background: `linear-gradient(90deg, ${GOLD}66, transparent)` }} />
      </div>

      {/* Heading */}
      <h2 style={{
        fontFamily: "var(--font-cormorant), serif",
        fontSize: "clamp(36px, 6vw, 72px)",
        fontWeight: 300,
        color: CREAM,
        margin: "0 0 20px",
        lineHeight: 1.05,
        letterSpacing: "-0.01em",
        position: "relative",
      }}>
        {heading}
      </h2>

      {/* Subheading */}
      <p style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "15px",
        fontWeight: 300,
        lineHeight: 1.8,
        color: CREAM,
        opacity: 0.6,
        maxWidth: "540px",
        margin: "0 auto 52px",
        position: "relative",
      }}>
        {subheading}
      </p>

      {/* CTA Buttons */}
      <div style={{
        display: "flex",
        gap: "16px",
        justifyContent: "center",
        flexWrap: "wrap",
        marginBottom: "52px",
        position: "relative",
      }}>
        <CTAButton href="/submit-opportunity" label="Collaborate on a Project" primary />
        <CTAButton href="/contact" label="Get in Touch" />
      </div>

      {/* Social links */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        position: "relative",
      }}>
        <span style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "9px",
          fontWeight: 600,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: GOLD,
          opacity: 0.5,
          marginRight: "8px",
        }}>
          Follow
        </span>
        {SOCIALS.map((s) => (
          <SocialIcon key={s.href} href={s.href} label={s.label} icon={s.icon} />
        ))}
      </div>
    </section>
  );
}
