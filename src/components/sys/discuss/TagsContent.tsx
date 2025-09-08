'use client';

import { Edit, Trash2, Tag as TagIcon } from 'lucide-react';

interface Tag {
  id: number;
  name: string;
  description: string;
  color: string;
  is_active: boolean;
  created_at: string;
  created_by_name?: string;
}

interface TagsContentProps {
  tags: Tag[];
  loading: boolean;
  onEditTag: (tag: Tag) => void;
  onToggleTagStatus: (id: number, isActive: boolean) => void;
  onDeleteTag: (id: number) => void;
  formatDate: (dateString: string) => string;
}

export default function TagsContent({ 
  tags, 
  loading, 
  onEditTag, 
  onToggleTagStatus, 
  onDeleteTag, 
  formatDate 
}: TagsContentProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (tags.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <TagIcon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada tags</h3>
        <p className="text-gray-500">Tags akan muncul di sini setelah dibuat.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tags.map((tag) => (
        <div
          key={tag.id}
          className={`bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow ${
            tag.is_active ? 'border-gray-200' : 'border-gray-200 bg-gray-50'
          }`}
        >
          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: tag.color }}
                ></div>
                <h3 className="font-semibold text-gray-900">{tag.name}</h3>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEditTag(tag)}
                  className="p-1.5 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                  title="Edit"
                >
                  <Edit className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onDeleteTag(tag.id)}
                  className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                  title="Hapus"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>

            {tag.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {tag.description}
              </p>
            )}

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Oleh: {tag.created_by_name || 'Admin'}</span>
              <span>{formatDate(tag.created_at)}</span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <button
                onClick={() => onToggleTagStatus(tag.id, tag.is_active)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                  tag.is_active
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tag.is_active ? 'Aktif' : 'Nonaktif'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
