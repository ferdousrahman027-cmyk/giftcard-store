"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  adminEmail: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "admin@gifthub.com";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "";

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("gifthub_admin");
    if (stored) {
      try {
        const data = JSON.parse(stored) as { email: string };
        setIsAuthenticated(true);
        setAdminEmail(data.email);
      } catch {
        sessionStorage.removeItem("gifthub_admin");
      }
    }
    setLoaded(true);
  }, []);

  const login = (email: string, password: string): boolean => {
    // Dev mode: if no password is set, allow any login with correct email
    const passwordValid = ADMIN_PASSWORD
      ? password === ADMIN_PASSWORD
      : true;

    if (email === ADMIN_EMAIL && passwordValid) {
      setIsAuthenticated(true);
      setAdminEmail(email);
      sessionStorage.setItem("gifthub_admin", JSON.stringify({ email }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminEmail(null);
    sessionStorage.removeItem("gifthub_admin");
  };

  if (!loaded) {
    return null;
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, adminEmail, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
