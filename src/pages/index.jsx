import React from "react";
import MainLayout from "../layouts/MainLayout";
import Seo from "../components/Seo";

export default function Home() {
  return (
    <MainLayout isAdmin={false}>
      <Seo title="Chauhan Organic Store — Virtual Visit" description="Enter our virtual store and explore curated organic products." />
      <div style={{maxWidth:1100, margin:"28px auto", padding:"0 16px"}}>
        <div style={{padding:28, borderRadius:12, background:"#fff", boxShadow:"0 12px 36px rgba(0,0,0,0.06)"}}>
          <h1 style={{margin:0}}>Welcome — Chauhan Organic Store</h1>
          <p style={{color:"#444"}}>Visit our virtual store in Panipat — enter the gate to feel like you are in a real shop.</p>
          <div style={{marginTop:12}}>
            <a href="/store" style={{padding:"10px 14px", borderRadius:8, background:"#0b74ff", color:"#fff", textDecoration:"none"}}>Enter Virtual Store</a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
