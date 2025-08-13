"use client";

interface ResultsCountProps {
  filteredCount: number;
  totalCount: number;
}

export default function ResultsCount({
  filteredCount,
  totalCount,
}: ResultsCountProps) {
  return (
    <div className="mb-4 sm:mb-6">
      <div className="bg-slate-900 text-white px-4 py-2 border-3 border-slate-800 inline-block font-black text-sm">
        📊 Menampilkan {filteredCount} dari {totalCount} tryout
      </div>
    </div>
  );
}
