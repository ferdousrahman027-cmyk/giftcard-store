"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Clock, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface OrderItem {
  productId: string;
  denomination: number;
  quantity: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  customerEmail: string;
  customerName: string;
  createdAt: string;
}

const statusConfig = {
  pending: { icon: Clock, color: "text-amber-500", bg: "bg-amber-50", text: "Pending" },
  processing: { icon: Clock, color: "text-blue-500", bg: "bg-blue-50", text: "Processing" },
  completed: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50", text: "Completed" },
  cancelled: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-50", text: "Cancelled" },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("giftcard_last_email");
    if (storedEmail) {
      setSearchEmail(storedEmail);
      fetchOrders(storedEmail);
    }
  }, []);

  const fetchOrders = async (email: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/orders?email=${encodeURIComponent(email)}`);
      const data = await response.json();

      if (data.orders) {
        setOrders(data.orders);
        localStorage.setItem("giftcard_last_email", email);
      } else {
        setOrders([]);
        setError(data.error || "No orders found");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchEmail.trim()) {
      fetchOrders(searchEmail.trim());
    }
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

      {/* Search */}
      <div className="mb-8 rounded-xl border border-hairline bg-white p-6">
        <form onSubmit={handleSearch} className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <input
              type="email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              placeholder="Enter your email to find your orders"
              required
              className="w-full rounded-xl border border-hairline bg-canvas-soft px-4 py-3 text-ink placeholder-ink-mute focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-deep disabled:opacity-50"
          >
            {loading ? "Searching..." : "Find Orders"}
          </button>
        </form>
      </div>

      {/* Loading */}
      {loading && (
        <div className="py-12 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
          <p className="mt-4 text-ink-mute">Loading your orders...</p>
        </div>
      )}

      {/* No results */}
      {!loading && searched && orders.length === 0 && (
        <div className="rounded-xl border border-dashed border-hairline bg-canvas-soft p-12 text-center">
          <ShoppingBag className="mx-auto h-14 w-14 text-ink-mute" />
          <h3 className="mt-4 text-lg font-medium text-ink">No orders found</h3>
          <p className="mt-2 text-ink-mute">
            {error || "We couldn't find any orders for this email address."}
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-deep"
          >
            Start Shopping
          </Link>
        </div>
      )}

      {/* Orders List */}
      {!loading && orders.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm text-ink-mute">
            {orders.length} order{orders.length !== 1 ? "s" : ""} found
          </p>
          {orders.map((order) => {
            const config = statusConfig[order.status] || statusConfig.pending;
            const StatusIcon = config.icon;

            return (
              <div
                key={order.id}
                className="rounded-xl border border-hairline bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm font-semibold text-ink">{order.id}</h3>
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.bg} ${config.color}`}>
                        <StatusIcon className="h-3 w-3" />
                        {config.text}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-ink-mute">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold tabular-nums text-primary">
                      {formatPrice(order.total)}
                    </p>
                    <p className="text-xs text-ink-mute">
                      {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mt-4 border-t border-hairline pt-4">
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-lg bg-canvas-soft px-3 py-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🎁</span>
                          <span className="text-sm text-ink">{formatPrice(item.denomination)}</span>
                        </div>
                        <span className="text-xs font-medium text-ink-mute">
                          x{item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
