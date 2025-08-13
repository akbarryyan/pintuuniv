"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import HeaderNavigation from "@/components/HeaderNavigation";
import BottomNavigation from "@/components/BottomNavigation";
import MobileFriendlyHeader from "@/components/MobileFriendlyHeader";

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

  const getRankColor = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-500";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-400";
    if (rank === 3) return "bg-gradient-to-r from-orange-400 to-orange-500";
    if (rank <= 10) return "bg-gradient-to-r from-blue-400 to-blue-500";
    return "bg-gradient-to-r from-slate-400 to-slate-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 pb-20 md:pb-0">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <HeaderNavigation
          showBackButton={true}
          backButtonText="Kembali ke Dashboard"
          backButtonHref="/dashboard"
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
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 p-4 sm:p-6 md:p-8 border-3 sm:border-4 border-slate-800 shadow-brutal transform hover:rotate-1 transition-all duration-300">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-4 uppercase">
                🏆 LEADERBOARD
              </h1>
              <p className="text-sm sm:text-base md:text-lg font-bold opacity-90">
                Papan peringkat siswa terbaik PintuUniv
              </p>
              <div className="flex justify-center items-center mt-3 sm:mt-4">
                <div className="bg-slate-900 text-white px-3 sm:px-4 py-2 border-3 border-slate-800 font-black text-xs sm:text-sm">
                  📊{" "}
                  {timeFilter === "weekly"
                    ? "MINGGUAN"
                    : timeFilter === "monthly"
                    ? "BULANAN"
                    : "SEPANJANG MASA"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Time Filter */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white border-3 sm:border-4 border-slate-800 p-3 sm:p-4 shadow-brutal">
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              {[
                { id: "weekly", label: "📅 Mingguan", icon: "📊" },
                { id: "monthly", label: "🗓️ Bulanan", icon: "📈" },
                { id: "alltime", label: "🕐 Sepanjang Masa", icon: "🏆" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setTimeFilter(filter.id)}
                  className={`px-3 sm:px-4 py-2 sm:py-3 font-black text-xs sm:text-sm uppercase border-2 sm:border-3 border-slate-800 transition-all duration-200 ${
                    timeFilter === filter.id
                      ? "bg-orange-500 text-white transform -rotate-1 -translate-y-1"
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white border-3 sm:border-4 border-slate-800 p-2 sm:p-3 shadow-brutal">
            <div className="flex overflow-x-auto space-x-1 sm:space-x-2">
              {[
                { id: "overall", label: "🎯 Keseluruhan", icon: "🏆" },
                { id: "mathematics", label: "🔢 Matematika", icon: "📊" },
                { id: "science", label: "🧪 Saintek", icon: "🔬" },
                { id: "language", label: "📝 Bahasa", icon: "📚" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 sm:px-4 py-2 sm:py-3 font-black text-xs sm:text-sm uppercase border-2 sm:border-3 border-slate-800 transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-blue-500 text-white transform -rotate-1 -translate-y-1"
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-3">
            <div className="bg-white border-3 sm:border-4 border-slate-800 shadow-brutal">
              {/* Top 3 Podium */}
              <div className="p-4 sm:p-6 border-b-3 border-slate-800 bg-gradient-to-r from-blue-100 to-purple-100">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase mb-4 text-center">
                  🏆 TOP 3 PERFORMERS
                </h2>

                <div className="flex justify-center items-end space-x-2 sm:space-x-4 mb-6">
                  {/* 2nd Place */}
                  {getCurrentLeaderboard()[1] && (
                    <div className="text-center">
                      <div className="bg-gray-300 border-3 border-slate-800 p-3 sm:p-4 mb-2 transform -rotate-2 shadow-lg">
                        <div className="text-2xl sm:text-3xl mb-2">🥈</div>
                        <div className="text-xl sm:text-2xl mb-1">
                          {getCurrentLeaderboard()[1].avatar}
                        </div>
                        <div className="font-black text-xs sm:text-sm text-slate-900">
                          {getCurrentLeaderboard()[1].name.split(" ")[0]}
                        </div>
                        <div className="font-bold text-xs text-slate-700">
                          {activeTab === "overall"
                            ? `${getCurrentLeaderboard()[1].averageScore?.toFixed(
                                1
                              )}`
                            : `${getCurrentLeaderboard()[1].averageScore?.toFixed(
                                1
                              )}`}
                        </div>
                      </div>
                      <div className="bg-gray-400 h-16 sm:h-20 border-3 border-slate-800"></div>
                    </div>
                  )}

                  {/* 1st Place */}
                  {getCurrentLeaderboard()[0] && (
                    <div className="text-center">
                      <div className="bg-yellow-400 border-3 border-slate-800 p-3 sm:p-4 mb-2 transform rotate-2 shadow-lg">
                        <div className="text-3xl sm:text-4xl mb-2">👑</div>
                        <div className="text-2xl sm:text-3xl mb-1">
                          {getCurrentLeaderboard()[0].avatar}
                        </div>
                        <div className="font-black text-xs sm:text-sm text-slate-900">
                          {getCurrentLeaderboard()[0].name.split(" ")[0]}
                        </div>
                        <div className="font-bold text-xs text-slate-700">
                          {activeTab === "overall"
                            ? `${getCurrentLeaderboard()[0].averageScore?.toFixed(
                                1
                              )}`
                            : `${getCurrentLeaderboard()[0].averageScore?.toFixed(
                                1
                              )}`}
                        </div>
                      </div>
                      <div className="bg-yellow-500 h-20 sm:h-24 border-3 border-slate-800"></div>
                    </div>
                  )}

                  {/* 3rd Place */}
                  {getCurrentLeaderboard()[2] && (
                    <div className="text-center">
                      <div className="bg-orange-400 border-3 border-slate-800 p-3 sm:p-4 mb-2 transform rotate-1 shadow-lg">
                        <div className="text-2xl sm:text-3xl mb-2">🥉</div>
                        <div className="text-xl sm:text-2xl mb-1">
                          {getCurrentLeaderboard()[2].avatar}
                        </div>
                        <div className="font-black text-xs sm:text-sm text-slate-900">
                          {getCurrentLeaderboard()[2].name.split(" ")[0]}
                        </div>
                        <div className="font-bold text-xs text-slate-700">
                          {activeTab === "overall"
                            ? `${getCurrentLeaderboard()[2].averageScore?.toFixed(
                                1
                              )}`
                            : `${getCurrentLeaderboard()[2].averageScore?.toFixed(
                                1
                              )}`}
                        </div>
                      </div>
                      <div className="bg-orange-500 h-12 sm:h-16 border-3 border-slate-800"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Full Leaderboard List */}
              <div className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {getCurrentLeaderboard().map((user, index) => (
                    <div
                      key={user.id}
                      className={`border-2 sm:border-3 border-slate-800 p-3 sm:p-4 shadow-lg transition-all duration-200 hover:-translate-y-1 ${
                        user.isCurrentUser
                          ? "bg-gradient-to-r from-blue-100 to-purple-100 border-blue-500"
                          : "bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          {/* Rank Badge */}
                          <div
                            className={`w-8 h-8 sm:w-10 sm:h-10 ${getRankColor(
                              user.rank
                            )} border-2 sm:border-3 border-slate-800 flex items-center justify-center font-black text-white text-sm sm:text-base shadow-md transform -rotate-3`}
                          >
                            {user.rank}
                          </div>

                          {/* User Info */}
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="text-2xl sm:text-3xl">
                              {user.avatar}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-black text-sm sm:text-base text-slate-900">
                                  {user.name}
                                  {user.isCurrentUser && (
                                    <span className="ml-2 bg-blue-500 text-white px-2 py-1 text-xs font-black border border-slate-800">
                                      YOU
                                    </span>
                                  )}
                                </h3>
                                <span className="text-lg sm:text-xl">
                                  {user.badge}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm font-bold text-slate-600">
                                {user.school}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="text-right">
                          {activeTab === "overall" ? (
                            <div>
                              <div className="font-black text-base sm:text-lg text-slate-900">
                                {user.averageScore?.toFixed(1) || "N/A"}
                              </div>
                              <div className="text-xs sm:text-sm font-bold text-slate-600">
                                Rata-rata
                              </div>
                              <div className="text-xs font-bold text-slate-500">
                                {user.totalTryouts} tryout
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="font-black text-base sm:text-lg text-slate-900">
                                {user.averageScore?.toFixed(1) || "N/A"}
                              </div>
                              <div className="text-xs sm:text-sm font-bold text-slate-600">
                                Skor Tertinggi
                              </div>
                              <div className="text-xs font-bold text-slate-500">
                                {user.totalTryouts} tryout
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Side Stats */}
          <div className="space-y-6 sm:space-y-8">
            {/* Regional Stats */}
            <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
              <h3 className="font-black text-lg sm:text-xl text-slate-900 uppercase mb-4 sm:mb-6">
                📍 Statistik Regional
              </h3>

              <div className="space-y-3 sm:space-y-4">
                {regionalStats.map((region, index) => (
                  <div
                    key={index}
                    className={`${region.color} border-2 border-slate-800 p-3 sm:p-4 transform hover:-rotate-1 transition-all duration-200`}
                  >
                    <h4 className="font-black text-sm text-slate-900 mb-2">
                      {region.region}
                    </h4>
                    <div className="space-y-1 text-xs font-bold text-slate-800">
                      <div>
                        👥 {region.participants.toLocaleString()} peserta
                      </div>
                      <div>📊 Rata-rata: {region.averageScore}</div>
                      <div>🏫 Terbaik: {region.topSchool}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievement Stats */}
            <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
              <h3 className="font-black text-lg sm:text-xl text-slate-900 uppercase mb-4 sm:mb-6">
                🎯 Statistik Pencapaian
              </h3>

              <div className="space-y-4">
                <div className="bg-yellow-100 border-2 border-yellow-400 p-3 text-center">
                  <div className="text-2xl mb-1">🏆</div>
                  <div className="font-black text-sm text-slate-900">
                    Skor Tertinggi
                  </div>
                  <div className="text-lg font-black text-yellow-700">987</div>
                </div>

                <div className="bg-blue-100 border-2 border-blue-400 p-3 text-center">
                  <div className="text-2xl mb-1">📊</div>
                  <div className="font-black text-sm text-slate-900">
                    Rata-rata Global
                  </div>
                  <div className="text-lg font-black text-blue-700">78.5</div>
                </div>

                <div className="bg-emerald-100 border-2 border-emerald-400 p-3 text-center">
                  <div className="text-2xl mb-1">👥</div>
                  <div className="font-black text-sm text-slate-900">
                    Total Peserta
                  </div>
                  <div className="text-lg font-black text-emerald-700">
                    125K+
                  </div>
                </div>
              </div>
            </div>

            {/* Your Rank Card */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
              <h3 className="font-black text-lg sm:text-xl uppercase mb-4">
                🎯 Peringkat Anda
              </h3>

              <div className="text-center">
                <div className="text-3xl sm:text-4xl mb-2">👨‍🎓</div>
                <div className="font-black text-xl sm:text-2xl mb-2">#1</div>
                <div className="text-sm font-bold opacity-90 mb-3">
                  dari {getCurrentLeaderboard().length} peserta
                </div>
                <div className="bg-white text-slate-900 px-3 py-2 border-2 border-slate-800 font-black text-xs">
                  TOP 1%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNavigation currentPage="leaderboard" />
    </div>
  );
}
