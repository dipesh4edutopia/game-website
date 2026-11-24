"""One-off migration: turns the hard-coded dark CSS into a variable-driven light/dark theme system
and rebuilds the shared header / drawer / footer on every page."""
import os, re, glob
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

def read(p): return open(p, encoding="utf-8").read()
def write(p, s): open(p, "w", encoding="utf-8").write(s)

# =====================================================================
# 1. CSS  -> variables
# =====================================================================
ROOT_BLOCK = r'''/* ==========================================================================
   THEME TOKENS
   Light (white + brand red) is the DEFAULT. Dark is the original navy/gold look.
   Switch with <html data-theme="dark|light"> (see js/navigation.js).
   ========================================================================== */
:root {
  color-scheme: light;

  --bg-darkest: #F4F1ED;
  --bg-primary: #FFFFFF;
  --bg-secondary: #F8F5F2;
  --bg-card: #FFFFFF;
  --bg-card-hover: #FFF7F6;
  --bg-surface-elevated: #FFFFFF;
  --bg-surface-translucent: rgba(255, 255, 255, 0.92);

  --text-white: #17171B;
  --text-primary: #1F1F25;
  --text-secondary: #43434D;
  --text-muted: #6A6A75;
  --text-dim: #8B8B96;

  --accent-gold: #D91F26;
  --accent-gold-hover: #B3151B;
  --accent-gold-soft: rgba(217, 31, 38, 0.08);
  --accent-gold-glow: rgba(217, 31, 38, 0.25);
  --accent-yellow: #FFB703;

  --accent-cyan: #1E4E89;
  --accent-cyan-hover: #173C6B;
  --accent-cyan-soft: rgba(30, 78, 137, 0.08);
  --accent-cyan-glow: rgba(30, 78, 137, 0.25);

  --accent-purple: #7E3FD4;
  --accent-purple-soft: rgba(126, 63, 212, 0.1);
  --accent-red: #D91F26;
  --accent-green: #0F9D6B;
  --accent-green-soft: rgba(15, 157, 107, 0.1);

  --border-subtle: rgba(23, 23, 27, 0.09);
  --border-medium: rgba(23, 23, 27, 0.17);
  --border-accent: rgba(217, 31, 38, 0.32);
  --border-cyan: rgba(30, 78, 137, 0.32);

  --tint-rgb: 23, 23, 27;
  --accent-rgb: 217, 31, 38;
  --accent2-rgb: 30, 78, 137;
  --on-accent: #FFFFFF;

  --btn-gradient: linear-gradient(135deg, #E32128 0%, #B3151B 100%);
  --btn-gradient-hover: linear-gradient(135deg, #EE3A40 0%, #C81920 100%);
  --btn2-gradient: linear-gradient(135deg, #2A5DA8 0%, #1E3A5F 100%);
  --btn2-gradient-hover: linear-gradient(135deg, #3A70C0 0%, #264B7A 100%);

  --surface-deep: #EFEAE4;
  --input-bg: #FFFFFF;
  --input-bg-focus: #FFFFFF;
  --subtle-fill: rgba(23, 23, 27, 0.03);
  --pill-bg: rgba(255, 255, 255, 0.94);

  --header-bg: rgba(255, 255, 255, 0.94);
  --header-bg-sticky: rgba(255, 255, 255, 0.98);
  --topbar-bg: #D91F26;
  --topbar-text: #FFFFFF;
  --topbar-accent: #FFFFFF;
  --topbar-border: transparent;
  --footer-bg: #17171B;

  --band-gradient: linear-gradient(135deg, #D91F26 0%, #A8121A 100%);
  --panel-dark: linear-gradient(135deg, #1B1B20 0%, #2A2A31 100%);
  --page-head-bg: linear-gradient(180deg, #FFF3F1 0%, #FFFFFF 100%);
  --hero-overlay: linear-gradient(180deg, rgba(255, 255, 255, 0.86) 0%, #FFFFFF 100%);
  --hero-img-opacity: 0.14;
  --brand-frame-bg: #FFFFFF;
  --body-glow:
    radial-gradient(circle at 12% 8%, rgba(217, 31, 38, 0.05) 0%, transparent 45%),
    radial-gradient(circle at 88% 35%, rgba(255, 183, 3, 0.07) 0%, transparent 45%);

  --shadow-sm: 0 2px 8px rgba(20, 20, 30, 0.06);
  --shadow-md: 0 8px 24px rgba(20, 20, 30, 0.08);
  --shadow-lg: 0 16px 40px rgba(20, 20, 30, 0.12);
  --shadow-gold: 0 8px 24px rgba(217, 31, 38, 0.14);
  --shadow-cyan: 0 8px 24px rgba(30, 78, 137, 0.14);

  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;

  --transition-fast: 0.18s ease;
  --transition-normal: 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-slow: 0.45s cubic-bezier(0.16, 1, 0.3, 1);

  --container-max: 1240px;
  --header-height: 80px;
}

/* ---------- DARK THEME (original navy + gold look) ---------- */
[data-theme="dark"] {
  color-scheme: dark;

  --bg-darkest: #070B14;
  --bg-primary: #0A0F1D;
  --bg-secondary: #10172A;
  --bg-card: #131B2E;
  --bg-card-hover: #18233C;
  --bg-surface-elevated: #1E293B;
  --bg-surface-translucent: rgba(16, 23, 42, 0.85);

  --text-white: #FFFFFF;
  --text-primary: #F8FAFC;
  --text-secondary: #CBD5E1;
  --text-muted: #94A3B8;
  --text-dim: #64748B;

  --accent-gold: #FFB703;
  --accent-gold-hover: #FB8500;
  --accent-gold-soft: rgba(255, 183, 3, 0.12);
  --accent-gold-glow: rgba(255, 183, 3, 0.35);
  --accent-yellow: #FFB703;

  --accent-cyan: #00F0FF;
  --accent-cyan-hover: #00D2E0;
  --accent-cyan-soft: rgba(0, 240, 255, 0.12);
  --accent-cyan-glow: rgba(0, 240, 255, 0.3);

  --accent-purple: #C084FC;
  --accent-purple-soft: rgba(192, 132, 252, 0.12);
  --accent-red: #EF4444;
  --accent-green: #10B981;
  --accent-green-soft: rgba(16, 185, 129, 0.12);

  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-medium: rgba(255, 255, 255, 0.15);
  --border-accent: rgba(255, 183, 3, 0.3);
  --border-cyan: rgba(0, 240, 255, 0.3);

  --tint-rgb: 255, 255, 255;
  --accent-rgb: 255, 183, 3;
  --accent2-rgb: 0, 240, 255;
  --on-accent: #0A0F1D;

  --btn-gradient: linear-gradient(135deg, #FFB703 0%, #FB8500 100%);
  --btn-gradient-hover: linear-gradient(135deg, #FFC42B 0%, #FFA01C 100%);
  --btn2-gradient: linear-gradient(135deg, #00F0FF 0%, #0099FF 100%);
  --btn2-gradient-hover: linear-gradient(135deg, #33F3FF 0%, #1AB2FF 100%);

  --surface-deep: #070B14;
  --input-bg: #0B1120;
  --input-bg-focus: #0E1628;
  --subtle-fill: rgba(0, 0, 0, 0.2);
  --pill-bg: rgba(10, 15, 29, 0.88);

  --header-bg: rgba(10, 15, 29, 0.92);
  --header-bg-sticky: rgba(7, 11, 20, 0.98);
  --topbar-bg: #070B14;
  --topbar-text: #CBD5E1;
  --topbar-accent: #FFB703;
  --topbar-border: rgba(255, 255, 255, 0.08);
  --footer-bg: #070B14;

  --band-gradient: linear-gradient(135deg, #10172A 0%, #172554 100%);
  --panel-dark: linear-gradient(135deg, #070B14 0%, #111827 100%);
  --page-head-bg: linear-gradient(180deg, #070B14 0%, #0A0F1D 100%);
  --hero-overlay: linear-gradient(180deg, rgba(10, 15, 29, 0.75) 0%, rgba(10, 15, 29, 0.98) 100%);
  --hero-img-opacity: 0.22;
  --brand-frame-bg: #FFFFFF;
  --body-glow:
    radial-gradient(circle at 15% 10%, rgba(255, 183, 3, 0.04) 0%, transparent 45%),
    radial-gradient(circle at 85% 40%, rgba(0, 240, 255, 0.03) 0%, transparent 45%),
    radial-gradient(circle at 50% 80%, rgba(192, 132, 252, 0.03) 0%, transparent 50%);

  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.25);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.35);
  --shadow-lg: 0 16px 40px rgba(0, 0, 0, 0.45);
  --shadow-gold: 0 0 25px rgba(255, 183, 3, 0.2);
  --shadow-cyan: 0 0 25px rgba(0, 240, 255, 0.2);
}
'''

LITERALS = [
    # gradients / buttons
    ("linear-gradient(135deg, #FFB703 0%, #FB8500 100%)", "var(--btn-gradient)"),
    ("linear-gradient(135deg, #FFC42B 0%, #FFA01C 100%)", "var(--btn-gradient-hover)"),
    ("linear-gradient(135deg, #00F0FF 0%, #0099FF 100%)", "var(--btn2-gradient)"),
    ("linear-gradient(135deg, #33F3FF 0%, #1AB2FF 100%)", "var(--btn2-gradient-hover)"),
    # surfaces
    ("background-color: rgba(10, 15, 29, 0.92);", "background-color: var(--header-bg);"),
    ("background-color: rgba(7, 11, 20, 0.98);", "background-color: var(--header-bg-sticky);"),
    ("background: rgba(10, 15, 29, 0.88);", "background: var(--pill-bg);"),
    ("background: linear-gradient(180deg, rgba(10, 15, 29, 0.75) 0%, rgba(10, 15, 29, 0.98) 100%);", "background: var(--hero-overlay);"),
    ("opacity: 0.22;", "opacity: var(--hero-img-opacity);"),
    ("background: linear-gradient(135deg, #10172A 0%, #172554 100%);", "background: var(--band-gradient);"),
    ("background: linear-gradient(135deg, #070B14 0%, #0F172A 100%);", "background: var(--panel-dark);"),
    ("background: linear-gradient(135deg, #070B14 0%, #111827 100%);", "background: var(--panel-dark);"),
    ("background-color: #0B1120;", "background-color: var(--input-bg);"),
    ("background-color: #0E1628;", "background-color: var(--input-bg-focus);"),
    ("background-color: rgba(0, 0, 0, 0.2);", "background-color: var(--subtle-fill);"),
    ("background-color: #070B14;", "background-color: var(--surface-deep);"),
    ("color: #0A0F1D;", "color: var(--on-accent);"),
    ("color: #000;", "color: var(--on-accent);"),
]

def patch_css(path, has_root=False):
    s = read(path)
    s = re.sub(r"@import url\([^)]*\);\s*", "", s)
    if has_root:
        s = re.sub(r"background-image:\s*radial-gradient.*?;\n\s*background-attachment", "background-image: var(--body-glow);\n  background-attachment", s, count=1, flags=re.S)
    for a, b in LITERALS:
        s = s.replace(a, b)
    # brand frame (the only element that used #070B14 with border)
    s = s.replace(".brand-logo-frame {\n  background-color: var(--surface-deep);", ".brand-logo-frame {\n  background-color: var(--brand-frame-bg);")
    s = re.sub(r"rgba\(255, 255, 255, ([\d.]+)\)", r"rgba(var(--tint-rgb), \1)", s)
    s = re.sub(r"rgba\(255, 183, 3, ([\d.]+)\)", r"rgba(var(--accent-rgb), \1)", s)
    s = re.sub(r"rgba\(0, 240, 255, ([\d.]+)\)", r"rgba(var(--accent2-rgb), \1)", s)
    # footer / top bar backgrounds
    s = s.replace(".site-footer {\n  background-color: var(--bg-darkest);", ".site-footer {\n  background-color: var(--footer-bg);")
    if has_root:  # swap in the theme tokens last so they are never rewritten by the passes above
        s = re.sub(r":root \{.*?\n\}\n", lambda m: ROOT_BLOCK, s, count=1, flags=re.S)
    write(path, s)

patch_css("css/style.css", has_root=True)
patch_css("css/components.css")
patch_css("css/pages.css")
# the :root block itself must keep explicit rgba numbers (it was written after the regex ran, so it is untouched)
print("CSS patched")

# =====================================================================
# 2. HTML  -> shared layout
# =====================================================================
THEME_INIT = ("<script>(function(){try{var t=localStorage.getItem('gg_theme');"
              "document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light');}"
              "catch(e){document.documentElement.setAttribute('data-theme','light');}})();</script>\n"
              "  <meta name=\"theme-color\" content=\"#D91F26\">\n")

SUN = ('<svg class="icon-sun" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
       '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>')
MOON = ('<svg class="icon-moon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
        '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>')
TOGGLE = f'<button type="button" class="theme-toggle" aria-label="Switch to dark theme" title="Switch theme">{SUN}{MOON}</button>'

GAMES = [("pick-a-prize", "Pick A Prize (Claw)"), ("press-a-prize", "Press A Prize (Clip)"),
         ("ten-on-ten", "10 on 10 (Timer)"), ("cut-a-prize", "Cut A Prize (Cutter)"),
         ("perfect-tower", "Perfect Tower (Stacker)")]
GROUPS = [
    ("About", "about.html", "info", [("about.html", "About Us", "building-2"), ("brands.html", "Our Brands", "shield-check"),
                                     ("events.html", "Events &amp; News", "calendar"), ("careers.html", "Careers", "briefcase")]),
    ("Our Games", "games.html", "gamepad-2", [("games.html", "All Machines", "gamepad-2")] +
        [(f"game-details.html?id={i}", n, "trophy") for i, n in GAMES]),
    ("Products", "toys.html", "gift", [("toys.html", "Buy Toys &amp; Prizes", "gift"), ("spare-parts.html", "Buy Spare Parts", "wrench")]),
    ("Business", "business-opportunities.html", "trending-up", [("business-opportunities.html", "Franchise &amp; EMI Models", "trending-up"),
                                                                ("advertise.html", "Advertise With Us", "megaphone")]),
    ("Learn", "knowledge-centre.html", "book-open", [("knowledge-centre.html", "Knowledge Centre", "book-open"),
                                                    ("handbook.html", "Handbook of Wisdom", "book-marked"),
                                                    ("podcasts.html", "Podcasts &amp; FAQs", "headphones"),
                                                    ("repair-maintenance.html", "Repair &amp; Upkeep", "wrench")]),
]

def desktop_nav():
    out = ['<nav class="desktop-nav" aria-label="Primary navigation">',
           '        <div class="nav-item"><a href="index.html" class="nav-link">Home</a></div>']
    for label, href, _icon, kids in GROUPS:
        out.append('        <div class="nav-item">')
        out.append(f'          <a href="{href}" class="nav-link"><span>{label}</span><i data-lucide="chevron-down"></i></a>')
        out.append('          <div class="nav-dropdown">')
        for h, t, ic in kids:
            out.append(f'            <a href="{h}" class="dropdown-link"><i data-lucide="{ic}"></i> {t}</a>')
        out.append('          </div>')
        out.append('        </div>')
    out.append('        <div class="nav-item"><a href="contact.html" class="nav-link">Contact</a></div>')
    out.append('      </nav>')
    return "\n".join(out)

def drawer_nav():
    out = ['<ul class="drawer-nav-list">',
           '        <li class="drawer-nav-item"><a href="index.html" class="drawer-link">Home</a></li>']
    for label, _href, _icon, kids in GROUPS:
        out.append('        <li class="drawer-nav-item">')
        out.append(f'          <button type="button" class="drawer-link drawer-dropdown-toggle" aria-expanded="false"><span>{label}</span><i data-lucide="chevron-down"></i></button>')
        out.append('          <div class="drawer-submenu">')
        for h, t, _ in kids:
            out.append(f'            <a href="{h}">{t}</a>')
        out.append('          </div>')
        out.append('        </li>')
    out.append('        <li class="drawer-nav-item"><a href="cart.html" class="drawer-link">Shopping Cart</a></li>')
    out.append('        <li class="drawer-nav-item"><a href="contact.html" class="drawer-link">Contact Us</a></li>')
    out.append('      </ul>')
    return "\n".join(out)

HEADER = f'''<div class="top-announcement-bar">
    <div class="container top-bar-inner">
      <div class="top-tagline">
        <i data-lucide="sparkles"></i>
        <span>EARN MORE, REPAIR LESS, GROW FASTER, STAY STRESS FREE.</span>
      </div>
      <div class="top-contact-info">
        <div class="top-contact-item">
          <i data-lucide="phone-call"></i>
          <a href="tel:+918855922736">+91 8855922736</a>
        </div>
        <div class="top-contact-item top-hours">
          <i data-lucide="clock"></i>
          <span>Mon–Sat: 10:00 AM – 6:00 PM</span>
        </div>
      </div>
    </div>
  </div>

  <header class="site-header">
    <div class="container header-container">
      <a href="index.html" class="site-logo" aria-label="Game &amp; Games Amusement – Home">
        <img src="assets/images/logo/logo.svg" alt="Game &amp; Games Amusement logo" width="409" height="100">
      </a>

      {desktop_nav()}

      <div class="header-actions">
        {TOGGLE}
        <a href="cart.html" class="header-cart-btn" aria-label="Shopping cart">
          <i data-lucide="shopping-bag"></i>
          <span class="cart-badge-count">0</span>
        </a>
        <button type="button" class="btn btn-primary btn-sm header-cta" data-open-callback>
          <i data-lucide="phone"></i> Request Callback
        </button>
        <button type="button" class="mobile-toggle-btn" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-drawer">
          <span class="hamburger"><span></span><span></span><span></span></span>
        </button>
      </div>
    </div>
  </header>

  <div class="drawer-overlay" id="drawer-overlay"></div>
  <aside class="mobile-drawer" id="mobile-drawer" aria-label="Mobile navigation">
    <div class="drawer-header">
      <a href="index.html" class="site-logo"><img src="assets/images/logo/logo.svg" alt="Game &amp; Games Amusement" width="409" height="100"></a>
      <button type="button" class="drawer-close-btn" aria-label="Close menu">&times;</button>
    </div>
    <div class="drawer-content">
      {drawer_nav()}
    </div>
    <div class="drawer-footer">
      <div class="drawer-theme-row"><span>Appearance</span>{TOGGLE}</div>
      <a class="drawer-contact-phone" href="tel:+918855922736"><i data-lucide="phone"></i> +91 8855922736</a>
      <button type="button" class="btn btn-primary" style="width:100%;" data-open-callback>Request Callback</button>
    </div>
  </aside>
'''

FOOTER = '''<footer class="site-footer">
    <div class="container">
      <div class="footer-top-grid">
        <div class="footer-brand-col">
          <a href="index.html" class="site-logo footer-logo"><img src="assets/images/logo/logo.svg" alt="Game &amp; Games Amusement logo" width="409" height="100" loading="lazy"></a>
          <p>Pioneering India's next-generation amusement machines with Smart Displays &amp; multi-game QR technology. Turnkey arcade solutions, certified plush prizes and commercial mentorship.</p>
          <div class="experience-badge-pill"><i data-lucide="award"></i><span>20+ Years of Industry Experience</span></div>
        </div>
        <div>
          <h4 class="footer-col-title">Games &amp; Products</h4>
          <ul class="footer-links-list">
            <li><a href="games.html">All Machines</a></li>
            <li><a href="game-details.html?id=pick-a-prize">Pick A Prize</a></li>
            <li><a href="game-details.html?id=press-a-prize">Press A Prize</a></li>
            <li><a href="game-details.html?id=ten-on-ten">10 on 10</a></li>
            <li><a href="game-details.html?id=cut-a-prize">Cut A Prize</a></li>
            <li><a href="toys.html">Buy Toys &amp; Prizes</a></li>
            <li><a href="spare-parts.html">Buy Spare Parts</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-col-title">Business</h4>
          <ul class="footer-links-list">
            <li><a href="business-opportunities.html">Franchise &amp; EMI Models</a></li>
            <li><a href="brands.html">Our Brands</a></li>
            <li><a href="advertise.html">Advertise With Us</a></li>
            <li><a href="knowledge-centre.html">Learn &amp; Earn Academy</a></li>
            <li><a href="handbook.html">Handbook of Wisdom (₹999)</a></li>
            <li><a href="events.html">Events &amp; Refurbished Deals</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-col-title">Quick Links</h4>
          <ul class="footer-links-list">
            <li><a href="repair-maintenance.html">Repair &amp; Upkeep</a></li>
            <li><a href="careers.html">Careers</a></li>
            <li><a href="events.html">News</a></li>
            <li><a href="podcasts.html">Questions &amp; Answers</a></li>
            <li><a href="contact.html">Feedback &amp; Suggestions</a></li>
            <li><a href="cart.html">Shopping Cart</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-col-title">Get In Touch</h4>
          <div class="footer-contact-box">
            <div class="footer-contact-row"><i data-lucide="phone-call"></i><div><strong>Phone</strong><br><a href="tel:+918855922736">+91 8855922736</a></div></div>
            <div class="footer-contact-row"><i data-lucide="clock"></i><div><strong>Working hours</strong><br>Mon–Sat: 10:00 AM – 6:00 PM</div></div>
            <div class="footer-contact-row"><i data-lucide="mail"></i><div><strong>Sales &amp; enquiries</strong><br><a href="mailto:sales@gameandgamesamusement.com">sales@gameandgamesamusement.com</a></div></div>
            <div class="footer-contact-row"><i data-lucide="map-pin"></i><div><strong>Address</strong><br>Placeholder – to be confirmed by the company</div></div>
          </div>
          <div class="footer-socials">
            <a href="https://wa.me/918855922736" class="footer-social-btn" aria-label="WhatsApp" target="_blank" rel="noopener"><i data-lucide="message-circle"></i></a>
            <a href="https://facebook.com" class="footer-social-btn" aria-label="Facebook" target="_blank" rel="noopener"><i data-lucide="facebook"></i></a>
            <a href="https://youtube.com" class="footer-social-btn" aria-label="YouTube" target="_blank" rel="noopener"><i data-lucide="youtube"></i></a>
            <a href="https://instagram.com" class="footer-social-btn" aria-label="Instagram" target="_blank" rel="noopener"><i data-lucide="instagram"></i></a>
            <a href="https://x.com" class="footer-social-btn" aria-label="X" target="_blank" rel="noopener"><i data-lucide="twitter"></i></a>
            <a href="https://linkedin.com" class="footer-social-btn" aria-label="LinkedIn" target="_blank" rel="noopener"><i data-lucide="linkedin"></i></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom-bar">
        <div>&copy; <span class="js-year">2026</span> Game &amp; Games Amusement. All rights reserved.</div>
        <div class="footer-legal-links">
          <a href="privacy-policy.html">Privacy Policy</a>
          <a href="terms.html">Terms &amp; Conditions</a>
        </div>
      </div>
    </div>
  </footer>'''

PAGES = [f for f in glob.glob("*.html")]
for p in PAGES:
    s = read(p)
    if "gg_theme" not in s:
        s = s.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0">',
                      '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n  ' + THEME_INIT, 1)
    s = re.sub(r'https://unpkg\.com/lucide@latest', 'https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js', s)
    s = s.replace('data-lucide="tool"', 'data-lucide="wrench"')
    s = re.sub(r'<div class="top-announcement-bar">.*?(?=\s*<main)', lambda m: HEADER, s, count=1, flags=re.S)
    s = re.sub(r'<footer class="site-footer">.*?</footer>', lambda m: FOOTER, s, count=1, flags=re.S)
    s = re.sub(r'\s*<script>\s*document\.getElementById\(\'current-year\'\).*?</script>', '', s, flags=re.S)

    # inline colours -> theme variables
    s = s.replace("background: var(--accent-green); color: #fff;", "@@GREEN@@")
    s = s.replace("background: var(--accent-gold); color: #000;", "background: var(--accent-yellow); color: #17171B;")
    s = s.replace("color: #fff", "color: var(--text-white)")
    s = s.replace("@@GREEN@@", "background: var(--accent-green); color: #fff;")
    s = s.replace("linear-gradient(180deg, #070B14 0%, #0A0F1D 100%)", "var(--page-head-bg)")
    s = s.replace("linear-gradient(135deg, #10172A 0%, #1E1B4B 100%)", "var(--bg-secondary)")
    s = s.replace("linear-gradient(135deg, #10172A 0%, #172554 100%)", "var(--bg-secondary)")
    s = re.sub(r"rgba\(255, 183, 3, ([\d.]+)\)", r"rgba(var(--accent-rgb), \1)", s)
    s = re.sub(r"rgba\(255, 255, 255, ([\d.]+)\)", r"rgba(var(--tint-rgb), \1)", s)
    s = s.replace('class="callback-band" style="background: var(--bg-card); border-color: var(--border-medium);"', 'class="callback-band is-surface"')
    if p == "cart.html":
        s = s.replace('<div class="cart-layout-grid">', '<div class="cart-layout-grid" id="cart-layout">', 1)
    write(p, s)

for f in glob.glob("js/*.js"):
    s = read(f)
    if "brand-g-and-g.svg" in s:
        write(f, s.replace("assets/images/brands/brand-g-and-g.svg", "assets/images/logo/logo.svg"))
print("HTML rebuilt for", len(PAGES), "pages")
