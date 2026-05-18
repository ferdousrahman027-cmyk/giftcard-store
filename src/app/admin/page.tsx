import {
  DollarSign,
  ShoppingCart,
  Package,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const stats = [
  {
    name: "Total Revenue",
    value: "$12,450",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    name: "Total Orders",
    value: "284",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    name: "Products Sold",
    value: "1,420",
    change: "+23.1%",
    trend: "up",
    icon: Package,
  },
  {
    name: "Conversion Rate",
    value: "3.2%",
    change: "-0.4%",
    trend: "down",
    icon: TrendingUp,
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
  { name: "Apple Gift Card", sales: 342, revenue: "$14,520" },
  { name: "Steam Gift Card", sales: 280, revenue: "$11,200" },
  { name: "Netflix Subscription", sales: 256, revenue: "$3,891" },
  { name: "ChatGPT Plus", sales: 198, revenue: "$3,960" },
  { name: "Google Play Gift Card", sales: 165, revenue: "$5,280" },
];

const statusColors: Record<string, string> = {
  completed: "bg-green-50 text-green-700",
  processing: "bg-blue-50 text-blue-700",
  pending: "bg-yellow-50 text-yellow-700",
  cancelled: "bg-red-50 text-red-700",
};

export default function AdminDashboard() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back! Here&apos;s an overview of your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                <stat.icon className="h-5 w-5 text-indigo-600" />
              </div>
              <div
                className={`flex items-center gap-0.5 text-xs font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
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
            <p className="mt-3 text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.name}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Recent Orders */}
        <div className="rounded-xl border border-gray-200 bg-white lg:col-span-3">
          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className="text-base font-semibold text-gray-900">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs font-medium text-gray-500">
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-50 last:border-0"
                  >
                    <td className="px-5 py-3">
                      <p className="text-xs font-medium text-gray-900">{order.id}</p>
                      <p className="text-xs text-gray-400">{order.date}</p>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-700">{order.customer}</td>
                    <td className="px-5 py-3 text-sm text-gray-700">{order.product}</td>
                    <td className="px-5 py-3 text-sm font-medium text-gray-900">
                      {order.amount}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                          statusColors[order.status] ?? "bg-gray-50 text-gray-700"
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

        {/* Top Products */}
        <div className="rounded-xl border border-gray-200 bg-white lg:col-span-2">
          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className="text-base font-semibold text-gray-900">Top Products</h2>
          </div>
          <div className="px-5 py-3">
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">{product.sales} sales</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {product.revenue}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
