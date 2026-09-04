import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins, Montserrat } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer";
import { getNavigationData } from "@/lib/navigation";
import type { NavigationData } from "@/app/types/types";
// import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { Analytics } from "@vercel/analytics/next"

const siteUrl = "https://www.svnanometrology.com";

// export const metadata: Metadata = {
//   title: "SV Nanometrology Pvt. Ltd. - Precision Measurement Solutions",
//   description:
//     "Leading provider of Precision Dimension Calibration Services and offering highly precise Gauging Solutions.",
//   metadataBase: new URL(siteUrl),
//   icons: {
//     icon: "/favicon.ico",
//     apple: "/apple-touch-icon.png",
//   },
//   keywords: [
//     "SV Nanometrology",
//     "Thread Gauges",
//     "Air Gauges",
//     "Air Gauge Unit",
//     "Special Gauges",
//     "Calibration Services",
//     "Dimensional Calibration",
//     "Faridabad",
//     "India",
//     "Gauge Manufacturer",
//     "NABL Accredited",
//     "Calibration Lab",
//     "Delhi",
//     "New Delhi",
//     "Delhi NCR",
//     "Haryana",
//     "North India",
//     "Make in India",
//   ],
//   authors: [{ name: "SV Nanometrology Pvt. Ltd." }],
//   robots: {
//     index: true,
//     follow: true,
//   },
//   alternates: {
//     canonical: siteUrl,
//   },
//   openGraph: {
//     type: "website",
//     title: "SV Nanometrology Pvt. Ltd.",
//     description: "Leading provider of Precision Dimension Calibration Services and offering highly precise Gauging Solutions.",
//     url: siteUrl,
//     siteName: "SV Nanometrology",
//     images: [
//       {
//         url: "/images/logo-og.png",
//         width: 1200,
//         height: 630,
//         alt: "SV Nanometrology Logo",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "SV Nanometrology Pvt. Ltd. - Precision Measurement Solutions",
//     description:
//       "Leading provider of Precision Dimension Calibration Services and offering highly precise Gauging Solutions.",
//     images: ["/images/logo.png"],
//   },
// };

// Fonts
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SV Nanometrology Pvt. Ltd. | Precision Measurement Solutions",
    template: "%s | SV Nanometrology Pvt. Ltd.",
  },
  description:
    "SV Nanometrology Pvt. Ltd. is a leading NABL-accredited calibration laboratory and manufacturer of precision gauges, offering dimensional calibration, air gauges, thread gauges, and customized gauging solutions across India.",
  keywords: [
    "SV Nanometrology",
    "precision measurement",
    "calibration services",
    "dimensional calibration",
    "taper plug gauges",
    "ring gauges",
    "thread gauges",
    "air gauges",
    "air gauge unit",
    "gauge manufacturer",
    "NABL accredited laboratory",
    "ISO 17025 certification",
    "Faridabad",
    "Delhi NCR",
    "India",
    "gauge calibration",
    "industrial metrology",
    "Make in India",
  ],
  authors: [{ name: "SV Nanometrology Pvt. Ltd.", url: siteUrl }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title:
      "SV Nanometrology Pvt. Ltd. | Precision Measurement & Calibration Experts",
    description:
      "Trusted provider of precision measurement instruments and NABL-certified calibration services, serving manufacturing industries across India.",
    siteName: "SV Nanometrology Pvt. Ltd.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SV Nanometrology Pvt. Ltd.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@svnanometrology",
    title:
      "SV Nanometrology Pvt. Ltd. | Precision Measurement & Calibration Experts",
    description:
      "ISO 17025:2017 certified provider of precision gauges, air gauges, and calibration solutions across India.",
    images: ["/images/logo-og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

// JSON-LD component
// const JsonLd = () => (
//   <script
//     type="application/ld+json"
//     dangerouslySetInnerHTML={{
//       __html: JSON.stringify({
//         "@context": "https://schema.org",
//         "@type": "Organization",
//         name: "SV Nanometrology Pvt. Ltd.",
//         url: siteUrl,
//         logo: `${siteUrl}/images/logo.png`,
//         sameAs: [
//           "https://www.linkedin.com/company/svengineeringcentre/",
//           "https://twitter.com/svnanometrology",
//         ],
//       }),
//     }}
//   />
// );

const JsonLd = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Corporation",

        "@id": `${siteUrl}#organization`,

        name: "SV Nanometrology Pvt. Ltd.",

        legalName: "SV Nanometrology Pvt. Ltd.",

        url: siteUrl,

        logo: `${siteUrl}/images/logo.png`,

        image: `${siteUrl}/images/og-image.jpg`,

        description:
          "SV Nanometrology Pvt. Ltd. is a leading manufacturer of precision gauges and a NABL-accredited calibration laboratory providing dimensional calibration and industrial metrology solutions across India.",

        foundingDate: "1999",

        founders: [
          {
            "@type": "Person",
            name: "Mr. M.L. Mangal",
          },
          {
            "@type": "Person",
            name: "Mr. Nilesh Mangal",
          },
        ],

        slogan: "Precision Measurement & Calibration Solutions",

        email: "info@svnanometrology.com",

        telephone: "+919873267048",

        address: {
          "@type": "PostalAddress",
          streetAddress:
            "Plot No. E-3, Friends Industrial Complex, Sanjay Colony, Sector 23",
          addressLocality: "Faridabad",
          addressRegion: "Haryana",
          postalCode: "121005",
          addressCountry: "IN",
        },

        areaServed: {
          "@type": "Country",
          name: "India",
        },

        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+919873267048",
          email: "info@svnanometrology.com",
          contactType: "Customer Service",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
        },

        sameAs: [
          "https://www.linkedin.com/company/svengineeringcentre/",
        ],

        knowsAbout: [
          "Dimensional Calibration",
          "Precision Gauges",
          "Thread Gauges",
          "Ring Gauges",
          "Plain Plug Gauges",
          "Snap Gauges",
          "Air Gauges",
          "Air Gauge Units",
          "Gauge Calibration",
          "Industrial Metrology",
          "NABL Calibration",
          "ISO 17025",
        ],

        makesOffer: {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Precision Dimensional Calibration Services",
          },
        },
      }),
    }}
  />
);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let navArray : any[] = [];
  
  try {
    navArray = await getNavigationData();
  } catch (error) {
    console.warn("Failed to fetch navigation data during static prerender:", error);
    navArray = []; // Provide a fallback array so the build finishes successfully
  }
  
  const navData: NavigationData = { mainNav: navArray }; // wrap in object

  // const navData: NavigationData = await getNavigationData(); // ✅ fetch server-side

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable} ${montserrat.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="language" content="English" />
        <JsonLd />
      </head>
      <body className="font-sans bg-neutral-50 overflow-x-hidden">
        {/* <JsonLd /> */}
        <Navbar navigationData={navData} />
        <main className="min-h-screen bg-neutral-50 relative">
          {children}
          <WhatsAppButton />
        </main>
        <Footer />
        <GoogleAnalytics gaId="G-0LTPRCPHEZ" />
        <Analytics/>
      </body>
    </html>
  );
}
