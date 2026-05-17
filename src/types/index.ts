export type ProductCategory =
  | "gift-cards"
  | "streaming"
  | "ai-tools";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  category: ProductCategory;
  brand: string;
  image: string;
  denominations: number[];
  featured: boolean;
  popular: boolean;
  discount?: number;
  tags: string[];
}

export interface CartItem {
  productId: string;
  denomination: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  customerEmail: string;
  customerName: string;
  createdAt: string;
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  "gift-cards": "Gift Cards",
  streaming: "Streaming & Entertainment",
  "ai-tools": "AI Tools",
};
