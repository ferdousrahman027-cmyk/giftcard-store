import { NextRequest, NextResponse } from "next/server";
import { createOrder, loadOrders } from "@/data/orders";

/**
 * GET /api/orders - Get orders for a specific email
 */
export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email");
    
    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    const orders = loadOrders();
    const userOrders = orders.filter(
      (order) => order.customerEmail.toLowerCase() === email.toLowerCase()
    );

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
