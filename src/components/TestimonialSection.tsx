"use client";

export default function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: "SARAH PUTRI",
      university: "UI - Fakultas Kedokteran",
      avatar: "👩",
      quote:
        "PintuUniv benar-benar game changer! Soal-soalnya mirip banget sama UTBK asli. Analisis AI-nya membantu banget ngasih tau kelemahan aku di mana.",
      bgColor: "from-orange-400 to-orange-500",
      bgLight: "bg-orange-100",
      textColor: "text-slate-900",
      rating: 5,
      achievement: "Skor UTBK: 725",
    },
    {
      id: 2,
      name: "BUDI SANTOSO",
      university: "ITB - Teknik Informatika",
      avatar: "👨",
      quote:
        "Mentor personalnya luar biasa! Selalu siap bantu 24/7. Berkat PintuUniv, aku bisa lolos ITB dengan skor yang memuaskan.",
      bgColor: "from-blue-400 to-blue-500",
      bgLight: "bg-blue-100",
      textColor: "text-white",
      rating: 5,
      achievement: "Ranking 15 Nasional",
    },
    {
      id: 3,
      name: "MAYA SARI",
      university: "UGM - Fakultas Hukum",
      avatar: "👩",
      quote:
        "Fitur simulasi ujiannya keren banget! Bikin aku udah terbiasa sama tekanan waktu sebelum UTBK. Hasilnya? Alhamdulillah keterima di UGM!",
      bgColor: "from-emerald-400 to-emerald-500",
      bgLight: "bg-emerald-100",
      textColor: "text-white",
      rating: 5,
      achievement: "Top 10 Fakultas",
    },
    {
      id: 4,
      name: "RIZKI PRATAMA",
      university: "UNPAD - Fakultas Ekonomi",
      avatar: "👨",
      quote:
        "Sistem pelacakan progressnya detail banget! Aku jadi tau exactly dimana yang perlu diperbaiki. Rekomended banget buat yang serius UTBK!",
      bgColor: "from-violet-400 to-violet-500",
      bgLight: "bg-violet-100",
      textColor: "text-white",
      rating: 5,
      achievement: "Skor meningkat 150 poin",
    },
    {
      id: 5,
      name: "INDIRA SARI",
      university: "UNAIR - Fakultas Psikologi",
      avatar: "👩",
      quote:
        "Komunitasnya solid banget! Saling support dan sharing tips. Plus materinya selalu update sesuai kisi-kisi terbaru UTBK.",
      bgColor: "from-rose-400 to-rose-500",
      bgLight: "bg-rose-100",
      textColor: "text-white",
      rating: 5,
      achievement: "Alumni Berprestasi",
    },
    {
      id: 6,
      name: "AHMAD FADIL",
      university: "ITS - Teknik Sipil",
      avatar: "👨",
      quote:
        "Tryoutnya challenging tapi fair. Pembahasan soalnya lengkap dan mudah dipahami. Berkat PintuUniv, confident level aku naik drastis!",
      bgColor: "from-indigo-400 to-indigo-500",
      bgLight: "bg-indigo-100",
      textColor: "text-white",
      rating: 5,
      achievement: "Lolos Jalur Mandiri",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-white via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rotate-12 border-4 border-slate-800 opacity-15 animate-float"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full border-4 border-slate-800 opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-500 rotate-45 border-4 border-slate-800 opacity-10 animate-bounce"></div>
        <div className="absolute bottom-20 right-24 w-14 h-14 bg-gradient-to-br from-violet-400 to-violet-500 border-4 border-slate-800 opacity-25 animate-spin"></div>

        {/* Additional floating quotes */}
        <div className="absolute top-1/3 left-1/4 text-6xl text-orange-200 opacity-30 animate-pulse">
          "
        </div>
        <div className="absolute bottom-1/3 right-1/4 text-6xl text-blue-200 opacity-30 animate-pulse">
          "
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-orange-300 px-6 md:px-8 py-3 md:py-4 border-4 md:border-6 border-emerald-500 transform -rotate-2 inline-block mb-6 md:mb-8 shadow-brutal hover:-rotate-3 transition-transform duration-300">
            <span className="text-sm md:text-xl font-black uppercase tracking-wider flex items-center gap-2">
              <span className="animate-pulse">💬</span>
              KATA MEREKA
              <span className="animate-bounce">⭐</span>
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 md:mb-8 uppercase leading-none">
            <span className="block transform hover:scale-105 transition-transform duration-300">
              TESTIMONI
            </span>
            <span className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-3 md:px-4 py-2 md:py-3 border-4 md:border-8 border-slate-800 transform rotate-1 inline-block shadow-brutal hover:rotate-2 hover:scale-105 transition-all duration-300">
              ALUMNI SUKSES
            </span>
          </h2>

          <div className="bg-gradient-to-r from-blue-500 to-violet-500 text-white p-4 md:p-6 border-4 md:border-6 border-slate-800 transform -rotate-1 max-w-4xl mx-auto shadow-brutal hover:rotate-0 transition-transform duration-300">
            <p className="text-sm md:text-lg font-black uppercase flex items-center justify-center gap-3">
              <span className="text-2xl animate-spin">🎯</span>
              CERITA SUKSES DARI 15,000+ ALUMNI KAMI!
              <span className="text-2xl animate-bounce">🚀</span>
            </p>
          </div>
        </div>

        {/* Enhanced Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="group">
              <div
                className={`bg-gradient-to-br ${testimonial.bgColor} border-4 md:border-6 border-slate-800 p-6 md:p-8 transform hover:-rotate-2 hover:-translate-y-4 hover:scale-105 transition-all duration-300 shadow-brutal relative overflow-hidden`}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full transform translate-x-10 -translate-y-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-5 transform -translate-x-8 translate-y-8"></div>

                {/* Quote Icon */}
                <div className="absolute top-4 left-4 text-4xl text-white opacity-20">
                  "
                </div>

                <div className="relative z-10">
                  {/* User Info */}
                  <div className="flex items-center mb-4 md:mb-6">
                    <div
                      className={`w-12 h-12 md:w-16 md:h-16 ${testimonial.bgLight} border-4 border-slate-800 rounded-full flex items-center justify-center mr-3 md:mr-4 font-black text-xl md:text-2xl shadow-lg group-hover:rotate-12 transition-transform duration-300`}
                    >
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <h4
                        className={`font-black ${testimonial.textColor} text-sm md:text-base group-hover:scale-105 transition-transform duration-300`}
                      >
                        {testimonial.name}
                      </h4>
                      <p
                        className={`${
                          testimonial.textColor === "text-slate-900"
                            ? "text-slate-800"
                            : "text-white"
                        } font-bold text-xs md:text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300`}
                      >
                        {testimonial.university}
                      </p>
                      <div className="bg-white text-slate-900 px-2 py-1 border-2 border-slate-800 inline-block mt-1 font-black text-xs">
                        {testimonial.achievement}
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <p
                    className={`${testimonial.textColor} font-bold text-sm md:text-base leading-relaxed mb-4 md:mb-6 italic group-hover:scale-105 transition-transform duration-300`}
                  >
                    "{testimonial.quote}"
                  </p>

                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span
                          key={i}
                          className="text-yellow-400 text-lg md:text-xl group-hover:animate-bounce"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                    <div className="bg-white text-slate-900 px-3 py-1 border-2 border-slate-800 font-black text-xs uppercase shadow-lg">
                      VERIFIED ✓
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Stats */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 md:p-10 border-4 md:border-6 border-orange-500 transform rotate-1 shadow-brutal hover:rotate-0 transition-transform duration-300">
          <div className="text-center mb-6 md:mb-8">
            <h3 className="text-2xl md:text-3xl font-black uppercase mb-4 text-orange-300">
              📊 STATISTIK KESUKSESAN
            </h3>
            <p className="text-white font-bold opacity-90">
              Data real dari alumni yang telah bergabung dengan PintuUniv
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center p-4 bg-orange-500 border-3 border-white transform hover:scale-105 transition-transform duration-300">
              <div className="text-2xl md:text-3xl font-black text-white mb-2">
                92%
              </div>
              <div className="text-xs md:text-sm font-bold text-white uppercase">
                Lolos PTN Favorit
              </div>
            </div>
            <div className="text-center p-4 bg-blue-500 border-3 border-white transform hover:scale-105 transition-transform duration-300">
              <div className="text-2xl md:text-3xl font-black text-white mb-2">
                4.8
              </div>
              <div className="text-xs md:text-sm font-bold text-white uppercase">
                Rating Alumni
              </div>
            </div>
            <div className="text-center p-4 bg-emerald-500 border-3 border-white transform hover:scale-105 transition-transform duration-300">
              <div className="text-2xl md:text-3xl font-black text-white mb-2">
                180
              </div>
              <div className="text-xs md:text-sm font-bold text-white uppercase">
                Rata-rata Kenaikan Skor
              </div>
            </div>
            <div className="text-center p-4 bg-violet-500 border-3 border-white transform hover:scale-105 transition-transform duration-300">
              <div className="text-2xl md:text-3xl font-black text-white mb-2">
                30
              </div>
              <div className="text-xs md:text-sm font-bold text-white uppercase">
                Hari Rata-rata Persiapan
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
