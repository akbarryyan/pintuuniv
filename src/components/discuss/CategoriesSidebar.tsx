"use client";

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  postCount: number;
}

interface CategoriesSidebarProps {
  categories: ForumCategory[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function CategoriesSidebar({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoriesSidebarProps) {
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
            <span className="font-black text-slate-900">2,847</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-slate-600">Member Aktif</span>
            <span className="font-black text-slate-900">1,523</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-slate-600">Diskusi Hari Ini</span>
            <span className="font-black text-slate-900">47</span>
          </div>
        </div>
      </div>
    </div>
  );
}


