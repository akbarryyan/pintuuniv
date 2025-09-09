"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import HeaderNavigation from "@/components/HeaderNavigation";
import MobileFriendlyHeader from "@/components/MobileFriendlyHeader";
import BottomNavigation from "@/components/BottomNavigation";
import { ArrowLeft, Heart, MessageCircle, Eye, Calendar, User, School, Pin } from 'lucide-react';

interface Discussion {
  id: number;
  title: string;
  content: string;
  view_count: number;
  reply_count: number;
  like_count: number;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  user_name: string;
  school: string;
  grade: string;
  avatar: string;
  tags: string[];
  tag_colors: string[];
}

interface Reply {
  id: number;
  content: string;
  created_at: string;
  user_name: string;
  school: string;
  grade: string;
  avatar: string;
}

export default function DiscussionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [discussion, setDiscussion] = useState<Discussion | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchDiscussion();
      fetchReplies();
    }
  }, [params.id]);

  const fetchDiscussion = async () => {
    try {
      const response = await fetch(`/api/discussions/${params.id}`);
      const data = await response.json();
      
      if (data.success) {
        setDiscussion(data.data);
        // Increment view count
        await fetch(`/api/discussions/${params.id}/view`, { method: 'POST' });
      } else {
        toast.error('Diskusi tidak ditemukan');
        router.push('/discuss');
      }
    } catch (error) {
      console.error('Error fetching discussion:', error);
      toast.error('Gagal memuat diskusi');
    } finally {
      setLoading(false);
    }
  };

  const fetchReplies = async () => {
    try {
      const response = await fetch(`/api/discussions/${params.id}/replies`);
      const data = await response.json();
      
      if (data.success) {
        setReplies(data.data);
      }
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/discussions/${params.id}/like`, {
        method: 'POST'
      });
      
      if (response.ok) {
        setIsLiked(!isLiked);
        if (discussion) {
          setDiscussion({
            ...discussion,
            like_count: isLiked ? discussion.like_count - 1 : discussion.like_count + 1
          });
        }
        toast.success(isLiked ? 'Tidak disukai' : 'Disukai! ❤️');
      }
    } catch (error) {
      console.error('Error liking discussion:', error);
      toast.error('Gagal menyukai diskusi');
    }
  };

  const handleSubmitReply = async () => {
    if (!replyContent.trim()) {
      toast.error('Balasan tidak boleh kosong');
      return;
    }

    try {
      setSubmittingReply(true);
      const response = await fetch(`/api/discussions/${params.id}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: replyContent })
      });

      if (response.ok) {
        setReplyContent('');
        fetchReplies();
        if (discussion) {
          setDiscussion({
            ...discussion,
            reply_count: discussion.reply_count + 1
          });
        }
        toast.success('Balasan berhasil dikirim');
      } else {
        toast.error('Gagal mengirim balasan');
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
      toast.error('Gagal mengirim balasan');
    } finally {
      setSubmittingReply(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
      <div className="min-h-screen bg-gray-50">
        <HeaderNavigation />
        <MobileFriendlyHeader />
        
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 pb-24 sm:pb-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
        
        <BottomNavigation currentPage="discuss" />
      </div>
    );
  }

  if (!discussion) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderNavigation />
        <MobileFriendlyHeader />
        
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 pb-24 sm:pb-8">
          <div className="bg-white border-3 border-slate-800 p-8 text-center shadow-brutal">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="font-black text-lg text-slate-900 mb-2">Diskusi Tidak Ditemukan</h3>
            <p className="text-slate-600 font-bold mb-4">Diskusi yang Anda cari tidak ada atau telah dihapus.</p>
            <button
              onClick={() => router.push('/discuss')}
              className="bg-orange-500 text-white px-6 py-3 font-black text-sm border-3 border-slate-800 hover:bg-orange-600 transition-colors shadow-brutal"
            >
              ← Kembali ke Forum
            </button>
          </div>
        </div>
        
        <BottomNavigation currentPage="discuss" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNavigation />
      <MobileFriendlyHeader />
      
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 pb-24 sm:pb-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>

        {/* Discussion Header */}
        <div className="bg-white border-3 border-slate-800 p-4 sm:p-6 shadow-brutal mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3 flex-1">
              <div className="w-12 h-12 bg-gray-200 border-2 border-slate-800 flex items-center justify-center font-black text-lg">
                {discussion.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h1 className="font-black text-lg sm:text-xl text-slate-900">{discussion.title}</h1>
                  {discussion.is_pinned && (
                    <span className="bg-red-500 text-white px-2 py-1 font-black text-xs border border-slate-800 flex items-center gap-1">
                      <Pin className="w-3 h-3" />
                      PINNED
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm font-bold text-slate-600">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {discussion.user_name}
                  </span>
                  <span className="flex items-center gap-1">
                    <School className="w-4 h-4" />
                    {discussion.school} • Kelas {discussion.grade}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(discussion.created_at)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {discussion.tags.map((tag, index) => (
              <span
                key={index}
                className={`px-3 py-1 border border-slate-800 font-bold text-sm ${getTagColor(index)}`}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Discussion Content */}
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 font-medium leading-relaxed whitespace-pre-wrap">
              {discussion.content}
            </p>
          </div>

          {/* Discussion Stats and Actions */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t-2 border-slate-200">
            <div className="flex items-center space-x-6 text-sm font-bold text-slate-600">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {discussion.view_count} views
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                {discussion.reply_count} balasan
              </span>
            </div>
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 border-2 border-slate-800 font-black text-sm transition-colors ${
                isLiked ? "bg-red-500 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              {discussion.like_count}
            </button>
          </div>
        </div>

        {/* Reply Form */}
        <div className="bg-white border-3 border-slate-800 p-4 sm:p-6 shadow-brutal mb-6">
          <h3 className="font-black text-lg text-slate-900 mb-4">💬 Tulis Balasan</h3>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Tulis balasan Anda di sini..."
            className="w-full h-24 px-3 py-2 border-2 border-slate-800 font-bold text-sm focus:outline-none focus:border-orange-400 resize-none"
          />
          <div className="flex justify-end mt-3">
            <button
              onClick={handleSubmitReply}
              disabled={submittingReply || !replyContent.trim()}
              className="bg-blue-500 text-white px-6 py-2 font-black text-sm border-2 border-slate-800 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {submittingReply ? 'Mengirim...' : 'Kirim Balasan'}
            </button>
          </div>
        </div>

        {/* Replies */}
        <div className="space-y-4">
          <h3 className="font-black text-lg text-slate-900">
            💬 Balasan ({replies.length})
          </h3>
          
          {replies.length === 0 ? (
            <div className="bg-white border-3 border-slate-800 p-6 text-center shadow-brutal">
              <div className="text-4xl mb-2">💭</div>
              <p className="text-slate-600 font-bold">Belum ada balasan. Jadilah yang pertama membalas!</p>
            </div>
          ) : (
            replies.map((reply) => (
              <div key={reply.id} className="bg-white border-3 border-slate-800 p-4 sm:p-6 shadow-brutal">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gray-200 border-2 border-slate-800 flex items-center justify-center font-black text-sm">
                    {reply.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <p className="font-black text-sm text-slate-900">{reply.user_name}</p>
                      <span className="text-xs font-bold text-slate-600">
                        {reply.school} • Kelas {reply.grade}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        {formatDate(reply.created_at)}
                      </span>
                    </div>
                    <p className="text-slate-700 font-medium leading-relaxed whitespace-pre-wrap">
                      {reply.content}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNavigation currentPage="discuss" />
    </div>
  );
}
