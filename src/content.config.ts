// The shape every project and note must have. If a file in content/ doesn't match
// (missing field, misspelt key, image that doesn't exist), the build stops and names the file.
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// content/projects/pman/index.md -> id "pman" -> URL /projects/pman/
const folderName = ({ entry }: { entry: string }) => entry.split('/')[0];

// Same as folderName, but first checks the cover image exists. Astro's own error for a
// missing image doesn't say which project it belongs to, so this prints that alongside it.
const projectId = ({ entry, base, data }: { entry: string; base: URL; data: Record<string, unknown> }) => {
  if (typeof data.cover === 'string' && !existsSync(join(fileURLToPath(base), dirname(entry), data.cover))) {
    console.error(`\n✗ content/projects/${entry}: cover image "${data.cover}" not found in that folder.\n`);
  }
  return folderName({ entry });
};

// Plain text from front matter, with typewriter apostrophes made typographic (Dijkstra's -> Dijkstra’s)
// so it matches the Markdown body, which Astro already converts.
const text = () => z.string().transform((value) => value.replace(/(\w)'/g, '$1\u2019'));

const projects = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './content/projects', generateId: projectId }),
  schema: ({ image }) =>
    z.strictObject({
      title: text(),
      summary: z.string().max(140, 'summary should be one short line (140 characters max)').pipe(text()),
      year: z.number().int().min(2000).max(2100),
      tags: z.array(text()).default([]),
      cover: image(),
      featured: z.boolean().default(false),
      award: text().optional(),
      links: z
        .strictObject({
          github: z.url().optional(),
          video: z.url().optional(),
          demo: z.url().optional(),
        })
        .default({}),
      draft: z.boolean().default(false),
    }),
});

const notes = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './content/notes', generateId: folderName }),
  schema: z.strictObject({
    title: text(),
    year: z.number().int().min(2000).max(2100),
    course: z.string().optional(),
    semester: z.union([z.literal(1), z.literal(2), z.literal('summer')]).optional(),
    summary: text().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, notes };
