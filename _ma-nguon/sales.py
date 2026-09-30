# -*- coding: utf-8 -*-
# 3 ảnh bán hàng tối giản: xuất HTML để chụp PNG và .dc.html cho khung Design.
import os, json
B = os.path.dirname(os.path.abspath(__file__))
G, Y, W = "#1B1F24", "#A67C3D", "#F7F5F0"   # mực than, đồng nhũ, ngà
LINE = "rgba(27,31,36,.16)"
LINE_D = "rgba(247,245,240,.22)"
WW, HH = 1080, 1350
SANS = "'Be Vietnam Pro',sans-serif"
SERIF = "'Playfair Display',serif"

def book():
    return f"""<div style="width:330px;height:450px;background:{W};box-shadow:30px 34px 60px rgba(0,0,0,.35);display:flex;flex-direction:column;padding:34px 30px;box-sizing:border-box;gap:14px;color:{G}">
<div style="font-family:{SANS};font-size:11px;letter-spacing:.3em;color:{Y}">SỔ TAY THỰC HÀNH</div>
<div style="width:40px;height:1px;background:{Y}"></div>
<div style="font-family:{SERIF};font-weight:500;font-size:50px;line-height:1.02">Dạy<br/>cùng <i style="color:{Y}">AI</i></div>
<div style="font-family:{SANS};font-size:14px;line-height:1.5">Từ câu lệnh đầu tiên<br/>đến trợ giảng ảo</div>
<div style="margin-top:auto;font-family:{SANS};font-size:11px;letter-spacing:.18em">MẦM NON · TIỂU HỌC · THCS</div>
</div>"""

S1 = f"""<div style="width:{WW}px;height:{HH}px;box-sizing:border-box;background:{G};color:{W};font-family:{SANS};padding:96px 88px;display:flex;flex-direction:column;overflow:hidden">
<div style="font-size:17px;letter-spacing:.32em;color:{Y}">BỘ TÀI LIỆU SỐ CHO GIÁO VIÊN</div>
<h1 style="margin:34px 0 0;font-family:{SERIF};font-weight:500;font-size:82px;line-height:1.08;letter-spacing:-.01em">Chưa từng dùng AI?<br/><i style="color:{Y}">Làm theo từng bước</i><br/>là dùng được.</h1>
<div style="display:flex;gap:64px;align-items:center;flex-grow:1">
<div style="flex:none">{book()}</div>
<div style="display:flex;flex-direction:column;flex-grow:1">
<div style="border-top:1px solid {LINE_D};padding:18px 0;display:flex;gap:18px;align-items:baseline"><span style="font-family:{SERIF};font-size:48px;color:{Y};width:70px">40</span><span style="font-size:21px">bài ngắn, mỗi bài 5 phút</span></div>
<div style="border-top:1px solid {LINE_D};padding:18px 0;display:flex;gap:18px;align-items:baseline"><span style="font-family:{SERIF};font-size:48px;color:{Y};width:70px">51</span><span style="font-size:21px">câu lệnh mẫu, sao chép là chạy</span></div>
<div style="border-top:1px solid {LINE_D};padding:18px 0;display:flex;gap:18px;align-items:baseline"><span style="font-family:{SERIF};font-size:48px;color:{Y};width:70px">36</span><span style="font-size:21px">câu lệnh đổi sẵn cho 3 cấp học</span></div>
<div style="border-top:1px solid {LINE_D};border-bottom:1px solid {LINE_D};padding:18px 0;display:flex;gap:18px;align-items:baseline"><span style="font-family:{SERIF};font-size:48px;color:{Y};width:70px">23</span><span style="font-size:21px">slide trình chiếu kèm theo</span></div>
</div>
</div>
<div style="display:flex;justify-content:space-between;align-items:center">
<div style="font-size:16px;letter-spacing:.24em">MẦM NON · TIỂU HỌC · THCS</div>
<div style="border:1px solid {Y};color:{Y};font-size:20px;letter-spacing:.08em;padding:14px 26px">[GIÁ CỦA BẠN]</div>
</div>
</div>"""

def piece(t, accent=False):
    return f"""<div style="border-top:1px solid {Y if accent else LINE};padding:16px 0 0;font-family:{SERIF};font-size:28px;{'color:' + Y + ';font-style:italic' if accent else ''}">{t}</div>"""

S2 = f"""<div style="width:{WW}px;height:{HH}px;box-sizing:border-box;background:{W};color:{G};font-family:{SANS};padding:96px 88px;display:flex;flex-direction:column;overflow:hidden">
<div style="font-size:17px;letter-spacing:.32em;color:{Y}">VÌ SAO AI TRẢ LỜI CHUNG CHUNG?</div>
<h1 style="margin:34px 0 56px;font-family:{SERIF};font-weight:500;font-size:74px;line-height:1.1">Không phải AI kém.<br/>Câu lệnh đang <i style="color:{Y}">thiếu mảnh ghép.</i></h1>
<div style="display:flex;flex-direction:column;gap:14px;padding-bottom:36px;border-bottom:1px solid {LINE}">
<div style="font-size:15px;letter-spacing:.28em">TRƯỚC</div>
<div style="font-family:{SERIF};font-size:32px;line-height:1.4;color:rgba(27,31,36,.55)">"Tìm cho tôi 3 nguyên nhân chính gây ra ô nhiễm không khí..."</div>
</div>
<div style="display:flex;flex-direction:column;gap:14px;padding:36px 0">
<div style="font-size:15px;letter-spacing:.28em;color:{Y}">SAU</div>
<div style="font-family:{SERIF};font-size:32px;line-height:1.45">"Hãy <i style="color:{Y}">nhập vai một giáo viên môn Địa lý</i>, nhiệt tình và dễ hiểu... <i style="color:{Y}">mỗi nguyên nhân một mô tả ngắn từ 2-3 câu</i>... <i style="color:{Y}">ngắn gọn, rõ ràng và dễ nhớ</i> cho <i style="color:{Y}">học sinh</i>."</div>
</div>
<div style="margin-top:auto;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));column-gap:28px;row-gap:26px">
{piece("Vai trò")}{piece("Nhiệm vụ")}{piece("Đối tượng")}{piece("Mục đích")}{piece("Độ dài")}{piece("Giọng điệu", True)}
</div>
<div style="margin-top:44px;font-size:19px">Sách <b style="font-weight:600">Dạy cùng AI</b> hướng dẫn ghép đủ 6 mảnh cho từng việc.</div>
</div>"""

def cell(n, t, d):
    return f"""<div style="border-top:1px solid {LINE};padding:26px 0 30px;display:flex;gap:22px">
<div style="font-family:{SERIF};font-size:26px;color:{Y};width:40px;flex:none">{n}</div>
<div style="display:flex;flex-direction:column;gap:8px"><div style="font-family:{SERIF};font-size:34px">{t}</div><div style="font-size:19px;line-height:1.5;color:rgba(27,31,36,.72)">{d}</div></div>
</div>"""

S3 = f"""<div style="width:{WW}px;height:{HH}px;box-sizing:border-box;background:{W};color:{G};font-family:{SANS};padding:96px 88px;display:flex;flex-direction:column;overflow:hidden">
<div style="font-size:17px;letter-spacing:.32em;color:{Y}">BÊN TRONG BỘ TÀI LIỆU</div>
<h1 style="margin:34px 0 48px;font-family:{SERIF};font-weight:500;font-size:74px;line-height:1.1">Sáu việc thầy cô<br/><i style="color:{Y}">tự làm được</i> với AI</h1>
<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:48px">
{cell("01", "Soạn giáo án", "Góc trạm, STEM, bài giảng 10 slide kèm Quiz")}
{cell("02", "Ra đề kiểm tra", "Tự luận, trắc nghiệm theo ma trận, rubric")}
{cell("03", "Tạo ảnh minh họa", "Pixar, Anime, Ghibli, biến nét vẽ tay thành ảnh")}
{cell("04", "Làm trò chơi", "Kéo thả, đố vui, mô phỏng, không cần lập trình")}
{cell("05", "Bài hát, giọng đọc", "Bài hát cho trẻ, đọc thơ, hội thoại hai giọng")}
{cell("06", "Trợ giảng ảo", "Chatbot ôn bài, không đưa đáp án ngay")}
</div>
<div style="margin-top:auto;font-size:17px;letter-spacing:.06em;color:rgba(27,31,36,.72)">Sách PDF và Word · Slide PowerPoint · Thư viện câu lệnh · Hướng dẫn trước khi dùng</div>
<div style="margin-top:26px;background:{G};color:{W};padding:28px 34px;display:flex;justify-content:space-between;align-items:center">
<div style="font-family:{SERIF};font-size:30px">Nhắn tin để nhận bộ tài liệu</div>
<div style="font-size:18px;letter-spacing:.08em;color:{Y}">[LIÊN HỆ CỦA BẠN]</div>
</div>
</div>"""

sales = [("Ban-01-Hero", "Ảnh bán 1", S1), ("Ban-02-Truoc-Sau", "Ảnh bán 2", S2), ("Ban-03-Ben-Trong", "Ảnh bán 3", S3)]
GF = "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600&amp;family=Playfair+Display:ital,wght@0,500;1,500&amp;display=swap"
FACES = """@font-face{font-family:'Be Vietnam Pro';src:url(file:///root/.fonts/BeVietnamPro-400.ttf);font-weight:400}
@font-face{font-family:'Be Vietnam Pro';src:url(file:///root/.fonts/BeVietnamPro-500.ttf);font-weight:500}
@font-face{font-family:'Be Vietnam Pro';src:url(file:///root/.fonts/BeVietnamPro-700.ttf);font-weight:600}
@font-face{font-family:'Playfair Display';src:url(file:///root/.fonts/Playfair-0-500.ttf);font-weight:400 500}
@font-face{font-family:'Playfair Display';src:url(file:///root/.fonts/Playfair-1-500.ttf);font-weight:400 500;font-style:italic}"""
os.makedirs(os.path.join(B, "sales_html"), exist_ok=True)
os.makedirs(os.path.join(B, "canvas", "project"), exist_ok=True)
lst = []
for name, title, body in sales:
    open(os.path.join(B, "sales_html", name + ".html"), "w").write(
        f"<!doctype html><html lang='vi'><head><meta charset='utf-8'><style>{FACES}\nbody{{margin:0}}</style></head><body>{body}</body></html>")
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
body{{margin:0;font-family:{SANS};color:{G}}}
a{{color:{G}}}a:hover{{color:{Y}}}
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
    fn = "Main.dc.html" if name == "Ban-01-Hero" else name + ".dc.html"
    open(os.path.join(B, "canvas", "project", fn), "w").write(dc)
json.dump(lst, open(os.path.join(B, "sales_html", "list.json"), "w"))
print("ok")
