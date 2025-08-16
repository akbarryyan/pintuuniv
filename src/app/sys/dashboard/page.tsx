"use client";

import { useState, useEffect } from "react";
import { 
  Settings,
  LogOut,
  User,
  X
} from "lucide-react";
import { Sidebar, StatsGrid, MainContentGrid, ChartsSection, PerformanceOverview, TopHeader } from "@/components/sys";

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
        <TopHeader 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          pageTitle="Dashboard"
          pageDescription="Selamat datang kembali, Admin!"
        />

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {/* Stats Grid */}
          <StatsGrid stats={stats} />

          {/* Main Content Grid */}
          <MainContentGrid recentActivities={recentActivities} />

          {/* Charts Section */}
          <ChartsSection />

          {/* Performance Overview */}
          <PerformanceOverview />
        </main>
      </div>
    </div>
  );
}
