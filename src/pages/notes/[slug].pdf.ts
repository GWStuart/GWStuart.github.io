// Serves each note's PDF at /notes/<slug>.pdf, straight from its folder in content/notes/.
import { readFileSync } from 'node:fs';
import type { APIRoute, GetStaticPaths } from 'astro';
import { getNotes, notePdfFile } from '../../lib/content';

export const getStaticPaths = (async () => {
  const notes = await getNotes();
  return notes.flatMap((note) => {
    const file = notePdfFile(note);
    return file ? [{ params: { slug: note.id }, props: { file } }] : [];
  });
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ file: string }> = ({ props }) =>
  new Response(new Uint8Array(readFileSync(props.file)), {
    headers: { 'Content-Type': 'application/pdf' },
  });
