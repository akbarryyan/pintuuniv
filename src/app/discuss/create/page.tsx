"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import MobileFriendlyHeader from "@/components/MobileFriendlyHeader";
import BottomNavigation from "@/components/BottomNavigation";
import { ArrowLeft, Send, Tag, X } from 'lucide-react';

interface Tag {
  id: string;
  name: string;
  color: string;
}

export default function CreateDiscussionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/discussions/tags');
      const data = await response.json();
      
      if (data.success) {
        setAvailableTags(data.data.tags);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tagId)) {
        return prev.filter(id => id !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Judul diskusi tidak boleh kosong');
      return;
    }
    
    if (!formData.content.trim()) {
      toast.error('Konten diskusi tidak boleh kosong');
      return;
    }

    try {
      setSubmitting(true);
      
      // Get auth token from localStorage
      const authToken = localStorage.getItem('authToken');
      
      const response = await fetch('/api/discussions', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          content: formData.content.trim(),
          tagIds: selectedTags
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Diskusi berhasil dibuat! 🎉');
        router.push(`/discuss/${data.data.id}`);
      } else {
        toast.error(data.error || 'Gagal membuat diskusi');
      }
    } catch (error) {
      console.error('Error creating discussion:', error);
      toast.error('Gagal membuat diskusi');
    } finally {
      setSubmitting(false);
    }
  };

  const getTagColor = (color: string) => {
    if (color && color.startsWith('bg-')) {
      return color;
    }
    
    const colorMap: { [key: string]: string } = {
      'blue': 'bg-blue-100 text-blue-800',
      'green': 'bg-green-100 text-green-800',
      'purple': 'bg-purple-100 text-purple-800',
      'orange': 'bg-orange-100 text-orange-800',
      'pink': 'bg-pink-100 text-pink-800',
      'red': 'bg-red-100 text-red-800',
      'yellow': 'bg-yellow-100 text-yellow-800',
      'indigo': 'bg-indigo-100 text-indigo-800',
      'teal': 'bg-teal-100 text-teal-800',
      'cyan': 'bg-cyan-100 text-cyan-800',
      'emerald': 'bg-emerald-100 text-emerald-800',
      'lime': 'bg-lime-100 text-lime-800',
      'amber': 'bg-amber-100 text-amber-800',
      'rose': 'bg-rose-100 text-rose-800',
      'violet': 'bg-violet-100 text-violet-800',
      'fuchsia': 'bg-fuchsia-100 text-fuchsia-800',
      'sky': 'bg-sky-100 text-sky-800',
      'slate': 'bg-slate-100 text-slate-800'
    };
    
    const lowerColor = color?.toLowerCase() || '';
    
    for (const [key, value] of Object.entries(colorMap)) {
      if (lowerColor.includes(key) || key.includes(lowerColor)) {
        return value;
      }
    }
    
    return 'bg-slate-100 text-slate-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MobileFriendlyHeader />
        
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 pb-24 sm:pb-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        
        <BottomNavigation currentPage="discuss" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileFriendlyHeader />
      
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 pb-24 sm:pb-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Forum
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6 border-3 border-slate-800 shadow-brutal mb-6">
          <h1 className="text-2xl sm:text-3xl font-black mb-2 uppercase">
            ✏️ Buat Diskusi Baru
          </h1>
          <p className="text-sm sm:text-base font-bold opacity-90">
            Bagikan pertanyaan, tips, atau pengalaman Anda dengan sesama pejuang UTBK!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div className="bg-white border-3 border-slate-800 p-4 sm:p-6 shadow-brutal">
            <label className="block text-sm font-black text-slate-900 mb-2">
              📝 Judul Diskusi *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Masukkan judul diskusi yang menarik..."
              className="w-full px-3 py-2 border-2 border-slate-800 font-bold text-sm focus:outline-none focus:border-orange-400"
              maxLength={200}
              required
            />
            <p className="text-xs text-slate-500 font-bold mt-1">
              {formData.title.length}/200 karakter
            </p>
          </div>

          {/* Content Input */}
          <div className="bg-white border-3 border-slate-800 p-4 sm:p-6 shadow-brutal">
            <label className="block text-sm font-black text-slate-900 mb-2">
              💭 Konten Diskusi *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Tulis konten diskusi Anda di sini... Jangan lupa untuk memberikan detail yang jelas agar mudah dipahami oleh pembaca!"
              className="w-full h-40 px-3 py-2 border-2 border-slate-800 font-bold text-sm focus:outline-none focus:border-orange-400 resize-none"
              maxLength={5000}
              required
            />
            <p className="text-xs text-slate-500 font-bold mt-1">
              {formData.content.length}/5000 karakter
            </p>
          </div>

          {/* Tags Selection */}
          <div className="bg-white border-3 border-slate-800 p-4 sm:p-6 shadow-brutal">
            <label className="block text-sm font-black text-slate-900 mb-3">
              🏷️ Pilih Tag (Opsional)
            </label>
            
            {/* Selected Tags */}
            {selectedTags.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-bold text-slate-600 mb-2">Tag Terpilih:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map(tagId => {
                    const tag = availableTags.find(t => t.id === tagId);
                    return tag ? (
                      <span
                        key={tagId}
                        className={`px-3 py-1 border border-slate-800 font-bold text-xs flex items-center gap-1 ${getTagColor(tag.color)}`}
                      >
                        #{tag.name}
                        <button
                          type="button"
                          onClick={() => handleTagToggle(tagId)}
                          className="hover:bg-black hover:bg-opacity-10 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* Available Tags */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-600">Pilih tag yang relevan:</p>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => handleTagToggle(tag.id)}
                    className={`px-3 py-1 border border-slate-800 font-bold text-xs transition-colors ${
                      selectedTags.includes(tag.id)
                        ? 'bg-slate-600 text-white'
                        : `${getTagColor(tag.color)} hover:bg-slate-100`
                    }`}
                  >
                    #{tag.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 font-black text-sm border-3 border-slate-800 bg-gray-100 hover:bg-gray-200 transition-colors shadow-brutal"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={submitting || !formData.title.trim() || !formData.content.trim()}
              className="px-6 py-3 font-black text-sm border-3 border-slate-800 bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-brutal flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Membuat...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Buat Diskusi
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNavigation currentPage="discuss" />
    </div>
  );
}
