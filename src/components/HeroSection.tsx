"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative pt-16 md:pt-24 pb-20 md:pb-28 overflow-hidden">
      {/* Background with improved gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200"></div>

      {/* Enhanced Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-400 rounded-full animate-float opacity-70 animate-pulse"></div>
        <div
          className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-50"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-60"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/3 w-4 h-4 bg-violet-400 rounded-full animate-pulse opacity-40"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-rose-400 rounded-full animate-bounce opacity-80"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/6 w-2 h-2 bg-amber-400 rounded-full animate-float opacity-60"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute bottom-2/3 right-1/6 w-3 h-3 bg-orange-400 rounded-full animate-ping opacity-50"
          style={{ animationDelay: "2.5s" }}
        ></div>
        <div
          className="absolute top-3/4 left-2/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-70"
          style={{ animationDelay: "0.8s" }}
        ></div>
      </div>

      {/* Enhanced Decorative Elements */}
      <div className="absolute top-16 left-4 md:left-10 w-12 md:w-20 h-12 md:h-20 bg-gradient-to-br from-orange-400 to-orange-500 rotate-12 border-4 md:border-6 border-slate-800 opacity-90 shadow-brutal animate-float"></div>
      <div className="absolute top-32 right-4 md:right-20 w-10 md:w-16 h-10 md:h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full border-4 md:border-6 border-slate-800 opacity-90 shadow-brutal"></div>
      <div className="absolute bottom-32 left-4 md:left-20 w-14 md:w-20 h-14 md:h-20 bg-gradient-to-br from-emerald-400 to-emerald-500 rotate-45 border-4 md:border-6 border-slate-800 opacity-90 shadow-brutal animate-pulse"></div>
      <div className="absolute bottom-16 right-8 md:right-40 w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-violet-400 to-violet-500 border-4 md:border-6 border-slate-800 opacity-90 shadow-brutal"></div>
      
      {/* Additional floating shapes */}
      <div className="absolute top-1/2 left-8 w-8 md:w-12 h-8 md:h-12 bg-gradient-to-br from-rose-400 to-rose-500 rotate-45 border-3 md:border-4 border-slate-800 opacity-70 shadow-lg animate-bounce"></div>
      <div className="absolute bottom-1/4 right-12 w-6 md:w-10 h-6 md:h-10 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-full border-3 md:border-4 border-slate-800 opacity-60 shadow-lg animate-float"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          {/* Enhanced Badge */}
          <div className="mb-8 md:mb-10">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-orange-300 px-4 md:px-8 py-3 md:py-4 border-4 md:border-6 border-orange-500 transform rotate-1 inline-block mb-6 md:mb-8 shadow-brutal hover:rotate-2 transition-transform duration-300">
              <span className="text-sm md:text-xl font-black uppercase tracking-wider flex items-center gap-2">
                <span className="animate-pulse">🎯</span>
                PLATFORM #1 INDONESIA
                <span className="animate-pulse">🏆</span>
              </span>
            </div>
          </div>

          {/* Enhanced Main Heading */}
          <div className="mb-8 md:mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-6 md:mb-8 leading-none tracking-tighter uppercase">
              <span className="block transform hover:scale-105 transition-transform duration-300">
                RAIH PTN
              </span>
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 md:px-4 py-2 md:py-3 border-4 md:border-8 border-slate-800 transform -rotate-2 inline-block shadow-brutal hover:-rotate-3 hover:scale-105 transition-all duration-300">
                IMPIANMU!
              </span>
            </h1>
          </div>

          {/* Enhanced Description Card */}
          <div className="max-w-5xl mx-auto mb-8 md:mb-12">
            <div className="bg-white border-4 md:border-8 border-slate-800 p-6 md:p-8 transform -rotate-1 shadow-brutal hover:rotate-0 transition-transform duration-300">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-400 to-emerald-500 border-4 border-slate-800 flex items-center justify-center font-black text-2xl md:text-3xl shadow-brutal transform rotate-3">
                  🚀
                </div>
                <div className="flex-1 text-center md:text-left">
                  <p className="text-base sm:text-lg md:text-xl text-slate-900 font-bold leading-relaxed">
                    Bergabung dengan{" "}
                    <span className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-3 py-1 border-3 md:border-4 border-slate-800 transform rotate-1 inline-block shadow-lg">
                      50,000+ SISWA
                    </span>{" "}
                    yang telah berhasil masuk PTN favorit. Latihan soal terlengkap, analisis mendalam, dan bimbingan personal untuk memastikan kamu siap menghadapi UTBK-SNBT.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mb-10 md:mb-16 px-4">
            <button className="group bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 md:px-10 py-4 md:py-5 font-black text-sm md:text-lg uppercase border-4 md:border-8 border-slate-800 transform hover:-rotate-2 hover:-translate-y-3 hover:scale-105 transition-all duration-300 shadow-brutal w-full sm:w-auto">
              <span className="flex items-center justify-center gap-3">
                <span className="text-xl md:text-2xl group-hover:animate-bounce">⚡</span>
                MULAI TRYOUT GRATIS
                <span className="text-xl md:text-2xl group-hover:animate-spin">🎯</span>
              </span>
            </button>

            <Link
              href="/register"
              className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 md:px-10 py-4 md:py-5 font-black text-sm md:text-lg uppercase border-4 md:border-8 border-slate-800 transform hover:rotate-2 hover:-translate-y-3 hover:scale-105 transition-all duration-300 shadow-brutal w-full sm:w-auto text-center block"
            >
              <span className="flex items-center justify-center gap-3">
                <span className="text-xl md:text-2xl group-hover:animate-bounce">🚀</span>
                DAFTAR SEKARANG
                <span className="text-xl md:text-2xl group-hover:animate-pulse">✨</span>
              </span>
            </Link>

            <Link
              href="/login"
              className="group bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 md:px-10 py-4 md:py-5 font-black text-sm md:text-lg uppercase border-4 md:border-8 border-slate-800 transform hover:rotate-1 hover:-translate-y-3 hover:scale-105 transition-all duration-300 shadow-brutal w-full sm:w-auto text-center block"
            >
              <span className="flex items-center justify-center gap-3">
                <span className="text-xl md:text-2xl group-hover:animate-pulse">🔐</span>
                MASUK AKUN
                <span className="text-xl md:text-2xl group-hover:animate-bounce">👋</span>
              </span>
            </Link>
          </div>

          {/* Enhanced Stats with improved animations and icons */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="group bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 md:p-6 border-4 md:border-8 border-slate-800 transform rotate-2 shadow-brutal hover:rotate-3 hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl md:text-3xl group-hover:animate-bounce">👥</span>
              </div>
              <div className="text-2xl md:text-4xl font-black mb-2 group-hover:scale-110 transition-transform">50K+</div>
              <div className="font-bold text-xs md:text-sm uppercase tracking-wider">
                SISWA AKTIF
              </div>
            </div>
            
            <div className="group bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 md:p-6 border-4 md:border-8 border-slate-800 transform -rotate-1 shadow-brutal hover:-rotate-2 hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl md:text-3xl group-hover:animate-pulse">🎓</span>
              </div>
              <div className="text-2xl md:text-4xl font-black mb-2 group-hover:scale-110 transition-transform">95%</div>
              <div className="font-bold text-xs md:text-sm uppercase tracking-wider">
                LULUS PTN
              </div>
            </div>
            
            <div className="group bg-gradient-to-br from-violet-500 to-violet-600 text-white p-4 md:p-6 border-4 md:border-8 border-slate-800 transform rotate-1 shadow-brutal hover:rotate-2 hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl md:text-3xl group-hover:animate-spin">📝</span>
              </div>
              <div className="text-2xl md:text-4xl font-black mb-2 group-hover:scale-110 transition-transform">10K+</div>
              <div className="font-bold text-xs md:text-sm uppercase tracking-wider">
                SOAL PREMIUM
              </div>
            </div>
            
            <div className="group bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-4 md:p-6 border-4 md:border-8 border-slate-800 transform -rotate-2 shadow-brutal hover:-rotate-3 hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl md:text-3xl group-hover:animate-bounce">🛟</span>
              </div>
              <div className="text-2xl md:text-4xl font-black mb-2 group-hover:scale-110 transition-transform">24/7</div>
              <div className="font-bold text-xs md:text-sm uppercase tracking-wider">
                SUPPORT
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 md:mt-16">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-orange-300 p-4 md:p-6 border-4 md:border-6 border-orange-500 transform -rotate-1 max-w-4xl mx-auto shadow-brutal">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                <div className="flex items-center gap-2">
                  <span className="text-2xl animate-pulse">⭐</span>
                  <span className="font-black text-sm md:text-base">4.9/5 RATING</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl animate-bounce">🏆</span>
                  <span className="font-black text-sm md:text-base">AWARDED 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl animate-pulse">🛡️</span>
                  <span className="font-black text-sm md:text-base">100% SECURE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .shadow-brutal {
          box-shadow: 8px 8px 0px 0px #1e293b;
        }
        
        @media (max-width: 768px) {
          .shadow-brutal {
            box-shadow: 4px 4px 0px 0px #1e293b;
          }
        }
      `}</style>
    </section>
  );
}
