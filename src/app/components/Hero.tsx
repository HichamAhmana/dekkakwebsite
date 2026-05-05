"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C97A";
const CREAM = "var(--text-color)";

const NAME_LETTERS = ["D", "E", "K", "K", "A", "K"];
const ROLES = ["Chairman", "Investor", "Philanthropist", "Statesman", "Visionary"];
const COORDS = "34°01′N 6°50′W  ·  24°28′N 54°22′E";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [btnHover, setBtnHover] = useState<"primary" | "secondary" | null>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  const roleTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    const onMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.transform = `translate(${e.clientX - 260}px, ${e.clientY - 260}px)`;
        }
      });
    };
    window.addEventListener("mousemove", onMove);

    // Cycle through roles
    roleTimer.current = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIndex(i => (i + 1) % ROLES.length);
        setRoleVisible(true);
      }, 350);
    }, 2800);

    return () => {
      clearTimeout(t);
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (roleTimer.current) clearInterval(roleTimer.current);
    };
  }, []);

  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      overflow: "hidden",
      background: "radial-gradient(ellipse at 65% 40%, var(--bg-secondary) 0%, var(--bg-color) 70%)",
    }}>

      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        {/* ── Interactive mouse-following gold glow ── */}
        <div
          ref={glowRef}
          style={{
            position: "absolute", left: 0, top: 0,
            width: "520px", height: "520px",
            background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 68%)",
            transform: `translate(-600px, -600px)`,
            transition: "transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
            pointerEvents: "none", zIndex: 1,
          }} />

        {/* ── Floating ambient orbs ── */}
        <div style={{
          position: "absolute", top: "18%", right: "12%",
          width: "340px", height: "340px",
          background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
          animation: "orbFloat1 14s ease-in-out infinite",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "28%", left: "6%",
          width: "220px", height: "220px",
          background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)",
          animation: "orbFloat2 18s ease-in-out infinite",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "55%", right: "28%",
          width: "160px", height: "160px",
          background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
          animation: "orbFloat3 11s ease-in-out infinite",
          pointerEvents: "none",
        }} />
      </div>

      {/* ── Static gold glow layers ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 55% at 68% 38%, rgba(201,168,76,0.08) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 35% 40% at 25% 70%, rgba(201,168,76,0.04) 0%, transparent 70%)",
      }} />

      {/* ── SVG Grid ── */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none" }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke={GOLD} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* ── Cinematic scan line (fires once on load) ── */}
      <div style={{
        position: "absolute", left: 0, top: 0,
        width: "100%", height: "1px",
        background: `linear-gradient(to right, transparent 0%, ${GOLD} 40%, ${GOLD_LIGHT} 50%, ${GOLD} 60%, transparent 100%)`,
        animation: "scanLine 2.4s ease-out 0.15s forwards",
        opacity: 0, pointerEvents: "none", zIndex: 5,
      }} />

      {/* ── Bottom vignette overlay ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to bottom, transparent 0%, transparent 55%, var(--bg-color) 100%)",
      }} />

      {/* ── Editorial Cinematic Portrait ── */}
      <div style={{
        position: "absolute",
        top: 0, right: 0,
        width: "70%", height: "100%",
        zIndex: 0,
        opacity: loaded ? 0.8 : 0,
        transform: loaded ? "scale(1.03)" : "scale(1.08)",
        transition: "opacity 3.5s ease 0.5s, transform 25s cubic-bezier(0.1,0.5,0.8,1)",
        overflow: "hidden",
        pointerEvents: "none",
      }}>
        {/* Soft edge masks to blend image into the background gracefully */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(to right, var(--bg-color) 0%, transparent 40%)",
        }} />
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(to top, var(--bg-color) 0%, transparent 40%)",
        }} />
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(to bottom, var(--bg-color) 0%, transparent 15%)",
        }} />
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(201,168,76,0.15) 100%)",
          mixBlendMode: "color",
        }} />
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "var(--bg-color)", opacity: 0.45,
        }} />

        <Image
          src="/dekkak-cinema-marrakech-festival.png"
          alt="Mohamed Dekkak at Marrakech Festival"
          fill
          style={{ objectFit: "cover", objectPosition: "60% center" }}
          priority
        />
      </div>

      {/* ── Main content ── */}
      <div style={{
        position: "relative", zIndex: 2,
        width: "100%", maxWidth: "1400px",
        margin: "0 auto",
        padding: "140px 60px 100px",
        display: "flex", flexDirection: "column", alignItems: "flex-start",
      }}>

        {/* ── NEW HEADLINE: Full-width name treatment ── */}
        <div style={{ margin: "0 0 52px", width: "100%" }}>

          {/* Cycling role badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
          }}>
            <div style={{ width: "28px", height: "1px", background: GOLD, opacity: 0.7 }} />
            <div style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: GOLD,
              minWidth: "160px",
              opacity: roleVisible ? 1 : 0,
              transform: roleVisible ? "translateY(0)" : "translateY(-6px)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
            }}>
              {ROLES[roleIndex]}
            </div>
            <div style={{ width: "28px", height: "1px", background: `linear-gradient(90deg, ${GOLD}, transparent)`, opacity: 0.7 }} />
          </div>

          {/* First name — italic, elegant, smaller */}
          <div style={{
            overflow: "hidden",
            lineHeight: 1,
            marginBottom: "-8px",
          }}>
            <div style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(28px, 4vw, 56px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: CREAM,
              opacity: 0.55,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              transform: loaded ? "translateY(0)" : "translateY(100%)",
              transition: "transform 1s cubic-bezier(0.16,1,0.3,1) 0.6s",
            }}>
              Mohamed
            </div>
          </div>

          {/* DEKKAK — letters reveal one by one */}
          <h1 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 300,
            fontSize: "clamp(80px, 14vw, 190px)",
            lineHeight: 0.85,
            letterSpacing: "0.18em",
            margin: "0 0 0 -4px",
            color: CREAM,
            display: "flex",
            overflow: "hidden",
          }}>
            {NAME_LETTERS.map((letter, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  lineHeight: 1.05,
                }}
              >
                <span style={{
                  display: "inline-block",
                  opacity: 0,
                  transform: "translateY(100%)",
                  animation: loaded
                    ? `revealUp 0.9s cubic-bezier(0.16,1,0.3,1) ${0.75 + i * 0.08}s forwards`
                    : "none",
                }}>
                  {letter}
                </span>
              </span>
            ))}
          </h1>

          {/* Location / coordinate strip */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginTop: "20px",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.8s ease 1.4s, transform 0.8s ease 1.4s",
          }}>
            <div style={{ flex: 1, maxWidth: "220px", height: "1px", background: `linear-gradient(90deg, ${GOLD}66, transparent)` }} />
            <span style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "9px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: CREAM,
              opacity: 0.35,
              whiteSpace: "nowrap",
            }}>
              {COORDS}
            </span>
            <div style={{ flex: 1, maxWidth: "220px", height: "1px", background: `linear-gradient(90deg, transparent, ${GOLD}44)` }} />
            <span style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "9px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: GOLD,
              opacity: 0.55,
              whiteSpace: "nowrap",
            }}>
              Est. 1992
            </span>
          </div>

        </div>

        {/* Description */}
        <p style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "17px", fontWeight: 300, lineHeight: 1.8,
          color: CREAM,
          opacity: loaded ? 0.72 : 0,
          transform: loaded ? "translateY(0)" : "translateY(18px)",
          maxWidth: "580px", margin: "0 0 44px",
          transition: "opacity 1s ease 1.35s, transform 1s ease 1.35s",
        }}>
          Mohamed Dekkak has spent three decades building a cross-continental business empire —
          forging connections between cultures, capitals, and communities across the Middle East,
          Africa, and beyond.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: "flex", gap: "16px", flexWrap: "wrap",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 1s ease 1.55s, transform 1s ease 1.55s",
        }}>
          <Link
            href="/about"
            onMouseEnter={() => setBtnHover("primary")}
            onMouseLeave={() => setBtnHover(null)}
            style={{
              display: "inline-flex", alignItems: "center",
              padding: "15px 36px",
              background: btnHover === "primary" ? GOLD_LIGHT : GOLD,
              color: "var(--bg-color)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "11px", fontWeight: 500,
              letterSpacing: "0.2em", textTransform: "uppercase",
              transform: btnHover === "primary" ? "translateY(-2px)" : "translateY(0)",
              transition: "background 0.3s ease, transform 0.3s ease",
            }}
          >
            Discover His Story
          </Link>
          <Link
            href="/business"
            onMouseEnter={() => setBtnHover("secondary")}
            onMouseLeave={() => setBtnHover(null)}
            style={{
              display: "inline-flex", alignItems: "center",
              padding: "15px 36px",
              background: "transparent",
              color: btnHover === "secondary" ? GOLD : CREAM,
              border: btnHover === "secondary" ? `1px solid ${GOLD}` : "1px solid rgba(245,240,232,0.25)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "11px", fontWeight: 500,
              letterSpacing: "0.2em", textTransform: "uppercase",
              transform: btnHover === "secondary" ? "translateY(-2px)" : "translateY(0)",
              transition: "border-color 0.3s ease, color 0.3s ease, transform 0.3s ease",
            }}
          >
            View Ventures
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div style={{
        position: "absolute", bottom: "36px", right: "48px", zIndex: 2,
        display: "flex", flexDirection: "column", alignItems: "center", gap: "12px",
        opacity: loaded ? 1 : 0,
        transition: "opacity 1s ease 2s",
      }}>
        <span style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "9px", letterSpacing: "0.25em",
          textTransform: "uppercase", color: GOLD, opacity: 0.6,
          writingMode: "vertical-rl",
        }}>SCROLL</span>
        <div style={{
          width: "1px", height: "48px",
          background: `linear-gradient(to bottom, ${GOLD}, transparent)`,
          animation: "scrollPulse 2.5s ease-in-out infinite",
        }} />
      </div>
    </section>
  );
}
