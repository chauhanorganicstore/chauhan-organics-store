import React, { useState } from "react";

export default function AIChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input) return;

    const userMsg = { from: "user", text: input };
    setMessages([...messages, userMsg]);

    const res = await fetch("/api/ai-proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input })
    });

    const data = await res.json();
    const botMsg = { from: "bot", text: data.reply };

    setMessages((prev) => [...prev, botMsg]);
    setInput("");
  }

  return (
    <div style={{ padding: 10, border: "1px solid #777", marginTop: 20 }}>
      <h3>AI Chatbot</h3>
      <div style={{ maxHeight: 200, overflowY: "auto", marginBottom: 10 }}>
        {messages.map((m, i) => (
          <p key={i}><b>{m.from}:</b> {m.text}</p>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
