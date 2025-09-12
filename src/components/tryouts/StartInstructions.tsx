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
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full">
        <div className="text-center mb-6">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-black">
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-2 uppercase">
            Mulai Kategori
          </h2>
          <p className="font-bold text-slate-700">{categoryName}</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-blue-50 border-2 border-blue-200">
            <Target className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <span className="font-bold text-slate-700">
              {totalQuestions} soal akan dikerjakan
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-orange-50 border-2 border-orange-200">
            <Clock className="h-5 w-5 text-orange-600 flex-shrink-0" />
            <span className="font-bold text-slate-700">
              Waktu pengerjaan: {Math.floor(duration / 60)} menit
            </span>
          </div>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-200 p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
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
            className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 font-black text-sm border-2 border-black hover:bg-gray-200 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            Batal
          </button>
          <button
            onClick={onStartCategory}
            className="flex-1 bg-green-500 text-white px-4 py-3 font-black text-sm border-2 border-black hover:bg-green-600 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            MULAI SEKARANG
          </button>
        </div>
      </div>
    </div>
  );
}
