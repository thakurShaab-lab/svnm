// app/downloads/layout.tsx
import { Metadata } from "next";

export const metadata : Metadata = {
  title: "Our Services",
  description:
    "Access official documents, certificates, brochures, and company profiles from SV Nanometrology Pvt. Ltd.",
  keywords: [
    "SV Nanometrology Downloads",
    "Calibration Certificates",
    "NABL Certificate",
    "SVN Brochure",
    "Company Profile PDF",
    "Metrology Scope",
    "Quality Policy",
    "Mission Vision Document",
  ],
  openGraph: {
    title: "Services | SV Nanometrology Pvt. Ltd.",
    description:
      "Download official documents including brochures, NABL certificates, and quality policies.",
    url: "https://www.svnanometrology.com/services",
    siteName: "SV Nanometrology Pvt. Ltd.",
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://www.svnanometrology.com/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
