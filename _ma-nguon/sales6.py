# -*- coding: utf-8 -*-
# 6 ảnh bán hàng, dựng từ trang thật của bộ tài liệu. Màu: xanh chàm, bạc hà, trắng.
import os, json, subprocess
import pymupdf as fitz
B = os.path.dirname(os.path.abspath(__file__))
os.chdir(B)
G, M, W, MT = "#2E3A67", "#CFE8E0", "#FFFFFF", "#EAF5F1"
WW, HH = 1080, 1350
SANS = "'Be Vietnam Pro',sans-serif"
HAND = "'Patrick Hand',cursive"
PRICE, SHOP, EMAIL, AUTHOR = "220.000đ", "thebuilder.work", "[EMAIL CỦA BẠN]", "[Tên tác giả]"
P = json.load(open('pages.json'))
META = json.loads(subprocess.run(['node', '-e', "console.log(JSON.stringify(require('./meta.js')))"], capture_output=True, text=True, check=True).stdout)
LV = json.load(open('sales_assets/info.json'))['levels_page']
N = {k: len(fitz.open(f)) for k, f in [('book', 'book.pdf'), ('guide', 'guide.pdf'), ('lib', 'lib.pdf'), ('deck', 'deck.pdf')]}
def bai(code): return f"Bài {META['ORDER'].index(code) + 1}"
# bài chứa trang có bảng đổi cho lớp
lv_code = max((c for c in META['ORDER'] if P[c] <= LV), key=lambda c: P[c])
IMGS = ["book-cover", "guide-cover", "lib-cover", "cheatsheet", "slide-1", "crop-a2", "crop-levels", "crop-basis", "book-toc"]
shadow = "box-shadow:0 14px 34px rgba(46,58,103,.20),0 2px 6px rgba(46,58,103,.12)"

def build(src):
    def img(name, style): return f'<img src="{src[name]}" alt="" style="display:block;{style}">'
    def head(n, kick): return f'<div style="position:absolute;left:72px;top:64px;right:72px;display:flex;justify-content:space-between;align-items:center"><div style="background:{M};font-size:17px;font-weight:700;padding:8px 18px;border-radius:999px">{kick}</div><div style="font-size:17px;font-weight:700">Dạy cùng AI · {n}/6</div></div>'
    def foot(): return f'<div style="position:absolute;left:0;right:0;bottom:0;height:96px;background:{G};color:{W};display:flex;align-items:center;justify-content:space-between;padding:0 72px"><div style="font-size:21px;font-weight:700">Trọn bộ 5 tệp · {PRICE}</div><div style="font-size:21px">Mua chính thức trên <b>{SHOP}</b></div></div>'
    def cite(text, style): return f'<div style="position:absolute;background:{G};color:{W};font-size:17px;font-weight:700;padding:8px 16px;border-radius:8px;{style}">{text}</div>'
    def note(text, style, size=30): return f'<div style="position:absolute;font-family:{HAND};font-size:{size}px;line-height:1.12;color:{G};{style}">{text}</div>'
    def num(n, style): return f'<div style="position:absolute;width:46px;height:46px;border-radius:50%;background:{G};color:{W};font-size:24px;font-weight:800;display:flex;align-items:center;justify-content:center;{style}">{n}</div>'
    base = f"width:{WW}px;height:{HH}px;box-sizing:border-box;background:{W};color:{G};font-family:{SANS};position:relative;overflow:hidden"
    h1 = lambda t, top=128, size=60: f'<h1 style="position:absolute;left:72px;right:72px;top:{top}px;margin:0;font-size:{size}px;line-height:1.12;font-weight:800">{t}</h1>'
    hl = lambda t: f'<span style="background:{M};padding:0 10px;border-radius:10px">{t}</span>'

    # 1. Trọn bộ
    s1 = f"""<div style="{base}">{head(1, 'BỘ TÀI LIỆU SỐ CHO GIÁO VIÊN')}
{h1('Dạy cùng AI', 124, 92)}
<div style="position:absolute;left:76px;top:236px;width:900px;font-size:26px;line-height:1.45">Sổ tay cầm tay chỉ việc cho giáo viên <b>Mầm non, Tiểu học, THCS</b> chưa từng dùng AI. Đọc bài nào, làm theo bài đó.</div>
<div style="position:absolute;left:80px;top:390px;width:300px;transform:rotate(-3deg);{shadow}">{img('guide-cover','width:300px')}</div>
<div style="position:absolute;left:330px;top:370px;width:360px;transform:rotate(1deg);{shadow}">{img('book-cover','width:360px')}</div>
<div style="position:absolute;left:700px;top:400px;width:300px;transform:rotate(4deg);{shadow}">{img('cheatsheet','width:300px')}</div>
<div style="position:absolute;left:110px;top:850px;width:380px;transform:rotate(-2deg);{shadow}">{img('slide-1','width:380px')}</div>
<div style="position:absolute;left:560px;top:830px;width:260px;transform:rotate(3deg);{shadow}">{img('lib-cover','width:260px')}</div>
{cite('00 · Hướng dẫn, ' + str(N['guide']) + ' trang', 'left:70px;top:350px')}
{cite('01 · Sách, ' + str(N['book']) + ' trang', 'left:420px;top:330px')}
{cite('02 · Thẻ in 1 trang', 'left:760px;top:360px')}
{cite('04 · Slide, ' + str(N['deck']) + ' trang', 'left:100px;top:1080px')}
{cite('03 · Thư viện câu lệnh', 'left:600px;top:1090px')}
{note('ảnh chụp<br/>trang thật', 'left:860px;top:900px;transform:rotate(-4deg)')}
{foot()}</div>"""

    # 2. Thứ tự mở tệp
    rows = [('00', 'guide-cover', 'Hướng dẫn đọc đầu tiên', f"{N['guide']} trang · mở đầu tiên: thứ tự đọc, lộ trình 7 ngày"),
            ('01', 'book-cover', 'Sách Dạy cùng AI', f"{N['book']} trang · 36 bài, mỗi bài bắt đầu ở trang mới"),
            ('02', 'cheatsheet', 'Thẻ tra nhanh', "1 trang · in ra, dán cạnh máy tính"),
            ('03', 'lib-cover', 'Thư viện câu lệnh', f"{N['lib']} trang · chỉ câu lệnh, ghi rõ bài và trang"),
            ('04', 'slide-1', 'Slide tập huấn', f"{N['deck']} slide · mỗi slide ghi bài và trang trong sách")]
    rr = ''.join(f'''<div style="display:flex;align-items:center;gap:24px;padding:16px 0;border-top:2px solid {MT}">
<div style="width:74px;height:74px;border-radius:50%;background:{G};color:{W};font-size:28px;font-weight:800;display:flex;align-items:center;justify-content:center;flex:none">{n}</div>
<div style="width:110px;height:{'62' if im=='slide-1' else '150'}px;overflow:hidden;flex:none;{shadow}">{img(im,'width:110px')}</div>
<div><div style="font-size:30px;font-weight:800">{t}</div><div style="font-size:21px;line-height:1.4;margin-top:4px">{d}</div></div></div>''' for n, im, t, d in rows)
    s2 = f"""<div style="{base}">{head(2, 'KHÔNG SỢ BỊ LẠC')}
{h1('Tên tệp có số. ' + hl('Mở từ 00 đến 04') + ' là đúng thứ tự.', 128, 54)}
<div style="position:absolute;left:72px;right:72px;top:300px">{rr}</div>
{foot()}</div>"""

    # 3. Một trang bài học
    s3 = f"""<div style="{base}">{head(3, 'VIẾT NHƯ ĐANG NGỒI CẠNH THẦY CÔ')}
{h1('Mỗi bài chỉ rõ ' + hl('bấm vào đâu, gõ câu gì') + ', vì sao làm vậy.', 128, 50)}
<div style="position:absolute;left:72px;right:72px;top:330px;border:2px solid {G};{shadow}">{img('crop-a2','width:932px')}</div>
{cite('Trích nguyên văn: tệp 01, ' + bai('A2') + ', trang ' + str(P['A2']), 'left:72px;top:290px')}
{num(1, 'left:40px;top:430px')}{num(2, 'left:40px;top:600px')}{num(3, 'left:40px;top:760px')}
<div style="position:absolute;left:72px;right:72px;top:880px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px">
<div style="background:{MT};border-radius:16px;padding:20px"><div style="font-size:24px;font-weight:800">① Bài này giúp gì</div><div style="font-size:19px;line-height:1.45;margin-top:6px">Mất bao lâu, cần chuẩn bị gì. Biết trước để yên tâm.</div></div>
<div style="background:{MT};border-radius:16px;padding:20px"><div style="font-size:24px;font-weight:800">② Lời tác giả</div><div style="font-size:19px;line-height:1.45;margin-top:6px">Nói chuyện như người đi cùng, không dùng từ khó.</div></div>
<div style="background:{MT};border-radius:16px;padding:20px"><div style="font-size:24px;font-weight:800">③ Từng bước</div><div style="font-size:19px;line-height:1.45;margin-top:6px">Bước 1, Bước 2... Bấm nút nào, gõ chữ gì.</div></div>
</div>
<div style="position:absolute;left:72px;right:72px;top:1112px;font-size:21px;line-height:1.5">Mọi chỗ nhắc tới bài khác đều ghi <b>"Bài mấy (trang mấy)"</b>. 189 chỗ tham chiếu đã được kiểm tra khớp với trang thật.</div>
{foot()}</div>"""

    # 4. Đổi cho lớp
    s4 = f"""<div style="{base}">{head(4, 'MẦM NON · TIỂU HỌC · THCS')}
{h1('Câu lệnh đã ' + hl('đổi sẵn cho lớp') + ' của thầy cô.', 128, 56)}
<div style="position:absolute;left:76px;top:290px;width:900px;font-size:24px;line-height:1.45">Không phải tự nghĩ lại từ đầu. Chọn đúng dòng cấp học của mình, sao chép, dán vào AI.</div>
{cite('Trích nguyên văn: tệp 01, ' + bai(lv_code) + ', trang ' + str(LV), 'left:72px;top:420px')}
<div style="position:absolute;left:72px;right:72px;top:470px;border:2px solid {G};{shadow}">{img('crop-levels','width:932px')}</div>
<div style="position:absolute;left:72px;right:72px;top:930px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;text-align:center">
<div style="background:{G};color:{W};border-radius:16px;padding:22px"><div style="font-size:52px;font-weight:800">36</div><div style="font-size:20px">bài, mỗi bài bắt đầu ở trang mới</div></div>
<div style="background:{MT};border-radius:16px;padding:22px"><div style="font-size:52px;font-weight:800">51</div><div style="font-size:20px">câu lệnh mẫu sao chép được</div></div>
<div style="background:{MT};border-radius:16px;padding:22px"><div style="font-size:52px;font-weight:800">36</div><div style="font-size:20px">phiên bản đổi sẵn cho 3 cấp học</div></div>
</div>
{foot()}</div>"""

    # 5. Căn cứ
    s5 = f"""<div style="{base}">{head(5, 'CÓ CĂN CỨ, KHÔNG TỰ ĐẶT RA')}
{h1('Soạn theo văn bản ' + hl('2025-2026') + ', hướng tới năm 2030.', 128, 54)}
{cite('Trích nguyên văn: tệp 01, trang ' + str(P['BASIS']) + ' · Sách dựa trên văn bản nào', 'left:72px;top:300px')}
<div style="position:absolute;left:72px;top:350px;width:560px;height:620px;overflow:hidden;border:2px solid {G};{shadow}">{img('crop-basis','width:560px')}</div>
<div style="position:absolute;left:660px;top:350px;width:348px;font-size:19px;line-height:1.4">
<div style="font-weight:800;font-size:22px;margin-bottom:10px">17 văn bản, 4 nhóm. Ví dụ:</div>
<div style="padding:9px 0;border-top:2px solid {MT}"><b>QĐ 1671/QĐ-TTg</b><br/>Chiến lược quốc gia về AI đến 2030</div>
<div style="padding:9px 0;border-top:2px solid {MT}"><b>NQ 71-NQ/TW</b><br/>Đột phá phát triển giáo dục</div>
<div style="padding:9px 0;border-top:2px solid {MT}"><b>Luật 134/2025/QH15</b><br/>Luật Trí tuệ nhân tạo</div>
<div style="padding:9px 0;border-top:2px solid {MT}"><b>Luật 91/2025/QH15</b><br/>Luật Bảo vệ dữ liệu cá nhân</div>
<div style="padding:9px 0;border-top:2px solid {MT}"><b>TT 02/2025/TT-BGDĐT</b><br/>Khung năng lực số cho người học</div>
<div style="padding:9px 0;border-top:2px solid {MT};border-bottom:2px solid {MT}"><b>CV 2250 và CV 5835 (2025)</b><br/>Hướng dẫn dùng AI, bồi dưỡng giáo viên</div>
</div>
<div style="position:absolute;left:72px;right:72px;top:1010px;background:{MT};border-radius:16px;padding:22px 26px">
<div style="font-size:18px;font-weight:800">MỤC TIÊU CỦA BỘ TÀI LIỆU</div>
<div style="font-size:27px;font-weight:700;line-height:1.35;margin-top:6px">Để mỗi giáo viên, kể cả người chưa từng dùng AI, tự tin dùng AI an toàn, đúng luật và dành thêm thời gian cho học sinh.</div></div>
{foot()}</div>"""

    # 6. Mua ở đâu, ai bán
    step = lambda n, t: f'<div style="display:flex;gap:16px;align-items:flex-start;padding:12px 0"><div style="width:44px;height:44px;border-radius:50%;background:{G};color:{W};font-size:22px;font-weight:800;display:flex;align-items:center;justify-content:center;flex:none">{n}</div><div style="font-size:22px;line-height:1.4;padding-top:6px">{t}</div></div>'
    s6 = f"""<div style="{base}">{head(6, 'MUA Ở ĐÂU · AI BÁN · CÓ AN TOÀN KHÔNG')}
{h1('Mua đúng chỗ, ' + hl('không chuyển khoản ngoài') + '.', 128, 56)}
<div style="position:absolute;left:72px;right:72px;top:300px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px">
<div style="background:{MT};border-radius:16px;padding:24px"><div style="font-size:18px;font-weight:800">NGƯỜI BÁN</div><div style="font-size:24px;font-weight:700;line-height:1.35;margin-top:8px">Sản phẩm cá nhân của tác giả {AUTHOR}</div><div style="font-size:19px;line-height:1.45;margin-top:8px">Không phải tài liệu của cơ quan nhà nước.</div></div>
<div style="background:{MT};border-radius:16px;padding:24px"><div style="font-size:18px;font-weight:800">NƠI BÁN</div><div style="font-size:24px;font-weight:700;line-height:1.35;margin-top:8px">The Builder · {SHOP}</div><div style="font-size:19px;line-height:1.45;margin-top:8px">Theo giới thiệu trên trang: nền tảng bán sản phẩm số cho người Việt, người mua quét VietQR.</div></div>
</div>
<div style="position:absolute;left:72px;right:72px;top:560px">
<div style="font-size:26px;font-weight:800;margin-bottom:6px">Mua trong 4 bước</div>
{step(1, 'Tự gõ đúng địa chỉ <b>thebuilder.work</b> trên trình duyệt. Kiểm tra từng chữ.')}
{step(2, 'Tìm bộ <b>Dạy cùng AI</b>, giá <b>' + PRICE + '</b>, bấm <b>Mua ngay</b>.')}
{step(3, 'Quét mã <b>VietQR</b> hiện trên trang bằng ứng dụng ngân hàng.')}
{step(4, 'Nhận 5 tệp theo hướng dẫn trên trang. Mở tệp <b>00</b> trước.')}
</div>
<div style="position:absolute;left:72px;right:72px;top:1000px;background:{G};color:{W};border-radius:16px;padding:22px 26px">
<div style="font-size:18px;font-weight:800;color:{M}">ĐỂ KHÔNG BỊ LỪA</div>
<div style="font-size:21px;line-height:1.45;margin-top:6px">Tác giả <b>không</b> bán qua tin nhắn riêng và <b>không</b> xin chuyển khoản vào tài khoản cá nhân. Ai làm vậy, đó không phải tác giả.</div></div>
<div style="position:absolute;left:0;right:0;bottom:0;height:96px;background:{MT};display:flex;align-items:center;justify-content:center;font-size:21px;font-weight:700">Trường, tổ chuyên môn cần đào tạo riêng online: {EMAIL}</div>
</div>"""
    return [s1, s2, s3, s4, s5, s6]

GF = "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;700;800&amp;family=Patrick+Hand&amp;display=swap"
FACES = """@font-face{font-family:'Be Vietnam Pro';src:url(file:///root/.fonts/BeVietnamPro-400.ttf);font-weight:400}
@font-face{font-family:'Be Vietnam Pro';src:url(file:///root/.fonts/BeVietnamPro-500.ttf);font-weight:500}
@font-face{font-family:'Be Vietnam Pro';src:url(file:///root/.fonts/BeVietnamPro-700.ttf);font-weight:700}
@font-face{font-family:'Be Vietnam Pro';src:url(file:///root/.fonts/BeVietnamPro-800.ttf);font-weight:800}
@font-face{font-family:'Patrick Hand';src:url(file:///root/.fonts/PatrickHand.ttf)}"""
NAMES = ["Main", "Ban-02-Thu-tu-tep", "Ban-03-Mot-bai-hoc", "Ban-04-Doi-cho-lop", "Ban-05-Can-cu", "Ban-06-Mua-o-dau"]
TITLES = ["Ảnh bán 1 · Trọn bộ", "Ảnh bán 2 · Thứ tự tệp", "Ảnh bán 3 · Một bài học", "Ảnh bán 4 · Đổi cho lớp", "Ảnh bán 5 · Căn cứ", "Ảnh bán 6 · Mua ở đâu"]
os.makedirs('sales_html', exist_ok=True); os.makedirs('canvas/project', exist_ok=True)
local = {n: f"file://{B}/sales_assets/{n}.png" for n in IMGS}
for i, body in enumerate(build(local)):
    open(f'sales_html/Anh-ban-{i+1:02d}.html', 'w').write(f"<!doctype html><html lang='vi'><head><meta charset='utf-8'><style>{FACES}\nbody{{margin:0}}</style></head><body>{body}</body></html>")
json.dump([[f'Anh-ban-{i+1:02d}', WW, HH] for i in range(6)], open('sales_html/list.json', 'w'))
if os.path.exists('sales_assets/blobs.json'):
    blobs = json.load(open('sales_assets/blobs.json'))
    for i, body in enumerate(build(blobs)):
        open(f'canvas/project/{NAMES[i]}.dc.html', 'w').write(f"""<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<title>{TITLES[i]}</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="stylesheet" href="{GF}">
<style>
body{{margin:0;font-family:{SANS};color:{G}}}
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
""")
    print('dc written')
print('ok', N, 'levels', lv_code, LV)
