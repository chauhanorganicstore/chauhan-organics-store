import React, { useEffect, useState } from "react";

export default function Admin(){
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ id:"", title:"", price:"", unit:"", category:"", image:"/images/placeholder.svg", description:"" });
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(()=> {
    fetch("/products.json")
      .then(r=> r.ok ? r.json() : Promise.reject("no products"))
      .then(data => { setProducts(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => { setProducts([]); setLoading(false); });
  }, []);

  function resetForm(){
    setEditing(null);
    setForm({ id:"", title:"", price:"", unit:"", category:"", image:"/images/placeholder.svg", description:"" });
  }

  function startEdit(p){
    setEditing(p.id);
    setForm({...p});
    window.scrollTo(0,0);
  }

  async function persist(nextProducts){
    if (!password) return alert("Enter admin password");
    setBusy(true);
    try {
      const res = await fetch("/api/update-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: nextProducts, password })
      });
      const js = await res.json();
      if (!res.ok) throw js;
      alert("Saved to GitHub (commit: " + (js.commit || "unknown") + ")");
      // after successful commit, update client state and refresh public/products.json by forcing reload
      setProducts(nextProducts);
      // option: reload after short delay to pick up CDN: location.reload();
    } catch (e) {
      console.error(e);
      alert("Save failed: " + (e && (e.error || e.message || JSON.stringify(e))));
    } finally { setBusy(false); }
  }

  function save(){
    const next = editing ? products.map(x => x.id===editing ? ({...form}) : x) : [{...form, id: form.id || 'prod-'+Date.now()}, ...products];
    // update in-memory immediately and then call server
    setProducts(next);
    resetForm();
    persist(next);
  }

  function remove(id){
    if (!confirm("Delete product?")) return;
    const next = products.filter(x => x.id !== id);
    setProducts(next);
    persist(next);
  }

  if (loading) return <div style={{padding:20}}>Loading products...</div>;

  return (
    <div style={{padding:24, fontFamily:'Inter, Arial, sans-serif'}}>
      <h1>Admin Dashboard</h1>
      <div style={{marginBottom:12}}>
        <label style={{marginRight:8}}>Admin password:</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{marginRight:8}}/>
        <button disabled={busy} onClick={async ()=> {
          // quick validate by fetching /api/update-products with a test (non-destructive) ping is not implemented;
          alert("Password stored locally for this session. Save will use it to commit.");
        }}>Set</button>
      </div>

      <div style={{display:'flex', gap:20}}>
        <div style={{flex:1, minWidth:320}}>
          <h3>{editing ? "Edit product" : "Add new product"}</h3>
          <div style={{display:'grid', gap:8}}>
            <input placeholder="id (unique)" value={form.id} onChange={e=>setForm({...form,id:e.target.value})}/>
            <input placeholder="title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
            <input placeholder="price" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/>
            <input placeholder="unit (e.g. 500g)" value={form.unit} onChange={e=>setForm({...form,unit:e.target.value})}/>
            <input placeholder="category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/>
            <input placeholder="image path (/images/..)" value={form.image} onChange={e=>setForm({...form,image:e.target.value})}/>
            <textarea placeholder="description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
            <div style={{display:'flex', gap:8}}>
              <button onClick={save} disabled={busy} style={{padding:'8px 12px'}}>{busy ? "Saving…" : (editing ? "Save changes" : "Add product")}</button>
              <button onClick={resetForm} style={{padding:'8px 12px'}}>Reset</button>
            </div>
          </div>
        </div>

        <div style={{flex:2}}>
          <h3>Products ({products.length})</h3>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:12}}>
            {products.map(p => (
              <div key={p.id} style={{background:'#fff', padding:12, borderRadius:8, boxShadow:'0 6px 18px rgba(0,0,0,0.04)'}}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                  <strong>{p.title}</strong>
                  <span style={{color:'#666'}}>?{p.price} / {p.unit}</span>
                </div>
                <div style={{marginTop:6, color:'#444'}}>{p.description?.slice(0,90)}</div>
                <div style={{display:'flex', gap:8, marginTop:10}}>
                  <button onClick={()=>startEdit(p)}>Edit</button>
                  <button onClick={()=>remove(p.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr style={{margin:'24px 0'}}/>
      <div>
        <h4>How saves work</h4>
        <ol>
          <li>Enter admin password (set in Vercel env `ADMIN_PASSWORD`).</li>
          <li>Click Save ? Admin calls <code>/api/update-products</code> which commits to GitHub using `GITHUB_TOKEN` env var on server.</li>
          <li>Vercel will auto-deploy the new commit; public <code>/products.json</code> will update for the site.</li>
        </ol>
      </div>
    </div>
  );
}
