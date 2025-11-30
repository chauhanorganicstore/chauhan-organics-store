import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Seo from "../components/Seo";
import { addToCart, getCart } from "../utils/cart";

export default function Store() {
  const [entered, setEntered] = useState(false);
  const [products, setProducts] = useState([]);
  const [viewRack, setViewRack] = useState(null);
  const [receptionOpen, setReceptionOpen] = useState(false);

  useEffect(() => {
    fetch("/products_filtered.json").then(r=>r.json()).then(d=>setProducts(d)).catch(()=>setProducts([]));
  }, []);

  const categories = Array.from(new Set(products.map(p=>p.category)));

  const productsIn = (cat) => products.filter(p=>p.category===cat).slice(0,10);

  return (
    <MainLayout isAdmin={false} product={null} products={products}>
      <Seo title="Virtual Store — Chauhan Organic Store" description="Enter our virtual store — walk through racks and bill at the counter." />
      <div style={{maxWidth:1200, margin:"28px auto", padding:"0 16px"}}>
        {!entered && (
          <div style={{padding:28, borderRadius:12, background:"#fff", boxShadow:"0 12px 40px rgba(0,0,0,0.06)", display:"flex", gap:20, alignItems:"center"}}>
            <div style={{flex:1}}>
              <h1>Welcome to Chauhan Organic Store — Virtual Visit</h1>
              <p style={{color:"#444"}}>Feel like visiting our physical shop — walk through racks, inspect products and bill at reception. Click Enter to start your visit.</p>
              <div style={{display:"flex", gap:12, marginTop:12}}>
                <button onClick={()=>{ setEntered(true); }} style={{padding:"10px 14px", borderRadius:8, background:"#0b74ff", color:"#fff", border:"none"}}>Enter Store</button>
                <button onClick={()=>setReceptionOpen(true)} style={{padding:"10px 14px", borderRadius:8}}>Ask at Reception</button>
              </div>
            </div>
            <div style={{width:420}}>
              <img src="/public/images/placeholder-hero.jpg" alt="store" style={{width:"100%", borderRadius:12}} />
            </div>
          </div>
        )}

        {entered && (
          <div style={{display:"grid", gridTemplateColumns:"1fr 320px", gap:20, marginTop:18}}>
            <div>
              <h2>Racks — Walk around</h2>
              <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16}}>
                {categories.map((c) => (
                  <div key={c} style={{padding:12, borderRadius:10, background:"#fff", boxShadow:"0 8px 28px rgba(0,0,0,0.06)"}}>
                    <h4 style={{textTransform:"capitalize"}}>{c}</h4>
                    <p style={{color:"#666"}}>{productsIn(c).length} curated items</p>
                    <div style={{display:"flex", gap:8}}>
                      <button onClick={()=>setViewRack(c)} style={{padding:"8px 10px", borderRadius:8, background:"#0b74ff", color:"#fff"}}>Open Rack</button>
                      <button onClick={()=>{ /* quick add first item */ const p = productsIn(c)[0]; if(p) addToCart(p,1); }} style={{padding:"8px 10px", borderRadius:8}}>Quick Add</button>
                    </div>
                  </div>
                ))}
              </div>

              {viewRack && (
                <div style={{marginTop:18}}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <h3 style={{textTransform:"capitalize"}}>{viewRack} — products on rack</h3>
                    <button onClick={()=>setViewRack(null)} style={{padding:"8px 10px", borderRadius:8}}>Close Rack</button>
                  </div>

                  <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:12, marginTop:12}}>
                    {productsIn(viewRack).map(p => (
                      <div key={p.id} style={{padding:10, borderRadius:10, background:"#fff", boxShadow:"0 6px 20px rgba(0,0,0,0.05)"}}>
                        <img src={p.image} alt={p.name} style={{width:"100%", height:140, objectFit:"cover", borderRadius:8}} />
                        <h4 style={{margin:"8px 0 4px"}}>{p.name}</h4>
                        <div style={{color:"#666"}}>{p.description}</div>
                        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:8}}>
                          <div style={{fontWeight:700}}>₹ {p.price}</div>
                          <button onClick={()=>addToCart(p,1)} style={{padding:"8px 10px", borderRadius:8, background:"#0b74ff", color:"#fff"}}>Add to cart</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside style={{position:"relative"}}>
              <div style={{position:"sticky", top:20, padding:12, borderRadius:12, background:"#fff", boxShadow:"0 8px 26px rgba(0,0,0,0.06)"}}>
                <h4>Reception & Billing</h4>
                <p style={{color:"#444"}}>Welcome — Owner: <strong>Vijay Chauhan</strong></p>
                <p style={{fontSize:13, color:"#666"}}>Panipat • Call/email for wholesale.</p>
                <div style={{display:"flex", gap:8, marginTop:10}}>
                  <a href="/checkout" style={{padding:"8px 10px", borderRadius:8, background:"#ff8c00", color:"#fff", textDecoration:"none"}}>Billing Counter</a>
                  <button onClick={()=>setReceptionOpen(true)} style={{padding:"8px 10px", borderRadius:8}}>Talk to Reception</button>
                </div>

                <div style={{marginTop:12}}>
                  <h5 style={{margin:"8px 0"}}>Quick Actions</h5>
                  <button onClick={()=>{ const cart = getCart(); alert('Current cart items: ' + cart.length); }} style={{padding:"8px 10px", borderRadius:8}}>Cart Info</button>
                </div>
              </div>
            </aside>
          </div>
        )}

        {receptionOpen && (
          <div style={{marginTop:18, padding:12, borderRadius:10, background:"#fff", boxShadow:"0 8px 26px rgba(0,0,0,0.06)"}}>
            <h3>Reception — Chauhan Organic Store</h3>
            <p>Please leave a message or call: <strong>vijaychauhan200104@gmail.com</strong></p>
            <button onClick={()=>setReceptionOpen(false)} style={{marginTop:8,padding:"8px 10px", borderRadius:8}}>Close</button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
