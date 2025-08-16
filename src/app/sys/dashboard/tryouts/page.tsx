"use client";

import { useState } from "react";
import { 
  X,
  BookOpen,
  Star,
  Trash2
} from "lucide-react";
import { Sidebar, TopHeader } from "@/components/sys";
import { HeaderSection, FiltersAndSearch, TryoutsTable } from "@/components/sys/tryouts";

interface Tryout {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  type: 'free' | 'premium';
  difficulty: 'Mudah' | 'Sedang' | 'Sulit' | 'Sangat Sulit';
  participants: number;
  discount: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export default function ManageTryouts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('tryouts');
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTryout, setSelectedTryout] = useState<Tryout | null>(null);

  // Mock data
  const [tryouts] = useState<Tryout[]>([
    {
      id: 1,
      title: "Tryout UTBK Matematika Dasar 2024",
      price: 0,
      originalPrice: 50000,
      type: "free",
      difficulty: "Sedang",
      participants: 1247,
      discount: 100,
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      status: "active",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-15"
    },
    {
      id: 2,
      title: "Tryout UTBK Fisika Lanjutan",
      price: 75000,
      originalPrice: 100000,
      type: "premium",
      difficulty: "Sulit",
      participants: 892,
      discount: 25,
      startDate: "2024-01-20",
      endDate: "2024-03-20",
      status: "active",
      createdAt: "2024-01-12",
      updatedAt: "2024-01-18"
    },
    {
      id: 3,
      title: "Tryout UTBK Bahasa Indonesia",
      price: 50000,
      originalPrice: 50000,
      type: "premium",
      difficulty: "Mudah",
      participants: 1567,
      discount: 0,
      startDate: "2024-01-25",
      endDate: "2024-02-25",
      status: "draft",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-19"
    }
  ]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const openModal = (type: string, tryout?: Tryout) => {
    if (tryout) setSelectedTryout(tryout);
    switch (type) {
      case 'create': setShowCreateModal(true); break;
      case 'edit': setShowEditModal(true); break;
      case 'view': setShowViewModal(true); break;
      case 'delete': setShowDeleteModal(true); break;
    }
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setShowViewModal(false);
    setShowDeleteModal(false);
    setSelectedTryout(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'inactive': return 'text-slate-700 bg-slate-50 border-slate-200';
      case 'draft': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'archived': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'premium': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'free': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      default: return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Mudah': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Sedang': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Sulit': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Sangat Sulit': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
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
          pageTitle="Manage Tryouts"
          pageDescription="Kelola dan buat tryout untuk pengguna"
        />

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {/* Header Section */}
          <HeaderSection onOpenCreateModal={() => openModal('create')} />

          {/* Filters & Search */}
          <FiltersAndSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            difficultyFilter={difficultyFilter}
            setDifficultyFilter={setDifficultyFilter}
          />

          {/* Tryouts Table */}
          <TryoutsTable
            tryouts={tryouts}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
            onOpenModal={openModal}
          />
        </main>
      </div>

      {/* Create Tryout Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-white/20 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-900">Buat Tryout Baru</h3>
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
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Judul Tryout</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      placeholder="Masukkan judul tryout"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tipe</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300">
                      <option value="free">Free</option>
                      <option value="premium">Premium</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Level Kesulitan</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300">
                      <option value="Mudah">Mudah</option>
                      <option value="Sedang">Sedang</option>
                      <option value="Sulit">Sulit</option>
                      <option value="Sangat Sulit">Sangat Sulit</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Harga (IDR)</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      placeholder="0 untuk free"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Harga Asli (IDR)</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      placeholder="Harga sebelum diskon"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal Mulai</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal Berakhir</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
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
                    Buat Tryout
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Tryout Modal */}
      {showEditModal && selectedTryout && (
        <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-white/20 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-900">Edit Tryout</h3>
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
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Judul Tryout</label>
                    <input
                      type="text"
                      defaultValue={selectedTryout.title}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300">
                      <option value="active" selected={selectedTryout.status === 'active'}>Active</option>
                      <option value="inactive" selected={selectedTryout.status === 'inactive'}>Inactive</option>
                      <option value="draft" selected={selectedTryout.status === 'draft'}>Draft</option>
                      <option value="archived" selected={selectedTryout.status === 'archived'}>Archived</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Level Kesulitan</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300">
                      <option value="Mudah" selected={selectedTryout.difficulty === 'Mudah'}>Mudah</option>
                      <option value="Sedang" selected={selectedTryout.difficulty === 'Sedang'}>Sedang</option>
                      <option value="Sulit" selected={selectedTryout.difficulty === 'Sulit'}>Sulit</option>
                      <option value="Sangat Sulit" selected={selectedTryout.difficulty === 'Sangat Sulit'}>Sangat Sulit</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Harga (IDR)</label>
                    <input
                      type="number"
                      defaultValue={selectedTryout.price}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal Mulai</label>
                    <input
                      type="date"
                      defaultValue={selectedTryout.startDate}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal Berakhir</label>
                    <input
                      type="date"
                      defaultValue={selectedTryout.endDate}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
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
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Update Tryout
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Tryout Modal */}
      {showViewModal && selectedTryout && (
        <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-white/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-900">Detail Tryout</h3>
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
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-white">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">{selectedTryout.title}</h4>
                    <p className="text-slate-600">ID: {selectedTryout.id}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-500 mb-1">Tipe</label>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(selectedTryout.type)}`}>
                        {selectedTryout.type === 'premium' ? (
                          <>
                            <Star className="w-3 h-3 mr-1" />
                            Premium
                          </>
                        ) : (
                          'Free'
                        )}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-500 mb-1">Level</label>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(selectedTryout.difficulty)}`}>
                        {selectedTryout.difficulty}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-500 mb-1">Status</label>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedTryout.status)}`}>
                        {selectedTryout.status}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-500 mb-1">Harga</label>
                      <p className="text-slate-900">
                        {selectedTryout.price === 0 ? 'Gratis' : formatCurrency(selectedTryout.price)}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-500 mb-1">Peserta</label>
                      <p className="text-slate-900">{selectedTryout.participants.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-500 mb-1">Diskon</label>
                      <p className="text-slate-900">{selectedTryout.discount}%</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                  <div>
                    <label className="block text-sm font-medium text-slate-500 mb-1">Tanggal Mulai</label>
                    <p className="text-slate-900">{selectedTryout.startDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-500 mb-1">Tanggal Berakhir</label>
                    <p className="text-slate-900">{selectedTryout.endDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                  <div>
                    <label className="block text-sm font-medium text-slate-500 mb-1">Dibuat</label>
                    <p className="text-slate-900">{selectedTryout.createdAt}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-500 mb-1">Terakhir Update</label>
                    <p className="text-slate-900">{selectedTryout.updatedAt}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Tryout Modal */}
      {showDeleteModal && selectedTryout && (
        <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-white/20 w-full max-w-md">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Hapus Tryout</h3>
              <p className="text-slate-600 mb-6">
                Apakah Anda yakin ingin menghapus tryout <strong>{selectedTryout.title}</strong>? 
                Tindakan ini tidak dapat dibatalkan.
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
                  Hapus Tryout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
