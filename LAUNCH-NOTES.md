# Launch notes — confirm with the owner before going live

## Facts to confirm
1. **Hours:** Mon–Fri 9 AM–5 PM, Sat–Sun closed. Are appointments or after-hours drop-offs available? Update the site, the JSON-LD `openingHoursSpecification` and llms.txt to match.
2. **"Since 2009":** based on the Virginia LLC registration date (2009). Confirm this is when the shop opened.
3. **Owner name:** deliberately left off the site. The registered agent on state records (Anthony F. Barber) is **not** named as owner. Ask whether the owner wants to be named or quoted.
4. **Google rating 4.6 from 39 reviews:** shown on the home page and in the home-page JSON-LD `aggregateRating`. Refresh the numbers at launch. The "Read reviews on Google" button is a Google Maps search link; swap in the exact Google Business Profile URL if the owner has one.
5. **ATB Kustoms relationship:** the site calls it "in-house custom work by ATB Kustoms (by Ashanti)", covering airbrush, lettering, pinstriping and starlight headliners. Confirm the wording, whether Ashanti may be named, and the brand name. The starlight flyer says "ATB Designs by Ashanti" while the logo and hashtags say "ATB Kustoms".
6. **Starlight prices** (from the ATB flyer; labelled "confirm current pricing" on the site): 250 stars from $250, 350 from $300, 450 from $350, 550 from $450, 650 from $550, 750 from $600, 850 from $700, 900 from $750, 1,000 from $800, 1,100 from $850, 1,200 from $900, 1,200+ price varies. The flyer notes prices vary by vehicle type. It also says "Satisfaction guaranteed", which the site does **not** repeat.
7. **"Best Street Rod" trophy:** the owner's post reads "BEST STREET ROD!! Trophy for @themoonlightcruisein 2025 Car Show". The photo shows a hand-painted, lettered model hot rod trophy, so the site says the shop **painted the trophy for** the Moonlight Cruise-In 2025. It does not say the shop won it. If All Kolorz actually won Best Street Rod, change the wording in the trust strip, the car-shows page and the gallery caption.
8. **BusinessRate "Top 5 of 2025, South Richmond, Auto Body Shop category":** taken from the award letter the owner posted, and shown in the trust strip and llms.txt. Confirm the owner wants it displayed. It comes from a paid-marketing-style ranking service.
9. **Moonlight Cruise-In (June 21, 2025, Richmond Raceway):** the A.K.C. logo appears on the flyer. The site says "All Kolorz was on the flyer". Confirm the role (sponsor, vendor or trophy maker).
10. **Dreams vs Nightmares: Halloween Edition:** Sat Oct 24, 2026, 6–10 PM, 232 E Belt Blvd (from the flyer; the location is the shop). The flyers show Eventbrite (some versions show Humanitix) for tickets, but no ticket URL was verified. The ticket button currently goes to @dreamchasersautoclubrva on Instagram. **Get the real ticket link** and put it in the button and in the Event JSON-LD (`offers.url`).
11. **Built Old vs. Bought New:** first flyer said Sat July 18 (2026), 6–10 PM. A later flyer says "date is moved to August 1st, same time & location", and a recap was posted. The site lists it as Aug 1, 2026. Confirm.
12. **Block Party:** Sat June 13, 2026, 6–10 PM at the shop (flyer plus two recap posts).
13. **90s/00s Car Show:** the brief said Sept 27, 2026, but the flyer reads "Saturday, September 27th" with no year. Sept 27 falls on a Saturday in **2025**, not 2026. A follow-up flyer shows **11.01.25**, and captions mention a weather postponement. The site lists it as fall 2025 (rain-delayed from Sept 27 to Nov 1, 2025). Confirm, and confirm whether that show actually took place.
14. **Services:** all come from the owner's captions and photos. The site makes **no** claims about insurance/DRP, warranties, free estimates, frame machines, certifications or volume. Ask whether the shop works with insurance claims, and whether estimates are free. If so, these are worth adding.
15. **Service area:** the JSON-LD `areaServed` lists Richmond, Southside Richmond, Chesterfield County and Henrico County. Adjust as needed.

## Photo credits and licensing
All photos come from the business's own public Instagram and Facebook posts (@all_kolorz_ / allkolorz804). They were cropped to remove letterboxing, TikTok watermarks and text overlays. **The owner must approve and license their use.** Some shots were taken by other people:
- Block Party photos: the post credits a photographer ("PC:"). Get permission, or credit them.
- Built vs Bought and night-show photos: some were reposted from @dreamchasersautoclubrva and filmers such as @zayydreamin. Confirm the rights.
- The Dreams vs Nightmares flyer is Dreamchasers Auto Club artwork. Confirm it can be used.
- Vehicles shown belong to customers (license plates are visible on a few, e.g. the BMW E24 and Mustangs). Consider blurring plates if the owner prefers.
- No photos of children are used. Identifiable people were cropped out where possible.

## Items to swap or improve after launch
- Real starlight headliner photos: the "Interiors" gallery filter currently shows one designed starlight tile, because no interior photos were available.
- Real before/after pairs, especially collision and headlight restoration (the headlight photo is a "before").
- Exact Google Business Profile URL and review link.
- Eventbrite ticket URL for each upcoming show.
- An owner or shop photo for the home page, if the owner wants a face on the brand.

## Forms
The quote form (`quote.html`) is a **Netlify Form** with a honeypot and an optional single-photo upload (up to 8 MB, checked client-side). It only works once the site is deployed on Netlify with form detection on. Set email notifications to the shop's inbox. Without JavaScript, the form falls back to a regular POST that returns to `quote.html?sent=1`, which shows the success message.

## Proposed domain
**allkolorzrva.com.** Register it, then point it at Netlify.
