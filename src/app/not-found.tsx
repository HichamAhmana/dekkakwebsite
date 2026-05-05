"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function NotFound() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "var(--bg-color)",
      color: "var(--text-color)",
      transition: "background-color 0.6s ease, color 0.6s ease",
    }}>
      <Navbar />

      <main style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px",
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 1s ease, transform 1s ease",
        textAlign: "center",
      }}>
        {/* Large 404 */}
        <h1 style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(80px, 15vw, 150px)",
          lineHeight: 1,
          margin: 0,
          color: "var(--text-color)",
          letterSpacing: "0.05em",
        }}>
          404
        </h1>

        {/* Decorative Line */}
        <div style={{
          width: "40px",
          height: "1px",
          backgroundColor: "#C9A84C",
          margin: "24px 0 32px 0",
        }} />

        {/* Heading */}
        <h2 style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(24px, 5vw, 36px)",
          fontWeight: 400,
          margin: "0 0 16px 0",
          color: "#C9A84C",
          fontStyle: "italic",
        }}>
          Page Not Found.
        </h2>

        {/* Subtext */}
        <p style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "14px",
          letterSpacing: "0.05em",
          maxWidth: "400px",
          lineHeight: 1.6,
          opacity: 0.8,
          margin: "0 0 48px 0",
        }}>
          The page you are looking for does not exist or has been moved.
        </p>

        {/* Return Home Button */}
        <Link href="/" style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "12px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--text-color)",
          padding: "16px 32px",
          border: "1px solid rgba(201, 168, 76, 0.5)",
          display: "inline-block",
          transition: "all 0.3s ease",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(201, 168, 76, 0.1)";
          e.currentTarget.style.borderColor = "#C9A84C";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.borderColor = "rgba(201, 168, 76, 0.5)";
        }}
        >
          Return Home
        </Link>
      </main>

      <Footer />
    </div>
  );
}
