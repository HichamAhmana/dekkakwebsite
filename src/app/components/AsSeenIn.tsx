"use client";
import { useState } from "react";
import { GOLD } from "../constants";

const PARTNERS = [
  "SBCC SUMMIT",
  "IBN BATTUTA FESTIVAL",
  "CARLAC",
  "ADGECO GROUP",
  "GITEX",
  "ARAB PEACE CORPS",
  "AMCHAM ABU DHABI",
  "SAHARA SPIRIT FOUNDATION"
];

// Duplicate the array for a seamless loop
const SCROLL_ITEMS = [...PARTNERS, ...PARTNERS];

export default function AsSeenIn() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section style={{
      position: "relative",
      padding: "60px 0",
      background: "var(--bg-color)",
      borderTop: `1px solid rgba(201,168,76,0.12)`,
      borderBottom: `1px solid rgba(201,168,76,0.12)`,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      {/* Label */}
      <h2 style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: GOLD,
        marginBottom: "40px",
        textAlign: "center",
      }}>
        AS SEEN IN
      </h2>

      {/* Marquee container */}
      <div 
        style={{
          width: "100%",
          display: "flex",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Scrolling track */}
        <div style={{
          display: "flex",
          gap: "80px",
          paddingLeft: "80px", // Keep gap consistent
          animation: "marquee 40s linear infinite",
          animationPlayState: isHovered ? "paused" : "running",
          width: "max-content",
        }}>
          {SCROLL_ITEMS.map((item, index) => (
            <div key={index} style={{
              display: "flex",
              alignItems: "center",
              gap: "80px",
            }}>
              <span style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "24px",
                letterSpacing: "0.1em",
                color: GOLD,
                opacity: 0.8,
                textTransform: "uppercase",
              }}>
                {item}
              </span>
              {/* Dot separator */}
              <span style={{
                color: "var(--text-color)",
                opacity: 0.2,
                fontSize: "10px",
              }}>
                &#x25CF;
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
