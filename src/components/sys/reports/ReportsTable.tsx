"use client";

import {
  Download,
  Eye,
  RefreshCw,
  Users,
  BookOpen,
  DollarSign,
  Activity,
} from "lucide-react";

interface ReportData {
  id: string;
  title: string;
  description: string;
  type: "user" | "tryout" | "financial" | "performance";
  generatedDate: string;
  period: string;
  status: "ready" | "generating" | "error";
  downloadUrl?: string;
  fileSize?: string;
}

interface ReportsTableProps {
  reports: ReportData[];
  filteredReports: ReportData[];
}

export const ReportsTable = ({
  reports,
  filteredReports,
}: ReportsTableProps) => {
  const getStatusBadge = (status: ReportData["status"]) => {
    const badges = {
      ready: "bg-green-100 text-green-800 border-green-200",
      generating: "bg-yellow-100 text-yellow-800 border-yellow-200",
      error: "bg-red-100 text-red-800 border-red-200",
    };

    const labels = {
      ready: "Siap",
      generating: "Proses",
      error: "Error",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full border ${badges[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  const getTypeIcon = (type: ReportData["type"]) => {
    const icons = {
      user: <Users className="w-4 h-4" />,
      tryout: <BookOpen className="w-4 h-4" />,
      financial: <DollarSign className="w-4 h-4" />,
      performance: <Activity className="w-4 h-4" />,
    };
    return icons[type];
  };

  const getTypeColor = (type: ReportData["type"]) => {
    const colors = {
      user: "text-blue-600 bg-blue-50",
      tryout: "text-green-600 bg-green-50",
      financial: "text-emerald-600 bg-emerald-50",
      performance: "text-orange-600 bg-orange-50",
    };
    return colors[type];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Daftar Laporan</h3>
        <p className="text-sm text-gray-600 mt-1">
          Menampilkan {filteredReports.length} laporan
        </p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Laporan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jenis
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Periode
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
            {filteredReports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {report.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {report.description}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                      report.type
                    )}`}
                  >
                    {getTypeIcon(report.type)}
                    <span className="capitalize">{report.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {report.period}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(report.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(report.generatedDate).toLocaleDateString("id-ID")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    {report.status === "ready" && (
                      <>
                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded-lg hover:bg-blue-50 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 p-1 rounded-lg hover:bg-gray-50 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    {report.status === "generating" && (
                      <RefreshCw className="w-4 h-4 text-yellow-600 animate-spin" />
                    )}
                    {report.status === "error" && (
                      <button className="text-red-600 hover:text-red-900 p-1 rounded-lg hover:bg-red-50 transition-colors">
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
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {report.title}
                </h4>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {report.description}
                </p>
              </div>
              <div className="ml-3 flex items-center gap-2">
                {report.status === "ready" && (
                  <>
                    <button className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </>
                )}
                {report.status === "generating" && (
                  <div className="p-2">
                    <RefreshCw className="w-4 h-4 text-yellow-600 animate-spin" />
                  </div>
                )}
                {report.status === "error" && (
                  <button className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                    report.type
                  )}`}
                >
                  {getTypeIcon(report.type)}
                  <span className="capitalize">{report.type}</span>
                </div>
                {getStatusBadge(report.status)}
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-900 font-medium">
                  {report.period}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(report.generatedDate).toLocaleDateString("id-ID")}
                </div>
              </div>
            </div>

            {report.fileSize && (
              <div className="mt-2 text-xs text-gray-500">
                Ukuran file: {report.fileSize}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
