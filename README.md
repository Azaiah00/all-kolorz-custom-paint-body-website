# All Kolorz Custom Paint & Body — spec website

A finished, static spec website for **All Kolorz Custom Paint & Body** (232 E Belt Blvd, Richmond, VA 23224), built by Couture House Co. as a sales pitch. After the owner approves it, it can go live as-is.

- Design direction: "Candy Coat". Gloss black, candy purple and candy red, chrome accents. Type is Anton (display), Inter (body) and Yellowtail (script accents), all self-hosted.
- Motion: flip-flop paint headings that shift color as you scroll, an airbrush-style reveal on photos, a chrome sweep across buttons, and pinstripe flourishes that draw in. All of it turns off under `prefers-reduced-motion`, and the content is fully visible without JavaScript.
- Pages: `index.html`, `services.html`, `gallery.html`, `car-shows.html`, `quote.html`, `404.html`
- No build step, frameworks or external requests. Everything is in `assets/` (one stylesheet, one script, fonts and images).

## Preview locally
Double-click `index.html`, or serve the folder so fonts and the form behave like production:

```
cd all-kolorz-custom-paint-body
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy on Netlify
1. Drag this folder onto https://app.netlify.com/drop, or connect a Git repo (publish directory `.`, no build command).
2. `netlify.toml` already sets the security headers (CSP, HSTS and others), cache rules and the branded 404.
3. Under **Forms**, turn on form detection. The `quote` form (with photo upload) then collects submissions. Add an email notification to the shop's inbox.
4. Add the custom domain and turn on HTTPS.

## Domain
Proposed: **allkolorzrva.com**. The canonical URLs, Open Graph tags, sitemap, robots.txt and llms.txt all use it. If you pick a different domain, find and replace `allkolorzrva.com` across the site.

## SEO / AEO / GEO
- Every page has a unique title and description, a canonical URL, and Open Graph and Twitter tags (`assets/img/og.jpg`).
- JSON-LD: `AutoBodyShop` on every page, with services in `hasOfferCatalog`. The home page adds `aggregateRating`, `WebSite` and `FAQPage`. Subpages add `BreadcrumbList`. Services adds `FAQPage`. Car Shows adds `Event`.
- `llms.txt` is a plain-text fact sheet for AI answer engines. `robots.txt` allows GPTBot, ClaudeBot, PerplexityBot and Google-Extended.

## Keeping it current
- **Car shows:** edit the "Upcoming show" block in `car-shows.html`, the event banner in `index.html`, and the `Event` JSON-LD. After Oct 24, 2026, move Dreams vs Nightmares into "Recent shows".
- **Photos:** add optimized `.webp` files to `assets/img/` (max 1600px wide, plus a `-800` version) and copy an existing gallery tile.

See `LAUNCH-NOTES.md` for everything the owner needs to confirm before launch.
