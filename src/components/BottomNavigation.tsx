"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BottomNavigationProps {
  currentPage?: string;
}

export default function BottomNavigation({
  currentPage,
}: BottomNavigationProps) {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/dashboard",
      icon: "🏠",
      label: "Dashboard",
      isActive: currentPage === "dashboard" || pathname === "/dashboard",
    },
    {
      href: "/tryouts",
      icon: "📝",
      label: "Tryouts",
      isActive: currentPage === "tryouts" || pathname === "/tryouts",
    },
    {
      href: "/leaderboard",
      icon: "🏆",
      label: "Leaderboard",
      isActive: currentPage === "leaderboard" || pathname === "/leaderboard",
    },
    {
      href: "/discuss",
      icon: "💬",
      label: "Forum",
      isActive: currentPage === "discuss" || pathname === "/discuss",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
      <div className="bg-slate-900 border-t-3 border-orange-400 px-3 py-2 shadow-brutal">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 transition-all duration-200 ${
                item.isActive
                  ? "text-orange-400"
                  : "text-white hover:text-orange-300"
              }`}
            >
              <div
                className={`w-8 h-8 flex items-center justify-center border-2 border-slate-800 mb-1 transition-all duration-200 ${
                  item.isActive
                    ? "bg-orange-400 text-slate-900 shadow-brutal transform -translate-y-1"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                <span className="text-sm font-black">{item.icon}</span>
              </div>
              <span className="text-xs font-black uppercase tracking-wider">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
