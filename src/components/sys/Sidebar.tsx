"use client";

import { useState } from "react";
import { useActiveItem, useSmoothNavigation } from "@/lib/hooks";
import { SmoothTransition } from "@/components/ui/loading";
import {
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  Activity,
  Calendar,
  BarChart3,
  PieChart,
  Target,
  Award,
  Settings,
  LogOut,
  Eye,
  Download,
  Filter,
  Search,
  Plus,
  MoreHorizontal,
  Sparkles,
  Zap,
  Star,
  Crown,
  Home,
  FileText,
  CreditCard,
  Bell,
  User,
  ChevronDown,
  Menu,
  X,
  Folder,
} from "lucide-react";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  children?: SidebarItem[];
}

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  activeItem,
  setActiveItem,
}: SidebarProps) {
  const { isNavigating, navigateWithAnimation } = useSmoothNavigation();

  // Use hooks for active item detection
  useActiveItem(setActiveItem);

  const handleNavigation = async (href: string, itemKey: string) => {
    // Use smooth navigation
    await navigateWithAnimation(href);

    // Update active item after navigation
    setActiveItem(itemKey);

    // Close sidebar on mobile
    setSidebarOpen(false);
  };
  const sidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      href: "/sys/dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      title: "Users",
      href: "/sys/dashboard/users",
      icon: <Users className="w-5 h-5" />,
      badge: "1.2k",
    },
    {
      title: "Tryouts",
      href: "/sys/dashboard/tryouts",
      icon: <BookOpen className="w-5 h-5" />,
      badge: "89",
    },
    {
      title: "Categories",
      href: "/sys/dashboard/categories",
      icon: <Folder className="w-5 h-5" />,
      badge: "24",
    },
    {
      title: "Payments",
      href: "/sys/dashboard/payments",
      icon: <CreditCard className="w-5 h-5" />,
      badge: "New",
    },
    {
      title: "Reports",
      href: "/sys/dashboard/reports",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      title: "Settings",
      href: "/sys/dashboard/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <div
      data-sidebar
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-md border-r border-slate-200/50 shadow-2xl transform transition-all duration-300 ease-in-out lg:sticky lg:top-0 lg:translate-x-0 lg:inset-0 lg:h-screen lg:bg-white lg:backdrop-blur-none lg:shadow-none flex flex-col ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } ${isNavigating ? "border-r-2 border-blue-200" : ""}`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200/50 flex-shrink-0 bg-white/80 backdrop-blur-sm lg:bg-white lg:backdrop-blur-none">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-slate-900 to-slate-700 rounded-lg flex items-center justify-center shadow-lg">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Admin</h1>
            <p className="text-xs text-slate-500">Pintu Universitas</p>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100/80 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto bg-white/60 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none">
        {sidebarItems.map((item) => {
          const itemKey = item.href.split("/").pop() || "dashboard";
          const isActive = activeItem === itemKey;

          return (
            <button
              key={item.href}
              onClick={() => handleNavigation(item.href, itemKey)}
              disabled={isNavigating}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-slate-100/90 text-slate-900 shadow-sm backdrop-blur-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 hover:shadow-sm backdrop-blur-sm"
              } ${isNavigating ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`p-1.5 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-slate-200/80 text-slate-700"
                      : "text-slate-500 group-hover:bg-slate-100/80 group-hover:text-slate-600"
                  }`}
                >
                  {item.icon}
                </div>
                <span>{item.title}</span>
              </div>
              {item.badge && (
                <span
                  className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
                    item.badge === "New"
                      ? "bg-red-100/90 text-red-700 backdrop-blur-sm"
                      : "bg-slate-100/90 text-slate-700 backdrop-blur-sm"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer - Fixed at Bottom */}
      <div className="p-4 border-t border-slate-200/50 flex-shrink-0 bg-white/80 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none">
        <div className="flex items-center space-x-3 p-3 bg-slate-50/90 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-sm">
          <div className="w-8 h-8 bg-gradient-to-br from-slate-900 to-slate-700 rounded-full flex items-center justify-center shadow-lg">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900">Admin User</p>
            <p className="text-xs text-slate-500">admin@pintuuniv.com</p>
          </div>
          <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/80 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
