import { NavigationData } from "@/app/types/types";
import {
  getProductCategories,
  getServiceCategories,
} from "@/lib/mongoServices"; // adjust path

export async function getNavigationData(): Promise<NavigationData> {
  const productCategories = await getProductCategories();
  const serviceCategories = await getServiceCategories();

  return {
    mainNav: [
      { title: "Home", href: "/" },
      { title: "About Us", href: "/about-us" },
      {
        title: "Products",
        href: "/products", // ✅ root clickable
        children: productCategories.map((cat) => ({
          title: cat.title,
          children: cat.items.map((item) => ({
            title: item.name,
            href: item.href,
          })),
        })),
      },
      {
        title: "Services",
        href: "/services", // ✅ root clickable
        children: serviceCategories.map((cat) => ({
          title: cat.title,
          children: cat.items.map((item) => ({
            title: item.name,
            href: item.href,
          })),
        })),
      },
      { title: "Blog", href: "/blog" },
      { title: "Downloads", href: "/downloads" },

      { title: "Contact Us", href: "/contact-us" },
    ],
  };
}
