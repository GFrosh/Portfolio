import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Build-time OG card. No external fonts or images are fetched, so this renders
 * deterministically on Vercel's build workers.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#05070d",
          backgroundImage:
            "radial-gradient(900px 520px at 12% 8%, rgba(34,211,238,0.22), transparent 62%), radial-gradient(760px 480px at 92% 96%, rgba(59,130,246,0.20), transparent 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              border: "1px solid rgba(34,211,238,0.55)",
              background: "rgba(34,211,238,0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#22d3ee",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            G
          </div>
          <div style={{ color: "#a3b3d1", fontSize: 22, letterSpacing: 1 }}>devgideon.me</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ color: "#e9eefb", fontSize: 74, fontWeight: 700, lineHeight: 1.05 }}>
            {site.name}
          </div>
          <div style={{ color: "#22d3ee", fontSize: 40, fontWeight: 600 }}>{site.title}</div>
          <div style={{ color: "#a3b3d1", fontSize: 28, lineHeight: 1.4, maxWidth: 940 }}>
            {site.hero.headline}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, color: "#7dd3fc", fontSize: 22 }}>
          <span>Lagos, Nigeria (WAT)</span>
          <span style={{ color: "#1e2a45" }}>•</span>
          <span>React · Next.js · Node.js · PostgreSQL</span>
        </div>
      </div>
    ),
    size,
  );
}
