#!/usr/bin/env node
// Creates the folder and starter files for a new project or note.
//
//   npm run new -- project "Ray Tracer"
//   npm run new -- note "Complex Analysis"

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [kind, ...words] = process.argv.slice(2);
const title = words.join(' ').trim();

if (!['project', 'note'].includes(kind) || !title) {
  console.error('Usage:\n  npm run new -- project "Project Title"\n  npm run new -- note "Note Title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[̀-ͯ]/g, '') // é -> e
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');
const year = new Date().getFullYear();
const dir = join('content', kind === 'project' ? 'projects' : 'notes', slug);

if (existsSync(dir)) {
  console.error(`${dir} already exists.`);
  process.exit(1);
}
mkdirSync(dir, { recursive: true });

const yamlString = (text) => JSON.stringify(text); // a JSON string is a valid YAML string

if (kind === 'project') {
  writeFileSync(
    join(dir, 'index.md'),
    `---
title: ${yamlString(title)}
summary: "One line describing the project (shown in project lists)."
year: ${year}
tags: []                # e.g. [Python, Pygame, AI]
cover: ./cover.png      # required: put an image called cover.png in this folder
# thumbnail: ./thumbnail.png   # optional: a different image for project lists (shown cropped to 4:3)
featured: false         # true = also shown on the home page
# award: "Winner, Some Hackathon ${year}"
# links:                # uncomment the ones that apply
#   github: https://github.com/GWStuart/${slug}
#   video: https://www.youtube.com/watch?v=...
#   demo: https://...
draft: true             # visible in \`npm run dev\` only; delete this line to publish
---

A paragraph or two on what the project is, why you built it and anything interesting about how it works.

## Features

- First feature
- Second feature
`,
  );
  console.log(`Created ${dir}/index.md

Next:
  1. Add the cover image:     ${dir}/cover.png   (required)
  2. Optionally add images:   ${dir}/screenshots/  (shown as a gallery; captions come from the file names)
  3. Fill in index.md, then delete the "draft: true" line to publish.
  4. Preview with: npm run dev`);
} else {
  writeFileSync(
    join(dir, 'index.md'),
    `---
title: ${yamlString(title)}
year: ${year}
# course: MATH3401
# semester: 1           # 1, 2 or summer
# summary: "One line describing what the notes cover."
draft: true             # visible in \`npm run dev\` only; delete this line to publish
---
`,
  );
  console.log(`Created ${dir}/index.md

Next:
  1. Put the finished PDF in ${dir}/ (any file name, one PDF per note). It is served at /notes/${slug}.pdf.
  2. Fill in index.md, then delete the "draft: true" line to publish.
  3. Preview with: npm run dev`);
}
