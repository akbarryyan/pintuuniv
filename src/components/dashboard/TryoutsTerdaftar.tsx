"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface TryoutTerdaftar {
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
  registration_id: number;
  registration_status: string;
  payment_status: string;
  registration_date: string;
  approved_at: string | null;
  // Mock data untuk UI
  subject: string;
  duration: string;
  difficulty: string;
  participants: number;
  rating: number;
  deadline: string;
}

interface TryoutsTerdaftarProps {
  userId: number | null;
}

export default function TryoutsTerdaftar({ userId }: TryoutsTerdaftarProps) {
  const [tryouts, setTryouts] = useState<TryoutTerdaftar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchUserRegistrations();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const fetchUserRegistrations = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/user/registrations?userId=${userId}`);
      const data = await response.json();

      if (data.success) {
        setTryouts(data.data);
      } else {
        setError(data.error || "Gagal memuat data tryout");
      }
    } catch (err) {
      console.error("Error fetching user registrations:", err);
      setError("Gagal memuat data tryout");
    } finally {
      // Add minimum delay to show skeleton (1 second)
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const getStatusBadge = (
    registrationStatus: string,
    paymentStatus: string,
    typeTryout: string
  ) => {
    if (typeTryout === "free") {
      return (
        <div className="px-2 py-1 border-2 border-slate-800 font-black text-xs bg-emerald-400 text-slate-900">
          ✅ TERDAFTAR
        </div>
      );
    }

    if (registrationStatus === "approved" && paymentStatus === "paid") {
      return (
        <div className="px-2 py-1 border-2 border-slate-800 font-black text-xs bg-emerald-400 text-slate-900">
          ✅ DISETUJUI
        </div>
      );
    }

    if (registrationStatus === "registered" && paymentStatus === "pending") {
      return (
        <div className="px-2 py-1 border-2 border-slate-800 font-black text-xs bg-yellow-400 text-slate-900">
          ⏳ MENUNGGU
        </div>
      );
    }

    if (registrationStatus === "rejected") {
      return (
        <div className="px-2 py-1 border-2 border-slate-800 font-black text-xs bg-red-400 text-slate-900">
          ❌ DITOLAK
        </div>
      );
    }

    return (
      <div className="px-2 py-1 border-2 border-slate-800 font-black text-xs bg-gray-400 text-slate-900">
        ❓ TIDAK DIKETAHUI
      </div>
    );
  };

  const canStartTryout = (
    registrationStatus: string,
    paymentStatus: string,
    typeTryout: string
  ) => {
    if (typeTryout === "free") {
      return (
        registrationStatus === "registered" || registrationStatus === "approved"
      );
    }
    return registrationStatus === "approved" && paymentStatus === "paid";
  };

  if (loading) {
    return (
      <div className="mt-6 sm:mt-8">
        <div className="bg-white border-2 border-black p-4 sm:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
            <div className="h-8 bg-gray-300 border border-black rounded w-48 animate-pulse"></div>
            <div className="h-8 bg-gray-300 border border-black rounded w-24 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-100 border-2 border-black p-3 sm:p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] animate-pulse"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="h-6 bg-gray-300 border border-black rounded w-20"></div>
                  <div className="text-right">
                    <div className="h-4 bg-gray-300 border border-black rounded w-12 mb-1"></div>
                    <div className="h-3 bg-gray-300 border border-black rounded w-16"></div>
                  </div>
                </div>

                <div className="h-6 bg-gray-300 border border-black rounded w-3/4 mb-2"></div>

                <div className="space-y-2 mb-3">
                  <div className="h-4 bg-gray-300 border border-black rounded w-1/2"></div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="h-4 bg-gray-300 border border-black rounded w-full"></div>
                    <div className="h-4 bg-gray-300 border border-black rounded w-full"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-300 border border-black rounded w-24"></div>
                    <div className="h-6 bg-gray-300 border border-black rounded w-16"></div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="h-5 bg-gray-300 border border-black rounded w-16"></div>
                  <div className="h-8 bg-gray-300 border border-black rounded w-20"></div>
                </div>
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
              onClick={fetchUserRegistrations}
              className="mt-4 bg-orange-500 text-white px-4 py-2 font-black text-sm border-2 border-black hover:bg-orange-600 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
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
              Belum Ada Tryout Terdaftar
            </p>
            <p className="text-slate-600 text-sm mb-4">
              Daftarkan diri Anda untuk tryout yang tersedia
            </p>
            <Link
              href="/tryouts"
              className="bg-orange-500 text-white px-4 py-2 font-black text-sm border-2 border-black hover:bg-orange-600 transition-colors inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Lihat Tryout Tersedia
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
            📝 Tryout Terdaftar
          </h2>
          <Link
            href="/tryouts"
            className="bg-orange-500 text-white px-3 sm:px-4 py-2 sm:py-2 font-black text-xs sm:text-sm border-2 border-black hover:bg-orange-600 transition-colors text-center sm:text-left shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            Lihat Semua
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
          {tryouts.slice(0, 4).map((tryout) => (
            <div
              key={tryout.registration_id}
              className="border-2 border-slate-800 p-3 sm:p-4 bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 transition-all duration-200 group"
            >
              <div className="flex justify-between items-start mb-3">
                {getStatusBadge(
                  tryout.registration_status,
                  tryout.payment_status,
                  tryout.type_tryout
                )}
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
                  <div>📝 {tryout.total_questions} soal</div>
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
                      Rp {Math.round(tryout.price).toLocaleString("id-ID")}
                    </p>
                  ) : (
                    <p className="font-black text-sm text-emerald-600">
                      GRATIS
                    </p>
                  )}
                </div>
                <button
                  className={`px-3 py-2 font-black text-xs border-2 border-slate-800 transition-colors ${
                    canStartTryout(
                      tryout.registration_status,
                      tryout.payment_status,
                      tryout.type_tryout
                    )
                      ? "bg-emerald-500 text-white hover:bg-emerald-600"
                      : "bg-gray-400 text-slate-900 cursor-not-allowed"
                  }`}
                  disabled={
                    !canStartTryout(
                      tryout.registration_status,
                      tryout.payment_status,
                      tryout.type_tryout
                    )
                  }
                >
                  {canStartTryout(
                    tryout.registration_status,
                    tryout.payment_status,
                    tryout.type_tryout
                  )
                    ? "🚀 MULAI"
                    : "⏳ TUNGGU"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
