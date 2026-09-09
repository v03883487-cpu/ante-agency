import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0B0E",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(226,139,47,0.35) 0%, rgba(226,139,47,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -140,
            right: -60,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,197,94,0.25) 0%, rgba(34,197,94,0) 70%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#101114",
              border: "2px solid #F4C95D",
            }}
          >
            <span style={{ fontSize: 44, fontWeight: 800, color: "#F4C95D" }}>A</span>
          </div>
          <span style={{ fontSize: 72, fontWeight: 800, color: "white" }}>ante.</span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 34,
            fontWeight: 600,
            color: "#F4C95D",
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          Influence agency for gambling &amp; iGaming
        </div>
        <div style={{ marginTop: 18, fontSize: 26, color: "#A1A1AA" }}>
          1400+ стримеров · 43 casino-бренда · медиабаинг под ключ
        </div>
      </div>
    ),
    { ...size }
  );
}
