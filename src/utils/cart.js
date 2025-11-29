/**
 * src/utils/cart.js
 * Simple localStorage-based cart utilities
 * Works in browser only. If using SSR (Next.js) guard with typeof window !== "undefined".
 */

export function addToCart(product) {
  if (typeof window === "undefined") return;
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const existing = cart.find(p => p.id === product.id);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeFromCart(productId) {
  if (typeof window === "undefined") return;
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const updated = cart.filter(p => p.id !== productId);
  localStorage.setItem("cart", JSON.stringify(updated));
}

export function updateQty(productId, qty) {
  if (typeof window === "undefined") return;
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const item = cart.find(p => p.id === productId);
  if (item) item.qty = qty;
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function getCart() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function clearCart() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("cart");
}
