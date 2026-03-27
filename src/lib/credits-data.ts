import { charactersBible } from "@/data/characters-bible";

/** Audio file under `public/songs`. */
export const CREDITS_AUDIO_FILENAME = "Taobh Thiar den Doras.wav";

export const CREDITS_AUDIO_SRC = `/songs/${encodeURIComponent(CREDITS_AUDIO_FILENAME)}`;

export const CREDITS_SONG_TITLE_GA = "Taobh Thiar den Doras";
export const CREDITS_SONG_TITLE_EN = "Behind the Door";

/** Irish tricolour artwork for the credits player (green · white · orange only). */
export const CREDITS_FLAG_SRC = "/images/irish-tricolor-flag.svg";
export const CREDITS_FLAG_ALT =
  "Irish tricolour: green, white, and orange vertical bands.";

export interface CreditSection {
  id: string;
  /** Section heading (Irish / English mix as needed) */
  heading: string;
  lines: { primary: string; secondary?: string }[];
}

export function getCastSections(): CreditSection[] {
  return [
    {
      id: "cast",
      heading: "Carachtair · Characters",
      lines: charactersBible.map((c) => ({
        primary: c.name,
        secondary: `${c.role} — ${c.bibleTagline}`,
      })),
    },
  ];
}

/** Locations and story geography — Irish names, on-screen spaces. */
export const locationSections: CreditSection[] = [
  {
    id: "liocht",
    heading: "Áiteanna · Places",
    lines: [
      { primary: "Caisleán Dubh", secondary: "An caisleán cois uisce · The black castle" },
      { primary: "An Bóthar Feirme", secondary: "Country road — oíche · night" },
      { primary: "An Cúirtlann", secondary: "Courtyard — an garáiste" },
      { primary: "An Halla Iontrála", secondary: "Entry hall — fáilte fuar" },
      { primary: "An Seomra Agáinnte", secondary: "Dining room — long table" },
      { primary: "Na Tailte", secondary: "Fields — bealach amach a bhriseann" },
      { primary: "An Lochan", secondary: "The pond — scáthán dubh" },
      { primary: "Coridor an Iarthair", secondary: "West wing corridors" },
      { primary: "An Doras Deireanach", secondary: "The final door" },
      { primary: "Áit an Tuairteála", secondary: "Crash site — sirens" },
    ],
  },
];

export const screenplaySection: CreditSection[] = [
  {
    id: "screenplay",
    heading: "Scéal · Story",
    lines: [
      { primary: "Scríbhneoireacht · Screenplay", secondary: "Leigh Akin" },
    ],
  },
];

export const closingSections: CreditSection[] = [
  {
    id: "music",
    heading: "Ceol · Music",
    lines: [
      { primary: CREDITS_SONG_TITLE_GA, secondary: CREDITS_SONG_TITLE_EN },
      { primary: "Amhrán · Song", secondary: "Written by Leigh Akin" },
    ],
  },
  {
    id: "thanks",
    heading: "Buíochas · Thanks",
    lines: [
      { primary: "Go raibh maith agaibh", secondary: "cast, crew, agus lucht féachana" },
      { primary: "Go maire tú an choilm", secondary: "may you live long and well" },
    ],
  },
];

/** One full-screen “card” in the movie-style sequence */
export interface CreditChunk {
  id: string;
  kind: "title" | "card";
  /** Shown on card chunks (section label). */
  heading?: string;
  /** Smaller kicker above heading, e.g. bilingual tag */
  kicker?: string;
  lines: { primary: string; secondary?: string }[];
}

const CAST_NAMES_PER_CHUNK = 2;
const PLACE_LINES_PER_CHUNK = 3;

/** Discrete credit beats synced evenly across the track duration. */
export function getCreditChunks(): CreditChunk[] {
  const chunks: CreditChunk[] = [];

  chunks.push({
    id: "title",
    kind: "title",
    lines: [],
  });

  const screenplay = screenplaySection[0];
  chunks.push({
    id: "screenplay",
    kind: "card",
    kicker: "Scéal scáileán · Screen story",
    heading: screenplay.heading,
    lines: screenplay.lines,
  });

  const castLines = getCastSections()[0].lines;
  for (let i = 0; i < castLines.length; i += CAST_NAMES_PER_CHUNK) {
    const slice = castLines.slice(i, i + CAST_NAMES_PER_CHUNK);
    chunks.push({
      id: `cast-${i}`,
      kind: "card",
      kicker: i === 0 ? "Carachtair · Characters" : undefined,
      heading: i === 0 ? "Cast" : undefined,
      lines: slice,
    });
  }

  const placeLines = locationSections[0].lines;
  for (let i = 0; i < placeLines.length; i += PLACE_LINES_PER_CHUNK) {
    const slice = placeLines.slice(i, i + PLACE_LINES_PER_CHUNK);
    chunks.push({
      id: `place-${i}`,
      kind: "card",
      kicker: i === 0 ? "Áiteanna · Places" : undefined,
      heading: i === 0 ? "Locations" : undefined,
      lines: slice,
    });
  }

  for (const section of closingSections) {
    chunks.push({
      id: section.id,
      kind: "card",
      kicker: section.heading,
      heading:
        section.id === "music"
          ? "Music"
          : section.id === "thanks"
            ? "Thanks"
            : section.heading,
      lines: section.lines,
    });
  }

  return chunks;
}
