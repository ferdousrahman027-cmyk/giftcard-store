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
  Image as ImageIcon,
  Tag,
  Gift,
  Tv,
  Brain,
} from "lucide-react";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "@/data/products-admin";
import { ProductCategory, CATEGORY_LABELS } from "@/types";

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
  discount?: string;
  tags: string;
};

const categoryIcons: Record<ProductCategory, any> = {
  "gift-cards": Gift,
  streaming: Tv,
  "ai-tools": Brain,
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductForm>({
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
  });
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Load products on mount
  useEffect(() => {
    const load = async () => {
      const loaded = getAllProducts();
      setProducts(loaded);
      setLoading(false);
    };
    load();
  }, []);

  // Show notification and auto-hide
  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [products, searchQuery]);

  const openAddForm = () => {
    setEditingProduct(null);
    setForm({
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
    });
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
      denominations: product.denominations.join(","),
      featured: product.featured,
      popular: product.popular,
      discount: product.discount?.toString() || "",
      tags: product.tags.join(","),
    });
    setIsFormOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "number") {
      setForm((prev) => ({ ...prev, [name]: value } as ProductForm));
    } else if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Parse denominations
      const denominations = form.denominations
        .split(",")
        .map((d) => parseInt(d.trim()))
        .filter((d) => !isNaN(d));

      if (denominations.length === 0) {
        showNotification("error", "Please enter at least one denomination");
        return;
      }

      // Parse discount
      const discount = form.discount ? parseInt(form.discount) : undefined;

      // Parse tags
      const tags = form.tags.split(",").map((t) => t.trim()).filter((t) => t.length > 0);

      // Generate slug if not provided
      const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, "-");

      if (editingProduct) {
        // Update existing product
        await updateProduct(editingProduct.id, {
          ...form,
          denominations,
          discount: discount || undefined,
          tags,
          image: editingProduct.image, // Keep original image
        });
        showNotification("success", `Product "${form.name}" updated successfully`);
        
        // Refresh products
        const updatedProducts = getAllProducts();
        setProducts(updatedProducts);
      } else {
        // Add new product
        await addProduct({
          id: form.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
          name: form.name,
          slug,
          description: form.description,
          longDescription: form.longDescription,
          category: form.category,
          brand: form.brand,
          image: `/images/${slug}.svg`,
          denominations,
          featured: form.featured,
          popular: form.popular,
          discount: discount || undefined,
          tags,
        });
        showNotification("success", `Product "${form.name}" added successfully`);
        
        // Refresh products
        const newProducts = getAllProducts();
        setProducts(newProducts);
      }

      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
      showNotification("error", "Failed to save product. Please try again.");
    }
  };

  const handleDelete = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const deleted = deleteProduct(productId);
      if (deleted) {
        showNotification("success", "Product deleted successfully");
        const updatedProducts = getAllProducts();
        setProducts(updatedProducts);
      } else {
        showNotification("error", "Failed to delete product");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="mt-1 text-sm text-slate-500">Manage your gift cards and subscriptions</p>
        </div>
        <button
          onClick={openAddForm}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-deep hover:shadow-xl"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-mute" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-hairline bg-white py-2 pl-10 pr-4 text-sm text-ink placeholder-ink-mute focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-xl px-4 py-3 shadow-lg ${
            notification.type === "success"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
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

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-hairline bg-canvas-soft p-12 text-center">
          <Gift className="mx-auto h-12 w-12 text-ink-mute" />
          <h3 className="mt-4 text-lg font-medium text-ink">No products found</h3>
          <p className="mt-1 text-ink-mute">Try adjusting your search or add a new product.</p>
          <button
            onClick={openAddForm}
            className="mt-4 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white"
          >
            Add Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => {
            const CategoryIcon = categoryIcons[product.category];
            return (
              <div
                key={product.id}
                className="group relative overflow-hidden rounded-2xl border border-hairline bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image placeholder */}
                <div className="flex h-24 items-center justify-center rounded-xl bg-canvas-soft text-4xl">
                  {product.brand === "Apple" && "🍎"}
                  {product.brand === "Steam" && "🎮"}
                  {product.brand === "Google" && "▶️"}
                  {product.brand === "Netflix" && "🎬"}
                  {product.brand === "Amazon" && "📦"}
                  {product.brand === "HBO" && "🎭"}
                  {product.brand === "OpenAI" && "🤖"}
                  {product.brand === "Anthropic" && "🧠"}
                  {product.brand === "Gift Card" && "🎁"}
                </div>

                {/* Badges */}
                <div className="mt-4 flex gap-2">
                  <span className="inline-flex items-center rounded-full bg-canvas-soft px-2.5 py-1 text-xs font-medium text-ink">
                    <CategoryIcon className="mr-1 h-3 w-3" />
                    {CATEGORY_LABELS[product.category]}
                  </span>
                  {product.popular && (
                    <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                      Popular
                    </span>
                  )}
                  {product.featured && (
                    <span className="inline-flex items-center rounded-full bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700">
                      Featured
                    </span>
                  )}
                  {product.discount && (
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>

                <h3 className="mt-3 text-base font-semibold text-ink">{product.name}</h3>
                <p className="text-sm text-ink-mute">{product.brand}</p>
                <p className="mt-2 line-clamp-2 text-sm text-ink-mute">{product.description}</p>

                <div className="mt-4 flex items-center gap-2">
                  {product.denominations.slice(0, 3).map((denom) => (
                    <span key={denom} className="rounded-lg bg-canvas-soft px-2 py-1 text-xs font-medium text-ink">
                      ${denom}
                    </span>
                  ))}
                  {product.denominations.length > 3 && (
                    <span className="rounded-lg bg-canvas-soft px-2 py-1 text-xs text-ink-mute">
                      +{product.denominations.length - 3} more
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-2 border-t border-hairline pt-4">
                  <button
                    onClick={() => openEditForm(product)}
                    className="flex-1 rounded-lg border border-hairline bg-white py-2 text-sm font-medium text-ink transition-colors hover:bg-canvas-soft"
                  >
                    <Edit className="mx-auto h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 rounded-lg bg-red-50 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                  >
                    <Trash2 className="mx-auto h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsFormOpen(false)}
          ></div>
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-hairline bg-canvas-soft px-6 py-4">
              <h2 className="text-lg font-semibold text-ink">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="rounded-full p-2 text-ink-mute hover:bg-canvas-soft"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Basic Info */}
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-ink">Product Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border border-hairline bg-white px-4 py-2.5 text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="e.g., Apple Gift Card"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-ink">Brand</label>
                  <input
                    name="brand"
                    value={form.brand}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border border-hairline bg-white px-4 py-2.5 text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    list="brands"
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
                  <label className="mb-1 block text-sm font-medium text-ink">Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-hairline bg-white px-4 py-2.5 text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="gift-cards">Gift Cards</option>
                    <option value="streaming">Streaming</option>
                    <option value="ai-tools">AI Tools</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-ink">Discount (%)</label>
                  <input
                    name="discount"
                    type="number"
                    value={form.discount}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className="w-full rounded-xl border border-hairline bg-white px-4 py-2.5 text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="e.g., 10"
                  />
                </div>

                {/* Descriptions */}
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-ink">Short Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    required
                    rows={2}
                    className="w-full rounded-xl border border-hairline bg-white px-4 py-2.5 text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Brief product description"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-ink">Long Description</label>
                  <textarea
                    name="longDescription"
                    value={form.longDescription}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full rounded-xl border border-hairline bg-white px-4 py-2.5 text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Detailed product description"
                  />
                </div>

                {/* Denominations */}
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-ink">
                    Denominations (comma separated)
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-mute" />
                    <input
                      name="denominations"
                      value={form.denominations}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl border border-hairline bg-white pl-10 pr-4 py-2.5 text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="e.g., 10, 25, 50, 100"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-ink">Tags (comma separated)</label>
                  <input
                    name="tags"
                    value={form.tags}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-hairline bg-white px-4 py-2.5 text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="e.g., apple, ios, app-store"
                  />
                </div>

                {/* Features */}
                <div className="md:col-span-2 flex gap-6">
                  <label className="flex items-center gap-3 rounded-xl bg-canvas-soft px-4 py-3">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={form.featured}
                      onChange={handleInputChange}
                      className="h-5 w-5 rounded text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-ink">Featured Product</span>
                  </label>
                  <label className="flex items-center gap-3 rounded-xl bg-canvas-soft px-4 py-3">
                    <input
                      type="checkbox"
                      name="popular"
                      checked={form.popular}
                      onChange={handleInputChange}
                      className="h-5 w-5 rounded text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-ink">Popular Product</span>
                  </label>
                </div>
              </div>

              {/* Submit */}
              <div className="mt-6 flex gap-3 border-t border-hairline pt-6">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 rounded-full border border-hairline bg-white py-3 text-sm font-medium text-ink transition-colors hover:bg-canvas-soft"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-primary py-3 text-sm font-medium text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-deep hover:shadow-xl"
                >
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
