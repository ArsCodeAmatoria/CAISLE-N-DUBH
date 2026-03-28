/**
 * Map screenplay character cues (e.g. SEAN, MRS. KEANE, CIARÁN (CONT'D))
 * to `CharacterDetail.id` for bible / portrait lookup.
 */

function stripTrailingParentheticals(s: string): string {
  let t = s.trim();
  let prev = "";
  while (t !== prev) {
    prev = t;
    t = t.replace(/\s*\([^)]*\)\s*$/u, "").trim();
  }
  return t;
}

/** Fold for lookup: strip diacritics, periods, normalize spaces, uppercase. */
function foldCueKey(s: string): string {
  return s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/\./g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

const CUE_KEY_TO_CHARACTER_ID: Record<string, string> = {
  AOIFE: "aoife",
  SEAN: "sean",
  FIONA: "fiona",
  PADRAIG: "padraig",
  NIAMH: "niamh",
  ERIN: "erin",
  CIARAN: "ciaran",
  "MRS KEANE": "mrs-keane",
};

/**
 * True when the cue marks the distinct double entity (separate bible entry).
 */
function isAoifeDoubleCue(cue: string): boolean {
  return /\([^)]*DOUBLE[^)]*\)/i.test(cue) && /^AOIFE\b/i.test(cue.trim());
}

export function scriptCueToCharacterId(cue: string): string | null {
  const trimmed = cue.trim();
  if (!trimmed) return null;
  if (isAoifeDoubleCue(trimmed)) return "aoife-double";
  const base = stripTrailingParentheticals(trimmed);
  const key = foldCueKey(base);
  return CUE_KEY_TO_CHARACTER_ID[key] ?? null;
}
