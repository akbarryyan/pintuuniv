"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Clock, BookOpen, Users, Target } from "lucide-react";
import HeaderNavigation from "@/components/HeaderNavigation";
import MobileFriendlyHeader from "@/components/MobileFriendlyHeader";
import BottomNavigation from "@/components/BottomNavigation";
import StartInstructions from "@/components/tryouts/StartInstructions";

interface Category {
  id: number;
  name: string;
  description: string;
  total_questions: number;
  weight: number;
  duration_minutes: number;
  order_index: number;
  is_completed?: boolean;
  score?: number;
}

interface TryoutData {
  id: number;
  title: string;
  description: string;
  total_categories: number;
  total_questions: number;
  total_weight: number;
  passing_score: number;
  type_tryout: string;
  duration_minutes: number;
  categories: Category[];
}

export default function TryoutPage() {
  const params = useParams();
  const router = useRouter();
  const tryoutId = params.id as string;

  const [tryoutData, setTryoutData] = useState<TryoutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [startingCategoryId, setStartingCategoryId] = useState<number | null>(
    null
  );
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

  // Load tryout data
  useEffect(() => {
    const fetchTryoutData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Mock data untuk UI - nanti diganti dengan API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockData: TryoutData = {
          id: parseInt(tryoutId),
          title: "Tryout UTBK 2025 - Simulasi Nasional #1",
          description:
            "Simulasi lengkap UTBK 2025 dengan standar soal nasional",
          total_categories: 4,
          total_questions: 120,
          total_weight: 100,
          passing_score: 70,
          type_tryout: "premium",
          duration_minutes: 180,
          categories: [
            {
              id: 1,
              name: "Tes Potensi Skolastik (TPS)",
              description:
                "Mengukur kemampuan kognitif yang dianggap penting untuk keberhasilan di sekolah formal",
              total_questions: 40,
              weight: 30,
              duration_minutes: 60,
              order_index: 1,
              is_completed: false,
              score: undefined,
            },
            {
              id: 2,
              name: "Literasi dalam Bahasa Indonesia",
              description:
                "Kemampuan memahami, menggunakan, mengevaluasi teks tertulis",
              total_questions: 30,
              weight: 25,
              duration_minutes: 45,
              order_index: 2,
              is_completed: false,
              score: undefined,
            },
            {
              id: 3,
              name: "Literasi dalam Bahasa Inggris",
              description:
                "Kemampuan memahami, menggunakan, mengevaluasi teks tertulis dalam bahasa Inggris",
              total_questions: 20,
              weight: 20,
              duration_minutes: 30,
              order_index: 3,
              is_completed: false,
              score: undefined,
            },
            {
              id: 4,
              name: "Penalaran Matematika",
              description:
                "Kemampuan berpikir menggunakan konsep, prosedur, fakta, dan alat matematika",
              total_questions: 30,
              weight: 25,
              duration_minutes: 45,
              order_index: 4,
              is_completed: false,
              score: undefined,
            },
          ],
        };

        setTryoutData(mockData);
      } catch (error) {
        console.error("Error fetching tryout data:", error);
        setError("Gagal memuat data tryout");
        toast.error("Gagal memuat data tryout");
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    };

    if (tryoutId) {
      fetchTryoutData();
    }
  }, [tryoutId]);

  const handleStartCategory = async (
    categoryId: number,
    categoryName: string
  ) => {
    const category = tryoutData?.categories.find((c) => c.id === categoryId);
    if (category) {
      // Set loading state
      setStartingCategoryId(categoryId);

      // Show loading toast with category name
      const loadingToast = toast.loading(
        `🚀 Mempersiapkan kategori "${categoryName}"...`
      );

      try {
        // Step 1: Preparing
        await new Promise((resolve) => setTimeout(resolve, 700));
        toast.loading("📚 Memuat soal-soal kategori...", { id: loadingToast });

        // Step 2: Loading category
        await new Promise((resolve) => setTimeout(resolve, 700));
        toast.loading("⚙️ Menyiapkan lingkungan...", { id: loadingToast });

        // Step 3: Final preparation
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Update toast
        toast.success(`✅ Kategori "${categoryName}" siap dimulai!`, {
          id: loadingToast,
        });

        // Small delay before showing modal
        await new Promise((resolve) => setTimeout(resolve, 400));

        setSelectedCategory(category);
        setShowInstructions(true);
      } catch (error) {
        console.error("Error preparing category:", error);
        toast.error("❌ Gagal mempersiapkan kategori", { id: loadingToast });
      } finally {
        setStartingCategoryId(null);
      }
    }
  };

  const handleConfirmStart = () => {
    if (selectedCategory) {
      router.push(`/tryout/${tryoutId}/category/${selectedCategory.id}`);
    }
  };

  const handleCancelStart = () => {
    setShowInstructions(false);
    setSelectedCategory(null);
  };

  const handleBack = () => {
    router.back();
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
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

        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
          {/* Header Skeleton */}
          <div className="bg-gray-100 border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 animate-pulse">
            <div className="h-8 bg-gray-300 border border-black rounded w-1/3 mb-4"></div>
            <div className="h-6 bg-gray-300 border border-black rounded w-3/4 mb-4"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-300 border border-black rounded"
                ></div>
              ))}
            </div>
          </div>

          {/* Categories Skeleton */}
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-100 border-2 border-black p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] animate-pulse"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="h-6 bg-gray-300 border border-black rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-300 border border-black rounded w-3/4"></div>
                  </div>
                  <div className="h-10 w-32 bg-gray-300 border border-black rounded"></div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-4 bg-gray-300 border border-black rounded"></div>
                  <div className="h-4 bg-gray-300 border border-black rounded"></div>
                  <div className="h-4 bg-gray-300 border border-black rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <BottomNavigation currentPage="tryouts" />
      </div>
    );
  }

  if (error || !tryoutData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 pb-20 md:pb-0">
        {/* Headers */}
        <div className="hidden md:block">
          <HeaderNavigation currentPage="tryouts" userInfo={userData} />
        </div>
        <div className="block md:hidden">
          <MobileFriendlyHeader userInfo={userData} showMobileMenu={false} />
        </div>

        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
          <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center">
            <div className="text-red-500 text-4xl mb-3">⚠️</div>
            <p className="font-black text-slate-900 mb-2">
              Gagal Memuat Tryout
            </p>
            <p className="text-slate-600 text-sm mb-4">
              {error || "Tryout tidak ditemukan"}
            </p>
            <button
              onClick={handleBack}
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
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 mb-6 text-slate-600 hover:text-slate-900 font-bold transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Kembali ke Daftar Tryout
        </button>

        {/* Tryout Header */}
        <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 uppercase">
            {tryoutData.title}
          </h1>
          <p className="text-slate-600 font-bold mb-6">
            {tryoutData.description}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-blue-100 border-2 border-black p-4 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <BookOpen className="h-6 w-6 mx-auto mb-2 text-blue-700" />
              <div className="font-black text-lg text-slate-900">
                {tryoutData.total_categories}
              </div>
              <div className="text-xs font-bold text-slate-600 uppercase">
                Kategori
              </div>
            </div>
            <div className="bg-green-100 border-2 border-black p-4 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Target className="h-6 w-6 mx-auto mb-2 text-green-700" />
              <div className="font-black text-lg text-slate-900">
                {tryoutData.total_questions}
              </div>
              <div className="text-xs font-bold text-slate-600 uppercase">
                Soal
              </div>
            </div>
            <div className="bg-orange-100 border-2 border-black p-4 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Clock className="h-6 w-6 mx-auto mb-2 text-orange-700" />
              <div className="font-black text-lg text-slate-900">
                {formatDuration(tryoutData.duration_minutes)}
              </div>
              <div className="text-xs font-bold text-slate-600 uppercase">
                Durasi
              </div>
            </div>
            <div className="bg-purple-100 border-2 border-black p-4 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Users className="h-6 w-6 mx-auto mb-2 text-purple-700" />
              <div className="font-black text-lg text-slate-900">
                {tryoutData.passing_score}%
              </div>
              <div className="text-xs font-bold text-slate-600 uppercase">
                Passing
              </div>
            </div>
          </div>

          {/* Progress Summary */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 border-2 border-black">
                  <Target className="h-5 w-5 text-slate-700" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm uppercase">
                    Progress Tryout
                  </h3>
                  <p className="text-slate-600 font-bold text-xs">
                    {tryoutData.categories.filter((c) => c.is_completed).length}{" "}
                    dari {tryoutData.total_categories} kategori selesai
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-black text-2xl text-slate-900">
                  {Math.round(
                    (tryoutData.categories.filter((c) => c.is_completed)
                      .length /
                      tryoutData.total_categories) *
                      100
                  )}
                  %
                </div>
                <div className="text-xs font-bold text-slate-600 uppercase">
                  Selesai
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="bg-white border-2 border-black h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-full transition-all duration-500"
                  style={{
                    width: `${
                      (tryoutData.categories.filter((c) => c.is_completed)
                        .length /
                        tryoutData.total_categories) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-4">
          <h2 className="text-xl font-black text-slate-900 mb-4 uppercase">
            📚 Kategori Soal
          </h2>

          {tryoutData.categories.map((category, index) => (
            <div
              key={category.id}
              className={`bg-white border-2 border-black p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 ${
                category.is_completed ? "bg-green-50 border-green-500" : ""
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm border-2 border-black ${
                        category.is_completed
                          ? "bg-green-500 text-white"
                          : "bg-slate-900 text-white"
                      }`}
                    >
                      {category.is_completed ? "✓" : index + 1}
                    </div>
                    <h3 className="text-lg font-black text-slate-900 leading-tight">
                      {category.name}
                    </h3>
                    {category.is_completed && category.score && (
                      <div className="bg-green-100 text-green-800 px-2 py-1 border border-green-300 text-xs font-black">
                        {category.score}%
                      </div>
                    )}
                  </div>
                  <p className="text-slate-600 font-bold text-sm mb-4">
                    {category.description}
                  </p>

                  {/* Category Stats */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-slate-500" />
                      <span className="font-bold text-slate-700">
                        {category.total_questions} soal
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-500" />
                      <span className="font-bold text-slate-700">
                        {formatDuration(category.duration_minutes)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-slate-500" />
                      <span className="font-bold text-slate-700">
                        Bobot {category.weight}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {category.is_completed ? (
                    <>
                      <button
                        onClick={() =>
                          router.push(
                            `/tryout/${tryoutId}/category/${category.id}/result`
                          )
                        }
                        className="bg-blue-500 text-white px-6 py-3 font-black text-sm border-2 border-black hover:bg-blue-600 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap"
                      >
                        📊 LIHAT HASIL
                      </button>
                      <button
                        onClick={() =>
                          handleStartCategory(category.id, category.name)
                        }
                        disabled={startingCategoryId === category.id}
                        className={`px-6 py-3 font-black text-sm border-2 border-black transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap relative overflow-hidden disabled:cursor-not-allowed ${
                          startingCategoryId === category.id
                            ? "bg-gray-400 scale-95 shadow-none animate-pulse"
                            : "bg-gray-500 hover:bg-gray-600 hover:scale-105 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform"
                        } text-white`}
                      >
                        {startingCategoryId === category.id ? (
                          <div className="flex items-center justify-center gap-2 relative z-10">
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span className="animate-pulse">
                              Mempersiapkan...
                            </span>
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_1.5s_ease-in-out_infinite] -z-10"></div>
                          </div>
                        ) : (
                          <span className="relative z-10 flex items-center justify-center gap-1">
                            <span className="animate-bounce">🔄</span>
                            <span className="hidden sm:inline">ULANGI</span>
                            <span className="sm:hidden">ULANG</span>
                          </span>
                        )}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() =>
                        handleStartCategory(category.id, category.name)
                      }
                      disabled={startingCategoryId === category.id}
                      className={`px-6 py-3 font-black text-sm border-2 border-black transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap relative overflow-hidden disabled:cursor-not-allowed ${
                        startingCategoryId === category.id
                          ? "bg-emerald-400 scale-95 shadow-none animate-pulse"
                          : "bg-emerald-500 hover:bg-emerald-600 hover:scale-105 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform"
                      } text-white`}
                    >
                      {startingCategoryId === category.id ? (
                        <div className="flex items-center justify-center gap-2 relative z-10">
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span className="animate-pulse">
                            Mempersiapkan...
                          </span>
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_1.5s_ease-in-out_infinite] -z-10"></div>
                        </div>
                      ) : (
                        <span className="relative z-10 flex items-center justify-center gap-1">
                          <span className="animate-bounce">🚀</span>
                          <span className="hidden sm:inline">
                            MULAI KERJAKAN KATEGORI INI
                          </span>
                          <span className="sm:hidden">MULAI KATEGORI</span>
                        </span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="bg-yellow-100 border-2 border-black p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mt-6">
          <h3 className="font-black text-slate-900 mb-3 uppercase">
            📋 Petunjuk Pengerjaan
          </h3>
          <ul className="space-y-2 text-sm font-bold text-slate-700">
            <li>• Kerjakan kategori soal secara berurutan</li>
            <li>• Setiap kategori memiliki waktu yang berbeda</li>
            <li>• Pastikan koneksi internet stabil selama mengerjakan</li>
            <li>• Jawaban akan tersimpan otomatis</li>
            <li>• Klik "MULAI KERJAKAN KATEGORI INI" untuk memulai</li>
          </ul>
        </div>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNavigation currentPage="tryouts" />

      {/* Start Instructions Modal */}
      {showInstructions && selectedCategory && (
        <StartInstructions
          categoryName={selectedCategory.name}
          duration={selectedCategory.duration_minutes}
          totalQuestions={selectedCategory.total_questions}
          onStartCategory={handleConfirmStart}
          onCancel={handleCancelStart}
        />
      )}
    </div>
  );
}
