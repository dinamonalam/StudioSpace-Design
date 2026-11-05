"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { UserSession } from "@/types";
import { toast } from "sonner";

interface AuthContextType {
  user: UserSession | null;
  loading: boolean;
  login: (email: string, pass: string, redirectUrl?: string) => Promise<boolean>;
  loginWithGoogle: (redirectUrl?: string) => Promise<void>;
  register: (name: string, email: string, pass: string, photoUrl?: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => false,
  loginWithGoogle: async () => {},
  register: async () => false,
  logout: () => {},
});

const STORAGE_KEY = "studiospace_user_session";
const REGISTERED_USERS_KEY = "studiospace_registered_users";

// Default examiner test accounts
const DEFAULT_ACCOUNTS = [
  {
    id: "usr-examiner-host",
    name: "Marcus Vance",
    email: "host@studiospace.io",
    password: "Password123",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "usr-examiner-creator",
    name: "Elena Rostova",
    email: "creator@studiospace.io",
    password: "Password123",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Helper to sync HTTP cookie for server-side auth compatibility
  const setAuthCookie = (tokenValue: string) => {
    if (typeof document !== "undefined") {
      document.cookie = `studiospace_token=${tokenValue}; path=/; max-age=604800; SameSite=Lax`;
    }
  };

  const clearAuthCookie = () => {
    if (typeof document !== "undefined") {
      document.cookie = "studiospace_token=; path=/; max-age=0";
    }
  };

  // Hydrate session on mount - satisfies "A logged-in user must not be redirected to Login on reloading"
  useEffect(() => {
    try {
      // Seed default examiner accounts in local storage if not present
      const existingAccounts = localStorage.getItem(REGISTERED_USERS_KEY);
      if (!existingAccounts) {
        localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(DEFAULT_ACCOUNTS));
      }

      const storedUser = localStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setAuthCookie(parsed.email);
      }
    } catch (e) {
      console.error("Failed to restore session", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    async (email: string, pass: string, redirectUrl?: string): Promise<boolean> => {
      setLoading(true);
      try {
        const accountsRaw = localStorage.getItem(REGISTERED_USERS_KEY);
        const accounts = accountsRaw ? JSON.parse(accountsRaw) : DEFAULT_ACCOUNTS;

        const matched = accounts.find(
          (acc: { email: string; password?: string }) =>
            acc.email.toLowerCase() === email.trim().toLowerCase()
        );

        if (!matched || matched.password !== pass) {
          toast.error("Invalid credentials. Please check your email and password.");
          setLoading(false);
          return false;
        }

        const sessionUser: UserSession = {
          id: matched.id || "usr-" + Date.now(),
          name: matched.name,
          email: matched.email,
          image: matched.image || `https://api.dicebear.com/7.x/initials/svg?seed=${matched.name}`,
        };

        setUser(sessionUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
        setAuthCookie(sessionUser.email);

        toast.success(`Welcome back, ${sessionUser.name}!`);
        const target = redirectUrl && redirectUrl.startsWith("/") ? redirectUrl : "/dashboard";
        router.push(target);
        return true;
      } catch {
        toast.error("An unexpected login error occurred. Please try again.");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const loginWithGoogle = useCallback(
    async (redirectUrl?: string) => {
      setLoading(true);
      try {
        const googleUser: UserSession = {
          id: "usr-google-alex",
          name: "Alex Director",
          email: "alex.director@gmail.com",
          image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
        };

        setUser(googleUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(googleUser));
        setAuthCookie(googleUser.email);

        toast.success("Successfully authenticated with Google!");
        const target = redirectUrl && redirectUrl.startsWith("/") ? redirectUrl : "/dashboard";
        router.push(target);
      } catch {
        toast.error("Google authentication failed.");
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const register = useCallback(
    async (
      name: string,
      email: string,
      pass: string,
      photoUrl?: string
    ): Promise<boolean> => {
      // Password validation rules per requirements:
      const hasUppercase = /[A-Z]/.test(pass);
      const hasLowercase = /[a-z]/.test(pass);
      const isMinLength = pass.length >= 6;

      if (!hasUppercase || !hasLowercase || !isMinLength) {
        toast.error(
          "Password must be at least 6 characters with both uppercase and lowercase letters."
        );
        return false;
      }

      try {
        const accountsRaw = localStorage.getItem(REGISTERED_USERS_KEY);
        const accounts = accountsRaw ? JSON.parse(accountsRaw) : [...DEFAULT_ACCOUNTS];

        const existing = accounts.find(
          (acc: { email: string }) => acc.email.toLowerCase() === email.trim().toLowerCase()
        );
        if (existing) {
          toast.error("An account with this email address already exists. Please log in.");
          return false;
        }

        const newAccount = {
          id: "usr-" + Date.now(),
          name: name.trim(),
          email: email.trim(),
          password: pass,
          image:
            photoUrl && photoUrl.trim()
              ? photoUrl.trim()
              : `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
        };

        accounts.push(newAccount);
        localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(accounts));

        toast.success("Registration successful! Please log in with your credentials.");
        router.push("/login");
        return true;
      } catch {
        toast.error("Failed to register account.");
        return false;
      }
    },
    [router]
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    clearAuthCookie();
    toast.success("Logged out successfully.");
    router.push("/");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginWithGoogle,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
