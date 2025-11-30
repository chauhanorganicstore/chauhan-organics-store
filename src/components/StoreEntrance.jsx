import React from "react";

export default function StoreEntrance({ onEnter }) {
  return (
    <div style={{padding:28, borderRadius:14, background:"#fff", boxShadow:"0 12px 36px rgba(0,0,0,0.07)", display:"flex", gap:20, alignItems:"center"}}>
      <div style={{flex:1}}>
        <h1 style={{margin:0, fontSize:34, color:"#1b6a3a"}}>Welcome to Chauhan Organic Store</h1>
        <p style={{color:"#4b5563", maxWidth:720}}>
          Walk into our virtual store — inspect curated organic products like you are visiting our physical shop in Panipat.
        </p>

        <div style={{display:"flex", gap:12, marginTop:12}}>
          <button onClick={onEnter} style={{padding:"12px 18px", borderRadius:10, background:"#0b74ff", color:"#fff", border:"none", fontWeight:700}}>Enter Store</button>
          <a href="/products" style={{padding:"10px 16px", borderRadius:10, background:"#fff", border:"1px solid #e6e6e6", textDecoration:"none", color:"#111"}}>Browse Categories</a>
        </div>
      </div>

      <div style={{width:460, position:"relative"}}>
        <div style={{width:"100%", height:220, borderRadius:12, overflow:"hidden", boxShadow:"0 10px 30px rgba(0,0,0,0.06)"}}>
          <img src="/images/placeholder-hero.jpg" alt="store hero" style={{width:"100%", height:220, objectFit:"cover", filter:"saturate(1.05)"}} />
        </div>

        <div style={{position:"absolute", right:18, bottom:-18, display:"flex", gap:10}}>
          <div style={{background:"#fff", padding:"8px 10px", borderRadius:12, boxShadow:"0 8px 20px rgba(0,0,0,0.08)"}}>
            <div style={{fontSize:12, color:"#666"}}>Open Hours</div>
            <div style={{fontWeight:700}}>9AM - 8PM</div>
          </div>
          <div style={{background:"#ffefdb", padding:"8px 10px", borderRadius:12, boxShadow:"0 8px 20px rgba(0,0,0,0.05)"}}>
            <div style={{fontSize:12, color:"#cc6b00"}}>Visit Counter</div>
            <div style={{fontWeight:700}}>Billing & Pickup</div>
          </div>
        </div>
      </div>
    </div>
  );
}
