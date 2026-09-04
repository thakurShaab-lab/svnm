import { ReactNode } from "react";
export interface NavItem {
  title: string;
  href?: string;
  children?: NavItem[];
}

export interface NavigationData {
  mainNav: NavItem[];
}

// types/types.ts
export interface Product {
  _id: string;
  slug: string;
  name: string;
  description: string;
  summary: string;
  category: string;
  categoryInfo: string;
  image: string; // must always be a string
  imageUrl?: string;
  imageId?: string;
  features: string[];
  applications: string[];
  keyFeatures: {
    icon: React.ReactNode | null;
    title: string | null;
    description: string | null;
  }[];
}

export interface Service {
  _id: string;
  slug: string;
  name: string;
  description: string;
  summary: string;
  category: string;
  categoryInfo: string;
  image: string; // must always be a string
  imageUrl?: string;
  imageId?: string;
  features: string[];
  applications: string[];
  keyFeatures: {
    icon: React.ReactNode | null;
    title: string | null;
    description: string | null;
  }[];
}

export interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // markdown
  featuredImage: string; // imageId, like Product.image
  imageUrl?: string;
  author?: string;
  category?: string;
  status: "draft" | "published";
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Faq {
  _id: string;
  question: string;
  answer: string;
  status: "active" | "inactive";
  order: number;
  productSlug?: string;
  serviceSlug?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HeroSectionProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
  variant?: "default" | "gradient";
}
