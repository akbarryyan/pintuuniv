"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Login data:", formData);
      setIsLoading(false);
      // Redirect logic here
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-blue-50 to-emerald-100 relative overflow-hidden">
      {/* Decorative Background Elements - Hidden on mobile for better performance */}
      <div className="hidden sm:block absolute top-20 left-10 w-12 h-12 md:w-16 md:h-16 bg-orange-400 rotate-12 border-3 md:border-4 border-slate-800 opacity-30 animate-bounce"></div>
      <div className="hidden sm:block absolute top-40 right-20 w-8 h-8 md:w-12 md:h-12 bg-blue-400 rounded-full border-3 md:border-4 border-slate-800 opacity-40 animate-pulse"></div>
      <div className="hidden sm:block absolute bottom-32 left-20 w-16 h-16 md:w-20 md:h-20 bg-emerald-400 rotate-45 border-3 md:border-4 border-slate-800 opacity-25 animate-spin"></div>
      <div className="hidden sm:block absolute bottom-20 right-10 w-10 h-10 md:w-14 md:h-14 bg-violet-400 border-3 md:border-4 border-slate-800 opacity-35 animate-ping"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-3 sm:p-4">
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <Link href="/" className="inline-block mb-4 sm:mb-6">
              <div className="bg-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 border-3 sm:border-4 border-slate-800 shadow-brutal transform rotate-2 hover:rotate-3 transition-transform">
                <span className="text-lg sm:text-2xl font-black">
                  📚 PINTU UNIV
                </span>
              </div>
            </Link>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-3 sm:mb-4 uppercase">
              MASUK AKUN
            </h1>

            <div className="bg-blue-400 text-slate-900 px-3 sm:px-4 py-2 border-3 border-slate-800 inline-block shadow-brutal transform -rotate-1">
              <p className="font-black text-xs sm:text-sm uppercase">
                🔐 LOGIN KE DASHBOARD KAMU
              </p>
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 md:p-8 shadow-brutal transform hover:rotate-1 transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-slate-900 font-black text-xs sm:text-sm mb-2 uppercase">
                  📧 Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 bg-blue-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-blue-100 focus:border-blue-500 transition-colors text-sm sm:text-base"
                  placeholder="contoh@email.com"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-slate-900 font-black text-xs sm:text-sm mb-2 uppercase">
                  🔒 Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 border-3 border-slate-800 bg-blue-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-blue-100 focus:border-blue-500 transition-colors text-sm sm:text-base"
                    placeholder="Masukkan password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-slate-600 hover:text-slate-900 font-black text-sm sm:text-base"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 w-4 h-4 border-2 border-slate-800"
                  />
                  <span className="text-slate-900 font-bold text-xs sm:text-sm">
                    Ingat saya
                  </span>
                </label>

                <Link
                  href="/forgot-password"
                  className="text-blue-600 font-bold text-xs sm:text-sm hover:text-blue-800 transition-colors"
                >
                  Lupa password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 sm:px-6 py-3 sm:py-4 font-black text-sm sm:text-lg uppercase border-3 sm:border-4 border-slate-800 transform hover:-rotate-1 hover:-translate-y-2 hover:scale-105 transition-all duration-300 shadow-brutal disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="flex items-center justify-center gap-2 sm:gap-3">
                  {isLoading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      <span className="text-xs sm:text-base">
                        TUNGGU SEBENTAR...
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-xs sm:text-base">
                        🚀 MASUK SEKARANG
                      </span>
                      <span className="group-hover:animate-bounce">⚡</span>
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-6">
              <div className="text-center mb-4">
                <span className="bg-slate-100 px-3 py-1 text-slate-600 font-bold text-sm border-2 border-slate-800">
                  ATAU MASUK DENGAN
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="bg-red-500 text-white px-4 py-3 font-black text-sm border-3 border-slate-800 transform hover:-rotate-1 hover:-translate-y-1 transition-all duration-200 shadow-lg">
                  📱 GOOGLE
                </button>
                <button className="bg-blue-600 text-white px-4 py-3 font-black text-sm border-3 border-slate-800 transform hover:rotate-1 hover:-translate-y-1 transition-all duration-200 shadow-lg">
                  📘 FACEBOOK
                </button>
              </div>
            </div>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <div className="bg-orange-100 border-3 border-orange-400 p-4 shadow-lg">
                <p className="text-slate-900 font-bold text-sm mb-2">
                  Belum punya akun?
                </p>
                <Link
                  href="/register"
                  className="bg-orange-500 text-white px-4 py-2 font-black text-sm uppercase border-3 border-slate-800 transform hover:rotate-1 hover:-translate-y-1 transition-all duration-200 shadow-lg inline-block"
                >
                  📝 DAFTAR GRATIS
                </Link>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-slate-600 font-bold text-sm hover:text-slate-900 transition-colors"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
