"use client";

export default function StatisticsSection() {
  const mainStats = [
    {
      icon: "📈",
      value: "98%",
      label: "Tingkat Kepuasan",
      bgColor: "from-orange-400 to-orange-500",
      rotation: "hover:rotate-3",
      description: "Siswa merasa puas dengan layanan kami",
    },
    {
      icon: "🎓",
      value: "89%",
      label: "Lolos SNBT",
      bgColor: "from-blue-400 to-blue-500",
      rotation: "hover:-rotate-3",
      description: "Alumni berhasil masuk PTN favorit",
    },
    {
      icon: "🏆",
      value: "15K+",
      label: "Alumni Sukses",
      bgColor: "from-emerald-400 to-emerald-500",
      rotation: "hover:rotate-2",
      description: "Lulusan yang berhasil mencapai impian",
    },
    {
      icon: "🏛️",
      value: "500+",
      label: "PTN Partner",
      bgColor: "from-violet-400 to-violet-500",
      rotation: "hover:-rotate-2",
      description: "Universitas yang bekerja sama",
    },
  ];

  const additionalStats = [
    {
      icon: "⭐",
      value: "4.9",
      label: "Rating App Store",
      color: "text-yellow-400",
    },
    {
      icon: "💡",
      value: "1M+",
      label: "Soal Diselesaikan",
      color: "text-blue-400",
    },
    {
      icon: "🚀",
      value: "24/7",
      label: "Support Active",
      color: "text-emerald-400",
    },
    {
      icon: "🎯",
      value: "95%",
      label: "Accuracy Rate",
      color: "text-violet-400",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Background Shapes */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-orange-400 rotate-45 border-4 border-white opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-blue-400 rounded-full border-4 border-white opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 left-16 w-20 h-20 bg-emerald-400 border-4 border-white opacity-25 animate-spin"></div>
        <div className="absolute bottom-20 right-16 w-14 h-14 bg-violet-400 rotate-12 border-4 border-white opacity-20 animate-ping"></div>

        {/* Additional floating elements */}
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-rose-400 rounded-full border-2 border-white opacity-15 animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-10 h-10 bg-indigo-400 rotate-45 border-2 border-white opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-amber-400 border-2 border-white opacity-25 animate-bounce"></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-slate-900 px-6 md:px-8 py-3 md:py-4 border-4 md:border-6 border-white transform rotate-2 inline-block mb-6 md:mb-8 shadow-brutal hover:rotate-3 transition-transform duration-300">
            <span className="text-sm md:text-xl font-black uppercase tracking-wider flex items-center gap-2">
              <span className="animate-bounce">📊</span>
              PENCAPAIAN KAMI
              <span className="animate-pulse">✨</span>
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 md:mb-8 uppercase leading-none">
            <span className="block transform hover:scale-105 transition-transform duration-300">
              HASIL NYATA
            </span>
            <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 md:px-4 py-2 md:py-3 border-4 md:border-8 border-orange-400 transform -rotate-1 inline-block shadow-brutal hover:-rotate-2 hover:scale-105 transition-all duration-300">
              YANG MEMBANGGAKAN
            </span>
          </h2>

          <div className="bg-gradient-to-r from-blue-500 to-violet-500 text-white p-4 md:p-6 border-4 md:border-6 border-orange-400 transform -rotate-1 max-w-4xl mx-auto shadow-brutal hover:rotate-0 transition-transform duration-300">
            <p className="text-sm md:text-lg font-black uppercase flex items-center justify-center gap-3">
              <span className="text-2xl animate-spin">🎯</span>
              BUKTI NYATA KEBERHASILAN SISWA PINTUUNIV!
              <span className="text-2xl animate-bounce">🚀</span>
            </p>
          </div>
        </div>

        {/* Enhanced Main Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20">
          {mainStats.map((stat, index) => (
            <div key={index} className="group">
              <div
                className={`bg-gradient-to-br ${stat.bgColor} text-white p-6 md:p-8 border-4 md:border-6 border-white transform ${stat.rotation} hover:-translate-y-4 hover:scale-105 transition-all duration-300 shadow-brutal relative overflow-hidden`}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-10 rounded-full transform translate-x-8 -translate-y-8"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-white opacity-5 transform -translate-x-6 translate-y-6"></div>

                <div className="relative z-10 text-center">
                  {/* Enhanced Icon */}
                  <div className="text-3xl md:text-4xl mb-3 md:mb-4 group-hover:scale-110 group-hover:animate-bounce transition-all duration-300">
                    {stat.icon}
                  </div>

                  {/* Enhanced Value */}
                  <div className="text-3xl md:text-5xl font-black mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                    {stat.value}
                  </div>

                  {/* Enhanced Label */}
                  <div className="font-bold text-xs md:text-sm uppercase tracking-wider mb-2 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    {stat.label}
                  </div>

                  {/* Description */}
                  <div className="text-xs opacity-80 font-medium group-hover:opacity-100 transition-opacity duration-300">
                    {stat.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Stats Row */}
        <div className="bg-white border-4 md:border-6 border-slate-800 p-6 md:p-10 transform hover:rotate-1 transition-all duration-300 shadow-brutal mb-16 md:mb-20">
          <div className="text-center mb-6 md:mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase mb-4">
              📈 STATISTIK TAMBAHAN
            </h3>
            <p className="text-slate-700 font-bold">
              Data real-time yang menunjukkan kualitas layanan kami
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {additionalStats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 md:p-6 bg-gray-50 border-3 border-slate-800 transform hover:-translate-y-2 hover:rotate-1 transition-all duration-300 shadow-lg"
              >
                <div className={`text-2xl md:text-3xl mb-2 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="text-xl md:text-2xl font-black text-slate-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-bold text-slate-700 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Showcase */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Award 1 */}
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 border-4 md:border-6 border-slate-800 p-6 md:p-8 transform hover:-rotate-2 hover:-translate-y-4 transition-all duration-300 shadow-brutal">
            <div className="text-center text-slate-900">
              <div className="text-4xl md:text-5xl mb-4 animate-bounce">🏆</div>
              <h4 className="font-black text-lg md:text-xl uppercase mb-3">
                BEST EDUCATION PLATFORM
              </h4>
              <p className="text-sm md:text-base font-bold">
                Indonesia Education Awards 2024
              </p>
              <div className="mt-4">
                <div className="bg-slate-900 text-yellow-400 px-4 py-2 border-3 border-white font-black text-xs uppercase">
                  CERTIFIED ✓
                </div>
              </div>
            </div>
          </div>

          {/* Award 2 */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 border-4 md:border-6 border-slate-800 p-6 md:p-8 transform hover:rotate-2 hover:-translate-y-4 transition-all duration-300 shadow-brutal">
            <div className="text-center text-white">
              <div className="text-4xl md:text-5xl mb-4 animate-pulse">🥇</div>
              <h4 className="font-black text-lg md:text-xl uppercase mb-3">
                TOP TRYOUT PLATFORM
              </h4>
              <p className="text-sm md:text-base font-bold opacity-90">
                Student Choice Awards 2024
              </p>
              <div className="mt-4">
                <div className="bg-white text-blue-600 px-4 py-2 border-3 border-blue-300 font-black text-xs uppercase">
                  VERIFIED ✓
                </div>
              </div>
            </div>
          </div>

          {/* Award 3 */}
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 border-4 md:border-6 border-slate-800 p-6 md:p-8 transform hover:-rotate-1 hover:-translate-y-4 transition-all duration-300 shadow-brutal">
            <div className="text-center text-white">
              <div className="text-4xl md:text-5xl mb-4 animate-spin">🎖️</div>
              <h4 className="font-black text-lg md:text-xl uppercase mb-3">
                INNOVATION LEADER
              </h4>
              <p className="text-sm md:text-base font-bold opacity-90">
                EdTech Innovation Summit 2024
              </p>
              <div className="mt-4">
                <div className="bg-white text-emerald-600 px-4 py-2 border-3 border-emerald-300 font-black text-xs uppercase">
                  AWARDED ✓
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-16 md:mt-20 text-center">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6 md:p-8 border-4 md:border-6 border-orange-500 transform rotate-1 inline-block shadow-brutal hover:rotate-0 transition-transform duration-300">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-pulse">🔒</span>
                <span className="font-black text-sm md:text-base">
                  DATA AMAN
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-bounce">⚡</span>
                <span className="font-black text-sm md:text-base">
                  FAST LOADING
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-pulse">💎</span>
                <span className="font-black text-sm md:text-base">
                  PREMIUM QUALITY
                </span>
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
          animation: float 8s ease-in-out infinite;
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
