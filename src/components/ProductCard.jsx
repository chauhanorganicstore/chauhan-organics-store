import React from "react";

export default function ProductCard({p}){
  const waNumber = "919306328256"; // change if needed
  const msg = encodeURIComponent(`Hi, I want to buy *${p.title}* (ID: ${p.id}) - ${p.price}`);
  const waLink = `https://wa.me/${waNumber}?text=${msg}`;

  return (
    <article className="card" aria-label={p.title}>
      <img className="card-img" src={p.img} alt={p.title} />
      <div className="card-body">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontWeight:800}}>{p.title}</div>
          <div className="badge">{p.category}</div>
        </div>
        <div style={{fontSize:13,color:"#666",marginTop:6}}>{p.desc?.slice(0,120)}</div>
        <div className="price">{p.price}</div>
        <div className="actions">
          <button className="btn btn-view" onClick={()=>alert(p.desc)}>View</button>
          <a className="btn btn-buy" href={waLink} target="_blank" rel="noreferrer">Buy</a>
        </div>
      </div>
    </article>
  )
}
