"use client";

const GOLD = "#C9A84C";
const TEXT = "var(--text-color)";

const STATS = [
  { number: "30+", label: "Years of Experience" },
  { number: "1992", label: "Adgeco Founded" },
  { number: "15+", label: "Countries" },
  { number: "8", label: "Foundations" },
  { number: "17", label: "Councils" },
];

export default function Stats() {
  return (
    <section
      style={{
        width: "100%",
        padding: "60px 0",
        borderTop: "1px solid rgba(201,168,76,0.15)",
        borderBottom: "1px solid rgba(201,168,76,0.15)",
        background:
          "radial-gradient(circle at center, rgba(201,168,76,0.05), transparent 60%)",
        position: "relative",
      }}
    >
      {/* edge fade illusion */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.85), transparent 15%, transparent 85%, rgba(0,0,0,0.85))",
        }}
      />

      <div
        style={{
          overflow: "hidden",
          display: "flex",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: "marquee 28s linear infinite",
            alignItems: "center",
          }}
        >
          {[...STATS, ...STATS].map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 70px",
                minWidth: "260px",
                position: "relative",
              }}
            >
              {/* separator line */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  height: "40px",
                  width: "1px",
                  background: "rgba(201,168,76,0.15)",
                }}
              />

              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "54px",
                    fontWeight: 300,
                    color: GOLD,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {s.number}
                </div>

                <div
                  style={{
                    marginTop: "6px",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: TEXT,
                    opacity: 0.55,
                  }}
                >
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}