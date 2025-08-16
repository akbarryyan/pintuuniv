"use client";

import { useState } from "react";
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
  X
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

export default function Sidebar({ sidebarOpen, setSidebarOpen, activeItem, setActiveItem }: SidebarProps) {
  const sidebarItems: SidebarItem[] = [
    {
      title: 'Dashboard',
      href: '/sys/dashboard',
      icon: <Home className="w-5 h-5" />
    },
    {
      title: 'Users',
      href: '/sys/users',
      icon: <Users className="w-5 h-5" />,
      badge: '1.2k'
    },
    {
      title: 'Tryouts',
      href: '/sys/tryouts',
      icon: <BookOpen className="w-5 h-5" />,
      badge: '89'
    },
    {
      title: 'Payments',
      href: '/sys/payments',
      icon: <CreditCard className="w-5 h-5" />,
      badge: 'New'
    },
    {
      title: 'Reports',
      href: '/sys/reports',
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      title: 'Settings',
      href: '/sys/settings',
      icon: <Settings className="w-5 h-5" />
    }
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:translate-x-0 lg:inset-0 lg:h-screen flex flex-col ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Admin</h1>
            <p className="text-xs text-slate-500">Pintu Universitas</p>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {sidebarItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setActiveItem(item.href.split('/').pop() || 'dashboard')}
            className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeItem === (item.href.split('/').pop() || 'dashboard')
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              {item.icon}
              <span>{item.title}</span>
            </div>
            {item.badge && (
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                item.badge === 'New' 
                  ? 'bg-red-100 text-red-700' 
                  : 'bg-slate-100 text-slate-700'
              }`}>
                {item.badge}
              </span>
            )}
          </a>
        ))}
      </nav>

      {/* Sidebar Footer - Fixed at Bottom */}
      <div className="p-4 border-t border-slate-200 flex-shrink-0">
        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
          <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900">Admin User</p>
            <p className="text-xs text-slate-500">admin@pintuuniv.com</p>
          </div>
          <button className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
