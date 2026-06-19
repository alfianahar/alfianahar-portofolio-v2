import { ImageResponse } from "next/og";
import { siteConfig } from "@lib/seo";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#fafafa",
        color: "#050505",
        padding: 72,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: -6 }}>AN</div>
        <div style={{ fontSize: 28, color: "#525252" }}>alfian aswinda</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ maxWidth: 880, fontSize: 80, fontWeight: 700, letterSpacing: -5 }}>
          Intelligent Interfaces. Reliable Systems.
        </div>
        <div style={{ maxWidth: 760, fontSize: 30, lineHeight: 1.35, color: "#525252" }}>
          {siteConfig.description}
        </div>
      </div>
    </div>,
    size,
  );
}
