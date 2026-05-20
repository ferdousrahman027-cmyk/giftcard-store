"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { type CartItem } from "@/types";
import { getProductById } from "@/data/products";
import { createOrder } from "@/data/orders";

interface CartContextType {
  items: CartItem[];
  addItem: (productId: string, denomination: number, quantity?: number) => void;
  removeItem: (productId: string, denomination: number) => void;
  updateQuantity: (productId: string, denomination: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  placeOrder: (email: string, name: string) => Promise<string | null>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = useCallback(
    (productId: string, denomination: number, quantity: number = 1) => {
      setItems((prev) => {
        const existing = prev.find(
          (item) => item.productId === productId && item.denomination === denomination
        );
        if (existing) {
          return prev.map((item) =>
            item.productId === productId && item.denomination === denomination
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { productId, denomination, quantity }];
      });
      setIsCartOpen(true);
    },
    []
  );

  const removeItem = useCallback((productId: string, denomination: number) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.denomination === denomination)
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, denomination: number, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, denomination);
        return;
      }
      setItems((prev) =>
        prev.map((item) =>
          item.productId === productId && item.denomination === denomination
            ? { ...item, quantity }
            : item
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce((sum, item) => {
    const product = getProductById(item.productId);
    const price = product?.discount
      ? item.denomination * (1 - product.discount / 100)
      : item.denomination;
    return sum + price * item.quantity;
  }, 0);

  const placeOrder = async (email: string, name: string): Promise<string | null> => {
    if (items.length === 0) return null;

    const order = createOrder({
      items: [...items],
      total: totalPrice,
      status: "pending",
      customerEmail: email,
      customerName: name,
    });

    clearCart();
    return order.id;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
