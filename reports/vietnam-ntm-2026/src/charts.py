"""Exhibits for 'Non-Tariff Measures: Impacts and Challenges for Vietnam' (ABrighter Research).

Every number below is either sourced (see data notes in the report) or derived
with the arithmetic shown here. Derived values are labelled [Inference] in the text.
Run from the report folder: python3 src/charts.py
"""
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch, Rectangle, Polygon
from style import *

# --------------------------------------------------------------------------
# Core data (USD billion unless stated)
# --------------------------------------------------------------------------
EXPORTS_2025 = 475.04          # Customs / NSO, 2025
GDP_2025 = 514.0               # NSO estimate, 2025
EU_2025 = 56.2                 # MOIT, 2025
MARKETS_2025 = {               # Customs, 2025
    "United States": 153.2,
    "China": 70.45,
    "European Union": 56.2,
    "ASEAN": 42.75,
    "South Korea": 28.94,
    "Japan": 26.77,
}
MARKETS_2025["Rest of world"] = round(EXPORTS_2025 - sum(MARKETS_2025.values()), 2)


# --------------------------------------------------------------------------
# Exhibit 1: where Vietnam sells and how dense the NTM web is there
# --------------------------------------------------------------------------
def ex1_markets():
    fig, (a, b) = plt.subplots(1, 2, figsize=(W, 2.9), gridspec_kw={"width_ratios": [1.35, 1]})
    names = list(MARKETS_2025.keys())[::-1]
    vals = [MARKETS_2025[n] for n in names]
    cols = [BLUE if n in ("United States", "China", "European Union") else SILVER for n in names]
    y = np.arange(len(names))
    a.barh(y, vals, color=cols, height=0.62)
    for yi, v in zip(y, vals):
        a.text(v + 2, yi, f"{v:,.1f}  ({v / EXPORTS_2025 * 100:.1f}%)", va="center", fontsize=8, color=INK)
    a.set_yticks(y, names)
    a.set_xlim(0, 215)
    a.set_xticks([])
    clean(a, bottom=False)
    a.set_title("A. Goods exports by market, 2025 (USD bn, share)", loc="left", fontsize=9, fontweight="bold", color=NAVY)
    a.text(0, -1.25, "The three NTM-intensive markets in blue took 58.9% of exports", fontsize=8, color=BLUE, fontweight="bold")

    mk = ["United States", "China", "European Union"]
    freq = [76, 91, 99]
    cov = [87, 95, 98]
    x = np.arange(3)
    w = 0.36
    b1 = b.bar(x - w / 2, freq, w, color=NAVY, label="Frequency ratio")
    b2 = b.bar(x + w / 2, cov, w, color=CYAN, label="Coverage ratio")
    for r in list(b1) + list(b2):
        b.text(r.get_x() + r.get_width() / 2, r.get_height() + 1.5, f"{r.get_height():.0f}", ha="center", fontsize=7.6)
    b.set_xticks(x, ["US", "China", "EU"])
    b.set_ylim(0, 128)
    b.set_yticks([])
    clean(b, left=False)
    b.legend(loc="upper left", ncol=2, bbox_to_anchor=(0, 1.0), fontsize=7.3, handlelength=1)
    b.set_title("B. NTM frequency and coverage ratios (%)", loc="left", fontsize=9, fontweight="bold", color=NAVY)
    fig.tight_layout(w_pad=2)
    save(fig, "ex01_markets")


# --------------------------------------------------------------------------
# Exhibit 2: transmission channels (diagram)
# --------------------------------------------------------------------------
def box(ax, x, y, w, h, text, fc, tc="white", fs=8, bold=True, ec=None, lw=0):
    p = FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.01,rounding_size=0.015", fc=fc, ec=ec or fc, lw=lw)
    ax.add_patch(p)
    ax.text(x + w / 2, y + h / 2, text, ha="center", va="center", color=tc, fontsize=fs,
            fontweight="bold" if bold else "normal", linespacing=1.35, wrap=True)


def arrow(ax, x1, y1, x2, y2, c=GREY, lw=1.3, style="-|>", ls="-"):
    ax.add_patch(FancyArrowPatch((x1, y1), (x2, y2), arrowstyle=style, mutation_scale=10, color=c, lw=lw, linestyle=ls))


def ex2_channels():
    fig, ax = plt.subplots(figsize=(W, 3.9))
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")
    # source
    box(ax, 0.01, 0.40, 0.16, 0.22, "EU import-\nrelated NTMs\n\nSPS | TBT\nCBAM | EUDR", NAVY, fs=7.8)
    # direct channel
    box(ax, 0.22, 0.73, 0.4, 0.2, "", MIST)
    ax.text(0.235, 0.895, "1  DIRECT: TRADE CHANNEL", fontsize=7.5, fontweight="bold", color=BLUE, va="top")
    ax.text(0.235, 0.845, "Testing, certification, MRV and\ndue-diligence costs on USD 56.2 bn\nof exports to the EU (2025)", fontsize=7.5, color=INK, va="top", linespacing=1.3)
    box(ax, 0.22, 0.47, 0.4, 0.2, "", MIST)
    ax.text(0.235, 0.635, "2  DIRECT: INVESTMENT CHANNEL", fontsize=7.5, fontweight="bold", color=BLUE, va="top")
    ax.text(0.235, 0.585, "Investors weigh compliance cost\nand carbon intensity when siting\nnew capacity in Vietnam", fontsize=7.5, color=INK, va="top", linespacing=1.3)
    box(ax, 0.22, 0.06, 0.4, 0.34, "", MIST)
    ax.text(0.235, 0.375, "3  INDIRECT: SUPPLY-CHAIN CHANNEL", fontsize=7.5, fontweight="bold", color=BLUE, va="top")
    ax.text(0.235, 0.325, "Imported inputs carry their own\ncompliance burden: USD 115 bn from\nChina in H1 2026 alone. Origin rules\n(melt and pour) and CBAM precursor\nemissions travel with the input", fontsize=7.5, color=INK, va="top", linespacing=1.3)
    # outcomes
    box(ax, 0.68, 0.62, 0.31, 0.26, "Higher landed price\nand slower market access\nfor Vietnamese goods", BLUE, fs=8)
    box(ax, 0.68, 0.14, 0.31, 0.3, "Erosion of the cost edge\nthat EVFTA and FDI-led\nmanufacturing created", NAVY, fs=8)
    for yy in (0.83, 0.57, 0.23):
        arrow(ax, 0.17, 0.51, 0.22, yy)
    arrow(ax, 0.62, 0.83, 0.68, 0.75, c=BLUE)
    arrow(ax, 0.62, 0.57, 0.68, 0.36, c=NAVY)
    arrow(ax, 0.62, 0.23, 0.68, 0.26, c=NAVY)
    arrow(ax, 0.835, 0.62, 0.835, 0.44, c=GREY, ls="--")
    ax.text(0.85, 0.53, "persists if\nadaptation lags\npeers", fontsize=7, color=GREY, va="center")
    save(fig, "ex02_channels")


# --------------------------------------------------------------------------
# Exhibit 3: Vietnam's export basket mapped to NTM ad valorem equivalents
# --------------------------------------------------------------------------
BASKET = [  # item, 2025 exports, AVE proxy group, AVE %, tier
    ("Computers, electronics\nand components", 107.75, "Office and computing machinery", 3.9, "High"),
    ("Machinery and equipment", 58.38, "Machinery (various)", 8.3, "High"),
    ("Phones and components", 57.61, "Communication equipment", 6.3, "High"),
    ("Textiles and garments", 39.29, "Apparel", 9.7, "High"),
    ("Footwear", 23.97, "Tanning and leather", 2.0, "Moderate"),
    ("Wood and wood products", 16.98, "Wood products and furniture", 7.2, "High"),
    ("Seafood", 11.29, "Animal products", 27.3, "Very High"),
    ("Coffee", 8.92, "Vegetable products", 20.8, "Very High"),
    ("Iron and steel", 6.63, "Basic metals", 1.8, "Moderate"),
]
TIER_COL = {"Very High": NAVY, "High": BLUE, "Moderate": SKY, "Low": ICE}


def ex3_basket():
    fig, (a, b, c) = plt.subplots(1, 3, figsize=(W, 3.6), sharey=True, gridspec_kw={"width_ratios": [1.5, 0.8, 0.9]})
    items = BASKET[::-1]
    y = np.arange(len(items))
    vals = [i[1] for i in items]
    aves = [i[3] for i in items]
    cols = [TIER_COL[i[4]] for i in items]
    a.barh(y, vals, color=cols, height=0.64)
    for yi, v in zip(y, vals):
        a.text(v + 1.5, yi, f"{v:.1f}", va="center", fontsize=8)
    a.set_yticks(y, [i[0] for i in items], fontsize=8)
    a.set_xlim(0, 128)
    a.set_xticks([])
    clean(a, bottom=False)
    a.set_title("2025 exports\n(USD bn)", loc="left", fontsize=8.5, fontweight="bold", color=NAVY)

    b.hlines(y, 0, aves, color=SILVER, lw=1)
    b.scatter(aves, y, color=cols, s=36, zorder=3)
    for yi, v in zip(y, aves):
        b.text(v + 1.8, yi, f"{v:.1f}%", va="center", fontsize=8)
    b.set_xlim(0, 34)
    b.set_xticks([])
    clean(b, left=False, bottom=False)
    b.set_title("NTM ad valorem\nequivalent (proxy)", loc="left", fontsize=8.5, fontweight="bold", color=NAVY)

    wedge = [v * s / 100 for v, s in zip(vals, aves)]
    c.barh(y, wedge, color=cols, height=0.64, alpha=0.9)
    for yi, v in zip(y, wedge):
        c.text(v + 0.08, yi, f"{v:.1f}", va="center", fontsize=8)
    c.set_xlim(0, 6.2)
    c.set_xticks([])
    clean(c, left=False, bottom=False)
    c.set_title("Implied cost wedge\n(USD bn, illustrative)", loc="left", fontsize=8.5, fontweight="bold", color=NAVY)

    from matplotlib.patches import Patch
    handles = [Patch(color=TIER_COL[t], label=f"{t} AVE tier") for t in ("Very High", "High", "Moderate")]
    fig.legend(handles=handles, loc="lower center", ncol=3, bbox_to_anchor=(0.55, -0.04), fontsize=8)
    fig.tight_layout(w_pad=0.6)
    fig.subplots_adjust(bottom=0.1)
    save(fig, "ex03_basket")
    total = sum(vals)
    print(f"[ex3] basket total {total:.2f} = {total / EXPORTS_2025 * 100:.1f}% of exports; wedge {sum(wedge):.2f} bn; "
          f"weighted AVE {sum(wedge) / total * 100:.2f}%")
    for i, w_ in zip(items, wedge):
        print("   ", i[0].replace("\n", " "), round(w_, 2))


# --------------------------------------------------------------------------
# Exhibit 4: EU dependence, Vietnam against ASEAN peers
# --------------------------------------------------------------------------
PEERS = {  # Krungsri Research using CEIC and Trade Map 2024
    "Vietnam": (12.8, 10.8, 8.8, 81.4),
    "Philippines": (11.0, 1.7, 1.5, 88.4),
    "Thailand": (8.1, 4.6, 3.3, 71.6),
    "Malaysia": (7.7, 6.0, 3.8, 63.8),
    "Indonesia": (6.6, 1.2, 0.6, 61.1),
}


def ex4_dependence():
    fig, axes = plt.subplots(1, 3, figsize=(W, 2.6), sharey=True)
    names = list(PEERS.keys())[::-1]
    y = np.arange(len(names))
    titles = ["Exports to EU\n% of total exports", "Exports to EU\n% of GDP", "NTM-sensitive exports\nto EU, % of GDP"]
    for k, ax in enumerate(axes):
        vals = [PEERS[n][k] for n in names]
        cols = [BLUE if n == "Vietnam" else SILVER for n in names]
        ax.barh(y, vals, color=cols, height=0.6)
        for yi, v, n in zip(y, vals, names):
            ax.text(v + max(vals) * (0.09 if (n == "Vietnam" and k < 2) else 0.03), yi, f"{v:.1f}", va="center", fontsize=8,
                    fontweight="bold" if n == "Vietnam" else "normal", color=BLUE if n == "Vietnam" else INK)
        ax.set_xlim(0, max(vals) * 1.3)
        ax.set_xticks([])
        clean(ax, bottom=False, left=(k == 0))
        ax.set_title(titles[k], loc="left", fontsize=8.5, fontweight="bold", color=NAVY)
    axes[0].set_yticks(y, names)
    # 2025 update markers for Vietnam
    axes[0].scatter([EU_2025 / EXPORTS_2025 * 100], [y[-1]], marker="D", s=26, color=NAVY, zorder=4)
    axes[1].scatter([EU_2025 / GDP_2025 * 100], [y[-1]], marker="D", s=26, color=NAVY, zorder=4)
    fig.text(0.01, -0.04, "◆ Vietnam 2025 update using national data: 11.8% of exports and 10.9% of GDP", fontsize=7.5, color=NAVY)
    fig.tight_layout(w_pad=1)
    save(fig, "ex04_dependence")


# --------------------------------------------------------------------------
# Exhibit 5: what Vietnam sends to the EU, by NTM tier (shares and 2025 USD)
# --------------------------------------------------------------------------
TIERS_SHARE = {  # Trade Map 2024 via Krungsri Research (Figure 6)
    "Philippines": (11.6, 3.0, 66.3, 19.1),
    "Vietnam": (18.6, 24.6, 46.5, 10.2),
    "Thailand": (28.4, 12.0, 49.6, 10.0),
    "Malaysia": (36.2, 2.9, 50.8, 10.2),
    "Indonesia": (38.9, 23.3, 9.8, 28.0),
}


def ex5_tiers():
    fig, (a, b) = plt.subplots(1, 2, figsize=(W, 2.9), gridspec_kw={"width_ratios": [1.45, 1]})
    names = list(TIERS_SHARE.keys())[::-1]
    y = np.arange(len(names))
    labels = ["Moderate and low", "High: other manufactures", "High: electronics and machinery", "Very high: agri-food"]
    colors = [MIST, SKY, BLUE, NAVY]
    left = np.zeros(len(names))
    for k in range(4):
        vals = np.array([TIERS_SHARE[n][k] for n in names])
        a.barh(y, vals, left=left, color=colors[k], height=0.62, label=labels[k],
               edgecolor=["white" if n != "Vietnam" else NAVY for n in names], lw=[0.5 if n != "Vietnam" else 0 for n in names])
        for yi, v, l in zip(y, vals, left):
            if v >= 6:
                a.text(l + v / 2, yi, f"{v:.0f}", ha="center", va="center", fontsize=7.5,
                       color="white" if k >= 2 else NAVY)
        left += vals
    for yi, n in zip(y, names):
        s = {"Philippines": 88.4, "Vietnam": 81.4, "Thailand": 71.6, "Malaysia": 63.8, "Indonesia": 61.1}[n]
        a.text(101.5, yi, f"{s:.1f}%", va="center", fontsize=8, fontweight="bold", color=BLUE if n == "Vietnam" else INK)
    a.set_yticks(y, names)
    for t in a.get_yticklabels():
        if t.get_text() == "Vietnam":
            t.set_fontweight("bold"); t.set_color(BLUE)
    a.set_xlim(0, 112)
    a.set_xticks([])
    clean(a, bottom=False)
    a.set_title("A. Exports to EU by NTM tier, 2024 (% of total)", loc="left", fontsize=8.5, fontweight="bold", color=NAVY)
    a.text(101.5, -0.75, "NTM-\nsensitive", fontsize=6.6, color=GREY, va="center")
    a.legend(loc="upper center", bbox_to_anchor=(0.5, -0.02), ncol=2, fontsize=7.2)

    vn = TIERS_SHARE["Vietnam"]
    usd = [EU_2025 * s / 100 for s in vn]
    order = [3, 2, 1, 0]
    yb = 0
    for k in order:
        b.bar(0, usd[k], bottom=yb, color=colors[k], width=0.55, edgecolor="white", lw=0.8)
        b.text(0.34, yb + usd[k] / 2, f"{labels[k]}\nUSD {usd[k]:.1f} bn", va="center", fontsize=7.5, color=INK)
        yb += usd[k]
    sens = sum(usd[1:])
    b.plot([-0.33, -0.33], [0, sens], color=BLUE, lw=2)
    b.text(-0.38, sens / 2, f"USD {sens:.1f} bn\nNTM-sensitive\n= {sens / GDP_2025 * 100:.1f}% of GDP", ha="right", va="center",
           fontsize=7.8, color=BLUE, fontweight="bold")
    b.set_xlim(-1.1, 1.35)
    b.set_ylim(0, 60)
    b.axis("off")
    b.set_title("B. Applied to 2025 exports to EU\n(USD 56.2 bn, illustrative)", loc="left", fontsize=8.5, fontweight="bold", color=NAVY)
    fig.tight_layout(w_pad=1.5)
    save(fig, "ex05_tiers")
    print(f"[ex5] USD by tier (mod/low, high other, high elec, very high agri): {[round(u, 2) for u in usd]}; sensitive {sens:.2f}")


# --------------------------------------------------------------------------
# Exhibit 6a: CBAM exposure from the original study, Vietnam highlighted
# --------------------------------------------------------------------------
def ex6a_cbam_exposure():
    fig, (a, b) = plt.subplots(1, 2, figsize=(W, 2.5))
    names = ["Vietnam", "Malaysia", "Thailand", "Indonesia", "Philippines"]
    metal = [18.8, 6.6, 4.3, 3.6, 1.2]
    y = np.arange(len(names))[::-1]
    cols = [BLUE if n == "Vietnam" else SILVER for n in names]
    a.barh(y, metal, color=cols, height=0.58)
    for yi, v, n in zip(y, metal, names):
        a.text(v + 0.4, yi, f"{v:.1f}%", va="center", fontsize=8, fontweight="bold" if n == "Vietnam" else "normal",
               color=BLUE if n == "Vietnam" else INK)
    a.set_yticks(y, names)
    a.set_xlim(0, 23)
    a.set_xticks([])
    clean(a, bottom=False)
    a.set_title("A. Metal products (HS 72-83) as % of\nexports to the EU, 2024: dependence", loc="left", fontsize=8.5, fontweight="bold", color=NAVY)

    idx = {"Thailand": -0.001, "Vietnam": 0.0007, "Malaysia": 0.0009, "Philippines": 0.0014, "Indonesia": 0.0075}
    order = ["Thailand", "Vietnam", "Malaysia", "Philippines", "Indonesia"]
    x = np.arange(len(order))
    vals = [idx[k] for k in order]
    b.bar(x, vals, color=[BLUE if k == "Vietnam" else SILVER for k in order], width=0.58)
    for xi, v, k in zip(x, vals, order):
        b.text(xi, v + (0.00025 if v >= 0 else -0.0006), f"{v:.4f}".rstrip("0").rstrip(".") if v != -0.001 else "-0.001",
               ha="center", fontsize=7.8, fontweight="bold" if k == "Vietnam" else "normal", color=BLUE if k == "Vietnam" else INK)
    b.axhline(0, color=SILVER, lw=0.8)
    b.set_xticks(x, order, fontsize=7.8)
    b.set_yticks([])
    b.set_ylim(-0.0022, 0.0088)
    clean(b, left=False, bottom=False)
    b.set_title("B. CBAM aggregate trade exposure index:\nadjustment cost", loc="left", fontsize=8.5, fontweight="bold", color=NAVY)
    fig.tight_layout(w_pad=2)
    save(fig, "ex06a_cbam_exposure")


# --------------------------------------------------------------------------
# Exhibit 6: CBAM phase-in and an illustrative liability for steel sent to the EU
# --------------------------------------------------------------------------
YEARS = list(range(2026, 2035))
FREE = [97.5, 95, 90, 77.5, 51.5, 39, 26.5, 14, 0]  # EU free allocation retained under CBAM phase-in (%)
CHARGE = [100 - f for f in FREE]
VOL_EU_MT = 2.08     # VSA: steel exports to EU 2025, million tonnes
PRICE = 78.0         # EUR/t, approximate 2026 average EUA price to August 2026
INTENS = {"Vietnam average (2.51 t)": 2.51, "Global average (1.85 t)": 1.85, "Scrap-based EAF (0.5 t)": 0.5}


def ex6_cbam():
    fig, (a, b) = plt.subplots(1, 2, figsize=(W, 2.9), gridspec_kw={"width_ratios": [1, 1.25]})
    x = np.arange(len(YEARS))
    a.bar(x, CHARGE, color=[BLUE if c < 100 else NAVY for c in CHARGE], width=0.62)
    for xi, c in zip(x, CHARGE):
        a.text(xi, c + 2.5, f"{c:g}", ha="center", fontsize=7.5)
    a.set_xticks(x, [str(yy) for yy in YEARS], rotation=0, fontsize=7.5)
    a.set_yticks([])
    a.set_ylim(0, 112)
    clean(a, left=False)
    a.set_title("A. CBAM obligation payable as EU free\nallocation is phased out (%)", loc="left", fontsize=8.5, fontweight="bold", color=NAVY)

    cols = [BLUE, GREY, TEAL]
    for (lab, it), c in zip(INTENS.items(), cols):
        path = [VOL_EU_MT * it * PRICE * s / 100 for s in CHARGE]
        b.plot(YEARS, path, color=c, lw=2.2 if c == BLUE else 1.6, marker="o", ms=3, label=lab)
        b.text(2034.25, path[-1], f"EUR {path[-1]:.0f} m", va="center", fontsize=7.8, color=c, fontweight="bold")
    b.set_xlim(2025.6, 2035.9)
    b.set_xticks([2026, 2028, 2030, 2032, 2034])
    b.set_ylim(0, 460)
    b.yaxis.grid(True, color=MIST, lw=0.8)
    b.set_axisbelow(True)
    clean(b)
    b.set_ylabel("EUR million a year", fontsize=8)
    b.legend(loc="upper left", fontsize=7.5, title="Emission intensity, tCO₂ per t steel", title_fontsize=7.5)
    b.set_title("B. Illustrative CBAM bill on 2.08 Mt sent to the EU\n(EUR 78/t, volumes held at 2025)", loc="left", fontsize=8.5, fontweight="bold", color=NAVY)
    fig.tight_layout(w_pad=2)
    save(fig, "ex06_cbam")
    for lab, it in INTENS.items():
        print(f"[ex6] {lab}: full phase-in EUR {VOL_EU_MT * it * PRICE:.1f} m, per tonne EUR {it * PRICE:.1f}; 2026 EUR {VOL_EU_MT * it * PRICE * 0.025:.1f} m; 2030 EUR {VOL_EU_MT * it * PRICE * 0.485:.1f} m")


# --------------------------------------------------------------------------
# Exhibit 8: EUDR exposure
# --------------------------------------------------------------------------
EUDR = [  # product, share of VN exports to EU (Trade Map 2024), sector exports 2025
    ("Coffee", 3.9, 8.92),
    ("Wood and wood products", 1.5, 16.98),
    ("Rubber and rubber goods", 1.3, None),
]


def ex8_eudr():
    fig, (a, b) = plt.subplots(1, 2, figsize=(W, 2.8), gridspec_kw={"width_ratios": [1.05, 1]})
    names = [e[0] for e in EUDR][::-1]
    usd = [EU_2025 * e[1] / 100 for e in EUDR][::-1]
    y = np.arange(len(names))
    a.barh(y, usd, color=[BLUE, SKY, SKY][::-1], height=0.55)
    for yi, v, n in zip(y, usd, names):
        a.text(v + 0.04, yi, f"USD {v:.2f} bn", va="center", fontsize=8, fontweight="bold" if n == "Coffee" else "normal")
    a.set_yticks(y, names)
    a.set_xlim(0, 2.9)
    a.set_xticks([])
    clean(a, bottom=False)
    a.set_title("A. Estimated EU-bound exports in EUDR scope, 2025\n(2024 product shares applied to USD 56.2 bn)", loc="left", fontsize=8.5, fontweight="bold", color=NAVY)
    tot = sum(usd)
    a.text(0, -0.95, f"Total about USD {tot:.1f} bn, or {tot / EU_2025 * 100:.1f}% of exports to the EU", fontsize=7.8, color=BLUE, fontweight="bold")

    # timeline panel
    b.axis("off")
    b.set_xlim(0, 1)
    b.set_ylim(0, 1)
    b.set_title("B. The compliance clock", loc="left", fontsize=8.5, fontweight="bold", color=NAVY)
    events = [
        ("May 2025", "Vietnam benchmarked 'low risk':\nabout 1% of operators checked"),
        ("Dec 2025", "EU amends EUDR and delays\napplication by one year"),
        ("May 2026", "Commission simplification package;\nno further postponement"),
        ("30 Dec 2026", "Applies to large and\nmedium operators"),
        ("30 Jun 2027", "Applies to micro and\nsmall operators"),
    ]
    b.plot([0.27, 0.27], [0.02, 0.95], color=SILVER, lw=1.5)
    for i, (d, t) in enumerate(events):
        yy = 0.87 - i * 0.205
        hot = d.startswith("30")
        c = BLUE if hot else NAVY
        b.scatter([0.27], [yy], s=36, color=c, zorder=3)
        b.text(0.23, yy, d, fontsize=7.4, fontweight="bold", color=c, va="center", ha="right")
        b.text(0.31, yy, t, fontsize=7.1, color=INK, va="center", linespacing=1.15)
    fig.tight_layout(w_pad=1.5)
    save(fig, "ex08_eudr")
    print(f"[ex8] EUDR EU-bound est: {[round(u, 2) for u in usd[::-1]]} total {tot:.2f}")


# --------------------------------------------------------------------------
# Exhibit 13: action roadmap (Bain-style chevrons)
# --------------------------------------------------------------------------
def chevron(ax, x, y, w, h, fc, text, tc="white", first=False):
    t = 0.035
    pts = [(x, y), (x + w - t, y), (x + w, y + h / 2), (x + w - t, y + h), (x, y + h)]
    if not first:
        pts.append((x + t, y + h / 2))
    ax.add_patch(Polygon(pts, closed=True, fc=fc, ec="white", lw=1.5))
    ax.text(x + w / 2 + (0 if first else t / 3), y + h / 2, text, ha="center", va="center", color=tc, fontsize=7.8, fontweight="bold", linespacing=1.2)


def ex13_roadmap():
    fig, ax = plt.subplots(figsize=(W, 4.6))
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")
    phases = [("COMPLY\nH2 2026", NAVY), ("CONVERT\n2027-2028", BLUE), ("COMPETE\n2029-2034", CYAN)]
    x0, colw = 0.17, 0.276
    for k, (t, c) in enumerate(phases):
        chevron(ax, x0 + k * colw, 0.88, colw, 0.1, c, t, first=(k == 0))
    actors = [
        ("Government:\nregulation", ["Finish forest maps;\nalign traceability\nrules with the EU", "Carbon market with\nMRV the EU can\nrecognise", "Domestic carbon price\ncredited against\nCBAM liability"]),
        ("Exporters:\nproduction", ["Verified emissions\ndata; geolocation\nfor every plot", "Upgrade processes:\nEAF, energy efficiency,\nR&D, skills", "Low-carbon, traceable\nproducts sold at\na premium"]),
        ("Banks and\ninvestors", ["Green Credit soft\nloans; taxonomy\nscreening", "Finance clean power\nand direct power\npurchase (DPPA)", "Green bonds and\nsustainability-linked\nfinance at scale"]),
        ("ASEAN\ncooperation", ["Share verification\nmethods and\nforest data", "Harmonise product\nstandards and\ntaxonomies", "Mutual recognition\nwith EU verification\nsystems"]),
    ]
    rh = 0.19
    for i, (a_, cells) in enumerate(actors):
        yy = 0.66 - i * (rh + 0.015)
        ax.add_patch(Rectangle((0, yy), 0.16, rh, fc=MIST, ec="none"))
        ax.text(0.08, yy + rh / 2, a_, ha="center", va="center", fontsize=8.2, fontweight="bold", color=NAVY)
        for k, txt in enumerate(cells):
            ax.add_patch(Rectangle((x0 + k * colw + 0.006, yy), colw - 0.012, rh, fc="white", ec=SILVER, lw=0.7))
            ax.text(x0 + k * colw + 0.02, yy + rh / 2, txt, va="center", fontsize=7.4, color=INK, linespacing=1.25)
    save(fig, "ex13_roadmap")


if __name__ == "__main__":
    ex1_markets()
    ex2_channels()
    ex3_basket()
    ex4_dependence()
    ex5_tiers()
    ex6_cbam()
    ex6a_cbam_exposure()
    ex8_eudr()
    ex13_roadmap()
    print("done")
