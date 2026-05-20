import fs from "fs";
import path from "path";
import { Order } from "@/types";

const ORDERS_FILE = path.join(process.cwd(), "src", "data", "orders.json");

/**
 * Load orders from file
 */
export function loadOrders(): Order[] {
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const data = fs.readFileSync(ORDERS_FILE, "utf8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error loading orders:", error);
  }
  return [];
}

/**
 * Save orders to file
 */
export function saveOrders(orders: Order[]): void {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf8");
  } catch (error) {
    console.error("Error saving orders:", error);
  }
}

/**
 * Get orders by customer email
 */
export function getOrdersByEmail(email: string): Order[] {
  const orders = loadOrders();
  return orders.filter((order) => order.customerEmail === email).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Create a new order
 */
export function createOrder(orderData: Omit<Order, "id" | "createdAt">): Order {
  const orders = loadOrders();
  const order: Order = {
    ...orderData,
    id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  saveOrders(orders);
  return order;
}
