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
} from "lucide-react";
import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  school: string;
  grade: string;
  subscriptionType: "free" | "premium";
  targetUniversity: string;
  targetMajor: string;
  joinDate: string;
  lastActive: string;
  status: "active" | "inactive" | "suspended";
  tryoutsCompleted: number;
  totalScore: number;
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

      {/* Table Content with Fade Animation */}
      <div className={`transition-all duration-300 ${fadeClass}`}>
        {/* Desktop Table - Hidden on Mobile */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => onSort("name")}
                      className="flex items-center space-x-1 font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                    >
                      <span>Nama</span>
                      {sortBy === "name" &&
                        (sortOrder === "asc" ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        ))}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Sekolah</th>
                  <th className="px-6 py-4 text-left">Subscription</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Tryouts</th>
                  <th className="px-6 py-4 text-left">Last Active</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">
                            {user.name}
                          </p>
                          <p className="text-sm text-slate-500">{user.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-700">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-700">{user.school}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getSubscriptionColor(
                          user.subscriptionType
                        )}`}
                      >
                        {user.subscriptionType === "premium" ? (
                          <>
                            <Crown className="w-3 h-3 mr-1" />
                            Premium
                          </>
                        ) : (
                          "Free"
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {user.status === "active" ? (
                          <>
                            <UserCheck className="w-3 h-3 mr-1" />
                            Active
                          </>
                        ) : user.status === "inactive" ? (
                          <>
                            <UserX className="w-3 h-3 mr-1" />
                            Inactive
                          </>
                        ) : (
                          "Suspended"
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-700">
                          {user.tryoutsCompleted}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-700">
                          {user.lastActive}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => onOpenModal("view", user)}
                          className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-300"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onOpenModal("edit", user)}
                          className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all duration-300"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onOpenModal("delete", user)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards - Visible on Mobile */}
        <div className="lg:hidden space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 text-lg leading-tight mb-1">
                      {user.name}
                    </h3>
                    <p className="text-sm text-slate-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-3">
                  <button
                    onClick={() => onOpenModal("view", user)}
                    className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-300"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenModal("edit", user)}
                    className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all duration-300"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenModal("delete", user)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-slate-50 rounded-xl p-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-700">{user.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-700">
                      {user.school}
                    </span>
                  </div>
                </div>
              </div>

              {/* Badges Row */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getSubscriptionColor(
                    user.subscriptionType
                  )}`}
                >
                  {user.subscriptionType === "premium" ? (
                    <>
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </>
                  ) : (
                    "Free"
                  )}
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    user.status
                  )}`}
                >
                  {user.status === "active" ? (
                    <>
                      <UserCheck className="w-3 h-3 mr-1" />
                      Active
                    </>
                  ) : user.status === "inactive" ? (
                    <>
                      <UserX className="w-3 h-3 mr-1" />
                      Inactive
                    </>
                  ) : (
                    "Suspended"
                  )}
                </span>
              </div>

              {/* Stats Section */}
              <div className="bg-slate-50 rounded-xl p-4 mb-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-600">
                      {user.tryoutsCompleted}
                    </p>
                    <p className="text-xs text-slate-500">Tryouts</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-emerald-600">
                      {user.totalScore}
                    </p>
                    <p className="text-xs text-slate-500">Score</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-amber-600">
                      {user.grade}
                    </p>
                    <p className="text-xs text-slate-500">Kelas</p>
                  </div>
                </div>
              </div>

              {/* Target Info */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-50 rounded-xl p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-medium text-slate-600 uppercase">
                      Target Univ
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {user.targetUniversity}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-medium text-slate-600 uppercase">
                      Target Major
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {user.targetMajor}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="text-xs text-slate-500">
                  Bergabung: {user.joinDate}
                </div>
                <div className="text-xs text-slate-500">
                  Aktif: {user.lastActive}
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
