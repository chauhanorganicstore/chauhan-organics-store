import React, { useEffect, useState } from 'react';

export default function Store() {
  const [entered, setEntered] = useState(false);         // gate open
  const [products, setProducts] = useState([]);          // all products
  const [category, setCategory] = useState('All');       // selected category
  const [cart, setCart] = useState({});                  // cart map id -> qty
  const [showCounter, setShowCounter] = useState(false); // show billing counter
  const MAX_SHOW = 10;

  useEffect(() => {
    // load static product file from public/data
    fetch('/data/products.json')
      .then(r => r.json())
      .then(data => {
        // keep only up to MAX_SHOW items
        setProducts(data.slice(0, 100)); // keep for filtering, we'll limit display later
      })
      .catch(() => setProducts([]));
  }, []);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const visibleProducts = products
    .filter(p => category === 'All' ? true : p.category === category)
    .slice(0, MAX_SHOW);

  const addToCart = (p) => {
    setCart(prev => {
      const copy = {...prev};
      copy[p.id] = (copy[p.id] || 0) + 1;
      return copy;
    });
  };

  const removeFromCart = (p) => {
    setCart(prev => {
      const copy = {...prev};
      if (!copy[p.id]) return copy;
      copy[p.id] = copy[p.id] - 1;
      if (copy[p.id] <= 0) delete copy[p.id];
      return copy;
    });
  };

  const cartItems = Object.keys(cart).map(id => {
    const prod = products.find(p => p.id === id);
    return prod ? {...prod, qty: cart[id]} : null;
  }).filter(Boolean);

  // Simple layout styles (inline, so no extra CSS required)
  const styles = {
    container: { fontFamily: 'Segoe UI, Arial, sans-serif', padding: 24 },
    gate: { textAlign:'center', padding:40, border:'2px solid #eee', borderRadius:8, marginBottom:20 },
    enterBtn: { padding:'10px 18px', background:'#F59E0B', color:'#fff', border:'none', borderRadius:6, cursor:'pointer' },
    interior: { display:'flex', gap:24 },
    left: { flex:3 },
    right: { flex:1, minWidth:260 },
    shelf: { background:'#fff', padding:18, borderRadius:12, boxShadow:'0 6px 20px rgba(0,0,0,0.06)', marginBottom:18 },
    productCard: { display:'inline-block', width:180, margin:8, verticalAlign:'top', textAlign:'left', borderRadius:8, padding:10, boxShadow:'0 4px 12px rgba(0,0,0,0.04)', background:'#fafafa' },
    productImg: { width:'100%', height:100, objectFit:'cover', borderRadius:6, marginBottom:8 },
    smallBtn: { padding:'6px 10px', borderRadius:6, border:'none', cursor:'pointer' },
    counter: { position:'sticky', top:20 }
  };

  return (
    <div style={styles.container}>
      {!entered ? (
        <div style={styles.gate}>
          <h1 style={{margin:0}}>Welcome to OrganicStore</h1>
          <p style={{color:'#555'}}>Experience the store like a physical visit — enter the gate to explore racks and billing counter.</p>
          <button style={styles.enterBtn} onClick={() => setEntered(true)}>Enter Gate</button>
        </div>
      ) : (
        <>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
            <div>
              <h2 style={{margin:'0 0 6px 0'}}>Store — Physical View</h2>
              <div style={{color:'#666'}}>Category view (items limited to {MAX_SHOW})</div>
            </div>
            <div>
              <label style={{marginRight:8}}>Category:</label>
              <select value={category} onChange={e => setCategory(e.target.value)} style={{padding:8, borderRadius:6}}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <button onClick={() => { setShowCounter(s => !s) }} style={{marginLeft:12, ...styles.smallBtn}}>Toggle Counter ({cartItems.length})</button>
            </div>
          </div>

          <div style={styles.interior}>
            <div style={styles.left}>
              {/* Shelves / racks area */}
              <div style={styles.shelf}>
                <h3 style={{marginTop:0}}>Entrance racks</h3>
                <div>
                  {visibleProducts.length === 0 && <div style={{color:'#999'}}>No items in this category yet.</div>}
                  {visibleProducts.map(p => (
                    <div key={p.id} style={styles.productCard}>
                      <img src={p.image} alt={p.title} style={styles.productImg} />
                      <div style={{fontWeight:700}}>{p.title}</div>
                      <div style={{fontSize:13, color:'#444'}}>{p.brand} • {p.category}</div>
                      <div style={{marginTop:8, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <div style={{fontWeight:700}}>?{p.price}</div>
                        <div>
                          <button onClick={() => removeFromCart(p)} style={{...styles.smallBtn, marginRight:6}}>-</button>
                          <button onClick={() => addToCart(p)} style={{...styles.smallBtn, background:'#10B981', color:'#fff'}}>Add</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Example: more racks */}
              <div style={styles.shelf}>
                <h3 style={{marginTop:0}}>Middle racks</h3>
                <div>
                  {visibleProducts.slice(0,5).map(p => (
                    <div key={'m-'+p.id} style={{...styles.productCard, width:140}}>
                      <img src={p.image} alt={p.title} style={{...styles.productImg, height:80}} />
                      <div style={{fontWeight:600, fontSize:13}}>{p.title}</div>
                      <div style={{fontSize:12}}>?{p.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside style={{...styles.right, ...styles.counter}}>
              <div style={{...styles.shelf}}>
                <h3 style={{marginTop:0}}>Reception / Billing</h3>
                <div style={{marginBottom:8}}>
                  <div style={{fontSize:13, color:'#666'}}>Cart items: {cartItems.reduce((s, it) => s + it.qty, 0)}</div>
                  <ul style={{paddingLeft:18}}>
                    {cartItems.length === 0 && <li style={{color:'#999'}}>Cart empty</li>}
                    {cartItems.map(it => (
                      <li key={it.id} style={{marginBottom:6}}>
                        {it.title} <b>×{it.qty}</b> <span style={{float:'right'}}>?{it.price * it.qty}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{borderTop:'1px dashed #eee', paddingTop:8}}>
                  <div style={{fontWeight:700}}>Total: ?{cartItems.reduce((s, it) => s + it.price * it.qty, 0)}</div>
                  <button onClick={() => { alert('Checkout demo — billing printed in counter.'); setCart({}); }} style={{marginTop:10, width:'100%', ...styles.enterBtn}}>Checkout at counter</button>
                </div>
              </div>

              <div style={{...styles.shelf}}>
                <h4 style={{marginTop:0}}>Reception Notes</h4>
                <p style={{color:'#555', fontSize:13}}>Welcome! You can add items to cart from racks. Only 10 items shown for now. Later we will add 1-by-1 from backend.</p>
                <button onClick={() => window.scrollTo(0,0)} style={{...styles.smallBtn, marginTop:6}}>Back to Entrance</button>
              </div>
            </aside>
          </div>
        </>
      )}
    </div>
  );
}

