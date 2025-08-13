"use client";

import Link from "next/link";

export default function Footer() {
  return (
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
              Dapatkan tips belajar, info tryout terbaru, dan motivasi langsung
              ke email kamu!
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
            <Link
              href="/privacy"
              className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-xs md:text-sm"
            >
              PRIVACY POLICY
            </Link>
            <Link
              href="/terms"
              className="text-white font-bold hover:text-orange-400 transition-colors border-b-2 border-transparent hover:border-orange-400 pb-1 text-xs md:text-sm"
            >
              TERMS OF SERVICE
            </Link>
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
  );
}
