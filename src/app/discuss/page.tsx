"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import HeaderNavigation from "@/components/HeaderNavigation";
import MobileFriendlyHeader from "@/components/MobileFriendlyHeader";
import BottomNavigation from "@/components/BottomNavigation";
import { HeaderSection as DiscussHeaderSection, CategoriesSidebar, MainContent } from "@/components/discuss";
import MyDiscussions from "@/components/discuss/MyDiscussions";


export default function DiscussPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    avatar: "👨‍🎓",
  });

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "replies">("latest");
  const [activeTab, setActiveTab] = useState<"all" | "my">("all");

  // Load user data
  useEffect(() => {
    setMounted(true);

    const loadUserData = () => {
      try {
        if (typeof window !== "undefined") {
          const storedUserData = localStorage.getItem("userData");
          if (storedUserData) {
            const parsedData = JSON.parse(storedUserData);
            setUserData({
              name: parsedData.name || "User",
              email: parsedData.email || "",
              avatar: parsedData.avatar || "👨‍🎓",
            });
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        toast.error("Gagal memuat data user");
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
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


  const handleLike = (postId: number) => {
    toast.success("Post disukai! ❤️");
  };

  // Loading state
  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-emerald-50 to-purple-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-emerald-50 to-purple-100">
      {/* Header Navigation - Desktop uses HeaderNavigation, Mobile uses MobileFriendlyHeader */}
      <div className="hidden sm:block">
        <HeaderNavigation
          currentPage="discuss"
          userInfo={{
            name: userData.name,
            avatar: userData.avatar,
          }}
          onLogout={handleLogout}
        />
      </div>
      <div className="sm:hidden">
        <MobileFriendlyHeader
          currentPage="discuss"
          userInfo={{
            name: userData.name,
            avatar: userData.avatar,
          }}
          showMobileMenu={false}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 pb-24 sm:pb-8">
        {/* Header Section */}
        <DiscussHeaderSection />

        {/* Tab Navigation */}
        <div className="bg-white border-3 border-slate-800 p-4 shadow-brutal mb-6">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 font-black text-sm border-2 border-slate-800 transition-colors ${
                activeTab === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-slate-900 hover:bg-gray-200"
              }`}
            >
              🌐 Semua Diskusi
            </button>
            <button
              onClick={() => setActiveTab("my")}
              className={`px-4 py-2 font-black text-sm border-2 border-slate-800 transition-colors ${
                activeTab === "my"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-slate-900 hover:bg-gray-200"
              }`}
            >
              📝 Diskusi Saya
            </button>
          </div>
        </div>

        {activeTab === "all" ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Sidebar - Categories */}
            <CategoriesSidebar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Main Content */}
            <MainContent
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              sortBy={sortBy}
              onSearchQueryChange={setSearchQuery}
              onSortByChange={setSortBy}
              onLike={handleLike}
            />
          </div>
        ) : (
          <MyDiscussions />
        )}
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNavigation currentPage="discuss" />
    </div>
  );
}
