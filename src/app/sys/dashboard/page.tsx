"use client";

import { useState, useEffect } from "react";
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
import { Sidebar } from "@/components/sys";

interface AdminStats {
  totalUsers: number;
  totalTryouts: number;
  totalRevenue: number;
  activeUsers: number;
  completedTryouts: number;
  pendingApprovals: number;
}

interface RecentActivity {
  id: string;
  type: 'user_registration' | 'tryout_completion' | 'payment' | 'system_update';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

interface QuickAction {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  bgColor: string;
  hoverColor: string;
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

  const [recentActivities] = useState<RecentActivity[]>([
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

  const quickActions: QuickAction[] = [
    {
      title: 'Tambah Tryout',
      description: 'Buat tryout baru untuk user',
      icon: <Plus className="w-5 h-5" />,
      href: '/sys/tryouts/create',
      color: 'text-white',
      bgColor: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    },
    {
      title: 'Kelola User',
      description: 'Lihat dan edit data user',
      icon: <Users className="w-5 h-5" />,
      href: '/sys/users',
      color: 'text-white',
      bgColor: 'bg-emerald-600',
      hoverColor: 'hover:bg-emerald-700'
    },
    {
      title: 'Laporan',
      description: 'Generate laporan aktivitas',
      icon: <BarChart3 className="w-5 h-5" />,
      href: '/sys/reports',
      color: 'text-white',
      bgColor: 'bg-violet-600',
      hoverColor: 'hover:bg-violet-700'
    },
    {
      title: 'Pengaturan',
      description: 'Konfigurasi sistem',
      icon: <Settings className="w-5 h-5" />,
      href: '/sys/settings',
      color: 'text-white',
      bgColor: 'bg-slate-600',
      hoverColor: 'hover:bg-slate-700'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'warning': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'error': return 'text-red-700 bg-red-50 border-red-200';
      case 'info': return 'text-blue-700 bg-blue-50 border-blue-200';
      default: return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registration': return <Users className="w-4 h-4" />;
      case 'tryout_completion': return <BookOpen className="w-4 h-4" />;
      case 'payment': return <DollarSign className="w-4 h-4" />;
      case 'system_update': return <Settings className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {/* Total Users */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Total Users</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-emerald-500 mr-2" />
                <span className="text-emerald-600 font-medium">+12%</span>
                <span className="text-slate-500 ml-2">dari bulan lalu</span>
              </div>
            </div>

            {/* Total Tryouts */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Total Tryouts</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.totalTryouts}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-emerald-500 mr-2" />
                <span className="text-emerald-600 font-medium">+8%</span>
                <span className="text-slate-500 ml-2">dari bulan lalu</span>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Total Revenue</p>
                  <p className="text-2xl font-bold text-slate-900">{formatCurrency(stats.totalRevenue)}</p>
                </div>
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-teal-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-emerald-500 mr-2" />
                <span className="text-emerald-600 font-medium">+23%</span>
                <span className="text-slate-500 ml-2">dari bulan lalu</span>
              </div>
            </div>

            {/* Active Users */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Active Users</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.activeUsers}</p>
                </div>
                <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-violet-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-emerald-500 mr-2" />
                <span className="text-emerald-600 font-medium">+5%</span>
                <span className="text-slate-500 ml-2">dari bulan lalu</span>
              </div>
            </div>

            {/* Completed Tryouts */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Completed</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.completedTryouts}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-amber-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-emerald-500 mr-2" />
                <span className="text-emerald-600 font-medium">+18%</span>
                <span className="text-slate-500 ml-2">dari bulan lalu</span>
              </div>
            </div>

            {/* Pending Approvals */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Pending</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.pendingApprovals}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-red-600 font-medium">Perlu review</span>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
                </div>
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <a
                      key={index}
                      href={action.href}
                      className={`${action.bgColor} ${action.color} ${action.hoverColor} p-4 rounded-lg flex items-center space-x-3 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md`}
                    >
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        {action.icon}
                      </div>
                      <div>
                        <p className="font-semibold">{action.title}</p>
                        <p className="text-sm opacity-90">{action.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-amber-500" />
                    <h3 className="text-lg font-semibold text-slate-900">Recent Activities</h3>
                  </div>
                  <button className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm">
                    Lihat Semua
                  </button>
                </div>
                
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div 
                      key={activity.id} 
                      className="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${getStatusColor(activity.status)}`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-900 font-medium text-sm">{activity.title}</p>
                          <p className="text-slate-600 text-sm mt-1">{activity.description}</p>
                          <p className="text-slate-500 text-xs mt-2">{activity.timestamp}</p>
                        </div>
                        <button className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

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
                  <TrendingUp className="w-8 h-8 text-emerald-600" />
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
