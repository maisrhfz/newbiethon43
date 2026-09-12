# wont-be-late-backend

API-only Next.js project for the Newbithon (뉴비톤) "Will I be late?" build. No UI — just
`POST /api/route`, which the [frontend project](../wont-be-late-frontend) calls over HTTP.

## Running locally

```bash
npm install
npm run dev
```

Runs on **http://localhost:4000** (not 3000, so it doesn't collide with the frontend running
alongside it — see `package.json`).

## `POST /api/route`

Request body:

```json
{
  "origin": { "lat": 37.5898, "lng": 127.0326 },
  "destination": { "lat": 37.5863, "lng": 127.0297 },
  "eventTime": "2026-09-12T13:30:00.000Z",
  "bufferMinutes": 10,
  "mode": "transit"
}
```

Response: distance, travel-time breakdown, computed departure deadline. See
`app/api/route/route.ts` for the exact shape.

## Real transit data (ODsay Lab)

No key configured by default — `lib/transit.ts` falls back to a haversine-distance +
average-speed estimator, good enough to demo the full flow. To turn on real subway/bus
routing:

1. Get a free key at [lab.odsay.com](https://lab.odsay.com) (needs a Korean phone number).
2. `cp .env.local.example .env.local` and set `ODSAY_API_KEY`.
3. Restart. Transit-mode requests now call ODsay's `pointSearch` + `searchPubTransPathT`
   (see `lib/odsay.ts`). Walk/drive still use the local estimator — ODsay only covers
   public transit. If ODsay fails or finds no path, it falls back to the estimator
   automatically rather than erroring.

## CORS

The frontend runs on a different Vercel domain, so `app/api/route/route.ts` sends
`Access-Control-Allow-Origin`. Defaults to `*` so the demo "just works" — set
`ALLOWED_ORIGIN` to the frontend's real deployed URL before judging if you want this locked
down.

## Deploying

Import this folder as its own Vercel project (separate from the frontend). Add
`ODSAY_API_KEY` and `ALLOWED_ORIGIN` under Project Settings → Environment Variables. Copy
the deployed URL into the frontend's `NEXT_PUBLIC_API_BASE_URL`.
