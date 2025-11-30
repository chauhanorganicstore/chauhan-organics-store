import React, { useState, useEffect } from "react";
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
    function handler() { setCount(getCount()); }
    window.addEventListener("cartUpdated", handler);
    return () => window.removeEventListener("cartUpdated", handler);
  }, []);

  return (
    <div style={{fontFamily:"system-ui, -apple-system, 'Segoe UI', Roboto, Arial"}}>
      <header style={{
        display:"flex", justifyContent:"space-between", alignItems:"center",
        padding:"12px 18px", borderBottom:"1px solid #eee", background:"#fff", position:"sticky", top:0, zIndex:50
      }}>
        <div style={{display:"flex", alignItems:"center", gap:12}}>
          <div style={{width:44, height:44, borderRadius:8, background:"#e6f3ea", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, color:"#2b7a3a"}}>OC</div>
          <div>
            <div style={{fontSize:18, fontWeight:700}}>Chauhan Organic Store</div>
            <div style={{fontSize:12, color:"#666"}}>Panipat, Haryana</div>
          </div>
        </div>

        <nav style={{display:"flex", gap:12, alignItems:"center"}}>
          <a href="/" style={{textDecoration:"none", color:"#111"}}>Home</a>
          <a href="/products" style={{textDecoration:"none", color:"#111"}}>Products</a>
          <a href="/store" style={{textDecoration:"none", color:"#111"}}>Visit Store</a>
          <a href="/contact" style={{textDecoration:"none", color:"#111"}}>Contact</a>

          <button onClick={()=>setCartOpen(true)} style={{position:"relative", padding:"8px 10px", borderRadius:8, background:"#fff", border:"1px solid #ddd", cursor:"pointer"}}>
            Cart {count > 0 && <span style={{background:"#ff3b30", color:"#fff", borderRadius:10, padding:"2px 6px", marginLeft:8, fontSize:12}}>{count}</span>}
          </button>
        </nav>
      </header>

      <main style={{maxWidth:1100, margin:"28px auto", padding:"0 16px"}}>
        {children}
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
