import { NextRequest, NextResponse } from "next/server";
import { products as defaultProducts } from "@/data/products";
import { Product } from "@/types";
import fs from "fs";
import path from "path";

const PRODUCTS_FILE = path.join(process.cwd(), "src", "data", "products.json");

function loadProducts(): Product[] {
  try {
    if (fs.existsSync(PRODUCTS_FILE)) {
      const data = fs.readFileSync(PRODUCTS_FILE, "utf8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error loading products:", error);
  }
  return defaultProducts;
}

function saveProducts(products: Product[]): void {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf8");
  } catch (error) {
    console.error("Error saving products:", error);
  }
}

/**
 * GET /api/products - Get all products
 */
export async function GET() {
  try {
    const products = loadProducts();
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

/**
 * POST /api/products - Add a new product
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description, longDescription, category, brand, denominations, featured, popular, discount, tags } = body;

    if (!name || !description || !category || !brand || !denominations || denominations.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const products = loadProducts();
    const newProduct: Product = {
      id: slug || name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
      description,
      longDescription: longDescription || description,
      category,
      brand,
      image: `/images/${slug || name.toLowerCase().replace(/\s+/g, "-")}.svg`,
      denominations,
      featured: featured || false,
      popular: popular || false,
      discount: discount || undefined,
      tags: tags || [],
    };

    products.push(newProduct);
    saveProducts(products);

    return NextResponse.json({ product: newProduct, success: true }, { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}

/**
 * PUT /api/products - Update a product
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const products = loadProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    products[index] = { ...products[index], ...updates, id };
    saveProducts(products);

    return NextResponse.json({ product: products[index], success: true });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

/**
 * DELETE /api/products - Delete a product
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const products = loadProducts();
    const filtered = products.filter((p) => p.id !== id);

    if (filtered.length === products.length) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    saveProducts(filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
