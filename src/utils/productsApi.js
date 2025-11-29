/**
 * Simple products API helper (dev). Uses fetch to get /products.json (public) and
 * writes edits to local products.json by relying on developer to commit changes.
 * Note: In production use a real backend or headless CMS.
 */
export async function fetchProducts() {
  const res = await fetch("/products.json");
  if (!res.ok) throw new Error("Failed to fetch products");
  return await res.json();
}

// For local editing workflows we'll just return the modified array and require commit manually.
// The writeProductHelpers below are intentionally synchronous helpers for developer convenience.
