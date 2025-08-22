"use client";

import { X, AlertTriangle, FileText } from "lucide-react";

interface Answer {
  id: number;
  questionId: number;
  content: string;
  isCorrect: boolean;
  order?: number; // untuk pilihan ganda (A, B, C, D)
}

interface Question {
  id: number;
  title: string;
  content: string;
  categoryId: number;
  categoryName: string;
  tryoutTitle: string;
  type: "Pilihan Ganda" | "Essay" | "Benar/Salah";
  difficulty: "Mudah" | "Sedang" | "Sulit" | "Sangat Sulit";
  points: number;
  isActive: boolean;
  answers: Answer[];
  createdAt: string;
  updatedAt: string;
}

interface DeleteQuestionModalProps {
  question: Question;
  onClose: () => void;
}

export default function DeleteQuestionModal({
  question,
  onClose,
}: DeleteQuestionModalProps) {
  const handleDelete = () => {
    // Handle deletion logic here
    console.log("Deleting question:", question.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Hapus Soal
              </h3>
              <p className="text-sm text-slate-600">
                {question.title} • {question.categoryName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Warning */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-red-800 mb-1">
                  Peringatan!
                </h4>
                <p className="text-sm text-red-700">
                  Anda akan menghapus soal <strong>{question.title}</strong> secara permanen.
                  Semua data yang terkait akan hilang dan tidak dapat dipulihkan.
                </p>
              </div>
            </div>
          </div>

          {/* Question Info */}
          <div className="bg-slate-50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Informasi Soal
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-slate-600">Tipe:</span>{" "}
                <span className="font-medium text-slate-900">{question.type}</span>
              </div>
              <div>
                <span className="text-slate-600">Kategori:</span>{" "}
                <span className="font-medium text-slate-900">{question.categoryName}</span>
              </div>
              <div>
                <span className="text-slate-600">Poin:</span>{" "}
                <span className="font-medium text-slate-900">{question.points} poin</span>
              </div>
              <div>
                <span className="text-slate-600">Jumlah Jawaban:</span>{" "}
                <span className="font-medium text-slate-900">{question.answers.length} jawaban</span>
              </div>
            </div>
          </div>

          {/* Confirmation */}
          <div className="bg-slate-100 rounded-xl p-4">
            <p className="text-sm text-slate-700">
              Ketik{" "}
              <span className="font-mono font-semibold bg-white px-2 py-1 rounded border">
                {question.title}
              </span>{" "}
              untuk mengkonfirmasi penghapusan:
            </p>
            <input
              type="text"
              placeholder={`Ketik "${question.title}" untuk konfirmasi`}
              className="w-full mt-2 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-sm"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-6 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200 font-medium"
          >
            Batal
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            Hapus Soal
          </button>
        </div>
      </div>
    </div>
  );
}
