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
    <header className="sticky top-0 z-50 w-full border-b border-[#123C32]/10 dark:border-white/10 bg-[#F4F0E5]/90 dark:bg-[#123C32]/90 backdrop-blur-xl transition-colors duration-200">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo on Left */}
        <div className="flex items-center">
          <StudioLogo size="md" />
        </div>

        {/* Desktop Navigation Links in the Center */}
        <nav
          className="hidden lg:flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2"
          aria-label="Main Navigation"
        >
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
                  "relative px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg",
                  isActive
                    ? "text-[#123C32] dark:text-[#C5A66A] bg-[#123C32]/8 dark:bg-white/10"
                    : "text-[#123C32]/75 dark:text-[#F4F0E5]/75 hover:text-[#C5A66A] hover:bg-[#123C32]/5 dark:hover:bg-white/5"
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#C5A66A] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Area */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />

          {user ? (
            /* Authenticated User Menu */
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-3 p-1.5 pr-3 rounded-full border border-[#123C32]/15 dark:border-white/15 bg-white/70 dark:bg-[#1A4D41] hover:border-[#C5A66A] transition-all cursor-pointer shadow-sm"
                aria-expanded={userDropdownOpen}
                aria-haspopup="true"
              >
                <div
                  className="relative w-8 h-8 rounded-full overflow-hidden bg-[#C5A66A]/20 text-[#123C32] flex items-center justify-center font-serif font-bold text-sm"
                  style={{ position: "relative" }}
                >
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.image}
                      alt={user.name || "User Avatar"}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span>{(user.name || "U").charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div className="text-left">
                  <span className="block text-xs font-semibold text-[#123C32] dark:text-[#F4F0E5] leading-tight line-clamp-1 max-w-[120px]">
                    {user.name}
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-[#123C32]/60 dark:text-[#F4F0E5]/60 transition-transform duration-200",
                    userDropdownOpen && "rotate-180"
                  )}
                />
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#1A4D41] border border-[#123C32]/15 dark:border-white/10 p-2 shadow-2xl z-50 animate-fade-in"
                  role="menu"
                >
                  <div className="px-3 py-2 border-b border-[#123C32]/10 dark:border-white/10 mb-1">
                    <p className="text-xs font-bold text-[#123C32] dark:text-[#F4F0E5] line-clamp-1">
                      {user.name}
                    </p>
                    <p className="text-[11px] text-[#123C32]/60 dark:text-[#F4F0E5]/60 line-clamp-1">
                      {user.email}
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#123C32] dark:text-[#F4F0E5] hover:bg-[#123C32]/5 dark:hover:bg-white/10 hover:text-[#C5A66A] rounded-xl transition-colors"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#C5A66A]" />
                      <span>Dashboard</span>
                    </Link>

                    <Link
                      href="/add-studio"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#123C32] dark:text-[#F4F0E5] hover:bg-[#123C32]/5 dark:hover:bg-white/10 hover:text-[#C5A66A] rounded-xl transition-colors"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <PlusCircle className="w-4 h-4 text-[#C5A66A]" />
                      <span>Add New Studio</span>
                    </Link>

                    <Link
                      href="/my-listings"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#123C32] dark:text-[#F4F0E5] hover:bg-[#123C32]/5 dark:hover:bg-white/10 hover:text-[#C5A66A] rounded-xl transition-colors"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <Building2 className="w-4 h-4 text-[#C5A66A]" />
                      <span>My Studio Listings</span>
                    </Link>

                    <Link
                      href="/my-bookings"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#123C32] dark:text-[#F4F0E5] hover:bg-[#123C32]/5 dark:hover:bg-white/10 hover:text-[#C5A66A] rounded-xl transition-colors"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <Calendar className="w-4 h-4 text-[#C5A66A]" />
                      <span>My Bookings</span>
                    </Link>
                  </div>

                  <div className="border-t border-[#123C32]/10 dark:border-white/10 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
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
            className="p-2.5 rounded-xl border border-[#123C32]/15 dark:border-white/15 bg-white/70 dark:bg-[#1A4D41] text-[#123C32] dark:text-[#F4F0E5] hover:text-[#C5A66A] focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#123C32]/10 dark:border-white/10 bg-[#F4F0E5] dark:bg-[#123C32] px-4 pt-3 pb-6 space-y-3">
          <nav className="space-y-1">
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
                    "block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#C5A66A]/15 text-[#123C32] dark:text-[#C5A66A] font-bold"
                      : "text-[#123C32]/80 dark:text-[#F4F0E5]/80 hover:bg-[#123C32]/5 dark:hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[#123C32]/10 dark:border-white/10">
            {user ? (
              <div className="space-y-2">
                <div className="px-3 py-2 rounded-xl bg-white/60 dark:bg-[#1A4D41]">
                  <p className="text-xs font-bold text-[#123C32] dark:text-[#F4F0E5]">
                    {user.name}
                  </p>
                  <p className="text-[11px] text-[#123C32]/60 dark:text-[#F4F0E5]/60">
                    {user.email}
                  </p>
                </div>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-xs font-medium text-[#123C32] dark:text-[#F4F0E5] hover:text-[#C5A66A]"
                >
                  Dashboard
                </Link>
                <Link
                  href="/add-studio"
                  className="block px-3 py-2 text-xs font-medium text-[#123C32] dark:text-[#F4F0E5] hover:text-[#C5A66A]"
                >
                  Add New Studio
                </Link>
                <Link
                  href="/my-listings"
                  className="block px-3 py-2 text-xs font-medium text-[#123C32] dark:text-[#F4F0E5] hover:text-[#C5A66A]"
                >
                  My Listings
                </Link>
                <Link
                  href="/my-bookings"
                  className="block px-3 py-2 text-xs font-medium text-[#123C32] dark:text-[#F4F0E5] hover:text-[#C5A66A]"
                >
                  My Bookings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 rounded-xl"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="w-full justify-center">
                    Log In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm" className="w-full justify-center">
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
