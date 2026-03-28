/**
 * Print scene outlines (goal / obstacle / turn) from src/data/site.ts.
 * Run: npm run script:outline
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

/** Unescape TS string escapes we use in site data. */
function unquote(s) {
  return s.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
}

function parseOutlinesFromChunk(chunk) {
  const idM = chunk.match(/^([^"]+)/);
  if (!idM) return null;
  const id = idM[1];

  const slugM = chunk.match(/slug: "([^"]+)"/);
  const slug = slugM?.[1] ?? "?";

  const navM = chunk.match(/navLabel: "((?:\\.|[^"\\])*)"/);
  const navLabel = navM ? unquote(navM[1]) : "";

  const weightM = chunk.match(/sceneWeight: "(greater|lesser)"/);
  const sceneWeight = weightM?.[1] ?? "?";

  const pageM = chunk.match(/page: (\d+)/);
  const page = pageM ? Number(pageM[1]) : null;

  const outlineIdx = chunk.indexOf("outline: {");
  let outline = null;
  if (outlineIdx >= 0) {
    const osub = chunk.slice(outlineIdx);
    const triad = osub.match(
      /goal: "((?:\\.|[^"\\])*)",\s*\n\s*obstacle: "((?:\\.|[^"\\])*)",\s*\n\s*turn: "((?:\\.|[^"\\])*)"/,
    );
    if (triad) {
      outline = {
        goal: unquote(triad[1]),
        obstacle: unquote(triad[2]),
        turn: unquote(triad[3]),
      };
    }
  }

  return { id, slug, navLabel, sceneWeight, page, outline };
}

function main() {
  const src = fs.readFileSync(sitePath, "utf8");
  const block = extractScenesBlock(src);

  const parts = block.split(/\n    \{\n      id: "/);
  const scenes = parts
    .slice(1)
    .map((p) => parseOutlinesFromChunk(p))
    .filter(Boolean);

  const greater = scenes.filter((s) => s.sceneWeight === "greater");
  const greaterWith = greater.filter((s) => s.outline);
  const greaterMissing = greater.filter((s) => !s.outline);
  const lesserWith = scenes.filter(
    (s) => s.sceneWeight === "lesser" && s.outline,
  );

  const rowTotal = [...block.matchAll(KIND_RE)].length;
  const lpp = 55;

  console.log("CAISLEÁN DUBH — script:outline (src/data/site.ts)\n");
  console.log(
    `Scenes: ${scenes.length} · Greater: ${greater.length} (with outline: ${greaterWith.length}${greaterMissing.length ? `, missing: ${greaterMissing.length}` : ""})`,
  );
  if (lesserWith.length) {
    console.log(`Lesser scenes with outline (optional): ${lesserWith.length}`);
  }
  console.log(
    `Rough page tally @${lpp} lines/row (all scene line kinds): ${(rowTotal / lpp).toFixed(1)}\n`,
  );

  for (const s of scenes) {
    if (!s.outline) continue;
    const pg = s.page != null ? `p.${s.page}` : "?";
    console.log("—".repeat(72));
    console.log(`${s.id}  ${s.slug}  (${pg} · ${s.sceneWeight})`);
    console.log(`  ${s.navLabel}`);
    console.log(`  Goal:     ${s.outline.goal}`);
    console.log(`  Obstacle: ${s.outline.obstacle}`);
    console.log(`  Turn:     ${s.outline.turn}`);
  }
  console.log("—".repeat(72));

  if (greaterMissing.length) {
    console.log("\nGreater scenes still needing outline in site.ts:");
    for (const s of greaterMissing) {
      console.log(`  - ${s.id} ${s.slug}`);
    }
  }
}

main();
