// Builds the ABrighter Research report as DOCX.
// Usage: node src/build.js [pages.json]   (pages.json holds Contents page numbers from a first render)
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell, WidthType, ShadingType,
  BorderStyle, AlignmentType, Header, Footer, PageNumber, PositionalTab, PositionalTabAlignment,
  PositionalTabRelativeTo, PositionalTabLeader, LevelFormat, FootnoteReferenceRun, VerticalAlign,
  TableLayoutType, HeightRule, PageBreak, TabStopType, HorizontalPositionRelativeFrom, VerticalPositionRelativeFrom,
} = require("docx");
const { S, FN, REFS } = require("./content.js");

const ROOT = path.join(__dirname, "..");
const PAGES = fs.existsSync(process.argv[2] || "") ? JSON.parse(fs.readFileSync(process.argv[2])) : {};

// ---------------------------------------------------------------- tokens
const C = { navy: "051C2C", blue: "2251FF", cyan: "00A9F4", sky: "99C2FF", ice: "EEF3FF", mist: "EEF1F4",
  grey: "6B7785", silver: "C5CDD5", ink: "1A1A1A", white: "FFFFFF", green: "1E9E5A", amber: "C98A00" };
const SEV = { "Low": ["E3ECFF", C.navy], "Limited": ["E3ECFF", C.navy], "Moderate": ["9DBBFF", C.navy],
  "Moderate-High": [C.blue, C.white], "High": [C.navy, C.white] };
const SERIF = "Georgia", SANS = "Arial";
const CW = 9638; // content width (DXA)
const PX = 642;  // content width in px at 96 dpi

const pngSize = (f) => { const b = fs.readFileSync(f); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
const img = (file, widthPx) => {
  const f = path.join(ROOT, file); const [w, h] = pngSize(f);
  return new ImageRun({ type: "png", data: fs.readFileSync(f), transformation: { width: widthPx, height: Math.round(widthPx * h / w) } });
};

// ---------------------------------------------------------------- inline markup
let fnCounter = 0; const footnotes = {};
function runs(text, base = {}) {
  const out = [];
  const parts = text.split(/(\*\*[^*]+\*\*|\[\^\w+\]|\[(?:Inference|Unverified|Speculation)\])/g).filter(Boolean);
  for (const part of parts) {
    let m;
    if ((m = part.match(/^\*\*(.+)\*\*$/))) out.push(new TextRun({ ...base, text: m[1], bold: true }));
    else if ((m = part.match(/^\[\^(\w+)\]$/))) {
      fnCounter += 1;
      footnotes[fnCounter] = { children: [new Paragraph({ spacing: { after: 0 }, children: [new TextRun({ text: FN[m[1]], size: 14, font: SANS, color: C.grey })] })] };
      out.push(new FootnoteReferenceRun(fnCounter));
    } else if ((m = part.match(/^\[(Inference|Unverified|Speculation)\]$/))) {
      out.push(new TextRun({ ...base, text: `[${m[1]}]`, bold: true, size: 15, color: base.color === C.white ? C.sky : C.blue }));
    } else out.push(new TextRun({ ...base, text: part }));
  }
  return out;
}

const P = (text, o = {}) => new Paragraph({ spacing: { after: 140, line: 288 }, ...o.para, children: runs(text, o.run || {}) });
const none = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: none };
const cellNoBorders = { top: none, bottom: none, left: none, right: none };

function box(children, { fill = C.ice, left = C.blue, leftSize = 24, margins = 220 } = {}) {
  return new Table({
    width: { size: CW, type: WidthType.DXA }, columnWidths: [CW], borders: noBorders,
    rows: [new TableRow({ children: [new TableCell({
      width: { size: CW, type: WidthType.DXA }, shading: { fill, type: ShadingType.CLEAR, color: "auto" },
      borders: { ...cellNoBorders, left: left ? { style: BorderStyle.SINGLE, size: leftSize, color: left } : none },
      margins: { top: margins, bottom: margins - 60, left: margins + 40, right: margins + 40 }, children,
    })] })],
  });
}
const spacer = (after = 120) => new Paragraph({ spacing: { after }, children: [] });

// ---------------------------------------------------------------- block renderers
const exhibitHead = (label, title) => [
  new Paragraph({ keepNext: true, spacing: { before: 200, after: 40 }, children: [new TextRun({ text: label.toUpperCase(), bold: true, size: 15, color: C.blue, font: SANS, characterSpacing: 30 })] }),
  new Paragraph({ keepNext: true, spacing: { after: 100 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.navy, space: 4 } },
    children: [new TextRun({ text: title, bold: true, size: 21, color: C.navy, font: SANS })] }),
];
const note = (label, text, last = false) => new Paragraph({ spacing: { after: last ? 220 : 20 }, children: [
  new TextRun({ text: label + ": ", bold: true, size: 14, color: C.grey }), ...runs(text, { size: 14, color: C.grey })] });

const chart = (name, widthPx, dir = "charts") => {
  const png = path.join(ROOT, dir, name + ".png"); const svg = path.join(ROOT, dir, name + ".svg");
  const [w, h] = pngSize(png);
  return new ImageRun({ type: "svg", data: fs.readFileSync(svg), fallback: { type: "png", data: fs.readFileSync(png) },
    transformation: { width: widthPx, height: Math.round(widthPx * h / w) } });
};
function exhibit(b, widthPx = PX) {
  const head = exhibitHead(`Exhibit ${b.n}`, b.title);
  if (b.pageBreak) head[0] = new Paragraph({ pageBreakBefore: true, keepNext: true, spacing: { before: 0, after: 40 }, children: [new TextRun({ text: `EXHIBIT ${b.n}`, bold: true, size: 15, color: C.blue, font: SANS, characterSpacing: 30 })] });
  return [
    ...head,
    new Paragraph({ keepNext: true, spacing: { after: 80 }, alignment: AlignmentType.CENTER, children: [chart(b.img, widthPx, b.dir || "charts")] }),
    ...(b.notes ? [note("Notes", b.notes)] : []),
    note("Source", b.source, true),
  ];
}

function cell(text, w, o = {}) {
  return new TableCell({
    width: { size: w, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
    shading: o.fill ? { fill: o.fill, type: ShadingType.CLEAR, color: "auto" } : undefined,
    margins: { top: 70, bottom: 70, left: 100, right: 100 },
    borders: { top: none, left: none, right: none, bottom: { style: BorderStyle.SINGLE, size: 4, color: C.silver } },
    children: [new Paragraph({ alignment: o.align || AlignmentType.LEFT, spacing: { after: 0, line: 252 },
      children: runs(text, { size: o.size || 16, color: o.color || C.ink, bold: o.bold || false, font: SANS }) })],
  });
}

function heatFill(v) {
  if (/^<|^$/.test(v)) return ["F7F9FB", C.grey];
  const x = parseFloat(v); if (isNaN(x)) return [null, C.ink];
  if (x >= 15) return [C.navy, C.white]; if (x >= 5) return [C.blue, C.white]; if (x >= 2.5) return ["9DBBFF", C.navy];
  return ["DCE8FF", C.navy];
}

function table(b, tw = CW) {
  const W = b.widths.map((x) => Math.round(x * tw / b.widths.reduce((a, c) => a + c, 0)));
  const head = new TableRow({ tableHeader: true, children: b.head.map((h, i) => cell(h, W[i], { fill: C.navy, color: C.white, bold: true, size: 15,
    align: i > 0 && (b.sev || b.heat) ? AlignmentType.CENTER : AlignmentType.LEFT })) });
  const rows = b.rows.map((r, ri) => new TableRow({ cantSplit: true, children: r.map((v, i) => {
    const zebra = ri % 2 === 1 ? "F7F9FB" : undefined;
    if (b.sev && (b.sevCol ? i === b.sevCol : i > 0) && SEV[v]) return cell(v, W[i], { fill: SEV[v][0], color: SEV[v][1], bold: true, size: 15, align: AlignmentType.CENTER });
    if (b.heat && i >= 2) {
      if (ri === 0 && SEV[v]) return cell(v, W[i], { fill: SEV[v][0], color: SEV[v][1], bold: true, size: 15, align: AlignmentType.CENTER });
      if (ri === 1) return cell(v, W[i], { bold: true, size: 16, align: AlignmentType.CENTER, color: i === 2 ? C.blue : C.ink });
      const [f, c] = heatFill(v); return cell(v, W[i], { fill: f, color: c, size: 15, align: AlignmentType.CENTER, bold: i === 2 });
    }
    if (b.status && i === 3) {
      const col = v === "In force" ? C.green : v === "Gap" ? "D0353F" : C.amber;
      return new TableCell({ width: { size: W[i], type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER, shading: zebra ? { fill: zebra, type: ShadingType.CLEAR, color: "auto" } : undefined,
        margins: { top: 70, bottom: 70, left: 100, right: 100 }, borders: { top: none, left: none, right: none, bottom: { style: BorderStyle.SINGLE, size: 4, color: C.silver } },
        children: [new Paragraph({ spacing: { after: 0 }, children: [new TextRun({ text: "● ", color: col, size: 18 }), new TextRun({ text: v, size: 15, bold: true, color: col })] })] });
    }
    const first = i === 0;
    return cell(v, W[i], { fill: zebra, bold: first, color: first ? C.navy : C.ink, size: 15 });
  }) }));
  return [
    ...exhibitHead(b.n, b.title),
    new Table({ width: { size: tw, type: WidthType.DXA }, columnWidths: W, layout: TableLayoutType.FIXED, rows: [head, ...rows],
      borders: { ...noBorders } }),
    spacer(60),
    note("Source", b.source, true),
  ];
}

function glance(b) {
  return [box([
    new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: b.title.toUpperCase(), bold: true, size: 15, color: C.blue, characterSpacing: 40 })] }),
    ...(b.lead ? [new Paragraph({ spacing: { after: 140, line: 290 }, children: [new TextRun({ text: b.lead, font: SERIF, size: 25, color: C.navy })] })] : []),
    ...b.items.map((t) => new Paragraph({ numbering: { reference: "dash", level: 0 }, spacing: { after: 70, line: 264 }, children: runs(t, { size: 18, color: C.navy }) })),
  ], { fill: C.ice, left: C.blue, leftSize: 24, margins: 240 }), spacer(220)];
}

function callout(b) {
  if (b.strong) return [box([new Paragraph({ spacing: { after: 60, line: 300 }, children: runs(b.text, { size: 20, color: C.white, bold: true }) })], { fill: C.navy, left: C.cyan, leftSize: 36, margins: 300 }), spacer(220)];
  return [box([new Paragraph({ spacing: { after: 40, line: 264 }, children: runs(b.text, { size: 16, color: C.navy, italics: true }) })], { fill: C.mist, left: C.navy, leftSize: 18, margins: 160 }), spacer(200)];
}

function kpis(items) {
  const w = Math.floor(CW / 3); const cols = [w, w, CW - 2 * w];
  const rows = [];
  for (let r = 0; r < items.length; r += 3) {
    rows.push(new TableRow({ children: items.slice(r, r + 3).map(([num, lab], i) => new TableCell({
      width: { size: cols[i], type: WidthType.DXA }, margins: { top: 160, bottom: 140, left: 180, right: 120 },
      borders: { top: { style: BorderStyle.SINGLE, size: 12, color: C.blue }, bottom: none, left: none, right: i < 2 ? { style: BorderStyle.SINGLE, size: 4, color: C.white } : none },
      shading: { fill: C.ice, type: ShadingType.CLEAR, color: "auto" },
      children: [
        new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: num, font: SERIF, size: 36, color: C.blue, bold: true })] }),
        new Paragraph({ spacing: { after: 0 }, children: [new TextRun({ text: lab, size: 15, color: C.navy })] }),
      ] })) }));
  }
  return [new Paragraph({ spacing: { before: 280, after: 120 }, children: [new TextRun({ text: "KEY NUMBERS", bold: true, size: 15, color: C.blue, characterSpacing: 30 })] }),
    new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: cols, rows, borders: noBorders })];
}

function sectionOpener(b, first) {
  const out = [];
  if (b.exec) {
    out.push(new Paragraph({ pageBreakBefore: !first, spacing: { after: 60 }, children: [new TextRun({ text: "EXECUTIVE SUMMARY", bold: true, size: 15, color: C.blue, characterSpacing: 40 })] }));
    out.push(new Paragraph({ spacing: { after: 220 }, children: [new TextRun({ text: b.headline, font: SERIF, size: 44, color: C.navy })] }));
    return out;
  }
  out.push(new Paragraph({ pageBreakBefore: true, spacing: { after: 0 }, children: [new TextRun({ text: b.eyebrow, font: SERIF, size: 64, color: C.blue })] }));
  out.push(new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: b.title, font: SERIF, size: 44, color: C.navy })] }));
  out.push(new Paragraph({ spacing: { after: 280 }, children: [new TextRun({ text: "██████", color: C.blue, size: 10 })] }));
  return out;
}

function author() {
  return [new Paragraph({ spacing: { before: 360, after: 40 }, border: { top: { style: BorderStyle.SINGLE, size: 4, color: C.silver, space: 10 } },
    children: [new TextRun({ text: "PREPARED BY", bold: true, size: 14, color: C.blue, characterSpacing: 30 })] }),
    new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: "Le Dinh Thang (Alex), MA, Adv PA", font: SERIF, size: 24, color: C.navy, bold: true })] }),
    new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: "Managing Partner, Partner and Advisory Services Leader, ABrighter", size: 16, color: C.grey })] }),
    new Paragraph({ spacing: { after: 0 }, children: [new TextRun({ text: "thang.le@abrighterconsultancy.com  |  +84 90 338 5558", size: 16, color: C.blue })] })];
}

function stats(b) {
  const w = Math.floor(CW / 3); const cols = [w, w, CW - 2 * w];
  const rows = [];
  for (let r = 0; r < b.items.length; r += 3) {
    rows.push(new TableRow({ cantSplit: true, children: b.items.slice(r, r + 3).map(([num, lab, src], i) => new TableCell({
      width: { size: cols[i], type: WidthType.DXA }, margins: { top: 180, bottom: 160, left: 200, right: 160 },
      borders: { top: { style: BorderStyle.SINGLE, size: 18, color: r === 0 ? C.navy : C.blue }, bottom: none, left: none, right: i < 2 ? { style: BorderStyle.SINGLE, size: 36, color: C.white } : none },
      shading: { fill: r === 0 ? C.ice : C.mist, type: ShadingType.CLEAR, color: "auto" },
      children: [
        new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: num, font: SERIF, size: 44, color: C.blue, bold: true })] }),
        new Paragraph({ spacing: { after: 60, line: 252 }, children: [new TextRun({ text: lab, size: 17, color: C.navy, bold: true })] }),
        new Paragraph({ spacing: { after: 0 }, children: [new TextRun({ text: src, size: 13, color: C.grey })] }),
      ] })) }));
  }
  return [new Paragraph({ spacing: { before: 300, after: 120 }, children: [new TextRun({ text: b.title.toUpperCase(), bold: true, size: 15, color: C.blue, characterSpacing: 40 })] }),
    new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: cols, rows, borders: noBorders })];
}

function mech(b) {
  const L = 3000, R = CW - L;
  const right = [];
  if (b.n) right.push(new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: `MECHANISM ${b.n}`, bold: true, size: 14, color: C.blue, characterSpacing: 40 })] }));
  right.push(new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: b.title, font: SERIF, size: 26, color: C.navy })] }));
  right.push(new Paragraph({ spacing: { after: 0, line: 280 }, children: runs(b.text, { size: 19 }) }));
  return [new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: [L, R], borders: noBorders, rows: [new TableRow({ cantSplit: true, children: [
    new TableCell({ width: { size: L, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER, margins: { top: 100, bottom: 100, left: 0, right: 200 },
      borders: { ...cellNoBorders, top: { style: BorderStyle.SINGLE, size: 6, color: C.navy } },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [chart(b.img, 186, "illus")] })] }),
    new TableCell({ width: { size: R, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER, margins: { top: 160, bottom: 120, left: 120, right: 0 },
      borders: { ...cellNoBorders, top: { style: BorderStyle.SINGLE, size: 6, color: C.navy } }, children: right }),
  ] })] }), spacer(200)];
}

function cards(b) {
  const w = Math.floor(CW / 3); const cols = [w, w, CW - 2 * w];
  return [
    ...exhibitHead(`Exhibit ${b.n}`, b.title),
    new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: cols, borders: noBorders, rows: [new TableRow({ cantSplit: true, children: b.items.map((it, i) => new TableCell({
      width: { size: cols[i], type: WidthType.DXA }, margins: { top: 120, bottom: 160, left: 160, right: 160 },
      shading: { fill: C.mist, type: ShadingType.CLEAR, color: "auto" },
      borders: { top: { style: BorderStyle.SINGLE, size: 18, color: [C.navy, C.blue, C.cyan][i] }, bottom: none, left: none, right: i < 2 ? { style: BorderStyle.SINGLE, size: 36, color: C.white } : none },
      children: [
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [chart(it.img, 180, "illus")] }),
        new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: it.head, font: SERIF, size: 24, color: C.navy })] }),
        new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: it.sub.toUpperCase(), bold: true, size: 13, color: C.blue, characterSpacing: 20 })] }),
        new Paragraph({ spacing: { after: 0, line: 252 }, children: runs(it.text, { size: 16 }) }),
      ] })) })] }),
    spacer(40), note("Source", b.source, true),
  ];
}

function boxBlock(b) {
  const inner = CW - 2 * 300;
  const kids = [new Paragraph({ spacing: { after: 160 }, children: [
    new TextRun({ text: ` ${b.label.toUpperCase()} `, bold: true, size: 16, color: C.white, shading: { type: ShadingType.CLEAR, fill: C.navy, color: "auto" }, characterSpacing: 20 }),
    new TextRun({ text: "   " + b.title, font: SERIF, size: 26, color: C.navy })] })];
  for (const c of b.blocks) {
    if (c.t === "p") kids.push(new Paragraph({ spacing: { after: 140, line: 280 }, children: runs(c.text, { size: 19 }) }));
    if (c.t === "img") kids.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 140 }, children: [chart(c.img, c.width || 560, c.dir || "illus")] }));
    if (c.t === "exhibit") kids.push(...exhibit(c, 600));
    if (c.t === "table") kids.push(...table(c, inner));
  }
  return [new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: [CW], borders: noBorders, rows: [new TableRow({ children: [new TableCell({
    width: { size: CW, type: WidthType.DXA }, shading: { fill: "F4F6F9", type: ShadingType.CLEAR, color: "auto" },
    borders: { ...cellNoBorders, top: { style: BorderStyle.SINGLE, size: 18, color: C.navy } },
    margins: { top: 260, bottom: 200, left: 300, right: 300 }, children: kids })] })] }), spacer(220)];
}

// ---------------------------------------------------------------- body
const body = [];
let execBuffer = null;
for (let k = 0; k < S.length; k++) {
  const b = S[k];
  if (b.t !== "p" || !b.exec) {
    if (execBuffer) { body.push(box(execBuffer, { fill: C.navy, left: C.cyan, leftSize: 36, margins: 320 })); execBuffer = null; }
  }
  switch (b.t) {
    case "section": body.push(...sectionOpener(b, k === 0)); break;
    case "p":
      if (b.exec) { (execBuffer ||= []).push(new Paragraph({ spacing: { after: 160, line: 290 }, children: runs(b.text, { size: 19, color: C.white }) })); break; }
      if (b.small) { body.push(P(b.text, { run: { size: 15, color: C.grey, italics: true } })); break; }
      body.push(P(b.text, { run: { size: 20 } })); break;
    case "h2": body.push(new Paragraph({ keepNext: true, spacing: { before: 280, after: 120 }, children: [new TextRun({ text: b.text, bold: true, size: 26, color: C.navy })] })); break;
    case "h3": body.push(new Paragraph({ keepNext: true, spacing: { before: 200, after: 80 }, children: [new TextRun({ text: b.text, bold: true, size: 20, color: C.blue })] })); break;
    case "bullets": b.items.forEach((t) => body.push(new Paragraph({ numbering: { reference: "dash", level: 0 }, spacing: { after: 100, line: 280 }, children: runs(t, { size: 20 }) }))); body.push(spacer(80)); break;
    case "exhibit": body.push(...exhibit(b)); break;
    case "table": body.push(...table(b)); break;
    case "glance": body.push(...glance(b)); break;
    case "callout": body.push(...callout(b)); break;
    case "kpis": body.push(...kpis(b.items)); body.push(...author()); break;
    case "stats": body.push(...stats(b)); body.push(...author()); break;
    case "mech": body.push(...mech(b)); break;
    case "cards": body.push(...cards(b)); break;
    case "box": body.push(...boxBlock(b)); break;
  }
}
if (execBuffer) body.push(box(execBuffer, { fill: C.navy }));

// prepared-by block after key numbers

// ---------------------------------------------------------------- references and appendices
const refs = [
  new Paragraph({ pageBreakBefore: true, spacing: { after: 0 }, children: [new TextRun({ text: "07", font: SERIF, size: 64, color: C.blue })] }),
  new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: "References", font: SERIF, size: 44, color: C.navy })] }),
  new Paragraph({ spacing: { after: 280 }, children: [new TextRun({ text: "██████", color: C.blue, size: 10 })] }),
  ...REFS.map((r) => new Paragraph({ spacing: { after: 110, line: 252 }, indent: { left: 360, hanging: 360 }, children: [new TextRun({ text: r, size: 16 })] })),
];

const NTM = [
  ["Import-related", "Technical", "A", "Sanitary and phytosanitary (SPS) measures", "Quarantine rules; pesticide residue limits"],
  ["", "", "B", "Technical barriers to trade (TBT)", "Product standards; labelling rules"],
  ["", "", "C", "Pre-shipment inspection and formalities", "Pre-shipment checks; customs documentation"],
  ["", "Non-technical", "D", "Contingent trade-protective measures", "Anti-dumping; safeguard measures"],
  ["", "", "E", "Licensing, quotas and quantity controls", "Import licences; import quotas"],
  ["", "", "F", "Price-control measures", "Minimum import prices; additional charges"],
  ["", "", "G", "Finance measures", "Foreign-exchange controls; advance payment rules"],
  ["", "", "H", "Competition-related measures", "Exclusive import rights"],
  ["", "", "I", "Trade-related investment measures", "Local content requirements"],
  ["", "", "J", "Distribution restrictions", "Limits on wholesale and retail distribution"],
  ["", "", "K", "Post-sales service restrictions", "Restrictions on repair and maintenance services"],
  ["", "", "L", "Subsidies (non-export)", "Production subsidies; tax incentives"],
  ["", "", "M", "Government procurement restrictions", "Preferred suppliers"],
  ["", "", "N", "Intellectual property measures", "Patent and trademark enforcement"],
  ["", "", "O", "Rules of origin", "Origin certification; value-added rules"],
  ["Export-related", "", "P", "Export-related measures", "Export licences; export quotas"],
];
const GLOSS = [
  ["AVE", "Ad valorem equivalent: the price effect of an NTM expressed as a percentage, like a tariff"],
  ["CBAM", "Carbon Border Adjustment Mechanism of the EU"],
  ["DPPA", "Direct power purchase agreement between a renewable generator and a large user"],
  ["EAF", "Electric arc furnace, which melts scrap or direct reduced iron using electricity"],
  ["EU ETS", "EU Emissions Trading System, the source of the CBAM certificate price"],
  ["EUDR", "EU Deforestation Regulation"],
  ["EVFTA", "EU-Vietnam Free Trade Agreement, in force since 1 August 2020"],
  ["MAE", "Ministry of Agriculture and Environment of Vietnam"],
  ["MOIT", "Ministry of Industry and Trade of Vietnam"],
  ["MRL", "Maximum residue limit for pesticides in food"],
  ["MRV", "Measurement, reporting and verification of greenhouse gas emissions"],
  ["NSO", "National Statistics Office of Vietnam"],
  ["NTM", "Non-tariff measure"],
  ["PDP8", "National Power Development Plan VIII"],
  ["SPS / TBT", "Sanitary and phytosanitary measures / technical barriers to trade"],
  ["UNCTAD", "United Nations Conference on Trade and Development"],
  ["VSA", "Vietnam Steel Association"],
];
const METHOD = [
  ["Data cut-off", "30 June 2026. Peer comparisons use the 2024 dataset in Krungsri Research (2026) so that all five economies are measured on one basis. Vietnamese national figures for 2025 and H1 2026 come from NSO, Customs, MOIT and industry associations, in most cases as reported by official news agencies because the primary databases were not accessible to us."],
  ["EU exposure, 2025", "56.2 / 475.04 = 11.8% of exports; 56.2 / 514 = 10.9% of GDP."],
  ["NTM-sensitive exports, 2025", "56.2 x 81.4% = USD 45.7 bn; 45.7 / 514 = 8.9% of GDP. Assumes the 2024 product structure held in 2025."],
  ["Implied cost wedge", "Sum over nine items of 2025 export value x AVE proxy = USD 23.3 bn; divided by USD 330.8 bn = weighted AVE of 7.0%. AVE proxies are global averages by product group and not EU-specific estimates for Vietnam."],
  ["EUDR exposure", "56.2 x 3.9% (coffee) = 2.19; x 1.5% (wood) = 0.84; x 1.3% (rubber) = 0.73; total USD 3.77 bn, or 6.7% of exports to the EU."],
  ["CBAM bill", "2.08 Mt x intensity x EUR 78/t x (100% - CBAM factor). Full phase-in at 2.51 t = EUR 407 m (EUR 196/t); 2026 = EUR 10 m; 2030 = EUR 198 m. Ignores the benchmark adjustment for free allocation, export rebates and changes in volume, price or intensity. Unit value = USD 1.4 bn / 2.08 Mt = about USD 673/t."],
  ["Three-market share", "(153.2 + 70.45 + 56.2) / 475.04 = 58.9% of 2025 exports."],
];

function simpleTable(head, rows, widths, opts = {}) {
  return new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: widths, layout: TableLayoutType.FIXED, borders: noBorders,
    rows: [new TableRow({ tableHeader: true, children: head.map((h, i) => cell(h, widths[i], { fill: C.navy, color: C.white, bold: true, size: 15 })) }),
      ...rows.map((r, ri) => new TableRow({ cantSplit: true, children: r.map((v, i) => cell(v, widths[i], { size: 15, bold: i === 0 || (opts.boldCol === i), color: i === 0 ? C.navy : C.ink,
        fill: opts.ntm ? (i <= 1 ? (r[0] === "Export-related" ? "F7F9FB" : (ri < 3 ? C.ice : "F7F9FB")) : (ri < 3 ? C.ice : undefined)) : (ri % 2 ? "F7F9FB" : undefined) })) }))] });
}

const appendix = [
  new Paragraph({ pageBreakBefore: true, spacing: { after: 0 }, children: [new TextRun({ text: "07", font: SERIF, size: 64, color: C.blue })] }),
  new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: "Appendix", font: SERIF, size: 44, color: C.navy })] }),
  new Paragraph({ spacing: { after: 280 }, children: [new TextRun({ text: "██████", color: C.blue, size: 10 })] }),
  ...exhibitHead("Appendix A", "Non-tariff measure classification"),
  simpleTable(["Measure type", "Group", "Chapter", "NTM category", "Key examples"], NTM, [1500, 1300, 800, 3100, 2938], { ntm: true, boldCol: 2 }),
  spacer(40), note("Source", "UNCTAD; Krungsri Research (2026)", true),
  ...exhibitHead("Appendix B", "Methodology and data notes"),
  simpleTable(["Item", "Calculation or note"], METHOD, [2300, 7338]),
  spacer(40),
  new Paragraph({ spacing: { after: 80, line: 260 }, children: runs("Exhibit 3 tiers follow Krungsri Research (2026): 'Very High' for agri-food; 'High' for apparel, textiles, motor vehicles, electronics, machinery and wood products; 'Moderate' for chemicals, metals, rubber, plastics and leather; 'Low' for minerals, oil and gas. Mapping Vietnam's export items to these groups is our own judgement. Footwear is mapped to tanning and leather.", { size: 15, color: C.grey }) }),
  new Paragraph({ spacing: { after: 240, line: 260 }, children: runs("Figures described in the text as our estimate, our calculation or our scenario are ABrighter Research derivations from the sources shown. Their arithmetic is set out above. Peer comparisons use the 2024 regional dataset compiled by Krungsri Research (2026) from Trade Map and CEIC.", { size: 15, color: C.grey }) }),
  ...exhibitHead("Appendix C", "Glossary"),
  simpleTable(["Term", "Meaning"], GLOSS, [1800, 7838]),
  spacer(40),
];

const svcW = [CW / 2, CW / 2];
const svc = (title, items) => new TableCell({ width: { size: CW / 2, type: WidthType.DXA }, margins: { top: 160, bottom: 140, left: 200, right: 200 },
  borders: { top: { style: BorderStyle.SINGLE, size: 12, color: C.blue }, bottom: none, left: none, right: { style: BorderStyle.SINGLE, size: 24, color: C.white } },
  shading: { fill: C.ice, type: ShadingType.CLEAR, color: "auto" },
  children: [new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: title, bold: true, size: 19, color: C.navy })] }),
    ...items.map((t) => new Paragraph({ numbering: { reference: "dash", level: 0 }, spacing: { after: 40, line: 252 }, children: [new TextRun({ text: t, size: 16 })] }))] });
const about = [
  new Paragraph({ pageBreakBefore: true, spacing: { after: 0 }, children: [new TextRun({ text: "ABOUT ABRIGHTER", bold: true, size: 15, color: C.blue, characterSpacing: 40 })] }),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "A brighter future for all customers", font: SERIF, size: 44, color: C.navy })] }),
  box([
    new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: "OUR PURPOSE", bold: true, size: 15, color: C.cyan, characterSpacing: 40 })] }),
    new Paragraph({ spacing: { after: 60, line: 300 }, children: [new TextRun({ text: "Building a brighter future for all customers and doing the right things. Our mission for advisory to clients rests on three words: care, encourage and commitment.", font: SERIF, size: 24, color: C.white })] }),
  ], { fill: C.navy, left: C.cyan, leftSize: 36, margins: 280 }),
  spacer(200),
  P("ABrighter is an advisory team that helps clients build better organisations. We work with public bodies, consumer businesses and companies going through financial and organisational change. Our team is bound by ethics, integrity and honesty. We treat clients, candidates and employees with the respect they deserve. Our strategy is simple: to become a valued partner that helps each client grow more modern, resilient and sustainable.", { run: { size: 19 } }),
  new Paragraph({ spacing: { before: 120, after: 100 }, children: [new TextRun({ text: "OUR VALUES", bold: true, size: 15, color: C.blue, characterSpacing: 40 })] }),
  new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: [Math.floor(CW / 3), Math.floor(CW / 3), CW - 2 * Math.floor(CW / 3)], borders: noBorders,
    rows: [new TableRow({ children: [["Care", "We care about our customers and each other. We serve with humility and transparency."],
      ["Courage", "We have the courage to step in, speak up and lead by example."],
      ["Commitment", "We are unwavering in our commitment. We do what is right and work together to get things done."]].map(([t, d], i) =>
      new TableCell({ width: { size: i < 2 ? Math.floor(CW / 3) : CW - 2 * Math.floor(CW / 3), type: WidthType.DXA }, margins: { top: 140, bottom: 120, left: 180, right: 160 },
        borders: { top: { style: BorderStyle.SINGLE, size: 12, color: C.navy }, bottom: none, left: none, right: { style: BorderStyle.SINGLE, size: 24, color: C.white } },
        shading: { fill: C.mist, type: ShadingType.CLEAR, color: "auto" },
        children: [new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: t, font: SERIF, size: 26, color: C.blue })] }),
          new Paragraph({ spacing: { after: 0, line: 252 }, children: [new TextRun({ text: d, size: 16 })] })] })) })] }),
  new Paragraph({ spacing: { before: 280, after: 100 }, children: [new TextRun({ text: "WHAT WE DO", bold: true, size: 15, color: C.blue, characterSpacing: 40 })] }),
  new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: svcW, borders: noBorders, rows: [
    new TableRow({ children: [svc("Strategy and finance control", ["Corporate strategy and management vision", "Business portfolio and digital transformation strategy", "Accounting, financial operations and management control"]),
      svc("Human capital management", ["Talent management", "Personal and organisation development", "Labour and legal HR"])] }),
    new TableRow({ children: [svc("Transactions and deals", ["Value drivers, operating cash flows and net debt", "Working capital and quality of earnings review", "Pricing, negotiation support and purchase price allocation"]),
      svc("Marketing and public relations", ["Corporate branding and repositioning", "PR strategy and new product campaigns", "Public affairs and advocacy strategy"])] }),
  ] }),
  new Paragraph({ spacing: { before: 280, after: 100 }, children: [new TextRun({ text: "HOW WE WORK WITH CLIENTS", bold: true, size: 15, color: C.blue, characterSpacing: 40 })] }),
  ...[["Design and implement", "We take on the client's needs and build an action plan for a better organisation."],
    ["Define and embed", "We embed and sustain the outcomes of the plan and bring best practice into delivery."],
    ["Mature and evolve", "We keep moving with each client as a real partner, assessing and improving as conditions change."]].map(([t, d], i) =>
    new Paragraph({ spacing: { after: 80, line: 264 }, children: [new TextRun({ text: `0${i + 1}  `, font: SERIF, size: 24, color: C.blue }), new TextRun({ text: t + ". ", bold: true, size: 18, color: C.navy }), new TextRun({ text: d, size: 18 })] })),
  new Paragraph({ spacing: { before: 300, after: 80 }, children: [new TextRun({ text: "DISCLAIMER", bold: true, size: 14, color: C.grey, characterSpacing: 30 })] }),
  P("This document is provided for information only. It is based on public sources believed to be reliable at the time of writing. ABrighter does not warrant their accuracy or completeness. Scenarios rest on stated assumptions and are not forecasts. Nothing in this report is investment, legal or tax advice. Readers should verify figures against primary sources before relying on them.", { run: { size: 14, color: C.grey } }),
];

// ---------------------------------------------------------------- contents
const TOC = [
  ["Executive Summary", "exec"], ["A Nation Always Online", "intro"],
  ["Engineered to Hold Attention", "design"],
  ["The Case for Switching Off", "why"],
  ["From Personal Choice to Public Rules", "policy"],
  ["Banking in a Detox Era", "banking"],
  ["The ABrighter Perspective", "view"], ["References", "refs"],
];
const contents = [
  new Paragraph({ spacing: { after: 0 }, children: [new TextRun({ text: "CONTENTS", bold: true, size: 15, color: C.blue, characterSpacing: 40 })] }),
  new Paragraph({ spacing: { after: 500 }, children: [new TextRun({ text: "Contents", font: SERIF, size: 56, color: C.navy })] }),
  ...TOC.map(([t, id], i) => new Paragraph({ tabStops: [{ type: TabStopType.LEFT, position: 700 }, { type: TabStopType.RIGHT, position: CW }], spacing: { after: 260 }, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: C.silver, space: 8 } },
    children: [new TextRun({ text: (i === 0 ? "" : String(i).padStart(2, "0")) + "\t", font: SERIF, size: 26, color: C.blue }),
      new TextRun({ text: t, bold: true, size: 22, color: C.navy }),
      new TextRun({ text: "\t" + String(PAGES[id] || ""), bold: true, size: 22, color: C.blue })] })),
  new Paragraph({ spacing: { before: 700, after: 0 }, children: [img("assets/abrighter_logo.png", 150)] }),
  new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "Research Intelligence  |  Vietnam Consumer Series  |  October 2026", size: 15, color: C.grey })] }),
];

// ---------------------------------------------------------------- header / footer
const header = new Header({ children: [new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: CW }], spacing: { after: 0 }, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: C.silver, space: 4 } },
  children: [new TextRun({ text: "RESEARCH INTELLIGENCE  |  VIETNAM CONSUMER", size: 14, color: C.grey, bold: true, characterSpacing: 20 }),
    new TextRun({ text: "\t" }),
    img("assets/abrighter_logo.png", 78)] })] });
const footer = new Footer({ children: [new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: CW }], spacing: { before: 0 }, children: [
  new TextRun({ text: "The Calm Dividend: Digital Detox and the Future of Banking in Vietnam", size: 14, color: C.grey }),
  new TextRun({ children: ["\t", PageNumber.CURRENT], bold: true, size: 18, color: C.blue })] })] });
const blank = { default: new Header({ children: [new Paragraph({ children: [] })] }) };
const blankF = { default: new Footer({ children: [new Paragraph({ children: [] })] }) };

const A4 = { width: 11906, height: 16838 };
const fullPage = (file) => {
  const f = path.join(ROOT, file);
  return new Paragraph({ spacing: { before: 0, after: 0 }, children: [new ImageRun({ type: "jpg", data: fs.readFileSync(f), transformation: { width: 794, height: 1123 },
    floating: { horizontalPosition: { relative: HorizontalPositionRelativeFrom.PAGE, offset: 0 }, verticalPosition: { relative: VerticalPositionRelativeFrom.PAGE, offset: 0 }, behindDocument: true, allowOverlap: true } })] });
};

const doc = new Document({
  creator: "ABrighter Research", title: "The Calm Dividend: Digital Detox and the Future of Banking in Vietnam",
  description: "Research Intelligence report, data to 30 September 2026",
  styles: { default: { document: { run: { font: SANS, size: 20, color: C.ink } } } },
  numbering: { config: [{ reference: "dash", levels: [{ level: 0, format: LevelFormat.BULLET, text: "■", alignment: AlignmentType.LEFT,
    style: { paragraph: { indent: { left: 340, hanging: 280 } }, run: { color: C.blue, size: 14 } } }] }] },
  footnotes,
  sections: [
    { properties: { page: { size: A4, margin: { top: 720, bottom: 720, left: 720, right: 720, header: 0, footer: 0 } } }, headers: blank, footers: blankF, children: [fullPage("assets/cover.jpg")] },
    { properties: { page: { size: A4, margin: { top: 1300, bottom: 1134, left: 1134, right: 1134 } } }, headers: blank, footers: blankF, children: contents },
    { properties: { page: { size: A4, margin: { top: 1300, bottom: 1134, left: 1134, right: 1134, header: 560, footer: 520 } } },
      headers: { default: header }, footers: { default: footer }, children: [...body, ...refs, ...about] },
    { properties: { page: { size: A4, margin: { top: 720, bottom: 720, left: 720, right: 720, header: 0, footer: 0 } } }, headers: blank, footers: blankF, children: [fullPage("assets/back.jpg")] },
  ],
});

const out = path.join(ROOT, "ABrighter_Digital_Detox_Vietnam_2026.docx");
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(out, buf); console.log("wrote", out, buf.length, "footnotes", fnCounter); });
