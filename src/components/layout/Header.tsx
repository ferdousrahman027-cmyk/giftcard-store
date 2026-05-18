"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X, Gift } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Header() {
  const { totalItems, isCartOpen, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-hairline bg-white/90 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Gift className="h-7 w-7 text-primary" />
            <span className="text-lg font-semibold tracking-tight text-ink">
              Gift<span className="text-primary">Hub</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <Link
              href="/"
              className="text-[15px] font-light text-ink-mute transition-colors hover:text-ink"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-[15px] font-light text-ink-mute transition-colors hover:text-ink"
            >
              Shop
            </Link>
            <Link
              href="/shop?category=gift-cards"
              className="text-[15px] font-light text-ink-mute transition-colors hover:text-ink"
            >
              Gift Cards
            </Link>
            <Link
              href="/shop?category=streaming"
              className="text-[15px] font-light text-ink-mute transition-colors hover:text-ink"
            >
              Streaming
            </Link>
            <Link
              href="/shop?category=ai-tools"
              className="text-[15px] font-light text-ink-mute transition-colors hover:text-ink"
            >
              AI Tools
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative rounded-full p-2 text-ink-mute transition-colors hover:bg-canvas-soft hover:text-ink"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white">
                  {totalItems}
                </span>
              )}
            </button>

            <Link
              href="/shop"
              className="hidden rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-deep sm:inline-flex"
            >
              Shop Now
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full p-2 text-ink-mute hover:bg-canvas-soft md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-hairline bg-white md:hidden">
            <nav className="flex flex-col px-4 py-3">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] font-light text-ink transition-colors hover:bg-canvas-soft"
              >
                Home
              </Link>
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] font-light text-ink transition-colors hover:bg-canvas-soft"
              >
                Shop
              </Link>
              <Link
                href="/shop?category=gift-cards"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] font-light text-ink transition-colors hover:bg-canvas-soft"
              >
                Gift Cards
              </Link>
              <Link
                href="/shop?category=streaming"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] font-light text-ink transition-colors hover:bg-canvas-soft"
              >
                Streaming
              </Link>
              <Link
                href="/shop?category=ai-tools"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] font-light text-ink transition-colors hover:bg-canvas-soft"
              >
                AI Tools
              </Link>
              <div className="mt-2 px-3">
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full rounded-full bg-primary py-2.5 text-center text-sm font-medium text-white"
                >
                  Shop Now
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
