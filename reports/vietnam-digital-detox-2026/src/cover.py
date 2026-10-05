"""Cover and back page built from the cover illustration (src/illus.py) in the house palette."""
from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageFilter, ImageEnhance
import numpy as np

W, H = 2480, 3508  # A4 at 300 dpi
NAVY, BLUE, CYAN, SKY, GREY = (5, 28, 44), (34, 81, 255), (0, 169, 244), (153, 194, 255), (107, 119, 133)
F = "/root/.fonts/"
L = "/usr/share/fonts/truetype/liberation/"
font = lambda p, s: ImageFont.truetype(p, s)


def duotone(img, stops):
    g = np.asarray(ImageOps.autocontrast(img.convert("L"), cutoff=1), dtype=float) / 255.0
    g = np.clip((g - 0.04) / 0.92, 0, 1) ** 0.85
    pos = np.array([s[0] for s in stops]); cols = np.array([s[1] for s in stops], dtype=float)
    out = np.stack([np.interp(g, pos, cols[:, c]) for c in range(3)], axis=-1)
    return Image.fromarray(out.astype(np.uint8))


def photo(box_w, box_h, focus_x=0.42):
    src = Image.open("assets/danang_bridge.jpg").convert("RGB")
    r = box_w / box_h
    sw, sh = src.size
    if sw / sh > r:
        cw = int(sh * r); x0 = int(max(0, min(sw - cw, focus_x * sw - cw / 2)))
        src = src.crop((x0, 0, x0 + cw, sh))
    else:
        ch = int(sw / r); src = src.crop((0, (sh - ch) // 2, sw, (sh - ch) // 2 + ch))
    src = src.resize((box_w, box_h), Image.LANCZOS).filter(ImageFilter.UnsharpMask(radius=2, percent=60))
    return duotone(src, [(0.0, (3, 13, 22)), (0.4, (9, 38, 66)), (0.78, (44, 96, 214)), (1.0, (226, 236, 255))])


def spaced(d, xy, text, f, fill, spacing):
    x, y = xy
    for ch in text:
        d.text((x, y), ch, font=f, fill=fill)
        x += d.textlength(ch, font=f) + spacing


logo = Image.open("assets/abrighter_logo.png").convert("RGB")

# ------------------------------------------------------------------ cover
im = Image.new("RGB", (W, H), "white")
d = ImageDraw.Draw(im)
top_h, ph_h = 470, 1900
lw = 640; lg = logo.resize((lw, int(logo.height * lw / logo.width)), Image.LANCZOS)
im.paste(lg, (W - 170 - lw, (top_h - lg.height) // 2))
d.rectangle([170, 175, 182, 300], fill=BLUE)
spaced(d, (215, 178), "RESEARCH INTELLIGENCE", font(L + "LiberationSans-Bold.ttf", 44), NAVY, 6)
d.text((215, 248), "Vietnam Consumer Series", font=font(L + "LiberationSans-Regular.ttf", 40), fill=GREY)
im.paste(Image.open("illus/cover_scene.png").convert("RGB").resize((W, ph_h), Image.LANCZOS), (0, top_h))
# gradient fade at the bottom of the photo for depth
d.rectangle([0, top_h + ph_h, W, top_h + ph_h + 14], fill=CYAN)
# photo caption chip
cap = "Illustration: ABrighter Research"
fcap = font(L + "LiberationSans-Regular.ttf", 30)
d.text((W - 170 - d.textlength(cap, font=fcap), top_h + ph_h - 70), cap, font=fcap, fill=(200, 215, 240))
# title block
y = top_h + ph_h + 150
spaced(d, (170, y), "OCTOBER 2026   |   DATA TO 30 SEPTEMBER 2026", font(L + "LiberationSans-Bold.ttf", 38), BLUE, 5)
d.text((165, y + 85), "Digital Detox", font=font(F + "Gelasio_600SemiBold.ttf", 150), fill=NAVY)
d.text((170, y + 290), "Restoring Balance in Vietnam's Digital Age", font=font(F + "Gelasio_400Regular.ttf", 92), fill=BLUE)
d.rectangle([170, y + 455, 330, y + 465], fill=CYAN)
d.text((170, y + 505), "Why Vietnamese consumers are stepping back from their screens",
       font=font(L + "LiberationSans-Regular.ttf", 46), fill=(60, 70, 80))
d.text((170, y + 565), "and what it means for digital banking",
       font=font(L + "LiberationSans-Regular.ttf", 46), fill=(60, 70, 80))
d.line([(170, H - 190), (W - 170, H - 190)], fill=(197, 205, 213), width=3)
d.text((170, H - 150), "ABrighter Research", font=font(L + "LiberationSans-Bold.ttf", 40), fill=NAVY)
t = "A Brighter Future for All Customers"
f2 = font(L + "LiberationSans-Regular.ttf", 36)
d.text((W - 170 - d.textlength(t, font=f2), H - 147), t, font=f2, fill=GREY)
im.save("assets/cover.jpg", dpi=(300, 300), quality=92)

# ------------------------------------------------------------------ back page
bk = Image.open("illus/cover_scene.png").convert("RGB").resize((int(H * 2480 / 1900), H), Image.LANCZOS).crop((int((H * 2480 / 1900 - W) / 2), 0, int((H * 2480 / 1900 - W) / 2) + W, H))
ov = Image.new("RGB", (W, H), NAVY)
bk = Image.blend(bk, ov, 0.55)
d = ImageDraw.Draw(bk)
card_w, card_h = 1500, 1180
cx0, cy0 = (W - card_w) // 2, 900
d.rectangle([cx0, cy0, cx0 + card_w, cy0 + card_h], fill="white")
d.rectangle([cx0, cy0, cx0 + card_w, cy0 + 16], fill=CYAN)
lw = 820; lg = logo.resize((lw, int(logo.height * lw / logo.width)), Image.LANCZOS)
bk.paste(lg, ((W - lw) // 2, cy0 + 140))
yy = cy0 + 140 + lg.height + 110
d.line([(cx0 + 200, yy), (cx0 + card_w - 200, yy)], fill=(197, 205, 213), width=3)
lines = [
    ("CONTACT US", font(L + "LiberationSans-Bold.ttf", 40), BLUE, 6),
    ("Le Dinh Thang (Alex), MA, Adv PA", font(F + "Gelasio_600SemiBold.ttf", 60), NAVY, 0),
    ("Managing Partner  |  Partner and Advisory Services Leader", font(L + "LiberationSans-Regular.ttf", 38), GREY, 0),
    ("Tel: +84 90 338 5558", font(L + "LiberationSans-Regular.ttf", 42), NAVY, 0),
    ("thang.le@abrighterconsultancy.com", font(L + "LiberationSans-Bold.ttf", 42), BLUE, 0),
]
yy += 80
for i, (t, f, c, sp) in enumerate(lines):
    w_ = d.textlength(t, font=f) + sp * len(t)
    if sp:
        spaced(d, ((W - w_) / 2, yy), t, f, c, sp)
    else:
        d.text(((W - w_) / 2, yy), t, font=f, fill=c)
    yy += [90, 100, 110, 75, 80][i]
t = "Research Intelligence  |  Vietnam Consumer Series  |  October 2026"
f = font(L + "LiberationSans-Regular.ttf", 36)
d.text(((W - d.textlength(t, font=f)) / 2, H - 260), t, font=f, fill=(200, 215, 240))
bk.save("assets/back.jpg", dpi=(300, 300), quality=90)
print("cover and back page done")
