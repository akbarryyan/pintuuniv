"use client";

import { useState, useEffect } from "react";
import { Sidebar, TopHeader } from "@/components/sys";
import {
  HeaderSection,
  FiltersAndSearch,
  TryoutsTable,
} from "@/components/sys/tryouts";
import { usePageTransition } from "@/lib/hooks";
import { tryoutService, Tryout, TryoutFilters, TryoutCreateData } from "@/lib/services/tryoutService";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function ManageTryouts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("tryouts");
  
  // Use auth context
  const { isAuthenticated, isLoading } = useAuth();

  // Use page transition hook
  usePageTransition();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Data states
  const [tryouts, setTryouts] = useState<Tryout[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalTryouts, setTotalTryouts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTryout, setSelectedTryout] = useState<Tryout | null>(null);
  const [formData, setFormData] = useState<TryoutCreateData>({
    title: "",
    description: "",
    passing_score: 500,
    is_active: true,
    type_tryout: "free",
    price: 0,
    start_date: "",
    end_date: "",
  });

  // Loading states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch tryouts from database
  const fetchTryouts = async () => {
    try {
      setLoading(true);
      const filters: TryoutFilters = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery,
        status: statusFilter === "all" ? undefined : statusFilter,
      };

      const response = await tryoutService.getTryouts(filters);
      
      if (response.success && response.data) {
        // Debug logging (remove in production)
        // console.log("API Response:", response);
        // console.log("Tryouts data:", response.data);
        // console.log("Sample tryout:", response.data[0]);
        
        setTryouts(response.data);
        if (response.pagination) {
          setTotalTryouts(response.pagination.total);
          setTotalPages(response.pagination.totalPages);
        }
      }
    } catch (error) {
      console.error("Error fetching tryouts:", error);
      toast.error("Gagal mengambil data tryouts");
    } finally {
      setLoading(false);
    }
  };

  // Load tryouts on component mount and when filters change
  useEffect(() => {
    fetchTryouts();
  }, [currentPage, itemsPerPage, searchQuery, statusFilter]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const openModal = (type: string, tryout?: Tryout) => {
    if (type === "create") {
      setFormData({
        title: "",
        description: "",
        passing_score: 500,
        is_active: true,
        type_tryout: "free",
        price: 0,
        start_date: "",
        end_date: "",
      });
      setShowCreateModal(true);
    } else if (tryout) {
      setSelectedTryout(tryout);
      setFormData({
        title: tryout.title,
        description: tryout.description,
        passing_score: tryout.passing_score,
        is_active: tryout.is_active,
        type_tryout: tryout.type_tryout,
        price: tryout.price,
        start_date: tryout.start_date,
        end_date: tryout.end_date,
      });
      
      if (type === "edit") {
        setShowEditModal(true);
      } else if (type === "delete") {
        setShowDeleteModal(true);
      }
    }
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedTryout(null);
    setIsSubmitting(false);
    setIsDeleting(false);
  };

  const handleSubmit = async (e: React.FormEvent, type: "create" | "edit") => {
    e.preventDefault();
    
    if (isSubmitting) return; // Prevent double submission
    
    setIsSubmitting(true);
    
    try {
      if (type === "create") {
        await tryoutService.createTryout(formData);
        toast.success("Tryout berhasil dibuat");
      } else if (selectedTryout) {
        await tryoutService.updateTryout(selectedTryout.id, formData);
        toast.success("Tryout berhasil diupdate");
      }
      
      closeModal();
      fetchTryouts(); // Refresh data
    } catch (error: any) {
      console.error("Error submitting tryout:", error);
      toast.error(error.message || "Gagal menyimpan tryout");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedTryout || isDeleting) return;
    
    setIsDeleting(true);
    
    try {
      await tryoutService.deleteTryout(selectedTryout.id);
      toast.success("Tryout berhasil dihapus");
      closeModal();
      fetchTryouts(); // Refresh data
    } catch (error: any) {
      console.error("Error deleting tryout:", error);
      toast.error(error.message || "Gagal menghapus tryout");
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  // Sort tryouts
  const sortedTryouts = [...tryouts].sort((a, b) => {
    let aValue: any = a[sortBy as keyof Tryout];
    let bValue: any = b[sortBy as keyof Tryout];

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

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
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <TopHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          pageTitle="Kelola Tryout"
          pageDescription="Manajemen paket tryout untuk setiap kategori"
        />

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto" data-main-content>
          {/* Header Section */}
          <HeaderSection onOpenCreateModal={() => openModal("create")} />

          {/* Filters & Search */}
          <FiltersAndSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            typeFilter="all"
            setTypeFilter={() => {}}
            difficultyFilter="all"
            setDifficultyFilter={() => {}}
          />

          {/* Tryouts Table */}
          <TryoutsTable
            tryouts={sortedTryouts}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
            onOpenModal={openModal}
            totalTryouts={totalTryouts}
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </main>
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            {/* Loading Overlay */}
            {isSubmitting && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                <div className="flex items-center space-x-3">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                  <span className="text-slate-700 font-medium">Menyimpan data...</span>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-900">
                {showCreateModal ? "Buat Tryout Baru" : "Edit Tryout"}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            <form onSubmit={(e) => handleSubmit(e, showCreateModal ? "create" : "edit")} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Judul Tryout *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Contoh: UTBK 2024 - Soshum"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  disabled={isSubmitting}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Deskripsi tryout..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Passing Score *
                  </label>
                  <input
                    type="number"
                    value={formData.passing_score}
                    onChange={(e) => setFormData({ ...formData, passing_score: parseInt(e.target.value) })}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    min="0"
                    max="1000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.is_active ? "active" : "inactive"}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.value === "active" })}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="active">Aktif</option>
                    <option value="inactive">Tidak Aktif</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tipe Tryout *
                  </label>
                  <select
                    value={formData.type_tryout}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      type_tryout: e.target.value as 'free' | 'paid',
                      price: e.target.value === 'free' ? 0 : formData.price
                    })}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                  >
                    <option value="free">Gratis</option>
                    <option value="paid">Berbayar</option>
                  </select>
                </div>

                {formData.type_tryout === 'paid' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Harga (Rp) *
                    </label>
                    <input
                      type="number"
                      value={formData.price || 0}
                      onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      min="0"
                      placeholder="Masukkan harga tryout"
                      required={formData.type_tryout === 'paid'}
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tanggal Mulai
                  </label>
                  <input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tanggal Berakhir
                  </label>
                  <input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isSubmitting}
                  className="px-6 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <span>{showCreateModal ? "Buat Tryout" : "Simpan Perubahan"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedTryout && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
            {/* Loading Overlay */}
            {isDeleting && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                <div className="flex items-center space-x-3">
                  <Loader2 className="w-6 h-6 animate-spin text-red-600" />
                  <span className="text-slate-700 font-medium">Menghapus data...</span>
                </div>
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl text-red-600">🗑️</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Hapus Tryout</h3>
                  <p className="text-sm text-slate-600">Tindakan ini tidak dapat dibatalkan</p>
                </div>
              </div>
              
              <p className="text-slate-700 mb-6">
                Apakah Anda yakin ingin menghapus tryout <strong>"{selectedTryout.title}"</strong>? 
                Semua data kategori dan soal yang terkait akan ikut terhapus.
              </p>

              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={closeModal}
                  disabled={isDeleting}
                  className="px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menghapus...</span>
                    </>
                  ) : (
                    <span>Hapus</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
