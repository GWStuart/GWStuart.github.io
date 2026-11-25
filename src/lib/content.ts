import { existsSync } from 'node:fs';
import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

export type Project = CollectionEntry<'projects'>;
export type Note = CollectionEntry<'notes'>;

// Drafts are visible in `npm run dev` but never in the built site.
const includeDrafts = import.meta.env.DEV;

/** All published projects, newest first, then alphabetical. */
export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('projects', ({ data }) => includeDrafts || !data.draft);
  return projects.sort((a, b) => b.data.year - a.data.year || a.data.title.localeCompare(b.data.title));
}

const semesterOrder = { 1: 1, 2: 2, summer: 3 } as const;

// Checked first so an empty notes folder doesn't log a warning on every page.
const noteFiles = import.meta.glob('/content/notes/*/index.md');

/** All published notes, newest first. */
export async function getNotes(): Promise<Note[]> {
  if (Object.keys(noteFiles).length === 0) return [];
  const notes = await getCollection('notes', ({ data }) => includeDrafts || !data.draft);
  return notes.sort(
    (a, b) =>
      b.data.year - a.data.year ||
      (b.data.semester ? semesterOrder[b.data.semester] : 0) - (a.data.semester ? semesterOrder[a.data.semester] : 0) ||
      a.data.title.localeCompare(b.data.title),
  );
}

/** Groups items that are already sorted by year (newest first) into [year, items] pairs. */
export function groupByYear<T extends { data: { year: number } }>(items: T[]): [number, T[]][] {
  const groups = new Map<number, T[]>();
  for (const item of items) groups.set(item.data.year, [...(groups.get(item.data.year) ?? []), item]);
  return [...groups];
}

// Every image in content/projects/<id>/screenshots/, loaded once.
const screenshotFiles = import.meta.glob<ImageMetadata>(
  '/content/projects/*/screenshots/*.{png,jpg,jpeg,webp}',
  { eager: true, import: 'default' },
);

// Animated GIFs can't be shrunk to a still thumbnail, so every visitor would download the
// whole animation. Stop the build with an explanation instead of shipping that.
const gifs = Object.keys(import.meta.glob('/content/projects/*/screenshots/*.gif'));
if (gifs.length > 0) {
  throw new Error(
    `GIFs aren't supported as screenshots (${gifs.map((g) => g.slice(1)).join(', ')}). ` +
      'Use a still PNG/JPG frame instead, and link to the animation (e.g. on GitHub or YouTube) from the project text.',
  );
}

/**
 * Screenshots for a project, in filename order. The caption comes from the filename:
 * "2-dijkstra-routing-around-walls.png" -> "Dijkstra routing around walls".
 */
export function getScreenshots(projectId: string) {
  const prefix = `/content/projects/${projectId}/screenshots/`;
  return Object.entries(screenshotFiles)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, image]) => {
      const words = path.slice(prefix.length).replace(/\.[^.]+$/, '').replace(/^\d+[-_ ]*/, '').replace(/[-_]+/g, ' ');
      return { image, caption: words.charAt(0).toUpperCase() + words.slice(1) };
    });
}

/** Where a note's PDF is served. `npm run notes` (or CI) puts it there. */
export function notePdfUrl(note: Note) {
  const url = `/notes/${note.id}.pdf`;
  if (!existsSync(`public${url}`)) {
    const message = `Note "${note.id}" has no PDF yet: run \`npm run notes\` to build public${url} from content/notes/${note.id}/.`;
    if (import.meta.env.PROD) throw new Error(message);
    console.warn(message);
  }
  return url;
}

/** Link to the note's LaTeX source on GitHub, if it has any (PDF-only notes don't). */
export function noteSourceUrl(note: Note, repo: string) {
  return existsSync(`content/notes/${note.id}/main.tex`) ? `${repo}/tree/main/content/notes/${note.id}` : undefined;
}

export function semesterLabel(semester: Note['data']['semester']) {
  if (semester === undefined) return undefined;
  return semester === 'summer' ? 'Summer' : `Semester ${semester}`;
}
