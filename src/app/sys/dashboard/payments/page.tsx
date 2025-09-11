"use client";

import { useState } from "react";
import { DollarSign, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { Sidebar, TopHeader } from "@/components/sys";
import {
  StatsCards,
  Filters,
  PaymentsTable,
  Payment,
  PaymentStats,
} from "@/components/sys/payments";
import { usePageTransition } from "@/lib/hooks";

export default function PaymentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("payments");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  // Use page transition hook
  usePageTransition();

  const paymentStats: PaymentStats[] = [
    {
      title: "Total Revenue",
      value: "Rp 124.5M",
      change: "+18.2%",
      changeType: "increase",
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-green-500",
    },
    {
      title: "Transaksi Berhasil",
      value: "1,847",
      change: "+12.5%",
      changeType: "increase",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "bg-blue-500",
    },
    {
      title: "Pending Payments",
      value: "23",
      change: "-8.1%",
      changeType: "decrease",
      icon: <Clock className="w-6 h-6" />,
      color: "bg-yellow-500",
    },
    {
      title: "Success Rate",
      value: "96.8%",
      change: "+2.3%",
      changeType: "increase",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-emerald-500",
    },
  ];

  const paymentsData: Payment[] = [
    {
      id: "PAY001",
      userId: "USR123",
      userName: "Ahmad Rizki",
      userEmail: "ahmad.rizki@email.com",
      amount: 299000,
      method: "credit_card",
      status: "completed",
      description: "Premium Subscription - Tryout SBMPTN",
      createdAt: "2025-08-18T10:30:00Z",
      updatedAt: "2025-08-18T10:32:00Z",
      transactionId: "TXN_001847293",
      gateway: "Midtrans",
    },
    {
      id: "PAY002",
      userId: "USR124",
      userName: "Siti Nurhaliza",
      userEmail: "siti.nurhaliza@email.com",
      amount: 150000,
      method: "e_wallet",
      status: "completed",
      description: "Basic Subscription - Tryout UTBK",
      createdAt: "2025-08-18T09:15:00Z",
      updatedAt: "2025-08-18T09:16:00Z",
      transactionId: "TXN_001847284",
      gateway: "GoPay",
    },
    {
      id: "PAY003",
      userId: "USR125",
      userName: "Budi Santoso",
      userEmail: "budi.santoso@email.com",
      amount: 199000,
      method: "bank_transfer",
      status: "pending",
      description: "Standard Subscription - Tryout Mandiri",
      createdAt: "2025-08-18T08:45:00Z",
      updatedAt: "2025-08-18T08:45:00Z",
      transactionId: "TXN_001847275",
      gateway: "Bank BCA",
    },
    {
      id: "PAY004",
      userId: "USR126",
      userName: "Maya Putri",
      userEmail: "maya.putri@email.com",
      amount: 299000,
      method: "credit_card",
      status: "failed",
      description: "Premium Subscription - Tryout SBMPTN",
      createdAt: "2025-08-18T07:20:00Z",
      updatedAt: "2025-08-18T07:22:00Z",
      transactionId: "TXN_001847266",
      gateway: "Midtrans",
    },
    {
      id: "PAY005",
      userId: "USR127",
      userName: "Doni Prasetyo",
      userEmail: "doni.prasetyo@email.com",
      amount: 399000,
      method: "e_wallet",
      status: "completed",
      description: "Premium Plus Subscription - All Tryouts",
      createdAt: "2025-08-17T16:30:00Z",
      updatedAt: "2025-08-17T16:31:00Z",
      transactionId: "TXN_001847257",
      gateway: "OVO",
    },
  ];

  const filteredPayments = paymentsData.filter((payment) => {
    const matchesSearch =
      payment.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    const matchesMethod =
      methodFilter === "all" || payment.method === methodFilter;

    return matchesSearch && matchesStatus && matchesMethod;
  });

  const handleRefresh = () => {
    console.log("Refreshing payments data...");
  };

  const handleExport = () => {
    console.log("Exporting payments data...");
  };

  const handleViewPayment = (payment: Payment) => {
    setSelectedPayment(payment);
  };

  const handleDownloadInvoice = (payment: Payment) => {
    console.log("Downloading invoice for payment:", payment.id);
  };

  const handleRetryPayment = (payment: Payment) => {
    console.log("Retrying payment:", payment.id);
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

      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          pageTitle="Pembayaran"
          pageDescription="Kelola transaksi dan pembayaran pengguna"
        />

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto" data-main-content>
          {/* Stats Cards */}
          <StatsCards stats={paymentStats} />

          {/* Filters */}
          <Filters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            methodFilter={methodFilter}
            setMethodFilter={setMethodFilter}
            onRefresh={handleRefresh}
            onExport={handleExport}
          />

          {/* Payments Table */}
          <PaymentsTable
            payments={filteredPayments}
            onViewPayment={handleViewPayment}
            onDownloadInvoice={handleDownloadInvoice}
            onRetryPayment={handleRetryPayment}
          />
        </main>
      </div>
    </div>
  );
}
