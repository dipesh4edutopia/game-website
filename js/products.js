/**
 * GAME & GAMES AMUSEMENT - PRODUCTS & CATALOG MANAGER
 * Powers games.html, game-details.html, toys.html, and spare-parts.html.
 */

const GGProducts = {
  // Initialize on page load based on current container elements
  init() {
    if (document.getElementById('games-grid-container')) {
      this.initGamesPage();
    }
    if (document.getElementById('game-details-container')) {
      this.initGameDetailsPage();
    }
    if (document.getElementById('toys-grid-container')) {
      this.initToysPage();
    }
    if (document.getElementById('spare-parts-grid-container')) {
      this.initSparePartsPage();
    }
  },

  // 1. GAMES PAGE LOGIC
  initGamesPage() {
    const container = document.getElementById('games-grid-container');
    const filterTabs = document.querySelectorAll('.game-filter-tab');
    const searchInput = document.getElementById('game-search-input');

    let currentFilter = 'all';
    let currentSearch = '';

    const render = () => {
      let filtered = GG_DATA.games.filter(game => {
        const matchesCategory = currentFilter === 'all' || game.category === currentFilter;
        const matchesSearch = game.name.toLowerCase().includes(currentSearch) ||
                              game.type.toLowerCase().includes(currentSearch) ||
                              game.description.toLowerCase().includes(currentSearch);
        return matchesCategory && matchesSearch;
      });

      if (filtered.length === 0) {
        container.innerHTML = `
          <div class="catalog-empty-state">
            <i data-lucide="search-x"></i>
            <h3>No Arcade Machines Found</h3>
            <p>Try adjusting your search query or category filter.</p>
          </div>
        `;
        if (window.lucide) lucide.createIcons({ root: container });
        return;
      }

      let html = '';
      filtered.forEach(game => {
        const sizeChips = game.sizes.map(s => `<span class="size-chip">${s}</span>`).join(' ');
        html += `
          <div class="product-card machine-card" data-category="${game.category}">
            <div class="product-card-media">
              <span class="product-badge">${game.badge}</span>
              ${game.qrTech ? `<span class="product-tech-pill"><i data-lucide="qr-code"></i> Smart QR</span>` : ''}
              <img src="${game.image}" alt="${game.name}" loading="lazy">
            </div>
            <div class="product-card-body">
              <div class="product-category-meta">${game.type}</div>
              <h3 class="product-card-title">${game.name}</h3>
              <p class="product-card-subtitle">${game.subtitle}</p>
              <div class="product-sizes-row">
                <span class="sizes-label">Available Sizes:</span>
                ${sizeChips}
              </div>
              <p class="product-card-desc">${game.description.slice(0, 110)}...</p>
              <div class="product-card-footer">
                <div class="price-box">
                  <span class="price-caption">Provisional Model Price</span>
                  <span class="price-val">${GGUtils.formatCurrency(game.provisionalPrice)}</span>
                </div>
                <div class="card-btn-group">
                  <a href="game-details.html?id=${game.id}" class="btn btn-outline btn-sm">View Details</a>
                  <button type="button" class="btn btn-primary btn-sm" onclick="GGCart.addItem({id:'${game.id}', name:'${game.name}', provisionalPrice:${game.provisionalPrice}, image:'${game.image}'}, 'Medium', 1)">
                    <i data-lucide="shopping-cart"></i> Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      });

      container.innerHTML = html;
      if (window.lucide) lucide.createIcons({ root: container });
    };

    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentFilter = tab.getAttribute('data-filter') || 'all';
        render();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.trim().toLowerCase();
        render();
      });
    }

    render();
  },

  // 2. GAME DETAILS PAGE LOGIC
  initGameDetailsPage() {
    const container = document.getElementById('game-details-container');
    if (!container) return;

    const gameId = GGUtils.getQueryParam('id') || 'pick-a-prize';
    const game = GG_DATA.games.find(g => g.id === gameId) || GG_DATA.games[0];

    // Update document title
    document.title = `${game.name} | G&G Amusement Arcade Solutions`;

    // Size options HTML
    let defaultSize = game.sizes[0];
    let sizesHtml = game.sizes.map((s, idx) => `
      <label class="size-radio-label ${idx === 0 ? 'selected' : ''}">
        <input type="radio" name="game-size" value="${s}" ${idx === 0 ? 'checked' : ''} onchange="GGProducts.onSizeSelected(this, '${game.id}')">
        <span>${s}</span>
      </label>
    `).join('');

    let featuresList = game.features.map(f => `
      <li><i data-lucide="check-circle-2" class="text-accent"></i> <span>${f}</span></li>
    `).join('');

    let venuesList = game.suitableVenues.map(v => `
      <span class="venue-pill"><i data-lucide="map-pin"></i> ${v}</span>
    `).join('');

    let html = `
      <div class="product-details-breadcrumbs">
        <a href="index.html">Home</a> &gt; <a href="games.html">Our Games</a> &gt; <span>${game.name}</span>
      </div>

      <div class="product-details-grid">
        <!-- Left: Image Gallery & Tech Badges -->
        <div class="details-gallery-col">
          <div class="main-gallery-view">
            <span class="gallery-badge">${game.badge}</span>
            <img id="main-product-img" src="${game.image}" alt="${game.name}">
          </div>
          <div class="gallery-tech-callout">
            <div class="callout-icon">
              <i data-lucide="smartphone"></i>
            </div>
            <div class="callout-text">
              <h4>Smart Display &amp; Multi-Game QR Built-in</h4>
              <p>India's pioneering arcade telematics by SCANO. Accept UPI payments directly on the machine with zero coin conversion needed.</p>
            </div>
          </div>
        </div>

        <!-- Right: Specifications & Commerce -->
        <div class="details-content-col">
          <div class="details-category-pill">${game.type}</div>
          <h1 class="details-title">${game.name}</h1>
          <p class="details-subtitle">${game.subtitle}</p>
          
          <div class="details-price-card">
            <div class="price-header">
              <span class="price-label">Provisional Base Machine Price</span>
              <span class="price-value">${GGUtils.formatCurrency(game.provisionalPrice)}</span>
            </div>
            <p class="price-disclaimer">Price exclusive of GST, delivery, and coin starter pack. EMI &amp; revenue share plans available.</p>
          </div>

          <!-- Size Variant Picker -->
          <div class="size-picker-section">
            <label class="section-label">Select Machine Size Variant:</label>
            <div class="size-radio-group">
              ${sizesHtml}
            </div>
            <div class="dimensions-display" id="dimensions-display">
              Dimensions: <strong>${game.dimensions[defaultSize] || 'Standard Commercial Cabinet'}</strong>
            </div>
          </div>

          <!-- Overview & How it works -->
          <div class="details-narrative-section">
            <h3>Machine Overview</h3>
            <p>${game.description}</p>
            
            <h3>How The Game Works</h3>
            <p>${game.howItWorks}</p>
          </div>

          <!-- Key Features -->
          <div class="details-features-section">
            <h3>Engineering &amp; Hardware Highlights</h3>
            <ul class="features-checklist">
              ${featuresList}
            </ul>
          </div>

          <!-- Suitable Venues -->
          <div class="details-venues-section">
            <h3>Recommended Installation Locations</h3>
            <div class="venues-flex">
              ${venuesList}
            </div>
          </div>

          <!-- Action CTA Group -->
          <div class="details-cta-group">
            <button type="button" class="btn btn-primary btn-lg" onclick="GGProducts.addCurrentGameToCart('${game.id}')">
              <i data-lucide="shopping-cart"></i> Add Machine To Cart
            </button>
            <button type="button" class="btn btn-outline btn-lg" onclick="GGProducts.openEnquiryForGame('${game.name}')">
              <i data-lucide="mail"></i> Request Custom Quotation
            </button>
          </div>
        </div>
      </div>

      <!-- Related Machines Section -->
      <div class="related-machines-section">
        <h2 class="section-title">Explore Other Next-Gen Machines</h2>
        <div class="related-machines-grid">
          ${GG_DATA.games.filter(g => g.id !== game.id).slice(0, 3).map(rel => `
            <div class="related-card">
              <img src="${rel.image}" alt="${rel.name}">
              <div class="related-body">
                <h4>${rel.name}</h4>
                <p>${rel.type}</p>
                <a href="game-details.html?id=${rel.id}" class="btn btn-sm btn-outline">Explore &rarr;</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    container.innerHTML = html;
    if (window.lucide) lucide.createIcons({ root: container });
  },

  onSizeSelected(radio, gameId) {
    const parentGroup = radio.closest('.size-radio-group');
    if (parentGroup) {
      parentGroup.querySelectorAll('.size-radio-label').forEach(lbl => lbl.classList.remove('selected'));
      radio.closest('.size-radio-label').classList.add('selected');
    }
    const game = GG_DATA.games.find(g => g.id === gameId);
    if (game && game.dimensions[radio.value]) {
      const dimEl = document.getElementById('dimensions-display');
      if (dimEl) dimEl.innerHTML = `Dimensions: <strong>${game.dimensions[radio.value]}</strong>`;
    }
  },

  addCurrentGameToCart(gameId) {
    const game = GG_DATA.games.find(g => g.id === gameId);
    if (!game) return;
    const selectedSizeRadio = document.querySelector('input[name="game-size"]:checked');
    const size = selectedSizeRadio ? selectedSizeRadio.value : (game.sizes[0] || 'Standard');
    GGCart.addItem(game, size, 1);
  },

  openEnquiryForGame(gameName) {
    const modalInput = document.getElementById('modal-inquiry-subject');
    if (modalInput) modalInput.value = `Quotation for ${gameName}`;
    GGUtils.openModal('game-enquiry-modal');
  },

  // 3. TOYS PAGE LOGIC (Reference 2: Indian, Imported, Handmade, Gifts, Ideas | Below 12cm, 20cm, 30cm)
  initToysPage() {
    const container = document.getElementById('toys-grid-container');
    const categoryTabs = document.querySelectorAll('.toy-cat-tab');
    const sizeSelect = document.getElementById('toy-size-filter');
    const searchInput = document.getElementById('toy-search-input');

    let currentCategory = 'all';
    let currentSize = 'all';
    let currentSearch = '';

    const render = () => {
      let filtered = GG_DATA.toys.filter(toy => {
        const matchesCategory = currentCategory === 'all' || toy.category === currentCategory;
        const matchesSize = currentSize === 'all' || toy.sizeCategory === currentSize;
        const matchesSearch = toy.name.toLowerCase().includes(currentSearch) ||
                              toy.description.toLowerCase().includes(currentSearch);
        return matchesCategory && matchesSize && matchesSearch;
      });

      if (filtered.length === 0) {
        container.innerHTML = `
          <div class="catalog-empty-state">
            <i data-lucide="package-search"></i>
            <h3>No Plush Toys Match Your Filters</h3>
            <p>Try switching category or resetting size filter.</p>
          </div>
        `;
        if (window.lucide) lucide.createIcons({ root: container });
        return;
      }

      let html = '';
      filtered.forEach(toy => {
        const availableSizesBadges = toy.sizesAvailable.map(s => `<span class="size-chip">${s}</span>`).join(' ');
        html += `
          <div class="product-card toy-card" data-category="${toy.category}">
            <div class="product-card-media">
              <span class="product-badge capitalize">${toy.category}</span>
              <img src="${toy.image}" alt="${toy.name}" loading="lazy">
            </div>
            <div class="product-card-body">
              <div class="product-category-meta">Height: ${toy.actualHeight}</div>
              <h3 class="product-card-title">${toy.name}</h3>
              <p class="product-card-desc">${toy.description}</p>
              <div class="toy-specs-box">
                <div class="spec-row">
                  <span>Batch Lot Size:</span>
                  <strong>${toy.unitsPerLot} units</strong>
                </div>
                <div class="spec-row">
                  <span>Effective Unit Cost:</span>
                  <strong>${GGUtils.formatCurrency(toy.unitPrice)}/pc</strong>
                </div>
              </div>
              <div class="product-sizes-row">
                <span class="sizes-label">Available Tiers:</span>
                ${availableSizesBadges}
              </div>
              <div class="product-card-footer">
                <div class="price-box">
                  <span class="price-caption">Wholesale Lot Price</span>
                  <span class="price-val">${GGUtils.formatCurrency(toy.pricePerLot)}</span>
                </div>
                <button type="button" class="btn btn-primary btn-sm" onclick="GGCart.addItem({id:'${toy.id}', name:'${toy.name} (${toy.unitsPerLot} pcs lot)', price:${toy.pricePerLot}, image:'${toy.image}', category:'Toys'}, '${toy.actualHeight}', 1)">
                  <i data-lucide="shopping-cart"></i> Add Lot
                </button>
              </div>
            </div>
          </div>
        `;
      });

      container.innerHTML = html;
      if (window.lucide) lucide.createIcons({ root: container });
    };

    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentCategory = tab.getAttribute('data-cat') || 'all';
        render();
      });
    });

    if (sizeSelect) {
      sizeSelect.addEventListener('change', (e) => {
        currentSize = e.target.value;
        render();
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.trim().toLowerCase();
        render();
      });
    }

    render();
  },

  // 4. SPARE PARTS PAGE LOGIC (Reference 2: Complete sets, coin mech, power supply, PCB, etc.)
  initSparePartsPage() {
    const container = document.getElementById('spare-parts-grid-container');
    const categoryTabs = document.querySelectorAll('.part-cat-tab');
    const searchInput = document.getElementById('part-search-input');

    let currentCategory = 'all';
    let currentSearch = '';

    const render = () => {
      let filtered = GG_DATA.spareParts.filter(part => {
        const matchesCategory = currentCategory === 'all' || part.category === currentCategory;
        const matchesSearch = part.name.toLowerCase().includes(currentSearch) ||
                              part.partNumber.toLowerCase().includes(currentSearch) ||
                              part.description.toLowerCase().includes(currentSearch);
        return matchesCategory && matchesSearch;
      });

      if (filtered.length === 0) {
        container.innerHTML = `
          <div class="catalog-empty-state">
            <i data-lucide="wrench"></i>
            <h3>No Spare Parts Found</h3>
            <p>Try searching with another keyword or part number.</p>
          </div>
        `;
        if (window.lucide) lucide.createIcons({ root: container });
        return;
      }

      let html = '';
      filtered.forEach(part => {
        html += `
          <div class="product-card part-card" data-category="${part.category}">
            <div class="product-card-media">
              <span class="product-sku-pill">${part.partNumber}</span>
              <img src="${part.image}" alt="${part.name}" loading="lazy">
            </div>
            <div class="product-card-body">
              <div class="product-category-meta capitalize">${part.category.replace('-', ' ')}</div>
              <h3 class="product-card-title">${part.name}</h3>
              <p class="product-card-desc">${part.description}</p>
              <ul class="part-features-mini">
                ${part.features.slice(0, 2).map(f => `<li><i data-lucide="check"></i> ${f}</li>`).join('')}
              </ul>
              <div class="product-card-footer">
                <div class="price-box">
                  <span class="price-caption">Genuine OEM Part</span>
                  <span class="price-val">${GGUtils.formatCurrency(part.price)}</span>
                </div>
                <button type="button" class="btn btn-primary btn-sm" onclick="GGCart.addItem({id:'${part.id}', name:'${part.name}', price:${part.price}, image:'${part.image}', category:'Parts'}, null, 1)">
                  <i data-lucide="shopping-cart"></i> Add To Cart
                </button>
              </div>
            </div>
          </div>
        `;
      });

      container.innerHTML = html;
      if (window.lucide) lucide.createIcons({ root: container });
    };

    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentCategory = tab.getAttribute('data-cat') || 'all';
        render();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.trim().toLowerCase();
        render();
      });
    }

    render();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  GGProducts.init();
});
