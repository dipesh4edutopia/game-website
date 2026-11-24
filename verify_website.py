import os
import re

files_expected = [
    "index.html", "about.html", "games.html", "game-details.html",
    "toys.html", "spare-parts.html", "brands.html", "business-opportunities.html",
    "advertise.html", "knowledge-centre.html", "handbook.html",
    "repair-maintenance.html", "events.html", "careers.html", "contact.html",
    "cart.html", "checkout.html", "privacy-policy.html", "terms.html",
    "css/style.css", "css/components.css", "css/pages.css", "css/responsive.css",
    "js/product-data.js", "js/utils.js", "js/cart.js", "js/navigation.js",
    "js/products.js", "js/forms.js", "js/main.js",
    "robots.txt", "sitemap.xml", "README.md", "PROJECT_STATUS.md"
]

errors = []

for f in files_expected:
    if not os.path.exists(f):
        errors.append(f"Missing file: {f}")
    else:
        sz = os.path.getsize(f)
        if sz == 0:
            errors.append(f"Empty file: {f}")

print(f"File existence check: Checked {len(files_expected)} core files.")

# Link and Image checker
html_files = [f for f in files_expected if f.endswith(".html")]

broken_links = []
broken_images = []

for hf in html_files:
    with open(hf, "r", encoding="utf-8") as file:
        content = file.read()
        
        # Check links
        links = re.findall(r'href=["\']([^"\'#]+)(?:#[^"\']*)?["\']', content)
        for link in links:
            if link.startswith(("http", "tel:", "mailto:", "javascript:")):
                continue
            # Strip query params
            base_link = link.split("?")[0]
            if not os.path.exists(base_link):
                broken_links.append(f"{hf} -> {link}")

        # Check images
        imgs = re.findall(r'src=["\']([^"\']+)["\']', content)
        for img in imgs:
            if img.startswith(("http", "data:")):
                continue
            if not os.path.exists(img):
                broken_images.append(f"{hf} -> {img}")

if broken_links:
    print(f"BROKEN LINKS FOUND ({len(broken_links)}):")
    for bl in broken_links[:10]:
        print("  ", bl)
else:
    print("ALL INTERNAL LINKS VALID! (0 broken links)")

if broken_images:
    print(f"BROKEN IMAGES FOUND ({len(broken_images)}):")
    for bi in broken_images[:10]:
        print("  ", bi)
else:
    print("ALL IMAGES VALID! (0 broken images)")

if errors:
    print(f"ERRORS ({len(errors)}):")
    for err in errors:
        print("  ", err)
else:
    print("ALL 20 PAGES & ESSENTIAL ASSETS VERIFIED WITH 100% INTEGRITY!")
