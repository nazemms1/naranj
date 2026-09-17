"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";

/**
 * The palette is driven by `data-theme` on <html>, which the CSS in
 * globals.css keys every colour variable off. Dark is the default because the
 * restaurant's own photography is mostly evening work.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
      themes={["light", "dark"]}
    >
      {children}
    </NextThemeProvider>
  );
}
