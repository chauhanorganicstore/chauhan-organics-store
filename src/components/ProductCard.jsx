import React from "react";

export default function ProductCard({ product }) {
  if (!product || typeof product !== "object") {
    return (
      <div className="card" style={{padding:16, display:"flex", alignItems:"center", justifyContent:"center"}}>Product unavailable</div>
    );
  }
  const imgSrc = product.image || "/images/placeholder-hero.jpg";
  return (
    <div className="card" role="article" aria-label={product.title}>
      <div className="imgwrap">
        <img src={imgSrc} alt={product.title || "product image"} onError={(e)=>{ e.currentTarget.src="/images/placeholder-hero.jpg"; }} />
      </div>
      <div className="body">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <h3>{product.title || "Untitled product"}</h3>
          <div className="badge small">{product.category}</div>
        </div>
        <p className="desc">{product.description?.slice(0,160) || ""}</p>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div>
            <div className="price">?{product.price ?? "-"}</div>
            <div className="small">/{product.unit ?? "-"}</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div className="stars">{(product.rating || 4.2).toFixed(1)} ?</div>
            <div className="small">{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</div>
          </div>
        </div>
        <div className="meta">
          <button style={{padding:"8px 12px", borderRadius:10, border:"none", background:"#fbbf24", cursor:"pointer"}} onClick={()=>{ alert(`${product.title || "Product"} added to cart`); }}>Add</button>
          <button style={{padding:"8px 12px", borderRadius:10, border:"1px solid #e6e6e6", background:"#fff", cursor:"pointer"}}>View</button>
        </div>
      </div>
    </div>
  );
}
