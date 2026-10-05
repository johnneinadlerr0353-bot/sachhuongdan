# Digital Detox: Restoring Balance in Vietnam's Digital Age

ABrighter Research, Research Intelligence report (October 2026, data to 30 September 2026).
Vietnam edition of a digital detox study: platform design, health effects, policy (Decree 147/2024, Ho Chi Minh City
school phone rules, the 2026 draft decree on children's social media accounts) and implications for digital banking.
Layout in a Simon-Kucher style (key findings, mechanism cards, segments, value-model tables) with the ABrighter
McKinsey-inspired palette; writing follows the ken-writing method inside a Minto structure.

| File | Content |
|---|---|
| `ABrighter_Digital_Detox_Vietnam_2026.docx` | Editable report (A4, 26 pages) |
| `ABrighter_Digital_Detox_Vietnam_2026.pdf` | PDF rendering |
| `illus/` | Vector illustrations drawn for the report (SVG with PNG fallback) |
| `charts/` | Charts and Minto pyramid (SVG with PNG fallback) |
| `src/content.js` | Text, footnote sources and references |
| `src/illus.py`, `src/charts.py`, `src/diagrams.py`, `src/cover.py` | Illustrations, charts, pyramid, cover and back page |
| `src/build.js` | DOCX builder (docx-js) |

## Rebuild

```bash
pip install matplotlib pillow numpy cairosvg
python3 src/illus.py
PYTHONPATH=src python3 src/charts.py && PYTHONPATH=src python3 src/diagrams.py
python3 src/cover.py
node src/build.js src/pages.json
soffice --headless --convert-to pdf ABrighter_Digital_Detox_Vietnam_2026.docx
python3 src/pages.py ABrighter_Digital_Detox_Vietnam_2026.pdf src/pages.json   # refresh Contents page numbers
```
