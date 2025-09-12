"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Settings, LogOut, User, X } from "lucide-react";
import { toast } from "sonner";
import {
  Sidebar,
  StatsGrid,
  MainContentGrid,
  ChartsSection,
  PerformanceOverview,
  TopHeader,
} from "@/components/sys";
import { usePageTransition, useSmoothNavigation } from "@/lib/hooks";
import { SmoothTransition } from "@/components/ui/loading";
import { useAuth } from "@/contexts/AuthContext";

interface AdminStats {
  totalUsers: number;
  totalTryouts: number;
  totalRevenue: number;
  activeUsers: number;
  completedTryouts: number;
  pendingApprovals: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  // Use auth context
  const { isAuthenticated, isLoading } = useAuth();

  // Use page transition and navigation hooks
  const { isLoading: pageTransitionLoading } = usePageTransition();
  const { isNavigating } = useSmoothNavigation();
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalTryouts: 0,
    totalRevenue: 0,
    activeUsers: 0,
    completedTryouts: 0,
    pendingApprovals: 0,
  });

  // Fetch admin stats from API
  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const response = await fetch("/api/sys/dashboard/stats");
        const data = await response.json();

        if (data.success) {
          setStats(data.stats);
        } else {
          console.error("Error fetching admin stats:", data.message);
        }
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      }
    };

    if (isAuthenticated) {
      fetchAdminStats();
    }
  }, [isAuthenticated]);

  const [recentActivities] = useState<
    Array<{
      id: string;
      type:
        | "user_registration"
        | "tryout_completion"
        | "payment"
        | "system_update";
      title: string;
      description: string;
      timestamp: string;
      status: "success" | "warning" | "error" | "info";
    }>
  >([
    {
      id: "1",
      type: "user_registration",
      title: "User Baru Mendaftar",
      description: "Ahmad Fadillah berhasil mendaftar sebagai user premium",
      timestamp: "2 menit yang lalu",
      status: "success",
    },
    {
      id: "2",
      type: "tryout_completion",
      title: "Tryout Selesai",
      description: "Sarah Amanda menyelesaikan tryout Matematika Dasar",
      timestamp: "5 menit yang lalu",
      status: "info",
    },
    {
      id: "3",
      type: "payment",
      title: "Pembayaran Berhasil",
      description: "Pembayaran premium package Rp 299.000 diterima",
      timestamp: "12 menit yang lalu",
      status: "success",
    },
    {
      id: "4",
      type: "system_update",
      title: "Maintenance System",
      description: "Update database schema berhasil dilakukan",
      timestamp: "1 jam yang lalu",
      status: "warning",
    },
  ]);

  // Show loading screen while checking authentication
  if (isLoading || pageTransitionLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Memverifikasi akses admin...</p>
        </div>
      </div>
    );
  }

  // Show nothing if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-white/30 backdrop-blur-sm lg:hidden"
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
        <SmoothTransition isNavigating={isNavigating}>
          <main className="flex-1 p-4 lg:p-8 overflow-auto" data-main-content>
            {/* Stats Grid */}
            <StatsGrid stats={stats} />

            {/* Main Content Grid */}
            <MainContentGrid recentActivities={recentActivities} />

            {/* Charts Section */}
            <ChartsSection />

            {/* Performance Overview */}
            <PerformanceOverview />
          </main>
        </SmoothTransition>
      </div>
    </div>
  );
}
