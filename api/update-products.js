// api/update-products.js
const base64 = (s) => Buffer.from(s, "utf8").toString("base64");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST" });
  try {
    const body = await new Promise((r, rej) => {
      let data = "";
      req.on("data", chunk => data += chunk);
      req.on("end", () => r(JSON.parse(data)));
      req.on("error", e => rej(e));
    });

    const { products, password } = body;
    if (!products) return res.status(400).json({ error: "Missing products" });

    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_REPO = process.env.GITHUB_REPO; // e.g. "owner/repo"
    const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";
    const TARGET_PATH = process.env.GITHUB_PRODUCTS_PATH || "products.json";

    if (!ADMIN_PASSWORD || !GITHUB_TOKEN || !GITHUB_REPO) {
      return res.status(500).json({ error: "Server not configured (missing env vars)" });
    }
    if (password !== ADMIN_PASSWORD) return res.status(401).json({ error: "Unauthorized" });

    const apiBase = "https://api.github.com";
    const [owner, repo] = GITHUB_REPO.split("/");

    const headers = {
      "Authorization": `token ${GITHUB_TOKEN}`,
      "User-Agent": "products-updater",
      "Accept": "application/vnd.github.v3+json"
    };

    const fileUrl = `${apiBase}/repos/${owner}/${repo}/contents/${encodeURIComponent(TARGET_PATH)}?ref=${encodeURIComponent(GITHUB_BRANCH)}`;
    const getRes = await fetch(fileUrl, { headers });
    let sha = null;
    if (getRes.status === 200) {
      const js = await getRes.json();
      sha = js.sha;
    } else {
      if (getRes.status !== 404) {
        const text = await getRes.text();
        return res.status(502).json({ error: "GitHub GET file error", status: getRes.status, body: text });
      }
    }

    const contentString = JSON.stringify(products, null, 2);
    const b64 = base64(contentString);
    const commitMessage = `chore: update products.json from admin (${new Date().toISOString()})`;

    const putBody = {
      message: commitMessage,
      content: b64,
      branch: GITHUB_BRANCH
    };
    if (sha) putBody.sha = sha;

    const putUrl = `${apiBase}/repos/${owner}/${repo}/contents/${encodeURIComponent(TARGET_PATH)}`;

    const putRes = await fetch(putUrl, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify(putBody)
    });

    const putJson = await putRes.json();
    if (putRes.status >= 400) {
      return res.status(502).json({ error: "GitHub PUT error", status: putRes.status, body: putJson });
    }

    return res.status(200).json({ ok: true, commit: putJson.commit ? putJson.commit.sha : null });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "server error", detail: err && err.message });
  }
};
