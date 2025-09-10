"use client";

import Link from "next/link";

export default function ProgressTracking() {
  return (
    <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 shadow-brutal mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
          📈 Progress Tracking
        </h2>
        <div className="flex items-center space-x-2">
          <select className="bg-white border-2 border-slate-800 px-2 py-1 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-400">
            <option value="7">7 Hari</option>
            <option value="30">30 Hari</option>
            <option value="90">90 Hari</option>
          </select>
          <Link
            href="/analytics"
            className="bg-emerald-500 text-white px-3 sm:px-4 py-2 sm:py-2 font-black text-xs sm:text-sm border-2 sm:border-3 border-slate-800 hover:bg-emerald-600 transition-colors text-center sm:text-left"
          >
            Detail
          </Link>
        </div>
      </div>

      {/* Chart Container */}
      <div className="space-y-4 sm:space-y-6">
        {/* Score Progress Chart */}
        <div className="border-2 border-slate-800 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-black text-sm sm:text-base text-slate-900">
              📊 Perkembangan Skor
            </h3>
            <div className="bg-blue-500 text-white px-2 py-1 border-2 border-slate-800 font-black text-xs">
              +12% minggu ini
            </div>
          </div>

          {/* Mock Chart Area */}
          <div className="relative h-32 sm:h-40 bg-white border-2 border-slate-800 p-2 overflow-hidden">
            {/* Chart Grid Lines */}
            <div className="absolute inset-2 opacity-20">
              <div className="h-full grid grid-rows-4 gap-0">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="border-b border-slate-400"></div>
                ))}
              </div>
              <div className="absolute inset-0 grid grid-cols-7 gap-0">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="border-r border-slate-400"></div>
                ))}
              </div>
            </div>

            {/* Mock Chart Line */}
            <div className="absolute inset-2 flex items-end justify-between">
              <div
                className="w-2 bg-blue-500 border border-slate-800"
                style={{ height: "40%" }}
              ></div>
              <div
                className="w-2 bg-blue-500 border border-slate-800"
                style={{ height: "60%" }}
              ></div>
              <div
                className="w-2 bg-blue-500 border border-slate-800"
                style={{ height: "45%" }}
              ></div>
              <div
                className="w-2 bg-blue-500 border border-slate-800"
                style={{ height: "70%" }}
              ></div>
              <div
                className="w-2 bg-blue-500 border border-slate-800"
                style={{ height: "85%" }}
              ></div>
              <div
                className="w-2 bg-blue-500 border border-slate-800"
                style={{ height: "75%" }}
              ></div>
              <div
                className="w-2 bg-blue-500 border border-slate-800"
                style={{ height: "90%" }}
              ></div>
            </div>

            {/* Chart Labels */}
            <div className="absolute bottom-0 left-2 right-2 flex justify-between text-xs font-bold text-slate-600">
              <span>Sen</span>
              <span>Sel</span>
              <span>Rab</span>
              <span>Kam</span>
              <span>Jum</span>
              <span>Sab</span>
              <span>Min</span>
            </div>
          </div>

          {/* Score Range */}
          <div className="flex justify-between items-center mt-2 text-xs font-bold text-slate-600">
            <span>Rendah: 45</span>
            <span>Rata-rata: 72</span>
            <span>Tinggi: 92</span>
          </div>
        </div>

      </div>
    </div>
  );
}
