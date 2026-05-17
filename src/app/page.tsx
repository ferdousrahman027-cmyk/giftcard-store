import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Zap,
  CreditCard,
  Gift,
  Tv,
  Brain,
} from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

const categories = [
  {
    name: "Gift Cards",
    description: "Apple, Steam, Google Play and more",
    icon: Gift,
    href: "/shop?category=gift-cards",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    name: "Streaming",
    description: "Netflix, Prime Video, HBO Max, Apple TV+",
    icon: Tv,
    href: "/shop?category=streaming",
    color: "bg-red-50 text-red-600",
  },
  {
    name: "AI Tools",
    description: "ChatGPT Plus, Claude Pro",
    icon: Brain,
    href: "/shop?category=ai-tools",
    color: "bg-emerald-50 text-emerald-600",
  },
];

const features = [
  {
    icon: Zap,
    title: "Instant Delivery",
    description: "Get your codes delivered instantly to your email after purchase.",
  },
  {
    icon: Shield,
    title: "100% Secure",
    description: "All transactions are encrypted and your data is always protected.",
  },
  {
    icon: CreditCard,
    title: "Best Prices",
    description: "Competitive pricing with exclusive discounts on popular products.",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800">
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
              <Zap className="h-4 w-4" />
              Instant Digital Delivery
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Gift Cards &<br />
              <span className="text-indigo-200">Subscriptions</span>
              <br />
              Made Easy
            </h1>
            <p className="mt-6 max-w-lg text-lg text-indigo-100">
              Buy Apple, Steam, and Google Play gift cards. Subscribe to Netflix, Prime Video,
              HBO Max, ChatGPT, Claude, and more — all in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
              >
                Browse Products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/shop?category=gift-cards"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                Gift Cards
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
          <p className="mt-2 text-gray-500">Find exactly what you&apos;re looking for</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className={`inline-flex rounded-xl p-3 ${cat.color}`}>
                <cat.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                {cat.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{cat.description}</p>
              <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-indigo-600">
                Shop now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="mt-2 text-gray-500">Handpicked deals just for you</p>
            </div>
            <Link
              href="/shop"
              className="hidden items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 sm:inline-flex"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
          <p className="mx-auto mt-3 max-w-md text-gray-400">
            Browse our collection of gift cards and subscriptions. Instant delivery, best
            prices, 100% secure.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
          >
            Shop Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
