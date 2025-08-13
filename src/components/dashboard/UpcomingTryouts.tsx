"use client";

import Link from "next/link";

interface UpcomingTryout {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  subject: string;
  questions: number;
  price: number;
  type: string;
  status: string;
  reminder: string;
}

interface UpcomingTryoutsProps {
  tryouts: UpcomingTryout[];
}

export default function UpcomingTryouts({ tryouts }: UpcomingTryoutsProps) {
  return (
    <div className="mt-6 sm:mt-8">
      <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
            🗓️ Tryout Mendatang
          </h2>
          <Link
            href="/upcoming"
            className="bg-purple-500 text-white px-3 sm:px-4 py-2 sm:py-2 font-black text-xs sm:text-sm border-2 sm:border-3 border-slate-800 hover:bg-purple-600 transition-colors text-center sm:text-left"
          >
            Lihat Semua
          </Link>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {tryouts.map((tryout) => (
            <div
              key={tryout.id}
              className="border-2 border-slate-800 p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-black text-sm text-slate-900 mb-1 leading-tight">
                    {tryout.title}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                    <span className="text-xs font-bold text-slate-600">
                      📅 {tryout.date}
                    </span>
                    <div
                      className={`px-2 py-1 border border-slate-800 font-black text-xs self-start ${
                        tryout.type === "free"
                          ? "bg-emerald-400 text-slate-900"
                          : "bg-orange-400 text-slate-900"
                      }`}
                    >
                      {tryout.type === "free" ? "GRATIS" : "PREMIUM"}
                    </div>
                  </div>
                  <p className="text-xs font-bold text-slate-600 mb-2">
                    ⏰ {tryout.time} • ⏱️ {tryout.duration}
                  </p>
                </div>
                <div className="text-left sm:text-right mb-2 sm:mb-0">
                  <div
                    className={`px-2 py-1 border-2 border-slate-800 font-black text-xs inline-block ${
                      tryout.status === "registered"
                        ? "bg-emerald-400 text-slate-900"
                        : "bg-blue-400 text-slate-900"
                    }`}
                  >
                    {tryout.status === "registered" ? "TERDAFTAR" : "TERSEDIA"}
                  </div>
                  <p className="text-xs font-bold text-purple-600 mt-1">
                    {tryout.reminder}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs font-bold text-slate-600 mb-3">
                <div>📚 {tryout.subject}</div>
                <div>📝 {tryout.questions} soal</div>
              </div>

              <button
                className={`w-full px-3 py-2 font-black text-xs border-2 border-slate-800 transition-colors ${
                  tryout.status === "registered"
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "bg-purple-500 text-white hover:bg-purple-600"
                }`}
              >
                {tryout.status === "registered"
                  ? "✅ SUDAH TERDAFTAR"
                  : "📝 DAFTAR SEKARANG"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
