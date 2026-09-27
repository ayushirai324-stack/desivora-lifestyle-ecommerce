/* ==========================================================================
   DESIVORA SHOPPING CART CONTROLLER
   ========================================================================== */

import { formatPrice, showToast, openDrawer } from './ui.js';

const CART_KEY = 'desivora_cart';
const LEGACY_CART_KEY = 'valene_cart';
const PROMO_KEY = 'desivora_applied_promo';
const SHIPPING_THRESHOLD = 2999.00;
const STANDARD_SHIPPING_FEE = 199.00;

// Valid Promo Codes
export const PROMO_CODES = {
  'DESIVORA10': { discountPercent: 10, label: '10% DesiVora Welcome' },
  'DESIVORA10': { discountPercent: 10, label: '10% DesiVora Welcome' },
  'SAVE15': { discountPercent: 15, label: '15% Seasonal Release' },
  'FREESHIP': { freeShipping: true, label: 'Complimentary Express Delivery' }
};

// Get current cart array
export function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY) || localStorage.getItem(LEGACY_CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to read cart from localStorage', e);
    return [];
  }
}

// Save cart to localStorage
export function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadges();
  } catch (e) {
    console.error('Failed to save cart', e);
  }
}

// Add item to cart
export function addToCart(item, openDrawerAfterAdd = true) {
  const cart = getCart();
  const existingIdx = cart.findIndex(
    i => (i.slug === item.slug) && 
         (i.selectedColor === item.selectedColor) && 
         (i.selectedSize === item.selectedSize)
  );

  if (existingIdx !== -1) {
    cart[existingIdx].quantity += (item.quantity || 1);
  } else {
    cart.push({
      slug: item.slug,
      name: item.name,
      price: Number(item.price),
      image: item.image,
      category: item.category,
      quantity: item.quantity || 1,
      selectedColor: item.selectedColor || null,
      selectedSize: item.selectedSize || null
    });
  }

  saveCart(cart);
  renderCartDrawer();

  if (openDrawerAfterAdd) {
    openDrawer('cart-drawer');
  }
}

// Remove item from cart
export function removeFromCart(index) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    const removed = cart.splice(index, 1)[0];
    saveCart(cart);
    renderCartDrawer();
    return removed;
  }
  return null;
}

// Update item quantity
export function updateCartQuantity(index, quantity) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    if (quantity <= 0) {
      removeFromCart(index);
    } else {
      cart[index].quantity = quantity;
      saveCart(cart);
      renderCartDrawer();
    }
  }
}

// Clear all cart items
export function clearCart() {
  localStorage.removeItem(CART_KEY);
  localStorage.removeItem(PROMO_KEY);
  updateCartBadges();
  renderCartDrawer();
}

// Calculate totals
export function getCartSummary() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const promo = getAppliedPromo();

  let discount = 0;
  if (promo && promo.discountPercent) {
    discount = (subtotal * promo.discountPercent) / 100;
  }

  let shipping = 0;
  if (subtotal > 0) {
    if (subtotal >= SHIPPING_THRESHOLD || (promo && promo.freeShipping)) {
      shipping = 0;
    } else {
      shipping = STANDARD_SHIPPING_FEE;
    }
  }

  const total = Math.max(0, subtotal - discount + shipping);

  return {
    itemCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    subtotal,
    shipping,
    discount,
    total,
    freeShippingThreshold: SHIPPING_THRESHOLD,
    amountForFreeShipping: Math.max(0, SHIPPING_THRESHOLD - subtotal),
    promo
  };
}

// Promo Code Management
export function applyPromoCode(code) {
  if (!code) return { success: false, message: 'Please enter a coupon code' };
  const clean = code.trim().toUpperCase();
  if (PROMO_CODES[clean]) {
    localStorage.setItem(PROMO_KEY, clean);
    return { success: true, message: `Promo code "${clean}" applied! (${PROMO_CODES[clean].label})` };
  }
  return { success: false, message: 'Invalid or expired promotional code' };
}

export function getAppliedPromo() {
  const code = localStorage.getItem(PROMO_KEY);
  if (code && PROMO_CODES[code]) {
    return { code, ...PROMO_CODES[code] };
  }
  return null;
}

export function removePromoCode() {
  localStorage.removeItem(PROMO_KEY);
}

// Update all cart badge counts in the DOM
export function updateCartBadges() {
  const summary = getCartSummary();
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(badge => {
    badge.textContent = summary.itemCount;
    badge.style.display = summary.itemCount > 0 ? 'flex' : 'none';
  });
}

// Render the slide-out Cart Drawer
export function renderCartDrawer() {
  const drawerBody = document.getElementById('cart-drawer-items');
  const drawerFooter = document.getElementById('cart-drawer-footer');
  if (!drawerBody || !drawerFooter) return;

  const cart = getCart();
  const summary = getCartSummary();

  if (cart.length === 0) {
    drawerBody.innerHTML = `
      <div class="empty-state" style="padding: 3rem 1rem;">
        <div class="empty-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </div>
        <h4 style="margin-bottom: 0.5rem; font-weight: 700;">Your shopping bag is empty</h4>
        <p style="font-size: 0.875rem; margin-bottom: 1.5rem;">Explore our curated collection of intentional essentials.</p>
        <a href="shop.html" class="btn btn-primary btn-sm">Explore Collection</a>
      </div>
    `;
    drawerFooter.style.display = 'none';
    return;
  }

  drawerFooter.style.display = 'block';

  // Shipping progress indicator
  const progressPercent = Math.min(100, (summary.subtotal / SHIPPING_THRESHOLD) * 100);
  let shippingMsg = summary.subtotal >= SHIPPING_THRESHOLD
    ? `🎉 You've unlocked <strong>Complimentary Carbon-Neutral Delivery</strong>!`
    : `Add <strong>${formatPrice(summary.amountForFreeShipping)}</strong> more to unlock Free Delivery`;

  let itemsHtml = `
    <div style="background-color: var(--bg-soft-green); padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1.25rem; font-size: 0.8125rem;">
      <div style="margin-bottom: 6px;">${shippingMsg}</div>
      <div style="background-color: #D3DFCA; height: 5px; border-radius: 99px; overflow: hidden;">
        <div style="background-color: var(--accent-primary); width: ${progressPercent}%; height: 100%; transition: width 0.3s ease;"></div>
      </div>
    </div>
    <div class="drawer-item-list" style="display: flex; flex-direction: column; gap: 1rem;">
  `;

  cart.forEach((item, idx) => {
    itemsHtml += `
      <div class="drawer-item" style="display: flex; gap: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-light);">
        <img src="${item.image}" alt="${item.name}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px; background-color: #F6F6F0;" />
        <div style="flex-grow: 1;">
          <h5 style="font-size: 0.875rem; font-weight: 700; margin-bottom: 3px; line-height: 1.3;">${item.name}</h5>
          ${item.selectedColor ? `<div style="font-size: 0.75rem; color: var(--text-muted);">Color: ${item.selectedColor}</div>` : ''}
          ${item.selectedSize ? `<div style="font-size: 0.75rem; color: var(--text-muted);">Size: ${item.selectedSize}</div>` : ''}
          <div style="font-weight: 700; font-size: 0.9rem; margin-top: 4px;">${formatPrice(item.price)}</div>

          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 8px;">
            <div style="display: inline-flex; align-items: center; border: 1px solid var(--border-light); border-radius: 6px; background-color: #FFFFFF;">
              <button class="cart-qty-btn" data-action="dec" data-index="${idx}" style="padding: 2px 8px; font-weight: 700; color: var(--text-muted);">&minus;</button>
              <span style="font-size: 0.8125rem; font-weight: 600; padding: 0 6px;">${item.quantity}</span>
              <button class="cart-qty-btn" data-action="inc" data-index="${idx}" style="padding: 2px 8px; font-weight: 700; color: var(--text-muted);">&plus;</button>
            </div>
            <button class="cart-remove-btn" data-index="${idx}" style="font-size: 0.75rem; color: #DF4A38; font-weight: 600;">Remove</button>
          </div>
        </div>
      </div>
    `;
  });

  itemsHtml += `</div>`;
  drawerBody.innerHTML = itemsHtml;

  // Drawer Footer
  drawerFooter.innerHTML = `
    <div style="margin-bottom: 1rem;">
      <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 0.4rem;">
        <span style="color: var(--text-muted);">Subtotal</span>
        <span style="font-weight: 700;">${formatPrice(summary.subtotal)}</span>
      </div>
      ${summary.discount > 0 ? `
      <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--status-success); margin-bottom: 0.4rem;">
        <span>Discount (${summary.promo.code})</span>
        <span>-${formatPrice(summary.discount)}</span>
      </div>` : ''}
      <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.6rem;">
        <span>Estimated Delivery</span>
        <span>${summary.shipping === 0 ? 'Complimentary' : formatPrice(summary.shipping)}</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 1.1rem; font-weight: 800; border-top: 1px solid var(--border-light); padding-top: 0.6rem;">
        <span>Total</span>
        <span>${formatPrice(summary.total)}</span>
      </div>
    </div>
    <div style="display: flex; flex-direction: column; gap: 0.6rem;">
      <a href="checkout.html" class="btn btn-primary btn-block">Proceed to Checkout</a>
      <a href="cart.html" class="btn btn-secondary btn-block btn-sm">View Full Bag</a>
    </div>
  `;

  // Attach quantity and remove events inside drawer
  drawerBody.querySelectorAll('.cart-qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index'));
      const action = btn.getAttribute('data-action');
      const currentCart = getCart();
      if (action === 'inc') {
        updateCartQuantity(idx, currentCart[idx].quantity + 1);
      } else {
        updateCartQuantity(idx, currentCart[idx].quantity - 1);
      }
    });
  });

  drawerBody.querySelectorAll('.cart-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index'));
      const removed = removeFromCart(idx);
      if (removed) showToast(`"${removed.name}" removed from bag.`);
    });
  });
}
