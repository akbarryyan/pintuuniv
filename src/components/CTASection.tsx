"use client";

export default function CTASection() {
  const urgencyFeatures = [
    { icon: "⏰", text: "PROMO TERBATAS", subtext: "24 jam tersisa" },
    { icon: "🎯", text: "DISKON 50%", subtext: "Hanya hari ini" },
    { icon: "🚀", text: "AKSES INSTAN", subtext: "Langsung aktif" },
    { icon: "🏆", text: "BONUS GRATIS", subtext: "Senilai 2 juta" },
  ];

  const guarantees = [
    { icon: "✅", text: "No Credit Card Required" },
    { icon: "🔒", text: "100% Secure Payment" },
    { icon: "💰", text: "30-Day Money Back" },
    { icon: "⚡", text: "Instant Access" },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 relative overflow-hidden">
      {/* Enhanced Background Elements - Hidden on small mobile */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated shapes - Responsive sizes */}
        <div className="hidden sm:block absolute top-16 sm:top-20 left-4 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-yellow-300 rotate-12 border-3 sm:border-4 border-white opacity-30 animate-bounce"></div>
        <div className="hidden sm:block absolute top-32 sm:top-40 right-4 sm:right-20 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-orange-200 rounded-full border-3 sm:border-4 border-white opacity-40 animate-pulse"></div>
        <div className="hidden md:block absolute bottom-24 sm:bottom-32 left-4 sm:left-16 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-red-300 rotate-45 border-3 sm:border-4 border-white opacity-20 animate-spin"></div>
        <div className="hidden md:block absolute bottom-16 sm:bottom-20 right-6 sm:right-24 w-12 h-12 sm:w-14 sm:h-14 lg:w-18 lg:h-18 bg-yellow-400 border-3 sm:border-4 border-white opacity-35 animate-float"></div>

        {/* Money and success symbols - Responsive sizes */}
        <div className="hidden sm:block absolute top-1/4 left-1/12 sm:left-1/6 text-3xl sm:text-4xl lg:text-6xl text-yellow-200 opacity-20 animate-pulse">
          💎
        </div>
        <div className="hidden sm:block absolute bottom-1/4 right-1/12 sm:right-1/6 text-3xl sm:text-4xl lg:text-6xl text-orange-200 opacity-20 animate-bounce">
          🎯
        </div>
        <div className="hidden md:block absolute top-2/3 right-1/3 text-2xl sm:text-3xl lg:text-4xl text-white opacity-15 animate-pulse">
          🚀
        </div>
        <div className="hidden md:block absolute bottom-1/2 left-1/4 text-3xl sm:text-4xl lg:text-5xl text-yellow-200 opacity-25 animate-bounce">
          ⚡
        </div>
      </div>

      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-600/30 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20"></div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center relative z-10">
        {/* Enhanced Header Badge */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-orange-300 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 border-3 sm:border-4 md:border-6 border-white transform rotate-2 inline-block mb-4 sm:mb-6 md:mb-8 shadow-brutal hover:rotate-3 transition-transform duration-300">
          <span className="text-xs sm:text-sm md:text-lg lg:text-xl font-black uppercase tracking-wider flex items-center gap-1 sm:gap-2">
            <span className="animate-pulse text-base sm:text-lg">🔥</span>
            <span>SIAP MULAI?</span>
            <span className="animate-bounce text-base sm:text-lg">✨</span>
          </span>
        </div>

        {/* Enhanced Main Headline */}
        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6 md:mb-8 uppercase leading-none drop-shadow-lg">
          <span className="block transform hover:scale-105 transition-transform duration-300 mb-2 sm:mb-4">
            WUJUDKAN IMPIAN
          </span>
          <span className="bg-white text-slate-900 px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 border-3 sm:border-4 md:border-6 lg:border-8 border-slate-800 transform -rotate-1 inline-block shadow-brutal hover:-rotate-2 hover:scale-105 transition-all duration-300 text-sm sm:text-base md:text-2xl lg:text-3xl xl:text-4xl">
            KULIAH DI PTN
          </span>
        </h2>

        {/* Enhanced Description */}
        <div className="bg-white text-slate-900 p-4 sm:p-5 md:p-6 lg:p-8 border-3 sm:border-4 md:border-6 border-slate-800 transform rotate-1 max-w-5xl mx-auto shadow-brutal hover:rotate-0 transition-transform duration-300 mb-6 sm:mb-8 md:mb-12">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold leading-relaxed mb-3 sm:mb-4">
            Bergabunglah dengan ribuan siswa yang telah merasakan manfaat
            belajar di PintuUniv.
            <span className="bg-orange-500 text-white px-2 py-1 border-2 border-slate-800 mx-1 sm:mx-2 inline-block my-1 sm:my-0">
              Jangan sia-siakan
            </span>
            kesempatan emas ini!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-bold">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-emerald-500 text-lg sm:text-xl">⚡</span>
              <span>Hasil dalam 30 hari</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-orange-500 text-lg sm:text-xl">🎯</span>
              <span>95% tingkat keberhasilan</span>
            </div>
          </div>
        </div>

        {/* Urgency Features */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          {urgencyFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white text-slate-900 p-3 sm:p-4 md:p-6 border-3 sm:border-4 border-slate-800 transform hover:-rotate-2 hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-105 transition-all duration-300 shadow-brutal"
            >
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-1 sm:mb-2 animate-bounce">
                {feature.icon}
              </div>
              <h4 className="font-black text-xs sm:text-sm md:text-base uppercase mb-1">
                {feature.text}
              </h4>
              <p className="text-xs sm:text-sm font-bold text-red-600">
                {feature.subtext}
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center mb-6 sm:mb-8 md:mb-12">
          <button className="group bg-white text-slate-900 px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 font-black text-sm sm:text-base md:text-lg lg:text-xl uppercase border-3 sm:border-4 md:border-6 lg:border-8 border-slate-800 transform hover:-rotate-2 hover:-translate-y-2 sm:hover:-translate-y-4 hover:scale-105 sm:hover:scale-110 transition-all duration-300 shadow-brutal relative overflow-hidden">
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-orange-200 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <span className="relative flex items-center justify-center gap-2 sm:gap-3">
              <span className="text-lg sm:text-xl md:text-2xl group-hover:animate-spin">
                🚀
              </span>
              <span className="text-xs sm:text-sm md:text-base lg:text-lg">
                DAFTAR SEKARANG
              </span>
              <span className="text-lg sm:text-xl md:text-2xl group-hover:animate-bounce">
                ⚡
              </span>
            </span>
            {/* Shine effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700"></div>
          </button>

          <button className="group bg-slate-900 text-orange-400 px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 font-black text-sm sm:text-base md:text-lg lg:text-xl uppercase border-3 sm:border-4 md:border-6 lg:border-8 border-white transform hover:rotate-2 hover:-translate-y-2 sm:hover:-translate-y-4 hover:scale-105 sm:hover:scale-110 transition-all duration-300 shadow-brutal relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <span className="relative flex items-center justify-center gap-2 sm:gap-3">
              <span className="text-lg sm:text-xl md:text-2xl group-hover:animate-pulse">
                📞
              </span>
              <span className="text-xs sm:text-sm md:text-base lg:text-lg">
                HUBUNGI KAMI
              </span>
              <span className="text-lg sm:text-xl md:text-2xl group-hover:animate-bounce">
                💬
              </span>
            </span>
          </button>
        </div>

        {/* Special Offer Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 sm:p-5 md:p-6 border-3 sm:border-4 md:border-6 border-yellow-400 transform -rotate-1 inline-block shadow-brutal hover:rotate-0 transition-transform duration-300 mb-6 sm:mb-8 md:mb-10 max-w-full mx-auto">
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
            {/* Top section with promo text */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 w-full">
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-lg sm:text-xl md:text-2xl animate-spin">
                  ⏰
                </span>
                <span className="font-black text-xs sm:text-sm md:text-base lg:text-lg uppercase text-center">
                  PROMO TERBATAS!
                </span>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-lg sm:text-xl md:text-2xl animate-bounce">
                  🔥
                </span>
                <span className="font-black text-xs sm:text-sm md:text-base lg:text-lg uppercase text-center">
                  BERAKHIR MALAM INI!
                </span>
              </div>
            </div>

            {/* Main CTA in yellow banner - Full width on mobile */}
            <div className="bg-yellow-400 text-slate-900 px-4 sm:px-6 md:px-8 py-2 sm:py-3 border-2 sm:border-3 border-white font-black text-sm sm:text-base md:text-lg uppercase shadow-lg animate-pulse w-full sm:w-auto text-center rounded-sm sm:rounded-none">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                <span className="text-xs sm:text-sm md:text-base">
                  DAFTAR HARI INI
                </span>
                <span className="text-xs sm:text-sm md:text-base">
                  DAPAT DISKON 50%
                </span>
              </div>
            </div>

            {/* Bottom urgency text */}
            <div className="text-center">
              <p className="text-xs sm:text-sm font-bold text-yellow-200 uppercase">
                💸 Penawaran terbaik tahun ini! Jangan sampai terlewat! 💸
              </p>
            </div>
          </div>
        </div>

        {/* Guarantee Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-10">
          {guarantees.map((guarantee, index) => (
            <div
              key={index}
              className="bg-white text-slate-900 px-2 sm:px-3 md:px-4 py-2 sm:py-3 border-2 sm:border-3 border-slate-800 font-black text-xs sm:text-sm uppercase shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <span className="text-emerald-500 text-sm sm:text-base">
                  {guarantee.icon}
                </span>
                <span className="text-xs sm:text-sm">{guarantee.text}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Countdown Timer (Mock) */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 md:p-6 lg:p-8 border-3 sm:border-4 md:border-6 border-yellow-400 transform rotate-1 max-w-3xl mx-auto shadow-brutal hover:rotate-0 transition-transform duration-300 mb-6 sm:mb-8 md:mb-10">
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black uppercase mb-3 sm:mb-4 text-orange-300">
            ⏰ PENAWARAN BERAKHIR DALAM:
          </h3>
          <div className="grid grid-cols-4 gap-1 sm:gap-2 md:gap-4">
            {[
              { value: "23", label: "JAM" },
              { value: "45", label: "MENIT" },
              { value: "12", label: "DETIK" },
              { value: "678", label: "MS" },
            ].map((time, index) => (
              <div
                key={index}
                className="bg-orange-500 text-white p-2 sm:p-3 md:p-4 border-2 sm:border-3 border-white text-center animate-pulse"
              >
                <div className="text-sm sm:text-base md:text-lg lg:text-2xl font-black">
                  {time.value}
                </div>
                <div className="text-xs sm:text-sm font-bold">{time.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Push Message */}
        <div className="bg-white text-slate-900 p-3 sm:p-4 md:p-6 border-3 sm:border-4 md:border-6 border-slate-800 transform -rotate-1 max-w-4xl mx-auto shadow-brutal hover:rotate-0 transition-transform duration-300">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <div className="text-2xl sm:text-3xl md:text-4xl">🎯</div>
            <div className="flex-1 text-center sm:text-left">
              <p className="font-black text-xs sm:text-sm md:text-base uppercase mb-1 sm:mb-2">
                BERGABUNGLAH DENGAN 50,000+ SISWA SUKSES!
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-600">
                Ribuan siswa telah merasakan manfaatnya. Sekarang giliran kamu!
              </p>
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl">🚀</div>
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .shadow-brutal {
          box-shadow: 4px 4px 0px 0px #1e293b;
        }

        @media (min-width: 640px) {
          .shadow-brutal {
            box-shadow: 6px 6px 0px 0px #1e293b;
          }
        }

        @media (min-width: 768px) {
          .shadow-brutal {
            box-shadow: 8px 8px 0px 0px #1e293b;
          }
        }
      `}</style>
    </section>
  );
}
