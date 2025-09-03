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
  return (
    <div className="mb-6 sm:mb-8">
      <div className="bg-white border-3 sm:border-4 border-slate-800 shadow-brutal p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">
              🔍 Cari
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nama, email, atau tryout..."
              className="w-full px-3 py-2 border-2 border-slate-800 font-bold text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">
              📋 Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border-2 border-slate-800 font-bold text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="all">Semua Status</option>
              <option value="registered">Terdaftar</option>
              <option value="approved">Disetujui</option>
              <option value="rejected">Ditolak</option>
              <option value="cancelled">Dibatalkan</option>
            </select>
          </div>

          {/* Payment Status Filter */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">
              💰 Status Pembayaran
            </label>
            <select
              value={paymentStatusFilter}
              onChange={(e) => setPaymentStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border-2 border-slate-800 font-bold text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Menunggu</option>
              <option value="paid">Lunas</option>
              <option value="failed">Gagal</option>
              <option value="refunded">Dikembalikan</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">
              🔄 Urutkan
            </label>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-3 py-2 border-2 border-slate-800 font-bold text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="registration_date">Tanggal Daftar</option>
                <option value="user_name">Nama User</option>
                <option value="tryout_title">Nama Tryout</option>
                <option value="status">Status</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="px-3 py-2 border-2 border-slate-800 font-bold text-sm bg-slate-100 hover:bg-slate-200 transition-colors"
                title={sortOrder === "asc" ? "Urutkan Menurun" : "Urutkan Menaik"}
              >
                {sortOrder === "asc" ? "↑" : "↓"}
              </button>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onResetFilters}
            className="bg-slate-100 text-slate-900 px-4 py-2 font-bold text-sm border-2 border-slate-800 hover:bg-slate-200 transition-colors"
          >
            🔄 Reset Filter
          </button>
        </div>
      </div>
    </div>
  );
}
