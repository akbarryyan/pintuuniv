"use client";

import { useState } from "react";
import { Sidebar, TopHeader } from "@/components/sys";
import {
  AnalyticsCards,
  FilterAndControls,
  ReportsTable,
} from "@/components/sys/reports";
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

export default function ReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("reports");
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [reportType, setReportType] = useState("all");

  // Use page transition hook
  usePageTransition();

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

  const filteredReports = reportsData.filter(
    (report) => reportType === "all" || report.type === reportType
  );

  const handleRefresh = () => {
    // Implement refresh logic
    console.log("Refreshing reports...");
  };

  const handleDownloadAll = () => {
    // Implement download all logic
    console.log("Downloading all reports...");
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
          <AnalyticsCards selectedPeriod={selectedPeriod} />

          {/* Filter and Controls */}
          <FilterAndControls
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
            reportType={reportType}
            setReportType={setReportType}
            onRefresh={handleRefresh}
            onDownloadAll={handleDownloadAll}
          />

          {/* Reports Table */}
          <ReportsTable
            reports={reportsData}
            filteredReports={filteredReports}
          />
        </main>
      </div>
    </div>
  );
}
