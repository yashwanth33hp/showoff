// ============================================
// SHOWOFF - Reusable UI Components
// ============================================

import { getState, toggleWishlist, isInWishlist } from './store.js';

// ---- SVG Icons ----
export const icons = {
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
  cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
  heartFilled: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  chevronLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  chevronUp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="18 15 12 9 6 15"/></svg>`,
  eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  filter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  starHalf: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><polygon fill="url(#half)" stroke="currentColor" stroke-width="1" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  truck: '🚚',
  refresh: '↩️',
  shield: '🔒',
  tag: '🏷️',
  fire: '🔥',
  sparkles: '✨',
  zap: '⚡',
  package: '📦',
};

// ---- Star Rating ----
export function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  let stars = '';
  for (let i = 0; i < full; i++) stars += '★';
  if (half) stars += '★';
  for (let i = 0; i < empty; i++) stars += '☆';
  return `<span class="stars" style="color:#fbbf24">${stars}</span>`;
}

// ---- Format Currency ----
export function formatPrice(price) {
  return `₹${price.toLocaleString('en-IN')}`;
}

// ---- Navbar ----
export function renderNavbar() {
  const state = getState();
  return `
    <nav class="navbar" id="navbar" role="navigation" aria-label="Main navigation">
      <div class="navbar-inner">
        <a href="#/" class="navbar-logo" id="nav-logo" aria-label="SHOWOFF Home">
          <div class="logo-icon">S</div>
          <span class="logo-text">SHOWOFF</span>
        </a>

        <div class="navbar-menu" id="navbar-menu">
          <a href="#/" data-nav="home">Home</a>
          <a href="#/shop" data-nav="shop">Shop</a>
          <a href="#/shop/men" data-nav="men">Men</a>
          <a href="#/shop/women" data-nav="women">Women</a>
          <a href="#/shop/kids" data-nav="kids">Kids</a>
          <a href="#/shop/accessories" data-nav="accessories">Accessories</a>
        </div>

        <div class="navbar-actions">
          <button class="btn-icon" id="search-toggle" aria-label="Search">
            ${icons.search}
          </button>
          <button class="btn-icon" id="wishlist-nav" aria-label="Wishlist" onclick="location.hash='#/wishlist'">
            ${icons.heart}
          </button>
          <button class="btn-icon" id="cart-toggle" aria-label="Shopping Cart">
            ${icons.cart}
            ${state.cartCount > 0 ? `<span class="cart-badge">${state.cartCount}</span>` : ''}
          </button>
          <button class="btn-icon" aria-label="Account">
            ${icons.user}
          </button>
          <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div class="mobile-menu" id="mobile-menu">
      <a href="#/" onclick="closeMobileMenu()">Home</a>
      <a href="#/shop" onclick="closeMobileMenu()">Shop All</a>
      <a href="#/shop/men" onclick="closeMobileMenu()">Men</a>
      <a href="#/shop/women" onclick="closeMobileMenu()">Women</a>
      <a href="#/shop/kids" onclick="closeMobileMenu()">Kids</a>
      <a href="#/shop/accessories" onclick="closeMobileMenu()">Accessories</a>
      <a href="#/wishlist" onclick="closeMobileMenu()">Wishlist</a>
    </div>
  `;
}

// ---- Mobile Bottom Nav ----
export function renderMobileNav() {
  const state = getState();
  return `
    <div class="mobile-bottom-nav" id="mobile-bottom-nav">
      <div class="mobile-bottom-nav-inner">
        <button class="mobile-nav-item" onclick="location.hash='#/'" aria-label="Home">
          ${icons.home}
          <span>Home</span>
        </button>
        <button class="mobile-nav-item" id="mobile-search-btn" aria-label="Search">
          ${icons.search}
          <span>Search</span>
        </button>
        <button class="mobile-nav-item" onclick="location.hash='#/shop'" aria-label="Shop">
          ${icons.grid}
          <span>Shop</span>
        </button>
        <button class="mobile-nav-item" onclick="location.hash='#/wishlist'" aria-label="Wishlist">
          ${icons.heart}
          <span>Wishlist</span>
        </button>
        <button class="mobile-nav-item" id="mobile-cart-btn" aria-label="Cart">
          ${icons.cart}
          ${state.cartCount > 0 ? `<span class="mobile-cart-badge">${state.cartCount}</span>` : ''}
          <span>Cart</span>
        </button>
      </div>
    </div>
  `;
}

// ---- Product Card ----
export function renderProductCard(product) {
  const wishlisted = isInWishlist(product.id);
  const isOutOfStock = product.manualOutOfStock || product.stockQty === 0;
  
  let badgeHtml = '';
  if (isOutOfStock) {
    badgeHtml = `<span class="product-card-badge" style="background:var(--error); color:#fff; border:none;">Out of Stock</span>`;
  } else if (product.badge) {
    const badgeClass = product.badge.includes('OFF') ? 'badge-sale' :
     product.badge === 'Bestseller' ? 'badge-bestseller' :
     product.badge === 'Limited Stock' || product.stockQty <= 5 ? 'badge-limited' : 'badge-new';
    badgeHtml = `<span class="product-card-badge ${badgeClass}">${product.badge}</span>`;
  }

  return `
    <article class="product-card glass-shine" data-product-id="${product.id}" id="product-card-${product.id}" ${isOutOfStock ? 'style="opacity:0.8;"' : ''}>
      <div class="product-card-image">
        <img class="img-primary" src="${product.images[0]}" alt="${product.name}" loading="lazy" width="600" height="700" ${isOutOfStock ? 'style="filter:grayscale(100%); opacity:0.7;"' : ''}>
        ${product.images[1] ? `<img class="img-hover" src="${product.images[1]}" alt="${product.name} alternate view" loading="lazy" width="600" height="700" ${isOutOfStock ? 'style="filter:grayscale(100%); opacity:0.7;"' : ''}>` : ''}
        
        ${badgeHtml}
        
        <div class="product-card-actions">
          <button class="action-btn ${wishlisted ? 'wishlisted' : ''}" data-wishlist="${product.id}" aria-label="Add to wishlist" title="Add to Wishlist">
            ${wishlisted ? icons.heartFilled : icons.heart}
          </button>
          <button class="action-btn" data-quickview="${product.id}" aria-label="Quick view" title="Quick View">
            ${icons.eye}
          </button>
        </div>

        <div class="product-card-quick-add">
          ${isOutOfStock ? `<button disabled style="cursor:not-allowed; background:var(--bg-tertiary); color:var(--text-tertiary);">Out of Stock</button>` : `<button data-quick-add="${product.id}">Add to Cart</button>`}
        </div>
      </div>
      <div class="product-card-info" onclick="location.hash='#/product/${product.id}'">
        <div class="product-card-category">${product.subcategory}</div>
        <h3 class="product-card-name">${product.name}</h3>
        <div class="product-card-bottom">
          <div class="product-card-price">
            <span class="current-price">${formatPrice(product.price)}</span>
            ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
          </div>
          <div class="product-card-rating">
            ${renderStars(product.rating)}
            <span>${product.rating}</span>
          </div>
        </div>
      </div>
    </article>
  `;
}

// ---- Category Card ----
export function renderCategoryCard(category) {
  return `
    <a href="#/shop/${category.id}" class="category-card glass-shine" id="category-${category.id}">
      <img src="${category.image}" alt="${category.name}" loading="lazy" width="600" height="750">
      <div class="category-overlay">
        <h3 class="category-name">${category.name}</h3>
        <p class="category-desc">${category.description}</p>
        <span class="category-link">
          Shop Now ${icons.chevronRight}
        </span>
      </div>
    </a>
  `;
}

// ---- Trust Badges ----
export function renderTrustBadges() {
  const badges = [
    { icon: icons.truck, title: 'Free Shipping', desc: 'On orders above ₹1,999' },
    { icon: icons.refresh, title: 'Easy Returns', desc: '7-day hassle-free returns' },
    { icon: icons.shield, title: 'Secure Payment', desc: '100% encrypted checkout' },
    { icon: icons.tag, title: 'Best Price', desc: 'Guaranteed best deals' },
  ];

  return `
    <section class="trust-section" id="trust-badges">
      <div class="container">
        <div class="trust-grid">
          ${badges.map(b => `
            <div class="trust-item glass-shine">
              <span class="trust-icon">${b.icon}</span>
              <h4 class="trust-title">${b.title}</h4>
              <p class="trust-desc">${b.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// ---- Testimonial Card ----
export function renderTestimonialCard(testimonial) {
  return `
    <div class="testimonial-card glass-shine">
      <div class="testimonial-stars">${renderStars(testimonial.rating)}</div>
      <p class="testimonial-text">"${testimonial.text}"</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${testimonial.avatar}</div>
        <div>
          <div class="testimonial-name">${testimonial.name}</div>
          <div class="testimonial-location">${testimonial.location} • ${testimonial.product}</div>
        </div>
      </div>
    </div>
  `;
}

// ---- Newsletter ----
export function renderNewsletter() {
  return `
    <section class="newsletter-section" id="newsletter">
      <div class="container">
        <div class="newsletter-card glass-shine">
          <h2 class="newsletter-title">Get <span class="gradient-text">20% Off</span> Your First Order</h2>
          <p class="newsletter-desc">Subscribe to our newsletter for exclusive drops, style tips, and early access to sales.</p>
          <form class="newsletter-form" id="newsletter-form" onsubmit="return false;">
            <input type="email" placeholder="Enter your email address" required aria-label="Email address">
            <button type="submit" class="btn btn-primary btn-sm">Subscribe</button>
          </form>
          <p class="newsletter-offer">Use code <strong>SHOWOFF20</strong> at checkout</p>
        </div>
      </div>
    </section>
  `;
}

// ---- Cart Drawer ----
export function renderCartDrawer() {
  const state = getState();
  const shipping = state.cartTotal >= 1999 ? 0 : 99;
  const total = state.cartTotal + shipping;

  return `
    <div class="cart-overlay" id="cart-overlay"></div>
    <aside class="cart-drawer" id="cart-drawer" role="dialog" aria-label="Shopping Cart">
      <div class="cart-drawer-header">
        <h3>Your Cart (${state.cartCount})</h3>
        <button class="cart-drawer-close" id="cart-close" aria-label="Close cart">
          ${icons.close}
        </button>
      </div>

      <div class="cart-drawer-items">
        ${state.cart.length === 0 ? `
          <div class="cart-empty">
            <div class="empty-icon">${icons.cart}</div>
            <p>Your cart is empty</p>
            <a href="#/shop" class="btn btn-secondary btn-sm" onclick="closeCart()">Start Shopping</a>
          </div>
        ` : state.cart.map(item => `
          <div class="cart-item" data-cart-item="${item.id}">
            <div class="cart-item-image">
              <img src="${item.image}" alt="${item.name}" width="80" height="100">
            </div>
            <div class="cart-item-details">
              <h4 class="cart-item-name">${item.name}</h4>
              <p class="cart-item-meta">${item.size} • ${item.color}</p>
              <div class="cart-item-bottom">
                <span class="cart-item-price">${formatPrice(item.price * item.quantity)}</span>
                <div class="cart-item-qty">
                  <button data-qty-minus="${item.id}" aria-label="Decrease quantity">−</button>
                  <span>${item.quantity}</span>
                  <button data-qty-plus="${item.id}" aria-label="Increase quantity">+</button>
                </div>
              </div>
              <span class="cart-item-remove" data-remove-item="${item.id}">Remove</span>
            </div>
          </div>
        `).join('')}
      </div>

      ${state.cart.length > 0 ? `
        <div class="cart-drawer-footer">
          <div class="cart-summary-row">
            <span class="label">Subtotal</span>
            <span>${formatPrice(state.cartTotal)}</span>
          </div>
          <div class="cart-summary-row">
            <span class="label">Shipping</span>
            <span>${shipping === 0 ? '<span style="color:var(--success)">FREE</span>' : formatPrice(shipping)}</span>
          </div>
          <div class="cart-summary-row total">
            <span>Total</span>
            <span>${formatPrice(total)}</span>
          </div>
          <a href="#/checkout" class="btn btn-primary" onclick="closeCart()">Checkout</a>
        </div>
      ` : ''}
    </aside>
  `;
}

// ---- Search Modal ----
export function renderSearchModal(products) {
  return `
    <div class="search-overlay" id="search-overlay">
      <div class="search-modal">
        <div class="search-input-wrapper">
          ${icons.search}
          <input type="text" id="search-input" placeholder="Search products, categories..." autocomplete="off" aria-label="Search products">
          <button class="search-close" id="search-close">ESC</button>
        </div>
        <div class="search-results" id="search-results">
          <div class="search-empty">Start typing to search products...</div>
        </div>
      </div>
    </div>
  `;
}

// ---- Footer ----
export function renderFooter() {
  return `
    <footer class="footer" id="footer" role="contentinfo">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-logo">
              <div class="logo-icon">S</div>
              <span class="logo-text">SHOWOFF</span>
            </div>
            <p>Premium streetwear and fashion brand. Elevating everyday style with bold designs, quality materials, and a passion for self-expression.</p>
            <div class="footer-social">
              <a href="#" aria-label="Instagram" title="Instagram">📷</a>
              <a href="#" aria-label="Twitter" title="Twitter">𝕏</a>
              <a href="#" aria-label="Facebook" title="Facebook">📘</a>
              <a href="#" aria-label="YouTube" title="YouTube">▶️</a>
            </div>
          </div>

          <div class="footer-column">
            <h4>Shop</h4>
            <ul>
              <li><a href="#/shop/men">Men</a></li>
              <li><a href="#/shop/women">Women</a></li>
              <li><a href="#/shop/kids">Kids</a></li>
              <li><a href="#/shop/accessories">Accessories</a></li>
              <li><a href="#/shop">New Arrivals</a></li>
              <li><a href="#/shop">Sale</a></li>
            </ul>
          </div>

          <div class="footer-column">
            <h4>Help</h4>
            <ul>
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
              <li><a href="#">Size Guide</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>

          <div class="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Sustainability</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2026 SHOWOFF. All rights reserved. Made in Coimbatore 🇮🇳</p>
          <div class="footer-payments">
            <span>VISA</span>
            <span>Mastercard</span>
            <span>UPI</span>
            <span>Paytm</span>
            <span>COD</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// ---- Back to Top ----
export function renderBackToTop() {
  return `
    <button class="back-to-top" id="back-to-top" aria-label="Back to top">
      ${icons.chevronUp}
    </button>
  `;
}

// ---- Promo Banner ----
export function renderPromoBanner(promo) {
  return `
    <section class="promo-banner">
      <div class="container">
        <div class="promo-card" style="background: ${promo.gradient};">
          <h2 class="promo-title">${promo.title}</h2>
          <p class="promo-subtitle">${promo.subtitle}</p>
          ${promo.code ? `<div class="promo-code">${promo.code}</div>` : ''}
          <br>
          <a href="#/shop" class="btn btn-outline">Shop Now</a>
        </div>
      </div>
    </section>
  `;
}

// ---- Carousel ----
export function renderCarousel(products, title, subtitle) {
  return `
    <section class="section" id="trending-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">${title}</h2>
          <p class="section-subtitle">${subtitle}</p>
        </div>
        <div class="carousel-container">
          <div class="carousel-track" id="carousel-track">
            ${products.map(p => renderProductCard(p)).join('')}
          </div>
          <div class="carousel-controls">
            <button class="carousel-btn" id="carousel-prev" aria-label="Previous">
              ${icons.chevronLeft}
            </button>
            <button class="carousel-btn" id="carousel-next" aria-label="Next">
              ${icons.chevronRight}
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}
