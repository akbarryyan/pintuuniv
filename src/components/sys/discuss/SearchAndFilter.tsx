'use client';

import { Search, Filter } from 'lucide-react';

interface Tag {
  id: number;
  name: string;
  color: string;
  is_active: boolean;
}

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterTag: number | null;
  setFilterTag: (tagId: number | null) => void;
  tags: Tag[];
}

export default function SearchAndFilter({ 
  searchTerm, 
  setSearchTerm, 
  filterTag, 
  setFilterTag, 
  tags 
}: SearchAndFilterProps) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
      {/* Search */}
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari discussions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Filter by Tag */}
      <div className="sm:w-64">
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={filterTag || ''}
            onChange={(e) => setFilterTag(e.target.value ? Number(e.target.value) : null)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="">Semua Tags</option>
            {tags
              .filter(tag => tag.is_active)
              .map(tag => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
}
