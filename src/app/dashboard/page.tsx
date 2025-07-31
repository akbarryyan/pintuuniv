"use client";

import Link from "next/link";
import { useState } from "react";
import HeaderNavigation from "@/components/HeaderNavigation";

export default function DashboardPage() {
  const [userData] = useState({
    name: "Ahmad Bayu Pratama",
    email: "ahmad.bayu@email.com",
    school: "SMA Negeri 1 Jakarta",
    grade: "12",
    avatar: "👨‍🎓",
  });

  const [stats] = useState({
    totalTryouts: 15,
    averageScore: 82,
    completedLessons: 28,
    studyStreak: 7,
    rank: 23,
    totalStudents: 1247,
  });

  const [recentActivities] = useState([
    {
      id: 1,
      type: "tryout",
      title: "Tryout UTBK Matematika",
      score: 85,
      date: "2 jam yang lalu",
      status: "completed",
    },
    {
      id: 2,
      type: "lesson",
      title: "Bahasa Indonesia - Teks Argumentasi",
      progress: 100,
      date: "1 hari yang lalu",
      status: "completed",
    },
    {
      id: 3,
      type: "tryout",
      title: "Tryout UTBK Bahasa Inggris",
      score: 78,
      date: "2 hari yang lalu",
      status: "completed",
    },
    {
      id: 4,
      type: "lesson",
      title: "Fisika - Gelombang dan Bunyi",
      progress: 60,
      date: "3 hari yang lalu",
      status: "in-progress",
    },
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

  // Upcoming User Tryouts
  const [upcomingTryouts] = useState([
    {
      id: 1,
      title: "Tryout UTBK Kimia Advanced",
      date: "2 Agustus 2025",
      time: "09:00 - 11:00",
      duration: "120 menit",
      questions: 80,
      subject: "Kimia",
      type: "premium",
      status: "registered",
      reminder: "1 hari lagi",
    },
    {
      id: 2,
      title: "Tryout Simulasi UTBK Nasional #6",
      date: "5 Agustus 2025",
      time: "08:00 - 11:15",
      duration: "195 menit",
      questions: 150,
      subject: "TPS + TKA",
      type: "premium",
      status: "registered",
      reminder: "4 hari lagi",
    },
    {
      id: 3,
      title: "Tryout UTBK Biologi Gratis",
      date: "8 Agustus 2025",
      time: "15:00 - 16:30",
      duration: "90 menit",
      questions: 60,
      subject: "Biologi",
      type: "free",
      status: "available",
      reminder: "7 hari lagi",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50">
      {/* Header Navigation */}
      <HeaderNavigation
        currentPage="dashboard"
        showBackButton={false}
        userInfo={{
          avatar: userData.avatar,
          name: userData.name,
        }}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 sm:p-6 md:p-8 border-3 sm:border-4 border-slate-800 shadow-brutal transform hover:rotate-1 transition-all duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-3 uppercase">
                  Selamat Datang Kembali! 👋
                </h1>
                <p className="text-lg sm:text-xl font-bold mb-2">
                  {userData.name}
                </p>
                <p className="text-sm sm:text-base font-medium opacity-90">
                  {userData.school} - Kelas {userData.grade}
                </p>
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

          <div className="bg-white border-3 border-slate-800 p-3 sm:p-4 md:p-6 shadow-brutal transform hover:-rotate-1 hover:-translate-y-1 transition-all duration-200">
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
                🏆
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 mb-1">
                #{stats.rank}
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-600 uppercase">
                Ranking
              </p>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
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
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="border-2 border-slate-800 p-3 sm:p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
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
                          <h3 className="font-black text-sm sm:text-base text-slate-900 mb-1">
                            {activity.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 font-bold">
                            {activity.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {activity.type === "tryout" ? (
                          <div className="bg-blue-500 text-white px-2 sm:px-3 py-1 border-2 border-slate-800 font-black text-xs sm:text-sm">
                            Skor: {activity.score}
                          </div>
                        ) : (
                          <div
                            className={`px-2 sm:px-3 py-1 border-2 border-slate-800 font-black text-xs sm:text-sm ${
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
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase mb-4 sm:mb-6">
                📅 Event Mendatang
              </h2>

              <div className="space-y-3 sm:space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="border-2 border-slate-800 p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 transition-all duration-200"
                  >
                    <h3 className="font-black text-sm sm:text-base text-slate-900 mb-2">
                      {event.title}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-slate-600 font-bold flex items-center">
                        📅 {event.date}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 font-bold flex items-center">
                        ⏰ {event.time}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 font-bold flex items-center">
                        👥 {event.participants.toLocaleString()} peserta
                      </p>
                    </div>
                    <button className="w-full mt-3 bg-purple-500 text-white px-3 py-2 font-black text-xs sm:text-sm border-2 border-slate-800 hover:bg-purple-600 transition-colors">
                      DAFTAR SEKARANG
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase mb-4 sm:mb-6">
                ⚡ Aksi Cepat
              </h2>

              <div className="space-y-3">
                <Link
                  href="/tryout/new"
                  className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3 font-black text-sm sm:text-base uppercase border-3 border-slate-800 transform hover:-rotate-1 hover:-translate-y-1 transition-all duration-200 shadow-brutal text-center"
                >
                  🎯 MULAI TRYOUT
                </Link>

                <Link
                  href="/lessons"
                  className="block w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-3 font-black text-sm sm:text-base uppercase border-3 border-slate-800 transform hover:rotate-1 hover:-translate-y-1 transition-all duration-200 shadow-brutal text-center"
                >
                  📚 BELAJAR MATERI
                </Link>

                <Link
                  href="/analysis"
                  className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 font-black text-sm sm:text-base uppercase border-3 border-slate-800 transform hover:-rotate-1 hover:-translate-y-1 transition-all duration-200 shadow-brutal text-center"
                >
                  📈 ANALISIS HASIL
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Study Progress */}
        <div className="mt-6 sm:mt-8">
          <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase mb-4 sm:mb-6">
              📈 Progress Belajar Bulan Ini
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-400 border-3 border-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center font-black text-xl sm:text-2xl">
                  🔥
                </div>
                <p className="font-black text-lg sm:text-xl text-slate-900">
                  85%
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-600">
                  Target Tryout
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-400 border-3 border-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center font-black text-xl sm:text-2xl">
                  📖
                </div>
                <p className="font-black text-lg sm:text-xl text-slate-900">
                  92%
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-600">
                  Materi Selesai
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
                  className="border-2 border-slate-800 p-3 sm:p-4 bg-gradient-to-br from-slate-50 to-slate-100 hover:from-orange-50 hover:to-orange-100 transition-all duration-200 transform hover:-translate-y-1"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                        <h3 className="font-black text-sm sm:text-base text-slate-900 leading-tight">
                          {tryout.title}
                        </h3>
                        <div
                          className={`px-2 py-1 border-2 border-slate-800 font-black text-xs self-start ${
                            tryout.type === "free"
                              ? "bg-emerald-400 text-slate-900"
                              : "bg-orange-400 text-slate-900"
                          }`}
                        >
                          {tryout.type === "free" ? "GRATIS" : "PREMIUM"}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-bold mb-2">
                        📚 {tryout.subject}
                      </p>
                      <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs font-bold text-slate-600 mb-3">
                        <div>⏱️ {tryout.duration}</div>
                        <div>📝 {tryout.questions} soal</div>
                        <div>
                          👥 {tryout.participants.toLocaleString()} peserta
                        </div>
                        <div>⭐ {tryout.rating}/5.0</div>
                      </div>
                    </div>
                    <div className="text-left sm:text-right sm:ml-3 mb-2 sm:mb-0">
                      <div className="font-black text-sm sm:text-base text-slate-900 mb-1">
                        {tryout.price === 0
                          ? "GRATIS"
                          : `Rp ${tryout.price.toLocaleString()}`}
                      </div>
                      <div
                        className={`text-xs font-bold px-2 py-1 border border-slate-800 inline-block ${
                          tryout.difficulty === "Sangat Sulit"
                            ? "bg-red-100 text-red-800"
                            : tryout.difficulty === "Sulit"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {tryout.difficulty}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <p className="text-xs font-bold text-slate-600 order-2 sm:order-1">
                      📅 Deadline: {tryout.deadline}
                    </p>
                    <button
                      className={`px-3 py-2 font-black text-xs border-2 border-slate-800 transition-colors order-1 sm:order-2 ${
                        tryout.type === "free"
                          ? "bg-emerald-500 text-white hover:bg-emerald-600"
                          : "bg-orange-500 text-white hover:bg-orange-600"
                      }`}
                    >
                      {tryout.type === "free" ? "MULAI GRATIS" : "BELI & MULAI"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tryout History & Upcoming */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Tryout History */}
          <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
                📊 Riwayat Tryout
              </h2>
              <Link
                href="/history"
                className="bg-blue-500 text-white px-3 sm:px-4 py-2 sm:py-2 font-black text-xs sm:text-sm border-2 sm:border-3 border-slate-800 hover:bg-blue-600 transition-colors text-center sm:text-left"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {userTryouts.map((tryout) => (
                <div
                  key={tryout.id}
                  className="border-2 border-slate-800 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-emerald-50 hover:from-blue-100 hover:to-emerald-100 transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-black text-sm text-slate-900 mb-1 leading-tight">
                        {tryout.title}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                        <span className="text-xs font-bold text-slate-600">
                          📅 {tryout.date} • ⏰ {tryout.time}
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
                    </div>
                    <div className="text-left sm:text-right mb-2 sm:mb-0">
                      <div
                        className={`px-2 py-1 border-2 border-slate-800 font-black text-sm inline-block ${
                          tryout.score >= 85
                            ? "bg-emerald-500 text-white"
                            : tryout.score >= 70
                            ? "bg-blue-500 text-white"
                            : "bg-orange-500 text-white"
                        }`}
                      >
                        {tryout.score}/{tryout.maxScore}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs font-bold text-slate-600 mb-2">
                    <div>📚 {tryout.subject}</div>
                    <div>⏱️ {tryout.duration}</div>
                    <div>🏆 Peringkat #{tryout.rank}</div>
                    <div>
                      👥 {tryout.totalParticipants.toLocaleString()} peserta
                    </div>
                  </div>

                  <button className="w-full bg-slate-900 text-white px-3 py-2 font-black text-xs border-2 border-slate-800 hover:bg-slate-800 transition-colors">
                    📈 LIHAT DETAIL HASIL
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Tryouts */}
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
