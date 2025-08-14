"use client";

interface User {
  id: number;
  rank: number;
  name: string;
  school: string;
  totalScore: number;
  totalTryouts: number;
  averageScore: number;
  avatar: string;
  badge: string;
  isCurrentUser: boolean;
}

interface MainLeaderboardProps {
  leaderboard: User[];
  activeTab: string;
}

export default function MainLeaderboard({ leaderboard, activeTab }: MainLeaderboardProps) {
  const getRankColor = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-500";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-400";
    if (rank === 3) return "bg-gradient-to-r from-orange-400 to-orange-500";
    if (rank <= 10) return "bg-gradient-to-r from-blue-400 to-blue-500";
    return "bg-gradient-to-r from-slate-400 to-slate-500";
  };

  return (
    <div className="lg:col-span-3">
      <div className="bg-white border-3 sm:border-4 border-slate-800 shadow-brutal">
        {/* Top 3 Podium */}
        <div className="p-4 sm:p-6 border-b-3 border-slate-800 bg-gradient-to-r from-blue-100 to-purple-100">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase mb-4 text-center">
            🏆 TOP 3 PERFORMERS
          </h2>

          <div className="flex justify-center items-end space-x-2 sm:space-x-4 mb-6">
            {/* 2nd Place */}
            {leaderboard[1] && (
              <div className="text-center">
                <div className="bg-gray-300 border-3 border-slate-800 p-3 sm:p-4 mb-2 transform -rotate-2 shadow-lg">
                  <div className="text-2xl sm:text-3xl mb-2">🥈</div>
                  <div className="text-xl sm:text-2xl mb-1">
                    {leaderboard[1].avatar}
                  </div>
                  <div className="font-black text-xs sm:text-sm text-slate-900">
                    {leaderboard[1].name.split(" ")[0]}
                  </div>
                  <div className="font-bold text-xs text-slate-700">
                    {activeTab === "overall"
                      ? `${leaderboard[1].averageScore?.toFixed(1)}`
                      : `${leaderboard[1].averageScore?.toFixed(1)}`}
                  </div>
                </div>
                <div className="bg-gray-400 h-16 sm:h-20 border-3 border-slate-800"></div>
              </div>
            )}

            {/* 1st Place */}
            {leaderboard[0] && (
              <div className="text-center">
                <div className="bg-yellow-400 border-3 border-slate-800 p-3 sm:p-4 mb-2 transform rotate-2 shadow-lg">
                  <div className="text-3xl sm:text-4xl mb-2">👑</div>
                  <div className="text-2xl sm:text-3xl mb-1">
                    {leaderboard[0].avatar}
                  </div>
                  <div className="font-black text-xs sm:text-sm text-slate-900">
                    {leaderboard[0].name.split(" ")[0]}
                  </div>
                  <div className="font-bold text-xs text-slate-700">
                    {activeTab === "overall"
                      ? `${leaderboard[0].averageScore?.toFixed(1)}`
                      : `${leaderboard[0].averageScore?.toFixed(1)}`}
                  </div>
                </div>
                <div className="bg-yellow-500 h-20 sm:h-24 border-3 border-slate-800"></div>
              </div>
            )}

            {/* 3rd Place */}
            {leaderboard[2] && (
              <div className="text-center">
                <div className="bg-orange-400 border-3 border-slate-800 p-3 sm:p-4 mb-2 transform rotate-1 shadow-lg">
                  <div className="text-2xl sm:text-3xl mb-2">🥉</div>
                  <div className="text-xl sm:text-2xl mb-1">
                    {leaderboard[2].avatar}
                  </div>
                  <div className="font-black text-xs sm:text-sm text-slate-900">
                    {leaderboard[2].name.split(" ")[0]}
                  </div>
                  <div className="font-bold text-xs text-slate-700">
                    {activeTab === "overall"
                      ? `${leaderboard[2].averageScore?.toFixed(1)}`
                      : `${leaderboard[2].averageScore?.toFixed(1)}`}
                  </div>
                </div>
                <div className="bg-orange-500 h-12 sm:h-16 border-3 border-slate-800"></div>
              </div>
            )}
          </div>
        </div>

        {/* Full Leaderboard List */}
        <div className="p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            {leaderboard.map((user) => (
              <div
                key={user.id}
                className={`border-2 sm:border-3 border-slate-800 p-3 sm:p-4 shadow-lg transition-all duration-200 hover:-translate-y-1 ${
                  user.isCurrentUser
                    ? "bg-gradient-to-r from-blue-100 to-purple-100 border-blue-500"
                    : "bg-white hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    {/* Rank Badge */}
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 ${getRankColor(
                        user.rank
                      )} border-2 sm:border-3 border-slate-800 flex items-center justify-center font-black text-white text-sm sm:text-base shadow-md transform -rotate-3`}
                    >
                      {user.rank}
                    </div>

                    {/* User Info */}
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="text-2xl sm:text-3xl">
                        {user.avatar}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-black text-sm sm:text-base text-slate-900">
                            {user.name}
                            {user.isCurrentUser && (
                              <span className="ml-2 bg-blue-500 text-white px-2 py-1 text-xs font-black border border-slate-800">
                                YOU
                              </span>
                            )}
                          </h3>
                          <span className="text-lg sm:text-xl">
                            {user.badge}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-slate-600">
                          {user.school}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    {activeTab === "overall" ? (
                      <div>
                        <div className="font-black text-base sm:text-lg text-slate-900">
                          {user.averageScore?.toFixed(1) || "N/A"}
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-slate-600">
                          Rata-rata
                        </div>
                        <div className="text-xs font-bold text-slate-500">
                          {user.totalTryouts} tryout
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="font-black text-base sm:text-lg text-slate-900">
                          {user.averageScore?.toFixed(1) || "N/A"}
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-slate-600">
                          Skor Tertinggi
                        </div>
                        <div className="text-xs font-bold text-slate-500">
                          {user.totalTryouts} tryout
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
