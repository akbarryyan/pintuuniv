"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface TryoutTersedia {
  id: number;
  title: string;
  description: string;
  total_categories: number;
  total_questions: number;
  total_weight: number;
  passing_score: number;
  type_tryout: string;
  price: number;
  start_date: string;
  end_date: string;
  created_at: string;
  isRegistered?: boolean;
  registrationStatus?: string;
  // Mock data untuk UI
  subject: string;
  duration: string;
  difficulty: string;
  participants: number;
  rating: number;
}

interface UpcomingTryoutsProps {
  userId: number | null;
}

export default function UpcomingTryouts({ userId }: UpcomingTryoutsProps) {
  const [tryouts, setTryouts] = useState<TryoutTersedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAvailableTryouts();
  }, []);

  const fetchAvailableTryouts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/tryouts");
      const data = await response.json();

      if (data.success) {
        const tryoutsData = data.tryouts || [];

        // Check registration status for each tryout if user is logged in
        if (userId) {
          const tryoutsWithStatus = await Promise.all(
            tryoutsData.map(async (tryout: any) => {
              try {
                const regResponse = await fetch(
                  `/api/tryouts/register?tryoutId=${tryout.id}&userId=${userId}`
                );
                const regData = await regResponse.json();

                return {
                  ...tryout,
                  isRegistered: regData.isRegistered || false,
                  registrationStatus: regData.registration?.status || null,
                  // Mock data untuk UI
                  subject: "UTBK/SNBT",
                  duration: "120 menit",
                  difficulty: "Sedang",
                  participants: Math.floor(Math.random() * 1000) + 100,
                  rating: 4.5,
                };
              } catch (err) {
                console.error("Error checking registration status:", err);
                return {
                  ...tryout,
                  isRegistered: false,
                  registrationStatus: null,
                  subject: "UTBK/SNBT",
                  duration: "120 menit",
                  difficulty: "Sedang",
                  participants: Math.floor(Math.random() * 1000) + 100,
                  rating: 4.5,
                };
              }
            })
          );

          // Filter hanya tryout yang belum didaftar
          const unregisteredTryouts = tryoutsWithStatus.filter(
            (tryout) => !tryout.isRegistered
          );
          setTryouts(unregisteredTryouts);
        } else {
          // If no user, show all tryouts (no registration data available)
          const tryoutsWithMockData = tryoutsData.map((tryout: any) => ({
            ...tryout,
            isRegistered: false,
            registrationStatus: null,
            subject: "UTBK/SNBT",
            duration: "120 menit",
            difficulty: "Sedang",
            participants: Math.floor(Math.random() * 1000) + 100,
            rating: 4.5,
          }));
          setTryouts(tryoutsWithMockData);
        }
      } else {
        setError(data.error || "Gagal memuat data tryout");
      }
    } catch (err) {
      console.error("Error fetching tryouts:", err);
      setError("Gagal memuat data tryout");
    } finally {
      // Add minimum delay to show skeleton (1 second)
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Tidak ada batas waktu";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return "00:00";
    const date = new Date(dateString);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getReminderText = (endDate: string) => {
    if (!endDate) return "Tidak ada batas waktu";

    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Sudah berakhir";
    if (diffDays === 0) return "Berakhir hari ini";
    if (diffDays === 1) return "Berakhir besok";
    if (diffDays <= 7) return `Berakhir dalam ${diffDays} hari`;
    return `Berakhir dalam ${diffDays} hari`;
  };

  const getStatusBadge = (
    isRegistered: boolean,
    registrationStatus: string | null,
    typeTryout: string
  ) => {
    if (isRegistered) {
      if (typeTryout === "free") {
        return (
          <div className="px-2 py-1 border-2 border-slate-800 font-black text-xs bg-emerald-400 text-slate-900">
            ✅ TERDAFTAR
          </div>
        );
      } else if (registrationStatus === "approved") {
        return (
          <div className="px-2 py-1 border-2 border-slate-800 font-black text-xs bg-emerald-400 text-slate-900">
            ✅ DISETUJUI
          </div>
        );
      } else {
        return (
          <div className="px-2 py-1 border-2 border-slate-800 font-black text-xs bg-yellow-400 text-slate-900">
            ⏳ MENUNGGU
          </div>
        );
      }
    }

    return (
      <div className="px-2 py-1 border-2 border-slate-800 font-black text-xs bg-blue-400 text-slate-900">
        📝 TERSEDIA
      </div>
    );
  };

  const getButtonText = (
    isRegistered: boolean,
    registrationStatus: string | null,
    typeTryout: string
  ) => {
    if (isRegistered) {
      if (typeTryout === "free") {
        return "🚀 MULAI TRYOUT";
      } else if (registrationStatus === "approved") {
        return "🚀 MULAI TRYOUT";
      } else {
        return "⏳ MENUNGGU PERSETUJUAN";
      }
    }

    return "📝 DAFTAR SEKARANG";
  };

  const getButtonClass = (
    isRegistered: boolean,
    registrationStatus: string | null,
    typeTryout: string
  ) => {
    if (isRegistered) {
      if (typeTryout === "free" || registrationStatus === "approved") {
        return "bg-emerald-500 text-white hover:bg-emerald-600";
      } else {
        return "bg-yellow-500 text-white hover:bg-yellow-600 cursor-not-allowed";
      }
    }

    return "bg-purple-500 text-white hover:bg-purple-600";
  };

  if (loading) {
    return (
      <div className="mt-6 sm:mt-8">
        <div className="bg-white border-2 border-black p-4 sm:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
            <div className="h-8 bg-gray-300 border border-black rounded w-40 animate-pulse"></div>
            <div className="h-8 bg-gray-300 border border-black rounded w-24 animate-pulse"></div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-100 border-2 border-black p-3 sm:p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] animate-pulse"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                  <div className="flex-1">
                    <div className="h-5 bg-gray-300 border border-black rounded w-3/4 mb-1"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                      <div className="h-4 bg-gray-300 border border-black rounded w-32"></div>
                      <div className="h-6 bg-gray-300 border border-black rounded w-16"></div>
                    </div>
                    <div className="h-4 bg-gray-300 border border-black rounded w-40 mb-2"></div>
                  </div>
                  <div className="text-left sm:text-right mb-2 sm:mb-0">
                    <div className="h-6 bg-gray-300 border border-black rounded w-20 mb-1"></div>
                    <div className="h-3 bg-gray-300 border border-black rounded w-24"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1 sm:gap-2 mb-3">
                  <div className="h-4 bg-gray-300 border border-black rounded w-full"></div>
                  <div className="h-4 bg-gray-300 border border-black rounded w-full"></div>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <div className="h-5 bg-gray-300 border border-black rounded w-16"></div>
                  <div className="text-right">
                    <div className="h-4 bg-gray-300 border border-black rounded w-12 mb-1"></div>
                    <div className="h-3 bg-gray-300 border border-black rounded w-16"></div>
                  </div>
                </div>

                <div className="h-8 bg-gray-300 border border-black rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 sm:mt-8">
        <div className="bg-white border-2 border-black p-4 sm:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center py-8">
            <div className="text-red-500 text-4xl mb-3">⚠️</div>
            <p className="font-black text-slate-900 mb-2">Gagal Memuat Data</p>
            <p className="text-slate-600 text-sm">{error}</p>
            <button
              onClick={fetchAvailableTryouts}
              className="mt-4 bg-purple-500 text-white px-4 py-2 font-black text-sm border-2 border-black hover:bg-purple-600 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (tryouts.length === 0) {
    return (
      <div className="mt-6 sm:mt-8">
        <div className="bg-white border-2 border-black p-4 sm:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center py-8">
            <div className="text-slate-400 text-4xl mb-3">📝</div>
            <p className="font-black text-slate-900 mb-2">
              Semua Tryout Sudah Terdaftar
            </p>
            <p className="text-slate-600 text-sm mb-4">
              Anda sudah mendaftar di semua tryout yang tersedia. Coba lagi
              nanti atau hubungi admin untuk tryout baru.
            </p>
            <Link
              href="/tryouts"
              className="bg-purple-500 text-white px-4 py-2 font-black text-sm border-2 border-black hover:bg-purple-600 transition-colors inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Lihat Semua Tryout
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 sm:mt-8">
      <div className="bg-white border-2 border-black p-4 sm:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
            🗓️ Tryout Tersedia
          </h2>
          <Link
            href="/tryouts"
            className="bg-purple-500 text-white px-3 sm:px-4 py-2 sm:py-2 font-black text-xs sm:text-sm border-2 border-black hover:bg-purple-600 transition-colors text-center sm:text-left shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            Lihat Semua
          </Link>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {tryouts.slice(0, 3).map((tryout) => (
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
                      📅 {formatDate(tryout.end_date)}
                    </span>
                    <div
                      className={`px-2 py-1 border border-slate-800 font-black text-xs self-start ${
                        tryout.type_tryout === "free"
                          ? "bg-emerald-400 text-slate-900"
                          : "bg-orange-400 text-slate-900"
                      }`}
                    >
                      {tryout.type_tryout === "free" ? "GRATIS" : "PREMIUM"}
                    </div>
                  </div>
                  <p className="text-xs font-bold text-slate-600 mb-2">
                    ⏰ {formatTime(tryout.start_date)} • ⏱️ {tryout.duration}
                  </p>
                </div>
                <div className="text-left sm:text-right mb-2 sm:mb-0">
                  {getStatusBadge(
                    tryout.isRegistered || false,
                    tryout.registrationStatus || null,
                    tryout.type_tryout
                  )}
                  <p className="text-xs font-bold text-purple-600 mt-1">
                    {getReminderText(tryout.end_date)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs font-bold text-slate-600 mb-3">
                <div>📚 {tryout.subject}</div>
                <div>📝 {tryout.total_questions} soal</div>
              </div>

              <div className="flex justify-between items-center mb-3">
                <div className="text-left">
                  {tryout.price > 0 ? (
                    <p className="font-black text-sm text-orange-600">
                      Rp {Math.round(tryout.price).toLocaleString("id-ID")}
                    </p>
                  ) : (
                    <p className="font-black text-sm text-emerald-600">
                      GRATIS
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
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

              <button
                className={`w-full px-3 py-2 font-black text-xs border-2 border-slate-800 transition-colors ${getButtonClass(
                  tryout.isRegistered || false,
                  tryout.registrationStatus || null,
                  tryout.type_tryout
                )}`}
                disabled={
                  tryout.isRegistered &&
                  tryout.type_tryout !== "free" &&
                  tryout.registrationStatus !== "approved"
                }
              >
                {getButtonText(
                  tryout.isRegistered || false,
                  tryout.registrationStatus || null,
                  tryout.type_tryout
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
