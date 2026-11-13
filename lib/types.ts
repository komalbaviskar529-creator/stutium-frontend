export type Tier = { min: number; price: number };

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  subCategory: string;
  rating: number;
  reviews: number;
  mrp: number;
  price: number;
  moq: number;
  tiers: Tier[];
  delivery: string;
  deliveryDays: number;
  variants: string[];
  occasions: string[];
  personalisable: boolean;
  bestseller: boolean;
};

export type SubCategory = { slug: string; name: string };
export type Category = { slug: string; name: string; subCategories: SubCategory[] };