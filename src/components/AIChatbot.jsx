// src/components/AIChatbot.jsx
import React, { useState } from "react";
import { aiChat } from "../utils/ai";

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "system", content: "You are GROK: helpful assistant for Chauhan Organics. Only recommend sugarcane products, A2 ghee, flours, pulses, dryfruits, and oils." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput(""); setLoading(true);
    try {
      const { text } = await aiChat(next);
      setMessages(prev => [...prev, { role: "assistant", content: text }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry — assistant error: " + e.message }]);
    } finally { setLoading(false); }
  }

  return (
    <div style={{ position:"fixed", right:20, bottom:20, zIndex:9999 }}>
      {open ? (
        <div style={{ width:340, height:420, boxShadow:"0 8px 30px rgba(0,0,0,0.2)", borderRadius:12, overflow:"hidden", display:"flex", flexDirection:"column", background:"#fff" }}>
          <div style={{ padding:10, borderBottom:"1px solid #eee", fontWeight:700 }}>GROK — Shop Assistant</div>
          <div style={{ padding:10, flex:1, overflowY:"auto" }}>
            {messages.filter(m=>m.role!=="system").map((m,i)=>(
              <div key={i} style={{ marginBottom:8 }}>
                <div style={{ fontSize:12, color:"#666" }}>{m.role}</div>
                <div style={{ background: m.role==="assistant"?"#f3f7ff":"#f7f7f7", padding:8, borderRadius:8 }}>{m.content}</div>
              </div>
            ))}
          </div>
          <div style={{ padding:8, borderTop:"1px solid #eee", display:"flex", gap:8 }}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==="Enter"){ send() } }} style={{ flex:1, padding:8, borderRadius:6, border:"1px solid #ddd" }} placeholder="Ask about products, diet, offers..." />
            <button onClick={send} disabled={loading} style={{ padding:"8px 12px", borderRadius:6 }}>Send</button>
            <button onClick={()=>setOpen(false)} style={{ padding:"8px", borderRadius:6 }}>?</button>
          </div>
        </div>
      ) : (
        <button onClick={()=>setOpen(true)} style={{ width:60, height:60, borderRadius:30, background:"#0b74ff", color:"#fff", fontWeight:700, boxShadow:"0 6px 18px rgba(11,116,255,0.25)" }}>G</button>
      )}
    </div>
  );
}
