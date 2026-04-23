"use client";

const GOLD = "#C9A84C";
const CREAM = "#F5F0E8";

const STATS = [
  { number: "30+",  label: "Years of Experience" },
  { number: "1992", label: "Adgeco Founded" },
  { number: "15+",  label: "Countries" },
  { number: "8",    label: "Foundations" },
  { number: "17",   label: "Councils" },
];

export default function Stats() {
  return (
    <section style={{
      width: "100%",
      borderTop: "1px solid rgba(201,168,76,0.12)",
      borderBottom: "1px solid rgba(201,168,76,0.12)",
      background: "rgba(201,168,76,0.03)",
      padding: "48px 40px",
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "48px",
        justifyItems: "center",
      }}>
        {STATS.map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "52px",
              fontWeight: 300,
              color: GOLD,
              lineHeight: 1,
              marginBottom: "10px",
            }}>
              {s.number}
            </div>
            <div style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              color: CREAM,
              opacity: 0.45,
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
