import React from "react";
import ProductList from "./components/ProductList";

export default function App(){
  return (
    <div>
      <div className="container header">
        <div className="logo"><div className="badge">OC</div><div>OrganicStore</div></div>
        <div style={{display:"flex", gap:12, alignItems:"center"}}>
          <nav style={{display:"flex", gap:16}}>
            <a href="#products">Products</a>
            <a href="#about">About</a>
          </nav>
          <button style={{background:"#f59e0b", color:"#fff", borderRadius:10, padding:"8px 12px", border:"none"}}>Sell with us</button>
        </div>
      </div>

      <div className="container">
        <div className="hero" id="about">
          <div>
            <h1>Organic Store — Premium & Local</h1>
            <p>Curated, partner-fulfilled organic goods. Real photos, transparent sourcing and farm-to-door traceability.</p>
            <div style={{marginTop:18, display:"flex", gap:12}}>
              <button style={{background:"#f59e0b", color:"#fff", padding:"10px 14px", borderRadius:10, border:"none"}}>Shop now</button>
              <button style={{background:"#fff", border:"1px solid #e6e6e6", padding:"10px 14px", borderRadius:10}}>How it works</button>
            </div>
          </div>
          <img className="hero-img" src="/images/placeholder-hero.jpg" alt="hero" />
        </div>

        <h3 id="products">Products</h3>
        <ProductList />
        <div className="footer">© { (new Date()).getFullYear() } Chauhan Organics — Built with ?</div>
      </div>
    </div>
  );
}
