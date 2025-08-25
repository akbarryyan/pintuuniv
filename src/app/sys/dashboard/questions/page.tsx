"use client";

import { useState, useEffect } from "react";
import { Sidebar, TopHeader } from "@/components/sys";
import {
  HeaderSection,
  FiltersAndSearch,
  QuestionsTable,
} from "@/components/sys/questions";
import { usePageTransition } from "@/lib/hooks";
import { questionService, Question, QuestionFilters, QuestionCreateData } from "@/lib/services/questionService";
import { categoryService } from "@/lib/services/categoryService";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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

  // Data states
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Options states
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  // Loading states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState<QuestionCreateData>({
    title: "",
    content: "",
    category_id: 0,
    type: "Pilihan Ganda",
    difficulty: "Mudah",
    weight: 1,
    is_active: true,
    answers: [
      { content: "", is_correct: false },
      { content: "", is_correct: false },
      { content: "", is_correct: false },
      { content: "", is_correct: false },
    ],
  });

  // Fetch questions from database
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const filters: QuestionFilters = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery,
        category: categoryFilter === "all" ? undefined : categoryFilter,
        type: typeFilter === "all" ? undefined : typeFilter,
        difficulty: difficultyFilter === "all" ? undefined : difficultyFilter,
        status: statusFilter === "all" ? undefined : statusFilter,
      };

      const response = await questionService.getQuestions(filters);
      
      if (response.success && response.data) {
        setQuestions(response.data);
        if (response.pagination) {
          setTotalQuestions(response.pagination.total);
          setTotalPages(response.pagination.totalPages);
        }
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast.error("Gagal mengambil data questions");
    } finally {
      setLoading(false);
    }
  };

  // Fetch category options
  const fetchCategoryOptions = async () => {
    try {
      const response = await categoryService.getCategoryOptions();
      if (response.success && response.data) {
        setCategories(response.data.map(cat => ({ id: cat.id, name: cat.name })));
      }
    } catch (error) {
      console.error("Error fetching category options:", error);
    }
  };

  // Load data on component mount and when filters change
  useEffect(() => {
    fetchCategoryOptions();
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [currentPage, itemsPerPage, searchQuery, categoryFilter, typeFilter, difficultyFilter, statusFilter]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const openModal = (type: string, question?: Question) => {
    if (type === "create") {
      setFormData({
        title: "",
        content: "",
        category_id: 0,
        type: "Pilihan Ganda",
        difficulty: "Mudah",
        weight: 1,
        is_active: true,
        answers: [
          { content: "", is_correct: false },
          { content: "", is_correct: false },
          { content: "", is_correct: false },
          { content: "", is_correct: false },
        ],
      });
      setShowCreateModal(true);
    } else if (question) {
      setSelectedQuestion(question);
      setFormData({
        title: question.title,
        content: question.content,
        category_id: question.category_id,
        type: question.type,
        difficulty: question.difficulty,
        weight: question.weight,
        is_active: question.is_active,
        answers: question.answers.map(answer => ({
          content: answer.content,
          is_correct: answer.is_correct,
        })),
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
    setSelectedQuestion(null);
    setIsSubmitting(false);
    setIsDeleting(false);
  };

  const handleSubmit = async (e: React.FormEvent, type: "create" | "edit") => {
    e.preventDefault();
    
    if (isSubmitting) return; // Prevent double submission
    
    setIsSubmitting(true);
    
    try {
      if (type === "create") {
        await questionService.createQuestion(formData);
        toast.success("Question berhasil dibuat");
      } else if (selectedQuestion) {
        await questionService.updateQuestion(selectedQuestion.id, formData);
        toast.success("Question berhasil diupdate");
      }
      
      closeModal();
      fetchQuestions(); // Refresh data
    } catch (error: any) {
      console.error("Error submitting question:", error);
      toast.error(error.message || "Gagal menyimpan question");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedQuestion || isDeleting) return;
    
    setIsDeleting(true);
    
    try {
      await questionService.deleteQuestion(selectedQuestion.id);
      toast.success("Question berhasil dihapus");
      closeModal();
      fetchQuestions(); // Refresh data
    } catch (error: any) {
      console.error("Error deleting question:", error);
      toast.error(error.message || "Gagal menghapus question");
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

  // Sort questions
  const sortedQuestions = [...questions].sort((a, b) => {
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
          <HeaderSection onCreateNew={() => openModal("create")} />

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
            questions={sortedQuestions}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
            onOpenModal={openModal}
            totalQuestions={totalQuestions}
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
            {/* Loading Overlay */}
            {isSubmitting && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                <div className="flex items-center space-x-3">
                  <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
                  <span className="text-slate-700 font-medium">Menyimpan data...</span>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-900">
                {showCreateModal ? "Buat Soal Baru" : "Edit Soal"}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            <form onSubmit={(e) => handleSubmit(e, showCreateModal ? "create" : "edit")} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Judul Soal *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Contoh: Persamaan Kuadrat"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Kategori *
                  </label>
                  <select
                    value={formData.category_id || ""}
                    onChange={(e) => setFormData({ ...formData, category_id: parseInt(e.target.value) })}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                  >
                    <option value="">Pilih Kategori</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Konten Soal *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  disabled={isSubmitting}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Tulis soal lengkap di sini..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tipe Soal *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    required
                  >
                    <option value="Pilihan Ganda">Pilihan Ganda</option>
                    <option value="Essay">Essay</option>
                    <option value="Benar/Salah">Benar/Salah</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tingkat Kesulitan *
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    required
                  >
                    <option value="Mudah">Mudah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Sulit">Sulit</option>
                    <option value="Sangat Sulit">Sangat Sulit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Bobot Soal *
                  </label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    min="1"
                    max="4"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
                />
                <label className="text-sm font-medium text-slate-700">
                  Aktifkan soal ini
                </label>
              </div>

              {/* Answers Section */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-slate-900">Jawaban</h4>
                
                {formData.answers.map((answer, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg">
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={answer.is_correct}
                      onChange={() => {
                        const newAnswers = formData.answers.map((a, i) => ({
                          ...a,
                          is_correct: i === index
                        }));
                        setFormData({ ...formData, answers: newAnswers });
                      }}
                      className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500"
                    />
                    <input
                      type="text"
                      value={answer.content}
                      onChange={(e) => {
                        const newAnswers = [...formData.answers];
                        newAnswers[index].content = e.target.value;
                        setFormData({ ...formData, answers: newAnswers });
                      }}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder={`Jawaban ${index + 1}`}
                      required
                    />
                    {formData.type === "Pilihan Ganda" && (
                      <span className="text-sm font-medium text-slate-500 w-8 text-center">
                        {String.fromCharCode(65 + index)}
                      </span>
                    )}
                  </div>
                ))}
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
                  className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <span>{showCreateModal ? "Buat Soal" : "Simpan Perubahan"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedQuestion && (
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
                  <h3 className="text-lg font-semibold text-slate-900">Hapus Soal</h3>
                  <p className="text-sm text-slate-600">Tindakan ini tidak dapat dibatalkan</p>
                </div>
              </div>
              
              <p className="text-slate-700 mb-6">
                Apakah Anda yakin ingin menghapus soal <strong>"{selectedQuestion.title}"</strong>?
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
