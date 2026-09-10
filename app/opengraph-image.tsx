import { ImageResponse } from "next/og";

export const alt = "Soulful Healing Adventure — Rishikesh, 14–15 November 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(family: string, weight: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/);
  if (!match) throw new Error("Could not find font URL in Google Fonts CSS");
  const fontResponse = await fetch(match[1]);
  if (!fontResponse.ok) throw new Error("Failed to fetch font file");
  return fontResponse.arrayBuffer();
}

export default async function Image() {
  const title = "Soulful Healing Adventure";

  let fontData: ArrayBuffer | null = null;
  try {
    fontData = await loadGoogleFont("Playfair+Display", "700", title);
  } catch {
    fontData = null;
  }

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
          background: "#faf7f0",
          padding: "60px",
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          stroke="#174d3b"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <g transform="rotate(0 60 60)">
            <ellipse cx="60" cy="37" rx="9" ry="24" />
          </g>
          <g transform="rotate(60 60 60)">
            <ellipse cx="60" cy="37" rx="9" ry="24" />
          </g>
          <g transform="rotate(120 60 60)">
            <ellipse cx="60" cy="37" rx="9" ry="24" />
          </g>
          <g transform="rotate(180 60 60)">
            <ellipse cx="60" cy="37" rx="9" ry="24" />
          </g>
          <g transform="rotate(240 60 60)">
            <ellipse cx="60" cy="37" rx="9" ry="24" />
          </g>
          <g transform="rotate(300 60 60)">
            <ellipse cx="60" cy="37" rx="9" ry="24" />
          </g>
          <circle cx="60" cy="60" r="6" />
        </svg>
        <div
          style={{
            marginTop: 26,
            fontSize: 26,
            letterSpacing: 5,
            color: "#5d665b",
            fontFamily: "sans-serif",
            fontWeight: 600,
          }}
        >
          RISHIKESH · 14–15 NOVEMBER 2026
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 72,
            color: "#174d3b",
            fontFamily: fontData ? "Playfair Display" : "serif",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 28,
            color: "#27312d",
            opacity: 0.7,
            fontStyle: "italic",
            fontFamily: "serif",
          }}
        >
          Same you. But a kinder, calmer, brighter version.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData ? [{ name: "Playfair Display", data: fontData, style: "normal", weight: 700 }] : [],
    }
  );
}
