"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  HeaderSection,
  FiltersAndSearch,
  RegistrationsTable,
  ApproveModal,
  RejectModal,
  ViewModal,
  DeleteModal,
} from "@/components/sys/registrations";

interface Registration {
  id: number;
  user_id: number;
  tryout_id: number;
  registration_date: string;
  status: 'registered' | 'approved' | 'rejected' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method: string;
  payment_reference: string;
  payment_date: string;
  approved_by: number;
  approved_at: string;
  notes: string;
  created_at: string;
  updated_at: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  user_school: string;
  user_grade: string;
  tryout_title: string;
  tryout_description: string;
  tryout_start_date: string;
  tryout_end_date: string;
  approved_by_name: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function TryoutRegistrationsPage() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("registration_date");
  const [sortOrder, setSortOrder] = useState("desc");

  // Modal states
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Load registrations
  const fetchRegistrations = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        sortBy,
        sortOrder,
      });

      if (statusFilter !== "all") params.append("status", statusFilter);
      if (paymentStatusFilter !== "all") params.append("paymentStatus", paymentStatusFilter);
      if (searchQuery) params.append("search", searchQuery);

      const response = await fetch(`/api/sys/registrations?${params.toString()}`);
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [pagination.page, statusFilter, paymentStatusFilter, searchQuery, sortBy, sortOrder]);

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
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  // Handle reset filters
  const resetFilters = () => {
    setStatusFilter("all");
    setPaymentStatusFilter("all");
    setSearchQuery("");
    setSortBy("registration_date");
    setSortOrder("desc");
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Calculate statistics
  const totalRegistrations = pagination.total;
  const pendingRegistrations = registrations.filter(r => r.status === 'registered').length;
  const approvedRegistrations = registrations.filter(r => r.status === 'approved').length;
  const rejectedRegistrations = registrations.filter(r => r.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <HeaderSection
          totalRegistrations={totalRegistrations}
          pendingRegistrations={pendingRegistrations}
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
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-12">
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
    </div>
  );
}
