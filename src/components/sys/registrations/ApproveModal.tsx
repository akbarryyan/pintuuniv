"use client";

import { useState } from "react";
import { Registration } from "@/lib/services/registrationService";

interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  registration: Registration | null;
  onApprove: (registrationId: number, notes: string) => Promise<void>;
}

export default function ApproveModal({
  isOpen,
  onClose,
  registration,
  onApprove,
}: ApproveModalProps) {
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !registration) return null;

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      await onApprove(registration.id, notes);
      setNotes("");
    } catch (error) {
      console.error("Error approving registration:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-slate-800 shadow-brutal max-w-md w-full transform hover:rotate-1 transition-all duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4 sm:p-6 border-b-4 border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white border-3 border-slate-800 flex items-center justify-center font-black text-lg text-emerald-600 shadow-lg">
              ✅
            </div>
            <div>
              <h3 className="font-black text-lg sm:text-xl uppercase">
                Setujui Registrasi
              </h3>
              <p className="text-emerald-100 text-sm font-bold">
                Konfirmasi persetujuan pendaftaran tryout
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6">
          {/* Registration Info */}
          <div className="bg-slate-50 border-3 border-slate-800 p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center font-black text-sm flex-shrink-0">
                🎯
              </div>
              <div className="flex-1">
                <h4 className="font-black text-slate-900 text-sm sm:text-base mb-2">
                  {registration.tryout_title}
                </h4>
                <div className="space-y-1 text-xs text-slate-600">
                  <div><strong>User:</strong> {registration.user_name}</div>
                  <div><strong>Email:</strong> {registration.user_email}</div>
                  <div><strong>Tanggal Daftar:</strong> {new Date(registration.registration_date).toLocaleDateString('id-ID')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Input */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-900 mb-2">
              📝 Catatan (Opsional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tambahkan catatan untuk persetujuan ini..."
              className="w-full px-3 py-2 border-2 border-slate-800 font-bold text-sm focus:outline-none focus:border-emerald-500 h-20 resize-none"
            />
          </div>

          {/* Confirmation Message */}
          <div className="bg-emerald-50 border-3 border-emerald-400 p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center font-black text-sm flex-shrink-0">
                ⚠️
              </div>
              <div>
                <h5 className="font-black text-slate-900 text-sm mb-2">
                  PERHATIAN:
                </h5>
                <p className="text-slate-700 text-xs font-bold leading-relaxed">
                  Dengan menyetujui registrasi ini, user akan dapat mengakses tryout dan status pembayaran akan diubah menjadi "Lunas". Pastikan semua persyaratan telah terpenuhi.
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
              onClick={handleApprove}
              disabled={isLoading}
              className="flex-1 bg-emerald-500 text-white px-4 py-3 font-black text-sm border-3 border-slate-800 hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Memproses...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>✅</span>
                  <span>Setujui</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
