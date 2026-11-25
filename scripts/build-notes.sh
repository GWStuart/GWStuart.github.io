#!/usr/bin/env bash
# Builds every note in content/notes/<slug>/ into public/notes/<slug>.pdf.
#
#   - If the folder has main.tex, it is compiled with latexmk (pdfLaTeX).
#   - Otherwise the folder must contain exactly one PDF, which is copied as-is.
#     (Use this for notes whose LaTeX source you'd rather not publish.)
#
# Files in content/notes/_shared/ (a preamble, macros, ...) can be \input from any note.
# Run locally with `npm run notes`; CI runs the same script inside a TeX Live container.
set -euo pipefail
shopt -s nullglob

cd "$(dirname "$0")/.."
root="$PWD"
out="$root/public/notes"
rm -rf "$out"
mkdir -p "$out"
export TEXINPUTS="$root/content/notes/_shared//:${TEXINPUTS:-}"

count=0
for dir in content/notes/*/; do
  dir="${dir%/}"
  slug="$(basename "$dir")"
  [[ "$slug" == _* ]] && continue
  if [[ ! -f "$dir/index.md" ]]; then
    echo "warning: skipping $dir (no index.md)"
    continue
  fi

  if [[ -f "$dir/main.tex" ]]; then
    echo "==> $slug: compiling main.tex"
    build="$(mktemp -d)"
    if ! (cd "$dir" && latexmk -pdf -interaction=nonstopmode -halt-on-error -file-line-error \
      -outdir="$build" main.tex >"$build/latexmk.log" 2>&1); then
      echo "error: LaTeX failed for $dir:"
      errors="$(grep -A3 -E '^[^ ]+:[0-9]+: ' "$build/main.log" 2>/dev/null || true)"
      if [[ -n "$errors" ]]; then
        printf '%s\n' "$errors" | sed -n '1,20p'
      else
        tail -n 40 "$build/latexmk.log"
      fi
      echo "(full log: $build/main.log)"
      exit 1
    fi
    cp "$build/main.pdf" "$out/$slug.pdf"
    rm -rf "$build"
  else
    pdfs=("$dir"/*.pdf)
    if (( ${#pdfs[@]} != 1 )); then
      echo "error: $dir needs either main.tex or exactly one .pdf (found ${#pdfs[@]} PDFs)"
      exit 1
    fi
    echo "==> $slug: using ${pdfs[0]}"
    cp "${pdfs[0]}" "$out/$slug.pdf"
  fi
  count=$((count + 1))
done

echo "Built $count note(s) into public/notes/"
