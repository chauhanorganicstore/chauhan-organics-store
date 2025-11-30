import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import Seo from "../../components/Seo";

export default function ProductPage({ product, products }) {
  const [isAdmin] = useState(false);
  const [prod, setProd] = useState(product);

  // if product is not passed via props, try client fetch by id from url
  useEffect(() => {
    if (!prod) {
      const id = typeof window !== "undefined" ? window.location.pathname.split("/").pop() : null;
      if (id) {
        fetch("/products_filtered.json").then(r => r.json()).then(list => {
          const found = list.find(x => x.id === id);
          if (found) setProd(found);
        }).catch(()=>{});
      }
    }
  }, []);

  const schema = prod ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": prod.name,
    "image": [prod.image || (typeof window !== "undefined" ? window.location.origin + "/images/placeholder.svg" : "/images/placeholder.svg")],
    "description": prod.description,
    "sku": prod.id,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": String(prod.price),
      "availability": "https://schema.org/InStock",
      "url": (typeof window !== "undefined" ? window.location.href : ("/product/" + prod.id))
    },
    "brand": {
      "@type": "Brand",
      "name": "Chauhan Organic Store"
    }
  } : null;

  return (
    <MainLayout isAdmin={isAdmin} product={prod} products={products}>
      {prod && <Seo title={`${prod.name} — Chauhan Organic Store`} description={prod.description} url={(typeof window !== "undefined" ? window.location.href : "/product/" + (prod && prod.id))} image={prod.image || "/images/placeholder.svg"} schema={schema} />}

      <article style={{display:"grid", gridTemplateColumns:"360px 1fr", gap:20, alignItems:"start"}}>
        <div style={{borderRadius:12, overflow:"hidden", boxShadow:"0 8px 26px rgba(0,0,0,0.06)"}}>
          <img src={prod?.image || "/images/placeholder.svg"} alt={prod?.name} style={{width:"100%", height:360, objectFit:"cover"}} />
        </div>

        <div>
          <h1 style={{marginTop:0}}>{prod?.name}</h1>
          <div style={{color:"#444", marginBottom:12}}>{prod?.description}</div>
          <div style={{fontSize:22, fontWeight:700, marginBottom:12}}>₹ {prod?.price}</div>
          <button style={{padding:"10px 14px", borderRadius:8, background:"#0b74ff", color:"#fff", border:"none"}}>Add to cart</button>
        </div>
      </article>
    </MainLayout>
  );
}
