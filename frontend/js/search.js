/* ==========================================================================
   VALÈNE SEARCH OVERLAY & PRODUCT SEARCH
   ========================================================================== */

import { formatPrice, openDrawer, closeAllDrawers } from './ui.js';
import { fetchProducts } from './products.js';

let debounceTimer;

export function initSearch() {
  const searchTriggers = document.querySelectorAll('.search-toggle-btn');
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-modal-input');
  const searchResultsContainer = document.getElementById('search-modal-results');
  const searchClose = document.getElementById('search-modal-close');

  if (!searchModal || !searchInput) return;

  searchTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      searchModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => searchInput.focus(), 150);
    });
  });

  if (searchClose) {
    searchClose.addEventListener('click', () => {
      searchModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal.classList.contains('active')) {
      searchModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Debounced input search
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    const query = searchInput.value.trim();

    if (query.length < 2) {
      searchResultsContainer.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted); font-size: 0.9rem;">
          Type at least 2 characters to search across products, materials, or categories...
        </div>
      `;
      return;
    }

    searchResultsContainer.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
        Searching our curated catalog...
      </div>
    `;

    debounceTimer = setTimeout(async () => {
      const products = await fetchProducts({ search: query, limit: 6 });
      renderSearchResults(products, query, searchResultsContainer);
    }, 280);
  });

  // Submit on enter
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const q = searchInput.value.trim();
      if (q) {
        window.location.href = `shop.html?search=${encodeURIComponent(q)}`;
      }
    }
  });
}

function renderSearchResults(products, query, container) {
  if (products.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem;">
        <p style="font-size: 1rem; font-weight: 600; color: var(--text-main); margin-bottom: 0.4rem;">No products found for "${query}"</p>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;">Try searching for headphones, backpack, watch, ceramic, or skincare.</p>
        <a href="shop.html" class="btn btn-secondary btn-sm" onclick="document.getElementById('search-modal').classList.remove('active')">Browse All Goods</a>
      </div>
    `;
    return;
  }

  let html = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-light);">
      <span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">${products.length} Products Found</span>
      <a href="shop.html?search=${encodeURIComponent(query)}" style="font-size: 0.85rem; font-weight: 700; color: var(--accent-primary);">View All Results &rarr;</a>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem;">
  `;

  products.forEach(p => {
    const img = (p.images && p.images.length) ? p.images[0] : '';
    html += `
      <a href="product.html?slug=${p.slug || p._id}" style="display: flex; align-items: center; gap: 0.85rem; padding: 0.6rem; border-radius: 8px; border: 1px solid var(--border-light); background: #FFF; transition: all 0.2s;" onmouseover="this.style.borderColor='var(--accent-primary)'" onmouseout="this.style.borderColor='var(--border-light)'">
        <img src="${img}" alt="${p.name}" style="width: 54px; height: 54px; object-fit: cover; border-radius: 6px; flex-shrink: 0;" />
        <div style="overflow: hidden;">
          <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.name}</div>
          <div style="font-size: 0.75rem; color: var(--accent-primary); font-weight: 600;">${p.category}</div>
          <div style="font-size: 0.85rem; font-weight: 800; color: var(--text-main);">${formatPrice(p.price)}</div>
        </div>
      </a>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}
