"use client";

import Image from "next/image";

interface UserData {
  name: string;
  email: string;
  school: string;
  grade: string;
  subscriptionType: string;
  targetUniversity: string;
}

interface WelcomeSectionProps {
  userData: UserData;
}

export default function WelcomeSection({ userData }: WelcomeSectionProps) {
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

  return (
    <div className="mb-6 sm:mb-8">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 sm:p-6 md:p-8 border-3 sm:border-4 border-slate-800 shadow-brutal transform hover:rotate-1 transition-all duration-300">
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-start">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-3 uppercase leading-tight">
              Selamat Datang Kembali! 👋
            </h1>
            <p className="text-base sm:text-xl font-bold mb-1 sm:mb-2 truncate">
              {userData.name}
            </p>
            <p className="text-xs sm:text-base font-medium opacity-90 mb-3 leading-relaxed">
              <span className="block sm:inline">{userData.email}</span>
              <span className="hidden sm:inline"> • </span>
              <span className="block sm:inline">
                {userData.school || "Sekolah belum diset"} - Kelas{" "}
                {userData.grade}
              </span>
            </p>
            <div className="flex items-center justify-start">
              <span
                className={`px-2 py-1 text-xs font-black border-2 border-slate-800 inline-block ${
                  userData.subscriptionType === "premium"
                    ? "bg-yellow-400 text-slate-900"
                    : "bg-gray-300 text-slate-900"
                }`}
              >
                {userData.subscriptionType === "premium"
                  ? "🌟 PREMIUM"
                  : "🆓 FREE"}
              </span>
            </div>
          </div>

          {/* Target University Card - Redesigned for mobile */}
          <div className="flex-shrink-0 w-full sm:w-auto">
            <div className="bg-white p-3 sm:p-4 border-3 border-slate-800 shadow-brutal transform -rotate-1 hover:-rotate-2 transition-all duration-300 mx-auto sm:mx-0 max-w-[280px] sm:max-w-[180px]">
              <div className="flex items-center sm:flex-col sm:text-center space-x-3 sm:space-x-0 sm:space-y-2">
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 border-2 border-slate-800 bg-white overflow-hidden">
                  <Image
                    src={
                      targetUniversities[
                        userData.targetUniversity as keyof typeof targetUniversities
                      ]?.logo || "/university/ui.png"
                    }
                    alt={
                      targetUniversities[
                        userData.targetUniversity as keyof typeof targetUniversities
                      ]?.name || "Universitas Indonesia"
                    }
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback jika gambar error
                      const target = e.target as HTMLImageElement;
                      target.src = "/university/ui.png";
                    }}
                  />
                </div>
                <div className="flex-1 sm:flex-none">
                  <p className="font-black text-xs sm:text-sm uppercase text-slate-900 mb-1">
                    🎯 Target Kampus
                  </p>
                  <p className="font-black text-xs sm:text-sm text-slate-900 leading-tight mb-2">
                    {targetUniversities[
                      userData.targetUniversity as keyof typeof targetUniversities
                    ]?.name
                      .split(" ")
                      .slice(0, 2)
                      .join(" ") || "Universitas Indonesia"}
                  </p>
                  <div
                    className={`px-2 py-1 border-2 border-slate-800 text-xs font-black text-white inline-block ${
                      targetUniversities[
                        userData.targetUniversity as keyof typeof targetUniversities
                      ]?.color || "bg-yellow-400"
                    }`}
                  >
                    IMPIAN!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
