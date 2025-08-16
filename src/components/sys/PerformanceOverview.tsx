"use client";

import { 
  Calendar,
  Target,
  Activity,
  Crown,
  TrendingUp,
  Zap,
  Clock,
  Award
} from "lucide-react";

export default function PerformanceOverview() {
  const performanceMetrics = [
    {
      icon: <Calendar className="w-8 h-8" />,
      value: '98%',
      label: 'Uptime System',
      description: 'System availability',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      trend: '+2.5%',
      trendColor: 'text-emerald-600'
    },
    {
      icon: <Target className="w-8 h-8" />,
      value: '87%',
      label: 'User Satisfaction',
      description: 'Based on feedback',
      color: 'from-emerald-400 to-emerald-600',
      bgColor: 'from-emerald-50 to-emerald-100',
      trend: '+5.2%',
      trendColor: 'text-emerald-600'
    },
    {
      icon: <Activity className="w-8 h-8" />,
      value: '2.3s',
      label: 'Avg Response Time',
      description: 'API performance',
      color: 'from-violet-400 to-violet-600',
      bgColor: 'from-violet-50 to-violet-100',
      trend: '-0.4s',
      trendColor: 'text-emerald-600'
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: '94%',
      label: 'Goal Achievement',
      description: 'Monthly targets',
      color: 'from-amber-400 to-amber-600',
      bgColor: 'from-amber-50 to-amber-100',
      trend: '+3.1%',
      trendColor: 'text-emerald-600'
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
          <Crown className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Performance Overview</h3>
          <p className="text-slate-500 text-sm">Real-time system performance metrics</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <div 
            key={index}
            className="group relative bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            {/* Background Pattern */}
            <div className={`absolute inset-0 bg-gradient-to-br ${metric.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`} />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${metric.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <div className="text-white">
                  {metric.icon}
                </div>
              </div>
              
              {/* Value */}
              <p className="text-3xl font-bold text-slate-900 mb-2 text-center group-hover:text-slate-800 transition-colors">
                {metric.value}
              </p>
              
              {/* Label */}
              <p className="text-slate-700 font-semibold text-sm mb-1 text-center group-hover:text-slate-800 transition-colors">
                {metric.label}
              </p>
              
              {/* Description */}
              <p className="text-slate-500 text-xs text-center mb-3 group-hover:text-slate-600 transition-colors">
                {metric.description}
              </p>
              
              {/* Trend */}
              <div className="flex items-center justify-center space-x-1">
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                <span className={`text-xs font-medium ${metric.trendColor}`}>
                  {metric.trend}
                </span>
              </div>
            </div>
            
            {/* Hover Border Effect */}
            <div className={`absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-opacity-20 transition-all duration-300 bg-gradient-to-br ${metric.color.replace('from-', 'border-').replace('to-', 'border-')}`} />
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 pt-6 border-t border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-slate-900 mb-1">Excellent</p>
            <p className="text-slate-500 text-sm">Overall Performance</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-slate-900 mb-1">24/7</p>
            <p className="text-slate-500 text-sm">Monitoring Active</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-violet-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-slate-900 mb-1">+12%</p>
            <p className="text-slate-500 text-sm">Monthly Growth</p>
          </div>
        </div>
      </div>
    </div>
  );
}
