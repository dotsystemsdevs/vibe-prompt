import { ImageResponse } from "next/og";

export const alt =
  "vibeprompt workflow: a 10-step interactive build loop from idea to shipped, progress saved locally";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STEPS = [
  "Environment",
  "Research",
  "PRD",
  "Stack",
  "Context",
  "Build",
  "Quality",
  "Ship",
  "Launch",
  "Iterate",
];

// Palette mirrors the site's Notion-clean monochrome design system.
const INK = "#211F1C";
const INK_SOFT = "#2E2C28";
const INK_FADED = "#4A4843";
const RULE = "rgba(33,31,28,0.16)";
const PAPER_SOFT = "#F7F7F5";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
          padding: "64px 72px",
        }}
      >
        {/* Top: logo mark + section wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", width: "56px", height: "56px", borderRadius: "14px", backgroundColor: INK }} />
          <span style={{ color: INK, fontSize: "27px", fontWeight: 700, letterSpacing: "-0.03em" }}>
            vibeprompt
          </span>
          <span style={{ color: INK_FADED, fontSize: "20px", fontWeight: 500 }}>· Cookbook</span>
        </div>

        {/* Center: kicker + headline + subline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <span
            style={{
              color: INK_FADED,
              fontSize: "17px",
              fontWeight: 600,
              letterSpacing: "0.16em",
              fontFamily: "monospace",
            }}
          >
            THE 10-STEP BUILD LOOP
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: INK,
              fontSize: "84px",
              fontWeight: 800,
              lineHeight: "1.0",
              letterSpacing: "-0.045em",
            }}
          >
            <span>From idea to</span>
            <span>shipped, in 10 steps.</span>
          </div>
          <div style={{ display: "flex", color: INK_FADED, fontSize: "25px", lineHeight: "1.35", maxWidth: "900px" }}>
            An interactive checklist. Progress saves locally. Pick up exactly where you left off.
          </div>
        </div>

        {/* Bottom: the 10 workflow steps as chips */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {STEPS.map((step, i) => (
            <div
              key={step}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: `1px solid ${RULE}`,
                borderRadius: "9px",
                backgroundColor: PAPER_SOFT,
                padding: "8px 14px",
              }}
            >
              <span style={{ color: INK_FADED, fontSize: "13px", fontFamily: "monospace" }}>
                {String(i).padStart(2, "0")}
              </span>
              <span style={{ color: INK_SOFT, fontSize: "14px", letterSpacing: "0.01em" }}>{step}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
