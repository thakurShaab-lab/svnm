"use client";

export const ProductSchema = ({ product }) => {
  if (!product) return null;

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    description: product.description || product.summary || "",
    sku: product.slug,
    image: product.image
      ? `https://www.svnanometrology.com/api/images/${product.image}`
      : null,
    brand: {
      "@type": "Brand",
      name: "SV Nanometrology",
    },
    category: product.category || "Industrial Equipment",
    offers: {
      "@type": "Offer",
      url: `https://www.svnanometrology.com/products/${product.slug}`,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
    />
  );
};
