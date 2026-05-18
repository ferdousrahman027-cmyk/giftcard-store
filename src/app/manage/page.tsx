"use client";

import {
  DollarSign,
  ShoppingCart,
  Package,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react";

const stats = [
  {
    name: "Total Revenue",
    value: "$12,450",
    change: "+12.5%",
    trend: "up" as const,
    icon: DollarSign,
    gradient: "from-indigo-500 to-indigo-600",
    shadowColor: "shadow-indigo-500/25",
  },
  {
    name: "Total Orders",
    value: "284",
    change: "+8.2%",
    trend: "up" as const,
    icon: ShoppingCart,
    gradient: "from-emerald-500 to-emerald-600",
    shadowColor: "shadow-emerald-500/25",
  },
  {
    name: "Products Sold",
    value: "1,420",
    change: "+23.1%",
    trend: "up" as const,
    icon: Package,
    gradient: "from-violet-500 to-violet-600",
    shadowColor: "shadow-violet-500/25",
  },
  {
    name: "Conversion Rate",
    value: "3.2%",
    change: "-0.4%",
    trend: "down" as const,
    icon: TrendingUp,
    gradient: "from-amber-500 to-amber-600",
    shadowColor: "shadow-amber-500/25",
  },
];

const recentOrders = [
  {
    id: "ORD-M2K8X-A1B2",
    customer: "Alex Johnson",
    product: "Apple Gift Card",
    amount: "$50.00",
    status: "completed",
    date: "2 min ago",
  },
  {
    id: "ORD-N3L9Y-C4D5",
    customer: "Sarah Chen",
    product: "Netflix Subscription",
    amount: "$15.20",
    status: "processing",
    date: "15 min ago",
  },
  {
    id: "ORD-P4M0Z-E6F7",
    customer: "Mike Wilson",
    product: "Steam Gift Card",
    amount: "$100.00",
    status: "completed",
    date: "1 hour ago",
  },
  {
    id: "ORD-Q5N1A-G8H9",
    customer: "Emily Davis",
    product: "ChatGPT Plus",
    amount: "$20.00",
    status: "pending",
    date: "2 hours ago",
  },
  {
    id: "ORD-R6O2B-I0J1",
    customer: "James Brown",
    product: "Google Play Gift Card",
    amount: "$25.00",
    status: "completed",
    date: "3 hours ago",
  },
];

const topProducts = [
  { name: "Apple Gift Card", sales: 342, revenue: "$14,520", percent: 100 },
  { name: "Steam Gift Card", sales: 280, revenue: "$11,200", percent: 82 },
  { name: "Netflix Subscription", sales: 256, revenue: "$3,891", percent: 75 },
  { name: "ChatGPT Plus", sales: 198, revenue: "$3,960", percent: 58 },
  { name: "Google Play Gift Card", sales: 165, revenue: "$5,280", percent: 48 },
];

const statusStyles: Record<string, string> = {
  completed: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20",
  processing: "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20",
  pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20",
  cancelled: "bg-red-50 text-red-700 ring-1 ring-red-600/20",
};

export default function ManageDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Welcome back! Here&apos;s an overview of your store.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg ${stat.shadowColor}`}
              >
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <div
                className={`flex items-center gap-0.5 rounded-full px-2 py-1 text-xs font-semibold ${
                  stat.trend === "up"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {stat.change}
              </div>
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.name}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm xl:col-span-3">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h2 className="text-base font-semibold text-slate-900">Recent Orders</h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              Updated just now
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs font-medium text-slate-500">
                  <th className="px-6 py-3">Order</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-slate-50 transition-colors last:border-0 hover:bg-slate-50/50"
                  >
                    <td className="px-6 py-3.5">
                      <p className="text-xs font-semibold text-slate-900">{order.id}</p>
                      <p className="text-[11px] text-slate-400">{order.date}</p>
                    </td>
                    <td className="px-6 py-3.5">
                      <p className="text-sm text-slate-700">{order.customer}</p>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-slate-600">{order.product}</td>
                    <td className="px-6 py-3.5 text-sm font-semibold text-slate-900">
                      {order.amount}
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${
                          statusStyles[order.status] ?? "bg-slate-50 text-slate-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm xl:col-span-2">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="text-base font-semibold text-slate-900">Top Products</h2>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <div key={product.name} className="rounded-xl bg-slate-50/80 p-3.5">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-xs font-bold text-indigo-600">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-slate-500">{product.sales} sales</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-slate-900">
                      {product.revenue}
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400"
                      style={{ width: `${product.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
