"""Generates the Game & Games logo (red wordmark on white), favicon, and recolours brand SVGs.
Text is converted to vector paths (Lilita One, SIL OFL) so the logo renders identically everywhere.
To use your own logo later, simply replace assets/images/logo/logo.svg (or logo.png and update the paths)."""
import os, re, urllib.request
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
os.makedirs("assets/fonts", exist_ok=True)
os.makedirs("assets/images/logo", exist_ok=True)

FONT = "assets/fonts/LilitaOne-Regular.ttf"
if not os.path.exists(FONT):
    url = "https://github.com/google/fonts/raw/main/ofl/lilitaone/LilitaOne-Regular.ttf"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    open(FONT, "wb").write(urllib.request.urlopen(req, timeout=60).read())

font = TTFont(FONT)
gs = font.getGlyphSet()
cmap = font.getBestCmap()
upm = font["head"].unitsPerEm

def measure(text, size, tracking=0):
    s = size / upm
    return sum(gs[cmap[ord(c)]].width * s for c in text) + tracking * (len(text) - 1)

def text_path(text, size, x, y, tracking=0):
    s = size / upm
    cx, parts = x, []
    for ch in text:
        g = gs[cmap[ord(ch)]]
        pen = SVGPathPen(gs)
        g.draw(TransformPen(pen, (s, 0, 0, -s, cx, y)))
        parts.append(pen.getCommands())
        cx += g.width * s + tracking
    return " ".join(p for p in parts if p)

RED, INK, YELLOW = "#D91F26", "#17171B", "#FFB703"

# ---------- Main logo ----------
name_size = 58
w_game = measure("Game", name_size)
w_amp = measure("&", name_size * 0.9)
w_games = measure("Games", name_size)
gap = 12
name_w = w_game + gap + w_amp + gap + w_games
pad_x, pad_y = 22, 14
W = round(name_w + pad_x * 2)
baseline = pad_y + 46
tag_size = 13
tag_nat = measure("AMUSEMENT", tag_size)
tracking = (name_w - tag_nat) / 8
H = baseline + 12 + 14 + pad_y

x = pad_x
p_game = text_path("Game", name_size, x, baseline); x += w_game + gap
p_amp = text_path("&", name_size * 0.9, x, baseline); x += w_amp + gap
p_games = text_path("Games", name_size, x, baseline)
p_tag = text_path("AMUSEMENT", tag_size, pad_x, baseline + 12 + tag_size, tracking)

logo = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="Game &amp; Games Amusement">
  <title>Game &amp; Games Amusement</title>
  <rect width="{W}" height="{H}" rx="14" fill="#FFFFFF"/>
  <path d="{p_game}" fill="{RED}"/>
  <path d="{p_amp}" fill="{RED}"/>
  <path d="{p_games}" fill="{RED}"/>
  <rect x="{pad_x}" y="{baseline + 5}" width="{name_w:.1f}" height="2.5" rx="1.25" fill="{YELLOW}"/>
  <path d="{p_tag}" fill="{INK}"/>
</svg>'''
open("assets/images/logo/logo.svg", "w", encoding="utf-8").write(logo)

# ---------- Favicon ----------
fs = 30
fw = measure("G&G", fs)
fav = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="{RED}"/>
  <path d="{text_path("G&G", fs, (64 - fw) / 2, 41)}" fill="#FFFFFF"/>
  <rect x="14" y="46" width="36" height="3" rx="1.5" fill="{YELLOW}"/>
</svg>'''
open("assets/icons/favicon.svg", "w", encoding="utf-8").write(fav)

# ---------- Recolour sub-brand logos for white tiles (dark text) ----------
text_map = {"#FFFFFF": "#17171B", "#00F0FF": "#1E4E89", "#FCA5A5": "#B91C1C",
            "#34D399": "#047857", "#F472B6": "#C0267A"}
for f in os.listdir("assets/images/brands"):
    if not f.endswith(".svg"):
        continue
    p = os.path.join("assets/images/brands", f)
    s = open(p, encoding="utf-8").read()
    def fix(m):
        return m.group(1) + text_map.get(m.group(2).upper(), m.group(2)) + m.group(3)
    s = re.sub(r'(<text[^>]*fill=")(#[0-9A-Fa-f]{6})(")', fix, s)
    open(p, "w", encoding="utf-8").write(s)
old = "assets/images/brands/brand-g-and-g.svg"
if os.path.exists(old):
    os.remove(old)

# ---------- Handbook cover in brand red ----------
hp = "assets/images/handbook/handbook-cover.svg"
s = open(hp, encoding="utf-8").read()
for a, b in [('stop-color="#0A0F1D"', 'stop-color="#B3151B"'), ('stop-color="#1E293B"', 'stop-color="#D91F26"'),
             ('stop-color="#0F172A"', 'stop-color="#8F0F14"'), ('stroke="#00F0FF"', 'stroke="#FFFFFF"'),
             ('fill="#131B2E"', 'fill="#8F0F14"'), ('fill="#94A3B8"', 'fill="#FFD9D6"')]:
    s = s.replace(a, b)
open(hp, "w", encoding="utf-8").write(s)
print("Branding built. Logo size:", W, "x", H)
