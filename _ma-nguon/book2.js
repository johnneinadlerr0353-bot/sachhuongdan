// Dựng sách, hướng dẫn, thư viện câu lệnh. Chạy: node book2.js <book|guide|library> <out.docx>
// Số trang tham chiếu đọc từ pages.json (tạo bởi pages.py sau khi xuất PDF).
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell, WidthType,
  ShadingType, BorderStyle, AlignmentType, LevelFormat, PageBreak, Footer, PageNumber,
  HeadingLevel, ExternalHyperlink, VerticalAlign, TabStopType, LeaderType,
} = require('docx');

const MODE = process.argv[2] || 'book';
const OUT = process.argv[3] || MODE + '.docx';
const C = require('./content.js');
const { PARTS, ORDER, APPX, LESSON } = require('./meta.js');
const { GROUPS, DOCS, PER_LESSON } = require('./basis.js');
const PAGES = fs.existsSync(path.join(__dirname, 'pages.json')) ? JSON.parse(fs.readFileSync(path.join(__dirname, 'pages.json'))) : {};

// Ba màu dịu mắt: xanh chàm, bạc hà, trắng (và sắc nhạt của chúng)
const G = '2E3A67', M = 'CFE8E0', W = 'FFFFFF', MT = 'EAF5F1', GT = 'EEF0F6', GRAY = '55607F';
const FONT = 'Arial';
const CW = 9638;

// ---------- số bài, số trang ----------
const num = code => ORDER.includes(code) ? ORDER.indexOf(code) + 1 : APPX.indexOf(code) + 1;
const nameOf = code => ORDER.includes(code) ? 'Bài ' + num(code) : 'Phụ lục ' + num(code);
const pg = key => PAGES[key] ? String(PAGES[key]) : '?';
function R(str) {
  return String(str)
    .replace(/\{\{([A-FP][0-9]):s\}\}/g, (_, c) => `${nameOf(c)} (tr. ${pg(c)})`)
    .replace(/\{\{PART:([A-FP])\}\}/g, (_, p) => `Phần ${PARTS[p].no} (trang ${pg('PART_' + p)})`)
    .replace(/\{\{(BASIS|TOC|HOWTO|LETTER)\}\}/g, (_, k) => `trang ${pg(k)}`)
    .replace(/\{\{([A-FP][0-9])\}\}/g, (_, c) => `${nameOf(c)} (trang ${pg(c)})`);
}

// ---------- chữ ----------
function runs(text, o = {}) {
  return R(text).split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map(s => {
    const b = s.startsWith('**');
    return new TextRun({ text: b ? s.slice(2, -2) : s, bold: b || o.bold, color: o.color || G, size: o.size || 23, font: FONT, italics: o.italics });
  });
}
const P = (text, o = {}) => new Paragraph({ children: runs(text, o), spacing: { after: o.after ?? 140, line: o.line || 320 }, alignment: o.align, indent: o.indent, keepNext: o.keepNext });
const spacer = (after = 120) => new Paragraph({ children: [], spacing: { after } });
const none = { style: BorderStyle.NONE, size: 0, color: W };
const noB = { top: none, bottom: none, left: none, right: none };

function box(children, fill, border) {
  const b = border === 'dash' ? { style: BorderStyle.DASHED, size: 6, color: G } : border ? { style: BorderStyle.SINGLE, size: 8, color: G } : none;
  return new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: [CW], rows: [new TableRow({ cantSplit: true, children: [new TableCell({
    width: { size: CW, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill, color: 'auto' },
    borders: { top: b, bottom: b, left: b, right: b }, margins: { top: 160, bottom: 160, left: 240, right: 240 }, children,
  })] })] });
}
// nhãn ô: chữ trắng trên nền chàm, dễ đọc
const tag = text => new Paragraph({ spacing: { after: 120 }, keepNext: true, children: [new TextRun({ text: '  ' + text + '  ', bold: true, size: 18, color: W, font: FONT, shading: { type: ShadingType.CLEAR, fill: G, color: 'auto' } })] });

function img(name, caption, widthPx = 560) {
  const out = [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80, after: 60 }, keepNext: !!caption, children: [new ImageRun({ type: 'png', data: fs.readFileSync(path.join(__dirname, 'png', name + '.png')), transformation: { width: widthPx, height: Math.round(widthPx * 9 / 16) }, altText: { title: caption || name, description: caption || name, name } })] })];
  if (caption) out.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 220 }, children: [new TextRun({ text: R(caption), italics: true, size: 19, color: GRAY, font: FONT })] }));
  return out;
}

let listCount = 0;
const numbering = { config: [
  { reference: 'bul', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 440, hanging: 280 } }, run: { color: G } } }] },
  { reference: 'chk', levels: [{ level: 0, format: LevelFormat.BULLET, text: '☐', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 480, hanging: 360 } }, run: { color: G, size: 26 } } }] },
  { reference: 'steps', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: 'Bước %1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 1000, hanging: 1000 } }, run: { bold: true, color: G } } }] },
] };

function table(head, rows, widths) {
  widths = widths || (head.length === 3 ? [3900, 2300, CW - 6200] : [3300, CW - 3300]);
  const cell = (t, i, fill, color, bold) => new TableCell({ width: { size: widths[i], type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill, color: 'auto' }, borders: { ...noB, bottom: { style: BorderStyle.SINGLE, size: 4, color: 'D5DAE6' } }, margins: { top: 100, bottom: 100, left: 160, right: 160 }, children: [new Paragraph({ children: runs(t, { size: 21, color, bold }) })] });
  return [new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: widths, rows: [
    new TableRow({ tableHeader: true, cantSplit: true, children: head.map((h, i) => cell(h, i, G, W, true)) }),
    ...rows.map((r, ri) => new TableRow({ cantSplit: true, children: r.map((t, i) => cell(t, i, ri % 2 ? W : GT, G, false)) })),
  ] }), spacer(200)];
}

function levels(lv) {
  const rows = [['Mầm non', lv.mn], ['Tiểu học', lv.th], ['THCS', lv.thcs]];
  const w1 = 1700, w2 = CW - w1;
  return [new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: [w1, w2], rows: [
    new TableRow({ cantSplit: true, children: [new TableCell({ columnSpan: 2, width: { size: CW, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: G, color: 'auto' }, borders: noB, margins: { top: 100, bottom: 100, left: 200, right: 200 }, children: [new Paragraph({ keepNext: true, children: [new TextRun({ text: 'ĐỔI CHO LỚP CỦA THẦY CÔ: chọn đúng dòng cấp học của mình rồi sao chép', bold: true, size: 19, color: W, font: FONT })] })] })] }),
    ...rows.map(([k, v], i) => new TableRow({ cantSplit: true, children: [
      new TableCell({ width: { size: w1, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER, shading: { type: ShadingType.CLEAR, fill: M, color: 'auto' }, borders: { ...noB, bottom: { style: BorderStyle.SINGLE, size: 8, color: W } }, margins: { top: 120, bottom: 120, left: 200, right: 120 }, children: [new Paragraph({ keepNext: i < 2, children: [new TextRun({ text: k, bold: true, color: G, size: 21, font: FONT })] })] }),
      new TableCell({ width: { size: w2, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: MT, color: 'auto' }, borders: { ...noB, bottom: { style: BorderStyle.SINGLE, size: 8, color: W } }, margins: { top: 120, bottom: 120, left: 200, right: 200 }, children: [new Paragraph({ keepNext: i < 2, spacing: { line: 300 }, children: runs(v, { size: 21 }) })] }),
    ] })),
  ] }), spacer(180)];
}

const pb = () => new Paragraph({ children: [new PageBreak()] });
const kicker = (text, after = 60) => new Paragraph({ spacing: { after }, keepNext: true, children: [new TextRun({ text, bold: true, size: 20, color: G, font: FONT })] });
const h1 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_1, keepNext: true, spacing: { after: 200 }, children: [new TextRun({ text, bold: true, size: 44, color: G, font: FONT })] });
const h2 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_2, keepNext: true, spacing: { after: 160 }, children: [new TextRun({ text, bold: true, size: 36, color: G, font: FONT })] });
const h3 = (text) => new Paragraph({ keepNext: true, spacing: { before: 240, after: 120 }, children: [new TextRun({ text: R(text), bold: true, size: 26, color: G, font: FONT })] });

// ---------- khối nội dung ----------
function render(block) {
  const [t, ...a] = block;
  switch (t) {
    case 'p': return [P(a[0])];
    case 'img': return img(a[0], a[1]);
    case 'prompt': return [box([tag('CÂU LỆNH ĐỂ SAO CHÉP · ' + a[0].replace(/^Câu lệnh( gốc)?:? ?/i, '').toUpperCase().trim() || 'CÂU LỆNH ĐỂ SAO CHÉP'), ...a[1].map(l => new Paragraph({ spacing: { after: 70, line: 300 }, children: runs(l, { size: 22 }) }))], MT), spacer(180)];
    case 'why': return [box([tag('VÌ SAO VIẾT NHƯ VẬY · ' + a[0].toUpperCase()), P(a[1], { size: 22, after: 0 })], W, true), spacer(180)];
    case 'example': return [box([tag('VÍ DỤ KẾT QUẢ · câu trả lời thật của AI mỗi lần mỗi khác'), ...a[0].map(l => P(l, { size: 21, italics: true, after: 50 }))], W, 'dash'), spacer(180)];
    case 'levels': return levels(a[0]);
    case 'tip': return [box([tag('MẸO NHỎ'), P(a[0], { size: 22, after: 0 })], GT), spacer(160)];
    case 'stuck': return [box([tag('NẾU BỊ KẸT Ở BƯỚC NÀO, XEM Ở ĐÂY'), ...a[0].map(s => new Paragraph({ numbering: { reference: 'bul', level: 0 }, spacing: { after: 80, line: 300 }, children: runs(s, { size: 22 }) }))], GT), spacer(160)];
    case 'steps': { const inst = ++listCount; return [...a[0].map(s => new Paragraph({ numbering: { reference: 'steps', level: 0, instance: inst }, spacing: { after: 100, line: 310 }, children: runs(s) })), spacer(80)]; }
    case 'bullets': return [...a[0].map(s => new Paragraph({ numbering: { reference: 'bul', level: 0 }, spacing: { after: 90, line: 310 }, children: runs(s) })), spacer(80)];
    case 'checklist': return [...a[0].map(s => new Paragraph({ numbering: { reference: 'chk', level: 0 }, spacing: { after: 110, line: 310 }, children: runs(s) })), spacer(80)];
    case 'table': return table(a[0], a[1], a[2]);
    case 'links': return a[0].flatMap(([name, url]) => [
      new Paragraph({ spacing: { after: 20 }, keepNext: true, children: runs('**' + name + '**', { size: 21 }) }),
      new Paragraph({ spacing: { after: 140 }, children: url.split(' · ').flatMap((u, i) => [...(i ? [new TextRun({ text: '  ·  ', size: 19, color: G, font: FONT })] : []), new ExternalHyperlink({ link: u, children: [new TextRun({ text: u, size: 19, color: G, underline: {}, font: FONT })] })]) }),
    ]);
    default: return [];
  }
}

// ---------- chia nội dung theo phần và bài ----------
function structure() {
  const parts = [], byLesson = {};
  let part = null, cur = null;
  for (const b of C) {
    if (b[0] === 'part') {
      const letter = b[1] === 'PHỤ LỤC' ? 'P' : b[1].replace('PHẦN ', '');
      part = { letter, lessons: [] }; parts.push(part); cur = null;
    } else if (b[0] === 'lesson') {
      cur = { code: b[1], title: b[2], blocks: [] }; part.lessons.push(cur); byLesson[b[1]] = cur;
    } else if (cur) cur.blocks.push(b);
  }
  return { parts, byLesson };
}
const { parts, byLesson } = structure();

function lessonHeader(code, title, partLetter) {
  const meta = LESSON[code] || {};
  const k = partLetter === 'P' ? `PHỤ LỤC ${num(code)}` : `PHẦN ${PARTS[partLetter].no} · BÀI ${num(code)}`;
  const out = [kicker(k), h2(title)];
  const info = [];
  if (meta.goal) info.push(new Paragraph({ spacing: { after: 60 }, children: runs('**Bài này giúp thầy cô:** ' + meta.goal + '.', { size: 22 }) }));
  if (meta.time) info.push(new Paragraph({ spacing: { after: 0 }, children: runs('**Thời gian:** khoảng ' + meta.time + '. **Cần có:** máy tính hoặc điện thoại có mạng, tài khoản Gmail.', { size: 22 }) }));
  if (info.length) out.push(box(info, M), spacer(140));
  const refs = PER_LESSON[code];
  if (refs && MODE === 'book') out.push(new Paragraph({ spacing: { after: 160 }, children: [new TextRun({ text: 'Căn cứ: ', bold: true, size: 19, color: G, font: FONT }), new TextRun({ text: refs.map(r => { const d = DOCS.find(x => x[0] === r); return d[0].startsWith('L') ? d[2].replace(' (sửa đổi 2022)', '') + ' ' + d[3].split(/[,:]/)[0].replace('Luật số ', '') : d[3].split(',')[0].split(' ngày')[0].split(' (')[0]; }).join(' · ') + '. Xem bảng căn cứ ở ' + R('{{BASIS}}') + '.', size: 19, color: GRAY, font: FONT })] }));
  if (meta.say) out.push(new Paragraph({ spacing: { after: 200, line: 320 }, children: runs(meta.say, { italics: true, size: 23 }) }));
  return out;
}

// ---------- phần đầu sách ----------
function cover() {
  return [
    new Paragraph({ spacing: { before: 1200, after: 200 }, children: [new TextRun({ text: '  SỔ TAY THỰC HÀNH  ', bold: true, size: 22, color: G, font: FONT, shading: { type: ShadingType.CLEAR, fill: M, color: 'auto' } })] }),
    new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: 'Dạy cùng AI', bold: true, size: 96, color: G, font: FONT })] }),
    new Paragraph({ spacing: { after: 360 }, children: [new TextRun({ text: 'Cầm tay chỉ việc: từ câu lệnh đầu tiên đến trợ giảng ảo', size: 32, color: G, font: FONT })] }),
    ...img('h01-vong-lam-viec', null, 600),
    new Paragraph({ spacing: { before: 300, after: 80 }, children: [new TextRun({ text: 'Dành cho giáo viên Mầm non · Tiểu học · THCS', bold: true, size: 26, color: G, font: FONT })] }),
    new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: 'Không cần biết trước về AI. Đọc bài nào, làm theo bài đó.', size: 23, color: G, font: FONT })] }),
    new Paragraph({ spacing: { before: 300 }, children: [new TextRun({ text: 'Tác giả: [Tên tác giả] · Bản 2026 · Sản phẩm cá nhân của tác giả', size: 21, color: GRAY, font: FONT })] }),
    pb(),
  ];
}

function letter() {
  return [
    kicker('THƯ GỬI THẦY CÔ'), h1('Trước khi mở bài đầu tiên'),
    P('Thưa thầy cô,'),
    P('Nếu thầy cô đang cầm cuốn sách này, có lẽ thầy cô đã nghe nhiều về AI nhưng chưa biết bắt đầu từ đâu. Có thể thầy cô từng thử một lần, AI trả lời lan man, rồi thầy cô gác lại. Điều đó rất bình thường. Không ai sinh ra đã biết dùng AI.'),
    P('Tôi viết cuốn sách này như đang ngồi cạnh thầy cô trước màn hình. Mỗi bài tôi chỉ **bấm vào đâu**, **gõ câu gì** và **vì sao lại gõ như vậy**. Mỗi câu lệnh trong sách thầy cô có thể sao chép nguyên văn và chạy được ngay. Bên dưới luôn có phiên bản đã đổi sẵn cho **Mầm non, Tiểu học, THCS**.'),
    P('Tôi chỉ xin thầy cô nhớ một điều: **AI là trợ lý, thầy cô là người quyết định.** AI viết nhanh nhưng có lúc viết sai. Người đọc lại, sửa lại và chịu trách nhiệm trước học sinh vẫn là thầy cô. Điều này cũng đúng với tinh thần của Luật Trí tuệ nhân tạo 2025: AI là công cụ hỗ trợ, con người quyết định cuối cùng.'),
    P('Thầy cô cứ đi chậm. Mỗi ngày một vài bài. Sau 7 ngày, tôi tin thầy cô sẽ tự soạn được bài, ra được đề, làm được học liệu với AI và có thêm thời gian cho học sinh của mình.'),
    P('Chúc thầy cô vững tay.', { italics: true }),
    P('[Tên tác giả]', { bold: true }),
    pb(),
  ];
}

function howto() {
  const out = [kicker('CÁCH DÙNG SÁCH'), h1('Đọc sách này thế nào cho dễ'),
    h3('1. Thầy cô chưa từng dùng AI'),
    P('Đọc lần lượt 3 bài đầu, đúng thứ tự: {{A1}}, {{A2}}, {{A3}}. Ba bài này mất khoảng 30 phút. Sau đó đọc tiếp {{PART:B}}.'),
    h3('2. Thầy cô đã biết dùng, cần làm ngay một việc'),
    P('Mở {{P1}}. Trang đó có bảng "Tôi muốn làm gì, mở bài nào". Tìm việc cần làm, xem số trang, lật tới trang đó.'),
    h3('3. Cách tìm một bài bất kỳ'),
    P('Mọi bài đều có số thứ tự (Bài 1 đến Bài 36) và **luôn bắt đầu ở đầu một trang mới**. Số trang in ở chân mỗi trang. Mục lục ở {{TOC}} ghi đủ số bài và số trang.'),
    h3('4. Các loại ô trong sách'),
  ];
  const legend = [
    [MT, false, 'CÂU LỆNH ĐỂ SAO CHÉP', 'Chữ trong ô này thầy cô sao chép nguyên văn: bôi đen từ chữ đầu đến chữ cuối, bấm Ctrl + C, sang ô nhập của AI bấm Ctrl + V. Phần trong dấu [ ] là chỗ thầy cô thay bằng nội dung của mình.'],
    [W, true, 'VÌ SAO VIẾT NHƯ VẬY', 'Giải thích ý nghĩa từng cụm từ trong câu lệnh. Hiểu ô này, thầy cô tự viết được câu lệnh mới.'],
    [GT, false, 'MẸO NHỎ', 'Một lưu ý giúp tránh lỗi thường gặp.'],
    [GT, false, 'NẾU BỊ KẸT Ở BƯỚC NÀO, XEM Ở ĐÂY', 'Cách xử lý khi màn hình không giống sách.'],
  ];
  for (const [fill, border, t, d] of legend) out.push(box([tag(t), P(d, { size: 22, after: 0 })], fill, border), spacer(100));
  out.push(P('Ngoài ra, mỗi bài có bảng **ĐỔI CHO LỚP CỦA THẦY CÔ** với 3 dòng Mầm non, Tiểu học, THCS. Thầy cô chỉ cần chọn đúng dòng của mình.'));
  out.push(P('**Nên đọc bản PDF.** Số trang trong sách được kiểm tra trên bản PDF. Bản Word dùng để thầy cô sao chép và chỉnh sửa. Nếu máy thầy cô hiển thị bản Word lệch vài dòng, hãy tra theo số bài.'));
  out.push(pb());
  return out;
}

function toc() {
  const out = [kicker('MỤC LỤC'), h1('Các bài trong sách')];
  const line = (left, right, o = {}) => new Paragraph({ spacing: { after: o.after ?? 50 }, indent: o.indent, tabStops: [{ type: TabStopType.RIGHT, position: CW, leader: LeaderType.DOT }], children: [new TextRun({ text: left, bold: o.bold, size: o.size || 21, color: G, font: FONT }), new TextRun({ text: '\t' + right, bold: o.bold, size: o.size || 21, color: G, font: FONT })] });
  out.push(line('Thư gửi thầy cô', 'trang ' + pg('LETTER')), line('Cách dùng sách', 'trang ' + pg('HOWTO')), line('Sách dựa trên văn bản nào (căn cứ)', 'trang ' + pg('BASIS'), { after: 160 }));
  for (const p of parts) {
    const pt = PARTS[p.letter];
    out.push(line(p.letter === 'P' ? pt.title : `Phần ${pt.no} · ${pt.title}`, 'trang ' + pg('PART_' + p.letter), { bold: true, size: 22, after: 60 }));
    for (const l of p.lessons) out.push(line(`${nameOf(l.code)}   ${l.title}`, 'trang ' + pg(l.code), { indent: { left: 360 } }));
    out.push(spacer(100));
  }
  out.push(pb());
  return out;
}

function basisPage() {
  const out = [kicker('CĂN CỨ BIÊN SOẠN'), h1('Sách dựa trên văn bản nào'),
    P('Các bài trong sách được đối chiếu với văn bản pháp luật và hướng dẫn chuyên môn dưới đây. Tôi ưu tiên văn bản ban hành 2025-2026 và định hướng đến năm 2030. Đầu mỗi bài có dòng **Căn cứ** ghi văn bản liên quan tới bài đó.'),
    P('Sách là tài liệu tham khảo thực hành của tác giả, **không phải văn bản của cơ quan nhà nước** và không thay thế văn bản gốc. Thầy cô luôn làm theo văn bản hiện hành và hướng dẫn của nhà trường.', { size: 21 })];
  for (const [g, gname] of GROUPS) {
    out.push(h3(gname));
    out.push(...table(['Văn bản, số hiệu, ngày', 'Sách dựa vào điểm nào', 'Dùng ở (trong sách)'], DOCS.filter(d => d[1] === g).map(d => ['**' + d[2] + '**. ' + d[3], d[4], d[5]]), [3500, CW - 5900, 2400]));
  }
  out.push(pb());
  return out;
}

function partCover(p) {
  const pt = PARTS[p.letter];
  const out = [kicker(p.letter === 'P' ? 'PHỤ LỤC' : `PHẦN ${pt.no}`), h1(p.letter === 'P' ? pt.title : pt.title), P(pt.intro), h3('Trong phần này')];
  out.push(...table(['Bài', 'Tên bài', 'Trang'], p.lessons.map(l => [nameOf(l.code), l.title, pg(l.code)]), [1600, CW - 2800, 1200]));
  out.push(pb());
  return out;
}

function lessonCodeFix(code) { return code; }

function bookChildren() {
  const out = [...cover(), ...letter(), ...howto(), ...toc(), ...basisPage()];
  for (const p of parts) {
    out.push(...partCover(p));
    p.lessons.forEach((l, i) => {
      out.push(...lessonHeader(l.code, l.title, p.letter));
      l.blocks.forEach(b => out.push(...render(b)));
      out.push(new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: nextHint(p, i), italics: true, size: 20, color: GRAY, font: FONT })] }));
      out.push(pb());
    });
  }
  return out;
}
function nextHint(p, i) {
  const all = [...ORDER, ...APPX];
  const code = p.lessons[i].code;
  const nxt = all[all.indexOf(code) + 1];
  if (!nxt) return 'Thầy cô đã đọc hết sách. Cảm ơn thầy cô đã đi cùng tôi đến trang cuối.';
  return R(`Xong bài này rồi. Bài tiếp theo: {{${nxt}}}.`);
}

// ---------- thư viện câu lệnh ----------
function libraryChildren() {
  const out = [
    new Paragraph({ spacing: { before: 800, after: 200 }, children: [new TextRun({ text: '  TỆP 03  ', bold: true, size: 22, color: G, font: FONT, shading: { type: ShadingType.CLEAR, fill: M, color: 'auto' } })] }),
    new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: 'Thư viện câu lệnh', bold: true, size: 72, color: G, font: FONT })] }),
    P('Tệp này chỉ chứa câu lệnh để thầy cô sao chép nhanh. Mỗi câu lệnh ghi rõ nằm ở **bài nào, trang nào** trong sách "Dạy cùng AI" (tệp 01). Muốn hiểu vì sao câu lệnh viết như vậy, thầy cô mở đúng trang đó trong sách.'),
    P('Cách sao chép: bôi đen chữ trong khung, bấm Ctrl + C. Sang ô nhập của AI, bấm Ctrl + V.'),
  ];
  for (const p of parts) {
    for (const l of p.lessons) {
      const ps = l.blocks.filter(b => b[0] === 'prompt' || b[0] === 'levels');
      if (!ps.length) continue;
      out.push(new Paragraph({ keepNext: true, spacing: { before: 300, after: 120 }, children: [new TextRun({ text: `${nameOf(l.code)} · ${l.title}`, bold: true, size: 28, color: G, font: FONT }), new TextRun({ text: `   (sách, trang ${pg(l.code)})`, size: 21, color: GRAY, font: FONT })] }));
      ps.forEach(b => out.push(...render(b)));
    }
  }
  return out;
}

// ---------- hướng dẫn ----------
function guideChildren() {
  const G2 = require('./guide2.js');
  const out = [];
  for (const b of G2) {
    if (b[0] === 'cover') out.push(
      new Paragraph({ spacing: { before: 1000, after: 200 }, children: [new TextRun({ text: '  TỆP 00 · ĐỌC ĐẦU TIÊN  ', bold: true, size: 22, color: G, font: FONT, shading: { type: ShadingType.CLEAR, fill: M, color: 'auto' } })] }),
      new Paragraph({ spacing: { after: 160 }, children: [new TextRun({ text: b[1], bold: true, size: 64, color: G, font: FONT })] }),
      new Paragraph({ spacing: { after: 300 }, children: [new TextRun({ text: b[2], size: 28, color: G, font: FONT })] }), ...img('h02-khung-chat', null, 600), pb());
    else if (b[0] === 'section') out.push(kicker(b[1], 40), h2(b[2]));
    else if (b[0] === 'h3') out.push(h3(b[1]));
    else if (b[0] === 'basisTable') out.push(...basisPage());
    else if (b[0] === 'pb') out.push(pb());
    else out.push(...render(b));
  }
  return out;
}

const children = MODE === 'library' ? libraryChildren() : MODE === 'guide' ? guideChildren() : bookChildren();
const TITLE = MODE === 'library' ? 'Thư viện câu lệnh' : MODE === 'guide' ? 'Hướng dẫn trước khi sử dụng' : 'Dạy cùng AI';
const doc = new Document({
  creator: 'Dạy cùng AI', title: TITLE,
  styles: {
    default: { document: { run: { font: FONT, size: 23, color: G } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 44, bold: true, color: G }, paragraph: { outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 36, bold: true, color: G }, paragraph: { outlineLevel: 1 } },
    ],
  },
  numbering,
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: TITLE + '   ·   ', size: 18, color: GRAY, font: FONT }), new TextRun({ text: 'Trang ', bold: true, size: 24, color: G, font: FONT }), new TextRun({ children: [PageNumber.CURRENT], bold: true, size: 24, color: G, font: FONT })] })] }) },
    children,
  }],
});
Packer.toBuffer(doc).then(b => { fs.writeFileSync(OUT, b); console.log('OK', OUT); });
