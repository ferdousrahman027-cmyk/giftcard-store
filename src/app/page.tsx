import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Zap,
  CreditCard,
  Gift,
  Tv,
  Brain,
  Sparkles,
  Star,
} from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

const categories = [
  {
    name: "Gift Cards",
    description: "Apple, Steam, Google Play and more",
    icon: Gift,
    href: "/shop?category=gift-cards",
    gradient: "from-[#533afd]/10 via-[#533afd]/5 to-transparent",
    iconBg: "bg-[#533afd]/10 text-[#533afd]",
    emoji: "🎁",
  },
  {
    name: "Streaming",
    description: "Netflix, Prime Video, HBO Max, Apple TV+",
    icon: Tv,
    href: "/shop?category=streaming",
    gradient: "from-red-500/10 via-red-500/5 to-transparent",
    iconBg: "bg-red-50 text-red-500",
    emoji: "🎬",
  },
  {
    name: "AI Tools",
    description: "ChatGPT Plus, Claude Pro",
    icon: Brain,
    href: "/shop?category=ai-tools",
    gradient: "from-[#c1fbd4]/40 via-[#c1fbd4]/20 to-transparent",
    iconBg: "bg-[#c1fbd4]/50 text-emerald-700",
    emoji: "🤖",
  },
];

const features = [
  {
    icon: Zap,
    title: "Instant Delivery",
    description: "Get your codes delivered instantly to your email after purchase.",
    accent: "bg-amber-50 text-amber-600",
  },
  {
    icon: Shield,
    title: "100% Secure",
    description: "All transactions are encrypted and your data is always protected.",
    accent: "bg-[#c1fbd4]/40 text-emerald-700",
  },
  {
    icon: CreditCard,
    title: "Best Prices",
    description: "Competitive pricing with exclusive discounts on popular products.",
    accent: "bg-[#533afd]/10 text-[#533afd]",
  },
];

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "9", label: "Premium Brands" },
  { value: "24/7", label: "Instant Delivery" },
  { value: "100%", label: "Secure Payments" },
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

      {/* Stats bar */}
      <section className="border-b border-hairline bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-hairline sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="px-4 py-8 text-center sm:px-6">
                <p className="text-2xl font-semibold tabular-nums text-ink">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-ink-mute">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories — elevated cards with gradients */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Categories
          </div>
          <h2 className="text-3xl font-light tracking-[-0.03em] text-ink">Shop by Category</h2>
          <p className="mt-2 text-ink-mute">Find exactly what you&apos;re looking for</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative overflow-hidden rounded-2xl border border-hairline bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${cat.gradient}`} />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className={`inline-flex rounded-2xl p-3.5 ${cat.iconBg}`}>
                    <cat.icon className="h-6 w-6" />
                  </div>
                  <span className="text-4xl">{cat.emoji}</span>
                </div>
                <h3 className="mt-5 text-xl font-medium text-ink group-hover:text-primary">
                  {cat.name}
                </h3>
                <p className="mt-1.5 text-sm text-ink-mute">{cat.description}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-canvas-soft px-4 py-2 text-sm font-medium text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  Shop now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="relative overflow-hidden bg-canvas-soft py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "24px 24px" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                <Star className="h-3.5 w-3.5" />
                Featured
              </div>
              <h2 className="text-3xl font-light tracking-[-0.03em] text-ink">Featured Products</h2>
              <p className="mt-2 text-ink-mute">Handpicked deals just for you</p>
            </div>
            <Link
              href="/shop"
              className="hidden items-center gap-1.5 rounded-full border border-hairline bg-white px-5 py-2.5 text-sm font-medium text-ink shadow-sm transition-all hover:border-primary/30 hover:text-primary sm:inline-flex"
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
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-white px-5 py-2.5 text-sm font-medium text-ink shadow-sm"
            >
              View all products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features — card-based layout */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-light tracking-[-0.03em] text-ink">Why Choose GiftHub?</h2>
          <p className="mt-2 text-ink-mute">The trusted way to buy digital products</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-hairline bg-white p-8 text-center transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5">
              <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${feature.accent}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-medium text-ink">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-mute">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA — cinematic dark with gradient mesh */}
      <section className="relative overflow-hidden bg-canvas-night">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(ellipse 60% 50% at 70% 50%, #533afd 0%, transparent 50%), radial-gradient(ellipse 40% 40% at 30% 60%, #c1fbd4 0%, transparent 50%)" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/60 backdrop-blur-sm">
              <Gift className="h-3.5 w-3.5" />
              Start Shopping Today
            </div>
            <h2 className="text-3xl font-light tracking-[-0.03em] text-white sm:text-4xl">Ready to Get Started?</h2>
            <p className="mx-auto mt-4 max-w-md text-base font-light text-white/50">
              Browse our collection of gift cards and subscriptions. Instant delivery, best
              prices, 100% secure.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-[#533afd] px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#533afd]/25 transition-all hover:bg-[#4434d4] hover:shadow-xl"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/shop?category=streaming"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                View Subscriptions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
