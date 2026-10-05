"""Shared chart style: McKinsey-inspired palette with Bain-style restraint.

Colour is a signal. Vietnam is always electric blue; peers and context are grey.
"""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager

NAVY = "#051C2C"
BLUE = "#2251FF"
CYAN = "#00A9F4"
SKY = "#99C2FF"
ICE = "#DCE8FF"
TEAL = "#0E7C86"
GREY = "#7A8794"
SILVER = "#C5CDD5"
MIST = "#EEF1F4"
INK = "#1A1A1A"
RED = "#D0353F"     # reserved for negative / risk only
AMBER = "#F2A900"   # reserved for "watch" status only
GREEN = "#1E9E5A"   # reserved for positive / in place only

# Sequential severity scale (low to high) used on every heat map
SEV = {"Low": "#E3ECFF", "Moderate": "#9DBBFF", "Moderate-High": "#2251FF", "High": "#051C2C"}
SEV_TXT = {"Low": NAVY, "Moderate": NAVY, "Moderate-High": "white", "High": "white"}

FONT = "Liberation Sans"
for f in font_manager.findSystemFonts():
    if "LiberationSans" in f:
        font_manager.fontManager.addfont(f)

plt.rcParams.update({
    "font.family": [FONT, "DejaVu Sans"],
    "font.size": 9,
    "axes.edgecolor": SILVER,
    "axes.labelcolor": INK,
    "axes.linewidth": 0.8,
    "xtick.color": "#4A5560",
    "ytick.color": "#4A5560",
    "xtick.labelsize": 8.5,
    "ytick.labelsize": 8.5,
    "axes.spines.top": False,
    "axes.spines.right": False,
    "legend.frameon": False,
    "legend.fontsize": 8.5,
    "savefig.dpi": 300,
    "svg.fonttype": "path",
    "savefig.bbox": "tight",
    "savefig.pad_inches": 0.06,
    "figure.facecolor": "white",
})

W = 6.7  # full text width in inches (A4, 2 cm margins)


def clean(ax, left=True, bottom=True):
    ax.spines["left"].set_visible(left)
    ax.spines["bottom"].set_visible(bottom)
    ax.tick_params(length=0)


def save(fig, name):
    # Vector SVG (text converted to paths so it stays sharp in any viewer) plus a PNG fallback
    fig.savefig(f"charts/{name}.svg", format="svg")
    fig.savefig(f"charts/{name}.png", dpi=300)
    plt.close(fig)
