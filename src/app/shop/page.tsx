"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import CategoryFilter from "@/components/products/CategoryFilter";

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParam
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      const matchesSearch = searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-mute" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-hairline bg-white py-2 pl-10 pr-4 text-sm text-ink placeholder-ink-mute focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:w-64"
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg font-medium text-ink-mute">No products found</p>
          <p className="mt-1 text-sm text-ink-mute/60">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-[-0.03em] text-ink">Shop</h1>
        <p className="mt-2 text-ink-mute">
          Browse our collection of gift cards and subscriptions
        </p>
      </div>
      <Suspense fallback={<div className="py-8 text-center text-ink-mute">Loading...</div>}>
        <ShopContent />
      </Suspense>
    </div>
  );
}
