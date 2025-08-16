"use client";

import { 
  Users, 
  BookOpen, 
  TrendingUp
} from "lucide-react";

interface AdminStats {
  totalUsers: number;
  totalTryouts: number;
}

interface StatsGridProps {
  stats: AdminStats;
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const statsData = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: <Users className="w-7 h-7" />,
      bgGradient: 'from-blue-500 via-blue-600 to-indigo-600',
      iconBg: 'bg-gradient-to-br from-blue-100 to-blue-200',
      iconColor: 'text-blue-600',
      trend: '+12%',
      trendText: 'dari bulan lalu',
      trendColor: 'text-emerald-600',
      accentColor: 'bg-blue-500',
      shadowColor: 'shadow-blue-500/20'
    },
    {
      title: 'Total Tryouts',
      value: stats.totalTryouts,
      icon: <BookOpen className="w-7 h-7" />,
      bgGradient: 'from-emerald-500 via-emerald-600 to-teal-600',
      iconBg: 'bg-gradient-to-br from-emerald-100 to-emerald-200',
      iconColor: 'text-emerald-600',
      trend: '+8%',
      trendText: 'dari bulan lalu',
      trendColor: 'text-emerald-600',
      accentColor: 'bg-emerald-500',
      shadowColor: 'shadow-emerald-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {statsData.map((stat, index) => (
        <div 
          key={index}
          className="group relative bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 overflow-hidden"
        >
          {/* Animated Background Pattern */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-5 transition-all duration-700`} />
          
          {/* Decorative Elements */}
          <div className={`absolute top-0 right-0 w-32 h-32 ${stat.accentColor} opacity-5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700`} />
          <div className={`absolute bottom-0 left-0 w-24 h-24 ${stat.accentColor} opacity-5 rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700`} />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider group-hover:text-slate-600 transition-colors">
                  {stat.title}
                </p>
                <p className="text-4xl font-bold text-slate-900 group-hover:text-slate-800 transition-colors leading-tight">
                  {stat.value}
                </p>
              </div>
              <div className={`w-20 h-20 ${stat.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 ${stat.iconColor} shadow-lg`}>
                {stat.icon}
              </div>
            </div>
            
            {/* Trend Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${stat.accentColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`text-lg font-bold ${stat.trendColor}`}>{stat.trend}</p>
                  <p className="text-sm text-slate-500 group-hover:text-slate-600 transition-colors">{stat.trendText}</p>
                </div>
              </div>
              
              {/* Status Indicator */}
              <div className={`w-3 h-3 ${stat.accentColor} rounded-full animate-pulse`} />
            </div>
          </div>
          
          {/* Enhanced Hover Border Effect */}
          <div className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-opacity-30 transition-all duration-700 ${stat.shadowColor} group-hover:shadow-2xl`} />
          
          {/* Bottom Accent Line */}
          <div className={`absolute bottom-0 left-0 right-0 h-1 ${stat.accentColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`} />
        </div>
      ))}
    </div>
  );
}
