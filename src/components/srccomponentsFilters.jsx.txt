import React from "react";

export default function Filters({categories,selected, setSelected}){
  return (
    <div className="container">
      <div className="filter-bar">
        <div style={{fontWeight:700}}>Products</div>
        <select className="filter-select" value={selected} onChange={e=>setSelected(e.target.value)}>
          <option value="">All categories</option>
          {categories.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        <div style={{marginLeft:"auto",color:"#666"}}>{/* optional search */}</div>
      </div>
    </div>
  )
}
