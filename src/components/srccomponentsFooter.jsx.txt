import React from "react";
export default function Footer(){
  return (
    <footer className="container footer">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          © {new Date().getFullYear()} OrganicStore — Partner-sourced.
        </div>
        <div style={{color:"#666"}}>Made with ❤️ • Contact: vijaychauhan200104@gmail.com</div>
      </div>
    </footer>
  )
}
