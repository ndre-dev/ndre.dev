# ndre.dev

Andre's personal site. A static Next.js site in two languages:

- English at `/`, with a page per small tool at `/<tool>`
- Brazilian Portuguese at `/pt-br` and `/pt-br/<tool>`

## Run it

1. `npm install`
2. `npm run dev`
3. Open http://localhost:3000

## Change the content

Copy, links and projects live in `lib/site.ts`. The small tools live in `lib/tools.ts`. Each piece of copy has an English (`en`) and a Portuguese (`pt`) version.

- To change page copy, edit both languages in `copy`.
- To show LinkedIn, set `linkedin` to the profile URL.
- To add a project, add an entry to `projects`. Give the note in both languages. Project names do not change.
- To add a tool, add an entry to `tools` and its screenshot to `public/tools/`. The tool gets its own page, share image and sitemap entry.
- Keep employers and clients generic. Do not name agencies, contracts or client brands.

## Files

| What                                                  | Where                                                   |
| ----------------------------------------------------- | ------------------------------------------------------- |
| Home page (shared by both languages)                  | `lib/home.tsx`                                          |
| Tool pages                                            | `lib/tool-page.tsx`                                     |
| Routes: English and Portuguese                        | `app/(en)/`, `app/(pt)/pt-br/`                          |
| Fonts, metadata, structured data for search engines   | `lib/root.tsx`                                          |
| 404 page                                              | `app/global-not-found.tsx`                              |
| Colours, themes, glow, film grain, intro, hover       | `app/globals.css`                                       |
| Tab icon, home screen icon, web app manifest          | `app/icon.tsx`, `app/apple-icon.tsx`, `app/manifest.ts` |
| Share images, one per page and language               | `lib/og.tsx`                                            |
| Fonts for the generated images (OFL licence included) | `assets/fonts/`                                         |
| Dobrigado logo                                        | `public/dobrigado/`                                     |
| Tool screenshots                                      | `public/tools/`                                         |
| Security and caching headers                          | `public/_headers`                                       |

The page opens in dark mode. The "light" button in the top bar switches themes, and the browser remembers the choice. `lib/theme.ts` and `lib/theme-toggle.tsx` hold the theme code.

The Dobrigado logo files are copies from the Dobrigado repo (`public/brand/`). The page shows the white file on dark and the navy file on light. Do not recolour or retype it.

The page loads the `-600.png` files. They are the same logos at 600px wide, compressed. If the logo changes, make them again from the full-size files with `sharp` (resize to 600px wide, palette PNG). Browsers cache the logo files for a week, so give a changed logo a new file name.

## Headers

`public/_headers` sets security headers for every page, and a one-year cache for build files in `/_next/static/`.

The Content Security Policy allows scripts only from this site and from Cloudflare Web Analytics. If you add a script or font from another site, add its address to the policy, or the browser blocks it.

## Analytics

Visitor numbers come from Cloudflare Web Analytics. It uses no cookies, so the site needs no consent banner. The sitemap is at `/sitemap.xml`.

## Deploy

The site runs on Cloudflare Workers as static files.

Every push to `main` deploys the site. Cloudflare Workers Builds runs `npm run build`, then `npx wrangler deploy`. Build logs are on the `ndre-dev` Worker's Deployments tab in the Cloudflare dashboard.

To deploy by hand:

1. Run `npx wrangler whoami` and check it shows the account in `wrangler.jsonc`.
2. Run `npm run deploy`.

The build writes the site to `out/`. `wrangler.jsonc` points Cloudflare at that folder.
