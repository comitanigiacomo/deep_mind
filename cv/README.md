# CV

Single English CV, built with the Jake Gutierrez LaTeX template (MIT) adapted
to A4.

## Files

- `giacomo-comitani-cv-en.tex` — source (edit this)
- `../public/cv/giacomo-comitani-cv-en.pdf` — PDF served by the site

The site links the PDF once, for both languages (`src/pages/About.jsx` via
`src/lib/cv.js`). Do not keep a second copy under `cv/`.

## Compile

```sh
pdflatex giacomo-comitani-cv-en.tex
mv giacomo-comitani-cv-en.pdf ../public/cv/
```

Or upload the `.tex` to Overleaf and replace
`public/cv/giacomo-comitani-cv-en.pdf` with the exported PDF.

Packages: `fullpage`, `titlesec`, `enumitem`, `fancyhdr`, `marvosym`,
`tabularx`, `hyperref` (all available on Overleaf).

Keep it to one page. After editing, check the output and trim a bullet before
letting it spill onto a second page.
