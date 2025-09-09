"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DiscussHeaderSectionProps {
  onCreatePost?: () => void;
}

export default function DiscussHeaderSection({
  onCreatePost,
}: DiscussHeaderSectionProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePost = async () => {
    if (onCreatePost) {
      onCreatePost();
    } else {
      setIsLoading(true);
      // Simulate loading delay
      setTimeout(() => {
        router.push('/discuss/create');
        setIsLoading(false);
      }, 500);
    }
  };
  return (
    <div className="mb-6 sm:mb-8">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 sm:p-6 md:p-8 border-3 sm:border-4 border-slate-800 shadow-brutal">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-3 uppercase leading-tight">
              💬 Forum Diskusi
            </h1>
            <p className="text-sm sm:text-base font-bold opacity-90">
              Berbagi pengetahuan, diskusi soal, dan saling membantu sesama
              pejuang UTBK!
            </p>
          </div>
          <button
            onClick={handleCreatePost}
            disabled={isLoading}
            className="bg-yellow-400 text-slate-900 px-4 py-2 sm:px-6 sm:py-3 font-black text-sm sm:text-base border-3 border-slate-800 hover:bg-yellow-300 disabled:bg-yellow-200 disabled:cursor-not-allowed transition-colors shadow-brutal flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </>
            ) : (
              '✏️ Buat Post Baru'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}


