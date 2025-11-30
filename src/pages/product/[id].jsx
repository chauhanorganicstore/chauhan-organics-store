import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";

export default function ProductPage({ product, products }) {
  const [isAdmin] = useState(false);

  return (
    <MainLayout isAdmin={isAdmin} product={product} products={products}>
      <article style={{display:"grid", gridTemplateColumns:"360px 1fr", gap:20, alignItems:"start"}}>
        <div style={{borderRadius:12, overflow:"hidden", boxShadow:"0 8px 26px rgba(0,0,0,0.06)"}}>
          <img src={product?.image || "/images/placeholder.svg"} alt={product?.name} style={{width:"100%", height:360, objectFit:"cover"}} />
        </div>

        <div>
          <h1 style={{marginTop:0}}>{product?.name}</h1>
          <div style={{color:"#444", marginBottom:12}}>{product?.description}</div>
          <div style={{fontSize:22, fontWeight:700, marginBottom:12}}>₹ {product?.price}</div>
          <button style={{padding:"10px 14px", borderRadius:8, background:"#0b74ff", color:"#fff", border:"none"}}>Add to cart</button>
        </div>
      </article>
    </MainLayout>
  );
}
