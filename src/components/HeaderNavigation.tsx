"use client";

import Link from "next/link";

interface HeaderNavigationProps {
  currentPage?: string;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
  userInfo?: {
    avatar: string;
    name: string;
  };
}

export default function HeaderNavigation({
  currentPage = "",
  showBackButton = false,
  backButtonText = "Kembali ke Dashboard",
  backButtonHref = "/dashboard",
  userInfo,
}: HeaderNavigationProps) {
  return (
    <div className="bg-slate-900 border-b-3 sm:border-b-4 border-orange-400 sticky top-0 z-50">
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
                  href="/lessons"
                  className={`font-bold text-sm hover:text-orange-300 ${
                    currentPage === "lessons" ? "text-orange-400" : "text-white"
                  }`}
                >
                  Materi
                </Link>
              </div>

              <div className="flex items-center space-x-2">
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
