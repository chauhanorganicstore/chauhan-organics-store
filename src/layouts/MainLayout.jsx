import React, { useEffect, useState } from "react";
import AIChatbot from "../components/AIChatbot";
import ProductRecommendation from "../components/ProductRecommendation";
import ProductDescriptionGenerator from "../components/ProductDescriptionGenerator";
import SiteInfo from "../components/SiteInfo";
import Cart from "../components/Cart";
import { getCount } from "../utils/cart";

export default function MainLayout({ children, isAdmin, product, products }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [count, setCount] = useState(typeof window !== "undefined" ? getCount() : 0);

  useEffect(() => {
    function handler() {
      setCount(getCount());
    }
    window.addEventListener("cartUpdated", handler);
    return () => window.removeEventListener("cartUpdated", handler);
  }, []);

  return (
    <div style={{fontFamily:"system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"}}>
      <header style={{
        display:"flex", justifyContent:"space-between", alignItems:"center",
        padding:"12px 18px", borderBottom:"1px solid #eee", background:"#fff", position:"sticky", top:0, zIndex:50
      }}>
        <div style={{display:"flex", alignItems:"center", gap:12}}>
          <img src="/logo.png" alt="logo" style={{width:44, height:44, objectFit:"contain"}}/>
          <div>
            <div style={{fontSize:18, fontWeight:700}}>Chauhan Organic Store</div>
            <div style={{fontSize:12, color:"#666"}}>Panipat, Haryana • Organic & Natural</div>
          </div>
        </div>

        <nav style={{display:"flex", gap:12, alignItems:"center"}}>
          <a href="/" style={{textDecoration:"none", color:"#111"}}>Home</a>
          <a href="/products" style={{textDecoration:"none", color:"#111"}}>Products</a>
          <a href="/contact" style={{textDecoration:"none", color:"#111"}}>Contact</a>

          <button onClick={()=>setCartOpen(true)} style={{position:"relative", padding:"8px 10px", borderRadius:8, background:"#fff", border:"1px solid #ddd", cursor:"pointer"}}>
            Cart {count > 0 && <span style={{background:"#ff3b30", color:"#fff", borderRadius:10, padding:"2px 6px", marginLeft:8, fontSize:12}}>{count}</span>}
          </button>
        </nav>
      </header>

      <main style={{maxWidth:1100, margin:"28px auto", padding:"0 16px"}}>
        {children}

        {/* AI / Tools area — merged options */}
        <section id="ai-tools" style={{
          display:"grid", gridTemplateColumns:"1fr 320px", gap:20, marginTop:30, alignItems:"start"
        }}>
          <div>
            <div style={{padding:16, borderRadius:12, boxShadow:"0 6px 18px rgba(0,0,0,0.06)", background:"#fff"}}>
              <h2 style={{marginTop:0}}>AI Tools — Merge</h2>
              <p style={{color:"#444"}}>एक जगह पर सारे AI tools — product descriptions, recommendations और chatbot।</p>

              <div style={{display:"flex", gap:8, flexWrap:"wrap", marginTop:12}}>
                <a href="#desc-generator" style={{padding:"10px 12px", borderRadius:8, background:"#0b74ff", color:"#fff", textDecoration:"none"}}>Description Generator</a>
                <a href="#recommend" style={{padding:"10px 12px", borderRadius:8, background:"#ff7a00", color:"#fff", textDecoration:"none"}}>Recommendations</a>
                <a href="#chatbot" style={{padding:"10px 12px", borderRadius:8, background:"#34a853", color:"#fff", textDecoration:"none"}}>Chat with AI</a>
              </div>

              <div id="desc-generator" style={{marginTop:18}}>
                <ProductDescriptionGenerator product={product} onSaveText={(txt)=>{ console.log("Saved:", txt); }} />
              </div>

              <div id="recommend" style={{marginTop:14}}>
                <h4 style={{margin:"8px 0"}}>Related Products</h4>
                <ProductRecommendation product={product} products={products} />
              </div>
            </div>
          </div>

          <aside style={{position:"relative"}}>
            <div style={{
              position:"sticky", top:20, padding:16, borderRadius:12, boxShadow:"0 6px 18px rgba(0,0,0,0.06)", background:"#fff"
            }}>
              <div id="chatbot" style={{marginBottom:12}}>
                <h4 style={{marginTop:0}}>Chat with AI</h4>
                <AIChatbot />
              </div>

              <div style={{marginTop:12}}>
                <h4 style={{margin:"8px 0"}}>Store Info</h4>
                <SiteInfo />
              </div>
            </div>
          </aside>
        </section>

      </main>

      <footer style={{borderTop:"1px solid #eee", padding:"18px 24px", background:"#fafafa"}}>
        <div style={{maxWidth:1100, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div style={{fontSize:13, color:"#444"}}>© {new Date().getFullYear()} Chauhan Organic Store — Panipat, Haryana • Pin 132103</div>
          <div style={{display:"flex", gap:8}}>
            <a href="mailto:vijaychauhan200104@gmail.com" style={{textDecoration:"none", color:"#0b74ff"}}>vijaychauhan200104@gmail.com</a>
          </div>
        </div>
      </footer>

      <Cart open={cartOpen} onClose={()=>setCartOpen(false)} />
    </div>
  );
}
