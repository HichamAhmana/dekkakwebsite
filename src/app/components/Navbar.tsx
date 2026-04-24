"use client";
import { useState, useEffect } from "react";
import Link from "next/link";


const GOLD = "#C9A84C";
const CREAM = "var(--nav-text)";

const NAV_LINKS = [
  { label: "BUSINESS",      href: "/business" },
  { label: "IMPACT",        href: "/impact" },
  { label: "SERVICES",      href: "/services" },
  { label: "BLOG",          href: "/blog" },
  { label: "GALLERY",       href: "/gallery" },
  { label: "ABOUT",         href: "/about" },
  { label: "ORCHID ISLAND", href: "/orchid-island" },
  { label: "CONTACT",       href: "/contact" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: hovered ? GOLD : CREAM,
        opacity: hovered ? 1 : 0.7,
        whiteSpace: "nowrap",
        transition: "color 0.3s ease, opacity 0.3s ease",
      }}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);


  const barBase: React.CSSProperties = {
    display: "block", width: "24px", height: "1px",
    background: CREAM, transition: "transform 0.3s ease, opacity 0.3s ease",
  };

  /* ── SCROLLED: single compact row ── */
  if (scrolled) {
    return (
      <nav style={{
        position: "fixed", top: 0, left: 0, width: "100%", zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px", height: "64px",
        background: "var(--nav-bg)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--border-color)",
        transition: "all 0.4s ease",
      }}>
        <Link href="/" style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "20px", letterSpacing: "0.25em",
          textTransform: "uppercase", color: CREAM,
        }}>DEKKAK</Link>

        {/* Desktop */}
        <div className="nav-desktop" style={{ gap: "40px", alignItems: "center" }}>
          {NAV_LINKS.map((l) => <NavLink key={l.href} href={l.href} label={l.label} />)}
        </div>

        {/* Hamburger */}
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", flexDirection: "column", gap: "5px" }}>
          <span style={{ ...barBase, transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none" }} />
          <span style={{ ...barBase, opacity: menuOpen ? 0 : 1 }} />
          <span style={{ ...barBase, transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none" }} />
        </button>

        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </nav>
    );
  }

  /* ── AT TOP: two-row centered editorial navbar ── */
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, width: "100%", zIndex: 100,
      background: "transparent",
      opacity: loaded ? 1 : 0,
      transform: loaded ? "translateY(0)" : "translateY(-10px)",
      transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
    }}>
      {/* Row 1 — Logo */}
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        padding: "22px 48px 18px",
      }}>
        <Link href="/" style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "22px", letterSpacing: "0.35em",
          textTransform: "uppercase", color: CREAM,
        }}>DEKKAK</Link>
      </div>

      {/* Separator */}
      <div style={{ height: "1px", background: "rgba(245,240,232,0.12)", margin: "0 48px" }} />

      {/* Row 2 — Links (desktop) / Hamburger (mobile) */}
      <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", padding: "16px 48px" }}>
        {/* Desktop links */}
        <div className="nav-desktop" style={{ gap: "48px", alignItems: "center" }}>
          {NAV_LINKS.map((l, i) => (
            <div key={l.href} style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(-6px)",
              transition: `opacity 0.5s ease ${0.15 + i * 0.07}s, transform 0.5s ease ${0.15 + i * 0.07}s`,
            }}>
              <NavLink href={l.href} label={l.label} />
            </div>
          ))}
        </div>

        {/* Hamburger (mobile only) */}
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", flexDirection: "column", gap: "5px" }}>
          <span style={{ ...barBase, transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none" }} />
          <span style={{ ...barBase, opacity: menuOpen ? 0 : 1 }} />
          <span style={{ ...barBase, transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none" }} />
        </button>

        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </div>

      {/* Bottom separator */}
      <div style={{ height: "1px", background: "rgba(245,240,232,0.08)", margin: "0 48px" }} />
    </nav>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div style={{
      position: "absolute", top: "100%", left: 0, width: "100%",
      background: "var(--nav-bg)", backdropFilter: "blur(14px)",
      padding: "24px 40px 32px",
    }}>
      {NAV_LINKS.map((l, i) => (
        <div key={l.href}>
          {i > 0 && <div style={{ height: "1px", background: "rgba(201,168,76,0.18)" }} />}
          <Link href={l.href} onClick={onClose} style={{
            display: "block", padding: "20px 0",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "13px", letterSpacing: "0.2em",
            textTransform: "uppercase", color: "var(--text-color)", opacity: 0.85,
          }}>{l.label}</Link>
        </div>
      ))}
    </div>
  );
}
