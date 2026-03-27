# Caisleán Dubh — script reader

Interactive screenplay reader and story bible for **Caisleán Dubh**, built with [Next.js](https://nextjs.org) (App Router). The site presents the full script with scene navigation, structural beats (Save the Cat / McKee notes where embedded), character profiles, pronunciation guidance, and supporting copy on **About** and **Credits**.

**Repository:** [github.com/ArsCodeAmatoria/CAISLE-N-DUBH](https://github.com/ArsCodeAmatoria/CAISLE-N-DUBH)

## Stack

- **Next.js** 16 · **React** 19 · **TypeScript**
- **Tailwind CSS** 4
- UI: Base UI / shadcn-style primitives, Lucide icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Main routes:

| Route | Content |
|--------|---------|
| `/` | Landing |
| `/script` | Full script with sticky meta and scroll-spy scenes |
| `/characters` | Character index |
| `/characters/[slug]` | Per-character bible (voice, arc, key scenes) |
| `/about` | Project / story context |
| `/credits` | Credits |

Production build:

```bash
npm run build
npm start
```

## Where the content lives

- **`src/data/site.ts`** — Scene list, slug / anchor / page hints, dialogue and action lines, structural and theme notes.
- **`src/data/characters-bible.ts`** — Character records (voice/accent, dialogue tone, arcs) surfaced on character pages.
- **`src/lib/types/site.ts`** — Types for script and site data.

Dialogue and copy aim for **authentic Hiberno-English** (not default RP or General American), aligned with each character’s bible entry.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## License / usage

Content and code rights sit with the project owners unless otherwise stated elsewhere in the repository.
