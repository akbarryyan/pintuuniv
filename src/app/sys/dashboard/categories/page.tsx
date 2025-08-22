"use client";

import { useState } from "react";
import { Sidebar, TopHeader } from "@/components/sys";
import {
  HeaderSection,
  FiltersAndSearch,
  CategoriesTable,
  CreateCategoryModal,
  EditCategoryModal,
  ViewCategoryModal,
  DeleteCategoryModal,
} from "@/components/sys/categories";
import { usePageTransition } from "@/lib/hooks";

interface Category {
  id: number;
  name: string;
  description: string;
  tryout_id: number;
  tryout_title: string;
  duration_minutes: number;
  total_weight: number;
  total_questions: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function ManageCategories() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("categories");

  // Use page transition hook
  usePageTransition();

  const [searchQuery, setSearchQuery] = useState("");
  const [tryoutFilter, setTryoutFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Mock data
  const [categories] = useState<Category[]>([
    {
      id: 1,
      name: "TPS Penalaran Umum",
      description: "Tes Potensi Skolastik - Penalaran Umum",
      tryout_id: 1,
      tryout_title: "UTBK 2024 - Soshum",
      duration_minutes: 25,
      total_weight: 40,
      total_questions: 20,
      is_active: true,
      created_at: "2024-01-10",
      updated_at: "2024-01-15",
    },
    {
      id: 2,
      name: "TPS Pemahaman Bacaan",
      description: "Tes Potensi Skolastik - Pemahaman Bacaan",
      tryout_id: 1,
      tryout_title: "UTBK 2024 - Soshum",
      duration_minutes: 30,
      total_weight: 35,
      total_questions: 18,
      is_active: true,
      created_at: "2024-01-10",
      updated_at: "2024-01-15",
    },
    {
      id: 3,
      name: "TPS Pengetahuan Kuantitatif",
      description: "Tes Potensi Skolastik - Pengetahuan Kuantitatif",
      tryout_id: 1,
      tryout_title: "UTBK 2024 - Soshum",
      duration_minutes: 35,
      total_weight: 45,
      total_questions: 22,
      is_active: true,
      created_at: "2024-01-10",
      updated_at: "2024-01-15",
    },
    {
      id: 4,
      name: "Literasi Bahasa Indonesia",
      description: "Literasi dalam Bahasa Indonesia",
      tryout_id: 1,
      tryout_title: "UTBK 2024 - Soshum",
      duration_minutes: 20,
      total_weight: 25,
      total_questions: 15,
      is_active: true,
      created_at: "2024-01-10",
      updated_at: "2024-01-15",
    },
    {
      id: 5,
      name: "Literasi Bahasa Inggris",
      description: "Literasi dalam Bahasa Inggris",
      tryout_id: 1,
      tryout_title: "UTBK 2024 - Soshum",
      duration_minutes: 20,
      total_weight: 25,
      total_questions: 15,
      is_active: false,
      created_at: "2024-01-10",
      updated_at: "2024-01-15",
    },
    {
      id: 6,
      name: "Pengetahuan dan Pemahaman Umum",
      description: "Pengetahuan dan Pemahaman Umum",
      tryout_id: 1,
      tryout_title: "UTBK 2024 - Soshum",
      duration_minutes: 30,
      total_weight: 30,
      total_questions: 15,
      is_active: true,
      created_at: "2024-01-10",
      updated_at: "2024-01-15",
    },
  ]);

  // Filter and search logic
  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.tryout_title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTryout =
      tryoutFilter === "all" || category.tryout_id.toString() === tryoutFilter;

    const matchesDifficulty =
      difficultyFilter === "all" || 
      (difficultyFilter === "Mudah" && category.duration_minutes <= 20) ||
      (difficultyFilter === "Sedang" && category.duration_minutes > 20 && category.duration_minutes <= 30) ||
      (difficultyFilter === "Sulit" && category.duration_minutes > 30);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && category.is_active) ||
      (statusFilter === "inactive" && !category.is_active);

    return matchesSearch && matchesTryout && matchesDifficulty && matchesStatus;
  });

  // Sort logic
  const sortedCategories = [...filteredCategories].sort((a, b) => {
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

  // Pagination logic
  const totalCategories = sortedCategories.length;
  const totalPages = Math.ceil(totalCategories / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = sortedCategories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleOpenModal = (type: string, category?: Category) => {
    setSelectedCategory(category || null);
    switch (type) {
      case "create":
        setShowCreateModal(true);
        break;
      case "edit":
        setShowEditModal(true);
        break;
      case "view":
        setShowViewModal(true);
        break;
      case "delete":
        setShowDeleteModal(true);
        break;
    }
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setShowViewModal(false);
    setShowDeleteModal(false);
    setSelectedCategory(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

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
          pageDescription="Manajemen kategori soal untuk setiap tryout"
        />

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto" data-main-content>
          {/* Header Section */}
          <HeaderSection onCreateNew={() => handleOpenModal("create")} />

          {/* Filters and Search */}
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
            categories={paginatedCategories}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
            onOpenModal={handleOpenModal}
            totalCategories={totalCategories}
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </main>
      </div>

      {/* Modals */}
      {showCreateModal && <CreateCategoryModal onClose={handleCloseModal} />}

      {showEditModal && selectedCategory && (
        <EditCategoryModal
          category={selectedCategory}
          onClose={handleCloseModal}
        />
      )}

      {showViewModal && selectedCategory && (
        <ViewCategoryModal
          category={selectedCategory}
          onClose={handleCloseModal}
        />
      )}

      {showDeleteModal && selectedCategory && (
        <DeleteCategoryModal
          category={selectedCategory}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
