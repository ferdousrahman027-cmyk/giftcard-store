"use client";

import { useState, useMemo, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import CategoryFilter from "@/components/products/CategoryFilter";

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCategory = searchParams.get("category");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = useCallback(
    (category: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (category) {
        params.set("category", category);
      } else {
        params.delete("category");
      }
      router.replace(`/shop?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

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
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <SlidersHorizontal className="h-4 w-4" />
          </div>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-mute" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-hairline bg-white py-2.5 pl-10 pr-4 text-sm text-ink shadow-sm placeholder:text-ink-mute/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-72"
          />
        </div>
      </div>

      <p className="mb-6 text-sm text-ink-mute">
        Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
      </p>

      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-hairline bg-canvas-soft py-20 text-center">
          <Search className="mx-auto h-10 w-10 text-ink-mute/30" />
          <p className="mt-4 text-lg font-light text-ink-mute">No products found</p>
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
    <div>
      <div className="relative overflow-hidden bg-canvas-night">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 30% 70%, #533afd 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 70% 30%, #c1fbd4 0%, transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-light tracking-[-0.04em] text-white sm:text-4xl">Shop</h1>
          <p className="mt-2 text-base font-light text-white/50">
            Browse our collection of gift cards and subscriptions
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="py-8 text-center text-ink-mute">Loading...</div>}>
        <ShopContent />
      </Suspense>
      </div>
    </div>
  );
}
