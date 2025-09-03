"use client";

export default function FeaturesSection() {
  const features = [
    {
      icon: "📚",
      title: "SOAL BERKUALITAS TINGGI",
      description:
        "10,000+ soal yang disusun oleh tim ahli, sesuai dengan kisi-kisi UTBK terbaru dan pola soal yang sering keluar.",
      bgColor: "from-orange-400 to-orange-500",
      bgLight: "bg-orange-100",
      borderColor: "border-orange-400",
      textColor: "text-orange-300",
      ctaText: "LIHAT DETAIL →",
      rotation: "hover:-rotate-2",
    },
    {
      icon: "📊",
      title: "ANALISIS SKOR DETAIL",
      description:
        "Sistem penilaian UTBK yang akurat dengan analisis mendalam untuk setiap kategori dan rekomendasi perbaikan.",
      bgColor: "from-blue-400 to-blue-500",
      bgLight: "bg-blue-100",
      borderColor: "border-blue-400",
      textColor: "text-blue-300",
      ctaText: "LIHAT ANALISIS →",
      rotation: "hover:rotate-2",
    },
    {
      icon: "⏰",
      title: "SIMULASI UJIAN REALISTIS",
      description:
        "Rasakan pengalaman ujian yang sesungguhnya dengan timer, interface, dan tingkat kesulitan seperti UTBK asli.",
      bgColor: "from-emerald-400 to-emerald-500",
      bgLight: "bg-emerald-100",
      borderColor: "border-emerald-400",
      textColor: "text-emerald-300",
      ctaText: "MULAI SIMULASI →",
      rotation: "hover:-rotate-1",
    },
    {
      icon: "🏆",
      title: "LEADERBOARD & RANKING",
      description:
        "Lihat peringkatmu di antara ribuan peserta lain dan motivasi diri untuk terus meningkatkan skor UTBK.",
      bgColor: "from-violet-400 to-violet-500",
      bgLight: "bg-violet-100",
      borderColor: "border-violet-400",
      textColor: "text-violet-300",
      ctaText: "LIHAT RANKING →",
      rotation: "hover:rotate-1",
    },
    {
      icon: "📊",
      title: "TRACKING PROGRESS",
      description:
        "Pantau perkembangan belajarmu dengan dashboard yang detail dan laporan kemajuan mingguan.",
      bgColor: "from-rose-400 to-rose-500",
      bgLight: "bg-rose-100",
      borderColor: "border-rose-400",
      textColor: "text-rose-300",
      ctaText: "LIHAT PROGRESS →",
      rotation: "hover:-rotate-2",
    },
    {
      icon: "🎯",
      title: "TARGET UNIVERSITAS",
      description:
        "Set target universitas dan jurusan impianmu, lalu dapatkan rekomendasi skor UTBK yang dibutuhkan.",
      bgColor: "from-amber-400 to-amber-500",
      bgLight: "bg-amber-100",
      borderColor: "border-amber-400",
      textColor: "text-amber-300",
      ctaText: "SET TARGET →",
      rotation: "hover:rotate-2",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 md:py-28 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rotate-12 border-4 border-slate-800 opacity-20 animate-float"></div>
        <div className="absolute top-40 right-16 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full border-4 border-slate-800 opacity-15 animate-pulse"></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-500 rotate-45 border-4 border-slate-800 opacity-10 animate-bounce"></div>
        <div className="absolute bottom-20 right-24 w-18 h-18 bg-gradient-to-br from-violet-400 to-violet-500 border-4 border-slate-800 opacity-25 animate-spin"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-orange-300 px-6 md:px-8 py-3 md:py-4 border-4 md:border-6 border-orange-500 transform rotate-2 inline-block mb-6 md:mb-8 shadow-brutal hover:rotate-3 transition-transform duration-300">
            <span className="text-sm md:text-xl font-black uppercase tracking-wider flex items-center gap-2">
              <span className="animate-pulse">✨</span>
              MENGAPA PINTUUNIV?
              <span className="animate-bounce">🚀</span>
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 md:mb-8 uppercase leading-none">
            <span className="block transform hover:scale-105 transition-transform duration-300">
              FITUR TERDEPAN
            </span>
            <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 md:px-4 py-2 md:py-3 border-4 md:border-8 border-slate-800 transform -rotate-1 inline-block shadow-brutal hover:-rotate-2 hover:scale-105 transition-all duration-300">
              UNTUK SUKSES
            </span>
          </h2>

          <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-white p-4 md:p-6 border-4 md:border-6 border-slate-800 transform rotate-1 max-w-4xl mx-auto shadow-brutal hover:rotate-0 transition-transform duration-300">
            <p className="text-sm md:text-lg font-black uppercase flex items-center justify-center gap-3">
              <span className="text-2xl animate-spin">⚙️</span>
              KAMI MENYEDIAKAN TOOLS DAN METODE PEMBELAJARAN PALING EFEKTIF!
              <span className="text-2xl animate-bounce">🎯</span>
            </p>
          </div>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div
                className={`bg-gradient-to-br ${feature.bgColor} border-4 md:border-6 border-slate-800 p-6 md:p-8 transform ${feature.rotation} hover:-translate-y-4 transition-all duration-300 shadow-brutal overflow-hidden relative`}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full transform translate-x-10 -translate-y-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-5 rounded-full transform -translate-x-8 translate-y-8"></div>

                <div className="relative z-10">
                  {/* Enhanced Icon */}
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white border-4 md:border-6 border-slate-800 flex items-center justify-center mb-4 md:mb-6 font-black text-2xl md:text-3xl shadow-brutal transform rotate-3 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                    {feature.icon}
                  </div>

                  {/* Enhanced Title */}
                  <h3 className="text-xl md:text-2xl font-black text-white mb-3 md:mb-4 uppercase leading-tight group-hover:scale-105 transition-transform duration-300">
                    {feature.title}
                  </h3>

                  {/* Enhanced Description */}
                  <p className="text-white font-bold leading-relaxed mb-4 md:mb-6 text-sm md:text-base opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    {feature.description}
                  </p>

                  {/* Enhanced CTA Button */}
                  <div className="bg-white text-slate-900 px-4 md:px-6 py-2 md:py-3 border-3 md:border-4 border-slate-800 inline-block font-black uppercase text-xs md:text-sm shadow-lg hover:bg-gray-100 hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                    {feature.ctaText}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tryout Categories Highlight */}
        <div className="mt-16 md:mt-20">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 md:p-10 border-4 md:border-6 border-orange-500 transform -rotate-1 shadow-brutal hover:rotate-0 transition-transform duration-300">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-black uppercase mb-4 md:mb-6 text-orange-300">
                📚 KATEGORI TRYOUT LENGKAP!
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-orange-500 text-white p-4 border-3 border-white transform rotate-1 shadow-lg">
                  <div className="text-2xl mb-2">🧠</div>
                  <h4 className="font-black text-sm uppercase mb-2">
                    TPS PENALARAN
                  </h4>
                  <p className="text-xs font-bold">Penalaran Umum & Logis</p>
                </div>
                <div className="bg-blue-500 text-white p-4 border-3 border-white transform -rotate-1 shadow-lg">
                  <div className="text-2xl mb-2">📖</div>
                  <h4 className="font-black text-sm uppercase mb-2">
                    LITERASI BAHASA
                  </h4>
                  <p className="text-xs font-bold">Indonesia & Inggris</p>
                </div>
                <div className="bg-emerald-500 text-white p-4 border-3 border-white transform rotate-1 shadow-lg">
                  <div className="text-2xl mb-2">🔢</div>
                  <h4 className="font-black text-sm uppercase mb-2">
                    PENGETAHUAN KUANTITATIF
                  </h4>
                  <p className="text-xs font-bold">Matematika & Logika</p>
                </div>
              </div>
            </div>
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
