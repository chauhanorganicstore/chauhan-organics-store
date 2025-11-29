import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

/**
 * Simple ProductList: reads /products.json (or public/products.json) and renders grid of ProductCard
 */
export default function ProductList(){
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("/products.json")
      .then(r => r.ok ? r.json() : Promise.reject("no products"))
      .then(data => { if (mounted) setProducts(Array.isArray(data) ? data : []); })
      .catch(() => { if (mounted) setProducts([]); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  if (loading) return <div style={{padding:20}}>Loading products...</div>;
  if (!products || products.length === 0) return <div style={{padding:20}}>No products found.</div>;

  return (
    <div style={{padding:12}}>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:12}}>
        {(products || []).map(p => (
          <ProductCard key={p?.id || JSON.stringify(p).slice(0,8)} product={p} />
        ))}
      </div>
    </div>
  );
}
