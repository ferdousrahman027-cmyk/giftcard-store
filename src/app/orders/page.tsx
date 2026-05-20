"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Clock, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Order {
  id: string;
  items: Array<{
    productId: string;
    denomination: number;
    quantity: number;
  }>;
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  customerEmail: string;
  customerName: string;
  createdAt: string;
}

interface OrderWithProduct extends Order {
  products: Array<{
    name: string;
    brand: string;
    image: string;
  }>;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderWithProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Load from localStorage for demo purposes
    const storedEmail = localStorage.getItem("giftcard_last_email");
    if (storedEmail) {
      setEmail(storedEmail);
      fetchOrders(storedEmail);
    }
    setLoading(false);
  }, []);

  const fetchOrders = async (searchEmail: string) => {
    try {
      const response = await fetch(`/api/orders?email=${encodeURIComponent(searchEmail)}`);
      const data = await response.json();
      
      if (data.orders) {
        setOrders(data.orders);
        setError("");
        localStorage.setItem("giftcard_last_email", searchEmail);
        setEmail(searchEmail);
      } else {
        setOrders([]);
        setError(data.error || "No orders found");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders. Please try again.");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchEmail.trim()) {
      fetchOrders(searchEmail.trim());
    }
  };

  const statusConfig: Record<string, { icon: any; color: string; text: string }> = {
    pending: { icon: Clock, color: "text-amber-500", text: "Processing" },
    processing: { icon: Clock, color: "text-blue-500", text: "Processing" },
    completed: { icon: CheckCircle2, color: "text-emerald-500", text: "Completed" },
    cancelled: { icon: AlertCircle, color: "text-red-500", text: "Cancelled" },
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1 text-sm font-light text-ink-mute hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Link>
        <h1 className="mt-4 text-3xl font-light tracking-[-0.03em] text-ink">Your Orders</h1>
        <p className="mt-2 text-ink-mute">Track and manage your recent orders</p>
      </div>

      {/* Search Section */}
      <div className="mb-8 rounded-xl bg-canvas-soft p-6">
        <form onSubmit={handleSearch} className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <label className="text-sm font-medium text-ink mb-2 block sm:hidden">Email Address</label>
            <input
              type="email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              placeholder="Enter your email to find your orders"
              className="w-full rounded-xl border border-hairline bg-white px-4 py-3 text-ink placeholder-ink-mute focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-deep"
          >
            Find Orders
          </button>
        </form>
      </div>

      {loading ? (
        <div className="py-12 text-center">
          <Clock className="mx-auto h-12 w-12 text-ink-mute animate-spin" />
          <p className="mt-4 text-ink-mute">Loading your orders...</p>
        </div>
      ) : error ? (
        <div className="rounded-xl border border-dashed border-hairline bg-canvas-soft p-8 text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-ink-mute" />
          <p className="mt-4 text-ink-mute">{error}</p>
          <Link
            href="/shop"
            className="mt-4 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white"
          >
            Start Shopping
          </Link>
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-hairline bg-canvas-soft p-8 text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-ink-mute" />
          <h3 className="mt-4 text-lg font-medium text-ink">No orders found</h3>
          <p className="mt-1 text-ink-mute">
            We couldn't find any orders for this email address.
          </p>
          <Link
            href="/shop"
            className="mt-4 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-ink">
            {orders.length} order{orders.length !== 1 && "s"} found
          </h2>
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-hairline bg-white p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-ink">{order.id}</h3>
                    <span className="rounded-full bg-canvas-soft px-3 py-1 text-xs font-medium text-ink">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink-mute">Placed by {order.customerName}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{formatPrice(order.total)}</p>
                    <p className="text-xs text-ink-mute">Total</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {statusConfig[order.status] && (
                      <statusConfig[order.status].icon className={`h-5 w-5 ${statusConfig[order.status].color}`} />
                    )}
                    <span className={`text-sm font-medium ${statusConfig[order.status]?.color || "text-ink"}`}>
                      {statusConfig[order.status]?.text || order.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 border-t border-hairline pt-4">
                <p className="text-sm font-medium text-ink mb-2">Order Items:</p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 rounded-lg bg-canvas-soft p-2">
                      <div className="h-10 w-10 rounded-full bg-canvas-soft flex items-center justify-center text-xl">
                        🎁
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-ink">Gift Card</p>
                        <p className="text-xs text-ink-mute">{formatPrice(item.denomination)} x {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-ink">{formatPrice(item.denomination * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button className="rounded-full bg-primary/10 px-6 py-2 text-sm font-medium text-primary hover:bg-primary/20">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
