"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface HeaderNavigationProps {
  currentPage?: string;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
  userInfo?: {
    avatar: string;
    name: string;
  };
  onLogout?: () => void;
}

export default function HeaderNavigation({
  currentPage = "",
  showBackButton = false,
  backButtonText = "Kembali ke Dashboard",
  backButtonHref = "/dashboard",
  userInfo,
  onLogout,
}: HeaderNavigationProps) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogoutClick = async () => {
    // Konfirmasi sederhana agar konsisten di semua halaman
    const confirmLogout = typeof window !== "undefined"
      ? window.confirm("Yakin ingin logout? Anda akan kembali ke halaman utama.")
      : true;
    if (!confirmLogout) return;

    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (_) {
      // ignore
    } finally {
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userData");
        } catch (_) {}
        // Best-effort clear cookie non-HttpOnly
        document.cookie =
          "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
      // Jika consumer masih ingin menjalankan hook tambahan, panggil setelah server logout
      try {
        onLogout && onLogout();
      } catch (_) {}

      router.push("/");
    }
  };
  return (
    <>
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
                      currentPage === "tryouts"
                        ? "text-orange-400"
                        : "text-white"
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
                    href="/lessons"
                    className={`font-bold text-sm hover:text-orange-300 ${
                      currentPage === "lessons"
                        ? "text-orange-400"
                        : "text-white"
                    }`}
                  >
                    Materi
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

                {/* Mobile Hamburger Button */}
                <button
                  onClick={toggleMobileMenu}
                  className="sm:hidden bg-orange-500 text-white p-2 border-2 border-slate-800 hover:bg-orange-600 transition-colors flex items-center justify-center"
                  aria-label="Toggle mobile menu"
                >
                  <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                    <span
                      className={`block h-0.5 w-5 bg-white transform transition-all duration-300 ${
                        isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                      }`}
                    ></span>
                    <span
                      className={`block h-0.5 w-5 bg-white transition-all duration-300 ${
                        isMobileMenuOpen ? "opacity-0" : "opacity-100"
                      }`}
                    ></span>
                    <span
                      className={`block h-0.5 w-5 bg-white transform transition-all duration-300 ${
                        isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                      }`}
                    ></span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {!showBackButton && (
        <>
          {/* Overlay Background with Blur */}
          <div
            className={`fixed inset-0 backdrop-blur-sm z-40 sm:hidden transition-all duration-300 ${
              isMobileMenuOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            onClick={closeMobileMenu}
          ></div>

          {/* Mobile Sidebar */}
          <div
            className={`fixed top-0 right-0 h-full w-64 bg-slate-900 border-l-3 border-orange-400 z-50 sm:hidden transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Sidebar Header */}
            <div className="p-4 border-b-2 border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-orange-400 border-2 border-slate-800 rotate-12 flex items-center justify-center mr-2 font-black text-sm shadow-md">
                    📚
                  </div>
                  <span className="text-lg font-black text-white uppercase tracking-wider">
                    Menu
                  </span>
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="text-white hover:text-orange-300 transition-colors p-1"
                  aria-label="Close mobile menu"
                >
                  <span className="text-xl">✕</span>
                </button>
              </div>
            </div>

            {/* User Info Section */}
            {userInfo && (
              <div className="p-4 border-b-2 border-slate-700">
                <div className="flex items-center space-x-3">
                  <span className="text-white font-bold text-lg">
                    {userInfo.avatar}
                  </span>
                  <div>
                    <p className="text-white font-bold text-sm">
                      {userInfo.name}
                    </p>
                    <p className="text-slate-400 text-xs">Student</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div className="py-4">
              <nav className="space-y-2">
                <Link
                  href="/dashboard"
                  onClick={closeMobileMenu}
                  className={`flex items-center px-4 py-3 text-sm font-bold border-l-4 transition-all duration-200 ${
                    currentPage === "dashboard"
                      ? "text-orange-400 border-orange-400 bg-slate-800"
                      : "text-white border-transparent hover:text-orange-300 hover:border-orange-300 hover:bg-slate-800"
                  }`}
                >
                  <span className="mr-3">🏠</span>
                  Dashboard
                </Link>
                <Link
                  href="/tryouts"
                  onClick={closeMobileMenu}
                  className={`flex items-center px-4 py-3 text-sm font-bold border-l-4 transition-all duration-200 ${
                    currentPage === "tryouts"
                      ? "text-orange-400 border-orange-400 bg-slate-800"
                      : "text-white border-transparent hover:text-orange-300 hover:border-orange-300 hover:bg-slate-800"
                  }`}
                >
                  <span className="mr-3">📝</span>
                  Tryouts
                </Link>
                <Link
                  href="/leaderboard"
                  onClick={closeMobileMenu}
                  className={`flex items-center px-4 py-3 text-sm font-bold border-l-4 transition-all duration-200 ${
                    currentPage === "leaderboard"
                      ? "text-orange-400 border-orange-400 bg-slate-800"
                      : "text-white border-transparent hover:text-orange-300 hover:border-orange-300 hover:bg-slate-800"
                  }`}
                >
                  <span className="mr-3">🏆</span>
                  Leaderboard
                </Link>
                <Link
                  href="/lessons"
                  onClick={closeMobileMenu}
                  className={`flex items-center px-4 py-3 text-sm font-bold border-l-4 transition-all duration-200 ${
                    currentPage === "lessons"
                      ? "text-orange-400 border-orange-400 bg-slate-800"
                      : "text-white border-transparent hover:text-orange-300 hover:border-orange-300 hover:bg-slate-800"
                  }`}
                >
                  <span className="mr-3">📚</span>
                  Materi
                </Link>
              </nav>
            </div>

            {/* Profile Button */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t-2 border-slate-700">
              <div className="space-y-2">
                <Link
                  href="/profile"
                  onClick={closeMobileMenu}
                  className="w-full bg-orange-500 text-white px-4 py-3 font-black text-sm border-2 border-slate-800 hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span>👤</span>
                  Profile
                </Link>
                <button
                  onClick={() => {
                    closeMobileMenu();
                    handleLogoutClick();
                  }}
                  className="w-full bg-red-500 text-white px-4 py-3 font-black text-sm border-2 border-slate-800 hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span>🚪</span>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
