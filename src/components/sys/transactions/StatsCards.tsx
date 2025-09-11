"use client";

import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  CheckCircle,
  Clock,
} from "lucide-react";
import { PaymentStats } from "./types";

interface StatsCardsProps {
  stats: PaymentStats[];
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stat.value}
              </p>
              <div className="flex items-center mt-2">
                {stat.changeType === "increase" ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : stat.changeType === "decrease" ? (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                ) : (
                  <RefreshCw className="w-4 h-4 text-gray-500 mr-1" />
                )}
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === "increase"
                      ? "text-green-600"
                      : stat.changeType === "decrease"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  dari bulan lalu
                </span>
              </div>
            </div>
            <div className={`${stat.color} p-3 rounded-lg text-white`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
