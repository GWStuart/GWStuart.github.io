# gwstuart.github.io

My personal website: programming projects, maths notes and a bit about me. Live at **https://gwstuart.github.io**.

Built with [Astro](https://astro.build) as a plain static site. GitHub Actions builds and deploys it on every push to `main`.

## Running it locally

Needs Node 26 (the version is pinned in `.nvmrc`). With [nvm](https://github.com/nvm-sh/nvm): `nvm use`.

```sh
npm install        # once, or after pulling dependency changes
npm run dev        # live preview at http://localhost:4321
npm run build      # full production build into dist/ (fails on bad content)
npm run preview    # serve the built dist/
```

## Where things live

```
content/                      everything you normally edit
  home.md                     intro text on the home page
  about.md                    the About page
  projects/<slug>/            one folder per project  →  /projects/<slug>/
    index.md                  details (front matter) + description (Markdown)
    cover.png                 required: list thumbnail and header image
    thumbnail.png             optional: a different list thumbnail (set `thumbnail:`), for wide covers
    screenshots/              optional: PNG/JPG/WebP images here become a gallery
  notes/<slug>/               one folder per note     →  /notes/<slug>.pdf
    index.md                  title, year, course, ...
    main.tex                  compiled to the PDF (or put a ready-made .pdf here instead)
src/site.config.ts            name, tagline, social links, CV switch
src/                          layouts, pages and styles (rarely needs touching)
```

## Adding a project

```sh
npm run new -- project "Ray Tracer"
```

This creates `content/projects/ray-tracer/index.md` with every field explained. Then:

1. Add `cover.png` to that folder (required). Optionally add a `screenshots/` folder of PNG, JPG or WebP images (not GIFs: link to animations from the text instead). A caption comes from each file's name: `1-main-menu.png` → "Main menu".
2. Fill in `index.md`. `summary` is the one line shown in lists. `featured: true` also puts the project on the home page.
3. Delete the `draft: true` line when it's ready. Drafts appear in `npm run dev` but not on the live site.

Projects are sorted by `year` (newest first), so there's no ordering number to maintain. If a field is missing or misspelt, or an image is missing, `npm run build` stops and names the file.

## Adding maths notes

```sh
npm run new -- note "Complex Analysis"
npm run notes      # compiles content/notes/*/main.tex into public/notes/*.pdf
```

Write the notes in `main.tex`, then delete `draft: true` in `index.md`. On deploy, CI compiles the LaTeX itself (full TeX Live), so the PDFs never need committing.

- **Shared macros or preamble:** put them in `content/notes/_shared/` and `\input{...}` them from any note.
- **Keeping the source private:** leave out `main.tex` and drop a single finished `.pdf` in the note's folder instead.
- **The Notes page and header link** appear automatically once the first note is published.

## Adding a CV

Put the PDF at `public/cv.pdf` and set `cv: '/cv.pdf'` in `src/site.config.ts`. A CV link then appears in the header and the links row.

## Changing the favicon

The favicon is `public/favicon.svg`: the calligraphic 𝒢 from LaTeX (`\mathcal{G}`) in the accent blue, which turns lighter blue when the browser is in dark mode. The colours are in the `<style>` line at the top of the file. After editing it, run:

```sh
npm run favicons
```

This re-renders the two PNG versions:

- `favicon.ico`, for browsers that don't use SVG favicons
- `apple-touch-icon.png`, for phone home screens

## Deploying

Push to `main`. `.github/workflows/deploy.yml` then:

1. compiles the notes
2. builds the site
3. checks that every internal link and image resolves
4. publishes to GitHub Pages

This needs Settings → Pages → Source set to **GitHub Actions**.

`.github/workflows/links.yml` checks external links (GitHub, YouTube, …) every week. It can also be run by hand from the Actions tab. If a link breaks, the run fails and GitHub emails you.

## History

- `jekyll-site` branch: the previous Jekyll version of this site (2025–2026).
- `old-version` branch: the original hand-written HTML site (2023).
