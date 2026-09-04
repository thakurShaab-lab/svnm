// lib/navigation.ts
import { getProductCategories, getServiceCategories } from "./mongoServices";

export async function getNavigationData() {
  const productCategories = await getProductCategories();
  const serviceCategories = await getServiceCategories();

  return [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/about-us" },
    {
      title: "Products",
      href: "/products",
      children: productCategories.map((cat) => ({
        title: cat.title,
        children: cat.items.map((item) => ({ title: item.name, href: item.href })),
      })),
    },
    {
      title: "Services",
      href: "/services",
      children: serviceCategories.map((cat) => ({
        title: cat.title,
        children: cat.items.map((item) => ({ title: item.name, href: item.href })),
      })),
    },
    { title: "Blog", href: "/blog" },
    { title: "Downloads", href: "/downloads" },
    { title: "Contact Us", href: "/contact-us" },
  ];
}
