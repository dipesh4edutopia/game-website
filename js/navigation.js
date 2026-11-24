/**
 * GAME & GAMES AMUSEMENT - LAYOUT, NAVIGATION & THEME
 * - Light/dark theme switch (light is the default, choice is remembered)
 * - Mobile drawer, sticky header, active-link highlighting
 * - Injects shared UI that every page needs (callback modal, quick-action bar, back-to-top)
 */
(function () {
  'use strict';

  var THEME_KEY = 'gg_theme';
  var root = document.documentElement;

  /* ---------------- Theme ---------------- */
  function currentTheme() { return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }

  function syncToggles() {
    var dark = currentTheme() === 'dark';
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      btn.setAttribute('title', dark ? 'Switch to light theme' : 'Switch to dark theme');
    });
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#0A0F1D' : '#D91F26');
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* storage unavailable */ }
    syncToggles();
  }

  /* ---------------- Shared UI injected on every page ---------------- */
  function ensureGlobalUI() {
    if (!document.getElementById('callback-request-modal')) {
      var modal = document.createElement('div');
      modal.className = 'gg-modal';
      modal.id = 'callback-request-modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-labelledby', 'cb-modal-title');
      modal.innerHTML =
        '<div class="gg-modal-dialog">' +
          '<div class="gg-modal-header"><h3 class="modal-title" id="cb-modal-title">Request A Callback</h3>' +
          '<button type="button" class="modal-close-btn" data-close-modal aria-label="Close">&times;</button></div>' +
          '<div class="gg-modal-body">' +
            '<p style="margin-bottom:1.25rem;">Our team is available Monday to Saturday, 10 AM to 6 PM. Leave your details and tell us what you need.</p>' +
            '<form data-gg-form="Callback Request">' +
              '<div class="form-group"><label class="form-label" for="gg-cb-name">Full Name *</label><input type="text" id="gg-cb-name" name="name" class="form-control" placeholder="Your name" required maxlength="80"></div>' +
              '<div class="form-group"><label class="form-label" for="gg-cb-phone">Phone Number *</label><input type="tel" id="gg-cb-phone" name="phone" class="form-control" placeholder="10-digit mobile number" required maxlength="15" inputmode="tel"></div>' +
              '<div class="form-group"><label class="form-label" for="gg-cb-email">Email</label><input type="email" id="gg-cb-email" name="email" class="form-control" placeholder="you@example.com" maxlength="120"></div>' +
              '<div class="form-group"><label class="form-label" for="gg-cb-subject">Topic</label><select id="gg-cb-subject" name="subject" class="form-control">' +
                '<option>Buying arcade machines</option><option>EMI financing</option><option>Revenue sharing for my venue</option>' +
                '<option>Toys &amp; prizes</option><option>Spare parts &amp; repairs</option><option>Advertising</option><option>Handbook of Wisdom</option></select></div>' +
              '<button type="submit" class="btn btn-primary" style="width:100%;"><i data-lucide="phone"></i> Request Callback</button>' +
            '</form>' +
          '</div>' +
        '</div>';
      document.body.appendChild(modal);
    }

    if (!document.getElementById('back-to-top')) {
      var up = document.createElement('button');
      up.type = 'button';
      up.className = 'back-to-top';
      up.id = 'back-to-top';
      up.setAttribute('aria-label', 'Back to top');
      up.innerHTML = '<i data-lucide="arrow-up"></i>';
      document.body.appendChild(up);
    }

    if (!document.querySelector('.mobile-action-bar')) {
      var bar = document.createElement('nav');
      bar.className = 'mobile-action-bar';
      bar.setAttribute('aria-label', 'Quick actions');
      bar.innerHTML =
        '<a href="tel:+918855922736"><i data-lucide="phone"></i><span>Call</span></a>' +
        '<a href="https://wa.me/918855922736" target="_blank" rel="noopener"><i data-lucide="message-circle"></i><span>WhatsApp</span></a>' +
        '<a href="cart.html"><i data-lucide="shopping-bag"></i><span>Cart</span></a>' +
        '<button type="button" class="is-primary" data-open-callback><i data-lucide="phone-call"></i><span>Enquire</span></button>';
      document.body.appendChild(bar);
    }
  }

  /* ---------------- Active link highlighting ---------------- */
  function highlightActive() {
    var file = location.pathname.split('/').pop() || 'index.html';
    var id = new URLSearchParams(location.search).get('id');
    var alias = { 'game-details.html': 'games.html', 'checkout.html': 'cart.html' };
    var target = alias[file] || file;

    function parts(href) { var h = (href || '').split('#')[0].split('?'); return { path: h[0], query: h[1] || '' }; }
    function isCurrent(href) {
      var p = parts(href);
      if (p.path !== file) return false;
      return p.query.indexOf('id=') === 0 ? p.query.slice(3) === id : true;
    }
    function isInSection(href) { var p = parts(href).path; return p === file || p === target; }

    document.querySelectorAll('.desktop-nav > .nav-item').forEach(function (item) {
      var top = item.querySelector(':scope > .nav-link');
      var kids = item.querySelectorAll('.dropdown-link');
      var match = false;
      kids.forEach(function (a) {
        if (isCurrent(a.getAttribute('href'))) { a.classList.add('active'); }
        if (isInSection(a.getAttribute('href'))) match = true;
      });
      if (!kids.length && top && isCurrent(top.getAttribute('href'))) match = true;
      if (match && top) top.classList.add('active');
    });

    document.querySelectorAll('.drawer-nav-item').forEach(function (item) {
      var direct = item.querySelector(':scope > a.drawer-link');
      if (direct && isCurrent(direct.getAttribute('href'))) direct.classList.add('active');
      var toggle = item.querySelector(':scope > .drawer-dropdown-toggle');
      if (toggle) {
        var hit = false;
        item.querySelectorAll('.drawer-submenu a').forEach(function (a) {
          if (isCurrent(a.getAttribute('href'))) { a.classList.add('active'); }
          if (isInSection(a.getAttribute('href'))) hit = true;
        });
        if (hit) { item.classList.add('expanded'); toggle.setAttribute('aria-expanded', 'true'); toggle.classList.add('active'); }
      }
    });
  }

  /* ---------------- Init ---------------- */
  document.addEventListener('DOMContentLoaded', function () {
    ensureGlobalUI();
    syncToggles();

    // Theme toggles (header + drawer)
    document.addEventListener('click', function (e) {
      var t = e.target.closest('.theme-toggle');
      if (t) { setTheme(currentTheme() === 'dark' ? 'light' : 'dark'); }
    });

    // Footer year
    var y = new Date().getFullYear();
    document.querySelectorAll('.js-year').forEach(function (el) { el.textContent = y; });

    // Drawer
    var burger = document.querySelector('.mobile-toggle-btn');
    var drawer = document.getElementById('mobile-drawer');
    var overlay = document.getElementById('drawer-overlay');
    var closeBtn = document.querySelector('.drawer-close-btn');

    function openDrawer() {
      if (!drawer) return;
      drawer.classList.add('open');
      if (overlay) overlay.classList.add('visible');
      document.body.classList.add('drawer-open');
      if (burger) { burger.setAttribute('aria-expanded', 'true'); burger.setAttribute('aria-label', 'Close menu'); }
      if (closeBtn) closeBtn.focus();
    }
    function closeDrawer() {
      if (!drawer) return;
      drawer.classList.remove('open');
      if (overlay) overlay.classList.remove('visible');
      document.body.classList.remove('drawer-open');
      if (burger) { burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Open menu'); }
    }
    if (burger) burger.addEventListener('click', function () { drawer.classList.contains('open') ? closeDrawer() : openDrawer(); });
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);
    if (drawer) {
      drawer.addEventListener('click', function (e) {
        var toggle = e.target.closest('.drawer-dropdown-toggle');
        if (toggle) {
          var item = toggle.closest('.drawer-nav-item');
          var open = item.classList.toggle('expanded');
          toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
          return;
        }
        if (e.target.closest('a[href]') || e.target.closest('[data-open-callback]')) closeDrawer();
      });
    }
    window.addEventListener('resize', function () { if (window.innerWidth > 1100) closeDrawer(); });

    // Escape closes drawer + any modal
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      closeDrawer();
      document.querySelectorAll('.gg-modal.active').forEach(function (m) { if (window.GGUtils) GGUtils.closeModal(m.id); });
    });

    // Sticky header + back-to-top
    var header = document.querySelector('.site-header');
    var toTop = document.getElementById('back-to-top');
    function onScroll() {
      var y2 = window.scrollY;
      if (header) header.classList.toggle('is-sticky', y2 > 40);
      if (toTop) toTop.classList.toggle('visible', y2 > 500);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    if (toTop) toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

    highlightActive();
  });
})();
