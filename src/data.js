// ============================================
// SHOWOFF - Product Data & Categories
// ============================================

export const categories = [
  {
    id: 'men',
    name: 'Men',
    description: 'Elevate your streetwear game',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=750&fit=crop&auto=format&q=80',
    subcategories: ['T-Shirts', 'Sneakers', 'Hoodies'],
  },
  {
    id: 'women',
    name: 'Women',
    description: 'Bold style, limitless confidence',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=750&fit=crop&auto=format&q=80',
    subcategories: ['Activewear', 'Tops', 'Shoes'],
  },
  {
    id: 'kids',
    name: 'Kids',
    description: 'Cool fits for little legends',
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&h=750&fit=crop&auto=format&q=80',
    subcategories: ['T-Shirts', 'Shoes'],
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Complete your look',
    image: 'https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?w=600&h=750&fit=crop&auto=format&q=80',
    subcategories: ['Caps', 'Bags'],
  },
];

const initialProducts = [
  {
    id: 1,
    name: 'Urban Flex Sneakers',
    slug: 'urban-flex-sneakers',
    category: 'men',
    subcategory: 'Sneakers',
    price: 3999,
    originalPrice: 4999,
    discount: 20,
    description: 'Engineered for the streets. The Urban Flex features responsive cushioning, breathable mesh upper, and a bold silhouette that commands attention. Built for those who move with purpose.',
    features: ['Responsive FlexFoam™ cushioning', 'Breathable mesh upper', 'Rubber outsole for grip', 'Reflective accents'],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    colors: [
      { name: 'Core Black', hex: '#1a1a1a' },
      { name: 'Cloud White', hex: '#f5f5f5' },
      { name: 'Signal Red', hex: '#ef4444' },
    ],
    rating: 4.8,
    reviewCount: 342,
    stock: 'limited',
    badge: '20% OFF',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=700&fit=crop&auto=format&q=80',
    ],
    trending: true,
  },
  {
    id: 2,
    name: 'Classic Polo T-Shirt',
    slug: 'classic-polo-tshirt',
    category: 'men',
    subcategory: 'T-Shirts',
    price: 1499,
    originalPrice: null,
    discount: 0,
    description: 'Timeless versatility meets premium comfort. Crafted from 100% organic cotton with a modern relaxed fit that transitions effortlessly from casual to semi-formal.',
    features: ['100% organic cotton', 'Relaxed modern fit', 'Ribbed collar & cuffs', 'Signature embroidered logo'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#ffffff' },
      { name: 'Navy', hex: '#1e3a5f' },
      { name: 'Black', hex: '#111111' },
    ],
    rating: 4.5,
    reviewCount: 189,
    stock: 'in_stock',
    badge: 'Bestseller',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=700&fit=crop&auto=format&q=80',
    ],
    trending: false,
  },
  {
    id: 3,
    name: 'Midnight Hoodie',
    slug: 'midnight-hoodie',
    category: 'men',
    subcategory: 'Hoodies',
    price: 2999,
    originalPrice: null,
    discount: 0,
    description: 'Wrapped in midnight. This heavyweight hoodie delivers premium warmth with a streetwear edge. Oversized fit, kangaroo pocket, and brushed fleece interior for ultimate comfort.',
    features: ['400 GSM heavyweight fleece', 'Oversized streetwear fit', 'Adjustable drawstring hood', 'Kangaroo pocket'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Midnight Black', hex: '#0d0d0d' },
      { name: 'Charcoal', hex: '#333333' },
      { name: 'Deep Purple', hex: '#4c1d95' },
    ],
    rating: 4.7,
    reviewCount: 256,
    stock: 'in_stock',
    badge: 'Bestseller',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1565693413579-8a3c78a76c5c?w=600&h=700&fit=crop&auto=format&q=80',
    ],
    trending: true,
  },
  {
    id: 4,
    name: 'Street Runner Pro',
    slug: 'street-runner-pro',
    category: 'men',
    subcategory: 'Sneakers',
    price: 4399,
    originalPrice: 5499,
    discount: 20,
    description: 'Performance meets street style. The Street Runner Pro combines lightweight engineering with bold aesthetics. Designed for runners who refuse to compromise on looks.',
    features: ['Ultra-light ProFlight™ sole', 'Knit breathable upper', 'Impact-absorbing heel', 'Glow-in-dark outsole'],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    colors: [
      { name: 'Shadow Black', hex: '#1a1a2e' },
      { name: 'Neon Green', hex: '#22c55e' },
    ],
    rating: 4.6,
    reviewCount: 128,
    stock: 'limited',
    badge: 'Limited Stock',
    images: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=700&fit=crop&auto=format&q=80',
    ],
    trending: true,
  },
  {
    id: 5,
    name: 'PowerFit Sports Bra',
    slug: 'powerfit-sports-bra',
    category: 'women',
    subcategory: 'Activewear',
    price: 1799,
    originalPrice: null,
    discount: 0,
    description: 'Maximum support, zero compromise. The PowerFit Sports Bra is engineered for high-intensity workouts with moisture-wicking fabric and a supportive yet comfortable fit.',
    features: ['High-impact support', 'Moisture-wicking DryFit™', 'Removable padding', 'Racerback design'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'Berry', hex: '#be185d' },
      { name: 'White', hex: '#f8f8f8' },
    ],
    rating: 4.9,
    reviewCount: 412,
    stock: 'in_stock',
    badge: 'Bestseller',
    images: [
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&h=700&fit=crop&auto=format&q=80',
    ],
    trending: false,
  },
  {
    id: 6,
    name: 'FlexForm Yoga Pants',
    slug: 'flexform-yoga-pants',
    category: 'women',
    subcategory: 'Activewear',
    price: 2299,
    originalPrice: null,
    discount: 0,
    description: 'Move without limits. These buttery-soft yoga pants offer 4-way stretch, a high-rise waistband, and a sculpted silhouette that flatters every body type.',
    features: ['4-way stretch fabric', 'High-rise waistband', 'Hidden waist pocket', 'Squat-proof design'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Onyx', hex: '#0f0f0f' },
      { name: 'Slate', hex: '#475569' },
      { name: 'Plum', hex: '#7e22ce' },
    ],
    rating: 4.7,
    reviewCount: 298,
    stock: 'in_stock',
    badge: null,
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&h=700&fit=crop&auto=format&q=80',
    ],
    trending: false,
  },
  {
    id: 7,
    name: 'Aura Crop Top',
    slug: 'aura-crop-top',
    category: 'women',
    subcategory: 'Tops',
    price: 999,
    originalPrice: 1299,
    discount: 23,
    description: 'Effortlessly chic. The Aura Crop Top blends streetwear attitude with feminine elegance. Lightweight, breathable, and perfect for layering or standalone style.',
    features: ['Lightweight cotton blend', 'Relaxed crop fit', 'Dropped shoulders', 'Screen-printed logo'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'White', hex: '#ffffff' },
      { name: 'Lavender', hex: '#a78bfa' },
      { name: 'Sage', hex: '#86efac' },
    ],
    rating: 4.4,
    reviewCount: 167,
    stock: 'in_stock',
    badge: '23% OFF',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=700&fit=crop&auto=format&q=80',
    ],
    trending: false,
  },
  {
    id: 8,
    name: 'CloudWalk Sneakers',
    slug: 'cloudwalk-sneakers',
    category: 'women',
    subcategory: 'Shoes',
    price: 3999,
    originalPrice: null,
    discount: 0,
    description: 'Walk on clouds. These women\'s sneakers combine cloud-like cushioning with a sleek silhouette. The perfect fusion of comfort and runway-ready style.',
    features: ['CloudFoam™ midsole', 'Premium leather upper', 'Ortholite® insole', 'Minimalist design'],
    sizes: ['UK 3', 'UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'],
    colors: [
      { name: 'Pearl White', hex: '#f1f1f1' },
      { name: 'Blush Pink', hex: '#fda4af' },
    ],
    rating: 4.6,
    reviewCount: 203,
    stock: 'in_stock',
    badge: 'New',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=700&fit=crop&auto=format&q=80',
    ],
    trending: true,
  },
  {
    id: 9,
    name: 'Junior Sport Tee',
    slug: 'junior-sport-tee',
    category: 'kids',
    subcategory: 'T-Shirts',
    price: 799,
    originalPrice: null,
    discount: 0,
    description: 'Cool fits for little champions. This moisture-wicking tee keeps kids comfortable and stylish whether they\'re on the playground or the pitch.',
    features: ['Quick-dry fabric', 'UPF 30+ sun protection', 'Tag-free comfort', 'Durable print'],
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
    colors: [
      { name: 'Electric Blue', hex: '#3b82f6' },
      { name: 'White', hex: '#ffffff' },
      { name: 'Black', hex: '#111111' },
    ],
    rating: 4.3,
    reviewCount: 89,
    stock: 'in_stock',
    badge: null,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&h=700&fit=crop&auto=format&q=80',
    ],
    trending: false,
  },
  {
    id: 10,
    name: 'Mini Runner Shoes',
    slug: 'mini-runner-shoes',
    category: 'kids',
    subcategory: 'Shoes',
    price: 1999,
    originalPrice: 2499,
    discount: 20,
    description: 'Big performance in a small package. Designed for active kids who won\'t slow down. Lightweight, durable, and cool enough to impress their friends.',
    features: ['Lightweight EVA sole', 'Easy velcro closure', 'Reinforced toe cap', 'Non-marking outsole'],
    sizes: ['UK 10K', 'UK 11K', 'UK 12K', 'UK 13K', 'UK 1', 'UK 2'],
    colors: [
      { name: 'Blue Bolt', hex: '#2563eb' },
      { name: 'Red Flash', hex: '#dc2626' },
    ],
    rating: 4.5,
    reviewCount: 134,
    stock: 'limited',
    badge: '20% OFF',
    images: [
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&h=700&fit=crop&auto=format&q=80',
    ],
    trending: false,
  },
  {
    id: 11,
    name: 'StreetCap Snapback',
    slug: 'streetcap-snapback',
    category: 'accessories',
    subcategory: 'Caps',
    price: 899,
    originalPrice: null,
    discount: 0,
    description: 'Crown your style. This structured snapback features premium embroidery, an adjustable snap closure, and a classic flat brim that defines street culture.',
    features: ['Structured 6-panel design', 'Premium embroidered logo', 'Adjustable snapback closure', 'Breathable eyelets'],
    sizes: ['One Size'],
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'White', hex: '#f5f5f5' },
      { name: 'Navy', hex: '#1e3a5f' },
    ],
    rating: 4.2,
    reviewCount: 76,
    stock: 'in_stock',
    badge: null,
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=600&h=700&fit=crop&auto=format&q=80',
    ],
    trending: false,
  },
  {
    id: 12,
    name: 'Urban Backpack Pro',
    slug: 'urban-backpack-pro',
    category: 'accessories',
    subcategory: 'Bags',
    price: 3499,
    originalPrice: null,
    discount: 0,
    description: 'Carry your world in style. The Urban Backpack Pro features a water-resistant exterior, padded laptop compartment, and multiple organizer pockets — built for the modern commuter.',
    features: ['Water-resistant material', '15.6" laptop compartment', 'Padded back panel', 'Hidden anti-theft pocket'],
    sizes: ['One Size'],
    colors: [
      { name: 'Stealth Black', hex: '#0a0a0a' },
      { name: 'Urban Grey', hex: '#4b5563' },
    ],
    rating: 4.8,
    reviewCount: 215,
    stock: 'in_stock',
    badge: 'Bestseller',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1581605405669-fcdf81165571?w=600&h=700&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1622560480654-d96214fddae9?w=600&h=700&fit=crop&auto=format&q=80',
    ],
    trending: true,
  },
];

export const products = [];

export function loadProducts() {
  const stored = localStorage.getItem('showoff_catalog');
  let current;
  if (stored) {
    current = JSON.parse(stored);
  } else {
    current = initialProducts.map(p => ({
      ...p,
      stockQty: p.stock === 'limited' ? Math.floor(Math.random() * 5) + 2 : Math.floor(Math.random() * 40) + 15,
      manualOutOfStock: false
    }));
    localStorage.setItem('showoff_catalog', JSON.stringify(current));
  }
  
  // Update array in-place so all imports get the fresh data
  products.length = 0;
  products.push(...current);
  return products;
}

export function saveProducts(prods) {
  localStorage.setItem('showoff_catalog', JSON.stringify(prods));
  loadProducts();
  window.dispatchEvent(new Event('catalog-updated'));
}

// Initial load
loadProducts();

// Listen for cross-tab updates
window.addEventListener('storage', (e) => {
  if (e.key === 'showoff_catalog') {
    loadProducts();
    window.dispatchEvent(new Event('catalog-updated'));
  }
});

export const testimonials = [
  {
    id: 1,
    name: 'Arjun Mehta',
    location: 'Mumbai',
    avatar: 'A',
    rating: 5,
    text: 'The quality is insane! My Urban Flex Sneakers feel like they\'re made for royalty. SHOWOFF is my go-to brand now.',
    product: 'Urban Flex Sneakers',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    location: 'Delhi',
    avatar: 'P',
    rating: 5,
    text: 'Absolutely love the Midnight Hoodie. The fabric quality is premium and it fits perfectly. Will definitely order more!',
    product: 'Midnight Hoodie',
  },
  {
    id: 3,
    name: 'Rohan Das',
    location: 'Bangalore',
    avatar: 'R',
    rating: 4,
    text: 'Fast delivery, premium packaging, and the product exceeded expectations. The backpack is incredibly well-built.',
    product: 'Urban Backpack Pro',
  },
  {
    id: 4,
    name: 'Sneha Pillai',
    location: 'Coimbatore',
    avatar: 'S',
    rating: 5,
    text: 'The PowerFit Sports Bra is hands down the best activewear I\'ve owned. Unreal support and so comfortable!',
    product: 'PowerFit Sports Bra',
  },
];

export const promos = [
  {
    id: 1,
    title: 'FLAT 20% OFF',
    subtitle: 'On your first order',
    code: 'SHOWOFF20',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
  },
  {
    id: 2,
    title: 'FREE SHIPPING',
    subtitle: 'On orders above ₹1,999',
    code: null,
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
  },
];

export function getProductById(id) {
  return products.find(p => p.id === parseInt(id));
}

export function getProductsByCategory(category) {
  return products.filter(p => p.category === category);
}

export function getTrendingProducts() {
  return products.filter(p => p.trending);
}

export function getBestsellers() {
  return products.filter(p => p.badge === 'Bestseller');
}

export function getRelatedProducts(productId, limit = 4) {
  const product = getProductById(productId);
  if (!product) return [];
  return products
    .filter(p => p.id !== product.id && (p.category === product.category || p.subcategory === product.subcategory))
    .slice(0, limit);
}

export function searchProducts(query) {
  const q = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.subcategory.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
}

export function filterProducts(filters) {
  let filtered = [...products];

  if (filters.category) {
    filtered = filtered.filter(p => p.category === filters.category);
  }
  if (filters.subcategory) {
    filtered = filtered.filter(p => p.subcategory === filters.subcategory);
  }
  if (filters.size) {
    filtered = filtered.filter(p => p.sizes.includes(filters.size));
  }
  if (filters.color) {
    filtered = filtered.filter(p => p.colors.some(c => c.name === filters.color));
  }
  if (filters.priceMin) {
    filtered = filtered.filter(p => p.price >= filters.priceMin);
  }
  if (filters.priceMax) {
    filtered = filtered.filter(p => p.price <= filters.priceMax);
  }
  if (filters.inStock) {
    filtered = filtered.filter(p => p.stock === 'in_stock');
  }

  // Sorting
  switch (filters.sortBy) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      filtered.sort((a, b) => b.id - a.id);
      break;
    default: // popular
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
  }

  return filtered;
}
