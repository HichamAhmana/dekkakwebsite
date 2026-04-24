import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 100,
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#C9A84C",
          border: "2px solid rgba(201,168,76,0.2)",
          fontFamily: "serif",
          fontWeight: 300,
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
