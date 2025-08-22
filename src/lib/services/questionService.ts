export interface Answer {
  id: number;
  question_id: number;
  content: string;
  is_correct: boolean;
  order?: number;
}

export interface Question {
  id: number;
  title: string;
  content: string;
  category_id: number;
  category_name: string;
  tryout_title: string;
  type: "Pilihan Ganda" | "Essay" | "Benar/Salah";
  difficulty: "Mudah" | "Sedang" | "Sulit" | "Sangat Sulit";
  weight: number;
  is_active: boolean;
  answers: Answer[];
  created_at: string;
  updated_at: string;
}

export interface QuestionFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  type?: string;
  difficulty?: string;
  status?: string;
}

export interface QuestionCreateData {
  title: string;
  content: string;
  category_id: number;
  type: "Pilihan Ganda" | "Essay" | "Benar/Salah";
  difficulty: "Mudah" | "Sedang" | "Sulit" | "Sangat Sulit";
  weight: number;
  is_active: boolean;
  answers: Omit<Answer, 'id' | 'question_id'>[];
}

export interface QuestionUpdateData extends QuestionCreateData {}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

class QuestionService {
  private baseUrl = "/api/sys/questions";

  // Ambil semua questions dengan filter dan pagination
  async getQuestions(filters: QuestionFilters = {}): Promise<ApiResponse<Question[]>> {
    try {
      const params = new URLSearchParams();
      
      if (filters.page) params.append("page", filters.page.toString());
      if (filters.limit) params.append("limit", filters.limit.toString());
      if (filters.search) params.append("search", filters.search);
      if (filters.category) params.append("category", filters.category);
      if (filters.type) params.append("type", filters.type);
      if (filters.difficulty) params.append("difficulty", filters.difficulty);
      if (filters.status) params.append("status", filters.status);
      
      const response = await fetch(`${this.baseUrl}?${params.toString()}`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Gagal mengambil data questions");
      }
      
      return result;
    } catch (error) {
      console.error("Error fetching questions:", error);
      throw error;
    }
  }

  // Ambil question berdasarkan ID
  async getQuestionById(id: number): Promise<ApiResponse<Question>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Gagal mengambil data question");
      }
      
      return result;
    } catch (error) {
      console.error("Error fetching question:", error);
      throw error;
    }
  }

  // Buat question baru
  async createQuestion(data: QuestionCreateData): Promise<ApiResponse<{ id: number }>> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Gagal membuat question");
      }
      
      return result;
    } catch (error) {
      console.error("Error creating question:", error);
      throw error;
    }
  }

  // Update question
  async updateQuestion(id: number, data: QuestionUpdateData): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Gagal mengupdate question");
      }
      
      return result;
    } catch (error) {
      console.error("Error updating question:", error);
      throw error;
    }
  }

  // Hapus question
  async deleteQuestion(id: number): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Gagal menghapus question");
      }
      
      return result;
    } catch (error) {
      console.error("Error deleting question:", error);
      throw error;
    }
  }
}

export const questionService = new QuestionService();
