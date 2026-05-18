"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, CreditCard, CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/data/products";
import { formatPrice, generateOrderId } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<"details" | "success">("details");
  const [orderId, setOrderId] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    confirmEmail: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = generateOrderId();
    setOrderId(id);
    setStep("success");
    clearCart();
  };

  if (items.length === 0 && step !== "success") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <ShoppingBag className="mx-auto h-16 w-16 text-gray-300" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="mt-2 text-gray-500">Add some products before checking out.</p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-gray-900">Order Confirmed!</h1>
        <p className="mt-2 text-gray-500">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-6">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="mt-1 text-lg font-bold text-gray-900">{orderId}</p>
          <p className="mt-4 text-sm text-gray-500">
            A confirmation email will be sent to{" "}
            <span className="font-medium text-gray-700">{formData.email}</span> with
            your digital codes.
          </p>
        </div>
        <Link
          href="/shop"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/shop"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-indigo-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Continue Shopping
      </Link>

      <h1 className="mb-8 text-3xl font-bold text-gray-900">Checkout</h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <CreditCard className="h-5 w-5 text-indigo-600" />
                Contact Information
              </h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.confirmEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmEmail: e.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
              <CreditCard className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm font-medium text-gray-500">
                Payment integration coming soon
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Stripe, PayPal, and more payment methods will be available
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-indigo-700 hover:shadow-xl"
            >
              Place Order — {formatPrice(totalPrice)}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
            <div className="mt-4 space-y-3">
              {items.map((item) => {
                const product = getProductById(item.productId);
                if (!product) return null;
                const unitPrice = product.discount
                  ? item.denomination * (1 - product.discount / 100)
                  : item.denomination;

                return (
                  <div
                    key={`${item.productId}-${item.denomination}`}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatPrice(item.denomination)} x {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatPrice(unitPrice * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-indigo-600">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
