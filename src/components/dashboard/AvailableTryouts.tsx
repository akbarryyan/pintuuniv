"use client";

import Link from "next/link";

interface Tryout {
  id: number;
  title: string;
  subject: string;
  duration: string;
  questions: number;
  price: number;
  type: string;
  difficulty: string;
  participants: number;
  rating: number;
  deadline: string;
}

interface AvailableTryoutsProps {
  tryouts: Tryout[];
}

export default function AvailableTryouts({ tryouts }: AvailableTryoutsProps) {
  return (
    <div className="mt-6 sm:mt-8">
      <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
            🎯 Tryout Tersedia
          </h2>
          <Link
            href="/tryouts"
            className="bg-orange-500 text-white px-3 sm:px-4 py-2 sm:py-2 font-black text-xs sm:text-sm border-2 sm:border-3 border-slate-800 hover:bg-orange-600 transition-colors text-center sm:text-left"
          >
            Lihat Semua
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
          {tryouts.slice(0, 4).map((tryout) => (
            <div
              key={tryout.id}
              className="border-2 border-slate-800 p-3 sm:p-4 bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 transition-all duration-200 group"
            >
              <div className="flex justify-between items-start mb-3">
                <div
                  className={`px-2 py-1 border-2 border-slate-800 font-black text-xs ${
                    tryout.type === "free"
                      ? "bg-emerald-400 text-slate-900"
                      : "bg-orange-400 text-slate-900"
                  }`}
                >
                  {tryout.type === "free" ? "GRATIS" : "PREMIUM"}
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <span className="text-yellow-500 text-sm">⭐</span>
                    <span className="font-black text-xs text-slate-700">
                      {tryout.rating}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-500">
                    {tryout.participants.toLocaleString()} peserta
                  </p>
                </div>
              </div>

              <h3 className="font-black text-sm sm:text-base text-slate-900 mb-2 leading-tight group-hover:text-orange-600 transition-colors">
                {tryout.title}
              </h3>

              <div className="space-y-2 mb-3">
                <div className="flex flex-wrap gap-1 text-xs font-bold text-slate-600">
                  <span>📚 {tryout.subject}</span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-xs font-bold text-slate-600">
                  <div>⏱️ {tryout.duration}</div>
                  <div>📝 {tryout.questions} soal</div>
                </div>
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-600">
                    📅 Deadline: {tryout.deadline}
                  </span>
                  <span
                    className={`px-2 py-1 border border-slate-800 ${
                      tryout.difficulty === "Sangat Sulit"
                        ? "bg-red-400 text-slate-900"
                        : tryout.difficulty === "Sulit"
                        ? "bg-orange-400 text-slate-900"
                        : "bg-yellow-400 text-slate-900"
                    }`}
                  >
                    {tryout.difficulty}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-left">
                  {tryout.price > 0 ? (
                    <p className="font-black text-sm text-orange-600">
                      Rp {tryout.price.toLocaleString()}
                    </p>
                  ) : (
                    <p className="font-black text-sm text-emerald-600">
                      GRATIS
                    </p>
                  )}
                </div>
                <button
                  className={`px-3 py-2 font-black text-xs border-2 border-slate-800 transition-colors ${
                    tryout.type === "free"
                      ? "bg-emerald-500 text-white hover:bg-emerald-600"
                      : "bg-orange-500 text-white hover:bg-orange-600"
                  }`}
                >
                  {tryout.type === "free" ? "🚀 MULAI" : "💳 BELI"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
