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
    <section className="py-20 md:py-28 bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300 rotate-12 border-4 border-white opacity-30 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-orange-200 rounded-full border-4 border-white opacity-40 animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-red-300 rotate-45 border-4 border-white opacity-20 animate-spin"></div>
        <div className="absolute bottom-20 right-24 w-18 h-18 bg-yellow-400 border-4 border-white opacity-35 animate-float"></div>

        {/* Money and success symbols */}
        <div className="absolute top-1/4 left-1/6 text-6xl text-yellow-200 opacity-20 animate-pulse">
          💎
        </div>
        <div className="absolute bottom-1/4 right-1/6 text-6xl text-orange-200 opacity-20 animate-bounce">
          🎯
        </div>
        <div className="absolute top-2/3 right-1/3 text-4xl text-white opacity-15 animate-pulse">
          🚀
        </div>
        <div className="absolute bottom-1/2 left-1/4 text-5xl text-yellow-200 opacity-25 animate-bounce">
          ⚡
        </div>
      </div>

      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-600/30 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Enhanced Header Badge */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-orange-300 px-6 md:px-8 py-3 md:py-4 border-4 md:border-6 border-white transform rotate-2 inline-block mb-6 md:mb-8 shadow-brutal hover:rotate-3 transition-transform duration-300">
          <span className="text-sm md:text-xl font-black uppercase tracking-wider flex items-center gap-2">
            <span className="animate-pulse">🔥</span>
            SIAP MULAI?
            <span className="animate-bounce">✨</span>
          </span>
        </div>

        {/* Enhanced Main Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 md:mb-8 uppercase leading-none drop-shadow-lg">
          <span className="block transform hover:scale-105 transition-transform duration-300">
            WUJUDKAN IMPIAN
          </span>
          <span className="bg-white text-slate-900 px-3 md:px-4 py-2 md:py-3 border-4 md:border-8 border-slate-800 transform -rotate-1 inline-block shadow-brutal hover:-rotate-2 hover:scale-105 transition-all duration-300">
            KULIAH DI PTN
          </span>
        </h2>

        {/* Enhanced Description */}
        <div className="bg-white text-slate-900 p-6 md:p-8 border-4 md:border-6 border-slate-800 transform rotate-1 max-w-4xl mx-auto shadow-brutal hover:rotate-0 transition-transform duration-300 mb-8 md:mb-12">
          <p className="text-sm md:text-lg font-bold leading-relaxed mb-4">
            Bergabunglah dengan ribuan siswa yang telah merasakan manfaat
            belajar di PintuUniv.
            <span className="bg-orange-500 text-white px-2 py-1 border-2 border-slate-800 mx-2">
              Jangan sia-siakan
            </span>
            kesempatan emas ini!
          </p>
          <div className="flex items-center justify-center gap-4 text-sm font-bold">
            <div className="flex items-center gap-2">
              <span className="text-emerald-500 text-xl">⚡</span>
              <span>Hasil dalam 30 hari</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-500 text-xl">🎯</span>
              <span>95% tingkat keberhasilan</span>
            </div>
          </div>
        </div>

        {/* Urgency Features */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-12">
          {urgencyFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white text-slate-900 p-4 md:p-6 border-4 border-slate-800 transform hover:-rotate-2 hover:-translate-y-2 hover:scale-105 transition-all duration-300 shadow-brutal"
            >
              <div className="text-2xl md:text-3xl mb-2 animate-bounce">
                {feature.icon}
              </div>
              <h4 className="font-black text-xs md:text-sm uppercase mb-1">
                {feature.text}
              </h4>
              <p className="text-xs md:text-sm font-bold text-red-600">
                {feature.subtext}
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mb-8 md:mb-12">
          <button className="group bg-white text-slate-900 px-8 md:px-12 py-4 md:py-6 font-black text-base md:text-xl uppercase border-4 md:border-8 border-slate-800 transform hover:-rotate-2 hover:-translate-y-4 hover:scale-110 transition-all duration-300 shadow-brutal relative overflow-hidden">
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-orange-200 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <span className="relative flex items-center justify-center gap-3">
              <span className="text-2xl group-hover:animate-spin">🚀</span>
              DAFTAR SEKARANG
              <span className="text-2xl group-hover:animate-bounce">⚡</span>
            </span>
            {/* Shine effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700"></div>
          </button>

          <button className="group bg-slate-900 text-orange-400 px-8 md:px-12 py-4 md:py-6 font-black text-base md:text-xl uppercase border-4 md:border-8 border-white transform hover:rotate-2 hover:-translate-y-4 hover:scale-110 transition-all duration-300 shadow-brutal relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <span className="relative flex items-center justify-center gap-3">
              <span className="text-2xl group-hover:animate-pulse">📞</span>
              HUBUNGI KAMI
              <span className="text-2xl group-hover:animate-bounce">💬</span>
            </span>
          </button>
        </div>

        {/* Special Offer Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 md:p-6 border-4 md:border-6 border-yellow-400 transform -rotate-1 inline-block shadow-brutal hover:rotate-0 transition-transform duration-300 mb-8 md:mb-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl animate-spin">⏰</span>
              <span className="font-black text-sm md:text-lg uppercase">
                PROMO TERBATAS!
              </span>
            </div>
            <div className="bg-yellow-400 text-slate-900 px-4 py-2 border-3 border-white font-black text-sm md:text-base uppercase shadow-lg animate-pulse">
              DAFTAR HARI INI DAPAT DISKON 50%
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl animate-bounce">🔥</span>
              <span className="font-black text-sm md:text-lg uppercase">
                BERAKHIR MALAM INI!
              </span>
            </div>
          </div>
        </div>

        {/* Guarantee Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10">
          {guarantees.map((guarantee, index) => (
            <div
              key={index}
              className="bg-white text-slate-900 px-3 md:px-4 py-2 md:py-3 border-3 border-slate-800 font-black text-xs md:text-sm uppercase shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-emerald-500">{guarantee.icon}</span>
                <span>{guarantee.text}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Countdown Timer (Mock) */}
        <div className="bg-slate-900 text-white p-6 md:p-8 border-4 md:border-6 border-yellow-400 transform rotate-1 max-w-2xl mx-auto shadow-brutal hover:rotate-0 transition-transform duration-300 mb-8 md:mb-10">
          <h3 className="text-xl md:text-2xl font-black uppercase mb-4 text-orange-300">
            ⏰ PENAWARAN BERAKHIR DALAM:
          </h3>
          <div className="grid grid-cols-4 gap-2 md:gap-4">
            {[
              { value: "23", label: "JAM" },
              { value: "45", label: "MENIT" },
              { value: "12", label: "DETIK" },
              { value: "678", label: "MS" },
            ].map((time, index) => (
              <div
                key={index}
                className="bg-orange-500 text-white p-3 md:p-4 border-3 border-white text-center animate-pulse"
              >
                <div className="text-lg md:text-2xl font-black">
                  {time.value}
                </div>
                <div className="text-xs md:text-sm font-bold">{time.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Push Message */}
        <div className="bg-white text-slate-900 p-4 md:p-6 border-4 md:border-6 border-slate-800 transform -rotate-1 max-w-3xl mx-auto shadow-brutal hover:rotate-0 transition-transform duration-300">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="text-3xl md:text-4xl">🎯</div>
            <div className="flex-1 text-center md:text-left">
              <p className="font-black text-sm md:text-base uppercase mb-2">
                BERGABUNGLAH DENGAN 50,000+ SISWA SUKSES!
              </p>
              <p className="text-xs md:text-sm font-bold text-slate-600">
                Ribuan siswa telah merasakan manfaatnya. Sekarang giliran kamu!
              </p>
            </div>
            <div className="text-3xl md:text-4xl">🚀</div>
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
