"use client";
import { useState, useEffect } from "react";

const GOLD = "#C9A84C";
const CREAM = "var(--text-color)";

const QUOTES = [
  {
    text: "Impact The World.",
    author: "Mohamed Dekkak",
  },
  {
    text: "Lead Your Field.",
    author: "Mohamed Dekkak",
  },
  {
    text: "Own Your Genius.",
    author: "Mohamed Dekkak",
  },
  {
    text: "Success without legacy is just a number. Build something that outlives you, something that gives long after you are gone.",
    author: "Mohamed Dekkak",
  },
  {
    text: "The bridge between vision and reality is built one disciplined day at a time. Patience is not passive — it is relentless.",
    author: "Mohamed Dekkak",
  },
];

export default function Quote() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % QUOTES.length);
        setVisible(true);
      }, 600);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const q = QUOTES[current];

  return (
    <section style={{
      width: "100%",
      borderTop: "1px solid rgba(201,168,76,0.12)",
      borderBottom: "1px solid rgba(201,168,76,0.12)",
      padding: "120px 40px",
      textAlign: "center",
      position: "relative",
    }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>

        {/* Opening mark */}
        <div style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "80px",
          color: GOLD,
          opacity: 0.25,
          lineHeight: 0.6,
          marginBottom: "32px",
          fontStyle: "italic",
        }}>
          &ldquo;
        </div>

        {/* Quote text */}
        <blockquote style={{
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontSize: "clamp(26px, 3.5vw, 52px)",
          fontWeight: 300,
          lineHeight: 1.35,
          color: CREAM,
          margin: "0 0 44px",
          letterSpacing: "-0.01em",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
          {q.text}
        </blockquote>

        {/* Author */}
        <cite style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontStyle: "normal",
          fontSize: "11px", fontWeight: 500,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: GOLD,
          opacity: visible ? 0.6 : 0,
          transition: "opacity 0.6s ease",
        }}>
          — {q.author}
        </cite>

        {/* Elegant indicator — thin gold line with diamond */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          marginTop: "48px",
        }}>
          {/* Left line */}
          <div style={{
            height: "1px",
            width: "48px",
            background: `linear-gradient(to right, transparent, rgba(201,168,76,0.3))`,
          }} />

          {/* Dots */}
          {QUOTES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setVisible(false);
                setTimeout(() => { setCurrent(i); setVisible(true); }, 300);
              }}
              aria-label={`Quote ${i + 1}`}
              style={{
                width: i === current ? "20px" : "4px",
                height: "1px",
                background: i === current ? GOLD : "rgba(201,168,76,0.3)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                margin: 0,
                transition: "width 0.4s ease, background 0.4s ease",
                position: "relative",
                // Invisible touch area around tiny element
                outline: "none",
              }}
            >
              {/* Invisible large touch target */}
              <span style={{
                position: "absolute",
                inset: "-20px",
                display: "block",
              }} />
            </button>
          ))}

          {/* Right line */}
          <div style={{
            height: "1px",
            width: "48px",
            background: `linear-gradient(to left, transparent, rgba(201,168,76,0.3))`,
          }} />
        </div>

        {/* Quote counter */}
        <div style={{
          marginTop: "20px",
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.2em",
          color: GOLD,
          opacity: 0.3,
        }}>
          {String(current + 1).padStart(2, "0")} / {String(QUOTES.length).padStart(2, "0")}
        </div>

      </div>
    </section>
  );
}