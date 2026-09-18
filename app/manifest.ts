import type { MetadataRoute } from "next";
import { restaurant } from "@/content/restaurant";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: restaurant.legalName.ar,
    short_name: restaurant.name.ar,
    description: "مطعم نارنج — الشارع المستقيم، دمشق القديمة.",
    start_url: "/ar",
    display: "standalone",
    background_color: "#0d0b09",
    theme_color: "#0d0b09",
    lang: "ar",
    dir: "rtl",
    // Built by `scripts/make-icons.js` from the restaurant's own wordmark.
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
