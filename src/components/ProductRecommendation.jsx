// src/components/ProductRecommendation.jsx
import React from "react";

export default function ProductRecommendation({ product, products }) {
  // show up to 4 same-category products (not itself)
  const same = (products || []).filter(p=>p.category===product.category && p.id !== product.id).slice(0,4);
  const others = same.length ? same : (products || []).filter(p=>p.id!==product.id).slice(0,4);

  return (
    <div style={{ padding:12, background:"#fff", borderRadius:8 }}>
      <h4>Recommended for you</h4>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:8 }}>
        {others.map(p => (
          <div key={p.id} style={{ padding:8, borderRadius:6, background:"#fafafa" }}>
            <img src={p.image} alt={p.title} style={{ width:"100%", height:80, objectFit:"cover", borderRadius:6 }} />
            <div style={{ fontSize:13, fontWeight:700, marginTop:6 }}>{p.title}</div>
            <div style={{ fontSize:12 }}>?{p.price} / {p.unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
