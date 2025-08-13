"use client";

export default function CallToAction() {
  return (
    <div className="mt-8 sm:mt-12">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 sm:p-8 border-3 sm:border-4 border-slate-800 shadow-brutal text-center">
        <h2 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4 uppercase">
          🎯 Belum Menemukan Tryout yang Cocok?
        </h2>
        <p className="text-sm sm:text-base font-bold opacity-90 mb-4 sm:mb-6">
          Hubungi tim kami untuk rekomendasi tryout sesuai target PTN impianmu
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button className="bg-white text-purple-600 px-6 py-3 font-black text-sm border-3 border-slate-800 hover:bg-purple-50 transition-colors">
            💬 KONSULTASI GRATIS
          </button>
          <button className="bg-yellow-400 text-slate-900 px-6 py-3 font-black text-sm border-3 border-slate-800 hover:bg-yellow-300 transition-colors">
            📞 HUBUNGI MENTOR
          </button>
        </div>
      </div>
    </div>
  );
}
