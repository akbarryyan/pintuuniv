"use client";

import {
  Bell,
  Settings,
  Menu,
  Search,
  User,
  ChevronDown,
  Sun,
  Moon,
  LogOut,
  UserCircle,
  Shield,
  HelpCircle,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface TopHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  pageTitle?: string;
  pageDescription?: string;
}

export default function TopHeader({
  sidebarOpen,
  setSidebarOpen,
  pageTitle = "Dashboard",
  pageDescription = "Selamat datang kembali, Admin!",
}: TopHeaderProps) {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const adminToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
      
      if (adminToken) {
        const response = await fetch('/api/admin/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        
        if (data.success) {
          toast.success("Logout Berhasil!", {
            description: "Anda telah berhasil keluar dari sistem admin",
            duration: 3000,
          });
        } else {
          toast.warning("Logout Warning", {
            description: "Session berhasil dihapus, tetapi ada masalah dengan server",
            duration: 3000,
          });
        }
      } else {
        toast.info("Session Berakhir", {
          description: "Session Anda telah berakhir",
          duration: 3000,
        });
      }

      // Clear all storage
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      sessionStorage.removeItem('adminToken');
      sessionStorage.removeItem('adminUser');
      
      // Clear cookie
      document.cookie = 'adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      
      // Redirect to login after a short delay
      setTimeout(() => {
        router.push('/sys/login');
      }, 1000);
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Logout Gagal", {
        description: "Terjadi kesalahan saat logout, tetapi Anda akan tetap diarahkan ke halaman login",
        duration: 4000,
      });
      
      // Still redirect even if logout API fails
      setTimeout(() => {
        router.push('/sys/login');
      }, 1500);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const profileMenuItems: Array<{
    icon: React.ReactNode;
    label: string;
    action: () => void;
    danger?: boolean;
    disabled?: boolean;
  }> = [
    {
      icon: <UserCircle className="w-4 h-4" />,
      label: "Profil Saya",
      action: () => console.log("Profile clicked"),
    },
    {
      icon: <Settings className="w-4 h-4" />,
      label: "Pengaturan",
      action: () => console.log("Settings clicked"),
    },
    {
      icon: <Shield className="w-4 h-4" />,
      label: "Keamanan",
      action: () => console.log("Security clicked"),
    },
    {
      icon: <HelpCircle className="w-4 h-4" />,
      label: "Bantuan",
      action: () => console.log("Help clicked"),
    },
    {
      icon: <LogOut className="w-4 h-4" />,
      label: isLoggingOut ? "Keluar..." : "Keluar",
      action: handleLogout,
      danger: true,
      disabled: isLoggingOut,
    },
  ];

  return (
    <header className="bg-white border-b border-slate-200 px-4 py-4 lg:px-8 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left Section - Menu & Title */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Page Title & Description - Hidden on Mobile */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="w-px h-8 bg-slate-200" />
            <div>
              <h1 className="text-2xl font-bold text-slate-900 group">
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  {pageTitle}
                </span>
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                {pageDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2 lg:space-x-3">
          {/* Search Bar - Hidden on Mobile */}
          <div className="hidden md:flex items-center space-x-2 bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-200 hover:border-slate-300 transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari sesuatu..."
              className="bg-transparent border-none outline-none text-sm text-slate-700 placeholder-slate-400 w-48"
            />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* Notifications */}
          <button className="relative p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95">
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                {notifications > 9 ? "9+" : notifications}
              </span>
            )}
          </button>

          {/* Settings - Hidden on Mobile */}
          <button className="hidden lg:block p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95">
            <Settings className="w-5 h-5" />
          </button>

          {/* User Profile */}
          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center space-x-2 lg:space-x-3 pl-2 lg:pl-3 border-l border-slate-200">
              <div
                onClick={handleProfileClick}
                className="flex items-center space-x-2 lg:space-x-3 group cursor-pointer p-2 rounded-xl hover:bg-slate-100 transition-all duration-300"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
                  A
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-semibold text-slate-900">Admin</p>
                  <p className="text-xs text-slate-500">Super Admin</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-all duration-300 ${
                    isProfileDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            {/* Dropdown Menu */}
            <div
              className={`absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 transform transition-all duration-300 origin-top-right ${
                isProfileDropdownOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
            >
              {/* User Info Header */}
              <div className="px-4 py-3 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                    A
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Admin
                    </p>
                    <p className="text-xs text-slate-500">
                      admin@pintuuniv.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                {profileMenuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!item.disabled) {
                        item.action();
                        setIsProfileDropdownOpen(false);
                      }
                    }}
                    disabled={item.disabled}
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left transition-all duration-200 ${
                      item.disabled
                        ? "opacity-50 cursor-not-allowed"
                        : item.danger
                        ? "text-red-600 hover:bg-red-50 hover:text-red-700"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span
                      className={`${
                        item.danger ? "text-red-500" : "text-slate-400"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-slate-100">
                <p className="text-xs text-slate-400 text-center">
                  PintuUniv v2.0.0
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="mt-4 flex items-center space-x-2 text-sm text-slate-500">
        <span className="hover:text-slate-700 cursor-pointer transition-colors">
          Home
        </span>
        <span>/</span>
        <span className="text-slate-700 font-medium">{pageTitle}</span>
      </div>
    </header>
  );
}
