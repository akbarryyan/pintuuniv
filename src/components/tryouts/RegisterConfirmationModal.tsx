"use client";

import { useState } from "react";
import { toast } from "sonner";

interface Tryout {
  id: number;
  title: string;
  type: string;
  price: number;
}

interface RegisterConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  tryout: Tryout | null;
  onConfirm: (tryoutId: number, tryoutTitle: string) => Promise<void>;
}

export default function RegisterConfirmationModal({
  isOpen,
  onClose,
  tryout,
  onConfirm,
}: RegisterConfirmationModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !tryout) return null;

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm(tryout.id, tryout.title);
      onClose();
    } catch (error) {
      console.error("Error in confirmation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-slate-800 shadow-brutal max-w-md w-full transform hover:rotate-1 transition-all duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 sm:p-6 border-b-4 border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white border-3 border-slate-800 flex items-center justify-center font-black text-lg text-blue-600 shadow-lg">
              📝
            </div>
            <div>
              <h3 className="font-black text-lg sm:text-xl uppercase">
                Konfirmasi Pendaftaran
              </h3>
              <p className="text-blue-100 text-sm font-bold">
                Pastikan data yang Anda masukkan sudah benar
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6">
          {/* Tryout Info */}
          <div className="bg-slate-50 border-3 border-slate-800 p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center font-black text-sm flex-shrink-0">
                🎯
              </div>
              <div className="flex-1">
                <h4 className="font-black text-slate-900 text-sm sm:text-base mb-2">
                  {tryout.title}
                </h4>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`px-2 py-1 border-2 border-slate-800 font-black text-xs ${
                      tryout.type === "free"
                        ? "bg-emerald-400 text-slate-900"
                        : "bg-orange-400 text-slate-900"
                    }`}
                  >
                    {tryout.type === "free" ? "GRATIS" : "PREMIUM"}
                  </div>
                  {tryout.type === "free" && (
                    <div className="px-2 py-1 border-2 border-slate-800 font-black text-xs bg-blue-400 text-slate-900">
                      LANGSUNG AKTIF
                    </div>
                  )}
                </div>
                {tryout.type === "free" ? (
                  <p className="text-slate-600 text-xs font-bold">
                    ✅ Tidak ada biaya pendaftaran
                    <br />
                    ✅ Dapat langsung dimulai setelah mendaftar
                    <br />
                    ✅ Akses penuh ke semua fitur tryout
                  </p>
                ) : (
                  <p className="text-slate-600 text-xs font-bold">
                    💰 Biaya: Rp {Math.round(tryout.price).toLocaleString('id-ID')}
                    <br />
                    ⏳ Menunggu konfirmasi pembayaran
                    <br />
                    📧 Notifikasi akan dikirim ke email Anda
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Confirmation Message */}
          <div className="bg-blue-50 border-3 border-blue-400 p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-400 border-2 border-slate-800 flex items-center justify-center font-black text-sm flex-shrink-0">
                ⚠️
              </div>
              <div>
                <h5 className="font-black text-slate-900 text-sm mb-2">
                  PERHATIAN:
                </h5>
                <p className="text-slate-700 text-xs font-bold leading-relaxed">
                  {tryout.type === "free" 
                    ? "Dengan mendaftar, Anda menyetujui untuk mengikuti tryout ini. Setelah mendaftar, Anda dapat langsung memulai tryout kapan saja."
                    : "Dengan mendaftar, Anda menyetujui untuk membayar biaya tryout. Pembayaran harus dilakukan sebelum tryout dapat dimulai."
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 bg-slate-100 text-slate-900 px-4 py-3 font-black text-sm border-3 border-slate-800 hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className={`flex-1 px-4 py-3 font-black text-sm border-3 border-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                tryout.type === "free"
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Memproses...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>📝</span>
                  <span>Daftar Sekarang</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
