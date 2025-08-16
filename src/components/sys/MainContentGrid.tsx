"use client";

import { 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings, 
  Plus,
  Zap,
  Star,
  MoreHorizontal
} from "lucide-react";

interface RecentActivity {
  id: string;
  type: 'user_registration' | 'tryout_completion' | 'payment' | 'system_update';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

interface QuickAction {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  bgColor: string;
  hoverColor: string;
}

interface MainContentGridProps {
  recentActivities: RecentActivity[];
}

export default function MainContentGrid({ recentActivities }: MainContentGridProps) {
  const quickActions: QuickAction[] = [
    {
      title: 'Tambah Tryout',
      description: 'Buat tryout baru untuk user',
      icon: <Plus className="w-5 h-5" />,
      href: '/sys/tryouts/create',
      color: 'text-white',
      bgColor: 'bg-gradient-to-r from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      title: 'Kelola User',
      description: 'Lihat dan edit data user',
      icon: <Users className="w-5 h-5" />,
      href: '/sys/users',
      color: 'text-white',
      bgColor: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      hoverColor: 'hover:from-emerald-600 hover:to-emerald-700'
    },
    {
      title: 'Laporan',
      description: 'Generate laporan aktivitas',
      icon: <BarChart3 className="w-5 h-5" />,
      href: '/sys/reports',
      color: 'text-white',
      bgColor: 'bg-gradient-to-r from-violet-500 to-violet-600',
      hoverColor: 'hover:from-violet-600 hover:to-violet-700'
    },
    {
      title: 'Pengaturan',
      description: 'Konfigurasi sistem',
      icon: <Settings className="w-5 h-5" />,
      href: '/sys/settings',
      color: 'text-white',
      bgColor: 'bg-gradient-to-r from-slate-500 to-slate-600',
      hoverColor: 'hover:from-slate-600 hover:to-slate-700'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'warning': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'error': return 'text-red-700 bg-red-50 border-red-200';
      case 'info': return 'text-blue-700 bg-blue-50 border-blue-200';
      default: return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registration': return <Users className="w-4 h-4" />;
      case 'tryout_completion': return <BookOpen className="w-4 h-4" />;
      case 'payment': return <BarChart3 className="w-4 h-4" />;
      case 'system_update': return <Settings className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      {/* Quick Actions */}
      <div className="lg:col-span-1">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
          </div>
          
          <div className="space-y-4">
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.href}
                className={`${action.bgColor} ${action.color} ${action.hoverColor} p-4 rounded-xl flex items-center space-x-4 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg group`}
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {action.icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{action.title}</p>
                  <p className="text-xs opacity-90 leading-relaxed">{action.description}</p>
                </div>
                <div className="w-2 h-2 bg-white/40 rounded-full group-hover:bg-white/60 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="lg:col-span-2">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Recent Activities</h3>
            </div>
            <button className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-4 py-2 rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg">
              Lihat Semua
            </button>
          </div>
          
          {/* Scrollable Content */}
          <div className="p-6">
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {recentActivities.map((activity, index) => (
                <div 
                  key={activity.id} 
                  className="group bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-xl p-4 hover:from-slate-100 hover:to-slate-50 hover:border-slate-300 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 ${getStatusColor(activity.status)} group-hover:scale-110 transition-transform duration-300`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-900 font-semibold text-sm group-hover:text-slate-800 transition-colors">
                        {activity.title}
                      </p>
                      <p className="text-slate-600 text-sm mt-1 leading-relaxed group-hover:text-slate-700 transition-colors">
                        {activity.description}
                      </p>
                      <p className="text-slate-500 text-xs mt-2 font-medium group-hover:text-slate-600 transition-colors">
                        {activity.timestamp}
                      </p>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
