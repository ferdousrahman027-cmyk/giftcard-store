import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "apple-gift-card",
    name: "Apple Gift Card",
    slug: "apple-gift-card",
    description: "Use for apps, games, music, movies, iCloud+, and more across Apple devices.",
    longDescription:
      "The Apple Gift Card is perfect for everything Apple — App Store, iTunes, Apple Music, Apple TV+, Apple Arcade, iCloud+, accessories, and more. It works across all Apple devices and can be used for purchases, subscriptions, and in-app content. One card, endless possibilities.",
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
    longDescription:
      "Steam Gift Cards are the perfect way to add funds to your Steam Wallet. Use them to purchase thousands of games, DLC, in-game items, software, and even Steam hardware. Ideal for gamers of all levels — from casual to competitive.",
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
    longDescription:
      "Google Play Gift Cards give you access to millions of apps, games, movies, TV shows, books, and more on the Google Play Store. They can also be used for in-app purchases and subscriptions like YouTube Premium and Google One.",
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
    longDescription:
      "Netflix is the world's leading streaming service with thousands of movies, TV series, documentaries, and award-winning Netflix Originals. Choose from Standard with Ads, Standard, or Premium plans to suit your viewing needs. Enjoy on any device, anywhere, anytime.",
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
    id: "prime-video",
    name: "Amazon Prime Video",
    slug: "prime-video",
    description: "Watch blockbuster movies, exclusive series, and live sports on Prime Video.",
    longDescription:
      "Amazon Prime Video offers a vast library of movies, TV series, and award-winning Amazon Originals. Enjoy exclusive content, live sports, and the option to rent or buy the latest releases. Access on virtually any device with a sleek, user-friendly interface.",
    category: "streaming",
    brand: "Amazon",
    image: "/images/prime-video.svg",
    denominations: [9, 15, 25],
    featured: false,
    popular: true,
    discount: 3,
    tags: ["amazon", "prime", "streaming", "movies"],
  },
  {
    id: "hbo-max",
    name: "HBO Max",
    slug: "hbo-max",
    description: "Access premium HBO content, Warner Bros. films, and exclusive originals.",
    longDescription:
      "HBO Max (now Max) brings together the best of HBO, Warner Bros., DC, Cartoon Network, and more. Stream blockbuster movies, binge-worthy series, captivating documentaries, and family-friendly content. Plans include options with and without ads.",
    category: "streaming",
    brand: "HBO",
    image: "/images/hbo-max.svg",
    denominations: [10, 16, 20],
    featured: false,
    popular: false,
    tags: ["hbo", "max", "warner bros", "streaming"],
  },
  {
    id: "apple-tv-plus",
    name: "Apple TV+",
    slug: "apple-tv-plus",
    description: "Stream award-winning Apple Originals — series, films, and documentaries.",
    longDescription:
      "Apple TV+ features critically acclaimed and award-winning Apple Originals — from gripping dramas and comedies to thought-provoking documentaries and kids' entertainment. Enjoy on all your Apple devices, select smart TVs, and streaming devices.",
    category: "streaming",
    brand: "Apple",
    image: "/images/apple-tv.svg",
    denominations: [10, 25, 50],
    featured: false,
    popular: false,
    tags: ["apple", "tv+", "streaming", "originals"],
  },
  {
    id: "chatgpt-plus",
    name: "ChatGPT Plus",
    slug: "chatgpt-plus",
    description: "Unlock GPT-4o, advanced analysis, image generation, and priority access.",
    longDescription:
      "ChatGPT Plus gives you access to OpenAI's most advanced AI models including GPT-4o, advanced data analysis, DALL-E image generation, and priority access during high-demand periods. Perfect for professionals, students, and anyone who wants the best AI experience.",
    category: "ai-tools",
    brand: "OpenAI",
    image: "/images/chatgpt.svg",
    denominations: [20, 60, 120],
    featured: true,
    popular: true,
    tags: ["chatgpt", "openai", "ai", "gpt-4"],
  },
  {
    id: "claude-pro",
    name: "Claude Pro",
    slug: "claude-pro",
    description: "Get priority access to Claude, Anthropic's most capable AI assistant.",
    longDescription:
      "Claude Pro from Anthropic gives you priority access to Claude — one of the most capable AI assistants available. Enjoy higher usage limits, priority access during peak times, and early access to new features. Ideal for research, writing, coding, and creative work.",
    category: "ai-tools",
    brand: "Anthropic",
    image: "/images/claude.svg",
    denominations: [20, 60, 120],
    featured: true,
    popular: false,
    tags: ["claude", "anthropic", "ai", "assistant"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getPopularProducts(): Product[] {
  return products.filter((p) => p.popular);
}
