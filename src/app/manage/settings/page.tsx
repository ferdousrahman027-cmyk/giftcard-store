"use client";

import { useState } from "react";
import { Save, Store, CreditCard, Bell, Globe, Shield } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function ManageSettingsPage() {
  const { adminEmail } = useAdminAuth();
  const [storeName, setStoreName] = useState("GiftHub");
  const [storeEmail, setStoreEmail] = useState("admin@gifthub.com");
  const [currency, setCurrency] = useState("USD");
  const [notifications, setNotifications] = useState({
    orderConfirmation: true,
    lowStock: true,
    newCustomer: false,
    weeklyReport: true,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Configure your store settings and preferences
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
              <Store className="h-4 w-4 text-indigo-600" />
            </div>
            <h2 className="text-base font-semibold text-slate-900">Store Information</h2>
          </div>
          <div className="space-y-4 p-6">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Store Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Contact Email
              </label>
              <input
                type="email"
                value={storeEmail}
                onChange={(e) => setStoreEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
              <CreditCard className="h-4 w-4 text-emerald-600" />
            </div>
            <h2 className="text-base font-semibold text-slate-900">Payment Settings</h2>
          </div>
          <div className="space-y-4 p-6">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="BDT">BDT - Bangladeshi Taka</option>
              </select>
            </div>
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center">
              <CreditCard className="mx-auto h-6 w-6 text-slate-400" />
              <p className="mt-2 text-sm font-medium text-slate-500">
                Payment gateway integration coming soon
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Connect Stripe, PayPal, or other payment providers
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50">
              <Globe className="h-4 w-4 text-violet-600" />
            </div>
            <h2 className="text-base font-semibold text-slate-900">Regional</h2>
          </div>
          <div className="p-6">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Timezone</label>
            <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
              <option>UTC (Coordinated Universal Time)</option>
              <option>EST (Eastern Standard Time)</option>
              <option>PST (Pacific Standard Time)</option>
              <option>BST (Bangladesh Standard Time)</option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50">
              <Bell className="h-4 w-4 text-amber-600" />
            </div>
            <h2 className="text-base font-semibold text-slate-900">Notifications</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              {
                key: "orderConfirmation" as const,
                label: "Order Confirmations",
                description: "Receive notifications when new orders are placed",
              },
              {
                key: "lowStock" as const,
                label: "Low Stock Alerts",
                description: "Get notified when product stock is running low",
              },
              {
                key: "newCustomer" as const,
                label: "New Customer Alerts",
                description: "Notification when a new customer registers",
              },
              {
                key: "weeklyReport" as const,
                label: "Weekly Reports",
                description: "Receive weekly sales and performance reports",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between px-6 py-4"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.description}</p>
                </div>
                <button
                  onClick={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      [item.key]: !prev[item.key],
                    }))
                  }
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    notifications[item.key] ? "bg-indigo-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                      notifications[item.key] ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
              <Shield className="h-4 w-4 text-red-600" />
            </div>
            <h2 className="text-base font-semibold text-slate-900">Admin Account</h2>
          </div>
          <div className="p-6">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-600">
                Logged in as <span className="font-semibold text-slate-900">{adminEmail}</span>
              </p>
              <p className="mt-1 text-xs text-slate-400">
                To change admin credentials, update the values in the source code.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pb-8">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500"
          >
            <Save className="h-4 w-4" />
            Save Settings
          </button>
          {saved && (
            <span className="text-sm font-medium text-emerald-600">
              Settings saved successfully!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
