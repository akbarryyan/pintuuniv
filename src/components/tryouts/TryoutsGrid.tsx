"use client";

interface Tryout {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  type: string;
  difficulty: string;
  participants: number;
  discount: number;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface TryoutsGridProps {
  tryouts: Tryout[];
}

export default function TryoutsGrid({ tryouts }: TryoutsGridProps) {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "easy":
        return "bg-emerald-100 text-emerald-800 border-emerald-400";
      case "medium":
        return "bg-blue-100 text-blue-800 border-blue-400";
      case "hard":
        return "bg-orange-100 text-orange-800 border-orange-400";
      default:
        return "bg-gray-100 text-gray-800 border-gray-400";
    }
  };

  const getDifficultyLabel = (level: string) => {
    switch (level) {
      case "easy":
        return "Mudah";
      case "medium":
        return "Sedang";
      case "hard":
        return "Sulit";
      default:
        return "Sedang";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
      {tryouts.map((tryout) => (
        <div
          key={tryout.id}
          className="bg-white border-3 sm:border-4 border-slate-800 shadow-brutal hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:rotate-1"
        >
          {/* Card Header */}
          <div className="p-4 sm:p-6 border-b-3 border-slate-800 bg-gradient-to-r from-slate-50 to-slate-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`px-2 py-1 border-2 border-slate-800 font-black text-xs ${
                      tryout.type === "free"
                        ? "bg-emerald-400 text-slate-900"
                        : "bg-orange-400 text-slate-900"
                    }`}
                  >
                    {tryout.type === "free" ? "GRATIS" : "PREMIUM"}
                  </div>
                  <div
                    className={`px-2 py-1 border-2 border-slate-800 font-black text-xs ${getDifficultyColor(
                      tryout.difficulty
                    )}`}
                  >
                    {getDifficultyLabel(tryout.difficulty)}
                  </div>
                </div>
                <h3 className="font-black text-sm sm:text-base text-slate-900 mb-2 leading-tight">
                  {tryout.title}
                </h3>
                <p className="text-xs text-slate-500 font-bold">
                  👥 {tryout.participants.toLocaleString()} peserta
                </p>
              </div>
              <div className="text-right ml-3">
                {tryout.price === 0 ? (
                  <div className="font-black text-lg text-emerald-600">
                    GRATIS
                  </div>
                ) : (
                  <div>
                    <div className="font-black text-lg text-slate-900">
                      Rp {tryout.price.toLocaleString()}
                    </div>
                    {tryout.discount > 0 && (
                      <div className="text-xs text-slate-500 line-through font-bold">
                        Rp {tryout.originalPrice.toLocaleString()}
                      </div>
                    )}
                    {tryout.discount > 0 && (
                      <div className="bg-red-500 text-white px-2 py-1 text-xs font-black border border-slate-800 mt-1">
                        -{tryout.discount}%
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4 sm:p-6">
            <div className="space-y-3">
              {/* Date Range */}
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-600">📅 Periode:</span>
                  <span className="font-bold text-slate-900">
                    {formatDate(tryout.startDate)} - {formatDate(tryout.endDate)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button className="flex-1 bg-blue-500 text-white px-3 py-2 sm:px-4 sm:py-3 font-black text-xs sm:text-sm border-2 border-slate-800 hover:bg-blue-600 transition-colors">
                  🚀 MULAI
                </button>
                <button className="flex-1 bg-slate-100 text-slate-900 px-3 py-2 sm:px-4 sm:py-3 font-black text-xs sm:text-sm border-2 border-slate-800 hover:bg-slate-200 transition-colors">
                  📋 DETAIL
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
