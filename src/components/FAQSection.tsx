"use client";

export default function FAQSection() {
  const faqs = [
    {
      id: 1,
      question: "🤔 APAKAH SOAL-SOAL DI PINTUUNIV SESUAI DENGAN UTBK ASLI?",
      answer:
        "Ya! Semua soal disusun oleh tim ahli yang berpengalaman dalam UTBK dan disesuaikan dengan kisi-kisi terbaru. Soal-soal kami juga rutin diupdate mengikuti perkembangan UTBK dan divalidasi oleh alumni yang telah lolos PTN favorit.",
      bgColor: "bg-orange-400",
      borderColor: "border-orange-400",
      rotation: "hover:rotate-1",
    },
    {
      id: 2,
      question: "💰 BAGAIMANA SISTEM PEMBAYARANNYA?",
      answer:
        "Kami menerima berbagai metode pembayaran: Transfer bank (BCA, Mandiri, BRI, BNI), e-wallet (GoPay, Dana, OVO, ShopeePay), dan kartu kredit. Pembayaran dapat dilakukan bulanan atau tahunan dengan diskon hingga 30%. Semua transaksi aman dan terenkripsi.",
      bgColor: "bg-blue-400",
      borderColor: "border-blue-400",
      rotation: "hover:-rotate-1",
    },
    {
      id: 3,
      question: "📱 APAKAH BISA DIAKSES MELALUI HP?",
      answer:
        "Tentu saja! PintuUniv dapat diakses melalui website yang mobile-friendly dan aplikasi mobile khusus untuk Android & iOS. Interface dioptimalkan untuk berbagai ukuran layar. Kamu bisa belajar kapan saja, di mana saja dengan sinkronisasi data real-time.",
      bgColor: "bg-emerald-400",
      borderColor: "border-emerald-400",
      rotation: "hover:rotate-1",
    },
    {
      id: 4,
      question: "🎯 BAGAIMANA CARA KERJA AI ANALYSIS?",
      answer:
        "AI kami menggunakan machine learning untuk menganalisis pola jawaban, waktu pengerjaan, tingkat kesulitan soal yang sering salah, dan progress belajar. Kemudian memberikan rekomendasi pembelajaran personal, prediksi skor UTBK, dan strategi belajar yang tepat untuk meningkatkan peluang lolos PTN impian.",
      bgColor: "bg-violet-400",
      borderColor: "border-violet-400",
      rotation: "hover:-rotate-1",
    },
    {
      id: 5,
      question: "🏆 APA GARANSI YANG DIBERIKAN?",
      answer:
        "Untuk paket Premium, kami memberikan garansi peningkatan skor minimal 100 poin atau uang kembali 100%. Jika target tidak tercapai dalam 3 bulan, kami akan memberikan bimbingan tambahan gratis hingga target tercapai atau refund penuh sesuai syarat & ketentuan.",
      bgColor: "bg-rose-400",
      borderColor: "border-rose-400",
      rotation: "hover:rotate-1",
    },
    {
      id: 6,
      question: "👨‍🏫 BAGAIMANA KUALITAS MENTOR DAN SUPPORT?",
      answer:
        "Semua mentor kami adalah lulusan PTN terbaik dengan pengalaman mengajar minimal 3 tahun. Support tersedia 24/7 melalui chat, email, dan video call. Untuk paket Premium, kamu mendapat mentor personal yang akan memantau progress dan memberikan guidance khusus sesuai kebutuhan belajarmu.",
      bgColor: "bg-indigo-400",
      borderColor: "border-indigo-400",
      rotation: "hover:-rotate-1",
    },
    {
      id: 7,
      question: "📊 BERAPA LAMA WAKTU YANG DIBUTUHKAN UNTUK MELIHAT HASIL?",
      answer:
        "Berdasarkan data alumni, 80% siswa mulai melihat peningkatan skor dalam 2-4 minggu pertama. Hasil optimal biasanya tercapai dalam 2-3 bulan dengan konsistensi belajar minimal 2 jam per hari. Sistem tracking kami akan membantu memantau progress harian secara detail.",
      bgColor: "bg-amber-400",
      borderColor: "border-amber-400",
      rotation: "hover:rotate-1",
    },
    {
      id: 8,
      question: "🔒 BAGAIMANA KEAMANAN DATA PRIBADI?",
      answer:
        "Data pribadi kamu dilindungi dengan enkripsi SSL 256-bit dan server tersertifikasi ISO 27001. Kami tidak membagikan informasi personal kepada pihak ketiga. Semua aktivitas belajar dan progress tersimpan aman dengan backup otomatis setiap hari.",
      bgColor: "bg-teal-400",
      borderColor: "border-teal-400",
      rotation: "hover:-rotate-1",
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background Elements - Hidden on small mobile */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden sm:block absolute top-20 left-4 lg:left-10 w-12 h-12 lg:w-16 lg:h-16 bg-orange-400 rotate-12 border-3 lg:border-4 border-white opacity-20 animate-pulse"></div>
        <div className="hidden sm:block absolute top-40 right-4 lg:right-20 w-8 h-8 lg:w-12 lg:h-12 bg-blue-400 rounded-full border-3 lg:border-4 border-white opacity-25 animate-bounce"></div>
        <div className="hidden md:block absolute bottom-32 left-4 lg:left-16 w-16 h-16 lg:w-20 lg:h-20 bg-emerald-400 rotate-45 border-3 lg:border-4 border-white opacity-15 animate-spin"></div>
        <div className="hidden md:block absolute bottom-20 right-6 lg:right-24 w-10 h-10 lg:w-14 lg:h-14 bg-violet-400 border-3 lg:border-4 border-white opacity-30 animate-float"></div>

        {/* Question marks - Optimized for mobile */}
        <div className="hidden sm:block absolute top-1/4 left-1/12 sm:left-1/6 text-3xl sm:text-4xl lg:text-6xl text-orange-300 opacity-10 animate-pulse">
          ?
        </div>
        <div className="hidden sm:block absolute bottom-1/4 right-1/12 sm:right-1/6 text-3xl sm:text-4xl lg:text-6xl text-blue-300 opacity-10 animate-bounce">
          ?
        </div>
        <div className="hidden md:block absolute top-2/3 left-1/3 text-2xl sm:text-3xl lg:text-4xl text-emerald-300 opacity-15 animate-pulse">
          ?
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-slate-900 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 border-3 sm:border-4 md:border-6 border-white transform -rotate-1 inline-block mb-4 sm:mb-6 md:mb-8 shadow-brutal hover:-rotate-2 transition-transform duration-300">
            <span className="text-xs sm:text-sm md:text-lg lg:text-xl font-black uppercase tracking-wider flex items-center gap-1 sm:gap-2">
              <span className="animate-bounce text-base sm:text-lg">❓</span>
              <span className="text-xs sm:text-sm md:text-lg lg:text-xl">
                PERTANYAAN UMUM
              </span>
              <span className="animate-pulse text-base sm:text-lg">💡</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6 md:mb-8 uppercase leading-none">
            <span className="block transform hover:scale-105 transition-transform duration-300">
              FAQ
            </span>
            <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 border-3 sm:border-4 md:border-6 lg:border-8 border-orange-400 transform rotate-2 inline-block shadow-brutal hover:rotate-3 hover:scale-105 transition-all duration-300 text-sm sm:text-base md:text-2xl lg:text-3xl xl:text-4xl mt-2 sm:mt-4">
              SEPUTAR PINTUUNIV
            </span>
          </h2>

          <div className="bg-gradient-to-r from-blue-500 to-violet-500 text-white p-3 sm:p-4 md:p-6 border-3 sm:border-4 md:border-6 border-orange-400 transform rotate-1 max-w-5xl mx-auto shadow-brutal hover:rotate-0 transition-transform duration-300">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg font-black uppercase flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              <span className="text-lg sm:text-xl md:text-2xl animate-spin">
                🤔
              </span>
              <span className="text-center">
                JAWABAN LENGKAP UNTUK SEMUA PERTANYAANMU!
              </span>
              <span className="text-lg sm:text-xl md:text-2xl animate-bounce">
                ✨
              </span>
            </p>
          </div>
        </div>

        {/* Enhanced FAQ Items */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="group">
              <div
                className={`bg-white border-3 sm:border-4 md:border-6 ${faq.borderColor} p-4 sm:p-5 md:p-6 lg:p-8 transform ${faq.rotation} transition-all duration-300 shadow-brutal hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-[1.01] sm:hover:scale-102 relative overflow-hidden`}
              >
                {/* Background Pattern - Smaller on mobile */}
                <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gray-100 opacity-50 rounded-full transform translate-x-4 sm:translate-x-6 md:translate-x-8 -translate-y-4 sm:-translate-y-6 md:-translate-y-8"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-gray-50 opacity-30 transform -translate-x-3 sm:-translate-x-4 md:-translate-x-6 translate-y-3 sm:translate-y-4 md:translate-y-6"></div>

                {/* Question Icon - Responsive size */}
                <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 text-lg sm:text-xl md:text-2xl opacity-20">
                  💭
                </div>

                <div className="relative z-10">
                  {/* Question */}
                  <h3 className="font-black text-slate-900 text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 md:mb-6 uppercase leading-tight group-hover:scale-105 transition-transform duration-300 pr-6 sm:pr-8">
                    {faq.question}
                  </h3>

                  {/* Answer */}
                  <div className="bg-gray-50 border-2 sm:border-3 border-slate-800 p-3 sm:p-4 md:p-6 mb-3 sm:mb-4 md:mb-6">
                    <p className="text-slate-800 font-bold text-xs sm:text-sm md:text-base leading-relaxed group-hover:scale-105 transition-transform duration-300">
                      {faq.answer}
                    </p>
                  </div>

                  {/* Helpful Badge - Mobile optimized */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                    <div className="bg-slate-900 text-white px-3 sm:px-4 py-1 sm:py-2 border-2 sm:border-3 border-slate-600 font-black uppercase text-xs sm:text-sm shadow-lg">
                      💡 HELPFUL INFO
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 text-xs sm:text-sm">
                      <span className="font-bold">Apakah ini membantu?</span>
                      <button className="text-emerald-500 hover:text-emerald-600 text-base sm:text-lg hover:scale-110 transition-all duration-300 p-1">
                        👍
                      </button>
                      <button className="text-rose-500 hover:text-rose-600 text-base sm:text-lg hover:scale-110 transition-all duration-300 p-1">
                        👎
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support Section */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-4 sm:p-6 md:p-8 lg:p-10 border-3 sm:border-4 md:border-6 border-white transform -rotate-1 shadow-brutal hover:rotate-0 transition-transform duration-300">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase mb-3 sm:mb-4 md:mb-6">
              🤝 MASIH ADA PERTANYAAN?
            </h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold mb-4 sm:mb-6 md:mb-8 opacity-90">
              Tim support kami siap membantu 24/7! Jangan ragu untuk menghubungi
              kami kapan saja.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
              <div className="bg-white text-slate-900 p-3 sm:p-4 md:p-6 border-2 sm:border-3 border-slate-800 transform hover:-rotate-2 hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 shadow-lg">
                <div className="text-xl sm:text-2xl md:text-3xl mb-2">📞</div>
                <h4 className="font-black text-xs sm:text-sm md:text-base uppercase mb-1 sm:mb-2">
                  PHONE SUPPORT
                </h4>
                <p className="text-xs sm:text-sm font-bold">+62 21 1234 5678</p>
              </div>

              <div className="bg-white text-slate-900 p-3 sm:p-4 md:p-6 border-2 sm:border-3 border-slate-800 transform hover:rotate-2 hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 shadow-lg">
                <div className="text-xl sm:text-2xl md:text-3xl mb-2">💬</div>
                <h4 className="font-black text-xs sm:text-sm md:text-base uppercase mb-1 sm:mb-2">
                  LIVE CHAT
                </h4>
                <p className="text-xs sm:text-sm font-bold">Available 24/7</p>
              </div>

              <div className="bg-white text-slate-900 p-3 sm:p-4 md:p-6 border-2 sm:border-3 border-slate-800 transform hover:-rotate-1 hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 shadow-lg">
                <div className="text-xl sm:text-2xl md:text-3xl mb-2">✉️</div>
                <h4 className="font-black text-xs sm:text-sm md:text-base uppercase mb-1 sm:mb-2">
                  EMAIL SUPPORT
                </h4>
                <p className="text-xs sm:text-sm font-bold">
                  help@pintuuniv.com
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <button className="bg-slate-900 text-orange-400 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 border-2 sm:border-3 md:border-4 border-white font-black uppercase hover:bg-slate-800 transition-all duration-300 text-xs sm:text-sm md:text-base transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-105 shadow-lg">
                💬 CHAT SEKARANG
              </button>

              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-300 text-base sm:text-lg">
                    ⚡
                  </span>
                  <span className="font-bold">Respon Cepat</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-300 text-base sm:text-lg">✓</span>
                  <span className="font-bold">Expert Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-white uppercase mb-2 sm:mb-4">
              📚 KATEGORI FAQ LAINNYA
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { icon: "💻", title: "TEKNIS", count: "12 FAQ" },
              { icon: "💳", title: "PEMBAYARAN", count: "8 FAQ" },
              { icon: "🎯", title: "BELAJAR", count: "15 FAQ" },
              { icon: "🏆", title: "HASIL", count: "6 FAQ" },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white text-slate-900 p-3 sm:p-4 border-2 sm:border-3 border-slate-800 transform hover:-rotate-2 hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 shadow-lg text-center cursor-pointer"
              >
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">
                  {category.icon}
                </div>
                <h4 className="font-black text-xs sm:text-sm uppercase mb-1">
                  {category.title}
                </h4>
                <p className="text-xs font-bold text-slate-600">
                  {category.count}
                </p>
              </div>
            ))}
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
