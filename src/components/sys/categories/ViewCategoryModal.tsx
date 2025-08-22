"use client";

import {
  X,
  Folder,
  Clock,
  BookOpen,
  Target,
  Users,
  Activity,
  Calendar,
} from "lucide-react";

interface Category {
  id: number;
  name: string;
  description: string;
  tryoutId: number;
  tryoutTitle: string;
  duration: number; // in minutes
  difficulty: "Mudah" | "Sedang" | "Sulit" | "Sangat Sulit";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ViewCategoryModalProps {
  category: Category;
  onClose: () => void;
}

export default function ViewCategoryModal({
  category,
  onClose,
}: ViewCategoryModalProps) {
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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Folder className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                {category.name}
              </h3>
              <p className="text-sm text-slate-600">
                Detail Kategori - ID: {category.id}
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
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(
                category.difficulty
              )}`}
            >
              <Target className="w-4 h-4 mr-2" />
              {category.difficulty}
            </span>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                category.isActive
              )}`}
            >
              <Activity className="w-4 h-4 mr-2" />
              {category.isActive ? "Aktif" : "Tidak Aktif"}
            </span>
          </div>

          {/* Description */}
          <div className="bg-slate-50 rounded-xl p-4">
            <h4 className="text-lg font-semibold text-slate-900 mb-2">
              Deskripsi
            </h4>
            <p className="text-slate-700 leading-relaxed">
              {category.description || "Tidak ada deskripsi"}
            </p>
          </div>

                     {/* Tryout Info */}
           <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
             <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
               <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
               Tryout Terkait
             </h4>
             <div className="space-y-2">
               <p className="text-slate-900 font-medium">
                 {category.tryoutTitle}
               </p>
               <p className="text-sm text-slate-600">
                 ID Tryout: {category.tryoutId}
               </p>
             </div>
           </div>

           {/* Duration Info */}
           <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-4">
             <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
               <Clock className="w-5 h-5 mr-2 text-amber-600" />
               Durasi
             </h4>
             <div className="space-y-2">
               <p className="text-slate-900 font-medium">
                 {category.duration} menit
               </p>
               <p className="text-sm text-slate-600">
                 Waktu pengerjaan untuk kategori ini
               </p>
             </div>
           </div>

           {/* Configuration Stats */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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
                  {category.createdAt}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Terakhir diupdate</p>
                <p className="text-sm font-semibold text-slate-900">
                  {category.updatedAt}
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
