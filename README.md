# CAISLEÁN DUBH — Screenplay Atlas

A **Next.js** site that holds the feature screenplay **Caisleán Dubh** as a structured reader: scene-by-scene navigation, inline structural notes (Save the Cat, McKee-style turns where embedded), and a character bible keyed to Irish **Hiberno-English** voices—not default RP or American English.

**Writer:** Leigh Akin  
**Repository:** [github.com/ArsCodeAmatoria/CAISLE-N-DUBH](https://github.com/ArsCodeAmatoria/CAISLE-N-DUBH)

## Live

Production deploy (Vercel):

**https://caislean-dubh.vercel.app**

## What you get

- **Landing** — Entry into the project.
- **`/script`** — Full screenplay with scroll-spy navigation, sticky context, and anchors per scene.
- **`/characters`** — Roster; **`/characters/[slug]`** — per-role bible (accent, dialogue tone, arc, key scenes, pronunciation).
- **`/about`** — Premise, tone, and how the reader is meant to be used.
- **`/credits`** — Credits presentation.

The UI is a single dark grade (ink / bone / silver) with Irish tricolour accents on script line types where used.

## Tech stack

| Layer | Choice |
|--------|--------|
| Framework | **Next.js** 16 (App Router) |
| UI | **React** 19, **TypeScript** |
| Styling | **Tailwind CSS** 4 |
| Components | Base UI, shadcn-style primitives, **Lucide** icons |
| Fonts | Cormorant Garamond, Spectral, Geist Mono (see `layout.tsx`) |

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build    # production build
npm start        # run production build locally
npm run lint     # ESLint
```

## Where to edit content

| File | Purpose |
|------|---------|
| `src/data/site.ts` | Scenes, slug/anchor/page hints, dialogue, action, struct/theme notes, about copy blocks. |
| `src/data/characters-bible.ts` | Character records surfaced on `/characters/[slug]`. |
| `src/lib/types/site.ts` | Shared types for script and site data. |

Scene data drives the script reader; the character bible drives detail pages. Keep dialogue aligned with each character’s `voiceAccent` and `dialogueTone` when revising.

## Deploy

The app is a standard static-friendly Next build. Connect the GitHub repo to [Vercel](https://vercel.com) for automatic deploys, or run `npx vercel` from the project root with the Vercel CLI.

## Rights

Screenplay text, bible material, site copy, and code: rights sit with the project owners unless otherwise stated in this repository.
