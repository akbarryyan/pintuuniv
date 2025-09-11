"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, CreditCard, Smartphone, Building2, QrCode } from "lucide-react";
import { Sidebar, TopHeader } from "@/components/sys";
import { useAuth } from "@/contexts/AuthContext";
import { usePageTransition } from "@/lib/hooks";
import { toast } from "sonner";

interface PaymentMethod {
  id: string;
  name: string;
  type: 'qris' | 'e_wallet' | 'bank_transfer';
  icon: string;
  color: string;
  isActive: boolean;
  isPopular: boolean;
  qrCode?: string;
  accounts: PaymentAccount[];
}

interface PaymentAccount {
  id: string;
  name: string;
  account: string;
  accountName: string;
  isActive: boolean;
}

export default function PaymentsPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { isLoading: pageTransitionLoading } = usePageTransition();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("payments");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [methodToDelete, setMethodToDelete] = useState<string | null>(null);
  const [isAddingMethod, setIsAddingMethod] = useState(false);

  // Mock data untuk payment methods
  const mockPaymentMethods: PaymentMethod[] = [
    {
      id: "qris",
      name: "QRIS",
      type: "qris",
      icon: "QrCode",
      color: "bg-green-500",
      isActive: true,
      isPopular: true,
      qrCode: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZmZmZiIvPgogIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiMwMDAwMDAiLz4KICA8cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI2ZmZmZmZiIvPgogIDxyZWN0IHg9IjE0MCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI2ZmZmZmZiIvPgogIDxyZWN0IHg9IjIwIiB5PSIxNDAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI2ZmZmZmZiIvPgogIDxyZWN0IHg9IjE0MCIgeT0iMTQwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmZmZmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjExMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMDAwMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5RUklTPC90ZXh0Pgo8L3N2Zz4K",
      accounts: []
    },
    {
      id: "e_wallet",
      name: "E-Wallet",
      type: "e_wallet",
      icon: "Smartphone",
      color: "bg-blue-500",
      isActive: true,
      isPopular: false,
      accounts: [
        { id: "1", name: "GoPay", account: "08123456789", accountName: "PintuUniv", isActive: true },
        { id: "2", name: "OVO", account: "08123456789", accountName: "PintuUniv", isActive: true },
        { id: "3", name: "DANA", account: "08123456789", accountName: "PintuUniv", isActive: true },
        { id: "4", name: "ShopeePay", account: "08123456789", accountName: "PintuUniv", isActive: false }
      ]
    },
    {
      id: "bank_transfer",
      name: "Transfer Bank",
      type: "bank_transfer",
      icon: "Building2",
      color: "bg-purple-500",
      isActive: true,
      isPopular: false,
      accounts: [
        { id: "1", name: "BCA", account: "1234567890", accountName: "PintuUniv", isActive: true },
        { id: "2", name: "Mandiri", account: "1234567890", accountName: "PintuUniv", isActive: true },
        { id: "3", name: "BRI", account: "1234567890", accountName: "PintuUniv", isActive: true },
        { id: "4", name: "BNI", account: "1234567890", accountName: "PintuUniv", isActive: false }
      ]
    }
  ];

  // Load data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const loadData = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPaymentMethods(mockPaymentMethods);
        setLoading(false);
      };
      loadData();
    }
  }, [isAuthenticated]);

  const filteredMethods = paymentMethods.filter((method) => {
    const matchesSearch = method.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || method.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "QrCode": return <QrCode className="w-5 h-5" />;
      case "Smartphone": return <Smartphone className="w-5 h-5" />;
      case "Building2": return <Building2 className="w-5 h-5" />;
      default: return <CreditCard className="w-5 h-5" />;
    }
  };

  const handleAddMethod = async () => {
    setIsAddingMethod(true);
    
    // Simulasi delay loading
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setEditingMethod(null);
    setShowModal(true);
    setIsAddingMethod(false);
  };

  const handleEditMethod = (method: PaymentMethod) => {
    setEditingMethod(method);
    setShowModal(true);
  };

  const handleDeleteMethod = (methodId: string) => {
    setMethodToDelete(methodId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (methodToDelete) {
      setPaymentMethods(prev => prev.filter(m => m.id !== methodToDelete));
      toast.success("Metode pembayaran berhasil dihapus");
      setShowDeleteModal(false);
      setMethodToDelete(null);
    }
  };

  const toggleMethodStatus = (methodId: string) => {
    setPaymentMethods(prev => prev.map(m => 
      m.id === methodId ? { ...m, isActive: !m.isActive } : m
    ));
    toast.success("Status metode pembayaran berhasil diubah");
  };

  const toggleAccountStatus = (methodId: string, accountId: string) => {
    setPaymentMethods(prev => prev.map(method => 
      method.id === methodId 
        ? {
            ...method,
            accounts: method.accounts.map(account =>
              account.id === accountId 
                ? { ...account, isActive: !account.isActive }
                : account
            )
          }
        : method
    ));
    toast.success("Status akun berhasil diubah");
  };

  if (authLoading || pageTransitionLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat halaman payments...</p>
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
          pageTitle="Metode Pembayaran"
          pageDescription="Kelola metode pembayaran dan tujuan transfer"
        />

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto" data-main-content>
          {/* Header Actions */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari metode pembayaran..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>

              {/* Filter */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Semua Tipe</option>
                <option value="qris">QRIS</option>
                <option value="e_wallet">E-Wallet</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
            </div>

            {/* Add Button */}
            <button
              onClick={handleAddMethod}
              disabled={isAddingMethod}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAddingMethod ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Memuat...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Tambah Metode
                </>
              )}
            </button>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat data...</p>
            </div>
          </div>
          ) : (
            /* Payment Methods Grid */
            <div className="grid gap-6">
              {filteredMethods.map((method) => (
                <div key={method.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  {/* Method Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center text-white`}>
                        {getIcon(method.icon)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{method.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            method.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {method.isActive ? 'Aktif' : 'Nonaktif'}
                          </span>
                          {method.isPopular && (
                            <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                              Populer
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleMethodStatus(method.id)}
                        className={`px-3 py-1 text-sm font-medium rounded-md ${
                          method.isActive
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {method.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                      </button>
                      <button
                        onClick={() => handleEditMethod(method)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteMethod(method.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* QR Code untuk QRIS */}
                  {method.type === 'qris' && method.qrCode && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">QR Code:</h4>
                      <div className="flex items-center gap-4">
                        <img src={method.qrCode} alt="QR Code" className="w-24 h-24" />
                        <div className="text-sm text-gray-600">
                          <p>QR Code ini akan ditampilkan di halaman pembayaran user</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Accounts untuk E-Wallet dan Bank Transfer */}
                  {method.accounts.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Tujuan Transfer:</h4>
                      <div className="grid gap-2">
                        {method.accounts.map((account) => (
                          <div key={account.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{account.name}</div>
                              <div className="text-sm text-gray-600">
                                {method.type === 'e_wallet' ? 'Nomor:' : 'Rekening:'} {account.account}
                              </div>
                              <div className="text-sm text-gray-600">A.n: {account.accountName}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                account.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {account.isActive ? 'Aktif' : 'Nonaktif'}
                              </span>
                              <button
                                onClick={() => toggleAccountStatus(method.id, account.id)}
                                className={`px-2 py-1 text-xs font-medium rounded-md ${
                                  account.isActive
                                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                                }`}
                              >
                                {account.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {filteredMethods.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💳</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada metode pembayaran</h3>
                  <p className="text-gray-600 mb-4">Mulai dengan menambahkan metode pembayaran pertama</p>
                  <button
                    onClick={handleAddMethod}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Tambah Metode Pembayaran
                  </button>
                </div>
              )}
            </div>
          )}

        </main>
      </div>

      {/* Add/Edit Method Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingMethod ? 'Edit Metode Pembayaran' : 'Tambah Metode Pembayaran'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Metode
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama metode"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue={editingMethod?.name || ''}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipe Metode
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="qris">QRIS</option>
                  <option value="e_wallet">E-Wallet</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warna
                </label>
                <div className="flex gap-2">
                  {['bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-orange-500', 'bg-red-500'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`w-8 h-8 ${color} rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPopular"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isPopular" className="text-sm font-medium text-gray-700">
                  Tandai sebagai populer
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                  Aktifkan metode ini
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingMethod ? 'Update' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl border border-gray-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                ⚠️
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Hapus Metode Pembayaran?
              </h3>
              <p className="text-gray-600 mb-6">
                Apakah Anda yakin ingin menghapus metode pembayaran ini? Tindakan ini tidak dapat dibatalkan.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-3 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-6 py-3 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
