"use client";

import { Plus, Folder, Clock, BookOpen, TrendingUp } from "lucide-react";

interface HeaderSectionProps {
  onCreateNew: () => void;
}

export default function HeaderSection({ onCreateNew }: HeaderSectionProps) {
  // Mock stats
  const stats = {
    totalCategories: 24,
    activeCategories: 18,
    totalQuestions: 1248,
    averageDuration: 75,
  };

  return (
    <div className="mb-6">
      {/* Action Button */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={onCreateNew}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          <span className="font-medium">Tambah Kategori</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
              <Folder className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">
                Total Kategori
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {stats.totalCategories.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">
                Kategori Aktif
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {stats.activeCategories.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Total Soal</p>
              <p className="text-2xl font-bold text-slate-900">
                {stats.totalQuestions.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">
                Durasi Rata-rata
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {stats.averageDuration} min
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
