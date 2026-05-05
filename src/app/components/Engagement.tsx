"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";


const GOLD = "#C9A84C";
const CREAM = "var(--text-color)";

function PlaceholderPattern({
  id,
  accent,
  hovered,
}: {
  id: string;
  accent: string;
  hovered: boolean;
}) {
  const encodedAccent = encodeURIComponent(accent);
  const patterns: Record<string, string> = {
    amcham: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='${encodedAccent}' stroke-width='0.5' opacity='0.35'%3E%3Cpath d='M0 30h60M30 0v60M0 0l60 60M60 0L0 60'/%3E%3Ccircle cx='30' cy='30' r='20'/%3E%3Ccircle cx='30' cy='30' r='10'/%3E%3C/g%3E%3C/svg%3E")`,
    anouar: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='${encodedAccent}' stroke-width='0.5' opacity='0.35'%3E%3Ccircle cx='40' cy='40' r='10'/%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3Ccircle cx='40' cy='40' r='30'/%3E%3Ccircle cx='40' cy='40' r='38'/%3E%3Cpath d='M40 2v76M2 40h76'/%3E%3C/g%3E%3C/svg%3E")`,
    healthcare: `url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='${encodedAccent}' opacity='0.2'%3E%3Crect x='20' y='8' width='8' height='32' rx='1'/%3E%3Crect x='8' y='20' width='32' height='8' rx='1'/%3E%3C/g%3E%3C/svg%3E")`,
  };
  const pattern = patterns[id] ?? patterns["amcham"];
  return (
    <>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "var(--bg-color)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: `radial-gradient(ellipse at 50% 50%, ${accent}22 0%, transparent 70%)`, opacity: hovered ? 1 : 0.4, transition: "opacity 1.1s ease" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: pattern, backgroundSize: id === "healthcare" ? "48px 48px" : id === "amcham" ? "60px 60px" : "80px 80px", opacity: hovered ? 0.55 : 0.2, transition: "opacity 1.1s ease" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: `repeating-linear-gradient(135deg, transparent 0px, transparent 40px, ${accent}06 40px, ${accent}06 41px)`, opacity: hovered ? 1 : 0.4, transition: "opacity 0.8s ease" }} />
    </>
  );
}

function CardBackground({
  item,
  hovered,
}: {
  item: (typeof ENGAGEMENT_ITEMS)[0];
  hovered: boolean;
}) {
  return (
    <>
      {item.image ? (
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 750px"
          style={{
            objectFit: "cover",
            objectPosition: item.imagePosition ?? "center center",
            filter: hovered ? "brightness(0.45) saturate(0.85)" : "brightness(0.18) grayscale(60%) saturate(0.4)",
            transform: hovered ? "scale(1.07)" : "scale(1.0)",
            transition: "filter 1.1s ease, transform 1.6s cubic-bezier(0.16,1,0.3,1)",
            zIndex: 0,
          }}
          priority
        />
      ) : (
        <PlaceholderPattern id={item.id} accent={item.accent} hovered={hovered} />
      )}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "var(--bg-color)", opacity: hovered ? 0.6 : 0.85, transition: "opacity 1s ease" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: `radial-gradient(ellipse at 50% 90%, ${item.accent}20 0%, transparent 65%)`, opacity: hovered ? 1 : 0.3, transition: "opacity 0.9s ease" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 6, padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(6px)", transition: "opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s", borderTop: `1px solid ${item.accent}22`, background: "linear-gradient(to top, var(--bg-color), transparent)" }}>
        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "8px", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: item.accent }}>{item.tag}</span>
        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase", color: CREAM, opacity: 0.35 }}>{item.image ? "Abu Dhabi · Est. 1992" : "Photo Coming Soon"}</span>
      </div>
    </>
  );
}

const ENGAGEMENT_ITEMS = [
  {
    id: "adgeco",
    title: "Adgeco Group",
    tag: "Business & Enterprise",
    body: "Adgeco Group is a well established and distinguished Holding Company in the United Arab Emirates, with decades of cross-continental influence across energy, infrastructure, and real estate.",
    href: "/business",
    accent: "#C9A84C",
    icon: "◈",
    image: "/mohamed-dekkak-adgeco-group.png",
    imagePosition: "center 18%",

  },
  {
    id: "amcham",
    title: "AmCham",
    tag: "Global Diplomacy",
    body: "American Business Group (AmCham) Abu Dhabi boosts United Arab Emirates' connectivity and business opportunities, bridging the east and west through strategic commercial diplomacy.",
    href: "/about",
    accent: "#C9A84C",
    icon: "◇",
    image: "/mohamed-dekkak-amcham.png",
    imagePosition: "center center",
  },
  {
    id: "anouar",
    title: "Anouar Association",
    tag: "Philanthropy",
    body: "The Anouar Association is a nonprofit organization that has been working for the poor and downtrodden for a long time, delivering education, healthcare and dignity to those in need.",
    href: "/impact",
    accent: "#C9A84C",
    icon: "◉",
    image: "/mohamed-dekkak-anouar-association.png",
    imagePosition: "center top",
  },
  {
    id: "healthcare",
    title: "Healthcare Initiatives",
    tag: "Health & Wellness",
    body: "Pioneering state-of-the-art medical facilities and fostering global health partnerships to ensure accessible, world-class care for communities across the region.",
    href: "/healthcare",
    accent: "#C9A84C",
    icon: "✚",
    image: "/Mohamed-dekkak-healthcare.png",
    imagePosition: "center center",
  },
];

function EngagementCard({ item, index }: { item: (typeof ENGAGEMENT_ITEMS)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        background: "transparent",
        border: `1px solid ${hovered ? item.accent + "55" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "2px",
        padding: "48px",
        cursor: "pointer",
        overflow: "hidden",
        transition: "border-color 0.5s ease, transform 0.5s ease, box-shadow 0.5s ease",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered ? `0 24px 80px rgba(0,0,0,0.4), 0 0 0 1px ${item.accent}22` : "0 8px 32px rgba(0,0,0,0.2)",
        width: "100%",
        maxWidth: "750px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <CardBackground item={item} hovered={hovered} />
      {hovered && (
        <div style={{ position: "absolute", inset: 0, zIndex: 2, background: `radial-gradient(circle 300px at ${mousePos.x}% ${mousePos.y}%, ${item.accent}15, transparent 70%)`, pointerEvents: "none", transition: "none" }} />
      )}
      <div style={{ position: "absolute", top: 0, left: 0, width: hovered ? "100px" : "40px", height: "2px", background: `linear-gradient(90deg, ${item.accent}, transparent)`, transition: "width 0.5s ease", zIndex: 3 }} />
      <div style={{ position: "absolute", top: 0, left: 0, width: "2px", height: hovered ? "100px" : "40px", background: `linear-gradient(180deg, ${item.accent}, transparent)`, transition: "height 0.5s ease", zIndex: 3 }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: hovered ? "100px" : "40px", height: "2px", background: `linear-gradient(-90deg, ${item.accent}, transparent)`, transition: "width 0.5s ease", zIndex: 3 }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: "2px", height: hovered ? "100px" : "40px", background: `linear-gradient(-180deg, ${item.accent}, transparent)`, transition: "height 0.5s ease", zIndex: 3 }} />
      <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "140px", fontWeight: 300, color: item.accent, opacity: hovered ? 0.04 : 0.02, lineHeight: 1, position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", letterSpacing: "-0.04em", userSelect: "none", transition: "opacity 0.5s ease", pointerEvents: "none", zIndex: 2 }}>
        {String(index + 1).padStart(2, "0")}
      </div>
      <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: item.accent, marginBottom: "24px", opacity: 0.9, position: "relative", zIndex: 4 }}>
        {item.tag}
      </div>
      <div style={{ fontSize: "36px", color: item.accent, marginBottom: "24px", display: "block", transform: hovered ? "scale(1.2) rotate(15deg)" : "scale(1) rotate(0deg)", transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)", position: "relative", zIndex: 4 }}>
        {item.icon}
      </div>
      <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: CREAM, margin: "0 0 20px", lineHeight: 1.1, letterSpacing: "-0.01em", position: "relative", zIndex: 4 }}>
        {item.title}
      </h3>
      <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "15px", fontWeight: 300, lineHeight: 1.8, color: CREAM, opacity: 0.7, margin: "0 0 36px", maxWidth: "540px", position: "relative", zIndex: 4 }}>
        {item.body}
      </p>
      <div style={{ position: "relative", zIndex: 4 }}>
        <ReadMoreLink href={item.href} accent={item.accent} hovered={hovered} />
      </div>
    </div>
  );
}

function ReadMoreLink({ href, accent, hovered: cardHovered }: { href: string; accent: string; hovered: boolean }) {
  const [lHovered, setLHovered] = useState(false);
  return (
    <Link href={href} onMouseEnter={() => setLHovered(true)} onMouseLeave={() => setLHovered(false)}
      style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: lHovered ? CREAM : accent, display: "inline-flex", alignItems: "center", gap: "12px", transition: "color 0.3s ease" }}>
      Read More
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", border: `1px solid ${accent}66`, borderRadius: "50%", transform: lHovered || cardHovered ? "translateX(6px)" : "translateX(0)", transition: "transform 0.35s ease, border-color 0.3s ease", borderColor: lHovered ? accent : `${accent}66` }}>→</span>
    </Link>
  );
}

function ParticleField() {
  const [particles] = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 5,
      opacity: 0.08 + Math.random() * 0.12,
    }))
  );
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {particles.map((p) => (
        <div key={p.id} style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px`, borderRadius: "50%", background: GOLD, opacity: p.opacity, animation: `engagementFloat${(p.id % 3) + 1} ${p.duration}s ${p.delay}s infinite ease-in-out` }} />
      ))}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", width: "800px", height: "800px", borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}06 0%, transparent 70%)`, top: "-300px", right: "-200px", animation: "orbFloat1 14s infinite ease-in-out" }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DESKTOP: horizontal scroll

   THE ROOT CAUSE OF ALL PREVIOUS BUGS:
   framer-motion's `x` motion value only accepts
   NUMBERS (pixels). Passing "0vw" / "-500vw" or
   "0%" / "-83%" are silently ignored or produce
   wrong results depending on the fm version.

   FIX: read window.innerWidth as pixels and
   multiply. On resize we update so it stays
   correct. slideWidthPx * 5 = the total distance
   to travel across 6 slides.

   Also: overflow: hidden on the sticky wrapper
   breaks position:sticky in some browsers by
   creating a new scroll container. Use
   overflow: clip instead — same visual result,
   no new scroll context.
───────────────────────────────────────────── */
function EngagementDesktop() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Initialize immediately since this component only mounts after SSR hydration
  const [vpWidth, setVpWidth] = useState(window.innerWidth);
  useEffect(() => {
    const update = () => setVpWidth(window.innerWidth);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // 6 slides (intro + 4 cards + outro): travel = 5 × viewport width in px
  const x = useTransform(scrollYProgress, [0, 1], [0, -(vpWidth * 5)]);

  return (
    // 500vh = 5 transitions × 100vh — one full viewport of scroll per slide
    <section
      ref={targetRef}
      style={{ height: "600vh", position: "relative", background: "var(--bg-color)" }}
    >
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <ParticleField />
        {/*
          The track: 6 slides wide, translated by x.
          No flex needed — slides are absolutely nothing
          but block divs sitting next to each other.
          We use a plain div with white-space:nowrap +
          inline-block children so layout never collapses.
        */}
        <motion.div
          style={{
            x,
            display: "flex",
            width: `${vpWidth * 6}px`,
            height: "100vh",
            willChange: "transform",
          }}
        >
          {/* SLIDE 0: Intro */}
          <div style={{ width: `${vpWidth}px`, minWidth: `${vpWidth}px`, height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
              <div style={{ width: "48px", height: "1px", background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
              <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: GOLD }}>Get to Know Us</span>
              <div style={{ width: "48px", height: "1px", background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(50px, 8vw, 110px)", fontWeight: 300, color: CREAM, margin: "0 0 20px", lineHeight: 0.95, letterSpacing: "-0.02em" }}>
              Engagement
            </h2>
            <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "15px", letterSpacing: "0.05em", color: CREAM, opacity: 0.6, fontStyle: "italic" }}>
              From compassion to action
            </p>
            <div style={{ position: "absolute", bottom: "10%", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", opacity: 0.5 }}>
              <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD }}>Scroll</span>
              <div style={{ width: "1px", height: "40px", background: `linear-gradient(to bottom, ${GOLD}, transparent)` }} />
            </div>
          </div>

          {/* SLIDES 1–4: Cards */}
          {ENGAGEMENT_ITEMS.map((item, i) => (
            <div key={item.id} style={{ width: `${vpWidth}px`, minWidth: `${vpWidth}px`, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5vw", position: "relative", zIndex: 1, flexShrink: 0 }}>
              <EngagementCard item={item} index={i} />
            </div>
          ))}

          {/* SLIDE 5: Outro */}
          <div style={{ width: `${vpWidth}px`, minWidth: `${vpWidth}px`, height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1, flexShrink: 0 }}>
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, color: CREAM, margin: "0 0 32px", lineHeight: 1 }}>
              Discover Our Impact
            </h2>
            <Link
              href="/impact"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD, border: `1px solid ${GOLD}44`, padding: "20px 56px", transition: "all 0.3s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = GOLD; (e.currentTarget as HTMLAnchorElement).style.color = "var(--bg-color)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = GOLD; }}
            >
              View All Engagements
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MOBILE: cards slide in from right on scroll.
   hasBeenVisible ref prevents snap-back.
───────────────────────────────────────────── */
function MobileSlideCard({ item, index }: { item: (typeof ENGAGEMENT_ITEMS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const hasBeenVisible = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hasBeenVisible.current = true;
          setVisible(true);
        } else if (!hasBeenVisible.current) {
          setVisible(false);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(60px)",
        transition: `opacity 0.7s ease ${index * 0.08}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s`,
        willChange: "transform, opacity",
      }}
    >
      <EngagementCard item={item} index={index} />
    </div>
  );
}

function EngagementMobile() {
  return (
    <section style={{ position: "relative", background: "var(--bg-color)", padding: "80px 0" }}>
      <ParticleField />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "40px 24px 60px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
          <div style={{ width: "32px", height: "1px", background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
          <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: GOLD }}>Get to Know Us</span>
          <div style={{ width: "32px", height: "1px", background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
        </div>
        <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(44px, 12vw, 60px)", fontWeight: 300, color: CREAM, margin: "0 0 16px", lineHeight: 0.95, letterSpacing: "-0.02em" }}>Engagement</h2>
        <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "15px", letterSpacing: "0.05em", color: CREAM, opacity: 0.6, fontStyle: "italic" }}>From compassion to action</p>
      </div>
      <div style={{ overflow: "hidden", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "40px", padding: "0 20px" }}>
          {ENGAGEMENT_ITEMS.map((item, i) => (
            <MobileSlideCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "80px 24px 40px", position: "relative", zIndex: 1 }}>
        <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(30px, 8vw, 40px)", fontWeight: 300, color: CREAM, margin: "0 0 32px", lineHeight: 1, textAlign: "center" }}>Discover Our Impact</h2>
        <Link
          href="/impact"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD, border: `1px solid ${GOLD}44`, padding: "20px 40px", transition: "all 0.3s ease" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = GOLD; (e.currentTarget as HTMLAnchorElement).style.color = "var(--bg-color)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = GOLD; }}
        >
          View All Engagements
        </Link>
      </div>
    </section>
  );
}

export default function Engagement() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const mounted = typeof window !== "undefined";

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!mounted) return null;
  return isMobile ? <EngagementMobile /> : <EngagementDesktop />;
}