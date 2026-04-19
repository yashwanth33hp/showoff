// ============================================
// SHOWOFF - State Management Store
// ============================================

const STORAGE_KEYS = {
  CART: 'showoff_cart',
  WISHLIST: 'showoff_wishlist',
  RECENT: 'showoff_recent',
};

function loadFromStorage(key, fallback = []) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn('Storage full or unavailable:', e);
  }
}

// ---- Internal State ----
let cart = loadFromStorage(STORAGE_KEYS.CART);
let wishlist = loadFromStorage(STORAGE_KEYS.WISHLIST);
let recentlyViewed = loadFromStorage(STORAGE_KEYS.RECENT);
let listeners = [];

function notify() {
  listeners.forEach(fn => fn(getState()));
}

// ---- Public API ----

export function subscribe(fn) {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter(l => l !== fn);
  };
}

export function getState() {
  return {
    cart: [...cart],
    wishlist: [...wishlist],
    recentlyViewed: [...recentlyViewed],
    cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    cartTotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };
}

// ---- Cart Operations ----

export function addToCart(product, size, color, quantity = 1) {
  const existing = cart.find(
    item => item.productId === product.id && item.size === size && item.color === color
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: Date.now(),
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      size,
      color,
      quantity,
    });
  }

  saveToStorage(STORAGE_KEYS.CART, cart);
  notify();
}

export function removeFromCart(cartItemId) {
  cart = cart.filter(item => item.id !== cartItemId);
  saveToStorage(STORAGE_KEYS.CART, cart);
  notify();
}

export function updateCartQuantity(cartItemId, quantity) {
  const item = cart.find(i => i.id === cartItemId);
  if (item) {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
    } else {
      item.quantity = quantity;
      saveToStorage(STORAGE_KEYS.CART, cart);
      notify();
    }
  }
}

export function clearCart() {
  cart = [];
  saveToStorage(STORAGE_KEYS.CART, cart);
  notify();
}

// ---- Wishlist Operations ----

export function toggleWishlist(productId) {
  const index = wishlist.indexOf(productId);
  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(productId);
  }
  saveToStorage(STORAGE_KEYS.WISHLIST, wishlist);
  notify();
}

export function isInWishlist(productId) {
  return wishlist.includes(productId);
}

// ---- Recently Viewed ----

export function addRecentlyViewed(productId) {
  recentlyViewed = recentlyViewed.filter(id => id !== productId);
  recentlyViewed.unshift(productId);
  if (recentlyViewed.length > 10) recentlyViewed = recentlyViewed.slice(0, 10);
  saveToStorage(STORAGE_KEYS.RECENT, recentlyViewed);
  notify();
}

// ---- Toast Notifications ----

export function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
      <span class="toast-message">${message}</span>
    </div>
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('toast-show'));
  setTimeout(() => {
    toast.classList.remove('toast-show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
