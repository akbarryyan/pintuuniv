'use client';

import { Tag } from 'lucide-react';

interface ActionButtonsProps {
  onOpenTagModal: () => void;
}

export default function ActionButtons({ onOpenTagModal }: ActionButtonsProps) {
  return (
    <div className="mb-6 flex justify-end">
      <button
        onClick={onOpenTagModal}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
      >
        <Tag className="w-4 h-4" />
        Buat Tag
      </button>
    </div>
  );
}
