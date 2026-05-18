import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GiftHub - Gift Cards, Streaming & AI Subscriptions",
  description:
    "Buy gift cards for Apple, Steam, Google Play and subscriptions for Netflix, Prime Video, HBO Max, ChatGPT, Claude and more at the best prices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
