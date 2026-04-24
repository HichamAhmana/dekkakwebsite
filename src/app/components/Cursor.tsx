"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Mouse position values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for the trailing ring
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(mouseX, springConfig);
  const cursorYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMounted(true);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if we are hovering over an interactive element
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isMounted) return null;

  return (
    <>
      {/* The solid inner dot (instant following) */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: mouseX,
          y: mouseY,
          rotate: 45,
          translateX: "-50%",
          translateY: "-50%",
          width: "5px",
          height: "5px",
          backgroundColor: "#C9A84C", // GOLD
          pointerEvents: "none",
          zIndex: 99999,
          opacity: isHovering ? 0 : 1, // Hide dot when hovering
          transition: "opacity 0.2s ease",
        }}
      />

      {/* The trailing shape */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: cursorXSpring,
          y: cursorYSpring,
          rotate: isHovering ? 90 : 45, // Rotates into a square on hover
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? "64px" : "24px",
          height: isHovering ? "64px" : "24px",
          border: isHovering ? "1px solid rgba(201,168,76,0.6)" : "1px solid rgba(201,168,76,0.35)",
          backgroundColor: isHovering ? "rgba(10,10,10,0.3)" : "transparent",
          backdropFilter: isHovering ? "blur(3px)" : "none",
          pointerEvents: "none",
          zIndex: 99998,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease, border 0.4s ease, backdrop-filter 0.4s ease",
        }}
      >
        <span style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "9px",
          fontWeight: 600,
          letterSpacing: "0.2em",
          color: "#C9A84C",
          transform: isHovering ? "rotate(-90deg)" : "rotate(-45deg)", // Counter-rotate so text is always horizontal
          opacity: isHovering ? 1 : 0,
          transition: "opacity 0.3s ease 0.1s", // Slight delay on text fade-in
        }}>
          VIEW
        </span>
      </motion.div>
    </>
  );
}
