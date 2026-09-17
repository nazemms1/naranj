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
    icons: [
      { src: "/naranj-mark.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
  };
}
