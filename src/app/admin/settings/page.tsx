"use client";

import { useState } from "react";
import { Save, Store, CreditCard, Bell, Globe } from "lucide-react";

export default function AdminSettingsPage() {
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
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Configure your store settings and preferences
        </p>
      </div>

      <div className="max-w-2xl space-y-8">
        {/* Store Settings */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <Store className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">Store Information</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Store Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Email
              </label>
              <input
                type="email"
                value={storeEmail}
                onChange={(e) => setStoreEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">Payment Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="BDT">BDT - Bangladeshi Taka</option>
              </select>
            </div>
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-center">
              <CreditCard className="mx-auto h-6 w-6 text-gray-400" />
              <p className="mt-2 text-sm font-medium text-gray-500">
                Payment gateway integration coming soon
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Connect Stripe, PayPal, or other payment providers
              </p>
            </div>
          </div>
        </div>

        {/* Regional Settings */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">Regional</h2>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Timezone</label>
            <select className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
              <option>UTC (Coordinated Universal Time)</option>
              <option>EST (Eastern Standard Time)</option>
              <option>PST (Pacific Standard Time)</option>
              <option>BST (Bangladesh Standard Time)</option>
            </select>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
          <div className="space-y-3">
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
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
                <button
                  onClick={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      [item.key]: !prev[item.key],
                    }))
                  }
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    notifications[item.key] ? "bg-indigo-600" : "bg-gray-300"
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

        {/* Save Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            <Save className="h-4 w-4" />
            Save Settings
          </button>
          {saved && (
            <span className="text-sm font-medium text-green-600">
              Settings saved successfully!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
