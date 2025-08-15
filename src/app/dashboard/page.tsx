"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import HeaderNavigation from "@/components/HeaderNavigation";
import MobileFriendlyHeader from "@/components/MobileFriendlyHeader";
import BottomNavigation from "@/components/BottomNavigation";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import StatsGrid from "@/components/dashboard/StatsGrid";
import RecentActivities from "@/components/dashboard/RecentActivities";
import ProgressTracking from "@/components/dashboard/ProgressTracking";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import AvailableTryouts from "@/components/dashboard/AvailableTryouts";
import UpcomingTryouts from "@/components/dashboard/UpcomingTryouts";

export default function DashboardPage() {
  const router = useRouter();

  // ALL HOOKS MUST BE DECLARED AT THE TOP LEVEL BEFORE ANY CONDITIONAL RETURNS
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    school: "",
    grade: "",
    avatar: "👨‍🎓",
    subscriptionType: "free",
    targetUniversity: "ui", // Default target university
    targetMajor: "", // Default target major
  });
  const [isLoading, setIsLoading] = useState(true);

  // Target Universities Data
  const targetUniversities = {
    ui: {
      name: "Universitas Indonesia",
      logo: "/university/ui.png",
      color: "bg-yellow-400",
    },
    ugm: {
      name: "Universitas Gadjah Mada",
      logo: "/university/ugm.png",
      color: "bg-yellow-500",
    },
    itb: {
      name: "Institut Teknologi Bandung",
      logo: "/university/itb.png",
      color: "bg-blue-500",
    },
    its: {
      name: "Institut Teknologi Sepuluh Nopember",
      logo: "/university/its.png",
      color: "bg-blue-600",
    },
    ipb: {
      name: "Institut Pertanian Bogor",
      logo: "/university/ipb.png",
      color: "bg-green-500",
    },
    unair: {
      name: "Universitas Airlangga",
      logo: "/university/unair.png",
      color: "bg-blue-400",
    },
    undip: {
      name: "Universitas Diponegoro",
      logo: "/university/undip.png",
      color: "bg-blue-700",
    },
    unhas: {
      name: "Universitas Hasanuddin",
      logo: "/university/unhas.png",
      color: "bg-red-500",
    },
    unpad: {
      name: "Universitas Padjadjaran",
      logo: "/university/unpad.webp",
      color: "bg-green-600",
    },
    unsri: {
      name: "Universitas Sriwijaya",
      logo: "/university/unsri.jpg",
      color: "bg-red-600",
    },
    usu: {
      name: "Universitas Sumatera Utara",
      logo: "/university/usu.svg",
      color: "bg-green-700",
    },
    unand: {
      name: "Universitas Andalas",
      logo: "/university/unand.jpg",
      color: "bg-orange-500",
    },
  };

  const [stats] = useState({
    totalTryouts: 0,
    averageScore: 0,
    completedLessons: 0,
    achievements: 12,
    studyStreak: 0,
    rank: 0,
    totalStudents: 1247,
  });

  const [recentActivities] = useState<
    {
      id: number;
      title: string;
      date: string;
      type: string;
      score?: number;
      status?: string;
      progress?: number;
    }[]
  >([
    // Empty for new users - will be populated from API later
  ]);

  const [upcomingEvents] = useState([
    {
      id: 1,
      title: "Tryout UTBK Nasional #5",
      date: "Minggu, 3 Agustus 2025",
      time: "09:00 - 12:00",
      participants: 2547,
    },
    {
      id: 2,
      title: "Webinar: Tips Lolos PTN Favorit",
      date: "Senin, 4 Agustus 2025",
      time: "19:00 - 21:00",
      participants: 892,
    },
    {
      id: 3,
      title: "Live Class: Strategi UTBK 2025",
      date: "Rabu, 6 Agustus 2025",
      time: "20:00 - 22:00",
      participants: 1205,
    },
  ]);

  // Available Tryouts Data
  const [availableTryouts] = useState([
    {
      id: 1,
      title: "Tryout UTBK Saintek Premium",
      subject: "Matematika, Fisika, Kimia, Biologi",
      duration: "180 menit",
      questions: 120,
      price: 49000,
      type: "premium",
      difficulty: "Sulit",
      participants: 15420,
      rating: 4.8,
      deadline: "5 Agustus 2025",
    },
    {
      id: 2,
      title: "Tryout UTBK Soshum Gratis",
      subject: "Sejarah, Geografi, Sosiologi, Ekonomi",
      duration: "180 menit",
      questions: 120,
      price: 0,
      type: "free",
      difficulty: "Sedang",
      participants: 28547,
      rating: 4.6,
      deadline: "10 Agustus 2025",
    },
    {
      id: 3,
      title: "Tryout Simulasi UTBK Nasional",
      subject: "TPS + TKA Saintek/Soshum",
      duration: "195 menit",
      questions: 150,
      price: 99000,
      type: "premium",
      difficulty: "Sangat Sulit",
      participants: 8924,
      rating: 4.9,
      deadline: "15 Agustus 2025",
    },
    {
      id: 4,
      title: "Tryout TPS (Tes Potensi Skolastik)",
      subject: "Penalaran Umum, Kuantitatif, Bahasa",
      duration: "110 menit",
      questions: 88,
      price: 0,
      type: "free",
      difficulty: "Sedang",
      participants: 42156,
      rating: 4.5,
      deadline: "20 Agustus 2025",
    },
    {
      id: 5,
      title: "Tryout UTBK Intensif Pro",
      subject: "Semua Mata Pelajaran + Analisis AI",
      duration: "200 menit",
      questions: 160,
      price: 149000,
      type: "premium",
      difficulty: "Sangat Sulit",
      participants: 5847,
      rating: 5.0,
      deadline: "25 Agustus 2025",
    },
  ]);

  // User's Tryout History
  const [userTryouts] = useState([
    {
      id: 1,
      title: "Tryout UTBK Matematika Dasar",
      date: "29 Juli 2025",
      time: "14:30",
      score: 85,
      maxScore: 100,
      duration: "90 menit",
      status: "completed",
      rank: 245,
      totalParticipants: 3520,
      subject: "Matematika",
      type: "free",
    },
    {
      id: 2,
      title: "Tryout UTBK Bahasa Inggris",
      date: "27 Juli 2025",
      time: "16:00",
      score: 78,
      maxScore: 100,
      duration: "60 menit",
      status: "completed",
      rank: 892,
      totalParticipants: 4120,
      subject: "Bahasa Inggris",
      type: "premium",
    },
    {
      id: 3,
      title: "Tryout UTBK Fisika Premium",
      date: "25 Juli 2025",
      time: "10:00",
      score: 92,
      maxScore: 100,
      duration: "75 menit",
      status: "completed",
      rank: 89,
      totalParticipants: 2847,
      subject: "Fisika",
      type: "premium",
    },
  ]);

  const [upcomingTryouts] = useState([
    {
      id: 1,
      title: "Tryout UTBK Nasional #8",
      date: "10 Agustus 2025",
      time: "09:00",
      duration: "180 menit",
      subject: "TPS + TKA Saintek",
      questions: 150,
      price: 79000,
      type: "premium",
      status: "registered",
      reminder: "H-1",
    },
    {
      id: 2,
      title: "Simulasi UTBK Komprehensif",
      date: "12 Agustus 2025",
      time: "13:00",
      duration: "195 menit",
      subject: "Semua Mata Pelajaran",
      questions: 160,
      price: 0,
      type: "free",
      status: "available",
      reminder: "H-3",
    },
    {
      id: 3,
      title: "Tryout Intensif Matematika",
      date: "14 Agustus 2025",
      time: "15:30",
      duration: "120 menit",
      subject: "Matematika Wajib + Peminatan",
      questions: 80,
      price: 49000,
      type: "premium",
      status: "available",
      reminder: "H-5",
    },
  ]);

  // Load user data from localStorage on component mount
  useEffect(() => {
    setMounted(true);

    const loadUserData = () => {
      try {
        if (typeof window !== "undefined") {
          const storedUserData = localStorage.getItem("userData");
          const storedAuthToken = localStorage.getItem("authToken");

          // Debug logging
          console.log("Stored userData:", storedUserData);
          console.log("Stored authToken:", storedAuthToken);
          console.log("Document cookies:", document.cookie);

          if (storedUserData) {
            const parsedData = JSON.parse(storedUserData);
            console.log("Parsed user data:", parsedData);
            
            // Set initial data from localStorage
            setUserData({
              name: parsedData.name || "User",
              email: parsedData.email || "",
              school: parsedData.school || "Tidak diset",
              grade: parsedData.grade || "12",
              avatar: parsedData.avatar || "👨‍🎓",
              subscriptionType: parsedData.subscriptionType || "free",
              targetUniversity: parsedData.targetUniversity || "ui",
              targetMajor: parsedData.targetMajor || "",
            });

            // Fetch fresh data from server to ensure sync with database
            if (storedAuthToken) {
              fetch("/api/profile", {
                headers: { Authorization: `Bearer ${storedAuthToken}` },
              })
                .then((res) => res.json())
                .then((resp) => {
                  if (resp?.success && resp.user) {
                    const server = resp.user;
                    console.log("Dashboard - server data:", server);
                    console.log("Dashboard - server.targetUniversity:", server.targetUniversity);
                    console.log("Dashboard - server.targetMajor:", server.targetMajor);
                    
                    // Update localStorage with fresh data
                    const existing = JSON.parse(storedUserData);
                    const merged = {
                      ...existing,
                      ...server,
                      grade: server.grade ? String(server.grade) : existing.grade,
                    };
                    localStorage.setItem("userData", JSON.stringify(merged));
                    
                    // Update state with fresh data
                    setUserData({
                      name: merged.name || "User",
                      email: merged.email || "",
                      school: merged.school || "Tidak diset",
                      grade: merged.grade || "12",
                      avatar: merged.avatar || "👨‍🎓",
                      subscriptionType: merged.subscriptionType || "free",
                      targetUniversity: merged.targetUniversity || "ui",
                      targetMajor: merged.targetMajor || "",
                    });
                  }
                })
                .catch((err) => {
                  console.error("Dashboard - fetch /api/profile error:", err);
                });
            }
          } else {
            console.log("No userData found in localStorage");
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        if (typeof window !== "undefined") {
          toast.error("Gagal memuat data user");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  // HeaderNavigation kini menangani logout sepenuhnya

  // Loading state - AFTER ALL HOOKS
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
          currentPage="dashboard"
          userInfo={{
            name: userData.name,
            avatar: userData.avatar,
          }}
        />
      </div>
      <div className="sm:hidden">
        <MobileFriendlyHeader
          currentPage="dashboard"
          userInfo={{
            name: userData.name,
            avatar: userData.avatar,
          }}
          showMobileMenu={false}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 pb-24 sm:pb-8">
        {/* Welcome Section */}
        <WelcomeSection userData={userData} />

        {/* Stats Grid */}
        <StatsGrid stats={stats} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <RecentActivities activities={recentActivities} />

            {/* Progress Tracking Chart */}
            <ProgressTracking />
          </div>

          {/* Upcoming Events */}
          <UpcomingEvents events={upcomingEvents} stats={stats} />
        </div>

        {/* Available Tryouts Section */}
        <AvailableTryouts tryouts={availableTryouts} />

        {/* Upcoming Tryouts */}
        <UpcomingTryouts tryouts={upcomingTryouts} />
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNavigation currentPage="dashboard" />
    </div>
  );
}
