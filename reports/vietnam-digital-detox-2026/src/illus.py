"""Flat editorial illustrations drawn as SVG (house palette), exported as SVG plus PNG fallback.

Run from the report folder: python3 src/illus.py
"""
import cairosvg

NAVY, BLUE, CYAN, SKY, ICE, MIST = "#051C2C", "#2251FF", "#00A9F4", "#99C2FF", "#DCE8FF", "#EEF1F4"
INK, GREY, SILVER, WHITE = "#1A1A1A", "#7A8794", "#C5CDD5", "#FFFFFF"
RED, SUN, SKIN, SKIN2, HAIR, WOOD, WOOD2 = "#E5484D", "#FFD27A", "#F1C7A5", "#D9A27E", "#1E2A36", "#B9855A", "#9C6B43"
FONT = "Liberation Sans, Arial, sans-serif"


def svg(w, h, body, bg=None):
    b = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">'
            f'<defs>{DEFS}</defs>{b}{body}</svg>')


DEFS = f"""
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="{NAVY}"/><stop offset="0.45" stop-color="#173E8C"/>
  <stop offset="0.78" stop-color="#5B86E5"/><stop offset="1" stop-color="#FFE2B0"/></linearGradient>
<linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#7FA3E8"/><stop offset="1" stop-color="#0B2B55"/></linearGradient>
<linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#EAF1FF"/><stop offset="1" stop-color="#CFDDFF"/></linearGradient>
<radialGradient id="sunglow" cx="0.5" cy="0.5" r="0.5">
  <stop offset="0" stop-color="#FFF4D6"/><stop offset="0.5" stop-color="#FFD27A" stop-opacity="0.75"/>
  <stop offset="1" stop-color="#FFD27A" stop-opacity="0"/></radialGradient>
<linearGradient id="pier" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#C69468"/><stop offset="1" stop-color="#7A5233"/></linearGradient>
"""


def phone(x, y, w, h, screen="url(#screen)", body=NAVY, r=None, rot=0):
    r = r or w * 0.14
    cx, cy = x + w / 2, y + h / 2
    s = w * 0.06
    return (f'<g transform="rotate({rot} {cx} {cy})">'
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{body}"/>'
            f'<rect x="{x + s}" y="{y + s * 1.6}" width="{w - 2 * s}" height="{h - 3.2 * s}" rx="{r * 0.55}" fill="{screen}"/>'
            f'<rect x="{cx - w * 0.12}" y="{y + s * 0.55}" width="{w * 0.24}" height="{s * 0.5}" rx="{s * 0.25}" fill="#24394F"/>'
            f'</g>')


def card(x, y, w, h, fill=WHITE, r=8, stroke=None):
    st = f' stroke="{stroke}" stroke-width="1.5"' if stroke else ""
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}"{st}/>'


def text(x, y, t, size=14, fill=NAVY, weight="bold", anchor="middle"):
    return f'<text x="{x}" y="{y}" font-family="{FONT}" font-size="{size}" font-weight="{weight}" fill="{fill}" text-anchor="{anchor}">{t}</text>'


def heart(cx, cy, s, fill=RED):
    return (f'<path d="M{cx} {cy + s * 0.9} C{cx - s * 1.4} {cy - s * 0.1} {cx - s * 0.7} {cy - s * 1.2} {cx} {cy - s * 0.35} '
            f'C{cx + s * 0.7} {cy - s * 1.2} {cx + s * 1.4} {cy - s * 0.1} {cx} {cy + s * 0.9} Z" fill="{fill}"/>')


def bell(cx, cy, s, fill=SUN):
    return (f'<path d="M{cx - s} {cy + s * 0.6} Q{cx - s} {cy - s} {cx} {cy - s} Q{cx + s} {cy - s} {cx + s} {cy + s * 0.6} Z" fill="{fill}"/>'
            f'<rect x="{cx - s * 1.2}" y="{cy + s * 0.55}" width="{s * 2.4}" height="{s * 0.3}" rx="{s * 0.15}" fill="{fill}"/>'
            f'<circle cx="{cx}" cy="{cy + s * 1.05}" r="{s * 0.25}" fill="{fill}"/>')


def thumb(cx, cy, s, fill=BLUE):
    return (f'<rect x="{cx - s}" y="{cy - s * 0.1}" width="{s * 0.45}" height="{s * 1.1}" rx="{s * 0.1}" fill="{fill}"/>'
            f'<path d="M{cx - s * 0.45} {cy - s * 0.1} L{cx - s * 0.1} {cy - s * 0.9} Q{cx + s * 0.15} {cy - s * 1.25} {cx + s * 0.2} {cy - s * 0.7} '
            f'L{cx + s * 0.1} {cy - s * 0.25} L{cx + s * 0.85} {cy - s * 0.25} Q{cx + s * 1.1} {cy - s * 0.2} {cx + s} {cy + s * 0.15} '
            f'L{cx + s * 0.8} {cy + s} L{cx - s * 0.45} {cy + s} Z" fill="{fill}"/>')


def person_meditate(cx, base, s, body=NAVY, skin=SKIN2):
    """Seated figure in lotus pose seen from behind, as a clean silhouette."""
    return (f'<ellipse cx="{cx}" cy="{base - s * 0.14}" rx="{s * 0.92}" ry="{s * 0.2}" fill="{body}"/>'
            f'<circle cx="{cx - s * 0.74}" cy="{base - s * 0.2}" r="{s * 0.2}" fill="{body}"/>'
            f'<circle cx="{cx + s * 0.74}" cy="{base - s * 0.2}" r="{s * 0.2}" fill="{body}"/>'
            f'<path d="M{cx - s * 0.44} {base - s * 0.2} C{cx - s * 0.3} {base - s * 0.6} {cx - s * 0.58} {base - s * 0.95} {cx - s * 0.5} {base - s * 1.15} '
            f'Q{cx} {base - s * 1.32} {cx + s * 0.5} {base - s * 1.15} C{cx + s * 0.58} {base - s * 0.95} {cx + s * 0.3} {base - s * 0.6} {cx + s * 0.44} {base - s * 0.2} Z" fill="{body}"/>'
            f'<path d="M{cx - s * 0.5} {base - s * 1.1} Q{cx - s * 0.86} {base - s * 0.62} {cx - s * 0.74} {base - s * 0.28}" stroke="{body}" stroke-width="{s * 0.16}" fill="none" stroke-linecap="round"/>'
            f'<path d="M{cx + s * 0.5} {base - s * 1.1} Q{cx + s * 0.86} {base - s * 0.62} {cx + s * 0.74} {base - s * 0.28}" stroke="{body}" stroke-width="{s * 0.16}" fill="none" stroke-linecap="round"/>'
            f'<rect x="{cx - s * 0.1}" y="{base - s * 1.36}" width="{s * 0.2}" height="{s * 0.16}" fill="{body}"/>'
            f'<circle cx="{cx}" cy="{base - s * 1.52}" r="{s * 0.26}" fill="{body}"/>'
            f'<circle cx="{cx}" cy="{base - s * 1.84}" r="{s * 0.13}" fill="{body}"/>')


def karst(x, base, w, h, fill):
    return (f'<path d="M{x} {base} Q{x + w * 0.05} {base - h * 0.9} {x + w * 0.3} {base - h} Q{x + w * 0.55} {base - h * 1.05} '
            f'{x + w * 0.7} {base - h * 0.7} Q{x + w * 0.95} {base - h * 0.55} {x + w} {base} Z" fill="{fill}"/>')


# ------------------------------------------------------------------ illustrations
def cover_scene():
    W, H = 2480, 1900
    b = f'<rect width="{W}" height="{H}" fill="url(#sky)"/>'
    b += f'<circle cx="1640" cy="1060" r="520" fill="url(#sunglow)"/><circle cx="1640" cy="1060" r="120" fill="#FFF1CC"/>'
    # karst islands (Ha Long Bay)
    for x, w, h, c in [(80, 360, 300, "#2C4E8F"), (380, 260, 420, "#244680"), (1960, 300, 380, "#2A4C8C"), (2180, 300, 250, "#36599A"),
                       (1120, 220, 180, "#4A6EB0"), (1300, 160, 130, "#5A7EC0")]:
        b += karst(x, 1140, w, h, c)
    b += f'<rect y="1140" width="{W}" height="{H - 1140}" fill="url(#sea)"/>'
    for i in range(14):
        y = 1170 + i * 34
        b += f'<rect x="{1460 - i * 12}" y="{y}" width="{360 + i * 24}" height="6" rx="3" fill="#FFE7B8" opacity="{0.55 - i * 0.035:.2f}"/>'
    # pier in perspective
    b += f'<path d="M560 {H} L1240 1300 L2480 1300 L2480 {H} Z" fill="url(#pier)"/>'
    for i in range(9):
        y = 1300 + (i + 1) ** 1.62 * 14
        if y < H:
            b += f'<line x1="{560 + (H - y) / (H - 1300) * 680 * 0 + (1240 - 560) * (H - y) / (H - 1300)}" y1="{y}" x2="2480" y2="{y}" stroke="#6B4528" stroke-width="5" opacity="0.55"/>'
    # railing posts
    for i, x in enumerate([1260, 1420, 1600, 1810, 2060, 2350]):
        top = 1150 - i * 22
        b += f'<rect x="{x}" y="{top}" width="{18 + i * 4}" height="{1300 - top + 20}" fill="#5A3B22"/>'
    b += '<path d="M1250 1170 L2480 1040" stroke="#5A3B22" stroke-width="16"/>'
    # person
    b += person_meditate(1700, 1450, 230, body="#0A1A2C")
    # phone face down on pier, foreground
    b += '<g transform="rotate(-14 900 1700)"><rect x="700" y="1630" width="420" height="190" rx="34" fill="#0A1622"/>' \
         '<rect x="712" y="1642" width="396" height="166" rx="26" fill="#1B2C3E"/><rect x="760" y="1668" width="70" height="70" rx="18" fill="#0A1622"/><circle cx="795" cy="1703" r="20" fill="#24394F"/></g>'
    b += '<ellipse cx="910" cy="1830" rx="260" ry="26" fill="#3B2615" opacity="0.5"/>'
    # muted bell icon floating
    b += f'<g opacity="0.95">{bell(1015, 1500, 34, fill=WHITE)}<line x1="968" y1="1462" x2="1062" y2="1556" stroke="{WHITE}" stroke-width="9" stroke-linecap="round"/></g>'
    return svg(W, H, b)


def slot_phone():
    W, H = 600, 420
    b = f'<circle cx="300" cy="215" r="185" fill="{ICE}"/>'
    b += phone(195, 40, 210, 350)
    b += card(218, 110, 164, 120, fill=NAVY, r=12)
    for i, (x, f) in enumerate([(245, "h"), (300, "t"), (355, "b")]):
        b += card(x - 22, 128, 44, 84, fill=WHITE, r=6)
        b += heart(x, 170, 13) if f == "h" else thumb(x, 172, 14) if f == "t" else bell(x, 166, 13, fill="#F2A900")
    b += text(300, 258, "PULL TO REFRESH", 13, BLUE)
    b += '<path d="M300 280 l-12 -12 m12 12 l12 -12" stroke="#2251FF" stroke-width="4" fill="none" stroke-linecap="round"/>'
    # lever
    b += f'<rect x="405" y="200" width="18" height="40" rx="6" fill="{GREY}"/><line x1="423" y1="220" x2="470" y2="130" stroke="{GREY}" stroke-width="9" stroke-linecap="round"/><circle cx="472" cy="124" r="20" fill="{RED}"/>'
    for (x, y, s) in [(120, 120, 12), (110, 300, 9), (500, 300, 11)]:
        b += f'<g opacity="0.85">{heart(x, y, s)}</g>'
    b += f'<text x="470" y="80" font-family="{FONT}" font-size="30" font-weight="bold" fill="{BLUE}">?</text>'
    return svg(W, H, b)


def infinite_scroll():
    W, H = 600, 420
    b = f'<circle cx="300" cy="215" r="185" fill="{ICE}"/>'
    b += phone(205, 30, 190, 330)
    for i in range(5):
        y = 70 + i * 72
        op = 1 if y < 320 else 0.35
        b += f'<g opacity="{op}">{card(222, y, 156, 60, fill=WHITE, r=8)}<rect x="232" y="{y + 10}" width="40" height="40" rx="6" fill="{SKY}"/>' \
             f'<rect x="282" y="{y + 14}" width="84" height="9" rx="4" fill="{SILVER}"/><rect x="282" y="{y + 32}" width="60" height="9" rx="4" fill="{SILVER}"/></g>'
    b += card(222, 380, 156, 30, fill=WHITE, r=8).replace("/>", ' opacity="0.25"/>')
    # infinity
    b += f'<path d="M455 120 C470 95 505 95 505 120 C505 145 470 145 455 120 C440 95 405 95 405 120 C405 145 440 145 455 120 Z" fill="none" stroke="{BLUE}" stroke-width="9"/>'
    b += f'<line x1="140" y1="110" x2="140" y2="320" stroke="{NAVY}" stroke-width="6" stroke-linecap="round"/><path d="M122 300 L140 330 L158 300" fill="none" stroke="{NAVY}" stroke-width="6" stroke-linecap="round"/>'
    b += text(140, 95, "NO END", 14, NAVY, "bold")
    return svg(W, H, b)


def red_badge():
    W, H = 600, 420
    b = f'<circle cx="300" cy="215" r="185" fill="{ICE}"/>'
    b += phone(195, 30, 210, 360)
    cols = [BLUE, CYAN, NAVY, "#5B86E5", SKY, BLUE, NAVY, CYAN, "#5B86E5"]
    badges = {0: "9+", 2: "3", 4: "27", 7: "1"}
    for i in range(9):
        x = 228 + (i % 3) * 52
        y = 80 + (i // 3) * 62
        b += f'<rect x="{x}" y="{y}" width="40" height="40" rx="10" fill="{cols[i]}"/>'
        if i in badges:
            b += f'<circle cx="{x + 38}" cy="{y + 2}" r="13" fill="{RED}" stroke="white" stroke-width="2.5"/>' + text(x + 38, y + 7, badges[i], 12, WHITE)
    # hand / finger tapping
    b += f'<path d="M318 300 L318 250 Q318 236 331 236 Q344 236 344 250 L344 285 L380 292 Q398 296 396 316 L388 380 L322 380 Z" fill="{SKIN}" stroke="{SKIN2}" stroke-width="2"/>'
    b += f'<circle cx="331" cy="232" r="22" fill="none" stroke="{RED}" stroke-width="3" opacity="0.7"/><circle cx="331" cy="232" r="34" fill="none" stroke="{RED}" stroke-width="2" opacity="0.35"/>'
    return svg(W, H, b)


def echo_chamber():
    W, H = 600, 420
    b = f'<circle cx="300" cy="215" r="170" fill="{ICE}" stroke="{SKY}" stroke-width="6"/>'
    b += f'<circle cx="300" cy="215" r="170" fill="none" stroke="{BLUE}" stroke-width="2" stroke-dasharray="6 8"/>'
    # head profile
    b += f'<path d="M262 330 L262 285 Q228 268 230 225 Q232 160 300 155 Q356 152 366 205 L380 232 L366 238 L366 262 Q366 280 340 282 L330 282 L330 330 Z" fill="{NAVY}"/>'
    for (x, y, k) in [(160, 150, "t"), (440, 150, "t"), (150, 280, "t"), (445, 285, "t"), (300, 80, "t"), (300, 360, "t")]:
        b += thumb(x, y, 22, fill=BLUE)
    for (x, y) in [(205, 95), (395, 95), (200, 345), (400, 350)]:
        b += f'<path d="M{x} {y} q12 -12 24 0" stroke="{SKY}" stroke-width="4" fill="none"/>'
    # blocked other views outside
    for (x, y) in [(60, 90), (540, 340)]:
        b += f'<rect x="{x - 22}" y="{y - 16}" width="44" height="32" rx="6" fill="{SILVER}"/>' \
             f'<line x1="{x - 16}" y1="{y + 14}" x2="{x + 16}" y2="{y - 14}" stroke="{RED}" stroke-width="4"/>'
    return svg(W, H, b)


def focus_bean():
    W, H = 600, 420
    b = f'<circle cx="300" cy="215" r="185" fill="{ICE}"/>'
    # timer card
    b += card(360, 70, 170, 92, fill=NAVY, r=14) + text(445, 128, "25:00", 40, WHITE) + text(445, 150, "FOCUS MODE ON", 11, SKY)
    # bean character
    b += '<path d="M190 330 Q150 300 160 230 Q170 150 235 140 Q300 132 318 200 Q336 268 300 320 Q270 352 230 348 Q205 345 190 330 Z" fill="#C8875A"/>'
    b += '<path d="M232 142 Q238 112 256 104" stroke="#3E8E5A" stroke-width="6" fill="none" stroke-linecap="round"/>' \
         '<ellipse cx="266" cy="104" rx="16" ry="8" fill="#5DB37A" transform="rotate(-25 266 104)"/>'
    b += f'<circle cx="222" cy="208" r="7" fill="{NAVY}"/><circle cx="268" cy="206" r="7" fill="{NAVY}"/>' \
         f'<path d="M230 232 Q245 244 260 232" stroke="{NAVY}" stroke-width="4" fill="none" stroke-linecap="round"/>' \
         '<circle cx="205" cy="226" r="9" fill="#E79A7F" opacity="0.7"/><circle cx="285" cy="224" r="9" fill="#E79A7F" opacity="0.7"/>'
    # knitting needles and scarf
    b += f'<line x1="200" y1="270" x2="320" y2="300" stroke="{GREY}" stroke-width="5" stroke-linecap="round"/>' \
         f'<line x1="210" y1="300" x2="330" y2="268" stroke="{GREY}" stroke-width="5" stroke-linecap="round"/>'
    for i in range(6):
        b += f'<rect x="{252 + i * 3}" y="{292 + i * 16}" width="56" height="15" rx="5" fill="{BLUE if i % 2 == 0 else CYAN}"/>'
    b += f'<circle cx="150" cy="340" r="24" fill="{SKY}"/><path d="M130 330 q20 10 40 0 M128 345 q22 10 44 0" stroke="{BLUE}" stroke-width="3" fill="none"/>'
    # locked apps
    b += card(390, 210, 120, 120, fill=WHITE, r=14, stroke=SILVER)
    for i in range(4):
        x = 408 + (i % 2) * 50; y = 228 + (i // 2) * 50
        b += f'<rect x="{x}" y="{y}" width="34" height="34" rx="8" fill="{SILVER}"/>'
    b += f'<rect x="436" y="262" width="28" height="22" rx="4" fill="{NAVY}"/><path d="M441 262 v-8 a9 9 0 0 1 18 0 v8" stroke="{NAVY}" stroke-width="4" fill="none"/>'
    return svg(W, H, b)


def phone_bed():
    W, H = 600, 420
    b = f'<rect width="{W}" height="{H}" rx="18" fill="#0B1E33"/>'
    b += f'<circle cx="500" cy="80" r="34" fill="#FFF1CC"/><circle cx="516" cy="70" r="30" fill="#0B1E33"/>'
    for (x, y) in [(90, 60), (180, 110), (400, 50), (300, 90), (560, 160)]:
        b += f'<circle cx="{x}" cy="{y}" r="3" fill="#FFF1CC"/>'
    # nightstand
    b += f'<rect x="130" y="250" width="340" height="150" rx="10" fill="#E9EEF5"/><rect x="150" y="300" width="300" height="10" rx="5" fill="{SILVER}"/>'
    # lamp
    b += f'<rect x="395" y="170" width="8" height="80" fill="{GREY}"/><path d="M365 175 L433 175 L415 130 L383 130 Z" fill="{SUN}"/>' \
         '<path d="M365 175 L300 250 L498 250 L433 175 Z" fill="#FFF1CC" opacity="0.25"/>'
    # mini bed with phone
    b += f'<rect x="170" y="200" width="200" height="40" rx="6" fill="{WHITE}"/><rect x="160" y="160" width="14" height="90" rx="5" fill="{WHITE}"/>' \
         f'<rect x="366" y="185" width="12" height="65" rx="5" fill="{WHITE}"/>'
    b += f'<g transform="rotate(-90 230 205)"><rect x="200" y="160" width="60" height="110" rx="10" fill="{NAVY}"/></g>'
    b += f'<rect x="210" y="190" width="150" height="34" rx="8" fill="{BLUE}"/><rect x="176" y="190" width="40" height="22" rx="8" fill="{ICE}"/>'
    b += text(300, 150, "z", 26, SKY) + text(326, 125, "z", 32, SKY) + text(356, 96, "z", 40, SKY)
    b += f'<rect x="420" y="215" width="40" height="34" rx="6" fill="{WHITE}"/>' + text(440, 238, "7h", 13, BLUE)
    return svg(W, H, b)


def signal_wrapper():
    W, H = 600, 420
    b = f'<circle cx="300" cy="215" r="185" fill="{ICE}"/>'
    b += '<path d="M150 150 L190 120 L410 120 L450 150 L450 290 L410 320 L190 320 L150 290 Z" fill="#D62F38"/>'
    for i in range(7):
        b += f'<line x1="{150 + i * 0}" y1="{150 + i * 20}" x2="{165}" y2="{140 + i * 20}" stroke="#A9232B" stroke-width="3"/>'
        b += f'<line x1="{450}" y1="{150 + i * 20}" x2="{435}" y2="{140 + i * 20}" stroke="#A9232B" stroke-width="3"/>'
    b += '<rect x="190" y="150" width="220" height="140" rx="10" fill="#B8262E"/>'
    b += text(300, 205, "BREAK", 40, WHITE) + text(300, 238, "TIME", 26, "#FFD2D4")
    # no-signal icon
    b += '<g transform="translate(300 268)">' + "".join(
        f'<rect x="{-30 + i * 16}" y="{-6 - i * 8}" width="10" height="{10 + i * 8}" rx="2" fill="#FFD2D4"/>' for i in range(4)) + \
         '<line x1="-36" y1="10" x2="34" y2="-40" stroke="white" stroke-width="5" stroke-linecap="round"/></g>'
    b += text(300, 370, "Wi-Fi, mobile data and GPS blocked", 15, NAVY, "bold")
    return svg(W, H, b)


def school_locker():
    W, H = 600, 420
    b = f'<circle cx="300" cy="215" r="185" fill="{ICE}"/>'
    b += f'<rect x="110" y="120" width="250" height="230" rx="12" fill="{NAVY}"/>'
    for r in range(3):
        for c in range(3):
            x = 125 + c * 78; y = 135 + r * 70
            b += f'<rect x="{x}" y="{y}" width="68" height="60" rx="6" fill="#16304A"/>'
            b += f'<rect x="{x + 22}" y="{y + 8}" width="24" height="42" rx="5" fill="{SKY if (r + c) % 2 else CYAN}"/>'
            b += f'<circle cx="{x + 60}" cy="{y + 30}" r="3" fill="{SILVER}"/>'
    b += text(235, 104, "PHONES OFF, LEARNING ON", 14, NAVY)
    # two kids playing (simple)
    for (x, c) in [(430, BLUE), (500, CYAN)]:
        b += f'<circle cx="{x}" cy="232" r="18" fill="{SKIN}"/><rect x="{x - 18}" y="252" width="36" height="58" rx="14" fill="{c}"/>' \
             f'<line x1="{x - 8}" y1="308" x2="{x - 14}" y2="345" stroke="{NAVY}" stroke-width="8" stroke-linecap="round"/>' \
             f'<line x1="{x + 8}" y1="308" x2="{x + 14}" y2="345" stroke="{NAVY}" stroke-width="8" stroke-linecap="round"/>'
    b += f'<circle cx="465" cy="355" r="14" fill="{WHITE}" stroke="{NAVY}" stroke-width="3"/>'
    b += f'<path d="M448 270 Q465 255 482 270" stroke="{SKIN2}" stroke-width="7" fill="none" stroke-linecap="round"/>'
    return svg(W, H, b)


def calm_bank():
    W, H = 600, 420
    b = f'<circle cx="300" cy="215" r="185" fill="{ICE}"/>'
    b += phone(205, 25, 190, 370)
    b += text(300, 85, "Good morning, Lan", 13, NAVY, "bold")
    b += card(222, 98, 156, 62, fill=NAVY, r=10) + text(236, 122, "Available balance", 10, SKY, "normal", "start") + text(236, 146, "18,450,000 VND", 15, WHITE, "bold", "start")
    items = [("Salary received", CYAN), ("Bill due in 3 days", "#F2A900"), ("Spending 12% below May", BLUE)]
    for i, (t, c) in enumerate(items):
        y = 172 + i * 46
        b += card(222, y, 156, 38, fill=WHITE, r=8) + f'<circle cx="238" cy="{y + 19}" r="6" fill="{c}"/>' + text(250, y + 23, t, 10, NAVY, "normal", "start")
    b += card(222, 314, 156, 34, fill=BLUE, r=17) + text(300, 336, "Done in 30 seconds", 12, WHITE)
    # check badge
    b += f'<circle cx="440" cy="110" r="34" fill="{WHITE}" stroke="{CYAN}" stroke-width="5"/><path d="M424 110 L436 122 L458 98" stroke="{CYAN}" stroke-width="7" fill="none" stroke-linecap="round"/>'
    b += f'<circle cx="150" cy="300" r="30" fill="{WHITE}" stroke="{SKY}" stroke-width="4"/><path d="M150 284 L150 300 L162 308" stroke="{NAVY}" stroke-width="5" fill="none" stroke-linecap="round"/>'
    return svg(W, H, b)


def icon_grid():
    """Five areas where digital detox helps, as one row of icon cards."""
    W, H = 1300, 330
    items = [("Mental well-being", "brain"), ("Sleep quality", "moon"), ("Physical health", "eye"), ("Attention", "target"), ("Relationships", "people")]
    b = ""
    for i, (lab, ic) in enumerate(items):
        x = 10 + i * 258
        b += card(x, 10, 240, 310, fill=MIST, r=4) + f'<rect x="{x}" y="10" width="240" height="6" fill="{BLUE if i % 2 == 0 else NAVY}"/>'
        cx, cy = x + 120, 130
        b += f'<circle cx="{cx}" cy="{cy}" r="62" fill="{NAVY}"/>'
        if ic == "brain":
            b += f'<path d="M{cx - 30} {cy + 20} Q{cx - 44} {cy} {cx - 30} {cy - 14} Q{cx - 30} {cy - 36} {cx - 8} {cy - 34} Q{cx} {cy - 44} {cx + 12} {cy - 34} Q{cx + 34} {cy - 36} {cx + 32} {cy - 12} Q{cx + 44} {cy + 4} {cx + 28} {cy + 22} Q{cx + 20} {cy + 34} {cx} {cy + 28} Q{cx - 20} {cy + 34} {cx - 30} {cy + 20} Z" fill="none" stroke="white" stroke-width="5"/><line x1="{cx}" y1="{cy - 34}" x2="{cx}" y2="{cy + 28}" stroke="white" stroke-width="4"/>'
        elif ic == "moon":
            b += f'<circle cx="{cx - 4}" cy="{cy}" r="32" fill="{SUN}"/><circle cx="{cx + 12}" cy="{cy - 12}" r="28" fill="{NAVY}"/>' + text(cx + 30, cy + 26, "z", 22, SKY)
        elif ic == "eye":
            b += f'<path d="M{cx - 42} {cy} Q{cx} {cy - 38} {cx + 42} {cy} Q{cx} {cy + 38} {cx - 42} {cy} Z" fill="none" stroke="white" stroke-width="5"/><circle cx="{cx}" cy="{cy}" r="14" fill="{CYAN}"/>'
        elif ic == "target":
            b += f'<circle cx="{cx}" cy="{cy}" r="36" fill="none" stroke="white" stroke-width="5"/><circle cx="{cx}" cy="{cy}" r="20" fill="none" stroke="white" stroke-width="5"/><circle cx="{cx}" cy="{cy}" r="6" fill="{CYAN}"/>'
        else:
            for dx, c in ((-18, "white"), (18, CYAN)):
                b += f'<circle cx="{cx + dx}" cy="{cy - 14}" r="13" fill="{c}"/><path d="M{cx + dx - 22} {cy + 30} Q{cx + dx - 22} {cy + 2} {cx + dx} {cy + 2} Q{cx + dx + 22} {cy + 2} {cx + dx + 22} {cy + 30} Z" fill="{c}"/>'
        b += text(cx, 240, f"0{i + 1}", 20, BLUE)
        b += text(cx, 275, lab, 21, NAVY)
    return svg(W, H, b)


def dopamine_loop():
    W, H = 1300, 770
    cx, cy, R = 650, 385, 215
    b = f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="none" stroke="{SKY}" stroke-width="10"/>'
    b += f'<circle cx="{cx}" cy="{cy}" r="120" fill="{NAVY}"/>' + text(cx, cy - 8, "DOPAMINE", 26, WHITE) + text(cx, cy + 26, "LOOP", 26, CYAN)
    stages = [("1", "Trigger", "Stress, boredom or a", "notification", -90, "#5B86E5"),
              ("2", "Anticipation", "Dopamine rises before", "the reward arrives", 0, BLUE),
              ("3", "Action and reward", "Open the app, refresh;", "likes and new content", 90, NAVY),
              ("4", "Learning", "The brain links trigger", "and reward; habit forms", 180, CYAN)]
    import math
    for n, t, l1, l2, ang, c in stages:
        a = math.radians(ang)
        x, y = cx + R * math.cos(a), cy + R * math.sin(a)
        b += f'<circle cx="{x}" cy="{y}" r="44" fill="{c}" stroke="white" stroke-width="8"/>' + text(x, y + 12, n, 34, WHITE)
        if ang == -90:
            tx, ty, an = x, y - 130, "middle"
        elif ang == 90:
            tx, ty, an = x, y + 86, "middle"
        elif ang == 0:
            tx, ty, an = x + 66, y - 10, "start"
        else:
            tx, ty, an = x - 66, y - 10, "end"
        b += text(tx, ty, t, 30, NAVY, "bold", an) + text(tx, ty + 32, l1, 24, INK, "normal", an) + text(tx, ty + 60, l2, 24, INK, "normal", an)
    for ang in (-45, 45, 135, 225):
        a = math.radians(ang)
        x, y = cx + R * math.cos(a), cy + R * math.sin(a)
        rot = ang + 90
        b += f'<path d="M{x - 14} {y - 12} L{x + 14} {y} L{x - 14} {y + 12} Z" fill="{BLUE}" transform="rotate({rot} {x} {y})"/>'
    return svg(W, H, b)


ALL = {
    "cover_scene": cover_scene, "il_slot": slot_phone, "il_scroll": infinite_scroll, "il_badge": red_badge,
    "il_echo": echo_chamber, "il_bean": focus_bean, "il_bed": phone_bed, "il_wrapper": signal_wrapper,
    "il_school": school_locker, "il_bank": calm_bank, "il_icons": icon_grid, "il_loop": dopamine_loop,
}

if __name__ == "__main__":
    for name, fn in ALL.items():
        s = fn()
        if name not in ("cover_scene", "il_bed", "il_icons", "il_loop"):
            s = s.replace("<defs>", '<rect width="100%" height="100%" fill="white"/><defs>', 1)
        open(f"illus/{name}.svg", "w").write(s)
        scale = 1 if name == "cover_scene" else 3
        cairosvg.svg2png(bytestring=s.encode(), write_to=f"illus/{name}.png", scale=scale)
    print("illustrations done:", len(ALL))
