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
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-900">Your Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-6">
              <ShoppingBag className="h-16 w-16 text-gray-300" />
              <p className="mt-4 text-lg font-medium text-gray-500">Your cart is empty</p>
              <p className="mt-1 text-sm text-gray-400">Add some products to get started!</p>
              <Link
                href="/shop"
                onClick={onClose}
                className="mt-6 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="space-y-4">
                  {items.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;
                    const unitPrice = product.discount
                      ? item.denomination * (1 - product.discount / 100)
                      : item.denomination;

                    return (
                      <div
                        key={`${item.productId}-${item.denomination}`}
                        className="flex gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4"
                      >
                        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white text-2xl shadow-sm">
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
                              <p className="text-sm font-medium text-gray-900">{product.name}</p>
                              <p className="text-xs text-gray-500">
                                {formatPrice(item.denomination)}
                                {product.discount && (
                                  <span className="ml-1 text-green-600">
                                    (-{product.discount}%)
                                  </span>
                                )}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.productId, item.denomination)}
                              className="text-gray-400 transition-colors hover:text-red-500"
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
                                className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 text-gray-500 transition-colors hover:bg-gray-100"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-8 text-center text-sm font-medium">
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
                                className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 text-gray-500 transition-colors hover:bg-gray-100"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <p className="text-sm font-semibold text-gray-900">
                              {formatPrice(unitPrice * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-gray-700">Total</span>
                  <span className="text-xl font-bold text-gray-900">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="mt-4 block w-full rounded-lg bg-indigo-600 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={clearCart}
                  className="mt-2 w-full rounded-lg border border-gray-300 py-2.5 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
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
