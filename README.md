# Roamize 🌲

Nathan's personal trip HQ. Logistics, shoot spots on a map, a loose schedule, and Explore — a trip-aware Claude scout built in.

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
