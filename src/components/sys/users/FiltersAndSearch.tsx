"use client";

import { Search } from "lucide-react";

interface FiltersAndSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  subscriptionFilter: string;
  setSubscriptionFilter: (filter: string) => void;
}

export default function FiltersAndSearch({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  subscriptionFilter,
  setSubscriptionFilter
}: FiltersAndSearchProps) {
  return (
    <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari user berdasarkan nama, email, atau sekolah..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          >
            <option value="all">Semua Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        {/* Subscription Filter */}
        <div>
          <select
            value={subscriptionFilter}
            onChange={(e) => setSubscriptionFilter(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          >
            <option value="all">Semua Subscription</option>
            <option value="free">Free</option>
            <option value="premium">Premium</option>
          </select>
        </div>
      </div>
    </div>
  );
}
