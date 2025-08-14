"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import HeaderNavigation from "@/components/HeaderNavigation";
import BottomNavigation from "@/components/BottomNavigation";
import MobileFriendlyHeader from "@/components/MobileFriendlyHeader";
import {
  HeaderSection,
  TimeFilter,
  TabNavigation,
  MainLeaderboard,
  SideStats,
} from "@/components/leaderboard";

export default function LeaderboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overall");
  const [timeFilter, setTimeFilter] = useState("monthly");
  const [userData, setUserData] = useState({
    name: "User",
    avatar: "👨‍🎓",
  });

  // Load user data
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          const parsedData = JSON.parse(storedUserData);
          setUserData({
            name: parsedData.name || "User",
            avatar: parsedData.avatar || "👨‍🎓",
          });
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    toast("Yakin ingin logout?", {
      description: "Anda akan keluar dari akun dan kembali ke halaman utama.",
      action: {
        label: "Logout",
        onClick: () => {
          fetch("/api/auth/logout", { method: "POST" })
            .catch(() => {})
            .finally(() => {
              if (typeof window !== "undefined") {
                localStorage.removeItem("authToken");
                localStorage.removeItem("userData");
                document.cookie =
                  "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              }
              toast.success("Logout berhasil! Sampai jumpa lagi! 👋");
              setTimeout(() => {
                router.push("/");
              }, 200);
            });
        },
      },
      cancel: {
        label: "Batal",
        onClick: () => toast.dismiss(),
      },
    });
  };

  // Overall Leaderboard Data
  const [overallLeaderboard] = useState([
    {
      id: 1,
      rank: 1,
      name: "Ahmad Bayu Pratama",
      school: "SMA Negeri 1 Jakarta",
      totalScore: 2847,
      totalTryouts: 45,
      averageScore: 87.3,
      avatar: "👨‍🎓",
      badge: "🏆",
      isCurrentUser: true,
    },
    {
      id: 2,
      rank: 2,
      name: "Siti Nurhaliza",
      school: "SMA Negeri 3 Bandung",
      totalScore: 2832,
      totalTryouts: 48,
      averageScore: 86.8,
      avatar: "👩‍🎓",
      badge: "🥈",
      isCurrentUser: false,
    },
    {
      id: 3,
      rank: 3,
      name: "Muhammad Rizki",
      school: "SMA Negeri 5 Surabaya",
      totalScore: 2814,
      totalTryouts: 43,
      averageScore: 86.1,
      avatar: "👨‍💼",
      badge: "🥉",
      isCurrentUser: false,
    },
    {
      id: 4,
      rank: 4,
      name: "Dewi Kartika",
      school: "SMA Negeri 2 Yogyakarta",
      totalScore: 2798,
      totalTryouts: 41,
      averageScore: 85.7,
      avatar: "👩‍💻",
      badge: "🎖️",
      isCurrentUser: false,
    },
    {
      id: 5,
      rank: 5,
      name: "Andi Pratama",
      school: "SMA Negeri 1 Medan",
      totalScore: 2775,
      totalTryouts: 39,
      averageScore: 85.2,
      avatar: "👨‍🔬",
      badge: "🏅",
      isCurrentUser: false,
    },
    {
      id: 6,
      rank: 6,
      name: "Putri Maharani",
      school: "SMA Negeri 4 Semarang",
      totalScore: 2751,
      totalTryouts: 44,
      averageScore: 84.8,
      avatar: "👩‍🎨",
      badge: "⭐",
      isCurrentUser: false,
    },
    {
      id: 7,
      rank: 7,
      name: "Budi Santoso",
      school: "SMA Negeri 3 Malang",
      totalScore: 2728,
      totalTryouts: 42,
      averageScore: 84.3,
      avatar: "👨‍🎨",
      badge: "🌟",
      isCurrentUser: false,
    },
    {
      id: 8,
      rank: 8,
      name: "Rina Permata",
      school: "SMA Negeri 2 Palembang",
      totalScore: 2705,
      totalTryouts: 38,
      averageScore: 83.9,
      avatar: "👩‍🔬",
      badge: "💫",
      isCurrentUser: false,
    },
    {
      id: 9,
      rank: 9,
      name: "Dimas Aditya",
      school: "SMA Negeri 1 Denpasar",
      totalScore: 2689,
      totalTryouts: 36,
      averageScore: 83.5,
      avatar: "👨‍⚕️",
      badge: "✨",
      isCurrentUser: false,
    },
    {
      id: 10,
      rank: 10,
      name: "Lestari Wijaya",
      school: "SMA Negeri 5 Makassar",
      totalScore: 2672,
      totalTryouts: 40,
      averageScore: 83.1,
      avatar: "👩‍⚕️",
      badge: "🎯",
      isCurrentUser: false,
    },
  ]);

  // Subject-specific leaderboards
  const [mathematicsLeaderboard] = useState([
    {
      id: 1,
      rank: 1,
      name: "Muhammad Rizki",
      school: "SMA Negeri 5 Surabaya",
      totalScore: 2856,
      totalTryouts: 15,
      averageScore: 95.2,
      avatar: "👨‍💼",
      badge: "🏆",
      isCurrentUser: false,
    },
    {
      id: 2,
      rank: 2,
      name: "Ahmad Bayu Pratama",
      school: "SMA Negeri 1 Jakarta",
      totalScore: 2844,
      totalTryouts: 18,
      averageScore: 94.8,
      avatar: "👨‍🎓",
      badge: "🥈",
      isCurrentUser: true,
    },
    {
      id: 3,
      rank: 3,
      name: "Dimas Aditya",
      school: "SMA Negeri 1 Denpasar",
      totalScore: 2808,
      totalTryouts: 12,
      averageScore: 93.5,
      avatar: "👨‍⚕️",
      badge: "🥉",
      isCurrentUser: false,
    },
  ]);

  const [scienceLeaderboard] = useState([
    {
      id: 1,
      rank: 1,
      name: "Siti Nurhaliza",
      school: "SMA Negeri 3 Bandung",
      totalScore: 2884,
      totalTryouts: 20,
      averageScore: 96.1,
      avatar: "👩‍🎓",
      badge: "🏆",
      isCurrentUser: false,
    },
    {
      id: 2,
      rank: 2,
      name: "Ahmad Bayu Pratama",
      school: "SMA Negeri 1 Jakarta",
      totalScore: 2751,
      totalTryouts: 16,
      averageScore: 91.7,
      avatar: "👨‍🎓",
      badge: "🥈",
      isCurrentUser: true,
    },
    {
      id: 3,
      rank: 3,
      name: "Rina Permata",
      school: "SMA Negeri 2 Palembang",
      totalScore: 2709,
      totalTryouts: 14,
      averageScore: 90.3,
      avatar: "👩‍🔬",
      badge: "🥉",
      isCurrentUser: false,
    },
  ]);

  const [languageLeaderboard] = useState([
    {
      id: 1,
      rank: 1,
      name: "Dewi Kartika",
      school: "SMA Negeri 2 Yogyakarta",
      totalScore: 2916,
      totalTryouts: 22,
      averageScore: 97.2,
      avatar: "👩‍💻",
      badge: "🏆",
      isCurrentUser: false,
    },
    {
      id: 2,
      rank: 2,
      name: "Putri Maharani",
      school: "SMA Negeri 4 Semarang",
      totalScore: 2874,
      totalTryouts: 19,
      averageScore: 95.8,
      avatar: "👩‍🎨",
      badge: "🥈",
      isCurrentUser: false,
    },
    {
      id: 3,
      rank: 3,
      name: "Ahmad Bayu Pratama",
      school: "SMA Negeri 1 Jakarta",
      totalScore: 2832,
      totalTryouts: 17,
      averageScore: 94.4,
      avatar: "👨‍🎓",
      badge: "🥉",
      isCurrentUser: true,
    },
  ]);

  // Regional stats
  const [regionalStats] = useState([
    {
      region: "DKI Jakarta",
      participants: 15420,
      averageScore: 82.5,
      topSchool: "SMA Negeri 1 Jakarta",
      color: "bg-blue-400",
    },
    {
      region: "Jawa Barat",
      participants: 18750,
      averageScore: 81.8,
      topSchool: "SMA Negeri 3 Bandung",
      color: "bg-emerald-400",
    },
    {
      region: "Jawa Timur",
      participants: 16890,
      averageScore: 81.2,
      topSchool: "SMA Negeri 5 Surabaya",
      color: "bg-orange-400",
    },
    {
      region: "DI Yogyakarta",
      participants: 8420,
      averageScore: 83.1,
      topSchool: "SMA Negeri 2 Yogyakarta",
      color: "bg-purple-400",
    },
  ]);

  const getCurrentLeaderboard = () => {
    switch (activeTab) {
      case "mathematics":
        return mathematicsLeaderboard;
      case "science":
        return scienceLeaderboard;
      case "language":
        return languageLeaderboard;
      default:
        return overallLeaderboard;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 pb-20 md:pb-0">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <HeaderNavigation
          currentPage="leaderboard"
          userInfo={userData}
          onLogout={handleLogout}
        />
      </div>

      {/* Mobile Header */}
      <div className="block md:hidden">
        <MobileFriendlyHeader userInfo={userData} showMobileMenu={false} />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <HeaderSection timeFilter={timeFilter} />

        {/* Time Filter */}
        <TimeFilter timeFilter={timeFilter} onTimeFilterChange={setTimeFilter} />

        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Main Leaderboard */}
          <MainLeaderboard 
            leaderboard={getCurrentLeaderboard()} 
            activeTab={activeTab} 
          />

          {/* Side Stats */}
          <SideStats 
            regionalStats={regionalStats}
            currentLeaderboardLength={getCurrentLeaderboard().length}
          />
        </div>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNavigation currentPage="leaderboard" />
    </div>
  );
}
