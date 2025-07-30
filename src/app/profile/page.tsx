"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    name: "Ahmad Bayu Pratama",
    email: "ahmad.bayu@email.com",
    phone: "08123456789",
    school: "SMA Negeri 1 Jakarta",
    grade: "12",
    avatar: "👨‍🎓",
    joinDate: "15 Januari 2025",
    subscription: "Premium",
    subscriptionExpiry: "15 Agustus 2025",
    targetUniversity: "Universitas Indonesia",
    targetMajor: "Fakultas Kedokteran",
    utbkTarget: 650,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const [achievements] = useState([
    {
      id: 1,
      title: "Top Performer",
      description: "Skor tertinggi bulan ini",
      icon: "🏆",
      date: "Juli 2025",
      color: "bg-yellow-400",
    },
    {
      id: 2,
      title: "Consistency Master",
      description: "Belajar 30 hari berturut-turut",
      icon: "🔥",
      date: "Juli 2025",
      color: "bg-orange-400",
    },
    {
      id: 3,
      title: "Math Expert",
      description: "Nilai rata-rata Matematika 90+",
      icon: "🧮",
      date: "Juni 2025",
      color: "bg-blue-400",
    },
    {
      id: 4,
      title: "Speed Demon",
      description: "Menyelesaikan tryout tercepat",
      icon: "⚡",
      date: "Juni 2025",
      color: "bg-emerald-400",
    },
  ]);

  const [subscriptionHistory] = useState([
    {
      id: 1,
      plan: "Premium",
      duration: "3 Bulan",
      price: 297000,
      startDate: "15 Mei 2025",
      endDate: "15 Agustus 2025",
      status: "active",
    },
    {
      id: 2,
      plan: "Pro",
      duration: "1 Bulan",
      price: 99000,
      startDate: "15 April 2025",
      endDate: "15 Mei 2025",
      status: "expired",
    },
    {
      id: 3,
      plan: "Basic",
      duration: "1 Bulan",
      price: 49000,
      startDate: "15 Maret 2025",
      endDate: "15 April 2025",
      status: "expired",
    },
  ]);

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReport: true,
    studyReminder: true,
    examReminder: true,
    marketingEmails: false,
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      console.log("Profile updated:", userData);
    }, 2000);
  };

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50">
      {/* Header Navigation */}
      <div className="bg-slate-900 border-b-3 sm:border-b-4 border-orange-400 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <Link href="/dashboard" className="flex items-center">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-400 border-2 sm:border-3 border-slate-800 rotate-12 flex items-center justify-center mr-2 sm:mr-3 font-black text-sm sm:text-lg shadow-md">
                📚
              </div>
              <span className="text-lg sm:text-2xl font-black text-white uppercase tracking-wider">
                PintuUniv
              </span>
            </Link>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                href="/dashboard"
                className="text-white font-bold text-sm hover:text-orange-300"
              >
                ← Kembali ke Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 sm:p-6 md:p-8 border-3 sm:border-4 border-slate-800 shadow-brutal transform hover:rotate-1 transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border-3 border-slate-800 rounded-full flex items-center justify-center text-2xl sm:text-3xl mr-4 sm:mr-6 shadow-lg">
                  {userData.avatar}
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-black mb-1 sm:mb-2 uppercase">
                    {userData.name}
                  </h1>
                  <p className="text-sm sm:text-base font-bold opacity-90">
                    {userData.school} - Kelas {userData.grade}
                  </p>
                  <p className="text-xs sm:text-sm font-medium opacity-80">
                    Bergabung sejak {userData.joinDate}
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div
                  className={`px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 shadow-brutal transform -rotate-3 ${
                    userData.subscription === "Premium"
                      ? "bg-yellow-400"
                      : userData.subscription === "Pro"
                      ? "bg-orange-400"
                      : "bg-blue-400"
                  } text-slate-900`}
                >
                  <p className="font-black text-xs sm:text-sm uppercase">
                    Status
                  </p>
                  <p className="text-lg sm:text-xl font-black">
                    {userData.subscription}
                  </p>
                  <p className="text-xs font-bold">
                    Sampai {userData.subscriptionExpiry}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white border-3 sm:border-4 border-slate-800 p-2 sm:p-3 shadow-brutal">
            <div className="flex overflow-x-auto space-x-1 sm:space-x-2">
              {[
                { id: "profile", label: "📋 Profile", icon: "👤" },
                { id: "achievements", label: "🏆 Pencapaian", icon: "🎖️" },
                { id: "subscription", label: "💳 Langganan", icon: "💎" },
                { id: "settings", label: "⚙️ Pengaturan", icon: "🔧" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 sm:px-4 py-2 sm:py-3 font-black text-xs sm:text-sm uppercase border-2 sm:border-3 border-slate-800 transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-orange-500 text-white transform -rotate-1 -translate-y-1"
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Personal Information */}
            <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
                  👤 Informasi Personal
                </h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 text-white px-3 sm:px-4 py-1 sm:py-2 font-black text-xs sm:text-sm border-2 sm:border-3 border-slate-800 hover:bg-blue-600 transition-colors"
                  >
                    ✏️ Edit
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-500 text-white px-3 py-1 sm:py-2 font-black text-xs sm:text-sm border-2 border-slate-800 hover:bg-gray-600 transition-colors"
                    >
                      ❌ Batal
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-emerald-500 text-white px-3 py-1 sm:py-2 font-black text-xs sm:text-sm border-2 border-slate-800 hover:bg-emerald-600 transition-colors disabled:opacity-50"
                    >
                      {isSaving ? "💾 Menyimpan..." : "💾 Simpan"}
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-slate-900 font-black text-xs sm:text-sm mb-2 uppercase">
                    📝 Nama Lengkap
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.name}
                      onChange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 bg-blue-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-blue-100 focus:border-blue-500 transition-colors text-sm sm:text-base"
                    />
                  ) : (
                    <div className="bg-slate-100 border-2 border-slate-800 p-3 sm:p-4 font-bold text-slate-900 text-sm sm:text-base">
                      {userData.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-slate-900 font-black text-xs sm:text-sm mb-2 uppercase">
                    📧 Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 bg-blue-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-blue-100 focus:border-blue-500 transition-colors text-sm sm:text-base"
                    />
                  ) : (
                    <div className="bg-slate-100 border-2 border-slate-800 p-3 sm:p-4 font-bold text-slate-900 text-sm sm:text-base">
                      {userData.email}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-slate-900 font-black text-xs sm:text-sm mb-2 uppercase">
                    📱 No. HP
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={userData.phone}
                      onChange={(e) =>
                        setUserData({ ...userData, phone: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 bg-blue-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-blue-100 focus:border-blue-500 transition-colors text-sm sm:text-base"
                    />
                  ) : (
                    <div className="bg-slate-100 border-2 border-slate-800 p-3 sm:p-4 font-bold text-slate-900 text-sm sm:text-base">
                      {userData.phone}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-slate-900 font-black text-xs sm:text-sm mb-2 uppercase">
                      🏫 Sekolah
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.school}
                        onChange={(e) =>
                          setUserData({ ...userData, school: e.target.value })
                        }
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 bg-blue-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-blue-100 focus:border-blue-500 transition-colors text-sm sm:text-base"
                      />
                    ) : (
                      <div className="bg-slate-100 border-2 border-slate-800 p-3 sm:p-4 font-bold text-slate-900 text-sm sm:text-base">
                        {userData.school}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-slate-900 font-black text-xs sm:text-sm mb-2 uppercase">
                      📚 Kelas
                    </label>
                    {isEditing ? (
                      <select
                        value={userData.grade}
                        onChange={(e) =>
                          setUserData({ ...userData, grade: e.target.value })
                        }
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 bg-blue-50 text-slate-900 font-bold focus:outline-none focus:bg-blue-100 focus:border-blue-500 transition-colors text-sm sm:text-base"
                      >
                        <option value="10">Kelas 10</option>
                        <option value="11">Kelas 11</option>
                        <option value="12">Kelas 12</option>
                        <option value="Gap Year">Gap Year</option>
                      </select>
                    ) : (
                      <div className="bg-slate-100 border-2 border-slate-800 p-3 sm:p-4 font-bold text-slate-900 text-sm sm:text-base">
                        Kelas {userData.grade}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Goals */}
            <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase mb-4 sm:mb-6">
                🎯 Target Akademik
              </h2>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-slate-900 font-black text-xs sm:text-sm mb-2 uppercase">
                    🏛️ Universitas Target
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.targetUniversity}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          targetUniversity: e.target.value,
                        })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 bg-emerald-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-emerald-100 focus:border-emerald-500 transition-colors text-sm sm:text-base"
                    />
                  ) : (
                    <div className="bg-emerald-100 border-2 border-emerald-400 p-3 sm:p-4 font-bold text-slate-900 text-sm sm:text-base">
                      {userData.targetUniversity}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-slate-900 font-black text-xs sm:text-sm mb-2 uppercase">
                    🎓 Jurusan Target
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.targetMajor}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          targetMajor: e.target.value,
                        })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 bg-emerald-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-emerald-100 focus:border-emerald-500 transition-colors text-sm sm:text-base"
                    />
                  ) : (
                    <div className="bg-emerald-100 border-2 border-emerald-400 p-3 sm:p-4 font-bold text-slate-900 text-sm sm:text-base">
                      {userData.targetMajor}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-slate-900 font-black text-xs sm:text-sm mb-2 uppercase">
                    📊 Target Skor UTBK
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={userData.utbkTarget}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          utbkTarget: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 bg-emerald-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-emerald-100 focus:border-emerald-500 transition-colors text-sm sm:text-base"
                    />
                  ) : (
                    <div className="bg-emerald-100 border-2 border-emerald-400 p-3 sm:p-4 font-bold text-slate-900 text-sm sm:text-base">
                      {userData.utbkTarget} poin
                    </div>
                  )}
                </div>

                {/* Progress Indicator */}
                <div className="bg-blue-100 border-2 border-blue-400 p-3 sm:p-4">
                  <h3 className="font-black text-slate-900 text-sm mb-2 uppercase">
                    📈 Progress Target
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span>Skor Saat Ini: 520</span>
                      <span>Target: {userData.utbkTarget}</span>
                    </div>
                    <div className="w-full bg-gray-200 border-2 border-slate-800 h-4">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-emerald-400 border-r-2 border-slate-800 transition-all duration-500"
                        style={{
                          width: `${(520 / userData.utbkTarget) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-xs font-bold text-slate-600">
                      {Math.round((520 / userData.utbkTarget) * 100)}% dari
                      target tercapai
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase mb-4 sm:mb-6">
              🏆 Pencapaian & Badge
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`${achievement.color} border-3 border-slate-800 p-4 sm:p-6 text-center shadow-brutal transform hover:-rotate-2 hover:-translate-y-2 transition-all duration-200`}
                >
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">
                    {achievement.icon}
                  </div>
                  <h3 className="font-black text-slate-900 text-sm sm:text-base mb-2 uppercase">
                    {achievement.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 mb-2">
                    {achievement.description}
                  </p>
                  <div className="bg-slate-900 text-white px-2 py-1 border-2 border-slate-800 inline-block">
                    <span className="text-xs font-black">
                      {achievement.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Achievement Progress */}
            <div className="mt-6 sm:mt-8 bg-slate-100 border-2 border-slate-800 p-4 sm:p-6">
              <h3 className="font-black text-slate-900 text-lg sm:text-xl mb-4 uppercase">
                📊 Progress Pencapaian
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span>Badge Terkumpul</span>
                    <span>4/10</span>
                  </div>
                  <div className="w-full bg-gray-200 border-2 border-slate-800 h-4">
                    <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 w-2/5 border-r-2 border-slate-800"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span>Level Progress</span>
                    <span>Level 3</span>
                  </div>
                  <div className="w-full bg-gray-200 border-2 border-slate-800 h-4">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 w-3/5 border-r-2 border-slate-800"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "subscription" && (
          <div className="space-y-6 sm:space-y-8">
            {/* Current Subscription */}
            <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase mb-4 sm:mb-6">
                💎 Langganan Aktif
              </h2>

              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 border-3 border-slate-800 p-4 sm:p-6 shadow-brutal">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 uppercase">
                      {userData.subscription} PLAN
                    </h3>
                    <p className="text-sm sm:text-base font-bold text-slate-800 mb-2">
                      Berlaku sampai: {userData.subscriptionExpiry}
                    </p>
                    <div className="flex items-center space-x-4 text-xs sm:text-sm font-bold text-slate-800">
                      <span>✅ Unlimited Tryout</span>
                      <span>✅ AI Analysis</span>
                      <span>✅ Mentor 24/7</span>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <button className="bg-slate-900 text-white px-4 py-3 font-black text-sm border-3 border-slate-800 hover:bg-slate-800 transition-colors">
                      📱 KELOLA LANGGANAN
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription History */}
            <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase mb-4 sm:mb-6">
                📋 Riwayat Langganan
              </h2>

              <div className="space-y-3 sm:space-y-4">
                {subscriptionHistory.map((sub) => (
                  <div
                    key={sub.id}
                    className="border-2 border-slate-800 p-3 sm:p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-black text-sm sm:text-base text-slate-900">
                            {sub.plan} Plan - {sub.duration}
                          </h3>
                          <div
                            className={`px-2 py-1 border-2 border-slate-800 font-black text-xs ${
                              sub.status === "active"
                                ? "bg-emerald-400 text-slate-900"
                                : "bg-gray-400 text-slate-900"
                            }`}
                          >
                            {sub.status === "active" ? "AKTIF" : "EXPIRED"}
                          </div>
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-slate-600">
                          📅 {sub.startDate} - {sub.endDate}
                        </div>
                      </div>
                      <div className="text-right mt-2 sm:mt-0">
                        <div className="font-black text-sm sm:text-base text-slate-900">
                          Rp {sub.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upgrade Options */}
            <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase mb-4 sm:mb-6">
                🚀 Upgrade Langganan
              </h2>

              <div className="text-center">
                <p className="text-sm sm:text-base font-bold text-slate-600 mb-4">
                  Sudah menggunakan Premium Plan? Tetap bisa perpanjang dengan
                  diskon khusus!
                </p>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 font-black text-sm sm:text-base uppercase border-3 border-slate-800 transform hover:-rotate-1 hover:-translate-y-2 transition-all duration-200 shadow-brutal">
                  🎯 PERPANJANG SEKARANG
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6 sm:space-y-8">
            {/* Notification Settings */}
            <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase mb-4 sm:mb-6">
                🔔 Pengaturan Notifikasi
              </h2>

              <div className="space-y-4">
                {(
                  Object.entries(preferences) as Array<
                    [keyof typeof preferences, boolean]
                  >
                ).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 border-2 border-slate-800 bg-slate-50"
                  >
                    <div>
                      <h3 className="font-black text-sm text-slate-900 mb-1">
                        {key === "emailNotifications" &&
                          "📧 Email Notifications"}
                        {key === "pushNotifications" && "📱 Push Notifications"}
                        {key === "weeklyReport" && "📊 Weekly Report"}
                        {key === "studyReminder" && "📚 Study Reminder"}
                        {key === "examReminder" && "🎯 Exam Reminder"}
                        {key === "marketingEmails" && "📢 Marketing Emails"}
                      </h3>
                      <p className="text-xs text-slate-600 font-bold">
                        {key === "emailNotifications" &&
                          "Notifikasi melalui email"}
                        {key === "pushNotifications" &&
                          "Notifikasi push di device"}
                        {key === "weeklyReport" && "Laporan mingguan progress"}
                        {key === "studyReminder" && "Pengingat waktu belajar"}
                        {key === "examReminder" && "Pengingat jadwal ujian"}
                        {key === "marketingEmails" &&
                          "Email promosi dan penawaran"}
                      </p>
                    </div>
                    <button
                      onClick={() => handlePreferenceChange(key)}
                      className={`w-12 h-6 border-2 border-slate-800 relative ${
                        value ? "bg-emerald-500" : "bg-gray-300"
                      } transition-colors`}
                    >
                      <div
                        className={`w-4 h-4 bg-white border border-slate-800 absolute top-0.5 transition-transform ${
                          value ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      ></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase mb-4 sm:mb-6">
                🔐 Keamanan Akun
              </h2>

              <div className="space-y-4">
                <button className="w-full bg-blue-500 text-white px-4 py-3 font-black text-sm border-3 border-slate-800 hover:bg-blue-600 transition-colors text-left">
                  🔑 UBAH PASSWORD
                </button>

                <button className="w-full bg-emerald-500 text-white px-4 py-3 font-black text-sm border-3 border-slate-800 hover:bg-emerald-600 transition-colors text-left">
                  📱 AKTIFKAN 2FA
                </button>

                <button className="w-full bg-orange-500 text-white px-4 py-3 font-black text-sm border-3 border-slate-800 hover:bg-orange-600 transition-colors text-left">
                  📋 DOWNLOAD DATA SAYA
                </button>

                <button className="w-full bg-red-500 text-white px-4 py-3 font-black text-sm border-3 border-slate-800 hover:bg-red-600 transition-colors text-left">
                  🗑️ HAPUS AKUN
                </button>
              </div>
            </div>

            {/* Logout */}
            <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase mb-4 sm:mb-6">
                🚪 Logout
              </h2>

              <div className="text-center">
                <p className="text-sm font-bold text-slate-600 mb-4">
                  Keluar dari akun PintuUniv
                </p>
                <Link
                  href="/"
                  className="bg-slate-900 text-white px-6 py-3 font-black text-sm uppercase border-3 border-slate-800 hover:bg-slate-800 transition-colors inline-block"
                >
                  🔓 LOGOUT SEKARANG
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
