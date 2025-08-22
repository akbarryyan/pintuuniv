"use client";

import { useState } from "react";
import { X, FileText, Folder, Target, Star } from "lucide-react";

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
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
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
