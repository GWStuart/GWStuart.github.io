#!/usr/bin/env node
// Renders the PNG versions of the favicon from public/favicon.svg. Run it after changing the SVG:
//
//   npm run favicons
//
// public/favicon.ico         16, 32 and 48px, for browsers that don't use SVG favicons
// public/apple-touch-icon.png 180px, for phone home screens, which need a solid background
//
// PNGs can't follow the browser's light/dark setting, so both use the light colours.
// sharp comes with Astro (it's what Astro uses for images), so there's nothing extra to install.

import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const pub = new URL('../public/', import.meta.url);
const svg = readFileSync(new URL('favicon.svg', pub), 'utf8')
  // Drop the dark-mode rule: @media (...) { ... { ... } }
  .replace(/@media[^{]*\{[^{}]*\{[^{}]*\}\s*\}/g, '');
const viewBox = Number(svg.match(/viewBox="0 0 (\d+)/)?.[1] ?? 64);

// Rasterise the SVG directly at the size wanted, rather than scaling a bitmap.
const render = (size) =>
  sharp(Buffer.from(svg), { density: (72 * size) / viewBox })
    .resize(size, size)
    .png()
    .toBuffer();

// favicon.ico: an icon directory followed by one PNG per size.
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map(render));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((size, i) => {
  const entry = 6 + 16 * i;
  header.writeUInt8(size, entry); // width
  header.writeUInt8(size, entry + 1); // height
  header.writeUInt16LE(1, entry + 4); // colour planes
  header.writeUInt16LE(32, entry + 6); // bits per pixel
  header.writeUInt32LE(pngs[i].length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += pngs[i].length;
});
writeFileSync(new URL('favicon.ico', pub), Buffer.concat([header, ...pngs]));

// apple-touch-icon.png: the logo at about 70% size on the page colour (--bg in global.css).
// The phone rounds the corners itself.
const touch = 180;
const inner = 128;
await sharp({ create: { width: touch, height: touch, channels: 4, background: '#fcfcfa' } })
  .composite([{ input: await render(inner), gravity: 'centre' }])
  .png()
  .toFile(new URL('apple-touch-icon.png', pub).pathname);

console.log('Wrote public/favicon.ico and public/apple-touch-icon.png');
