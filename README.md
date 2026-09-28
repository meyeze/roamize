# Roamize 🍁

Nathan's personal trip HQ. Logistics, shoot spots on a map, a loose schedule, a foliage tracker, and Scout, a trip-aware Claude field producer built in.

**Current trip:** New England Fall, Oct 12 to 16, 2026, based in Intervale, NH. The region block in `NEW_ENGLAND_TRIP` (top of the script) holds everything place-specific: towns for the conditions strip, the three state foliage reports, drone rules, and the Explore guides. Nothing else in the code names a place, so the next trip just gets its own block (or edit it in-app: Details → Region & rules).

## What changed in v2 (Sept 2026)

- **Sonnet 5.5 everywhere.** Scout, the shoot report and the foliage tracker all run on `claude-sonnet-5-5`. If Anthropic retires a model mid-trip, `callClaude()` walks the fallback list automatically and tells you which one it landed on. Override the model in Settings.
- **🍁 Foliage tracker** (Forecast tab). Every day Scout reads the official NH (twice weekly), Vermont and Maine foliage reports and files: percent color for the region that holds your base, a stage, peak ETA, the best drive for color right now, and a by-region table for all three states. Pulls once a day automatically from now until the trip ends, plus ↻ Pull now. A history of the base percentage builds so the trend shows. The number also rides on the Home tab as a chip.
- **Shoot report, fall edition.** Now files once a day pre-trip too (labelled as such), every 3 hours in-trip. It weighs foliage stage in the grade, judges wind by the 400 ft number (Open-Meteo's 120 m level) not ground, flags cold-battery mornings below 40°F, and reads the dew-point spread for valley fog at dawn. Grading bias: atmospheric light over clean golden hour, per the North Shore debrief.
- **Scout has two memories.** Field rules (`DB.memory`) travel to every trip and are seeded from the North Shore debrief: the day template, the 45-minute radius, fewer anchors scouted deeper, the commit rule, the Osmo's one job. Trip notes stay with the trip. Scout can write to either (`"scope":"global"` or `"trip"`), and both are editable under 🧠 Memory. This is the fix for memory not holding: it was per-trip only, so a new trip started blank.
- **Scout is narrower.** Field producer for THIS trip, not a general chatbot. Every suggestion states drive time from base and should include a launch point and parking. Suggestions carry those into the pin.
- **🚗 Windshield check.** Each day of the loose plan shows the round-trip drive time (base → anchored pins → base, via OSRM) with a color: under 2h fine, 2 to 3.5h long day, over 3.5h too much road. Anchors created from Scout, the dice, or the pin picker in "+ anchor" are matched to pins; free-text anchors match by name.
- **Pins carry launch + parking notes** (✎ Edit in the popup). The shoot list shows "scouted ✓" only when both are filled. Scout sees which pins are not fully scouted.
- **📍 Capture** on the map: one tap, GPS fix, name it, done. For the Devil Track Lake moments. Captured pins get a ✨ in the list.
- **Wind chips** use the higher of ground / 400 ft wind. 🚁 Wind sheet shows both.
- **PWA / iOS 27.** Safari 27 has no breaking changes for home-screen web apps. The manifest gained `id`, `display_override` and a maskable icon; the service worker registers Static Routing rules (Safari 27 / Chrome) so live-data hosts bypass the worker, older browsers ignore it. Cache bumped to `roamize-v11`.

## 🌤 Forecast tab

- **Scout's shoot report**, graded A to F, best window, today's spot, the one thing to watch. Pre-trip: once a day. In-trip: every 3 hrs, ↻ to re-file.
- **🍁 Foliage tracker**, see above.
- **This week**: 7-day rows (conditions, wind/gusts, rain %, hi/lo) with worst-case AQI; trip days get an accent edge; NWS alerts below.
- **Air quality** at the region's towns, and **active fires** from the NIFC map (bounding box follows base).

## 🧭 Saved routes on the loose plan

Each day now has **+ route** next to + anchor: build a multi-stop route in Apple Maps, Share → Copy, paste the `maps.apple/r/…` link with a label. It saves as a tappable card on that day that reopens the exact route in Apple Maps. (Shared links replay the route exactly as saved — Apple doesn't let outside apps rewrite the first stop to "current location". For that, use Roamize's route planner, where Stop A can be **📍 Current location**.)

Scout can also **read links now** — paste any URL in chat (or hit Scout This in the feed) and the app fetches the page text for him. And his briefing now includes your Details-tab logistics as hard constraints, so fill in your flights and he'll plan around them.

## 🗺 Home upgrades

- **Pin types** — 📷 shoot / 🍽️ food / 🛍️ shop / 📍 stop. Filter chips above the map, non-shoot pins live in a **Places** list under the loose plan. Scout's suggestions carry a type too.
- **Collapsible sections** — tap a section title to fold Shoot list / Loose plan / Places.
- **🧭 Route planner** — button on the map: pick stops (A, B, + up to 5) from base + pins, see the real drive drawn on the map with alternates and mi/time totals (OSRM, free), then **Open in Apple Maps**. Multi-stop handoff uses Apple's `+to:` trick — works on iOS today, not officially documented.

## ✦ Scout bubble + Explore feed

Scout moved out of the Explore tab into a **floating ✦ bubble** on every screen — same chats, memory, suggestions. Explore is now a **feed**: the region's curated guides (state foliage reports, Mount Washington higher-summits forecast, Kancamagus and White Mountains guides, readable in-app via a clean-text reader), fresh geo-tagged photos near your pins (Flickr + Wikimedia, ≤5 yrs old), and — if you add a free YouTube API key in Settings — live streams and fresh videos about the area. Every card: **💾 Save** (Saved filter keeps them) and **✦ Scout This** (opens Scout pre-loaded with the link). Feed refreshes on open, cached 6 hrs.

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

Edit files → drag the new version onto the repo (GitHub replaces them) → commit. The service worker caches aggressively, so after deploying an update, bump the `CACHE` name in `sw.js` (currently `roamize-v11`) (or hard-refresh).

## The sandbox: where to hack

Everything is in `index.html`, organized in labeled sections:

- **Design tokens** — top of the `<style>` block. Change `--accent` and the whole app re-skins.
- **`NEW_ENGLAND_TRIP` / `SEED_MEMORY` / `DEFAULT_DATA`** — the seed trip, the field rules, and the data model. `migrate()` adds the trip and the rules to any device that already has data, without touching what's there.
- **`SCOUT_MODEL` / `MODEL_FALLBACKS` / `callClaude()` / `systemPrompt()`** — Scout's brain. One helper makes every API call and handles model fallback.
- **`pullFoliage()`** — the foliage tracker prompt and sources. **`maybeReport()`** — the shoot report prompt.
- **Easter egg dept.** — clearly labeled. Add your own.

Data lives in `localStorage`. Settings → Export gives you a JSON backup; Import restores it on any device.

## Costs

Scout runs on Sonnet 5.5 with a trimmed context window: a chat turn is a cent or two, the daily foliage pull and shoot report about the same each. Maps (OpenStreetMap/CARTO) and weather (Open-Meteo) are free, no keys.
