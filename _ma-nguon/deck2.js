// Tệp 04: slide tập huấn. Màu: xanh chàm, bạc hà, trắng. Mỗi slide ghi bài và trang tương ứng trong sách.
const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');
const { ORDER } = require('./meta.js');
const PG = JSON.parse(fs.readFileSync(path.join(__dirname, 'pages.json')));
const G = '2E3A67', M = 'CFE8E0', W = 'FFFFFF', MT = 'EAF5F1';
const F = 'Arial';
const bai = c => `Bài ${ORDER.indexOf(c) + 1}, trang ${PG[c]}`;

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.title = 'Dạy cùng AI · Slide tập huấn';
const T = (s, text, o) => s.addText(text, Object.assign({ isTextBox: true, fontFace: F, color: G, margin: 0 }, o));

function refPill(s, text) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.55, y: 5.18, w: 3.25, h: 0.3, fill: { color: M }, line: { color: M }, rectRadius: 0.15 });
  T(s, text, { x: 6.55, y: 5.18, w: 3.25, h: 0.3, fontSize: 10, bold: true, align: 'center', valign: 'middle' });
}
function imageSlide(name, ref, notes) {
  const s = pres.addSlide();
  s.background = { color: W };
  s.addImage({ path: path.join(__dirname, 'png', name + '.png'), x: 0, y: 0, w: 10, h: 5.625, altText: notes.split('.')[0] });
  refPill(s, 'Đọc kỹ trong sách: ' + ref);
  s.addNotes(notes + ' Học viên mở tệp 01, ' + ref + '.');
}
function divider(no, title, lessons, sub) {
  const s = pres.addSlide();
  s.background = { color: M };
  s.addShape(pres.shapes.OVAL, { x: 6.7, y: 1.2, w: 3.0, h: 3.0, fill: { color: G } });
  T(s, String(no), { x: 6.7, y: 1.2, w: 3.0, h: 3.0, fontSize: 100, bold: true, color: W, align: 'center', valign: 'middle' });
  T(s, `PHẦN ${no}`, { x: 0.6, y: 1.2, w: 5.8, h: 0.4, fontSize: 16, bold: true });
  T(s, title, { x: 0.6, y: 1.65, w: 5.8, h: 1.5, fontSize: 34, bold: true, valign: 'top' });
  T(s, sub, { x: 0.6, y: 3.2, w: 5.8, h: 0.6, fontSize: 14, valign: 'top' });
  T(s, lessons, { x: 0.6, y: 3.9, w: 5.8, h: 0.5, fontSize: 14, bold: true });
  return s;
}

// 1. Bìa
{
  const s = pres.addSlide();
  s.background = { color: G };
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 0.6, w: 2.4, h: 0.4, fill: { color: M }, line: { color: M }, rectRadius: 0.2 });
  T(s, 'SỔ TAY THỰC HÀNH', { x: 0.6, y: 0.6, w: 2.4, h: 0.4, fontSize: 12, bold: true, align: 'center', valign: 'middle' });
  T(s, 'Dạy cùng AI', { x: 0.6, y: 1.3, w: 8.8, h: 1.1, fontSize: 60, bold: true, color: W });
  T(s, 'Cầm tay chỉ việc: từ câu lệnh đầu tiên đến trợ giảng ảo', { x: 0.6, y: 2.45, w: 8.8, h: 0.6, fontSize: 22, color: M });
  T(s, 'Dành cho giáo viên Mầm non · Tiểu học · THCS', { x: 0.6, y: 4.2, w: 8.8, h: 0.4, fontSize: 16, bold: true, color: W });
  T(s, 'Mỗi slide ghi rõ bài và trang để đọc kỹ trong sách (tệp 01).', { x: 0.6, y: 4.65, w: 8.8, h: 0.4, fontSize: 13, color: W });
  s.addNotes('Giới thiệu: bộ tài liệu viết cho người chưa từng dùng AI. Góc dưới mỗi slide có ô ghi bài và trang trong sách để học viên mở ra làm theo.');
}
// 2. Làm được gì
{
  const s = pres.addSlide();
  s.background = { color: W };
  T(s, 'Sau khóa học, thầy cô tự làm được 4 việc', { x: 0.6, y: 0.45, w: 8.8, h: 0.7, fontSize: 28, bold: true });
  const items = [['1', 'Soạn bài', 'Giáo án góc trạm, STEM, bài giảng 10 slide', 'Phần 3, trang ' + PG.PART_C], ['2', 'Ra đề', 'Tự luận, trắc nghiệm theo ma trận, bảng tiêu chí', 'Phần 3, trang ' + PG.PART_C], ['3', 'Làm học liệu', 'Ảnh, trò chơi, truyện tranh, bài hát, giọng đọc', 'Phần 4, trang ' + PG.PART_D], ['4', 'Tạo trợ giảng', 'Chatbot ôn bài, không đưa đáp án ngay', 'Phần 5, trang ' + PG.PART_E]];
  items.forEach(([n, t, d, r], i) => {
    const x = 0.6 + i * 2.25, dark = i === 3;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.45, w: 2.05, h: 3.55, fill: { color: dark ? G : MT }, line: { color: dark ? G : MT }, rectRadius: 0.12 });
    s.addShape(pres.shapes.OVAL, { x: x + 0.25, y: 1.7, w: 0.6, h: 0.6, fill: { color: M } });
    T(s, n, { x: x + 0.25, y: 1.7, w: 0.6, h: 0.6, fontSize: 20, bold: true, align: 'center', valign: 'middle' });
    T(s, t, { x: x + 0.25, y: 2.5, w: 1.7, h: 0.8, fontSize: 18, bold: true, valign: 'top', color: dark ? W : G });
    T(s, d, { x: x + 0.25, y: 3.3, w: 1.65, h: 1.0, fontSize: 12, valign: 'top', color: dark ? W : G });
    T(s, 'Sách: ' + r, { x: x + 0.25, y: 4.45, w: 1.7, h: 0.4, fontSize: 10, bold: true, valign: 'top', color: dark ? M : G });
  });
  s.addNotes('Bốn nhóm việc, tương ứng các phần trong sách.');
}
// 3. Căn cứ
{
  const s = pres.addSlide();
  s.background = { color: W };
  T(s, 'CĂN CỨ BIÊN SOẠN', { x: 0.6, y: 0.4, w: 6, h: 0.3, fontSize: 12, bold: true });
  T(s, 'Soạn theo văn bản mới nhất của Bộ GDĐT năm 2026', { x: 0.6, y: 0.7, w: 8.8, h: 0.6, fontSize: 26, bold: true });
  const rows = [
    ['Khung năng lực số của giáo viên', 'TT 18/2026/TT-BGDĐT · hiệu lực 12/5/2026', 'AI là một miền năng lực riêng'],
    ['Nhiệm vụ Mầm non 2026-2027', 'CV 5385/BGDĐT-GDMN · 12/8/2026', 'Bồi dưỡng giáo viên ứng dụng AI'],
    ['Nhiệm vụ Phổ thông 2026-2027', 'CV 5208/BGDĐT-GDPT · 07/8/2026', 'Học sinh dùng AI an toàn, trung thực'],
    ['Khung nội dung giáo dục AI', 'QĐ 2422/QĐ-BGDĐT · 18/8/2026', 'Giáo dục AI cho học sinh phổ thông'],
    ['Triển khai giáo dục AI', 'CV 5588/BGDĐT-GDPT · 19/8/2026', '12 tiết/lớp/năm học'],
    ['Nhiệm vụ trọng tâm năm học', 'Chỉ thị 31/CT-TTg · 05/8/2026', 'Ứng dụng AI có kiểm soát'],
    ['Luật Trí tuệ nhân tạo · Bảo vệ dữ liệu', '134/2025/QH15 · 91/2025/QH15', 'Con người quyết định, bảo vệ dữ liệu'],
  ];
  const tb = rows.map((r, i) => r.map((c, j) => ({ text: c, options: { fontFace: F, fontSize: j === 0 ? 12 : 10.5, bold: j === 0, color: G, fill: { color: i % 2 ? W : MT }, valign: 'middle' } })));
  s.addTable(tb, { x: 0.6, y: 1.45, w: 8.8, colW: [3.1, 2.7, 3.0], rowH: 0.4, margin: [0, 0.08, 0, 0.08], border: { type: 'none' } });
  refPill(s, `Đầy đủ 20 văn bản: sách, trang ${PG.BASIS}`);
  s.addNotes('Bộ tài liệu đối chiếu với văn bản pháp luật và hướng dẫn chuyên môn. Sách là tài liệu tham khảo của tác giả, không thay thế văn bản gốc.');
}

imageSlide('h01-vong-lam-viec', bai('A1'), 'Vòng làm việc Hỏi, Đọc, Sửa, Kiểm. Nhấn mạnh bước Kiểm.');
imageSlide('h02-khung-chat', bai('A2'), 'Sáu vị trí trên màn hình trò chuyện với AI. Cho học viên mở chatgpt.com và tìm đủ 6 vị trí.');
imageSlide('h03-cong-thuc-prompt', bai('A3'), 'Sáu mảnh ghép của câu lệnh tốt.');

divider(2, 'Viết câu lệnh cho AI hiểu ý mình', `Bài 4 đến Bài 10 · sách trang ${PG.B1} đến ${PG.PART_C - 1}`, 'Hỏi thẳng · Nhập vai · Đảo ngược · Kết hợp · TPACK').addNotes('Phần 2 trong sách.');
imageSlide('h04-ky-thuat-prompt', `Bài 4 (trang ${PG.B1}) đến Bài 7 (trang ${PG.B4})`, 'Bốn cách hỏi từ dễ đến đủ. Học viên thử lần lượt 4 câu lệnh trên cùng một bài dạy.');
imageSlide('h05-truoc-sau', bai('B5'), 'Tự chấm câu lệnh theo 6 mảnh ghép, thiếu gì thêm nấy.');
imageSlide('h06-tpack', bai('B7'), 'TPACK: điền đủ 3 dòng CK, PK, TK.');

divider(3, 'Soạn bài và ra đề cùng AI', `Bài 11 đến Bài 19 · sách trang ${PG.C1} đến ${PG.PART_D - 1}`, 'Góc trạm · STEM · Đề tự luận · Trắc nghiệm theo ma trận · Rubric').addNotes('Phần 3 trong sách.');
imageSlide('h07-cau-truc-4-muc', bai('C5'), 'Câu lệnh dài chia 4 ngăn có tiêu đề #.');
imageSlide('h08-muc-do-nhan-thuc', bai('C6'), 'Dán nguyên văn định nghĩa 4 mức độ nhận thức vào câu lệnh.');
imageSlide('h09-rubric', bai('C7'), 'AI kẻ bảng tiêu chí 4 mức, giáo viên duyệt.');

divider(4, 'Làm ảnh, trò chơi, bài hát, giọng đọc', `Bài 20 đến Bài 27 · sách trang ${PG.D1} đến ${PG.PART_E - 1}`, 'Ảnh · Trò chơi · Truyện tranh · Bài hát · Giọng đọc · Hội thoại').addNotes('Phần 4 trong sách.');
imageSlide('h11-ban-do-cong-cu', `Phần 4, trang ${PG.PART_D}`, 'Chọn công cụ theo sản phẩm muốn làm.');
imageSlide('h10-tao-anh', bai('D1'), 'Câu lệnh tạo ảnh: Nội dung + Phong cách.');

divider(5, 'Tìm tài liệu, trợ giảng ảo và dùng AI an toàn', `Bài 28 đến Bài 36 · sách trang ${PG.E1} đến ${PG.PART_P - 1}`, 'Deep Research · Gem · Poe · Magic School · An toàn, đúng luật').addNotes('Phần 5 và Phần 6 trong sách.');
imageSlide('h13-deep-research', bai('E1'), 'Deep Research: giao đề bài, duyệt kế hoạch, chờ báo cáo, tự mở từng link để kiểm.');
imageSlide('h12-chatbot', bai('E4'), 'Tạo trợ giảng ảo 4 bước. Câu quan trọng nhất: không đưa ra ngay đáp án.');
imageSlide('h14-unesco', bai('F1'), 'Khung năng lực AI cho giáo viên của UNESCO: 5 lĩnh vực, 3 cấp độ.');
imageSlide('h15-an-toan', bai('F2'), 'Ba màu đèn trước khi dán thông tin vào AI.');
imageSlide('h16-cap-hoc', `Phụ lục 1, trang ${PG.P1}`, 'Gợi ý bắt đầu theo cấp học.');

// Kết
{
  const s = pres.addSlide();
  s.background = { color: G };
  T(s, 'Bắt đầu ngay hôm nay với một câu lệnh', { x: 0.6, y: 0.55, w: 8.8, h: 0.7, fontSize: 28, bold: true, color: W });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.45, w: 8.8, h: 1.3, fill: { color: M }, line: { color: M }, rectRadius: 0.1 });
  T(s, 'Cho tôi gợi ý bài giảng về chủ đề [bài thầy cô dạy tuần này] cho học sinh [lớp mấy].', { x: 0.9, y: 1.45, w: 8.2, h: 1.3, fontSize: 20, valign: 'middle' });
  T(s, `Làm theo sách: ${bai('A2')}`, { x: 0.6, y: 2.95, w: 8.8, h: 0.4, fontSize: 15, bold: true, color: M });
  T(s, 'Sản phẩm cá nhân của tác giả · Mua chính thức trên The Builder (thebuilder.work), thanh toán quét VietQR, không giao dịch ngoài.', { x: 0.6, y: 3.8, w: 8.8, h: 0.6, fontSize: 13, color: W });
  T(s, 'Đào tạo riêng online cho trường, tổ chuyên môn: [EMAIL CỦA BẠN]', { x: 0.6, y: 4.5, w: 8.8, h: 0.4, fontSize: 13, color: W });
  s.addNotes('Giao bài về nhà: chạy 1 câu lệnh cho bài dạy tuần này.');
}
pres.writeFile({ fileName: path.join(__dirname, 'deck.pptx') }).then(f => console.log('OK', f));
