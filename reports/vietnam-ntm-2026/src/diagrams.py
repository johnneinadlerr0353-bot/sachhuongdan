"""Consulting-style diagrams: Minto pyramid, transmission channels and roadmap.

Square corners, hairline rules, numbered markers and one accent colour per level.
Run from the report folder: PYTHONPATH=src python3 src/diagrams.py
"""
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, Polygon, Circle, FancyArrowPatch
from style import *

LW = 0.7


def rect(ax, x, y, w, h, fc, ec="none", lw=LW, z=1):
    ax.add_patch(Rectangle((x, y), w, h, fc=fc, ec=ec, lw=lw, zorder=z))


def label(ax, x, y, t, **k):
    base = dict(fontsize=7, fontweight="bold", color=BLUE, va="top", ha="left")
    base.update(k)
    ax.text(x, y, t, **base)


def num(ax, x, y, n, fc=BLUE, r=0.016, fs=7.5):
    ax.add_patch(Circle((x, y), r, fc=fc, ec="none", zorder=5, transform=ax.transData))
    ax.text(x, y - 0.001, str(n), ha="center", va="center", color="white", fontsize=fs, fontweight="bold", zorder=6)


def elbow(ax, pts, c=NAVY, lw=LW, arrow=True):
    xs, ys = zip(*pts)
    ax.plot(xs[:-1] + (xs[-1],), ys[:-1] + (ys[-1],), color=c, lw=lw, solid_capstyle="butt", zorder=2)
    if arrow:
        ax.add_patch(FancyArrowPatch(pts[-2], pts[-1], arrowstyle="-|>", mutation_scale=7, color=c, lw=lw, zorder=3))


def canvas(h):
    fig, ax = plt.subplots(figsize=(W, h))
    ax.set_xlim(0, 1)
    ax.set_ylim(0, h / W)
    ax.set_aspect("equal")
    ax.axis("off")
    fig.subplots_adjust(0, 0, 1, 1)
    return fig, ax, h / W


# --------------------------------------------------------------------------
def pyramid():
    fig, ax, H = canvas(4.15)
    gx, gw, gh = 0.1, 0.8, 0.15
    gy = H - 0.012 - gh
    rect(ax, gx, gy, gw, gh, NAVY)
    rect(ax, gx, gy + gh - 0.006, gw, 0.006, CYAN, z=2)
    label(ax, gx + 0.025, gy + gh - 0.024, "GOVERNING THOUGHT", color=CYAN)
    ax.text(gx + 0.025, gy + 0.058,
            "Vietnam is ASEAN's most exposed economy to EU non-tariff measures.\n"
            "The exposure is the price of its success in Europe and it can become\n"
            "an advantage if delivery runs faster than the rules.",
            color="white", fontsize=9.2, fontweight="bold", va="center", linespacing=1.45)
    bar_y = gy - 0.035
    cols, cw = [0.0, 0.34, 0.68], 0.32
    ax.plot([0.5, 0.5], [gy, bar_y], color=NAVY, lw=LW)
    ax.plot([cols[0] + cw / 2, cols[2] + cw / 2], [bar_y, bar_y], color=NAVY, lw=LW)
    keys = [
        ("EXPOSURE", "The highest exposure\nin ASEAN", ["USD 56.2 bn exported to the EU\nin 2025, 10.9% of GDP",
                                                      "81.4% of it in NTM-sensitive\nproduct groups",
                                                      "8.8% of GDP NTM-sensitive,\nmore than twice any peer"]),
        ("PRESSURE POINTS", "Steel and coffee carry\nthe sharpest risk", ["Metals 18.8% of exports to the\nEU; CBAM live since 1 Jan 2026",
                                                                 "CBAM bill on steel: EUR 10 m\n(2026) to EUR 407 m (2034)",
                                                                 "Coffee 3.9% of exports to the\nEU; EUDR from 30 Dec 2026"]),
        ("RESPONSE", "Delivery, not law,\nis the constraint", ["Quality Law, Green Taxonomy\nand ETS pilot in place",
                                                         "Plot data, verified emissions\nand clean power still lag",
                                                         "Five actions: data, carbon price,\nclean energy, capital, ASEAN"]),
    ]
    kh = 0.115
    ky = bar_y - 0.025 - kh
    for i, (tag, head, ev) in enumerate(keys):
        x = cols[i]
        ax.plot([x + cw / 2, x + cw / 2], [bar_y, ky + kh], color=NAVY, lw=LW)
        rect(ax, x, ky, cw, kh, BLUE)
        num(ax, x + 0.03, ky + kh - 0.026, i + 1, fc=NAVY, r=0.013, fs=7)
        ax.text(x + 0.053, ky + kh - 0.026, tag, color=ICE, fontsize=6.6, fontweight="bold", va="center")
        ax.text(x + 0.02, ky + 0.042, head, color="white", fontsize=9, fontweight="bold", va="center", linespacing=1.3)
        bh, g = 0.07, 0.01
        for j, e in enumerate(ev):
            y0 = ky - 0.018 - (j + 1) * bh - j * g
            rect(ax, x, y0, cw, bh, "white", ec=SILVER)
            rect(ax, x, y0, 0.005, bh, BLUE if j == 0 else SKY, z=2)
            ax.text(x + 0.02, y0 + bh / 2, e, fontsize=7.4, color=INK, va="center", linespacing=1.3)
    save(fig, "ex00_pyramid")


# --------------------------------------------------------------------------
def channels():
    fig, ax, H = canvas(3.9)
    top, bot = H - 0.012, 0.012
    sx, sw = 0.0, 0.165
    rect(ax, sx, bot, sw, top - bot, NAVY)
    label(ax, sx + 0.018, top - 0.02, "SOURCE", color=CYAN)
    ax.text(sx + 0.018, top - 0.06, "EU import-\nrelated NTMs", color="white", fontsize=9, fontweight="bold", va="top", linespacing=1.25)
    for k, t in enumerate(["SPS", "TBT", "CBAM", "EUDR"]):
        yy = top - 0.19 - k * 0.056
        rect(ax, sx + 0.018, yy, sw - 0.036, 0.04, "none", ec=SKY, lw=0.6, z=3)
        ax.text(sx + sw / 2, yy + 0.02, t, color="white", fontsize=7.4, fontweight="bold", ha="center", va="center", zorder=4)
    cx, cw = 0.225, 0.44
    ch = [
        ("DIRECT", "Trade channel", "Testing, certification, MRV and due diligence\nraise the landed price of USD 56.2 bn of\nexports to the EU (2025)"),
        ("DIRECT", "Investment channel", "Investors weigh compliance cost and carbon\nintensity when they decide where to place\nnew capacity"),
        ("INDIRECT", "Supply-chain channel", "Imported inputs carry their own burden:\nUSD 115.2 bn from China in H1 2026; origin\nrules and CBAM precursor emissions"),
    ]
    bh, gap = (top - bot - 2 * 0.022) / 3, 0.022
    mids = []
    for i, (tag, head, txt) in enumerate(ch):
        yt = top - i * (bh + gap)
        y0 = yt - bh
        c = BLUE if tag == "DIRECT" else TEAL
        rect(ax, cx, y0, cw, bh, MIST)
        rect(ax, cx, y0, 0.006, bh, c, z=2)
        num(ax, cx + 0.035, yt - 0.03, i + 1, fc=c, r=0.014, fs=7)
        ax.text(cx + 0.06, yt - 0.03, tag + " IMPACT", color=c, fontsize=6.6, fontweight="bold", va="center")
        ax.text(cx + 0.06, yt - 0.062, head, fontsize=9, fontweight="bold", color=NAVY, va="center")
        ax.text(cx + 0.06, yt - 0.083, txt, fontsize=7.2, color=INK, va="top", linespacing=1.3)
        mids.append(y0 + bh / 2)
        elbow(ax, [(sx + sw, (top + bot) / 2), (0.195, (top + bot) / 2), (0.195, mids[-1]), (cx, mids[-1])])
    ox, ow = 0.735, 0.265
    by0 = 0.33
    rect(ax, ox, by0, ow, top - by0, BLUE)
    label(ax, ox + 0.018, top - 0.02, "SHORT-TERM EFFECT", color=ICE, fontsize=6.6)
    ax.text(ox + 0.018, (top + by0) / 2 - 0.01, "Higher landed price\nand slower market\naccess", color="white", fontsize=9, fontweight="bold", va="center", linespacing=1.3)
    ny1 = 0.25
    rect(ax, ox, bot, ow, ny1 - bot, NAVY)
    label(ax, ox + 0.018, ny1 - 0.02, "STRUCTURAL RISK", color=CYAN, fontsize=6.6)
    ax.text(ox + 0.018, (ny1 + bot) / 2 - 0.01, "Erosion of the cost edge\nthat EVFTA and FDI-led\nmanufacturing created", color="white", fontsize=9, fontweight="bold", va="center", linespacing=1.3)
    elbow(ax, [(cx + cw, mids[0]), (ox, mids[0])], c=BLUE)
    elbow(ax, [(cx + cw, mids[1]), (0.70, mids[1]), (0.70, 0.17), (ox, 0.17)])
    elbow(ax, [(cx + cw, mids[2]), (ox, mids[2])])
    elbow(ax, [(ox + 0.03, by0), (ox + 0.03, ny1)], c=GREY)
    ax.text(ox + 0.05, (by0 + ny1) / 2, "persists if Vietnam adapts\nslower than its peers", fontsize=6.6, color=GREY, va="center", linespacing=1.25)
    save(fig, "ex02_channels")


# --------------------------------------------------------------------------
def roadmap():
    fig, ax, H = canvas(4.55)
    x0, colw, lab_w = 0.17, 0.276, 0.155
    ph = [("STAGE 1  |  H2 2026", "Comply", NAVY), ("STAGE 2  |  2027 to 2028", "Convert", BLUE), ("STAGE 3  |  2029 to 2034", "Compete", CYAN)]
    th = 0.09
    ty = H - 0.01 - th
    for k, (st, name, c) in enumerate(ph):
        x = x0 + k * colw
        t = 0.028
        pts = [(x, ty), (x + colw - t, ty), (x + colw, ty + th / 2), (x + colw - t, ty + th), (x, ty + th)]
        if k:
            pts.append((x + t, ty + th / 2))
        ax.add_patch(Polygon(pts, closed=True, fc=c, ec="white", lw=2))
        off = 0.02 if k == 0 else t + 0.012
        ax.text(x + off, ty + th - 0.024, st, fontsize=6.6, color=ICE if c != CYAN else NAVY, fontweight="bold", va="center")
        ax.text(x + off, ty + 0.03, name, fontsize=10.5, color="white", fontweight="bold", va="center")
    actors = [
        ("Government", "regulation", ["Finish forest maps and land\nrecords; align traceability\nrules with the EU", "Build carbon-market MRV\nthe EU can recognise;\nincentives for green tech", "Domestic carbon price\ncredited against CBAM\nliability"]),
        ("Exporters", "production", ["Verified emissions data;\ngeolocation for every plot\nand lot", "Upgrade processes: EAF,\nenergy efficiency, R&D\nand skills", "Low-carbon, traceable\nproducts sold at a\npremium"]),
        ("Banks and", "investors", ["Green Credit soft loans;\nGreen Taxonomy screening\nof exporters", "Finance clean power and\ndirect power purchase\n(DPPA)", "Green bonds and\nsustainability-linked\nfinance at scale"]),
        ("ASEAN", "cooperation", ["Share verification\nmethods and forest\ndata", "Harmonise product\nstandards and\ntaxonomies", "Mutual recognition with\nEU verification\nsystems"]),
    ]
    gap = 0.012
    rh = (ty - 0.025 - 0.01 - 3 * gap) / 4
    for i, (a1, a2, cells) in enumerate(actors):
        yt = ty - 0.025 - i * (rh + gap)
        y = yt - rh
        rect(ax, 0, y, lab_w, rh, MIST)
        rect(ax, 0, y, 0.006, rh, NAVY, z=2)
        ax.text(0.02, y + rh / 2 + 0.013, a1, fontsize=8.6, fontweight="bold", color=NAVY, va="center")
        ax.text(0.02, y + rh / 2 - 0.016, a2, fontsize=7.4, color=GREY, va="center")
        for k, txt in enumerate(cells):
            x = x0 + k * colw + 0.005
            rect(ax, x, y, colw - 0.01, rh, "white", ec=SILVER)
            rect(ax, x, yt - 0.004, colw - 0.01, 0.004, [NAVY, BLUE, CYAN][k], z=2)
            ax.text(x + 0.016, y + rh / 2 - 0.002, txt, fontsize=7.3, color=INK, va="center", linespacing=1.3)
    save(fig, "ex13_roadmap")


if __name__ == "__main__":
    pyramid()
    channels()
    roadmap()
    print("diagrams done")
