"use client";

import { useState } from "react";
import { X, Folder, Clock, BookOpen, Plus, Search, Filter } from "lucide-react";
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
  tryoutId: number;
  tryoutTitle: string;
  duration: number; // in minutes
  questionsCount: number;
  difficulty: "Mudah" | "Sedang" | "Sulit" | "Sangat Sulit";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  completedBy: number;
  averageScore: number;
}

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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  // Mock data
  const [categories] = useState<Category[]>([
    {
      id: 1,
      name: "Matematika Dasar",
      description:
        "Kategori untuk soal-soal matematika tingkat dasar mencakup aljabar, geometri, dan aritmatika",
      tryoutId: 1,
      tryoutTitle: "UTBK 2024 - Soshum",
      duration: 90,
      questionsCount: 25,
      difficulty: "Sedang",
      isActive: true,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
      completedBy: 1234,
      averageScore: 78.5,
    },
    {
      id: 2,
      name: "Bahasa Indonesia",
      description:
        "Kategori untuk soal-soal bahasa Indonesia meliputi tata bahasa, sastra, dan pemahaman bacaan",
      tryoutId: 1,
      tryoutTitle: "UTBK 2024 - Soshum",
      duration: 60,
      questionsCount: 20,
      difficulty: "Mudah",
      isActive: true,
      createdAt: "2024-01-12",
      updatedAt: "2024-01-18",
      completedBy: 1456,
      averageScore: 82.3,
    },
    {
      id: 3,
      name: "Fisika Lanjutan",
      description:
        "Kategori untuk soal-soal fisika tingkat lanjutan mencakup mekanika, termodinamika, dan elektromagnetik",
      tryoutId: 2,
      tryoutTitle: "UTBK 2024 - Saintek",
      duration: 120,
      questionsCount: 30,
      difficulty: "Sangat Sulit",
      isActive: true,
      createdAt: "2024-01-10",
      updatedAt: "2024-01-19",
      completedBy: 892,
      averageScore: 65.7,
    },
    {
      id: 4,
      name: "Kimia Organik",
      description:
        "Kategori untuk soal-soal kimia organik dengan fokus pada struktur molekul dan reaksi",
      tryoutId: 2,
      tryoutTitle: "UTBK 2024 - Saintek",
      duration: 75,
      questionsCount: 20,
      difficulty: "Sulit",
      isActive: false,
      createdAt: "2024-01-08",
      updatedAt: "2024-01-16",
      completedBy: 567,
      averageScore: 71.2,
    },
    {
      id: 5,
      name: "Sejarah Indonesia",
      description:
        "Kategori untuk soal-soal sejarah Indonesia dari masa pra-kemerdekaan hingga modern",
      tryoutId: 3,
      tryoutTitle: "Simulasi CPNS 2024",
      duration: 45,
      questionsCount: 15,
      difficulty: "Sedang",
      isActive: true,
      createdAt: "2024-01-05",
      updatedAt: "2024-01-17",
      completedBy: 2341,
      averageScore: 75.8,
    },
  ]);

  // Filter and search logic
  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.tryoutTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDifficulty =
      difficultyFilter === "all" || category.difficulty === difficultyFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && category.isActive) ||
      (statusFilter === "inactive" && !category.isActive);
    const matchesTryout =
      tryoutFilter === "all" || category.tryoutId.toString() === tryoutFilter;

    return matchesSearch && matchesDifficulty && matchesStatus && matchesTryout;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Sidebar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="lg:pl-72">
        <TopHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
          </div>
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
