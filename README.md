# Arihant's iPad Portfolio

Interactive portfolio built with a realistic iPad-style UI.

## Overview
This project presents Arihant Rawat's profile, experience, education, projects, and contact links through an iOS-inspired interface (home screen, app windows, dock, and transitions).

## Tech Stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- Framer Motion
- Tailwind CSS

## Run Locally
```bash
npm install
npm run dev
```
Open: http://localhost:3000

## Build Check
```bash
npm run build
```

## GitHub Pages Hosting
This repo is configured for static export + GitHub Pages deployment.

- `next.config.ts` uses `output: "export"`
- GitHub Actions workflow: `.github/workflows/deploy-pages.yml`
- On push to `main`/`master`, Pages deploys the `out/` folder.

### Important note about ArihantGPT chat
GitHub Pages cannot run Next.js API routes.

- If `NEXT_PUBLIC_CHAT_API_URL` is set, chat uses that external endpoint.
- If not set, chat falls back to local offline replies.

## Project Structure
```text
app/
  page.tsx              # Main route
  api/chat/route.ts     # ArihantGPT chat endpoint
components/
  IPadPage.tsx          # iPad shell + orchestration
  ipad/                 # frame, status bar, home screen
  apps/                 # app windows (work, projects, etc.)
data/
  content.ts            # single source of profile/content data
```

## Content Ownership
All profile and copy in this repo is for **Arihant Rawat**.

## Recommended Next Improvements
1. **Stabilize app IDs and component names**
   - Keep one canonical naming style (`arihantgpt` + `ArihantGPTApp.tsx`) everywhere.
2. **Split `data/content.ts` into modules**
   - `profile.ts`, `experience.ts`, `projects.ts`, `education.ts`, `social.ts`.
   - This reduces breakage when editing one section.
3. **Add schema validation for content**
   - Use Zod to validate required fields/links at build time.
4. **Hide empty social apps automatically**
   - If a URL is empty, don’t render icon/card to avoid broken links.
5. **Add a quick integrity script**
   - Script to fail CI on banned legacy strings and dead links.
6. **Create a migration checklist**
   - A `docs/content-migration.md` checklist for future identity/content swaps.

## Author
Arihant Rawat
