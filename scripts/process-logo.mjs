#!/usr/bin/env node
/**
 * process-logo.mjs
 *
 * Normalizes a raw partner/brokerage logo image so it matches the existing
 * social-proof assets in /public/social-proof, then writes it there.
 *
 * Pipeline (same steps used for the Harcourts / KW Executive / Yvans Cator logos):
 *   1. Flatten onto white (covers JPEGs and any semi-transparent input).
 *   2. Trim the surrounding uniform whitespace so every logo carries consistent
 *      visual weight in the fixed-height marquee (object-contain, h-12/h-16).
 *   3. Key the near-white background to transparent with a soft anti-aliased
 *      edge ramp, producing an RGBA PNG that matches the existing assets.
 *
 * It also writes two preview strips (all current social-proof logos, on white
 * and on gray) to the OS temp dir so the caller can visually verify sizing,
 * consistency, and the absence of white halos before committing.
 *
 * Usage:
 *   node scripts/process-logo.mjs <input-image> <output-name>
 *     <input-image>  path to the dropped logo (.png/.jpg/.jpeg/.webp)
 *     <output-name>  kebab-case brand slug, no extension (e.g. "compass-realty")
 *
 * Flags:
 *   --force   overwrite an existing /public/social-proof/<output-name>.png
 *   --no-key  skip white->transparent keying (keep opaque white background)
 *
 * Prints a JSON summary (output path, dimensions, aspect ratio, preview paths).
 */

import sharp from 'sharp';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const SOCIAL_PROOF_DIR = path.resolve(process.cwd(), 'public/social-proof');
const TRIM_THRESHOLD = 12; // how close to white a border pixel must be to trim
const KEY_OPAQUE_BELOW = 232; // min(r,g,b) below this stays fully opaque
const KEY_CLEAR_ABOVE = 250; // min(r,g,b) at/above this becomes fully transparent

function fail(msg) {
  console.error(`\n[process-logo] ERROR: ${msg}\n`);
  process.exit(1);
}

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const positional = args.filter((a) => !a.startsWith('--'));
const [inputPath, outputName] = positional;

if (!inputPath || !outputName) {
  fail('Usage: node scripts/process-logo.mjs <input-image> <output-name> [--force] [--no-key]');
}
if (!fs.existsSync(inputPath)) fail(`Input file not found: ${inputPath}`);
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(outputName)) {
  fail(`Output name must be kebab-case (lowercase, hyphen-separated), got: "${outputName}"`);
}

const outputPath = path.join(SOCIAL_PROOF_DIR, `${outputName}.png`);
if (fs.existsSync(outputPath) && !flags.has('--force')) {
  fail(`${outputPath} already exists. Pass --force to overwrite (or pick a different name).`);
}

/** Trim, then key near-white to transparent with a soft edge ramp. */
async function processLogo(src) {
  const { data, info } = await sharp(src)
    .flatten({ background: '#ffffff' })
    .trim({ threshold: TRIM_THRESHOLD })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  if (!flags.has('--no-key')) {
    const range = KEY_CLEAR_ABOVE - KEY_OPAQUE_BELOW;
    for (let i = 0; i < width * height; i++) {
      const o = i * channels;
      const mn = Math.min(data[o], data[o + 1], data[o + 2]);
      if (mn >= KEY_CLEAR_ABOVE) data[o + 3] = 0;
      else if (mn >= KEY_OPAQUE_BELOW) data[o + 3] = Math.round(((KEY_CLEAR_ABOVE - mn) / range) * 255);
      // else: leave fully opaque
    }
  }
  await sharp(data, { raw: { width, height, channels } }).png().toFile(outputPath);
  return { width, height };
}

/** Build a marquee-style preview strip of every social-proof logo on a given bg. */
async function buildPreview(bgName, bgColor) {
  const files = fs
    .readdirSync(SOCIAL_PROOF_DIR)
    .filter((f) => f.endsWith('.png'))
    .sort();
  const imgs = [];
  for (const f of files) {
    imgs.push({ name: f, buf: await sharp(path.join(SOCIAL_PROOF_DIR, f)).resize({ height: 64, fit: 'inside' }).toBuffer() });
  }
  const metas = await Promise.all(imgs.map((i) => sharp(i.buf).metadata()));
  const gap = 40;
  const padY = 24;
  const totalW = metas.reduce((s, m) => s + m.width + gap, gap);
  const height = 64 + padY * 2;
  let x = gap;
  const composite = imgs.map((i, idx) => {
    const c = { input: i.buf, left: x, top: padY };
    x += metas[idx].width + gap;
    return c;
  });
  const out = path.join(os.tmpdir(), `logo-preview-${bgName}.png`);
  await sharp({ create: { width: totalW, height, channels: 3, background: bgColor } })
    .composite(composite)
    .png()
    .toFile(out);
  return out;
}

const { width, height } = await processLogo(inputPath);
const previewWhite = await buildPreview('white', '#ffffff');
const previewGray = await buildPreview('gray', '#8a8a8a');

const aspect = +(width / height).toFixed(2);
console.log(
  JSON.stringify(
    {
      output: path.relative(process.cwd(), outputPath).replace(/\\/g, '/'),
      publicPath: `/social-proof/${outputName}.png`,
      dimensions: `${width}x${height}`,
      aspectRatio: aspect,
      keyed: !flags.has('--no-key'),
      previewWhite,
      previewGray,
      note:
        aspect < 1.2
          ? 'Low aspect ratio (near-square or a filled-box logo). It will render narrow in the marquee; confirm it reads well next to the wordmark logos.'
          : 'Aspect ratio is in the usual wordmark range.',
    },
    null,
    2
  )
);
