"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Minus, Plus, Tag, Shield, Zap } from "lucide-react";
import { getProductBySlug, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { CATEGORY_LABELS, type ProductCategory } from "@/types";

const brandEmojis: Record<string, string> = {
  Apple: "🍎",
  Steam: "🎮",
  Google: "▶️",
  Netflix: "🎬",
  Amazon: "📦",
  HBO: "🎭",
  OpenAI: "🤖",
  Anthropic: "🧠",
};

const brandColors: Record<string, string> = {
  Apple: "from-gray-100 to-gray-200",
  Steam: "from-[#1b2838] to-[#2a475e]",
  Google: "from-blue-50 to-green-50",
  Netflix: "from-[#b20710] to-[#e50914]",
  Amazon: "from-[#232f3e] to-[#37475a]",
  HBO: "from-[#412085] to-[#5822b4]",
  OpenAI: "from-emerald-50 to-teal-50",
  Anthropic: "from-orange-50 to-amber-50",
};

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const [selectedDenom, setSelectedDenom] = useState(
    product?.denominations[0] ?? 0
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-light tracking-tight text-ink">Product Not Found</h1>
        <p className="mt-2 text-ink-mute">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-deep"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Link>
      </div>
    );
  }

  const discountedPrice = product.discount
    ? selectedDenom * (1 - product.discount / 100)
    : null;
  const totalPrice = (discountedPrice ?? selectedDenom) * quantity;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addItem(product.id, selectedDenom, quantity);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/shop"
        className="mb-6 inline-flex items-center gap-1 text-sm font-light text-ink-mute hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div
          className={`flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br ${brandColors[product.brand] ?? "from-gray-100 to-gray-200"}`}
        >
          <span className="text-9xl">{brandEmojis[product.brand] ?? "🎁"}</span>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {CATEGORY_LABELS[product.category as ProductCategory]}
            </span>
            {product.discount && (
              <span className="rounded-full bg-[#c1fbd4] px-3 py-1 text-xs font-semibold text-emerald-800">
                {product.discount}% OFF
              </span>
            )}
          </div>

          <h1 className="text-3xl font-light tracking-[-0.03em] text-ink">{product.name}</h1>
          <p className="mt-1 text-sm text-ink-mute">by {product.brand}</p>
          <p className="mt-4 text-ink-mute leading-relaxed">{product.longDescription}</p>

          <div className="mt-8">
            <label className="text-sm font-medium text-ink">Select Amount</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.denominations.map((denom) => (
                <button
                  key={denom}
                  onClick={() => setSelectedDenom(denom)}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium tabular-nums transition-colors ${
                    selectedDenom === denom
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "border border-hairline bg-white text-ink hover:border-primary/30 hover:bg-primary/5"
                  }`}
                >
                  {formatPrice(denom)}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium text-ink">Quantity</label>
            <div className="mt-2 flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-ink-mute transition-colors hover:bg-canvas-soft"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center text-lg font-medium tabular-nums text-ink">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-ink-mute transition-colors hover:bg-canvas-soft"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-hairline bg-canvas-soft p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-mute">Price per unit</span>
              <div className="flex items-center gap-2">
                {discountedPrice ? (
                  <>
                    <span className="text-lg font-semibold tabular-nums text-ink">
                      {formatPrice(discountedPrice)}
                    </span>
                    <span className="text-sm tabular-nums text-ink-mute line-through">
                      {formatPrice(selectedDenom)}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-semibold tabular-nums text-ink">
                    {formatPrice(selectedDenom)}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-hairline pt-2">
              <span className="text-sm font-medium text-ink">Total</span>
              <span className="text-2xl font-semibold tabular-nums text-primary">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-medium text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-deep hover:shadow-xl"
          >
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </button>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-1 rounded-xl bg-canvas-soft p-3 text-center">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium text-ink-mute">Instant Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-xl bg-canvas-soft p-3 text-center">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium text-ink-mute">100% Secure</span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-xl bg-canvas-soft p-3 text-center">
              <Tag className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium text-ink-mute">Best Price</span>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-light tracking-[-0.03em] text-ink">Related Products</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                className="group rounded-2xl border border-hairline bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
              >
                <div
                  className={`flex h-32 items-center justify-center rounded-xl bg-gradient-to-br ${brandColors[p.brand] ?? "from-gray-100 to-gray-200"}`}
                >
                  <span className="text-4xl">{brandEmojis[p.brand] ?? "🎁"}</span>
                </div>
                <h3 className="mt-3 text-sm font-medium text-ink group-hover:text-primary">
                  {p.name}
                </h3>
                <p className="mt-1 text-xs tabular-nums text-ink-mute">
                  From {formatPrice(p.denominations[0])}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
