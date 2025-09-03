"use client";

import {
  Users,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Loader2,
  Target,
  Activity,
  User,
  BookOpen,
  CreditCard,
} from "lucide-react";
import { useState } from "react";
import { Registration } from "@/lib/services/registrationService";

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface RegistrationsTableProps {
  registrations: Registration[];
  pagination: Pagination;
  onPageChange: (page: number) => void;
  onView: (registration: Registration) => void;
  onApprove: (registration: Registration) => void;
  onReject: (registration: Registration) => void;
  onDelete: (registration: Registration) => void;
}

export default function RegistrationsTable({
  registrations,
  pagination,
  onPageChange,
  onView,
  onApprove,
  onReject,
  onDelete,
}: RegistrationsTableProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [fadeClass, setFadeClass] = useState("opacity-100");

  // Handle page change with loading animation
  const handlePageChange = async (page: number) => {
    if (page === pagination.page || isLoading) return;

    setIsLoading(true);
    setFadeClass("opacity-50");

    await new Promise((resolve) => setTimeout(resolve, 300));

    onPageChange(page);

    setTimeout(() => {
      setFadeClass("opacity-100");
      setIsLoading(false);
    }, 100);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (pagination.totalPages <= maxPagesToShow) {
      for (let i = 1; i <= pagination.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (pagination.page <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(pagination.totalPages);
      } else if (pagination.page >= pagination.totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = pagination.totalPages - 3; i <= pagination.totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = pagination.page - 1; i <= pagination.page + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(pagination.totalPages);
      }
    }

    return pages;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "registered":
        return "text-amber-700 bg-amber-50 border-amber-200";
      case "approved":
        return "text-emerald-700 bg-emerald-50 border-emerald-200";
      case "rejected":
        return "text-red-700 bg-red-50 border-red-200";
      case "cancelled":
        return "text-slate-700 bg-slate-50 border-slate-200";
      default:
        return "text-slate-700 bg-slate-50 border-slate-200";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-700 bg-yellow-50 border-yellow-200";
      case "paid":
        return "text-emerald-700 bg-emerald-50 border-emerald-200";
      case "failed":
        return "text-red-700 bg-red-50 border-red-200";
      case "refunded":
        return "text-blue-700 bg-blue-50 border-blue-200";
      default:
        return "text-slate-700 bg-slate-50 border-slate-200";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Belum ditentukan";
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "registered":
        return "Terdaftar";
      case "approved":
        return "Disetujui";
      case "rejected":
        return "Ditolak";
      case "cancelled":
        return "Dibatalkan";
      default:
        return status;
    }
  };

  const getPaymentStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Menunggu";
      case "paid":
        return "Lunas";
      case "failed":
        return "Gagal";
      case "refunded":
        return "Dikembalikan";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 flex items-center space-x-4">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-slate-700 font-medium">
              Memuat data registrasi...
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
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Data Registrasi
                </h3>
                <p className="text-sm text-slate-500">
                  Kelola registrasi tryout peserta
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-sm text-slate-600 bg-slate-100 px-3 py-2 rounded-lg">
              <span className="font-medium">{registrations.length}</span> registrasi
              ditampilkan
            </div>
          </div>
        </div>

        {/* Desktop Cards Grid */}
        <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {registrations.map((registration) => (
            <div
              key={registration.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-slate-300 transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <User className="w-7 h-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 text-lg leading-tight mb-1">
                      {registration.user_name}
                    </h3>
                    <p className="text-sm text-slate-500">ID: {registration.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 ml-3">
                  <button
                    onClick={() => onView(registration)}
                    className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-300"
                    title="Lihat Detail"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  {registration.status === "registered" && (
                    <>
                      <button
                        onClick={() => onApprove(registration)}
                        className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all duration-300"
                        title="Setujui"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onReject(registration)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300"
                        title="Tolak"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => onDelete(registration)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Badges Row */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    registration.status
                  )}`}
                >
                  <Activity className="w-3 h-3 mr-1" />
                  {getStatusLabel(registration.status)}
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(
                    registration.payment_status
                  )}`}
                >
                  <CreditCard className="w-3 h-3 mr-1" />
                  {getPaymentStatusLabel(registration.payment_status)}
                </span>
              </div>

              {/* User Info */}
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-slate-700">
                    Informasi User
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-900 mb-1">
                  {registration.user_email}
                </p>
                <p className="text-xs text-slate-500">
                  {registration.user_school} • {registration.user_grade}
                </p>
              </div>

              {/* Tryout Info */}
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <BookOpen className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-slate-700">
                    Tryout Terkait
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-900 mb-1">
                  {registration.tryout_title}
                </p>
                <p className="text-xs text-slate-500">
                  {formatDate(registration.tryout_start_date)} - {formatDate(registration.tryout_end_date)}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="text-xs text-slate-500">
                  <span className="font-medium">Daftar:</span>{" "}
                  {formatDate(registration.registration_date)}
                </div>
                <div className="text-xs text-slate-500">
                  <span className="font-medium">Update:</span>{" "}
                  {formatDate(registration.updated_at)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Cards - Visible on Mobile */}
        <div className="lg:hidden space-y-4">
          {registrations.map((registration) => (
            <div
              key={registration.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 text-lg leading-tight mb-1">
                      {registration.user_name}
                    </h3>
                    <p className="text-sm text-slate-500">ID: {registration.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-3">
                  <button
                    onClick={() => onView(registration)}
                    className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-300"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  {registration.status === "registered" && (
                    <>
                      <button
                        onClick={() => onApprove(registration)}
                        className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all duration-300"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onReject(registration)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => onDelete(registration)}
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
                    registration.status
                  )}`}
                >
                  <Activity className="w-3 h-3 mr-1" />
                  {getStatusLabel(registration.status)}
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(
                    registration.payment_status
                  )}`}
                >
                  <CreditCard className="w-3 h-3 mr-1" />
                  {getPaymentStatusLabel(registration.payment_status)}
                </span>
              </div>

              {/* User Info */}
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-slate-700">
                    Informasi User
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-900 mb-1">
                  {registration.user_email}
                </p>
                <p className="text-xs text-slate-500">
                  {registration.user_school} • {registration.user_grade}
                </p>
              </div>

              {/* Tryout Info */}
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <BookOpen className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-slate-700">
                    Tryout Terkait
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-900 mb-1">
                  {registration.tryout_title}
                </p>
                <p className="text-xs text-slate-500">
                  {formatDate(registration.tryout_start_date)} - {formatDate(registration.tryout_end_date)}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="text-xs text-slate-500">
                  Daftar: {formatDate(registration.registration_date)}
                </div>
                <div className="text-xs text-slate-500">
                  Update: {formatDate(registration.updated_at)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Items per page selector */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-slate-600 font-medium">
                Tampilkan:
              </span>
              <span className="text-sm text-slate-600">
                {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} dari {pagination.total} registrasi
              </span>
            </div>

            {/* Page info and navigation */}
            <div className="flex items-center space-x-4">
              {/* Page info */}
              <div className="text-sm text-slate-600">
                Halaman {pagination.page} dari {pagination.totalPages}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center space-x-2">
                {/* Previous button */}
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1 || isLoading}
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
                            pagination.page === page
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
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages || isLoading}
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
              Menampilkan {(pagination.page - 1) * pagination.limit + 1} -{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)} dari{" "}
              {pagination.total} registrasi
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
