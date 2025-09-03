export interface Tryout {
  id: number;
  title: string;
  description: string;
  total_categories: number;
  total_questions: number;
  total_weight: number;
  passing_score: number;
  is_active: boolean;
  type_tryout: 'free' | 'paid';
  price: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export interface TryoutFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export interface TryoutCreateData {
  title: string;
  description: string;
  passing_score: number;
  is_active: boolean;
  type_tryout: 'free' | 'paid';
  price?: number;
  start_date?: string;
  end_date?: string;
}

export interface TryoutUpdateData extends TryoutCreateData {}

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

class TryoutService {
  private baseUrl = "/api/sys/tryouts";

  // Ambil semua tryouts dengan filter dan pagination
  async getTryouts(filters: TryoutFilters = {}): Promise<ApiResponse<Tryout[]>> {
    try {
      const params = new URLSearchParams();
      
      if (filters.page) params.append("page", filters.page.toString());
      if (filters.limit) params.append("limit", filters.limit.toString());
      if (filters.search) params.append("search", filters.search);
      if (filters.status) params.append("status", filters.status);
      
      const response = await fetch(`${this.baseUrl}?${params.toString()}`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Gagal mengambil data tryouts");
      }
      
      return result;
    } catch (error) {
      console.error("Error fetching tryouts:", error);
      throw error;
    }
  }

  // Ambil tryout berdasarkan ID
  async getTryoutById(id: number): Promise<ApiResponse<Tryout>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Gagal mengambil data tryout");
      }
      
      return result;
    } catch (error) {
      console.error("Error fetching tryout:", error);
      throw error;
    }
  }

  // Buat tryout baru
  async createTryout(data: TryoutCreateData): Promise<ApiResponse<{ id: number }>> {
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
        throw new Error(result.message || "Gagal membuat tryout");
      }
      
      return result;
    } catch (error) {
      console.error("Error creating tryout:", error);
      throw error;
    }
  }

  // Update tryout
  async updateTryout(id: number, data: TryoutUpdateData): Promise<ApiResponse<void>> {
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
        throw new Error(result.message || "Gagal mengupdate tryout");
      }
      
      return result;
    } catch (error) {
      console.error("Error updating tryout:", error);
      throw error;
    }
  }

  // Hapus tryout
  async deleteTryout(id: number): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Gagal menghapus tryout");
      }
      
      return result;
    } catch (error) {
      console.error("Error deleting tryout:", error);
      throw error;
    }
  }

  // Ambil daftar tryouts untuk dropdown
  async getTryoutOptions(): Promise<ApiResponse<{ id: number; title: string; description: string }[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/options`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Gagal mengambil data tryout options");
      }
      
      return result;
    } catch (error) {
      console.error("Error fetching tryout options:", error);
      throw error;
    }
  }
}

export const tryoutService = new TryoutService();
