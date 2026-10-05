# Non-Tariff Measures: Impacts and Challenges for Vietnam

ABrighter Research, Research Intelligence report (October 2026, data cut-off 30 June 2026).
It reinterprets Krungsri Research (2026), *Non-Tariff Measures: Impacts and Challenges on ASEAN*, for Vietnam
and updates the data with Vietnamese national statistics for 2025 and H1 2026.

| File | Content |
|---|---|
| `ABrighter_NTM_Vietnam_2026.docx` | Editable report (A4, 27 pages) |
| `ABrighter_NTM_Vietnam_2026.pdf` | PDF rendering of the same report |
| `charts/` | Exhibits at 300 dpi |
| `src/content.js` | Report text, footnote sources and references |
| `src/charts.py`, `src/style.py` | Exhibit code and palette |
| `src/build.js` | DOCX builder (docx-js) |

## Rebuild

```bash
pip install matplotlib pillow numpy
PYTHONPATH=src python3 src/charts.py          # exhibits
node src/build.js src/pages.json               # DOCX (pages.json holds Contents page numbers)
soffice --headless --convert-to pdf ABrighter_NTM_Vietnam_2026.docx
python3 src/pages.py ABrighter_NTM_Vietnam_2026.pdf src/pages.json   # refresh page numbers if layout changes
```
