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
          background: "#0b0c10",
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.1) 2px, transparent 2px)",
          backgroundSize: "36px 36px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontSize: 148,
              fontWeight: 900,
              letterSpacing: -4,
              color: "#ffffff",
            }}
          >
            ANTE
          </span>
          <span
            style={{
              fontSize: 148,
              fontWeight: 900,
              letterSpacing: -4,
              color: "#d4af37",
            }}
          >
            .
          </span>
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: 30,
            fontWeight: 700,
            color: "#d4af37",
            textTransform: "uppercase",
            letterSpacing: 6,
          }}
        >
          Influencers · Gambling
        </div>
        <div style={{ marginTop: 22, fontSize: 24, color: "#A1A1AA" }}>
          1400+ стримеров · 43 casino-бренда · медиабаинг под ключ
        </div>
      </div>
    ),
    { ...size }
  );
}
