"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Edit, Trash2, Eye, Calendar, MessageCircle, Heart, Eye as ViewIcon } from 'lucide-react';

interface MyDiscussion {
  id: number;
  title: string;
  content: string;
  view_count: number;
  reply_count: number;
  like_count: number;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  tags: string[];
  tagColors: string[];
}

export default function MyDiscussions() {
  const router = useRouter();
  const [discussions, setDiscussions] = useState<MyDiscussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [discussionToDelete, setDiscussionToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchMyDiscussions();
  }, []);

  const fetchMyDiscussions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/discussions/my');
      const data = await response.json();

      if (data.success) {
        setDiscussions(data.data.discussions);
      } else {
        toast.error(data.error || 'Gagal memuat diskusi Anda');
      }
    } catch (error) {
      console.error('Error fetching my discussions:', error);
      toast.error('Gagal memuat diskusi Anda');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (discussionId: number) => {
    router.push(`/discuss/edit/${discussionId}`);
  };

  const handleDelete = (discussionId: number) => {
    setDiscussionToDelete(discussionId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!discussionToDelete) return;

    try {
      const response = await fetch(`/api/discussions/${discussionToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Diskusi berhasil dihapus!');
        fetchMyDiscussions(); // Refresh list
      } else {
        toast.error(data.error || 'Gagal menghapus diskusi');
      }
    } catch (error) {
      console.error('Error deleting discussion:', error);
      toast.error('Gagal menghapus diskusi');
    } finally {
      setShowDeleteModal(false);
      setDiscussionToDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTagColor = (index: number) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-orange-100 text-orange-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800'
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="bg-white border-3 border-slate-800 p-6 shadow-brutal">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white border-3 border-slate-800 p-6 shadow-brutal">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            📝 Diskusi Saya
            <span className="bg-blue-500 text-white px-2 py-1 text-sm font-bold rounded">
              {discussions.length}
            </span>
          </h2>
          <button
            onClick={() => router.push('/discuss/create')}
            className="bg-green-500 text-white px-4 py-2 font-black text-sm border-2 border-slate-800 hover:bg-green-600 transition-colors"
          >
            + Buat Baru
          </button>
        </div>

        {discussions.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="font-black text-lg text-slate-900 mb-2">Belum Ada Diskusi</h3>
            <p className="text-slate-600 font-bold mb-4">
              Anda belum membuat diskusi apapun. Mulai diskusi pertama Anda!
            </p>
            <button
              onClick={() => router.push('/discuss/create')}
              className="bg-blue-500 text-white px-6 py-3 font-black text-sm border-2 border-slate-800 hover:bg-blue-600 transition-colors"
            >
              Buat Diskusi Pertama
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {discussions.map((discussion) => (
              <div
                key={discussion.id}
                className="border-2 border-slate-200 p-4 hover:border-slate-400 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-black text-lg text-slate-900 mb-2 leading-tight">
                      {discussion.title}
                    </h3>
                    <p className="text-sm text-slate-700 font-medium mb-3 line-clamp-2">
                      {discussion.content}
                    </p>
                  </div>
                  {discussion.is_pinned && (
                    <span className="bg-red-500 text-white px-2 py-1 font-black text-xs border border-slate-800 ml-2">
                      📌 PINNED
                    </span>
                  )}
                </div>

                {/* Tags */}
                {discussion.tags && discussion.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {discussion.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 border border-slate-800 font-bold text-xs ${getTagColor(index)}`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Stats and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs font-bold text-slate-600">
                    <span className="flex items-center gap-1">
                      <ViewIcon className="w-3 h-3" />
                      {discussion.view_count} views
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {discussion.reply_count} replies
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {discussion.like_count} likes
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(discussion.created_at)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => router.push(`/discuss/${discussion.id}`)}
                      className="bg-blue-500 text-white px-3 py-1 border-2 border-slate-800 font-black text-xs hover:bg-blue-600 transition-colors flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      Lihat
                    </button>
                    <button
                      onClick={() => handleEdit(discussion.id)}
                      className="bg-yellow-500 text-white px-3 py-1 border-2 border-slate-800 font-black text-xs hover:bg-yellow-600 transition-colors flex items-center gap-1"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(discussion.id)}
                      className="bg-red-500 text-white px-3 py-1 border-2 border-slate-800 font-black text-xs hover:bg-red-600 transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-3 border-slate-800 p-6 shadow-brutal max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-400 border-3 border-slate-800 mx-auto mb-4 flex items-center justify-center text-2xl">
                ⚠️
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">
                Hapus Diskusi?
              </h3>
              <p className="text-slate-600 font-bold mb-6">
                Apakah Anda yakin ingin menghapus diskusi ini? Tindakan ini tidak dapat dibatalkan.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-3 font-black text-sm border-2 border-slate-800 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-6 py-3 font-black text-sm border-2 border-slate-800 bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
