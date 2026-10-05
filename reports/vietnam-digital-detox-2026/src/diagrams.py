"""Minto pyramid for the executive summary. Run: PYTHONPATH=src python3 src/diagrams.py"""
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, Circle
from style import *

LW = 0.7


def rect(ax, x, y, w, h, fc, ec="none", z=1):
    ax.add_patch(Rectangle((x, y), w, h, fc=fc, ec=ec, lw=LW, zorder=z))


def pyramid():
    fig, ax = plt.subplots(figsize=(W, 4.15))
    H = 4.15 / W
    ax.set_xlim(0, 1); ax.set_ylim(0, H); ax.set_aspect("equal"); ax.axis("off")
    fig.subplots_adjust(0, 0, 1, 1)
    gx, gw, gh = 0.1, 0.8, 0.15
    gy = H - 0.012 - gh
    rect(ax, gx, gy, gw, gh, NAVY)
    rect(ax, gx, gy + gh - 0.006, gw, 0.006, CYAN, z=2)
    ax.text(gx + 0.025, gy + gh - 0.024, "GOVERNING THOUGHT", color=CYAN, fontsize=7, fontweight="bold", va="top")
    ax.text(gx + 0.025, gy + 0.058, "Digital detox will not shrink banking in Vietnam. It will reprice it:\n"
            "customers will reward value per minute rather than minutes per session,\nso banks must compete on calm, trust and speed.",
            color="white", fontsize=9.2, fontweight="bold", va="center", linespacing=1.45)
    bar_y = gy - 0.035
    cols, cw = [0.0, 0.34, 0.68], 0.32
    ax.plot([0.5, 0.5], [gy, bar_y], color=NAVY, lw=LW)
    ax.plot([cols[0] + cw / 2, cols[2] + cw / 2], [bar_y, bar_y], color=NAVY, lw=LW)
    keys = [
        ("THE PULL", "Platforms are built\nto capture attention", ["77.6% of Vietnamese use social\nmedia (world: 69.9%)", "6h 38m online a day for the\naverage internet user", "Variable rewards, endless feeds,\nred badges, algorithms"]),
        ("THE PUSHBACK", "Users and the state\nare stepping back", ["75% of Gen Z want to leave at\nleast one platform", "500+ HCMC schools restrict\nphones from January 2026", "Draft decree: parents register\naccounts of under-16s"]),
        ("THE RESPONSE", "Banks must compete\non value, not time", ["87% of adults banked; cashless\npayments 28x GDP in 2025", "14.5% of users want a break\nfrom financial apps too", "Five actions: metrics, control,\nAI shortcuts, protection, pricing"]),
    ]
    kh = 0.115
    ky = bar_y - 0.025 - kh
    for i, (tag, head, ev) in enumerate(keys):
        x = cols[i]
        ax.plot([x + cw / 2, x + cw / 2], [bar_y, ky + kh], color=NAVY, lw=LW)
        rect(ax, x, ky, cw, kh, BLUE)
        ax.add_patch(Circle((x + 0.03, ky + kh - 0.026), 0.013, fc=NAVY, ec="none", zorder=5))
        ax.text(x + 0.03, ky + kh - 0.027, str(i + 1), ha="center", va="center", color="white", fontsize=7, fontweight="bold", zorder=6)
        ax.text(x + 0.053, ky + kh - 0.026, tag, color=ICE, fontsize=6.6, fontweight="bold", va="center")
        ax.text(x + 0.02, ky + 0.042, head, color="white", fontsize=9, fontweight="bold", va="center", linespacing=1.3)
        bh, g = 0.07, 0.01
        for j, e in enumerate(ev):
            y0 = ky - 0.018 - (j + 1) * bh - j * g
            rect(ax, x, y0, cw, bh, "white", ec=SILVER)
            rect(ax, x, y0, 0.005, bh, BLUE if j == 0 else SKY, z=2)
            ax.text(x + 0.02, y0 + bh / 2, e, fontsize=7.4, color=INK, va="center", linespacing=1.3)
    save(fig, "ex_pyramid")


if __name__ == "__main__":
    pyramid()
    print("pyramid done")
