"use client";

import { useState } from "react";
import { Search, Eye, Download } from "lucide-react";

const orders = [
  {
    id: "ORD-M2K8X-A1B2",
    customer: "Alex Johnson",
    email: "alex@example.com",
    products: [{ name: "Apple Gift Card", amount: "$50.00", qty: 1 }],
    total: "$50.00",
    status: "completed",
    date: "May 17, 2026, 6:30 PM",
  },
  {
    id: "ORD-N3L9Y-C4D5",
    customer: "Sarah Chen",
    email: "sarah@example.com",
    products: [{ name: "Netflix Subscription", amount: "$15.20", qty: 1 }],
    total: "$15.20",
    status: "processing",
    date: "May 17, 2026, 6:15 PM",
  },
  {
    id: "ORD-P4M0Z-E6F7",
    customer: "Mike Wilson",
    email: "mike@example.com",
    products: [
      { name: "Steam Gift Card", amount: "$100.00", qty: 1 },
      { name: "ChatGPT Plus", amount: "$20.00", qty: 1 },
    ],
    total: "$120.00",
    status: "completed",
    date: "May 17, 2026, 5:30 PM",
  },
  {
    id: "ORD-Q5N1A-G8H9",
    customer: "Emily Davis",
    email: "emily@example.com",
    products: [{ name: "ChatGPT Plus", amount: "$20.00", qty: 2 }],
    total: "$40.00",
    status: "pending",
    date: "May 17, 2026, 4:30 PM",
  },
  {
    id: "ORD-R6O2B-I0J1",
    customer: "James Brown",
    email: "james@example.com",
    products: [{ name: "Google Play Gift Card", amount: "$25.00", qty: 3 }],
    total: "$75.00",
    status: "completed",
    date: "May 17, 2026, 3:30 PM",
  },
  {
    id: "ORD-S7P3C-K2L3",
    customer: "Lisa Park",
    email: "lisa@example.com",
    products: [{ name: "Claude Pro", amount: "$20.00", qty: 1 }],
    total: "$20.00",
    status: "cancelled",
    date: "May 17, 2026, 2:00 PM",
  },
  {
    id: "ORD-T8Q4D-M4N5",
    customer: "David Kim",
    email: "david@example.com",
    products: [
      { name: "Apple Gift Card", amount: "$100.00", qty: 2 },
      { name: "Netflix Subscription", amount: "$21.85", qty: 1 },
    ],
    total: "$221.85",
    status: "completed",
    date: "May 17, 2026, 1:15 PM",
  },
];

const statusColors: Record<string, string> = {
  completed: "bg-green-50 text-green-700",
  processing: "bg-blue-50 text-blue-700",
  pending: "bg-yellow-50 text-yellow-700",
  cancelled: "bg-red-50 text-red-700",
};

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = searchQuery
      ? order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.email.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesStatus =
      statusFilter === "all" ? true : order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage customer orders
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order ID, customer, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                <th className="px-5 py-3">Order</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Products</th>
                <th className="px-5 py-3">Total</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-900">{order.id}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {order.customer}
                    </p>
                    <p className="text-xs text-gray-500">{order.email}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="space-y-0.5">
                      {order.products.map((p, i) => (
                        <p key={i} className="text-xs text-gray-600">
                          {p.name}{" "}
                          {p.qty > 1 && (
                            <span className="text-gray-400">x{p.qty}</span>
                          )}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-gray-900">
                      {order.total}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                        statusColors[order.status] ?? "bg-gray-50 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-500">{order.date}</td>
                  <td className="px-5 py-4 text-right">
                    <button className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-indigo-600">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        Showing {filteredOrders.length} of {orders.length} orders
      </div>
    </div>
  );
}
