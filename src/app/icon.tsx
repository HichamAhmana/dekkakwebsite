import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#C9A84C",
          borderRadius: "4px",
          border: "1px solid rgba(201,168,76,0.3)",
          fontFamily: "serif",
          fontWeight: 600,
        }}
      >
        D
      </div>
    ),
    {
      ...size,
    }
  );
}
