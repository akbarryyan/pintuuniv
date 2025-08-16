"use client";

interface TryoutHeaderProps {
  totalTryouts: number;
  freeTryouts: number;
  premiumTryouts: number;
}

export default function TryoutHeader({
  totalTryouts,
  freeTryouts,
  premiumTryouts,
}: TryoutHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8">
      {/* Main Header Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl border-3 border-slate-800 shadow-brutal">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-20 h-20 bg-white rounded-full -translate-x-10 -translate-y-10"></div>
          <div className="absolute top-1/2 right-0 w-16 h-16 bg-white rounded-full translate-x-8 -translate-y-8"></div>
          <div className="absolute bottom-0 left-1/3 w-12 h-12 bg-white rounded-full -translate-x-6 translate-y-6"></div>
        </div>
        
        {/* Content */}
        <div className="relative p-4 sm:p-6 text-center">
          {/* Main Title */}
          <div className="mb-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 leading-tight">
              🎯 TRYOUT UTBK
            </h1>
            <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full"></div>
          </div>
          
          {/* Subtitle */}
          <p className="text-base sm:text-lg font-bold text-blue-100 mb-6 max-w-2xl mx-auto leading-relaxed">
            Pilih tryout terbaik untuk persiapan UTBK impianmu
          </p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {/* Total Tryouts */}
            <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-3 sm:p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="text-2xl sm:text-3xl mb-1">🎓</div>
              <div className="text-xl sm:text-2xl font-black text-white mb-1">
                {totalTryouts}
              </div>
              <div className="text-xs sm:text-sm font-bold text-blue-100 uppercase tracking-wide">
                Tryout Tersedia
              </div>
            </div>
            
            {/* Free Tryouts */}
            <div className="bg-emerald-500/20 backdrop-blur-sm border-2 border-emerald-400/30 rounded-lg p-3 sm:p-4 hover:bg-emerald-500/30 transition-all duration-300 hover:scale-105">
              <div className="text-2xl sm:text-3xl mb-1">🆓</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-300 mb-1">
                {freeTryouts}
              </div>
              <div className="text-xs sm:text-sm font-bold text-emerald-200 uppercase tracking-wide">
                Gratis
              </div>
            </div>
            
            {/* Premium Tryouts */}
            <div className="bg-amber-500/20 backdrop-blur-sm border-2 border-amber-400/30 rounded-lg p-3 sm:p-4 hover:bg-amber-500/30 transition-all duration-300 hover:scale-105">
              <div className="text-2xl sm:text-3xl mb-1">💎</div>
              <div className="text-xl sm:text-2xl font-black text-amber-300 mb-1">
                {premiumTryouts}
              </div>
              <div className="text-xs sm:text-sm font-bold text-amber-200 uppercase tracking-wide">
                Premium
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="mt-6">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-full px-4 py-2 hover:bg-white/30 transition-all duration-300">
              <span className="text-white font-bold text-sm">🚀</span>
              <span className="text-white font-bold text-sm">Mulai Belajar Sekarang</span>
            </div>
          </div>
        </div>
        
        {/* Bottom Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"></div>
      </div>
      
      {/* Quick Info Bar */}
      <div className="mt-4 bg-white border-2 border-slate-800 rounded-lg p-3 shadow-brutal">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold text-slate-700">
              ✅ Semua tryout sudah diverifikasi dan siap digunakan
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs font-bold text-slate-600">
              <span>📱</span>
              <span>Responsive di semua device</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-slate-600">
              <span>⚡</span>
              <span>Loading cepat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
