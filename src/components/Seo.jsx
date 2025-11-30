import React, { useEffect } from "react";

function upsertMeta(attrName, attrValue, content) {
  let selector = `meta[${attrName}="${attrValue}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content || "");
}

export default function Seo({ title, description, url, image, schema }) {
  useEffect(() => {
    if (title) document.title = title;

    // standard meta
    upsertMeta("name", "description", description || "");
    // Open Graph
    upsertMeta("property", "og:title", title || "");
    upsertMeta("property", "og:description", description || "");
    upsertMeta("property", "og:type", "website");
    if (url) upsertMeta("property", "og:url", url);
    if (image) upsertMeta("property", "og:image", image);

    // Twitter
    upsertMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
    upsertMeta("name", "twitter:title", title || "");
    upsertMeta("name", "twitter:description", description || "");
    if (image) upsertMeta("name", "twitter:image", image);

    // canonical link
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical && url) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    if (canonical && url) canonical.setAttribute("href", url);

    // JSON-LD schema injection
    if (schema) {
      let id = "seo-jsonld";
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = id;
        document.head.appendChild(script);
      }
      try {
        script.text = JSON.stringify(schema);
      } catch (e) {
        // ignore
      }
    }

    // cleanup is optional — we keep tags for SPA navigation
  }, [title, description, url, image, schema]);

  return null;
}
