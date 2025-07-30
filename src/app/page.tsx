import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-orange-50 relative overflow-x-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-300 rounded-full animate-float opacity-60"></div>
        <div
          className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-300 rounded-full animate-bounce opacity-40"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-emerald-300 rounded-full animate-ping opacity-50"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/3 w-4 h-4 bg-violet-300 rounded-full animate-pulse opacity-30"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-rose-300 rounded-full animate-bounce opacity-70"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/6 w-2 h-2 bg-amber-300 rounded-full animate-float opacity-50"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute bottom-2/3 right-1/6 w-3 h-3 bg-orange-300 rounded-full animate-ping opacity-40"
          style={{ animationDelay: "2.5s" }}
        ></div>
        <div
          className="absolute top-3/4 left-2/3 w-2 h-2 bg-blue-300 rounded-full animate-pulse opacity-60"
          style={{ animationDelay: "0.8s" }}
        ></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-4 md:left-10 w-12 md:w-24 h-12 md:h-24 bg-orange-400 rotate-12 border-3 border-slate-800 opacity-80 z-10"></div>
      <div className="absolute top-40 right-4 md:right-20 w-8 md:w-16 h-8 md:h-16 bg-blue-400 rounded-full border-3 border-slate-800 opacity-80 z-10"></div>
      <div className="absolute bottom-40 left-4 md:left-20 w-10 md:w-20 h-10 md:h-20 bg-emerald-400 rotate-45 border-3 border-slate-800 opacity-80 z-10"></div>
      <div className="absolute bottom-20 right-8 md:right-40 w-8 md:w-14 h-8 md:h-14 bg-violet-400 border-3 border-slate-800 opacity-80 z-10"></div>

      {/* Navigation */}
      <nav className="bg-slate-900 border-b-4 border-orange-400 relative z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-18">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-400 border-3 border-slate-800 rotate-12 flex items-center justify-center mr-3 md:mr-4 font-black text-sm md:text-lg shadow-md">
                  🎯
                </div>
                <span className="text-xl md:text-3xl font-black text-white uppercase tracking-wider">
                  PintuUniv
                </span>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-white p-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-3 lg:space-x-4">
                <a
                  href="#features"
                  className="bg-blue-400 text-slate-900 px-3 py-2 md:px-4 md:py-2 font-bold uppercase border-3 border-slate-800 hover:bg-blue-300 transform hover:-translate-y-1 transition-all duration-200 text-xs md:text-sm shadow-md"
                >
                  Fitur
                </a>
                <a
                  href="#pricing"
                  className="bg-emerald-400 text-slate-900 px-3 py-2 md:px-4 md:py-2 font-bold uppercase border-3 border-slate-800 hover:bg-emerald-300 transform hover:-translate-y-1 transition-all duration-200 text-xs md:text-sm shadow-md"
                >
                  Harga
                </a>
                <a
                  href="#about"
                  className="bg-violet-400 text-slate-900 px-3 py-2 md:px-4 md:py-2 font-bold uppercase border-3 border-slate-800 hover:bg-violet-300 transform hover:-translate-y-1 transition-all duration-200 text-xs md:text-sm shadow-md"
                >
                  Tentang
                </a>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
              <button className="bg-white text-slate-900 px-3 py-2 md:px-4 md:py-2 font-bold uppercase border-3 border-slate-800 hover:bg-orange-100 transform hover:-translate-y-1 transition-all duration-200 text-xs md:text-sm shadow-md">
                Masuk
              </button>
              <button className="bg-orange-500 text-white px-3 py-2 md:px-4 md:py-2 font-bold uppercase border-3 border-slate-800 hover:bg-orange-400 transform hover:-translate-y-1 transition-all duration-200 shadow-lg text-xs md:text-sm">
                Daftar
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Main Heading */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-4 md:mb-6 leading-none tracking-tighter uppercase transform rotate-1">
                RAIH PTN
                <br />
                <span className="bg-orange-500 text-white px-2 md:px-3 py-1 md:py-2 border-3 md:border-6 border-slate-800 transform -rotate-2 inline-block shadow-lg">
                  IMPIANMU!
                </span>
              </h1>

              <div className="bg-slate-900 text-orange-300 px-3 md:px-6 py-2 md:py-4 border-3 md:border-6 border-orange-500 transform rotate-1 inline-block mb-4 md:mb-6 shadow-lg">
                <p className="text-sm sm:text-lg md:text-2xl font-black uppercase tracking-wider">
                  🎯 PLATFORM #1 INDONESIA
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="max-w-4xl mx-auto mb-6 md:mb-8">
              <div className="bg-white border-3 md:border-6 border-slate-800 p-3 md:p-6 transform -rotate-1 shadow-lg">
                <p className="text-sm sm:text-base md:text-lg text-slate-900 font-bold leading-tight">
                  Bergabung dengan{" "}
                  <span className="bg-orange-300 px-2 py-1 border-2 md:border-3 border-slate-800">
                    50,000+ SISWA
                  </span>{" "}
                  yang telah berhasil masuk PTN favorit. Latihan soal
                  terlengkap, analisis mendalam, dan bimbingan personal untuk
                  memastikan kamu siap menghadapi UTBK-SNBT.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12 px-4">
              <button className="group bg-emerald-400 text-slate-900 px-4 md:px-6 py-3 md:py-4 font-black text-sm md:text-base uppercase border-3 md:border-6 border-slate-800 transform hover:-rotate-1 hover:-translate-y-2 transition-all duration-200 shadow-lg w-full sm:w-auto">
                <span className="flex items-center justify-center gap-2">
                  ⚡ MULAI TRYOUT GRATIS
                </span>
              </button>

              <button className="group bg-blue-400 text-slate-900 px-4 md:px-6 py-3 md:py-4 font-black text-sm md:text-base uppercase border-3 md:border-6 border-slate-800 transform hover:rotate-1 hover:-translate-y-2 transition-all duration-200 shadow-lg w-full sm:w-auto">
                <span className="flex items-center justify-center gap-2">
                  👀 LIHAT DEMO
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <div className="bg-orange-500 text-white p-3 md:p-4 border-3 md:border-6 border-slate-800 transform rotate-2 shadow-lg">
                <div className="text-2xl md:text-3xl font-black mb-1">50K+</div>
                <div className="font-bold text-xs md:text-sm uppercase">
                  SISWA AKTIF
                </div>
              </div>
              <div className="bg-blue-500 text-white p-3 md:p-4 border-3 md:border-6 border-slate-800 transform -rotate-1 shadow-lg">
                <div className="text-2xl md:text-3xl font-black mb-1">95%</div>
                <div className="font-bold text-xs md:text-sm uppercase">
                  LULUS PTN
                </div>
              </div>
              <div className="bg-violet-500 text-white p-3 md:p-4 border-3 md:border-6 border-slate-800 transform rotate-1 shadow-lg">
                <div className="text-2xl md:text-3xl font-black mb-1">10K+</div>
                <div className="font-bold text-xs md:text-sm uppercase">
                  SOAL PREMIUM
                </div>
              </div>
              <div className="bg-emerald-500 text-white p-3 md:p-4 border-3 md:border-6 border-slate-800 transform -rotate-2 shadow-lg">
                <div className="text-2xl md:text-3xl font-black mb-1">24/7</div>
                <div className="font-bold text-xs md:text-sm uppercase">
                  SUPPORT
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="bg-slate-900 text-orange-300 px-3 md:px-6 py-2 md:py-3 border-3 md:border-6 border-orange-500 transform rotate-2 inline-block mb-4 md:mb-6 shadow-lg">
              <span className="text-sm md:text-lg font-black uppercase tracking-wider">
                MENGAPA PINTUUNIV?
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6 uppercase leading-none">
              FITUR TERDEPAN
              <br />
              <span className="bg-blue-500 text-white px-2 md:px-3 py-1 md:py-2 border-3 md:border-6 border-slate-800 transform -rotate-1 inline-block shadow-lg">
                UNTUK SUKSES
              </span>
            </h2>
            <div className="bg-emerald-400 text-slate-900 p-3 md:p-4 border-3 md:border-6 border-slate-800 transform rotate-1 max-w-4xl mx-auto shadow-lg">
              <p className="text-sm md:text-base font-black uppercase">
                KAMI MENYEDIAKAN TOOLS DAN METODE PEMBELAJARAN PALING EFEKTIF!
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Feature 1 */}
            <div className="group">
              <div className="bg-orange-400 border-3 md:border-6 border-slate-800 p-4 md:p-6 transform hover:-rotate-2 hover:-translate-y-2 transition-all duration-200 shadow-lg">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 border-3 border-slate-800 flex items-center justify-center mb-3 md:mb-4 font-black text-lg md:text-xl">
                  📚
                </div>
                <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 md:mb-3 uppercase">
                  SOAL BERKUALITAS TINGGI
                </h3>
                <p className="text-slate-900 font-bold leading-tight mb-2 md:mb-3 text-sm md:text-sm">
                  10,000+ soal yang disusun oleh tim ahli, sesuai dengan
                  kisi-kisi UTBK terbaru dan pola soal yang sering keluar.
                </p>
                <div className="bg-slate-900 text-orange-300 px-3 md:px-4 py-1 md:py-2 border-2 md:border-4 border-orange-400 inline-block font-black uppercase text-xs md:text-sm">
                  LIHAT DETAIL →
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group">
              <div className="bg-blue-400 border-3 md:border-6 border-slate-800 p-4 md:p-6 transform hover:rotate-2 hover:-translate-y-2 transition-all duration-200 shadow-lg">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 border-3 border-slate-800 flex items-center justify-center mb-3 md:mb-4 font-black text-lg md:text-xl">
                  🤖
                </div>
                <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 md:mb-3 uppercase">
                  ANALISIS AI REAL-TIME
                </h3>
                <p className="text-slate-900 font-bold leading-tight mb-2 md:mb-3 text-sm md:text-sm">
                  Sistem AI canggih yang menganalisis pola jawabanmu dan
                  memberikan rekomendasi pembelajaran personal.
                </p>
                <div className="bg-slate-900 text-blue-300 px-3 md:px-4 py-1 md:py-2 border-2 md:border-4 border-blue-400 inline-block font-black uppercase text-xs md:text-sm">
                  COBA SEKARANG →
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group">
              <div className="bg-emerald-400 border-3 md:border-6 border-slate-800 p-4 md:p-6 transform hover:-rotate-1 hover:-translate-y-2 transition-all duration-200 shadow-lg">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-100 border-3 border-slate-800 flex items-center justify-center mb-3 md:mb-4 font-black text-lg md:text-xl">
                  ⏰
                </div>
                <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 md:mb-3 uppercase">
                  SIMULASI UJIAN REALISTIS
                </h3>
                <p className="text-slate-900 font-bold leading-tight mb-2 md:mb-3 text-sm md:text-sm">
                  Rasakan pengalaman ujian yang sesungguhnya dengan timer,
                  interface, dan tingkat kesulitan seperti UTBK asli.
                </p>
                <div className="bg-slate-900 text-emerald-300 px-3 md:px-4 py-1 md:py-2 border-2 md:border-4 border-emerald-400 inline-block font-black uppercase text-xs md:text-sm">
                  MULAI SIMULASI →
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group">
              <div className="bg-violet-400 border-3 md:border-6 border-slate-800 p-4 md:p-6 transform hover:rotate-1 hover:-translate-y-2 transition-all duration-200 shadow-lg">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-violet-100 border-3 border-slate-800 flex items-center justify-center mb-3 md:mb-4 font-black text-lg md:text-xl">
                  👥
                </div>
                <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 md:mb-3 uppercase">
                  KOMUNITAS BELAJAR
                </h3>
                <p className="text-slate-900 font-bold leading-tight mb-2 md:mb-3 text-sm md:text-sm">
                  Bergabung dengan ribuan siswa lain, diskusi soal, dan saling
                  mendukung dalam persiapan UTBK.
                </p>
                <div className="bg-slate-900 text-violet-300 px-3 md:px-4 py-1 md:py-2 border-2 md:border-4 border-violet-400 inline-block font-black uppercase text-xs md:text-sm">
                  GABUNG KOMUNITAS →
                </div>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="group">
              <div className="bg-rose-400 border-3 md:border-6 border-slate-800 p-4 md:p-6 transform hover:-rotate-2 hover:-translate-y-2 transition-all duration-200 shadow-lg">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-rose-100 border-3 border-slate-800 flex items-center justify-center mb-3 md:mb-4 font-black text-lg md:text-xl">
                  📊
                </div>
                <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 md:mb-3 uppercase">
                  TRACKING PROGRESS
                </h3>
                <p className="text-slate-900 font-bold leading-tight mb-2 md:mb-3 text-sm md:text-sm">
                  Pantau perkembangan belajarmu dengan dashboard yang detail dan
                  laporan kemajuan mingguan.
                </p>
                <div className="bg-slate-900 text-rose-300 px-3 md:px-4 py-1 md:py-2 border-2 md:border-4 border-rose-400 inline-block font-black uppercase text-xs md:text-sm">
                  LIHAT PROGRESS →
                </div>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="group">
              <div className="bg-amber-400 border-3 md:border-6 border-slate-800 p-4 md:p-6 transform hover:rotate-2 hover:-translate-y-2 transition-all duration-200 shadow-lg">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 border-3 border-slate-800 flex items-center justify-center mb-3 md:mb-4 font-black text-lg md:text-xl">
                  👨‍🏫
                </div>
                <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 md:mb-3 uppercase">
                  MENTOR PERSONAL
                </h3>
                <p className="text-slate-900 font-bold leading-tight mb-2 md:mb-3 text-sm md:text-sm">
                  Dapatkan bimbingan langsung dari mentor berpengalaman yang
                  siap membantu strategi belajarmu.
                </p>
                <div className="bg-slate-900 text-amber-300 px-3 md:px-4 py-1 md:py-2 border-2 md:border-4 border-amber-400 inline-block font-black uppercase text-xs md:text-sm">
                  CHAT MENTOR →
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-16 md:py-20 bg-orange-100 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="bg-slate-900 text-orange-300 px-3 md:px-6 py-2 md:py-3 border-3 md:border-6 border-orange-500 transform -rotate-2 inline-block mb-4 md:mb-6 shadow-lg">
              <span className="text-sm md:text-lg font-black uppercase tracking-wider">
                PILIH PAKETMU!
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6 uppercase leading-none">
              HARGA TERJANGKAU
              <br />
              <span className="bg-blue-500 text-white px-2 md:px-3 py-1 md:py-2 border-3 md:border-6 border-slate-800 transform rotate-1 inline-block shadow-lg">
                KUALITAS PREMIUM
              </span>
            </h2>
            <div className="bg-emerald-400 text-slate-900 p-3 md:p-4 border-3 md:border-6 border-slate-800 transform -rotate-1 max-w-4xl mx-auto shadow-lg">
              <p className="text-sm md:text-base font-black uppercase">
                INVESTASI TERBAIK UNTUK MASA DEPANMU!
              </p>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
            {/* Basic Plan */}
            <div className="group">
              <div className="bg-white border-3 md:border-6 border-slate-800 p-4 md:p-6 transform hover:-rotate-1 hover:-translate-y-4 transition-all duration-300 shadow-lg">
                <div className="text-center mb-4 md:mb-6">
                  <div className="bg-blue-400 text-slate-900 px-3 md:px-4 py-1 md:py-2 border-2 md:border-3 border-slate-800 inline-block mb-2 md:mb-3 font-black uppercase text-xs md:text-sm">
                    BASIC
                  </div>
                  <div className="mb-2 md:mb-3">
                    <span className="text-3xl md:text-4xl font-black text-slate-900">
                      49K
                    </span>
                    <span className="text-sm md:text-lg font-black text-slate-600">
                      /BULAN
                    </span>
                  </div>
                  <p className="text-slate-900 font-bold text-xs md:text-sm">
                    Untuk siswa yang baru memulai persiapan
                  </p>
                </div>

                <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  <div className="flex items-center">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-2 md:mr-3">
                      <span className="text-slate-900 font-black text-xs">
                        ✓
                      </span>
                    </div>
                    <span className="text-slate-900 font-bold text-xs md:text-sm">
                      1,000 soal latihan
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-2 md:mr-3">
                      <span className="text-slate-900 font-black text-xs">
                        ✓
                      </span>
                    </div>
                    <span className="text-slate-900 font-bold text-xs md:text-sm">
                      3 tryout gratis per bulan
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-2 md:mr-3">
                      <span className="text-slate-900 font-black text-xs">
                        ✓
                      </span>
                    </div>
                    <span className="text-slate-900 font-bold text-xs md:text-sm">
                      Progress tracking basic
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-2 md:mr-3">
                      <span className="text-slate-900 font-black text-xs">
                        ✓
                      </span>
                    </div>
                    <span className="text-slate-900 font-bold text-xs md:text-sm">
                      Akses forum komunitas
                    </span>
                  </div>
                </div>

                <button className="w-full bg-blue-500 text-white py-3 md:py-4 border-3 md:border-6 border-slate-800 font-black uppercase text-xs md:text-sm hover:bg-blue-600 transition-colors shadow-lg">
                  PILIH BASIC →
                </button>
              </div>
            </div>

            {/* Pro Plan - Featured */}
            <div className="group relative">
              <div className="absolute -top-2 md:-top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-orange-500 text-white px-3 md:px-4 py-1 md:py-2 border-2 md:border-3 border-slate-800 font-black uppercase text-xs shadow-lg transform rotate-3">
                  PALING POPULER!
                </div>
              </div>
              <div className="bg-orange-400 border-3 md:border-6 border-slate-800 p-4 md:p-6 transform hover:rotate-1 hover:-translate-y-4 transition-all duration-300 shadow-lg">
                <div className="text-center mb-4 md:mb-6">
                  <div className="bg-orange-100 text-slate-900 px-3 md:px-4 py-1 md:py-2 border-2 md:border-3 border-slate-800 inline-block mb-2 md:mb-3 font-black uppercase text-xs md:text-sm">
                    PRO
                  </div>
                  <div className="mb-2 md:mb-3">
                    <span className="text-3xl md:text-4xl font-black text-white">
                      99K
                    </span>
                    <span className="text-sm md:text-lg font-black text-slate-900">
                      /BULAN
                    </span>
                  </div>
                  <p className="text-slate-900 font-bold text-xs md:text-sm">
                    Untuk siswa yang serius ingin lolos UTBK
                  </p>
                </div>

                <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  <div className="flex items-center">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-2 md:mr-3">
                      <span className="text-slate-900 font-black text-xs">
                        ✓
                      </span>
                    </div>
                    <span className="text-white font-bold text-xs md:text-sm">
                      10,000+ soal premium
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-2 md:mr-3">
                      <span className="text-slate-900 font-black text-xs">
                        ✓
                      </span>
                    </div>
                    <span className="text-white font-bold text-xs md:text-sm">
                      Unlimited tryout
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-2 md:mr-3">
                      <span className="text-slate-900 font-black text-xs">
                        ✓
                      </span>
                    </div>
                    <span className="text-white font-bold text-xs md:text-sm">
                      AI Analysis lengkap
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-2 md:mr-3">
                      <span className="text-slate-900 font-black text-xs">
                        ✓
                      </span>
                    </div>
                    <span className="text-white font-bold text-xs md:text-sm">
                      Video pembahasan eksklusif
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-2 md:mr-3">
                      <span className="text-slate-900 font-black text-xs">
                        ✓
                      </span>
                    </div>
                    <span className="text-white font-bold text-xs md:text-sm">
                      Mentor konsultasi 24/7
                    </span>
                  </div>
                </div>

                <button className="w-full bg-orange-100 text-slate-900 py-3 md:py-4 border-3 md:border-6 border-slate-800 font-black uppercase text-xs md:text-sm hover:bg-white transition-colors shadow-lg">
                  PILIH PRO →
                </button>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="group">
              <div className="bg-violet-400 border-3 md:border-6 border-slate-800 p-4 md:p-6 transform hover:rotate-1 hover:-translate-y-4 transition-all duration-300 shadow-lg">
                <div className="text-center mb-4 md:mb-6">
                  <div className="bg-violet-100 text-slate-900 px-3 md:px-4 py-1 md:py-2 border-2 md:border-3 border-slate-800 inline-block mb-2 md:mb-3 font-black uppercase text-xs md:text-sm">
                    PREMIUM
                  </div>
                  <div className="mb-2 md:mb-3">
                    <span className="text-3xl md:text-4xl font-black text-white">
                      199K
                    </span>
                    <span className="text-sm md:text-lg font-black text-slate-900">
                      /BULAN
                    </span>
                  </div>
                  <p className="text-slate-900 font-bold text-sm md:text-base">
                    Untuk siswa yang ingin jaminan lolos PTN favorit
                  </p>
                </div>

                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  <div className="flex items-center">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-3">
                      <span className="text-slate-900 font-black text-xs md:text-sm">
                        ✓
                      </span>
                    </div>
                    <span className="text-white font-bold text-sm md:text-base">
                      Semua fitur PRO
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-3">
                      <span className="text-slate-900 font-black text-xs md:text-sm">
                        ✓
                      </span>
                    </div>
                    <span className="text-white font-bold text-sm md:text-base">
                      Mentor personal 1-on-1
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-3">
                      <span className="text-slate-900 font-black text-xs md:text-sm">
                        ✓
                      </span>
                    </div>
                    <span className="text-white font-bold text-sm md:text-base">
                      Live class eksklusif
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-3">
                      <span className="text-slate-900 font-black text-xs md:text-sm">
                        ✓
                      </span>
                    </div>
                    <span className="text-white font-bold text-sm md:text-base">
                      Garansi nilai minimal
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center mr-3">
                      <span className="text-slate-900 font-black text-xs md:text-sm">
                        ✓
                      </span>
                    </div>
                    <span className="text-white font-bold text-xs md:text-sm">
                      Akses selamanya
                    </span>
                  </div>
                </div>

                <button className="w-full bg-violet-100 text-slate-900 py-3 md:py-4 border-3 md:border-6 border-slate-800 font-black uppercase text-xs md:text-sm hover:bg-white transition-colors shadow-lg">
                  PILIH PREMIUM →
                </button>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-8 md:mt-12">
            <div className="bg-slate-900 text-orange-300 p-4 md:p-6 border-3 md:border-6 border-orange-500 transform rotate-2 max-w-2xl mx-auto shadow-lg">
              <p className="text-sm md:text-lg font-black uppercase mb-2 md:mb-3">
                🎉 SPECIAL OFFER! 🎉
              </p>
              <p className="text-xs md:text-sm font-bold mb-3 md:mb-4">
                Daftar sekarang dan dapatkan 7 hari gratis untuk semua paket!
              </p>
              <button className="bg-orange-500 text-white px-4 md:px-6 py-2 md:py-3 border-2 md:border-3 border-orange-300 font-black uppercase hover:bg-orange-600 transition-colors text-xs md:text-sm">
                KLAIM TRIAL GRATIS →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 md:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="bg-orange-400 text-slate-900 px-3 md:px-4 py-1 md:py-2 border-2 md:border-3 border-white inline-block mb-3 md:mb-4 transform -rotate-1 shadow-lg">
                <h3 className="text-lg md:text-xl font-black uppercase">
                  PINTUUNIV
                </h3>
              </div>
              <p className="text-white font-bold mb-3 md:mb-4 leading-relaxed text-xs md:text-sm">
                Platform tryout terdepan untuk persiapan UTBK. Kami berkomitmen
                membantu siswa Indonesia meraih impian kuliah di PTN favorit!
              </p>
              <div className="flex space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-500 border-2 md:border-4 border-white flex items-center justify-center font-black text-lg md:text-xl hover:bg-orange-600 transition-colors cursor-pointer shadow-lg">
                  📘
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 border-2 md:border-4 border-white flex items-center justify-center font-black text-lg md:text-xl hover:bg-blue-600 transition-colors cursor-pointer shadow-lg">
                  🐦
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500 border-2 md:border-4 border-white flex items-center justify-center font-black text-lg md:text-xl hover:bg-emerald-600 transition-colors cursor-pointer shadow-lg">
                  📱
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-violet-500 border-2 md:border-4 border-white flex items-center justify-center font-black text-lg md:text-xl hover:bg-violet-600 transition-colors cursor-pointer shadow-lg">
                  📺
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="bg-blue-400 text-slate-900 px-3 md:px-4 py-1 md:py-2 border-2 md:border-3 border-white inline-block mb-3 md:mb-4 transform rotate-1 shadow-lg">
                <h4 className="text-sm md:text-base font-black uppercase">
                  NAVIGASI
                </h4>
              </div>
              <ul className="space-y-1 md:space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-xs md:text-sm"
                  >
                    BERANDA
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-xs md:text-sm"
                  >
                    FITUR
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-xs md:text-sm"
                  >
                    HARGA
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-xs md:text-sm"
                  >
                    TENTANG KAMI
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-xs md:text-sm"
                  >
                    KONTAK
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <div className="bg-emerald-400 text-slate-900 px-3 md:px-4 py-1 md:py-2 border-2 md:border-4 border-white inline-block mb-4 md:mb-6 transform -rotate-1 shadow-lg">
                <h4 className="text-base md:text-lg font-black uppercase">
                  RESOURCES
                </h4>
              </div>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-sm md:text-base"
                  >
                    BLOG
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-sm md:text-base"
                  >
                    TIPS & TRIK
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-sm md:text-base"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-sm md:text-base"
                  >
                    PANDUAN
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-sm md:text-base"
                  >
                    DOWNLOAD APP
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <div className="bg-violet-400 text-slate-900 px-3 md:px-4 py-1 md:py-2 border-2 md:border-4 border-white inline-block mb-4 md:mb-6 transform rotate-1 shadow-lg">
                <h4 className="text-base md:text-lg font-black uppercase">
                  KONTAK
                </h4>
              </div>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-orange-400 border-1 md:border-2 border-white flex items-center justify-center mr-2 md:mr-3 font-black text-sm md:text-base">
                    📍
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm md:text-base">
                      Jl. Pendidikan No. 123
                      <br />
                      Jakarta Pusat, 10110
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-orange-400 border-1 md:border-2 border-white flex items-center justify-center mr-2 md:mr-3 font-black text-sm md:text-base">
                    📞
                  </div>
                  <p className="text-white font-bold text-sm md:text-base">
                    +62 21 1234 5678
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-orange-400 border-1 md:border-2 border-white flex items-center justify-center mr-2 md:mr-3 font-black text-sm md:text-base">
                    ✉️
                  </div>
                  <p className="text-white font-bold text-sm md:text-base">
                    info@pintuuniv.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="border-t-2 md:border-t-4 border-orange-400 pt-8 md:pt-12 mb-8 md:mb-12">
            <div className="text-center mb-6 md:mb-8">
              <div className="bg-rose-400 text-slate-900 px-4 md:px-6 py-2 md:py-3 border-2 md:border-4 border-white inline-block mb-3 md:mb-4 transform -rotate-1 shadow-lg">
                <h4 className="text-lg md:text-xl font-black uppercase">
                  SUBSCRIBE NEWSLETTER
                </h4>
              </div>
              <p className="text-white font-bold max-w-2xl mx-auto text-sm md:text-base">
                Dapatkan tips belajar, info tryout terbaru, dan motivasi
                langsung ke email kamu!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-3 md:space-x-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="EMAIL KAMU..."
                className="flex-1 w-full sm:w-auto px-4 md:px-6 py-3 md:py-4 border-2 md:border-4 border-white text-slate-900 font-bold placeholder-slate-500 bg-white focus:outline-none focus:border-orange-400 shadow-lg text-sm md:text-base"
              />
              <button className="w-full sm:w-auto bg-orange-400 text-slate-900 px-6 md:px-8 py-3 md:py-4 border-2 md:border-4 border-white font-black uppercase hover:bg-orange-500 transition-colors shadow-lg text-sm md:text-base">
                SUBSCRIBE!
              </button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t-2 md:border-t-4 border-orange-400 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="bg-white text-slate-900 px-3 md:px-4 py-1 md:py-2 border-2 md:border-4 border-orange-400 shadow-lg">
              <p className="font-black uppercase text-xs md:text-sm">
                © 2024 PINTUUNIV. ALL RIGHTS RESERVED.
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-6">
              <a
                href="#"
                className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-xs md:text-sm"
              >
                PRIVACY POLICY
              </a>
              <a
                href="#"
                className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-xs md:text-sm"
              >
                TERMS OF SERVICE
              </a>
              <a
                href="#"
                className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-xs md:text-sm"
              >
                COOKIE POLICY
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
