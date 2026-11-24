/**
 * GAME & GAMES AMUSEMENT - UTILITIES
 */

const GGUtils = {
  // Format currency into Indian Rupees (INR)
  formatCurrency(amount) {
    if (isNaN(amount)) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  },

  // Toast Notification System
  showToast(message, type = 'info', duration = 3500) {
    let container = document.getElementById('gg-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'gg-toast-container';
      container.className = 'gg-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `gg-toast gg-toast-${type}`;
    
    // Choose icon
    let iconName = 'info';
    if (type === 'success') iconName = 'check-circle';
    if (type === 'error') iconName = 'alert-triangle';
    if (type === 'warning') iconName = 'alert-circle';

    toast.innerHTML = `
      <div class="gg-toast-icon">
        <i data-lucide="${iconName}"></i>
      </div>
      <div class="gg-toast-content">
        <p>${message}</p>
      </div>
      <button class="gg-toast-close" aria-label="Close Notification">&times;</button>
    `;

    container.appendChild(toast);
    if (window.lucide) {
      lucide.createIcons({ root: toast });
    }

    const closeBtn = toast.querySelector('.gg-toast-close');
    const dismiss = () => {
      toast.classList.add('fade-out');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    };

    closeBtn.addEventListener('click', dismiss);
    setTimeout(dismiss, duration);
  },

  // Modal Dialog Controller
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    const closeButtons = modal.querySelectorAll('[data-close-modal]');
    closeButtons.forEach(btn => {
      btn.onclick = () => GGUtils.closeModal(modalId);
    });
    modal.onclick = (e) => {
      if (e.target === modal) GGUtils.closeModal(modalId);
    };
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  },

  // URL query parameter helper
  getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  },

  // Safe localStorage accessor
  storage: {
    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (e) {
        console.warn('LocalStorage access error:', e);
        return defaultValue;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.warn('LocalStorage save error:', e);
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.warn('LocalStorage remove error:', e);
      }
    }
  }
};
