"use client";

import { useState } from "react";
import { X, Folder, Clock, BookOpen, Target } from "lucide-react";

interface Category {
  id: number;
  name: string;
  description: string;
  tryout_id: number;
  tryout_title: string;
  duration_minutes: number;
  total_weight: number;
  total_questions: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface EditCategoryModalProps {
  category: Category;
  onClose: () => void;
}

export default function EditCategoryModal({
  category,
  onClose,
}: EditCategoryModalProps) {
  const [formData, setFormData] = useState({
    name: category.name,
    description: category.description,
    tryout_id: category.tryout_id.toString(),
    duration_minutes: category.duration_minutes.toString(),
    is_active: category.is_active,
  });

  // Mock tryout options
  const tryoutOptions = [
    { id: "1", title: "UTBK 2024 - Soshum" },
    { id: "2", title: "UTBK 2024 - Saintek" },
    { id: "3", title: "Simulasi CPNS 2024" },
    { id: "4", title: "Try Out Mandiri 2024" },
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
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Folder className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Edit Kategori
              </h3>
              <p className="text-sm text-slate-600">
                Perbarui informasi kategori
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
              <Folder className="w-5 h-5 text-emerald-600" />
              <span>Informasi Dasar</span>
            </h4>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nama Kategori *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                placeholder="Contoh: Matematika Dasar"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Deskripsi
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                placeholder="Deskripsi kategori ini..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tryout Terkait *
              </label>
              <select
                name="tryout_id"
                value={formData.tryout_id}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                required
              >
                <option value="">Pilih Tryout</option>
                {tryoutOptions.map((tryout) => (
                  <option key={tryout.id} value={tryout.id}>
                    {tryout.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Durasi (menit) *
              </label>
              <input
                type="number"
                name="duration_minutes"
                value={formData.duration_minutes}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                placeholder="90"
                min="1"
                required
              />
            </div>
          </div>

          {/* Configuration */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-600" />
              <span>Konfigurasi</span>
            </h4>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
              />
              <label className="text-sm font-medium text-slate-700">
                Aktifkan kategori ini
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
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
