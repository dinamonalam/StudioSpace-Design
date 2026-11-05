"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      // Preserve requested route for post-login redirect
      const redirectUrl = encodeURIComponent(pathname);
      router.replace(`/login?redirect=${redirectUrl}`);
    }
  }, [user, loading, router, pathname]);

  // Branded creative studio spinner while session resolves (avoids redirect flash on refresh)
  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#17191C] text-[#F5F0E8] px-4">
        <div className="relative w-16 h-16 flex items-center justify-center">
          {/* Outer rotating aperture spotlight ring */}
          <div className="absolute inset-0 rounded-2xl border-2 border-[#E7A65A]/20 border-t-[#E7A65A] animate-spin" />
          {/* Inner core lens beam */}
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E7A65A] to-[#8C581E] flex items-center justify-center shadow-lg shadow-[#E7A65A]/20 animate-pulse">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5 text-[#17191C]"
            >
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
          </div>
        </div>
        <p className="mt-6 text-xs uppercase font-semibold text-[#858A90] tracking-widest animate-pulse">
          Verifying Creative Workspace Session...
        </p>
      </div>
    );
  }

  // If unauthenticated after loading, render nothing while redirect occurs
  if (!user) {
    return null;
  }

  return <>{children}</>;
}

