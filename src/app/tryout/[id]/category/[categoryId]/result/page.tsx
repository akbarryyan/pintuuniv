"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Award,
  TrendingUp,
  RotateCcw,
} from "lucide-react";
import HeaderNavigation from "@/components/HeaderNavigation";
import MobileFriendlyHeader from "@/components/MobileFriendlyHeader";
import BottomNavigation from "@/components/BottomNavigation";

interface CategoryResult {
  id: number;
  name: string;
  total_questions: number;
  answered_questions: number;
  correct_answers: number;
  wrong_answers: number;
  unanswered: number;
  score: number;
  percentage: number;
  time_taken: number;
  duration_minutes: number;
}

export default function CategoryResultPage() {
  const params = useParams();
  const router = useRouter();
  const tryoutId = params.id as string;
  const categoryId = params.categoryId as string;

  const [resultData, setResultData] = useState<CategoryResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    name: "User",
    avatar: "👨‍🎓",
    id: null as number | null,
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
            id: parsedData.id || null,
          });
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }, []);

  // Load result data
  useEffect(() => {
    const fetchResultData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Mock data untuk UI - nanti diganti dengan API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const mockData: CategoryResult = {
          id: parseInt(categoryId),
          name: "Tes Potensi Skolastik (TPS)",
          total_questions: 40,
          answered_questions: 37,
          correct_answers: 28,
          wrong_answers: 9,
          unanswered: 3,
          score: 70,
          percentage: 70,
          time_taken: 52 * 60, // 52 minutes in seconds
          duration_minutes: 60,
        };

        setResultData(mockData);
      } catch (error) {
        console.error("Error fetching result data:", error);
        setError("Gagal memuat hasil kategori");
        toast.error("Gagal memuat hasil kategori");
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    if (tryoutId && categoryId) {
      fetchResultData();
    }
  }, [tryoutId, categoryId]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-100 border-green-300";
    if (percentage >= 60) return "bg-yellow-100 border-yellow-300";
    return "bg-red-100 border-red-300";
  };

  const handleBackToTryout = () => {
    router.push(`/tryout/${tryoutId}`);
  };

  const handleRetakeCategory = () => {
    if (
      confirm(
        "Yakin ingin mengulang kategori ini? Hasil sebelumnya akan terhapus!"
      )
    ) {
      router.push(`/tryout/${tryoutId}/category/${categoryId}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 pb-20 md:pb-0">
        {/* Headers */}
        <div className="hidden md:block">
          <HeaderNavigation currentPage="tryouts" userInfo={userData} />
        </div>
        <div className="block md:hidden">
          <MobileFriendlyHeader userInfo={userData} showMobileMenu={false} />
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Loading Animation */}
          <div className="text-center mb-8">
            <div className="bg-white border-2 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-pulse">
              <div className="w-16 h-16 bg-gray-300 border-2 border-black rounded-full mx-auto mb-4"></div>
              <div className="h-6 bg-gray-300 border border-black rounded w-1/2 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-300 border border-black rounded w-1/3 mx-auto"></div>
            </div>
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-100 border-2 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] animate-pulse"
              >
                <div className="h-8 bg-gray-300 border border-black rounded mb-2"></div>
                <div className="h-4 bg-gray-300 border border-black rounded"></div>
              </div>
            ))}
          </div>

          {/* Detail Skeleton */}
          <div className="bg-gray-100 border-2 border-black p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] animate-pulse">
            <div className="h-6 bg-gray-300 border border-black rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-300 border border-black rounded"
                ></div>
              ))}
            </div>
          </div>
        </div>

        <BottomNavigation currentPage="tryouts" />
      </div>
    );
  }

  if (error || !resultData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 pb-20 md:pb-0">
        {/* Headers */}
        <div className="hidden md:block">
          <HeaderNavigation currentPage="tryouts" userInfo={userData} />
        </div>
        <div className="block md:hidden">
          <MobileFriendlyHeader userInfo={userData} showMobileMenu={false} />
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center">
            <div className="text-red-500 text-4xl mb-3">⚠️</div>
            <p className="font-black text-slate-900 mb-2">Gagal Memuat Hasil</p>
            <p className="text-slate-600 text-sm mb-4">
              {error || "Hasil tidak ditemukan"}
            </p>
            <button
              onClick={handleBackToTryout}
              className="bg-blue-500 text-white px-4 py-2 font-black text-sm border-2 border-black hover:bg-blue-600 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Kembali
            </button>
          </div>
        </div>

        <BottomNavigation currentPage="tryouts" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 pb-20 md:pb-0">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <HeaderNavigation currentPage="tryouts" userInfo={userData} />
      </div>

      {/* Mobile Header */}
      <div className="block md:hidden">
        <MobileFriendlyHeader userInfo={userData} showMobileMenu={false} />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={handleBackToTryout}
          className="flex items-center gap-2 mb-6 text-slate-600 hover:text-slate-900 font-bold transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Kembali ke Tryout
        </button>

        {/* Result Header */}
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-black mb-4 ${getScoreBgColor(
              resultData.percentage
            )}`}
          >
            <Award
              className={`h-10 w-10 ${getScoreColor(resultData.percentage)}`}
            />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase">
            Hasil Kategori
          </h1>
          <p className="text-slate-600 font-bold text-lg">{resultData.name}</p>
        </div>

        {/* Score Card */}
        <div
          className={`p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6 text-center ${getScoreBgColor(
            resultData.percentage
          )}`}
        >
          <div
            className={`text-6xl font-black mb-2 ${getScoreColor(
              resultData.percentage
            )}`}
          >
            {resultData.percentage}%
          </div>
          <p className="font-black text-slate-900 text-xl uppercase">
            Skor Anda
          </p>
          <p className="text-slate-600 font-bold">
            {resultData.correct_answers} dari {resultData.total_questions} soal
            benar
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-100 border-2 border-black p-4 text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="font-black text-2xl text-slate-900">
              {resultData.correct_answers}
            </div>
            <div className="text-xs font-bold text-slate-600 uppercase">
              Benar
            </div>
          </div>

          <div className="bg-red-100 border-2 border-black p-4 text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <XCircle className="h-8 w-8 mx-auto mb-2 text-red-600" />
            <div className="font-black text-2xl text-slate-900">
              {resultData.wrong_answers}
            </div>
            <div className="text-xs font-bold text-slate-600 uppercase">
              Salah
            </div>
          </div>

          <div className="bg-gray-100 border-2 border-black p-4 text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <Target className="h-8 w-8 mx-auto mb-2 text-gray-600" />
            <div className="font-black text-2xl text-slate-900">
              {resultData.unanswered}
            </div>
            <div className="text-xs font-bold text-slate-600 uppercase">
              Kosong
            </div>
          </div>

          <div className="bg-blue-100 border-2 border-black p-4 text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="font-black text-lg text-slate-900">
              {formatTime(resultData.time_taken)}
            </div>
            <div className="text-xs font-bold text-slate-600 uppercase">
              Waktu
            </div>
          </div>
        </div>

        {/* Performance Analysis */}
        <div className="bg-white border-2 border-black p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-6">
          <h3 className="font-black text-slate-900 mb-4 uppercase flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Analisis Performa
          </h3>

          <div className="space-y-3 text-sm font-bold text-slate-700">
            <div className="flex justify-between items-center">
              <span>Tingkat Akurasi:</span>
              <span className={getScoreColor(resultData.percentage)}>
                {Math.round(
                  (resultData.correct_answers / resultData.answered_questions) *
                    100
                )}
                %
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span>Soal Terjawab:</span>
              <span>
                {resultData.answered_questions} dari{" "}
                {resultData.total_questions}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span>Waktu Efisiensi:</span>
              <span>
                {Math.round(
                  (resultData.time_taken / (resultData.duration_minutes * 60)) *
                    100
                )}
                % waktu terpakai
              </span>
            </div>

            <div className="mt-4 p-3 bg-blue-50 border-2 border-blue-200">
              <p className="text-blue-700">
                {resultData.percentage >= 80
                  ? "🎉 Excellent! Performa sangat baik!"
                  : resultData.percentage >= 60
                  ? "👍 Good! Terus tingkatkan lagi!"
                  : "💪 Keep trying! Latihan lebih banyak lagi!"}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleRetakeCategory}
            className="flex-1 bg-orange-500 text-white px-6 py-3 font-black text-sm border-2 border-black hover:bg-orange-600 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Ulangi Kategori
          </button>

          <button
            onClick={handleBackToTryout}
            className="flex-1 bg-blue-500 text-white px-6 py-3 font-black text-sm border-2 border-black hover:bg-blue-600 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            Lanjut Kategori Lain
          </button>
        </div>

        {/* Tips */}
        <div className="bg-yellow-100 border-2 border-black p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mt-6">
          <h3 className="font-black text-slate-900 mb-3 uppercase">
            💡 Tips Meningkatkan Skor
          </h3>
          <ul className="space-y-2 text-sm font-bold text-slate-700">
            <li>• Perbanyak latihan soal serupa</li>
            <li>
              • Kelola waktu dengan baik - jangan terlalu lama di satu soal
            </li>
            <li>• Baca soal dengan teliti sebelum menjawab</li>
            <li>• Gunakan proses eliminasi untuk soal yang sulit</li>
            <li>• Review materi yang masih lemah</li>
          </ul>
        </div>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNavigation currentPage="tryouts" />
    </div>
  );
}
