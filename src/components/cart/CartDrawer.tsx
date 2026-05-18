"use client";

import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/data/products";
import { formatPrice } from "@/lib/utils";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      )}

      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-ink">Your Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-ink-mute transition-colors hover:bg-canvas-soft hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-6">
              <ShoppingBag className="h-16 w-16 text-hairline" />
              <p className="mt-4 text-lg font-light text-ink-mute">Your cart is empty</p>
              <p className="mt-1 text-sm text-ink-mute/60">Add some products to get started!</p>
              <Link
                href="/shop"
                onClick={onClose}
                className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-deep"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="space-y-3">
                  {items.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;
                    const unitPrice = product.discount
                      ? item.denomination * (1 - product.discount / 100)
                      : item.denomination;

                    return (
                      <div
                        key={`${item.productId}-${item.denomination}`}
                        className="flex gap-4 rounded-xl border border-hairline bg-canvas-soft p-4"
                      >
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-2xl">
                          {product.brand === "Apple" && "🍎"}
                          {product.brand === "Steam" && "🎮"}
                          {product.brand === "Google" && "▶️"}
                          {product.brand === "Netflix" && "🎬"}
                          {product.brand === "Amazon" && "📦"}
                          {product.brand === "HBO" && "🎭"}
                          {product.brand === "OpenAI" && "🤖"}
                          {product.brand === "Anthropic" && "🧠"}
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm font-medium text-ink">{product.name}</p>
                              <p className="text-xs tabular-nums text-ink-mute">
                                {formatPrice(item.denomination)}
                                {product.discount && (
                                  <span className="ml-1 text-emerald-600">
                                    (-{product.discount}%)
                                  </span>
                                )}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.productId, item.denomination)}
                              className="text-ink-mute transition-colors hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.denomination,
                                    item.quantity - 1
                                  )
                                }
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-hairline text-ink-mute transition-colors hover:bg-white"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-8 text-center text-sm font-medium tabular-nums text-ink">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.denomination,
                                    item.quantity + 1
                                  )
                                }
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-hairline text-ink-mute transition-colors hover:bg-white"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <p className="text-sm font-medium tabular-nums text-ink">
                              {formatPrice(unitPrice * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-hairline px-6 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-ink-mute">Total</span>
                  <span className="text-xl font-semibold tabular-nums text-ink">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="mt-4 block w-full rounded-full bg-primary py-3 text-center text-sm font-medium text-white transition-colors hover:bg-primary-deep"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={clearCart}
                  className="mt-2 w-full rounded-full border border-hairline py-2.5 text-center text-sm font-medium text-ink-mute transition-colors hover:bg-canvas-soft"
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
