"use client";

import { 
  Bell,
  Settings,
  Menu,
  Search,
  User,
  ChevronDown,
  Sun,
  Moon
} from "lucide-react";
import { useState } from "react";

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
  pageDescription = "Selamat datang kembali, Admin!"
}: TopHeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);

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
          
          {/* Page Title & Description */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block w-px h-8 bg-slate-200" />
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
        <div className="flex items-center space-x-3">
          {/* Search Bar */}
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
                {notifications > 9 ? '9+' : notifications}
              </span>
            )}
          </button>
          
          {/* Settings */}
          <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95">
            <Settings className="w-5 h-5" />
          </button>
          
          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
            <div className="flex items-center space-x-3 group cursor-pointer p-2 rounded-xl hover:bg-slate-100 transition-all duration-300">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
                A
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-semibold text-slate-900">Admin</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Breadcrumb */}
      <div className="mt-4 flex items-center space-x-2 text-sm text-slate-500">
        <span className="hover:text-slate-700 cursor-pointer transition-colors">Home</span>
        <span>/</span>
        <span className="text-slate-700 font-medium">{pageTitle}</span>
      </div>
    </header>
  );
}
