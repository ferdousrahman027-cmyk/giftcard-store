"use client";

import { CATEGORY_LABELS, type ProductCategory } from "@/types";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const categories = Object.entries(CATEGORY_LABELS) as [ProductCategory, string][];

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange(null)}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          selectedCategory === null
            ? "bg-indigo-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        All Products
      </button>
      {categories.map(([key, label]) => (
        <button
          key={key}
          onClick={() => onCategoryChange(key)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            selectedCategory === key
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
