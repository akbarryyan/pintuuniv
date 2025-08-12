"use client";

import React, { useState } from "react";

type University = {
  name: string;
  logoSrc: string; // path under public, e.g. /universities/ui.png
};

const UNIVERSITIES: University[] = [
  { name: "UI", logoSrc: "/university/ui.png" },
  { name: "ITB", logoSrc: "/university/itb.png" },
  { name: "UGM", logoSrc: "/university/ugm.png" },
  { name: "IPB", logoSrc: "/university/ipb.png" },
  { name: "ITS", logoSrc: "/university/its.png" },
  { name: "UNAIR", logoSrc: "/university/unair.png" },
  { name: "UNDIP", logoSrc: "/university/undip.png" },
  { name: "UNPAD", logoSrc: "/university/unpad.webp" },
  { name: "USU", logoSrc: "/university/usu.svg" },
  { name: "UNHAS", logoSrc: "/university/unhas.png" },
  { name: "UNSRI", logoSrc: "/university/unsri.jpg" },
  { name: "UNAND", logoSrc: "/university/unand.jpg" },
];

function Logo({ src, alt }: { src: string; alt: string }) {
  const [fallback, setFallback] = useState(false);
  return (
    <img
      src={fallback ? "/globe.svg" : src}
      alt={alt}
      onError={() => setFallback(true)}
      className="w-8 h-8 md:w-10 md:h-10 object-contain"
      loading="lazy"
      decoding="async"
    />
  );
}

export default function UniversityPartners() {
  return (
    <section className="py-16 md:py-20 bg-orange-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <div className="bg-slate-900 text-orange-300 px-3 md:px-6 py-2 md:py-3 border-3 md:border-6 border-violet-500 transform rotate-1 inline-block mb-4 md:mb-6 shadow-lg">
            <span className="text-sm md:text-lg font-black uppercase tracking-wider">
              MITRA UNIVERSITAS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6 uppercase leading-none">
            PTN TERBAIK
            <br />
            <span className="bg-blue-500 text-white px-2 md:px-3 py-1 md:py-2 border-3 md:border-6 border-slate-800 transform -rotate-1 inline-block shadow-lg">
              MENUNGGU KAMU
            </span>
          </h2>
          <div className="bg-emerald-400 text-slate-900 p-3 md:p-4 border-3 md:border-6 border-slate-800 transform rotate-2 max-w-4xl mx-auto shadow-lg">
            <p className="text-sm md:text-base font-black uppercase">
              SISWA PINTUUNIV BERHASIL MASUK KE PTN TOP INDONESIA!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {UNIVERSITIES.map((u, index) => (
            <div
              key={u.name}
              className={`bg-white border-3 border-slate-800 p-3 md:p-4 transform hover:rotate-${
                index % 2 ? "2" : "-2"
              } hover:-translate-y-1 transition-all duration-200 shadow-lg text-center`}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 flex items-center justify-center font-black text-xs md:text-sm text-white">
                <Logo src={u.logoSrc} alt={`Logo ${u.name}`} />
              </div>
              <h4 className="font-black text-slate-900 text-xs md:text-sm">{u.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


