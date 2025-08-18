"use client";

import { useState } from "react";
import {
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  DollarSign,
  Eye,
  Filter,
  RefreshCw,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";
import { Sidebar, TopHeader } from "@/components/sys";
import { usePageTransition } from "@/lib/hooks";

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

interface AnalyticsCard {
  title: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease" | "neutral";
  icon: React.ReactNode;
  color: string;
}

export default function ReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("reports");
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [reportType, setReportType] = useState("all");

  // Use page transition hook
  usePageTransition();

  const analyticsCards: AnalyticsCard[] = [
    {
      title: "Total Pengguna",
      value: "1,234",
      change: "+12.5%",
      changeType: "increase",
      icon: <Users className="w-6 h-6" />,
      color: "bg-blue-500",
    },
    {
      title: "Tryout Selesai",
      value: "856",
      change: "+8.2%",
      changeType: "increase",
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-green-500",
    },
    {
      title: "Total Revenue",
      value: "Rp 45.6M",
      change: "+15.3%",
      changeType: "increase",
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-emerald-500",
    },
    {
      title: "Conversion Rate",
      value: "23.4%",
      change: "-2.1%",
      changeType: "decrease",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-orange-500",
    },
  ];

  const reportsData: ReportData[] = [
    {
      id: "RPT001",
      title: "Laporan Pengguna Bulanan",
      description: "Detail aktivitas dan registrasi pengguna selama bulan ini",
      type: "user",
      generatedDate: "2025-08-18",
      period: "Agustus 2025",
      status: "ready",
      downloadUrl: "#",
      fileSize: "2.4 MB",
    },
    {
      id: "RPT002",
      title: "Analisis Performa Tryout",
      description: "Statistik dan analisis hasil tryout per kategori",
      type: "tryout",
      generatedDate: "2025-08-18",
      period: "Q3 2025",
      status: "ready",
      downloadUrl: "#",
      fileSize: "5.1 MB",
    },
    {
      id: "RPT003",
      title: "Laporan Keuangan Harian",
      description: "Ringkasan transaksi dan pendapatan harian",
      type: "financial",
      generatedDate: "2025-08-18",
      period: "18 Agustus 2025",
      status: "generating",
    },
    {
      id: "RPT004",
      title: "Performa Sistem",
      description: "Monitoring performa server dan database",
      type: "performance",
      generatedDate: "2025-08-17",
      period: "Minggu ini",
      status: "ready",
      downloadUrl: "#",
      fileSize: "1.8 MB",
    },
    {
      id: "RPT005",
      title: "Laporan Engagement Pengguna",
      description: "Analisis keterlibatan dan aktivitas pengguna",
      type: "user",
      generatedDate: "2025-08-16",
      period: "30 hari terakhir",
      status: "error",
    },
  ];

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

  const filteredReports = reportsData.filter(
    (report) => reportType === "all" || report.type === reportType
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
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
          pageTitle="Laporan"
          pageDescription="Kelola dan unduh laporan analitik"
        />

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto" data-main-content>
          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {analyticsCards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {card.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {card.value}
                    </p>
                    <div className="flex items-center mt-2">
                      {card.changeType === "increase" ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : card.changeType === "decrease" ? (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      ) : (
                        <Activity className="w-4 h-4 text-gray-500 mr-1" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          card.changeType === "increase"
                            ? "text-green-600"
                            : card.changeType === "decrease"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {card.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        dari periode sebelumnya
                      </span>
                    </div>
                  </div>
                  <div className={`${card.color} p-3 rounded-lg text-white`}>
                    {card.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filter and Controls */}
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
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="w-4 h-4" />
                  Unduh Semua
                </button>
              </div>
            </div>
          </div>

          {/* Reports Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Daftar Laporan
              </h3>
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
                        {new Date(report.generatedDate).toLocaleDateString(
                          "id-ID"
                        )}
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
                        {new Date(report.generatedDate).toLocaleDateString(
                          "id-ID"
                        )}
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
        </main>
      </div>
    </div>
  );
}
