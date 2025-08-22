"use client";

import { useState, useEffect } from "react";
import { Sidebar, TopHeader } from "@/components/sys";
import {
  HeaderSection,
  FiltersAndSearch,
  CategoriesTable,
} from "@/components/sys/categories";
import { usePageTransition } from "@/lib/hooks";
import { categoryService, Category, CategoryFilters, CategoryCreateData } from "@/lib/services/categoryService";
import { tryoutService } from "@/lib/services/tryoutService";
import { toast } from "sonner";

export default function ManageCategories() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("categories");

  // Use page transition hook
  usePageTransition();

  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [tryoutFilter, setTryoutFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Data states
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCategories, setTotalCategories] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Options states
  const [tryoutOptions, setTryoutOptions] = useState<{ id: number; title: string; description: string }[]>([]);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryCreateData>({
    name: "",
    description: "",
    tryout_id: 0,
    duration_minutes: 30,
    is_active: true,
  });

  // Fetch categories from database
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const filters: CategoryFilters = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery,
        status: statusFilter === "all" ? undefined : statusFilter,
        tryout: tryoutFilter === "all" ? undefined : tryoutFilter,
        duration: difficultyFilter === "all" ? undefined : difficultyFilter,
      };

      const response = await categoryService.getCategories(filters);
      
      if (response.success && response.data) {
        setCategories(response.data);
        if (response.pagination) {
          setTotalCategories(response.pagination.total);
          setTotalPages(response.pagination.totalPages);
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Gagal mengambil data categories");
    } finally {
      setLoading(false);
    }
  };

  // Fetch tryout options
  const fetchTryoutOptions = async () => {
    try {
      const response = await tryoutService.getTryoutOptions();
      if (response.success && response.data) {
        setTryoutOptions(response.data);
      }
    } catch (error) {
      console.error("Error fetching tryout options:", error);
    }
  };

  // Load data on component mount and when filters change
  useEffect(() => {
    fetchTryoutOptions();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [currentPage, itemsPerPage, searchQuery, statusFilter, tryoutFilter, difficultyFilter]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const openModal = (type: string, category?: Category) => {
    if (type === "create") {
      setFormData({
        name: "",
        description: "",
        tryout_id: 0,
        duration_minutes: 30,
        is_active: true,
      });
      setShowCreateModal(true);
    } else if (category) {
      setSelectedCategory(category);
      setFormData({
        name: category.name,
        description: category.description,
        tryout_id: category.tryout_id,
        duration_minutes: category.duration_minutes,
        is_active: category.is_active,
      });
      
      if (type === "edit") {
        setShowEditModal(true);
      } else if (type === "view") {
        setShowViewModal(true);
      } else if (type === "delete") {
        setShowDeleteModal(true);
      }
    }
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setShowViewModal(false);
    setShowDeleteModal(false);
    setSelectedCategory(null);
  };

  const handleSubmit = async (e: React.FormEvent, type: "create" | "edit") => {
    e.preventDefault();
    
    try {
      if (type === "create") {
        await categoryService.createCategory(formData);
        toast.success("Category berhasil dibuat");
      } else if (selectedCategory) {
        await categoryService.updateCategory(selectedCategory.id, formData);
        toast.success("Category berhasil diupdate");
      }
      
      closeModal();
      fetchCategories(); // Refresh data
    } catch (error: any) {
      console.error("Error submitting category:", error);
      toast.error(error.message || "Gagal menyimpan category");
    }
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;
    
    try {
      await categoryService.deleteCategory(selectedCategory.id);
      toast.success("Category berhasil dihapus");
      closeModal();
      fetchCategories(); // Refresh data
    } catch (error: any) {
      console.error("Error deleting category:", error);
      toast.error(error.message || "Gagal menghapus category");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  // Sort categories
  const sortedCategories = [...categories].sort((a, b) => {
    let aValue: any = a[sortBy as keyof Category];
    let bValue: any = b[sortBy as keyof Category];

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
          pageTitle="Kelola Kategori"
          pageDescription="Manajemen kategori untuk setiap tryout"
        />

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto" data-main-content>
          {/* Header Section */}
          <HeaderSection onCreateNew={() => openModal("create")} />

          {/* Filters & Search */}
          <FiltersAndSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            difficultyFilter={difficultyFilter}
            setDifficultyFilter={setDifficultyFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            tryoutFilter={tryoutFilter}
            setTryoutFilter={setTryoutFilter}
          />

          {/* Categories Table */}
          <CategoriesTable
            categories={sortedCategories}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
            onOpenModal={openModal}
            totalCategories={totalCategories}
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-900">
                {showCreateModal ? "Buat Kategori Baru" : "Edit Kategori"}
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
                  Nama Kategori *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  placeholder="Contoh: TPS Penalaran Umum"
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
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  placeholder="Deskripsi kategori ini..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tryout Terkait *
                  </label>
                  <select
                    value={formData.tryout_id || ""}
                    onChange={(e) => setFormData({ ...formData, tryout_id: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                    required
                  >
                    <option value="">Pilih Tryout</option>
                    {tryoutOptions.map((tryout) => (
                      <option key={tryout.id} value={tryout.id}>
                        {tryout.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Durasi (menit) *
                  </label>
                  <input
                    type="number"
                    value={formData.duration_minutes}
                    onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                    placeholder="30"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                />
                <label className="text-sm font-medium text-slate-700">
                  Aktifkan kategori ini
                </label>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 font-medium"
                >
                  {showCreateModal ? "Buat Kategori" : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedCategory && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl text-red-600">🗑️</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Hapus Kategori</h3>
                  <p className="text-sm text-slate-600">Tindakan ini tidak dapat dibatalkan</p>
                </div>
              </div>
              
              <p className="text-slate-700 mb-6">
                Apakah Anda yakin ingin menghapus kategori <strong>"{selectedCategory.name}"</strong>? 
                Semua soal yang terkait akan ikut terhapus.
              </p>

              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
