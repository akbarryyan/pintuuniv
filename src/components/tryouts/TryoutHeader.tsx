"use client";

interface TryoutHeaderProps {
  totalTryouts: number;
  freeTryouts: number;
  premiumTryouts: number;
}

export default function TryoutHeader({
  totalTryouts,
  freeTryouts,
  premiumTryouts,
}: TryoutHeaderProps) {
  return (
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
              🎓 {totalTryouts} TRYOUT TERSEDIA
            </div>
            <div className="bg-emerald-400 text-slate-900 px-3 sm:px-4 py-2 border-3 border-slate-800 font-black text-xs sm:text-sm">
              🆓 {freeTryouts} GRATIS
            </div>
            <div className="bg-yellow-400 text-slate-900 px-3 sm:px-4 py-2 border-3 border-slate-800 font-black text-xs sm:text-sm">
              💎 {premiumTryouts} PREMIUM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
