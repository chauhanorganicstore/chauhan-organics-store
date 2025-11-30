import React from "react";

export default function RackCard({ category, count=0, image="/images/placeholder.svg", onOpen }) {
  return (
    <div style={{padding:16, borderRadius:12, background:"#fff", boxShadow:"0 8px 28px rgba(0,0,0,0.06)", display:"flex", gap:12, alignItems:"center"}}>
      <div style={{width:92, height:92, borderRadius:10, overflow:"hidden", flexShrink:0}}>
        <img src={image} alt={category} style={{width:"100%", height:"100%", objectFit:"cover"}} />
      </div>

      <div style={{flex:1}}>
        <h4 style={{margin:"0 0 6px", textTransform:"capitalize"}}>{category}</h4>
        <div style={{color:"#666", fontSize:13}}>{count} curated items</div>

        <div style={{marginTop:8}}>
          <button onClick={onOpen} style={{padding:"8px 12px", borderRadius:8, background:"#0b74ff", color:"#fff", border:"none"}}>Open Rack</button>
        </div>
      </div>
    </div>
  );
}
