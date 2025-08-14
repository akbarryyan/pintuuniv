"use client";

interface UserData {
  name: string;
  school: string;
  grade: string;
  avatar: string;
  joinDate: string;
  subscription: string;
  subscriptionExpiry: string;
}

interface ProfileHeaderSectionProps {
  userData: UserData;
}

export default function ProfileHeaderSection({ userData }: ProfileHeaderSectionProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 sm:p-6 md:p-8 border-3 sm:border-4 border-slate-800 shadow-brutal transform hover:rotate-1 transition-all duration-300">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border-3 border-slate-800 rounded-full flex items-center justify-center text-2xl sm:text-3xl mr-4 sm:mr-6 shadow-lg">
              {userData.avatar}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black mb-1 sm:mb-2 uppercase">
                {userData.name}
              </h1>
              <p className="text-sm sm:text-base font-bold opacity-90">
                {userData.school || "Belum diset"} -{" "}
                {userData.grade ? `Kelas ${userData.grade}` : "Belum diset"}
              </p>
              <p className="text-xs sm:text-sm font-medium opacity-80">
                Bergabung sejak {userData.joinDate}
              </p>
            </div>
          </div>
          <div className="text-center">
            <div
              className={`px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 shadow-brutal transform -rotate-3 ${
                userData.subscription === "premium"
                  ? "bg-yellow-400"
                  : userData.subscription === "pro"
                  ? "bg-orange-400"
                  : "bg-blue-400"
              } text-slate-900`}
            >
              <p className="font-black text-xs sm:text-sm uppercase">Status</p>
              <p className="text-lg sm:text-xl font-black">
                {userData.subscription === "premium"
                  ? "PREMIUM"
                  : userData.subscription === "pro"
                  ? "PRO"
                  : "FREE"}
              </p>
              <p className="text-xs font-bold">
                {userData.subscriptionExpiry &&
                userData.subscriptionExpiry !== "Tidak ada"
                  ? `Sampai ${userData.subscriptionExpiry}`
                  : "Tidak ada batas waktu"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
