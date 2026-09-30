# Bộ tài liệu "Dạy cùng AI"

Sổ tay cầm tay chỉ việc dùng AI cho giáo viên Mầm non, Tiểu học, THCS. Giá 220.000đ / trọn bộ, bán trên thebuilder.work.

## Thư mục

| Thư mục, tệp | Dùng để |
|---|---|
| `BO-TAI-LIEU-GUI-KHACH/` | 5 tệp khách nhận được, đánh số 00 đến 04 theo thứ tự mở |
| `Day-cung-AI-tron-bo.zip` | Gói nén của thư mục trên, dùng để tải lên thebuilder.work |
| `ANH-DANG-BAN/` | 6 ảnh đăng bán (1080×1350) theo trình tự người mua tự hỏi kèm nội dung bài đăng |
| `_ma-nguon/` | Tệp nguồn để sửa nội dung rồi dựng lại |

## Thứ tự tệp gửi khách

| Tệp | Số trang | Mở khi nào |
|---|---|---|
| 00-DOC-DAU-TIEN-Huong-dan-su-dung | 10 | Đầu tiên |
| 01-Sach-Day-cung-AI | 79 (36 bài, 4 phụ lục) | Sau tệp 00 |
| 02-The-tra-nhanh-1-trang | 1 | Sau Bài 3, in ra dùng |
| 03-Thu-vien-cau-lenh | 22 | Khi cần sao chép nhanh |
| 04-Slide-tap-huan | 24 slide | Khi tập huấn cho đồng nghiệp |

Mọi tệp đều có bản PDF để đọc. Bản Word và PowerPoint dùng khi cần chỉnh sửa.

## Kiểm tra số trang

- Mọi chỗ ghi "Bài mấy (trang mấy)" được điền tự động từ bản PDF của sách.
- Đã kiểm tra bằng máy: 195 tham chiếu trong tệp 00, 01, 03 và 32 tham chiếu trong tệp 02, 04. Không có tham chiếu nào sai.
- Mỗi bài bắt đầu ở đầu một trang mới.

## Trình bày văn bản

Tệp 00, 01, 03 trình bày theo Phụ lục I, Nghị định 30/2020/NĐ-CP về công tác văn thư:

- Khổ A4, phông Times New Roman, chữ màu đen, cỡ chữ 13 (tiêu đề 14).
- Lề trên 20 mm, lề dưới 20 mm, lề trái 30 mm, lề phải 15 mm.
- Căn đều hai lề, đoạn văn lùi đầu dòng 1 cm, khoảng cách giữa các đoạn tối thiểu 6pt, dãn dòng 1,25.
- Số trang bằng chữ số Ả Rập, đặt giữa lề trên, không đánh số trang đầu.
- Không dùng dấu mũi tên trong văn bản.

Trang bìa, hình minh họa, slide và ảnh bán hàng là ấn phẩm trình bày, giữ màu thiết kế.

## Màu sắc

Ba màu: xanh chàm dịu `#2E3A67`, xanh bạc hà nhạt `#CFE8E0`, trắng. Chọn dựa trên nghiên cứu tâm lý học màu sắc:

- Valdez và Mehrabian (1994): màu càng sáng người xem càng dễ chịu, màu càng rực người xem càng căng thẳng. Xanh dương và xanh lam là nhóm màu dễ chịu nhất.
- Jonauskaite và cộng sự (2020): cách con người gắn cảm xúc với màu sắc khá giống nhau ở 30 quốc gia.

Quy tắc tương phản: chữ trên nền trắng hoặc nền bạc hà luôn là màu chàm. Chữ trên khối chàm luôn là màu trắng hoặc bạc hà.

## Chỗ cần điền trước khi bán

- `[Tên tác giả]`: bìa sách, thư gửi thầy cô, ảnh bán 1 và 6.
- `[EMAIL CỦA BẠN]`: tệp 00, slide cuối, ảnh bán 6, bài đăng.
- `[DÁN LINK SẢN PHẨM TRÊN THEBUILDER.WORK]`: dòng đầu bài đăng.

Điền trong `_ma-nguon/book2.js`, `guide2.js`, `deck2.js`, `sales6.py`, rồi dựng lại.

## Dựng lại

Chạy trong `_ma-nguon`. Cần Node, Python, LibreOffice và pymupdf.

```
npm install docx pptxgenjs playwright
python3 illus.py && node render.js illus_html png
node book2.js book book.docx          # rồi xuất PDF bằng LibreOffice
python3 pages.py book.pdf             # lặp 2 bước trên đến khi in ra "stable"
node book2.js guide guide.docx
node book2.js library lib.docx
python3 checkrefs.py                  # phải ra "sai 0"
node deck2.js
python3 cheatsheet.py
python3 sales6.py && node render.js sales_html sales_png
```

## Ảnh đăng bán

6 ảnh xếp theo câu người mua tự hỏi: (1) Cái gì? (2) Có đúng quy định không? (3) Mình có làm được không? (4) Có hợp lớp mình không? (5) Mua về nhận được gì? (6) Mua có an toàn không? Ảnh 2, 3, 4 là trang chụp nguyên văn từ sách, có ghi số trang.

## Căn cứ biên soạn

Danh mục 20 văn bản nằm ở `_ma-nguon/basis.js` và ở trang 6 của sách, xếp theo thứ tự ưu tiên cho giáo viên:

1. Văn bản của Bộ GDĐT năm 2026: Thông tư 18/2026/TT-BGDĐT, Công văn 5385/BGDĐT-GDMN, Công văn 5208/BGDĐT-GDPT, Quyết định 2422/QĐ-BGDĐT, Công văn 5588/BGDĐT-GDPT, Chỉ thị 31/CT-TTg.
2. Văn bản chuyên môn đang áp dụng: chương trình GDPT, GDMN, Thông tư 02/2025, Công văn 2250, Công văn 7991, Thông tư 22/2021, Thông tư 27/2020.
3. Văn bản của Sở GDĐT nơi giáo viên công tác.
4. Luật và định hướng liên quan: Luật 134/2025/QH15, Luật 91/2025/QH15, Luật Sở hữu trí tuệ, Nghị quyết 71-NQ/TW, Quyết định 1671/QĐ-TTg, UNESCO 2024.
