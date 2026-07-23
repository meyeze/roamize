# Roamize 🌲

Nathan's personal trip HQ. Logistics, shoot spots on a map, a loose schedule, and Explore — a trip-aware Claude scout built in.

## 🌤 Forecast tab

The old Smoke Watch, evolved for the trip itself:

- **Scout's shoot report** — every trip morning, Sonnet grades the shooting day (A–F) from smoke, visibility, cloud character, wind, rain windows and golden hour, names the best window and the best unshot spot. Re-files every 3 hrs, timestamp shown, ↻ to re-file now. Before the trip there's a test-report button.
- **Current air quality** — live US AQI at six Hwy 61 towns (Duluth → Grand Portage), AirNow color bands, no key needed.
- **This week** — 7-day weather rows (conditions, wind/gusts, rain %, hi/lo) with daily worst-case AQI inline; trip days get an accent edge; NWS alerts below.
- **Active fires nearby** — condensed NIFC list, sorted by distance. US incidents only; Canadian smoke still shows in AQI.

## 🧭 Saved routes on the loose plan

Each day now has **+ route** next to + anchor: build a multi-stop route in Apple Maps, Share → Copy, paste the `maps.apple/r/…` link with a label. It saves as a tappable card on that day that reopens the exact route in Apple Maps. (Shared links replay the route exactly as saved — Apple doesn't let outside apps rewrite the first stop to "current location". For that, use Roamize's route planner, where Stop A can be **📍 Current location**.)

Scout can also **read links now** — paste any URL in chat (or hit Scout This in the feed) and the app fetches the page text for him. And his briefing now includes your Details-tab logistics as hard constraints, so fill in your flights and he'll plan around them.

## 🗺 Home upgrades

- **Pin types** — 📷 shoot / 🍽️ food / 🛍️ shop / 📍 stop. Filter chips above the map, non-shoot pins live in a **Places** list under the loose plan. Scout's suggestions carry a type too.
- **Collapsible sections** — tap a section title to fold Shoot list / Loose plan / Places.
- **🧭 Route planner** — button on the map: pick stops (A, B, + up to 5) from base + pins, see the real drive drawn on the map with alternates and mi/time totals (OSRM, free), then **Open in Apple Maps**. Multi-stop handoff uses Apple's `+to:` trick — works on iOS today, not officially documented.

## ✦ Scout bubble + Explore feed

Scout moved out of the Explore tab into a **floating ✦ bubble** on every screen — same chats, memory, suggestions. Explore is now a **feed**: curated North Shore guides (readable in-app via a clean-text reader), fresh geo-tagged photos near your pins (Flickr + Wikimedia, ≤5 yrs old), the Grand Marais live harbor cam, and — if you add a free YouTube API key in Settings — live streams and fresh videos about the area. Every card: **💾 Save** (Saved filter keeps them) and **✦ Scout This** (opens Scout pre-loaded with the link). Feed refreshes on open, cached 6 hrs.

## Deploy to GitHub Pages (one-time, ~5 min)

1. Go to **github.com/new** → name the repo `roamize` → set it **Public** → Create repository.
2. On the empty repo page, click **"uploading an existing file"**, drag in ALL files from this folder (`index.html`, `manifest.json`, `sw.js`, `README.md`, and the three `icon-*.png` files) → **Commit changes**.
3. Repo → **Settings** → **Pages** (left sidebar) → under "Branch" pick **main** and **/ (root)** → **Save**.
4. Wait ~1 minute. Your app is live at:
   `https://YOUR-USERNAME.github.io/roamize/`

## Add to your iPhone home screen

1. Open that URL in **Safari**.
2. Tap the **Share** button → **Add to Home Screen** → Add.
3. It opens full-screen like a native app, with the Roamize icon.

## First-run setup

- Tap the trip name (top right) → **Settings** → paste your Anthropic API key. It's stored only in your browser — never uploaded anywhere except directly to Anthropic when you chat.
- Details tab → fill in your flight / rental car / Airbnb, and set your **Home base** coordinates (long-press your Airbnb in Apple Maps → copy coordinates). The map re-centers around it.

## Desktop

Same URL, same app — open `https://YOUR-USERNAME.github.io/roamize/` in any desktop browser. At ≥900px wide it switches to a desktop layout: side navigation rail, big sticky map with lists beside it, centered Claude-style Explore column.

## Sync between devices

Roamize syncs through a **private GitHub Gist** on your account — free, no backend.

1. github.com → Settings → Developer settings → Personal access tokens → **Generate new token (classic)** → check only the **gist** scope → generate.
2. In Roamize Settings (on EVERY device you want synced), paste the token → Save.
3. Tap the **↻ sync button** in the header. First sync creates the private gist; after that, whichever copy is newer wins (it asks before overwriting local data).

Notes: your Anthropic API key and GitHub token are stripped before upload — they never leave the device. Sync is manual by design: hit ↻ after making changes on one device, then ↻ on the other.

## Updating the app later

Edit files → drag the new version onto the repo (GitHub replaces them) → commit. The service worker caches aggressively, so after deploying an update, bump `roamize-v1` to `roamize-v2` in `sw.js` (or hard-refresh).

## The sandbox: where to hack

Everything is in `index.html`, organized in labeled sections:

- **Design tokens** — top of the `<style>` block. Change `--accent` and the whole app re-skins.
- **`DEFAULT_DATA`** — the seed data model. This is the app's DNA: trips, pins, logistics, gear.
- **`EXPLORE_MODEL` / `systemPrompt()`** — the Explore agent's brain. Swap the model, change its personality, feed it more context.
- **Easter egg dept.** — clearly labeled. Add your own.

Data lives in `localStorage`. Settings → Export gives you a JSON backup; Import restores it on any device.

## Costs

Explore runs on Claude Haiku with a trimmed context window — typical messages cost a fraction of a cent. Maps (OpenStreetMap/CARTO) and weather (Open-Meteo) are free, no keys.
