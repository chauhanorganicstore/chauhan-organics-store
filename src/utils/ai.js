// src/utils/ai.js
export async function aiChat(messages, max_tokens=400) {
  const res = await fetch("/api/ai-proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, max_tokens })
  });
  if (!res.ok) {
    const err = await res.json().catch(()=>({error:"unknown"}));
    throw new Error("AI error: " + (err.error || JSON.stringify(err)));
  }
  const data = await res.json();
  // return assistant text
  const text = data?.choices?.[0]?.message?.content || (data?.error?.message) || "";
  return { raw: data, text };
}
