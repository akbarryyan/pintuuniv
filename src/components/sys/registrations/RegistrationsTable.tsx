interface Registration {
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
  approved_by_name: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface RegistrationsTableProps {
  registrations: Registration[];
  pagination: Pagination;
  onPageChange: (page: number) => void;
  onView: (registration: Registration) => void;
  onApprove: (registration: Registration) => void;
  onReject: (registration: Registration) => void;
  onDelete: (registration: Registration) => void;
}

export default function RegistrationsTable({
  registrations,
  pagination,
  onPageChange,
  onView,
  onApprove,
  onReject,
  onDelete,
}: RegistrationsTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "registered":
        return "bg-orange-100 text-orange-800 border-orange-400";
      case "approved":
        return "bg-emerald-100 text-emerald-800 border-emerald-400";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-400";
      case "cancelled":
        return "bg-gray-100 text-gray-800 border-gray-400";
      default:
        return "bg-gray-100 text-gray-800 border-gray-400";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-400";
      case "paid":
        return "bg-emerald-100 text-emerald-800 border-emerald-400";
      case "failed":
        return "bg-red-100 text-red-800 border-red-400";
      case "refunded":
        return "bg-blue-100 text-blue-800 border-blue-400";
      default:
        return "bg-gray-100 text-gray-800 border-gray-400";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Belum ditentukan";
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "registered":
        return "Terdaftar";
      case "approved":
        return "Disetujui";
      case "rejected":
        return "Ditolak";
      case "cancelled":
        return "Dibatalkan";
      default:
        return status;
    }
  };

  const getPaymentStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Menunggu";
      case "paid":
        return "Lunas";
      case "failed":
        return "Gagal";
      case "refunded":
        return "Dikembalikan";
      default:
        return status;
    }
  };

  return (
    <div className="bg-white border-3 sm:border-4 border-slate-800 shadow-brutal">
      {/* Table Header */}
      <div className="bg-slate-100 border-b-3 border-slate-800 p-4">
        <h3 className="font-black text-lg text-slate-900 uppercase">
          📋 Daftar Registrasi Tryout
        </h3>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b-2 border-slate-800">
            <tr>
              <th className="px-4 py-3 text-left font-black text-sm text-slate-900 uppercase">
                User
              </th>
              <th className="px-4 py-3 text-left font-black text-sm text-slate-900 uppercase">
                Tryout
              </th>
              <th className="px-4 py-3 text-left font-black text-sm text-slate-900 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left font-black text-sm text-slate-900 uppercase">
                Pembayaran
              </th>
              <th className="px-4 py-3 text-left font-black text-sm text-slate-900 uppercase">
                Tanggal Daftar
              </th>
              <th className="px-4 py-3 text-center font-black text-sm text-slate-900 uppercase">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((registration) => (
              <tr
                key={registration.id}
                className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">
                      {registration.user_name}
                    </div>
                    <div className="text-xs text-slate-600">
                      {registration.user_email}
                    </div>
                    <div className="text-xs text-slate-500">
                      {registration.user_school}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">
                      {registration.tryout_title}
                    </div>
                    <div className="text-xs text-slate-600">
                      {formatDate(registration.tryout_start_date)} - {formatDate(registration.tryout_end_date)}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div
                    className={`inline-block px-2 py-1 border-2 border-slate-800 font-bold text-xs ${getStatusColor(
                      registration.status
                    )}`}
                  >
                    {getStatusLabel(registration.status)}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div
                    className={`inline-block px-2 py-1 border-2 border-slate-800 font-bold text-xs ${getPaymentStatusColor(
                      registration.payment_status
                    )}`}
                  >
                    {getPaymentStatusLabel(registration.payment_status)}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-slate-900">
                    {formatDate(registration.registration_date)}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onView(registration)}
                      className="bg-blue-500 text-white px-2 py-1 font-bold text-xs border-2 border-slate-800 hover:bg-blue-600 transition-colors"
                      title="Lihat Detail"
                    >
                      👁️
                    </button>
                    {registration.status === "registered" && (
                      <>
                        <button
                          onClick={() => onApprove(registration)}
                          className="bg-emerald-500 text-white px-2 py-1 font-bold text-xs border-2 border-slate-800 hover:bg-emerald-600 transition-colors"
                          title="Setujui"
                        >
                          ✅
                        </button>
                        <button
                          onClick={() => onReject(registration)}
                          className="bg-red-500 text-white px-2 py-1 font-bold text-xs border-2 border-slate-800 hover:bg-red-600 transition-colors"
                          title="Tolak"
                        >
                          ❌
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => onDelete(registration)}
                      className="bg-gray-500 text-white px-2 py-1 font-bold text-xs border-2 border-slate-800 hover:bg-gray-600 transition-colors"
                      title="Hapus"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="bg-slate-50 border-t-2 border-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-bold text-slate-900">
              Menampilkan {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} dari {pagination.total} registrasi
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onPageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-3 py-1 border-2 border-slate-800 font-bold text-sm bg-slate-100 hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Sebelumnya
              </button>
              <span className="px-3 py-1 border-2 border-slate-800 font-bold text-sm bg-blue-100 text-blue-800">
                {pagination.page} / {pagination.totalPages}
              </span>
              <button
                onClick={() => onPageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="px-3 py-1 border-2 border-slate-800 font-bold text-sm bg-slate-100 hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Selanjutnya →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
