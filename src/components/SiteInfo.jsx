import React from "react";

export default function SiteInfo() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: 10,
      padding: 16,
      borderRadius: 12,
      boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      background: "linear-gradient(135deg, #ffffff, #f6f9ff)"
    }}>
      <div style={{fontSize:18, fontWeight:700}}>Chauhan Organic Store</div>
      <div style={{fontSize:14}}>
        <strong>Owner:</strong> Vijay Chauhan<br/>
        <strong>Address:</strong> Panipat, Haryana 132103<br/>
        <strong>Email:</strong> <a href="mailto:vijaychauhan200104@gmail.com">vijaychauhan200104@gmail.com</a>
      </div>
      <div style={{marginTop:8, fontSize:13, color:"#555"}}>
        Organic store focused on sugarcane products, A2 ghee, atta, pulses, dryfruits and oils.
      </div>

      <div style={{display:"flex", gap:8, marginTop:10}}>
        <a href="/contact" style={{padding:"8px 12px", borderRadius:8, background:"#0b74ff", color:"#fff", textDecoration:"none"}}>Contact</a>
        <a href="#ai-tools" style={{padding:"8px 12px", borderRadius:8, background:"#34a853", color:"#fff", textDecoration:"none"}}>AI Tools</a>
      </div>
    </div>
  );
}
