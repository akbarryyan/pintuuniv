"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import HeaderNavigation from "@/components/HeaderNavigation";
import BottomNavigation from "@/components/BottomNavigation";
import MobileFriendlyHeader from "@/components/MobileFriendlyHeader";
import { HeaderSection, TabNavigation, TabContent } from "@/components/profile";

export default function ProfilePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    grade: "",
    avatar: "👨‍🎓",
    joinDate: "",
    subscription: "free",
    subscriptionExpiry: "",
    targetUniversity: "",
    targetMajor: "",
    utbkTarget: 650,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const [achievements] = useState([
    {
      id: 1,
      title: "Top Performer",
      description: "Skor tertinggi bulan ini",
      icon: "🏆",
      date: "Juli 2025",
      color: "bg-yellow-400",
    },
    {
      id: 2,
      title: "Consistency Master",
      description: "Belajar 30 hari berturut-turut",
      icon: "🔥",
      date: "Juli 2025",
      color: "bg-orange-400",
    },
    {
      id: 3,
      title: "Math Expert",
      description: "Nilai rata-rata Matematika 90+",
      icon: "🧮",
      date: "Juni 2025",
      color: "bg-blue-400",
    },
    {
      id: 4,
      title: "Speed Demon",
      description: "Menyelesaikan tryout tercepat",
      icon: "⚡",
      date: "Juni 2025",
      color: "bg-emerald-400",
    },
  ]);

  const [subscriptionHistory] = useState([
    {
      id: 1,
      plan: "Premium",
      duration: "3 Bulan",
      price: 297000,
      startDate: "15 Mei 2025",
      endDate: "15 Agustus 2025",
      status: "active",
    },
    {
      id: 2,
      plan: "Pro",
      duration: "1 Bulan",
      price: 99000,
      startDate: "15 April 2025",
      endDate: "15 Mei 2025",
      status: "expired",
    },
    {
      id: 3,
      plan: "Basic",
      duration: "1 Bulan",
      price: 49000,
      startDate: "15 Maret 2025",
      endDate: "15 April 2025",
      status: "expired",
    },
  ]);

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReport: true,
    studyReminder: true,
    examReminder: true,
    marketingEmails: false,
  });

  // Generate a reasonable join date for existing users
  const generateJoinDate = () => {
    // For demo purposes, use current date if no join date exists
    const today = new Date();
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    return `${today.getDate()} ${
      months[today.getMonth()]
    } ${today.getFullYear()}`;
  };

  // Format created_at date to Indonesian format
  const formatCreatedAt = (createdAt: string) => {
    // Handle both string and Date formats
    const date = new Date(createdAt);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.error("Invalid date:", createdAt);
      return generateJoinDate(); // fallback
    }

    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Load user data from localStorage on component mount
  useEffect(() => {
    setMounted(true);

    const loadUserData = () => {
      try {
        if (typeof window !== "undefined") {
          const storedUserData = localStorage.getItem("userData");
          const storedAuthToken = localStorage.getItem("authToken");

          // Check if user is logged in
          if (!storedAuthToken || !storedUserData) {
            toast.error("Silakan login terlebih dahulu");
            router.push("/login");
            return;
          }

          if (storedUserData) {
            const parsedData = JSON.parse(storedUserData);

            // Debug logging
            console.log("Profile page - stored userData:", parsedData);
            console.log("Profile page - createdAt:", parsedData.createdAt);
            console.log(
              "Profile page - existing joinDate:",
              parsedData.joinDate
            );

            // Always prioritize createdAt from database if available
            let joinDate = parsedData.joinDate;

            // Force use createdAt if available (this is the most accurate)
            if (parsedData.createdAt) {
              const formattedDate = formatCreatedAt(parsedData.createdAt);
              console.log("Profile page - createdAt formatted:", formattedDate);
              joinDate = formattedDate;

              // Always update localStorage with correct date from createdAt
              if (parsedData.joinDate !== formattedDate) {
                console.log("Profile page - updating joinDate from createdAt");
                const updatedUserData = {
                  ...parsedData,
                  joinDate: formattedDate,
                };
                localStorage.setItem(
                  "userData",
                  JSON.stringify(updatedUserData)
                );
              }
            } else if (!joinDate) {
              // Only fallback to generated date if no createdAt and no existing joinDate
              console.log("Profile page - no createdAt, using generated date");
              joinDate = generateJoinDate();
              const updatedUserData = { ...parsedData, joinDate };
              localStorage.setItem("userData", JSON.stringify(updatedUserData));
            }

            console.log("Profile page - final joinDate:", joinDate);

            // Set user data with fallback values - menggunakan data dari database
            setUserData({
              name: parsedData.name || "User",
              email: parsedData.email || "",
              phone: parsedData.phone || "Belum diset",
              school: parsedData.school || "Belum diset",
              grade: parsedData.grade || "Belum diset",
              avatar: parsedData.avatar || "👨‍🎓",
              joinDate: joinDate,
              subscription: parsedData.subscriptionType || "free",
              subscriptionExpiry: parsedData.subscriptionExpiry || "Tidak ada",
              targetUniversity: parsedData.targetUniversity || "Belum diset",
              targetMajor: parsedData.targetMajor || "Belum diset",
              utbkTarget: parsedData.utbkTarget || 0,
            });

            // Tarik data terbaru dari server agar sinkron dengan database
            try {
              const freshToken = localStorage.getItem("authToken");
              if (freshToken) {
                fetch("/api/profile", {
                  headers: { Authorization: `Bearer ${freshToken}` },
                })
                  .then((res) => res.json())
                  .then((resp) => {
                    if (resp?.success && resp.user) {
                      const server = resp.user;
                      const existing = (() => {
                        try {
                          return JSON.parse(
                            localStorage.getItem("userData") || "{}"
                          );
                        } catch {
                          return {};
                        }
                      })();

                      const merged = {
                        ...existing,
                        ...server,
                        // Pastikan grade bertipe string seperti yang UI harapkan
                        grade: server.grade
                          ? String(server.grade)
                          : existing.grade,
                        // Pertahankan joinDate yang sudah diformat
                        joinDate,
                      };

                      localStorage.setItem("userData", JSON.stringify(merged));

                      setUserData({
                        name: merged.name || "User",
                        email: merged.email || "",
                        phone: merged.phone || "Belum diset",
                        school: merged.school || "Belum diset",
                        grade: merged.grade || "Belum diset",
                        avatar: merged.avatar || "👨‍🎓",
                        joinDate,
                        subscription: merged.subscriptionType || "free",
                        subscriptionExpiry:
                          merged.subscriptionExpiry || "Tidak ada",
                        targetUniversity:
                          merged.targetUniversity || "Belum diset",
                        targetMajor: merged.targetMajor || "Belum diset",
                        utbkTarget: merged.utbkTarget || 0,
                      });
                    }
                  })
                  .catch((err) =>
                    console.error(
                      "Profile page - fetch /api/profile error:",
                      err
                    )
                  );
              }
            } catch (e) {
              console.error("Profile page - failed to refresh from server", e);
            }
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
  }, [router]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Get auth token
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        toast.error("Sesi login telah berakhir. Silakan login ulang.");
        router.push("/login");
        return;
      }

      // Prepare data for API
      const profileData = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        school: userData.school,
        grade: userData.grade,
        avatar: userData.avatar,
        targetUniversity: userData.targetUniversity,
        targetMajor: userData.targetMajor,
        utbkTarget: userData.utbkTarget,
      };

      // Send update request to API
      const response = await fetch("/api/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (data.success) {
        // Update localStorage with the latest data from server
        const existingData = localStorage.getItem("userData");
        if (existingData) {
          const parsedData = JSON.parse(existingData);
          const updatedData = {
            ...parsedData,
            ...data.user, // Use server response data
            joinDate: userData.joinDate, // Preserve join date formatting
          };
          localStorage.setItem("userData", JSON.stringify(updatedData));
        }

        toast.success("Profile berhasil diperbarui! 🎉");
        setIsEditing(false);
      } else {
        toast.error(data.message || "Gagal menyimpan perubahan");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Terjadi kesalahan jaringan. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Debug function to clear stored data and force re-login
  const handleRefreshUserData = () => {
    toast("Reset data user?", {
      description:
        "Data user akan dihapus dan Anda harus login ulang untuk mendapatkan data terbaru.",
      action: {
        label: "Reset",
        onClick: () => {
          // Clear stored data
          if (typeof window !== "undefined") {
            localStorage.removeItem("authToken");
            localStorage.removeItem("userData");
            // Clear auth-token cookie
            document.cookie =
              "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          }
          toast.success("Data direset! Silakan login ulang.");
          setTimeout(() => {
            router.push("/login");
          }, 1000);
        },
      },
      cancel: {
        label: "Batal",
        onClick: () => toast.dismiss(),
      },
    });
  };

  // Logout function
  const handleLogout = () => {
    toast("Yakin ingin logout?", {
      description: "Anda akan keluar dari akun dan kembali ke halaman utama.",
      action: {
        label: "Logout",
        onClick: () => {
          // Panggil endpoint server untuk hapus cookie HttpOnly & sesi
          fetch("/api/auth/logout", { method: "POST" })
            .catch(() => {})
            .finally(() => {
              // Clear stored data di client
              if (typeof window !== "undefined") {
                localStorage.removeItem("authToken");
                localStorage.removeItem("userData");
                // Best-effort: clear non-HttpOnly cookie jika ada
                document.cookie =
                  "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              }

              toast.success("Logout berhasil! Sampai jumpa lagi! 👋");

              // Redirect ke halaman utama
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

  // Loading state - AFTER ALL HOOKS
  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-emerald-50 to-purple-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 pb-20 md:pb-0">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <HeaderNavigation
          currentPage="profile"
          userInfo={{
            name: userData.name,
            avatar: userData.avatar,
          }}
          onLogout={handleLogout}
        />
      </div>

      {/* Mobile Header */}
      <div className="block md:hidden">
        <MobileFriendlyHeader
          userInfo={{
            name: userData.name,
            avatar: userData.avatar,
          }}
          showMobileMenu={false}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <HeaderSection userData={userData} />

        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        <TabContent
          activeTab={activeTab}
          userData={userData}
          achievements={achievements}
          subscriptionHistory={subscriptionHistory}
          preferences={preferences}
          isEditing={isEditing}
          isSaving={isSaving}
          onEdit={() => setIsEditing(true)}
          onCancel={() => setIsEditing(false)}
          onSave={handleSave}
          onUserDataChange={(field, value) => setUserData({ ...userData, [field]: value })}
          onPreferenceChange={handlePreferenceChange}
          onLogout={handleLogout}
          onRefreshUserData={handleRefreshUserData}
        />


      </div>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNavigation currentPage="profile" />
    </div>
  );
}
