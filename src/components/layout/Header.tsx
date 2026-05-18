"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X, Gift, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Header() {
  const { totalItems, isCartOpen, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Gift className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">
              Gift<span className="text-indigo-600">Hub</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-indigo-600"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-indigo-600"
            >
              Shop
            </Link>
            <Link
              href="/shop?category=gift-cards"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-indigo-600"
            >
              Gift Cards
            </Link>
            <Link
              href="/shop?category=streaming"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-indigo-600"
            >
              Streaming
            </Link>
            <Link
              href="/shop?category=ai-tools"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-indigo-600"
            >
              AI Tools
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/shop"
              className="hidden text-gray-500 transition-colors hover:text-indigo-600 sm:block"
            >
              <Search className="h-5 w-5" />
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-700 transition-colors hover:text-indigo-600"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>

            <Link
              href="/admin"
              className="hidden rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 sm:block"
            >
              Admin
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 md:hidden"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white md:hidden">
            <nav className="flex flex-col px-4 py-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Home
              </Link>
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Shop
              </Link>
              <Link
                href="/shop?category=gift-cards"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Gift Cards
              </Link>
              <Link
                href="/shop?category=streaming"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Streaming
              </Link>
              <Link
                href="/shop?category=ai-tools"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                AI Tools
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 rounded-lg bg-gray-900 px-3 py-2 text-center text-sm font-medium text-white hover:bg-gray-700"
              >
                Admin Dashboard
              </Link>
            </nav>
          </div>
        )}
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
