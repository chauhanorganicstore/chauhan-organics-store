import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Seo from "../components/Seo";
import { addToCart } from "../utils/cart";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch("/products_filtered.json")
      .then((r) => r.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const productsInCategory = (cat) => {
    if (!cat) return [];
    return products.filter((p) => p.category === cat).slice(0, 10); // max 10
  };

  return (
    <MainLayout isAdmin={false} product={null} products={products}>
      <Seo title="Products — Chauhan Organic Store" description="Explore categories — enter a rack to view curated products." />

      <div style={{maxWidth:1100, margin:"28px auto", padding:"0 16px"}}>
        <h1 style={{marginTop:0}}>Store Racks (Categories)</h1>

        {!selectedCategory && (
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:16}}>
            {categories.map((c) => (
              <div key={c} style={{padding:16, borderRadius:12, boxShadow:"0 8px 28px rgba(0,0,0,0.06)", background:"#fff"}}>
                <h3 style={{textTransform:"capitalize"}}>{c}</h3>
                <p style={{color:"#666"}}>Click to enter this rack and view curated items.</p>
                <div style={{display:"flex", gap:8, marginTop:8}}>
                  <button onClick={() => setSelectedCategory(c)} style={{padding:"8px 10px", borderRadius:8, background:"#0b74ff", color:"#fff", border:"none"}}>Enter Rack</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedCategory && (
          <div>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <h2 style={{textTransform:"capitalize"}}>{selectedCategory} — Rack</h2>
              <div>
                <button onClick={()=>setSelectedCategory(null)} style={{padding:"8px 10px", borderRadius:8}}>Back to Racks</button>
              </div>
            </div>

            <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:16, marginTop:12}}>
              {productsInCategory(selectedCategory).map((p) => (
                <article key={p.id} style={{background:"#fff", borderRadius:12, padding:12, boxShadow:"0 10px 28px rgba(0,0,0,0.06)"}}>
                  <div style={{height:160, overflow:"hidden", borderRadius:10}}>
                    <img src={p.image || "/images/placeholder.svg"} alt={p.name} style={{width:"100%", height:160, objectFit:"cover"}} />
                  </div>

                  <h3 style={{margin:"10px 0 6px"}}>{p.name}</h3>
                  <div style={{color:"#666", fontSize:14, minHeight:42}}>{p.description}</div>

                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:12}}>
                    <div style={{fontWeight:700}}>₹ {p.price}</div>
                    <div style={{display:"flex", gap:8}}>
                      <a href={"/product/" + p.id} style={{padding:"8px 10px", borderRadius:8, background:"#0b74ff", color:"#fff", textDecoration:"none"}}>View</a>
                      <button onClick={()=>addToCart(p,1)} style={{padding:"8px 10px", borderRadius:8, border:"1px solid #ddd"}}>Add</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
