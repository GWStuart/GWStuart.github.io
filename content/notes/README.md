# Notes

Each note is a folder here: `content/notes/<slug>/`, published at `/notes/<slug>.pdf`.

```
content/notes/complex-analysis/
  index.md     title, year, optional course / semester / summary
  main.tex     compiled to the PDF (by `npm run notes` locally, and automatically on deploy)
```

- Start one with `npm run new -- note "Complex Analysis"`.
- To publish a PDF without its source, leave out `main.tex` and put a single `.pdf` in the folder instead.
- Shared preambles or macros can go in `content/notes/_shared/`. Any note can `\input` them.
- The Notes page and the Notes link in the header only appear once there is at least one published note.
