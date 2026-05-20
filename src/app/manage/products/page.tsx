"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  X,
  CheckCircle,
  AlertCircle,
  Tag,
  Gift,
  Tv,
  Brain,
} from "lucide-react";
import { Product, ProductCategory, CATEGORY_LABELS } from "@/types";
import { formatPrice } from "@/lib/utils";

type ProductForm = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  category: ProductCategory;
  brand: string;
  denominations: string;
  featured: boolean;
  popular: boolean;
  discount: string;
  tags: string;
};

const emptyForm: ProductForm = {
  name: "",
  slug: "",
  description: "",
  longDescription: "",
  category: "gift-cards",
  brand: "",
  denominations: "",
  featured: false,
  popular: false,
  discount: "",
  tags: "",
};

const brandEmojis: Record<string, string> = {
  Apple: "🍎",
  Steam: "🎮",
  Google: "▶️",
  Netflix: "🎬",
  Amazon: "📦",
  HBO: "🎭",
  OpenAI: "🤖",
  Anthropic: "🧠",
};

const categoryIcons: Record<ProductCategory, typeof Gift> = {
  "gift-cards": Gift,
  streaming: Tv,
  "ai-tools": Brain,
};

export default function ManageProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      showNotification("error", "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchesCategory =
        categoryFilter === "all" ? true : product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, categoryFilter]);

  const openAddForm = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setIsFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setForm({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      longDescription: product.longDescription,
      category: product.category,
      brand: product.brand,
      denominations: product.denominations.join(", "),
      featured: product.featured,
      popular: product.popular,
      discount: product.discount?.toString() || "",
      tags: product.tags.join(", "),
    });
    setIsFormOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const denominations = form.denominations
        .split(",")
        .map((d) => parseFloat(d.trim()))
        .filter((d) => !isNaN(d));

      if (denominations.length === 0) {
        showNotification("error", "Please enter at least one valid denomination");
        setSaving(false);
        return;
      }

      const discount = form.discount ? parseInt(form.discount) : undefined;
      const tags = form.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);
      const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, "-");

      if (editingProduct) {
        // UPDATE
        const res = await fetch("/api/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingProduct.id,
            name: form.name,
            slug,
            description: form.description,
            longDescription: form.longDescription,
            category: form.category,
            brand: form.brand,
            denominations,
            featured: form.featured,
            popular: form.popular,
            discount,
            tags,
          }),
        });

        if (res.ok) {
          showNotification("success", `"${form.name}" updated successfully`);
        } else {
          const err = await res.json();
          showNotification("error", err.error || "Failed to update product");
        }
      } else {
        // CREATE
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            slug,
            description: form.description,
            longDescription: form.longDescription,
            category: form.category,
            brand: form.brand,
            denominations,
            featured: form.featured,
            popular: form.popular,
            discount,
            tags,
          }),
        });

        if (res.ok) {
          showNotification("success", `"${form.name}" added successfully`);
        } else {
          const err = await res.json();
          showNotification("error", err.error || "Failed to add product");
        }
      }

      setIsFormOpen(false);
      await fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      showNotification("error", "Failed to save product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (productId: string, productName: string) => {
    if (!window.confirm(`Are you sure you want to delete "${productName}"?`)) return;

    try {
      const res = await fetch(`/api/products?id=${productId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        showNotification("success", `"${productName}" deleted successfully`);
        await fetchProducts();
      } else {
        const err = await res.json();
        showNotification("error", err.error || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      showNotification("error", "Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your gift cards and subscriptions
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      {/* Search & Filter */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="all">All Categories</option>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-xl px-4 py-3 shadow-lg ${
            notification.type === "success"
              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
              : "bg-red-50 text-red-700 ring-1 ring-red-200"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <p className="text-sm font-medium">{notification.message}</p>
        </div>
      )}

      {/* Products Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-6 py-3.5">Product</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Denominations</th>
                <th className="px-6 py-3.5">Discount</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-slate-50 transition-colors last:border-0 hover:bg-slate-50/80"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg">
                        {brandEmojis[product.brand] ?? "🎁"}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-slate-500">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                      {CATEGORY_LABELS[product.category as ProductCategory]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {product.denominations.map((d) => (
                        <span
                          key={d}
                          className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700"
                        >
                          {formatPrice(d)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {product.discount ? (
                      <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                        <Tag className="h-3 w-3" />
                        {product.discount}% off
                      </span>
                    ) : (
                      <span className="text-sm text-slate-300">&mdash;</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEditForm(product)}
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                        title="Edit product"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        title="Delete product"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-slate-100 px-6 py-3 text-center text-sm text-slate-500">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsFormOpen(false)}
          />
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Product Name *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g., Apple Gift Card"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Brand *
                  </label>
                  <input
                    name="brand"
                    value={form.brand}
                    onChange={handleInputChange}
                    required
                    list="brands"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g., Apple"
                  />
                  <datalist id="brands">
                    <option value="Apple" />
                    <option value="Steam" />
                    <option value="Google" />
                    <option value="Netflix" />
                    <option value="Amazon" />
                    <option value="HBO" />
                    <option value="OpenAI" />
                    <option value="Anthropic" />
                  </datalist>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="gift-cards">Gift Cards</option>
                    <option value="streaming">Streaming & Entertainment</option>
                    <option value="ai-tools">AI Tools</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Slug (auto-generated if empty)
                  </label>
                  <input
                    name="slug"
                    value={form.slug}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g., apple-gift-card"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Discount (%)
                  </label>
                  <input
                    name="discount"
                    type="number"
                    value={form.discount}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g., 5"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Short Description *
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    required
                    rows={2}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Brief product description"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Long Description *
                  </label>
                  <textarea
                    name="longDescription"
                    value={form.longDescription}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Detailed product description"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Denominations (comma separated) *
                  </label>
                  <input
                    name="denominations"
                    value={form.denominations}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g., 10, 25, 50, 100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Tags (comma separated)
                  </label>
                  <input
                    name="tags"
                    value={form.tags}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g., apple, ios, app-store"
                  />
                </div>

                <div className="md:col-span-2 flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 cursor-pointer hover:bg-slate-50">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={form.featured}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-700">Featured</span>
                  </label>
                  <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 cursor-pointer hover:bg-slate-50">
                    <input
                      type="checkbox"
                      name="popular"
                      checked={form.popular}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-700">Popular</span>
                  </label>
                </div>
              </div>

              {/* Submit */}
              <div className="mt-6 flex gap-3 border-t border-slate-100 pt-6">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500 disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingProduct
                      ? "Update Product"
                      : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
