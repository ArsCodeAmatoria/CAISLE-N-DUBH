export type RouteKey = "about" | "script" | "characters" | string;

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

export interface ScriptLine {
  kind: ScriptLineKind;
  text: string;
}

export interface ScriptScene {
  id: string;
  slug: string;
  anchor: string;
  heading: string;
  sequenceId: string;
  beatId: string;
  actId: string;
  page: number;
  structNote?: string;
  themeNote?: string;
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
  role: string;
  /** Bible handle, e.g. "The Avoider" */
  bibleTagline: string;
  coreFlaw: string;
  arcDirection: string;
  toneDescriptor: string;
  /** Path under `public`, e.g. `/characters/host.png` */
  portraitSrc: string;
  portraitAlt: string;
}

export interface CharacterDetail extends CharacterSummary {
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
