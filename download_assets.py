import urllib.request
import os

images = {
    # Hero
    "assets/images/hero/hero-arcade.jpg": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    "assets/images/hero/hero-claw.jpg": "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80",
    "assets/images/hero/smart-display.jpg": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",

    # Games
    "assets/images/games/pick-a-prize.jpg": "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80",
    "assets/images/games/press-a-prize.jpg": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    "assets/images/games/ten-on-ten.jpg": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    "assets/images/games/cut-a-prize.jpg": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    "assets/images/games/perfect-tower.jpg": "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80",

    # Toys
    "assets/images/toys/teddy-bear.jpg": "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=800&q=80",
    "assets/images/toys/bunny-plush.jpg": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80",
    "assets/images/toys/character-plush.jpg": "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80",
    "assets/images/toys/panda-plush.jpg": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    "assets/images/toys/handmade-plush.jpg": "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80",
    "assets/images/toys/gift-assortment.jpg": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",

    # Spare Parts
    "assets/images/spare-parts/coin-mechanism.jpg": "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=800&q=80",
    "assets/images/spare-parts/pcb-board.jpg": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    "assets/images/spare-parts/power-supply.jpg": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    "assets/images/spare-parts/arcade-joystick.jpg": "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=80",
    "assets/images/spare-parts/arcade-buttons.jpg": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    "assets/images/spare-parts/toolkit.jpg": "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80",
    "assets/images/spare-parts/crane-motor.jpg": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",

    # Business
    "assets/images/business/hotel-location.jpg": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    "assets/images/business/mall-arcade.jpg": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
    "assets/images/business/cafe-arcade.jpg": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    "assets/images/business/sweet-shop.jpg": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",

    # About
    "assets/images/about/arcade-heritage.jpg": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    "assets/images/about/workshop-testing.jpg": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",

    # Podcasts & Events
    "assets/images/podcasts/podcast-studio.jpg": "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80",
    "assets/images/events/expo-event.jpg": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    "assets/images/events/refurbished-machines.jpg": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"
}

headers = {'User-Agent': 'Mozilla/5.0'}

for path, url in images.items():
    if not os.path.exists(path):
        os.makedirs(os.path.dirname(path), exist_ok=True)
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=15) as resp, open(path, 'wb') as f:
                f.write(resp.read())
            print(f"Downloaded: {path}")
        except Exception as e:
            print(f"Failed {path}: {e}")
print("Assets download completed.")
