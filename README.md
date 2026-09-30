# Bộ tài liệu "Dạy cùng AI"

Sổ tay thực hành AI cho giáo viên Mầm non, Tiểu học, THCS. Phong cách tối giản, ba màu dùng chung: mực than `#1B1F24`, ngà `#F7F5F0`, đồng nhũ `#A67C3D` (chỉ làm điểm nhấn). Tiêu đề dùng chữ có chân (Playfair Display trong hình, Cambria trong Word và PowerPoint).

| Thư mục | Nội dung |
|---|---|
| `01-Sach` | Sách chính (Word và PDF, 43 trang A4): 40 bài, 51 câu lệnh mẫu, 12 bảng đổi câu lệnh theo 3 cấp học, trang 4 là bảng căn cứ biên soạn |
| `02-Slide` | Slide giới thiệu (PowerPoint và PDF, 24 slide, có slide căn cứ và ghi chú người nói) |
| `03-Anh-ban-hang` | 3 ảnh đăng bán 1080×1350, dựng từ trang thật của sách, slide, thẻ tra nhanh. Giá 220.000đ, mua tại thebuilder.work |
| `04-Huong-dan-truoc-khi-dung` | Hướng dẫn chuyên sâu trước khi sử dụng (Word và PDF) |
| `05-Bo-sung` | Thư viện câu lệnh (Word), thẻ tra nhanh 1 trang (PDF), nội dung bài đăng bán, 16 hình minh họa PNG |
| `_ma-nguon` | Tệp nguồn để sửa nội dung rồi dựng lại (xem bên dưới) |

## Căn cứ biên soạn

Danh mục đầy đủ nằm trong `_ma-nguon/basis.js` và trang 4 của sách. 17 văn bản chia 4 nhóm, ưu tiên văn bản 2025-2026 và định hướng đến 2030:

- **Định hướng đến 2030:** Quyết định 1671/QĐ-TTg (28/8/2026), Quyết định 1528/QĐ-TTg (2026), Nghị quyết 71-NQ/TW (22/8/2025), Nghị quyết 57-NQ/TW (22/12/2024)
- **Luật mới:** Luật Trí tuệ nhân tạo 134/2025/QH15, Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15
- **Hướng dẫn ngành 2025-2026:** Thông tư 02/2025/TT-BGDĐT, Công văn 2250/BGDĐT-GDPT, Công văn 5835/BGDĐT-KHCNTT, Quyết định 3439/QĐ-BGDĐT, Khung năng lực AI cho giáo viên của UNESCO (2024)
- **Chuyên môn đang áp dụng:** Chương trình GDPT (Thông tư 32/2018), Chương trình GDMN (VBHN 01/2021), Công văn 7991/BGDĐT-GDTrH, Thông tư 22/2021, Thông tư 27/2020, Luật Sở hữu trí tuệ Điều 25

Sách ghi rõ đây là tài liệu tham khảo của tác giả, không phải văn bản của cơ quan nhà nước.

## Sửa nội dung rồi dựng lại

Nội dung sách nằm trong `_ma-nguon/content.js`, hướng dẫn trong `_ma-nguon/guide.js`, căn cứ trong `_ma-nguon/basis.js`. Sau khi sửa, trong thư mục `_ma-nguon` chạy:

```
npm install docx pptxgenjs playwright
python3 illus.py && node render.js illus_html png
node build_book.js book Day-cung-AI.docx
node build_book.js library Thu-vien-cau-lenh.docx
node build_book.js guide Huong-dan-truoc-khi-su-dung.docx
node build_deck.js
python3 sales.py && node render.js sales_html sales_png
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
