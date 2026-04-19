// ============================================
// SHOWOFF - Main Application Entry
// Router, Event Handling, Initialization
// ============================================

import './style.css';
import { products, searchProducts, getProductById, filterProducts } from './data.js';
import {
  getState, subscribe, addToCart, removeFromCart, updateCartQuantity,
  toggleWishlist, addRecentlyViewed, showToast, clearCart
} from './store.js';
import {
  renderNavbar, renderMobileNav, renderCartDrawer, renderSearchModal,
  renderBackToTop, renderProductCard, formatPrice, icons
} from './components.js';
import {
  renderHomePage, renderListingPage, renderDetailPage,
  renderCheckoutPage, renderWishlistPage
} from './pages.js';
import {
  renderAdminLogin, renderAdminDashboard, renderAdminProducts,
  renderAdminOrders, isAdminLoggedIn, attachAdminListeners
} from './admin.js';

// ---- App Shell ----
const app = document.getElementById('app');

function renderShell(pageContent) {
  return `
    ${renderNavbar()}
    ${renderSearchModal(products)}
    ${renderCartDrawer()}
    ${pageContent}
    ${renderMobileNav()}
    ${renderBackToTop()}
  `;
}

// ---- Router ----
function parseRoute() {
  const hash = location.hash.slice(1) || '/';
  const parts = hash.split('/').filter(Boolean);

  if (parts.length === 0) return { page: 'home' };
  
  // Admin Routes
  if (parts[0] === 'admin') {
    if (parts[1] === 'login') return { page: 'admin_login', isAdmin: true };
    if (parts[1] === 'dashboard') return { page: 'admin_dashboard', isAdmin: true };
    if (parts[1] === 'products') return { page: 'admin_products', isAdmin: true };
    if (parts[1] === 'orders') return { page: 'admin_orders', isAdmin: true };
    return { page: 'admin_login', isAdmin: true };
  }

  // Store Routes
  if (parts[0] === 'shop' && parts.length === 1) return { page: 'listing', category: null };
  if (parts[0] === 'shop' && parts.length === 2) return { page: 'listing', category: parts[1] };
  if (parts[0] === 'product' && parts[1]) return { page: 'detail', id: parts[1] };
  if (parts[0] === 'checkout') return { page: 'checkout' };
  if (parts[0] === 'wishlist') return { page: 'wishlist' };
  return { page: 'home' };
}

function renderPage(preserveScroll = false) {
  const route = parseRoute();
  let content = '';

  // Handle Admin Authorization & Routing
  if (route.isAdmin) {
    if (route.page !== 'admin_login' && !isAdminLoggedIn()) {
      location.hash = '#/admin/login';
      return;
    }
    if (route.page === 'admin_login' && isAdminLoggedIn()) {
      location.hash = '#/admin/dashboard';
      return;
    }

    switch (route.page) {
      case 'admin_login':
        content = renderAdminLogin();
        app.innerHTML = content;
        attachAdminListeners('login');
        break;
      case 'admin_dashboard':
        content = renderAdminDashboard();
        app.innerHTML = content;
        attachAdminListeners('dashboard');
        break;
      case 'admin_products':
        content = renderAdminProducts();
        app.innerHTML = content;
        attachAdminListeners('products');
        break;
      case 'admin_orders':
        content = renderAdminOrders();
        app.innerHTML = content;
        attachAdminListeners('orders');
        break;
    }
    if (!preserveScroll) window.scrollTo({ top: 0, behavior: 'instant' });
    return;
  }

  // Handle Store Routing
  switch (route.page) {
    case 'home':
      content = renderHomePage();
      break;
    case 'listing':
      content = renderListingPage(route.category);
      break;
    case 'detail':
      content = renderDetailPage(route.id);
      if (route.id) addRecentlyViewed(parseInt(route.id));
      break;
    case 'checkout':
      content = renderCheckoutPage();
      break;
    case 'wishlist':
      content = renderWishlistPage();
      break;
    default:
      content = renderHomePage();
  }

  app.innerHTML = renderShell(content);
  if (!preserveScroll) window.scrollTo({ top: 0, behavior: 'instant' });
  attachEventListeners();
  initScrollAnimations();
  updateActiveNav();
}

// ---- Update components without full re-render ----
function updateCartUI() {
  const state = getState();

  // Update cart badge in navbar
  const cartToggle = document.getElementById('cart-toggle');
  if (cartToggle) {
    const badge = cartToggle.querySelector('.cart-badge');
    if (state.cartCount > 0) {
      if (badge) {
        badge.textContent = state.cartCount;
      } else {
        cartToggle.insertAdjacentHTML('beforeend', `<span class="cart-badge">${state.cartCount}</span>`);
      }
    } else if (badge) {
      badge.remove();
    }
  }

  // Update mobile cart badge
  const mobileBadge = document.querySelector('.mobile-cart-badge');
  if (state.cartCount > 0) {
    if (mobileBadge) {
      mobileBadge.textContent = state.cartCount;
    }
  } else if (mobileBadge) {
    mobileBadge.remove();
  }

  // Re-render cart drawer content
  const cartDrawerEl = document.getElementById('cart-drawer');
  if (cartDrawerEl) {
    const isActive = cartDrawerEl.classList.contains('active');
    const newDrawer = document.createElement('div');
    newDrawer.innerHTML = renderCartDrawer();
    const newCartDrawer = newDrawer.querySelector('.cart-drawer');
    const newOverlay = newDrawer.querySelector('.cart-overlay');

    if (isActive) {
      newCartDrawer.classList.add('active');
      newOverlay.classList.add('active');
    }

    document.getElementById('cart-overlay').replaceWith(newOverlay);
    cartDrawerEl.replaceWith(newCartDrawer);
    attachCartListeners();
  }
}

// ---- Active Nav Highlighting ----
function updateActiveNav() {
  const route = parseRoute();
  const navLinks = document.querySelectorAll('.navbar-menu a');
  navLinks.forEach(link => {
    link.classList.remove('active');
    const nav = link.dataset.nav;
    if (route.page === 'home' && nav === 'home') link.classList.add('active');
    else if (route.page === 'listing' && !route.category && nav === 'shop') link.classList.add('active');
    else if (route.page === 'listing' && route.category === nav) link.classList.add('active');
  });
}

// ---- Event Listeners ----
function attachEventListeners() {
  attachNavListeners();
  attachCartListeners();
  attachSearchListeners();
  attachProductListeners();
  attachScrollListeners();
  attachPageSpecificListeners();
}

function attachNavListeners() {
  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
  }

  // Make closeMobileMenu global
  window.closeMobileMenu = () => {
    if (mobileToggle) mobileToggle.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('active');
  };
}

function attachCartListeners() {
  // Open cart
  const cartToggle = document.getElementById('cart-toggle');
  const mobileCartBtn = document.getElementById('mobile-cart-btn');
  [cartToggle, mobileCartBtn].forEach(btn => {
    if (btn) btn.addEventListener('click', openCart);
  });

  // Close cart
  const cartClose = document.getElementById('cart-close');
  const cartOverlay = document.getElementById('cart-overlay');
  if (cartClose) cartClose.addEventListener('click', closeCartFn);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCartFn);

  // Quantity buttons
  document.querySelectorAll('[data-qty-minus]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.qtyMinus);
      const state = getState();
      const item = state.cart.find(i => i.id === id);
      if (item) {
        updateCartQuantity(id, item.quantity - 1);
        updateCartUI();
      }
    });
  });

  document.querySelectorAll('[data-qty-plus]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.qtyPlus);
      const state = getState();
      const item = state.cart.find(i => i.id === id);
      if (item) {
        updateCartQuantity(id, item.quantity + 1);
        updateCartUI();
      }
    });
  });

  // Remove item
  document.querySelectorAll('[data-remove-item]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.removeItem);
      removeFromCart(id);
      showToast('Item removed from cart', 'info');
      updateCartUI();
    });
  });
}

function openCart() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (drawer) drawer.classList.add('active');
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCartFn() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (drawer) drawer.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Make closeCart globally accessible for inline onclick
window.closeCart = closeCartFn;

function attachSearchListeners() {
  const searchToggle = document.getElementById('search-toggle');
  const mobileSearchBtn = document.getElementById('mobile-search-btn');
  const searchOverlay = document.getElementById('search-overlay');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  function openSearch() {
    if (searchOverlay) {
      searchOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => searchInput?.focus(), 100);
    }
  }

  function closeSearch() {
    if (searchOverlay) {
      searchOverlay.classList.remove('active');
      document.body.style.overflow = '';
      if (searchInput) searchInput.value = '';
      if (searchResults) searchResults.innerHTML = '<div class="search-empty">Start typing to search products...</div>';
    }
  }

  if (searchToggle) searchToggle.addEventListener('click', openSearch);
  if (mobileSearchBtn) mobileSearchBtn.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  if (searchOverlay) {
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) closeSearch();
    });
  }

  // Keyboard shortcut
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearch();
      closeCartFn();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });

  // Search input
  if (searchInput) {
    let debounce;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        const query = searchInput.value.trim();
        if (query.length < 2) {
          searchResults.innerHTML = '<div class="search-empty">Start typing to search products...</div>';
          return;
        }

        const results = searchProducts(query);
        if (results.length === 0) {
          searchResults.innerHTML = `<div class="search-empty">No results for "${query}"</div>`;
        } else {
          searchResults.innerHTML = results.map(p => `
            <div class="search-result-item" onclick="location.hash='#/product/${p.id}';this.closest('.search-overlay').classList.remove('active');document.body.style.overflow='';">
              <img src="${p.images[0]}" alt="${p.name}" width="50" height="60" loading="lazy">
              <div class="search-result-info">
                <div class="result-name">${p.name}</div>
                <div class="result-price">${formatPrice(p.price)}</div>
              </div>
            </div>
          `).join('');
        }
      }, 200);
    });
  }
}

function attachProductListeners() {
  // Wishlist toggles
  document.querySelectorAll('[data-wishlist]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const productId = parseInt(btn.dataset.wishlist);
      toggleWishlist(productId);
      const isNowWished = getState().wishlist.includes(productId);
      showToast(isNowWished ? 'Added to wishlist ♥' : 'Removed from wishlist', isNowWished ? 'success' : 'info');

      // Update button UI
      btn.classList.toggle('wishlisted');
      btn.innerHTML = isNowWished ? icons.heartFilled : icons.heart;
    });
  });

  // Quick Add (product cards)
  document.querySelectorAll('[data-quick-add]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const productId = parseInt(btn.dataset.quickAdd);
      const product = getProductById(productId);
      if (product) {
        addToCart(product, product.sizes[0], product.colors[0].name, 1);
        showToast(`${product.name} added to cart!`);
        updateCartUI();
      }
    });
  });

  // Quick View (opens detail page)
  document.querySelectorAll('[data-quickview]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      location.hash = `#/product/${btn.dataset.quickview}`;
    });
  });

  // Product card click (info area)
  document.querySelectorAll('.product-card-info').forEach(el => {
    el.style.cursor = 'pointer';
  });
}

function attachScrollListeners() {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');

  // Throttled scroll handler
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Navbar scroll effect
        if (navbar) {
          navbar.classList.toggle('scrolled', scrollY > 50);
        }

        // Back to top
        if (backToTop) {
          backToTop.classList.toggle('visible', scrollY > 500);
        }

        ticking = false;
      });
      ticking = true;
    }
  });

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

function attachPageSpecificListeners() {
  const route = parseRoute();

  if (route.page === 'detail') {
    attachDetailListeners();
  }

  if (route.page === 'listing') {
    attachListingListeners(route.category);
  }

  if (route.page === 'checkout') {
    attachCheckoutListeners();
  }

  // Carousel
  attachCarouselListeners();

  // Newsletter
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Subscribed! Check your email for the discount code 🎉');
      const input = newsletterForm.querySelector('input');
      if (input) input.value = '';
    });
  }
}

function attachDetailListeners() {
  // Thumbnail switching
  document.querySelectorAll('.detail-thumbnail').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const idx = parseInt(thumb.dataset.thumbIdx);
      const mainImg = document.getElementById('detail-main-img');
      const product = getProductById(parseInt(document.getElementById('detail-page')?.dataset.productId));
      if (mainImg && product && product.images[idx]) {
        mainImg.src = product.images[idx];
        document.querySelectorAll('.detail-thumbnail').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      }
    });
  });

  // Image zoom mouse follow
  const mainImageContainer = document.getElementById('detail-main-image');
  if (mainImageContainer) {
    const img = mainImageContainer.querySelector('img');
    mainImageContainer.addEventListener('mousemove', (e) => {
      const rect = mainImageContainer.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      if (img) img.style.transformOrigin = `${x}% ${y}%`;
    });

    mainImageContainer.addEventListener('mouseleave', () => {
      if (img) {
        img.style.transformOrigin = 'center center';
        img.style.transform = 'scale(1)';
      }
    });
  }

  // Size selection
  let selectedSize = null;
  document.querySelectorAll('.size-option').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.size-option').forEach(s => s.classList.remove('selected'));
      btn.classList.add('selected');
      selectedSize = btn.dataset.size;
      const sizeLabel = document.getElementById('selected-size-name');
      if (sizeLabel) sizeLabel.textContent = selectedSize;
    });
  });

  // Color selection
  let selectedColor = null;
  const colorOptions = document.querySelectorAll('.color-option');
  if (colorOptions.length > 0) {
    selectedColor = colorOptions[0].dataset.color;
  }
  colorOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.color-option').forEach(c => c.classList.remove('selected'));
      btn.classList.add('selected');
      selectedColor = btn.dataset.color;
      const colorLabel = document.getElementById('selected-color-name');
      if (colorLabel) colorLabel.textContent = selectedColor;
    });
  });

  // Add to Cart
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      const productId = parseInt(addToCartBtn.dataset.productId);
      const product = getProductById(productId);
      if (!product) return;

      if (!selectedSize) {
        showToast('Please select a size', 'error');
        return;
      }

      const color = selectedColor || product.colors[0].name;
      addToCart(product, selectedSize, color, 1);
      showToast(`${product.name} added to cart! 🛒`);
      updateCartUI();
      openCart();
    });
  }
}

function attachListingListeners(currentCategory) {
  // Sort
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const sortBy = sortSelect.value;
      const filters = { sortBy };
      if (currentCategory) filters.category = currentCategory;
      const filtered = filterProducts(filters);
      const grid = document.getElementById('listing-products-grid');
      if (grid) {
        grid.innerHTML = filtered.map(p => renderProductCard(p)).join('');
        attachProductListeners();
      }
    });
  }

  // Filter sidebar toggle
  const filterToggle = document.getElementById('filter-toggle-btn');
  const filterSidebar = document.getElementById('filter-sidebar');
  const filterOverlay = document.getElementById('filter-overlay');
  const filterClose = document.getElementById('filter-close');

  function openFilters() {
    if (filterSidebar) filterSidebar.classList.add('active');
    if (filterOverlay) filterOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeFilters() {
    if (filterSidebar) filterSidebar.classList.remove('active');
    if (filterOverlay) filterOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (filterToggle) filterToggle.addEventListener('click', openFilters);
  if (filterClose) filterClose.addEventListener('click', closeFilters);
  if (filterOverlay) filterOverlay.addEventListener('click', closeFilters);

  // Filter category buttons in sidebar
  document.querySelectorAll('[data-filter-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      location.hash = `#/shop/${btn.dataset.filterCat}`;
      closeFilters();
    });
  });

  // Apply filters
  const applyFilters = document.getElementById('apply-filters');
  if (applyFilters) {
    applyFilters.addEventListener('click', () => {
      const filters = {};
      if (currentCategory) filters.category = currentCategory;

      const selectedSize = document.querySelector('.filter-option.selected[data-filter-size]');
      if (selectedSize) filters.size = selectedSize.dataset.filterSize;

      const priceMin = document.getElementById('price-min');
      const priceMax = document.getElementById('price-max');
      if (priceMin?.value) filters.priceMin = parseInt(priceMin.value);
      if (priceMax?.value) filters.priceMax = parseInt(priceMax.value);

      filters.sortBy = sortSelect?.value || 'popular';

      const filtered = filterProducts(filters);
      const grid = document.getElementById('listing-products-grid');
      if (grid) {
        grid.innerHTML = filtered.map(p => renderProductCard(p)).join('');
        attachProductListeners();
      }

      closeFilters();
      showToast(`${filtered.length} products found`);
    });
  }

  // Filter option toggle (sizes)
  document.querySelectorAll('.filter-option[data-filter-size]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('selected');
    });
  });

  // Filter color toggle
  document.querySelectorAll('.filter-color-option').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-color-option').forEach(c => c.classList.remove('selected'));
      btn.classList.toggle('selected');
    });
  });
}

function attachCheckoutListeners() {
  // Payment method selection
  const paymentMethods = document.querySelectorAll('.payment-method');
  const cardFields = document.getElementById('card-fields');

  paymentMethods.forEach(method => {
    method.addEventListener('click', () => {
      paymentMethods.forEach(m => m.classList.remove('selected'));
      method.classList.add('selected');

      if (cardFields) {
        cardFields.style.display = method.dataset.payment === 'card' ? 'block' : 'none';
      }
    });
  });

  // Place order
  const placeOrderBtn = document.getElementById('place-order-btn');
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', () => {
      // Simple validation
      const email = document.getElementById('checkout-email')?.value;
      const fname = document.getElementById('checkout-fname')?.value;

      if (!email || !fname) {
        showToast('Please fill in the required fields', 'error');
        return;
      }

      // Simulate order
      placeOrderBtn.textContent = 'Processing...';
      placeOrderBtn.disabled = true;

      setTimeout(() => {
        clearCart();
        showToast('Order placed successfully! 🎉');

        app.innerHTML = renderShell(`
          <main class="checkout-page page-transition">
            <div class="container" style="text-align:center; padding: var(--space-4xl) 0;">
              <div style="width:80px; height:80px; border-radius:50%; background: var(--accent-gradient); display:flex; align-items:center; justify-content:center; margin:0 auto var(--space-xl); font-size:2rem;">✓</div>
              <h1 style="font-size:2rem; margin-bottom: var(--space-md);">Order Confirmed!</h1>
              <p style="color: var(--text-secondary); margin-bottom: var(--space-sm);">Thank you for shopping with SHOWOFF</p>
              <p style="color: var(--text-tertiary); margin-bottom: var(--space-2xl);">Order #SO${Date.now().toString().slice(-8)} • A confirmation email has been sent.</p>
              <div style="display:flex; gap: var(--space-md); justify-content:center; flex-wrap:wrap;">
                <a href="#/" class="btn btn-primary">Continue Shopping</a>
                <a href="#/shop" class="btn btn-secondary">Browse Products</a>
              </div>
            </div>
          </main>
        `);
        attachEventListeners();
      }, 2000);
    });
  }
}

function attachCarouselListeners() {
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (!track || !prevBtn || !nextBtn) return;

  let scrollPos = 0;
  const cardWidth = 316; // 300 + gap
  const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;

  function updateCarousel() {
    track.style.transform = `translateX(-${scrollPos}px)`;
    prevBtn.disabled = scrollPos <= 0;
    nextBtn.disabled = scrollPos >= maxScroll;
  }

  prevBtn.addEventListener('click', () => {
    scrollPos = Math.max(0, scrollPos - cardWidth * 2);
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    scrollPos = Math.min(maxScroll, scrollPos + cardWidth * 2);
    updateCarousel();
  });

  // Touch/drag support
  let isDragging = false;
  let startX = 0;
  let startScroll = 0;

  track.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    startScroll = scrollPos;
    track.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const diff = startX - e.pageX;
    scrollPos = Math.max(0, Math.min(maxScroll, startScroll + diff));
    updateCarousel();
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    if (track) track.style.cursor = 'grab';
  });

  // Touch
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX;
    startScroll = scrollPos;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    const diff = startX - e.touches[0].pageX;
    scrollPos = Math.max(0, Math.min(maxScroll, startScroll + diff));
    updateCarousel();
  }, { passive: true });

  updateCarousel();
}

// ---- Scroll Reveal Animations ----
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.section-header, .product-card, .category-card, .trust-item, .testimonial-card');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${i % 4 * 0.1}s`;
      observer.observe(el);
    });
  }
}

// ---- Image Lazy Loading with fallback ----
function setupImageFallbacks() {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      // Replace with gradient placeholder
      const parent = img.parentElement;
      if (parent && !parent.querySelector('.img-fallback')) {
        img.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.className = 'img-fallback';
        fallback.style.cssText = `
          width: 100%; height: 100%; position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-elevated) 100%);
          display: flex; align-items: center; justify-content: center;
          color: var(--text-tertiary); font-size: 0.8rem;
        `;
        fallback.textContent = 'SHOWOFF';
        if (parent.style.position !== 'relative' && parent.style.position !== 'absolute') {
          parent.style.position = 'relative';
        }
        parent.appendChild(fallback);
      }
    });
  });
}

// ---- Initialize App ----
function init() {
  renderPage();
  setupImageFallbacks();

  // Listen for route changes
  window.addEventListener('hashchange', () => {
    renderPage();
    setupImageFallbacks();
  });

  // Subscribe to state changes for cart/wishlist updates
  subscribe(() => {
    // We handle updates selectively, not full re-renders
  });

  // Listen for real-time catalog updates
  window.addEventListener('catalog-updated', () => {
    renderPage(true);
    setupImageFallbacks();
  });

  console.log('%c🔥 SHOWOFF', 'font-size:24px;font-weight:900;color:#8b5cf6;');
  console.log('%cPremium Streetwear & Fashion', 'font-size:14px;color:#888;');
}

// Start the app
init();
