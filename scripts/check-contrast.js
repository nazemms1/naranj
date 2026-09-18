/**
 * WCAG contrast audit for both themes.
 *
 * It parses the real values out of app/globals.css rather than keeping its own
 * copy, so the audit cannot drift away from the palette it is auditing.
 *
 *   node scripts/check-contrast.js
 */
const fs = require("fs");

/* Newlines are normalised because the selectors below span two lines, and a
 * checkout with core.autocrlf=true (the Windows default) hands us CRLF. */
const css = fs.readFileSync("app/globals.css", "utf8").replace(/\r\n/g, "\n");

/** Pulls the `--c-*` declarations out of one theme block. */
function readTheme(selector) {
  const start = css.indexOf(selector);
  if (start < 0) throw new Error(`theme block not found: ${selector}`);
  const open = css.indexOf("{", start);
  const close = css.indexOf("\n}", open);
  const body = css.slice(open, close);
  const vars = {};
  for (const [, name, value] of body.matchAll(/--c-([\w-]+):\s*([^;]+);/g)) {
    vars[name] = value.trim();
  }
  return vars;
}

const themes = {
  dark: readTheme(':root,\n[data-theme="dark"]'),
  light: readTheme('[data-theme="light"] {'),
};

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lum = (h) => {
  const [r, g, b] = hex(h).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

/** Foreground tokens paired with the surfaces they actually appear on. */
const SURFACES = ["ink-900", "ink-950", "ink-850"];

const FOREGROUNDS = (() => {
  // Derive the list from the codebase: a token only has to clear a text
  // target if something actually paints text in it. Tokens used only for
  // borders, fills and gradients are not held to a text ratio.
  const used = new Set();
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = `${dir}/${entry.name}`;
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".tsx")) {
        const src = fs.readFileSync(full, "utf8");
        for (const [, token] of src.matchAll(
          /text-((?:ivory|stone|brass)-\d{2,3})/g,
        )) {
          used.add(token);
        }
      }
    }
  };
  walk("components");
  walk("app");

  const notes = {
    "ivory-50": "strongest heading",
    "ivory-100": "heading",
    "ivory-200": "body copy",
    "stone-300": "secondary copy",
    "stone-400": "muted copy",
    "stone-500": "quiet copy",
    "stone-600": "finest print",
    "brass-200": "brass copy",
    "brass-300": "brass copy",
    "brass-400": "brass label",
    "brass-500": "brass label / icon",
    "brass-600": "brass kicker",
  };
  return [...used].sort().map((token) => [token, 4.5, notes[token] ?? "text"]);
})();

let failures = 0;

for (const [themeName, vars] of Object.entries(themes)) {
  console.log(`\n${themeName.toUpperCase()}`);
  for (const [token, min, note] of FOREGROUNDS) {
    const fg = vars[token];
    if (!fg || !fg.startsWith("#")) continue;

    const worst = SURFACES.reduce(
      (acc, surface) => {
        const c = ratio(fg, vars[surface]);
        return c < acc.c ? { c, surface } : acc;
      },
      { c: Infinity, surface: "" },
    );

    const ok = worst.c >= min;
    if (!ok) failures += 1;
    console.log(
      `  ${ok ? "PASS" : "FAIL"}  ${token.padEnd(11)} ${worst.c
        .toFixed(2)
        .padStart(5)}:1 on ${worst.surface.padEnd(8)} (min ${min}) — ${note}`,
    );
  }

  // The primary button paints its label in the page colour on a brass fill.
  const btn = ratio(vars["ink-900"], vars["brass-300"]);
  const btnOk = btn >= 4.5;
  if (!btnOk) failures += 1;
  console.log(
    `  ${btnOk ? "PASS" : "FAIL"}  ${"button".padEnd(11)} ${btn
      .toFixed(2)
      .padStart(5)}:1 on brass-300 (min 4.5) — primary action`,
  );
}

console.log(
  failures ? `\n${failures} pairing(s) below target` : "\nAll pairings clear their targets",
);
process.exitCode = failures ? 1 : 0;
