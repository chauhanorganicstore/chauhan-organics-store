import React, { useEffect, useState } from "react";
import Head from "next/head";

/**
 * Chauhan Organic Store — Physical Tour UI
 * - Entrance gate (click to enter)
 * - Racks (category selector)
 * - Product cards (from /data/products.json)
 * - Reception / Billing counter (checkout)
 *
 * This component is intentionally simple, self-contained, and uses inline styles
 * so you can paste it directly and deploy without extra CSS files.
 */

export default function Store() {
  const [entered, setEntered] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState({});
  const [showReception, setShowReception] = useState(false);

  useEffect(() => {
    fetch("/data/products.json")
      .then((r) => r.json())
      .then((d) => setProducts(d || []))
      .catch(() => setProducts([]));
  }, []);

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const visible = products.filter((p) => (category === "All" ? true : p.category === category));

  const addToCart = (p) => {
    setCart((prev) => {
      const copy = { ...prev };
      copy[p.id] = (copy[p.id] || 0) + 1;
      return copy;
    });
  };

  const removeFromCart = (p) => {
    setCart((prev) => {
      const copy = { ...prev };
      if (!copy[p.id]) return copy;
      copy[p.id] = copy[p.id] - 1;
      if (copy[p.id] <= 0) delete copy[p.id];
      return copy;
    });
  };

  const cartItems = Object.keys(cart).map((id) => {
    const p = products.find((x) => x.id === id);
    return p ? { ...p, qty: cart[id] } : null;
  }).filter(Boolean);

  const total = cartItems.reduce((s, it) => s + (it.price || 0) * it.qty, 0);

  return (
    <>
      <Head>
        <title>Chauhan Organic Store — Physical Tour</title>
        <meta name="description" content="Chauhan Organic Store: Enter gate → Walk the racks → Pick products → Pay at reception." />
      </Head>

      <div style={styles.page}>
        {/* Entrance Gate */}
        {!entered && (
          <div style={styles.entranceWrap}>
            <div style={styles.entranceCard}>
              <h1 style={{ margin: 0 }}>👋 Chauhan Organic Store</h1>
              <p style={{ marginTop: 8 }}>Enter the store to browse our organic products — Jaggery, A2 Ghee, Atta, Pulses, Oils.</p>
              <div style={{ marginTop: 16 }}>
                <button style={styles.primaryBtn} onClick={() => setEntered(true)}>Enter Store</button>
                <button style={styles.ghostBtn} onClick={() => { setEntered(true); setCategory("All"); }}>Quick Enter</button>
              </div>
              <small style={{ display: "block", marginTop: 12, color: "#666" }}>Tip: Use category rack to filter products</small>
            </div>
          </div>
        )}

        {/* Main store view */}
        {entered && (
          <div style={styles.storeContainer}>
            <header style={styles.header}>
              <div>
                <strong style={{ fontSize: 18 }}>Chauhan Organic Store</strong>
                <div style={{ fontSize: 12, color: "#444" }}>Panipat — Organic & Trusted</div>
              </div>

              <div style={styles.headerActions}>
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.select}>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>

                <button style={styles.counterBtn} onClick={() => setShowReception(true)}>
                  🧾 Reception ({cartItems.length})
                </button>
              </div>
            </header>

            <main style={styles.main}>
              <aside style={styles.racks}>
                <h3 style={{ marginTop: 0 }}>Racks</h3>
                {categories.map((c) => (
                  <div key={c} style={category === c ? styles.rackActive : styles.rackItem} onClick={() => setCategory(c)}>
                    {c}
                  </div>
                ))}
                <div style={{ marginTop: 20, fontSize: 12, color: "#666" }}>
                  Tip: Click a rack to filter products. Max 10 shown for clarity.
                </div>
              </aside>

              <section style={styles.products}>
                <div style={styles.productsGrid}>
                  {visible.slice(0, 10).map((p) => (
                    <div key={p.id} style={styles.card}>
                      <div style={styles.cardImageWrap}>
                        {p.image ? <img alt={p.name} src={p.image} style={styles.cardImage} /> : <div style={styles.cardImagePlaceholder}>No image</div>}
                      </div>
                      <div style={{ padding: 10 }}>
                        <h4 style={{ margin: "0 0 6px 0" }}>{p.name}</h4>
                        <div style={{ fontSize: 13, color: "#555" }}>{p.description}</div>
                        <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ fontWeight: 700 }}>₹{p.price} / {p.unit}</div>
                          <div>
                            <button style={styles.smallBtn} onClick={() => removeFromCart(p)}>-</button>
                            <span style={{ margin: "0 8px" }}>{cart[p.id] || 0}</span>
                            <button style={styles.smallBtn} onClick={() => addToCart(p)}>+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {visible.length === 0 && <div style={{ padding: 20, color: "#777" }}>कोई उत्पाद उपलब्ध नहीं है।</div>}
                </div>
              </section>

              <aside style={styles.cart}>
                <h3 style={{ marginTop: 0 }}>Cart / Billing</h3>
                {cartItems.length === 0 && <div style={{ color: "#777" }}>कार्ट खाली है — आइटम जोड़ें</div>}
                {cartItems.map((it) => (
                  <div key={it.id} style={styles.cartItem}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{it.name}</div>
                      <div style={{ fontSize: 12, color: "#555" }}>{it.qty} × ₹{it.price} = ₹{it.qty * it.price}</div>
                    </div>
                    <div>
                      <button style={styles.smallBtn} onClick={() => removeFromCart(it)}>-</button>
                      <button style={styles.smallBtn} onClick={() => addToCart(it)}>+</button>
                    </div>
                  </div>
                ))}

                <div style={{ marginTop: 12, borderTop: "1px solid #eee", paddingTop: 10 }}>
                  <div style={{ fontWeight: 700 }}>Total: ₹{total}</div>
                  <div style={{ marginTop: 8 }}>
                    <button style={styles.primaryBtn} onClick={() => setShowReception(true)} disabled={cartItems.length === 0}>Proceed to Reception</button>
                  </div>
                </div>
              </aside>
            </main>

            {/* Reception modal / page */}
            {showReception && (
              <div style={styles.receptionOverlay}>
                <div style={styles.receptionCard}>
                  <h2>Reception / Billing Counter</h2>
                  {cartItems.length === 0 && <div style={{ color: "#777" }}>No items in cart.</div>}
                  {cartItems.map((it) => (
                    <div key={it.id} style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                      <div>{it.name} × {it.qty}</div>
                      <div>₹{it.price * it.qty}</div>
                    </div>
                  ))}
                  <div style={{ marginTop: 12, fontWeight: 800 }}>Grand Total: ₹{total}</div>

                  <div style={{ marginTop: 16 }}>
                    <input placeholder="Customer name" style={styles.input} />
                    <input placeholder="Phone / WhatsApp" style={styles.input} />
                    <textarea placeholder="Delivery / notes (optional)" style={styles.textarea}></textarea>
                  </div>

                  <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between" }}>
                    <button style={styles.ghostBtn} onClick={() => setShowReception(false)}>Back to Store</button>
                    <button style={styles.primaryBtn} onClick={() => {
                      // Simulated order placement — in future integrate /api/orders
                      alert("Order placed (simulated). Check server or implement /api/orders for persistence.");
                      setCart({});
                      setShowReception(false);
                    }}>Place Order (Simulated)</button>
                  </div>
                </div>
              </div>
            )}

            <footer style={styles.footer}>
              <div>Chauhan Organic Store — Panipat</div>
              <div style={{ fontSize: 12, color: "#666" }}>A2 Ghee • Jaggery • Atta • Pulses • Cold-Pressed Oils</div>
            </footer>
          </div>
        )}
      </div>
    </>
  );
}

/* Inline styles */
const styles = {
  page: {
    fontFamily: "Inter, Arial, Helvetica, sans-serif",
    minHeight: "100vh",
    background: "#fafaf8",
    color: "#222",
  },
  entranceWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "90vh",
    padding: 20,
  },
  entranceCard: {
    background: "#fff",
    padding: 28,
    borderRadius: 10,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    maxWidth: 720,
    textAlign: "center",
  },
  primaryBtn: {
    background: "#2b8a3e",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: 6,
    cursor: "pointer",
    marginRight: 8,
  },
  ghostBtn: {
    background: "transparent",
    color: "#2b8a3e",
    border: "1px solid #2b8a3e",
    padding: "8px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
  storeContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 18px",
    borderBottom: "1px solid #eee",
    background: "#fff",
  },
  headerActions: {
    display: "flex",
    gap: 12,
    alignItems: "center",
  },
  select: {
    padding: "6px 8px",
    borderRadius: 6,
    border: "1px solid #ddd",
  },
  counterBtn: {
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
  },
  main: {
    display: "flex",
    gap: 18,
    padding: 18,
    alignItems: "flex-start",
  },
  racks: {
    width: 160,
    background: "#fff",
    padding: 12,
    borderRadius: 8,
    boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
  },
  rackItem: {
    padding: "8px 10px",
    borderRadius: 6,
    cursor: "pointer",
    marginBottom: 6,
  },
  rackActive: {
    padding: "8px 10px",
    borderRadius: 6,
    cursor: "pointer",
    marginBottom: 6,
    background: "#e8f8ea",
    border: "1px solid #cfe9cf",
    fontWeight: 700,
  },
  products: {
    flex: 1,
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 16,
  },
  card: {
    background: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
    display: "flex",
    flexDirection: "column",
  },
  cardImageWrap: {
    height: 160,
    overflow: "hidden",
    background: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  cardImagePlaceholder: {
    color: "#999",
  },
  smallBtn: {
    padding: "6px 10px",
    borderRadius: 6,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
  },
  cart: {
    width: 300,
    background: "#fff",
    padding: 12,
    borderRadius: 8,
    boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    height: 420,
    overflow: "auto",
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 6px",
    borderBottom: "1px solid #f0f0f0",
  },
  receptionOverlay: {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.4)",
  },
  receptionCard: {
    width: 720,
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
  },
  input: {
    width: "100%",
    padding: 8,
    marginTop: 8,
    borderRadius: 6,
    border: "1px solid #ddd",
  },
  textarea: {
    width: "100%",
    padding: 8,
    marginTop: 8,
    borderRadius: 6,
    border: "1px solid #ddd",
    minHeight: 80,
  },
  footer: {
    marginTop: "auto",
    padding: 16,
    textAlign: "center",
    fontSize: 13,
    color: "#666",
    background: "#fff",
    borderTop: "1px solid #eee",
  }
};
