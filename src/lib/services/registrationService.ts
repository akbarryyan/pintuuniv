// Registration interface and types
export interface Registration {
  id: number;
  user_id: number;
  tryout_id: number;
  registration_date: string;
  status: 'registered' | 'approved' | 'rejected' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method: string;
  payment_reference: string;
  payment_date: string;
  approved_by: number;
  approved_at: string;
  notes: string;
  created_at: string;
  updated_at: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  user_school: string;
  user_grade: string;
  tryout_title: string;
  tryout_description: string;
  tryout_start_date: string;
  tryout_end_date: string;
  tryout_passing_score: number;
  tryout_total_questions: number;
  tryout_type: 'free' | 'paid';
  approved_by_name: string;
}

export interface CreateRegistrationData {
  user_id: number;
  tryout_id: number;
  payment_method?: string;
  payment_reference?: string;
  notes?: string;
}

export interface UpdateRegistrationData {
  status?: 'registered' | 'approved' | 'rejected' | 'cancelled';
  payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method?: string;
  payment_reference?: string;
  payment_date?: string;
  approved_by?: number;
  approved_at?: string;
  notes?: string;
}

export interface RegistrationFilters {
  status?: string;
  payment_status?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface RegistrationResponse {
  success: boolean;
  data: Registration[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
}

export interface SingleRegistrationResponse {
  success: boolean;
  data: Registration;
  message?: string;
}

// Registration service functions
export class RegistrationService {
  private static baseUrl = '/api/sys/registrations';

  // Get all registrations with filters
  static async getRegistrations(filters: RegistrationFilters = {}): Promise<RegistrationResponse> {
    const params = new URLSearchParams();
    
    if (filters.status) params.append('status', filters.status);
    if (filters.payment_status) params.append('payment_status', filters.payment_status);
    if (filters.search) params.append('search', filters.search);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

    const response = await fetch(`${this.baseUrl}?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch registrations: ${response.statusText}`);
    }
    
    return response.json();
  }

  // Get single registration by ID
  static async getRegistration(id: number): Promise<SingleRegistrationResponse> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch registration: ${response.statusText}`);
    }
    
    return response.json();
  }

  // Create new registration
  static async createRegistration(data: CreateRegistrationData): Promise<SingleRegistrationResponse> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create registration: ${response.statusText}`);
    }
    
    return response.json();
  }

  // Update registration
  static async updateRegistration(id: number, data: UpdateRegistrationData): Promise<SingleRegistrationResponse> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update registration: ${response.statusText}`);
    }
    
    return response.json();
  }

  // Delete registration
  static async deleteRegistration(id: number): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete registration: ${response.statusText}`);
    }
    
    return response.json();
  }

  // Approve registration
  static async approveRegistration(id: number, approvedBy: number, notes?: string): Promise<SingleRegistrationResponse> {
    return this.updateRegistration(id, {
      status: 'approved',
      payment_status: 'paid',
      approved_by: approvedBy,
      approved_at: new Date().toISOString(),
      notes: notes || 'Registration approved by admin'
    });
  }

  // Reject registration
  static async rejectRegistration(id: number, approvedBy: number, notes?: string): Promise<SingleRegistrationResponse> {
    return this.updateRegistration(id, {
      status: 'rejected',
      approved_by: approvedBy,
      approved_at: new Date().toISOString(),
      notes: notes || 'Registration rejected by admin'
    });
  }

  // Cancel registration
  static async cancelRegistration(id: number, notes?: string): Promise<SingleRegistrationResponse> {
    return this.updateRegistration(id, {
      status: 'cancelled',
      notes: notes || 'Registration cancelled'
    });
  }
}
