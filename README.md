# Game & Games Amusement Business Website (Phase 1 Static)

> **"Earn More, Repair Less, Grow Faster, Stay Stress Free."**  
> Pioneering India's next-generation amusement machines with Smart Displays & Multi-Game QR technology.

---

## 1. Project Overview

This is the official public static website (Phase 1) for **Game & Games Amusement**, designed and engineered to translate the five handwritten concept documents and business models into a premium, commercially credible digital presence.

The website communicates the complete business ecosystem:
- **Who We Are**: Pioneers in Indian amusement hardware with 20+ years of operational experience.
- **What We Do**: Turnkey arcade machines, certified plush prizes, authentic spare parts, brand advertising, and structured business models.
- **Why We Do It**: To empower entrepreneurs and venues to operate high-margin, low-stress, zero-perishable amusement assets.

---

## 2. Technology Stack

- **HTML5**: Semantic, accessible markup across 19 public pages.
- **CSS3**: Modern CSS Variables (Light red/white default theme & Dark navy/gold theme), Flexbox, CSS Grid, custom typography hierarchy, responsive breakpoints.
- **Vanilla JavaScript (ES6+)**: Modular client architecture with `localStorage` persistence, interactive shopping cart, product filtering, dynamic game details renderer, and interactive business ROI calculator.
- **Icons**: Lucide Icons CDN.
- **No frameworks**: Clean, static, and 100% compatible with static hosting (Netlify, Vercel, GitHub Pages).

---

## 3. Project Structure

```
game website/
│
├── index.html                   # 1. Homepage (Hero, 3 W's, machines, ecosystem, testimonials, callback)
├── about.html                   # 2. About Us (20+ yrs heritage, philosophy, engineering standards)
├── games.html                   # 3. Our Games (Interactive machine catalog with category tabs & search)
├── game-details.html            # 4. Individual Game Detail (Dynamic parameter ?id=... with gallery & size picker)
├── toys.html                    # 5. Buy Toys (Dual filter: Categories & Sizes Below 12cm/20cm/30cm)
├── spare-parts.html             # 6. Buy Spare Parts (Complete sets, PCBs, coin mechs, motors, toolkits)
├── brands.html                  # 7. Our Brands (G&G, SCANO, Plush O Soft, ADS No Skip, Learn & Earn)
├── business-opportunities.html  # 8. Business Models (Upfront, EMI, Revenue Share & Interactive ROI Calculator)
├── advertise.html               # 9. Advertise With Us (Machine wraps, video ads, product sampling, coupons)
├── knowledge-centre.html        # 10. Knowledge Centre (Learn & Earn beginner curriculum and playbooks)
├── handbook.html                # 11. Handbook of Wisdom (₹999 product landing, chapters preview, buy flow)
├── repair-maintenance.html      # 12. Repair & Upkeep (3-min hot-swap protocol, video tutorials, service ticket)
├── events.html                  # 13. Events & News (Spotlight refurbished games in Good/Average condition, expos)
├── careers.html                 # 14. Careers (Culture, apprentice program, open positions, application form)
├── contact.html                 # 15. Contact Us (Direct hotline +91 8855922736, hours, inquiry form)
├── cart.html                    # 16. Shopping Cart (Interactive localStorage cart, qty picker, subtotal)
├── checkout.html                # 17. Checkout Demo (Simulated checkout with transparent Phase 1 disclaimer)
├── privacy-policy.html          # 18. Privacy Policy
├── terms.html                   # 19. Terms & Conditions
│
├── assets/
│   ├── icons/                   # Favicon & vector graphics
│   ├── images/                  # Organized photos (hero, games, toys, parts, brands, handbook, events)
│   └── references/              # Original handwritten reference documents
│
├── css/
│   ├── style.css                # Design tokens, variables, typography, reset, buttons, toasts
│   ├── components.css           # Header, mobile drawer, footer, cards, 3 W's hexagons, modals, forms
│   ├── pages.css                # Distinct layouts for all 19 pages (avoiding generic templates)
│   └── responsive.css           # Breakpoints (1200px, 1100px, 992px, 768px, 640px, 480px)
│
├── js/
│   ├── product-data.js          # Centralized data store (games, toys, parts, brands, events)
│   ├── utils.js                 # Currency formatter (INR), toasts, modals, localStorage wrapper
│   ├── cart.js                  # Shopping cart controller, badge counts, subtotal calculation
│   ├── navigation.js            # Theme toggle, sticky header, mobile drawer toggle, active link tracking
│   ├── products.js              # Catalog search, category filtering, dynamic game details page
│   ├── forms.js                 # Form validation, non-deceptive feedback modals, checkout simulator
│   └── main.js                  # Icon hydration, ROI calculator, global callback triggers
│
├── robots.txt
├── sitemap.xml
├── README.md
└── PROJECT_STATUS.md
```

---

## 4. How To Run Locally

Because this is a pure static frontend (HTML5/CSS3/Vanilla JS), you can view it immediately using any local web server or even opening `index.html` directly in modern browsers.

### Using Python:
```bash
# In the project directory:
python -m http.server 8000
```
Then navigate to: `http://localhost:8000`

### Using Node / npx:
```bash
npx serve .
```

---

## 5. How To Deploy on Netlify

1. **Via Netlify Drag & Drop**:
   - Log into [Netlify](https://app.netlify.com).
   - Go to "Sites" > "Add new site" > "Deploy manually".
   - Drag and drop the `game website` folder.
   - Deployment completes in seconds with a live global CDN URL.

2. **Via Git (GitHub / GitLab / Bitbucket)**:
   - Push this repository to GitHub.
   - Connect the repository in Netlify.
   - Build command: *(Leave blank - pure static)*.
   - Publish directory: `.` (root).

---

## 6. How To Update Content & Business Details

### A. Updating Contact Numbers & Hours:
Open `js/product-data.js` and edit the `GG_DATA.company` object:
```javascript
company: {
  phone: "+91 8855922736",
  email: "sales@gameandgamesamusement.com",
  hours: "10:00 AM – 6:00 PM, Monday to Saturday",
  // ...
}
```

### B. Updating Arcade Machines & Pricing:
In `js/product-data.js`, add or edit items in the `GG_DATA.games` array. Changing provisional prices or sizes will immediately reflect on `games.html` and `game-details.html`.

### C. Updating Toys & Prize Lots:
In `js/product-data.js`, update `GG_DATA.toys`. Sizes can be filtered by `below-12cm`, `below-20cm`, or `below-30cm`, and categories by `indian`, `imported`, `handmade`, `gifts`, or `ideas`.

### D. Updating Spare Parts:
In `js/product-data.js`, update `GG_DATA.spareParts`.

---

## 7. Phase 1 Acceptance & Non-Deceptive Form Guarantees

As strictly requested in the project requirements:
- No fake backend responses or fake payment gateway confirmations.
- Forms validate inputs locally and provide a transparent, polite notification explaining that Phase 1 is a static frontend and submissions will be connected to the Python Flask REST API in Phase 2.
- The direct telephone line `+91 8855922736` is prominently displayed on all pages for immediate customer inquiries.
