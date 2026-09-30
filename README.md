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
| 00-DOC-DAU-TIEN-Huong-dan-su-dung | 7 | Đầu tiên |
| 01-Sach-Day-cung-AI | 74 (36 bài, 4 phụ lục) | Sau tệp 00 |
| 02-The-tra-nhanh-1-trang | 1 | Sau Bài 3, in ra dùng |
| 03-Thu-vien-cau-lenh | 20 | Khi cần sao chép nhanh |
| 04-Slide-tap-huan | 24 slide | Khi tập huấn cho đồng nghiệp |

Mọi tệp đều có bản PDF để đọc. Bản Word và PowerPoint dùng khi cần chỉnh sửa.

## Kiểm tra số trang

- Mọi chỗ ghi "Bài mấy (trang mấy)" được điền tự động từ bản PDF của sách.
- Đã kiểm tra bằng máy: 189 tham chiếu trong tệp 00, 01, 03 và 26 tham chiếu trong tệp 02, 04. Không có tham chiếu nào sai.
- Mỗi bài bắt đầu ở đầu một trang mới.

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

6 ảnh xếp theo câu người mua tự hỏi: Cái gì? → Có đúng quy định không? → Mình có làm được không? → Có hợp lớp mình không? → Mua về nhận được gì? → Mua có an toàn không? Ảnh 2, 3, 4 là trang chụp nguyên văn từ sách, có ghi số trang.

## Căn cứ biên soạn

Danh mục 17 văn bản nằm ở `_ma-nguon/basis.js` và ở trang 6 của sách.
