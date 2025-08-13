"use client";

import Link from "next/link";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  participants: number;
}

interface UpcomingEventsProps {
  events: Event[];
  stats: {
    rank: number;
  };
}

export default function UpcomingEvents({ events, stats }: UpcomingEventsProps) {
  return (
    <div>
      <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase mb-4 sm:mb-6">
          🗓️ Event Mendatang
        </h2>

        <div className="space-y-3 sm:space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="border-2 border-slate-800 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100 transition-all duration-200"
            >
              <h3 className="font-black text-sm text-slate-900 mb-1 leading-tight">
                {event.title}
              </h3>
              <p className="text-xs font-bold text-slate-600 mb-1">
                📅 {event.date}
              </p>
              <p className="text-xs font-bold text-orange-600 mb-2">
                ⏰ {event.time}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">
                  👥 {event.participants} peserta
                </span>
                <button className="bg-orange-500 text-white px-2 py-1 font-black text-xs border border-slate-800 hover:bg-orange-600 transition-colors">
                  Daftar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <Link
            href="/events"
            className="text-orange-600 font-black text-xs hover:text-orange-700 transition-colors"
          >
            Lihat Semua Event →
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal">
        <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase mb-4">
          📈 Statistik Singkat
        </h3>

        <div className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-400 border-3 border-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center font-black text-xl sm:text-2xl">
              🏆
            </div>
            <p className="font-black text-lg sm:text-xl text-slate-900">
              #{stats.rank || "N/A"}
            </p>
            <p className="text-xs sm:text-sm font-bold text-slate-600">
              Peringkat Nasional
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-400 border-3 border-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center font-black text-xl sm:text-2xl">
              ⏱️
            </div>
            <p className="font-black text-lg sm:text-xl text-slate-900">24h</p>
            <p className="text-xs sm:text-sm font-bold text-slate-600">
              Waktu Belajar
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-400 border-3 border-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center font-black text-xl sm:text-2xl">
              🎖️
            </div>
            <p className="font-black text-lg sm:text-xl text-slate-900">12</p>
            <p className="text-xs sm:text-sm font-bold text-slate-600">
              Achievement
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
