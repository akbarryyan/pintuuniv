"use client";

import { Search, Filter, X } from "lucide-react";

interface FiltersAndSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  difficultyFilter: string;
  setDifficultyFilter: (difficulty: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  tryoutFilter: string;
  setTryoutFilter: (tryout: string) => void;
}

export default function FiltersAndSearch({
  searchQuery,
  setSearchQuery,
  difficultyFilter,
  setDifficultyFilter,
  statusFilter,
  setStatusFilter,
  tryoutFilter,
  setTryoutFilter,
}: FiltersAndSearchProps) {
  const hasActiveFilters =
    difficultyFilter !== "all" ||
    statusFilter !== "all" ||
    tryoutFilter !== "all" ||
    searchQuery !== "";

  const clearAllFilters = () => {
    setSearchQuery("");
    setDifficultyFilter("all");
    setStatusFilter("all");
    setTryoutFilter("all");
  };

  // Mock tryout options
  const tryoutOptions = [
    { id: "1", title: "UTBK 2024 - Soshum" },
    { id: "2", title: "UTBK 2024 - Saintek" },
    { id: "3", title: "Simulasi CPNS 2024" },
    { id: "4", title: "Try Out Mandiri 2024" },
  ];

  return (
    <div className="mb-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari kategori berdasarkan nama, deskripsi, atau tryout..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Duration Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Durasi
              </label>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900"
              >
                <option value="all">Semua Durasi</option>
                <option value="Mudah">Cepat (≤20 menit)</option>
                <option value="Sedang">Sedang (21-30 menit)</option>
                <option value="Sulit">Lama (&gt;30 menit)</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900"
              >
                <option value="all">Semua Status</option>
                <option value="active">Aktif</option>
                <option value="inactive">Tidak Aktif</option>
              </select>
            </div>

            {/* Tryout Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tryout
              </label>
              <select
                value={tryoutFilter}
                onChange={(e) => setTryoutFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900"
              >
                <option value="all">Semua Tryout</option>
                {tryoutOptions.map((tryout) => (
                  <option key={tryout.id} value={tryout.id}>
                    {tryout.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="flex items-end">
              <button
                onClick={clearAllFilters}
                className="flex items-center space-x-2 px-4 py-2.5 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-200 border border-slate-300"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Reset Filter</span>
              </button>
            </div>
          )}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-slate-600">Filter aktif:</span>
              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Pencarian: "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery("")}
                    className="ml-2 hover:text-blue-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {difficultyFilter !== "all" && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Durasi: {difficultyFilter}
                  <button
                    onClick={() => setDifficultyFilter("all")}
                    className="ml-2 hover:text-purple-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {statusFilter !== "all" && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  Status: {statusFilter === "active" ? "Aktif" : "Tidak Aktif"}
                  <button
                    onClick={() => setStatusFilter("all")}
                    className="ml-2 hover:text-emerald-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {tryoutFilter !== "all" && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                  Tryout:{" "}
                  {tryoutOptions.find((t) => t.id === tryoutFilter)?.title}
                  <button
                    onClick={() => setTryoutFilter("all")}
                    className="ml-2 hover:text-amber-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
