"use client";

import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  DollarSign, 
  Activity, 
  Target,
  Award
} from "lucide-react";

interface AdminStats {
  totalUsers: number;
  totalTryouts: number;
  totalRevenue: number;
  activeUsers: number;
  completedTryouts: number;
  pendingApprovals: number;
}

interface StatsGridProps {
  stats: AdminStats;
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const statsData = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: <Users className="w-6 h-6" />,
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      trend: '+12%',
      trendText: 'dari bulan lalu',
      trendColor: 'text-emerald-600'
    },
    {
      title: 'Total Tryouts',
      value: stats.totalTryouts,
      icon: <BookOpen className="w-6 h-6" />,
      bgColor: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      trend: '+8%',
      trendText: 'dari bulan lalu',
      trendColor: 'text-emerald-600'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: <DollarSign className="w-6 h-6" />,
      bgColor: 'bg-gradient-to-br from-teal-500 to-teal-600',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
      trend: '+23%',
      trendText: 'dari bulan lalu',
      trendColor: 'text-emerald-600'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: <Activity className="w-6 h-6" />,
      bgColor: 'bg-gradient-to-br from-violet-500 to-violet-600',
      iconBg: 'bg-violet-100',
      iconColor: 'text-violet-600',
      trend: '+5%',
      trendText: 'dari bulan lalu',
      trendColor: 'text-emerald-600'
    },
    {
      title: 'Completed',
      value: stats.completedTryouts,
      icon: <Target className="w-6 h-6" />,
      bgColor: 'bg-gradient-to-br from-amber-500 to-amber-600',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      trend: '+18%',
      trendText: 'dari bulan lalu',
      trendColor: 'text-emerald-600'
    },
    {
      title: 'Pending',
      value: stats.pendingApprovals,
      icon: <Award className="w-6 h-6" />,
      bgColor: 'bg-gradient-to-br from-red-500 to-red-600',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      trend: 'Perlu review',
      trendText: '',
      trendColor: 'text-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <div 
          key={index}
          className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden"
        >
          {/* Background Pattern */}
          <div className={`absolute inset-0 ${stat.bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1 group-hover:text-slate-700 transition-colors">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-slate-900 group-hover:text-slate-800 transition-colors">
                  {stat.value}
                </p>
              </div>
              <div className={`w-14 h-14 ${stat.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${stat.iconColor}`}>
                {stat.icon}
              </div>
            </div>
            
            {/* Trend */}
            <div className="flex items-center text-sm">
              {stat.trendText ? (
                <>
                  <TrendingUp className="w-4 h-4 text-emerald-500 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  <span className={`font-medium ${stat.trendColor}`}>{stat.trend}</span>
                  <span className="text-slate-500 ml-2">{stat.trendText}</span>
                </>
              ) : (
                <span className={`font-medium ${stat.trendColor}`}>{stat.trend}</span>
              )}
            </div>
          </div>
          
          {/* Hover Border Effect */}
          <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-opacity-20 transition-all duration-500 ${stat.bgColor.replace('bg-gradient-to-br', 'border')}`} />
        </div>
      ))}
    </div>
  );
}
