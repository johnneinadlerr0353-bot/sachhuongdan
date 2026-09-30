// Hướng dẫn đọc đầu tiên. {{A1}} là số bài và số trang trong tệp 01 (sách).
module.exports = [
['cover', 'Đọc tệp này đầu tiên', 'Mở tệp nào trước, đọc trang nào, làm gì trong 7 ngày đầu'],

['section', 'MỤC 1', 'Bộ tài liệu có 5 tệp, mở theo đúng số thứ tự'],
['p', 'Thưa thầy cô, tên mỗi tệp bắt đầu bằng một con số. Thầy cô cứ mở theo số từ nhỏ đến lớn là đúng thứ tự. Tệp nào có cả bản PDF và bản Word thì **đọc bản PDF**, còn bản Word dùng khi cần sao chép hoặc sửa.'],
['table', ['Tên tệp', 'Mở khi nào', 'Bên trong có gì'], [
  ['**00-DOC-DAU-TIEN-Huong-dan-su-dung** (tệp này)', 'Ngay bây giờ, trước mọi tệp khác', 'Thứ tự đọc, lộ trình 7 ngày, chuẩn bị tài khoản, xử lý sự cố'],
  ['**01-Sach-Day-cung-AI**', 'Sau khi đọc xong tệp này', '36 bài và 4 phụ lục. Mỗi bài có câu lệnh sao chép được, các bước bấm, lời giải thích'],
  ['**02-The-tra-nhanh-1-trang**', 'Sau khi học xong Bài 3', 'Một trang tóm tắt để in, dán cạnh máy tính'],
  ['**03-Thu-vien-cau-lenh**', 'Khi đã quen, cần sao chép câu lệnh nhanh', 'Chỉ có câu lệnh, ghi rõ bài và trang tương ứng trong sách'],
  ['**04-Slide-tap-huan**', 'Khi muốn chia sẻ lại cho đồng nghiệp', '24 slide trình chiếu, có ghi chú người nói'],
], [3500, 2600, 3538]],
['tip', 'Nếu thầy cô chỉ có 30 phút hôm nay: đọc hết tệp này (khoảng 10 phút), rồi mở tệp 01 và làm {{A1}}, {{A2}}.'],

['section', 'MỤC 2', 'Lộ trình 7 ngày, mỗi ngày khoảng 30 phút'],
['p', 'Các số bài và số trang dưới đây đều là trong **tệp 01 (sách)**. Thầy cô mở tệp 01, nhìn số "Trang" in ở chân trang để lật tới.'],
['table', ['Ngày', 'Mở tệp 01, đọc và làm theo', 'Cuối ngày thầy cô có'], [
  ['1', '{{A1}}, {{A2}}, {{A3}}', 'Câu lệnh đầu tiên đã chạy. Hiểu 6 mảnh ghép của câu lệnh.'],
  ['2', '{{B1}} đến {{B5}}', 'Một đoạn dẫn nhập bài học viết bằng AI.'],
  ['3', '{{B6}}, {{B7}}, {{C1}}, {{C2}}', 'Một giáo án góc trạm hoặc STEM cho tuần tới.'],
  ['4', '{{C3}} đến {{C7}}', 'Một đề 10 câu có đáp án và một bảng tiêu chí chấm.'],
  ['5', '{{D1}} đến {{D4}}', 'Ba ảnh minh họa và một trò chơi học tập.'],
  ['6', '{{D5}} đến {{D8}}', 'Một bài hát hoặc một đoạn hội thoại hai giọng.'],
  ['7', '{{E4}}, {{F1}}, {{F2}}, {{F3}}', 'Một chatbot trợ giảng đã tự thử. Tự chấm theo danh sách ở {{F3}}.'],
], [900, 4300, 4438]],
['p', 'Thầy cô không cần làm đủ mọi bài. Thầy cô **mầm non** có thể bỏ qua {{C5}}, {{C6}}, {{C8}}. Thầy cô **THCS** có thể bỏ qua {{D5}}. Muốn tìm bài theo việc cần làm, mở {{P1}}.'],

['section', 'MỤC 3', 'Chuẩn bị trước khi học (làm một lần, khoảng 20 phút)'],
['h3', 'Thiết bị'],
['bullets', [
  '**Máy tính** (nên dùng) hoặc điện thoại có mạng. Máy tính giúp sao chép câu lệnh dài dễ hơn.',
  '**Trình duyệt Chrome.** Mọi công cụ trong sách chạy trên trình duyệt, không cần cài phần mềm.',
  '**Một tài khoản Gmail.** Hầu hết công cụ cho đăng nhập bằng Google. Nên dùng Gmail riêng cho công việc.',
]],
['h3', 'Các trang web dùng trong sách'],
['table', ['Trang web', 'Dùng ở', 'Ghi chú'], [
  ['ChatGPT · chatgpt.com', 'Hầu hết các bài', 'Có bản miễn phí. Tạo ảnh, Deep Research có thể giới hạn lượt dùng.'],
  ['Gemini · gemini.google.com', '{{A2:s}}, {{D3:s}}, {{E4:s}}', 'Có bản miễn phí. Gem và Canvas nằm trong Gemini.'],
  ['NotebookLM · notebooklm.google.com', '{{C9:s}}', 'Hỏi đáp dựa trên tài liệu thầy cô tải lên.'],
  ['Google AI Studio · aistudio.google.com', '{{D4:s}}, {{D7:s}}, {{D8:s}}', 'Giọng đọc, hội thoại, truyện tranh.'],
  ['Canva · canva.com', '{{D2:s}}, {{D3:s}}', 'Sửa ảnh, tạo trò chơi.'],
  ['Suno · suno.com', '{{D5:s}}', 'Tạo bài hát.'],
  ['Overleaf · overleaf.com', '{{C8:s}}', 'Xuất đề có công thức toán ra PDF.'],
  ['Poe · poe.com', '{{E5:s}}', 'Tạo chatbot.'],
  ['Magic School · magicschool.ai', '{{E6:s}}', 'Công cụ làm sẵn cho giáo viên.'],
], [3300, 2600, 3738]],
['tip', 'Tên nút trên các trang web thay đổi khá thường xuyên. Nếu không thấy nút giống trong sách, thầy cô tìm theo **việc nút đó làm**, ví dụ dấu + để đính kèm tệp.'],

['section', 'MỤC 4', 'Ba việc giữ an toàn, làm trước khi dán tài liệu vào AI'],
['h3', 'Việc 1. Tắt chế độ dùng cuộc trò chuyện để huấn luyện AI'],
['steps', [
  '**ChatGPT:** bấm ảnh đại diện ở góc → **Cài đặt** → **Kiểm soát dữ liệu** → tắt mục **Cải thiện mô hình cho mọi người**.',
  '**Gemini:** bấm **Cài đặt và trợ giúp** → **Hoạt động** → chọn tắt lưu hoạt động nếu thầy cô không muốn lưu.',
  'Tên mục có thể khác đôi chút. Thầy cô gõ hỏi chính công cụ đó: "Làm sao tắt việc dùng dữ liệu trò chuyện của tôi để huấn luyện?"',
]],
['h3', 'Việc 2. Không dán thông tin cá nhân của học sinh'],
['p', 'Không dán họ tên kèm điểm số, số điện thoại, địa chỉ, ảnh, thông tin sức khỏe của học sinh vào AI. Đây là yêu cầu của **Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15** (hiệu lực từ 01/1/2026). Chi tiết ở {{F2}} trong sách.'],
['p', 'Với **mầm non**, Công văn 5385/BGDĐT-GDMN (12/8/2026) nhấn mạnh công nghệ số chỉ dùng để hỗ trợ giáo viên thiết kế hoạt động, phối hợp với gia đình và phải bảo đảm an toàn, riêng tư của trẻ. Thông tư 18/2026/TT-BGDĐT cũng yêu cầu giáo viên dùng AI bảo đảm minh bạch, công bằng, bảo vệ dữ liệu cá nhân.'],
['h3', 'Việc 3. Ghi chú khi dùng ảnh, giọng đọc do AI tạo'],
['p', '**Luật Trí tuệ nhân tạo số 134/2025/QH15** (hiệu lực từ 01/3/2026) yêu cầu nội dung do AI tạo ra có dấu hiệu nhận biết. Khi dùng ảnh, bài hát, giọng đọc do AI tạo, thầy cô ghi chú nhỏ: "Có sử dụng AI hỗ trợ".'],
['p', 'Với học sinh THCS dùng chatbot, thầy cô bám theo **Khung năng lực số cho người học** (Thông tư 02/2025/TT-BGDĐT): dùng an toàn, có trách nhiệm, trung thực. Nhiều công cụ AI quy định độ tuổi tối thiểu, thầy cô kiểm tra điều khoản trước khi cho học sinh dùng trực tiếp.'],

['section', 'MỤC 5', 'Khi gặp sự cố'],
['table', ['Tình huống', 'Cách xử lý'], [
  ['Không đăng nhập được', 'Mở tab ẩn danh (Ctrl + Shift + N) rồi đăng nhập lại. Kiểm tra mạng của trường có chặn trang đó không.'],
  ['AI trả lời bằng tiếng Anh', 'Gõ thêm dòng: Trình bày bằng tiếng Việt.'],
  ['Câu trả lời bị cắt ngang', 'Gõ: Viết tiếp. Đề dài thì chia làm 2 lần.'],
  ['Tải tệp lên bị lỗi', 'Tệp quá lớn. Chỉ giữ các trang cần dùng rồi tải lại.'],
  ['Ảnh có chữ sai dấu', 'Yêu cầu "không có chữ trong ảnh", sau đó tự gõ chữ bằng PowerPoint hoặc Canva.'],
  ['Báo hết lượt dùng', 'Chờ theo thời gian công cụ báo, hoặc chuyển sang công cụ khác.'],
  ['Link AI đưa không mở được', 'AI có thể bịa link. Không tìm thấy trang gốc thì không dùng thông tin đó.'],
  ['Link trong Phụ lục 4 không mở được', 'Tài liệu có thể đã bị chủ sở hữu đổi quyền. Thầy cô dùng SGK của chính lớp mình thay thế.'],
]],

['section', 'MỤC 6', 'Nếu dùng để tập huấn cho đồng nghiệp'],
['p', 'Chia 4 buổi. Mỗi buổi chiếu một đoạn slide trong **tệp 04**, học viên mở **tệp 01** làm theo.'],
['table', ['Buổi', 'Slide (tệp 04) và bài (tệp 01)', 'Hoạt động thực hành'], [
  ['1', 'Slide 1 đến 10 · {{A1}} đến {{B7}}', 'Mỗi người chạy 4 cách hỏi trên cùng một bài dạy của mình.'],
  ['2', 'Slide 11 đến 14 · {{C1}} đến {{C9}}', 'Theo tổ: làm 1 đề 10 câu và 1 bảng tiêu chí. Đổi đề cho nhau kiểm tra.'],
  ['3', 'Slide 15 đến 17 · {{D1}} đến {{D8}}', 'Mỗi nhóm làm 1 bộ học liệu: ảnh, trò chơi, bài hát hoặc giọng đọc.'],
  ['4', 'Slide 18 đến 24 · {{E1}} đến {{F3}}', 'Mỗi người tạo 1 chatbot, nhờ đồng nghiệp đóng vai học sinh thử.'],
], [900, 4300, 4438]],

['section', 'MỤC 7', 'Về bộ tài liệu này'],
['bullets', [
  'Đây là **sản phẩm cá nhân của tác giả**, không phải tài liệu của cơ quan nhà nước.',
  'Chỉ bán qua một đường link duy nhất trên **The Builder (thebuilder.work)**. Người mua thanh toán bằng cách quét mã **VietQR** ngay trên trang.',
  'Tác giả **không bao giờ** nhắn tin riêng xin chuyển khoản vào tài khoản cá nhân, không gửi link mua nào khác, không hỏi mã OTP hay mật khẩu ngân hàng. Nếu thầy cô gặp trường hợp như vậy, đó không phải tác giả.',
  'Trường hoặc tổ chuyên môn cần **đào tạo riêng online**: liên hệ [EMAIL CỦA BẠN].',
]],
['pb'],
['basisTable'],
];
