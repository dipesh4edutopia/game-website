/**
 * GAME & GAMES AMUSEMENT - FORM VALIDATION & SIMULATION
 * Complies with strict project rules:
 * - Validates input locally.
 * - Displays clear, honest messages that actual submissions & payment processing
 *   will be enabled upon Phase 2 Python Flask / REST backend integration.
 * - Never deceives the user.
 */

const GGForms = {
  init() {
    this.bindForms();
  },

  bindForms() {
    // 1. Generic form submit listener
    const forms = document.querySelectorAll('form[data-gg-form]');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmit(form);
      });
    });

    // 2. Newsletter / Quick email capture forms
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        if (!emailInput || !this.isValidEmail(emailInput.value)) {
          GGUtils.showToast('Please provide a valid email address.', 'error');
          return;
        }
        this.showSimulationModal(
          'Newsletter Subscription (Demonstration Mode)',
          `Thank you for your interest (${emailInput.value})! This is Phase 1 (Static Frontend). Your email has been validated locally. In Phase 2, this will connect to our automated new machine arrival alert service.`
        );
        form.reset();
      });
    });

    // 3. Checkout Demonstration Form
    const checkoutForm = document.getElementById('checkout-demo-form');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleCheckoutDemo(checkoutForm);
      });
    }
  },

  handleFormSubmit(form) {
    const formType = form.getAttribute('data-gg-form') || 'Inquiry';
    const nameInput = form.querySelector('[name="name"]') || form.querySelector('[name="fullname"]');
    const emailInput = form.querySelector('[name="email"]');
    const phoneInput = form.querySelector('[name="phone"]');
    const messageInput = form.querySelector('[name="message"]') || form.querySelector('[name="notes"]');

    // Validation
    if (nameInput && nameInput.value.trim().length < 2) {
      GGUtils.showToast('Please enter your full name (minimum 2 characters).', 'error');
      nameInput.focus();
      return;
    }

    if (emailInput && !this.isValidEmail(emailInput.value)) {
      GGUtils.showToast('Please enter a valid email address.', 'error');
      emailInput.focus();
      return;
    }

    if (phoneInput && !this.isValidPhone(phoneInput.value)) {
      GGUtils.showToast('Please enter a valid 10-digit contact phone number.', 'error');
      phoneInput.focus();
      return;
    }

    if (messageInput && messageInput.value.trim().length < 5) {
      GGUtils.showToast('Please provide a brief message or subject details.', 'error');
      messageInput.focus();
      return;
    }

    // Success simulation
    const name = nameInput ? nameInput.value.trim() : 'Valued Visitor';
    const phone = phoneInput ? phoneInput.value.trim() : '';

    this.showSimulationModal(
      `${formType} Form Validated (Phase 1 Frontend)`,
      `Thank you, <strong>${name}</strong>! All inputs passed frontend validation.<br><br>
      <div class="simulation-notice-box">
        <i data-lucide="info"></i>
        <span><strong>Phase 1 Notice:</strong> This website is currently operating as a static frontend. No backend database or live email dispatcher is connected yet. In Phase 2, this form will connect directly to our Python Flask REST API and sales CRM.</span>
      </div>
      <br>If you need immediate assistance, please call our direct business line: <strong>+91 8855922736</strong> (Mon–Sat, 10 AM to 6 PM).`
    );

    form.reset();
  },

  handleCheckoutDemo(form) {
    const items = GGCart.getItems();
    if (items.length === 0) {
      GGUtils.showToast('Your cart is empty. Add items before placing an order.', 'warning');
      return;
    }

    const name = form.querySelector('[name="name"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const address = form.querySelector('[name="address"]').value.trim();
    const city = form.querySelector('[name="city"]').value.trim();

    if (!name || !phone || !address || !city) {
      GGUtils.showToast('Please fill in all required shipping fields.', 'error');
      return;
    }

    const total = GGCart.getSubtotal();

    this.showSimulationModal(
      'Order Checkout Demonstration',
      `Thank you, <strong>${name}</strong>!<br><br>
      Your simulated order total is <strong>${GGUtils.formatCurrency(total)}</strong> for ${items.length} unique item(s).<br><br>
      <div class="simulation-notice-box warning">
        <i data-lucide="alert-circle"></i>
        <span><strong>No Payment Processed:</strong> As specified for Phase 1, real payment gateway (Razorpay / UPI) and order fulfillment databases are excluded from this static deployment. No bank account or card was charged.</span>
      </div>
      <br>In Phase 2, this workflow will process secure tokenized payments, issue automated GST invoices, and notify our logistics warehouse for immediate dispatch.`
    );

    GGCart.clearCart();
    form.reset();
  },

  isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  isValidPhone(phone) {
    const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
    return cleaned.length >= 10;
  },

  showSimulationModal(title, htmlContent) {
    let modal = document.getElementById('simulation-feedback-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'simulation-feedback-modal';
      modal.className = 'gg-modal';
      modal.innerHTML = `
        <div class="gg-modal-dialog">
          <div class="gg-modal-header">
            <h3 class="modal-title" id="sim-modal-title">Form Validated</h3>
            <button type="button" class="modal-close-btn" data-close-modal>&times;</button>
          </div>
          <div class="gg-modal-body" id="sim-modal-body"></div>
          <div class="gg-modal-footer">
            <button type="button" class="btn btn-primary" data-close-modal>Understood &amp; Close</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    document.getElementById('sim-modal-title').textContent = title;
    document.getElementById('sim-modal-body').innerHTML = htmlContent;

    GGUtils.openModal('simulation-feedback-modal');
    if (window.lucide) {
      lucide.createIcons({ root: modal });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  GGForms.init();
});
