/**
 * api/update-products.js
 * POST { products: [...], password: "xxx" }
 * Uses env:
 *   GITHUB_TOKEN (personal access token),
 *   GITHUB_REPO (owner/repo),
 *   GITHUB_BRANCH (branch e.g. main),
 *   GITHUB_PRODUCTS_PATH (path to file e.g. public/products.json),
 *   ADMIN_PASSWORD (expected password)
 */
const fetch = (...args) => import("node-fetch").then(({default:fetch})=>fetch(...args));

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({message:"Method not allowed"});
  const { products, password } = req.body || {};
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Unauthorized - invalid password" });
  }
  if (!products || !Array.isArray(products)) {
    return res.status(400).json({ message: "Missing products array" });
  }
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";
  const path = process.env.GITHUB_PRODUCTS_PATH || "public/products.json";

  if (!token || !repo) return res.status(500).json({ message: "Server misconfigured: missing GITHUB_TOKEN or GITHUB_REPO" });

  try {
    const apiBase = "https://api.github.com";
    const [owner, repoName] = repo.split("/");
    // 1) get existing file to obtain sha (if exists)
    const getUrl = `${apiBase}/repos/${owner}/${repoName}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`;
    const getRes = await fetch(getUrl, { headers: { Authorization: `token ${token}`, "User-Agent":"update-products-script" } });
    let sha = null;
    if (getRes.status === 200) {
      const getJson = await getRes.json();
      sha = getJson.sha;
    }
    // 2) prepare content
    const contentStr = JSON.stringify(products, null, 2);
    const contentB64 = Buffer.from(contentStr, "utf8").toString("base64");
    const commitUrl = `${apiBase}/repos/${owner}/${repoName}/contents/${encodeURIComponent(path)}`;
    const body = {
      message: `chore: update products.json via admin UI`,
      content: contentB64,
      branch: branch
    };
    if (sha) body.sha = sha;
    const putRes = await fetch(commitUrl, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        "User-Agent": "update-products-script",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    const putJson = await putRes.json();
    if (putRes.status >= 400) {
      return res.status(500).json({ message: "GitHub commit failed", detail: putJson });
    }
    return res.status(200).json({ message: "Committed", commit: putJson.commit?.sha || null });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal error", error: String(err) });
  }
}
