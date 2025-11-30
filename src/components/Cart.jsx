import React, { useEffect, useState } from "react";
import { getCart, getCount, removeFromCart, updateQty, clearCart } from "../utils/cart";

export default function Cart({ open, onClose }) {
  const [items, setItems] = useState(getCart());
  const [count, setCount] = useState(getCount());

  useEffect(() => {
    function handler(e) {
      setItems(getCart());
      setCount(getCount());
    }
    window.addEventListener("cartUpdated", handler);
    return () => window.removeEventListener("cartUpdated", handler);
  }, []);

  useEffect(() => {
    setItems(getCart());
    setCount(getCount());
  }, [open]);

  const subtotal = items.reduce((s, it) => s + (it.price || 0) * (it.qty || 1), 0);

  if (!open) return null;

  return (
    <div style={{
      position: "fixed", right: 20, top: 80, width: 360, maxHeight: "75vh", overflowY: "auto",
      background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", borderRadius: 12, zIndex: 9999, padding: 16
    }}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8}}>
        <div style={{fontWeight:700}}>Your Cart ({count})</div>
        <div>
          <button onClick={onClose} style={{background:"none", border:"none", cursor:"pointer"}}>Close</button>
        </div>
      </div>

      {items.length === 0 && <div style={{color:"#666", padding:12}}>Your cart is empty.</div>}

      {items.map((it) => (
        <div key={it.id} style={{display:"flex", gap:10, marginBottom:12, alignItems:"center"}}>
          <img src={it.image || "/images/placeholder.svg"} alt={it.name} style={{width:64, height:64, objectFit:"cover", borderRadius:8}} />
          <div style={{flex:1}}>
            <div style={{fontWeight:700}}>{it.name}</div>
            <div style={{fontSize:13, color:"#555"}}>₹ {it.price} x {it.qty}</div>
            <div style={{display:"flex", gap:8, marginTop:6}}>
              <button onClick={()=>updateQty(it.id, (it.qty||1)-1)} style={{padding:"6px 8px", borderRadius:6}}>−</button>
              <button onClick={()=>updateQty(it.id, (it.qty||1)+1)} style={{padding:"6px 8px", borderRadius:6}}>＋</button>
              <button onClick={()=>{ removeFromCart(it.id); }} style={{padding:"6px 8px", borderRadius:6}}>Remove</button>
            </div>
          </div>
        </div>
      ))}

      {items.length > 0 && (
        <div style={{borderTop:"1px solid #eee", paddingTop:12, marginTop:8}}>
          <div style={{display:"flex", justifyContent:"space-between", fontWeight:700}}>Subtotal <span>₹ {subtotal}</span></div>
          <div style={{display:"flex", gap:8, marginTop:10}}>
            <button onClick={()=>{ alert("Checkout simulated — implement real checkout."); clearCart(); }} style={{flex:1, padding:"10px 12px", borderRadius:8, background:"#0b74ff", color:"#fff", border:"none"}}>Checkout</button>
            <button onClick={()=>clearCart()} style={{padding:"10px 12px", borderRadius:8, border:"1px solid #ddd"}}>Clear</button>
          </div>
        </div>
      )}
    </div>
  );
}
