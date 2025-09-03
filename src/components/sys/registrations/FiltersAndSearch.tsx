"use client";

import { Search, Filter, X, ArrowUpDown } from "lucide-react";

interface FiltersAndSearchProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  paymentStatusFilter: string;
  setPaymentStatusFilter: (status: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
  onResetFilters: () => void;
}

export default function FiltersAndSearch({
  statusFilter,
  setStatusFilter,
  paymentStatusFilter,
  setPaymentStatusFilter,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  onResetFilters,
}: FiltersAndSearchProps) {
  const hasActiveFilters =
    statusFilter !== "all" ||
    paymentStatusFilter !== "all" ||
    searchQuery !== "" ||
    sortBy !== "registration_date" ||
    sortOrder !== "desc";

  const clearAllFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setPaymentStatusFilter("all");
    setSortBy("registration_date");
    setSortOrder("desc");
  };

  return (
    <div className="mb-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari registrasi berdasarkan nama user, email, atau tryout..."
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
            {/* Status Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status Registrasi
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900"
              >
                <option value="all">Semua Status</option>
                <option value="registered">Terdaftar</option>
                <option value="approved">Disetujui</option>
                <option value="rejected">Ditolak</option>
                <option value="cancelled">Dibatalkan</option>
              </select>
            </div>

            {/* Payment Status Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status Pembayaran
              </label>
              <select
                value={paymentStatusFilter}
                onChange={(e) => setPaymentStatusFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900"
              >
                <option value="all">Semua Status</option>
                <option value="pending">Menunggu</option>
                <option value="paid">Lunas</option>
                <option value="failed">Gagal</option>
                <option value="refunded">Dikembalikan</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Urutkan Berdasarkan
              </label>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900"
                >
                  <option value="registration_date">Tanggal Daftar</option>
                  <option value="user_name">Nama User</option>
                  <option value="tryout_title">Nama Tryout</option>
                  <option value="status">Status</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  className="px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all duration-200 text-slate-600 hover:text-slate-800"
                  title={sortOrder === "asc" ? "Urutkan Menurun" : "Urutkan Menaik"}
                >
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </div>
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
              {statusFilter !== "all" && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Status: {statusFilter === "registered" ? "Terdaftar" : 
                           statusFilter === "approved" ? "Disetujui" :
                           statusFilter === "rejected" ? "Ditolak" : "Dibatalkan"}
                  <button
                    onClick={() => setStatusFilter("all")}
                    className="ml-2 hover:text-purple-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {paymentStatusFilter !== "all" && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  Pembayaran: {paymentStatusFilter === "pending" ? "Menunggu" :
                               paymentStatusFilter === "paid" ? "Lunas" :
                               paymentStatusFilter === "failed" ? "Gagal" : "Dikembalikan"}
                  <button
                    onClick={() => setPaymentStatusFilter("all")}
                    className="ml-2 hover:text-emerald-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {sortBy !== "registration_date" && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                  Urutkan: {sortBy === "user_name" ? "Nama User" :
                           sortBy === "tryout_title" ? "Nama Tryout" : "Status"}
                  <button
                    onClick={() => setSortBy("registration_date")}
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
