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
      // Redirect logic here
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-blue-50 to-violet-100 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-emerald-400 rotate-12 border-4 border-slate-800 opacity-30 animate-bounce"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-violet-400 rounded-full border-4 border-slate-800 opacity-40 animate-pulse"></div>
      <div className="absolute bottom-32 left-20 w-20 h-20 bg-blue-400 rotate-45 border-4 border-slate-800 opacity-25 animate-spin"></div>
      <div className="absolute bottom-20 right-10 w-14 h-14 bg-orange-400 border-4 border-slate-800 opacity-35 animate-ping"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 py-8">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <div className="bg-emerald-500 text-white px-6 py-3 border-4 border-slate-800 shadow-brutal transform rotate-2 hover:rotate-3 transition-transform">
                <span className="text-2xl font-black">📚 PINTU UNIV</span>
              </div>
            </Link>

            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 uppercase">
              DAFTAR GRATIS
            </h1>

            <div className="bg-emerald-400 text-slate-900 px-4 py-2 border-3 border-slate-800 inline-block shadow-brutal transform -rotate-1">
              <p className="font-black text-sm uppercase">
                🎯 MULAI PERJALANAN UTBK KAMU!
              </p>
            </div>
          </div>

          {/* Register Form */}
          <div className="bg-white border-4 border-slate-800 p-6 md:p-8 shadow-brutal transform hover:rotate-1 transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name Field */}
              <div>
                <label className="block text-slate-900 font-black text-sm mb-2 uppercase">
                  👤 Nama Lengkap
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-3 border-slate-800 bg-emerald-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-emerald-100 focus:border-emerald-500 transition-colors"
                  placeholder="Nama lengkap sesuai KTP"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-slate-900 font-black text-sm mb-2 uppercase">
                  📧 Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-3 border-slate-800 bg-blue-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-blue-100 focus:border-blue-500 transition-colors"
                  placeholder="contoh@email.com"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-slate-900 font-black text-sm mb-2 uppercase">
                  📱 Nomor WhatsApp
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-3 border-slate-800 bg-violet-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-violet-100 focus:border-violet-500 transition-colors"
                  placeholder="08xxxxxxxxxx"
                />
              </div>

              {/* School & Grade */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-900 font-black text-sm mb-2 uppercase">
                    🏫 Asal Sekolah
                  </label>
                  <input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-3 border-slate-800 bg-orange-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-orange-100 focus:border-orange-500 transition-colors"
                    placeholder="SMA Negeri 1"
                  />
                </div>

                <div>
                  <label className="block text-slate-900 font-black text-sm mb-2 uppercase">
                    📖 Kelas
                  </label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-3 border-slate-800 bg-orange-50 text-slate-900 font-bold focus:outline-none focus:bg-orange-100 focus:border-orange-500 transition-colors"
                  >
                    <option value="">Pilih Kelas</option>
                    <option value="10">Kelas 10</option>
                    <option value="11">Kelas 11</option>
                    <option value="12">Kelas 12</option>
                    <option value="alumni">Alumni</option>
                  </select>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-slate-900 font-black text-sm mb-2 uppercase">
                  🔒 Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pr-12 border-3 border-slate-800 bg-red-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-red-100 focus:border-red-500 transition-colors"
                    placeholder="Minimal 8 karakter"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-600 hover:text-slate-900 font-black"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-slate-900 font-black text-sm mb-2 uppercase">
                  🔐 Konfirmasi Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 pr-12 border-3 border-slate-800 font-bold placeholder-slate-500 focus:outline-none transition-colors ${
                      passwordMatch
                        ? "bg-red-50 focus:bg-red-100 focus:border-red-500"
                        : "bg-red-200 border-red-600"
                    }`}
                    placeholder="Ulangi password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-600 hover:text-slate-900 font-black"
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {!passwordMatch && (
                  <p className="text-red-600 font-bold text-sm mt-1">
                    ⚠️ Password tidak sama!
                  </p>
                )}
              </div>

              {/* Terms Agreement */}
              <div className="bg-slate-100 border-3 border-slate-800 p-4">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                    className="mt-1 w-4 h-4 border-2 border-slate-800"
                  />
                  <span className="text-slate-900 font-bold text-sm leading-relaxed">
                    Saya setuju dengan{" "}
                    <Link
                      href="/terms"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Syarat & Ketentuan
                    </Link>{" "}
                    dan{" "}
                    <Link
                      href="/privacy"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Kebijakan Privasi
                    </Link>{" "}
                    Pintu Univ
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !passwordMatch}
                className="group w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-4 font-black text-lg uppercase border-4 border-slate-800 transform hover:-rotate-1 hover:-translate-y-2 hover:scale-105 transition-all duration-300 shadow-brutal disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      SEDANG MENDAFTAR...
                    </>
                  ) : (
                    <>
                      🎯 DAFTAR SEKARANG
                      <span className="group-hover:animate-bounce">🚀</span>
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <div className="bg-blue-100 border-3 border-blue-400 p-4 shadow-lg">
                <p className="text-slate-900 font-bold text-sm mb-2">
                  Sudah punya akun?
                </p>
                <Link
                  href="/login"
                  className="bg-blue-500 text-white px-4 py-2 font-black text-sm uppercase border-3 border-slate-800 transform hover:rotate-1 hover:-translate-y-1 transition-all duration-200 shadow-lg inline-block"
                >
                  🔐 MASUK SEKARANG
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
