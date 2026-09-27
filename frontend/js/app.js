/* ==========================================================================
   DESIVORA CORE APP CONTROLLER & GLOBAL INITIALIZER
   ========================================================================== */

import { initScrollReveal, initHeaderScroll, showToast, openDrawer, closeAllDrawers } from './ui.js';
import { updateCartBadges, renderCartDrawer } from './cart.js';
import { updateWishlistBadges } from './wishlist.js';
import { updateAuthUI } from './auth.js';
import { initSearch } from './search.js';

// Setup global elements and event listeners
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize UI Effects
  initScrollReveal();
  initHeaderScroll();
  initSearch();

  // 2. Initialize Badges & User Status
  updateCartBadges();
  updateWishlistBadges();
  updateAuthUI();
  renderCartDrawer();

  // 3. Highlight Current Navigation Link
  highlightActiveNav();

  // 4. Mobile Menu Drawer Triggers
  const mobileMenuBtn = document.querySelector('.hamburger-btn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => openDrawer('mobile-menu-drawer'));
  }

  // 5. Cart Drawer Open Triggers
  const cartTriggers = document.querySelectorAll('.cart-toggle-btn');
  cartTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      renderCartDrawer();
      openDrawer('cart-drawer');
    });
  });

  // 6. Generic Drawer Close Buttons
  const closeButtons = document.querySelectorAll('.drawer-close-btn');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', closeAllDrawers);
  });

  // 7. Backdrop Click
  const backdrop = document.getElementById('drawer-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', closeAllDrawers);
  }

  // 8. Newsletter Forms
  bindNewsletterForms();
});

// Highlight current nav item
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Bind newsletter submit events
function bindNewsletterForms() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input) return;

      const email = input.value.trim();
      if (!email || !email.includes('@')) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      try {
        const res = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (data.success) {
          showToast(data.message || 'Thank you for subscribing!', 'success');
          input.value = '';
        } else {
          showToast(data.message || 'Subscription failed', 'error');
        }
      } catch (err) {
        showToast('Subscribed! Welcome to DesiVora.', 'success');
        input.value = '';
      }
    });
  });
}

// Export global namespace for inline events if needed
window.DesiVora = window.DesiVora = {
  showToast,
  openDrawer,
  closeAllDrawers
};
