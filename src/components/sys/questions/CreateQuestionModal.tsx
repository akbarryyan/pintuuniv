"use client";

import { useState } from "react";
import { X, FileText, Folder, Target, Star, Plus, Trash2 } from "lucide-react";

interface Answer {
  id: number;
  questionId: number;
  content: string;
  isCorrect: boolean;
  order?: number; // untuk pilihan ganda (A, B, C, D)
}

interface CreateQuestionModalProps {
  onClose: () => void;
}

export default function CreateQuestionModal({
  onClose,
}: CreateQuestionModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categoryId: "",
    type: "Pilihan Ganda" as "Pilihan Ganda" | "Essay" | "Benar/Salah",
    difficulty: "Mudah" as "Mudah" | "Sedang" | "Sulit" | "Sangat Sulit",
    points: "",
    isActive: true,
  });

  const [answers, setAnswers] = useState<Omit<Answer, 'id' | 'questionId'>[]>([
    { content: "", isCorrect: false, order: 1 },
    { content: "", isCorrect: false, order: 2 },
    { content: "", isCorrect: false, order: 3 },
    { content: "", isCorrect: false, order: 4 },
  ]);

  // Mock category options
  const categoryOptions = [
    { id: "1", name: "Matematika Dasar", tryout: "UTBK 2024 - Soshum" },
    { id: "2", name: "Bahasa Indonesia", tryout: "UTBK 2024 - Soshum" },
    { id: "3", name: "Fisika Lanjutan", tryout: "UTBK 2024 - Saintek" },
    { id: "4", name: "Kimia Organik", tryout: "UTBK 2024 - Saintek" },
    { id: "5", name: "Sejarah Indonesia", tryout: "Simulasi CPNS 2024" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    console.log("Answers:", answers);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    // Reset answers when type changes
    if (name === "type") {
      if (value === "Pilihan Ganda") {
        setAnswers([
          { content: "", isCorrect: false, order: 1 },
          { content: "", isCorrect: false, order: 2 },
          { content: "", isCorrect: false, order: 3 },
          { content: "", isCorrect: false, order: 4 },
        ]);
      } else if (value === "Benar/Salah") {
        setAnswers([
          { content: "Benar", isCorrect: false },
          { content: "Salah", isCorrect: false },
        ]);
      } else {
        setAnswers([{ content: "", isCorrect: true }]);
      }
    }
  };

  const handleAnswerChange = (index: number, field: keyof Omit<Answer, 'id' | 'questionId'>, value: string | boolean) => {
    const newAnswers = [...answers];
    if (field === 'isCorrect') {
      // For multiple choice and true/false, only one can be correct
      newAnswers.forEach((answer, i) => {
        answer.isCorrect = i === index;
      });
    } else {
      newAnswers[index] = { ...newAnswers[index], [field]: value };
    }
    setAnswers(newAnswers);
  };

  const addAnswer = () => {
    if (formData.type === "Pilihan Ganda") {
      setAnswers([...answers, { content: "", isCorrect: false, order: answers.length + 1 }]);
    } else if (formData.type === "Essay") {
      setAnswers([...answers, { content: "", isCorrect: true }]);
    }
  };

  const removeAnswer = (index: number) => {
    if (answers.length > 1) {
      const newAnswers = answers.filter((_, i) => i !== index);
      // Reorder if it's multiple choice
      if (formData.type === "Pilihan Ganda") {
        newAnswers.forEach((answer, i) => {
          answer.order = i + 1;
        });
      }
      setAnswers(newAnswers);
    }
  };

  const getAnswerLabel = (index: number) => {
    if (formData.type === "Pilihan Ganda") {
      return String.fromCharCode(65 + index); // A, B, C, D, etc.
    }
    return `${index + 1}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Tambah Soal Baru
              </h3>
              <p className="text-sm text-slate-600">
                Buat soal untuk kategori tryout
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <span>Informasi Dasar</span>
            </h4>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Judul Soal *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                placeholder="Contoh: Persamaan Kuadrat"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Konten Soal *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                placeholder="Tuliskan konten soal di sini..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Folder className="w-4 h-4 inline mr-1" />
                Kategori *
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                required
              >
                <option value="">Pilih Kategori</option>
                {categoryOptions.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} - {category.tryout}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Configuration */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-600" />
              <span>Konfigurasi</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tipe Soal
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                >
                  <option value="Pilihan Ganda">Pilihan Ganda</option>
                  <option value="Essay">Essay</option>
                  <option value="Benar/Salah">Benar/Salah</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tingkat Kesulitan
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                >
                  <option value="Mudah">Mudah</option>
                  <option value="Sedang">Sedang</option>
                  <option value="Sulit">Sulit</option>
                  <option value="Sangat Sulit">Sangat Sulit</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Star className="w-4 h-4 inline mr-1" />
                Poin *
              </label>
              <input
                type="number"
                name="points"
                value={formData.points}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                placeholder="10"
                min="1"
                required
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
              />
              <label className="text-sm font-medium text-slate-700">
                Aktifkan soal ini
              </label>
            </div>
          </div>

          {/* Answers Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
                <Target className="w-5 h-5 text-emerald-600" />
                <span>Jawaban</span>
              </h4>
              {(formData.type === "Pilihan Ganda" || formData.type === "Essay") && (
                <button
                  type="button"
                  onClick={addAnswer}
                  className="inline-flex items-center space-x-2 px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-all duration-200 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Jawaban</span>
                </button>
              )}
            </div>

            <div className="space-y-3">
              {answers.map((answer, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  {/* Answer Label */}
                  <div className="flex-shrink-0">
                    <span className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {getAnswerLabel(index)}
                    </span>
                  </div>

                  {/* Answer Content */}
                  <div className="flex-1">
                    {formData.type === "Essay" ? (
                      <textarea
                        value={answer.content}
                        onChange={(e) => handleAnswerChange(index, 'content', e.target.value)}
                        placeholder="Tuliskan jawaban essay..."
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
                        required
                      />
                    ) : (
                      <input
                        type="text"
                        value={answer.content}
                        onChange={(e) => handleAnswerChange(index, 'content', e.target.value)}
                        placeholder={`Jawaban ${getAnswerLabel(index)}`}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
                        required
                      />
                    )}
                  </div>

                  {/* Correct Answer Toggle */}
                  <div className="flex-shrink-0">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={answer.isCorrect}
                        onChange={() => handleAnswerChange(index, 'isCorrect', true)}
                        className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500"
                      />
                      <span className="text-sm font-medium text-slate-700">
                        Benar
                      </span>
                    </label>
                  </div>

                  {/* Remove Button */}
                  {(formData.type === "Pilihan Ganda" || formData.type === "Essay") && answers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAnswer(index)}
                      className="flex-shrink-0 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Answer Type Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-700">
                {formData.type === "Pilihan Ganda" && "Pilih satu jawaban yang benar dari pilihan yang tersedia."}
                {formData.type === "Essay" && "Tuliskan jawaban yang benar untuk soal essay."}
                {formData.type === "Benar/Salah" && "Pilih jawaban yang benar antara 'Benar' atau 'Salah'."}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200 font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              Simpan Soal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
