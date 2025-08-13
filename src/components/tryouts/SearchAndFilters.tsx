"use client";

interface SearchAndFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  priceRange: string;
  setPriceRange: (range: string) => void;
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
  totalTryouts: number;
  freeTryouts: number;
  premiumTryouts: number;
}

export default function SearchAndFilters({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  selectedSubject,
  setSelectedSubject,
  priceRange,
  setPriceRange,
  difficulty,
  setDifficulty,
  totalTryouts,
  freeTryouts,
  premiumTryouts,
}: SearchAndFiltersProps) {
  return (
    <div className="mb-6 sm:mb-8 space-y-4 sm:space-y-6">
      {/* Search Bar */}
      <div className="bg-white border-3 sm:border-4 border-slate-800 p-3 sm:p-4 shadow-brutal">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="🔍 Cari tryout, mata pelajaran, atau instruktur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 bg-blue-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-blue-100 focus:border-blue-500 transition-colors text-sm sm:text-base"
            />
          </div>
          <button className="bg-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 font-black text-sm sm:text-base border-3 border-slate-800 hover:bg-orange-600 transition-colors whitespace-nowrap">
            🔍 CARI
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-3 sm:border-4 border-slate-800 p-3 sm:p-4 shadow-brutal">
        <div className="space-y-4">
          {/* Type Filter */}
          <div>
            <h3 className="font-black text-slate-900 text-sm mb-2 uppercase">
              📋 Tipe Tryout
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "🎯 Semua", count: totalTryouts },
                {
                  id: "free",
                  label: "🆓 Gratis",
                  count: freeTryouts,
                },
                {
                  id: "premium",
                  label: "💎 Premium",
                  count: premiumTryouts,
                },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-3 sm:px-4 py-2 font-black text-xs sm:text-sm uppercase border-2 sm:border-3 border-slate-800 transition-all duration-200 ${
                    activeFilter === filter.id
                      ? "bg-orange-500 text-white transform -rotate-1 -translate-y-1"
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>
          </div>

          {/* Subject Filter */}
          <div>
            <h3 className="font-black text-slate-900 text-sm mb-2 uppercase">
              📚 Kategori
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "🎯 Semua" },
                { id: "saintek", label: "🔬 Saintek" },
                { id: "soshum", label: "📜 Soshum" },
                { id: "tps", label: "🧠 TPS" },
                { id: "campuran", label: "🌐 Campuran" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedSubject(filter.id)}
                  className={`px-3 sm:px-4 py-2 font-black text-xs sm:text-sm uppercase border-2 border-slate-800 transition-all duration-200 ${
                    selectedSubject === filter.id
                      ? "bg-blue-500 text-white transform rotate-1 -translate-y-1"
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="font-black text-slate-900 text-sm mb-2 uppercase">
              💰 Harga
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "💳 Semua" },
                { id: "free", label: "🆓 Gratis" },
                { id: "cheap", label: "💵 ≤ 50K" },
                { id: "expensive", label: "💎 > 50K" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setPriceRange(filter.id)}
                  className={`px-3 sm:px-4 py-2 font-black text-xs sm:text-sm uppercase border-2 border-slate-800 transition-all duration-200 ${
                    priceRange === filter.id
                      ? "bg-emerald-500 text-white transform -rotate-1 -translate-y-1"
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <h3 className="font-black text-slate-900 text-sm mb-2 uppercase">
              ⚡ Tingkat Kesulitan
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "🎯 Semua" },
                { id: "Mudah", label: "😊 Mudah" },
                { id: "Sedang", label: "🤔 Sedang" },
                { id: "Sulit", label: "😤 Sulit" },
                { id: "Sangat Sulit", label: "💀 Sangat Sulit" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setDifficulty(filter.id)}
                  className={`px-3 sm:px-4 py-2 font-black text-xs sm:text-sm uppercase border-2 border-slate-800 transition-all duration-200 ${
                    difficulty === filter.id
                      ? "bg-purple-500 text-white transform rotate-1 -translate-y-1"
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
