// ============================================
// SHOWOFF - Page Renderers
// ============================================

import { products, categories, testimonials, promos, getProductById, getProductsByCategory, getTrendingProducts, getBestsellers, getRelatedProducts, searchProducts, filterProducts } from './data.js';
import { getState, isInWishlist } from './store.js';
import {
  renderProductCard, renderCategoryCard, renderTrustBadges,
  renderTestimonialCard, renderNewsletter, renderPromoBanner,
  renderCarousel, renderStars, formatPrice, icons
} from './components.js';

// ============================================
// HOME PAGE
// ============================================
export function renderHomePage() {
  const trending = getTrendingProducts();
  const bestsellers = getBestsellers();
  const featured = products.slice(0, 8);

  return `
    <main class="page-transition" id="home-page">
      <!-- Hero Section -->
      <section class="hero" id="hero">
        <div class="hero-bg">
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop&auto=format&q=60" alt="SHOWOFF hero" width="1920" height="1080">
          <div class="hero-orb hero-orb-1"></div>
          <div class="hero-orb hero-orb-2"></div>
          <div class="hero-orb hero-orb-3"></div>
        </div>
        <div class="hero-content">
          <div class="hero-text">
            <div class="hero-badge">
              <span class="badge-dot"></span>
              New Collection 2026 — Now Live
            </div>
            <h1 class="hero-title">
              <span class="line">Dare to</span>
              <span class="line"><span class="gradient-text">SHOWOFF</span></span>
            </h1>
            <p class="hero-subtitle">Premium streetwear designed for those who lead, not follow. Elevate your wardrobe with bold designs and uncompromising quality.</p>
            <div class="hero-actions">
              <a href="#/shop" class="btn btn-primary btn-lg">Shop Now</a>
              <a href="#/shop/men" class="btn btn-secondary btn-lg">Explore Men</a>
            </div>
            <div class="hero-stats">
              <div class="hero-stat">
                <div class="stat-value">50K+</div>
                <div class="stat-label">Happy Customers</div>
              </div>
              <div class="hero-stat">
                <div class="stat-value">200+</div>
                <div class="stat-label">Products</div>
              </div>
              <div class="hero-stat">
                <div class="stat-value">4.8</div>
                <div class="stat-label">Avg Rating</div>
              </div>
            </div>
          </div>
          <div class="hero-image">
            <div class="hero-image-card">
              <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=667&fit=crop&auto=format&q=80" alt="SHOWOFF Midnight Hoodie" width="500" height="667">
              <div class="hero-price-tag">
                <div class="tag-name">Midnight Hoodie</div>
                <div class="tag-price">${formatPrice(2999)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Categories -->
      <section class="section" id="categories-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Shop by <span class="gradient-text">Category</span></h2>
            <p class="section-subtitle">Find your perfect style across our curated collections</p>
          </div>
          <div class="categories-grid">
            ${categories.map(cat => renderCategoryCard(cat)).join('')}
          </div>
        </div>
      </section>

      <!-- Featured Products -->
      <section class="section" id="featured-section" style="background: var(--bg-secondary);">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Featured <span class="gradient-text">Products</span></h2>
            <p class="section-subtitle">Handpicked styles our community loves</p>
          </div>
          <div class="products-grid">
            ${featured.map(p => renderProductCard(p)).join('')}
          </div>
          <div style="text-align:center; margin-top: var(--space-2xl);">
            <a href="#/shop" class="btn btn-secondary">View All Products</a>
          </div>
        </div>
      </section>

      <!-- Trending Carousel -->
      ${renderCarousel(trending, `Trending ${icons.fire}`, 'The most wanted pieces right now')}

      <!-- Promo Banner -->
      ${renderPromoBanner(promos[0])}

      <!-- Trust Indicators -->
      ${renderTrustBadges()}

      <!-- Testimonials -->
      <section class="section" id="testimonials-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">What Our <span class="gradient-text">Customers</span> Say</h2>
            <p class="section-subtitle">Real reviews from real people</p>
          </div>
          <div class="testimonials-grid">
            ${testimonials.map(t => renderTestimonialCard(t)).join('')}
          </div>
        </div>
      </section>

      <!-- Second Promo -->
      ${renderPromoBanner(promos[1])}

      <!-- Newsletter -->
      ${renderNewsletter()}
    </main>
  `;
}

// ============================================
// PRODUCT LISTING PAGE
// ============================================
export function renderListingPage(categorySlug) {
  const category = categories.find(c => c.id === categorySlug);
  const title = category ? category.name : 'All Products';
  const subtitle = category ? category.description : 'Browse our complete collection';

  const filtered = categorySlug
    ? filterProducts({ category: categorySlug, sortBy: 'popular' })
    : filterProducts({ sortBy: 'popular' });

  const allSizes = [...new Set(products.flatMap(p => p.sizes))];
  const allColors = [...new Set(products.flatMap(p => p.colors.map(c => c.name)))];

  return `
    <main class="listing-page page-transition" id="listing-page">
      <div class="container">
        <div class="listing-header">
          <div class="breadcrumb">
            <a href="#/">Home</a>
            <span class="separator">/</span>
            <a href="#/shop">Shop</a>
            ${category ? `<span class="separator">/</span><span>${category.name}</span>` : ''}
          </div>
          <h1>${title}</h1>
          <p class="listing-count">${filtered.length} products</p>
        </div>

        <div class="listing-toolbar">
          <div class="listing-filters">
            <button class="filter-btn ${!categorySlug ? 'active' : ''}" onclick="location.hash='#/shop'">All</button>
            ${categories.map(c => `
              <button class="filter-btn ${categorySlug === c.id ? 'active' : ''}" onclick="location.hash='#/shop/${c.id}'">${c.name}</button>
            `).join('')}
            <button class="filter-btn" id="filter-toggle-btn">
              ${icons.filter} Filters
            </button>
          </div>
          <select class="sort-select" id="sort-select" aria-label="Sort products">
            <option value="popular">Most Popular</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        <div class="products-grid" id="listing-products-grid">
          ${filtered.map(p => renderProductCard(p)).join('')}
        </div>

        ${filtered.length === 0 ? `
          <div style="text-align:center; padding: var(--space-4xl) 0; color: var(--text-tertiary);">
            <p style="font-size: 3rem; margin-bottom: var(--space-md);">🔍</p>
            <h3 style="margin-bottom: var(--space-sm); color: var(--text-primary);">No products found</h3>
            <p>Try adjusting your filters or browse all products.</p>
            <a href="#/shop" class="btn btn-secondary btn-sm" style="margin-top: var(--space-lg);">View All</a>
          </div>
        ` : ''}
      </div>

      <!-- Filter Sidebar -->
      <div class="cart-overlay" id="filter-overlay"></div>
      <div class="filter-sidebar" id="filter-sidebar">
        <div class="filter-sidebar-header">
          <h3>Filters</h3>
          <button class="cart-drawer-close" id="filter-close" aria-label="Close filters">${icons.close}</button>
        </div>

        <div class="filter-group">
          <h4>Category</h4>
          <div class="filter-options">
            ${categories.map(c => `
              <button class="filter-option ${categorySlug === c.id ? 'selected' : ''}" data-filter-cat="${c.id}">${c.name}</button>
            `).join('')}
          </div>
        </div>

        <div class="filter-group">
          <h4>Size</h4>
          <div class="filter-options">
            ${['S', 'M', 'L', 'XL', 'UK 7', 'UK 8', 'UK 9', 'UK 10'].map(s => `
              <button class="filter-option" data-filter-size="${s}">${s}</button>
            `).join('')}
          </div>
        </div>

        <div class="filter-group">
          <h4>Price Range</h4>
          <div class="price-range">
            <input type="number" placeholder="Min ₹" id="price-min" aria-label="Minimum price">
            <span style="color: var(--text-tertiary);">—</span>
            <input type="number" placeholder="Max ₹" id="price-max" aria-label="Maximum price">
          </div>
        </div>

        <div class="filter-group">
          <h4>Color</h4>
          <div class="filter-options" style="gap: 12px;">
            ${[
              { name: 'Black', hex: '#111' },
              { name: 'White', hex: '#f5f5f5' },
              { name: 'Navy', hex: '#1e3a5f' },
              { name: 'Purple', hex: '#7e22ce' },
              { name: 'Red', hex: '#ef4444' },
              { name: 'Blue', hex: '#3b82f6' },
            ].map(c => `
              <button class="filter-color-option" data-filter-color="${c.name}" style="background:${c.hex};" title="${c.name}" aria-label="${c.name}"></button>
            `).join('')}
          </div>
        </div>

        <div style="padding: var(--space-lg) var(--space-xl);">
          <button class="btn btn-primary" style="width:100%;" id="apply-filters">Apply Filters</button>
        </div>
      </div>
    </main>
  `;
}

// ============================================
// PRODUCT DETAIL PAGE
// ============================================
export function renderDetailPage(productId) {
  const product = getProductById(productId);
  if (!product) {
    return `
      <main class="detail-page page-transition">
        <div class="container" style="text-align:center; padding: var(--space-4xl) 0;">
          <p style="font-size: 4rem; margin-bottom: var(--space-lg);">😕</p>
          <h1>Product Not Found</h1>
          <p style="color: var(--text-tertiary); margin-bottom: var(--space-xl);">The product you're looking for doesn't exist.</p>
          <a href="#/shop" class="btn btn-primary">Browse Products</a>
        </div>
      </main>
    `;
  }

  const related = getRelatedProducts(productId, 4);
  const wishlisted = isInWishlist(product.id);
  
  const isOutOfStock = product.manualOutOfStock || product.stockQty === 0;
  let stockText, stockClass, stockColorStyle = '';
  if (isOutOfStock) {
    stockText = 'Out of Stock';
    stockClass = 'out-of-stock';
    stockColorStyle = 'color: var(--error);';
  } else if (product.stockQty <= 5) {
    stockText = `Only ${product.stockQty} left! Order soon`;
    stockClass = 'limited';
  } else {
    stockText = 'In Stock';
    stockClass = 'in-stock';
  }

  return `
    <main class="detail-page page-transition" id="detail-page" data-product-id="${product.id}">
      <div class="container">
        <!-- Breadcrumb -->
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <a href="#/shop">Shop</a>
          <span class="separator">/</span>
          <a href="#/shop/${product.category}">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</a>
          <span class="separator">/</span>
          <span>${product.name}</span>
        </div>

        <!-- Product Grid -->
        <div class="detail-grid">
          <!-- Image Gallery -->
          <div class="detail-gallery">
            <div class="detail-thumbnails">
              ${product.images.map((img, i) => `
                <div class="detail-thumbnail ${i === 0 ? 'active' : ''}" data-thumb-idx="${i}">
                  <img src="${img}" alt="${product.name} view ${i + 1}" width="80" height="100" loading="lazy">
                </div>
              `).join('')}
            </div>
            <div class="detail-main-image" id="detail-main-image">
              <img src="${product.images[0]}" alt="${product.name}" id="detail-main-img" width="600" height="700">
              <span class="zoom-hint">Hover to zoom</span>
            </div>
          </div>

          <!-- Product Info -->
          <div class="detail-info">
            <div class="detail-badges">
              <span class="detail-stock ${stockClass}" style="${stockColorStyle}">
                <span class="stock-dot" style="${isOutOfStock ? 'background: var(--error);' : ''}"></span>
                ${stockText}
              </span>
              ${product.trending ? '<span class="detail-trending-badge">🔥 Trending Now</span>' : ''}
            </div>

            <h1 class="detail-name">${product.name}</h1>

            <div class="detail-rating">
              ${renderStars(product.rating)}
              <span class="rating-text">${product.rating} (${product.reviewCount} reviews)</span>
            </div>

            <div class="detail-price-block">
              <span class="detail-price">${formatPrice(product.price)}</span>
              ${product.originalPrice ? `<span class="detail-original-price">${formatPrice(product.originalPrice)}</span>` : ''}
              ${product.discount ? `<span class="detail-discount">${product.discount}% OFF</span>` : ''}
            </div>

            <p class="detail-description">${product.description}</p>

            <ul class="detail-features">
              ${product.features.map(f => `<li>${f}</li>`).join('')}
            </ul>

            <!-- Color Selector -->
            <div class="detail-selector">
              <div class="detail-selector-label">
                <h4>Color: <span id="selected-color-name">${product.colors[0].name}</span></h4>
              </div>
              <div class="color-options" id="color-options">
                ${product.colors.map((c, i) => `
                  <div class="color-option ${i === 0 ? 'selected' : ''}" data-color="${c.name}">
                    <div class="color-swatch" style="background:${c.hex};${c.hex === '#ffffff' || c.hex === '#f5f5f5' || c.hex === '#f8f8f8' || c.hex === '#f1f1f1' ? 'border:1px solid rgba(255,255,255,0.2);' : ''}"></div>
                    <span class="color-name">${c.name}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Size Selector -->
            <div class="detail-selector">
              <div class="detail-selector-label">
                <h4>Size: <span id="selected-size-name">Select a size</span></h4>
                <span class="fit-guide">Size Guide</span>
              </div>
              <div class="size-options" id="size-options">
                ${product.sizes.map(s => `
                  <button class="size-option" data-size="${s}">${s}</button>
                `).join('')}
              </div>
            </div>

            <!-- Actions -->
            <div class="detail-actions">
              ${isOutOfStock ? `
                <button class="btn btn-primary" disabled style="cursor:not-allowed; opacity:0.5; background:var(--bg-tertiary); color:var(--text-tertiary); border:1px solid var(--glass-border);">
                  Out of Stock
                </button>
              ` : `
                <button class="btn btn-primary" id="add-to-cart-btn" data-product-id="${product.id}">
                  ${icons.cart} Add to Cart
                </button>
              `}
              <button class="btn-icon ${wishlisted ? 'wishlisted' : ''}" id="detail-wishlist-btn" data-wishlist="${product.id}" aria-label="Add to wishlist">
                ${wishlisted ? icons.heartFilled : icons.heart}
              </button>
            </div>

            <!-- Trust mini-badges -->
            <div style="display:flex; gap: var(--space-md); flex-wrap:wrap; margin-top: var(--space-md);">
              <span style="font-size:0.8rem; color: var(--text-tertiary); display:flex; align-items:center; gap:4px;">🚚 Free shipping above ₹1,999</span>
              <span style="font-size:0.8rem; color: var(--text-tertiary); display:flex; align-items:center; gap:4px;">↩️ 7-day easy returns</span>
              <span style="font-size:0.8rem; color: var(--text-tertiary); display:flex; align-items:center; gap:4px;">🔒 Secure checkout</span>
            </div>
          </div>
        </div>

        <!-- Reviews Section -->
        <section class="section" style="border-top: 1px solid var(--glass-border); padding-top: var(--space-3xl);">
          <div class="section-header">
            <h2 class="section-title">Customer <span class="gradient-text">Reviews</span></h2>
            <p class="section-subtitle">${product.reviewCount} reviews • ${product.rating} average</p>
          </div>
          <div class="testimonials-grid">
            ${[
              { name: 'Verified Buyer', avatar: '✓', rating: 5, text: `Amazing quality! The ${product.name} exceeded my expectations. Fits perfectly and the material is top-notch.`, location: 'Mumbai', product: product.name },
              { name: 'Style Enthusiast', avatar: 'S', rating: 4, text: `Great product for the price. Looks exactly like the photos. Would recommend to anyone looking for premium ${product.subcategory.toLowerCase()}.`, location: 'Delhi', product: product.name },
              { name: 'Regular Customer', avatar: 'R', rating: 5, text: 'SHOWOFF never disappoints! Fast delivery, beautiful packaging, and the product itself is incredible. Already ordered two more.', location: 'Bangalore', product: product.name },
            ].map(t => renderTestimonialCard(t)).join('')}
          </div>
        </section>

        <!-- Related Products -->
        ${related.length > 0 ? `
          <section class="section">
            <div class="section-header">
              <h2 class="section-title">You May Also <span class="gradient-text">Like</span></h2>
              <p class="section-subtitle">Based on your browsing</p>
            </div>
            <div class="products-grid">
              ${related.map(p => renderProductCard(p)).join('')}
            </div>
          </section>
        ` : ''}
      </div>
    </main>
  `;
}

// ============================================
// CHECKOUT PAGE
// ============================================
export function renderCheckoutPage() {
  const state = getState();
  const shipping = state.cartTotal >= 1999 ? 0 : 99;
  const total = state.cartTotal + shipping;

  if (state.cart.length === 0) {
    return `
      <main class="checkout-page page-transition">
        <div class="container" style="text-align:center; padding: var(--space-4xl) 0;">
          <p style="font-size: 4rem; margin-bottom: var(--space-lg);">${icons.cart}</p>
          <h1>Your Cart is Empty</h1>
          <p style="color: var(--text-tertiary); margin-bottom: var(--space-xl);">Add some items before checking out.</p>
          <a href="#/shop" class="btn btn-primary">Start Shopping</a>
        </div>
      </main>
    `;
  }

  return `
    <main class="checkout-page page-transition" id="checkout-page">
      <div class="container">
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <a href="#/shop">Shop</a>
          <span class="separator">/</span>
          <span>Checkout</span>
        </div>

        <h1 style="font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 700; margin-bottom: var(--space-xl);">Checkout</h1>

        <div class="checkout-grid">
          <div>
            <!-- Contact -->
            <div class="checkout-form-section">
              <h3>Contact Information</h3>
              <div class="form-row">
                <div class="form-group full-width">
                  <label for="checkout-email">Email Address</label>
                  <input type="email" id="checkout-email" placeholder="you@example.com">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group full-width">
                  <label for="checkout-phone">Phone Number</label>
                  <input type="tel" id="checkout-phone" placeholder="+91 98765 43210">
                </div>
              </div>
            </div>

            <!-- Shipping -->
            <div class="checkout-form-section">
              <h3>Shipping Address</h3>
              <div class="form-row">
                <div class="form-group">
                  <label for="checkout-fname">First Name</label>
                  <input type="text" id="checkout-fname" placeholder="First name">
                </div>
                <div class="form-group">
                  <label for="checkout-lname">Last Name</label>
                  <input type="text" id="checkout-lname" placeholder="Last name">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group full-width">
                  <label for="checkout-address">Address</label>
                  <input type="text" id="checkout-address" placeholder="Street address">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="checkout-city">City</label>
                  <input type="text" id="checkout-city" placeholder="City">
                </div>
                <div class="form-group">
                  <label for="checkout-state">State</label>
                  <select id="checkout-state">
                    <option value="">Select State</option>
                    <option>Tamil Nadu</option>
                    <option>Karnataka</option>
                    <option>Maharashtra</option>
                    <option>Delhi</option>
                    <option>Kerala</option>
                    <option>Andhra Pradesh</option>
                    <option>Gujarat</option>
                    <option>Rajasthan</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="checkout-pin">PIN Code</label>
                  <input type="text" id="checkout-pin" placeholder="641001">
                </div>
                <div class="form-group">
                  <label for="checkout-country">Country</label>
                  <input type="text" id="checkout-country" value="India" readonly>
                </div>
              </div>
            </div>

            <!-- Payment -->
            <div class="checkout-form-section">
              <h3>Payment Method</h3>
              <div class="payment-methods" id="payment-methods">
                <div class="payment-method selected" data-payment="card">
                  <div class="method-icon">💳</div>
                  <div class="method-name">Credit/Debit</div>
                </div>
                <div class="payment-method" data-payment="upi">
                  <div class="method-icon">📱</div>
                  <div class="method-name">UPI</div>
                </div>
                <div class="payment-method" data-payment="wallet">
                  <div class="method-icon">👛</div>
                  <div class="method-name">Wallet</div>
                </div>
                <div class="payment-method" data-payment="cod">
                  <div class="method-icon">💵</div>
                  <div class="method-name">COD</div>
                </div>
              </div>

              <div id="card-fields">
                <div class="form-row">
                  <div class="form-group full-width">
                    <label for="card-number">Card Number</label>
                    <input type="text" id="card-number" placeholder="1234 5678 9012 3456">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="card-expiry">Expiry</label>
                    <input type="text" id="card-expiry" placeholder="MM/YY">
                  </div>
                  <div class="form-group">
                    <label for="card-cvv">CVV</label>
                    <input type="text" id="card-cvv" placeholder="123">
                  </div>
                </div>
              </div>
            </div>

            <button class="btn btn-primary btn-lg" id="place-order-btn" style="width:100%;">
              Place Order — ${formatPrice(total)}
            </button>
          </div>

          <!-- Order Summary Sidebar -->
          <div>
            <div class="order-summary">
              <h3>Order Summary</h3>
              <div class="order-items">
                ${state.cart.map(item => `
                  <div class="order-item">
                    <img src="${item.image}" alt="${item.name}" width="50" height="60">
                    <div class="order-item-info">
                      <div class="item-name">${item.name}</div>
                      <div class="item-meta">${item.size} • ${item.color} • Qty: ${item.quantity}</div>
                    </div>
                    <div class="item-price">${formatPrice(item.price * item.quantity)}</div>
                  </div>
                `).join('')}
              </div>
              <div class="order-totals">
                <div class="order-total-row">
                  <span class="label">Subtotal</span>
                  <span>${formatPrice(state.cartTotal)}</span>
                </div>
                <div class="order-total-row">
                  <span class="label">Shipping</span>
                  <span>${shipping === 0 ? '<span style="color:var(--success)">FREE</span>' : formatPrice(shipping)}</span>
                </div>
                <div class="order-total-row">
                  <span class="label">Tax (incl.)</span>
                  <span>Included</span>
                </div>
                <div class="order-total-row grand-total">
                  <span>Total</span>
                  <span>${formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <!-- Trust mini -->
            <div style="margin-top: var(--space-lg); padding: var(--space-lg); background: var(--glass-bg); border:1px solid var(--glass-border); border-radius: var(--radius-lg);">
              <div style="display:flex; flex-direction:column; gap: var(--space-md); font-size: 0.85rem; color: var(--text-secondary);">
                <div style="display:flex; align-items:center; gap: var(--space-sm);">🔒 256-bit SSL Encryption</div>
                <div style="display:flex; align-items:center; gap: var(--space-sm);">🚚 Free shipping on orders above ₹1,999</div>
                <div style="display:flex; align-items:center; gap: var(--space-sm);">↩️ 7-day hassle-free returns</div>
                <div style="display:flex; align-items:center; gap: var(--space-sm);">📦 Estimated delivery: 3-5 business days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  `;
}

// ============================================
// WISHLIST PAGE
// ============================================
export function renderWishlistPage() {
  const state = getState();
  const wishlistProducts = state.wishlist.map(id => getProductById(id)).filter(Boolean);

  return `
    <main class="wishlist-page page-transition" id="wishlist-page">
      <div class="container">
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Wishlist</span>
        </div>

        <div class="listing-header">
          <h1>My Wishlist</h1>
          <p class="listing-count">${wishlistProducts.length} items</p>
        </div>

        ${wishlistProducts.length === 0 ? `
          <div class="wishlist-empty">
            <div class="empty-icon">💜</div>
            <h2>Your wishlist is empty</h2>
            <p>Save your favorite items here for later.</p>
            <a href="#/shop" class="btn btn-primary btn-sm">Browse Products</a>
          </div>
        ` : `
          <div class="products-grid">
            ${wishlistProducts.map(p => renderProductCard(p)).join('')}
          </div>
        `}
      </div>
    </main>
  `;
}
