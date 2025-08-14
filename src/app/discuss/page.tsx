"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import HeaderNavigation from "@/components/HeaderNavigation";
import MobileFriendlyHeader from "@/components/MobileFriendlyHeader";
import BottomNavigation from "@/components/BottomNavigation";
import { HeaderSection as DiscussHeaderSection, CategoriesSidebar, MainContent } from "@/components/discuss";

interface ForumPost {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    school: string;
    grade: string;
  };
  category: string;
  tags: string[];
  replies: number;
  likes: number;
  views: number;
  isLiked: boolean;
  isPinned: boolean;
  createdAt: string;
  lastReply: string;
}

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  postCount: number;
}

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
  const [sortBy, setSortBy] = useState("latest");

  // Forum Categories
  const categories: ForumCategory[] = [
    {
      id: "all",
      name: "Semua Kategori",
      description: "Tampilkan semua diskusi",
      icon: "🌟",
      color: "bg-blue-500",
      postCount: 847,
    },
    {
      id: "utbk",
      name: "UTBK & SNBP",
      description: "Diskusi seputar UTBK, SNBP, dan tips masuk PTN",
      icon: "🎯",
      color: "bg-orange-500",
      postCount: 324,
    },
    {
      id: "study",
      name: "Tips Belajar",
      description: "Berbagi strategi dan metode belajar efektif",
      icon: "📚",
      color: "bg-emerald-500",
      postCount: 198,
    },
    {
      id: "math",
      name: "Matematika",
      description: "Diskusi soal dan pembahasan matematika",
      icon: "🔢",
      color: "bg-purple-500",
      postCount: 156,
    },
    {
      id: "science",
      name: "Sains",
      description: "Fisika, Kimia, Biologi dan ilmu pengetahuan",
      icon: "🧪",
      color: "bg-green-500",
      postCount: 89,
    },
    {
      id: "social",
      name: "Sosial",
      description: "Sejarah, Geografi, Sosiologi, Ekonomi",
      icon: "🌍",
      color: "bg-blue-600",
      postCount: 67,
    },
    {
      id: "general",
      name: "Diskusi Umum",
      description: "Obrolan santai dan sharing pengalaman",
      icon: "💭",
      color: "bg-pink-500",
      postCount: 134,
    },
  ];

  // Sample Forum Posts
  const [forumPosts] = useState<ForumPost[]>([
    {
      id: 1,
      title: "Tips Mengatasi Grogi Saat UTBK - Pengalaman Pribadi",
      content:
        "Hai semua! Aku mau share pengalaman tentang cara mengatasi grogi saat UTBK kemarin. Semoga bisa membantu adik-adik yang akan menghadapi UTBK tahun ini...",
      author: {
        name: "Sarah Putri",
        avatar: "👩‍🎓",
        school: "SMA Negeri 1 Jakarta",
        grade: "12",
      },
      category: "utbk",
      tags: ["UTBK", "Tips", "Pengalaman"],
      replies: 23,
      likes: 45,
      views: 234,
      isLiked: false,
      isPinned: true,
      createdAt: "2 jam yang lalu",
      lastReply: "30 menit yang lalu",
    },
    {
      id: 2,
      title: "Pembahasan Soal Matematika UTBK 2024 - Limit Fungsi",
      content:
        "Teman-teman ada yang bisa bantu jelasin soal limit ini? Aku masih bingung dengan konsepnya. Sudah coba berbagai cara tapi hasilnya tetap salah...",
      author: {
        name: "Ahmad Firdaus",
        avatar: "👨‍🎓",
        school: "SMA Negeri 3 Bandung",
        grade: "12",
      },
      category: "math",
      tags: ["Matematika", "Limit", "UTBK"],
      replies: 18,
      likes: 32,
      views: 187,
      isLiked: true,
      isPinned: false,
      createdAt: "3 jam yang lalu",
      lastReply: "1 jam yang lalu",
    },
    {
      id: 3,
      title: "Strategi Belajar 6 Bulan Terakhir Sebelum UTBK",
      content:
        "Guys, mau tanya dong. Sekarang udah masuk 6 bulan terakhir sebelum UTBK. Kalian punya strategi khusus nggak untuk periode ini? Share dong pengalaman kalian...",
      author: {
        name: "Dinda Sari",
        avatar: "👩‍🎓",
        school: "SMA Swasta Harapan",
        grade: "12",
      },
      category: "study",
      tags: ["Strategi", "UTBK", "Belajar"],
      replies: 41,
      likes: 67,
      views: 412,
      isLiked: false,
      isPinned: false,
      createdAt: "5 jam yang lalu",
      lastReply: "45 menit yang lalu",
    },
    {
      id: 4,
      title: "Reaksi Redoks - Cara Mudah Mengingat dan Menghafal",
      content:
        "Halo! Aku mau share cara yang udah aku pakai untuk belajar reaksi redoks. Dulu aku juga struggle banget sama materi ini, tapi sekarang udah lebih mudah...",
      author: {
        name: "Kevin Tan",
        avatar: "👨‍🎓",
        school: "SMA Negeri 5 Surabaya",
        grade: "12",
      },
      category: "science",
      tags: ["Kimia", "Redoks", "Tips"],
      replies: 15,
      likes: 28,
      views: 156,
      isLiked: false,
      isPinned: false,
      createdAt: "1 hari yang lalu",
      lastReply: "2 jam yang lalu",
    },
    {
      id: 5,
      title: "Jurusan IPS vs IPA - Dilema Memilih Jalur Kuliah",
      content:
        "Mungkin ada yang punya pengalaman atau saran? Aku sekarang kelas 11 dan masih bingung mau ambil IPS atau IPA. Pengen tau pengalaman kakak-kakak disini...",
      author: {
        name: "Rina Maharani",
        avatar: "👩‍🎓",
        school: "SMA Negeri 2 Yogyakarta",
        grade: "11",
      },
      category: "general",
      tags: ["Jurusan", "IPS", "IPA", "Kuliah"],
      replies: 52,
      likes: 89,
      views: 623,
      isLiked: true,
      isPinned: false,
      createdAt: "2 hari yang lalu",
      lastReply: "1 jam yang lalu",
    },
    {
      id: 6,
      title: "Soal Ekonomi UTBK - Permintaan dan Penawaran",
      content:
        "Ada yang bisa bantu jelasin konsep elastisitas permintaan? Aku udah baca di buku tapi masih bingung dengan aplikasinya di soal UTBK...",
      author: {
        name: "Budi Santoso",
        avatar: "👨‍🎓",
        school: "SMA Negeri 1 Medan",
        grade: "12",
      },
      category: "social",
      tags: ["Ekonomi", "UTBK", "Elastisitas"],
      replies: 12,
      likes: 19,
      views: 98,
      isLiked: false,
      isPinned: false,
      createdAt: "1 hari yang lalu",
      lastReply: "3 jam yang lalu",
    },
  ]);

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

  // Filter posts based on category and search
  const filteredPosts = forumPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;

    switch (sortBy) {
      case "latest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "popular":
        return b.likes - a.likes;
      case "replies":
        return b.replies - a.replies;
      default:
        return 0;
    }
  });

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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar - Categories */}
          <CategoriesSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Main Content */}
          <MainContent
            categories={categories}
            posts={forumPosts}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            sortBy={sortBy as any}
            onSearchQueryChange={setSearchQuery}
            onSortByChange={(v) => setSortBy(v)}
            onLike={handleLike}
          />
        </div>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNavigation currentPage="discuss" />
    </div>
  );
}
