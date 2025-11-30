import React from "react";
import SiteInfo from "../components/SiteInfo";

export default function ContactPage() {
  return (
    <div style={{maxWidth:900, margin:"36px auto", padding:"0 16px"}}>
      <h1>Contact — Chauhan Organic Store</h1>
      <div style={{display:"grid", gridTemplateColumns:"1fr 340px", gap:20, marginTop:18}}>
        <div style={{padding:16, borderRadius:12, boxShadow:"0 6px 20px rgba(0,0,0,0.06)", background:"#fff"}}>
          <h3>Get in touch</h3>
          <p>Owner: <strong>Vijay Chauhan</strong></p>
          <p>Address: Panipat, Haryana 132103</p>
          <p>Email: <a href="mailto:vijaychauhan200104@gmail.com">vijaychauhan200104@gmail.com</a></p>

          <form style={{marginTop:12}} onSubmit={(e)=>{e.preventDefault(); alert("Thank you — form submit simulated.");}}>
            <div style={{display:"grid", gap:8}}>
              <input placeholder="Your name" required style={{padding:8, borderRadius:6, border:"1px solid #ddd"}}/>
              <input type="email" placeholder="Your email" required style={{padding:8, borderRadius:6, border:"1px solid #ddd"}}/>
              <textarea placeholder="Message" rows="5" style={{padding:8, borderRadius:6, border:"1px solid #ddd"}}></textarea>
              <button type="submit" style={{padding:"10px 12px", borderRadius:8, background:"#0b74ff", color:"#fff", border:"none"}}>Send</button>
            </div>
          </form>
        </div>

        <aside>
          <SiteInfo />
        </aside>
      </div>
    </div>
  );
}
