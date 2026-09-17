import { ImageResponse } from "next/og";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { restaurant } from "@/content/restaurant";

export const alt = "Naranj Damascus";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card. It is drawn rather than photographed so it stays legible at
 * thumbnail size and never depends on an image file being present.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "ar";
  const t = getDictionary(safeLocale);

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
          background: "linear-gradient(140deg, #0d0b09 0%, #17130f 55%, #0d0b09 100%)",
          color: "#f7f2e8",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brass frame */}
        <div
          style={{
            position: "absolute",
            inset: 34,
            border: "1px solid rgba(200,162,90,0.45)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 46,
            border: "1px solid rgba(200,162,90,0.2)",
            display: "flex",
          }}
        />

        {/* Eight-point star */}
        <svg width="86" height="86" viewBox="0 0 120 120" fill="none">
          <path
            d="M60 6 L74 24 L96 18 L90 40 L114 60 L90 80 L96 102 L74 96 L60 114 L46 96 L24 102 L30 80 L6 60 L30 40 L24 18 L46 24 Z"
            stroke="#c8a25a"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <circle cx="60" cy="63" r="19" stroke="#c8a25a" strokeWidth="2.8" />
          <path d="M60 44 C60 36 56 31 49 29" stroke="#c8a25a" strokeWidth="2.8" />
        </svg>

        <div
          style={{
            display: "flex",
            fontSize: 96,
            letterSpacing: safeLocale === "ar" ? 0 : 14,
            marginTop: 26,
            color: "#e3c97f",
          }}
        >
          {safeLocale === "ar" ? "نارنج" : "NARANJ"}
        </div>

        <div
          style={{
            display: "flex",
            width: 260,
            height: 1,
            background: "rgba(200,162,90,0.55)",
            margin: "28px 0",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#b8ab93",
            textAlign: "center",
            maxWidth: 820,
            lineHeight: 1.45,
          }}
        >
          {t.brand.tagline}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#8a6a2e",
            marginTop: 30,
            letterSpacing: safeLocale === "ar" ? 0 : 6,
          }}
        >
          {restaurant.address[safeLocale].city} · {t.brand.since}
        </div>
      </div>
    ),
    size,
  );
}
