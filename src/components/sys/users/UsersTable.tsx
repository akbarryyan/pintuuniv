"use client";

import {
  Users,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  Calendar,
  MapPin,
  BookOpen,
  Crown,
  UserCheck,
  UserX,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Loader2,
  Star,
} from "lucide-react";
import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  school: string;
  grade: string;
  subscription_type: "free" | "premium";
  target_university: string;
  target_major: string;
  target_score: number | null;
  total_score: number;
  total_attempts: number;
  average_score: number;
  rank_position: number;
  subscription_expires: string | null;
  role: "user" | "admin";
  status: "active" | "inactive" | "suspended";
  last_activity: string | null;
  join_date: string;
  last_active: string;
  tryouts_completed: number;
}

interface UsersTableProps {
  users: User[];
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSort: (field: string) => void;
  onOpenModal: (type: string, user?: User) => void;
  totalUsers?: number;
  currentPage?: number;
  totalPages?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (items: number) => void;
}

export default function UsersTable({
  users,
  sortBy,
  sortOrder,
  onSort,
  onOpenModal,
  totalUsers = 0,
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
}: UsersTableProps) {
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
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-emerald-700 bg-emerald-50 border-emerald-200";
      case "inactive":
        return "text-slate-700 bg-slate-50 border-slate-200";
      case "suspended":
        return "text-red-700 bg-red-50 border-red-200";

      default:
        return "text-slate-700 bg-slate-50 border-slate-200";
    }
  };

  const getSubscriptionColor = (type: string) => {
    switch (type) {
      case "premium":
        return "text-amber-700 bg-amber-50 border-amber-200";
      case "free":
        return "text-slate-700 bg-slate-50 border-slate-200";
      default:
        return "text-slate-700 bg-slate-50 border-slate-200";
    }
  };

  // Format date function
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";
      
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  return (
    <div className="space-y-6">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 flex items-center space-x-4">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-slate-700 font-medium">Memuat data...</span>
          </div>
        </div>
      )}

      {/* Cards Grid - Always Visible */}
      <div className={`transition-all duration-300 ${fadeClass}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
            >
              {/* Header with Avatar and Actions */}
              <div className="relative p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 text-xl leading-tight mb-2">
                        {user.name}
                      </h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <p className="text-sm text-slate-600 truncate">{user.email}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <p className="text-sm text-slate-600">{user.phone}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => onOpenModal("view", user)}
                      className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
                      title="Lihat Detail"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onOpenModal("edit", user)}
                      className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all duration-200 hover:scale-110"
                      title="Edit User"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onOpenModal("delete", user)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110"
                      title="Hapus User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* School and Grade Info */}
                <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 mb-4 border border-slate-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Sekolah</p>
                        <p className="text-sm font-semibold text-slate-900">{user.school}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Kelas</p>
                        <p className="text-sm font-semibold text-slate-900">Kelas {user.grade}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status and Subscription Badges */}
              <div className="px-6 pb-4">
                <div className="flex flex-wrap gap-3 mb-4">
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all duration-200 hover:scale-105 ${getSubscriptionColor(
                      user.subscription_type
                    )}`}
                  >
                    {user.subscription_type === "premium" ? (
                      <>
                        <Crown className="w-4 h-4 mr-2" />
                        Premium
                      </>
                    ) : (
                      <>
                        <Users className="w-4 h-4 mr-2" />
                        Free
                      </>
                    )}
                  </span>
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all duration-200 hover:scale-105 ${getStatusColor(
                      user.status
                    )}`}
                  >
                                         {user.status === "active" ? (
                       <>
                         <UserCheck className="w-4 h-4 mr-2" />
                         Active
                       </>
                     ) : user.status === "inactive" ? (
                       <>
                         <UserX className="w-4 h-4 mr-2" />
                         Inactive
                       </>
                     ) : (
                       <>
                         <UserX className="w-4 h-4 mr-2" />
                         Suspended
                       </>
                     )}
                  </span>
                </div>
              </div>

              {/* Stats Section */}
              <div className="px-6 pb-4">
                <div className="bg-gradient-to-r from-slate-50 to-indigo-50 rounded-2xl p-4 border border-slate-100">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center group">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-200 transition-colors duration-200">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      </div>
                      <p className="text-xl font-bold text-blue-600 mb-1">
                        {user.tryouts_completed}
                      </p>
                      <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">Tryouts</p>
                    </div>
                    <div className="text-center group">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-emerald-200 transition-colors duration-200">
                        <Star className="w-5 h-5 text-emerald-600" />
                      </div>
                      <p className="text-xl font-bold text-emerald-600 mb-1">
                        {user.total_score}
                      </p>
                      <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">Score</p>
                    </div>
                    <div className="text-center group">
                      <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-amber-200 transition-colors duration-200">
                        <Users className="w-5 h-5 text-amber-600" />
                      </div>
                      <p className="text-xl font-bold text-amber-600 mb-1">
                        {user.average_score}
                      </p>
                      <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">Average</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Target Info */}
              <div className="px-6 pb-4">
                <div className="grid grid-cols-1 gap-3 mb-4">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-xs font-bold text-purple-600 uppercase tracking-wide">
                        Target University
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      {user.target_university || "Belum ditentukan"}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-indigo-600" />
                      </div>
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
                        Target Major
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      {user.target_major || "Belum ditentukan"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer with Dates */}
              <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-gray-50 border-t border-slate-200">
                <div className="flex items-center justify-between">
                                     <div className="flex items-center space-x-2">
                     <Calendar className="w-4 h-4 text-slate-400" />
                     <div className="text-xs">
                       <p className="font-medium text-slate-600">Bergabung</p>
                       <p className="text-slate-500">{formatDate(user.join_date)}</p>
                     </div>
                   </div>
                   <div className="flex items-center space-x-2">
                     <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                     <div className="text-xs">
                       <p className="font-medium text-slate-600">Last Active</p>
                       <p className="text-slate-500">{formatDate(user.last_active)}</p>
                     </div>
                   </div>
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
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                disabled={isLoading}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-slate-600">
                dari {totalUsers} pengguna
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
                              ? "bg-blue-600 text-white shadow-lg"
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
              {Math.min(currentPage * itemsPerPage, totalUsers)} dari{" "}
              {totalUsers} pengguna
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
