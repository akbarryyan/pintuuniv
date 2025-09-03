"use client";

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

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  registration: Registration | null;
}

export default function ViewModal({
  isOpen,
  onClose,
  registration,
}: ViewModalProps) {
  if (!isOpen || !registration) return null;

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

  const formatDate = (dateString: string) => {
    if (!dateString) return "Belum ditentukan";
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-slate-800 shadow-brutal max-w-2xl w-full transform hover:rotate-1 transition-all duration-200 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 sm:p-6 border-b-4 border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white border-3 border-slate-800 flex items-center justify-center font-black text-lg text-blue-600 shadow-lg">
              👁️
            </div>
            <div>
              <h3 className="font-black text-lg sm:text-xl uppercase">
                Detail Registrasi
              </h3>
              <p className="text-blue-100 text-sm font-bold">
                Informasi lengkap pendaftaran tryout
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6">
          {/* Registration Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Information */}
            <div className="bg-slate-50 border-3 border-slate-800 p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-400 border-2 border-slate-800 flex items-center justify-center font-black text-sm">
                  👤
                </div>
                <h4 className="font-black text-slate-900 text-sm sm:text-base uppercase">
                  Informasi User
                </h4>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-bold text-slate-600">Nama:</span>
                  <span className="ml-2 text-slate-900">{registration.user_name}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-600">Email:</span>
                  <span className="ml-2 text-slate-900">{registration.user_email}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-600">Telepon:</span>
                  <span className="ml-2 text-slate-900">{registration.user_phone || "Belum diisi"}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-600">Sekolah:</span>
                  <span className="ml-2 text-slate-900">{registration.user_school || "Belum diisi"}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-600">Kelas:</span>
                  <span className="ml-2 text-slate-900">{registration.user_grade || "Belum diisi"}</span>
                </div>
              </div>
            </div>

            {/* Tryout Information */}
            <div className="bg-slate-50 border-3 border-slate-800 p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-emerald-400 border-2 border-slate-800 flex items-center justify-center font-black text-sm">
                  🎯
                </div>
                <h4 className="font-black text-slate-900 text-sm sm:text-base uppercase">
                  Informasi Tryout
                </h4>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-bold text-slate-600">Judul:</span>
                  <span className="ml-2 text-slate-900">{registration.tryout_title}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-600">Periode:</span>
                  <span className="ml-2 text-slate-900">
                    {formatDate(registration.tryout_start_date)} - {formatDate(registration.tryout_end_date)}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-slate-600">Deskripsi:</span>
                  <span className="ml-2 text-slate-900">{registration.tryout_description || "Tidak ada deskripsi"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Details */}
          <div className="mt-6 bg-slate-50 border-3 border-slate-800 p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-orange-400 border-2 border-slate-800 flex items-center justify-center font-black text-sm">
                📋
              </div>
              <h4 className="font-black text-slate-900 text-sm sm:text-base uppercase">
                Detail Registrasi
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-bold text-slate-600">Tanggal Daftar:</span>
                <span className="ml-2 text-slate-900">{formatDate(registration.registration_date)}</span>
              </div>
              <div>
                <span className="font-bold text-slate-600">Status:</span>
                <span className={`ml-2 inline-block px-2 py-1 border-2 border-slate-800 font-bold text-xs ${getStatusColor(registration.status)}`}>
                  {getStatusLabel(registration.status)}
                </span>
              </div>
              <div>
                <span className="font-bold text-slate-600">Status Pembayaran:</span>
                <span className={`ml-2 inline-block px-2 py-1 border-2 border-slate-800 font-bold text-xs ${getPaymentStatusColor(registration.payment_status)}`}>
                  {getPaymentStatusLabel(registration.payment_status)}
                </span>
              </div>
              <div>
                <span className="font-bold text-slate-600">Metode Pembayaran:</span>
                <span className="ml-2 text-slate-900">{registration.payment_method || "Belum ditentukan"}</span>
              </div>
              {registration.payment_reference && (
                <div>
                  <span className="font-bold text-slate-600">Referensi Pembayaran:</span>
                  <span className="ml-2 text-slate-900">{registration.payment_reference}</span>
                </div>
              )}
              {registration.payment_date && (
                <div>
                  <span className="font-bold text-slate-600">Tanggal Pembayaran:</span>
                  <span className="ml-2 text-slate-900">{formatDate(registration.payment_date)}</span>
                </div>
              )}
              {registration.approved_by_name && (
                <div>
                  <span className="font-bold text-slate-600">Disetujui oleh:</span>
                  <span className="ml-2 text-slate-900">{registration.approved_by_name}</span>
                </div>
              )}
              {registration.approved_at && (
                <div>
                  <span className="font-bold text-slate-600">Tanggal Persetujuan:</span>
                  <span className="ml-2 text-slate-900">{formatDate(registration.approved_at)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {registration.notes && (
            <div className="mt-6 bg-blue-50 border-3 border-blue-400 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-400 border-2 border-slate-800 flex items-center justify-center font-black text-sm">
                  📝
                </div>
                <h4 className="font-black text-slate-900 text-sm sm:text-base uppercase">
                  Catatan
                </h4>
              </div>
              <p className="text-slate-700 text-sm font-bold leading-relaxed">
                {registration.notes}
              </p>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="bg-slate-100 text-slate-900 px-6 py-3 font-black text-sm border-3 border-slate-800 hover:bg-slate-200 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
