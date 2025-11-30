/**
 * simple cart utility using localStorage + window CustomEvent('cartUpdated')
 * methods: getCart(), addToCart(item), removeFromCart(id), clearCart()
 */
const KEY = "organic_cart_v1";

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function write(items) {
  localStorage.setItem(KEY, JSON.stringify(items || []));
  // notify listeners
  window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { count: getCount() } }));
}

export function getCart() {
  return read();
}

export function getCount() {
  const items = read();
  return items.reduce((s, it) => s + (it.qty || 1), 0);
}

export function addToCart(product, qty = 1) {
  if (!product || !product.id) return;
  const items = read();
  const idx = items.findIndex((i) => i.id === product.id);
  if (idx >= 0) {
    items[idx].qty = (items[idx].qty || 1) + qty;
  } else {
    items.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty });
  }
  write(items);
}

export function removeFromCart(id) {
  const items = read().filter((i) => i.id !== id);
  write(items);
}

export function updateQty(id, qty) {
  const items = read();
  const idx = items.findIndex((i) => i.id === id);
  if (idx >= 0) {
    items[idx].qty = qty;
    if (items[idx].qty <= 0) items.splice(idx, 1);
    write(items);
  }
}

export function clearCart() {
  write([]);
}
