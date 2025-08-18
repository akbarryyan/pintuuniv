"use client";

import { RefreshCw, Download } from "lucide-react";

interface FilterAndControlsProps {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  reportType: string;
  setReportType: (type: string) => void;
  onRefresh?: () => void;
  onDownloadAll?: () => void;
}

export const FilterAndControls = ({
  selectedPeriod,
  setSelectedPeriod,
  reportType,
  setReportType,
  onRefresh,
  onDownloadAll,
}: FilterAndControlsProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Periode
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7d">7 Hari Terakhir</option>
              <option value="30d">30 Hari Terakhir</option>
              <option value="3m">3 Bulan Terakhir</option>
              <option value="1y">1 Tahun Terakhir</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jenis Laporan
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Semua Laporan</option>
              <option value="user">Pengguna</option>
              <option value="tryout">Tryout</option>
              <option value="financial">Keuangan</option>
              <option value="performance">Performa</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={onDownloadAll}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Unduh Semua
          </button>
        </div>
      </div>
    </div>
  );
};
