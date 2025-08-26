"use client";

import { Plus } from "lucide-react";

interface HeaderSectionProps {
  onOpenCreateModal: () => void;
}

export default function HeaderSection({ onOpenCreateModal }: HeaderSectionProps) {
  return (
    <div className="flex justify-end mb-8">
      <button
        onClick={onOpenCreateModal}
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center space-x-2"
      >
        <Plus className="w-5 h-5" />
        <span>Buat Tryout</span>
      </button>
    </div>
  );
}
