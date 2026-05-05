"use client";

import { useEffect, useState, useRef } from "react";

export default function Cursor() {
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsFinePointer(true);
    }
  }, []);

  if (!isFinePointer) return null;

  return <InnerCursor />;
}

function InnerCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringPosRef = useRef<HTMLDivElement>(null);

  // Mutable refs to track positions without triggering React re-renders
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  useEffect(() => {
    setIsMounted(true);

    const moveCursor = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Instantly update inner dot using GPU-accelerated transform
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%) rotate(45deg)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
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

    // Vanilla JS animation loop for the trailing ring (spring-like lerp)
    let animationFrameId: number;
    const render = () => {
      // Damped spring approximation (linear interpolation)
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;

      if (ringPosRef.current) {
        ringPosRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* The solid inner dot (instant following) */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "5px",
          height: "5px",
          backgroundColor: "#C9A84C",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: isHovering ? 0 : 1,
          transition: "opacity 0.2s ease",
          transform: `translate(-100px, -100px) translate(-50%, -50%) rotate(45deg)`,
        }}
      />

      {/* The trailing shape wrapper (handles translation ONLY for performance) */}
      <div
        ref={ringPosRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          pointerEvents: "none",
          zIndex: 99998,
          transform: `translate(-100px, -100px) translate(-50%, -50%)`,
        }}
      >
        {/* Inner element handles rotation, size, and styling via CSS transitions */}
        <div
          style={{
            transform: `rotate(${isHovering ? 90 : 45}deg)`,
            width: isHovering ? "64px" : "24px",
            height: isHovering ? "64px" : "24px",
            border: isHovering ? "1px solid rgba(201,168,76,0.6)" : "1px solid rgba(201,168,76,0.35)",
            backgroundColor: isHovering ? "rgba(10,10,10,0.3)" : "transparent",
            backdropFilter: isHovering ? "blur(3px)" : "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease, border 0.4s ease, backdrop-filter 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "9px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              color: "#C9A84C",
              transform: `rotate(${isHovering ? -90 : -45}deg)`, // Counter-rotate so text is always horizontal
              opacity: isHovering ? 1 : 0,
              transition: "opacity 0.3s ease 0.1s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            VIEW
          </span>
        </div>
      </div>
    </>
  );
}
