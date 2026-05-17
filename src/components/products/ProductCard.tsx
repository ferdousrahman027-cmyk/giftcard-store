"use client";

import Link from "next/link";
import { ShoppingCart, Sparkles } from "lucide-react";
import { type Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

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

const brandTextColors: Record<string, string> = {
  Apple: "text-gray-900",
  Steam: "text-white",
  Google: "text-gray-900",
  Netflix: "text-white",
  Amazon: "text-white",
  HBO: "text-white",
  OpenAI: "text-gray-900",
  Anthropic: "text-gray-900",
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedDenom, setSelectedDenom] = useState(product.denominations[0]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id, selectedDenom);
  };

  const handleDenomClick = (e: React.MouseEvent, denom: number) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedDenom(denom);
  };

  const discountedPrice = product.discount
    ? selectedDenom * (1 - product.discount / 100)
    : null;

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div
          className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${brandColors[product.brand] ?? "from-gray-100 to-gray-200"}`}
        >
          <span className="text-6xl">{brandEmojis[product.brand] ?? "🎁"}</span>

          {product.discount && (
            <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-green-500 px-2.5 py-1 text-xs font-bold text-white">
              <Sparkles className="h-3 w-3" />
              {product.discount}% OFF
            </div>
          )}

          {product.popular && (
            <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-indigo-600 shadow-sm backdrop-blur-sm">
              Popular
            </div>
          )}

          <div
            className={`absolute bottom-3 left-3 text-sm font-bold ${brandTextColors[product.brand] ?? "text-gray-900"}`}
          >
            {product.brand}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-base font-semibold text-gray-900 group-hover:text-indigo-600">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-500">{product.description}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.denominations.map((denom) => (
              <button
                key={denom}
                onClick={(e) => handleDenomClick(e, denom)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  selectedDenom === denom
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {formatPrice(denom)}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div>
              {discountedPrice ? (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(discountedPrice)}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(selectedDenom)}
                  </span>
                </div>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(selectedDenom)}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-indigo-700"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              Add
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
