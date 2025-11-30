import React, { useState } from "react";

export default function ProductDescriptionGenerator({ product, onSaveText }) {
  const [text, setText] = useState(product?.description || "");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    const res = await fetch("/api/ai-proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `Write a good product description for: ${product?.name}`
      })
    });

    const data = await res.json();
    setText(data.reply);
    setLoading(false);
  }

  return (
    <div style={{ border: "1px solid #aaa", padding: 10, marginTop: 20 }}>
      <h3>AI Description Generator</h3>
      <textarea
        rows="6"
        style={{ width: "100%" }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={generate} disabled={loading}>
        {loading ? "Generating..." : "Generate with AI"}
      </button>

      <button onClick={() => onSaveText(text)} style={{ marginLeft: 10 }}>
        Save
      </button>
    </div>
  );
}
