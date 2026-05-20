import fs from "fs";
import path from "path";
import { Product } from "@/types";

const PRODUCTS_FILE = path.join(process.cwd(), "src", "data", "products.json");

/**
 * Load products from file
 */
export function loadProducts(): Product[] {
  try {
    if (fs.existsSync(PRODUCTS_FILE)) {
      const data = fs.readFileSync(PRODUCTS_FILE, "utf8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error loading products:", error);
  }
  
  // Return default products if file doesn't exist
  return [
    {
      id: "apple-gift-card",
      name: "Apple Gift Card",
      slug: "apple-gift-card",
      description: "Use for apps, games, music, movies, iCloud+, and more across Apple devices.",
      longDescription: "The Apple Gift Card is perfect for everything Apple — App Store, iTunes, Apple Music, Apple TV+, Apple Arcade, iCloud+, accessories, and more.",
      category: "gift-cards",
      brand: "Apple",
      image: "/images/apple-gift-card.svg",
      denominations: [10, 25, 50, 100, 200],
      featured: true,
      popular: true,
      tags: ["apple", "itunes", "app store", "ios"],
    },
    {
      id: "steam-gift-card",
      name: "Steam Gift Card",
      slug: "steam-gift-card",
      description: "Load your Steam Wallet with funds for games, DLC, software, and hardware.",
      longDescription: "Steam Gift Cards are the perfect way to add funds to your Steam Wallet.",
      category: "gift-cards",
      brand: "Steam",
      image: "/images/steam-gift-card.svg",
      denominations: [10, 20, 50, 100],
      featured: true,
      popular: true,
      tags: ["steam", "gaming", "pc", "valve"],
    },
    {
      id: "google-play-gift-card",
      name: "Google Play Gift Card",
      slug: "google-play-gift-card",
      description: "Redeem for apps, games, movies, books, and subscriptions on Google Play.",
      longDescription: "Google Play Gift Cards give you access to millions of apps, games, movies, TV shows, books, and more.",
      category: "gift-cards",
      brand: "Google",
      image: "/images/google-play-gift-card.svg",
      denominations: [10, 15, 25, 50, 100],
      featured: true,
      popular: true,
      tags: ["google", "android", "play store"],
    },
    {
      id: "netflix-subscription",
      name: "Netflix Subscription",
      slug: "netflix-subscription",
      description: "Stream thousands of movies, TV shows, documentaries, and originals.",
      longDescription: "Netflix is the world's leading streaming service with thousands of movies, TV series, and award-winning Netflix Originals.",
      category: "streaming",
      brand: "Netflix",
      image: "/images/netflix.svg",
      denominations: [7, 16, 23],
      featured: true,
      popular: true,
      discount: 5,
      tags: ["netflix", "streaming", "movies", "tv shows"],
    },
    {
      id: "chatgpt-plus",
      name: "ChatGPT Plus",
      slug: "chatgpt-plus",
      description: "Unlock GPT-4o, advanced analysis, image generation, and priority access.",
      longDescription: "ChatGPT Plus gives you access to OpenAI's most advanced AI models including GPT-4o.",
      category: "ai-tools",
      brand: "OpenAI",
      image: "/images/chatgpt.svg",
      denominations: [20, 60, 120],
      featured: true,
      popular: true,
      tags: ["chatgpt", "openai", "ai", "gpt-4"],
    },
  ];
}

/**
 * Save products to file
 */
export function saveProducts(products: Product[]): void {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf8");
  } catch (error) {
    console.error("Error saving products:", error);
  }
}

/**
 * Get product by ID
 */
export function getProductById(id: string): Product | undefined {
  return loadProducts().find((p) => p.id === id);
}

/**
 * Get product by slug
 */
export function getProductBySlug(slug: string): Product | undefined {
  return loadProducts().find((p) => p.slug === slug);
}

/**
 * Get all products
 */
export function getAllProducts(): Product[] {
  return loadProducts();
}

/**
 * Add new product
 */
export function addProduct(product: Product): Product {
  const products = loadProducts();
  products.push(product);
  saveProducts(products);
  return product;
}

/**
 * Update existing product
 */
export function updateProduct(productId: string, updates: Partial<Product>): Product | undefined {
  const products = loadProducts();
  const index = products.findIndex((p) => p.id === productId);
  
  if (index === -1) return undefined;
  
  const updatedProduct = { ...products[index], ...updates, id: productId };
  products[index] = updatedProduct;
  saveProducts(products);
  return updatedProduct;
}

/**
 * Delete product
 */
export function deleteProduct(productId: string): boolean {
  const products = loadProducts();
  const filtered = products.filter((p) => p.id !== productId);
  
  if (filtered.length === products.length) return false;
  
  saveProducts(filtered);
  return true;
}

/* Helper for other files */
export function getFeaturedProducts(): Product[] {
  return loadProducts().filter((p) => p.featured);
}

export function getPopularProducts(): Product[] {
  return loadProducts().filter((p) => p.popular);
}

export function getProductsByCategory(category: string): Product[] {
  return loadProducts().filter((p) => p.category === category);
}
