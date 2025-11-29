import React, {useEffect, useState} from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Filters from "./components/Filters";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";
import "./styles.css";

export default function App(){
  const [products,setProducts] = useState([]);
  const [cat,setCat] = useState("");
  const [categories,setCategories] = useState([]);

  useEffect(()=>{
    // read REMOTE_PRODUCTS_URL env (set in Vercel) or fallback to local file
    const url = import.meta.env.VITE_REMOTE_PRODUCTS_URL || "__FALLBACK__";
    const raw = url && url !== "__FALLBACK__"
      ? url
      : "/products.json"; // local fallback

    fetch(raw).then(r=>{
      if(!r.ok) throw new Error("no products");
      return r.json();
    }).then(data=>{
      setProducts(data);
      const cats = Array.from(new Set(data.map(p=>p.category))).filter(Boolean);
      setCategories(cats);
    }).catch(err=>{
      // try local fallback
      console.warn("Fetch failed, trying local", err);
      fetch("/products.json").then(r=>r.json()).then(data=>{
        setProducts(data);
        setCategories(Array.from(new Set(data.map(p=>p.category))));
      }).catch(e=>console.error(e));
    })
  },[])

  const filtered = cat ? products.filter(p=>p.category===cat) : products;

  return (
    <div>
      <Header />
      <Hero />
      <Filters categories={categories} selected={cat} setSelected={setCat} />
      <div className="container" id="products">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <h3>Products ({filtered.length})</h3>
        </div>
        <div className="grid" style={{marginTop:12}}>
          {filtered.map(p=> <ProductCard key={p.id} p={p} />)}
        </div>
      </div>

      <a className="whatsapp-fab" href="https://wa.me/919306328256?text=Hi%20I%20want%20to%20know%20more" target="_blank" rel="noreferrer">
        <svg height="22" viewBox="0 0 24 24" width="22" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M20.52 3.48A11.9 11.9 0 0012 0C5.37 0 .08 4.86.08 10.86c0 1.91.52 3.69 1.43 5.29L0 24l7.28-1.9c1.6.87 3.36 1.35 5.22 1.35 6.63 0 11.92-4.86 11.92-10.86 0-2.96-1.25-5.66-3.2-7.81z"/></svg>
      </a>

      <Footer />
    </div>
  )
}
