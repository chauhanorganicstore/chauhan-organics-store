import React, {useEffect, useState} from "react";
import ProductCard from "./ProductCard";

export default function ProductList(){
  const [products,setProducts] = useState([]);
  useEffect(()=> {
    fetch("/products.json").then(r=>r.json()).then(d=> setProducts(Array.isArray(d)?d:[])).catch(()=> setProducts([]));
  },[]);
  return (
    <div>
      <div className="controls">
        <select className="select">
          <option>All categories</option>
        </select>
        <input className="search" placeholder="Search products..." />
      </div>
      <div className="grid">
        {(products || []).map(p => <ProductCard key={p.id || Math.random()} product={p} />)}
      </div>
    </div>
  );
}
