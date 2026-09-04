"use client";

export const ServiceSchema = ({ service }) => {
  if (!service) return null;

  const serviceSchema = {
    "@context": "https://schema.org/",
    "@type": "Service",
    name: service.name,
    description: service.description || service.summary || "",
    provider: {
      "@type": "Organization",
      name: "SV Nanometrology",
      sameAs: "https://www.svnanometrology.com",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    serviceType: service.category || "Calibration Services",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
    />
  );
};
