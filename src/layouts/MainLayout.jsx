import React from "react";
import AIChatbot from "../components/AIChatbot";
import ProductRecommendation from "../components/ProductRecommendation";
import ProductDescriptionGenerator from "../components/ProductDescriptionGenerator";

export default function MainLayout({ children, isAdmin, product, products }) {
  return (
    <div className="app-root">
      <header>{/* आपका हेडर */}</header>

      <main>
        {children}

        {product && <ProductRecommendation product={product} products={products} />}

        <AIChatbot />

        {isAdmin && (
          <ProductDescriptionGenerator
            product={product}
            onSaveText={(txt) => {
              console.log("Saved description:", txt);
            }}
          />
        )}
      </main>

      <footer>{/* फुटर */}</footer>
    </div>
  );
}
