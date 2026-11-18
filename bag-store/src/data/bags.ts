export type Gender = "Women" | "Men" | "Unisex";

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Bag {
  id: number;
  name: string;
  gender: Gender;
  color: ColorOption;
  price: number;
  imageUrl: string;
}

export const COLORS: ColorOption[] = [
  { name: "Black", hex: "1a1a1a" },
  { name: "Brown", hex: "6b4423" },
  { name: "Tan", hex: "d2b48c" },
  { name: "Red", hex: "b91c1c" },
  { name: "Navy", hex: "1e3a5f" },
  { name: "Beige", hex: "e8dcc8" },
  { name: "Green", hex: "2f5233" },
  { name: "Pink", hex: "e8a0bf" },
  { name: "Grey", hex: "7d7d7d" },
  { name: "White", hex: "f5f5f5" },
  { name: "Burgundy", hex: "6d1b3a" },
  { name: "Mustard", hex: "c9a227" },
];

const GENDERS: Gender[] = ["Women", "Men", "Unisex"];

const BAG_TYPES = [
  "Tote",
  "Backpack",
  "Crossbody",
  "Clutch",
  "Duffel",
  "Satchel",
  "Messenger",
  "Hobo",
  "Weekender",
  "Sling",
];

const ADJECTIVES = [
  "Classic",
  "Urban",
  "Vintage",
  "Minimalist",
  "Everyday",
  "Luxe",
  "Travel",
  "Studio",
  "Heritage",
  "Signature",
];

function textColorFor(hex: string): string {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "1a1a1a" : "f5f5f5";
}

export const BAGS: Bag[] = Array.from({ length: 50 }, (_, i) => {
  const type = BAG_TYPES[i % BAG_TYPES.length];
  const adjective = ADJECTIVES[Math.floor(i / BAG_TYPES.length) % ADJECTIVES.length];
  const color = COLORS[i % COLORS.length];
  const gender = GENDERS[i % GENDERS.length];
  const price = 39 + ((i * 17) % 260);

  return {
    id: i + 1,
    name: `${adjective} ${type}`,
    gender,
    color,
    price,
    imageUrl: `https://placehold.co/400x400/${color.hex}/${textColorFor(color.hex)}?text=${encodeURIComponent(
      type,
    )}`,
  };
});
