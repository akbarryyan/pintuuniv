"use client";

interface NoResultsProps {
  onResetFilters: () => void;
}

export default function NoResults({ onResetFilters }: NoResultsProps) {
  return (
    <div className="text-center py-12">
      <div className="bg-white border-3 border-slate-800 p-8 shadow-brutal">
        <div className="text-6xl mb-4">😔</div>
        <h3 className="text-xl font-black text-slate-900 mb-2 uppercase">
          Tidak Ada Tryout Ditemukan
        </h3>
        <p className="text-slate-600 font-bold mb-4">
          Coba ubah filter atau kata kunci pencarian
        </p>
        <button
          onClick={onResetFilters}
          className="bg-orange-500 text-white px-6 py-3 font-black text-sm border-3 border-slate-800 hover:bg-orange-600 transition-colors"
        >
          🔄 RESET FILTER
        </button>
      </div>
    </div>
  );
}
