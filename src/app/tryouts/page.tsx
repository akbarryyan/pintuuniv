"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import HeaderNavigation from "@/components/HeaderNavigation";
import BottomNavigation from "@/components/BottomNavigation";
import MobileFriendlyHeader from "@/components/MobileFriendlyHeader";
import TryoutHeader from "@/components/tryouts/TryoutHeader";
import SearchAndFilters from "@/components/tryouts/SearchAndFilters";
import ResultsCount from "@/components/tryouts/ResultsCount";
import TryoutsGrid from "@/components/tryouts/TryoutsGrid";
import NoResults from "@/components/tryouts/NoResults";
import CallToAction from "@/components/tryouts/CallToAction";

interface Tryout {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  type: string;
  difficulty: string;
  participants: number;
  discount: number;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  isRegistered?: boolean;
  registrationStatus?: string;
}

export default function TryoutsPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState({
    name: "User",
    avatar: "👨‍🎓",
    id: null as number | null,
  });
  const [tryouts, setTryouts] = useState<Tryout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Load tryouts data from API
  useEffect(() => {
    const fetchTryouts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Build query parameters
        const params = new URLSearchParams();
        if (activeFilter !== "all") params.append("type", activeFilter);
        if (difficulty !== "all") params.append("difficulty", difficulty);
        if (priceRange !== "all") params.append("priceRange", priceRange);
        if (searchQuery) params.append("search", searchQuery);

        const response = await fetch(`/api/tryouts?${params.toString()}`);
        const data = await response.json();

        if (data.success) {
          setTryouts(data.tryouts);
          console.log("Tryouts loaded:", data.tryouts.length);

          // Cek status registrasi untuk setiap tryout jika user sudah login
          if (userData.id) {
            checkRegistrationStatus(data.tryouts);
          }
        } else {
          setError(data.message || "Gagal memuat data tryouts");
          toast.error("Gagal memuat data tryouts");
        }
      } catch (error) {
        console.error("Error fetching tryouts:", error);
        setError("Terjadi kesalahan saat memuat data");
        toast.error("Terjadi kesalahan saat memuat data");
      } finally {
        // Add minimum delay to show skeleton (1 second)
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    fetchTryouts();
  }, [activeFilter, difficulty, priceRange, searchQuery, userData.id]);

  // Fungsi untuk mengecek status registrasi
  const checkRegistrationStatus = async (tryoutsData: Tryout[]) => {
    if (!userData.id) return;

    try {
      const updatedTryouts = await Promise.all(
        tryoutsData.map(async (tryout) => {
          const response = await fetch(
            `/api/tryouts/register?userId=${userData.id}&tryoutId=${tryout.id}`
          );
          const data = await response.json();

          if (data.success) {
            return {
              ...tryout,
              isRegistered: data.isRegistered,
              registrationStatus: data.registration?.status || null,
            };
          }
          return tryout;
        })
      );

      setTryouts(updatedTryouts);
    } catch (error) {
      console.error("Error checking registration status:", error);
    }
  };

  // Fungsi untuk mendaftar tryout
  const handleRegisterTryout = async (
    tryoutId: number,
    tryoutTitle: string
  ) => {
    if (!userData.id) {
      toast.error("Anda harus login terlebih dahulu");
      router.push("/login");
      return;
    }

    try {
      const response = await fetch("/api/tryouts/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tryoutId,
          userId: userData.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`Berhasil mendaftar tryout "${tryoutTitle}"!`);

        // Update status registrasi di state
        setTryouts((prevTryouts) =>
          prevTryouts.map((tryout) =>
            tryout.id === tryoutId
              ? {
                  ...tryout,
                  isRegistered: true,
                  registrationStatus: "registered",
                }
              : tryout
          )
        );
      } else {
        toast.error(data.message || "Gagal mendaftar tryout");
      }
    } catch (error) {
      console.error("Error registering for tryout:", error);
      toast.error("Terjadi kesalahan saat mendaftar");
    }
  };

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

  const resetFilters = () => {
    setActiveFilter("all");
    setDifficulty("all");
    setPriceRange("all");
    setSearchQuery("");
  };

  // Calculate statistics
  const totalTryouts = tryouts.length;
  const freeTryouts = tryouts.filter((t) => t.type === "free").length;
  const premiumTryouts = tryouts.filter((t) => t.type === "premium").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 pb-20 md:pb-0">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <HeaderNavigation
          currentPage="tryouts"
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
        <TryoutHeader
          totalTryouts={totalTryouts}
          freeTryouts={freeTryouts}
          premiumTryouts={premiumTryouts}
        />

        {/* Search and Filters */}
        <SearchAndFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          totalTryouts={totalTryouts}
          freeTryouts={freeTryouts}
          premiumTryouts={premiumTryouts}
        />

        {/* Results Count */}
        <ResultsCount
          filteredCount={tryouts.length}
          totalCount={totalTryouts}
        />

        {/* Loading State - Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-gray-100 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-pulse"
              >
                {/* Card Header Skeleton */}
                <div className="p-4 sm:p-6 border-b-2 border-black bg-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-6 bg-gray-300 border border-black rounded w-16"></div>
                        <div className="h-6 bg-gray-300 border border-black rounded w-14"></div>
                      </div>
                      <div className="mb-2">
                        <div className="h-6 bg-gray-300 border border-black rounded w-20"></div>
                      </div>
                      <div className="h-5 bg-gray-300 border border-black rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 border border-black rounded w-24"></div>
                    </div>
                    <div className="text-right ml-3">
                      <div className="h-6 bg-gray-300 border border-black rounded w-16 mb-1"></div>
                      <div className="h-4 bg-gray-300 border border-black rounded w-20"></div>
                    </div>
                  </div>
                </div>

                {/* Card Body Skeleton */}
                <div className="p-4 sm:p-6">
                  <div className="space-y-3">
                    {/* Date Range Skeleton */}
                    <div className="h-4 bg-gray-300 border border-black rounded w-3/4"></div>

                    {/* Action Buttons Skeleton */}
                    <div className="pt-2">
                      <div className="flex gap-2">
                        <div className="flex-1 h-10 bg-gray-300 border border-black rounded"></div>
                        <div className="flex-1 h-10 bg-gray-300 border border-black rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center">
            <div className="text-red-500 text-4xl mb-3">⚠️</div>
            <p className="font-black text-slate-900 mb-2">Gagal Memuat Data</p>
            <p className="text-slate-600 text-sm mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 font-black text-sm border-2 border-black hover:bg-blue-600 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Tryouts Grid */}
        {!isLoading && !error && (
          <TryoutsGrid
            tryouts={tryouts}
            onRegisterTryout={handleRegisterTryout}
            userData={userData}
          />
        )}

        {/* No Results */}
        {!isLoading && !error && tryouts.length === 0 && (
          <NoResults onResetFilters={resetFilters} />
        )}

        {/* Call to Action */}
        <CallToAction />
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNavigation currentPage="tryouts" />
    </div>
  );
}
