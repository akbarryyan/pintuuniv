"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { toast } from "sonner";

interface LogoutConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutConfirmationModal({
  isOpen,
  onClose,
}: LogoutConfirmationModalProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      let serverOk = false;
      try {
        const res = await fetch("/api/auth/logout", { method: "POST" });
        serverOk = res.ok;
      } catch (_) {
        serverOk = false;
      } finally {
        if (typeof window !== "undefined") {
          try {
            localStorage.removeItem("authToken");
            localStorage.removeItem("userData");
          } catch (_) {}
          document.cookie =
            "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
        if (serverOk) {
          toast.success("Logout berhasil! Sampai jumpa lagi! 👋");
        } else {
          toast.error("Logout gagal di server, namun sesi lokal dibersihkan.");
        }
        router.push("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Gagal melakukan logout");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (!isProcessing) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop dengan blur effect */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white border-4 border-slate-800 shadow-brutal max-w-md w-full mx-4 transform animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b-4 border-slate-800 bg-gradient-to-r from-red-50 to-red-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-black text-lg sm:text-xl text-slate-900">
                🚪 Konfirmasi Logout
              </h2>
              <p className="text-sm text-slate-600 font-bold mt-1">
                Yakin ingin keluar dari akun?
              </p>
            </div>
            <button
              onClick={handleClose}
              disabled={isProcessing}
              className="p-2 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Warning Info */}
          <div className="bg-slate-50 border-2 border-slate-200 p-4 rounded-lg mb-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-black text-base text-slate-900 mb-2">
                  Anda akan keluar dari akun
                </h3>
                <p className="text-sm text-slate-600 font-bold">
                  Sesi Anda akan berakhir dan Anda akan kembali ke halaman
                  utama. Pastikan semua pekerjaan telah disimpan.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              disabled={isProcessing}
              className="flex-1 bg-slate-100 text-slate-900 px-4 py-3 font-black text-sm border-2 border-slate-800 hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            <button
              onClick={handleConfirm}
              disabled={isProcessing}
              className="flex-1 bg-red-500 text-white px-4 py-3 font-black text-sm border-2 border-slate-800 hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Logout...</span>
                </div>
              ) : (
                "🚪 Ya, Logout"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
