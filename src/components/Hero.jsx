import React from "react";

export default function Hero(){
  const img = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=60";
  return (
    <section className="container hero" role="banner">
      <img className="hero-img" src={img} alt="organic banner" />
      <div className="hero-text">
        <h1>Organic Store — Premium & Local</h1>
        <p className="lead">Curated, partner-fulfilled organic goods. No stocking, 100% authentic — earn referral on each sale.</p>
        <div style={{marginTop:12,display:"flex",gap:8}}>
          <button className="cta" onClick={()=>window.scrollTo({top:900,behavior:"smooth"})}>Shop now</button>
          <a className="cta" style={{background:"#fff",border:"1px solid #eee",color: "#333"}} href="/about">How it works</a>
        </div>
      </div>
    </section>
  );
}
