"use client";

import { useState } from "react";
import { X, BookOpen, Star, Trash2 } from "lucide-react";
import { Sidebar, TopHeader } from "@/components/sys";
import {
  HeaderSection,
  FiltersAndSearch,
  UsersTable,
} from "@/components/sys/users";
import { usePageTransition } from "@/lib/hooks";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  school: string;
  grade: string;
  subscriptionType: "free" | "premium";
  targetUniversity: string;
  targetMajor: string;
  joinDate: string;
  lastActive: string;
  status: "active" | "inactive" | "suspended";
  tryoutsCompleted: number;
  totalScore: number;
}

export default function ManageUsers() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("users");

  // Use page transition hook
  usePageTransition();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [subscriptionFilter, setSubscriptionFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Mock data
  const [users] = useState<User[]>([
    {
      id: 1,
      name: "Ahmad Fadillah",
      email: "ahmad@email.com",
      phone: "+62 812-3456-7890",
      school: "SMAN 1 Jakarta",
      grade: "12",
      subscriptionType: "premium",
      targetUniversity: "Universitas Indonesia",
      targetMajor: "Teknik Informatika",
      joinDate: "2024-01-15",
      lastActive: "2024-01-20",
      status: "active",
      tryoutsCompleted: 15,
      totalScore: 1250,
    },
    {
      id: 2,
      name: "Sarah Amanda",
      email: "sarah@email.com",
      phone: "+62 813-9876-5432",
      school: "SMAN 2 Bandung",
      grade: "12",
      subscriptionType: "free",
      targetUniversity: "Institut Teknologi Bandung",
      targetMajor: "Teknik Kimia",
      joinDate: "2024-01-10",
      lastActive: "2024-01-19",
      status: "active",
      tryoutsCompleted: 8,
      totalScore: 890,
    },
    {
      id: 3,
      name: "Budi Santoso",
      email: "budi@email.com",
      phone: "+62 814-1111-2222",
      school: "SMAN 3 Surabaya",
      grade: "11",
      subscriptionType: "premium",
      targetUniversity: "Universitas Airlangga",
      targetMajor: "Kedokteran",
      joinDate: "2024-01-05",
      lastActive: "2024-01-18",
      status: "inactive",
      tryoutsCompleted: 3,
      totalScore: 320,
    },
  ]);

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
        break;
      case "edit":
        setShowEditModal(true);
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
          <UsersTable
            users={users}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
            onOpenModal={openModal}
          />
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
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      placeholder="Masukkan email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      placeholder="Masukkan nomor telepon"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Sekolah
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      placeholder="Masukkan nama sekolah"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Kelas
                    </label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300">
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
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300">
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
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedUser.name}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={selectedUser.email}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Status
                    </label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300">
                      <option
                        value="active"
                        selected={selectedUser.status === "active"}
                      >
                        Active
                      </option>
                      <option
                        value="inactive"
                        selected={selectedUser.status === "inactive"}
                      >
                        Inactive
                      </option>
                      <option
                        value="suspended"
                        selected={selectedUser.status === "suspended"}
                      >
                        Suspended
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Subscription
                    </label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300">
                      <option
                        value="free"
                        selected={selectedUser.subscriptionType === "free"}
                      >
                        Free
                      </option>
                      <option
                        value="premium"
                        selected={selectedUser.subscriptionType === "premium"}
                      >
                        Premium
                      </option>
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
                        {selectedUser.targetUniversity}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-500 mb-1">
                        Target Major
                      </label>
                      <p className="text-slate-900">
                        {selectedUser.targetMajor}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-500 mb-1">
                        Join Date
                      </label>
                      <p className="text-slate-900">{selectedUser.joinDate}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {selectedUser.tryoutsCompleted}
                    </p>
                    <p className="text-sm text-slate-500">Tryouts Completed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-600">
                      {selectedUser.totalScore}
                    </p>
                    <p className="text-sm text-slate-500">Total Score</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-amber-600">
                      {selectedUser.lastActive}
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
                  onClick={closeModal}
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
