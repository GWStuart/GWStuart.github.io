# Notes

Each note is a folder here: `content/notes/<slug>/`. It gets a page at `/notes/<slug>/` with the PDF embedded, and the PDF itself is served at `/notes/<slug>.pdf`.

```
content/notes/complex-analysis/
  index.md                 title, year, optional course / semester / summary
  complex-analysis.pdf     the finished PDF (any file name, exactly one per folder)
```

- Start one with `npm run new -- note "Complex Analysis"`, then drop the PDF into the folder.
- To update a note, replace its PDF. The URL stays the same.
- The site serves the PDF as it is; it doesn't compile LaTeX. Keep the source wherever you like.
- If a published note's folder has no PDF, or more than one, the build stops and names the folder.
- The Notes page and the Notes link in the header only appear once there is at least one published note.
