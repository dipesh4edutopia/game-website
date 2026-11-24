/**
 * GAME & GAMES AMUSEMENT - SHOPPING CART MANAGER
 * Handles localStorage persistence, quantity updates, badge counters, and render views.
 */

const GGCart = {
  STORAGE_KEY: 'gg_cart_items',

  getItems() {
    return GGUtils.storage.get(this.STORAGE_KEY, []);
  },

  saveItems(items) {
    GGUtils.storage.set(this.STORAGE_KEY, items);
    this.updateBadges();
  },

  addItem(product, variant = null, quantity = 1) {
    const items = this.getItems();
    const itemKey = variant ? `${product.id}-${variant}` : product.id;
    
    const existingIndex = items.findIndex(item => item.itemKey === itemKey);

    const price = product.price || product.provisionalPrice || product.pricePerLot || 999;
    const name = product.name;
    const image = product.image || (product.images && product.images[0]) || 'assets/images/handbook/handbook-cover.svg';

    if (existingIndex > -1) {
      items[existingIndex].quantity += quantity;
    } else {
      items.push({
        itemKey: itemKey,
        id: product.id,
        name: name,
        variant: variant,
        price: price,
        image: image,
        quantity: quantity,
        category: product.category || 'General'
      });
    }

    this.saveItems(items);
    GGUtils.showToast(`Added "${name}" to your cart!`, 'success');
  },

  updateQuantity(itemKey, delta) {
    let items = this.getItems();
    const index = items.findIndex(item => item.itemKey === itemKey);
    if (index > -1) {
      items[index].quantity += delta;
      if (items[index].quantity <= 0) {
        items.splice(index, 1);
        GGUtils.showToast('Item removed from cart', 'info');
      }
      this.saveItems(items);
      this.renderCartPage();
    }
  },

  removeItem(itemKey) {
    let items = this.getItems();
    items = items.filter(item => item.itemKey !== itemKey);
    this.saveItems(items);
    GGUtils.showToast('Item removed from cart', 'info');
    this.renderCartPage();
  },

  clearCart() {
    this.saveItems([]);
    this.renderCartPage();
  },

  getTotalCount() {
    const items = this.getItems();
    return items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getSubtotal() {
    const items = this.getItems();
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  updateBadges() {
    const count = this.getTotalCount();
    const badges = document.querySelectorAll('.cart-badge-count');
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  },

  renderCartPage() {
    const container = document.getElementById('cart-items-container');
    const emptyState = document.getElementById('cart-empty-state');
    const summaryCard = document.getElementById('cart-summary-card');
    if (!container) return; // Not on cart page

    const items = this.getItems();
    const layout = document.getElementById('cart-layout');

    if (items.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      if (layout) layout.style.display = 'none';
      if (summaryCard) summaryCard.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (layout) layout.style.display = '';
    if (summaryCard) summaryCard.style.display = 'block';

    let html = '';
    items.forEach(item => {
      html += `
        <div class="cart-item-row" data-key="${item.itemKey}">
          <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.name}</h4>
            ${item.variant ? `<div class="cart-item-variant">Option: <strong>${item.variant}</strong></div>` : ''}
            <div class="cart-item-unit-price">${GGUtils.formatCurrency(item.price)} each</div>
          </div>
          <div class="cart-item-actions">
            <div class="quantity-picker">
              <button type="button" class="qty-btn" onclick="GGCart.updateQuantity('${item.itemKey}', -1)">-</button>
              <span class="qty-number">${item.quantity}</span>
              <button type="button" class="qty-btn" onclick="GGCart.updateQuantity('${item.itemKey}', 1)">+</button>
            </div>
            <div class="cart-item-subtotal">
              ${GGUtils.formatCurrency(item.price * item.quantity)}
            </div>
            <button type="button" class="cart-remove-btn" onclick="GGCart.removeItem('${item.itemKey}')" title="Remove item">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    // Update totals
    const subtotal = this.getSubtotal();
    const subtotalEl = document.getElementById('cart-subtotal-val');
    const totalEl = document.getElementById('cart-total-val');
    if (subtotalEl) subtotalEl.textContent = GGUtils.formatCurrency(subtotal);
    if (totalEl) totalEl.textContent = GGUtils.formatCurrency(subtotal);

    if (window.lucide) {
      lucide.createIcons({ root: container });
    }
  },

  renderCheckoutSummary() {
    const summaryList = document.getElementById('checkout-items-list');
    const subtotalEl = document.getElementById('checkout-subtotal');
    const totalEl = document.getElementById('checkout-total');
    if (!summaryList) return;

    const items = this.getItems();
    if (items.length === 0) {
      summaryList.innerHTML = '<p class="text-muted">Your cart is currently empty. Please add items before proceeding.</p>';
      return;
    }

    let html = '';
    items.forEach(item => {
      html += `
        <div class="checkout-summary-item">
          <div>
            <div class="checkout-item-name">${item.name} x ${item.quantity}</div>
            ${item.variant ? `<div class="checkout-item-variant">${item.variant}</div>` : ''}
          </div>
          <div class="checkout-item-price">${GGUtils.formatCurrency(item.price * item.quantity)}</div>
        </div>
      `;
    });

    summaryList.innerHTML = html;
    const subtotal = this.getSubtotal();
    if (subtotalEl) subtotalEl.textContent = GGUtils.formatCurrency(subtotal);
    if (totalEl) totalEl.textContent = GGUtils.formatCurrency(subtotal);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  GGCart.updateBadges();
  GGCart.renderCartPage();
  GGCart.renderCheckoutSummary();
});
