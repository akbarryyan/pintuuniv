'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePageTransition } from "@/lib/hooks";
import Sidebar from '@/components/sys/Sidebar';
import TopHeader from '@/components/sys/TopHeader';
import { 
  ActionButtons,
  Tabs,
  SearchAndFilter,
  DiscussionsContent,
  TagsContent
} from '@/components/sys/discuss';
import { toast } from 'sonner';

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
          <ActionButtons onOpenTagModal={() => setShowTagModal(true)} />

          {/* Tabs */}
          <Tabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            discussionCount={discussions.length}
            tagCount={tags.length}
          />

          {/* Search and Filter */}
          {activeTab === 'discussions' && (
            <SearchAndFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterTag={filterTag}
              setFilterTag={setFilterTag}
              tags={tags}
            />
          )}

          {/* Content */}
          {activeTab === 'discussions' ? (
            <DiscussionsContent
              discussions={filteredDiscussions}
              loading={loading}
              onTogglePin={handleTogglePin}
              onDeleteDiscussion={handleDeleteDiscussion}
              formatDate={formatDate}
            />
          ) : (
            <TagsContent
              tags={tags}
              loading={loading}
              onEditTag={openEditTagModal}
              onToggleTagStatus={handleToggleTagStatus}
              onDeleteTag={handleDeleteTag}
              formatDate={formatDate}
            />
          )}
        </main>
      </div>

      {/* Tag Modal */}
      {showTagModal && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl border border-gray-200">
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
