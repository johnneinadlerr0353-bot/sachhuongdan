// Slide giới thiệu sách. 3 màu: xanh bảng, vàng bút chì, trắng.
const pptxgen = require('pptxgenjs');
const path = require('path');
const G = '1B1F24', Y = 'A67C3D', W = 'F7F5F0';
const F = 'Arial', SF = 'Cambria';
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9'; // 10 x 5.625
pres.title = 'Dạy cùng AI';

const img = n => path.join(__dirname, 'png', n + '.png');
const T = (s, text, o) => s.addText(text, Object.assign({ isTextBox: true, fontFace: F, color: G, margin: 0 }, o));

function imageSlide(name, notes) {
  const s = pres.addSlide();
  s.background = { color: W };
  s.addImage({ path: img(name), x: 0, y: 0, w: 10, h: 5.625, altText: notes.split('.')[0] });
  s.addNotes(notes);
}

function divider(kicker, title, sub, n) {
  const s = pres.addSlide();
  s.background = { color: W };
  s.addShape(pres.shapes.OVAL, { x: 6.6, y: 1.1, w: 3.2, h: 3.2, fill: { color: W }, line: { color: Y, width: 1 } });
  T(s, n, { x: 6.6, y: 1.1, w: 3.2, h: 3.2, fontSize: 110, fontFace: SF, italic: true, color: Y, align: 'center', valign: 'middle' });
  T(s, kicker, { x: 0.6, y: 1.3, w: 6, h: 0.4, fontSize: 12, color: Y, charSpacing: 8 });
  T(s, title, { x: 0.6, y: 1.8, w: 5.8, h: 1.6, fontSize: 38, fontFace: SF, valign: 'top' });
  T(s, sub, { x: 0.6, y: 3.6, w: 5.6, h: 1, fontSize: 13, valign: 'top' });
  return s;
}

// 1. Bìa
{
  const s = pres.addSlide();
  s.background = { color: G };
  T(s, 'SỔ TAY THỰC HÀNH', { x: 0.6, y: 0.7, w: 5, h: 0.4, fontSize: 12, color: Y, charSpacing: 10 });
  T(s, 'Dạy cùng AI', { x: 0.6, y: 1.3, w: 8.8, h: 1.2, fontSize: 66, fontFace: SF, color: W });
  T(s, 'Từ câu lệnh đầu tiên đến trợ giảng ảo', { x: 0.6, y: 2.55, w: 8.8, h: 0.6, fontSize: 24, fontFace: SF, italic: true, color: Y });
  T(s, 'Dành cho giáo viên Mầm non · Tiểu học · THCS', { x: 0.6, y: 4.3, w: 8.8, h: 0.4, fontSize: 13, color: W, charSpacing: 6 });
  T(s, 'Không cần biết trước về AI. Làm theo từng bước là dùng được.', { x: 0.6, y: 4.75, w: 8.8, h: 0.4, fontSize: 14, color: W });
  s.addNotes('Giới thiệu: sách viết cho người chưa từng dùng AI. Mỗi bài đọc trong 5 phút, có câu lệnh sao chép nguyên văn và phiên bản đổi sẵn cho 3 cấp học.');
}

// 2. Làm được gì
{
  const s = pres.addSlide();
  s.background = { color: W };
  T(s, 'Sau cuốn sách, thầy cô tự làm được', { x: 0.6, y: 0.5, w: 8.8, h: 0.7, fontSize: 30, fontFace: SF });
  const items = [['1', 'Soạn bài', 'Giáo án góc trạm, STEM, bài giảng 10 slide'], ['2', 'Ra đề', 'Tự luận, trắc nghiệm theo ma trận, rubric'], ['3', 'Làm học liệu', 'Ảnh, trò chơi, truyện tranh, bài hát, giọng đọc'], ['4', 'Tạo trợ giảng', 'Chatbot ôn tập không đưa đáp án ngay']];
  items.forEach(([n, t, d], i) => {
    const x = 0.6 + i * 2.25;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.5, w: 2.05, h: 3.4, fill: { color: i === 3 ? G : W }, line: { color: i === 3 ? G : 'CFCAC0', width: 0.75 }, rectRadius: 0.03 });
    s.addShape(pres.shapes.OVAL, { x: x + 0.25, y: 1.75, w: 0.6, h: 0.6, fill: { color: i === 3 ? G : W }, line: { color: Y, width: 0.75 } });
    T(s, n, { x: x + 0.25, y: 1.75, w: 0.6, h: 0.6, fontSize: 18, fontFace: SF, color: Y, align: 'center', valign: 'middle' });
    T(s, t, { x: x + 0.25, y: 2.6, w: 1.7, h: 0.8, fontSize: 19, valign: 'top', fontFace: SF, color: i === 3 ? W : G });
    T(s, d, { x: x + 0.25, y: 3.45, w: 1.65, h: 1.3, fontSize: 13, color: i === 3 ? W : G, valign: 'top' });
  });
  s.addNotes('Bốn nhóm việc tương ứng 4 buổi thực hành: Buổi 1 kỹ thuật câu lệnh, Buổi 2 kiểm tra đánh giá, Buổi 3 đa phương tiện, Buổi 4 Deep Research và chatbot.');
}

// Căn cứ biên soạn
{
  const s = pres.addSlide();
  s.background = { color: W };
  T(s, 'CĂN CỨ BIÊN SOẠN', { x: 0.6, y: 0.4, w: 6, h: 0.3, fontSize: 11, color: Y, charSpacing: 8 });
  T(s, 'Dựa trên văn bản 2025-2026, hướng tới 2030', { x: 0.6, y: 0.7, w: 8.8, h: 0.6, fontSize: 26, fontFace: SF });
  const rows = [
    ['Chiến lược quốc gia về AI đến 2030', 'QĐ 1671/QĐ-TTg · 28/8/2026', 'AI là năng lực cốt lõi quốc gia'],
    ['Phát triển nhân lực AI đến 2030', 'QĐ 1528/QĐ-TTg · 2026', 'Nâng năng lực AI của người lao động'],
    ['Đột phá phát triển giáo dục', 'NQ 71-NQ/TW · 22/8/2025', 'Mục tiêu giáo dục đến 2030, 2045'],
    ['Luật Trí tuệ nhân tạo', '134/2025/QH15 · hiệu lực 01/3/2026', 'Con người quyết định, gắn nhãn nội dung AI'],
    ['Luật Bảo vệ dữ liệu cá nhân', '91/2025/QH15 · hiệu lực 01/1/2026', 'Không đưa dữ liệu học sinh vào AI'],
    ['Khung năng lực số cho người học', 'TT 02/2025/TT-BGDĐT', 'Học sinh dùng AI an toàn, trung thực'],
    ['Hướng dẫn dùng AI dạy học', 'CV 2250 · CV 5835 (2025)', 'Bồi dưỡng giáo viên ứng dụng AI'],
  ];
  const tb = [rows.map(r => r)].flat().map((r, i) => r.map((c, j) => ({ text: c, options: { fontFace: j === 0 ? SF : F, fontSize: j === 0 ? 12 : 10, color: j === 1 ? Y : G, border: [{ type: 'none' }, { type: 'none' }, { pt: 0.5, color: 'CFCAC0' }, { type: 'none' }], valign: 'middle' } })));
  s.addTable(tb, { x: 0.6, y: 1.5, w: 8.8, colW: [3.1, 2.7, 3.0], rowH: 0.4, margin: [0, 0.06, 0, 0] });
  T(s, 'Danh mục đầy đủ 17 văn bản: trang 4 của sách. Dưới tên mỗi bài có dòng CĂN CỨ.', { x: 0.6, y: 4.75, w: 8.8, h: 0.3, fontSize: 10, italic: true, color: '6B6B6B' });
  s.addNotes('Nhấn mạnh: bộ tài liệu được đối chiếu với văn bản pháp luật và hướng dẫn chuyên môn hiện hành. Sách là tài liệu tham khảo, không thay thế văn bản gốc.');
}

imageSlide('h01-vong-lam-viec', 'Vòng làm việc Hỏi, Đọc, Sửa, Kiểm. Nhấn mạnh bước Kiểm: AI có thể bịa số liệu và nguồn. Sách phần A1.');
imageSlide('h02-khung-chat', 'Sáu vị trí cần biết trên màn hình trò chuyện với AI. Cho học viên mở chatgpt.com hoặc gemini.google.com và tìm đủ 6 vị trí. Sách phần A2.');
imageSlide('h03-cong-thuc-prompt', 'Sáu mảnh ghép của câu lệnh tốt, tách từ câu lệnh mẫu về quang hợp. Sách phần A3.');

divider('BUỔI 1', 'Kỹ thuật viết câu lệnh', 'Zero-shot · Nhập vai · Đảo ngược · Kết hợp nhiều yếu tố · TPACK', '1')
  .addNotes('Phần B trong sách, bài B1 đến B7.');
imageSlide('h04-ky-thuat-prompt', 'Bốn kỹ thuật từ dễ đến đủ. Cho học viên thử lần lượt 4 câu lệnh gốc trên cùng một chủ đề của lớp mình.');
imageSlide('h05-truoc-sau', 'Đánh giá prompt: đối chiếu 6 mảnh ghép, thiếu gì thêm nấy. Các cụm tô vàng là mảnh ghép được bổ sung. Sách bài B5.');
imageSlide('h06-tpack', 'TPACK: điền đủ 3 dòng CK, PK, TK trong câu lệnh. Sách bài B7.');

divider('BUỔI 2', 'Kế hoạch bài dạy và kiểm tra đánh giá', 'Góc trạm · STEM · Đề tự luận · Trắc nghiệm theo ma trận · Rubric · Overleaf', '2')
  .addNotes('Phần C trong sách, bài C1 đến C9.');
imageSlide('h07-cau-truc-4-muc', 'Câu lệnh dài chia 4 ngăn có tiêu đề #. Dấu ## đặt tên cho từng tài liệu đính kèm. Sách bài C5.');
imageSlide('h08-muc-do-nhan-thuc', 'Dán nguyên văn định nghĩa 4 mức độ nhận thức vào câu lệnh để AI phân loại câu hỏi đúng. Sách bài C6.');
imageSlide('h09-rubric', 'AI kẻ sẵn bảng tiêu chí 4 mức, giáo viên duyệt. Sách bài C7.');

divider('BUỔI 3', 'Sản phẩm đa phương tiện', 'Ảnh · Trò chơi · Truyện tranh · Bài hát · Giọng đọc · Hội thoại', '3')
  .addNotes('Phần D trong sách, bài D1 đến D8.');
imageSlide('h11-ban-do-cong-cu', 'Chọn công cụ theo sản phẩm. Tên nút có thể thay đổi, hướng dẫn học viên tìm theo chức năng.');
imageSlide('h10-tao-anh', 'Công thức tạo ảnh: Nội dung + Phong cách. Thử cùng một nội dung với Pixar, Anime, Ghibli. Sách bài D1, D2.');

divider('BUỔI 4', 'Deep Research và trợ lý chatbot', 'Báo cáo có nguồn · Kiểm chứng thông tin · Gem · Poe · Magic School', '4')
  .addNotes('Phần E trong sách, bài E1 đến E6.');
imageSlide('h13-deep-research', 'Deep Research: giao đề bài, duyệt kế hoạch, chờ báo cáo, tự mở từng link để kiểm chứng. Sách bài E1, E2.');
imageSlide('h12-chatbot', 'Tạo trợ giảng ảo 4 bước. Câu quan trọng nhất: không đưa ra ngay đáp án. Sách bài E4, E5.');

imageSlide('h14-unesco', 'Khung năng lực AI cho giáo viên của UNESCO: 5 lĩnh vực, 3 cấp độ. Sách phần F1.');
imageSlide('h15-an-toan', 'Ba màu đèn trước khi dán thông tin vào AI. Nhấn mạnh: không đưa thông tin cá nhân học sinh. Sách phần F2.');
imageSlide('h16-cap-hoc', 'Gợi ý bắt đầu theo cấp học. Bảng tra đầy đủ ở Phụ lục P1 của sách.');

// Kết
{
  const s = pres.addSlide();
  s.background = { color: G };
  T(s, 'Bắt đầu ngay hôm nay với một câu lệnh', { x: 0.6, y: 0.6, w: 8.8, h: 0.8, fontSize: 28, fontFace: SF, color: W });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 1.7, w: 8.8, h: 1.5, fill: { color: G }, line: { color: Y, width: 0.75 } });
  T(s, 'Cho tôi gợi ý bài giảng về chủ đề [bài thầy cô dạy tuần này] cho học sinh [lớp mấy].', { x: 0.9, y: 1.7, w: 8.2, h: 1.5, fontSize: 22, fontFace: SF, italic: true, color: W, valign: 'middle' });
  T(s, 'Hỏi  ·  Đọc  ·  Sửa  ·  Kiểm', { x: 0.6, y: 3.6, w: 8.8, h: 0.6, fontSize: 24, fontFace: SF, color: Y });
  T(s, 'Mọi câu lệnh trong khóa học có sẵn trong sách Dạy cùng AI và Thư viện câu lệnh đi kèm.', { x: 0.6, y: 4.4, w: 8.8, h: 0.5, fontSize: 15, color: W });
  s.addNotes('Kết thúc: giao bài tập về nhà là chạy 1 câu lệnh cho bài dạy tuần này và mang kết quả đến buổi sau.');
}

pres.writeFile({ fileName: path.join(__dirname, 'deck.pptx') }).then(f => console.log('OK', f));
