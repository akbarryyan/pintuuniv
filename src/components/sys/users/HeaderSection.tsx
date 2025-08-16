"use client";

import { Plus } from "lucide-react";

interface HeaderSectionProps {
  onOpenCreateModal: () => void;
}

export default function HeaderSection({ onOpenCreateModal }: HeaderSectionProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Manage Users</h2>
        <p className="text-slate-600 mt-1">Kelola dan pantau pengguna platform</p>
      </div>
      <button
        onClick={onOpenCreateModal}
        className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center space-x-2"
      >
        <Plus className="w-5 h-5" />
        <span>Tambah User</span>
      </button>
    </div>
  );
}
