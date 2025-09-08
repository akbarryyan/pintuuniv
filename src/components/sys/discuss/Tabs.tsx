'use client';

import { MessageSquare, Tag } from 'lucide-react';

interface TabsProps {
  activeTab: 'discussions' | 'tags';
  setActiveTab: (tab: 'discussions' | 'tags') => void;
  discussionCount: number;
  tagCount: number;
}

export default function Tabs({ activeTab, setActiveTab, discussionCount, tagCount }: TabsProps) {
  return (
    <div className="mb-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('discussions')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'discussions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Discussions
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              {discussionCount}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('tags')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'tags'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Tag className="w-4 h-4" />
            Tags
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              {tagCount}
            </span>
          </button>
        </nav>
      </div>
    </div>
  );
}
