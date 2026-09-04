// app/contact/layout.tsx
import { Metadata } from "next";

export const metadata : Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with SV Nanometrology for precision measurement instruments, calibration, and support. Located in Faridabad, Haryana, India.",
  keywords: [
    "Contact SV Nanometrology",
    "Metrology Instruments Support",
    "Precision Measurement Solutions",
    "Calibration Services India",
    "SV Nanometrology Contact",
    "Faridabad Measurement Instruments",
  ],
  openGraph: {
    title: "Contact SV Nanometrology Pvt. Ltd.",
    description:
      "Reach our team for product inquiries, calibration services, or technical support.",
    url: "https://www.svnanometrology.com/contact",
    siteName: "SV Nanometrology Pvt. Ltd.",
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://www.svnanometrology.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
