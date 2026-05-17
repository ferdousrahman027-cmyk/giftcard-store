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
  Steam: "from-blue-900 to-gray-900",
  Google: "from-blue-50 to-green-50",
  Netflix: "from-red-600 to-red-800",
  Amazon: "from-blue-900 to-blue-700",
  HBO: "from-purple-800 to-purple-900",
  OpenAI: "from-emerald-50 to-teal-100",
  Anthropic: "from-orange-50 to-amber-100",
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
        <h1 className="text-2xl font-bold text-gray-900">Product Not Found</h1>
        <p className="mt-2 text-gray-500">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
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
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-indigo-600"
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
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
              {CATEGORY_LABELS[product.category as ProductCategory]}
            </span>
            {product.discount && (
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600">
                {product.discount}% OFF
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-1 text-sm text-gray-500">by {product.brand}</p>
          <p className="mt-4 text-gray-600">{product.longDescription}</p>

          <div className="mt-8">
            <label className="text-sm font-semibold text-gray-900">Select Amount</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.denominations.map((denom) => (
                <button
                  key={denom}
                  onClick={() => setSelectedDenom(denom)}
                  className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                    selectedDenom === denom
                      ? "bg-indigo-600 text-white shadow-md"
                      : "border border-gray-300 bg-white text-gray-700 hover:border-indigo-300 hover:bg-indigo-50"
                  }`}
                >
                  {formatPrice(denom)}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-semibold text-gray-900">Quantity</label>
            <div className="mt-2 flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-500 transition-colors hover:bg-gray-50"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center text-lg font-semibold text-gray-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-500 transition-colors hover:bg-gray-50"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Price per unit</span>
              <div className="flex items-center gap-2">
                {discountedPrice ? (
                  <>
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(discountedPrice)}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(selectedDenom)}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(selectedDenom)}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-gray-200 pt-2">
              <span className="text-sm font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-indigo-600">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-indigo-700 hover:shadow-xl"
          >
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </button>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-1 rounded-lg bg-gray-50 p-3 text-center">
              <Zap className="h-5 w-5 text-indigo-600" />
              <span className="text-xs font-medium text-gray-600">Instant Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-lg bg-gray-50 p-3 text-center">
              <Shield className="h-5 w-5 text-indigo-600" />
              <span className="text-xs font-medium text-gray-600">100% Secure</span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-lg bg-gray-50 p-3 text-center">
              <Tag className="h-5 w-5 text-indigo-600" />
              <span className="text-xs font-medium text-gray-600">Best Price</span>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  className={`flex h-32 items-center justify-center rounded-xl bg-gradient-to-br ${brandColors[p.brand] ?? "from-gray-100 to-gray-200"}`}
                >
                  <span className="text-4xl">{brandEmojis[p.brand] ?? "🎁"}</span>
                </div>
                <h3 className="mt-3 text-sm font-semibold text-gray-900 group-hover:text-indigo-600">
                  {p.name}
                </h3>
                <p className="mt-1 text-xs text-gray-500">
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
