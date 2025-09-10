"use client";

interface Stats {
  totalTryouts: number;
  averageScore: number;
  discussionsCreated: number;
}

interface StatsGridProps {
  stats: Stats;
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
      <div className="bg-white border-3 border-slate-800 p-3 sm:p-4 md:p-6 shadow-brutal transform hover:-rotate-1 hover:-translate-y-1 transition-all duration-200">
        <div className="text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-400 border-3 border-slate-800 mx-auto mb-2 sm:mb-3 flex items-center justify-center font-black text-lg sm:text-xl">
            📝
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 mb-1">
            {stats.totalTryouts}
          </p>
          <p className="text-xs sm:text-sm font-bold text-slate-600 uppercase">
            Total Tryouts
          </p>
        </div>
      </div>

      <div className="bg-white border-3 border-slate-800 p-3 sm:p-4 md:p-6 shadow-brutal transform hover:rotate-1 hover:-translate-y-1 transition-all duration-200">
        <div className="text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-400 border-3 border-slate-800 mx-auto mb-2 sm:mb-3 flex items-center justify-center font-black text-lg sm:text-xl">
            🎯
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 mb-1">
            {stats.averageScore}
          </p>
          <p className="text-xs sm:text-sm font-bold text-slate-600 uppercase">
            Rata-rata Skor
          </p>
        </div>
      </div>

      <div className="bg-white border-3 border-slate-800 p-3 sm:p-4 md:p-6 shadow-brutal transform hover:rotate-1 hover:-translate-y-1 transition-all duration-200">
        <div className="text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-400 border-3 border-slate-800 mx-auto mb-2 sm:mb-3 flex items-center justify-center font-black text-lg sm:text-xl">
            💬
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 mb-1">
            {stats.discussionsCreated}
          </p>
          <p className="text-xs sm:text-sm font-bold text-slate-600 uppercase">
            Diskusi Dibuat
          </p>
        </div>
      </div>
    </div>
  );
}
