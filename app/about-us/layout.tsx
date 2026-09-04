import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "About SV Nanometrology | ISO 17025 Calibration Experts",
//   description:
//     "Learn about SV Nanometrology Pvt Ltd, pioneers in ISO 17025 accredited calibration and precision measurement solutions in India.",
//   alternates: { canonical: "https://www.svnanometrology.com/about" },
//   openGraph: {
//     title: "About SV Nanometrology | ISO 17025 Calibration Experts",
//     description:
//       "Discover SV Nanometrology Pvt Ltd’s journey in precision measurement and calibration excellence since 1999.",
//     url: "https://www.svnanometrology.com/about",
//     images: [
//       {
//         url: "/images/og-about.jpg",
//         width: 1200,
//         height: 630,
//         alt: "SV Nanometrology Calibration Facility",
//       },
//     ],
//   },
//   robots: "index, follow",
//   keywords: [
//     "SV Nanometrology",
//     "ISO 17025 calibration",
//     "Precision Gauging",
//     "Calibration Laboratory India",
//     "Faridabad NABL Accredited",
//     "Thread Gauges",
//     "Measurement Solutions",
//   ],
// };
export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SV Nanometrology Pvt Ltd, a leader in precision measurement and ISO 17025-accredited calibration services since 1999.",
  alternates: {
    canonical: "https://www.svnanometrology.com/about-us",
  },
  openGraph: {
    type: "website",
    url: "https://www.svnanometrology.com/about-us",
    title: "About SV Nanometrology | ISO 17025 Calibration Experts",
    description:
      "Learn about SV Nanometrology Pvt Ltd, a leader in precision measurement and ISO 17025-accredited calibration services since 1999.",
    siteName: "SV Nanometrology Pvt. Ltd.",
    images: [
      {
        url: "/images/logo-og.png",
        width: 1200,
        height: 630,
        alt: "SV Nanometrology Office & Facility",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About SV Nanometrology | ISO 17025 Calibration Experts",
    description:
      "Discover the story and people behind SV Nanometrology Pvt Ltd, pioneers in precision measurement and calibration.",
    images: ["/images/logo-og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "SV Nanometrology",
    "ISO 17025 Calibration",
    "Gauge Manufacturer",
    "Precision Measurement",
    "Faridabad Calibration Lab",
    "NABL Accredited Lab",
    "Dimensional Calibration",
    "Engineering Gauges",
    "Thread Gauges",
    "Air Gauges",
    "Special Gauges",
    "India",
  ],
  authors: [{ name: "SV Nanometrology Pvt. Ltd." }],
  metadataBase: new URL("https://www.svnanometrology.com"),
};
export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
