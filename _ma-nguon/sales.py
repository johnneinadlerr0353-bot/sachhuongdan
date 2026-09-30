# -*- coding: utf-8 -*-
# 3 ảnh bán hàng: xuất HTML để chụp PNG và .dc.html cho khung Design.
import os, json
B = os.path.dirname(os.path.abspath(__file__))
G, Y, W = "#1F4E47", "#F2B134", "#FFFFFF"
GT = "rgba(31,78,71,.08)"
WW, HH = 1080, 1350
FONT = "'Be Vietnam Pro',sans-serif"

def book(scale=1.0):
    # bìa sách vẽ bằng khối, không dùng ảnh
    return f"""<div style="width:{int(360*scale)}px;height:{int(480*scale)}px;background:{W};border-radius:10px 22px 22px 10px;box-shadow:24px 28px 0 rgba(0,0,0,.18);transform:rotate(-5deg);display:flex;flex-direction:column;padding:{int(30*scale)}px;box-sizing:border-box;gap:{int(12*scale)}px;border-left:{int(16*scale)}px solid {Y}">
<div style="align-self:flex-start;background:{Y};color:{G};font-weight:700;font-size:{int(15*scale)}px;padding:6px 12px;border-radius:999px">SỔ TAY THỰC HÀNH</div>
<div style="font-weight:800;font-size:{int(54*scale)}px;line-height:1;color:{G}">DẠY<br/>CÙNG AI</div>
<div style="font-size:{int(18*scale)}px;font-weight:500;color:{G}">Từ câu lệnh đầu tiên đến trợ giảng ảo</div>
<div style="margin-top:auto;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px">
<div style="height:{int(70*scale)}px;background:{GT};border-radius:8px"></div><div style="height:{int(70*scale)}px;background:{GT};border-radius:8px"></div><div style="height:{int(70*scale)}px;background:{GT};border-radius:8px"></div><div style="height:{int(70*scale)}px;background:{G};border-radius:8px"></div>
</div>
<div style="font-size:{int(14*scale)}px;font-weight:700;color:{G}">Mầm non · Tiểu học · THCS</div>
</div>"""

S1 = f"""<div style="width:{WW}px;height:{HH}px;box-sizing:border-box;background:{G};color:{W};font-family:{FONT};padding:80px 72px;display:flex;flex-direction:column;gap:28px;overflow:hidden">
<div style="align-self:flex-start;background:{Y};color:{G};font-weight:800;font-size:24px;padding:10px 22px;border-radius:999px">BỘ TÀI LIỆU SỐ CHO GIÁO VIÊN</div>
<h1 style="margin:0;font-size:84px;line-height:1.05;font-weight:800">Chưa từng dùng AI?<br/><span style="color:{Y}">Làm theo từng bước</span><br/>là dùng được.</h1>
<div style="display:flex;gap:40px;align-items:center;flex-grow:1">
<div style="flex:none;padding-left:20px">{book(1.0)}</div>
<div style="display:flex;flex-direction:column;gap:18px;font-size:28px;font-weight:500">
<div><b style="color:{Y};font-size:46px">40</b> bài ngắn, mỗi bài 5 phút</div>
<div><b style="color:{Y};font-size:46px">51</b> câu lệnh mẫu sao chép nguyên văn</div>
<div><b style="color:{Y};font-size:46px">36</b> câu lệnh đổi sẵn cho 3 cấp học</div>
<div><b style="color:{Y};font-size:46px">23</b> slide trình chiếu kèm theo</div>
</div>
</div>
<div style="display:flex;justify-content:space-between;align-items:center;border-top:2px solid rgba(255,255,255,.3);padding-top:28px">
<div style="font-size:28px;font-weight:700">Mầm non · Tiểu học · THCS</div>
<div style="background:{Y};color:{G};font-weight:800;font-size:30px;padding:16px 30px;border-radius:18px">[GIÁ CỦA BẠN]</div>
</div>
</div>"""

S2 = f"""<div style="width:{WW}px;height:{HH}px;box-sizing:border-box;background:{W};color:{G};font-family:{FONT};padding:80px 72px;display:flex;flex-direction:column;gap:30px;overflow:hidden">
<div style="font-size:24px;font-weight:700;letter-spacing:.08em">VÌ SAO AI TRẢ LỜI CHUNG CHUNG?</div>
<h1 style="margin:0;font-size:72px;line-height:1.1;font-weight:800">Không phải AI kém.<br/>Câu lệnh đang <span style="background:{Y};padding:0 10px;border-radius:10px">thiếu mảnh ghép</span>.</h1>
<div style="background:{GT};border-radius:28px;padding:32px 36px;display:flex;flex-direction:column;gap:12px">
<div style="align-self:flex-start;background:rgba(31,78,71,.16);font-weight:800;font-size:22px;padding:6px 16px;border-radius:999px">TRƯỚC</div>
<div style="font-size:36px;font-weight:500;line-height:1.35">"Tìm cho tôi 3 nguyên nhân chính gây ra ô nhiễm không khí..."</div>
</div>
<div style="background:{G};color:{W};border-radius:28px;padding:32px 36px;display:flex;flex-direction:column;gap:12px">
<div style="align-self:flex-start;background:{Y};color:{G};font-weight:800;font-size:22px;padding:6px 16px;border-radius:999px">SAU</div>
<div style="font-size:33px;font-weight:500;line-height:1.4">"Hãy <b style="color:{Y}">nhập vai một giáo viên môn Địa lý</b>, nhiệt tình và dễ hiểu... <b style="color:{Y}">mỗi nguyên nhân một mô tả ngắn từ 2-3 câu</b>... <b style="color:{Y}">ngắn gọn, rõ ràng và dễ nhớ</b> cho <b style="color:{Y}">học sinh</b>."</div>
</div>
<div style="margin-top:auto;font-size:28px;font-weight:800">Câu lệnh tốt có đủ 6 mảnh ghép:</div>
<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px">
<div style="border:3px solid {G};border-radius:18px;padding:22px;font-size:28px;font-weight:700;text-align:center">Vai trò</div>
<div style="border:3px solid {G};border-radius:18px;padding:22px;font-size:28px;font-weight:700;text-align:center">Nhiệm vụ</div>
<div style="border:3px solid {G};border-radius:18px;padding:22px;font-size:28px;font-weight:700;text-align:center">Đối tượng</div>
<div style="border:3px solid {G};border-radius:18px;padding:22px;font-size:28px;font-weight:700;text-align:center">Mục đích</div>
<div style="border:3px solid {G};border-radius:18px;padding:22px;font-size:28px;font-weight:700;text-align:center">Độ dài</div>
<div style="background:{Y};border-radius:18px;padding:22px;font-size:28px;font-weight:700;text-align:center">Giọng điệu</div>
</div>
<div style="font-size:26px;font-weight:600">Sách <b>Dạy cùng AI</b> dạy thầy cô ghép đủ 6 mảnh cho từng việc.</div>
</div>"""

def cell(t, d, dark=False):
    bg, fg = (G, W) if dark else (GT, G)
    return f"""<div style="background:{bg};color:{fg};border-radius:24px;padding:36px 30px;display:flex;flex-direction:column;gap:10px"><div style="font-size:36px;font-weight:800">{t}</div><div style="font-size:25px;font-weight:500;line-height:1.35">{d}</div></div>"""

S3 = f"""<div style="width:{WW}px;height:{HH}px;box-sizing:border-box;background:{Y};color:{G};font-family:{FONT};padding:80px 72px;display:flex;flex-direction:column;gap:30px;overflow:hidden">
<div style="font-size:24px;font-weight:800;letter-spacing:.08em">BÊN TRONG BỘ TÀI LIỆU</div>
<h1 style="margin:0;font-size:74px;line-height:1.08;font-weight:800">6 việc thầy cô tự làm<br/>được với AI</h1>
<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;background:{W};padding:18px;border-radius:32px">
{cell("Soạn giáo án", "Góc trạm, STEM, bài giảng 10 slide kèm Quiz")}
{cell("Ra đề kiểm tra", "Tự luận, trắc nghiệm theo ma trận, rubric", True)}
{cell("Tạo ảnh minh họa", "Pixar, Anime, Ghibli, biến nét vẽ tay thành ảnh")}
{cell("Làm trò chơi", "Kéo thả, đố vui, mô phỏng: không cần lập trình", True)}
{cell("Bài hát, giọng đọc", "Bài hát cho trẻ, đọc thơ, hội thoại hai giọng")}
{cell("Trợ giảng ảo", "Chatbot ôn bài, không đưa đáp án ngay", True)}
</div>
<div style="display:flex;flex-direction:column;gap:10px;font-size:26px;font-weight:600;margin-top:auto">
<div>Sách PDF và Word · Slide PowerPoint · Thư viện câu lệnh · Hướng dẫn trước khi dùng</div>
</div>
<div style="background:{G};color:{W};border-radius:22px;padding:24px 30px;display:flex;justify-content:space-between;align-items:center">
<div style="font-size:30px;font-weight:800">Nhắn tin để nhận bộ tài liệu</div>
<div style="font-size:26px;font-weight:700;color:{Y}">[LIÊN HỆ CỦA BẠN]</div>
</div>
</div>"""

sales = [("Ban-01-Hero", "Ảnh bán 1", S1), ("Ban-02-Truoc-Sau", "Ảnh bán 2", S2), ("Ban-03-Ben-Trong", "Ảnh bán 3", S3)]
GF = "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&amp;display=swap"
os.makedirs(os.path.join(B, "sales_html"), exist_ok=True)
lst = []
for name, title, body in sales:
    html = f"""<!doctype html><html lang="vi"><head><meta charset="utf-8"><style>
@font-face{{font-family:'Be Vietnam Pro';src:url(file:///root/.fonts/BeVietnamPro-400.ttf);font-weight:400}}
@font-face{{font-family:'Be Vietnam Pro';src:url(file:///root/.fonts/BeVietnamPro-500.ttf);font-weight:500}}
@font-face{{font-family:'Be Vietnam Pro';src:url(file:///root/.fonts/BeVietnamPro-700.ttf);font-weight:600}}
@font-face{{font-family:'Be Vietnam Pro';src:url(file:///root/.fonts/BeVietnamPro-700.ttf);font-weight:700}}
@font-face{{font-family:'Be Vietnam Pro';src:url(file:///root/.fonts/BeVietnamPro-800.ttf);font-weight:800}}
body{{margin:0}}</style></head><body>{body}</body></html>"""
    open(os.path.join(B, "sales_html", name + ".html"), "w").write(html)
    lst.append([name, WW, HH])
    dc = f"""<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<title>{title}</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="stylesheet" href="{GF}">
<style>
body{{margin:0;font-family:{FONT};color:{G}}}
a{{color:{G}}}a:hover{{color:{G}}}
</style>
</helmet>
{body}
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{{"$preview":{{"width":{WW},"height":{HH}}}}}'>
class Component extends DCLogic {{
renderVals() {{ return {{}}; }}
}}
</script>
</body>
</html>
"""
    os.makedirs(os.path.join(B, "canvas", "project"), exist_ok=True)
    fn = "Main.dc.html" if name == "Ban-01-Hero" else name + ".dc.html"
    open(os.path.join(B, "canvas", "project", fn), "w").write(dc)
json.dump(lst, open(os.path.join(B, "sales_html", "list.json"), "w"))
print("ok")
