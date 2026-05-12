"use client";

import { useState, useEffect, startTransition } from "react";
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

    // Stay in sync with other ThemeToggle instances on the page
    const onThemeChange = (e: Event) => {
      setIsLight((e as CustomEvent<{ isLight: boolean }>).detail.isLight);
    };
    window.addEventListener("theme-change", onThemeChange);
    return () => window.removeEventListener("theme-change", onThemeChange);
  }, []);

  const toggle = () => {
    const html = document.documentElement;
    const next = !isLight;

    if (next) {
      html.setAttribute("data-theme", "light");
      window.localStorage.setItem("theme", "light");
    } else {
      html.removeAttribute("data-theme");
      window.localStorage.setItem("theme", "dark");
    }

    // Broadcast to all other ThemeToggle instances
    window.dispatchEvent(
      new CustomEvent("theme-change", { detail: { isLight: next } })
    );
    setIsLight(next);
  };

  if (!mounted) {
    return <div style={{ width: 42, height: 42, flexShrink: 0 }} />;
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        width: "42px",
        height: "42px",
        minWidth: "42px",
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: GOLD,
        opacity: 0.8,
        transition: "opacity 0.3s ease",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
    >
      <span style={{ position: "relative", width: 18, height: 18, display: "block", flexShrink: 0 }}>
        <svg
          width="18" height="18" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ position: "absolute", top: 0, left: 0, display: isLight ? "none" : "block" }}
        >
          <path d="M17.293 13.293A8 8 0 0 1 6.707 2.707a8.001 8.001 0 1 0 10.586 10.586z" />
        </svg>

        <svg
          width="18" height="18" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ position: "absolute", top: 0, left: 0, display: isLight ? "block" : "none" }}
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      </span>
    </button>
  );
}


const NAV_LINKS = [
  { label: "BUSINESS", href: "/business" },
  { label: "IMPACT", href: "/impact" },
  { label: "SERVICES", href: "/services" },
  { label: "BLOG", href: "/blog" },
  { label: "GALLERY", href: "/gallery" },
  { label: "ABOUT", href: "/about" },
  { label: "ORCHID ISLAND", href: "/orchid-island" },
  { label: "CONTACT", href: "/contact" },
  { label: "SUBMIT OPPORTUNITY", href: "/submit-opportunity", isGold: true },
];

function NavLink({
  href,
  label,
  isGold,
}: {
  href: string;
  label: string;
  isGold?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "10.5px",
        fontWeight: isGold ? 600 : 500,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: hovered ? (isGold ? CREAM : GOLD) : isGold ? GOLD : CREAM,
        opacity: hovered ? 1 : isGold ? 1 : 0.7,
        whiteSpace: "nowrap",
        minHeight: "44px",
        display: "flex",
        alignItems: "center",
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
    const t = setTimeout(() => startTransition(() => setLoaded(true)), 80);

    const onScroll = () =>
      startTransition(() => setScrolled(window.scrollY > 60));

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const barBase: React.CSSProperties = {
    display: "block",
    width: "24px",
    height: "1px",
    background: CREAM,
    transition: "transform 0.3s ease, opacity 0.3s ease",
  };

  if (scrolled) {
    return (
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100,

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          padding: "0 48px",
          height: "64px",

          background: "var(--nav-bg)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",

          borderBottom: "1px solid var(--border-color)",

          transition: "all 0.4s ease",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "20px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: CREAM,
            flexShrink: 0,
          }}
        >
          DEKKAK
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            className="nav-desktop"
            style={{ gap: "32px", alignItems: "center" }}
          >
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.href}
                href={l.href}
                label={l.label}
                isGold={l.isGold}
              />
            ))}
          </div>

          <ThemeToggle />

          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <span
              style={{
                ...barBase,
                transform: menuOpen
                  ? "translateY(6px) rotate(45deg)"
                  : "none",
              }}
            />
            <span
              style={{
                ...barBase,
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                ...barBase,
                transform: menuOpen
                  ? "translateY(-6px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>

        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </nav>
    );
  }

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,

        background: "transparent",

        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(-10px)",

        transition:
          "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          padding: "22px 48px 18px",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "22px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: CREAM,
          }}
        >
          DEKKAK
        </Link>
      </div>

      <div
        style={{
          height: "1px",
          background: "rgba(245,240,232,0.12)",
          margin: "0 48px",
        }}
      />

      <div
        style={{
          position: "relative",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          padding: "16px 100px",
        }}
      >
        <div
          className="nav-desktop"
          style={{ gap: "36px", alignItems: "center" }}
        >
          {NAV_LINKS.map((l, i) => (
            <div
              key={l.href}
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded
                  ? "translateY(0)"
                  : "translateY(-6px)",

                transition: `opacity 0.5s ease ${
                  0.15 + i * 0.07
                }s, transform 0.5s ease ${0.15 + i * 0.07}s`,
              }}
            >
              <NavLink
                href={l.href}
                label={l.label}
                isGold={l.isGold}
              />
            </div>
          ))}
        </div>

        <div
          className="desktop-only"
          style={{
            position: "absolute",
            right: "48px",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            width: "42px",
            height: "42px",

            opacity: loaded ? 1 : 0,
            transition: "opacity 0.7s ease 0.3s",
          }}
        >
          <ThemeToggle />
        </div>

        <div
          className="nav-hamburger"
          style={{
            alignItems: "center",
            gap: "16px",
          }}
        >
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <span style={{ ...barBase, transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none" }} />
            <span style={{ ...barBase, opacity: menuOpen ? 0 : 1 }} />
            <span style={{ ...barBase, transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none" }} />
          </button>
        </div>

        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </div>

      <div
        style={{
          height: "1px",
          background: "rgba(245,240,232,0.08)",
          margin: "0 48px",
        }}
      />
    </nav>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        width: "100%",

        background: "var(--nav-bg)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",

        padding: "24px 40px 32px",
      }}
    >
      {NAV_LINKS.map((l, i) => (
        <div key={l.href}>
          {i > 0 && (
            <div
              style={{
                height: "1px",
                background: "rgba(201,168,76,0.18)",
              }}
            />
          )}

          <Link
            href={l.href}
            onClick={onClose}
            style={{
              display: "block",
              padding: "20px 0",

              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "13px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",

              color: l.isGold ? GOLD : "var(--text-color)",
              opacity: l.isGold ? 1 : 0.85,
              fontWeight: l.isGold ? 600 : 400,
            }}
          >
            {l.label}
          </Link>
        </div>
      ))}

      <div
        style={{
          borderTop: "1px solid rgba(201,168,76,0.18)",
          paddingTop: "20px",
          marginTop: "8px",

          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: GOLD,
            opacity: 0.6,
          }}
        >
          Theme
        </span>

        <ThemeToggle />
      </div>
    </div>
  );
}