"use client";

interface TimeFilterProps {
  timeFilter: string;
  onTimeFilterChange: (filter: string) => void;
}

export default function TimeFilter({ timeFilter, onTimeFilterChange }: TimeFilterProps) {
  const filters = [
    { id: "weekly", label: "📅 Mingguan", icon: "📊" },
    { id: "monthly", label: "🗓️ Bulanan", icon: "📈" },
    { id: "alltime", label: "🕐 Sepanjang Masa", icon: "🏆" },
  ];

  return (
    <div className="mb-6 sm:mb-8">
      <div className="bg-white border-3 sm:border-4 border-slate-800 p-3 sm:p-4 shadow-brutal">
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onTimeFilterChange(filter.id)}
              className={`px-3 sm:px-4 py-2 sm:py-3 font-black text-xs sm:text-sm uppercase border-2 sm:border-3 border-slate-800 transition-all duration-200 ${
                timeFilter === filter.id
                  ? "bg-orange-500 text-white transform -rotate-1 -translate-y-1"
                  : "bg-slate-100 text-slate-900 hover:bg-slate-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
