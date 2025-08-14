"use client";

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
  replies: number;
  likes: number;
  views: number;
  isLiked: boolean;
  isPinned: boolean;
  createdAt: string;
  lastReply: string;
}

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

type SortBy = "latest" | "popular" | "replies";

interface MainContentProps {
  categories: ForumCategory[];
  posts: ForumPost[];
  selectedCategory: string;
  searchQuery: string;
  sortBy: SortBy;
  onSearchQueryChange: (value: string) => void;
  onSortByChange: (value: SortBy) => void;
  onLike: (postId: number) => void;
}

export default function MainContent({
  categories,
  posts,
  selectedCategory,
  searchQuery,
  sortBy,
  onSearchQueryChange,
  onSortByChange,
  onLike,
}: MainContentProps) {
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    switch (sortBy) {
      case "latest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "popular":
        return b.likes - a.likes;
      case "replies":
        return b.replies - a.replies;
      default:
        return 0;
    }
  });

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
        {sortedPosts.map((post) => (
          <div
            key={post.id}
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
              <div
                className={`px-2 py-1 border-2 border-slate-800 font-black text-xs ${
                  categories.find((c) => c.id === post.category)?.color || "bg-gray-400"
                } text-white`}
              >
                {categories.find((c) => c.id === post.category)?.icon}{" "}
                {categories.find((c) => c.id === post.category)?.name}
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
                  className="bg-gray-100 text-slate-700 px-2 py-1 border border-slate-800 font-bold text-xs hover:bg-gray-200 transition-colors"
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
                  onClick={() => onLike(post.id)}
                  className={`px-3 py-1 border-2 border-slate-800 font-black text-xs transition-colors ${
                    post.isLiked ? "bg-red-500 text-white" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  ❤️ {post.likes}
                </button>
                <button className="bg-blue-500 text-white px-3 py-1 border-2 border-slate-800 font-black text-xs hover:bg-blue-600 transition-colors">
                  💬 Balas
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-8">
        <button className="bg-orange-500 text-white px-6 py-3 font-black text-sm border-3 border-slate-800 hover:bg-orange-600 transition-colors shadow-brutal">
          📄 Muat Lebih Banyak
        </button>
      </div>
    </div>
  );
}


