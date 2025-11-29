 import React, { useState, useEffect } from "react";

// ======================================================================
// CONFIG
// ======================================================================

// लाइटवेट Cloud JSON URL (बाद में Vercel पर सेट करेंगे)
const REMOTE_PRODUCTS_URL = window.__REMOTE_PRODUCTS_URL__ || "";

// WhatsApp नंबर + Email
const WHATSAPP_NUMBER = "919306328256";
const CONTACT_EMAIL = "vijaychauhan200104@gmail.com";

// Storage Key
const STORAGE_KEY = "organicstore_products_v1";

export default function App() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);

  // ======================================================================
  // LOAD PRODUCTS (Cloud → Local Fallback)
  // ======================================================================
  useEffect(() => {
    async function load() {
      try {
        if (REMOTE_PRODUCTS_URL) {
          const r = await fetch(REMOTE_PRODUCTS_URL);
          const json = await r.json();
          setProducts(json);
          return;
        }
      } catch (e) {
        console.log("Cloud failed, loading localStorage");
      }

      // Fallback localStorage
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProducts(JSON.parse(raw));
      else setProducts(defaultProducts);
    }

    load();
  }, []);

  // ======================================================================
  // SEO TAGS (automatic)
  // ======================================================================
  useEffect(() => {
    document.title = "OrganicStore — Partner-sourced Organic Products";

    function meta(name, content, prop = false) {
      let el = prop
        ? document.querySelector(`meta[property="${name}"]`)
        : document.querySelector(`meta[name="${name}"]`);

      if (!el) {
        el = document.createElement("meta");
        if (prop) el.setAttribute("property", name);
        else el.setAttribute("name", name);
        document.head.appendChild(el);
      }

      el.setAttribute("content", content);
    }

    meta(
      "description",
      "Curated organic products catalog — partner sourced — no stock model."
    );
    meta("og:title", "OrganicStore — Organic Products", true);
    meta(
      "og:description",
      "Curated organic products — millet, jaggery, oil & more.",
      true
    );
    meta(
      "og:image",
      "https://via.placeholder.com/1200x630.png?text=OrganicStore",
      true
    );
    meta("twitter:card", "summary_large_image");
  }, []);

  // ======================================================================
  // RENDER
  // ======================================================================
  return (
    <div style={{ background: "#f6f6f6", minHeight: "100vh" }}>
      <Header />

      <Hero />

      <ProductList products={products} setSelected={setSelected} />

      <AdminPanel products={products} setProducts={setProducts} />

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20I%20want%20to%20know%20about%20your%20organic%20products`}
        target="_blank"
        rel="noreferrer"
        style={{
          position: "fixed",
          right: 20,
          bottom: 20,
          background: "#25D366",
          color: "white",
          padding: 15,
          borderRadius: "50%",
          zIndex: 100,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        WA
      </a>

      <Footer />

      {selected && (
        <QuickView selected={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

// ======================================================================
// HEADER
// ======================================================================
function Header() {
  return (
    <header
      style={{
        background: "white",
        padding: 15,
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid #eee",
      }}
    >
      <h2 style={{ margin: 0 }}>OrganicStore</h2>
      <p style={{ margin: 0, fontSize: 12 }}>Pure • Local • Partner sourced</p>
    </header>
  );
}

// ======================================================================
// HERO
// ======================================================================
function Hero() {
  return (
    <section
      style={{
        padding: 20,
        textAlign: "center",
        background: "white",
        margin: "20px",
        borderRadius: 8,
      }}
    >
      <h1>Organic Store — No Stock Required</h1>
      <p style={{ maxWidth: 600, margin: "10px auto" }}>
        A curated catalog of organic products, fulfilled by partners. You earn
        referral commission — no stocking, no risk.
      </p>
    </section>
  );
}

// ======================================================================
// PRODUCT LIST
// ======================================================================
function ProductList({ products, setSelected }) {
  return (
    <section style={{ padding: 20 }}>
      <h2>Products ({products.length})</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
          gap: 15,
          marginTop: 15,
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              background: "white",
              borderRadius: 8,
              padding: 10,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={p.img}
              alt={p.title}
              style={{ width: "100%", height: 160, objectFit: "cover" }}
            />

            <h3>{p.title}</h3>
            <p style={{ margin: 0, color: "#666" }}>{p.category}</p>
            <p style={{ fontWeight: "bold" }}>{p.price}</p>

            <button
              onClick={() => setSelected(p)}
              style={{
                padding: "6px 10px",
                background: "#eee",
                border: 0,
                borderRadius: 5,
              }}
            >
              View
            </button>
            <a
              href={p.partnerUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "6px 10px",
                background: "#ffc400",
                marginLeft: 6,
                textDecoration: "none",
                borderRadius: 5,
                color: "black",
              }}
            >
              Buy
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

// ======================================================================
// QUICK VIEW MODAL
// ======================================================================
function QuickView({ selected, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: 20,
          maxWidth: 500,
          borderRadius: 8,
        }}
      >
        <img
          src={selected.img}
          style={{ width: "100%", height: 200, objectFit: "cover" }}
        />
        <h2>{selected.title}</h2>
        <p>{selected.price}</p>
        <p>{selected.desc}</p>

        <a
          href={selected.partnerUrl}
          target="_blank"
          rel="noreferrer"
          style={{ padding: 10, background: "green", color: "white" }}
        >
          Buy Now
        </a>

        <button
          onClick={onClose}
          style={{
            padding: 10,
            marginLeft: 10,
            background: "#ccc",
            border: 0,
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

// ======================================================================
// ADMIN PANEL
// ======================================================================
function AdminPanel({ products, setProducts }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  function save(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    setProducts(list);
    alert("Saved!");
  }

  function addNew() {
    const item = {
      id: Date.now(),
      title: "New Product",
      category: "General",
      price: "₹0",
      img: "",
      desc: "",
      partnerUrl: "#",
    };
    save([item, ...products]);
  }

  function remove(id) {
    if (!confirm("Delete?")) return;
    save(products.filter((p) => p.id !== id));
  }

  return (
    <>
      <button
        onClick={() => {
          const p = prompt("Enter password:");
          if (p === "admin") setOpen(true);
        }}
        style={{
          position: "fixed",
          right: 20,
          top: 20,
          padding: 10,
          background: "white",
        }}
      >
        ⚙
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <div
            style={{ background: "white", padding: 20, borderRadius: 8, width: 800 }}
          >
            <h2>Admin Panel</h2>

            <button onClick={addNew} style={{ marginBottom: 10 }}>
              + Add Product
            </button>

            <table width="100%">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.title}</td>
                    <td>{p.price}</td>
                    <td>
                      <button onClick={() => setEditing(p)}>Edit</button>
                      <button onClick={() => remove(p.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {editing && (
              <EditForm
                editing={editing}
                close={() => setEditing(null)}
                save={save}
                list={products}
              />
            )}

            <button onClick={() => setOpen(false)} style={{ marginTop: 20 }}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ======================================================================
// EDIT FORM
// ======================================================================
function EditForm({ editing, close, save, list }) {
  function update(field, value) {
    editing[field] = value;
    save([...list]);
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Edit: {editing.title}</h3>

      <input
        value={editing.title}
        onChange={(e) => update("title", e.target.value)}
        placeholder="Title"
      />
      <br />
      <input
        value={editing.price}
        onChange={(e) => update("price", e.target.value)}
        placeholder="Price"
      />
      <br />
      <input
        value={editing.img}
        onChange={(e) => update("img", e.target.value)}
        placeholder="Image URL"
      />
      <br />
      <textarea
        value={editing.desc}
        onChange={(e) => update("desc", e.target.value)}
        placeholder="Description"
      />
      <br />
      <button onClick={close}>Close</button>
    </div>
  );
}

// ======================================================================
// FOOTER
// ======================================================================
function Footer() {
  return (
    <footer style={{ padding: 20, textAlign: "center", marginTop: 40 }}>
      <p>© {new Date().getFullYear()} OrganicStore — Partner listings</p>
      <p>Contact: {CONTACT_EMAIL}</p>
    </footer>
  );
}

// ======================================================================
// DEFAULT PRODUCTS (fallback)
// ======================================================================
const defaultProducts = [
  {
    id: 1,
    title: "Organic Jaggery Powder",
    category: "Sweeteners",
    price: "₹240 / 500g",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    partnerUrl: "#",
    desc: "Pure organic jaggery made from sugarcane.",
  },
];

