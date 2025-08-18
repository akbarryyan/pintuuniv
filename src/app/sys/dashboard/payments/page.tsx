"use client";

import { useState } from "react";
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Download,
  Eye,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Calendar,
  Users,
  Banknote,
} from "lucide-react";
import { Sidebar, TopHeader } from "@/components/sys";
import { usePageTransition } from "@/lib/hooks";

interface Payment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  method: "credit_card" | "bank_transfer" | "e_wallet" | "cash";
  status: "completed" | "pending" | "failed" | "refunded";
  description: string;
  createdAt: string;
  updatedAt: string;
  transactionId: string;
  gateway: string;
}

interface PaymentStats {
  title: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease" | "neutral";
  icon: React.ReactNode;
  color: string;
}

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

  const getStatusBadge = (status: Payment["status"]) => {
    const badges = {
      completed: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      failed: "bg-red-100 text-red-800 border-red-200",
      refunded: "bg-gray-100 text-gray-800 border-gray-200",
    };

    const labels = {
      completed: "Berhasil",
      pending: "Pending",
      failed: "Gagal",
      refunded: "Refund",
    };

    const icons = {
      completed: <CheckCircle className="w-3 h-3" />,
      pending: <Clock className="w-3 h-3" />,
      failed: <XCircle className="w-3 h-3" />,
      refunded: <RefreshCw className="w-3 h-3" />,
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${badges[status]}`}
      >
        {icons[status]}
        {labels[status]}
      </span>
    );
  };

  const getMethodBadge = (method: Payment["method"]) => {
    const badges = {
      credit_card: "bg-blue-100 text-blue-800",
      bank_transfer: "bg-purple-100 text-purple-800",
      e_wallet: "bg-orange-100 text-orange-800",
      cash: "bg-gray-100 text-gray-800",
    };

    const labels = {
      credit_card: "Kartu Kredit",
      bank_transfer: "Transfer Bank",
      e_wallet: "E-Wallet",
      cash: "Cash",
    };

    const icons = {
      credit_card: <CreditCard className="w-3 h-3" />,
      bank_transfer: <Banknote className="w-3 h-3" />,
      e_wallet: <DollarSign className="w-3 h-3" />,
      cash: <Banknote className="w-3 h-3" />,
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${badges[method]}`}
      >
        {icons[method]}
        {labels[method]}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {paymentStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-2">
                      {stat.changeType === "increase" ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : stat.changeType === "decrease" ? (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      ) : (
                        <RefreshCw className="w-4 h-4 text-gray-500 mr-1" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          stat.changeType === "increase"
                            ? "text-green-600"
                            : stat.changeType === "decrease"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        dari bulan lalu
                      </span>
                    </div>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg text-white`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cari Transaksi
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari nama, email, atau ID transaksi..."
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">Semua Status</option>
                    <option value="completed">Berhasil</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Gagal</option>
                    <option value="refunded">Refund</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Metode
                  </label>
                  <select
                    value={methodFilter}
                    onChange={(e) => setMethodFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">Semua Metode</option>
                    <option value="credit_card">Kartu Kredit</option>
                    <option value="bank_transfer">Transfer Bank</option>
                    <option value="e_wallet">E-Wallet</option>
                    <option value="cash">Cash</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Payments Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Daftar Transaksi
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Menampilkan {filteredPayments.length} transaksi
              </p>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pengguna
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaksi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jumlah
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Metode
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {payment.userName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {payment.userEmail}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {payment.transactionId}
                          </div>
                          <div className="text-sm text-gray-500">
                            {payment.description}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            via {payment.gateway}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {formatCurrency(payment.amount)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getMethodBadge(payment.method)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(payment.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(payment.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedPayment(payment)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Lihat Detail"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {payment.status === "completed" && (
                            <button
                              className="text-green-600 hover:text-green-900"
                              title="Download Invoice"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          )}
                          {payment.status === "failed" && (
                            <button
                              className="text-orange-600 hover:text-orange-900"
                              title="Retry Payment"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  {/* Header: User Info and Amount */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">
                          {payment.userName}
                        </h4>
                        {getStatusBadge(payment.status)}
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {payment.userEmail}
                      </p>
                    </div>
                    <div className="text-right ml-3">
                      <p className="text-lg font-bold text-gray-900">
                        {formatCurrency(payment.amount)}
                      </p>
                      {getMethodBadge(payment.method)}
                    </div>
                  </div>

                  {/* Transaction Details */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500">
                        ID Transaksi
                      </span>
                      <span className="text-xs font-mono text-gray-900">
                        {payment.transactionId}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500">
                        Gateway
                      </span>
                      <span className="text-xs text-gray-700">
                        {payment.gateway}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500">
                        Tanggal
                      </span>
                      <span className="text-xs text-gray-700">
                        {formatDate(payment.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-3">
                    <p className="text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
                      {payment.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => setSelectedPayment(payment)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Lihat Detail"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Detail
                    </button>
                    {payment.status === "completed" && (
                      <button
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Download Invoice"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Invoice
                      </button>
                    )}
                    {payment.status === "failed" && (
                      <button
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        title="Retry Payment"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Retry
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
