/* ==========================================================================
   VALÈNE PRODUCT RENDERING & API SERVICES
   ========================================================================== */

import { formatPrice, renderStars, showToast } from './ui.js';
import { isProductInWishlist, toggleWishlist } from './wishlist.js';
import { addToCart } from './cart.js';

// Render a single product card HTML
export function createProductCardHTML(product) {
  const isWishlisted = isProductInWishlist(product.slug || product._id);
  const image = (product.images && product.images.length) 
    ? product.images[0] 
    : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';

  let badgeHtml = '';
  if (product.discount > 0) {
    badgeHtml = `<span class="product-badge badge-sale">-${product.discount}%</span>`;
  } else if (product.newArrival) {
    badgeHtml = `<span class="product-badge badge-new">New</span>`;
  } else if (product.bestseller) {
    badgeHtml = `<span class="product-badge badge-bestseller">Popular</span>`;
  }

  return `
    <article class="product-card" data-id="${product._id || product.slug}">
      <div class="product-image-wrap">
        ${badgeHtml}
        <button class="wishlist-toggle ${isWishlisted ? 'active' : ''}" 
                data-slug="${product.slug || product._id}" 
                aria-label="Save to Wishlist">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <a href="product.html?slug=${product.slug || product._id}">
          <img src="${image}" alt="${product.name}" loading="lazy" />
        </a>
      </div>

      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-title">
          <a href="product.html?slug=${product.slug || product._id}">${product.name}</a>
        </h3>

        <div class="product-rating">
          <div class="stars">${renderStars(product.rating || 4.8)}</div>
          <span class="review-count">(${product.reviewCount || 42})</span>
        </div>

        <div class="product-pricing">
          <span class="price-current">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ''}
        </div>

        <button class="card-add-btn add-to-cart-trigger" 
                data-slug="${product.slug || product._id}"
                data-name="${product.name}"
                data-price="${product.price}"
                data-image="${image}"
                data-category="${product.category}">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          Add to Bag
        </button>
      </div>
    </article>
  `;
}

// Fetch products from backend API
export async function fetchProducts(filters = {}) {
  const queryParams = new URLSearchParams();
  Object.keys(filters).forEach(key => {
    if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
      queryParams.append(key, filters[key]);
    }
  });

  try {
    const res = await fetch(`/api/products?${queryParams.toString()}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.products || [];
  } catch (err) {
    console.warn('API fetchProducts error:', err.message);
    return [];
  }
}

// Fetch single product by slug or ID
export async function fetchProductBySlug(slug) {
  try {
    const res = await fetch(`/api/products/${slug}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('fetchProductBySlug error:', err);
    return null;
  }
}

// Attach event listeners for Wishlist & Add to Bag on a container
export function bindProductCardEvents(container) {
  if (!container) return;

  // Wishlist clicks
  const wishlistButtons = container.querySelectorAll('.wishlist-toggle');
  wishlistButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const slug = btn.getAttribute('data-slug');
      const card = btn.closest('.product-card');
      const title = card ? card.querySelector('.product-title a')?.textContent : 'Product';
      
      const isNowWishlisted = toggleWishlist(slug);
      if (isNowWishlisted) {
        btn.classList.add('active');
        btn.querySelector('svg').setAttribute('fill', 'currentColor');
        btn.classList.add('heart-pulsing');
        setTimeout(() => btn.classList.remove('heart-pulsing'), 500);
        showToast(`"${title}" added to your wishlist.`);
      } else {
        btn.classList.remove('active');
        btn.querySelector('svg').setAttribute('fill', 'none');
        showToast(`"${title}" removed from wishlist.`);
      }
    });
  });

  // Add to Bag clicks
  const addButtons = container.querySelectorAll('.add-to-cart-trigger');
  addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const item = {
        slug: btn.getAttribute('data-slug'),
        name: btn.getAttribute('data-name'),
        price: parseFloat(btn.getAttribute('data-price')),
        image: btn.getAttribute('data-image'),
        category: btn.getAttribute('data-category'),
        quantity: 1
      };

      addToCart(item);
      showToast(`Added "${item.name}" to your shopping bag.`);
    });
  });
}

// Render skeleton loaders into a grid
export function renderSkeletons(container, count = 4) {
  if (!container) return;
  let html = '';
  for (let i = 0; i < count; i++) {
    html += `
      <div class="product-card" style="pointer-events: none;">
        <div class="skeleton" style="width: 100%; aspect-ratio: 1/1;"></div>
        <div style="padding: 1.25rem;">
          <div class="skeleton" style="width: 30%; height: 12px; margin-bottom: 8px;"></div>
          <div class="skeleton" style="width: 80%; height: 18px; margin-bottom: 8px;"></div>
          <div class="skeleton" style="width: 45%; height: 14px; margin-bottom: 12px;"></div>
          <div class="skeleton" style="width: 100%; height: 38px; border-radius: 8px;"></div>
        </div>
      </div>
    `;
  }
  container.innerHTML = html;
}
