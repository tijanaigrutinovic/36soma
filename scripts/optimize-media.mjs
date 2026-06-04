/**
 * Convert raster assets in public/media to optimized WebP.
 * Drop new JPG/PNG files into public/media, run this script, then point code at .webp paths.
 *
 * Usage: node scripts/optimize-media.mjs [--dry-run] [--keep-source]
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const MEDIA_DIR = path.join(ROOT, "public", "media");

const DRY_RUN = process.argv.includes("--dry-run");
const KEEP_SOURCE = process.argv.includes("--keep-source");

/** Longest edge — tuned to max display sizes (2× retina ~1000–1200px cells). */
const HERO_MAX = 2048;
const PHOTO_MAX = 2000;
const UI_PNG_MAX = 1400;

const HERO_NAMES = new Set(["342a2254.jpg", "342a2254.webp"]);
const CONTACT_NAMES = new Set(["b78a2967.jpg", "b78a2967.webp"]);
const UI_PNG_NAMES = new Set(["night-pace.png", "night-pace.webp"]);

const SOURCE_EXT = new Set([".jpg", ".jpeg", ".png"]);

function maxEdgeFor(filePath) {
  const lower = path.basename(filePath).toLowerCase();
  if (HERO_NAMES.has(lower)) return HERO_MAX;
  if (CONTACT_NAMES.has(lower)) return 1600;
  if (UI_PNG_NAMES.has(lower)) return UI_PNG_MAX;
  return PHOTO_MAX;
}

function webpPathFor(filePath) {
  return filePath.replace(/\.(jpe?g|png)$/i, ".webp");
}

async function* walkSources(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith(".")) continue;
    if (entry.isDirectory()) {
      yield* walkSources(full);
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (!SOURCE_EXT.has(ext)) continue;
    yield full;
  }
}

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

async function convertToWebp(filePath) {
  const before = await fs.stat(filePath);
  const maxEdge = maxEdgeFor(filePath);
  const outPath = webpPathFor(filePath);
  const tmp = `${outPath}.opt.tmp`;

  let pipeline = sharp(filePath, { failOn: "none" }).rotate();
  const meta = await pipeline.metadata();
  const longest = Math.max(meta.width ?? 0, meta.height ?? 0);

  if (longest > maxEdge) {
    pipeline = pipeline.resize(maxEdge, maxEdge, {
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  if (DRY_RUN) {
    return { filePath, outPath, before: before.size, after: 0, skipped: true };
  }

  await pipeline.webp({ quality: 82, effort: 4 }).toFile(tmp);
  await fs.rename(tmp, outPath);
  const after = (await fs.stat(outPath)).size;

  if (!KEEP_SOURCE) {
    await fs.unlink(filePath);
  }

  return { filePath, outPath, before: before.size, after, skipped: false };
}

async function main() {
  let totalBefore = 0;
  let totalAfter = 0;
  let count = 0;

  for await (const file of walkSources(MEDIA_DIR)) {
    const rel = path.relative(ROOT, file);
    try {
      const result = await convertToWebp(file);
      totalBefore += result.before;
      totalAfter += result.after;
      count += 1;
      if (!result.skipped) {
        const pct =
          result.before > 0
            ? Math.round((1 - result.after / result.before) * 100)
            : 0;
        const outRel = path.relative(ROOT, result.outPath);
        console.log(
          `${rel} → ${outRel}: ${formatBytes(result.before)} → ${formatBytes(result.after)} (-${pct}%)`,
        );
      }
    } catch (err) {
      console.error(`FAIL ${rel}:`, err.message);
    }
  }

  console.log("\n---");
  console.log(`Processed ${count} source files`);
  if (count) {
    console.log(`Total: ${formatBytes(totalBefore)} → ${formatBytes(totalAfter)}`);
  } else {
    console.log("No JPG/PNG sources found — only WebP assets remain.");
  }
  if (DRY_RUN) console.log("(dry run — no files written)");
  if (KEEP_SOURCE) console.log("(sources kept — remove --keep-source to delete after convert)");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
