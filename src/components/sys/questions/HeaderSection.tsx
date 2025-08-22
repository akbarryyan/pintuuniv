"use client";

import { Plus, FileText } from "lucide-react";

interface HeaderSectionProps {
  onCreateNew: () => void;
}

export default function HeaderSection({ onCreateNew }: HeaderSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Title Section */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
              Kelola Soal
            </h1>
            <p className="text-slate-600 mt-1">
              Manajemen soal untuk setiap kategori tryout
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onCreateNew}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span>Tambah Soal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
