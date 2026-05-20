import { NextRequest } from "next/server";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "admin@gifthub.com";

/**
 * Lightweight admin auth check for API routes.
 * Checks for an X-Admin-Email header matching the configured admin email.
 * Returns true if authorized, false otherwise.
 */
export function isAdminRequest(request: NextRequest): boolean {
  const adminHeader = request.headers.get("x-admin-email");
  if (!adminHeader) return false;
  return adminHeader.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}
