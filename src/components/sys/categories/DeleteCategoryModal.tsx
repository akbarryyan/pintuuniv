"use client";

import { X, AlertTriangle, Folder } from "lucide-react";

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

interface DeleteCategoryModalProps {
  category: Category;
  onClose: () => void;
}

export default function DeleteCategoryModal({
  category,
  onClose,
}: DeleteCategoryModalProps) {
  const handleDelete = () => {
    // Handle deletion logic here
    console.log("Deleting category:", category.id);
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
                 Hapus Kategori
               </h3>
               <p className="text-sm text-slate-600">
                 {category.name} • {category.tryout_title}
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
                  Anda akan menghapus kategori <strong>{category.name}</strong> secara permanen. 
                  Semua data yang terkait akan hilang dan tidak dapat dipulihkan.
                </p>
              </div>
            </div>
          </div>

          {/* Confirmation */}
          <div className="bg-slate-100 rounded-xl p-4">
            <p className="text-sm text-slate-700">
              Ketik{" "}
              <span className="font-mono font-semibold bg-white px-2 py-1 rounded border">
                {category.name}
              </span>{" "}
              untuk mengkonfirmasi penghapusan:
            </p>
            <input
              type="text"
              placeholder={`Ketik "${category.name}" untuk konfirmasi`}
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
            Hapus Kategori
          </button>
        </div>
      </div>
    </div>
  );
}
