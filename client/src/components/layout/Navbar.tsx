"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { StudioLogo } from "@/components/ui/StudioLogo";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import {
  Menu,
  X,
  PlusCircle,
  Calendar,
  LayoutDashboard,
  LogOut,
  Building2,
  ChevronDown,
  User as UserIcon,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out of StudioSpace.");
    setUserDropdownOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#32363C]/80 bg-[#17191C]/90 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <StudioLogo size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg",
                    isActive
                      ? "text-[#E7A65A] bg-[#24272B]/70"
                      : "text-[#858A90] hover:text-[#F5F0E8] hover:bg-white/5"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#E7A65A] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Action Area */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />

          {user ? (
            /* Authenticated State */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-3 p-1.5 pr-3 rounded-full border border-[#32363C] bg-[#24272B] hover:border-[#E7A65A]/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E7A65A]/40"
                aria-expanded={userDropdownOpen}
                aria-haspopup="true"
              >
                <div
                  className="relative w-8 h-8 rounded-full overflow-hidden bg-[#E7A65A]/20 border border-[#E7A65A]/30 flex items-center justify-center text-xs font-bold text-[#E7A65A]"
                  style={{ position: "relative" }}
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      fill
                      unoptimized
                      sizes="32px"
                      className="object-cover"
                    />
                  ) : (
                    <span>{user.name.slice(0, 2).toUpperCase()}</span>
                  )}
                </div>
                <div className="text-left">
                  <span className="block text-xs font-semibold text-[#F5F0E8] leading-tight truncate max-w-[110px]">
                    {user.name}
                  </span>
                  <span className="block text-[10px] text-[#858A90] leading-none">
                    Creator / Host
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 text-[#858A90] transition-transform duration-200",
                    userDropdownOpen && "rotate-180 text-[#E7A65A]"
                  )}
                />
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#24272B] border border-[#32363C] shadow-2xl shadow-black/60 p-2 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                  <div className="px-3 py-2.5 border-b border-[#32363C]/80 mb-1">
                    <p className="text-xs font-semibold text-[#F5F0E8]">{user.name}</p>
                    <p className="text-[11px] text-[#858A90] truncate">{user.email}</p>
                  </div>

                  <div className="space-y-0.5">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#F5F0E8] hover:bg-white/5 hover:text-[#E7A65A] rounded-xl transition-colors"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#858A90]" />
                      <span>Dashboard</span>
                    </Link>

                    <Link
                      href="/add-studio"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#F5F0E8] hover:bg-white/5 hover:text-[#E7A65A] rounded-xl transition-colors"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <PlusCircle className="w-4 h-4 text-[#E7A65A]" />
                      <span>Add New Studio</span>
                    </Link>

                    <Link
                      href="/my-listings"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#F5F0E8] hover:bg-white/5 hover:text-[#E7A65A] rounded-xl transition-colors"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <Building2 className="w-4 h-4 text-[#858A90]" />
                      <span>My Studio Listings</span>
                    </Link>

                    <Link
                      href="/my-bookings"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#F5F0E8] hover:bg-white/5 hover:text-[#E7A65A] rounded-xl transition-colors"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <Calendar className="w-4 h-4 text-[#858A90]" />
                      <span>My Bookings</span>
                    </Link>
                  </div>

                  <div className="border-t border-[#32363C]/80 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Unauthenticated State */
            <div className="flex items-center gap-2.5">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="font-semibold text-xs">
                  <UserIcon className="w-4 h-4 mr-1.5" />
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm" className="font-semibold text-xs">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl border border-[#32363C] bg-[#24272B] text-[#F5F0E8] hover:text-[#E7A65A] focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          ></button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden border-t border-[#32363C] bg-[#17191C]/98 backdrop-blur-2xl px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200"
        >
          <nav className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2.5 text-base font-medium rounded-xl transition-colors",
                    isActive
                      ? "text-[#E7A65A] bg-[#24272B]"
                      : "text-[#858A90] hover:text-[#F5F0E8] hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[#32363C] space-y-3">
            {user ? (
              <div className="space-y-2">
                <div className="px-4 py-2 bg-[#24272B] rounded-xl flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden bg-[#E7A65A]/20 border border-[#E7A65A]/30 flex items-center justify-center font-bold text-xs text-[#E7A65A]" style={{ position: "relative" }}>
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        fill
                        unoptimized
                        sizes="36px"
                        className="object-cover"
                      />
                    ) : (
                      <span>{user.name.slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#F5F0E8]">{user.name}</p>
                    <p className="text-xs text-[#858A90]">{user.email}</p>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#F5F0E8] hover:bg-white/5 rounded-xl"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#858A90]" />
                  <span>Dashboard</span>
                </Link>

                <Link
                  href="/add-studio"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#E7A65A] hover:bg-white/5 rounded-xl"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add New Studio</span>
                </Link>

                <Link
                  href="/my-listings"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#F5F0E8] hover:bg-white/5 rounded-xl"
                >
                  <Building2 className="w-4 h-4 text-[#858A90]" />
                  <span>My Studio Listings</span>
                </Link>

                <Link
                  href="/my-bookings"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#F5F0E8] hover:bg-white/5 rounded-xl"
                >
                  <Calendar className="w-4 h-4 text-[#858A90]" />
                  <span>My Bookings</span>
                </Link>

                <Button
                  variant="danger"
                  size="md"
                  className="w-full justify-center gap-2 mt-2"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link href="/login" className="w-full">
                  <Button variant="secondary" size="md" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link href="/register" className="w-full">
                  <Button variant="primary" size="md" className="w-full">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

