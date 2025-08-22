"use client";

import {
  FileText,
  Edit,
  Trash2,
  Eye,
  Folder,
  Target,
  Activity,
  Calendar,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Loader2,
  Star,
  Clock,
} from "lucide-react";
import { useState } from "react";

interface Question {
  id: number;
  title: string;
  content: string;
  categoryId: number;
  categoryName: string;
  tryoutTitle: string;
  type: "Pilihan Ganda" | "Essay" | "Benar/Salah";
  difficulty: "Mudah" | "Sedang" | "Sulit" | "Sangat Sulit";
  points: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface QuestionsTableProps {
  questions: Question[];
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSort: (field: string) => void;
  onOpenModal: (type: string, question?: Question) => void;
  totalQuestions?: number;
  currentPage?: number;
  totalPages?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (items: number) => void;
}

export default function QuestionsTable({
  questions,
  sortBy,
  sortOrder,
  onSort,
  onOpenModal,
  totalQuestions = 0,
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
}: QuestionsTableProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [fadeClass, setFadeClass] = useState("opacity-100");

  // Handle page change with loading animation
  const handlePageChange = async (page: number) => {
    if (page === currentPage || isLoading || !onPageChange) return;

    setIsLoading(true);
    setFadeClass("opacity-50");

    await new Promise((resolve) => setTimeout(resolve, 300));

    onPageChange(page);

    setTimeout(() => {
      setFadeClass("opacity-100");
      setIsLoading(false);
    }, 100);
  };

  // Handle items per page change
  const handleItemsPerPageChange = async (items: number) => {
    if (items === itemsPerPage || isLoading || !onItemsPerPageChange) return;

    setIsLoading(true);
    setFadeClass("opacity-50");

    await new Promise((resolve) => setTimeout(resolve, 300));

    onItemsPerPageChange(items);

    setTimeout(() => {
      setFadeClass("opacity-100");
      setIsLoading(false);
    }, 100);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : "text-slate-700 bg-slate-50 border-slate-200";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Mudah":
        return "text-emerald-700 bg-emerald-50 border-emerald-200";
      case "Sedang":
        return "text-blue-700 bg-blue-50 border-blue-200";
      case "Sulit":
        return "text-amber-700 bg-amber-50 border-amber-200";
      case "Sangat Sulit":
        return "text-red-700 bg-red-50 border-red-200";
      default:
        return "text-slate-700 bg-slate-50 border-slate-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Pilihan Ganda":
        return "text-purple-700 bg-purple-50 border-purple-200";
      case "Essay":
        return "text-indigo-700 bg-indigo-50 border-indigo-200";
      case "Benar/Salah":
        return "text-cyan-700 bg-cyan-50 border-cyan-200";
      default:
        return "text-slate-700 bg-slate-50 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 flex items-center space-x-4">
            <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
            <span className="text-slate-700 font-medium">
              Memuat data soal...
            </span>
          </div>
        </div>
      )}

      {/* Table Content with Fade Animation */}
      <div className={`transition-all duration-300 ${fadeClass}`}>
        {/* Sort Controls - Desktop */}
        <div className="hidden lg:flex items-center justify-between mb-6 bg-gradient-to-r from-white to-slate-50 rounded-2xl shadow-lg border border-slate-200 p-6 backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Data Soal
                </h3>
                <p className="text-sm text-slate-500">
                  Kelola soal tryout
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-sm text-slate-600 bg-slate-100 px-3 py-2 rounded-lg">
              <span className="font-medium">{questions.length}</span> soal
              ditampilkan
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-slate-700">
                Urutkan:
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onSort("title")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    sortBy === "title"
                      ? "bg-purple-100 text-purple-700 border border-purple-200 shadow-sm"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-transparent hover:border-slate-200"
                  }`}
                >
                  <span className="text-sm font-medium">Judul</span>
                  {sortBy === "title" &&
                    (sortOrder === "asc" ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </button>

                <button
                  onClick={() => onSort("points")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    sortBy === "points"
                      ? "bg-purple-100 text-purple-700 border border-purple-200 shadow-sm"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-transparent hover:border-slate-200"
                  }`}
                >
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-medium">Poin</span>
                  {sortBy === "points" &&
                    (sortOrder === "asc" ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Cards Grid */}
        <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {questions.map((question) => (
            <div
              key={question.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-slate-300 transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <FileText className="w-7 h-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 text-lg leading-tight mb-1">
                      {question.title}
                    </h3>
                    <p className="text-sm text-slate-500">ID: {question.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 ml-3">
                  <button
                    onClick={() => onOpenModal("view", question)}
                    className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-300"
                    title="Lihat Detail"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenModal("edit", question)}
                    className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all duration-300"
                    title="Edit Soal"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenModal("delete", question)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300"
                    title="Hapus Soal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Badges Row */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(
                    question.type
                  )}`}
                >
                  <FileText className="w-3 h-3 mr-1" />
                  {question.type}
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                    question.difficulty
                  )}`}
                >
                  <Target className="w-3 h-3 mr-1" />
                  {question.difficulty}
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    question.isActive
                  )}`}
                >
                  <Activity className="w-3 h-3 mr-1" />
                  {question.isActive ? "Aktif" : "Tidak Aktif"}
                </span>
              </div>

              {/* Content Preview */}
              <div className="mb-4">
                <p className="text-sm text-slate-600 line-clamp-3">
                  {question.content}
                </p>
              </div>

              {/* Category Info */}
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Folder className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-slate-700">
                    Kategori
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-900 mb-1">
                  {question.categoryName}
                </p>
                <p className="text-xs text-slate-500">
                  {question.tryoutTitle}
                </p>
              </div>

              {/* Points Info */}
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-slate-700">
                    Poin
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  {question.points} poin
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="text-xs text-slate-500">
                  <span className="font-medium">Dibuat:</span>{" "}
                  {question.createdAt}
                </div>
                <div className="text-xs text-slate-500">
                  <span className="font-medium">Update:</span>{" "}
                  {question.updatedAt}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Cards - Visible on Mobile */}
        <div className="lg:hidden space-y-4">
          {questions.map((question) => (
            <div
              key={question.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 text-lg leading-tight mb-1">
                      {question.title}
                    </h3>
                    <p className="text-sm text-slate-500">ID: {question.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-3">
                  <button
                    onClick={() => onOpenModal("view", question)}
                    className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-300"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenModal("edit", question)}
                    className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all duration-300"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenModal("delete", question)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Badges Row */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(
                    question.type
                  )}`}
                >
                  <FileText className="w-3 h-3 mr-1" />
                  {question.type}
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                    question.difficulty
                  )}`}
                >
                  <Target className="w-3 h-3 mr-1" />
                  {question.difficulty}
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    question.isActive
                  )}`}
                >
                  <Activity className="w-3 h-3 mr-1" />
                  {question.isActive ? "Aktif" : "Tidak Aktif"}
                </span>
              </div>

              {/* Content Preview */}
              <div className="mb-4">
                <p className="text-sm text-slate-600 line-clamp-3">
                  {question.content}
                </p>
              </div>

              {/* Category Info */}
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Folder className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-slate-700">
                    Kategori
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-900 mb-1">
                  {question.categoryName}
                </p>
                <p className="text-xs text-slate-500">
                  {question.tryoutTitle}
                </p>
              </div>

              {/* Points Info */}
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-slate-700">
                    Poin
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  {question.points} poin
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="text-xs text-slate-500">
                  <span className="font-medium">Dibuat:</span>{" "}
                  {question.createdAt}
                </div>
                <div className="text-xs text-slate-500">
                  <span className="font-medium">Update:</span>{" "}
                  {question.updatedAt}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && onPageChange && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Items per page selector */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-slate-600 font-medium">
                Tampilkan:
              </span>
              <select
                value={itemsPerPage}
                onChange={(e) =>
                  handleItemsPerPageChange(Number(e.target.value))
                }
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                disabled={isLoading}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-slate-600">
                dari {totalQuestions} soal
              </span>
            </div>

            {/* Page info and navigation */}
            <div className="flex items-center space-x-4">
              {/* Page info */}
              <div className="text-sm text-slate-600">
                Halaman {currentPage} dari {totalPages}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center space-x-2">
                {/* Previous button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || isLoading}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Page numbers */}
                <div className="flex items-center space-x-1">
                  {getPageNumbers().map((page, index) => (
                    <div key={index}>
                      {page === "..." ? (
                        <div className="px-3 py-2">
                          <MoreHorizontal className="w-4 h-4 text-slate-400" />
                        </div>
                      ) : (
                        <button
                          onClick={() => handlePageChange(page as number)}
                          disabled={isLoading}
                          className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                            currentPage === page
                              ? "bg-purple-600 text-white shadow-lg"
                              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {page}
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Next button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || isLoading}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile pagination info */}
          <div className="sm:hidden mt-4 pt-4 border-t border-slate-200">
            <div className="text-center text-sm text-slate-600">
              Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
              {Math.min(currentPage * itemsPerPage, totalQuestions)} dari{" "}
              {totalQuestions} soal
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
