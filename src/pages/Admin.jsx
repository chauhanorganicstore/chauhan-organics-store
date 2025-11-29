import React, { useEffect, useState } from "react";

/**
 * Admin page - edit product catalog and push to GitHub via /api/update-products
 * NOTE: This client asks for an admin password when committing. Keep ADMIN_PASSWORD secret in Vercel env.
 */
export default function Admin(){
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const blank = { id:"", sku:"", title:"", price:0, unit:"250g", category:"Misc", image:"/images/placeholder-hero.jpg", description:"", ingredients:"", origin:"", certifications:[], tags:[], stock:10 };
  const [form, setForm] = useState(blank);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [busy, setBusy] = useState(false);

  useEffect(()=> {
    fetch("/products.json").then(r=>r.json()).then(d=>{
      setProducts(Array.isArray(d)?d:[]);
      setLoading(false);
    }).catch(e=>{
      setProducts([]);
      setLoading(false);
    });
  },[]);

  function startEdit(i){
    setEditingIndex(i);
    setForm(Object.assign({}, products[i]));
    window.scrollTo(0,0);
  }
  function resetForm(){
    setEditingIndex(-1); setForm(Object.assign({}, blank));
  }
  function saveLocal(){
    const copy = [...products];
    if(editingIndex >= 0){
      copy[editingIndex] = {...form};
    } else {
      // ensure id
      if(!form.id) form.id = (form.title || "prod-" + Date.now()).toLowerCase().replace(/[^a-z0-9\-]/g,"-");
      copy.unshift({...form});
    }
    setProducts(copy);
    resetForm();
    alert("Saved locally. Click 'Commit to GitHub' to persist.");
    console.log(JSON.stringify(copy,null,2));
  }
  function remove(i){
    if(!confirm("Delete this product?")) return;
    const copy = products.filter((_,idx)=>idx!==i);
    setProducts(copy);
    alert("Removed locally. Commit to persist.");
  }

  async function commitToGit(){
    const pwd = prompt("Enter ADMIN password to commit (stored in server env variable)");
    if(!pwd){ alert("Aborted"); return; }
    setBusy(true);
    try {
      const res = await fetch("/api/update-products", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ products, password: pwd })
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data?.message || "Failed");
      alert("Products committed: " + data.message);
    } catch(err){
      alert("Commit failed: " + (err.message || err));
    } finally { setBusy(false); }
  }

  if(loading) return <div style={{padding:20}}>Loading...</div>;

  return (
    <div style={{padding:20}}>
      <h2>Admin — Products</h2>
      <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
        <div style={{flex:"1 1 320px",minWidth:320,background:"#fff",padding:14,borderRadius:8,boxShadow:"0 6px 18px rgba(15,23,42,0.06)"}}>
          <h3>{editingIndex>=0 ? "Edit product" : "New product"}</h3>
          <input placeholder="id (optional)" value={form.id} onChange={e=>setForm({...form,id:e.target.value})} style={{width:"100%",marginBottom:8}} />
          <input placeholder="SKU" value={form.sku||""} onChange={e=>setForm({...form,sku:e.target.value})} style={{width:"100%",marginBottom:8}} />
          <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} style={{width:"100%",marginBottom:8}} />
          <input placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form,price:parseFloat(e.target.value||0)})} style={{width:"48%",marginRight:"4%",marginBottom:8}} />
          <input placeholder="Unit (e.g. 500g)" value={form.unit} onChange={e=>setForm({...form,unit:e.target.value})} style={{width:"48%",marginBottom:8}} />
          <input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} style={{width:"100%",marginBottom:8}} />
          <input placeholder="Image path (public/images/...)" value={form.image} onChange={e=>setForm({...form,image:e.target.value})} style={{width:"100%",marginBottom:8}} />
          <textarea placeholder="Short description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} style={{width:"100%",height:80,marginBottom:8}} />
          <textarea placeholder="Ingredients (comma separated)" value={form.ingredients} onChange={e=>setForm({...form,ingredients:e.target.value})} style={{width:"100%",height:60,marginBottom:8}} />
          <input placeholder="Origin (e.g. Haryana, India)" value={form.origin} onChange={e=>setForm({...form,origin:e.target.value})} style={{width:"100%",marginBottom:8}} />
          <input placeholder="Certifications (comma separated)" value={ (form.certifications||[]).join(", ") } onChange={e=>setForm({...form,certifications: e.target.value.split(",").map(s=>s.trim()).filter(Boolean) })} style={{width:"100%",marginBottom:8}} />
          <input placeholder="Tags (comma separated)" value={ (form.tags||[]).join(", ") } onChange={e=>setForm({...form,tags: e.target.value.split(",").map(s=>s.trim()).filter(Boolean) })} style={{width:"100%",marginBottom:8}} />
          <input placeholder="Stock" type="number" value={form.stock||0} onChange={e=>setForm({...form,stock:parseInt(e.target.value||0)})} style={{width:"100%",marginBottom:8}} />
          <div style={{display:"flex",gap:8}}>
            <button onClick={saveLocal}>Save locally</button>
            <button onClick={resetForm}>Reset</button>
            <button onClick={commitToGit} disabled={busy} style={{marginLeft:"auto",background:"#0ea5a4",color:"#fff"}}>{busy ? "Committing..." : "Commit to GitHub"}</button>
          </div>
        </div>

        <div style={{flex:"2 1 520px"}}>
          <h3>Products ({products.length})</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12}}>
            {products.map((p, i) => (
              <div key={p.id || i} style={{padding:12,background:"#fff",borderRadius:8,boxShadow:"0 6px 18px rgba(15,23,42,0.04)"}}>
                <div style={{display:"flex",gap:10}}>
                  <img src={p.image||"/images/placeholder-hero.jpg"} alt={p.title} width="80" height="60" style={{objectFit:"cover",borderRadius:6}} onError={(e)=>e.currentTarget.src="/images/placeholder-hero.jpg"} />
                  <div style={{flex:1}}>
                    <strong>{p.title}</strong>
                    <div style={{fontSize:13,color:"#6b7280"}}>?{p.price} / {p.unit}</div>
                    <div style={{marginTop:6,fontSize:12,color:"#6b7280"}}>{(p.description||"").slice(0,80)}</div>
                    <div style={{marginTop:8,display:"flex",gap:6}}>
                      <button onClick={()=>startEdit(i)}>Edit</button>
                      <button onClick={()=>remove(i)} style={{background:"#fee2e2"}}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{marginTop:22}}>
        <h4>Notes</h4>
        <ul>
          <li>Commit uses server API which requires ADMIN_PASSWORD (set in Vercel env).</li>
          <li>Server will commit to the repo path specified by GITHUB_REPO and GITHUB_PRODUCTS_PATH env vars.</li>
        </ul>
      </div>
    </div>
  );
}
