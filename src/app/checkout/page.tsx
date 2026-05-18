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
        <ShoppingBag className="mx-auto h-16 w-16 text-hairline" />
        <h1 className="mt-4 text-2xl font-light tracking-tight text-ink">Your cart is empty</h1>
        <p className="mt-2 text-ink-mute">Add some products before checking out.</p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-deep"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#c1fbd4]">
          <CheckCircle className="h-10 w-10 text-emerald-700" />
        </div>
        <h1 className="mt-6 text-3xl font-light tracking-[-0.03em] text-ink">Order Confirmed!</h1>
        <p className="mt-2 text-ink-mute">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <div className="mt-6 rounded-xl border border-hairline bg-canvas-soft p-6">
          <p className="text-sm text-ink-mute">Order ID</p>
          <p className="mt-1 text-lg font-semibold tabular-nums text-ink">{orderId}</p>
          <p className="mt-4 text-sm text-ink-mute">
            A confirmation email will be sent to{" "}
            <span className="font-medium text-ink">{formData.email}</span> with
            your digital codes.
          </p>
        </div>
        <Link
          href="/shop"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-deep"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/shop"
        className="mb-6 inline-flex items-center gap-1 text-sm font-light text-ink-mute hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Continue Shopping
      </Link>

      <h1 className="mb-8 text-3xl font-light tracking-[-0.03em] text-ink">Checkout</h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-xl border border-hairline bg-white p-6">
              <h2 className="flex items-center gap-2 text-lg font-medium text-ink">
                <CreditCard className="h-5 w-5 text-primary" />
                Contact Information
              </h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-ink">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-hairline px-4 py-2.5 text-sm text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-hairline px-4 py-2.5 text-sm text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink">
                    Confirm Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.confirmEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmEmail: e.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-hairline px-4 py-2.5 text-sm text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-dashed border-hairline bg-canvas-soft p-6 text-center">
              <CreditCard className="mx-auto h-8 w-8 text-ink-mute" />
              <p className="mt-2 text-sm font-medium text-ink-mute">
                Payment integration coming soon
              </p>
              <p className="mt-1 text-xs text-ink-mute/60">
                Stripe, PayPal, and more payment methods will be available
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-primary py-3.5 text-sm font-medium tabular-nums text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-deep hover:shadow-xl"
            >
              Place Order — {formatPrice(totalPrice)}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-24 rounded-xl border border-hairline bg-white p-6">
            <h2 className="text-lg font-medium text-ink">Order Summary</h2>
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
                    className="flex items-center justify-between rounded-xl bg-canvas-soft p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-ink">
                        {product.name}
                      </p>
                      <p className="text-xs tabular-nums text-ink-mute">
                        {formatPrice(item.denomination)} x {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-medium tabular-nums text-ink">
                      {formatPrice(unitPrice * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 border-t border-hairline pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink">Total</span>
                <span className="text-xl font-semibold tabular-nums text-primary">
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
