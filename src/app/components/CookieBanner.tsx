"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = (choice: "accepted" | "declined") => {
    localStorage.setItem("cookie-consent", choice);
    setDismissed(true);
    setTimeout(() => setVisible(false), 500);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes cookieSlideUp {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          bottom: "24px",
          left: "24px",
          zIndex: 9998,
          width: "100%",
          maxWidth: "360px",
          backgroundColor: "var(--bg-color)",
          border: "1px solid rgba(201, 168, 76, 0.3)",
          borderRadius: "2px",
          padding: "24px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          transform: dismissed ? "translateY(20px)" : "translateY(0)",
          opacity: dismissed ? 0 : 1,
          transition: "transform 0.5s ease, opacity 0.5s ease",
          animation: "cookieSlideUp 0.5s ease forwards",
        }}
      >
        {/* Icon */}
        <div style={{ fontSize: "22px", marginBottom: "12px", lineHeight: 1 }}>
          🍪
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "18px",
            fontWeight: 500,
            color: "#C9A84C",
            margin: "0 0 10px 0",
            letterSpacing: "0.05em",
          }}
        >
          Cookie Preferences
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "12px",
            lineHeight: 1.7,
            color: "var(--text-color)",
            opacity: 0.6,
            margin: "0 0 20px 0",
          }}
        >
          We use cookies to enhance your experience and analyze site
          performance. By continuing, you agree to our use of cookies.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => dismiss("declined")}
            style={{
              flex: 1,
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "10px 0",
              background: "transparent",
              border: "1px solid rgba(201, 168, 76, 0.4)",
              color: "var(--text-color)",
              cursor: "pointer",
              opacity: 0.7,
              borderRadius: "2px",
              transition: "border-color 0.3s ease, opacity 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#C9A84C";
              e.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(201, 168, 76, 0.4)";
              e.currentTarget.style.opacity = "0.7";
            }}
          >
            Decline
          </button>

          <button
            onClick={() => dismiss("accepted")}
            style={{
              flex: 1,
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "10px 0",
              background: "#C9A84C",
              border: "1px solid #C9A84C",
              color: "#0A0A0A",
              cursor: "pointer",
              fontWeight: 500,
              borderRadius: "2px",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#E8C97A";
              e.currentTarget.style.borderColor = "#E8C97A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#C9A84C";
              e.currentTarget.style.borderColor = "#C9A84C";
            }}
          >
            Accept All
          </button>
        </div>
      </div>
    </>
  );
}
