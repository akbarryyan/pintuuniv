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
        } else {
          setError(data.message || "Gagal memuat data tryouts");
          toast.error("Gagal memuat data tryouts");
        }
      } catch (error) {
        console.error("Error fetching tryouts:", error);
        setError("Terjadi kesalahan saat memuat data");
        toast.error("Terjadi kesalahan saat memuat data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTryouts();
  }, [activeFilter, difficulty, priceRange, searchQuery]);

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

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">
              <p className="text-lg font-semibold">Gagal memuat data</p>
              <p className="text-sm">{error}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Tryouts Grid */}
        {!isLoading && !error && <TryoutsGrid tryouts={tryouts} />}

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
