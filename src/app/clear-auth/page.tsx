"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ClearAuthPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear all authentication data
    if (typeof window !== "undefined") {
      // Clear localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");

      // Clear cookies by setting them to expire
      document.cookie =
        "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      toast.success("Semua data auth berhasil dihapus!");

      // Redirect to home after clearing
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-emerald-50 to-purple-100 flex items-center justify-center">
      <div className="bg-white border-3 border-slate-800 p-8 shadow-brutal text-center">
        <div className="w-16 h-16 bg-red-400 border-3 border-slate-800 mx-auto mb-4 flex items-center justify-center text-2xl">
          🧹
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-4">
          Membersihkan Data Auth...
        </h1>
        <p className="text-slate-600 font-bold">
          Menghapus cookies dan localStorage...
        </p>
        <div className="mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
