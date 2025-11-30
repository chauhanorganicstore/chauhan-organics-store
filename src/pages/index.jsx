import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import Seo from "../components/Seo";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/products_filtered.json")
      .then((r) => r.json())
      .then((d) => setProducts(d))
      .catch(() => setProducts([]);
  }, []);

  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <MainLayout isAdmin={false} product={null} products={products}>
      <Seo
        title="Chauhan Organic Store — Premium A2 Ghee, Atta, Pulses, Oils"
        description="Visit our virtual organic store — enter gate, walk through racks, explore pure A2 ghee, jaggery, pulses, dryfruits and oils."
      />

      <div style={{ maxWidth: 1200, margin: "24px auto", padding: "0 16px" }}>

        {!entered && (
          <div style={{
            background: "#fff",
            padding: 30,
            borderRadius: 16,
            boxShadow: "0 12px 40px rgba(0,0,0,0.08)"
          }}>
            <h1 style={{ margin: 0 }}>Welcome to Chauhan Organic Store 🟢</h1>
            <p style={{ color: "#444", maxWidth: 700 }}>
              Experience a virtual visit — like walking into a real organic store in Panipat.
            </p>

            <button
              onClick={() => setEntered(true)}
              style={{
                padding: "10px 18px",
                background: "#0b74ff",
                borderRadius: 10,
                color: "#fff",
                border: "none",
                marginTop: 12
              }}
            >
              Enter Store Gate →
            </button>
          </div>
        )}

        {entered && (
          <div style={{ marginTop: 28 }}>
            <h2>Store Racks</h2>
            <p style={{ color: "#666" }}>Explore categories — choose any rack.</p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 18,
                marginTop: 16
              }}
            >
              {categories.map((c) => (
                <div
                  key={c}
                  style={{
                    background: "#fff",
                    padding: 18,
                    borderRadius: 14,
                    boxShadow: "0 10px 32px rgba(0,0,0,0.06)"
                  }}
                >
                  <h3 style={{ textTransform: "capitalize" }}>{c}</h3>
                  <p style={{ color: "#666" }}>Click to view products.</p>

                  <a
                    href={`/products#${c}`}
                    style={{
                      padding: "8px 14px",
                      display: "inline-block",
                      background: "#0b74ff",
                      color: "#fff",
                      borderRadius: 10,
                      textDecoration: "none",
                      marginTop: 6
                    }}
                  >
                    Open Rack →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
