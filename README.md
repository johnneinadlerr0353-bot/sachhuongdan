# Bộ tài liệu "Dạy cùng AI"

Sổ tay thực hành AI cho giáo viên Mầm non, Tiểu học, THCS. Ba màu dùng chung: xanh bảng `#1F4E47`, vàng bút chì `#F2B134`, trắng `#FFFFFF`.

| Thư mục | Nội dung |
|---|---|
| `01-Sach` | Sách chính (Word và PDF, 38 trang A4): 40 bài, 51 câu lệnh mẫu, 12 bảng đổi câu lệnh theo 3 cấp học |
| `02-Slide` | Slide giới thiệu (PowerPoint và PDF, 23 slide, có ghi chú người nói) |
| `03-Anh-ban-hang` | 3 ảnh đăng bán 1080×1350 |
| `04-Huong-dan-truoc-khi-dung` | Hướng dẫn chuyên sâu trước khi sử dụng (Word và PDF) |
| `05-Bo-sung` | Thư viện câu lệnh (Word), thẻ tra nhanh 1 trang (PDF), nội dung bài đăng bán, 16 hình minh họa PNG |
| `_ma-nguon` | Tệp nguồn để sửa nội dung rồi dựng lại (xem bên dưới) |

## Sửa nội dung rồi dựng lại

Nội dung sách nằm trong `_ma-nguon/content.js`, hướng dẫn trong `_ma-nguon/guide.js`. Sau khi sửa, trong thư mục `_ma-nguon` chạy:

```
npm install docx pptxgenjs playwright
python3 illus.py && node render.js illus_html png
node build_book.js book Day-cung-AI.docx
node build_book.js library Thu-vien-cau-lenh.docx
node build_book.js guide Huong-dan-truoc-khi-su-dung.docx
node build_deck.js
```

## Ghi chú biên tập so với bản gốc

- TPACK "Lão Hạc": bản gốc ghi "của Thạch Lam" ở một dòng. Đã sửa thành Nam Cao cho khớp dòng ngay dưới.
- Dòng TK của prompt TPACK bị cụt ("hỗ trợ viết sáng tạo và"). Đã bổ sung "và trình bày sản phẩm".
- Mục "Truyện tranh với chatGPT" trong bản gốc lặp lại câu lệnh trò chơi hình học. Sách dùng câu lệnh truyện tranh 4 cảnh cho cả ChatGPT và Google AI Studio.
- Mục 5 và Mục 6 của Buổi 2 trùng với Mục 3 (1) và (2). Sách gộp thành bài C3 và C4.
- Câu lệnh "Tạo bài đọc" có hai chỗ mâu thuẫn (lớp 6 và lớp 4-5, 50 từ và 100 từ). Sách giữ nguyên để làm bài tập bắt lỗi và thêm bản đã thống nhất.
- Prompt đọc "Thu điếu": bỏ chữ "lục bát" vì bài thơ là thất ngôn bát cú Đường luật.
- Prompt đề Tin học 6: tên nhãn "##Bản đặc tả" và "##Bảng đặc tả" được thống nhất thành "##Bảng đặc tả". Dòng "Không lấy nội dung trong mục ##Câu hỏi mẫu" được bỏ vì không có tài liệu nào mang nhãn đó.
- Sửa lỗi gõ: "lưa chọn", "vấn dề", "vận dung", "dự vào", "trưởng trung học".
- Bỏ dấu phẩy đứng trước "và", "nhưng" trong toàn bộ câu lệnh. Thay dấu gạch ngang dài bằng dấu gạch nối.
