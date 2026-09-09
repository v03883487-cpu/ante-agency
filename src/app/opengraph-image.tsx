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
          background: "#ffffff",
          backgroundImage:
            "radial-gradient(rgba(10,10,10,0.08) 2px, transparent 2px)",
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
              color: "#0A0A0A",
            }}
          >
            ANTE.
          </span>
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: 30,
            fontWeight: 600,
            color: "#0A0A0A",
            textTransform: "uppercase",
            letterSpacing: 6,
          }}
        >
          Influencers · Gambling
        </div>
        <div style={{ marginTop: 22, fontSize: 24, color: "#71717A" }}>
          1400+ стримеров · 43 casino-бренда · медиабаинг под ключ
        </div>
      </div>
    ),
    { ...size }
  );
}
