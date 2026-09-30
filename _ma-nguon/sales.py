# -*- coding: utf-8 -*-
# 3 ảnh bán hàng dựng từ trang thật của bộ tài liệu.
# Xuất 2 bản: HTML cục bộ để chụp PNG và .dc.html cho khung Design (ảnh qua /_blob).
import os, json, sys
B = os.path.dirname(os.path.abspath(__file__))
G, Y, W = "#1B1F24", "#A67C3D", "#F7F5F0"
LINE = "rgba(27,31,36,.16)"
WW, HH = 1080, 1350
SANS = "'Be Vietnam Pro',sans-serif"
SERIF = "'Playfair Display',serif"
HAND = "'Patrick Hand',cursive"
PRICE = "220.000đ"
EMAIL = "[EMAIL CỦA BẠN]"
SHOP = "thebuilder.work"

IMGS = ["book-cover", "book-c5", "book-canc", "slide-1", "slide-3", "cheatsheet"]

def build(src):
    def img(name, style):
        return f'<img src="{src[name]}" alt="" style="display:block;{style}">'
    def tape(style):
        return f'<div style="position:absolute;width:120px;height:34px;background:rgba(247,245,240,.72);box-shadow:0 1px 2px rgba(0,0,0,.08);{style}"></div>'
    def note(text, style, size=30):
        return f'<div style="position:absolute;font-family:{HAND};font-size:{size}px;line-height:1.15;color:{Y};{style}">{text}</div>'
    shadow = "box-shadow:0 18px 40px rgba(27,31,36,.22),0 2px 6px rgba(27,31,36,.12)"

    # ẢNH 1: trọn bộ và giá
    s1 = f"""<div style="width:{WW}px;height:{HH}px;box-sizing:border-box;background:{W};color:{G};font-family:{SANS};position:relative;overflow:hidden">
<div style="position:absolute;left:80px;top:78px;right:80px;display:flex;justify-content:space-between;align-items:baseline">
<div style="font-size:15px;letter-spacing:.3em;color:{Y}">BỘ TÀI LIỆU SỐ · SẢN PHẨM CÁ NHÂN</div>
<div style="font-size:15px;letter-spacing:.2em">BẢN 2026</div>
</div>
<h1 style="position:absolute;left:80px;top:124px;margin:0;font-family:{SERIF};font-weight:500;font-size:96px;line-height:1">Dạy cùng <i style="color:{Y}">AI</i></h1>
<div style="position:absolute;left:84px;top:236px;width:900px;font-size:21px;line-height:1.5">Tự học dùng AI từ con số 0, dành cho giáo viên Mầm non, Tiểu học, THCS. Mỗi bài có câu lệnh dán là chạy.</div>
<div style="position:absolute;left:90px;top:380px;width:380px;transform:rotate(-4deg);{shadow}">{img("book-cover", "width:380px")}</div>
{tape("left:210px;top:364px;transform:rotate(-8deg)")}
<div style="position:absolute;left:455px;top:400px;width:440px;transform:rotate(3.5deg);{shadow}">{img("book-c5", "width:440px")}</div>
{tape("left:610px;top:384px;transform:rotate(5deg)")}
<div style="position:absolute;left:64px;top:860px;width:360px;transform:rotate(-2deg);{shadow}">{img("slide-1", "width:360px")}</div>
<div style="position:absolute;left:800px;top:820px;width:210px;transform:rotate(6deg);{shadow}">{img("cheatsheet", "width:210px")}</div>
{note("Sách 43 trang<br/>Word + PDF", "left:86px;top:300px;transform:rotate(-3deg)")}
{note("trang 18 thật<br/>trong sách ↓", "left:880px;top:300px;transform:rotate(4deg)")}
{note("24 slide<br/>để trình chiếu", "left:450px;top:930px;transform:rotate(-2deg)")}
{note("thẻ in 1 trang", "left:620px;top:1060px;transform:rotate(3deg)", 26)}
<div style="position:absolute;left:80px;top:1112px;width:920px;border-top:1px solid {G};padding-top:18px;display:flex;align-items:baseline;gap:22px">
<div style="font-family:{SERIF};font-size:64px;line-height:1">{PRICE}</div>
<div style="font-size:18px;line-height:1.4">trọn bộ 5 tệp: sách, slide, hướng dẫn,<br/>thư viện câu lệnh, thẻ tra nhanh 1 trang</div>
</div>
<div style="position:absolute;left:80px;top:1226px;font-size:19px">Mua chính thức tại <b style="font-weight:600;border-bottom:1.5px solid {Y}">{SHOP}</b> · thanh toán trên website, không giao dịch ngoài</div>
<div style="position:absolute;left:80px;bottom:34px;font-size:14px;color:rgba(27,31,36,.7)">Sản phẩm cá nhân của tác giả · Đào tạo riêng online cho trường, tổ chuyên môn: {EMAIL}</div>
</div>"""

    # ẢNH 2: một trang thật có chú thích
    def arrow(d, style):
        return f'<svg width="200" height="140" viewBox="0 0 200 140" style="position:absolute;overflow:visible;{style}"><path d="{d}" fill="none" stroke="{Y}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    s2 = f"""<div style="width:{WW}px;height:{HH}px;box-sizing:border-box;background:{W};color:{G};font-family:{SANS};position:relative;overflow:hidden">
<div style="position:absolute;left:80px;top:78px;font-size:15px;letter-spacing:.3em;color:{Y}">BỘ TÀI LIỆU LÀM ĐƯỢC GÌ CHO THẦY CÔ</div>
<h1 style="position:absolute;left:80px;top:116px;width:920px;margin:0;font-family:{SERIF};font-weight:500;font-size:60px;line-height:1.12">Mở một trang bất kỳ.<br/>Thấy ngay <i style="color:{Y}">4 thứ</i> để làm theo.</h1>
<div style="position:absolute;left:80px;top:300px;width:600px;height:880px;overflow:hidden;background:#fff;{shadow}">{img("book-c5", "width:600px;margin-top:-40px")}</div>
{note("① Câu lệnh gốc:<br/>sao chép, dán là chạy", "left:716px;top:318px")}
{arrow("M170 60 C 120 40, 70 50, 10 70 M22 58 L10 70 L25 80", "left:600px;top:330px")}
{note("② Từng bước bấm gì,<br/>ở đâu", "left:716px;top:470px")}
{arrow("M170 40 C 130 50, 80 60, 20 60 M32 50 L20 60 L32 70", "left:600px;top:480px")}
{note("③ Căn cứ văn bản<br/>của từng bài", "left:716px;top:640px")}
{arrow("M170 30 C 120 30, 80 60, 20 90 M28 76 L20 90 L36 92", "left:600px;top:660px")}
{note("④ Vì sao dùng<br/>câu chữ này", "left:716px;top:790px")}
{arrow("M170 30 C 130 30, 90 40, 20 50 M30 40 L20 50 L32 58", "left:600px;top:800px")}
<div style="position:absolute;left:716px;top:960px;width:290px;font-size:18px;line-height:1.5">Ảnh chụp nguyên trang 18 trong sách. Mỗi bài còn có bảng câu lệnh đổi sẵn cho <b style="font-weight:600">Mầm non, Tiểu học, THCS</b>.</div>
<div style="position:absolute;left:80px;right:80px;top:1200px;border-top:1px solid {LINE};padding-top:20px;display:flex;justify-content:space-between;align-items:baseline">
<div style="font-size:18px;line-height:1.5">40 bài · 51 câu lệnh · 36 phiên bản cho 3 cấp học<br/>Mua chính thức tại <b style="font-weight:600;border-bottom:1.5px solid {Y}">{SHOP}</b></div>
<div style="font-family:{SERIF};font-size:34px">{PRICE}<span style="font-family:{SANS};font-size:16px"> / trọn bộ</span></div>
</div>
</div>"""

    # ẢNH 3: căn cứ và mục tiêu
    def ref(num, text):
        return f'<div style="border-top:1px solid {LINE};padding:11px 0;display:flex;gap:14px;font-size:16px;line-height:1.4"><span style="color:{Y};width:150px;flex:none;font-size:15px">{num}</span><span>{text}</span></div>'
    s3 = f"""<div style="width:{WW}px;height:{HH}px;box-sizing:border-box;background:{W};color:{G};font-family:{SANS};position:relative;overflow:hidden">
<div style="position:absolute;left:80px;top:78px;font-size:15px;letter-spacing:.3em;color:{Y}">CĂN CỨ BIÊN SOẠN</div>
<h1 style="position:absolute;left:80px;top:116px;width:920px;margin:0;font-family:{SERIF};font-weight:500;font-size:58px;line-height:1.12">Soạn theo văn bản <i style="color:{Y}">2025-2026</i>,<br/>hướng tới năm 2030.</h1>
<div style="position:absolute;left:60px;top:300px;width:420px;transform:rotate(-3deg);{shadow}">{img("book-canc", "width:420px")}</div>
{tape("left:200px;top:284px;transform:rotate(-6deg)")}
{note("trang 4: 17 văn bản,<br/>chia 4 nhóm", "left:120px;top:910px;transform:rotate(-3deg)")}
<div style="position:absolute;left:530px;top:306px;width:470px">
{ref("QĐ 1671/QĐ-TTg", "Chiến lược quốc gia về AI đến 2030 (28/8/2026)")}
{ref("QĐ 1528/QĐ-TTg", "Phát triển nhân lực AI đến 2030 (2026)")}
{ref("NQ 71-NQ/TW", "Đột phá phát triển giáo dục (22/8/2025)")}
{ref("Luật 134/2025", "Luật Trí tuệ nhân tạo, hiệu lực 01/3/2026")}
{ref("Luật 91/2025", "Luật Bảo vệ dữ liệu cá nhân, hiệu lực 01/1/2026")}
{ref("TT 02/2025", "Khung năng lực số cho người học")}
{ref("CV 2250, 5835", "Hướng dẫn dùng AI, bồi dưỡng giáo viên (2025)")}
<div style="border-top:1px solid {LINE}"></div>
</div>
<div style="position:absolute;left:80px;right:80px;top:1010px;background:{G};color:{W};padding:30px 34px">
<div style="font-size:14px;letter-spacing:.28em;color:{Y}">MỤC TIÊU CỦA BỘ TÀI LIỆU</div>
<div style="margin-top:12px;font-family:{SERIF};font-size:30px;line-height:1.3">Để mỗi giáo viên, kể cả người chưa từng dùng AI, <i style="color:{Y}">tự tin dùng AI an toàn, đúng luật</i> và dành thêm thời gian cho học sinh.</div>
</div>
<div style="position:absolute;left:80px;right:80px;bottom:40px;font-size:15px;line-height:1.6;color:rgba(27,31,36,.72)"><b style="font-weight:600;color:{G}">{PRICE} / trọn bộ · mua chính thức tại <span style="border-bottom:1.5px solid {Y}">{SHOP}</span></b>, thanh toán trên website.<br/>Sản phẩm cá nhân của tác giả, không phải tài liệu của cơ quan nhà nước. Đào tạo riêng online: {EMAIL}</div>
</div>"""
    return [("Ban-01-Hero", "Ảnh bán 1", s1), ("Ban-02-Truoc-Sau", "Ảnh bán 2", s2), ("Ban-03-Ben-Trong", "Ảnh bán 3", s3)]

GF = "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600&amp;family=Playfair+Display:ital,wght@0,500;1,500&amp;family=Patrick+Hand&amp;display=swap"
FACES = """@font-face{font-family:'Be Vietnam Pro';src:url(file:///root/.fonts/BeVietnamPro-400.ttf);font-weight:400}
@font-face{font-family:'Be Vietnam Pro';src:url(file:///root/.fonts/BeVietnamPro-500.ttf);font-weight:500}
@font-face{font-family:'Be Vietnam Pro';src:url(file:///root/.fonts/BeVietnamPro-700.ttf);font-weight:600}
@font-face{font-family:'Playfair Display';src:url(file:///root/.fonts/Playfair-0-500.ttf);font-weight:400 500}
@font-face{font-family:'Playfair Display';src:url(file:///root/.fonts/Playfair-1-500.ttf);font-weight:400 500;font-style:italic}
@font-face{font-family:'Patrick Hand';src:url(file:///root/.fonts/PatrickHand.ttf)}"""

os.makedirs(os.path.join(B, "sales_html"), exist_ok=True)
os.makedirs(os.path.join(B, "canvas", "project"), exist_ok=True)
local = {n: f"file://{B}/sales_assets/{n}.jpg" for n in IMGS}
blobs_path = os.path.join(B, "sales_assets", "blobs.json")
blobs = json.load(open(blobs_path)) if os.path.exists(blobs_path) else None

lst = []
for name, title, body in build(local):
    open(os.path.join(B, "sales_html", name + ".html"), "w").write(
        f"<!doctype html><html lang='vi'><head><meta charset='utf-8'><style>{FACES}\nbody{{margin:0}}</style></head><body>{body}</body></html>")
    lst.append([name, WW, HH])
json.dump(lst, open(os.path.join(B, "sales_html", "list.json"), "w"))

if blobs:
    for name, title, body in build(blobs):
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
    print("dc written")
print("ok")
