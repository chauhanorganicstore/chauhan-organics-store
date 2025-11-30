import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Seo from "../components/Seo";
import { addToCart } from "../utils/cart";

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("/products_filtered.json").then(r => r.json()).then(d => setProducts(d)).catch(()=>{});
  }, []);

  const featured = products.slice(0, 4);

  return (
    <MainLayout isAdmin={false} product={null} products={products}>
      <Seo title="Chauhan Organic Store — Panipat" description="Buy organic jaggery, A2 ghee, atta, pulses, dryfruits & cold-pressed oils from Chauhan Organic Store." image="/images/atta.svg" />
      <section style={{display:"grid", gridTemplateColumns:"1fr 420px", gap:24, alignItems:"center", marginTop:18}}>
        <div>
          <h1 style={{marginTop:0}}>Chauhan Organic Store</h1>
          <p style={{color:"#444", fontSize:16}}>Panipat based organic store — Sugarcane products, A2 ghee, fresh atta, nutritious pulses, premium dryfruits and cold-pressed oils.</p>
          <div style={{display:"flex", gap:10, marginTop:16}}>
            <a href="/products" style={{padding:"10px 14px", borderRadius:8, background:"#0b74ff", color:"#fff", textDecoration:"none"}}>Shop All Products</a>
            <a href="#ai-tools" style={{padding:"10px 14px", borderRadius:8, background:"#34a853", color:"#fff", textDecoration:"none"}}>Try AI Tools</a>
          </div>
        </div>

        <div style={{borderRadius:12, boxShadow:"0 10px 30px rgba(0,0,0,0.06)", padding:14, background:"#fff"}}>
          <h4 style={{marginTop:0}}>Store Info</h4>
          <div style={{fontSize:14}}>Owner: <strong>Vijay Chauhan</strong></div>
          <div style={{fontSize:14}}>Panipat, Haryana 132103</div>
          <div style={{fontSize:14, marginTop:8}}>Email: <a href="mailto:vijaychauhan200104@gmail.com">vijaychauhan200104@gmail.com</a></div>
        </div>
      </section>

      <section style={{marginTop:28}}>
        <h2>Featured Products</h2>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:16, marginTop:12}}>
          {featured.map((p) => (
            <div key={p.id} style={{background:"#fff", padding:12, borderRadius:12, boxShadow:"0 10px 28px rgba(0,0,0,0.06)"}}>
              <div style={{height:140, overflow:"hidden", borderRadius:10}}>
                <img src={p.image || "/images/placeholder.svg"} alt={p.name} style={{width:"100%", height:140, objectFit:"cover"}} />
              </div>
              <h4 style={{margin:"10px 0 6px"}}>{p.name}</h4>
              <div style={{color:"#666", fontSize:13, minHeight:36}}>{p.description}</div>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:10}}>
                <div style={{fontWeight:700}}>₹ {p.price}</div>
                <button onClick={()=>addToCart(p,1)} style={{padding:"8px 10px", borderRadius:8, background:"#0b74ff", color:"#fff", border:"none"}}>Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
