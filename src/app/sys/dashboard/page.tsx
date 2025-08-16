"use client";

import { useState, useEffect } from "react";
import { 
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
  Sparkles,
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
import { Sidebar, StatsGrid, MainContentGrid } from "@/components/sys";

interface AdminStats {
  totalUsers: number;
  totalTryouts: number;
  totalRevenue: number;
  activeUsers: number;
  completedTryouts: number;
  pendingApprovals: number;
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 1247,
    totalTryouts: 89,
    totalRevenue: 15420000,
    activeUsers: 892,
    completedTryouts: 2341,
    pendingApprovals: 12
  });

  const [recentActivities] = useState<Array<{
    id: string;
    type: 'user_registration' | 'tryout_completion' | 'payment' | 'system_update';
    title: string;
    description: string;
    timestamp: string;
    status: 'success' | 'warning' | 'error' | 'info';
  }>>([
    {
      id: '1',
      type: 'user_registration',
      title: 'User Baru Mendaftar',
      description: 'Ahmad Fadillah berhasil mendaftar sebagai user premium',
      timestamp: '2 menit yang lalu',
      status: 'success'
    },
    {
      id: '2',
      type: 'tryout_completion',
      title: 'Tryout Selesai',
      description: 'Sarah Amanda menyelesaikan tryout Matematika Dasar',
      timestamp: '5 menit yang lalu',
      status: 'info'
    },
    {
      id: '3',
      type: 'payment',
      title: 'Pembayaran Berhasil',
      description: 'Pembayaran premium package Rp 299.000 diterima',
      timestamp: '12 menit yang lalu',
      status: 'success'
    },
    {
      id: '4',
      type: 'system_update',
      title: 'Maintenance System',
      description: 'Update database schema berhasil dilakukan',
      timestamp: '1 jam yang lalu',
      status: 'warning'
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Component */}
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-4 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-sm text-slate-500">Selamat datang kembali, Admin!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {/* Stats Grid */}
          <StatsGrid stats={stats} />

          {/* Main Content Grid */}
          <MainContentGrid recentActivities={recentActivities} />

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* User Growth Chart */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-slate-900">User Growth</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                    <Filter className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="h-64 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-slate-700 font-medium">Chart User Growth</p>
                  <p className="text-slate-500 text-sm">Data akan ditampilkan di sini</p>
                </div>
              </div>
            </div>

            {/* Revenue Distribution */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <PieChart className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-semibold text-slate-900">Revenue Distribution</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="h-64 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <PieChart className="w-8 h-8 text-emerald-600" />
                  </div>
                  <p className="text-slate-700 font-medium">Chart Revenue</p>
                  <p className="text-slate-500 text-sm">Data akan ditampilkan di sini</p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Overview */}
          <div className="bg-white border border-slate-200 rounded-xl p-8">
            <div className="flex items-center space-x-3 mb-8">
              <Crown className="w-6 h-6 text-amber-500" />
              <h3 className="text-xl font-semibold text-slate-900">Performance Overview</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-2">98%</p>
                <p className="text-slate-600 text-sm">Uptime System</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-emerald-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-2">87%</p>
                <p className="text-slate-600 text-sm">User Satisfaction</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-violet-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-2">2.3s</p>
                <p className="text-slate-600 text-sm">Avg Response Time</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-amber-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-2">94%</p>
                <p className="text-slate-600 text-sm">Goal Achievement</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
