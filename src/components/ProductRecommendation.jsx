import React from "react";

export default function ProductRecommendation({ product, products }) {
  if (!product || !products) return null;

  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Related Products</h3>
      {related.slice(0, 5).map((p) => (
        <p key={p.id}>👉 {p.name}</p>
      ))}
    </div>
  );
}
