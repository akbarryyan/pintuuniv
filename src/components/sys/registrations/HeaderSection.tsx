interface HeaderSectionProps {
  totalRegistrations: number;
  pendingRegistrations: number;
  approvedRegistrations: number;
  rejectedRegistrations: number;
}

export default function HeaderSection({
  totalRegistrations,
  pendingRegistrations,
  approvedRegistrations,
  rejectedRegistrations,
}: HeaderSectionProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="bg-white border-3 sm:border-4 border-slate-800 shadow-brutal p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-2 uppercase">
              Kelola Registrasi Tryout
            </h1>
            <p className="text-slate-600 font-bold text-sm sm:text-base">
              Manajemen pendaftaran tryout dan persetujuan peserta
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
          <div className="bg-blue-100 border-3 border-blue-400 p-3 sm:p-4 text-center">
            <div className="text-2xl sm:text-3xl font-black text-blue-600 mb-1">
              {totalRegistrations}
            </div>
            <div className="text-xs sm:text-sm font-bold text-blue-800 uppercase">
              Total Registrasi
            </div>
          </div>

          <div className="bg-orange-100 border-3 border-orange-400 p-3 sm:p-4 text-center">
            <div className="text-2xl sm:text-3xl font-black text-orange-600 mb-1">
              {pendingRegistrations}
            </div>
            <div className="text-xs sm:text-sm font-bold text-orange-800 uppercase">
              Menunggu Persetujuan
            </div>
          </div>

          <div className="bg-emerald-100 border-3 border-emerald-400 p-3 sm:p-4 text-center">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 mb-1">
              {approvedRegistrations}
            </div>
            <div className="text-xs sm:text-sm font-bold text-emerald-800 uppercase">
              Disetujui
            </div>
          </div>

          <div className="bg-red-100 border-3 border-red-400 p-3 sm:p-4 text-center">
            <div className="text-2xl sm:text-3xl font-black text-red-600 mb-1">
              {rejectedRegistrations}
            </div>
            <div className="text-xs sm:text-sm font-bold text-red-800 uppercase">
              Ditolak
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
