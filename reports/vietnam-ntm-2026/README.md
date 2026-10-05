# Non-Tariff Measures: Impacts and Challenges for Vietnam

ABrighter Research, Research Intelligence report (October 2026, data cut-off 30 June 2026).
Analysis of EU non-tariff measures and their impact on Vietnam, with Vietnamese national statistics for 2025 and H1 2026.
Structured as a Minto pyramid (SCQA executive summary, key message per section) and written in the ken-writing style.

| File | Content |
|---|---|
| `ABrighter_NTM_Vietnam_2026.docx` | Editable report (A4, 27 pages) |
| `ABrighter_NTM_Vietnam_2026.pdf` | PDF rendering of the same report |
| `charts/` | Exhibits as SVG (embedded, vector) with PNG fallback |
| `assets/` | Logo, cover and back page (duotone of the Dragon Bridge photo from the ABrighter profile) |
| `src/content.js` | Report text, footnote sources and references |
| `src/charts.py`, `src/diagrams.py`, `src/style.py` | Charts, diagrams (pyramid, channels, roadmap) and palette |
| `src/cover.py` | Cover and back page |
| `src/build.js` | DOCX builder (docx-js) |

## Rebuild

```bash
pip install matplotlib pillow numpy
PYTHONPATH=src python3 src/charts.py          # charts
PYTHONPATH=src python3 src/diagrams.py        # diagrams
python3 src/cover.py                          # cover and back page
node src/build.js src/pages.json               # DOCX (pages.json holds Contents page numbers)
soffice --headless --convert-to pdf ABrighter_NTM_Vietnam_2026.docx
python3 src/pages.py ABrighter_NTM_Vietnam_2026.pdf src/pages.json   # refresh page numbers if layout changes
```
