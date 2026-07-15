/**
 * ShopNest E-Commerce Backend
 * Node.js + Express REST API
 *
 * Install: npm install express cors body-parser
 * Run:     node server.js
 * API:     http://localhost:3000/api
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ===================== MIDDLEWARE =====================
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // serve frontend

// ===================== IN-MEMORY DATA =====================
let products = [
  { id: 1, name: "Wireless Noise-Cancelling Headphones", category: "Electronics", price: 4999, oldPrice: 7999, rating: 4.8, reviews: 234, emoji: "🎧", badge: "Best Seller", stock: 45, desc: "Premium over-ear headphones with 40-hour battery life and adaptive noise cancellation.", tags: ["wireless", "audio", "premium"] },
  { id: 2, name: "Smart Fitness Watch", category: "Electronics", price: 8499, oldPrice: 12999, rating: 4.6, reviews: 189, emoji: "⌚", badge: "New", stock: 30, desc: "Track your fitness goals with GPS, heart rate monitoring, SpO2 sensor, and 7-day battery life.", tags: ["fitness", "wearable", "health"] },
  { id: 3, name: "Premium Running Shoes", category: "Sports", price: 3299, oldPrice: 4999, rating: 4.7, reviews: 312, emoji: "👟", badge: "Sale", stock: 60, desc: "Engineered for performance with responsive cushioning and breathable mesh upper.", tags: ["running", "footwear", "sports"] },
  { id: 4, name: "Linen Blend Shirt", category: "Fashion", price: 1499, oldPrice: 2299, rating: 4.4, reviews: 98, emoji: "👔", badge: null, stock: 120, desc: "Breathable linen-cotton blend for all-day comfort.", tags: ["clothing", "casual", "summer"] },
  { id: 5, name: "Stainless Steel Water Bottle", category: "Sports", price: 699, oldPrice: 999, rating: 4.9, reviews: 567, emoji: "🥤", badge: "Top Rated", stock: 200, desc: "Double-walled vacuum insulation, leak-proof, BPA-free. Cold 24h / Hot 12h.", tags: ["hydration", "eco", "sports"] },
  { id: 6, name: "Aromatherapy Diffuser", category: "Home", price: 2199, oldPrice: 2999, rating: 4.5, reviews: 143, emoji: "🌸", badge: null, stock: 35, desc: "Ultrasonic diffuser with 7-colour LED lighting and auto shut-off.", tags: ["home", "wellness", "decor"] },
  { id: 7, name: "Vitamin C Serum", category: "Beauty", price: 899, oldPrice: 1299, rating: 4.7, reviews: 421, emoji: "✨", badge: "Popular", stock: 80, desc: "10% Vitamin C with hyaluronic acid. Brightens skin and boosts collagen.", tags: ["skincare", "beauty", "vitamin"] },
  { id: 8, name: "Mechanical Keyboard", category: "Electronics", price: 5999, oldPrice: 8499, rating: 4.8, reviews: 176, emoji: "⌨️", badge: "New", stock: 25, desc: "TKL layout, tactile brown switches, per-key RGB, aluminium frame, USB-C.", tags: ["keyboard", "gaming", "productivity"] },
  { id: 9, name: "Yoga Mat Pro", category: "Sports", price: 1799, oldPrice: 2499, rating: 4.6, reviews: 234, emoji: "🧘", badge: null, stock: 75, desc: "Non-slip TPE, 6mm thick, eco-friendly with alignment lines.", tags: ["yoga", "fitness", "wellness"] },
  { id: 10, name: "Scented Candle Set", category: "Home", price: 1299, oldPrice: 1799, rating: 4.4, reviews: 87, emoji: "🕯️", badge: null, stock: 50, desc: "Set of 4 hand-poured soy wax candles. Up to 45 hours burn each.", tags: ["home", "fragrance", "gift"] },
  { id: 11, name: "Sunscreen SPF 50+", category: "Beauty", price: 599, oldPrice: 799, rating: 4.8, reviews: 654, emoji: "🧴", badge: "Best Seller", stock: 150, desc: "Lightweight, non-greasy, broad spectrum. No white cast.", tags: ["sunscreen", "skincare", "spf"] },
  { id: 12, name: "Denim Jacket", category: "Fashion", price: 2499, oldPrice: 3499, rating: 4.5, reviews: 132, emoji: "🧥", badge: "Trending", stock: 40, desc: "Classic washed denim jacket, contemporary slim fit.", tags: ["denim", "jacket", "fashion"] },
  { id: 13, name: "Bluetooth Speaker", category: "Electronics", price: 3499, oldPrice: 4999, rating: 4.7, reviews: 298, emoji: "🔊", badge: null, stock: 55, desc: "360° surround sound, 20W, IPX7 waterproof, 15h playtime.", tags: ["speaker", "audio", "wireless"] },
  { id: 14, name: "Resistance Bands Set", category: "Sports", price: 799, oldPrice: 1199, rating: 4.6, reviews: 389, emoji: "💪", badge: null, stock: 100, desc: "5 latex bands, varying tension, includes carrying bag and exercise guide.", tags: ["gym", "fitness", "bands"] },
  { id: 15, name: "Ceramic Coffee Mug Set", category: "Home", price: 1099, oldPrice: 1499, rating: 4.3, reviews: 76, emoji: "☕", badge: null, stock: 60, desc: "Set of 6 hand-crafted ceramic mugs, matte finish, 350ml. Dishwasher safe.", tags: ["kitchen", "ceramics", "coffee"] },
  { id: 16, name: "Face Moisturizer SPF 30", category: "Beauty", price: 1199, oldPrice: 1699, rating: 4.6, reviews: 234, emoji: "💆", badge: null, stock: 90, desc: "Daily moisturizer with SPF 30, peptides, ceramides. All-day hydration.", tags: ["skincare", "moisturizer", "spf"] },
];

const categories = [
  { id: 1, name: "Electronics", emoji: "🖥️", desc: "Cutting-edge gadgets, smart devices, audio equipment and the latest tech essentials.", count: 4 },
  { id: 2, name: "Fashion", emoji: "👗", desc: "Curated clothing, accessories and footwear from contemporary and classic brands.", count: 2 },
  { id: 3, name: "Sports", emoji: "⚽", desc: "Performance gear, fitness equipment and activewear for athletes and enthusiasts.", count: 4 },
  { id: 4, name: "Home", emoji: "🏠", desc: "Beautiful home décor, kitchen essentials and lifestyle products.", count: 3 },
  { id: 5, name: "Beauty", emoji: "💄", desc: "Skincare, haircare, and wellness products from the finest formulations.", count: 3 },
];

// In-memory orders storage
let orders = [];
let orderCounter = 100000;

// ===================== HELPER =====================
function paginate(arr, page = 1, limit = 10) {
  const start = (page - 1) * limit;
  return {
    data: arr.slice(start, start + limit),
    total: arr.length,
    page: parseInt(page),
    pages: Math.ceil(arr.length / limit),
    limit: parseInt(limit),
  };
}

// ===================== ROUTES =====================

// --- Health Check ---
app.get('/api', (req, res) => {
  res.json({ status: 'ok', message: 'ShopNest API v1.0', endpoints: [
    'GET /api/products', 'GET /api/products/:id', 'GET /api/products/search',
    'GET /api/categories', 'POST /api/cart/validate',
    'POST /api/orders', 'GET /api/orders/:id', 'POST /api/contact'
  ]});
});

// --- Products ---

// GET /api/products  (with filters, sort, pagination)
app.get('/api/products', (req, res) => {
  let result = [...products];
  const { category, minPrice, maxPrice, rating, sort, page = 1, limit = 10, q } = req.query;

  if (q) {
    const query = q.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.tags.some(t => t.includes(query))
    );
  }

  if (category) {
    const cats = category.split(',');
    result = result.filter(p => cats.includes(p.category));
  }

  if (minPrice) result = result.filter(p => p.price >= +minPrice);
  if (maxPrice) result = result.filter(p => p.price <= +maxPrice);
  if (rating)   result = result.filter(p => p.rating >= +rating);

  switch (sort) {
    case 'price-asc':    result.sort((a, b) => a.price - b.price); break;
    case 'price-desc':   result.sort((a, b) => b.price - a.price); break;
    case 'rating-desc':  result.sort((a, b) => b.rating - a.rating); break;
    case 'newest':       result.sort((a, b) => b.id - a.id); break;
    default: break;
  }

  res.json({ success: true, ...paginate(result, page, limit) });
});

// GET /api/products/featured
app.get('/api/products/featured', (req, res) => {
  const featured = products.filter(p => p.badge).slice(0, 8);
  res.json({ success: true, data: featured });
});

// GET /api/products/latest
app.get('/api/products/latest', (req, res) => {
  const latest = [...products].sort((a, b) => b.id - a.id).slice(0, 8);
  res.json({ success: true, data: latest });
});

// GET /api/products/:id
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  res.json({ success: true, data: product, related });
});

// GET /api/products/:id/related
app.get('/api/products/:id/related', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  res.json({ success: true, data: related });
});

// --- Categories ---

// GET /api/categories
app.get('/api/categories', (req, res) => {
  const enriched = categories.map(c => ({
    ...c,
    count: products.filter(p => p.category === c.name).length
  }));
  res.json({ success: true, data: enriched });
});

// GET /api/categories/:name/products
app.get('/api/categories/:name/products', (req, res) => {
  const { name } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const catProducts = products.filter(p => p.category.toLowerCase() === name.toLowerCase());
  if (!catProducts.length) return res.status(404).json({ success: false, message: 'Category not found' });
  res.json({ success: true, category: name, ...paginate(catProducts, page, limit) });
});

// --- Search ---

// GET /api/search?q=...
app.get('/api/search', (req, res) => {
  const { q, page = 1, limit = 10 } = req.query;
  if (!q) return res.status(400).json({ success: false, message: 'Query parameter q is required' });
  const query = q.toLowerCase();
  const results = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query) ||
    p.tags.some(t => t.includes(query)) ||
    p.desc.toLowerCase().includes(query)
  );
  res.json({ success: true, query: q, ...paginate(results, page, limit) });
});

// --- Cart Validation ---

// POST /api/cart/validate
// Body: { items: [{ productId, qty }] }
app.post('/api/cart/validate', (req, res) => {
  const { items } = req.body;
  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ success: false, message: 'items array is required' });
  }

  const validated = [];
  const errors = [];

  for (const item of items) {
    const product = products.find(p => p.id === parseInt(item.productId));
    if (!product) {
      errors.push({ productId: item.productId, message: 'Product not found' });
    } else if (product.stock < item.qty) {
      errors.push({ productId: item.productId, message: `Only ${product.stock} in stock` });
    } else {
      validated.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        qty: item.qty,
        subtotal: product.price * item.qty,
        emoji: product.emoji,
      });
    }
  }

  const subtotal = validated.reduce((s, i) => s + i.subtotal, 0);
  const delivery = subtotal > 999 ? 0 : 99;
  const discount = subtotal > 3000 ? Math.round(subtotal * 0.05) : 0;

  res.json({
    success: true,
    validated,
    errors,
    summary: {
      subtotal,
      delivery,
      discount,
      total: subtotal + delivery - discount,
    }
  });
});

// --- Orders ---

// POST /api/orders  — place order
app.post('/api/orders', (req, res) => {
  const { customer, shipping, payment, items } = req.body;

  // Basic validation
  const required = ['firstName', 'lastName', 'email', 'phone'];
  for (const field of required) {
    if (!customer || !customer[field]) {
      return res.status(400).json({ success: false, message: `customer.${field} is required` });
    }
  }
  if (!items || !items.length) {
    return res.status(400).json({ success: false, message: 'Order must contain at least one item' });
  }

  // Build order items & calculate total
  const orderItems = [];
  for (const item of items) {
    const product = products.find(p => p.id === parseInt(item.productId));
    if (!product) return res.status(400).json({ success: false, message: `Product ${item.productId} not found` });
    orderItems.push({ productId: product.id, name: product.name, price: product.price, qty: item.qty, subtotal: product.price * item.qty });
    // Reduce stock
    product.stock = Math.max(0, product.stock - item.qty);
  }

  const subtotal = orderItems.reduce((s, i) => s + i.subtotal, 0);
  const deliveryFee = subtotal > 999 ? 0 : 99;
  const discount = subtotal > 3000 ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal + deliveryFee - discount;

  const order = {
    id: `SN-${++orderCounter}`,
    customer,
    shipping,
    payment: payment || 'upi',
    items: orderItems,
    summary: { subtotal, deliveryFee, discount, total },
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };

  orders.push(order);

  res.status(201).json({
    success: true,
    message: 'Order placed successfully',
    orderId: order.id,
    total: order.summary.total,
    status: order.status,
    createdAt: order.createdAt,
  });
});

// GET /api/orders/:id — get order details
app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  res.json({ success: true, data: order });
});

// GET /api/orders — list all (admin use)
app.get('/api/orders', (req, res) => {
  res.json({ success: true, total: orders.length, data: orders });
});

// PATCH /api/orders/:id/status — update order status
app.patch('/api/orders/:id/status', (req, res) => {
  const { status } = req.body;
  const validStatuses = ['confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status', validStatuses });
  }
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  order.status = status;
  order.updatedAt = new Date().toISOString();
  res.json({ success: true, message: 'Status updated', orderId: order.id, status: order.status });
});

// --- Contact Form ---

// POST /api/contact
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || name.trim().length === 0)
    return res.status(400).json({ success: false, field: 'name', message: 'Name is required' });
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ success: false, field: 'email', message: 'Valid email is required' });
  if (!subject || subject.trim().length === 0)
    return res.status(400).json({ success: false, field: 'subject', message: 'Subject is required' });
  if (!message || message.trim().length < 20)
    return res.status(400).json({ success: false, field: 'message', message: 'Message must be at least 20 characters' });

  // In production, send an email here via nodemailer
  console.log(`📧 Contact form: ${name} <${email}> — ${subject}`);

  res.json({
    success: true,
    message: 'Thank you for your message! We will get back to you within 24 hours.',
    ticketId: 'TKT-' + Math.floor(10000 + Math.random() * 90000),
  });
});

// ===================== SERVE FRONTEND =====================
// Serve the index.html from public/ for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ===================== 404 HANDLER =====================
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ===================== ERROR HANDLER =====================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// ===================== START =====================
app.listen(PORT, () => {
  console.log(`\n🚀 ShopNest API running at http://localhost:${PORT}`);
  console.log(`📦 ${products.length} products loaded`);
  console.log(`\nAPI Endpoints:`);
  console.log(`  GET  /api/products             — list with filters & pagination`);
  console.log(`  GET  /api/products/latest       — 8 newest products`);
  console.log(`  GET  /api/products/featured     — badged products`);
  console.log(`  GET  /api/products/:id          — single product + related`);
  console.log(`  GET  /api/categories            — all categories`);
  console.log(`  GET  /api/categories/:name/products`);
  console.log(`  GET  /api/search?q=...          — full-text search`);
  console.log(`  POST /api/cart/validate         — validate cart & get totals`);
  console.log(`  POST /api/orders                — place order`);
  console.log(`  GET  /api/orders/:id            — order details`);
  console.log(`  PATCH /api/orders/:id/status    — update status`);
  console.log(`  POST /api/contact               — contact form\n`);
});

module.exports = app;
