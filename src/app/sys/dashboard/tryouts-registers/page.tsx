"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Sidebar, TopHeader } from "@/components/sys";
import {
  HeaderSection,
  FiltersAndSearch,
  RegistrationsTable,
  ApproveModal,
  RejectModal,
  ViewModal,
  DeleteModal,
} from "@/components/sys/registrations";
import { usePageTransition } from "@/lib/hooks";
import {
  Registration,
  RegistrationService,
  RegistrationFilters,
} from "@/lib/services/registrationService";
import { useAuth } from "@/contexts/AuthContext";

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function TryoutRegistrationsPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("tryouts-registers");

  // Use auth context
  const { isAuthenticated, isLoading } = useAuth();

  // Use page transition hook
  usePageTransition();

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("registration_date");
  const [sortOrder, setSortOrder] = useState("desc");

  // Modal states
  const [selectedRegistration, setSelectedRegistration] =
    useState<Registration | null>(null);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Load registrations
  const fetchRegistrations = async () => {
    try {
      setDataLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        sortBy,
        sortOrder,
      });

      if (statusFilter !== "all") params.append("status", statusFilter);
      if (paymentStatusFilter !== "all")
        params.append("paymentStatus", paymentStatusFilter);
      if (searchQuery) params.append("search", searchQuery);

      const response = await fetch(
        `/api/sys/registrations?${params.toString()}`
      );
      const data = await response.json();

      if (data.success) {
        setRegistrations(data.registrations);
        setPagination(data.pagination);
      } else {
        setError(data.message || "Gagal memuat data registrasi");
        toast.error("Gagal memuat data registrasi");
      }
    } catch (error) {
      console.error("Error fetching registrations:", error);
      setError("Terjadi kesalahan saat memuat data");
      toast.error("Terjadi kesalahan saat memuat data");
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [
    pagination.page,
    statusFilter,
    paymentStatusFilter,
    searchQuery,
    sortBy,
    sortOrder,
  ]);

  // Handle approve registration
  const handleApprove = async (registrationId: number, notes: string) => {
    try {
      const response = await fetch(`/api/sys/registrations/${registrationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "approved",
          payment_status: "paid",
          notes,
          approved_by: 1, // TODO: Get from auth context
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Registrasi berhasil disetujui");
        fetchRegistrations();
        setIsApproveModalOpen(false);
        setSelectedRegistration(null);
      } else {
        toast.error(data.message || "Gagal menyetujui registrasi");
      }
    } catch (error) {
      console.error("Error approving registration:", error);
      toast.error("Terjadi kesalahan saat menyetujui registrasi");
    }
  };

  // Handle reject registration
  const handleReject = async (registrationId: number, notes: string) => {
    try {
      const response = await fetch(`/api/sys/registrations/${registrationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "rejected",
          notes,
          approved_by: 1, // TODO: Get from auth context
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Registrasi berhasil ditolak");
        fetchRegistrations();
        setIsRejectModalOpen(false);
        setSelectedRegistration(null);
      } else {
        toast.error(data.message || "Gagal menolak registrasi");
      }
    } catch (error) {
      console.error("Error rejecting registration:", error);
      toast.error("Terjadi kesalahan saat menolak registrasi");
    }
  };

  // Handle delete registration
  const handleDelete = async (registrationId: number) => {
    try {
      const response = await fetch(`/api/sys/registrations/${registrationId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Registrasi berhasil dihapus");
        fetchRegistrations();
        setIsDeleteModalOpen(false);
        setSelectedRegistration(null);
      } else {
        toast.error(data.message || "Gagal menghapus registrasi");
      }
    } catch (error) {
      console.error("Error deleting registration:", error);
      toast.error("Terjadi kesalahan saat menghapus registrasi");
    }
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  // Handle reset filters
  const resetFilters = () => {
    setStatusFilter("all");
    setPaymentStatusFilter("all");
    setSearchQuery("");
    setSortBy("registration_date");
    setSortOrder("desc");
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // Calculate statistics
  const totalRegistrations = pagination.total;
  const registeredRegistrations = registrations.filter(
    (r) => r.status === "registered"
  ).length;
  const waitingConfirmationRegistrations = registrations.filter(
    (r) => r.status === "waiting_confirmation"
  ).length;
  const approvedRegistrations = registrations.filter(
    (r) => r.status === "approved"
  ).length;
  const rejectedRegistrations = registrations.filter(
    (r) => r.status === "rejected"
  ).length;

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Memverifikasi akses admin...</p>
        </div>
      </div>
    );
  }

  // Show nothing if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-white/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Component */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <TopHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          pageTitle="Tryout Registration"
          pageDescription="Kelola pendaftaran tryout dan persetujuan peserta"
        />

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto" data-main-content>
          {/* Header Section */}
          <HeaderSection
            totalRegistrations={totalRegistrations}
            registeredRegistrations={registeredRegistrations}
            waitingConfirmationRegistrations={waitingConfirmationRegistrations}
            approvedRegistrations={approvedRegistrations}
            rejectedRegistrations={rejectedRegistrations}
          />

          {/* Filters and Search */}
          <FiltersAndSearch
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            paymentStatusFilter={paymentStatusFilter}
            setPaymentStatusFilter={setPaymentStatusFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            onResetFilters={resetFilters}
          />

          {/* Loading State */}
          {isLoading && (
            <div className="bg-white rounded-2xl shadow-lg border border-white/20 p-8">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-slate-600">
                  Loading registrations...
                </span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="bg-white rounded-2xl shadow-lg border border-white/20 p-8">
              <div className="text-center">
                <div className="text-red-600 mb-4">
                  <p className="text-lg font-semibold">Gagal memuat data</p>
                  <p className="text-sm">{error}</p>
                </div>
                <button
                  onClick={fetchRegistrations}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Coba Lagi
                </button>
              </div>
            </div>
          )}

          {/* Registrations Table */}
          {!isLoading && !error && (
            <RegistrationsTable
              registrations={registrations}
              pagination={pagination}
              onPageChange={handlePageChange}
              onView={(registration) => {
                setSelectedRegistration(registration);
                setIsViewModalOpen(true);
              }}
              onApprove={(registration) => {
                setSelectedRegistration(registration);
                setIsApproveModalOpen(true);
              }}
              onReject={(registration) => {
                setSelectedRegistration(registration);
                setIsRejectModalOpen(true);
              }}
              onDelete={(registration) => {
                setSelectedRegistration(registration);
                setIsDeleteModalOpen(true);
              }}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <ApproveModal
        isOpen={isApproveModalOpen}
        onClose={() => {
          setIsApproveModalOpen(false);
          setSelectedRegistration(null);
        }}
        registration={selectedRegistration}
        onApprove={handleApprove}
      />

      <RejectModal
        isOpen={isRejectModalOpen}
        onClose={() => {
          setIsRejectModalOpen(false);
          setSelectedRegistration(null);
        }}
        registration={selectedRegistration}
        onReject={handleReject}
      />

      <ViewModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedRegistration(null);
        }}
        registration={selectedRegistration}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedRegistration(null);
        }}
        registration={selectedRegistration}
        onDelete={handleDelete}
      />
    </div>
  );
}
