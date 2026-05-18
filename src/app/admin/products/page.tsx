"use client";

import { useState } from "react";
import { Search, Plus, Edit2, Trash2, Tag } from "lucide-react";
import { products as initialProducts } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { CATEGORY_LABELS, type ProductCategory } from "@/types";

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredProducts = initialProducts.filter((product) => {
    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesCategory =
      categoryFilter === "all" ? true : product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your gift cards and subscriptions
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="all">All Categories</option>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Denominations</th>
                <th className="px-5 py-3">Discount</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-lg">
                        {product.brand === "Apple" && "🍎"}
                        {product.brand === "Steam" && "🎮"}
                        {product.brand === "Google" && "▶️"}
                        {product.brand === "Netflix" && "🎬"}
                        {product.brand === "Amazon" && "📦"}
                        {product.brand === "HBO" && "🎭"}
                        {product.brand === "OpenAI" && "🤖"}
                        {product.brand === "Anthropic" && "🧠"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                      {CATEGORY_LABELS[product.category as ProductCategory]}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1">
                      {product.denominations.map((d) => (
                        <span
                          key={d}
                          className="rounded bg-indigo-50 px-1.5 py-0.5 text-xs font-medium text-indigo-700"
                        >
                          {formatPrice(d)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {product.discount ? (
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600">
                        <Tag className="h-3 w-3" />
                        {product.discount}%
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                      Active
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-indigo-600">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        Showing {filteredProducts.length} of {initialProducts.length} products
      </div>
    </div>
  );
}
