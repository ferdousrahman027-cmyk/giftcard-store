import { NextRequest, NextResponse } from "next/server";
import { createOrder, loadOrders } from "@/data/orders";
import { isAdminRequest } from "@/lib/admin-auth";

/**
 * GET /api/orders - Get orders
 * ?email=x  → filter by customer email
 * ?all=true → return all orders (admin)
 */
export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email");
    const all = request.nextUrl.searchParams.get("all");

    const orders = loadOrders();

    // Admin: return all orders sorted by most recent
    if (all === "true") {
      if (!isAdminRequest(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const sorted = orders.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      return NextResponse.json({ orders: sorted });
    }

    // Customer: filter by email
    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    const userOrders = orders
      .filter((order) => order.customerEmail.toLowerCase() === email.toLowerCase())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ orders: userOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/orders - Create a new order
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, items, total } = body;

    if (!email || !name || !items || !total) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const order = createOrder({
      items,
      total,
      status: "pending",
      customerEmail: email,
      customerName: name,
    });

    return NextResponse.json({ order, success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
