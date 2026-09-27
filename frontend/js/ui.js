/* ==========================================================================
   VALÈNE UI UTILITIES & INTERACTION CONTROLLER
   ========================================================================== */

// Toast Notifications System
export function showToast(message, type = 'success', duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const iconMarkup = type === 'success' 
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#71884A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DF4A38" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

  toast.innerHTML = `
    <div class="toast-icon">${iconMarkup}</div>
    <div class="toast-msg">${message}</div>
    <button class="toast-close" aria-label="Close Notification">&times;</button>
  `;

  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => removeToast(toast));

  container.appendChild(toast);

  const timer = setTimeout(() => {
    removeToast(toast);
  }, duration);

  function removeToast(el) {
    clearTimeout(timer);
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px) scale(0.95)';
    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 200);
  }
}

// Drawer and Backdrop Utilities
export function openDrawer(drawerId) {
  const drawer = document.getElementById(drawerId);
  const backdrop = document.getElementById('drawer-backdrop');
  if (drawer && backdrop) {
    backdrop.classList.add('active');
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

export function closeAllDrawers() {
  const backdrop = document.getElementById('drawer-backdrop');
  const drawers = document.querySelectorAll('.side-drawer');
  if (backdrop) backdrop.classList.remove('active');
  drawers.forEach(d => d.classList.remove('active'));
  document.body.style.overflow = '';
}

// Scroll Reveal Observer
export function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// Sticky Header Scroll Effect
export function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

// Format Currency in Indian Rupees (INR ₹)
export function formatPrice(price) {
  if (typeof price !== 'number') price = Number(price) || 0;
  if (Number.isInteger(price)) {
    return '₹' + price.toLocaleString('en-IN');
  }
  return '₹' + price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Rating Stars HTML
export function renderStars(rating = 4.8) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.4;
  let html = '';

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      html += `<svg width="14" height="14" viewBox="0 0 24 24" fill="#E6A23C" stroke="#E6A23C" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    } else if (i === fullStars && hasHalf) {
      html += `<svg width="14" height="14" viewBox="0 0 24 24" fill="#E6A23C" stroke="#E6A23C" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    } else {
      html += `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    }
  }

  return html;
}
