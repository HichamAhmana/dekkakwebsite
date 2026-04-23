"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const GOLD = "#C9A84C";
const CREAM = "#F5F0E8";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [animatingOut, setAnimatingOut] = useState(false);

  useEffect(() => {
    // When pathname changes (or on mount), trigger the loading sequence
    setLoading(true);
    setAnimatingOut(false);
    
    // Play the animation, then trigger the fade out
    const t1 = setTimeout(() => {
      setAnimatingOut(true);
    }, 1200); // 1.2s of "loading" screen

    // Fully remove the loading screen
    const t2 = setTimeout(() => {
      setLoading(false);
    }, 1800); // Wait for the fade out to finish

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return (
    <>
      {/* 
        The Loading Overlay 
        This covers the screen. When animatingOut is true, it fades away.
        When loading is false, it's removed from the DOM.
      */}
      {loading && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "#0A0A0A",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: animatingOut ? 0 : 1,
          transition: "opacity 0.6s cubic-bezier(0.87, 0, 0.13, 1)",
          pointerEvents: "none",
        }}>
          
          <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {/* The horizontal "Bridge" line */}
            <div style={{
              position: "absolute",
              top: "50%",
              width: "100vw",
              height: "1px",
              background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
              animation: "bridgeDraw 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              opacity: animatingOut ? 0 : 0.6,
              transition: "opacity 0.4s ease",
            }} />
            
            {/* The Name: DEKKAK */}
            <div style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(32px, 5vw, 64px)",
              letterSpacing: "0.3em",
              color: CREAM,
              textTransform: "uppercase",
              position: "relative",
              overflow: "hidden",
              padding: "20px 0",
              zIndex: 2,
            }}>
              <span style={{
                display: "inline-block",
                transform: animatingOut ? "translateY(-100%)" : "translateY(100%)",
                opacity: animatingOut ? 0 : 1,
                animation: "nameReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards",
                textShadow: `0 0 20px ${GOLD}33`,
              }}>
                DEKKAK
              </span>
            </div>
          </div>
          
          {/* Subtext: The locations */}
          <div style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
            opacity: animatingOut ? 0 : 1,
            transition: "opacity 0.4s ease",
          }}>
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: CREAM, opacity: 0.5, animation: "fadeIn 0.6s ease 0.6s both" }}>Marrakech</span>
            <div style={{ width: "24px", height: "1px", background: GOLD, animation: "fadeIn 0.6s ease 0.6s both" }} />
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: CREAM, opacity: 0.5, animation: "fadeIn 0.6s ease 0.6s both" }}>Abu Dhabi</span>
          </div>

        </div>
      )}

      {/* 
        The Page Content 
        Fades in slightly as the loader fades out
      */}
      <div style={{
        opacity: loading && !animatingOut ? 0 : 1,
        ...(loading && !animatingOut ? { transform: "translateY(20px)" } : {}),
        transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
      }}>
        {children}
      </div>
    </>
  );
}
