"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Search,
  Download,
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  RefreshCw,
  ShieldAlert,
} from "lucide-react";
import { Order } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useAdminAuth } from "@/context/AdminAuthContext";

const statusStyles: Record<string, string> = {
  completed: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20",
  processing: "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20",
  pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20",
  cancelled: "bg-red-50 text-red-700 ring-1 ring-red-600/20",
};

const statusIcons: Record<string, typeof Clock> = {
  pending: Clock,
  processing: RefreshCw,
  completed: CheckCircle2,
  cancelled: XCircle,
};

export default function ManageOrdersPage() {
  const { adminEmail } = useAdminAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = useCallback(async () => {
    if (!adminEmail) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders?all=true", {
        headers: { "x-admin-email": adminEmail },
      });
      const data = await res.json();

      if (!res.ok) {
        setOrders([]);
        setError(data.error || "Unable to load orders");
        return;
      }

      setOrders(Array.isArray(data.orders) ? data.orders : []);
    } catch (fetchError) {
      console.error("Error fetching orders:", fetchError);
      setOrders([]);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, [adminEmail]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = searchQuery
        ? order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchesStatus = statusFilter === "all" ? true : order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  const stats = useMemo(() => {
    const total = orders.length;
    const completed = orders.filter((o) => o.status === "completed").length;
    const pending = orders.filter((o) => o.status === "pending").length;
    const revenue = orders
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + o.total, 0);
    return { total, completed, pending, revenue };
  }, [orders]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
          <p className="mt-1 text-sm text-slate-500">View and manage customer orders</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchOrders}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Total Orders</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{stats.total}</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Completed</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">{stats.completed}</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Pending</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">{stats.pending}</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Revenue</p>
          <p className="mt-1 text-2xl font-bold text-indigo-600">{formatPrice(stats.revenue)}</p>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by order ID, customer, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <ShieldAlert className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {filteredOrders.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
          <AlertCircle className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="mt-4 text-lg font-medium text-slate-900">No orders found</h3>
          <p className="mt-1 text-sm text-slate-500">
            {orders.length === 0
              ? error || "No orders have been placed yet."
              : "Try adjusting your search or filter."}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-3.5">Order</th>
                  <th className="px-6 py-3.5">Customer</th>
                  <th className="px-6 py-3.5">Items</th>
                  <th className="px-6 py-3.5">Total</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const StatusIcon = statusIcons[order.status] || Clock;
                  return (
                    <tr
                      key={order.id}
                      className="border-b border-slate-50 transition-colors last:border-0 hover:bg-slate-50/80"
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-slate-900">{order.id}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-900">{order.customerName}</p>
                        <p className="text-xs text-slate-500">{order.customerEmail}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600">
                          {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-slate-900">{formatPrice(order.total)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${
                            statusStyles[order.status] ?? "bg-slate-50 text-slate-700"
                          }`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                          title="View order details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="border-t border-slate-100 px-6 py-3 text-center text-sm text-slate-500">
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedOrder(null)}
          />
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-semibold text-slate-900">Order Details</h2>
            <p className="text-sm text-slate-500">{selectedOrder.id}</p>

            <div className="mt-4 space-y-3">
              <div className="flex justify-between rounded-lg bg-slate-50 p-3">
                <span className="text-sm text-slate-600">Customer</span>
                <span className="text-sm font-medium text-slate-900">{selectedOrder.customerName}</span>
              </div>
              <div className="flex justify-between rounded-lg bg-slate-50 p-3">
                <span className="text-sm text-slate-600">Email</span>
                <span className="text-sm font-medium text-slate-900">{selectedOrder.customerEmail}</span>
              </div>
              <div className="flex justify-between rounded-lg bg-slate-50 p-3">
                <span className="text-sm text-slate-600">Status</span>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusStyles[selectedOrder.status]}`}
                >
                  {selectedOrder.status}
                </span>
              </div>
              <div className="flex justify-between rounded-lg bg-slate-50 p-3">
                <span className="text-sm text-slate-600">Date</span>
                <span className="text-sm font-medium text-slate-900">
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-sm font-medium text-slate-700">Items</p>
              <div className="space-y-2">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-lg border border-slate-100 p-3">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{formatPrice(item.denomination)} card</p>
                      <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-slate-900">
                      {formatPrice(item.denomination * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-base font-semibold text-slate-900">Total</span>
              <span className="text-xl font-bold text-indigo-600">{formatPrice(selectedOrder.total)}</span>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-6 w-full rounded-xl bg-slate-100 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
