"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  ArrowLeft,
  Gift,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";
import { AdminAuthProvider, useAdminAuth } from "@/context/AdminAuthContext";
import { useState } from "react";

const navItems = [
  { href: "/manage", label: "Dashboard", icon: LayoutDashboard },
  { href: "/manage/products", label: "Products", icon: Package },
  { href: "/manage/orders", label: "Orders", icon: ShoppingCart },
  { href: "/manage/settings", label: "Settings", icon: Settings },
];

function AdminContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, adminEmail, logout } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === "/manage/login") {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    router.replace("/manage/login");
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-900 transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center gap-3 border-b border-slate-700/50 px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
            <Gift className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-sm font-bold text-white">
              Gift<span className="text-indigo-400">Hub</span>
            </span>
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
              Admin Panel
            </p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto text-slate-400 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Menu
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/manage" && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-indigo-600/20 text-indigo-400"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <item.icon className={`h-[18px] w-[18px] ${isActive ? "text-indigo-400" : ""}`} />
                    {item.label}
                    {isActive && (
                      <div className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-slate-700/50 p-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Store
          </Link>
          <div className="mt-2 flex items-center gap-3 rounded-lg bg-slate-800/50 px-3 py-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600/20">
              <User className="h-4 w-4 text-indigo-400" />
            </div>
            <div className="flex-1 truncate">
              <p className="truncate text-xs font-medium text-slate-300">
                {adminEmail ?? "Admin"}
              </p>
              <p className="text-[10px] text-slate-500">Administrator</p>
            </div>
            <button
              onClick={() => {
                logout();
                router.push("/manage/login");
              }}
              className="rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-700 hover:text-red-400"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-slate-700">{adminEmail ?? "Admin"}</p>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
              <User className="h-4 w-4 text-indigo-600" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default function ManageLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminContent>{children}</AdminContent>
    </AdminAuthProvider>
  );
}
