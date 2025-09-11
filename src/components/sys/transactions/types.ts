export interface Transaction {
  id: number;
  user_id: number;
  tryout_id: number;
  user_name: string;
  user_email: string;
  tryout_title: string;
  tryout_type: 'free' | 'paid';
  tryout_price: number;
  payment_method: string;
  payment_reference: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  registration_status: 'registered' | 'approved' | 'rejected' | 'cancelled';
  payment_date: string | null;
  registration_date: string;
  approved_by: number | null;
  approved_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface TransactionFilters {
  search: string;
  payment_status: string;
  registration_status: string;
  payment_method: string;
  date_range: string;
}

export interface TransactionStats {
  total_transactions: number;
  total_revenue: number;
  pending_payments: number;
  successful_payments: number;
  failed_payments: number;
  refunded_payments: number;
}