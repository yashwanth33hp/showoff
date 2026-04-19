// ============================================
// SHOWOFF - Admin Dashboard Module
// Login, Dashboard, Products, Orders
// ============================================

import './admin.css';
import { products, saveProducts } from './data.js';
import { getState, showToast } from './store.js';
import { formatPrice, icons } from './components.js';

// ---- Admin Credentials ----
const ADMIN_EMAIL = 'admin@showoff.com';
const ADMIN_PASSWORD = '123456';
const ADMIN_KEY = 'showoff_admin_auth';
const ADMIN_ORDERS_KEY = 'showoff_admin_orders';

// ---- Admin Auth ----
export function isAdminLoggedIn() {
  return localStorage.getItem(ADMIN_KEY) === 'true';
}

export function adminLogin(email, password) {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem(ADMIN_KEY, 'true');
    return true;
  }
  return false;
}

export function adminLogout() {
  localStorage.removeItem(ADMIN_KEY);
  location.hash = '#/admin/login';
}

// Admin Products now completely run from data.js and store

// ---- Mock Orders ----
function getAdminOrders() {
  try {
    const stored = localStorage.getItem(ADMIN_ORDERS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  const orders = [
    { id: 'SO20260418001', customer: 'Arjun Mehta', email: 'arjun@gmail.com', items: [{ name: 'Urban Flex Sneakers', qty: 1, price: 3999 }], total: 3999, status: 'delivered', date: '2026-04-17' },
    { id: 'SO20260418002', customer: 'Priya Sharma', email: 'priya@gmail.com', items: [{ name: 'Midnight Hoodie', qty: 1, price: 2999 }, { name: 'StreetCap Snapback', qty: 1, price: 899 }], total: 3898, status: 'processing', date: '2026-04-18' },
    { id: 'SO20260418003', customer: 'Rohan Das', email: 'rohan@gmail.com', items: [{ name: 'Urban Backpack Pro', qty: 1, price: 3499 }], total: 3499, status: 'pending', date: '2026-04-18' },
    { id: 'SO20260418004', customer: 'Sneha Pillai', email: 'sneha@gmail.com', items: [{ name: 'PowerFit Sports Bra', qty: 2, price: 1799 }], total: 3598, status: 'delivered', date: '2026-04-16' },
    { id: 'SO20260418005', customer: 'Vikram Singh', email: 'vikram@gmail.com', items: [{ name: 'Street Runner Pro', qty: 1, price: 4399 }, { name: 'Classic Polo T-Shirt', qty: 2, price: 1499 }], total: 7397, status: 'processing', date: '2026-04-18' },
    { id: 'SO20260418006', customer: 'Ananya Nair', email: 'ananya@gmail.com', items: [{ name: 'Aura Crop Top', qty: 1, price: 999 }], total: 999, status: 'cancelled', date: '2026-04-15' },
    { id: 'SO20260418007', customer: 'Karthik R', email: 'karthik@gmail.com', items: [{ name: 'CloudWalk Sneakers', qty: 1, price: 3999 }], total: 3999, status: 'delivered', date: '2026-04-14' },
    { id: 'SO20260418008', customer: 'Meera Iyer', email: 'meera@gmail.com', items: [{ name: 'FlexForm Yoga Pants', qty: 1, price: 2299 }, { name: 'PowerFit Sports Bra', qty: 1, price: 1799 }], total: 4098, status: 'pending', date: '2026-04-19' },
  ];
  localStorage.setItem(ADMIN_ORDERS_KEY, JSON.stringify(orders));
  return orders;
}

// ---- Admin Sidebar ----
function renderAdminSidebar(activePage) {
  return `
    <div class="admin-sidebar-overlay" id="admin-sidebar-overlay"></div>
    <aside class="admin-sidebar" id="admin-sidebar">
      <div class="admin-sidebar-header">
        <div class="logo-icon">S</div>
        <span class="logo-text">SHOWOFF</span>
        <span class="admin-badge">Admin</span>
      </div>
      <nav class="admin-sidebar-nav">
        <a href="#/admin/dashboard" class="admin-nav-item ${activePage === 'dashboard' ? 'active' : ''}">
          <span class="nav-icon">📊</span> Dashboard
        </a>
        <a href="#/admin/products" class="admin-nav-item ${activePage === 'products' ? 'active' : ''}">
          <span class="nav-icon">📦</span> Products
        </a>
        <a href="#/admin/orders" class="admin-nav-item ${activePage === 'orders' ? 'active' : ''}">
          <span class="nav-icon">🛒</span> Orders
        </a>
        <div class="admin-nav-divider"></div>
        <a href="#/" class="admin-nav-item">
          <span class="nav-icon">🏪</span> Visit Store
        </a>
        <button class="admin-nav-item" id="admin-logout-btn">
          <span class="nav-icon">🚪</span> Logout
        </button>
      </nav>
      <div class="admin-sidebar-footer">
        <div class="admin-user-info">
          <div class="admin-user-avatar">A</div>
          <div class="admin-user-details">
            <div class="admin-user-name">Admin</div>
            <div class="admin-user-role">Shop Owner</div>
          </div>
        </div>
      </div>
    </aside>
  `;
}

// ---- Admin Topbar ----
function renderAdminTopbar(title) {
  return `
    <header class="admin-topbar">
      <div class="admin-topbar-left">
        <button class="admin-mobile-toggle" id="admin-mobile-toggle">☰</button>
        <h2>${title}</h2>
      </div>
      <div class="admin-topbar-right">
        <a href="#/" class="visit-store">🏪 Visit Store →</a>
      </div>
    </header>
  `;
}

// ---- Admin Layout Wrapper ----
function adminLayout(activePage, title, content) {
  return `
    <div class="admin-layout" id="admin-layout">
      ${renderAdminSidebar(activePage)}
      <main class="admin-main">
        ${renderAdminTopbar(title)}
        <div class="admin-content page-transition">
          ${content}
        </div>
      </main>
    </div>
  `;
}

// ============================================
// LOGIN PAGE
// ============================================
export function renderAdminLogin() {
  return `
    <div class="admin-login-page" id="admin-login-page">
      <div class="login-orb login-orb-1"></div>
      <div class="login-orb login-orb-2"></div>
      <div class="admin-login-card">
        <div class="login-logo">
          <div class="logo-icon">S</div>
          <h1>SHOWOFF</h1>
          <p>Admin Dashboard</p>
        </div>
        <form class="admin-login-form" id="admin-login-form">
          <div class="login-error" id="login-error">
            Invalid email or password. Please try again.
          </div>
          <div class="form-group">
            <label for="admin-email">Email Address</label>
            <input type="email" id="admin-email" placeholder="admin@showoff.com" autocomplete="email" required>
          </div>
          <div class="form-group">
            <label for="admin-password">Password</label>
            <input type="password" id="admin-password" placeholder="Enter password" autocomplete="current-password" required>
          </div>
          <button type="submit" class="btn-login" id="admin-login-btn">Sign In</button>
        </form>
        <div class="admin-login-footer">
          <a href="#/">← Back to Store</a>
        </div>
      </div>
    </div>
  `;
}

// ============================================
// DASHBOARD PAGE
// ============================================
export function renderAdminDashboard() {
  const orders = getAdminOrders();
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const lowStock = products.filter(p => !p.manualOutOfStock && p.stockQty <= 5 && p.stockQty > 0).length;
  const revenue = orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.total, 0);
  const recentOrders = orders.slice(0, 5);

  const content = `
    <!-- Stats Cards -->
    <div class="admin-stats-grid">
      <div class="admin-stat-card">
        <div class="stat-icon purple">📦</div>
        <div class="stat-value">${totalProducts}</div>
        <div class="stat-label">Total Products</div>
      </div>
      <div class="admin-stat-card">
        <div class="stat-icon blue">🛒</div>
        <div class="stat-value">${totalOrders}</div>
        <div class="stat-label">Total Orders</div>
      </div>
      <div class="admin-stat-card">
        <div class="stat-icon yellow">⚠️</div>
        <div class="stat-value">${lowStock}</div>
        <div class="stat-label">Low Stock Items</div>
      </div>
      <div class="admin-stat-card">
        <div class="stat-icon green">💰</div>
        <div class="stat-value">${formatPrice(revenue)}</div>
        <div class="stat-label">Total Revenue</div>
      </div>
    </div>

    <!-- Recent Orders Table -->
    <div class="admin-recent-section">
      <div class="admin-table-wrapper">
        <div class="admin-table-header">
          <h3>Recent Orders</h3>
          <a href="#/admin/orders" class="btn btn-secondary btn-sm">View All</a>
        </div>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            ${recentOrders.map(o => `
              <tr>
                <td style="font-weight:600; font-size:0.8rem;">${o.id}</td>
                <td>
                  <div style="font-weight:500;">${o.customer}</div>
                  <div style="font-size:0.75rem; color:var(--text-tertiary);">${o.email}</div>
                </td>
                <td style="font-size:0.85rem;">${o.items.map(i => `${i.name} ×${i.qty}`).join(', ')}</td>
                <td style="font-weight:600;">${formatPrice(o.total)}</td>
                <td><span class="status-badge ${o.status}">${o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span></td>
                <td style="font-size:0.85rem; color:var(--text-secondary);">${o.date}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Low Stock Alert -->
    ${lowStock > 0 ? `
      <div class="admin-recent-section">
        <div class="admin-table-wrapper">
          <div class="admin-table-header">
            <h3>⚠️ Low Stock Products</h3>
          </div>
          <table class="admin-table">
            <thead><tr><th>Product</th><th>Stock</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              ${products.filter(p => !p.manualOutOfStock && p.stockQty <= 5 && p.stockQty > 0).map(p => `
                <tr>
                  <td>
                    <div class="product-cell">
                      <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
                      <div>
                        <div class="product-name">${p.name}</div>
                        <div class="product-cat">${p.category} / ${p.subcategory}</div>
                      </div>
                    </div>
                  </td>
                  <td style="font-weight:700;">${p.stockQty}</td>
                  <td><span class="status-badge low-stock">Low Stock</span></td>
                  <td><button class="btn btn-secondary btn-sm" data-restock="${p.id}">Restock</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    ` : ''}
  `;

  return adminLayout('dashboard', 'Dashboard', content);
}

// ============================================
// PRODUCTS PAGE
// ============================================
export function renderAdminProducts() {
  const content = `
    <div class="admin-table-wrapper">
      <div class="admin-table-header">
        <h3>All Products (${products.length})</h3>
        <div class="admin-table-actions">
          <button class="btn btn-primary btn-sm" id="admin-add-product-btn">+ Add Product</button>
        </div>
      </div>
      <table class="admin-table" id="admin-products-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${products.map(p => {
            const outOfStock = p.manualOutOfStock || p.stockQty === 0;
            const stockStatus = outOfStock ? 'out-of-stock' : p.stockQty <= 5 ? 'low-stock' : 'in-stock';
            const stockLabel = p.manualOutOfStock ? 'Disabled (Out of Stock)' : (p.stockQty === 0 ? 'Out of Stock' : p.stockQty <= 5 ? 'Low Stock' : 'In Stock');
            return `
              <tr data-product-row="${p.id}">
                <td>
                  <div class="product-cell">
                    <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
                    <div>
                      <div class="product-name">${p.name}</div>
                      <div class="product-cat">${p.subcategory}</div>
                    </div>
                  </div>
                </td>
                <td style="font-weight:600;">${formatPrice(p.price)}${p.originalPrice ? `<br><span style="font-size:0.75rem;color:var(--text-tertiary);text-decoration:line-through;">${formatPrice(p.originalPrice)}</span>` : ''}</td>
                <td style="font-weight:700;">${p.stockQty}</td>
                <td><span class="status-badge ${stockStatus}">${stockLabel}</span></td>
                <td style="font-size:0.85rem;">${p.category}</td>
                <td style="font-size:0.85rem;">⭐ ${p.rating}</td>
                <td>
                  <div class="action-btns">
                    <button data-edit-product="${p.id}" title="Edit">✏️ Edit</button>
                    <button data-delete-product="${p.id}" class="delete-btn" title="Delete">🗑️</button>
                  </div>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Product Modal -->
    <div class="admin-modal-overlay" id="product-modal-overlay">
      <div class="admin-modal">
        <div class="admin-modal-header">
          <h3 id="product-modal-title">Add Product</h3>
          <button class="admin-modal-close" id="product-modal-close">✕</button>
        </div>
        <div class="admin-modal-body">
          <form id="product-form">
            <input type="hidden" id="product-form-id" value="">
            <div class="form-group">
              <label for="pf-name">Product Name</label>
              <input type="text" id="pf-name" placeholder="e.g., Urban Flex Sneakers" required>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="pf-price">Price (₹)</label>
                <input type="number" id="pf-price" placeholder="2999" required>
              </div>
              <div class="form-group">
                <label for="pf-stock">Stock Quantity</label>
                <input type="number" id="pf-stock" placeholder="25" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="pf-category">Category</label>
                <select id="pf-category" required>
                  <option value="">Select Category</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
              <div class="form-group">
                <label for="pf-subcategory">Subcategory</label>
                <input type="text" id="pf-subcategory" placeholder="e.g., Sneakers, T-Shirts">
              </div>
            </div>
            <div class="form-group">
              <label for="pf-description">Description</label>
              <textarea id="pf-description" placeholder="Premium product description..."></textarea>
            </div>
            <div class="form-group" style="display:flex; align-items:center; gap:8px;">
              <input type="checkbox" id="pf-out-of-stock" style="width:16px; height:16px;">
              <label for="pf-out-of-stock" style="margin:0; font-size:0.9rem;">Mark as Out of Stock (manually override)</label>
            </div>
            <div class="form-group">
              <label for="pf-image">Image URL</label>
              <input type="text" id="pf-image" placeholder="https://images.unsplash.com/...">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="pf-original-price">Original Price (₹, optional)</label>
                <input type="number" id="pf-original-price" placeholder="For discounts">
              </div>
              <div class="form-group">
                <label for="pf-rating">Rating (1-5)</label>
                <input type="number" id="pf-rating" step="0.1" min="1" max="5" placeholder="4.5">
              </div>
            </div>
          </form>
        </div>
        <div class="admin-modal-footer">
          <button class="btn btn-secondary btn-sm" id="product-modal-cancel">Cancel</button>
          <button class="btn btn-primary btn-sm" id="product-form-submit">Save Product</button>
        </div>
      </div>
    </div>
  `;

  return adminLayout('products', 'Products', content);
}

// ============================================
// ORDERS PAGE
// ============================================
export function renderAdminOrders() {
  const orders = getAdminOrders();

  const content = `
    <div class="admin-table-wrapper">
      <div class="admin-table-header">
        <h3>All Orders (${orders.length})</h3>
        <div class="admin-table-actions">
          <div style="display:flex; gap:var(--space-sm);">
            <button class="filter-btn active" data-order-filter="all">All</button>
            <button class="filter-btn" data-order-filter="pending">Pending</button>
            <button class="filter-btn" data-order-filter="processing">Processing</button>
            <button class="filter-btn" data-order-filter="delivered">Delivered</button>
            <button class="filter-btn" data-order-filter="cancelled">Cancelled</button>
          </div>
        </div>
      </div>
      <table class="admin-table" id="admin-orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Products</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="orders-tbody">
          ${orders.map(o => renderOrderRow(o)).join('')}
        </tbody>
      </table>
    </div>
  `;

  return adminLayout('orders', 'Orders', content);
}

function renderOrderRow(o) {
  return `
    <tr data-order-row="${o.id}" data-order-status="${o.status}">
      <td style="font-weight:600; font-size:0.8rem; font-family:monospace;">${o.id}</td>
      <td>
        <div style="font-weight:500;">${o.customer}</div>
        <div style="font-size:0.75rem; color:var(--text-tertiary);">${o.email}</div>
      </td>
      <td style="font-size:0.85rem;">${o.items.map(i => `${i.name} ×${i.qty}`).join('<br>')}</td>
      <td style="font-weight:600;">${formatPrice(o.total)}</td>
      <td><span class="status-badge ${o.status}">${o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span></td>
      <td style="font-size:0.85rem; color:var(--text-secondary);">${o.date}</td>
      <td>
        <div class="action-btns">
          <select data-update-order="${o.id}" style="padding:6px 10px; background:var(--bg-tertiary); border:1px solid var(--glass-border); border-radius:var(--radius-sm); color:var(--text-primary); font-size:0.75rem; cursor:pointer;">
            <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>Pending</option>
            <option value="processing" ${o.status === 'processing' ? 'selected' : ''}>Processing</option>
            <option value="delivered" ${o.status === 'delivered' ? 'selected' : ''}>Delivered</option>
            <option value="cancelled" ${o.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </div>
      </td>
    </tr>
  `;
}

// ============================================
// ADMIN EVENT HANDLERS
// ============================================
export function attachAdminListeners(page) {
  // Logout
  const logoutBtn = document.getElementById('admin-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      adminLogout();
    });
  }

  // Mobile sidebar toggle
  const mobileToggle = document.getElementById('admin-mobile-toggle');
  const sidebar = document.getElementById('admin-sidebar');
  const sidebarOverlay = document.getElementById('admin-sidebar-overlay');
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      sidebarOverlay?.classList.toggle('active');
    });
  }
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      sidebar?.classList.remove('open');
      sidebarOverlay.classList.remove('active');
    });
  }

  // Login form
  if (page === 'login') {
    const form = document.getElementById('admin-login-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('admin-email').value.trim();
        const password = document.getElementById('admin-password').value;
        const errorEl = document.getElementById('login-error');
        const btn = document.getElementById('admin-login-btn');

        btn.disabled = true;
        btn.textContent = 'Signing in...';

        setTimeout(() => {
          if (adminLogin(email, password)) {
            showToast('Welcome back, Admin! 🎉');
            location.hash = '#/admin/dashboard';
          } else {
            errorEl.classList.add('show');
            btn.disabled = false;
            btn.textContent = 'Sign In';
            setTimeout(() => errorEl.classList.remove('show'), 4000);
          }
        }, 800);
      });
    }
  }

  // Dashboard restock buttons
  if (page === 'dashboard') {
    document.querySelectorAll('[data-restock]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.restock);
        const p = products.find(x => x.id === id);
        if (p) {
          p.stockQty += 20;
          p.manualOutOfStock = false;
          saveProducts(products);
          showToast(`${p.name} restocked (+20 units)`);
          location.hash = '#/admin/dashboard';
        }
      });
    });
  }

  // Products page
  if (page === 'products') {
    attachProductFormListeners();
  }

  // Orders page
  if (page === 'orders') {
    attachOrderListeners();
  }
}

function attachProductFormListeners() {
  const modal = document.getElementById('product-modal-overlay');
  const addBtn = document.getElementById('admin-add-product-btn');
  const closeBtn = document.getElementById('product-modal-close');
  const cancelBtn = document.getElementById('product-modal-cancel');
  const submitBtn = document.getElementById('product-form-submit');
  const titleEl = document.getElementById('product-modal-title');

  function openModal(editProduct = null) {
    if (editProduct) {
      titleEl.textContent = 'Edit Product';
      document.getElementById('product-form-id').value = editProduct.id;
      document.getElementById('pf-name').value = editProduct.name;
      document.getElementById('pf-price').value = editProduct.price;
      document.getElementById('pf-stock').value = editProduct.stockQty;
      document.getElementById('pf-out-of-stock').checked = !!editProduct.manualOutOfStock;
      document.getElementById('pf-category').value = editProduct.category;
      document.getElementById('pf-subcategory').value = editProduct.subcategory;
      document.getElementById('pf-description').value = editProduct.description;
      document.getElementById('pf-image').value = editProduct.images[0];
      document.getElementById('pf-original-price').value = editProduct.originalPrice || '';
      document.getElementById('pf-rating').value = editProduct.rating;
    } else {
      titleEl.textContent = 'Add Product';
      document.getElementById('product-form').reset();
      document.getElementById('product-form-id').value = '';
      document.getElementById('pf-out-of-stock').checked = false;
    }
    modal.classList.add('active');
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  if (addBtn) addBtn.addEventListener('click', () => openModal());
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  // Submit
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const name = document.getElementById('pf-name').value.trim();
      const price = parseInt(document.getElementById('pf-price').value);
      const stockQty = parseInt(document.getElementById('pf-stock').value);
      const category = document.getElementById('pf-category').value;
      const subcategory = document.getElementById('pf-subcategory').value.trim();
      const description = document.getElementById('pf-description').value.trim();
      const image = document.getElementById('pf-image').value.trim();
      const originalPrice = parseInt(document.getElementById('pf-original-price').value) || null;
      const rating = parseFloat(document.getElementById('pf-rating').value) || 4.5;
      const manualOutOfStock = document.getElementById('pf-out-of-stock').checked;
      const editId = document.getElementById('product-form-id').value;

      if (!name || !price || isNaN(stockQty) || !category) {
        showToast('Please fill in all required fields', 'error');
        return;
      }

      if (editId) {
        // Edit existing
        const idx = products.findIndex(p => p.id === parseInt(editId));
        if (idx !== -1) {
          products[idx].name = name;
          products[idx].price = price;
          products[idx].stockQty = stockQty;
          products[idx].category = category;
          products[idx].subcategory = subcategory || products[idx].subcategory;
          products[idx].description = description || products[idx].description;
          if (image) products[idx].images[0] = image;
          products[idx].originalPrice = originalPrice;
          products[idx].rating = rating;
          products[idx].manualOutOfStock = manualOutOfStock;
          
          const isOutOfStock = manualOutOfStock || stockQty === 0;
          products[idx].stock = isOutOfStock ? 'out_of_stock' : stockQty <= 5 ? 'limited' : 'in_stock';
          products[idx].discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;
          products[idx].badge = isOutOfStock ? null : products[idx].badge; // Only out of stock logic via rendering, don't pollute badge
          
          saveProducts(products);
          showToast(`${name} updated successfully ✓`);
        }
      } else {
        // Add new
        const newProduct = {
          id: Date.now(),
          name,
          slug: name.toLowerCase().replace(/\s+/g, '-'),
          category,
          subcategory: subcategory || 'General',
          price,
          originalPrice,
          discount: originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0,
          description: description || 'Premium SHOWOFF product.',
          features: ['Premium quality', 'Modern design', 'Comfortable fit'],
          sizes: category === 'accessories' ? ['One Size'] : ['S', 'M', 'L', 'XL'],
          colors: [{ name: 'Black', hex: '#111111' }],
          rating,
          reviewCount: 0,
          manualOutOfStock,
          stock: (manualOutOfStock || stockQty === 0) ? 'out_of_stock' : stockQty <= 5 ? 'limited' : 'in_stock',
          stockQty,
          badge: null,
          images: [
            image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=700&fit=crop&auto=format&q=80',
          ],
          trending: false,
        };
        products.push(newProduct);
        saveProducts(products);
        showToast(`${name} added successfully! 🎉`);
      }

      closeModal();
      // Re-render
      location.hash = '#/admin/products';
    });
  }

  // Edit buttons
  document.querySelectorAll('[data-edit-product]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.editProduct);
      const product = products.find(p => p.id === id);
      if (product) openModal(product);
    });
  });

  // Delete buttons
  document.querySelectorAll('[data-delete-product]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.deleteProduct);
      if (confirm('Are you sure you want to delete this product?')) {
        const keep = products.filter(p => p.id !== id);
        products.length = 0;
        products.push(...keep);
        saveProducts(products);
        showToast('Product deleted', 'info');
        location.hash = '#/admin/products';
      }
    });
  });
}

function attachOrderListeners() {
  // Filter buttons
  document.querySelectorAll('[data-order-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-order-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.orderFilter;
      document.querySelectorAll('[data-order-row]').forEach(row => {
        if (filter === 'all' || row.dataset.orderStatus === filter) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // Status update dropdowns
  document.querySelectorAll('[data-update-order]').forEach(select => {
    select.addEventListener('change', () => {
      const orderId = select.dataset.updateOrder;
      const newStatus = select.value;
      const orders = getAdminOrders();
      const order = orders.find(o => o.id === orderId);
      if (order) {
        order.status = newStatus;
        localStorage.setItem(ADMIN_ORDERS_KEY, JSON.stringify(orders));
        showToast(`Order ${orderId} → ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`);
        // Update badge in the row
        const row = document.querySelector(`[data-order-row="${orderId}"]`);
        if (row) {
          row.dataset.orderStatus = newStatus;
          const badge = row.querySelector('.status-badge');
          if (badge) {
            badge.className = `status-badge ${newStatus}`;
            badge.textContent = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
          }
        }
      }
    });
  });
}
