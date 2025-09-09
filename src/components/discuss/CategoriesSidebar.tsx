"use client";

import { useState, useEffect } from 'react';

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  postCount: number;
}

interface CategoriesSidebarProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function CategoriesSidebar({
  selectedCategory,
  onSelectCategory,
}: CategoriesSidebarProps) {
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    activeMembers: 0,
    todayDiscussions: 0
  });

  useEffect(() => {
    fetchCategories();
    fetchStats();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/discussions/tags?includeStats=true');
      const data = await response.json();
      
      if (data.success) {
        // Add "All" category
        const allCategory: ForumCategory = {
          id: 'all',
          name: 'Semua',
          description: 'Semua diskusi',
          icon: '📋',
          color: 'bg-slate-600',
          postCount: data.data.tags.reduce((sum: number, tag: any) => sum + tag.postCount, 0)
        };
        
        setCategories([allCategory, ...data.data.tags]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/discussions?limit=1');
      const data = await response.json();
      
      if (data.success) {
        setStats({
          totalPosts: data.data.pagination.total,
          activeMembers: Math.floor(data.data.pagination.total * 0.6), // Estimate
          todayDiscussions: Math.floor(data.data.pagination.total * 0.02) // Estimate
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };
  if (loading) {
    return (
      <div className="lg:col-span-1">
        <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 shadow-brutal mb-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-1">
      <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 shadow-brutal mb-6">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase mb-4">
          📂 Kategori
        </h2>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`w-full text-left p-3 border-2 border-slate-800 transition-all duration-200 ${
                selectedCategory === category.id
                  ? `${category.color} text-white shadow-brutal transform -translate-y-1`
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{category.icon}</span>
                  <div>
                    <p className="font-black text-sm">{category.name}</p>
                    <p
                      className={`text-xs font-bold ${
                        selectedCategory === category.id
                          ? "text-white opacity-90"
                          : "text-slate-600"
                      }`}
                    >
                      {category.postCount} post
                    </p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Forum Stats */}
      <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 shadow-brutal">
        <h3 className="text-lg font-black text-slate-900 uppercase mb-4">
          📊 Statistik Forum
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-slate-600">Total Post</span>
            <span className="font-black text-slate-900">{stats.totalPosts.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-slate-600">Member Aktif</span>
            <span className="font-black text-slate-900">{stats.activeMembers.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-slate-600">Diskusi Hari Ini</span>
            <span className="font-black text-slate-900">{stats.todayDiscussions.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}


