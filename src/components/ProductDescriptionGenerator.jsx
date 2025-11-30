// src/components/ProductDescriptionGenerator.jsx
import React, { useState } from "react";
import { aiChat } from "../utils/ai";

export default function ProductDescriptionGenerator({ product, onSaveText }) {
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState("");

  async function generate() {
    setLoading(true);
    try {
      const prompt = `Write a short (40-70 words) SEO-friendly Hindi product description for the following organic product. Keep it persuasive and include keywords: organic, natural, healthy.\n\nProduct: ${product.title}\nCategory: ${product.category}\nFeatures: ${product.description || ""}\nPrice: ?${product.price} / ${product.unit}`;
      const messages = [{role:"system", content:"You are a helpful writing assistant."},{role:"user", content:prompt}];
      const { text } = await aiChat(messages, 300);
      setGenerated(text);
    } catch (e) {
      setGenerated("Error: " + e.message);
    } finally { setLoading(false); }
  }

  return (
    <div style={{ padding:8, background:"#fff", borderRadius:8 }}>
      <div style={{ display:"flex", gap:8 }}>
        <button onClick={generate} disabled={loading}>{loading ? "Generating..." : "Generate Description (AI)"}</button>
        <button onClick={()=>{ if(onSaveText && generated) onSaveText(generated) }}>Use & Save</button>
      </div>
      {generated ? <pre style={{ whiteSpace:"pre-wrap", marginTop:8 }}>{generated}</pre> : null}
    </div>
  );
}
