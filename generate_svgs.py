import os

os.makedirs("assets/icons", exist_ok=True)
os.makedirs("assets/images/brands", exist_ok=True)
os.makedirs("assets/images/handbook", exist_ok=True)

# 1. Favicon SVG
favicon_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="favGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFB703" />
      <stop offset="100%" stop-color="#FB8500" />
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="#0A0F1D"/>
  <rect x="2" y="2" width="60" height="60" rx="12" fill="none" stroke="#FFB703" stroke-width="2" stroke-opacity="0.3"/>
  <!-- Joystick / Claw Symbol -->
  <circle cx="32" cy="22" r="9" fill="url(#favGrad)" />
  <rect x="30" y="29" width="4" height="15" rx="2" fill="#FFFFFF" />
  <path d="M18 48 C 24 40, 40 40, 46 48 Z" fill="url(#favGrad)" />
</svg>'''

with open("assets/icons/favicon.svg", "w", encoding="utf-8") as f:
    f.write(favicon_svg)

# 2. Brand Logos
# G&G Amusement
g_and_g_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" width="320" height="80">
  <defs>
    <linearGradient id="ggGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFB703"/>
      <stop offset="100%" stop-color="#FB8500"/>
    </linearGradient>
  </defs>
  <!-- Icon Emblem -->
  <rect x="4" y="8" width="64" height="64" rx="14" fill="#131B2E" stroke="#FFB703" stroke-width="2"/>
  <!-- Claw Crane Graphic -->
  <path d="M36 18 L36 30 M24 38 C24 30, 36 26, 36 30 C36 26, 48 30, 48 38 C48 44, 42 46, 36 44 C30 46, 24 44, 24 38 Z" fill="none" stroke="url(#ggGold)" stroke-width="3" stroke-linecap="round"/>
  <circle cx="36" cy="52" r="5" fill="#00F0FF"/>
  <!-- Typography -->
  <text x="82" y="38" font-family="'Plus Jakarta Sans', sans-serif" font-size="24" font-weight="900" fill="#FFFFFF" letter-spacing="0.5">GAME &amp; GAMES</text>
  <text x="82" y="56" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" fill="#FFB703" letter-spacing="3">AMUSEMENT</text>
  <text x="82" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" fill="#00F0FF" letter-spacing="1">GIVE IT A TRY!</text>
</svg>'''

with open("assets/images/brands/brand-g-and-g.svg", "w", encoding="utf-8") as f:
    f.write(g_and_g_svg)

# SCANO - Play Smart
scano_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 80" width="280" height="80">
  <rect x="4" y="8" width="64" height="64" rx="14" fill="#0B192C" stroke="#00F0FF" stroke-width="2"/>
  <path d="M22 28 L36 18 L50 28 L50 52 L36 62 L22 52 Z" fill="none" stroke="#00F0FF" stroke-width="2.5"/>
  <circle cx="36" cy="40" r="7" fill="#FFB703"/>
  <text x="80" y="38" font-family="'Plus Jakarta Sans', sans-serif" font-size="26" font-weight="900" fill="#FFFFFF" letter-spacing="1">SCANO</text>
  <text x="80" y="58" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#00F0FF" letter-spacing="2">PLAY SMART • QR TECH</text>
</svg>'''

with open("assets/images/brands/brand-scano.svg", "w", encoding="utf-8") as f:
    f.write(scano_svg)

# Plush O Soft - Worth Showing Off
plush_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 80" width="280" height="80">
  <rect x="4" y="8" width="64" height="64" rx="14" fill="#241438" stroke="#D946EF" stroke-width="2"/>
  <!-- Teddy Bear Silhouette -->
  <circle cx="28" cy="28" r="6" fill="#D946EF"/>
  <circle cx="44" cy="28" r="6" fill="#D946EF"/>
  <circle cx="36" cy="42" r="14" fill="#F472B6"/>
  <ellipse cx="36" cy="45" rx="6" ry="4" fill="#FFFFFF"/>
  <circle cx="36" cy="43" r="2" fill="#241438"/>
  <text x="80" y="38" font-family="'Plus Jakarta Sans', sans-serif" font-size="22" font-weight="900" fill="#FFFFFF" letter-spacing="0.5">PLUSH O SOFT</text>
  <text x="80" y="58" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#F472B6" letter-spacing="1.5">WORTH SHOWING OFF</text>
</svg>'''

with open("assets/images/brands/brand-plush-o-soft.svg", "w", encoding="utf-8") as f:
    f.write(plush_svg)

# ADS No Skip - Where Every View Counts
ads_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80" width="300" height="80">
  <rect x="4" y="8" width="64" height="64" rx="14" fill="#1C1917" stroke="#EF4444" stroke-width="2"/>
  <polygon points="26,24 50,40 26,56" fill="#EF4444"/>
  <line x1="52" y1="24" x2="52" y2="56" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
  <text x="80" y="38" font-family="'Plus Jakarta Sans', sans-serif" font-size="22" font-weight="900" fill="#FFFFFF" letter-spacing="0.5">ADS NO SKIP</text>
  <text x="80" y="58" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#FCA5A5" letter-spacing="1">WHERE EVERY VIEW COUNTS</text>
</svg>'''

with open("assets/images/brands/brand-ads-no-skip.svg", "w", encoding="utf-8") as f:
    f.write(ads_svg)

# Learn & Earn
learn_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 80" width="280" height="80">
  <rect x="4" y="8" width="64" height="64" rx="14" fill="#064E3B" stroke="#10B981" stroke-width="2"/>
  <!-- Graduation cap & chart arrow -->
  <path d="M36 20 L52 28 L36 36 L20 28 Z" fill="#10B981"/>
  <path d="M26 33 L26 44 C26 48, 46 48, 46 44 L46 33" fill="none" stroke="#FFFFFF" stroke-width="2"/>
  <path d="M22 56 L34 46 L42 50 L52 38" fill="none" stroke="#FBBF24" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="80" y="38" font-family="'Plus Jakarta Sans', sans-serif" font-size="22" font-weight="900" fill="#FFFFFF" letter-spacing="0.5">LEARN &amp; EARN</text>
  <text x="80" y="58" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#34D399" letter-spacing="1.5">ACADEMY &amp; ROADMAP</text>
</svg>'''

with open("assets/images/brands/brand-learn-and-earn.svg", "w", encoding="utf-8") as f:
    f.write(learn_svg)

# 3. Handbook Cover Graphic
handbook_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 560" width="400" height="560">
  <defs>
    <linearGradient id="bookCoverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A0F1D" />
      <stop offset="50%" stop-color="#1E293B" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFD166" />
      <stop offset="100%" stop-color="#FFB703" />
    </linearGradient>
  </defs>
  <!-- Book Body -->
  <rect x="0" y="0" width="400" height="560" rx="12" fill="url(#bookCoverGrad)" stroke="#FFB703" stroke-width="3"/>
  <!-- Spine Shadow -->
  <rect x="0" y="0" width="26" height="560" rx="8" fill="#000000" fill-opacity="0.4"/>
  <line x1="26" y1="0" x2="26" y2="560" stroke="#FFB703" stroke-width="1" stroke-opacity="0.5"/>
  <!-- Decorative Frame -->
  <rect x="45" y="30" width="325" height="500" rx="6" fill="none" stroke="#FFB703" stroke-width="1.5" stroke-dasharray="8 4" stroke-opacity="0.6"/>
  <!-- Badge -->
  <rect x="110" y="55" width="195" height="30" rx="15" fill="#FFB703" fill-opacity="0.15" stroke="#FFB703" stroke-width="1"/>
  <text x="207" y="75" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" fill="#FFB703" letter-spacing="2">20+ YEARS EXPERIENCE</text>
  <!-- Title -->
  <text x="207" y="160" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="34" font-weight="900" fill="#FFFFFF" letter-spacing="1">HANDBOOK</text>
  <text x="207" y="200" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="30" font-weight="800" fill="#FFB703" letter-spacing="1">OF WISDOM</text>
  <line x1="120" y1="225" x2="295" y2="225" stroke="#00F0FF" stroke-width="3" stroke-linecap="round"/>
  <!-- Subtitle -->
  <text x="207" y="260" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="600" fill="#94A3B8">FINALLY REVEALED</text>
  <text x="207" y="285" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="600" fill="#E2E8F0">Understanding the Arcade &amp;</text>
  <text x="207" y="305" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="600" fill="#E2E8F0">Amusement Business Insights</text>
  <!-- Central Emblem -->
  <circle cx="207" cy="380" r="45" fill="#131B2E" stroke="#FFB703" stroke-width="2"/>
  <path d="M195 365 L219 365 M207 365 L207 395 M197 385 L217 385" stroke="url(#goldGrad)" stroke-width="4" stroke-linecap="round"/>
  <!-- Price Pill -->
  <rect x="135" y="460" width="145" height="42" rx="21" fill="url(#goldGrad)"/>
  <text x="207" y="487" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="18" font-weight="900" fill="#0A0F1D">ONLY ₹999/-</text>
</svg>'''

with open("assets/images/handbook/handbook-cover.svg", "w", encoding="utf-8") as f:
    f.write(handbook_svg)

print("SVG assets generated successfully.")
