export type RouteKey = "about" | "script" | "characters" | string;

/** Hero title — how to say it; split for typography on About. */
export interface TitlePronunciationBlock {
  phonetic: string;
  gloss: string;
  irishSpelling: string;
}

export interface AboutContent {
  title: string;
  subtitle: string;
  /** Short line under the title in the hero (tone / genre tags). */
  heroTagline: string;
  /** e.g. "Written by Name" */
  writtenBy: string;
  logline: string;
  pitch: string;
  theme: string;
  toneGenre: string;
  storyEngine: string;
  /** What this website is for (reader, structure, navigation). */
  readerAbout: string;
  /** Hero image path under `public` (protagonist portrait on About) */
  heroImageSrc: string;
  heroImageAlt: string;
  /** Shown under the title — approximate rendering + gloss + Irish spelling. */
  titlePronunciation: TitlePronunciationBlock;
  /** Names and phrases that appear across the project; keep in sync with character pages. */
  pronunciationGuide: { phrase: string; approx: string; note?: string }[];
}

export interface ActDef {
  id: string;
  slug: string;
  label: string;
  shortLabel: string;
  anchor: string;
  description: string;
}

export interface BeatDef {
  id: string;
  slug: string;
  saveTheCat: string;
  label: string;
  anchor: string;
  order: number;
}

export interface SequenceDef {
  id: string;
  slug: string;
  label: string;
  actId: string;
  beatIds: string[];
  anchor: string;
}

export type ScriptLineKind =
  | "action"
  | "character"
  | "dialogue"
  | "parenthetical"
  | "transition";

/**
 * Save the Cat–style scene load on the board (not page count).
 * **Greater** — spine turn, setpiece, or beat obligation the audience must feel.
 * **Lesser** — connective tissue, texture, B-story, or subdivided pressure that supports without carrying the whole beat alone.
 */
export type SceneStoryWeight = "greater" | "lesser";

/** Beat-sheet line for development / coverage (optional until you fill). */
export interface SceneOutline {
  /** What the scene pursues on screen (want / tactic / on-page intention). */
  goal: string;
  /** What blocks it—people, rules, fear, environment. */
  obstacle: string;
  /** Value swing by scene end (McKee turn / STC shift)—what’s different after. */
  turn: string;
}

export interface ScriptLine {
  kind: ScriptLineKind;
  text: string;
}

export interface ScriptScene {
  id: string;
  slug: string;
  anchor: string;
  /** Short story label for script TOC / sidebar (full `heading` stays the slugline). */
  navLabel: string;
  heading: string;
  sequenceId: string;
  beatId: string;
  actId: string;
  /** Save the Cat–style greater vs lesser scene weight on the storyboard. */
  sceneWeight: SceneStoryWeight;
  page: number;
  structNote?: string;
  themeNote?: string;
  /** Goal / obstacle / turn — fill for coverage; run `npm run script:outline`. */
  outline?: SceneOutline;
  characterIds: string[];
  lines: ScriptLine[];
}

export type StructuralKind =
  | "act_open"
  | "act_break"
  | "midpoint"
  | "accomplishment";

export interface StructuralMarker {
  id: string;
  kind: StructuralKind;
  anchor: string;
  title: string;
  body?: string;
  pageLabel?: string;
}

export interface PageRangeNote {
  id: string;
  anchor: string;
  range: string;
  note: string;
}

export interface CharacterSummary {
  id: string;
  slug: string;
  name: string;
  /** Irish / Irish-context names — approx. pronunciation for readers. */
  namePronunciation?: string;
  role: string;
  /** Bible handle, e.g. "The Avoider" */
  bibleTagline: string;
  /**
   * Irish accent / Hiberno-English shading for casting and table reads (baseline: ROI, not generic “British”).
   */
  voiceAccent: string;
  /**
   * External / scene appetite — what they pursue on screen (Save the Cat *want*;
   * McKee *object of desire* in the moment).
   */
  consciousWant: string;
  coreFlaw: string;
  arcDirection: string;
  toneDescriptor: string;
  /** Path under `public`, e.g. `/characters/host.png` */
  portraitSrc: string;
  portraitAlt: string;
  /** Optional looped portrait video (e.g. `/characters/file.mp4`). Still set portraitSrc for poster / fallback. */
  portraitVideoSrc?: string;
}

export interface CharacterDetail extends CharacterSummary {
  /**
   * Internal completion — thematic truth under behavior (Save the Cat *need*;
   * McKee *unity of character* / value shift). Omit or leave empty only for non-arcing functions.
   */
  unconsciousNeed?: string;
  overview: string;
  narrativeFunction: string;
  survivalStrategy: string;
  arc: string;
  judgmentPattern: string;
  relationshipToProtagonist: string;
  keyScenes: string[];
  dialogueTone: string;
  visualPresence: string;
  finalResolution?: string;
  coreBibleFunction?: string;
  behaviorRules?: string[];
  keyLine?: string;
  systemTruth?: { responseToTruth: string; outcome: string };
}

export interface CharacterTruthMatrixRow {
  character: string;
  responseToTruth: string;
  outcome: string;
}

export interface GuidanceItem {
  text: string;
}

export interface GuidanceGroup {
  id: string;
  title: string;
  items: GuidanceItem[];
}

export interface GuidancePanel {
  routeKey: RouteKey;
  intro?: string;
  groups: GuidanceGroup[];
}

export type ScriptFlowEntry =
  | { kind: "beat"; beatId: string }
  | { kind: "marker"; markerId: string }
  | { kind: "accomplishment"; noteId: string }
  | { kind: "scene"; sceneId: string };

export interface SiteData {
  about: AboutContent;
  acts: ActDef[];
  beats: BeatDef[];
  sequences: SequenceDef[];
  scenes: ScriptScene[];
  structuralMarkers: StructuralMarker[];
  pageAccomplishments: PageRangeNote[];
  scriptFlow: ScriptFlowEntry[];
  characters: CharacterDetail[];
  characterTruthMatrix: {
    title: string;
    caption: string;
    rows: CharacterTruthMatrixRow[];
  };
  guidancePanels: GuidancePanel[];
}
