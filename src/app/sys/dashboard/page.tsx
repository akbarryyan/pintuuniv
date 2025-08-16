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
  MoreHorizontal
} from "lucide-react";

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
}

export default function AdminDashboard() {
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
      icon: <Plus className="w-6 h-6" />,
      href: '/sys/tryouts/create',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Kelola User',
      description: 'Lihat dan edit data user',
      icon: <Users className="w-6 h-6" />,
      href: '/sys/users',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Laporan',
      description: 'Generate laporan aktivitas',
      icon: <BarChart3 className="w-6 h-6" />,
      href: '/sys/reports',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Pengaturan',
      description: 'Konfigurasi sistem',
      icon: <Settings className="w-6 h-6" />,
      href: '/sys/settings',
      color: 'bg-gray-500 hover:bg-gray-600'
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
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Selamat Datang, Admin! 👋
          </h2>
          <p className="text-slate-600">
            Kelola platform tryout UTBK dengan mudah dan efisien
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Users</p>
                <p className="text-2xl font-bold text-slate-900">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+12%</span>
              <span className="text-slate-500 ml-1">dari bulan lalu</span>
            </div>
          </div>

          {/* Total Tryouts */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Tryouts</p>
                <p className="text-2xl font-bold text-slate-900">{stats.totalTryouts}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+8%</span>
              <span className="text-slate-500 ml-1">dari bulan lalu</span>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+23%</span>
              <span className="text-slate-500 ml-1">dari bulan lalu</span>
            </div>
          </div>

          {/* Active Users */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Users</p>
                <p className="text-2xl font-bold text-slate-900">{stats.activeUsers}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+5%</span>
              <span className="text-slate-500 ml-1">dari bulan lalu</span>
            </div>
          </div>

          {/* Completed Tryouts */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Completed</p>
                <p className="text-2xl font-bold text-slate-900">{stats.completedTryouts}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+18%</span>
              <span className="text-slate-500 ml-1">dari bulan lalu</span>
            </div>
          </div>

          {/* Pending Approvals */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Pending</p>
                <p className="text-2xl font-bold text-slate-900">{stats.pendingApprovals}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-red-600 font-medium">Perlu review</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <a
                    key={index}
                    href={action.href}
                    className={`${action.color} text-white p-4 rounded-lg flex items-center space-x-3 hover:shadow-md transition-all duration-200 transform hover:scale-105`}
                  >
                    {action.icon}
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
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Recent Activities</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Lihat Semua
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(activity.status)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                      <p className="text-sm text-slate-600">{activity.description}</p>
                      <p className="text-xs text-slate-400 mt-1">{activity.timestamp}</p>
                    </div>
                    <button className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Growth Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900">User Growth</h3>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Placeholder Chart */}
            <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-dashed border-blue-200 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                <p className="text-blue-600 font-medium">Chart User Growth</p>
                <p className="text-blue-500 text-sm">Data akan ditampilkan di sini</p>
              </div>
            </div>
          </div>

          {/* Revenue Distribution */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900">Revenue Distribution</h3>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Placeholder Chart */}
            <div className="h-64 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border-2 border-dashed border-emerald-200 flex items-center justify-center">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
                <p className="text-emerald-600 font-medium">Chart Revenue</p>
                <p className="text-emerald-500 text-sm">Data akan ditampilkan di sini</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Performance Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">98%</p>
              <p className="text-sm text-slate-600">Uptime System</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">87%</p>
              <p className="text-sm text-slate-600">User Satisfaction</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Activity className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">2.3s</p>
              <p className="text-sm text-slate-600">Avg Response Time</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8 text-amber-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">94%</p>
              <p className="text-sm text-slate-600">Goal Achievement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
