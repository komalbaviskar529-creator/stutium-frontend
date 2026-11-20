import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import type { Category, Product } from "@/lib/types";

const products = productsData as Product[];
const categories = categoriesData as Category[];

export const getAllProducts = () => products;
export const getBestsellers = (n = 4) => products.filter((p) => p.bestseller).slice(0, n);
export const getCategories = () => categories;
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProductsByCategory = (slug: string) =>
  slug === "all" ? products : products.filter((p) => p.category === slug);

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);

export function getRelatedProducts(product: Product, n = 4): Product[] {
  const same = products.filter((p) => p.category === product.category && p.id !== product.id);
  const others = products.filter((p) => p.category !== product.category);
  return [...same, ...others].slice(0, n);
}