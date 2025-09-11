'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePageTransition } from '@/lib/hooks';
import Sidebar from '@/components/sys/Sidebar';
import TopHeader from '@/components/sys/TopHeader';
import { 
  SearchFilter, 
  ActionButtons, 
  TransactionsTable, 
  StatsGrid,
  Transaction,
  TransactionFilters,
  TransactionStats
} from '@/components/sys/transactions';
import { toast } from 'sonner';

export default function TransactionsPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { isLoading: pageTransitionLoading } = usePageTransition();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('transactions');

  // State untuk data
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<TransactionStats>({
    total_transactions: 0,
    total_revenue: 0,
    pending_payments: 0,
    successful_payments: 0,
    failed_payments: 0,
    refunded_payments: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // State untuk filter
  const [filters, setFilters] = useState<TransactionFilters>({
    search: '',
    payment_status: '',
    registration_status: '',
    payment_method: '',
    date_range: '',
  });

  // Mock data untuk development
  const mockTransactions: Transaction[] = [
    {
      id: 1,
      user_id: 1,
      tryout_id: 1,
      user_name: 'Ahmad Bayu Pratama',
      user_email: 'ahmad@example.com',
      tryout_title: 'Tryout UTBK 2024 - Paket A',
      tryout_type: 'paid',
      tryout_price: 150000,
      payment_method: 'qris',
      payment_reference: 'QRIS-001',
      payment_status: 'paid',
      registration_status: 'approved',
      payment_date: '2024-01-15T10:30:00Z',
      registration_date: '2024-01-15T10:30:00Z',
      approved_by: 1,
      approved_at: '2024-01-15T11:00:00Z',
      notes: null,
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-15T11:00:00Z',
    },
    {
      id: 2,
      user_id: 2,
      tryout_id: 2,
      user_name: 'Sarah Putri',
      user_email: 'sarah@example.com',
      tryout_title: 'Tryout UTBK 2024 - Paket B',
      tryout_type: 'paid',
      tryout_price: 200000,
      payment_method: 'e_wallet',
      payment_reference: 'EW-002',
      payment_status: 'pending',
      registration_status: 'registered',
      payment_date: null,
      registration_date: '2024-01-16T14:20:00Z',
      approved_by: null,
      approved_at: null,
      notes: null,
      created_at: '2024-01-16T14:20:00Z',
      updated_at: '2024-01-16T14:20:00Z',
    },
    {
      id: 3,
      user_id: 3,
      tryout_id: 3,
      user_name: 'Rizki Aditya',
      user_email: 'rizki@example.com',
      tryout_title: 'Tryout UTBK 2024 - Paket C',
      tryout_type: 'paid',
      tryout_price: 300000,
      payment_method: 'bank_transfer',
      payment_reference: 'BT-003',
      payment_status: 'failed',
      registration_status: 'cancelled',
      payment_date: null,
      registration_date: '2024-01-17T09:15:00Z',
      approved_by: null,
      approved_at: null,
      notes: 'Payment timeout',
      created_at: '2024-01-17T09:15:00Z',
      updated_at: '2024-01-17T09:45:00Z',
    },
  ];

  const mockStats: TransactionStats = {
    total_transactions: 3,
    total_revenue: 650000,
    pending_payments: 1,
    successful_payments: 1,
    failed_payments: 1,
    refunded_payments: 0,
  };

  // Load data
  useEffect(() => {
    if (isAuthenticated) {
      loadTransactions();
      loadStats();
    }
  }, [isAuthenticated]);

  // Reload data when filters change
  useEffect(() => {
    if (isAuthenticated) {
      loadTransactions();
    }
  }, [filters]);

  const loadTransactions = async () => {
    try {
      setIsLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.payment_status) params.append('payment_status', filters.payment_status);
      if (filters.registration_status) params.append('registration_status', filters.registration_status);
      if (filters.payment_method) params.append('payment_method', filters.payment_method);
      if (filters.date_range) params.append('date_range', filters.date_range);
      
      const response = await fetch(`/api/sys/transactions?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setTransactions(data.data);
      } else {
        throw new Error(data.error || 'Failed to load transactions');
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
      // Fallback to mock data for development
      setTransactions(mockTransactions);
      toast.error('Gagal memuat data transaksi, menggunakan data mock');
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch('/api/sys/transactions/stats');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      } else {
        throw new Error(data.error || 'Failed to load stats');
      }
    } catch (error) {
      console.error('Error loading stats:', error);
      // Fallback to mock data for development
      setStats(mockStats);
    }
  };

  const handleFiltersChange = (newFilters: TransactionFilters) => {
    setFilters(newFilters);
    // Data will be reloaded automatically via useEffect
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      payment_status: '',
      registration_status: '',
      payment_method: '',
      date_range: '',
    });
  };

  const handleApprove = async (id: number) => {
    try {
      const response = await fetch(`/api/sys/transactions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'approve',
          notes: 'Approved by admin'
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Transaksi berhasil diapprove');
        loadTransactions();
        loadStats();
      } else {
        throw new Error(data.error || 'Failed to approve transaction');
      }
    } catch (error) {
      console.error('Error approving transaction:', error);
      toast.error('Gagal approve transaksi');
    }
  };

  const handleReject = async (id: number) => {
    try {
      const response = await fetch(`/api/sys/transactions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'reject',
          notes: 'Rejected by admin'
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Transaksi berhasil direject');
        loadTransactions();
        loadStats();
      } else {
        throw new Error(data.error || 'Failed to reject transaction');
      }
    } catch (error) {
      console.error('Error rejecting transaction:', error);
      toast.error('Gagal reject transaksi');
    }
  };

  const handleViewDetails = (transaction: Transaction) => {
    // TODO: Implement view details modal
    console.log('View details:', transaction);
    toast.info('Fitur detail transaksi akan segera hadir');
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    toast.info('Fitur export akan segera hadir');
  };

  const handleRefresh = () => {
    loadTransactions();
    loadStats();
  };

  if (authLoading || pageTransitionLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat halaman transaksi...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-white/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          pageTitle="Transaction Management"
          pageDescription="Kelola transaksi pembelian tryout berbayar"
        />
        
        <main className="flex-1 p-4 lg:p-8 overflow-auto" data-main-content>
          {/* Stats Grid */}
          <StatsGrid stats={stats} isLoading={isLoading} />

          {/* Action Buttons */}
          <ActionButtons 
            onExport={handleExport}
            onRefresh={handleRefresh}
            onViewDetails={() => handleViewDetails(mockTransactions[0])}
            isLoading={isLoading}
          />

          {/* Search and Filter */}
          <SearchFilter 
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />

          {/* Transactions Table */}
          <TransactionsTable 
            transactions={transactions}
            onApprove={handleApprove}
            onReject={handleReject}
            onViewDetails={handleViewDetails}
            isLoading={isLoading}
          />
        </main>
      </div>
    </div>
  );
}
