"use client";

interface Tryout {
  id: number;
  title: string;
  subject: string;
  category: string;
  duration: string;
  questions: number;
  price: number;
  originalPrice: number;
  type: string;
  difficulty: string;
  participants: number;
  rating: number;
  deadline: string | null;
  instructor: string;
  description: string;
  features: string[];
  isPopular: boolean;
  discount: number;
}

interface TryoutsGridProps {
  tryouts: Tryout[];
}

export default function TryoutsGrid({ tryouts }: TryoutsGridProps) {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Mudah":
        return "bg-emerald-100 text-emerald-800 border-emerald-400";
      case "Sedang":
        return "bg-blue-100 text-blue-800 border-blue-400";
      case "Sulit":
        return "bg-orange-100 text-orange-800 border-orange-400";
      case "Sangat Sulit":
        return "bg-red-100 text-red-800 border-red-400";
      default:
        return "bg-gray-100 text-gray-800 border-gray-400";
    }
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
                  {tryout.isPopular && (
                    <div className="bg-yellow-400 text-slate-900 px-2 py-1 border-2 border-slate-800 font-black text-xs transform -rotate-3">
                      🔥 POPULER
                    </div>
                  )}
                  <div
                    className={`px-2 py-1 border-2 border-slate-800 font-black text-xs ${
                      tryout.type === "free"
                        ? "bg-emerald-400 text-slate-900"
                        : "bg-orange-400 text-slate-900"
                    }`}
                  >
                    {tryout.type === "free" ? "GRATIS" : "PREMIUM"}
                  </div>
                </div>
                <h3 className="font-black text-sm sm:text-base text-slate-900 mb-2 leading-tight">
                  {tryout.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-bold mb-2">
                  📚 {tryout.subject}
                </p>
                <p className="text-xs text-slate-500 font-bold">
                  👨‍🏫 {tryout.instructor}
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

            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-600 mb-3">
              <div>⏱️ {tryout.duration}</div>
              <div>📝 {tryout.questions} soal</div>
              <div>👥 {tryout.participants.toLocaleString()}</div>
              <div>⭐ {tryout.rating}/5.0</div>
            </div>

            <div
              className={`text-xs font-bold px-2 py-1 border-2 border-slate-800 inline-block ${getDifficultyColor(
                tryout.difficulty
              )}`}
            >
              {tryout.difficulty}
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-slate-600 font-bold mb-4 leading-relaxed">
              {tryout.description}
            </p>

            {/* Features */}
            <div className="mb-4">
              <h4 className="font-black text-xs text-slate-900 mb-2 uppercase">
                ✨ Fitur Unggulan
              </h4>
              <div className="grid grid-cols-2 gap-1">
                {tryout.features.map((feature, index) => (
                  <div
                    key={index}
                    className="text-xs font-bold text-slate-600 flex items-center"
                  >
                    <span className="w-1 h-1 bg-orange-400 rounded-full mr-2"></span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Deadline */}
            <div className="mb-4">
              {tryout.deadline ? (
                <div className="bg-red-100 border-2 border-red-400 p-2 text-center">
                  <p className="text-xs font-black text-red-800">
                    ⏰ Deadline: {tryout.deadline}
                  </p>
                </div>
              ) : (
                <div className="bg-emerald-100 border-2 border-emerald-400 p-2 text-center">
                  <p className="text-xs font-black text-emerald-800">
                    ♾️ Akses Selamanya - Tanpa Batas Waktu
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                className={`w-full px-4 py-3 font-black text-sm border-3 border-slate-800 transition-all duration-200 transform hover:-translate-y-1 ${
                  tryout.type === "free"
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                {tryout.type === "free"
                  ? "🎯 MULAI GRATIS"
                  : "💳 BELI AKSES SELAMANYA"}
              </button>

              <button className="w-full bg-slate-900 text-white px-4 py-2 font-black text-xs border-2 border-slate-800 hover:bg-slate-800 transition-colors">
                📋 LIHAT DETAIL
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
