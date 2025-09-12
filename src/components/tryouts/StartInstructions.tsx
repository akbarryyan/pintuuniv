import React from "react";
import {
  Clock,
  BookOpen,
  Target,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface StartInstructionsProps {
  onStartCategory: () => void;
  onCancel: () => void;
  categoryName: string;
  duration: number;
  totalQuestions: number;
}

export default function StartInstructions({
  onStartCategory,
  onCancel,
  categoryName,
  duration,
  totalQuestions,
}: StartInstructionsProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full animate-in zoom-in-95 duration-300 relative">
        {/* Decorative corner elements */}
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 border border-black"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border border-black"></div>
        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-yellow-500 border border-black"></div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 border border-black"></div>

        <div className="text-center mb-6">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-black hover:scale-110 transition-transform duration-300">
            <BookOpen className="h-8 w-8 text-blue-600 animate-pulse" />
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-2 uppercase">
            Mulai Kategori
          </h2>
          <p className="font-bold text-slate-700 bg-slate-100 px-3 py-1 border border-slate-300 inline-block">
            {categoryName}
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-blue-50 border-2 border-blue-200 hover:bg-blue-100 transition-colors duration-200">
            <Target className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <span className="font-bold text-slate-700">
              {totalQuestions} soal akan dikerjakan
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-orange-50 border-2 border-orange-200 hover:bg-orange-100 transition-colors duration-200">
            <Clock className="h-5 w-5 text-orange-600 flex-shrink-0" />
            <span className="font-bold text-slate-700">
              Waktu pengerjaan: {Math.floor(duration / 60)} menit
            </span>
          </div>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-200 p-4 mb-6 hover:bg-yellow-100 transition-colors duration-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5 animate-pulse" />
            <div className="space-y-2 text-sm font-bold text-slate-700">
              <p>⚠️ Perhatian:</p>
              <ul className="space-y-1 ml-4">
                <li>• Timer akan dimulai setelah Anda klik "Mulai"</li>
                <li>• Pastikan koneksi internet stabil</li>
                <li>• Jangan refresh halaman saat mengerjakan</li>
                <li>• Jawaban tersimpan otomatis</li>
                <li>• Waktu tidak bisa dihentikan atau diperpanjang</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 font-black text-sm border-2 border-black hover:bg-gray-200 hover:scale-105 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            Batal
          </button>
          <button
            onClick={onStartCategory}
            className="flex-1 bg-green-500 text-white px-4 py-3 font-black text-sm border-2 border-black hover:bg-green-600 hover:scale-105 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            MULAI SEKARANG
          </button>
        </div>
      </div>
    </div>
  );
}
