"use client";

import Link from "next/link";
import { useState } from "react";

export default function TryoutsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Complete tryouts data
  const [allTryouts] = useState([
    {
      id: 1,
      title: "Tryout UTBK Saintek Premium",
      subject: "Matematika, Fisika, Kimia, Biologi",
      category: "saintek",
      duration: "180 menit",
      questions: 120,
      price: 49000,
      originalPrice: 75000,
      type: "premium",
      difficulty: "Sulit",
      participants: 15420,
      rating: 4.8,
      deadline: null,
      instructor: "Dr. Ahmad Yusuf",
      description:
        "Tryout komprehensif untuk persiapan UTBK Saintek dengan soal-soal terbaru dan analisis mendalam. Akses selamanya tanpa batas waktu!",
      features: [
        "Akses Selamanya",
        "Analisis AI",
        "Pembahasan Video",
        "Ranking Nasional",
        "Sertifikat",
      ],
      isPopular: true,
      discount: 35,
    },
    {
      id: 2,
      title: "Tryout UTBK Soshum Gratis",
      subject: "Sejarah, Geografi, Sosiologi, Ekonomi",
      category: "soshum",
      duration: "180 menit",
      questions: 120,
      price: 0,
      originalPrice: 0,
      type: "free",
      difficulty: "Sedang",
      participants: 28547,
      rating: 4.6,
      deadline: "10 Agustus 2025",
      instructor: "Prof. Siti Rahayu",
      description:
        "Tryout gratis untuk persiapan UTBK Soshum dengan kualitas soal standar nasional",
      features: ["Pembahasan Lengkap", "Ranking Nasional", "Progress Tracking"],
      isPopular: false,
      discount: 0,
    },
    {
      id: 3,
      title: "Tryout Simulasi UTBK Nasional",
      subject: "TPS + TKA Saintek/Soshum",
      category: "campuran",
      duration: "195 menit",
      questions: 150,
      price: 99000,
      originalPrice: 150000,
      type: "premium",
      difficulty: "Sangat Sulit",
      participants: 8924,
      rating: 4.9,
      deadline: null,
      instructor: "Tim Expert PintuUniv",
      description:
        "Simulasi lengkap UTBK dengan format dan tingkat kesulitan sesuai ujian sesungguhnya. Beli sekali, akses selamanya!",
      features: [
        "Akses Selamanya",
        "Simulasi Real",
        "Analisis AI",
        "Prediksi Nilai",
        "Konsultasi 1-on-1",
      ],
      isPopular: true,
      discount: 34,
    },
    {
      id: 4,
      title: "Tryout TPS (Tes Potensi Skolastik)",
      subject: "Penalaran Umum, Kuantitatif, Bahasa",
      category: "tps",
      duration: "110 menit",
      questions: 88,
      price: 0,
      originalPrice: 0,
      type: "free",
      difficulty: "Sedang",
      participants: 42156,
      rating: 4.5,
      deadline: "20 Agustus 2025",
      instructor: "Dr. Budi Santoso",
      description:
        "Tryout khusus TPS untuk mengasah kemampuan penalaran dan logika",
      features: ["Pembahasan Video", "Tips & Trik", "Progress Tracking"],
      isPopular: false,
      discount: 0,
    },
    {
      id: 5,
      title: "Tryout UTBK Intensif Pro",
      subject: "Semua Mata Pelajaran + Analisis AI",
      category: "campuran",
      duration: "200 menit",
      questions: 160,
      price: 149000,
      originalPrice: 200000,
      type: "premium",
      difficulty: "Sangat Sulit",
      participants: 5847,
      rating: 5.0,
      deadline: null,
      instructor: "Tim AI PintuUniv",
      description:
        "Tryout paling lengkap dengan AI analysis dan prediksi akurat untuk PTN favorit. Investasi sekali untuk akses seumur hidup!",
      features: [
        "Akses Selamanya",
        "AI Analysis",
        "Prediksi PTN",
        "Mentor Personal",
        "Garansi Hasil",
      ],
      isPopular: true,
      discount: 26,
    },
    {
      id: 6,
      title: "Tryout Matematika Dasar",
      subject: "Matematika Dasar",
      category: "saintek",
      duration: "90 menit",
      questions: 60,
      price: 25000,
      originalPrice: 35000,
      type: "premium",
      difficulty: "Mudah",
      participants: 18500,
      rating: 4.4,
      deadline: null,
      instructor: "M. Rizki Pratama",
      description:
        "Fokus pada matematika dasar untuk memperkuat foundation UTBK",
      features: [
        "Akses Selamanya",
        "Pembahasan Detail",
        "Latihan Tambahan",
        "Tips Cepat",
      ],
      isPopular: false,
      discount: 29,
    },
    {
      id: 7,
      title: "Tryout Bahasa Indonesia Gratis",
      subject: "Bahasa Indonesia",
      category: "soshum",
      duration: "75 menit",
      questions: 50,
      price: 0,
      originalPrice: 0,
      type: "free",
      difficulty: "Mudah",
      participants: 35200,
      rating: 4.3,
      deadline: "18 Agustus 2025",
      instructor: "Dewi Sartika",
      description: "Tryout gratis untuk menguasai bahasa Indonesia UTBK",
      features: ["Materi Lengkap", "Pembahasan", "Tips Menulis"],
      isPopular: false,
      discount: 0,
    },
    {
      id: 8,
      title: "Tryout Fisika Advanced",
      subject: "Fisika",
      category: "saintek",
      duration: "120 menit",
      questions: 80,
      price: 65000,
      originalPrice: 85000,
      type: "premium",
      difficulty: "Sulit",
      participants: 12400,
      rating: 4.7,
      deadline: null,
      instructor: "Dr. Andi Wijaya",
      description: "Tryout fisika level advanced dengan soal-soal menantang",
      features: [
        "Akses Selamanya",
        "Lab Virtual",
        "Simulasi",
        "Pembahasan Expert",
      ],
      isPopular: false,
      discount: 24,
    },
    {
      id: 9,
      title: "Tryout Kimia Organik",
      subject: "Kimia",
      category: "saintek",
      duration: "100 menit",
      questions: 70,
      price: 45000,
      originalPrice: 60000,
      type: "premium",
      difficulty: "Sulit",
      participants: 9800,
      rating: 4.6,
      deadline: null,
      instructor: "Prof. Linda Sari",
      description: "Spesialisasi kimia organik untuk UTBK Saintek",
      features: [
        "Akses Selamanya",
        "3D Molekul",
        "Reaksi Interaktif",
        "Bank Soal",
      ],
      isPopular: false,
      discount: 25,
    },
    {
      id: 10,
      title: "Tryout Sejarah Indonesia",
      subject: "Sejarah",
      category: "soshum",
      duration: "90 menit",
      questions: 65,
      price: 30000,
      originalPrice: 40000,
      type: "premium",
      difficulty: "Sedang",
      participants: 14200,
      rating: 4.5,
      deadline: null,
      instructor: "Ahmad Fauzi",
      description: "Mendalami sejarah Indonesia untuk UTBK Soshum",
      features: [
        "Akses Selamanya",
        "Timeline Interaktif",
        "Video Sejarah",
        "Kuis Menarik",
      ],
      isPopular: false,
      discount: 25,
    },
    {
      id: 11,
      title: "Tryout Ekonomi Mikro & Makro",
      subject: "Ekonomi",
      category: "soshum",
      duration: "105 menit",
      questions: 75,
      price: 55000,
      originalPrice: 70000,
      type: "premium",
      difficulty: "Sulit",
      participants: 11600,
      rating: 4.8,
      deadline: null,
      instructor: "Dr. Rini Ekonomi",
      description: "Tryout ekonomi komprehensif covering mikro dan makro",
      features: [
        "Akses Selamanya",
        "Grafik Interaktif",
        "Studi Kasus",
        "Analisis Pasar",
      ],
      isPopular: false,
      discount: 21,
    },
    {
      id: 12,
      title: "Tryout Biologi Molekuler",
      subject: "Biologi",
      category: "saintek",
      duration: "110 menit",
      questions: 85,
      price: 0,
      originalPrice: 0,
      type: "free",
      difficulty: "Sulit",
      participants: 16800,
      rating: 4.4,
      deadline: "5 September 2025",
      instructor: "Dr. Maya Biologi",
      description: "Tryout gratis biologi molekuler level advanced",
      features: ["Animasi 3D", "Virtual Lab", "Diskusi Forum"],
      isPopular: false,
      discount: 0,
    },
  ]);

  // Filter functions
  const getFilteredTryouts = () => {
    let filtered = allTryouts;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (tryout) =>
          tryout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tryout.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tryout.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by type
    if (activeFilter !== "all") {
      filtered = filtered.filter((tryout) => tryout.type === activeFilter);
    }

    // Filter by subject
    if (selectedSubject !== "all") {
      filtered = filtered.filter(
        (tryout) => tryout.category === selectedSubject
      );
    }

    // Filter by price range
    if (priceRange !== "all") {
      if (priceRange === "free") {
        filtered = filtered.filter((tryout) => tryout.price === 0);
      } else if (priceRange === "cheap") {
        filtered = filtered.filter(
          (tryout) => tryout.price > 0 && tryout.price <= 50000
        );
      } else if (priceRange === "expensive") {
        filtered = filtered.filter((tryout) => tryout.price > 50000);
      }
    }

    // Filter by difficulty
    if (difficulty !== "all") {
      filtered = filtered.filter((tryout) => tryout.difficulty === difficulty);
    }

    return filtered;
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Mudah":
        return "bg-emerald-100 text-emerald-800 border-emerald-400";
      case "Sedang":
        return "bg-blue-100 text-blue-800 border-blue-400";
      case "Sulit":
        return "bg-orange-100 text-orange-800 border-orange-400";
      case "Sangat Sulit":
        return "bg-red-100 text-red-800 border-red-400";
      default:
        return "bg-gray-100 text-gray-800 border-gray-400";
    }
  };

  const filteredTryouts = getFilteredTryouts();

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
              <div className="hidden sm:flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="text-white font-bold text-sm hover:text-orange-300"
                >
                  Dashboard
                </Link>
                <Link
                  href="/tryouts"
                  className="text-orange-400 font-bold text-sm hover:text-orange-300"
                >
                  Tryouts
                </Link>
                <Link
                  href="/leaderboard"
                  className="text-white font-bold text-sm hover:text-orange-300"
                >
                  Leaderboard
                </Link>
                <Link
                  href="/lessons"
                  className="text-white font-bold text-sm hover:text-orange-300"
                >
                  Materi
                </Link>
              </div>

              <div className="flex items-center space-x-2">
                <Link
                  href="/profile"
                  className="bg-orange-500 text-white px-2 sm:px-3 py-1 sm:py-2 font-black text-xs sm:text-sm border-2 sm:border-3 border-slate-800 hover:bg-orange-600 transition-colors"
                >
                  Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 sm:p-6 md:p-8 border-3 sm:border-4 border-slate-800 shadow-brutal transform hover:rotate-1 transition-all duration-300">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-4 uppercase">
                🎯 TRYOUT UTBK
              </h1>
              <p className="text-sm sm:text-base md:text-lg font-bold opacity-90 mb-3 sm:mb-4">
                Pilih tryout terbaik untuk persiapan UTBK impianmu
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
                <div className="bg-white text-orange-600 px-3 sm:px-4 py-2 border-3 border-slate-800 font-black text-xs sm:text-sm">
                  🎓 {allTryouts.length} TRYOUT TERSEDIA
                </div>
                <div className="bg-emerald-400 text-slate-900 px-3 sm:px-4 py-2 border-3 border-slate-800 font-black text-xs sm:text-sm">
                  🆓 {allTryouts.filter((t) => t.type === "free").length} GRATIS
                </div>
                <div className="bg-yellow-400 text-slate-900 px-3 sm:px-4 py-2 border-3 border-slate-800 font-black text-xs sm:text-sm">
                  💎 {allTryouts.filter((t) => t.type === "premium").length}{" "}
                  PREMIUM
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 sm:mb-8 space-y-4 sm:space-y-6">
          {/* Search Bar */}
          <div className="bg-white border-3 sm:border-4 border-slate-800 p-3 sm:p-4 shadow-brutal">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="🔍 Cari tryout, mata pelajaran, atau instruktur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 bg-blue-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-blue-100 focus:border-blue-500 transition-colors text-sm sm:text-base"
                />
              </div>
              <button className="bg-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 font-black text-sm sm:text-base border-3 border-slate-800 hover:bg-orange-600 transition-colors whitespace-nowrap">
                🔍 CARI
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white border-3 sm:border-4 border-slate-800 p-3 sm:p-4 shadow-brutal">
            <div className="space-y-4">
              {/* Type Filter */}
              <div>
                <h3 className="font-black text-slate-900 text-sm mb-2 uppercase">
                  📋 Tipe Tryout
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "🎯 Semua", count: allTryouts.length },
                    {
                      id: "free",
                      label: "🆓 Gratis",
                      count: allTryouts.filter((t) => t.type === "free").length,
                    },
                    {
                      id: "premium",
                      label: "💎 Premium",
                      count: allTryouts.filter((t) => t.type === "premium")
                        .length,
                    },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-3 sm:px-4 py-2 font-black text-xs sm:text-sm uppercase border-2 sm:border-3 border-slate-800 transition-all duration-200 ${
                        activeFilter === filter.id
                          ? "bg-orange-500 text-white transform -rotate-1 -translate-y-1"
                          : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                      }`}
                    >
                      {filter.label} ({filter.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject Filter */}
              <div>
                <h3 className="font-black text-slate-900 text-sm mb-2 uppercase">
                  📚 Kategori
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "🎯 Semua" },
                    { id: "saintek", label: "🔬 Saintek" },
                    { id: "soshum", label: "📜 Soshum" },
                    { id: "tps", label: "🧠 TPS" },
                    { id: "campuran", label: "🌐 Campuran" },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedSubject(filter.id)}
                      className={`px-3 sm:px-4 py-2 font-black text-xs sm:text-sm uppercase border-2 border-slate-800 transition-all duration-200 ${
                        selectedSubject === filter.id
                          ? "bg-blue-500 text-white transform rotate-1 -translate-y-1"
                          : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-black text-slate-900 text-sm mb-2 uppercase">
                  💰 Harga
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "💳 Semua" },
                    { id: "free", label: "🆓 Gratis" },
                    { id: "cheap", label: "💵 ≤ 50K" },
                    { id: "expensive", label: "💎 > 50K" },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setPriceRange(filter.id)}
                      className={`px-3 sm:px-4 py-2 font-black text-xs sm:text-sm uppercase border-2 border-slate-800 transition-all duration-200 ${
                        priceRange === filter.id
                          ? "bg-emerald-500 text-white transform -rotate-1 -translate-y-1"
                          : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <h3 className="font-black text-slate-900 text-sm mb-2 uppercase">
                  ⚡ Tingkat Kesulitan
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "🎯 Semua" },
                    { id: "Mudah", label: "😊 Mudah" },
                    { id: "Sedang", label: "🤔 Sedang" },
                    { id: "Sulit", label: "😤 Sulit" },
                    { id: "Sangat Sulit", label: "💀 Sangat Sulit" },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setDifficulty(filter.id)}
                      className={`px-3 sm:px-4 py-2 font-black text-xs sm:text-sm uppercase border-2 border-slate-800 transition-all duration-200 ${
                        difficulty === filter.id
                          ? "bg-purple-500 text-white transform rotate-1 -translate-y-1"
                          : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 sm:mb-6">
          <div className="bg-slate-900 text-white px-4 py-2 border-3 border-slate-800 inline-block font-black text-sm">
            📊 Menampilkan {filteredTryouts.length} dari {allTryouts.length}{" "}
            tryout
          </div>
        </div>

        {/* Tryouts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredTryouts.map((tryout) => (
            <div
              key={tryout.id}
              className="bg-white border-3 sm:border-4 border-slate-800 shadow-brutal hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:rotate-1"
            >
              {/* Card Header */}
              <div className="p-4 sm:p-6 border-b-3 border-slate-800 bg-gradient-to-r from-slate-50 to-slate-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {tryout.isPopular && (
                        <div className="bg-yellow-400 text-slate-900 px-2 py-1 border-2 border-slate-800 font-black text-xs transform -rotate-3">
                          🔥 POPULER
                        </div>
                      )}
                      <div
                        className={`px-2 py-1 border-2 border-slate-800 font-black text-xs ${
                          tryout.type === "free"
                            ? "bg-emerald-400 text-slate-900"
                            : "bg-orange-400 text-slate-900"
                        }`}
                      >
                        {tryout.type === "free" ? "GRATIS" : "PREMIUM"}
                      </div>
                    </div>
                    <h3 className="font-black text-sm sm:text-base text-slate-900 mb-2 leading-tight">
                      {tryout.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-bold mb-2">
                      📚 {tryout.subject}
                    </p>
                    <p className="text-xs text-slate-500 font-bold">
                      👨‍🏫 {tryout.instructor}
                    </p>
                  </div>
                  <div className="text-right ml-3">
                    {tryout.price === 0 ? (
                      <div className="font-black text-lg text-emerald-600">
                        GRATIS
                      </div>
                    ) : (
                      <div>
                        <div className="font-black text-lg text-slate-900">
                          Rp {tryout.price.toLocaleString()}
                        </div>
                        {tryout.discount > 0 && (
                          <div className="text-xs text-slate-500 line-through font-bold">
                            Rp {tryout.originalPrice.toLocaleString()}
                          </div>
                        )}
                        {tryout.discount > 0 && (
                          <div className="bg-red-500 text-white px-2 py-1 text-xs font-black border border-slate-800 mt-1">
                            -{tryout.discount}%
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-600 mb-3">
                  <div>⏱️ {tryout.duration}</div>
                  <div>📝 {tryout.questions} soal</div>
                  <div>👥 {tryout.participants.toLocaleString()}</div>
                  <div>⭐ {tryout.rating}/5.0</div>
                </div>

                <div
                  className={`text-xs font-bold px-2 py-1 border-2 border-slate-800 inline-block ${getDifficultyColor(
                    tryout.difficulty
                  )}`}
                >
                  {tryout.difficulty}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-6">
                <p className="text-xs sm:text-sm text-slate-600 font-bold mb-4 leading-relaxed">
                  {tryout.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="font-black text-xs text-slate-900 mb-2 uppercase">
                    ✨ Fitur Unggulan
                  </h4>
                  <div className="grid grid-cols-2 gap-1">
                    {tryout.features.map((feature, index) => (
                      <div
                        key={index}
                        className="text-xs font-bold text-slate-600 flex items-center"
                      >
                        <span className="w-1 h-1 bg-orange-400 rounded-full mr-2"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deadline */}
                <div className="mb-4">
                  {tryout.deadline ? (
                    <div className="bg-red-100 border-2 border-red-400 p-2 text-center">
                      <p className="text-xs font-black text-red-800">
                        ⏰ Deadline: {tryout.deadline}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-emerald-100 border-2 border-emerald-400 p-2 text-center">
                      <p className="text-xs font-black text-emerald-800">
                        ♾️ Akses Selamanya - Tanpa Batas Waktu
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    className={`w-full px-4 py-3 font-black text-sm border-3 border-slate-800 transition-all duration-200 transform hover:-translate-y-1 ${
                      tryout.type === "free"
                        ? "bg-emerald-500 text-white hover:bg-emerald-600"
                        : "bg-orange-500 text-white hover:bg-orange-600"
                    }`}
                  >
                    {tryout.type === "free"
                      ? "🎯 MULAI GRATIS"
                      : "💳 BELI AKSES SELAMANYA"}
                  </button>

                  <button className="w-full bg-slate-900 text-white px-4 py-2 font-black text-xs border-2 border-slate-800 hover:bg-slate-800 transition-colors">
                    📋 LIHAT DETAIL
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTryouts.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white border-3 border-slate-800 p-8 shadow-brutal">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-xl font-black text-slate-900 mb-2 uppercase">
                Tidak Ada Tryout Ditemukan
              </h3>
              <p className="text-slate-600 font-bold mb-4">
                Coba ubah filter atau kata kunci pencarian
              </p>
              <button
                onClick={() => {
                  setActiveFilter("all");
                  setSelectedSubject("all");
                  setPriceRange("all");
                  setDifficulty("all");
                  setSearchQuery("");
                }}
                className="bg-orange-500 text-white px-6 py-3 font-black text-sm border-3 border-slate-800 hover:bg-orange-600 transition-colors"
              >
                🔄 RESET FILTER
              </button>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-8 sm:mt-12">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 sm:p-8 border-3 sm:border-4 border-slate-800 shadow-brutal text-center">
            <h2 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4 uppercase">
              🎯 Belum Menemukan Tryout yang Cocok?
            </h2>
            <p className="text-sm sm:text-base font-bold opacity-90 mb-4 sm:mb-6">
              Hubungi tim kami untuk rekomendasi tryout sesuai target PTN
              impianmu
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="bg-white text-purple-600 px-6 py-3 font-black text-sm border-3 border-slate-800 hover:bg-purple-50 transition-colors">
                💬 KONSULTASI GRATIS
              </button>
              <button className="bg-yellow-400 text-slate-900 px-6 py-3 font-black text-sm border-3 border-slate-800 hover:bg-yellow-300 transition-colors">
                📞 HUBUNGI MENTOR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
