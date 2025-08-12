"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Tampilkan notif jika diarahkan dari protected route tanpa login
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const getCookie = (name: string) => {
          const match = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
          return match ? decodeURIComponent(match[1]) : undefined;
        };
        const flag = getCookie("login_required");
        if (flag === "1") {
          setTimeout(() => {
            toast("Silakan login terlebih dahulu", {
              description: "Akses dashboard memerlukan autentikasi.",
            });
          }, 0);
          // Hapus flag agar tidak muncul lagi di refresh berikutnya
          document.cookie = "login_required=; Max-Age=0; path=/;";
        }
      }
    } catch (_) {}
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Email dan password wajib diisi");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setLoginSuccess(true);

        toast.success(data.message, {
          duration: 2000,
        });

        console.log("Login response data:", data);
        console.log("User data from API:", data.user);

        // Store token and user data
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userData", JSON.stringify(data.user)); // Multiple redirect strategies
        setTimeout(() => {
          // Try router.replace first
          router.replace("/dashboard");
        }, 300);

        setTimeout(() => {
          // Fallback to window.location
          window.location.href = "/dashboard";
        }, 800);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Terjadi kesalahan jaringan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-emerald-50 to-purple-100 relative overflow-hidden">
      {/* Decorative Background Elements - Hidden on mobile for better performance */}
      <div className="hidden sm:block absolute top-20 left-10 w-12 h-12 md:w-16 md:h-16 bg-blue-400 rotate-12 border-3 md:border-4 border-slate-800 opacity-30 animate-bounce"></div>
      <div className="hidden sm:block absolute top-40 right-20 w-8 h-8 md:w-12 md:h-12 bg-emerald-400 rounded-full border-3 md:border-4 border-slate-800 opacity-40 animate-pulse"></div>
      <div className="hidden sm:block absolute bottom-32 left-20 w-16 h-16 md:w-20 md:h-20 bg-purple-400 rotate-45 border-3 md:border-4 border-slate-800 opacity-25 animate-spin"></div>
      <div className="hidden sm:block absolute bottom-20 right-10 w-10 h-10 md:w-14 md:h-14 bg-orange-400 border-3 md:border-4 border-slate-800 opacity-35 animate-ping"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-3 sm:p-4 py-6 sm:py-8">
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Success Screen */}
          {loginSuccess ? (
            <div className="text-center">
              <div className="bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 border-3 sm:border-4 border-slate-800 shadow-brutal transform rotate-2 mb-6">
                <span className="text-lg sm:text-2xl font-black">
                  ✅ LOGIN BERHASIL!
                </span>
              </div>

              <div className="bg-white border-3 border-slate-800 p-6 shadow-brutal">
                <div className="w-16 h-16 bg-green-400 border-3 border-slate-800 mx-auto mb-4 flex items-center justify-center text-2xl">
                  🎉
                </div>
                <h2 className="text-xl font-black text-slate-900 mb-4">
                  Redirecting ke Dashboard...
                </h2>
                <p className="text-slate-600 font-bold mb-6">
                  Jika tidak redirect otomatis, klik tombol di bawah:
                </p>
                <Link
                  href="/dashboard"
                  className="bg-blue-500 text-white px-6 py-3 font-black border-3 border-slate-800 hover:bg-blue-600 transition-colors inline-block"
                >
                  🚀 Pergi ke Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-6 sm:mb-8">
                <Link href="/" className="inline-block mb-4 sm:mb-6">
                  <div className="bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 border-3 sm:border-4 border-slate-800 shadow-brutal transform rotate-2 hover:rotate-3 transition-transform">
                    <span className="text-lg sm:text-2xl font-black">
                      📚 PINTU UNIV
                    </span>
                  </div>
                </Link>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-3 sm:mb-4 uppercase">
                  Masuk Akun
                </h1>

                <div className="bg-blue-400 text-slate-900 px-3 sm:px-4 py-2 border-3 border-slate-800 inline-block shadow-brutal transform -rotate-1">
                  <p className="font-black text-xs sm:text-sm uppercase">
                    � LANJUTKAN PERJALANAN BELAJARMU
                  </p>
                </div>
              </div>

              {/* Login Form */}
              <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 sm:p-6 md:p-8 shadow-brutal transform hover:rotate-1 transition-all duration-300">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5"
                >
                  {/* Email */}
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

                  {/* Password */}
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
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-3 border-slate-800 bg-emerald-50 text-slate-900 font-bold placeholder-slate-500 focus:outline-none focus:bg-emerald-100 focus:border-emerald-500 transition-colors text-sm sm:text-base pr-12"
                        placeholder="Password Kamu"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-600 hover:text-slate-800 transition-colors text-sm"
                      >
                        {showPassword ? "🙈" : "👁️"}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="w-4 h-4 border-2 border-slate-800 bg-white"
                      />
                      <span className="text-slate-700 font-bold">
                        Ingat saya
                      </span>
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-blue-600 font-bold hover:text-blue-800 transition-colors underline"
                    >
                      Lupa password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-slate-400 text-white font-black py-3 sm:py-4 px-4 sm:px-6 border-3 border-slate-800 shadow-brutal transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 uppercase text-sm sm:text-base disabled:transform-none disabled:shadow-brutal"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent"></div>
                        <span>MASUK...</span>
                      </span>
                    ) : (
                      "� MASUK SEKARANG"
                    )}
                  </Button>

                  {/* Register Link */}
                  <div className="text-center pt-2 sm:pt-4">
                    <p className="text-slate-600 text-xs sm:text-sm font-bold">
                      Belum punya akun?{" "}
                      <Link
                        href="/register"
                        className="text-emerald-600 hover:text-emerald-800 transition-colors underline font-black"
                      >
                        Daftar di sini
                      </Link>
                    </p>
                  </div>
                </form>
              </div>

              {/* Quick Login Demo */}
              <div className="mt-4 sm:mt-6 text-center">
                <div className="bg-yellow-100 border-3 border-yellow-500 p-3 sm:p-4">
                  <p className="text-yellow-800 font-bold text-xs sm:text-sm mb-2">
                    🚀 Demo Account:
                  </p>
                  <p className="text-yellow-700 font-bold text-xs">
                    Email:{" "}
                    <span className="font-mono">ahmad.bayu@email.com</span>
                    <br />
                    Password: <span className="font-mono">password123</span>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
