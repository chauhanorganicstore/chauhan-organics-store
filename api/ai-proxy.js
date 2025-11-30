// api/ai-proxy.js
// Simple serverless proxy for OpenAI Chat completions (Node 18+ / Vercel)
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");
  const body = req.body || {};
  const { messages, max_tokens = 400 } = body;
  if (!messages) return res.status(400).json({ error: "messages required" });

  const OPENAI_KEY = process.env.OPENAI_API_KEY || process.env.OPENAI_KEY;
  if (!OPENAI_KEY) {
    return res.status(500).json({ error: "OPENAI_API_KEY not configured in environment." });
  }

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // use desired model name available to you
        messages,
        max_tokens
      })
    });
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (err) {
    console.error("AI proxy error:", err);
    return res.status(500).json({ error: "AI proxy failed", details: String(err) });
  }
}
