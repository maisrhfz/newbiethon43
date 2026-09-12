# wont-be-late-frontend

UI for the Newbithon (뉴비톤) "Will I be late?" build. Talks to the
[backend project](../wont-be-late-backend)'s `/api/route` endpoint over HTTP — it does no
geo/transit math itself.

## Features

- Event time input.
- Location via the browser Geolocation API, with **manual fallback** every time (a preset
  picker for places near the venue, plus raw lat/lng entry) — geolocation gets denied
  constantly during demos, so never rely on it alone.
- Live, color-coded countdown to the latest safe departure time, with a browser
  `Notification` fired once things get urgent (works while the tab is open).
- Adjustable buffer (minutes), transport mode toggle (walk / transit / drive).
- Dark mode toggle (persisted in `localStorage`).

## Running locally

```bash
npm install
npm run dev
```

Runs on **http://localhost:3000**. Point it at the backend:

```bash
cp .env.local.example .env.local
# then set NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

(Run the backend alongside it — see its own README — on port 4000.)

## Architecture

- `lib/types.ts` — the only geo/transit-shaped types this project needs (`LatLng`,
  `TransportMode`), kept in sync by hand with the backend's `lib/geo.ts` / `lib/transit.ts`.
  All the actual estimation logic lives in the backend.
- `lib/presets.ts` — quick-pick locations near the venue (정운오IT교양관, 안암역, 고려대역,
  KU main gate). **Coordinates are approximate** — verify on a map before demoing.
- `hooks/useGeolocation.ts`, `hooks/useNotification.ts`, `hooks/useCountdown.ts` — browser
  API wrappers.
- `components/` — `LocationPicker` (geolocation + preset + manual entry), `EventForm`,
  `DepartureBanner`, `ThemeToggle`.

## Scope cuts (on purpose, given the one-day timeline)

- **Alerts only work while the tab is open.** True push notifications after the tab/browser
  is closed need a service worker plus a push server — out of scope for a one-day build.
- **No geocoding for free-text addresses.** Manual fallback is presets + raw coordinates.

## Deploying

Import this folder as its own Vercel project (separate from the backend). Set
`NEXT_PUBLIC_API_BASE_URL` under Project Settings → Environment Variables to the backend's
deployed URL. Check **Deployment Protection** early so judges/mentors can open the link
without a Vercel login.
