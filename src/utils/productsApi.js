export async function fetchProducts(){
  const r = await fetch("/products.json");
  if(!r.ok) throw new Error("Failed");
  return r.json();
}
export async function commitProducts(products, password){
  const r = await fetch("/api/update-products", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ products, password }) });
  const j = await r.json();
  if(!r.ok) throw new Error(j.message || "Commit failed");
  return j;
}
