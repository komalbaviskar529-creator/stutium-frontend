export const productImage = (slug: string) => `/images/products/${slug}.jpg`;
export const occasionImage = (slug: string) => `/images/occasions/${slug}.jpg`;
export const giftingImage = (label: string) => `/images/gifting/${label.toLowerCase()}.jpg`;

// Sub-categories reuse a representative product photo.
export const SUB_CATEGORY_IMAGE: Record<string, string> = {
  mugs: productImage("ceramic-mug"),
  pens: productImage("metal-pen-set"),
  bottles: productImage("steel-water-bottle"),
  "gift-boxes": productImage("corporate-gift-box"),
  "t-shirts": productImage("cotton-t-shirt"),
  "wall-calendars": productImage("wall-calendar-2027"),
  "desk-calendars": productImage("desk-calendar-2027"),
  diaries: productImage("corporate-diary-2027"),
  planners: productImage("weekly-planner"),
  posters: productImage("custom-poster-a3"),
  cards: productImage("greeting-card-pack"),
  stickers: productImage("sticker-sheet"),
  notebooks: productImage("custom-notebook"),
};

export const CATEGORY_IMAGE: Record<string, string> = {
  all: "/images/banners/banner-1.jpg",
  "corporate-gifts": "/images/banners/banner-1.jpg",
  "calendars-diaries": "/images/banners/banner-2.jpg",
  "print-on-demand": "/images/banners/banner-3.jpg",
};