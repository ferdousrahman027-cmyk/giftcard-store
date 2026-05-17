import Link from "next/link";
import { Gift } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Gift className="h-7 w-7 text-indigo-600" />
              <span className="text-lg font-bold text-gray-900">
                Gift<span className="text-indigo-600">Hub</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-500">
              Your trusted source for gift cards, streaming subscriptions, and AI tool
              subscriptions at the best prices.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Products</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/shop?category=gift-cards"
                  className="text-sm text-gray-500 hover:text-indigo-600"
                >
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=streaming"
                  className="text-sm text-gray-500 hover:text-indigo-600"
                >
                  Streaming
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=ai-tools"
                  className="text-sm text-gray-500 hover:text-indigo-600"
                >
                  AI Tools
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Support</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <span className="text-sm text-gray-500">Help Center</span>
              </li>
              <li>
                <span className="text-sm text-gray-500">Contact Us</span>
              </li>
              <li>
                <span className="text-sm text-gray-500">FAQ</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <span className="text-sm text-gray-500">Privacy Policy</span>
              </li>
              <li>
                <span className="text-sm text-gray-500">Terms of Service</span>
              </li>
              <li>
                <span className="text-sm text-gray-500">Refund Policy</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} GiftHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
