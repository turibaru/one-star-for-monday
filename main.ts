// One star for Monday — the entry ships as a single plain-text line.
// The grader only ever sees what this file writes out, so the guard runs first.
// A Monday review should read like a diner complaining, not like a calendar.
// If the line ever breaks the house rules, we refuse loudly instead of shipping it.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8");

if (text.length < 1 || text.length > 180) {
  console.error(`entry.txt must be 1-180 characters, got ${text.length}`);
  process.exit(1);
}
if (text.trim().length === 0) {
  console.error("entry.txt must not be only whitespace");
  process.exit(1);
}
const words = text.trim().split(/\s+/).filter(Boolean);
if (words.length > 25) {
  console.error(`entry.txt must be at most 25 words, got ${words.length}`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
