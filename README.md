# Kaarigar

**Wo kaarigar jise aapke padosi bula chuke hain.**

A mobile-first web app that helps someone find a trusted local tradesperson — electrician,
plumber, AC repair, TV repair, carpenter, painter, tiler — by showing **how many neighbours in
their own building or village have already called that person.**

> Trust here is social, not statistical. A 4.7-star average from 800,000 strangers means less to
> a flat owner than "the family in B-402 used him last month."

## Status

Scaffolding only — the application code is written on the day of the build.
Repository hygiene, tooling config and design tokens are prepared ahead of time.

## What this app is NOT

- **Not an Urban Company / Snabbit clone.**
- **No ratings, no stars.** Only a count of neighbours who called, plus their flat numbers.
- **The worker never installs anything.** They get a phone call, exactly as today. A resident adds
  them to the system on their behalf.
- **No prices, no commission, no payments, no checkout.** Money is settled directly between the
  two people.
- **Rural is a first-class case.** Vouches there are tied to house and lane names, not flat numbers.
- Out of scope: salon, beauty, massage, cleaning, cooking. Repair and home-maintenance trades only.

## Screens

| # | Screen | Purpose |
|---|--------|---------|
| 1 | Home | Society selector, then a grid of work categories |
| 2 | Worker list | Cards: name, trade, vouch count, flat numbers, years working, last called, Call + "Maine bulaya tha" |
| 3 | Vouch modal | Asks for flat number; on submit the count goes up by one and the flat joins the list |
| 4 | Add a kaarigar | Add someone you know, with your flat number as the first vouch |

No login, no payments, no map, no chat, no worker-side app, no backend.

## Tech

Vite + React + Tailwind CSS, **JavaScript (not TypeScript)**.

- No router — one screen state value and conditional rendering
- `useState` + `localStorage`
- No backend, database, auth, or external API
- No icon library, UI kit, or state library
- Mobile-first, designed at 390px
- Font: Mukta (Google Fonts) — designed for Devanagari and Latin together

**Why there is no database:** data is hardcoded in `src/data.js` and vouches persist in
`localStorage`. A backend would cost two hours and the screen would look identical, and a local
demo cannot fail because of venue wifi.

Production design (for reference only): three tables — `workers`, `societies`, `vouches` — with a
unique constraint on `(worker_id, flat_number)` so one flat can vouch once per worker.

## Design tokens

| Token | Hex | Used for |
|-------|-----|----------|
| `paper` | `#F5F6FA` | Page background — cool off-white, faintly indigo |
| `card` | `#FFFFFF` | Card surfaces |
| `ink` | `#22284D` | Primary text and headings |
| `inksoft` | `#5A6080` | Secondary text |
| `amber` | `#E8A33D` | Vouch count, chain motif, primary buttons |
| `amberdeep` | `#B8761A` | Text on amber tints |
| `ambertint` | `#FDF3E2` | Vouch block background |
| `line` | `#E3E5EE` | Hairline borders |

**Type sizes:** 28px page title · 20px card name · 15px body · 13px meta · vouch number 34px/600
(the largest thing on any card).

**Never use:** star icons, gradients, "01 / 02 / 03" markers, all-caps labels, skeleton loaders,
avatars or stock photos, emoji.

## Getting started

```bash
npm install
npm run dev
```

## Configuration

API keys go in `.env`, which is **git-ignored and must never be committed**.

```bash
cp .env.example .env   # then fill in KIMI_API_KEY
```

## Credits

Boilerplates and open-source libraries used are credited here.

- [Vite](https://vitejs.dev/) — build tooling
- [React](https://react.dev/) — UI library
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [Mukta](https://fonts.google.com/specimen/Mukta) — typeface (Indian Type Foundry)

