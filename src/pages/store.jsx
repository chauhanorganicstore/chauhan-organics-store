import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Seo from "../components/Seo";
import StoreEntrance from "../components/StoreEntrance";
import RackCard from "../components/RackCard";
import { addToCart, getCart } from "../utils/cart";

export default function Store() {
  const [entered, setEntered] = useState(false);
  const [products, setProducts] = useState([]);
  const [viewRack, setViewRack] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("/products_filtered.json").then(r=>r.json()).then(d=>setProducts(d)).catch(()=>setProducts([]));
  }, []);

  const categories = Array.from(new Set(products.map(p => p.category)));
  const productsIn = (cat) => products.filter(p=>p.category===cat).slice(0,10);

  return (
    <MainLayout isAdmin={false} product={null} products={products}>
      <Seo title="Visit Store — Chauhan Organic Store" description="A virtual store experience — walk into racks and bill at the counter." />

      <div style={{maxWidth:1200, margin:"24px auto", padding:"0 16px"}}>
        {!entered && <StoreEntrance onEnter={()=>setEntered(true)} />}

        {entered && (
          <div style={{display:"grid", gridTemplateColumns:"1fr 340px", gap:20, marginTop:18}}>
            <div>
              <h2 style={{marginTop:0}}>Racks — Walk around</h2>
              <p style={{color:"#666"}}>Select a rack to view curated products. Each rack mimics store shelving.</p>

              <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:14, marginTop:12}}>
                {categories.map(c => (
                  <RackCard key={c} category={c} count={productsIn(c).length} image={`/images/${c}.svg`} onOpen={()=>setViewRack(c)} />
                ))}
              </div>

              {viewRack && (
                <div style={{marginTop:18}}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <h3 style={{textTransform:"capitalize"}}>{viewRack} — Rack</h3>
                    <div>
                      <button onClick={()=>setViewRack(null)} style={{padding:"8px 10px", borderRadius:8}}>Close Rack</button>
                    </div>
                  </div>

                  <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:12, marginTop:12}}>
                    {productsIn(viewRack).map(p => (
                      <div key={p.id} style={{padding:12, borderRadius:12, background:"#fff", boxShadow:"0 8px 26px rgba(0,0,0,0.06)"}}>
                        <div style={{height:150, overflow:"hidden", borderRadius:10}}>
                          <img src={p.image} alt={p.name} style={{width:"100%", height:150, objectFit:"cover"}} />
                        </div>
                        <h4 style={{margin:"10px 0 6px"}}>{p.name}</h4>
                        <div style={{color:"#666", fontSize:13, minHeight:42}}>{p.description}</div>

                        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:10}}>
                          <div style={{fontWeight:800}}>₹ {p.price}</div>
                          <div style={{display:"flex", gap:8}}>
                            <button onClick={()=>{ addToCart(p,1); alert(p.name + " added to cart"); }} style={{padding:"8px 10px", borderRadius:8, background:"#0b74ff", color:"#fff", border:"none"}}>Add</button>
                            <button onClick={()=>setSelectedProduct(p)} style={{padding:"8px 10px", borderRadius:8, border:"1px solid #ddd"}}>Details</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside style={{position:"relative"}}>
              <div style={{position:"sticky", top:20, padding:14, borderRadius:12, background:"#fff", boxShadow:"0 8px 26px rgba(0,0,0,0.06)"}}>
                <h4 style={{marginTop:0}}>Reception & Billing</h4>
                <p style={{color:"#444"}}>Owner: <strong>Vijay Chauhan</strong></p>
                <p style={{fontSize:13, color:"#666"}}>Panipat • Call/email for wholesale.</p>

                <div style={{marginTop:12, display:"flex", gap:8}}>
                  <a href="/checkout" style={{padding:"10px 12px", borderRadius:8, background:"#ff8c00", color:"#fff", textDecoration:"none"}}>Open Billing Counter</a>
                  <button onClick={()=>{ const cart=getCart(); alert("Cart: " + cart.length + " items"); }} style={{padding:"10px 12px", borderRadius:8}}>Cart Info</button>
                </div>

                <div style={{marginTop:14, borderTop:"1px dashed #eee", paddingTop:12}}>
                  <h5 style={{margin:"6px 0"}}>Need help?</h5>
                  <button onClick={()=>alert("Reception: vijaychauhan200104@gmail.com")} style={{padding:"8px 12px", borderRadius:8}}>Contact Reception</button>
                </div>
              </div>
            </aside>
          </div>
        )}

        {selectedProduct && (
          <div style={{marginTop:16, padding:12, borderRadius:10, background:"#fff", boxShadow:"0 8px 28px rgba(0,0,0,0.06)"}}>
            <div style={{display:"flex", gap:16}}>
              <div style={{width:220, height:220, overflow:"hidden", borderRadius:12}}>
                <img src={selectedProduct.image} alt={selectedProduct.name} style={{width:"100%", height:"100%", objectFit:"cover"}} />
              </div>
              <div style={{flex:1}}>
                <h3 style={{marginTop:0}}>{selectedProduct.name}</h3>
                <p style={{color:"#444"}}>{selectedProduct.description}</p>
                <div style={{fontWeight:800, fontSize:20}}>₹ {selectedProduct.price}</div>
                <div style={{display:"flex", gap:10, marginTop:12}}>
                  <button onClick={()=>{ addToCart(selectedProduct,1); alert("Added to cart"); }} style={{padding:"10px 14px", borderRadius:8, background:"#0b74ff", color:"#fff"}}>Add to cart</button>
                  <button onClick={()=>setSelectedProduct(null)} style={{padding:"10px 14px", borderRadius:8}}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
