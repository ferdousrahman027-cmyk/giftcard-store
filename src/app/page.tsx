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
    color: "bg-[#533afd]/10 text-[#533afd]",
  },
  {
    name: "Streaming",
    description: "Netflix, Prime Video, HBO Max, Apple TV+",
    icon: Tv,
    href: "/shop?category=streaming",
    color: "bg-red-50 text-red-500",
  },
  {
    name: "AI Tools",
    description: "ChatGPT Plus, Claude Pro",
    icon: Brain,
    href: "/shop?category=ai-tools",
    color: "bg-[#c1fbd4]/50 text-emerald-700",
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
      {/* Hero — Shopify cinematic dark canvas + Stripe gradient mesh */}
      <section className="relative overflow-hidden bg-canvas-night">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 80%, #f5e9d4 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 80% 20%, #533afd 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 50% 50%, #c1fbd4 0%, transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-light tracking-wide text-white/80 backdrop-blur-sm">
              <Zap className="h-3.5 w-3.5" />
              Instant Digital Delivery
            </div>
            <h1 className="text-4xl font-light tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.75rem] lg:leading-[1.1]">
              Gift Cards &<br />
              <span className="text-[#c1fbd4]">Subscriptions</span>
              <br />
              Made Easy
            </h1>
            <p className="mt-6 max-w-lg text-base font-light leading-relaxed text-white/60">
              Buy Apple, Steam, and Google Play gift cards. Subscribe to Netflix, Prime Video,
              HBO Max, ChatGPT, Claude, and more — all in one place.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-[#533afd] px-7 py-3 text-sm font-medium text-white shadow-lg shadow-[#533afd]/25 transition-all hover:bg-[#4434d4] hover:shadow-xl hover:shadow-[#533afd]/30"
              >
                Browse Products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/shop?category=gift-cards"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                Gift Cards
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-light tracking-[-0.03em] text-ink">Shop by Category</h2>
          <p className="mt-2 text-ink-mute">Find exactly what you&apos;re looking for</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group rounded-2xl border border-hairline bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
            >
              <div className={`inline-flex rounded-xl p-3 ${cat.color}`}>
                <cat.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-ink group-hover:text-primary">
                {cat.name}
              </h3>
              <p className="mt-1 text-sm text-ink-mute">{cat.description}</p>
              <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Shop now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-canvas-soft py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-light tracking-[-0.03em] text-ink">Featured Products</h2>
              <p className="mt-2 text-ink-mute">Handpicked deals just for you</p>
            </div>
            <Link
              href="/shop"
              className="hidden items-center gap-1 text-sm font-medium text-primary hover:text-primary-deep sm:inline-flex"
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
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#c1fbd4]/40 text-emerald-700">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-medium text-ink">{feature.title}</h3>
              <p className="mt-2 text-sm text-ink-mute">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA — cinematic dark */}
      <section className="bg-canvas-night">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light tracking-[-0.03em] text-white">Ready to Get Started?</h2>
          <p className="mx-auto mt-4 max-w-md text-white/50">
            Browse our collection of gift cards and subscriptions. Instant delivery, best
            prices, 100% secure.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#533afd] px-8 py-3 text-sm font-medium text-white shadow-lg shadow-[#533afd]/25 transition-all hover:bg-[#4434d4]"
          >
            Shop Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
