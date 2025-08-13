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

export default function TryoutsPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState({
    name: "User",
    avatar: "👨‍🎓",
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
          });
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
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

  const resetFilters = () => {
    setActiveFilter("all");
    setSelectedSubject("all");
    setPriceRange("all");
    setDifficulty("all");
    setSearchQuery("");
  };

  const filteredTryouts = getFilteredTryouts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 pb-20 md:pb-0">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <HeaderNavigation
          showBackButton={true}
          backButtonText="Kembali ke Dashboard"
          backButtonHref="/dashboard"
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
          totalTryouts={allTryouts.length}
          freeTryouts={allTryouts.filter((t) => t.type === "free").length}
          premiumTryouts={allTryouts.filter((t) => t.type === "premium").length}
        />

        {/* Search and Filters */}
        <SearchAndFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          totalTryouts={allTryouts.length}
          freeTryouts={allTryouts.filter((t) => t.type === "free").length}
          premiumTryouts={allTryouts.filter((t) => t.type === "premium").length}
        />

        {/* Results Count */}
        <ResultsCount
          filteredCount={filteredTryouts.length}
          totalCount={allTryouts.length}
        />

        {/* Tryouts Grid */}
        <TryoutsGrid tryouts={filteredTryouts} />

        {/* No Results */}
        {filteredTryouts.length === 0 && (
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
