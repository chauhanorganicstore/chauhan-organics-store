import React from "react";

export default function ProductRecommendation({ product, products }) {
  if (!product || !products) return null;

  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div style={{display:"grid", gap:8}}>
      {related.slice(0, 6).map((p) => (
        <div key={p.id} style={{display:"flex", gap:10, alignItems:"center", padding:8, borderRadius:8}}>
          <img src={p.image || "/images/placeholder.svg"} alt={p.name} style={{width:64, height:64, objectFit:"cover", borderRadius:8}} />
          <div>
            <div style={{fontWeight:700}}>{p.name}</div>
            <div style={{fontSize:13, color:"#666"}}>₹ {p.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
