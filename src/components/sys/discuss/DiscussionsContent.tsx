'use client';

import { 
  Eye, 
  Heart, 
  Reply, 
  Pin, 
  Trash2, 
  Edit,
  Calendar,
  Users
} from 'lucide-react';

interface Discussion {
  id: number;
  title: string;
  content: string;
  view_count: number;
  reply_count: number;
  like_count: number;
  is_pinned: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  user_name: string;
  user: {
    name: string;
  };
  tags: Array<{
    id: number;
    name: string;
    color: string;
  }>;
}

interface DiscussionsContentProps {
  discussions: Discussion[];
  loading: boolean;
  onTogglePin: (id: number, isPinned: boolean) => void;
  onDeleteDiscussion: (id: number) => void;
  formatDate: (dateString: string) => string;
}

export default function DiscussionsContent({ 
  discussions, 
  loading, 
  onTogglePin, 
  onDeleteDiscussion, 
  formatDate 
}: DiscussionsContentProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (discussions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Reply className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada discussions</h3>
        <p className="text-gray-500">Discussions akan muncul di sini setelah dibuat.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {discussions.map((discussion) => (
        <div
          key={discussion.id}
          className={`bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow ${
            discussion.is_pinned ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
          }`}
        >
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {discussion.is_pinned && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                      <Pin className="w-3 h-3" />
                      Pinned
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {discussion.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {discussion.content}
                </p>

                {/* Tags */}
                {discussion.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {discussion.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-2 py-1 text-xs font-medium rounded-full text-white"
                        style={{ backgroundColor: tag.color }}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Meta Info */}
                <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{discussion.user.name}</span>
                </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(discussion.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{discussion.view_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Reply className="w-4 h-4" />
                    <span>{discussion.reply_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{discussion.like_count}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onTogglePin(discussion.id, discussion.is_pinned)}
                  className={`p-2 rounded-lg transition-colors ${
                    discussion.is_pinned
                      ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={discussion.is_pinned ? 'Unpin' : 'Pin'}
                >
                  <Pin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteDiscussion(discussion.id)}
                  className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
