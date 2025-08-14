"use client";

interface RegionalStat {
  region: string;
  participants: number;
  averageScore: number;
  topSchool: string;
  color: string;
}

interface SideStatsProps {
  regionalStats: RegionalStat[];
  currentLeaderboardLength: number;
}

export default function SideStats({ regionalStats, currentLeaderboardLength }: SideStatsProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Regional Stats */}
      <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
        <h3 className="font-black text-lg sm:text-xl text-slate-900 uppercase mb-4 sm:mb-6">
          📍 Statistik Regional
        </h3>

        <div className="space-y-3 sm:space-y-4">
          {regionalStats.map((region, index) => (
            <div
              key={index}
              className={`${region.color} border-2 border-slate-800 p-3 sm:p-4 transform hover:-rotate-1 transition-all duration-200`}
            >
              <h4 className="font-black text-sm text-slate-900 mb-2">
                {region.region}
              </h4>
              <div className="space-y-1 text-xs font-bold text-slate-800">
                <div>
                  👥 {region.participants.toLocaleString()} peserta
                </div>
                <div>📊 Rata-rata: {region.averageScore}</div>
                <div>🏫 Terbaik: {region.topSchool}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Stats */}
      <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
        <h3 className="font-black text-lg sm:text-xl text-slate-900 uppercase mb-4 sm:mb-6">
          🎯 Statistik Pencapaian
        </h3>

        <div className="space-y-4">
          <div className="bg-yellow-100 border-2 border-yellow-400 p-3 text-center">
            <div className="text-2xl mb-1">🏆</div>
            <div className="font-black text-sm text-slate-900">
              Skor Tertinggi
            </div>
            <div className="text-lg font-black text-yellow-700">987</div>
          </div>

          <div className="bg-blue-100 border-2 border-blue-400 p-3 text-center">
            <div className="text-2xl mb-1">📊</div>
            <div className="font-black text-sm text-slate-900">
              Rata-rata Global
            </div>
            <div className="text-lg font-black text-blue-700">78.5</div>
          </div>

          <div className="bg-emerald-100 border-2 border-emerald-400 p-3 text-center">
            <div className="text-2xl mb-1">👥</div>
            <div className="font-black text-sm text-slate-900">
              Total Peserta
            </div>
            <div className="text-lg font-black text-emerald-700">
              125K+
            </div>
          </div>
        </div>
      </div>

      {/* Your Rank Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
        <h3 className="font-black text-lg sm:text-xl uppercase mb-4">
          🎯 Peringkat Anda
        </h3>

        <div className="text-center">
          <div className="text-3xl sm:text-4xl mb-2">👨‍🎓</div>
          <div className="font-black text-xl sm:text-2xl mb-2">#1</div>
          <div className="text-sm font-bold opacity-90 mb-3">
            dari {currentLeaderboardLength} peserta
          </div>
          <div className="bg-white text-slate-900 px-3 py-2 border-2 border-slate-800 font-black text-xs">
            TOP 1%
          </div>
        </div>
      </div>
    </div>
  );
}
