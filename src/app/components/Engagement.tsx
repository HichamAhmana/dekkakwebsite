"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const GOLD = "#C9A84C";
const CREAM = "#F5F0E8";

const ENGAGEMENT_ITEMS = [
  {
    id: "adgeco",
    title: "Adgeco Group",
    tag: "Business & Enterprise",
    body: "Adgeco Group is a well established and distinguished Holding Company in the United Arab Emirates, with decades of cross-continental influence across energy, infrastructure, and real estate.",
    href: "/business",
    accent: "#C9A84C",
    icon: "◈",
    logo: null as string | null,
  },
  {
    id: "amcham",
    title: "AmCham",
    tag: "Global Diplomacy",
    body: "American Business Group (AmCham) Abu Dhabi boosts United Arab Emirates' connectivity and business opportunities, bridging the east and west through strategic commercial diplomacy.",
    href: "/about",
    accent: "#6A9FCB",
    icon: "◇",
    logo: null as string | null,
  },
  {
    id: "anouar",
    title: "Anouar Association",
    tag: "Philanthropy",
    body: "The Anouar Association is a nonprofit organization that has been working for the poor and downtrodden for a long time, delivering education, healthcare and dignity to those in need.",
    href: "/impact",
    accent: "#8BC4A8",
    icon: "◉",
    
  },
];

function useIntersectionObserver(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function EngagementCard({
  item,
  index,
  visible,
}: {
  item: (typeof ENGAGEMENT_ITEMS)[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        background: hovered
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.015)",
        border: `1px solid ${hovered ? item.accent + "55" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "2px",
        padding: "52px 44px 44px",
        cursor: "pointer",
        overflow: "hidden",
        transition: "border-color 0.5s ease, background 0.5s ease, transform 0.5s ease, box-shadow 0.5s ease",
        transform: visible
          ? hovered
            ? "translateY(-8px)"
            : "translateY(0)"
          : `translateY(60px)`,
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${index * 0.15}s` : "0s",
        boxShadow: hovered
          ? `0 24px 80px rgba(0,0,0,0.4), 0 0 0 1px ${item.accent}22`
          : "0 8px 32px rgba(0,0,0,0.2)",
      }}
    >
      {/* Spotlight glow following mouse */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle 200px at ${mousePos.x}% ${mousePos.y}%, ${item.accent}18, transparent 70%)`,
            pointerEvents: "none",
            transition: "none",
          }}
        />
      )}

      {/* Corner accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: hovered ? "80px" : "40px",
          height: "2px",
          background: `linear-gradient(90deg, ${item.accent}, transparent)`,
          transition: "width 0.5s ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "2px",
          height: hovered ? "80px" : "40px",
          background: `linear-gradient(180deg, ${item.accent}, transparent)`,
          transition: "height 0.5s ease",
        }}
      />

      {/* Index number (ghost) */}
      <div
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "120px",
          fontWeight: 300,
          color: item.accent,
          opacity: hovered ? 0.06 : 0.03,
          lineHeight: 1,
          position: "absolute",
          right: "20px",
          bottom: "-10px",
          letterSpacing: "-0.04em",
          userSelect: "none",
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Icon / Logo */}
      {item.logo ? (
        <div
          style={{
            marginBottom: "28px",
            display: "block",
            width: "140px",
            height: "52px",
            position: "relative",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {/* Tinted overlay so logo feels at home on dark bg */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "4px",
              background: `radial-gradient(ellipse at 50% 50%, ${item.accent}18, transparent 80%)`,
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          <Image
            src={item.logo}
            alt="Anouar Association logo"
            fill
            style={{
              objectFit: "contain",
              objectPosition: "left center",
              mixBlendMode: "screen",
              filter: `brightness(0.92) saturate(1.1) drop-shadow(0 0 6px ${item.accent}55)`,
            }}
          />
        </div>
      ) : (
        <div
          style={{
            fontSize: "22px",
            color: item.accent,
            marginBottom: "28px",
            display: "block",
            transform: hovered ? "scale(1.2) rotate(15deg)" : "scale(1) rotate(0deg)",
            transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {item.icon}
        </div>
      )}

      {/* Tag */}
      <div
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "9px",
          fontWeight: 600,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: item.accent,
          marginBottom: "16px",
          opacity: 0.9,
        }}
      >
        {item.tag}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(28px, 3vw, 36px)",
          fontWeight: 400,
          color: CREAM,
          margin: "0 0 20px",
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
        }}
      >
        {item.title}
      </h3>

      {/* Divider */}
      <div
        style={{
          width: hovered ? "100%" : "40px",
          height: "1px",
          background: `linear-gradient(90deg, ${item.accent}66, transparent)`,
          marginBottom: "24px",
          transition: "width 0.6s ease",
        }}
      />

      {/* Body */}
      <p
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "13.5px",
          fontWeight: 300,
          lineHeight: 1.85,
          color: CREAM,
          opacity: 0.6,
          margin: "0 0 36px",
          flexGrow: 1,
        }}
      >
        {item.body}
      </p>

      {/* CTA */}
      <ReadMoreLink href={item.href} accent={item.accent} hovered={hovered} />
    </div>
  );
}

function ReadMoreLink({
  href,
  accent,
  hovered: cardHovered,
}: {
  href: string;
  accent: string;
  hovered: boolean;
}) {
  const [lHovered, setLHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setLHovered(true)}
      onMouseLeave={() => setLHovered(false)}
      style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: lHovered ? CREAM : accent,
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        transition: "color 0.3s ease",
      }}
    >
      Read More
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "28px",
          height: "28px",
          border: `1px solid ${accent}66`,
          borderRadius: "50%",
          transform: lHovered || cardHovered ? "translateX(4px)" : "translateX(0)",
          transition: "transform 0.35s ease, border-color 0.3s ease",
          borderColor: lHovered ? accent : `${accent}66`,
        }}
      >
        →
      </span>
    </Link>
  );
}

// Floating particle background
function ParticleField() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: 6 + Math.random() * 8,
    delay: Math.random() * 5,
    opacity: 0.08 + Math.random() * 0.12,
  }));

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: GOLD,
            opacity: p.opacity,
            animation: `engagementFloat${(p.id % 3) + 1} ${p.duration}s ${p.delay}s infinite ease-in-out`,
          }}
        />
      ))}
      {/* Large ambient orbs */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${GOLD}06 0%, transparent 70%)`,
          top: "-200px",
          right: "-100px",
          animation: "orbFloat1 14s infinite ease-in-out",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(106,159,203,0.05) 0%, transparent 70%)",
          bottom: "-100px",
          left: "10%",
          animation: "orbFloat2 18s infinite ease-in-out",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default function Engagement() {
  const { ref, visible } = useIntersectionObserver(0.1);
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      style={{
        position: "relative",
        padding: "140px 40px 160px",
        width: "100%",
        overflow: "hidden",
        background: "linear-gradient(180deg, #0A0A0A 0%, #0D0C0A 50%, #0A0A0A 100%)",
      }}
    >
      <ParticleField />

      {/* Horizontal rules */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
        }}
      />

      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div
          ref={titleRef}
          style={{
            textAlign: "center",
            marginBottom: "100px",
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                width: titleVisible ? "48px" : "0px",
                height: "1px",
                background: `linear-gradient(90deg, transparent, ${GOLD})`,
                transition: "width 1s ease 0.3s",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "9px",
                fontWeight: 600,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: GOLD,
              }}
            >
              Get to Know Us
            </span>
            <div
              style={{
                width: titleVisible ? "48px" : "0px",
                height: "1px",
                background: `linear-gradient(90deg, ${GOLD}, transparent)`,
                transition: "width 1s ease 0.3s",
              }}
            />
          </div>

          {/* Main title */}
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(56px, 8vw, 110px)",
              fontWeight: 300,
              color: CREAM,
              margin: "0 0 20px",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            Engagement
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              letterSpacing: "0.05em",
              color: CREAM,
              opacity: 0.5,
              margin: "0 auto",
              fontStyle: "italic",
            }}
          >
            From compassion to action
          </p>

          {/* Decorative underline */}
          <div
            style={{
              width: titleVisible ? "80px" : "0px",
              height: "1px",
              background: GOLD,
              margin: "32px auto 0",
              transition: "width 1.2s ease 0.5s",
              opacity: 0.6,
            }}
          />
        </div>

        {/* Cards grid */}
        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {ENGAGEMENT_ITEMS.map((item, i) => (
            <EngagementCard key={item.id} item={item} index={i} visible={visible} />
          ))}
        </div>

        {/* Bottom CTA row */}
        <div
          style={{
            textAlign: "center",
            marginTop: "80px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s",
          }}
        >
          <Link
            href="/impact"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: GOLD,
              border: `1px solid ${GOLD}44`,
              padding: "18px 48px",
              display: "inline-block",
              transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = GOLD;
              (e.currentTarget as HTMLAnchorElement).style.color = "#0A0A0A";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = GOLD;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = GOLD;
              (e.currentTarget as HTMLAnchorElement).style.borderColor = `${GOLD}44`;
            }}
          >
            View All Engagements
          </Link>
        </div>
      </div>
    </section>
  );
}
