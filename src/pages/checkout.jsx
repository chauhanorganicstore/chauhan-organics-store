import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getCart, clearCart } from "../utils/cart";

export default function Checkout() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setItems(getCart());
  }, []);

  const subtotal = items.reduce((s, it) => s + (it.price || 0) * (it.qty || 1), 0);

  function placeOrder() {
    if (!name) return alert("Please enter name");
    const order = { id: "ORD" + Date.now(), name, phone, items, subtotal, date: new Date().toISOString() };
    // simulate save — write to localStorage 'orders'
    const orders = JSON.parse(localStorage.getItem("organic_orders_v1") || "[]");
    orders.push(order);
    localStorage.setItem("organic_orders_v1", JSON.stringify(orders));
    clearCart();
    alert("Order placed. Order ID: " + order.id);
    window.location.href = "/";
  }

  return (
    <MainLayout isAdmin={false} product={null} products={[]}>
      <div style={{maxWidth:800, margin:"28px auto", padding:"0 16px"}}>
        <h1>Billing Counter</h1>

        <div style={{display:"grid", gridTemplateColumns:"1fr 320px", gap:20}}>
          <div>
            <h3>Customer details</h3>
            <div style={{display:"grid", gap:8}}>
              <input placeholder="Customer name" value={name} onChange={(e)=>setName(e.target.value)} style={{padding:8, borderRadius:6, border:"1px solid #ddd"}}/>
              <input placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} style={{padding:8, borderRadius:6, border:"1px solid #ddd"}}/>
            </div>

            <h3 style={{marginTop:12}}>Items</h3>
            <div style={{background:"#fff", padding:10, borderRadius:8}}>
              {items.length === 0 && <div style={{color:"#666"}}>Cart is empty.</div>}
              {items.map(it => (
                <div key={it.id} style={{display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #f1f1f1"}}>
                  <div>
                    <div style={{fontWeight:700}}>{it.name}</div>
                    <div style={{fontSize:13, color:"#666"}}>{it.qty} × ₹{it.price}</div>
                  </div>
                  <div style={{fontWeight:700}}>₹ { (it.qty||1) * it.price }</div>
                </div>
              ))}
            </div>

            <div style={{marginTop:12}}>
              <div style={{display:"flex", justifyContent:"space-between", fontWeight:700}}>Subtotal <span>₹ {subtotal}</span></div>
              <button onClick={placeOrder} style={{marginTop:12, padding:"10px 14px", borderRadius:8, background:"#ff8c00", color:"#fff", border:"none"}}>Place Order</button>
            </div>
          </div>

          <aside>
            <div style={{padding:12, borderRadius:8, background:"#fff", boxShadow:"0 8px 20px rgba(0,0,0,0.06)"}}>
              <h4>Reception</h4>
              <p>Owner: <strong>Vijay Chauhan</strong></p>
              <p>Email: <a href="mailto:vijaychauhan200104@gmail.com">vijaychauhan200104@gmail.com</a></p>
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}
