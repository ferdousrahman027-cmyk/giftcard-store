import Link from "next/link";
import { Gift } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-canvas-night">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Gift className="h-7 w-7 text-primary" />
              <span className="text-lg font-semibold tracking-tight text-white">
                Gift<span className="text-primary-soft">Hub</span>
              </span>
            </Link>
            <p className="mt-3 text-sm font-light leading-relaxed text-white/40">
              Your trusted source for gift cards, streaming subscriptions, and AI tool
              subscriptions at the best prices.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-white/60">Products</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/shop?category=gift-cards"
                  className="text-sm font-light text-white/40 transition-colors hover:text-white"
                >
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=streaming"
                  className="text-sm font-light text-white/40 transition-colors hover:text-white"
                >
                  Streaming
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=ai-tools"
                  className="text-sm font-light text-white/40 transition-colors hover:text-white"
                >
                  AI Tools
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-white/60">Support</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <span className="text-sm font-light text-white/40">Help Center</span>
              </li>
              <li>
                <span className="text-sm font-light text-white/40">Contact Us</span>
              </li>
              <li>
                <span className="text-sm font-light text-white/40">FAQ</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-white/60">Legal</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <span className="text-sm font-light text-white/40">Privacy Policy</span>
              </li>
              <li>
                <span className="text-sm font-light text-white/40">Terms of Service</span>
              </li>
              <li>
                <span className="text-sm font-light text-white/40">Refund Policy</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 text-center">
          <p className="text-sm font-light text-white/30">
            &copy; {new Date().getFullYear()} GiftHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
