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
  questionId: number;
  content: string;
  isCorrect: boolean;
  order?: number; // untuk pilihan ganda (A, B, C, D)
}

interface Question {
  id: number;
  title: string;
  content: string;
  categoryId: number;
  categoryName: string;
  tryoutTitle: string;
  type: "Pilihan Ganda" | "Essay" | "Benar/Salah";
  difficulty: "Mudah" | "Sedang" | "Sulit" | "Sangat Sulit";
  points: number;
  isActive: boolean;
  answers: Answer[];
  createdAt: string;
  updatedAt: string;
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
  const [sortBy, setSortBy] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );

  // Mock data
  const [questions] = useState<Question[]>([
    {
      id: 1,
      title: "Persamaan Kuadrat",
      content: "Tentukan akar-akar dari persamaan x² - 5x + 6 = 0",
      categoryId: 1,
      categoryName: "Matematika Dasar",
      tryoutTitle: "UTBK 2024 - Soshum",
      type: "Pilihan Ganda",
      difficulty: "Sedang",
      points: 10,
      isActive: true,
      answers: [
        { id: 1, questionId: 1, content: "x = 2 dan x = 3", isCorrect: true, order: 1 },
        { id: 2, questionId: 1, content: "x = -2 dan x = -3", isCorrect: false, order: 2 },
        { id: 3, questionId: 1, content: "x = 1 dan x = 6", isCorrect: false, order: 3 },
        { id: 4, questionId: 1, content: "x = -1 dan x = -6", isCorrect: false, order: 4 },
      ],
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
    },
    {
      id: 2,
      title: "Analisis Wacana",
      content: "Berdasarkan teks berikut, tentukan ide pokok paragraf pertama...",
      categoryId: 2,
      categoryName: "Bahasa Indonesia",
      tryoutTitle: "UTBK 2024 - Soshum",
      type: "Essay",
      difficulty: "Mudah",
      points: 15,
      isActive: true,
      answers: [
        { id: 5, questionId: 2, content: "Ide pokok paragraf pertama adalah tentang pentingnya pendidikan dalam pembangunan bangsa", isCorrect: true },
      ],
      createdAt: "2024-01-12",
      updatedAt: "2024-01-18",
    },
    {
      id: 3,
      title: "Hukum Newton",
      content: "Sebuah benda bermassa 2 kg ditarik dengan gaya 10 N. Berapakah percepatan benda tersebut?",
      categoryId: 3,
      categoryName: "Fisika Lanjutan",
      tryoutTitle: "UTBK 2024 - Saintek",
      type: "Pilihan Ganda",
      difficulty: "Sangat Sulit",
      points: 20,
      isActive: true,
      answers: [
        { id: 6, questionId: 3, content: "5 m/s²", isCorrect: true, order: 1 },
        { id: 7, questionId: 3, content: "10 m/s²", isCorrect: false, order: 2 },
        { id: 8, questionId: 3, content: "2 m/s²", isCorrect: false, order: 3 },
        { id: 9, questionId: 3, content: "20 m/s²", isCorrect: false, order: 4 },
      ],
      createdAt: "2024-01-10",
      updatedAt: "2024-01-19",
    },
    {
      id: 4,
      title: "Reaksi Kimia",
      content: "Apakah benar bahwa reaksi eksoterm melepaskan panas ke lingkungan?",
      categoryId: 4,
      categoryName: "Kimia Organik",
      tryoutTitle: "UTBK 2024 - Saintek",
      type: "Benar/Salah",
      difficulty: "Sulit",
      points: 5,
      isActive: false,
      answers: [
        { id: 10, questionId: 4, content: "Benar", isCorrect: true },
        { id: 11, questionId: 4, content: "Salah", isCorrect: false },
      ],
      createdAt: "2024-01-08",
      updatedAt: "2024-01-16",
    },
    {
      id: 5,
      title: "Sejarah Kemerdekaan",
      content: "Jelaskan peran Soekarno dalam proses kemerdekaan Indonesia pada tahun 1945",
      categoryId: 5,
      categoryName: "Sejarah Indonesia",
      tryoutTitle: "Simulasi CPNS 2024",
      type: "Essay",
      difficulty: "Sedang",
      points: 25,
      isActive: true,
      answers: [
        { id: 12, questionId: 5, content: "Soekarno berperan sebagai proklamator kemerdekaan, memimpin sidang PPKI, dan menyusun teks proklamasi bersama Hatta", isCorrect: true },
      ],
      createdAt: "2024-01-05",
      updatedAt: "2024-01-17",
    },
  ]);

  // Filter and search logic
  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.categoryName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || question.categoryId.toString() === categoryFilter;
    const matchesType =
      typeFilter === "all" || question.type === typeFilter;
    const matchesDifficulty =
      difficultyFilter === "all" || question.difficulty === difficultyFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && question.isActive) ||
      (statusFilter === "inactive" && !question.isActive);

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
          pageDescription="Manajemen soal untuk setiap kategori tryout"
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
