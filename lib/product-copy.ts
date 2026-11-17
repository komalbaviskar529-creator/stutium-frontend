type Copy = { details: string[]; care: string[] };

export const PRODUCT_COPY: Record<string, Copy> = {
  "corporate-gifts": {
    details: [
      "Your logo or text printed on the product",
      "Bulk pricing from the minimum order quantity",
      "Packed in protective packaging",
      "Free message card with every order",
    ],
    care: [
      "Hand wash or wipe clean for best print life",
      "Avoid abrasive scrubbers",
      "Keep away from direct heat",
      "Do not soak for long periods",
    ],
  },
  "calendars-diaries": {
    details: [
      "Custom cover artwork and your logo",
      "Choose size and binding",
      "Bulk pricing for teams",
      "Free message card with every order",
    ],
    care: [
      "Store flat in a dry place",
      "Keep away from moisture and direct sunlight",
      "Hang wall calendars on a clean, dry wall",
      "Use a soft cloth to wipe the cover",
    ],
  },
  "print-on-demand": {
    details: [
      "Print as little as one piece",
      "Upload your own artwork",
      "Quick price as quantity grows",
      "Free message card with every order",
    ],
    care: [
      "Keep prints flat or rolled in a dry place",
      "Avoid direct sunlight for long periods",
      "Wipe gently with a dry cloth",
      "Use a frame for long-term display",
    ],
  },
};