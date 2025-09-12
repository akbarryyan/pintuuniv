"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  CreditCard,
  Smartphone,
  Building2,
  QrCode,
} from "lucide-react";
import { Sidebar, TopHeader } from "@/components/sys";
import { useAuth } from "@/contexts/AuthContext";
import { usePageTransition } from "@/lib/hooks";
import { toast } from "sonner";

interface PaymentMethod {
  id: number;
  name: string;
  type: "qris" | "e_wallet" | "bank_transfer";
  icon: string;
  color: string;
  qr_code?: string;
  logo?: string;
  is_active: boolean;
  is_popular: boolean;
  created_at: string;
  updated_at: string;
  accounts: PaymentAccount[];
}

interface PaymentAccount {
  id: number;
  payment_method_id: number;
  name: string;
  account: string;
  account_name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
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
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(
    null
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [methodToDelete, setMethodToDelete] = useState<number | null>(null);
  const [isDeletingMethod, setIsDeletingMethod] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<{
    methodId: number;
    accountId: number;
  } | null>(null);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const [selectedMethodId, setSelectedMethodId] = useState<number | null>(null);
  const [isAddingMethod, setIsAddingMethod] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    type: "qris" as "qris" | "e_wallet" | "bank_transfer",
    color: "bg-green-500",
    is_popular: false,
    is_active: true,
    qr_code: null as File | null,
    qr_code_preview: "",
    logo: null as File | null,
    logo_preview: "",
    account_name: "",
    account_number: "",
  });

  // Form state untuk account
  const [accountFormData, setAccountFormData] = useState({
    name: "",
    account: "",
    account_name: "",
    is_active: true,
  });

  // Load data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const loadData = async () => {
        setLoading(true);
        try {
          const response = await fetch("/api/sys/payment-methods");
          if (response.ok) {
            const data = await response.json();
            setPaymentMethods(data);
          } else {
            toast.error("Gagal memuat data metode pembayaran");
          }
        } catch (error) {
          console.error("Error loading payment methods:", error);
          toast.error("Terjadi kesalahan saat memuat data");
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }
  }, [isAuthenticated]);

  const filteredMethods = paymentMethods.filter((method) => {
    const matchesSearch = method.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || method.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "QrCode":
        return <QrCode className="w-5 h-5" />;
      case "Smartphone":
        return <Smartphone className="w-5 h-5" />;
      case "Building2":
        return <Building2 className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  const handleAddMethod = async () => {
    setIsAddingMethod(true);

    // Simulasi delay loading
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Reset form data
    setFormData({
      name: "",
      type: "qris",
      color: "bg-green-500",
      is_popular: false,
      is_active: true,
      qr_code: null,
      qr_code_preview: "",
      logo: null,
      logo_preview: "",
      account_name: "",
      account_number: "",
    });

    setEditingMethod(null);
    setShowModal(true);
    setIsAddingMethod(false);
  };

  const handleEditMethod = (method: PaymentMethod) => {
    setEditingMethod(method);
    setFormData({
      name: method.name,
      type: method.type,
      color: method.color,
      is_popular: method.is_popular,
      is_active: method.is_active,
      qr_code: null,
      qr_code_preview: method.qr_code || "",
      logo: null,
      logo_preview: method.logo || "",
      account_name: method.accounts[0]?.account_name || "",
      account_number: method.accounts[0]?.account || "",
    });
    setShowModal(true);
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    uploadType: "qrCode" | "logo"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Hanya file gambar yang diperbolehkan");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 5MB");
        return;
      }

      if (uploadType === "qrCode") {
        setFormData((prev) => ({
          ...prev,
          qr_code: file,
          qr_code_preview: URL.createObjectURL(file),
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          logo: file,
          logo_preview: URL.createObjectURL(file),
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Nama metode harus diisi");
      return;
    }

    if (
      formData.type === "qris" &&
      !formData.qr_code &&
      !formData.qr_code_preview
    ) {
      toast.error("Gambar QRIS harus diupload");
      return;
    }

    if (formData.type === "e_wallet" || formData.type === "bank_transfer") {
      if (!formData.account_name.trim()) {
        toast.error("Atas nama rekening harus diisi");
        return;
      }
      if (!formData.account_number.trim()) {
        toast.error("Nomor tujuan transfer harus diisi");
        return;
      }
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("color", formData.color);
      formDataToSend.append("is_popular", formData.is_popular.toString());
      formDataToSend.append("is_active", formData.is_active.toString());

      if (formData.qr_code) {
        formDataToSend.append("qr_code", formData.qr_code);
      }
      if (formData.logo) {
        formDataToSend.append("logo", formData.logo);
      }
      if (formData.account_name) {
        formDataToSend.append("account_name", formData.account_name);
      }
      if (formData.account_number) {
        formDataToSend.append("account_number", formData.account_number);
      }

      const url = editingMethod
        ? `/api/sys/payment-methods/${editingMethod.id}`
        : "/api/sys/payment-methods";

      const method = editingMethod ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.json();

        if (editingMethod) {
          setPaymentMethods((prev) =>
            prev.map((m) => (m.id === editingMethod.id ? result : m))
          );
          toast.success("Metode pembayaran berhasil diupdate");
        } else {
          setPaymentMethods((prev) => [...prev, result]);
          toast.success("Metode pembayaran berhasil ditambahkan");
        }

        setShowModal(false);
        setEditingMethod(null);
      } else {
        const error = await response.json();
        toast.error(error.message || "Gagal menyimpan metode pembayaran");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleDeleteMethod = (methodId: number) => {
    setMethodToDelete(methodId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (methodToDelete) {
      setIsDeletingMethod(true);

      try {
        // Simulasi delay loading
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const response = await fetch(
          `/api/sys/payment-methods/${methodToDelete}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setPaymentMethods((prev) =>
            prev.filter((m) => m.id !== methodToDelete)
          );
          toast.success("Metode pembayaran berhasil dihapus");
        } else {
          toast.error("Gagal menghapus metode pembayaran");
        }
      } catch (error) {
        console.error("Error deleting method:", error);
        toast.error("Terjadi kesalahan saat menghapus data");
      } finally {
        setIsDeletingMethod(false);
        setShowDeleteModal(false);
        setMethodToDelete(null);
      }
    }
  };

  const toggleMethodStatus = async (methodId: number) => {
    try {
      const response = await fetch(
        `/api/sys/payment-methods/${methodId}/toggle-status`,
        {
          method: "PATCH",
        }
      );

      if (response.ok) {
        const updatedMethod = await response.json();
        setPaymentMethods((prev) =>
          prev.map((m) => (m.id === methodId ? updatedMethod : m))
        );
        toast.success("Status metode pembayaran berhasil diubah");
      } else {
        toast.error("Gagal mengubah status metode pembayaran");
      }
    } catch (error) {
      console.error("Error toggling method status:", error);
      toast.error("Terjadi kesalahan saat mengubah status");
    }
  };

  const toggleAccountStatus = async (methodId: number, accountId: number) => {
    try {
      // Find current account to get its current status
      const method = paymentMethods.find((m) => m.id === methodId);
      const account = method?.accounts.find((a) => a.id === accountId);

      if (!account) {
        toast.error("Akun tidak ditemukan");
        return;
      }

      const response = await fetch(
        `/api/sys/payment-accounts/${accountId}/toggle`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_active: !account.is_active,
          }),
        }
      );

      if (response.ok) {
        // Update local state
        setPaymentMethods((prev) =>
          prev.map((method) =>
            method.id === methodId
              ? {
                  ...method,
                  accounts: method.accounts.map((acc) =>
                    acc.id === accountId
                      ? { ...acc, is_active: !acc.is_active }
                      : acc
                  ),
                }
              : method
          )
        );
        toast.success("Status akun berhasil diubah");
      } else {
        toast.error("Gagal mengubah status akun");
      }
    } catch (error) {
      console.error("Error toggling account status:", error);
      toast.error("Terjadi kesalahan saat mengubah status akun");
    }
  };

  const handleDeleteAccount = (methodId: number, accountId: number) => {
    setAccountToDelete({ methodId, accountId });
    setShowDeleteAccountModal(true);
  };

  const confirmDeleteAccount = async () => {
    if (accountToDelete) {
      setIsDeletingAccount(true);

      try {
        // Simulasi delay loading
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const response = await fetch(
          `/api/sys/payment-accounts/${accountToDelete.accountId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setPaymentMethods((prev) =>
            prev.map((method) =>
              method.id === accountToDelete.methodId
                ? {
                    ...method,
                    accounts: method.accounts.filter(
                      (account) => account.id !== accountToDelete.accountId
                    ),
                  }
                : method
            )
          );
          toast.success("Akun pembayaran berhasil dihapus");
        } else {
          toast.error("Gagal menghapus akun pembayaran");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        toast.error("Terjadi kesalahan saat menghapus akun");
      } finally {
        setIsDeletingAccount(false);
        setShowDeleteAccountModal(false);
        setAccountToDelete(null);
      }
    }
  };

  const handleAddAccount = (methodId: number) => {
    setSelectedMethodId(methodId);
    setAccountFormData({
      name: "",
      account: "",
      account_name: "",
      is_active: true,
    });
    setShowAddAccountModal(true);
  };

  const handleAccountFormChange = (field: string, value: any) => {
    setAccountFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accountFormData.name.trim()) {
      toast.error("Nama harus diisi");
      return;
    }
    if (!accountFormData.account.trim()) {
      toast.error("Nomor rekening/e-wallet harus diisi");
      return;
    }
    if (!accountFormData.account_name.trim()) {
      toast.error("Atas nama rekening harus diisi");
      return;
    }

    try {
      const response = await fetch("/api/sys/payment-accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_method_id: selectedMethodId,
          name: accountFormData.name,
          account: accountFormData.account,
          account_name: accountFormData.account_name,
          is_active: accountFormData.is_active,
        }),
      });

      if (response.ok) {
        const newAccount = await response.json();

        // Update local state
        setPaymentMethods((prev) =>
          prev.map((method) =>
            method.id === selectedMethodId
              ? {
                  ...method,
                  accounts: [...method.accounts, newAccount],
                }
              : method
          )
        );

        toast.success("Akun pembayaran berhasil ditambahkan");
        setShowAddAccountModal(false);
        setSelectedMethodId(null);
      } else {
        const error = await response.json();
        toast.error(error.message || "Gagal menambahkan akun pembayaran");
      }
    } catch (error) {
      console.error("Error adding account:", error);
      toast.error("Terjadi kesalahan saat menambahkan akun");
    }
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
                <div
                  key={method.id}
                  className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
                >
                  {/* Method Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      {/* Logo/Icon Display */}
                      {method.logo &&
                      (method.type === "e_wallet" ||
                        method.type === "bank_transfer") ? (
                        <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                          <img
                            src={method.logo}
                            alt={`${method.name} logo`}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                      ) : (
                        <div
                          className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center text-white`}
                        >
                          {getIcon(method.icon)}
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {method.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              method.is_active
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {method.is_active ? "Aktif" : "Nonaktif"}
                          </span>
                          {Boolean(method.is_popular) && (
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
                          method.is_active
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                      >
                        {method.is_active ? "Nonaktifkan" : "Aktifkan"}
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
                  {method.type === "qris" && method.qr_code && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">
                        QR Code:
                      </h4>
                      <div className="flex items-center gap-4">
                        <img
                          src={method.qr_code}
                          alt="QR Code"
                          className="w-24 h-24"
                        />
                        <div className="text-sm text-gray-600">
                          <p>
                            QR Code ini akan ditampilkan di halaman pembayaran
                            user
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Logo untuk E-Wallet dan Bank Transfer */}
                  {(method.type === "e_wallet" ||
                    method.type === "bank_transfer") &&
                    method.logo && (
                      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Logo:
                        </h4>
                        <div className="flex items-center gap-4">
                          <img
                            src={method.logo}
                            alt={`${method.name} Logo`}
                            className="w-24 h-24 object-contain"
                          />
                          <div className="text-sm text-gray-600">
                            <p>
                              Logo ini akan ditampilkan di halaman pembayaran
                              user
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                  {/* Accounts untuk E-Wallet dan Bank Transfer */}
                  {(method.type === "e_wallet" ||
                    method.type === "bank_transfer") && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">
                          Tujuan Transfer:
                        </h4>
                        <button
                          onClick={() => handleAddAccount(method.id)}
                          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Tambah Akun
                        </button>
                      </div>

                      {method.accounts.length > 0 ? (
                        <div className="grid gap-2">
                          {method.accounts.map((account) => (
                            <div
                              key={account.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex-1">
                                <div className="font-medium text-gray-900">
                                  {account.name}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {method.type === "e_wallet"
                                    ? "Nomor:"
                                    : "Rekening:"}{" "}
                                  {account.account}
                                </div>
                                <div className="text-sm text-gray-600">
                                  A.n: {account.account_name}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    account.is_active
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {account.is_active ? "Aktif" : "Nonaktif"}
                                </span>
                                <button
                                  onClick={() =>
                                    toggleAccountStatus(method.id, account.id)
                                  }
                                  className={`px-2 py-1 text-xs font-medium rounded-md ${
                                    account.is_active
                                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                                      : "bg-green-100 text-green-700 hover:bg-green-200"
                                  }`}
                                >
                                  {account.is_active
                                    ? "Nonaktifkan"
                                    : "Aktifkan"}
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteAccount(method.id, account.id)
                                  }
                                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                  title="Hapus akun"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 bg-gray-50 rounded-lg">
                          <div className="text-gray-400 mb-2">
                            <CreditCard className="w-8 h-8 mx-auto" />
                          </div>
                          <p className="text-sm text-gray-600">
                            Belum ada akun pembayaran untuk metode ini
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {filteredMethods.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💳</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Tidak ada metode pembayaran
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Mulai dengan menambahkan metode pembayaran pertama
                  </p>
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
                {editingMethod
                  ? "Edit Metode Pembayaran"
                  : "Tambah Metode Pembayaran"}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingMethod(null);
                  setFormData({
                    name: "",
                    type: "qris",
                    color: "bg-green-500",
                    is_popular: false,
                    is_active: true,
                    qr_code: null,
                    qr_code_preview: "",
                    logo: null,
                    logo_preview: "",
                    account_name: "",
                    account_number: "",
                  });
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Metode
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama metode"
                  value={formData.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipe Metode
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    handleFormChange(
                      "type",
                      e.target.value as "qris" | "e_wallet" | "bank_transfer"
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="qris">QRIS</option>
                  <option value="e_wallet">E-Wallet</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
              </div>

              {/* QRIS Upload Section */}
              {formData.type === "qris" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Gambar QRIS
                  </label>
                  <div className="space-y-3">
                    {/* File Upload */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "qrCode")}
                        className="hidden"
                        id="qr-upload"
                      />
                      <label
                        htmlFor="qr-upload"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        <QrCode className="w-8 h-8 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {formData.qr_code
                            ? "Ganti gambar QRIS"
                            : "Klik untuk upload gambar QRIS"}
                        </span>
                        <span className="text-xs text-gray-500">
                          PNG, JPG, JPEG (max 5MB)
                        </span>
                      </label>
                    </div>

                    {/* Preview */}
                    {formData.qr_code_preview && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Preview:
                        </p>
                        <div className="border border-gray-200 rounded-lg p-2 max-w-xs mx-auto">
                          <img
                            src={formData.qr_code_preview}
                            alt="QRIS Preview"
                            className="w-full h-auto max-h-32 object-contain"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Logo Upload untuk E-Wallet dan Bank Transfer */}
              {(formData.type === "e_wallet" ||
                formData.type === "bank_transfer") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Logo
                  </label>
                  <div className="space-y-3">
                    {/* File Upload */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "logo")}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label
                        htmlFor="logo-upload"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        {formData.type === "e_wallet" ? (
                          <Smartphone className="w-8 h-8 text-gray-400" />
                        ) : (
                          <Building2 className="w-8 h-8 text-gray-400" />
                        )}
                        <span className="text-sm text-gray-600">
                          {formData.logo
                            ? "Ganti logo"
                            : "Klik untuk upload logo"}
                        </span>
                        <span className="text-xs text-gray-500">
                          PNG, JPG, JPEG (max 5MB)
                        </span>
                      </label>
                    </div>

                    {/* Preview */}
                    {formData.logo_preview && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Preview:
                        </p>
                        <div className="border border-gray-200 rounded-lg p-2 max-w-xs mx-auto">
                          <img
                            src={formData.logo_preview}
                            alt="Logo Preview"
                            className="w-full h-auto max-h-32 object-contain"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Form fields untuk E-Wallet dan Bank Transfer */}
              {(formData.type === "e_wallet" ||
                formData.type === "bank_transfer") && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Atas Nama Rekening
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan nama pemilik rekening"
                      value={formData.account_name}
                      onChange={(e) =>
                        handleFormChange("account_name", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {formData.type === "e_wallet"
                        ? "Nomor E-Wallet"
                        : "Nomor Rekening"}
                    </label>
                    <input
                      type="text"
                      placeholder={
                        formData.type === "e_wallet"
                          ? "Masukkan nomor e-wallet"
                          : "Masukkan nomor rekening"
                      }
                      value={formData.account_number}
                      onChange={(e) =>
                        handleFormChange("account_number", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warna
                </label>
                <div className="flex gap-2">
                  {[
                    "bg-green-500",
                    "bg-blue-500",
                    "bg-purple-500",
                    "bg-orange-500",
                    "bg-red-500",
                  ].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handleFormChange("color", color)}
                      className={`w-8 h-8 ${color} rounded-lg border-2 transition-colors ${
                        formData.color === color
                          ? "border-gray-600"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPopular"
                  checked={formData.is_popular}
                  onChange={(e) =>
                    handleFormChange("is_popular", e.target.checked)
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="isPopular"
                  className="text-sm font-medium text-gray-700"
                >
                  Tandai sebagai populer
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.is_active}
                  onChange={(e) =>
                    handleFormChange("is_active", e.target.checked)
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="isActive"
                  className="text-sm font-medium text-gray-700"
                >
                  Aktifkan metode ini
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingMethod(null);
                    setFormData({
                      name: "",
                      type: "qris",
                      color: "bg-green-500",
                      is_popular: false,
                      is_active: true,
                      qr_code: null,
                      qr_code_preview: "",
                      logo: null,
                      logo_preview: "",
                      account_name: "",
                      account_number: "",
                    });
                  }}
                  className="flex-1 px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingMethod ? "Update" : "Simpan"}
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
                Apakah Anda yakin ingin menghapus metode pembayaran ini?
                Tindakan ini tidak dapat dibatalkan.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  disabled={isDeletingMethod}
                  className="px-6 py-3 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Batal
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isDeletingMethod}
                  className="px-6 py-3 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isDeletingMethod ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Menghapus...</span>
                    </>
                  ) : (
                    "Hapus"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeleteAccountModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl border border-gray-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                ⚠️
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Hapus Akun Pembayaran?
              </h3>
              <p className="text-gray-600 mb-6">
                Apakah Anda yakin ingin menghapus akun pembayaran ini? Tindakan
                ini tidak dapat dibatalkan.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => {
                    setShowDeleteAccountModal(false);
                    setAccountToDelete(null);
                  }}
                  disabled={isDeletingAccount}
                  className="px-6 py-3 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Batal
                </button>
                <button
                  onClick={confirmDeleteAccount}
                  disabled={isDeletingAccount}
                  className="px-6 py-3 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isDeletingAccount ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Menghapus...</span>
                    </>
                  ) : (
                    "Hapus"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Account Modal */}
      {showAddAccountModal && selectedMethodId && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Tambah Akun Pembayaran
              </h3>
              <button
                onClick={() => {
                  setShowAddAccountModal(false);
                  setSelectedMethodId(null);
                }}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitAccount} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Akun
                </label>
                <input
                  type="text"
                  value={accountFormData.name}
                  onChange={(e) =>
                    handleAccountFormChange("name", e.target.value)
                  }
                  placeholder="Contoh: BCA Utama"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Rekening/E-Wallet
                </label>
                <input
                  type="text"
                  value={accountFormData.account}
                  onChange={(e) =>
                    handleAccountFormChange("account", e.target.value)
                  }
                  placeholder="Contoh: 1234567890"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Atas Nama Rekening
                </label>
                <input
                  type="text"
                  value={accountFormData.account_name}
                  onChange={(e) =>
                    handleAccountFormChange("account_name", e.target.value)
                  }
                  placeholder="Contoh: John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="account_is_active"
                  checked={accountFormData.is_active}
                  onChange={(e) =>
                    handleAccountFormChange("is_active", e.target.checked)
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="account_is_active"
                  className="ml-2 text-sm text-gray-700"
                >
                  Aktifkan akun setelah dibuat
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddAccountModal(false);
                    setSelectedMethodId(null);
                  }}
                  className="flex-1 px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Tambah Akun
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
