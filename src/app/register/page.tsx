"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    school: "",
    grade: "",
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    if (!formData.agreeTerms) {
      alert("Harap setujui syarat dan ketentuan");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Register data:", formData);
      setIsLoading(false);
      // Redirect to dashboard after successful registration
      window.location.href = "/dashboard";
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : false;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Check password match in real time
    if (name === "confirmPassword" || name === "password") {
      setPasswordMatch(
        name === "confirmPassword"
          ? value === formData.password
          : formData.confirmPassword === value ||
              formData.confirmPassword === ""
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-blue-50 to-purple-100 relative overflow-hidden">
      {/* Decorative Background Elements - Hidden on mobile for better performance */}
      <div className="hidden sm:block absolute top-20 left-10 w-12 h-12 md:w-16 md:h-16 bg-emerald-400 rotate-12 border-3 md:border-4 border-slate-800 opacity-30 animate-bounce"></div>
      <div className="hidden sm:block absolute top-40 right-20 w-8 h-8 md:w-12 md:h-12 bg-purple-400 rounded-full border-3 md:border-4 border-slate-800 opacity-40 animate-pulse"></div>
      <div className="hidden sm:block absolute bottom-32 left-20 w-16 h-16 md:w-20 md:h-20 bg-blue-400 rotate-45 border-3 md:border-4 border-slate-800 opacity-25 animate-spin"></div>
      <div className="hidden sm:block absolute bottom-20 right-10 w-10 h-10 md:w-14 md:h-14 bg-orange-400 border-3 md:border-4 border-slate-800 opacity-35 animate-ping"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-3 sm:p-4 py-6 sm:py-8">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <Link href="/" className="inline-block mb-4 sm:mb-6">
              <div className="bg-emerald-500 text-white px-4 sm:px-6 py-2 sm:py-3 border-3 sm:border-4 border-slate-800 shadow-brutal transform rotate-2 hover:rotate-3 transition-transform">
                <span className="text-lg sm:text-2xl font-black">
                  📚 PINTU UNIV
                </span>
              </div>
            </Link>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-3 sm:mb-4 uppercase">
              DAFTAR AKUN
            </h1>

            <div className="bg-emerald-400 text-slate-900 px-3 sm:px-4 py-2 border-3 border-slate-800 inline-block shadow-brutal transform -rotate-1">
              <p className="font-black text-xs sm:text-sm uppercase">
                🚀 GABUNG DENGAN RIBUAN SISWA LAINNYA
              </p>
            </div>
          </div>

          {/* Register Form */}
          <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 md:p-8 shadow-brutal transform hover:rotate-1 transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-slate-900 font-black text-xs sm:text-sm mb-2 uppercase">
                  👤 Nama Lengkap
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 bg-emerald-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-emerald-100 focus:border-emerald-500 transition-colors text-sm sm:text-base"
                  placeholder="Nama Lengkap Kamu"
                />
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-slate-900 font-black text-xs sm:text-sm mb-2 uppercase">
                    📧 Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 bg-blue-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-blue-100 focus:border-blue-500 transition-colors text-sm sm:text-base"
                    placeholder="email@contoh.com"
                  />
                </div>

                <div>
                  <label className="block text-slate-900 font-black text-xs sm:text-sm mb-2 uppercase">
                    📱 No. HP
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 bg-purple-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-purple-100 focus:border-purple-500 transition-colors text-sm sm:text-base"
                    placeholder="08123456789"
                  />
                </div>
              </div>

              {/* School & Grade Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-slate-900 font-black text-xs sm:text-sm mb-2 uppercase">
                    🏫 Asal Sekolah
                  </label>
                  <input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 bg-orange-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-orange-100 focus:border-orange-500 transition-colors text-sm sm:text-base"
                    placeholder="SMA Negeri 1 Jakarta"
                  />
                </div>

                <div>
                  <label className="block text-slate-900 font-black text-xs sm:text-sm mb-2 uppercase">
                    📚 Kelas
                  </label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 bg-yellow-50 text-slate-900 font-bold focus:outline-none focus:bg-yellow-100 focus:border-yellow-500 transition-colors text-sm sm:text-base"
                  >
                    <option value="">Pilih Kelas</option>
                    <option value="10">Kelas 10</option>
                    <option value="11">Kelas 11</option>
                    <option value="12">Kelas 12</option>
                    <option value="Gap Year">Gap Year</option>
                  </select>
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 border-3 border-slate-800 bg-rose-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-rose-100 focus:border-rose-500 transition-colors text-sm sm:text-base"
                      placeholder="Min. 6 karakter"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-slate-600 hover:text-slate-900 font-black text-sm"
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-900 font-black text-xs sm:text-sm mb-2 uppercase">
                    🔐 Konfirmasi Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 border-3 border-slate-800 text-slate-900 font-bold placeholder-slate-500 focus:outline-none transition-colors text-sm sm:text-base ${
                        !passwordMatch
                          ? "bg-red-50 border-red-500 focus:bg-red-100"
                          : "bg-green-50 focus:bg-green-100 focus:border-green-500"
                      }`}
                      placeholder="Ulangi password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-slate-600 hover:text-slate-900 font-black text-sm"
                    >
                      {showConfirmPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {!passwordMatch && (
                    <p className="text-red-600 font-bold text-xs mt-1">
                      ❌ Password tidak cocok
                    </p>
                  )}
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="bg-slate-100 border-3 border-slate-800 p-3 sm:p-4">
                <label className="flex items-start space-x-2 sm:space-x-3">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                    className="mt-1 w-4 h-4 border-2 border-slate-800 flex-shrink-0"
                  />
                  <span className="text-slate-900 font-bold text-xs sm:text-sm leading-tight">
                    Saya setuju dengan{" "}
                    <Link
                      href="/terms"
                      className="text-blue-600 hover:text-blue-800 underline font-black"
                    >
                      Syarat & Ketentuan
                    </Link>{" "}
                    dan{" "}
                    <Link
                      href="/privacy"
                      className="text-purple-600 hover:text-purple-800 underline font-black"
                    >
                      Kebijakan Privasi
                    </Link>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !passwordMatch}
                className="group w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 sm:px-6 py-3 sm:py-4 font-black text-sm sm:text-lg uppercase border-3 sm:border-4 border-slate-800 transform hover:-rotate-1 hover:-translate-y-2 hover:scale-105 transition-all duration-300 shadow-brutal disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="flex items-center justify-center gap-2 sm:gap-3">
                  {isLoading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      <span className="text-xs sm:text-base">MENDAFTAR...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-xs sm:text-base">
                        🚀 DAFTAR SEKARANG
                      </span>
                      <span className="group-hover:animate-bounce">🎯</span>
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 sm:mt-8 text-center">
              <div className="bg-blue-100 border-3 border-slate-800 p-3 sm:p-4 transform -rotate-1">
                <p className="text-slate-900 font-bold text-xs sm:text-sm mb-2">
                  Sudah punya akun?
                </p>
                <Link
                  href="/login"
                  className="inline-block bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 font-black text-xs sm:text-sm uppercase border-3 border-slate-800 transform hover:rotate-2 hover:-translate-y-1 transition-all duration-200 shadow-brutal"
                >
                  🔑 LOGIN DI SINI
                </Link>
              </div>
            </div>
          </div>

          {/* Social Registration */}
          <div className="mt-6 sm:mt-8">
            <div className="text-center mb-4">
              <span className="bg-slate-900 text-white px-3 sm:px-4 py-1 sm:py-2 border-3 border-slate-800 inline-block font-black text-xs sm:text-sm uppercase shadow-brutal transform rotate-1">
                Atau daftar dengan
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button className="bg-red-500 text-white px-3 sm:px-4 py-2 sm:py-3 font-black text-xs sm:text-sm uppercase border-3 border-slate-800 transform hover:-rotate-1 hover:-translate-y-1 transition-all duration-200 shadow-brutal">
                📧 GOOGLE
              </button>
              <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 sm:py-3 font-black text-xs sm:text-sm uppercase border-3 border-slate-800 transform hover:rotate-1 hover:-translate-y-1 transition-all duration-200 shadow-brutal">
                📘 FACEBOOK
              </button>
              <button className="bg-gray-900 text-white px-3 sm:px-4 py-2 sm:py-3 font-black text-xs sm:text-sm uppercase border-3 border-slate-800 transform hover:-rotate-1 hover:-translate-y-1 transition-all duration-200 shadow-brutal">
                🍎 APPLE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
