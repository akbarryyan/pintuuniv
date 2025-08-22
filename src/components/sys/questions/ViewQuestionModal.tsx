"use client";

import {
  X,
  FileText,
  Folder,
  Target,
  Star,
  Activity,
  Calendar,
} from "lucide-react";

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

interface ViewQuestionModalProps {
  question: Question;
  onClose: () => void;
}

export default function ViewQuestionModal({
  question,
  onClose,
}: ViewQuestionModalProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Mudah":
        return "text-emerald-700 bg-emerald-50 border-emerald-200";
      case "Sedang":
        return "text-blue-700 bg-blue-50 border-blue-200";
      case "Sulit":
        return "text-amber-700 bg-amber-50 border-amber-200";
      case "Sangat Sulit":
        return "text-red-700 bg-red-50 border-red-200";
      default:
        return "text-slate-700 bg-slate-50 border-slate-200";
    }
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : "text-slate-700 bg-slate-50 border-slate-200";
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Pilihan Ganda":
        return "text-purple-700 bg-purple-50 border-purple-200";
      case "Essay":
        return "text-indigo-700 bg-indigo-50 border-indigo-200";
      case "Benar/Salah":
        return "text-cyan-700 bg-cyan-50 border-cyan-200";
      default:
        return "text-slate-700 bg-slate-50 border-slate-200";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                {question.title}
              </h3>
              <p className="text-sm text-slate-600">
                Detail Soal - ID: {question.id}
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
        <div className="p-6 space-y-6">
          {/* Status Badges */}
          <div className="flex items-center space-x-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getTypeColor(
                question.type
              )}`}
            >
              <FileText className="w-4 h-4 mr-2" />
              {question.type}
            </span>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(
                question.difficulty
              )}`}
            >
              <Target className="w-4 h-4 mr-2" />
              {question.difficulty}
            </span>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                question.isActive
              )}`}
            >
              <Activity className="w-4 h-4 mr-2" />
              {question.isActive ? "Aktif" : "Tidak Aktif"}
            </span>
          </div>

          {/* Content */}
          <div className="bg-slate-50 rounded-xl p-4">
            <h4 className="text-lg font-semibold text-slate-900 mb-2">
              Konten Soal
            </h4>
            <p className="text-slate-700 leading-relaxed">
              {question.content}
            </p>
          </div>

          {/* Category Info */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4">
            <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
              <Folder className="w-5 h-5 mr-2 text-purple-600" />
              Kategori
            </h4>
            <div className="space-y-2">
              <p className="text-slate-900 font-medium">
                {question.categoryName}
              </p>
              <p className="text-sm text-slate-600">
                {question.tryoutTitle}
              </p>
            </div>
          </div>

          {/* Points Info */}
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-4">
            <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
              <Star className="w-5 h-5 mr-2 text-amber-600" />
              Poin
            </h4>
            <div className="space-y-2">
              <p className="text-slate-900 font-medium">
                {question.points} poin
              </p>
              <p className="text-sm text-slate-600">
                Nilai maksimal untuk soal ini
              </p>
            </div>
          </div>

          {/* Answers Info */}
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl p-4">
            <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
              <Target className="w-5 h-5 mr-2 text-emerald-600" />
              Jawaban
            </h4>
            <div className="space-y-3">
              {question.type === "Pilihan Ganda" ? (
                <div>
                  <p className="text-sm text-slate-600 mb-3">
                    Pilihan jawaban untuk soal pilihan ganda:
                  </p>
                  <div className="space-y-2">
                    {question.answers.map((answer) => (
                      <div key={answer.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                          answer.isCorrect 
                            ? "bg-emerald-500 text-white" 
                            : "bg-slate-200 text-slate-600"
                        }`}>
                          {answer.order === 1 ? "A" : answer.order === 2 ? "B" : answer.order === 3 ? "C" : "D"}
                        </span>
                        <span className={`flex-1 ${
                          answer.isCorrect ? "text-emerald-700 font-semibold" : "text-slate-700"
                        }`}>
                          {answer.content}
                        </span>
                        {answer.isCorrect && (
                          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
                            Benar
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : question.type === "Benar/Salah" ? (
                <div>
                  <p className="text-sm text-slate-600 mb-3">
                    Pilihan jawaban untuk soal benar/salah:
                  </p>
                  <div className="space-y-2">
                    {question.answers.map((answer) => (
                      <div key={answer.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                        <span className={`px-3 py-1 rounded text-sm font-bold ${
                          answer.isCorrect 
                            ? "bg-emerald-500 text-white" 
                            : "bg-slate-200 text-slate-600"
                        }`}>
                          {answer.content}
                        </span>
                        {answer.isCorrect && (
                          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
                            Jawaban Benar
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-slate-600 mb-3">
                    Jawaban untuk soal essay:
                  </p>
                  <div className="p-3 bg-white rounded-lg border">
                    <p className="text-emerald-700 font-semibold">
                      {question.answers.find(a => a.isCorrect)?.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Timestamps */}
          <div className="bg-slate-50 rounded-xl p-4">
            <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-slate-600" />
              Riwayat
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600 mb-1">Dibuat pada</p>
                <p className="text-sm font-semibold text-slate-900">
                  {question.createdAt}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Terakhir diupdate</p>
                <p className="text-sm font-semibold text-slate-900">
                  {question.updatedAt}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-6 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl transition-all duration-200 font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
