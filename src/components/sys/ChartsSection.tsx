"use client";

import { 
  BarChart3,
  PieChart,
  Filter,
  Download,
  Eye
} from "lucide-react";

export default function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* User Growth Chart */}
      <div className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">User Growth</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-300 hover:scale-110">
              <Filter className="w-4 h-4" />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-300 hover:scale-110">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-dashed border-blue-200 flex items-center justify-center group-hover:border-blue-300 transition-all duration-300">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <BarChart3 className="w-10 h-10 text-white" />
            </div>
            <p className="text-slate-700 font-semibold text-lg mb-2">Chart User Growth</p>
            <p className="text-slate-500 text-sm">Data akan ditampilkan di sini</p>
            <div className="mt-4 px-4 py-2 bg-blue-100 rounded-lg inline-block">
              <span className="text-blue-700 text-xs font-medium">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Distribution */}
      <div className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
              <PieChart className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Revenue Distribution</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-300 hover:scale-110">
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-300 hover:scale-110">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="h-64 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border-2 border-dashed border-emerald-200 flex items-center justify-center group-hover:border-emerald-300 transition-all duration-300">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <PieChart className="w-10 h-10 text-white" />
            </div>
            <p className="text-slate-700 font-semibold text-lg mb-2">Chart Revenue</p>
            <p className="text-slate-500 text-sm">Data akan ditampilkan di sini</p>
            <div className="mt-4 px-4 py-2 bg-emerald-100 rounded-lg inline-block">
              <span className="text-emerald-700 text-xs font-medium">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
