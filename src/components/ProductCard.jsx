// src/components/ProductCard.jsx
import React from "react";
import { addToCart } from "../utils/cart";

export default function ProductCard({ product }) {
  if (!product || typeof product !== "object") {
    return (
      <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 4px 10px rgba(0,0,0,0.04)", overflow: "hidden", padding: 16 }}>
        <div style={{ height: 180, display: "flex", alignItems: "center", justifyContent: "center", color: "#888" }}>
          Product unavailable
        </div>
      </div>
    );
  }

  const imgSrc = product?.image || "/images/placeholder.svg";

  function handleAdd() {
    try {
      addToCart(product);
      alert(${product.title || "Product"} added to cart);
    } catch (e) {}
  }

  return (
    <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 4px 10px rgba(0,0,0,0.04)", overflow: "hidden" }}>
      <img
        src={imgSrc}
        alt={product.title || "product"}
        onError={(e) => { e.currentTarget.src = "/images/placeholder.svg"; }}
        style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }}
      />
      <div style={{ padding: 12 }}>
        <h3 style={{ margin: "0 0 6px" }}>{product.title || "Untitled product"}</h3>
        <p style={{ margin: "0 0 8px", color: "#666" }}>{product.description || ""}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 700 }}>?{product.price ?? "-"} / {product.unit ?? "-"}</div>
          <div>
            <button onClick={handleAdd} style={{ padding: "6px 10px", borderRadius: 8, cursor: "pointer" }}>Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
}

