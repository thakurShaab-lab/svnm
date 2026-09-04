// app/blog/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, updates, and technical articles from SV Nanometrology Pvt. Ltd. on precision measurement, metrology equipment, and industry trends.",
  keywords: [
    "SV Nanometrology Blog",
    "Metrology Articles",
    "Precision Measurement Insights",
    "Nanometrology News",
  ],
  openGraph: {
    title: "Blog | SV Nanometrology Pvt. Ltd.",
    description:
      "Insights, updates, and technical articles from SV Nanometrology Pvt. Ltd. on precision measurement, metrology equipment, and industry trends.",
    url: "https://www.svnanometrology.com/blog",
    siteName: "SV Nanometrology Pvt. Ltd.",
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://www.svnanometrology.com/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
