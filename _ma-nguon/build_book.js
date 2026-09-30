// Dựng sách .docx từ content.js. Chạy: node build_book.js <book|library> <out.docx>
const fs = require('fs');
const path = require('path');
const D = require('docx');
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell, WidthType,
  ShadingType, BorderStyle, AlignmentType, LevelFormat, PageBreak, Footer, PageNumber,
  HeadingLevel, ExternalHyperlink, VerticalAlign,
} = D;

const MODE = process.argv[2] || 'book';
const OUT = process.argv[3] || 'book.docx';
const C = require(MODE === 'guide' ? './guide.js' : './content.js');
const TITLE = MODE === 'library' ? 'Thư viện câu lệnh' : MODE === 'guide' ? 'Hướng dẫn trước khi sử dụng' : 'Dạy cùng AI';

const G = '1F4E47', Y = 'F2B134', W = 'FFFFFF', GT = 'E9EFEE', YT = 'FDF1D8';
const FONT = 'Arial';
const CW = 9638; // A4 21cm - 2x2cm lề = 17cm = 9638 DXA

// --- chữ có **đậm** ---
function runs(text, o = {}) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map(s => {
    const b = s.startsWith('**');
    return new TextRun({ text: b ? s.slice(2, -2) : s, bold: b || o.bold, color: o.color || G, size: o.size || 22, font: FONT, italics: o.italics });
  });
}
const P = (text, o = {}) => new Paragraph({ children: runs(text, o), spacing: { after: o.after ?? 120, line: o.line || 300 }, alignment: o.align, indent: o.indent });

const none = { style: BorderStyle.NONE, size: 0, color: W };
const noBorders = { top: none, bottom: none, left: none, right: none };

function boxTable(children, fill, border) {
  const b = border ? { style: BorderStyle.DASHED, size: 6, color: G } : none;
  return new Table({
    width: { size: CW, type: WidthType.DXA }, columnWidths: [CW],
    rows: [new TableRow({ cantSplit: true, children: [new TableCell({
      width: { size: CW, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill, color: 'auto' },
      borders: { top: b, bottom: b, left: b, right: b },
      margins: { top: 160, bottom: 160, left: 220, right: 220 },
      children,
    })] })],
  });
}
const spacer = (after = 120) => new Paragraph({ children: [], spacing: { after } });

function label(text, fill = Y, color = G) {
  return new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: ' ' + text + ' ', bold: true, size: 18, color, font: FONT, shading: { type: ShadingType.CLEAR, fill, color: 'auto' } })] });
}

function img(name, caption, widthPx = 560) {
  const f = path.join(__dirname, 'png', name + '.png');
  const out = [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80, after: 60 }, children: [new ImageRun({ type: 'png', data: fs.readFileSync(f), transformation: { width: widthPx, height: Math.round(widthPx * 9 / 16) }, altText: { title: caption, description: caption, name } })] })];
  if (caption) out.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: caption, italics: true, size: 18, color: G, font: FONT })] }));
  return out;
}

let listCount = 0;
const numbering = { config: [
  { reference: 'bul', levels: [{ level: 0, format: LevelFormat.BULLET, text: '●', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 440, hanging: 280 } }, run: { color: Y } } }] },
  { reference: 'chk', levels: [{ level: 0, format: LevelFormat.BULLET, text: '☐', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 480, hanging: 360 } }, run: { color: G, size: 26 } } }] },
  { reference: 'steps', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: 'Bước %1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 1000, hanging: 1000 } }, run: { bold: true, color: G } } }] },
] };

function promptBox(title, lines) {
  return [boxTable([
    label((/^câu lệnh/i.test(title) ? title : 'CÂU LỆNH · ' + title).toUpperCase()),
    ...lines.map(l => new Paragraph({ spacing: { after: 60, line: 290 }, children: runs(l, { size: 21 }) })),
  ], GT), spacer(160)];
}

function levelsTable(lv) {
  const rows = [['Mầm non', lv.mn], ['Tiểu học', lv.th], ['THCS', lv.thcs]];
  const w1 = 1700, w2 = CW - w1;
  const head = new TableRow({ cantSplit: true, children: [new TableCell({ columnSpan: 2, width: { size: CW, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: Y, color: 'auto' }, borders: noBorders, margins: { top: 80, bottom: 80, left: 200, right: 200 }, children: [new Paragraph({ keepNext: true, children: [new TextRun({ text: 'ĐỔI CHO LỚP CỦA THẦY CÔ', bold: true, size: 18, color: G, font: FONT })] })] })] });
  return [new Table({
    width: { size: CW, type: WidthType.DXA }, columnWidths: [w1, w2],
    rows: [head, ...rows.map(([k, v], i) => new TableRow({ cantSplit: true, children: [
      new TableCell({ width: { size: w1, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER, shading: { type: ShadingType.CLEAR, fill: G, color: 'auto' }, borders: { ...noBorders, bottom: { style: BorderStyle.SINGLE, size: 8, color: W } }, margins: { top: 100, bottom: 100, left: 200, right: 120 }, children: [new Paragraph({ keepNext: i < 2, children: [new TextRun({ text: k, bold: true, color: W, size: 20, font: FONT })] })] }),
      new TableCell({ width: { size: w2, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: i % 2 ? W : GT, color: 'auto' }, borders: noBorders, margins: { top: 100, bottom: 100, left: 200, right: 200 }, children: [new Paragraph({ keepNext: i < 2, spacing: { line: 280 }, children: runs(v, { size: 20 }) })] }),
    ] }))],
  }), spacer(160)];
}

function simpleTable(head, rows) {
  const n = head.length;
  const widths = n === 3 ? (/^(Ngày|Buổi)$/.test(head[0]) ? [1000, 3000, CW - 4000] : head[0].startsWith('Công cụ') ? [3400, 1900, CW - 5300] : [4200, 1700, CW - 5900]) : [3200, CW - 3200];
  const cell = (t, i, fill, bold, color) => new TableCell({ width: { size: widths[i], type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill, color: 'auto' }, borders: noBorders, margins: { top: 90, bottom: 90, left: 160, right: 160 }, children: [new Paragraph({ children: runs(t, { size: 20, bold, color }) })] });
  return [new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: widths, rows: [
    new TableRow({ tableHeader: true, children: head.map((h, i) => cell(h, i, G, true, W)) }),
    ...rows.map((r, ri) => new TableRow({ children: r.map((t, i) => cell(t, i, ri % 2 ? W : GT, i === 0)) })),
  ] }), spacer(200)];
}

function heading1(kicker, title, sub) {
  return [
    new Paragraph({ spacing: { before: 600, after: 80 }, children: [new TextRun({ text: ' ' + kicker + ' ', bold: true, size: 22, color: G, font: FONT, shading: { type: ShadingType.CLEAR, fill: Y, color: 'auto' } })] }),
    new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { after: 120 }, children: [new TextRun({ text: title, bold: true, size: 44, color: G, font: FONT })] }),
    ...(sub ? [P(sub, { size: 22, italics: true, after: 240 })] : []),
  ];
}
function heading2(code, title) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, keepNext: true, spacing: { before: 360, after: 140 }, children: [
    new TextRun({ text: ' ' + code + ' ', bold: true, size: 26, color: Y, font: FONT, shading: { type: ShadingType.CLEAR, fill: G, color: 'auto' } }),
    new TextRun({ text: '  ' + title, bold: true, size: 30, color: G, font: FONT }),
  ] });
}

function cover(isLib) {
  return [
    new Paragraph({ spacing: { before: 1400, after: 200 }, children: [new TextRun({ text: ' SỔ TAY THỰC HÀNH ', bold: true, size: 24, color: G, font: FONT, shading: { type: ShadingType.CLEAR, fill: Y, color: 'auto' } })] }),
    new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: isLib ? 'THƯ VIỆN CÂU LỆNH' : 'DẠY CÙNG AI', bold: true, size: 80, color: G, font: FONT })] }),
    new Paragraph({ spacing: { after: 400 }, children: [new TextRun({ text: isLib ? 'Toàn bộ câu lệnh trong sách, sẵn để sao chép' : 'Từ câu lệnh đầu tiên đến trợ giảng ảo', size: 36, color: G, font: FONT })] }),
    ...img('h01-vong-lam-viec', null, 600),
    new Paragraph({ spacing: { before: 300, after: 80 }, children: [new TextRun({ text: 'Dành cho giáo viên Mầm non · Tiểu học · THCS', bold: true, size: 26, color: G, font: FONT })] }),
    new Paragraph({ children: [new TextRun({ text: 'Không cần biết trước về AI. Làm theo từng bước là dùng được.', size: 22, color: G, font: FONT })] }),
    new Paragraph({ spacing: { before: 400 }, children: [new TextRun({ text: 'Tác giả: [Tên tác giả]', size: 22, color: G, font: FONT })] }),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

function howto() {
  const legend = [
    [GT, 'Ô xanh nhạt · CÂU LỆNH', 'Sao chép nguyên văn, dán vào ô nhập của AI. Phần trong [ ] là chỗ thầy cô thay bằng nội dung của mình.'],
    [YT, 'Ô vàng nhạt · VÌ SAO', 'Giải thích vì sao câu lệnh dùng những câu chữ đó. Hiểu rồi thì tự viết được câu lệnh mới.'],
    [W, 'Bảng 3 cấp học', 'Câu lệnh đã đổi sẵn cho Mầm non, Tiểu học, THCS. Chọn dòng của mình.'],
    [W, 'Ô viền đứt · VÍ DỤ KẾT QUẢ', 'Chỉ để hình dung. Câu trả lời thực tế của AI mỗi lần mỗi khác.'],
  ];
  const out = [...heading1('BẮT ĐẦU', 'Cách dùng cuốn sách này', null)];
  out.push(P('Không cần đọc hết từ đầu đến cuối. Mỗi bài được viết để **đọc riêng trong 5 phút** và **làm theo ngay**. Thầy cô chưa từng dùng AI hãy đọc Phần A trước. Thầy cô đã biết dùng có thể mở thẳng **Phụ lục P1** để tìm bài theo việc cần làm.'));
  for (const [fill, t, d] of legend) {
    out.push(boxTable([new Paragraph({ children: runs('**' + t + '**', { size: 21 }) }), new Paragraph({ children: runs(d, { size: 20 }) })], fill, fill === W));
    out.push(spacer(100));
  }
  out.push(P('**Nội dung sách đi theo 4 buổi thực hành:** Buổi 1 kỹ thuật viết câu lệnh (Phần B). Buổi 2 kế hoạch bài dạy và kiểm tra đánh giá (Phần C). Buổi 3 sản phẩm đa phương tiện (Phần D). Buổi 4 Deep Research và chatbot (Phần E). Phần F nói về dùng AI có trách nhiệm.'));
  // mục lục thủ công
  out.push(...heading1('MỤC LỤC', 'Các bài trong sách', null));
  for (const b of C) {
    if (b[0] === 'part') out.push(new Paragraph({ spacing: { before: 160, after: 60 }, children: [new TextRun({ text: b[1] + ' · ' + b[2], bold: true, size: 22, color: G, font: FONT })] }));
    if (b[0] === 'lesson') out.push(new Paragraph({ indent: { left: 360 }, spacing: { after: 20 }, children: [new TextRun({ text: b[1] + '   ', bold: true, size: 20, color: 'B07A12', font: FONT }), new TextRun({ text: b[2], size: 20, color: G, font: FONT })] }));
  }
  out.push(new Paragraph({ children: [new PageBreak()] }));
  return out;
}

function render(block) {
  const [t, ...a] = block;
  switch (t) {
    case 'cover': return cover(false);
    case 'cover2': return [
      new Paragraph({ spacing: { before: 1400, after: 200 }, children: [new TextRun({ text: ' BỘ TÀI LIỆU DẠY CÙNG AI ', bold: true, size: 24, color: G, font: FONT, shading: { type: ShadingType.CLEAR, fill: Y, color: 'auto' } })] }),
      new Paragraph({ spacing: { after: 160 }, children: [new TextRun({ text: a[0], bold: true, size: 64, color: G, font: FONT })] }),
      new Paragraph({ spacing: { after: 400 }, children: [new TextRun({ text: a[1], size: 30, color: G, font: FONT })] }),
      ...img('h02-khung-chat', null, 600),
      new Paragraph({ spacing: { before: 300 }, children: [new TextRun({ text: 'Đọc tài liệu này trước khi mở sách. Khoảng 15 phút.', bold: true, size: 24, color: G, font: FONT })] }),
      new Paragraph({ children: [new PageBreak()] }),
    ];
    case 'howto': return howto();
    case 'part': return heading1(a[0], a[1], a[2]);
    case 'lesson': return [heading2(a[0], a[1])];
    case 'p': return [P(a[0])];
    case 'img': return img(a[0], a[1]);
    case 'pb': return [new Paragraph({ children: [new PageBreak()] })];
    case 'prompt': return promptBox(a[0], a[1]);
    case 'why': return [boxTable([label('VÌ SAO · ' + a[0].toUpperCase(), G, Y), P(a[1], { size: 21, after: 0 })], YT), spacer(160)];
    case 'example': return [boxTable([label('VÍ DỤ KẾT QUẢ · câu trả lời thực tế của AI sẽ khác', GT), ...a[0].map(l => P(l, { size: 20, italics: true, after: 40 }))], W, true), spacer(160)];
    case 'levels': return levelsTable(a[0]);
    case 'tip': return [new Paragraph({ spacing: { after: 160, line: 300 }, indent: { left: 200 }, children: [new TextRun({ text: 'MẸO  ', bold: true, color: 'B07A12', size: 20, font: FONT }), ...runs(a[0], { size: 21 })] })];
    case 'steps': { const inst = ++listCount; return [...a[0].map(s => new Paragraph({ numbering: { reference: 'steps', level: 0, instance: inst }, spacing: { after: 80, line: 290 }, children: runs(s) })), spacer(80)]; }
    case 'bullets': return [...a[0].map(s => new Paragraph({ numbering: { reference: 'bul', level: 0 }, spacing: { after: 80, line: 290 }, children: runs(s) })), spacer(80)];
    case 'checklist': return [...a[0].map(s => new Paragraph({ numbering: { reference: 'chk', level: 0 }, spacing: { after: 100, line: 290 }, children: runs(s) })), spacer(80)];
    case 'table': return simpleTable(a[0], a[1]);
    case 'links': return a[0].flatMap(([name, url]) => [
      new Paragraph({ spacing: { after: 20 }, children: runs('**' + name + '**', { size: 20 }) }),
      new Paragraph({ spacing: { after: 120 }, children: url.split(' · ').flatMap((u, i) => [...(i ? [new TextRun({ text: '  ·  ', size: 18, color: G, font: FONT })] : []), new ExternalHyperlink({ link: u, children: [new TextRun({ text: u, size: 18, color: '1F4E47', underline: {}, font: FONT })] })]) }),
    ]);
    default: throw new Error('Không rõ khối ' + t);
  }
}

// --- chế độ thư viện: chỉ lấy câu lệnh ---
function libraryBlocks() {
  const out = [...cover(true)];
  out.push(P('Mỗi câu lệnh đi kèm mã bài (ví dụ **B4**). Muốn hiểu vì sao câu lệnh viết như vậy, mở bài cùng mã trong sách **Dạy cùng AI**. Phần trong [ ] là chỗ thầy cô thay bằng nội dung của mình.'));
  let lesson = null;
  for (const b of C) {
    if (b[0] === 'part') out.push(...heading1(b[1], b[2], null));
    if (b[0] === 'lesson') lesson = b;
    if (b[0] === 'prompt' || b[0] === 'levels') {
      if (lesson) { out.push(heading2(lesson[1], lesson[2])); lesson = null; }
      out.push(...render(b));
    }
  }
  return out;
}

const children = MODE === 'library' ? libraryBlocks() : C.flatMap(render);

const doc = new Document({
  creator: 'Dạy cùng AI', title: TITLE,
  styles: {
    default: { document: { run: { font: FONT, size: 22, color: G } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 44, bold: true, color: G }, paragraph: { outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 30, bold: true, color: G }, paragraph: { outlineLevel: 1 } },
    ],
  },
  numbering,
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: TITLE + '  ·  ', size: 16, color: G, font: FONT }), new TextRun({ children: [PageNumber.CURRENT], size: 16, color: G, font: FONT })] })] }) },
    children,
  }],
});
Packer.toBuffer(doc).then(b => { fs.writeFileSync(OUT, b); console.log('OK', OUT); });
