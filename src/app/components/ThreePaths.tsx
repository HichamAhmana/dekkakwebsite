"use client";
import { useState } from "react";
import Link from "next/link";
import { CREAM } from "../constants";

const GOLD = "rgba(201, 167, 74, 1)";

const CARDS = [
  {
    num: "01",
    label: "Enterprise",
    title: "Cross-Continental Business",
    body: "From the founding of Adgeco Group in 1992 to investments spanning energy, real estate, and technology, Dekkak's business empire operates across four continents with precision and purpose.",
    cta: "Explore Business",
    href: "/business",
  },
  {
    num: "02",
    label: "Philanthropy",
    title: "Transforming Communities",
    body: "Through eight foundations and seventeen advisory councils, Mohamed Dekkak channels resources and influence into lasting human impact — education, healthcare, and cultural preservation.",
    cta: "Explore Impact",
    href: "/impact",
  },
  {
    num: "03",
    label: "Legacy",
    title: "A Vision That Endures",
    body: "Orchid Island and beyond — curated ventures that embody a philosophy of excellence, hospitality, and the belief that beauty itself is a form of leadership.",
    cta: "Explore Legacy",
    href: "/orchid-island",
  },
];

function Card({ card }: { card: typeof CARDS[0] }) {
  const [hovered, setHovered] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "var(--bg-secondary)" : "var(--bg-color)",
        padding: "56px 48px",
        transition: "background 0.4s ease",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* Ghost number */}
      <div style={{
        fontFamily: "var(--font-cormorant), serif",
        fontSize: "80px",
        fontWeight: 300,
        color: GOLD,
        opacity: 0.08,
        lineHeight: 1,
        letterSpacing: "-0.02em",
        marginBottom: "-20px",
      }}>
        {card.num}
      </div>

      {/* Gold label */}
      <div style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "10px",
        fontWeight: 500,
        letterSpacing: "0.3em",
        textTransform: "uppercase" as const,
        color: GOLD,
      }}>
        {card.label}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "var(--font-cormorant), serif",
        fontSize: "40px",
        fontWeight: 300,
        color: CREAM,
        margin: 0,
        lineHeight: 1.05,
      }}>
        {card.title}
      </h3>

      {/* Body */}
      <p style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "14px",
        fontWeight: 300,
        lineHeight: 1.8,
        color: CREAM,
        opacity: 0.6,
        margin: 0,
        flexGrow: 1,
      }}>
        {card.body}
      </p>

      {/* CTA */}
      <Link
        href={card.href}
        onMouseEnter={() => setLinkHovered(true)}
        onMouseLeave={() => setLinkHovered(false)}
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.2em",
          textTransform: "uppercase" as const,
          color: GOLD,
          textDecoration: linkHovered ? "underline" : "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          transition: "gap 0.3s ease",
        }}
      >
        {card.cta}
        <span style={{
          transform: linkHovered ? "translateX(4px)" : "translateX(0)",
          transition: "transform 0.3s ease",
          display: "inline-block",
        }}>→</span>
      </Link>
    </div>
  );
}

export default function ThreePaths() {
  return (
    <section style={{ padding: "120px 40px", width: "100%" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "32px" }}>
            <div style={{ width: "40px", height: "1px", background: GOLD }} />
            <span style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.3em",
              textTransform: "uppercase" as const,
              color: GOLD,
            }}>
              Three Dimensions
            </span>
          </div>
          <h2 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(48px, 6vw, 96px)",
            fontWeight: 300,
            color: CREAM,
            margin: 0,
            lineHeight: 1.0,
          }}>
            Three dimensions.<br />
            <em style={{ color: GOLD, fontStyle: "italic" }}>One man.</em>
          </h2>
        </div>

        {/* Cards grid — 1px gap on gold tint background creates gold dividers */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1px",
          background: "rgba(201,168,76,0.15)",
        }}>
          {CARDS.map((c) => <Card key={c.num} card={c} />)}
        </div>
      </div>
    </section>
  );
}
