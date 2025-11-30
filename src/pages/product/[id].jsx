import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";

export default function ProductPage({ product, products }) {
  const [isAdmin] = useState(false);

  return (
    <MainLayout isAdmin={isAdmin} product={product} products={products}>
      <article>
        <h1>{product?.title}</h1>
        <p>{product?.description}</p>
      </article>
    </MainLayout>
  );
}
