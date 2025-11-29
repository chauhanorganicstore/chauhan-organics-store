/**
 * src/components/ProductCard.jsx
 */
import React from "react";
import { addToCart } from "../utils/cart";

export default function ProductCard({ product }) {
  const imgSrc = product.image || "/images/placeholder.svg";

  function handleAdd() {
    addToCart(product);
    alert(`${product.title} added to cart`);
  }

  return (
    <div style={{ background:"#fff", borderRadius:12, boxShadow:"0 4px 10px rgba(0,0,0,0.04)", overflow:"hidden" }}>
      <img
        src={imgSrc}
        alt={product.title}
        onError={(e) => { e.currentTarget.src = "/images/placeholder.svg"; }}
        style={{ width: "100%", height: 180, objectFit: "cover", display:"block" }}
      />
      <div style={{ padding: 12 }}>
        <h3 style={{ margin: "0 0 6px" }}>{product.title}</h3>
        <p style={{ margin: "0 0 8px", color: "#666" }}>{product.description}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 700 }}>₹{product.price} / {product.unit}</div>
          <div>
            <button onClick={handleAdd} style={{ padding:"6px 10px", borderRadius:8, cursor:"pointer" }}>Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
}
