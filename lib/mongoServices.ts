import { cache } from "react";
import clientPromise from "./mongodb";
import { Product, Service, BlogPost, Faq } from "@/app/types/types";

const DB_NAME = "svnm-website";
const PRODUCTS_COLLECTION = "products";
const SERVICES_COLLECTION = "services";
const BLOG_COLLECTION = "blogs";
const FAQ_COLLECTION = "faqs";

async function getDb() {
  const client = await clientPromise;
  return client.db(DB_NAME);
}

// ✅ Products
export async function getProducts(): Promise<Product[]> {
  const db = await getDb();
  const products = await db
    .collection<Product>(PRODUCTS_COLLECTION) // 👈 typed collection
    .find({})
    .toArray();

  return products.map((p) => ({
    ...p,
    _id: p._id.toString(),
    imageUrl: p.image ? `/api/images/${p.image}` : undefined,
  }));
};

export async function getProductBySlug(slug: string) {
  const db = await getDb();

  const product = await db
    .collection<Product>(PRODUCTS_COLLECTION)
    .findOne({ slug });

  if (!product) return null;

  return {
    ...product,
    _id: product._id.toString(),
    imageUrl: product.image ? `/api/images/${product.image}` : undefined,
  };
};

// ✅ Services
export async function getServices(): Promise<Service[]> {
  const db = await getDb();
  const services = await db
    .collection<Service>(SERVICES_COLLECTION) // 👈 typed collection
    .find({})
    .toArray();

  return services.map((s) => ({
    ...s,
    _id: s._id.toString(),
    imageUrl: s.image ? `/api/images/${s.image}` : undefined,
  }));
};

export async function getServiceBySlug(slug: string) {
  const db = await getDb();

  const service = await db
    .collection<Service>(SERVICES_COLLECTION)
    .findOne({ slug });

  if (!service) return null;

  return {
    ...service,
    _id: service._id.toString(),
    imageUrl: service.image ? `/api/images/${service.image}` : undefined,
  };
};

// ✅ Categories
export async function getProductCategories() {
  const products = await getProducts();
  const categories: Record<string, Product[]> = {};

  products.forEach((product) => {
    const cat = product.category || "Other";
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(product);
  });

  return Object.entries(categories).map(([title, items]) => ({
    title,
    items: items.map((item) => ({
      name: item.name,
      href: `/products/${item.slug}`,
      description: item.description,
    })),
  }));
};

export async function getServiceCategories() {
  const services = await getServices();
  const categories: Record<string, Service[]> = {};

  services.forEach((service) => {
    const cat = service.category || "Other";
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(service);
  });

  return Object.entries(categories).map(([title, items]) => ({
    title,
    items: items.map((item) => ({
      name: item.name,
      href: `/services/${item.slug}`,
      description: item.description,
    })),
  }));
};

// ✅ Blog
export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const db = await getDb();
  const posts = await db
    .collection<BlogPost>(BLOG_COLLECTION)
    .find({ status: "published" })
    .sort({ publishedAt: -1 })
    .toArray();

  return posts.map((p) => ({
    ...p,
    _id: p._id.toString(),
    imageUrl: p.featuredImage ? `/api/images/${p.featuredImage}` : undefined,
  }));
};

export async function getPublishedBlogPostBySlug(slug: string) {
  const db = await getDb();

  const post = await db
    .collection<BlogPost>(BLOG_COLLECTION)
    .findOne({ slug, status: "published" });

  if (!post) return null;

  return {
    ...post,
    _id: post._id.toString(),
    imageUrl: post.featuredImage ? `/api/images/${post.featuredImage}` : undefined,
  };
};

export async function getBlogCategories() {
  const posts = await getPublishedBlogPosts();
  const categories: Record<string, BlogPost[]> = {};

  posts.forEach((post) => {
    const cat = post.category || "Other";
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(post);
  });

  return Object.entries(categories).map(([title, items]) => ({
    title,
    items: items.map((item) => ({
      name: item.title,
      href: `/blog/${item.slug}`,
      description: item.excerpt,
    })),
  }));
};

// ✅ FAQ
export async function getActiveFaqs(): Promise<Faq[]> {
  const db = await getDb();
  const faqs = await db
    .collection<Faq>(FAQ_COLLECTION)
    .find({ status: "active" })
    .sort({ order: 1 })
    .toArray();

  return faqs.map((f) => ({
    ...f,
    _id: f._id.toString(),
  }));
};
