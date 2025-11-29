/**
 * src/utils/checkout.js
 * Open WhatsApp with prefilled cart message
 */
import { getCart, clearCart } from "./cart";

export function openWhatsAppCheckout(phoneNumber = "919999999999") {
  if (typeof window === "undefined") return;
  const cart = getCart();
  if (!cart.length) {
    alert("Cart is empty.");
    return;
  }
  const lines = cart.map(i => `${i.title} x${i.qty} — ₹${i.price * i.qty}`);
  lines.push("");
  lines.push("Total: ₹" + cart.reduce((s, i) => s + i.price * i.qty, 0));
  lines.push("");
  lines.push("Name: ");
  lines.push("Address: ");
  const msg = encodeURIComponent(lines.join("\n"));
  const wa = `https://wa.me/${phoneNumber.replace(/\D/g,"")}?text=${msg}`;
  window.open(wa, "_blank");
}
