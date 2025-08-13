"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MobileFriendlyHeaderProps {
  currentPage?: string;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
  userInfo?: {
    avatar: string;
    name: string;
  };
  showMobileMenu?: boolean; // New prop to control mobile menu display
}

export default function MobileFriendlyHeader({
  currentPage = "",
  showBackButton = false,
  backButtonText = "Kembali ke Dashboard",
  backButtonHref = "/dashboard",
  userInfo,
  showMobileMenu = true, // Default to true for backward compatibility
}: MobileFriendlyHeaderProps) {
  const router = useRouter();

  const handleLogoutClick = () => {
    toast("Yakin ingin logout?", {
      description: "Anda akan keluar dari akun dan kembali ke halaman utama.",
      action: {
        label: "Logout",
        onClick: async () => {
          let serverOk = false;
          try {
            const res = await fetch("/api/auth/logout", { method: "POST" });
            serverOk = res.ok;
          } catch (_) {
            serverOk = false;
          } finally {
            if (typeof window !== "undefined") {
              try {
                localStorage.removeItem("authToken");
                localStorage.removeItem("userData");
              } catch (_) {}
              document.cookie =
                "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }
            if (serverOk) {
              toast.success("Logout berhasil! Sampai jumpa lagi! 👋");
            } else {
              toast.error(
                "Logout gagal di server, namun sesi lokal dibersihkan."
              );
            }
            router.push("/");
          }
        },
      },
      cancel: {
        label: "Batal",
        onClick: () => toast.dismiss(),
      },
    });
  };

  return (
    <div className="bg-slate-900 border-b-3 sm:border-b-4 border-orange-400 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-400 border-2 sm:border-3 border-slate-800 rotate-12 flex items-center justify-center mr-2 sm:mr-3 font-black text-sm sm:text-lg shadow-md">
              📚
            </div>
            <span className="text-lg sm:text-2xl font-black text-white uppercase tracking-wider">
              PintuUniv
            </span>
          </div>

          {/* Navigation - Full Menu or Back Button */}
          {showBackButton ? (
            // Simple back button for sub-pages
            <Link
              href={backButtonHref}
              className="bg-orange-500 text-white px-3 sm:px-4 py-2 sm:py-3 font-black text-xs sm:text-sm border-2 sm:border-3 border-slate-800 hover:bg-orange-600 transition-colors flex items-center gap-2"
            >
              <span>⬅️</span>
              <span className="hidden sm:inline">{backButtonText}</span>
              <span className="sm:hidden">Dashboard</span>
            </Link>
          ) : (
            // Full navigation menu for main pages
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Desktop Navigation */}
              <div className="hidden sm:flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className={`font-bold text-sm hover:text-orange-300 ${
                    currentPage === "dashboard"
                      ? "text-orange-400"
                      : "text-white"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/tryouts"
                  className={`font-bold text-sm hover:text-orange-300 ${
                    currentPage === "tryouts" ? "text-orange-400" : "text-white"
                  }`}
                >
                  Tryouts
                </Link>
                <Link
                  href="/leaderboard"
                  className={`font-bold text-sm hover:text-orange-300 ${
                    currentPage === "leaderboard"
                      ? "text-orange-400"
                      : "text-white"
                  }`}
                >
                  Leaderboard
                </Link>
                <Link
                  href="/discuss"
                  className={`font-bold text-sm hover:text-orange-300 ${
                    currentPage === "discuss" ? "text-orange-400" : "text-white"
                  }`}
                >
                  Forum
                </Link>
              </div>

              {/* Desktop User Info & Profile */}
              <div className="hidden sm:flex items-center space-x-2">
                {userInfo && (
                  <>
                    <span className="text-white font-bold text-sm sm:text-base">
                      {userInfo.avatar}
                    </span>
                    <span className="hidden sm:block text-white font-bold text-sm">
                      {userInfo.name.split(" ")[0]}
                    </span>
                  </>
                )}
                <Link
                  href="/profile"
                  className="bg-orange-500 text-white px-2 sm:px-3 py-1 sm:py-2 font-black text-xs sm:text-sm border-2 sm:border-3 border-slate-800 hover:bg-orange-600 transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="bg-red-500 text-white px-2 sm:px-3 py-1 sm:py-2 font-black text-xs sm:text-sm border-2 sm:border-3 border-slate-800 hover:bg-red-600 transition-colors"
                >
                  🚪 Logout
                </button>
              </div>

              {/* Mobile Avatar Dropdown - Only show when showMobileMenu is false */}
              {!showMobileMenu && userInfo && (
                <div className="sm:hidden">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="w-10 h-10 bg-orange-400 border-2 border-slate-800 rounded-full flex items-center justify-center font-black text-lg hover:bg-orange-300 transition-colors shadow-brutal">
                        {userInfo.avatar}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 bg-white border-2 border-slate-800 shadow-brutal"
                    >
                      <div className="px-3 py-2 border-b border-slate-200">
                        <p className="font-black text-sm text-slate-900">
                          {userInfo.name}
                        </p>
                        <p className="text-xs font-bold text-slate-600">
                          Student
                        </p>
                      </div>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/profile"
                          className="flex items-center px-3 py-2 text-sm font-bold text-slate-900 hover:bg-orange-50 cursor-pointer"
                        >
                          <span className="mr-2">👤</span>
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-slate-200" />
                      <DropdownMenuItem
                        onClick={handleLogoutClick}
                        className="flex items-center px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        <span className="mr-2">🚪</span>
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              {/* Original Mobile Hamburger Button - Only show when showMobileMenu is true */}
              {showMobileMenu && (
                <button
                  className="sm:hidden bg-orange-500 text-white p-2 border-2 border-slate-800 hover:bg-orange-600 transition-colors flex items-center justify-center"
                  aria-label="Toggle mobile menu"
                >
                  <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                    <span className="block h-0.5 w-5 bg-white"></span>
                    <span className="block h-0.5 w-5 bg-white"></span>
                    <span className="block h-0.5 w-5 bg-white"></span>
                  </div>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
