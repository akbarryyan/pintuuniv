"use client";

import { useState } from "react";
import { Sidebar, TopHeader } from "@/components/sys";
import {
  HeaderSection,
  FiltersAndSearch,
  TryoutsTable,
} from "@/components/sys/tryouts";
import { usePageTransition } from "@/lib/hooks";

interface Tryout {
  id: number;
  title: string;
  description: string;
  total_categories: number;
  total_questions: number;
  total_weight: number;
  passing_score: number;
  is_active: boolean;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export default function ManageTryouts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("tryouts");

  // Use page transition hook
  usePageTransition();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Mock data
  const [tryouts] = useState<Tryout[]>([
    {
      id: 1,
      title: "UTBK 2024 - Soshum",
      description: "Ujian Tulis Berbasis Komputer untuk jurusan Sosial Humaniora",
      total_categories: 6,
      total_questions: 120,
      total_weight: 240,
      passing_score: 500,
      is_active: true,
      start_date: "2024-01-15",
      end_date: "2024-06-15",
      created_at: "2024-01-10",
      updated_at: "2024-01-15",
    },
    {
      id: 2,
      title: "UTBK 2024 - Saintek",
      description: "Ujian Tulis Berbasis Komputer untuk jurusan Sains dan Teknologi",
      total_categories: 5,
      total_questions: 100,
      total_weight: 200,
      passing_score: 500,
      is_active: true,
      start_date: "2024-01-20",
      end_date: "2024-06-20",
      created_at: "2024-01-12",
      updated_at: "2024-01-18",
    },
    {
      id: 3,
      title: "Simulasi CPNS 2024",
      description: "Simulasi ujian CPNS untuk persiapan seleksi",
      total_categories: 8,
      total_questions: 150,
      total_weight: 300,
      passing_score: 600,
      is_active: false,
      start_date: "2024-01-25",
      end_date: "2024-12-25",
      created_at: "2024-01-15",
      updated_at: "2024-01-19",
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

  const openModal = (type: string, tryout?: Tryout) => {
    // Handle modal opening logic here
    console.log("Opening modal:", type, tryout);
  };

  const filteredTryouts = tryouts.filter((tryout) => {
    const matchesSearch =
      tryout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tryout.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && tryout.is_active) ||
      (statusFilter === "inactive" && !tryout.is_active);

    return matchesSearch && matchesStatus;
  });

  const sortedTryouts = [...filteredTryouts].sort((a, b) => {
    let aValue: any = a[sortBy as keyof Tryout];
    let bValue: any = b[sortBy as keyof Tryout];

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

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
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <TopHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          pageTitle="Kelola Tryout"
          pageDescription="Manajemen paket tryout untuk setiap kategori"
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
            typeFilter="all"
            setTypeFilter={() => {}}
            difficultyFilter="all"
            setDifficultyFilter={() => {}}
          />

          {/* Tryouts Table */}
          <TryoutsTable
            tryouts={sortedTryouts}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
            onOpenModal={openModal}
          />
        </main>
      </div>
    </div>
  );
}
