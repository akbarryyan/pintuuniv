"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import HeaderNavigation from "@/components/HeaderNavigation";

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
      {/* Header Navigation */}
      <HeaderNavigation
        currentPage="discuss"
        userInfo={{
          name: userData.name,
          avatar: userData.avatar,
        }}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 sm:p-6 md:p-8 border-3 sm:border-4 border-slate-800 shadow-brutal">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-3 uppercase leading-tight">
                  💬 Forum Diskusi
                </h1>
                <p className="text-sm sm:text-base font-bold opacity-90">
                  Berbagi pengetahuan, diskusi soal, dan saling membantu sesama
                  pejuang UTBK!
                </p>
              </div>
              <button className="bg-yellow-400 text-slate-900 px-4 py-2 sm:px-6 sm:py-3 font-black text-sm sm:text-base border-3 border-slate-800 hover:bg-yellow-300 transition-colors shadow-brutal">
                ✏️ Buat Post Baru
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 shadow-brutal mb-6">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase mb-4">
                📂 Kategori
              </h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-3 border-2 border-slate-800 transition-all duration-200 ${
                      selectedCategory === category.id
                        ? `${category.color} text-white shadow-brutal transform -translate-y-1`
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{category.icon}</span>
                        <div>
                          <p className="font-black text-sm">{category.name}</p>
                          <p
                            className={`text-xs font-bold ${
                              selectedCategory === category.id
                                ? "text-white opacity-90"
                                : "text-slate-600"
                            }`}
                          >
                            {category.postCount} post
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Forum Stats */}
            <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 shadow-brutal">
              <h3 className="text-lg font-black text-slate-900 uppercase mb-4">
                📊 Statistik Forum
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-600">
                    Total Post
                  </span>
                  <span className="font-black text-slate-900">2,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-600">
                    Member Aktif
                  </span>
                  <span className="font-black text-slate-900">1,523</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-600">
                    Diskusi Hari Ini
                  </span>
                  <span className="font-black text-slate-900">47</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filter Bar */}
            <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 shadow-brutal mb-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Cari diskusi, topik, atau tag..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-slate-800 font-bold text-sm focus:outline-none focus:border-orange-400"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border-2 border-slate-800 font-bold text-sm focus:outline-none focus:border-orange-400"
                >
                  <option value="latest">Terbaru</option>
                  <option value="popular">Terpopuler</option>
                  <option value="replies">Banyak Balasan</option>
                </select>
              </div>
            </div>

            {/* Forum Posts */}
            <div className="space-y-4">
              {sortedPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white border-3 border-slate-800 p-4 sm:p-6 shadow-brutal hover:shadow-xl transition-all duration-200 cursor-pointer"
                >
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 border-2 border-slate-800 flex items-center justify-center font-black text-lg">
                        {post.author.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-black text-sm text-slate-900">
                            {post.author.name}
                          </p>
                          {post.isPinned && (
                            <span className="bg-red-500 text-white px-2 py-1 font-black text-xs border border-slate-800">
                              📌 PINNED
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-bold text-slate-600">
                          {post.author.school} • Kelas {post.author.grade} •{" "}
                          {post.createdAt}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 border-2 border-slate-800 font-black text-xs ${
                        categories.find((c) => c.id === post.category)?.color ||
                        "bg-gray-400"
                      } text-white`}
                    >
                      {categories.find((c) => c.id === post.category)?.icon}{" "}
                      {categories.find((c) => c.id === post.category)?.name}
                    </div>
                  </div>

                  {/* Post Title and Content */}
                  <h3 className="font-black text-base sm:text-lg text-slate-900 mb-2 leading-tight hover:text-purple-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-700 font-medium mb-3 line-clamp-2">
                    {post.content}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-slate-700 px-2 py-1 border border-slate-800 font-bold text-xs hover:bg-gray-200 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Post Stats and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs font-bold text-slate-600">
                      <span>👁️ {post.views} views</span>
                      <span>💬 {post.replies} replies</span>
                      <span>📅 {post.lastReply}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`px-3 py-1 border-2 border-slate-800 font-black text-xs transition-colors ${
                          post.isLiked
                            ? "bg-red-500 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        ❤️ {post.likes}
                      </button>
                      <button className="bg-blue-500 text-white px-3 py-1 border-2 border-slate-800 font-black text-xs hover:bg-blue-600 transition-colors">
                        💬 Balas
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-8">
              <button className="bg-orange-500 text-white px-6 py-3 font-black text-sm border-3 border-slate-800 hover:bg-orange-600 transition-colors shadow-brutal">
                📄 Muat Lebih Banyak
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
