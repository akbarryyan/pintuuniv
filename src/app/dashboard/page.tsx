"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import HeaderNavigation from "@/components/HeaderNavigation";

export default function DashboardPage() {
  const router = useRouter();

  // ALL HOOKS MUST BE DECLARED AT THE TOP LEVEL BEFORE ANY CONDITIONAL RETURNS
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    school: "",
    grade: "",
    avatar: "👨‍🎓",
    subscriptionType: "free",
  });
  const [isLoading, setIsLoading] = useState(true);

  const [stats] = useState({
    totalTryouts: 0,
    averageScore: 0,
    completedLessons: 0,
    studyStreak: 0,
    rank: 0,
    totalStudents: 1247,
  });

  const [recentActivities] = useState<
    {
      id: number;
      title: string;
      date: string;
      type: string;
      score?: number;
      status?: string;
      progress?: number;
    }[]
  >([
    // Empty for new users - will be populated from API later
  ]);

  const [upcomingEvents] = useState([
    {
      id: 1,
      title: "Tryout UTBK Nasional #5",
      date: "Minggu, 3 Agustus 2025",
      time: "09:00 - 12:00",
      participants: 2547,
    },
    {
      id: 2,
      title: "Webinar: Tips Lolos PTN Favorit",
      date: "Senin, 4 Agustus 2025",
      time: "19:00 - 21:00",
      participants: 892,
    },
    {
      id: 3,
      title: "Live Class: Strategi UTBK 2025",
      date: "Rabu, 6 Agustus 2025",
      time: "20:00 - 22:00",
      participants: 1205,
    },
  ]);

  // Available Tryouts Data
  const [availableTryouts] = useState([
    {
      id: 1,
      title: "Tryout UTBK Saintek Premium",
      subject: "Matematika, Fisika, Kimia, Biologi",
      duration: "180 menit",
      questions: 120,
      price: 49000,
      type: "premium",
      difficulty: "Sulit",
      participants: 15420,
      rating: 4.8,
      deadline: "5 Agustus 2025",
    },
    {
      id: 2,
      title: "Tryout UTBK Soshum Gratis",
      subject: "Sejarah, Geografi, Sosiologi, Ekonomi",
      duration: "180 menit",
      questions: 120,
      price: 0,
      type: "free",
      difficulty: "Sedang",
      participants: 28547,
      rating: 4.6,
      deadline: "10 Agustus 2025",
    },
    {
      id: 3,
      title: "Tryout Simulasi UTBK Nasional",
      subject: "TPS + TKA Saintek/Soshum",
      duration: "195 menit",
      questions: 150,
      price: 99000,
      type: "premium",
      difficulty: "Sangat Sulit",
      participants: 8924,
      rating: 4.9,
      deadline: "15 Agustus 2025",
    },
    {
      id: 4,
      title: "Tryout TPS (Tes Potensi Skolastik)",
      subject: "Penalaran Umum, Kuantitatif, Bahasa",
      duration: "110 menit",
      questions: 88,
      price: 0,
      type: "free",
      difficulty: "Sedang",
      participants: 42156,
      rating: 4.5,
      deadline: "20 Agustus 2025",
    },
    {
      id: 5,
      title: "Tryout UTBK Intensif Pro",
      subject: "Semua Mata Pelajaran + Analisis AI",
      duration: "200 menit",
      questions: 160,
      price: 149000,
      type: "premium",
      difficulty: "Sangat Sulit",
      participants: 5847,
      rating: 5.0,
      deadline: "25 Agustus 2025",
    },
  ]);

  // User's Tryout History
  const [userTryouts] = useState([
    {
      id: 1,
      title: "Tryout UTBK Matematika Dasar",
      date: "29 Juli 2025",
      time: "14:30",
      score: 85,
      maxScore: 100,
      duration: "90 menit",
      status: "completed",
      rank: 245,
      totalParticipants: 3520,
      subject: "Matematika",
      type: "free",
    },
    {
      id: 2,
      title: "Tryout UTBK Bahasa Inggris",
      date: "27 Juli 2025",
      time: "16:00",
      score: 78,
      maxScore: 100,
      duration: "60 menit",
      status: "completed",
      rank: 892,
      totalParticipants: 4120,
      subject: "Bahasa Inggris",
      type: "premium",
    },
    {
      id: 3,
      title: "Tryout UTBK Fisika Premium",
      date: "25 Juli 2025",
      time: "10:00",
      score: 92,
      maxScore: 100,
      duration: "75 menit",
      status: "completed",
      rank: 89,
      totalParticipants: 2847,
      subject: "Fisika",
      type: "premium",
    },
  ]);

  const [upcomingTryouts] = useState([
    {
      id: 1,
      title: "Tryout UTBK Nasional #8",
      date: "10 Agustus 2025",
      time: "09:00",
      duration: "180 menit",
      subject: "TPS + TKA Saintek",
      questions: 150,
      price: 79000,
      type: "premium",
      status: "registered",
      reminder: "H-1",
    },
    {
      id: 2,
      title: "Simulasi UTBK Komprehensif",
      date: "12 Agustus 2025",
      time: "13:00",
      duration: "195 menit",
      subject: "Semua Mata Pelajaran",
      questions: 160,
      price: 0,
      type: "free",
      status: "available",
      reminder: "H-3",
    },
    {
      id: 3,
      title: "Tryout Intensif Matematika",
      date: "14 Agustus 2025",
      time: "15:30",
      duration: "120 menit",
      subject: "Matematika Wajib + Peminatan",
      questions: 80,
      price: 49000,
      type: "premium",
      status: "available",
      reminder: "H-5",
    },
  ]);

  // Load user data from localStorage on component mount
  useEffect(() => {
    setMounted(true);

    const loadUserData = () => {
      try {
        if (typeof window !== "undefined") {
          const storedUserData = localStorage.getItem("userData");
          const storedAuthToken = localStorage.getItem("authToken");

          // Debug logging
          console.log("Stored userData:", storedUserData);
          console.log("Stored authToken:", storedAuthToken);
          console.log("Document cookies:", document.cookie);

          if (storedUserData) {
            const parsedData = JSON.parse(storedUserData);
            console.log("Parsed user data:", parsedData);
            setUserData({
              name: parsedData.name || "User",
              email: parsedData.email || "",
              school: parsedData.school || "Tidak diset",
              grade: parsedData.grade || "12",
              avatar: parsedData.avatar || "👨‍🎓",
              subscriptionType: parsedData.subscriptionType || "free",
            });
          } else {
            console.log("No userData found in localStorage");
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        if (typeof window !== "undefined") {
          toast.error("Gagal memuat data user");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  // HeaderNavigation kini menangani logout sepenuhnya

  // Loading state - AFTER ALL HOOKS
  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-emerald-50 to-purple-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-emerald-50 to-purple-100">
      {/* Header Navigation */}
      <HeaderNavigation
        currentPage="Dashboard"
        userInfo={{
          name: userData.name,
          avatar: userData.avatar,
        }}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 sm:p-6 md:p-8 border-3 sm:border-4 border-slate-800 shadow-brutal transform hover:rotate-1 transition-all duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-3 uppercase">
                  Selamat Datang Kembali! 👋
                </h1>
                <p className="text-lg sm:text-xl font-bold mb-2">
                  {userData.name}
                </p>
                <p className="text-sm sm:text-base font-medium opacity-90 mb-3">
                  {userData.email} • {userData.school || "Sekolah belum diset"}{" "}
                  - Kelas {userData.grade}
                </p>
                <div className="flex items-center space-x-2 flex-wrap gap-2">
                  <span
                    className={`px-2 py-1 text-xs font-black rounded border-2 border-slate-800 ${
                      userData.subscriptionType === "premium"
                        ? "bg-yellow-400 text-slate-900"
                        : "bg-gray-300 text-slate-900"
                    }`}
                  >
                    {userData.subscriptionType === "premium"
                      ? "🌟 PREMIUM"
                      : "🆓 FREE"}
                  </span>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 text-center">
                <div className="bg-white text-purple-600 px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 shadow-brutal transform -rotate-3">
                  <p className="font-black text-xs sm:text-sm uppercase">
                    Streak Belajar
                  </p>
                  <p className="text-xl sm:text-2xl font-black">
                    {stats.studyStreak} Hari 🔥
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <div className="bg-white border-3 border-slate-800 p-3 sm:p-4 md:p-6 shadow-brutal transform hover:-rotate-1 hover:-translate-y-1 transition-all duration-200">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-400 border-3 border-slate-800 mx-auto mb-2 sm:mb-3 flex items-center justify-center font-black text-lg sm:text-xl">
                📝
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 mb-1">
                {stats.totalTryouts}
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-600 uppercase">
                Total Tryouts
              </p>
            </div>
          </div>

          <div className="bg-white border-3 border-slate-800 p-3 sm:p-4 md:p-6 shadow-brutal transform hover:rotate-1 hover:-translate-y-1 transition-all duration-200">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-400 border-3 border-slate-800 mx-auto mb-2 sm:mb-3 flex items-center justify-center font-black text-lg sm:text-xl">
                🎯
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 mb-1">
                {stats.averageScore}
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-600 uppercase">
                Rata-rata Skor
              </p>
            </div>
          </div>

          <div className="bg-white border-3 border-slate-800 p-3 sm:p-4 md:p-6 shadow-brutal transform hover:rotate-1 hover:-translate-y-1 transition-all duration-200">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-400 border-3 border-slate-800 mx-auto mb-2 sm:mb-3 flex items-center justify-center font-black text-lg sm:text-xl">
                📚
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 mb-1">
                {stats.completedLessons}
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-600 uppercase">
                Materi Selesai
              </p>
            </div>
          </div>

          <div className="bg-white border-3 border-slate-800 p-3 sm:p-4 md:p-6 shadow-brutal transform hover:rotate-1 hover:-translate-y-1 transition-all duration-200">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-400 border-3 border-slate-800 mx-auto mb-2 sm:mb-3 flex items-center justify-center font-black text-lg sm:text-xl">
                🎖️
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 mb-1">
                12
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-600 uppercase">
                Achievement
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
                  📊 Aktivitas Terbaru
                </h2>
                <Link
                  href="/activities"
                  className="bg-blue-500 text-white px-3 sm:px-4 py-2 sm:py-2 font-black text-xs sm:text-sm border-2 sm:border-3 border-slate-800 hover:bg-blue-600 transition-colors text-center sm:text-left"
                >
                  Lihat Semua
                </Link>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {recentActivities.length > 0 ? (
                  recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="border-2 border-slate-800 p-3 sm:p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-0">
                        <div className="flex items-start space-x-3 flex-1">
                          <div
                            className={`w-8 h-8 sm:w-10 sm:h-10 border-2 border-slate-800 flex items-center justify-center font-black text-sm sm:text-base ${
                              activity.type === "tryout"
                                ? "bg-orange-400"
                                : "bg-emerald-400"
                            }`}
                          >
                            {activity.type === "tryout" ? "📝" : "📚"}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-black text-sm sm:text-base text-slate-900 mb-1 leading-tight">
                              {activity.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 font-bold">
                              {activity.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-left sm:text-right">
                          {activity.type === "tryout" ? (
                            <div className="bg-blue-500 text-white px-2 sm:px-3 py-1 border-2 border-slate-800 font-black text-xs sm:text-sm inline-block">
                              Skor: {activity.score}
                            </div>
                          ) : (
                            <div
                              className={`px-2 sm:px-3 py-1 border-2 border-slate-800 font-black text-xs sm:text-sm inline-block ${
                                activity.status === "completed"
                                  ? "bg-emerald-500 text-white"
                                  : "bg-yellow-400 text-slate-900"
                              }`}
                            >
                              {activity.status === "completed"
                                ? "Selesai"
                                : `${activity.progress}%`}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-slate-200 border-3 border-slate-800 mx-auto mb-4 flex items-center justify-center text-2xl">
                      📊
                    </div>
                    <h3 className="font-black text-lg text-slate-900 mb-2">
                      Belum Ada Aktivitas
                    </h3>
                    <p className="text-slate-600 font-bold mb-4">
                      Mulai tryout atau pelajari materi untuk melihat aktivitas
                      terbaru kamu!
                    </p>
                    <Link
                      href="/tryouts"
                      className="inline-block bg-orange-500 text-white px-4 py-2 font-black text-sm border-2 border-slate-800 hover:bg-orange-600 transition-colors"
                    >
                      🚀 Mulai Tryout
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Tracking Chart */}
            <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
                  📈 Progress Tracking
                </h2>
                <div className="flex items-center space-x-2">
                  <select className="bg-white border-2 border-slate-800 px-2 py-1 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-400">
                    <option value="7">7 Hari</option>
                    <option value="30">30 Hari</option>
                    <option value="90">90 Hari</option>
                  </select>
                  <Link
                    href="/analytics"
                    className="bg-emerald-500 text-white px-3 sm:px-4 py-2 sm:py-2 font-black text-xs sm:text-sm border-2 sm:border-3 border-slate-800 hover:bg-emerald-600 transition-colors text-center sm:text-left"
                  >
                    Detail
                  </Link>
                </div>
              </div>

              {/* Chart Container */}
              <div className="space-y-4 sm:space-y-6">
                {/* Score Progress Chart */}
                <div className="border-2 border-slate-800 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-black text-sm sm:text-base text-slate-900">
                      📊 Perkembangan Skor
                    </h3>
                    <div className="bg-blue-500 text-white px-2 py-1 border-2 border-slate-800 font-black text-xs">
                      +12% minggu ini
                    </div>
                  </div>

                  {/* Mock Chart Area */}
                  <div className="relative h-32 sm:h-40 bg-white border-2 border-slate-800 p-2 overflow-hidden">
                    {/* Chart Grid Lines */}
                    <div className="absolute inset-2 opacity-20">
                      <div className="h-full grid grid-rows-4 gap-0">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="border-b border-slate-400"
                          ></div>
                        ))}
                      </div>
                      <div className="absolute inset-0 grid grid-cols-7 gap-0">
                        {[...Array(7)].map((_, i) => (
                          <div
                            key={i}
                            className="border-r border-slate-400"
                          ></div>
                        ))}
                      </div>
                    </div>

                    {/* Mock Chart Line */}
                    <div className="absolute inset-2 flex items-end justify-between">
                      <div
                        className="w-2 bg-blue-500 border border-slate-800"
                        style={{ height: "40%" }}
                      ></div>
                      <div
                        className="w-2 bg-blue-500 border border-slate-800"
                        style={{ height: "60%" }}
                      ></div>
                      <div
                        className="w-2 bg-blue-500 border border-slate-800"
                        style={{ height: "45%" }}
                      ></div>
                      <div
                        className="w-2 bg-blue-500 border border-slate-800"
                        style={{ height: "70%" }}
                      ></div>
                      <div
                        className="w-2 bg-blue-500 border border-slate-800"
                        style={{ height: "85%" }}
                      ></div>
                      <div
                        className="w-2 bg-blue-500 border border-slate-800"
                        style={{ height: "75%" }}
                      ></div>
                      <div
                        className="w-2 bg-blue-500 border border-slate-800"
                        style={{ height: "90%" }}
                      ></div>
                    </div>

                    {/* Chart Labels */}
                    <div className="absolute bottom-0 left-2 right-2 flex justify-between text-xs font-bold text-slate-600">
                      <span>Sen</span>
                      <span>Sel</span>
                      <span>Rab</span>
                      <span>Kam</span>
                      <span>Jum</span>
                      <span>Sab</span>
                      <span>Min</span>
                    </div>
                  </div>

                  {/* Score Range */}
                  <div className="flex justify-between items-center mt-2 text-xs font-bold text-slate-600">
                    <span>Rendah: 45</span>
                    <span>Rata-rata: 72</span>
                    <span>Tinggi: 92</span>
                  </div>
                </div>

                {/* Study Time Chart */}
                <div className="border-2 border-slate-800 p-3 sm:p-4 bg-gradient-to-r from-emerald-50 to-green-50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-black text-sm sm:text-base text-slate-900">
                      ⏰ Waktu Belajar Harian
                    </h3>
                    <div className="bg-emerald-500 text-white px-2 py-1 border-2 border-slate-800 font-black text-xs">
                      Target: 2h/hari
                    </div>
                  </div>

                  {/* Study Time Bars */}
                  <div className="space-y-2">
                    {[
                      {
                        day: "Senin",
                        time: "1.5",
                        percent: 75,
                        color: "bg-emerald-400",
                      },
                      {
                        day: "Selasa",
                        time: "2.2",
                        percent: 110,
                        color: "bg-green-500",
                      },
                      {
                        day: "Rabu",
                        time: "0.8",
                        percent: 40,
                        color: "bg-yellow-400",
                      },
                      {
                        day: "Kamis",
                        time: "2.5",
                        percent: 125,
                        color: "bg-green-600",
                      },
                      {
                        day: "Jumat",
                        time: "1.8",
                        percent: 90,
                        color: "bg-emerald-500",
                      },
                      {
                        day: "Sabtu",
                        time: "3.0",
                        percent: 150,
                        color: "bg-green-700",
                      },
                      {
                        day: "Minggu",
                        time: "1.2",
                        percent: 60,
                        color: "bg-emerald-300",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-12 text-xs font-bold text-slate-700">
                          {item.day}
                        </div>
                        <div className="flex-1 bg-gray-200 border border-slate-800 h-4 relative overflow-hidden">
                          <div
                            className={`${item.color} h-full border-r border-slate-800 transition-all duration-300`}
                            style={{ width: `${Math.min(item.percent, 100)}%` }}
                          ></div>
                          {item.percent > 100 && (
                            <div className="absolute top-0 right-0 bg-orange-500 h-full w-2 border-l border-slate-800"></div>
                          )}
                        </div>
                        <div className="w-12 text-xs font-bold text-slate-700 text-right">
                          {item.time}h
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subject Performance */}
                <div className="border-2 border-slate-800 p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-black text-sm sm:text-base text-slate-900">
                      🎯 Performa Per Mata Pelajaran
                    </h3>
                    <div className="bg-purple-500 text-white px-2 py-1 border-2 border-slate-800 font-black text-xs">
                      Rata-rata: 78%
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      {
                        subject: "Matematika",
                        score: 85,
                        color: "bg-blue-500",
                        icon: "🔢",
                      },
                      {
                        subject: "Fisika",
                        score: 92,
                        color: "bg-emerald-500",
                        icon: "⚡",
                      },
                      {
                        subject: "Kimia",
                        score: 78,
                        color: "bg-orange-500",
                        icon: "🧪",
                      },
                      {
                        subject: "Biologi",
                        score: 73,
                        color: "bg-green-500",
                        icon: "🌱",
                      },
                      {
                        subject: "B.Indonesia",
                        score: 88,
                        color: "bg-purple-500",
                        icon: "📚",
                      },
                      {
                        subject: "B.Inggris",
                        score: 76,
                        color: "bg-pink-500",
                        icon: "🌍",
                      },
                    ].map((item, index) => (
                      <div key={index} className="text-center">
                        <div
                          className={`w-12 h-12 sm:w-16 sm:h-16 ${item.color} border-2 border-slate-800 mx-auto mb-2 flex items-center justify-center text-lg sm:text-xl`}
                        >
                          {item.icon}
                        </div>
                        <p className="font-black text-xs sm:text-sm text-slate-900 mb-1">
                          {item.subject}
                        </p>
                        <div
                          className={`px-2 py-1 border-2 border-slate-800 font-black text-xs ${
                            item.score >= 85
                              ? "bg-green-400 text-slate-900"
                              : item.score >= 75
                              ? "bg-yellow-400 text-slate-900"
                              : "bg-red-400 text-white"
                          }`}
                        >
                          {item.score}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase mb-4 sm:mb-6">
                🗓️ Event Mendatang
              </h2>

              <div className="space-y-3 sm:space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="border-2 border-slate-800 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100 transition-all duration-200"
                  >
                    <h3 className="font-black text-sm text-slate-900 mb-1 leading-tight">
                      {event.title}
                    </h3>
                    <p className="text-xs font-bold text-slate-600 mb-1">
                      📅 {event.date}
                    </p>
                    <p className="text-xs font-bold text-orange-600 mb-2">
                      ⏰ {event.time}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500">
                        👥 {event.participants} peserta
                      </span>
                      <button className="bg-orange-500 text-white px-2 py-1 font-black text-xs border border-slate-800 hover:bg-orange-600 transition-colors">
                        Daftar
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                <Link
                  href="/events"
                  className="text-orange-600 font-black text-xs hover:text-orange-700 transition-colors"
                >
                  Lihat Semua Event →
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase mb-4">
                📈 Statistik Singkat
              </h3>

              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-400 border-3 border-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center font-black text-xl sm:text-2xl">
                    🏆
                  </div>
                  <p className="font-black text-lg sm:text-xl text-slate-900">
                    #{stats.rank || "N/A"}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-slate-600">
                    Peringkat Nasional
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-400 border-3 border-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center font-black text-xl sm:text-2xl">
                    ⏱️
                  </div>
                  <p className="font-black text-lg sm:text-xl text-slate-900">
                    24h
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-slate-600">
                    Waktu Belajar
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-400 border-3 border-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center font-black text-xl sm:text-2xl">
                    🎖️
                  </div>
                  <p className="font-black text-lg sm:text-xl text-slate-900">
                    12
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-slate-600">
                    Achievement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Tryouts Section */}
        <div className="mt-6 sm:mt-8">
          <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
                🎯 Tryout Tersedia
              </h2>
              <Link
                href="/tryouts"
                className="bg-orange-500 text-white px-3 sm:px-4 py-2 sm:py-2 font-black text-xs sm:text-sm border-2 sm:border-3 border-slate-800 hover:bg-orange-600 transition-colors text-center sm:text-left"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              {availableTryouts.slice(0, 4).map((tryout) => (
                <div
                  key={tryout.id}
                  className="border-2 border-slate-800 p-3 sm:p-4 bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 transition-all duration-200 group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div
                      className={`px-2 py-1 border-2 border-slate-800 font-black text-xs ${
                        tryout.type === "free"
                          ? "bg-emerald-400 text-slate-900"
                          : "bg-orange-400 text-slate-900"
                      }`}
                    >
                      {tryout.type === "free" ? "GRATIS" : "PREMIUM"}
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <span className="text-yellow-500 text-sm">⭐</span>
                        <span className="font-black text-xs text-slate-700">
                          {tryout.rating}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-500">
                        {tryout.participants.toLocaleString()} peserta
                      </p>
                    </div>
                  </div>

                  <h3 className="font-black text-sm sm:text-base text-slate-900 mb-2 leading-tight group-hover:text-orange-600 transition-colors">
                    {tryout.title}
                  </h3>

                  <div className="space-y-2 mb-3">
                    <div className="flex flex-wrap gap-1 text-xs font-bold text-slate-600">
                      <span>📚 {tryout.subject}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-xs font-bold text-slate-600">
                      <div>⏱️ {tryout.duration}</div>
                      <div>📝 {tryout.questions} soal</div>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-600">
                        📅 Deadline: {tryout.deadline}
                      </span>
                      <span
                        className={`px-2 py-1 border border-slate-800 ${
                          tryout.difficulty === "Sangat Sulit"
                            ? "bg-red-400 text-slate-900"
                            : tryout.difficulty === "Sulit"
                            ? "bg-orange-400 text-slate-900"
                            : "bg-yellow-400 text-slate-900"
                        }`}
                      >
                        {tryout.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-left">
                      {tryout.price > 0 ? (
                        <p className="font-black text-sm text-orange-600">
                          Rp {tryout.price.toLocaleString()}
                        </p>
                      ) : (
                        <p className="font-black text-sm text-emerald-600">
                          GRATIS
                        </p>
                      )}
                    </div>
                    <button
                      className={`px-3 py-2 font-black text-xs border-2 border-slate-800 transition-colors ${
                        tryout.type === "free"
                          ? "bg-emerald-500 text-white hover:bg-emerald-600"
                          : "bg-orange-500 text-white hover:bg-orange-600"
                      }`}
                    >
                      {tryout.type === "free" ? "🚀 MULAI" : "💳 BELI"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Tryouts */}
        <div className="mt-6 sm:mt-8">
          <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
                🗓️ Tryout Mendatang
              </h2>
              <Link
                href="/upcoming"
                className="bg-purple-500 text-white px-3 sm:px-4 py-2 sm:py-2 font-black text-xs sm:text-sm border-2 sm:border-3 border-slate-800 hover:bg-purple-600 transition-colors text-center sm:text-left"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {upcomingTryouts.map((tryout) => (
                <div
                  key={tryout.id}
                  className="border-2 border-slate-800 p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-black text-sm text-slate-900 mb-1 leading-tight">
                        {tryout.title}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                        <span className="text-xs font-bold text-slate-600">
                          📅 {tryout.date}
                        </span>
                        <div
                          className={`px-2 py-1 border border-slate-800 font-black text-xs self-start ${
                            tryout.type === "free"
                              ? "bg-emerald-400 text-slate-900"
                              : "bg-orange-400 text-slate-900"
                          }`}
                        >
                          {tryout.type === "free" ? "GRATIS" : "PREMIUM"}
                        </div>
                      </div>
                      <p className="text-xs font-bold text-slate-600 mb-2">
                        ⏰ {tryout.time} • ⏱️ {tryout.duration}
                      </p>
                    </div>
                    <div className="text-left sm:text-right mb-2 sm:mb-0">
                      <div
                        className={`px-2 py-1 border-2 border-slate-800 font-black text-xs inline-block ${
                          tryout.status === "registered"
                            ? "bg-emerald-400 text-slate-900"
                            : "bg-blue-400 text-slate-900"
                        }`}
                      >
                        {tryout.status === "registered"
                          ? "TERDAFTAR"
                          : "TERSEDIA"}
                      </div>
                      <p className="text-xs font-bold text-purple-600 mt-1">
                        {tryout.reminder}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs font-bold text-slate-600 mb-3">
                    <div>📚 {tryout.subject}</div>
                    <div>📝 {tryout.questions} soal</div>
                  </div>

                  <button
                    className={`w-full px-3 py-2 font-black text-xs border-2 border-slate-800 transition-colors ${
                      tryout.status === "registered"
                        ? "bg-emerald-500 text-white hover:bg-emerald-600"
                        : "bg-purple-500 text-white hover:bg-purple-600"
                    }`}
                  >
                    {tryout.status === "registered"
                      ? "✅ SUDAH TERDAFTAR"
                      : "📝 DAFTAR SEKARANG"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
