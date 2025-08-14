"use client";

interface HeaderSectionProps {
  timeFilter: string;
}

export default function HeaderSection({ timeFilter }: HeaderSectionProps) {
  const getTimeFilterText = (filter: string) => {
    switch (filter) {
      case "weekly":
        return "MINGGUAN";
      case "monthly":
        return "BULANAN";
      case "alltime":
        return "SEPANJANG MASA";
      default:
        return "BULANAN";
    }
  };

  return (
    <div className="mb-6 sm:mb-8">
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 p-4 sm:p-6 md:p-8 border-3 sm:border-4 border-slate-800 shadow-brutal transform hover:rotate-1 transition-all duration-300">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-4 uppercase">
            🏆 LEADERBOARD
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-bold opacity-90">
            Papan peringkat siswa terbaik PintuUniv
          </p>
          <div className="flex justify-center items-center mt-3 sm:mt-4">
            <div className="bg-slate-900 text-white px-3 sm:px-4 py-2 border-3 border-slate-800 font-black text-xs sm:text-sm">
              📊 {getTimeFilterText(timeFilter)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
