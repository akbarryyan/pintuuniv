"use client";

import { useState } from "react";
import { Sidebar, TopHeader } from "@/components/sys";
import {
  HeaderSection,
  FiltersAndSearch,
  QuestionsTable,
  CreateQuestionModal,
  EditQuestionModal,
  ViewQuestionModal,
  DeleteQuestionModal,
} from "@/components/sys/questions";
import { usePageTransition } from "@/lib/hooks";

interface Answer {
  id: number;
  question_id: number;
  content: string;
  is_correct: boolean;
  order?: number; // untuk pilihan ganda (A, B, C, D)
}

interface Question {
  id: number;
  title: string;
  content: string;
  category_id: number;
  category_name: string;
  tryout_title: string;
  type: "Pilihan Ganda" | "Essay" | "Benar/Salah";
  difficulty: "Mudah" | "Sedang" | "Sulit" | "Sangat Sulit";
  weight: number; // bobot soal (1=mudah, 2=sedang, 3=sulit, 4=sangat sulit)
  is_active: boolean;
  answers: Answer[];
  created_at: string;
  updated_at: string;
}

export default function ManageQuestions() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("questions");

  // Use page transition hook
  usePageTransition();

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("weight");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  // Mock data
  const [questions] = useState<Question[]>([
    {
      id: 1,
      title: "Persamaan Kuadrat",
      content: "Tentukan akar-akar dari persamaan x² - 5x + 6 = 0",
      category_id: 1,
      category_name: "TPS Pengetahuan Kuantitatif",
      tryout_title: "UTBK 2024 - Soshum",
      type: "Pilihan Ganda",
      difficulty: "Sedang",
      weight: 2,
      is_active: true,
      answers: [
        { id: 1, question_id: 1, content: "x = 2 dan x = 3", is_correct: true, order: 1 },
        { id: 2, question_id: 1, content: "x = -2 dan x = -3", is_correct: false, order: 2 },
        { id: 3, question_id: 1, content: "x = 1 dan x = 6", is_correct: false, order: 3 },
        { id: 4, question_id: 1, content: "x = -1 dan x = -6", is_correct: false, order: 4 },
      ],
      created_at: "2024-01-15",
      updated_at: "2024-01-15",
    },
    {
      id: 2,
      title: "Pemahaman Bacaan",
      content: "Berdasarkan teks di atas, apa yang dimaksud dengan 'sustainable development'?",
      category_id: 2,
      category_name: "TPS Pemahaman Bacaan",
      tryout_title: "UTBK 2024 - Soshum",
      type: "Pilihan Ganda",
      difficulty: "Mudah",
      weight: 1,
      is_active: true,
      answers: [
        { id: 5, question_id: 2, content: "Pembangunan yang berkelanjutan", is_correct: true, order: 1 },
        { id: 6, question_id: 2, content: "Pembangunan yang cepat", is_correct: false, order: 2 },
        { id: 7, question_id: 2, content: "Pembangunan yang mahal", is_correct: false, order: 3 },
        { id: 8, question_id: 2, content: "Pembangunan yang sementara", is_correct: false, order: 4 },
      ],
      created_at: "2024-01-15",
      updated_at: "2024-01-15",
    },
    {
      id: 3,
      title: "Logika Penalaran",
      content: "Jika semua A adalah B, dan semua B adalah C, maka...",
      category_id: 3,
      category_name: "TPS Penalaran Umum",
      tryout_title: "UTBK 2024 - Soshum",
      type: "Pilihan Ganda",
      difficulty: "Sulit",
      weight: 3,
      is_active: true,
      answers: [
        { id: 9, question_id: 3, content: "Semua A adalah C", is_correct: true, order: 1 },
        { id: 10, question_id: 3, content: "Semua C adalah A", is_correct: false, order: 2 },
        { id: 11, question_id: 3, content: "Beberapa A adalah C", is_correct: false, order: 3 },
        { id: 12, question_id: 3, content: "Tidak ada hubungan A dan C", is_correct: false, order: 4 },
      ],
      created_at: "2024-01-15",
      updated_at: "2024-01-15",
    },
    {
      id: 4,
      title: "Essay Matematika",
      content: "Jelaskan langkah-langkah untuk menyelesaikan persamaan kuadrat menggunakan rumus ABC",
      category_id: 1,
      category_name: "TPS Pengetahuan Kuantitatif",
      tryout_title: "UTBK 2024 - Soshum",
      type: "Essay",
      difficulty: "Sangat Sulit",
      weight: 4,
      is_active: true,
      answers: [
        { id: 13, question_id: 4, content: "Langkah 1: Identifikasi nilai a, b, c. Langkah 2: Hitung diskriminan. Langkah 3: Gunakan rumus x = (-b ± √D) / 2a", is_correct: true },
      ],
      created_at: "2024-01-15",
      updated_at: "2024-01-15",
    },
    {
      id: 5,
      title: "Benar atau Salah",
      content: "Indonesia adalah negara kepulauan terbesar di dunia",
      category_id: 6,
      category_name: "Pengetahuan dan Pemahaman Umum",
      tryout_title: "UTBK 2024 - Soshum",
      type: "Benar/Salah",
      difficulty: "Mudah",
      weight: 1,
      is_active: true,
      answers: [
        { id: 14, question_id: 5, content: "Benar", is_correct: true },
        { id: 15, question_id: 5, content: "Salah", is_correct: false },
      ],
      created_at: "2024-01-15",
      updated_at: "2024-01-15",
    },
  ]);

  // Mock categories for form
  const categories = [
    { id: 1, name: "TPS Pengetahuan Kuantitatif" },
    { id: 2, name: "TPS Pemahaman Bacaan" },
    { id: 3, name: "TPS Penalaran Umum" },
    { id: 4, name: "Literasi Bahasa Indonesia" },
    { id: 5, name: "Literasi Bahasa Inggris" },
    { id: 6, name: "Pengetahuan dan Pemahaman Umum" },
  ];

  // Filter and search logic
  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.category_name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || question.category_id.toString() === categoryFilter;

    const matchesType =
      typeFilter === "all" || question.type === typeFilter;

    const matchesDifficulty =
      difficultyFilter === "all" || question.difficulty === difficultyFilter;

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && question.is_active) ||
      (statusFilter === "inactive" && !question.is_active);

    return matchesSearch && matchesCategory && matchesType && matchesDifficulty && matchesStatus;
  });

  // Sort logic
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    let aValue: any = a[sortBy as keyof Question];
    let bValue: any = b[sortBy as keyof Question];

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
  const totalQuestions = sortedQuestions.length;
  const totalPages = Math.ceil(totalQuestions / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuestions = sortedQuestions.slice(
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

  const handleOpenModal = (type: string, question?: Question) => {
    setSelectedQuestion(question || null);
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
    setSelectedQuestion(null);
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
          pageTitle="Kelola Soal"
          pageDescription="Manajemen soal untuk setiap kategori"
        />

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto" data-main-content>
          {/* Header Section */}
          <HeaderSection onCreateNew={() => handleOpenModal("create")} />

          {/* Filters and Search */}
          <FiltersAndSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            difficultyFilter={difficultyFilter}
            setDifficultyFilter={setDifficultyFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            categories={categories}
          />

          {/* Questions Table */}
          <QuestionsTable
            questions={paginatedQuestions}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
            onOpenModal={handleOpenModal}
            totalQuestions={totalQuestions}
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </main>
      </div>

      {/* Modals */}
      {showCreateModal && <CreateQuestionModal onClose={handleCloseModal} />}

      {showEditModal && selectedQuestion && (
        <EditQuestionModal
          question={selectedQuestion}
          onClose={handleCloseModal}
        />
      )}

      {showViewModal && selectedQuestion && (
        <ViewQuestionModal
          question={selectedQuestion}
          onClose={handleCloseModal}
        />
      )}

      {showDeleteModal && selectedQuestion && (
        <DeleteQuestionModal
          question={selectedQuestion}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
