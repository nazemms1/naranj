import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext turns the Next.js build into a Cloudflare Worker, so the site keeps
 * everything `next build` produces: the reservation API route, the dynamic
 * OG image, `sitemap.ts` / `robots.ts`, and server-rendered locale pages.
 *
 * Nothing here needs an incremental cache yet — every page is static apart
 * from the API route, which is not cached at all. If ISR is ever added, wire
 * `incrementalCache` to the R2 or KV cache from `@opennextjs/cloudflare`.
 */
export default defineCloudflareConfig();
