/* ==========================================================================
   DESIVORA WISHLIST CONTROLLER
   ========================================================================== */

const WISHLIST_KEY = 'desivora_wishlist';
const LEGACY_WISHLIST_KEY = 'valene_wishlist';

export function getWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY) || localStorage.getItem(LEGACY_WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to get wishlist', e);
    return [];
  }
}

export function saveWishlist(items) {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
    updateWishlistBadges();

    // If authenticated, sync with backend
    const token = localStorage.getItem('desivora_token') || localStorage.getItem('valene_token');
    if (token) {
      fetch('/api/auth/wishlist', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ wishlist: items })
      }).catch(err => console.warn('Wishlist cloud sync error:', err.message));
    }
  } catch (e) {
    console.error('Failed to save wishlist', e);
  }
}

export function isProductInWishlist(slug) {
  const items = getWishlist();
  return items.includes(slug);
}

export function toggleWishlist(slug) {
  const items = getWishlist();
  const idx = items.indexOf(slug);
  let isNowWishlisted = false;

  if (idx !== -1) {
    items.splice(idx, 1);
    isNowWishlisted = false;
  } else {
    items.push(slug);
    isNowWishlisted = true;
  }

  saveWishlist(items);
  return isNowWishlisted;
}

export function removeFromWishlist(slug) {
  const items = getWishlist();
  const filtered = items.filter(s => s !== slug);
  saveWishlist(filtered);
}

export function updateWishlistBadges() {
  const items = getWishlist();
  const badges = document.querySelectorAll('.wishlist-badge');
  badges.forEach(badge => {
    badge.textContent = items.length;
    badge.style.display = items.length > 0 ? 'flex' : 'none';
  });
}
