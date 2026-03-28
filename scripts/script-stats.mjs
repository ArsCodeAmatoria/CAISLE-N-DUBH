/**
 * Screenplay stats from src/data/site.ts (scenes[].lines only).
 * Run: npm run script:stats
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const sitePath = path.join(root, "src", "data", "site.ts");

const KIND_RE =
  /kind: "(transition|action|character|dialogue|parenthetical)"/g;

function extractScenesBlock(src) {
  const start = src.indexOf("  scenes: [");
  const end = src.indexOf("\n  scriptFlow:", start);
  if (start < 0 || end < 0) {
    throw new Error(
      "Could not find scenes: [ … scriptFlow: bounds in site.ts",
    );
  }
  return src.slice(start, end);
}

/** Parse double-quoted strings after text: in order (handles \\ escapes). */
function extractTextFields(block) {
  const texts = [];
  let i = 0;
  while (i < block.length) {
    const t = block.indexOf('text: "', i);
    if (t < 0) break;
    let j = t + 7;
    let out = "";
    while (j < block.length) {
      const c = block[j];
      if (c === "\\") {
        out += block[j + 1] ?? "";
        j += 2;
        continue;
      }
      if (c === '"') {
        texts.push(out);
        i = j + 1;
        break;
      }
      out += c;
      j++;
    }
    if (j >= block.length) break;
  }
  return texts;
}

function wrappedLines(str, charsPerLine) {
  if (!str.trim()) return 0;
  return Math.max(1, Math.ceil(str.length / charsPerLine));
}

function main() {
  const src = fs.readFileSync(sitePath, "utf8");
  const block = extractScenesBlock(src);

  const kinds = [...block.matchAll(KIND_RE)];
  const byKind = {};
  for (const m of kinds) {
    byKind[m[1]] = (byKind[m[1]] || 0) + 1;
  }
  const rowTotal = kinds.length;

  const texts = extractTextFields(block);
  const charsPerLine = 58;
  let visualLines = 0;
  for (const txt of texts) {
    visualLines += wrappedLines(txt, charsPerLine);
  }

  const lppVariants = [50, 52, 55];
  console.log("CAISLEÁN DUBH — script stats (src/data/site.ts)\n");
  console.log(`Scene line rows (transition, action, character, dialogue, parenthetical): ${rowTotal}`);
  console.log("By kind:");
  for (const k of ["action", "character", "dialogue", "transition", "parenthetical"]) {
    if (byKind[k]) console.log(`  ${k.padEnd(16)} ${byKind[k]}`);
  }
  console.log("");
  console.log(
    "Estimated pages if each data row ≈ one printed screenplay line (US rule-of-thumb):",
  );
  for (const lpp of lppVariants) {
    console.log(`  @${lpp} lines/page → ${(rowTotal / lpp).toFixed(1)} pages`);
  }
  console.log("");
  console.log(
    `Naive wrap: ${texts.length} text fields, ${charsPerLine} chars/line → ${visualLines} approx. printed lines`,
  );
  console.log("Estimated pages after wrap (same lines/page rule):");
  for (const lpp of lppVariants) {
    console.log(`  @${lpp} lines/page → ${(visualLines / lpp).toFixed(1)} pages`);
  }
  console.log("");
  console.log(
    "Note: Beat map page targets in struct notes (e.g. ~115) are planning length;",
  );
  console.log(
    "line-based counts reflect what is actually written in site.ts scene lines.",
  );
}

main();
