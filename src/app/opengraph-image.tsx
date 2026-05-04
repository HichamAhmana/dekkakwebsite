import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Mohamed Dekkak";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle Gold Border Accent */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: "2px solid rgba(201,168,76,0.3)",
            display: "flex",
          }}
        />

        {/* Watermark/Logo Text */}
        <div
          style={{
            position: "absolute",
            fontSize: 280,
            color: "rgba(201,168,76,0.03)",
            fontFamily: "serif",
            fontWeight: 800,
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
            zIndex: 0,
            display: "flex",
          }}
        >
          DEKKAK
        </div>

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 84,
              fontFamily: "serif",
              color: "#F5F0E8",
              fontWeight: 400,
              letterSpacing: "0.1em",
              marginBottom: 24,
              display: "flex",
            }}
          >
            MOHAMED DEKKAK
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: 60, height: 2, background: "rgba(201,168,76,0.5)", marginRight: 24, display: "flex" }} />
            <div
              style={{
                fontSize: 32,
                color: "#C9A84C",
                fontWeight: 300,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                display: "flex",
              }}
            >
              Chairman · Investor · Philanthropist
            </div>
            <div style={{ width: 60, height: 2, background: "rgba(201,168,76,0.5)", marginLeft: 24, display: "flex" }} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
