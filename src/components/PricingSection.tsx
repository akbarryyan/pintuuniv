"use client";

export default function PricingSection() {
  const pricingPlans = [
    {
      id: 1,
      name: "BASIC",
      price: "49K",
      period: "/BULAN",
      description: "Untuk siswa yang baru memulai persiapan",
      bgColor: "bg-white",
      textColor: "text-slate-900",
      badgeColor: "bg-blue-400",
      buttonColor: "bg-blue-500 hover:bg-blue-600",
      popular: false,
      features: [
        "1,000 soal latihan",
        "3 tryout gratis per bulan",
        "Progress tracking basic",
        "Akses forum komunitas",
        "Pembahasan singkat",
        "Email support",
      ],
      ctaText: "PILIH BASIC →",
    },
    {
      id: 2,
      name: "PRO",
      price: "99K",
      period: "/BULAN",
      description: "Untuk siswa yang serius ingin lolos UTBK",
      bgColor: "bg-gradient-to-br from-orange-400 to-orange-500",
      textColor: "text-white",
      badgeColor: "bg-orange-100",
      buttonColor: "bg-orange-100 hover:bg-white text-slate-900",
      popular: true,
      features: [
        "10,000+ soal premium",
        "Unlimited tryout",
        "AI Analysis lengkap",
        "Video pembahasan eksklusif",
        "Mentor konsultasi 24/7",
        "Laporan progress detail",
        "Simulasi UTBK realistis",
        "Grup belajar premium",
      ],
      ctaText: "PILIH PRO →",
    },
    {
      id: 3,
      name: "PREMIUM",
      price: "199K",
      period: "/BULAN",
      description: "Untuk siswa yang ingin jaminan lolos PTN favorit",
      bgColor: "bg-gradient-to-br from-violet-400 to-violet-500",
      textColor: "text-white",
      badgeColor: "bg-violet-100",
      buttonColor: "bg-violet-100 hover:bg-white text-slate-900",
      popular: false,
      features: [
        "Semua fitur PRO",
        "Mentor personal 1-on-1",
        "Live class eksklusif",
        "Garansi nilai minimal",
        "Akses selamanya",
        "Konsultasi jurusan",
        "Mock interview",
        "Prioritas support",
      ],
      ctaText: "PILIH PREMIUM →",
    },
  ];

  const additionalBenefits = [
    {
      icon: "🎁",
      title: "E-BOOK GRATIS",
      desc: "Strategi Lolos UTBK",
      color: "bg-orange-500",
    },
    {
      icon: "🎬",
      title: "VIDEO TUTORIAL",
      desc: "Tips & Trik Eksklusif",
      color: "bg-blue-500",
    },
    {
      icon: "🏆",
      title: "SERTIFIKAT",
      desc: "Completion Certificate",
      color: "bg-emerald-500",
    },
    {
      icon: "💎",
      title: "AKSES PREMIUM",
      desc: "Materi Eksklusif",
      color: "bg-violet-500",
    },
  ];

  return (
    <section
      id="pricing"
      className="py-20 md:py-28 bg-gradient-to-br from-orange-50 via-orange-100 to-yellow-50 relative overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rotate-12 border-4 border-slate-800 opacity-15 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full border-4 border-slate-800 opacity-20 animate-bounce"></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 bg-gradient-to-br from-violet-400 to-violet-500 rotate-45 border-4 border-slate-800 opacity-10 animate-spin"></div>
        <div className="absolute bottom-20 right-16 w-18 h-18 bg-gradient-to-br from-emerald-400 to-emerald-500 border-4 border-slate-800 opacity-25 animate-float"></div>

        {/* Money symbols */}
        <div className="absolute top-1/3 left-1/5 text-4xl text-orange-300 opacity-20 animate-pulse">
          💰
        </div>
        <div className="absolute bottom-1/3 right-1/5 text-4xl text-blue-300 opacity-20 animate-bounce">
          💎
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-orange-300 px-6 md:px-8 py-3 md:py-4 border-4 md:border-6 border-orange-500 transform -rotate-2 inline-block mb-6 md:mb-8 shadow-brutal hover:-rotate-3 transition-transform duration-300">
            <span className="text-sm md:text-xl font-black uppercase tracking-wider flex items-center gap-2">
              <span className="animate-bounce">💳</span>
              PILIH PAKETMU!
              <span className="animate-pulse">✨</span>
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 md:mb-8 uppercase leading-none">
            <span className="block transform hover:scale-105 transition-transform duration-300">
              HARGA TERJANGKAU
            </span>
            <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 md:px-4 py-2 md:py-3 border-4 md:border-8 border-slate-800 transform rotate-1 inline-block shadow-brutal hover:rotate-2 hover:scale-105 transition-all duration-300">
              KUALITAS PREMIUM
            </span>
          </h2>

          <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-white p-4 md:p-6 border-4 md:border-6 border-slate-800 transform -rotate-1 max-w-4xl mx-auto shadow-brutal hover:rotate-0 transition-transform duration-300">
            <p className="text-sm md:text-lg font-black uppercase flex items-center justify-center gap-3">
              <span className="text-2xl animate-spin">💎</span>
              INVESTASI TERBAIK UNTUK MASA DEPANMU!
              <span className="text-2xl animate-bounce">🎯</span>
            </p>
          </div>
        </div>

        {/* Enhanced Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {pricingPlans.map((plan, index) => (
            <div key={plan.id} className="group relative">
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 md:px-6 py-2 md:py-3 border-3 md:border-4 border-slate-800 font-black uppercase text-xs md:text-sm shadow-brutal transform rotate-3 hover:rotate-4 transition-transform duration-300">
                    🔥 PALING POPULER!
                  </div>
                </div>
              )}

              <div
                className={`${plan.bgColor} border-4 md:border-6 border-slate-800 p-6 md:p-8 transform hover:-rotate-1 hover:-translate-y-6 hover:scale-105 transition-all duration-300 shadow-brutal relative overflow-hidden`}
              >
                {/* Background Pattern */}
                {plan.popular && (
                  <>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full transform translate-x-12 -translate-y-12"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-white opacity-5 rounded-full transform -translate-x-10 translate-y-10"></div>
                  </>
                )}

                <div className="relative z-10">
                  {/* Plan Header */}
                  <div className="text-center mb-6 md:mb-8">
                    <div
                      className={`${plan.badgeColor} ${
                        plan.popular ? "text-slate-900" : "text-slate-900"
                      } px-4 md:px-6 py-2 md:py-3 border-3 md:border-4 border-slate-800 inline-block mb-4 md:mb-6 font-black uppercase text-sm md:text-base transform hover:rotate-3 transition-transform duration-300 shadow-lg`}
                    >
                      {plan.name}
                    </div>

                    <div className="mb-4 md:mb-6">
                      <span
                        className={`text-4xl md:text-6xl font-black ${plan.textColor} group-hover:scale-110 transition-transform duration-300`}
                      >
                        {plan.price}
                      </span>
                      <span
                        className={`text-lg md:text-xl font-black ${
                          plan.textColor === "text-white"
                            ? "text-gray-200"
                            : "text-slate-600"
                        } ml-2`}
                      >
                        {plan.period}
                      </span>
                    </div>

                    <p
                      className={`${
                        plan.textColor === "text-white"
                          ? "text-gray-200"
                          : "text-slate-700"
                      } font-bold text-sm md:text-base leading-relaxed`}
                    >
                      {plan.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-emerald-400 border-2 md:border-3 border-slate-800 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0 group-hover:rotate-12 transition-transform duration-300">
                          <span className="text-slate-900 font-black text-xs md:text-sm">
                            ✓
                          </span>
                        </div>
                        <span
                          className={`${plan.textColor} font-bold text-sm md:text-base flex-1 group-hover:scale-105 transition-transform duration-300`}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full ${plan.buttonColor} py-4 md:py-5 border-4 md:border-6 border-slate-800 font-black uppercase text-sm md:text-base transition-all duration-300 shadow-brutal hover:-translate-y-2 hover:scale-105`}
                  >
                    {plan.ctaText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-8 md:mb-10">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase mb-4">
              🎁 BONUS EKSKLUSIF UNTUK SEMUA PAKET!
            </h3>
            <p className="text-slate-700 font-bold text-sm md:text-base">
              Dapatkan benefit tambahan yang senilai jutaan rupiah
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {additionalBenefits.map((benefit, index) => (
              <div
                key={index}
                className={`${benefit.color} text-white p-6 md:p-8 border-4 md:border-6 border-slate-800 transform hover:-rotate-2 hover:-translate-y-3 hover:scale-105 transition-all duration-300 shadow-brutal text-center`}
              >
                <div className="text-3xl md:text-4xl mb-3 md:mb-4 animate-bounce">
                  {benefit.icon}
                </div>
                <h4 className="font-black text-sm md:text-base uppercase mb-2 md:mb-3">
                  {benefit.title}
                </h4>
                <p className="text-xs md:text-sm font-bold opacity-90">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Special Offer CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-orange-300 p-6 md:p-10 border-4 md:border-6 border-orange-500 transform rotate-2 max-w-4xl mx-auto shadow-brutal hover:rotate-0 transition-transform duration-300">
            <div className="mb-4 md:mb-6">
              <h3 className="text-2xl md:text-4xl font-black uppercase mb-3 md:mb-4 flex items-center justify-center gap-3">
                <span className="animate-spin">🎉</span>
                SPECIAL OFFER!
                <span className="animate-bounce">🎉</span>
              </h3>
              <p className="text-sm md:text-lg font-bold mb-4 md:mb-6">
                Daftar sekarang dan dapatkan{" "}
                <span className="bg-orange-500 text-white px-2 py-1 border-2 border-orange-300">
                  7 hari gratis
                </span>{" "}
                untuk semua paket!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-orange-500 text-white px-6 md:px-8 py-3 md:py-4 border-3 md:border-4 border-orange-300 font-black uppercase hover:bg-orange-600 transition-all duration-300 text-sm md:text-base transform hover:-translate-y-2 hover:scale-105 shadow-lg">
                🔥 KLAIM TRIAL GRATIS →
              </button>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-emerald-400 text-lg">✓</span>
                  <span className="font-bold">No Credit Card</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-emerald-400 text-lg">✓</span>
                  <span className="font-bold">Cancel Anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="bg-emerald-400 text-slate-900 p-4 md:p-6 border-4 border-slate-800 transform -rotate-1 inline-block shadow-brutal hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl animate-pulse">🛡️</span>
              <span className="font-black text-sm md:text-base uppercase">
                30 HARI MONEY BACK GUARANTEE
              </span>
              <span className="text-2xl animate-pulse">💰</span>
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
