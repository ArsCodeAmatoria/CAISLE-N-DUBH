/**
 * Irish tricolour — shared palette for credits, script reader accents, and UI hints.
 * Green / white / orange only (+ black/white contrast on dark backgrounds).
 */
export const IRISH_TRICOLOUR = {
  green: "#169B62",
  white: "#FFFFFF",
  orange: "#FF883E",
} as const;

export type IrishTricolourKey = keyof typeof IRISH_TRICOLOUR;
