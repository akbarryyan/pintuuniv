export interface Category {
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

export interface CategoryFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  tryout?: string;
  duration?: string;
}

export interface CategoryCreateData {
  name: string;
  description: string;
  tryout_id: number;
  duration_minutes: number;
  is_active: boolean;
}

export interface CategoryUpdateData extends CategoryCreateData {}

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

class CategoryService {
  private baseUrl = "/api/sys/categories";

  // Ambil semua categories dengan filter dan pagination
  async getCategories(filters: CategoryFilters = {}): Promise<ApiResponse<Category[]>> {
    try {
      const params = new URLSearchParams();
      
      if (filters.page) params.append("page", filters.page.toString());
      if (filters.limit) params.append("limit", filters.limit.toString());
      if (filters.search) params.append("search", filters.search);
      if (filters.status) params.append("status", filters.status);
      if (filters.tryout) params.append("tryout", filters.tryout);
      if (filters.duration) params.append("duration", filters.duration);
      
      const response = await fetch(`${this.baseUrl}?${params.toString()}`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Gagal mengambil data categories");
      }
      
      return result;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  // Ambil category berdasarkan ID
  async getCategoryById(id: number): Promise<ApiResponse<Category>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Gagal mengambil data category");
      }
      
      return result;
    } catch (error) {
      console.error("Error fetching category:", error);
      throw error;
    }
  }

  // Buat category baru
  async createCategory(data: CategoryCreateData): Promise<ApiResponse<{ id: number }>> {
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
        throw new Error(result.message || "Gagal membuat category");
      }
      
      return result;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  }

  // Update category
  async updateCategory(id: number, data: CategoryUpdateData): Promise<ApiResponse<void>> {
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
        throw new Error(result.message || "Gagal mengupdate category");
      }
      
      return result;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  }

  // Hapus category
  async deleteCategory(id: number): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Gagal menghapus category");
      }
      
      return result;
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  }

  // Ambil daftar categories untuk dropdown
  async getCategoryOptions(tryout_id?: number): Promise<ApiResponse<{ id: number; name: string; description: string; tryout_title: string }[]>> {
    try {
      const params = tryout_id ? `?tryout_id=${tryout_id}` : "";
      const response = await fetch(`${this.baseUrl}/options${params}`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Gagal mengambil data category options");
      }
      
      return result;
    } catch (error) {
      console.error("Error fetching category options:", error);
      throw error;
    }
  }
}

export const categoryService = new CategoryService();
