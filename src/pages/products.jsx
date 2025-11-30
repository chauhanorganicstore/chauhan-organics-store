import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Seo from "../components/Seo";
import { addToCart } from "../utils/cart";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetch("/products_filtered.json")
      .then((r) => r.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = products.filter((p) => {
    const matchCat = category === "all" || p.category === category;
    const matchQ = !q || (p.name + " " + p.description).toLowerCase().includes(q.toLowerCase());
    return matchCat && matchQ;
  });

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Chauhan Organic Store Products",
    "itemListElement": filtered.slice(0, 50).map((p, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": `${typeof window !== "undefined" ? window.location.origin : ""}/product/${p.id}`,
      "name": p.name
    }))
  };

  const pageTitle = "Products — Chauhan Organic Store (Panipat)";
  const pageDesc = "Shop organic sugarcane products, A2 ghee, atta, pulses, dryfruits and cold-pressed oils from Chauhan Organic Store.";

  return (
    <MainLayout isAdmin={false} product={null} products={products}>
      <Seo title={pageTitle} description={pageDesc} url={(typeof window !== "undefined" ? window.location.href : "/products")} image="/images/placeholder.svg" schema={listSchema} />
      <div style={{maxWidth:1100, margin:"28px auto", padding:"0 16px"}}>
        <header style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18}}>
          <h1 style={{margin:0}}>{pageTitle}</h1>
          <div style={{display:"flex", gap:8}}>
            <input placeholder="Search products..." value={q} onChange={(e)=>setQ(e.target.value)}
              style={{padding:8, borderRadius:8, border:"1px solid #ddd", width:260}} />
            <select value={category} onChange={(e)=>setCategory(e.target.value)} style={{padding:8, borderRadius:8}}>
              {categories.map((c)=> <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </header>

        <section style={{
          display:"grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap:16
        }}>
          {filtered.map((p) => (
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
        </section>

        {filtered.length === 0 && <div style={{textAlign:"center", marginTop:30, color:"#666"}}>कोई प्रोडक्ट नहीं मिला।</div>}
      </div>
    </MainLayout>
  );
}
