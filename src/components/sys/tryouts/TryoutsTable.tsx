"use client";

import {
  BookOpen,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Users,
  Clock,
  Star,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  Archive,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Loader2,
} from "lucide-react";
import { useState } from "react";

interface Tryout {
  id: number;
  title: string;
  description: string;
  total_categories: number;
  total_questions: number;
  total_weight: number;
  passing_score: number;
  is_active: boolean;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

interface TryoutsTableProps {
  tryouts: Tryout[];
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSort: (field: string) => void;
  onOpenModal: (type: string, tryout?: Tryout) => void;
  totalTryouts?: number;
  currentPage?: number;
  totalPages?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (items: number) => void;
}

export default function TryoutsTable({
  tryouts,
  sortBy,
  sortOrder,
  onSort,
  onOpenModal,
  totalTryouts = 0,
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
}: TryoutsTableProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [fadeClass, setFadeClass] = useState("opacity-100");

  // Handle page change with loading animation
  const handlePageChange = async (page: number) => {
    if (page === currentPage || isLoading || !onPageChange) return;

    setIsLoading(true);
    setFadeClass("opacity-50");

    // Simulate API call delay for smooth animation
    await new Promise((resolve) => setTimeout(resolve, 300));

    onPageChange(page);

    // Reset loading state after content updates
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
  const getStatusColor = (status: boolean) => {
    switch (status) {
      case true:
        return "text-emerald-700 bg-emerald-50 border-emerald-200";
      case false:
        return "text-slate-700 bg-slate-50 border-slate-200";
      default:
        return "text-slate-700 bg-slate-50 border-slate-200";
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 500) {
      return "text-emerald-700 bg-emerald-50 border-emerald-200";
    } else if (difficulty <= 600) {
      return "text-blue-700 bg-blue-50 border-blue-200";
    } else {
      return "text-amber-700 bg-amber-50 border-amber-200";
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
              Memuat data tryout...
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
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Data Tryout
                </h3>
                <p className="text-sm text-slate-500">
                  Kelola semua tryout yang tersedia
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-sm text-slate-600 bg-slate-100 px-3 py-2 rounded-lg">
              <span className="font-medium">{tryouts.length}</span> tryout
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
                  onClick={() => onSort("price")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    sortBy === "price"
                      ? "bg-purple-100 text-purple-700 border border-purple-200 shadow-sm"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-transparent hover:border-slate-200"
                  }`}
                >
                  <span className="text-sm font-medium">Harga</span>
                  {sortBy === "price" &&
                    (sortOrder === "asc" ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </button>

                <button
                  onClick={() => onSort("participants")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    sortBy === "participants"
                      ? "bg-purple-100 text-purple-700 border border-purple-200 shadow-sm"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-transparent hover:border-slate-200"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">Peserta</span>
                  {sortBy === "participants" &&
                    (sortOrder === "asc" ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </button>

                <button
                  onClick={() => onSort("createdAt")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    sortBy === "createdAt"
                      ? "bg-purple-100 text-purple-700 border border-purple-200 shadow-sm"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-transparent hover:border-slate-200"
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Tanggal</span>
                  {sortBy === "createdAt" &&
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
          {tryouts.map((tryout) => (
            <div
              key={tryout.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-slate-300 transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 text-lg leading-tight mb-1">
                      {tryout.title}
                    </h3>
                    <p className="text-sm text-slate-500">ID: {tryout.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 ml-3">
                  <button
                    onClick={() => onOpenModal("view", tryout)}
                    className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-300"
                    title="Lihat Detail"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenModal("edit", tryout)}
                    className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all duration-300"
                    title="Edit Tryout"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenModal("delete", tryout)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300"
                    title="Hapus Tryout"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Badges Row */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    tryout.is_active
                  )}`}
                >
                  {tryout.is_active ? (
                    <>
                      <Play className="w-3 h-3 mr-1" />
                      Active
                    </>
                  ) : (
                    <>
                      <Pause className="w-3 h-3 mr-1" />
                      Inactive
                    </>
                  )}
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                    tryout.passing_score
                  )}`}
                >
                  {tryout.passing_score <= 500 ? "Mudah" : 
                   tryout.passing_score <= 600 ? "Sedang" : "Sulit"}
                </span>
              </div>

              {/* Stats Section */}
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1 font-medium">
                      Kategori
                    </p>
                    <p className="text-xl font-bold text-slate-900">
                      {tryout.total_categories}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600 mb-1 font-medium">
                      Soal
                    </p>
                    <div className="flex items-center justify-end space-x-2">
                      <Star className="w-4 h-4 text-slate-400" />
                      <span className="text-lg font-bold text-slate-900">
                        {tryout.total_questions}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Period Section */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-50 rounded-xl p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                      Mulai
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {tryout.start_date}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                      Berakhir
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {tryout.end_date}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="text-xs text-slate-500">
                  <span className="font-medium">Passing Score:</span>{" "}
                  {tryout.passing_score}
                </div>
                <div className="text-xs text-slate-500">
                  <span className="font-medium">Total Bobot:</span>{" "}
                  {tryout.total_weight}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Cards - Visible on Mobile */}
        <div className="lg:hidden space-y-4">
          {tryouts.map((tryout) => (
            <div
              key={tryout.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 text-lg leading-tight mb-1">
                      {tryout.title}
                    </h3>
                    <p className="text-sm text-slate-500">ID: {tryout.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-3">
                  <button
                    onClick={() => onOpenModal("view", tryout)}
                    className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-300"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenModal("edit", tryout)}
                    className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all duration-300"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenModal("delete", tryout)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Badges Row */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    tryout.is_active
                  )}`}
                >
                  {tryout.is_active ? (
                    <>
                      <Play className="w-3 h-3 mr-1" />
                      Active
                    </>
                  ) : (
                    <>
                      <Pause className="w-3 h-3 mr-1" />
                      Inactive
                    </>
                  )}
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                    tryout.passing_score
                  )}`}
                >
                  {tryout.passing_score <= 500 ? "Mudah" : 
                   tryout.passing_score <= 600 ? "Sedang" : "Sulit"}
                </span>
              </div>

              {/* Stats Section */}
              <div className="bg-slate-50 rounded-xl p-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1 font-medium">
                      Kategori
                    </p>
                    <p className="text-xl font-bold text-slate-900">
                      {tryout.total_categories}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600 mb-1 font-medium">
                      Soal
                    </p>
                    <div className="flex items-center justify-end space-x-2">
                      <Star className="w-4 h-4 text-slate-400" />
                      <span className="text-lg font-bold text-slate-900">
                        {tryout.total_questions}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Period Section */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-50 rounded-xl p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-medium text-slate-600 uppercase">
                      Mulai
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {tryout.start_date}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-medium text-slate-600 uppercase">
                      Berakhir
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {tryout.end_date}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="text-xs text-slate-500">
                  Dibuat: {tryout.created_at}
                </div>
                <div className="text-xs text-slate-500">
                  Update: {tryout.updated_at}
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
                dari {totalTryouts} tryout
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
              {Math.min(currentPage * itemsPerPage, totalTryouts)} dari{" "}
              {totalTryouts} tryout
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
