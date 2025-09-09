"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ForumPost {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    school: string;
    grade: string;
  };
  category: string;
  tags: string[];
  tagColors: string[];
  replies: number;
  likes: number;
  views: number;
  isLiked: boolean;
  isPinned: boolean;
  createdAt: string;
  lastReply: string;
}

type SortBy = "latest" | "popular" | "replies";

interface MainContentProps {
  selectedCategory: string;
  searchQuery: string;
  sortBy: SortBy;
  onSearchQueryChange: (value: string) => void;
  onSortByChange: (value: SortBy) => void;
  onLike: (postId: number) => void;
}

export default function MainContent({
  selectedCategory,
  searchQuery,
  sortBy,
  onSearchQueryChange,
  onSortByChange,
  onLike,
}: MainContentProps) {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0
  });
  const router = useRouter();

  useEffect(() => {
    fetchDiscussions();
  }, [selectedCategory, searchQuery, sortBy]);

  const fetchDiscussions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: '1',
        limit: '10',
        sortBy: sortBy
      });

      if (searchQuery) {
        params.append('search', searchQuery);
      }

      if (selectedCategory && selectedCategory !== 'all') {
        params.append('tagId', selectedCategory);
      }

      const response = await fetch(`/api/discussions?${params}`);
      const data = await response.json();

      if (data.success) {
        setPosts(data.data.discussions);
        setPagination({
          page: data.data.pagination.page,
          totalPages: data.data.pagination.totalPages,
          total: data.data.pagination.total
        });
      }
    } catch (error) {
      console.error('Error fetching discussions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (postId: number) => {
    router.push(`/discuss/${postId}`);
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
      <div className="lg:col-span-3">
        <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 shadow-brutal mb-6">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-3">
      {/* Search and Filter Bar */}
      <div className="bg-white border-3 sm:border-4 border-slate-800 p-4 shadow-brutal mb-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Cari diskusi, topik, atau tag..."
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              className="w-full px-3 py-2 border-2 border-slate-800 font-bold text-sm focus:outline-none focus:border-orange-400"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as SortBy)}
            className="px-3 py-2 border-2 border-slate-800 font-bold text-sm focus:outline-none focus:border-orange-400"
          >
            <option value="latest">Terbaru</option>
            <option value="popular">Terpopuler</option>
            <option value="replies">Banyak Balasan</option>
          </select>
        </div>
      </div>

      {/* Forum Posts */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="bg-white border-3 border-slate-800 p-8 text-center shadow-brutal">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="font-black text-lg text-slate-900 mb-2">Belum Ada Diskusi</h3>
            <p className="text-slate-600 font-bold">
              {searchQuery ? 'Tidak ada diskusi yang sesuai dengan pencarian Anda' : 'Jadilah yang pertama memulai diskusi!'}
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              onClick={() => handlePostClick(post.id)}
              className="bg-white border-3 border-slate-800 p-4 sm:p-6 shadow-brutal hover:shadow-xl transition-all duration-200 cursor-pointer"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 border-2 border-slate-800 flex items-center justify-center font-black text-lg">
                    {post.author.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-black text-sm text-slate-900">{post.author.name}</p>
                      {post.isPinned && (
                        <span className="bg-red-500 text-white px-2 py-1 font-black text-xs border border-slate-800">
                          📌 PINNED
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-slate-600">
                      {post.author.school} • Kelas {post.author.grade} • {post.createdAt}
                    </p>
                  </div>
                </div>
                <div className="px-2 py-1 border-2 border-slate-800 font-black text-xs bg-slate-600 text-white">
                  💬 Diskusi
                </div>
              </div>

              {/* Post Title and Content */}
              <h3 className="font-black text-base sm:text-lg text-slate-900 mb-2 leading-tight hover:text-purple-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-slate-700 font-medium mb-3 line-clamp-2">{post.content}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 border border-slate-800 font-bold text-xs hover:bg-gray-200 transition-colors ${getTagColor(index)}`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Post Stats and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs font-bold text-slate-600">
                  <span>👁️ {post.views} views</span>
                  <span>💬 {post.replies} replies</span>
                  <span>📅 {post.lastReply}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onLike(post.id);
                    }}
                    className={`px-3 py-1 border-2 border-slate-800 font-black text-xs transition-colors ${
                      post.isLiked ? "bg-red-500 text-white" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    ❤️ {post.likes}
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePostClick(post.id);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 border-2 border-slate-800 font-black text-xs hover:bg-blue-600 transition-colors"
                  >
                    💬 Lihat
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More Button */}
      {pagination.totalPages > 1 && (
        <div className="text-center mt-8">
          <button className="bg-orange-500 text-white px-6 py-3 font-black text-sm border-3 border-slate-800 hover:bg-orange-600 transition-colors shadow-brutal">
            📄 Muat Lebih Banyak ({pagination.total} diskusi)
          </button>
        </div>
      )}
    </div>
  );
}


