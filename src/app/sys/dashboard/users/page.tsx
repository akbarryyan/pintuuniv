"use client";

import { useState, useEffect } from "react";
import { X, BookOpen, Star, Trash2 } from "lucide-react";
import { Sidebar, TopHeader } from "@/components/sys";
import {
  HeaderSection,
  FiltersAndSearch,
  UsersTable,
} from "@/components/sys/users";
import { usePageTransition } from "@/lib/hooks";
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  school: string;
  grade: string;
  subscription_type: "free" | "premium";
  target_university: string;
  target_major: string;
  target_score: number | null;
  total_score: number;
  total_attempts: number;
  average_score: number;
  rank_position: number;
  subscription_expires: string | null;
  role: "user" | "admin";
  status: "active" | "inactive" | "suspended";
  last_activity: string | null;
  join_date: string;
  last_active: string;
  tryouts_completed: number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function ManageUsers() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("users");

  // Use page transition hook
  usePageTransition();
  
  // State untuk data dan loading
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  // State untuk filter dan search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [subscriptionFilter, setSubscriptionFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Form states untuk create/edit
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    grade: "",
    subscription_type: "free" as "free" | "premium",
    target_university: "",
    target_major: "",
    target_score: null as number | null,
    password: "",
    status: "active" as "active" | "inactive" | "suspended"
  });

  // Fetch users dari API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        search: searchQuery,
        status: statusFilter,
        subscription: subscriptionFilter,
        sortBy,
        sortOrder
      });

      const response = await fetch(`/api/sys/users?${params}`);
      const result = await response.json();

      if (result.success) {
        setUsers(result.data);
        setPagination(result.pagination);
      } else {
        toast.error(result.message || "Gagal mengambil data users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Gagal mengambil data users");
    } finally {
      setLoading(false);
    }
  };

  // Load users saat komponen mount atau filter berubah
  useEffect(() => {
    fetchUsers();
  }, [pagination.page, searchQuery, statusFilter, subscriptionFilter, sortBy, sortOrder]);

  // Reset pagination saat filter berubah
  useEffect(() => {
    setPagination(prev => ({ ...prev, page: 1 }));
  }, [searchQuery, statusFilter, subscriptionFilter, sortBy, sortOrder]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-emerald-700 bg-emerald-50 border-emerald-200";
      case "inactive":
        return "text-slate-700 bg-slate-50 border-slate-200";
      case "suspended":
        return "text-red-700 bg-red-50 border-red-200";

      default:
        return "text-slate-700 bg-slate-50 border-slate-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "premium":
        return "text-amber-700 bg-amber-50 border-amber-200";
      case "free":
        return "text-slate-700 bg-slate-50 border-slate-200";
      default:
        return "text-slate-700 bg-slate-50 border-slate-200";
    }
  };

  const openModal = (type: string, user?: User) => {
    if (user) setSelectedUser(user);
    switch (type) {
      case "create":
        setShowCreateModal(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          school: "",
          grade: "",
          subscription_type: "free",
          target_university: "",
          target_major: "",
          target_score: null,
          password: "",
          status: "active" as "active" | "inactive" | "suspended"
        });
        break;
      case "edit":
        setShowEditModal(true);
        if (user) {
                  setFormData({
          name: user.name,
          email: user.email,
          phone: user.phone,
          school: user.school,
          grade: user.grade,
          subscription_type: user.subscription_type,
          target_university: user.target_university,
          target_major: user.target_major,
          target_score: user.target_score,
          password: "",
          status: user.status as "active" | "inactive" | "suspended"
        });
        }
        break;
      case "view":
        setShowViewModal(true);
        break;
      case "delete":
        setShowDeleteModal(true);
        break;
    }
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setShowViewModal(false);
    setShowDeleteModal(false);
    setSelectedUser(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      school: "",
      grade: "",
      subscription_type: "free",
      target_university: "",
      target_major: "",
      target_score: null,
      password: "",
      status: "active" as "active" | "inactive" | "suspended"
    });
  };

  // Handle form submission untuk create user
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitButton = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = submitButton.textContent;
    
    try {
      // Set loading state
      submitButton.disabled = true;
      submitButton.innerHTML = `
        <div class="flex items-center space-x-2">
          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>Membuat User...</span>
        </div>
      `;

      const response = await fetch('/api/sys/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('User berhasil dibuat');
        closeModal();
        fetchUsers(); // Refresh data
      } else {
        toast.error(result.message || 'Gagal membuat user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Gagal membuat user');
    } finally {
      // Reset button state
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  };

  // Handle form submission untuk update user
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    const submitButton = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = submitButton.textContent;
    
    try {
      // Set loading state
      submitButton.disabled = true;
      submitButton.innerHTML = `
        <div class="flex items-center space-x-2">
          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>Mengupdate User...</span>
        </div>
      `;

      const response = await fetch(`/api/sys/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('User berhasil diupdate');
        closeModal();
        fetchUsers(); // Refresh data
      } else {
        toast.error(result.message || 'Gagal mengupdate user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Gagal mengupdate user');
    } finally {
      // Reset button state
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  };

  // Handle delete user
  // Format date function
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";
      
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    const deleteButton = document.querySelector('[data-delete-button]') as HTMLButtonElement;
    const originalText = deleteButton.textContent;
    
    try {
      // Set loading state
      deleteButton.disabled = true;
      deleteButton.innerHTML = `
        <div class="flex items-center space-x-2">
          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>Menghapus User...</span>
        </div>
      `;

      const response = await fetch(`/api/sys/users/${selectedUser.id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        toast.success('User berhasil dihapus');
        closeModal();
        fetchUsers(); // Refresh data
      } else {
        toast.error(result.message || 'Gagal menghapus user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Gagal menghapus user');
    } finally {
      // Reset button state
      deleteButton.disabled = false;
      deleteButton.textContent = originalText;
    }
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

      {/* Sidebar Component */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <TopHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          pageTitle="Manage Users"
          pageDescription="Kelola data pengguna Pintu Universitas"
        />

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto" data-main-content>
          {/* Header Section */}
          <HeaderSection onOpenCreateModal={() => openModal("create")} />

          {/* Filters & Search */}
          <FiltersAndSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            subscriptionFilter={subscriptionFilter}
            setSubscriptionFilter={setSubscriptionFilter}
          />

                     {/* Users Table */}
           {loading ? (
             <div className="bg-white rounded-2xl shadow-lg border border-white/20 p-8">
               <div className="flex items-center justify-center">
                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                 <span className="ml-3 text-slate-600">Loading users...</span>
               </div>
             </div>
           ) : (
             <UsersTable
               users={users}
               sortBy={sortBy}
               sortOrder={sortOrder}
               onSort={handleSort}
               onOpenModal={openModal}
             />
           )}
        </main>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-white/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-900">
                  Tambah User Baru
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
                         <div className="p-6">
               <form onSubmit={handleCreateUser} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-2">
                       Nama Lengkap
                     </label>
                     <input
                       type="text"
                       value={formData.name}
                       onChange={(e) => setFormData({...formData, name: e.target.value})}
                       className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                       placeholder="Masukkan nama lengkap"
                       required
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-2">
                       Email
                     </label>
                     <input
                       type="email"
                       value={formData.email}
                       onChange={(e) => setFormData({...formData, email: e.target.value})}
                       className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                       placeholder="Masukkan email"
                       required
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-2">
                       Phone
                     </label>
                     <input
                       type="tel"
                       value={formData.phone}
                       onChange={(e) => setFormData({...formData, phone: e.target.value})}
                       className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                       placeholder="Masukkan nomor telepon"
                       required
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-2">
                       Sekolah
                     </label>
                     <input
                       type="text"
                       value={formData.school}
                       onChange={(e) => setFormData({...formData, school: e.target.value})}
                       className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                       placeholder="Masukkan nama sekolah"
                       required
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-2">
                       Kelas
                     </label>
                     <select 
                       value={formData.grade}
                       onChange={(e) => setFormData({...formData, grade: e.target.value})}
                       className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                       required
                     >
                       <option value="">Pilih kelas</option>
                       <option value="10">Kelas 10</option>
                       <option value="11">Kelas 11</option>
                       <option value="12">Kelas 12</option>
                     </select>
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-2">
                       Subscription
                     </label>
                     <select 
                       value={formData.subscription_type}
                       onChange={(e) => setFormData({...formData, subscription_type: e.target.value as "free" | "premium"})}
                       className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                     >
                       <option value="free">Free</option>
                       <option value="premium">Premium</option>
                     </select>
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-2">
                       Password
                     </label>
                     <input
                       type="password"
                       value={formData.password}
                       onChange={(e) => setFormData({...formData, password: e.target.value})}
                       className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                       placeholder="Masukkan password"
                       required
                     />
                   </div>
                 </div>
                 <div className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-200">
                   <button
                     type="button"
                     onClick={closeModal}
                     className="px-6 py-3 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-all duration-300"
                   >
                     Batal
                   </button>
                   <button
                     type="submit"
                     className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                   >
                     Tambah User
                   </button>
                 </div>
               </form>
             </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-white/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-900">
                  Edit User
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
                         <div className="p-6">
               <form onSubmit={handleUpdateUser} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-2">
                       Nama Lengkap
                     </label>
                     <input
                       type="text"
                       value={formData.name}
                       onChange={(e) => setFormData({...formData, name: e.target.value})}
                       className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                       required
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-2">
                       Email
                     </label>
                     <input
                       type="email"
                       value={formData.email}
                       onChange={(e) => setFormData({...formData, email: e.target.value})}
                       className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                       required
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-2">
                       Phone
                     </label>
                     <input
                       type="tel"
                       value={formData.phone}
                       onChange={(e) => setFormData({...formData, phone: e.target.value})}
                       className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                       required
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-2">
                       Sekolah
                     </label>
                     <input
                       type="text"
                       value={formData.school}
                       onChange={(e) => setFormData({...formData, school: e.target.value})}
                       className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                       required
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-2">
                       Kelas
                     </label>
                     <select 
                       value={formData.grade}
                       onChange={(e) => setFormData({...formData, grade: e.target.value})}
                       className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                       required
                     >
                       <option value="">Pilih kelas</option>
                       <option value="10">Kelas 10</option>
                       <option value="11">Kelas 11</option>
                       <option value="12">Kelas 12</option>
                     </select>
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-2">
                       Status
                     </label>
                     <select 
                       value={formData.status}
                       onChange={(e) => setFormData({...formData, status: e.target.value as "active" | "inactive" | "suspended"})}
                       className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                     >
                       <option value="active">Active</option>
                       <option value="inactive">Inactive</option>
                       <option value="suspended">Suspended</option>
                     </select>
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-2">
                       Subscription
                     </label>
                     <select 
                       value={formData.subscription_type}
                       onChange={(e) => setFormData({...formData, subscription_type: e.target.value as "free" | "premium"})}
                       className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                     >
                       <option value="free">Free</option>
                       <option value="premium">Premium</option>
                     </select>
                   </div>
                 </div>
                 <div className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-200">
                   <button
                     type="button"
                     onClick={closeModal}
                     className="px-6 py-3 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-all duration-300"
                   >
                     Batal
                   </button>
                   <button
                     type="submit"
                     className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                   >
                     Update User
                   </button>
                 </div>
               </form>
             </div>
          </div>
        </div>
      )}

      {/* View User Modal */}
      {showViewModal && selectedUser && (
        <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-white/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-900">
                  Detail User
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                    {selectedUser.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">
                      {selectedUser.name}
                    </h4>
                    <p className="text-slate-600">{selectedUser.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-500 mb-1">
                        Phone
                      </label>
                      <p className="text-slate-900">{selectedUser.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-500 mb-1">
                        Sekolah
                      </label>
                      <p className="text-slate-900">{selectedUser.school}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-500 mb-1">
                        Kelas
                      </label>
                      <p className="text-slate-900">
                        Kelas {selectedUser.grade}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                                         <div>
                       <label className="block text-sm font-medium text-slate-500 mb-1">
                         Target University
                       </label>
                       <p className="text-slate-900">
                         {selectedUser.target_university}
                       </p>
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-slate-500 mb-1">
                         Target Major
                       </label>
                       <p className="text-slate-900">
                         {selectedUser.target_major}
                       </p>
                     </div>
                                           <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">
                          Join Date
                        </label>
                        <p className="text-slate-900">{formatDate(selectedUser.join_date)}</p>
                      </div>
                   </div>
                 </div>

                 <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                   <div className="text-center">
                     <p className="text-2xl font-bold text-blue-600">
                       {selectedUser.tryouts_completed}
                     </p>
                     <p className="text-sm text-slate-500">Tryouts Completed</p>
                   </div>
                   <div className="text-center">
                     <p className="text-2xl font-bold text-emerald-600">
                       {selectedUser.total_score}
                     </p>
                     <p className="text-sm text-slate-500">Total Score</p>
                   </div>
                   <div className="text-center">
                     <p className="text-2xl font-bold text-amber-600">
                       {selectedUser.last_active}
                     </p>
                     <p className="text-sm text-slate-500">Last Active</p>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-white/20 w-full max-w-md">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Hapus User
              </h3>
              <p className="text-slate-600 mb-6">
                Apakah Anda yakin ingin menghapus user{" "}
                <strong>{selectedUser.name}</strong>? Tindakan ini tidak dapat
                dibatalkan.
              </p>
              <div className="flex items-center justify-center space-x-3">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-all duration-300"
                >
                  Batal
                </button>
                                 <button
                   onClick={handleDeleteUser}
                   data-delete-button
                   className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                 >
                   Hapus User
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
