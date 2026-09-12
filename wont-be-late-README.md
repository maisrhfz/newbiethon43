# Will I be late? — Newbithon (뉴비톤)

Two separate Next.js projects, matching your team's PR-based-workflow / separate-Vercel-
projects prep:

- **`wont-be-late-frontend/`** — the UI (event form, countdown banner, dark mode). Deploy as
  its own Vercel project.
- **`wont-be-late-backend/`** — the API (`POST /api/route`): distance/ETA math, ODsay
  integration with a mock fallback. Deploy as its own Vercel project.

Each folder has its own README with run/deploy instructions. Quick start for local dev, two
terminals:

```bash
# terminal 1
cd wont-be-late-backend
npm install
npm run dev            # http://localhost:4000

# terminal 2
cd wont-be-late-frontend
npm install
cp .env.local.example .env.local   # set NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
npm run dev            # http://localhost:3000
```

For real deploys: push each folder to its own GitHub repo (or two directories in one repo,
each imported as a separate Vercel project with the right **Root Directory** setting), wire
up environment variables per each project's README, then point the frontend's
`NEXT_PUBLIC_API_BASE_URL` at the backend's live URL.
