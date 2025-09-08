'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePageTransition } from "@/lib/hooks";
import Sidebar from '@/components/sys/Sidebar';
import TopHeader from '@/components/sys/TopHeader';
import { toast } from 'sonner';
import { 
  MessageSquare, 
  Plus, 
  Edit, 
  Trash2, 
  Pin, 
  Eye, 
  Heart,
  Reply,
  Tag,
  Users,
  Calendar,
  Search,
  Filter,
  MoreHorizontal
} from 'lucide-react';

interface Discussion {
  id: number;
  title: string;
  content: string;
  view_count: number;
  reply_count: number;
  like_count: number;
  is_pinned: boolean;
  created_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  tags: Array<{
    id: number;
    name: string;
    color: string;
  }>;
}

interface Tag {
  id: number;
  name: string;
  description: string;
  color: string;
  is_active: boolean;
  created_at: string;
}

export default function DiscussPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('discuss');
  
  // Use auth context
  const { isAuthenticated, isLoading } = useAuth();

  // Use page transition hook
  usePageTransition();

  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'discussions' | 'tags'>('discussions');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  // Form states
  const [tagForm, setTagForm] = useState({
    name: '',
    description: '',
    color: '#3B82F6'
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchDiscussions();
      fetchTags();
    }
  }, [isAuthenticated]);

  const fetchDiscussions = async () => {
    try {
      const response = await fetch('/api/sys/discussions');
      if (response.ok) {
        const data = await response.json();
        setDiscussions(data.discussions || []);
      } else {
        toast.error('Gagal memuat discussions');
      }
    } catch (error) {
      console.error('Error fetching discussions:', error);
      toast.error('Error memuat discussions');
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/sys/discussions/tags');
      if (response.ok) {
        const data = await response.json();
        setTags(data.tags || []);
      } else {
        toast.error('Gagal memuat tags');
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
      toast.error('Error memuat tags');
    }
  };

  const handleCreateTag = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/sys/discussions/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tagForm)
      });

      if (response.ok) {
        toast.success('Tag berhasil dibuat');
        setShowTagModal(false);
        setTagForm({ name: '', description: '', color: '#3B82F6' });
        fetchTags();
      } else {
        toast.error('Gagal membuat tag');
      }
    } catch (error) {
      console.error('Error creating tag:', error);
      toast.error('Error membuat tag');
    }
  };

  const handleUpdateTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTag) return;

    try {
      const response = await fetch(`/api/sys/discussions/tags/${editingTag.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tagForm)
      });

      if (response.ok) {
        toast.success('Tag berhasil diupdate');
        setShowTagModal(false);
        setEditingTag(null);
        setTagForm({ name: '', description: '', color: '#3B82F6' });
        fetchTags();
      } else {
        toast.error('Gagal mengupdate tag');
      }
    } catch (error) {
      console.error('Error updating tag:', error);
      toast.error('Error mengupdate tag');
    }
  };

  const handleDeleteTag = async (tagId: number) => {
    if (!confirm('Yakin ingin menghapus tag ini?')) return;

    try {
      const response = await fetch(`/api/sys/discussions/tags/${tagId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast.success('Tag berhasil dihapus');
        fetchTags();
      } else {
        toast.error('Gagal menghapus tag');
      }
    } catch (error) {
      console.error('Error deleting tag:', error);
      toast.error('Error menghapus tag');
    }
  };

  const handleToggleTagStatus = async (tagId: number, isActive: boolean) => {
    try {
      const response = await fetch(`/api/sys/discussions/tags/${tagId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !isActive })
      });

      if (response.ok) {
        toast.success(`Tag berhasil ${!isActive ? 'diaktifkan' : 'dinonaktifkan'}`);
        fetchTags();
      } else {
        toast.error('Gagal mengubah status tag');
      }
    } catch (error) {
      console.error('Error toggling tag status:', error);
      toast.error('Error mengubah status tag');
    }
  };

  const handleTogglePin = async (discussionId: number, isPinned: boolean) => {
    try {
      const response = await fetch(`/api/sys/discussions/${discussionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_pinned: !isPinned })
      });

      if (response.ok) {
        toast.success(`Discussion berhasil ${!isPinned ? 'di-pin' : 'di-unpin'}`);
        fetchDiscussions();
      } else {
        toast.error('Gagal mengubah status pin');
      }
    } catch (error) {
      console.error('Error toggling pin:', error);
      toast.error('Error mengubah status pin');
    }
  };

  const handleDeleteDiscussion = async (discussionId: number) => {
    if (!confirm('Yakin ingin menghapus discussion ini?')) return;

    try {
      const response = await fetch(`/api/sys/discussions/${discussionId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast.success('Discussion berhasil dihapus');
        fetchDiscussions();
      } else {
        toast.error('Gagal menghapus discussion');
      }
    } catch (error) {
      console.error('Error deleting discussion:', error);
      toast.error('Error menghapus discussion');
    }
  };

  const openEditTagModal = (tag: Tag) => {
    setEditingTag(tag);
    setTagForm({
      name: tag.name,
      description: tag.description,
      color: tag.color
    });
    setShowTagModal(true);
  };

  const closeTagModal = () => {
    setShowTagModal(false);
    setEditingTag(null);
    setTagForm({ name: '', description: '', color: '#3B82F6' });
  };

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !filterTag || discussion.tags.some(tag => tag.id === filterTag);
    return matchesSearch && matchesTag;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Memverifikasi akses admin...</p>
        </div>
      </div>
    );
  }

  // Show nothing if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-white/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          pageTitle="Forum Management"
          pageDescription="Kelola discussions dan tags forum"
        />
        
        <main className="flex-1 p-4 lg:p-8 overflow-auto" data-main-content>
          {/* Action Buttons */}
          <div className="mb-6 flex justify-end">
            <button
              onClick={() => setShowTagModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Tag className="w-4 h-4" />
              Buat Tag
            </button>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('discussions')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'discussions'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Discussions ({discussions.length})
                </button>
                <button
                  onClick={() => setActiveTab('tags')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'tags'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Tags ({tags.length})
                </button>
              </nav>
            </div>
          </div>

          {/* Search and Filter */}
          {activeTab === 'discussions' && (
            <div className="mb-6 flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterTag || ''}
                onChange={(e) => setFilterTag(e.target.value ? Number(e.target.value) : null)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Semua Tags</option>
                {tags.filter(tag => tag.is_active).map(tag => (
                  <option key={tag.id} value={tag.id}>{tag.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Content */}
          {activeTab === 'discussions' ? (
            <div className="grid gap-6">
              {filteredDiscussions.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada discussions</h3>
                  <p className="text-gray-500">Belum ada discussions yang dibuat</p>
                </div>
              ) : (
                filteredDiscussions.map((discussion) => (
                  <div key={discussion.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {discussion.is_pinned && (
                            <Pin className="w-4 h-4 text-blue-600" />
                          )}
                          <h3 className="text-lg font-semibold text-gray-900">{discussion.title}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{discussion.content}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {discussion.user.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(discussion.created_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {discussion.view_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <Reply className="w-4 h-4" />
                            {discussion.reply_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {discussion.like_count}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleTogglePin(discussion.id, discussion.is_pinned)}
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
                          onClick={() => handleDeleteDiscussion(discussion.id)}
                          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {discussion.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="px-2 py-1 text-xs font-medium rounded-full"
                          style={{ 
                            backgroundColor: `${tag.color}20`, 
                            color: tag.color 
                          }}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="grid gap-4">
              {tags.length === 0 ? (
                <div className="text-center py-12">
                  <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada tags</h3>
                  <p className="text-gray-500">Belum ada tags yang dibuat</p>
                </div>
              ) : (
                tags.map((tag) => (
                  <div key={tag.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: tag.color }}
                        ></div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{tag.name}</h3>
                          <p className="text-sm text-gray-600">{tag.description}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          tag.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {tag.is_active ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditTagModal(tag)}
                          className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleTagStatus(tag.id, tag.is_active)}
                          className={`p-2 rounded-lg transition-colors ${
                            tag.is_active
                              ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                              : 'bg-green-100 text-green-600 hover:bg-green-200'
                          }`}
                          title={tag.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                        >
                          {tag.is_active ? 'Disable' : 'Enable'}
                        </button>
                        <button
                          onClick={() => handleDeleteTag(tag.id)}
                          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </div>

      {/* Tag Modal */}
      {showTagModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingTag ? 'Edit Tag' : 'Buat Tag Baru'}
            </h2>
            <form onSubmit={editingTag ? handleUpdateTag : handleCreateTag}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Tag
                  </label>
                  <input
                    type="text"
                    required
                    value={tagForm.name}
                    onChange={(e) => setTagForm({ ...tagForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Masukkan nama tag"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi
                  </label>
                  <textarea
                    value={tagForm.description}
                    onChange={(e) => setTagForm({ ...tagForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Masukkan deskripsi tag"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Warna
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={tagForm.color}
                      onChange={(e) => setTagForm({ ...tagForm, color: e.target.value })}
                      className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={tagForm.color}
                      onChange={(e) => setTagForm({ ...tagForm, color: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="#3B82F6"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeTagModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingTag ? 'Update' : 'Buat'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
