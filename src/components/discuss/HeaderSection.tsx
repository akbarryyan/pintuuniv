"use client";

interface DiscussHeaderSectionProps {
  onCreatePost?: () => void;
}

export default function DiscussHeaderSection({
  onCreatePost,
}: DiscussHeaderSectionProps) {
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
            onClick={onCreatePost}
            className="bg-yellow-400 text-slate-900 px-4 py-2 sm:px-6 sm:py-3 font-black text-sm sm:text-base border-3 border-slate-800 hover:bg-yellow-300 transition-colors shadow-brutal"
          >
            ✏️ Buat Post Baru
          </button>
        </div>
      </div>
    </div>
  );
}


