import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-yellow-300 relative overflow-x-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-red-500 rotate-12 border-4 border-black"></div>
      <div className="absolute top-40 right-20 w-20 h-20 bg-blue-500 rounded-full border-4 border-black"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-green-500 rotate-45 border-4 border-black"></div>
      <div className="absolute bottom-20 right-40 w-16 h-16 bg-purple-500 border-4 border-black"></div>

      {/* Navigation */}
      <nav className="bg-black border-b-8 border-red-500 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-12 h-12 bg-yellow-400 border-4 border-black rotate-12 flex items-center justify-center mr-4 font-black text-2xl">
                  🎯
                </div>
                <span className="text-4xl font-black text-white uppercase tracking-wider">
                  PintuUniv
                </span>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#features"
                  className="bg-blue-400 text-black px-6 py-3 font-black uppercase border-4 border-black hover:bg-yellow-400 transform hover:-translate-y-1 transition-all duration-200"
                >
                  Fitur
                </a>
                <a
                  href="#pricing"
                  className="bg-green-400 text-black px-6 py-3 font-black uppercase border-4 border-black hover:bg-red-400 transform hover:-translate-y-1 transition-all duration-200"
                >
                  Harga
                </a>
                <a
                  href="#about"
                  className="bg-purple-400 text-black px-6 py-3 font-black uppercase border-4 border-black hover:bg-blue-400 transform hover:-translate-y-1 transition-all duration-200"
                >
                  Tentang
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="bg-white text-black px-6 py-3 font-black uppercase border-4 border-black hover:bg-yellow-400 transform hover:-translate-y-1 transition-all duration-200">
                Masuk
              </button>
              <button className="bg-red-500 text-white px-6 py-3 font-black uppercase border-4 border-black hover:bg-green-500 transform hover:-translate-y-1 transition-all duration-200 shadow-brutal">
                Daftar
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Main Heading */}
            <div className="mb-12">
              <h1 className="text-6xl md:text-9xl font-black text-black mb-8 leading-none tracking-tighter uppercase transform rotate-1">
                RAIH PTN
                <br />
                <span className="bg-red-500 text-white px-4 py-2 border-8 border-black transform -rotate-2 inline-block shadow-brutal">
                  IMPIANMU!
                </span>
              </h1>

              <div className="bg-black text-yellow-400 px-8 py-6 border-8 border-red-500 transform rotate-1 inline-block mb-8 shadow-brutal">
                <p className="text-2xl md:text-4xl font-black uppercase tracking-wider">
                  🎯 PLATFORM #1 INDONESIA
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-white border-8 border-black p-8 transform -rotate-1 shadow-brutal">
                <p className="text-xl md:text-2xl text-black font-black leading-tight">
                  Bergabung dengan{" "}
                  <span className="bg-yellow-400 px-2 py-1 border-4 border-black">
                    50,000+ SISWA
                  </span>{" "}
                  yang telah berhasil masuk PTN favorit. Latihan soal
                  terlengkap, analisis mendalam, dan bimbingan personal untuk
                  memastikan kamu siap menghadapi UTBK-SNBT.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button className="group bg-green-400 text-black px-8 py-6 font-black text-xl uppercase border-8 border-black transform hover:-rotate-1 hover:-translate-y-2 transition-all duration-200 shadow-brutal">
                <span className="flex items-center justify-center gap-3">
                  ⚡ MULAI TRYOUT GRATIS
                </span>
              </button>

              <button className="group bg-blue-400 text-black px-8 py-6 font-black text-xl uppercase border-8 border-black transform hover:rotate-1 hover:-translate-y-2 transition-all duration-200 shadow-brutal">
                <span className="flex items-center justify-center gap-3">
                  👀 LIHAT DEMO
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-red-500 text-white p-6 border-8 border-black transform rotate-2 shadow-brutal">
                <div className="text-4xl md:text-5xl font-black mb-2">50K+</div>
                <div className="font-black text-lg uppercase">SISWA AKTIF</div>
              </div>
              <div className="bg-blue-500 text-white p-6 border-8 border-black transform -rotate-1 shadow-brutal">
                <div className="text-4xl md:text-5xl font-black mb-2">95%</div>
                <div className="font-black text-lg uppercase">LULUS PTN</div>
              </div>
              <div className="bg-purple-500 text-white p-6 border-8 border-black transform rotate-1 shadow-brutal">
                <div className="text-4xl md:text-5xl font-black mb-2">10K+</div>
                <div className="font-black text-lg uppercase">SOAL PREMIUM</div>
              </div>
              <div className="bg-green-500 text-white p-6 border-8 border-black transform -rotate-2 shadow-brutal">
                <div className="text-4xl md:text-5xl font-black mb-2">24/7</div>
                <div className="font-black text-lg uppercase">SUPPORT</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="bg-black text-yellow-400 px-8 py-4 border-8 border-red-500 transform rotate-2 inline-block mb-8 shadow-brutal">
              <span className="text-2xl font-black uppercase tracking-wider">
                MENGAPA PINTUUNIV?
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-black mb-8 uppercase leading-none">
              FITUR TERDEPAN
              <br />
              <span className="bg-blue-500 text-white px-4 py-2 border-8 border-black transform -rotate-1 inline-block shadow-brutal">
                UNTUK SUKSES
              </span>
            </h2>
            <div className="bg-green-400 text-black p-6 border-8 border-black transform rotate-1 max-w-4xl mx-auto shadow-brutal">
              <p className="text-xl font-black uppercase">
                KAMI MENYEDIAKAN TOOLS DAN METODE PEMBELAJARAN PALING EFEKTIF!
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group">
              <div className="bg-red-400 border-8 border-black p-8 transform hover:-rotate-2 hover:-translate-y-2 transition-all duration-200 shadow-brutal">
                <div className="w-16 h-16 bg-yellow-400 border-4 border-black flex items-center justify-center mb-6 font-black text-2xl">
                  📚
                </div>
                <h3 className="text-2xl font-black text-black mb-4 uppercase">
                  SOAL BERKUALITAS TINGGI
                </h3>
                <p className="text-black font-bold leading-tight mb-4">
                  10,000+ soal yang disusun oleh tim ahli, sesuai dengan
                  kisi-kisi UTBK terbaru dan pola soal yang sering keluar.
                </p>
                <div className="bg-black text-yellow-400 px-4 py-2 border-4 border-yellow-400 inline-block font-black uppercase text-sm">
                  LIHAT DETAIL →
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group">
              <div className="bg-blue-400 border-8 border-black p-8 transform hover:rotate-2 hover:-translate-y-2 transition-all duration-200 shadow-brutal">
                <div className="w-16 h-16 bg-green-400 border-4 border-black flex items-center justify-center mb-6 font-black text-2xl">
                  🤖
                </div>
                <h3 className="text-2xl font-black text-black mb-4 uppercase">
                  ANALISIS AI REAL-TIME
                </h3>
                <p className="text-black font-bold leading-tight mb-4">
                  Sistem AI canggih yang menganalisis pola jawabanmu dan
                  memberikan rekomendasi pembelajaran personal.
                </p>
                <div className="bg-black text-green-400 px-4 py-2 border-4 border-green-400 inline-block font-black uppercase text-sm">
                  COBA SEKARANG →
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group">
              <div className="bg-yellow-400 border-8 border-black p-8 transform hover:-rotate-1 hover:-translate-y-2 transition-all duration-200 shadow-brutal">
                <div className="w-16 h-16 bg-red-500 border-4 border-black flex items-center justify-center mb-6 font-black text-2xl">
                  ⏰
                </div>
                <h3 className="text-2xl font-black text-black mb-4 uppercase">
                  SIMULASI UJIAN REALISTIS
                </h3>
                <p className="text-black font-bold leading-tight mb-4">
                  Rasakan pengalaman ujian yang sesungguhnya dengan timer,
                  interface, dan tingkat kesulitan seperti UTBK asli.
                </p>
                <div className="bg-black text-red-400 px-4 py-2 border-4 border-red-400 inline-block font-black uppercase text-sm">
                  MULAI SIMULASI →
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group">
              <div className="bg-green-400 border-8 border-black p-8 transform hover:rotate-1 hover:-translate-y-2 transition-all duration-200 shadow-brutal">
                <div className="w-16 h-16 bg-purple-500 border-4 border-black flex items-center justify-center mb-6 font-black text-2xl">
                  👥
                </div>
                <h3 className="text-2xl font-black text-black mb-4 uppercase">
                  KOMUNITAS BELAJAR
                </h3>
                <p className="text-black font-bold leading-tight mb-4">
                  Bergabung dengan ribuan siswa lain, diskusi soal, dan saling
                  mendukung dalam persiapan UTBK.
                </p>
                <div className="bg-black text-purple-400 px-4 py-2 border-4 border-purple-400 inline-block font-black uppercase text-sm">
                  GABUNG KOMUNITAS →
                </div>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="group">
              <div className="bg-purple-400 border-8 border-black p-8 transform hover:-rotate-2 hover:-translate-y-2 transition-all duration-200 shadow-brutal">
                <div className="w-16 h-16 bg-blue-500 border-4 border-black flex items-center justify-center mb-6 font-black text-2xl">
                  📊
                </div>
                <h3 className="text-2xl font-black text-black mb-4 uppercase">
                  TRACKING PROGRESS
                </h3>
                <p className="text-black font-bold leading-tight mb-4">
                  Pantau perkembangan belajarmu dengan dashboard yang detail dan
                  laporan kemajuan mingguan.
                </p>
                <div className="bg-black text-blue-400 px-4 py-2 border-4 border-blue-400 inline-block font-black uppercase text-sm">
                  LIHAT PROGRESS →
                </div>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="group">
              <div className="bg-orange-400 border-8 border-black p-8 transform hover:rotate-2 hover:-translate-y-2 transition-all duration-200 shadow-brutal">
                <div className="w-16 h-16 bg-pink-500 border-4 border-black flex items-center justify-center mb-6 font-black text-2xl">
                  👨‍🏫
                </div>
                <h3 className="text-2xl font-black text-black mb-4 uppercase">
                  MENTOR PERSONAL
                </h3>
                <p className="text-black font-bold leading-tight mb-4">
                  Dapatkan bimbingan langsung dari mentor berpengalaman yang
                  siap membantu strategi belajarmu.
                </p>
                <div className="bg-black text-pink-400 px-4 py-2 border-4 border-pink-400 inline-block font-black uppercase text-sm">
                  CHAT MENTOR →
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-20 bg-yellow-400 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="bg-black text-yellow-400 px-8 py-4 border-8 border-red-500 transform -rotate-2 inline-block mb-8 shadow-brutal">
              <span className="text-2xl font-black uppercase tracking-wider">
                PILIH PAKETMU!
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-black mb-8 uppercase leading-none">
              HARGA TERJANGKAU
              <br />
              <span className="bg-blue-500 text-white px-4 py-2 border-8 border-black transform rotate-1 inline-block shadow-brutal">
                KUALITAS PREMIUM
              </span>
            </h2>
            <div className="bg-green-400 text-black p-6 border-8 border-black transform -rotate-1 max-w-4xl mx-auto shadow-brutal">
              <p className="text-xl font-black uppercase">
                INVESTASI TERBAIK UNTUK MASA DEPANMU!
              </p>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="group">
              <div className="bg-white border-8 border-black p-8 transform hover:-rotate-1 hover:-translate-y-4 transition-all duration-300 shadow-brutal">
                <div className="text-center mb-8">
                  <div className="bg-blue-400 text-black px-4 py-2 border-4 border-black inline-block mb-4 font-black uppercase">
                    BASIC
                  </div>
                  <div className="mb-4">
                    <span className="text-5xl font-black text-black">49K</span>
                    <span className="text-xl font-black text-gray-600">
                      /BULAN
                    </span>
                  </div>
                  <p className="text-black font-bold">
                    Untuk siswa yang baru memulai persiapan
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-400 border-2 border-black flex items-center justify-center mr-3">
                      <span className="text-black font-black">✓</span>
                    </div>
                    <span className="text-black font-bold">
                      1,000 soal latihan
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-400 border-2 border-black flex items-center justify-center mr-3">
                      <span className="text-black font-black">✓</span>
                    </div>
                    <span className="text-black font-bold">
                      3 tryout gratis per bulan
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-400 border-2 border-black flex items-center justify-center mr-3">
                      <span className="text-black font-black">✓</span>
                    </div>
                    <span className="text-black font-bold">
                      Progress tracking basic
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-400 border-2 border-black flex items-center justify-center mr-3">
                      <span className="text-black font-black">✓</span>
                    </div>
                    <span className="text-black font-bold">
                      Akses forum komunitas
                    </span>
                  </div>
                </div>

                <button className="w-full bg-blue-500 text-white py-4 border-6 border-black font-black uppercase text-lg hover:bg-blue-600 transition-colors shadow-brutal">
                  PILIH BASIC →
                </button>
              </div>
            </div>

            {/* Pro Plan - Featured */}
            <div className="group relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-red-500 text-white px-6 py-2 border-4 border-black font-black uppercase text-sm shadow-brutal transform rotate-3">
                  PALING POPULER!
                </div>
              </div>
              <div className="bg-red-400 border-8 border-black p-8 transform hover:rotate-1 hover:-translate-y-4 transition-all duration-300 shadow-brutal">
                <div className="text-center mb-8">
                  <div className="bg-yellow-400 text-black px-4 py-2 border-4 border-black inline-block mb-4 font-black uppercase">
                    PRO
                  </div>
                  <div className="mb-4">
                    <span className="text-5xl font-black text-white">99K</span>
                    <span className="text-xl font-black text-black">
                      /BULAN
                    </span>
                  </div>
                  <p className="text-black font-bold">
                    Untuk siswa yang serius ingin lolos UTBK
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-400 border-2 border-black flex items-center justify-center mr-3">
                      <span className="text-black font-black">✓</span>
                    </div>
                    <span className="text-white font-bold">
                      10,000+ soal premium
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-400 border-2 border-black flex items-center justify-center mr-3">
                      <span className="text-black font-black">✓</span>
                    </div>
                    <span className="text-white font-bold">
                      Unlimited tryout
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-400 border-2 border-black flex items-center justify-center mr-3">
                      <span className="text-black font-black">✓</span>
                    </div>
                    <span className="text-white font-bold">
                      AI Analysis lengkap
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-400 border-2 border-black flex items-center justify-center mr-3">
                      <span className="text-black font-black">✓</span>
                    </div>
                    <span className="text-white font-bold">
                      Video pembahasan eksklusif
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-400 border-2 border-black flex items-center justify-center mr-3">
                      <span className="text-black font-black">✓</span>
                    </div>
                    <span className="text-white font-bold">
                      Mentor konsultasi 24/7
                    </span>
                  </div>
                </div>

                <button className="w-full bg-yellow-400 text-black py-4 border-6 border-black font-black uppercase text-lg hover:bg-yellow-500 transition-colors shadow-brutal">
                  PILIH PRO →
                </button>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="group">
              <div className="bg-purple-400 border-8 border-black p-8 transform hover:rotate-1 hover:-translate-y-4 transition-all duration-300 shadow-brutal">
                <div className="text-center mb-8">
                  <div className="bg-green-400 text-black px-4 py-2 border-4 border-black inline-block mb-4 font-black uppercase">
                    PREMIUM
                  </div>
                  <div className="mb-4">
                    <span className="text-5xl font-black text-white">199K</span>
                    <span className="text-xl font-black text-black">
                      /BULAN
                    </span>
                  </div>
                  <p className="text-black font-bold">
                    Untuk siswa yang ingin jaminan lolos PTN favorit
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-400 border-2 border-black flex items-center justify-center mr-3">
                      <span className="text-black font-black">✓</span>
                    </div>
                    <span className="text-white font-bold">
                      Semua fitur PRO
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-400 border-2 border-black flex items-center justify-center mr-3">
                      <span className="text-black font-black">✓</span>
                    </div>
                    <span className="text-white font-bold">
                      Mentor personal 1-on-1
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-400 border-2 border-black flex items-center justify-center mr-3">
                      <span className="text-black font-black">✓</span>
                    </div>
                    <span className="text-white font-bold">
                      Live class eksklusif
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-400 border-2 border-black flex items-center justify-center mr-3">
                      <span className="text-black font-black">✓</span>
                    </div>
                    <span className="text-white font-bold">
                      Garansi nilai minimal
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-400 border-2 border-black flex items-center justify-center mr-3">
                      <span className="text-black font-black">✓</span>
                    </div>
                    <span className="text-white font-bold">
                      Akses selamanya
                    </span>
                  </div>
                </div>

                <button className="w-full bg-green-400 text-black py-4 border-6 border-black font-black uppercase text-lg hover:bg-green-500 transition-colors shadow-brutal">
                  PILIH PREMIUM →
                </button>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-black text-yellow-400 p-8 border-8 border-red-500 transform rotate-2 max-w-2xl mx-auto shadow-brutal">
              <p className="text-xl font-black uppercase mb-4">
                🎉 SPECIAL OFFER! 🎉
              </p>
              <p className="text-lg font-bold mb-4">
                Daftar sekarang dan dapatkan 7 hari gratis untuk semua paket!
              </p>
              <button className="bg-red-500 text-white px-8 py-4 border-4 border-yellow-400 font-black uppercase hover:bg-red-600 transition-colors">
                KLAIM TRIAL GRATIS →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* Footer */}
      <footer className="bg-black text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <div className="bg-yellow-400 text-black px-4 py-2 border-4 border-white inline-block mb-6 transform -rotate-1 shadow-brutal">
                <h3 className="text-2xl font-black uppercase">PINTUUNIV</h3>
              </div>
              <p className="text-white font-bold mb-6 leading-relaxed">
                Platform tryout terdepan untuk persiapan UTBK. Kami berkomitmen
                membantu siswa Indonesia meraih impian kuliah di PTN favorit!
              </p>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-red-500 border-4 border-white flex items-center justify-center font-black text-xl hover:bg-red-600 transition-colors cursor-pointer shadow-brutal">
                  📘
                </div>
                <div className="w-12 h-12 bg-blue-500 border-4 border-white flex items-center justify-center font-black text-xl hover:bg-blue-600 transition-colors cursor-pointer shadow-brutal">
                  🐦
                </div>
                <div className="w-12 h-12 bg-green-500 border-4 border-white flex items-center justify-center font-black text-xl hover:bg-green-600 transition-colors cursor-pointer shadow-brutal">
                  📱
                </div>
                <div className="w-12 h-12 bg-purple-500 border-4 border-white flex items-center justify-center font-black text-xl hover:bg-purple-600 transition-colors cursor-pointer shadow-brutal">
                  📺
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="bg-blue-400 text-black px-4 py-2 border-4 border-white inline-block mb-6 transform rotate-1 shadow-brutal">
                <h4 className="text-lg font-black uppercase">NAVIGASI</h4>
              </div>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-white font-bold hover:text-yellow-400 transition-colors border-b-2 border-transparent hover:border-yellow-400 pb-1"
                  >
                    BERANDA
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-white font-bold hover:text-yellow-400 transition-colors border-b-2 border-transparent hover:border-yellow-400 pb-1"
                  >
                    FITUR
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-white font-bold hover:text-yellow-400 transition-colors border-b-2 border-transparent hover:border-yellow-400 pb-1"
                  >
                    HARGA
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white font-bold hover:text-yellow-400 transition-colors border-b-2 border-transparent hover:border-yellow-400 pb-1"
                  >
                    TENTANG KAMI
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white font-bold hover:text-yellow-400 transition-colors border-b-2 border-transparent hover:border-yellow-400 pb-1"
                  >
                    KONTAK
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <div className="bg-green-400 text-black px-4 py-2 border-4 border-white inline-block mb-6 transform -rotate-1 shadow-brutal">
                <h4 className="text-lg font-black uppercase">RESOURCES</h4>
              </div>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-white font-bold hover:text-yellow-400 transition-colors border-b-2 border-transparent hover:border-yellow-400 pb-1"
                  >
                    BLOG
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white font-bold hover:text-yellow-400 transition-colors border-b-2 border-transparent hover:border-yellow-400 pb-1"
                  >
                    TIPS & TRIK
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white font-bold hover:text-yellow-400 transition-colors border-b-2 border-transparent hover:border-yellow-400 pb-1"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white font-bold hover:text-yellow-400 transition-colors border-b-2 border-transparent hover:border-yellow-400 pb-1"
                  >
                    PANDUAN
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white font-bold hover:text-yellow-400 transition-colors border-b-2 border-transparent hover:border-yellow-400 pb-1"
                  >
                    DOWNLOAD APP
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <div className="bg-red-400 text-black px-4 py-2 border-4 border-white inline-block mb-6 transform rotate-1 shadow-brutal">
                <h4 className="text-lg font-black uppercase">KONTAK</h4>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-yellow-400 border-2 border-white flex items-center justify-center mr-3 font-black">
                    📍
                  </div>
                  <div>
                    <p className="text-white font-bold">
                      Jl. Pendidikan No. 123
                      <br />
                      Jakarta Pusat, 10110
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-400 border-2 border-white flex items-center justify-center mr-3 font-black">
                    📞
                  </div>
                  <p className="text-white font-bold">+62 21 1234 5678</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-400 border-2 border-white flex items-center justify-center mr-3 font-black">
                    ✉️
                  </div>
                  <p className="text-white font-bold">info@pintuuniv.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="border-t-4 border-yellow-400 pt-12 mb-12">
            <div className="text-center mb-8">
              <div className="bg-purple-400 text-black px-6 py-3 border-4 border-white inline-block mb-4 transform -rotate-1 shadow-brutal">
                <h4 className="text-xl font-black uppercase">
                  SUBSCRIBE NEWSLETTER
                </h4>
              </div>
              <p className="text-white font-bold max-w-2xl mx-auto">
                Dapatkan tips belajar, info tryout terbaru, dan motivasi
                langsung ke email kamu!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="EMAIL KAMU..."
                className="flex-1 px-6 py-4 border-4 border-white text-black font-bold placeholder-gray-500 bg-white focus:outline-none focus:border-yellow-400 shadow-brutal"
              />
              <button className="bg-yellow-400 text-black px-8 py-4 border-4 border-white font-black uppercase hover:bg-yellow-500 transition-colors shadow-brutal">
                SUBSCRIBE!
              </button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t-4 border-yellow-400 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="bg-white text-black px-4 py-2 border-4 border-yellow-400 mb-4 md:mb-0 shadow-brutal">
              <p className="font-black uppercase">
                © 2024 PINTUUNIV. ALL RIGHTS RESERVED.
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-white font-bold hover:text-yellow-400 transition-colors border-b-2 border-transparent hover:border-yellow-400 pb-1"
              >
                PRIVACY POLICY
              </a>
              <a
                href="#"
                className="text-white font-bold hover:text-yellow-400 transition-colors border-b-2 border-transparent hover:border-yellow-400 pb-1"
              >
                TERMS OF SERVICE
              </a>
              <a
                href="#"
                className="text-white font-bold hover:text-yellow-400 transition-colors border-b-2 border-transparent hover:border-yellow-400 pb-1"
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
