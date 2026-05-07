"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { GOLD } from "../constants";

const CREAM = "var(--nav-text)";

function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("theme");
    if (saved === "light") {
      setIsLight(true);
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggle = () => {
    const html = document.documentElement;
    if (isLight) {
      html.removeAttribute("data-theme");
      // Force a style recalc on browsers that cache CSS vars aggressively
      void html.getBoundingClientRect();
      window.localStorage.setItem("theme", "dark");
      setIsLight(false);
    } else {
      html.setAttribute("data-theme", "light");
      void html.getBoundingClientRect();
      window.localStorage.setItem("theme", "light");
      setIsLight(true);
    }
  };

  if (!mounted) return <div style={{ width: 32, height: 32 }} />;

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: isLight ? GOLD : CREAM,
        opacity: 0.8,
        transition: "color 0.3s ease, opacity 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
    >
      {isLight ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      )}
    </button>
  );
}

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
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--border-color)",
        transition: "all 0.4s ease",
      }}>
        <Link href="/" style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "20px", letterSpacing: "0.25em",
          textTransform: "uppercase", color: CREAM,
        }}>DEKKAK</Link>

        {/* Right Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {/* Desktop */}
          <div className="nav-desktop" style={{ gap: "40px", alignItems: "center" }}>
            {NAV_LINKS.map((l) => <NavLink key={l.href} href={l.href} label={l.label} />)}
          </div>

          <ThemeToggle />

          {/* Hamburger */}
          <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", flexDirection: "column", gap: "5px" }}>
            <span style={{ ...barBase, transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none" }} />
            <span style={{ ...barBase, opacity: menuOpen ? 0 : 1 }} />
            <span style={{ ...barBase, transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none" }} />
          </button>
        </div>

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

        {/* Mobile Controls (Hamburger + Theme Toggle) */}
        <div className="nav-hamburger" style={{ alignItems: "center", gap: "24px" }}>
          <ThemeToggle />
          <button onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", flexDirection: "column", gap: "5px" }}>
            <span style={{ ...barBase, transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none" }} />
            <span style={{ ...barBase, opacity: menuOpen ? 0 : 1 }} />
            <span style={{ ...barBase, transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none" }} />
          </button>
        </div>

        {/* Theme Toggle Far Right */}
        <div className="desktop-only" style={{ position: "absolute", right: "48px", opacity: loaded ? 1 : 0, transition: "opacity 0.7s ease 0.3s" }}>
          <ThemeToggle />
        </div>

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
      background: "var(--nav-bg)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
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
