import React from "react";

export default function Header(){
  return (
    <header className="container header">
      <div className="brand">
        <div className="logo">OC</div>
        <div className="text">
          <div style={{fontWeight:800}}>OrganicStore</div>
          <div style={{fontSize:12,color:"#6b6b6b"}}>Pure • Local • Partner-sourced</div>
        </div>
      </div>

      <nav className="nav">
        <a href="#products" style={{textDecoration:"none",color:"#333"}}>Products</a>
        <a href="#about" style={{textDecoration:"none",color:"#333"}}>About</a>
        <button className="cta" onClick={()=>window.scrollTo({top:800,behavior:"smooth"})}>Sell with us</button>
      </nav>
    </header>
  );
}
