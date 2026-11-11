#!/bin/zsh
# Compile the CV with XeLaTeX and name the PDF JKim_cv<year><mon>.pdf from today's date.
# Usage: ./build_cv.sh [source.tex]   (default: the newest JKim_cv*.tex)
cd "${0:A:h}" || exit 1
src=${1:-$(ls -t JKim_cv*.tex | head -1)}
out="JKim_cv$(date +%Y)$(date +%b | tr A-Z a-z)"
tmp=$(mktemp -d)
cp "$src" "$tmp/$out.tex"
for i in 1 2; do xelatex -interaction=nonstopmode -output-directory="$tmp" "$tmp/$out.tex" >/dev/null || { echo "xelatex failed; see $tmp/$out.log"; exit 1; }; done
cp "$tmp/$out.pdf" "$out.pdf" && echo "Built $out.pdf"
# keep the source name in sync with the output name
[[ "$src" != "$out.tex" ]] && mv "$src" "$out.tex" && echo "Renamed $src -> $out.tex"
